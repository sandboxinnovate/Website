#!/usr/bin/env node
// Deterministic frame-by-frame renderer.
//   node video/render.mjs <unit> <lang> [--preview] [--from s --to s] [--crf n] [--webm-crf n] [--publish] [--no-lint] [--png]
// Full render  -> video/out/<unit>-<lang>.mp4, .webm, -poster.jpg, -poster-960.jpg, .json
// --preview    -> video/out/<unit>-<lang>-preview.mp4 (960x540, 15 fps)
// --from/--to  -> render only that range (suffix -clip), handy for checking one beat
// --publish    -> also copy mp4, webm and posters to public/video/
// --workers n  -> n parallel browsers (default 1; only when nothing else is rendering)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { serve, openStage, lintScene, parseArgs, OUT_DIR, ROOT } from './lib/common.mjs';

const { pos, flags } = parseArgs(process.argv.slice(2));
const [unit, lang = 'en'] = pos;
if (!unit || !['en', 'es'].includes(lang)) {
  console.error('usage: node video/render.mjs <unit> <en|es> [--preview] [--from s --to s] [--crf n] [--webm-crf n] [--publish] [--no-lint]');
  process.exit(1);
}
const preview = !!flags.preview;
const fps = Number(flags.fps || (preview ? 15 : 30));
const scale = Number(flags.scale || (preview ? 0.5 : 1));
const W = Math.round(1920 * scale), H = Math.round(1080 * scale);
const name = `${unit}-${lang}`;
fs.mkdirSync(path.join(OUT_DIR, '.cache'), { recursive: true });

const problems = lintScene(unit);
if (problems.length) {
  console.error(`Copy lint found ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  if (!flags['no-lint']) { console.error('Fix them (or pass --no-lint for a throwaway test).'); process.exit(2); }
}

function run(cmd, args, { stdin = false } = {}) {
  const p = spawn(cmd, args, { stdio: [stdin ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
  let err = '';
  p.stderr.on('data', (d) => { err += d; if (err.length > 20000) err = err.slice(-20000); });
  const done = new Promise((res, rej) => p.on('close', (c) => (c === 0 ? res() : rej(new Error(`${cmd} exited ${c}\n${err.slice(-3000)}`)))));
  return { p, done };
}
const mb = (f) => (fs.statSync(f).size / 1048576).toFixed(2) + ' MB';

const server = await serve();
const t0 = Date.now();
let stage;
try {
  stage = await openStage({ unit, lang, base: server.url, dsf: preview ? scale : 1 });
  const { info } = stage;
  const from = flags.from != null ? Number(flags.from) : 0;
  const to = flags.to != null ? Math.min(Number(flags.to), info.duration) : info.duration;
  const clip = flags.from != null || flags.to != null;
  const nFrames = Math.max(1, Math.round((to - from) * fps));
  console.log(`${name}: ${info.duration}s scene, rendering ${from}s to ${to}s = ${nFrames} frames at ${fps} fps, ${W}x${H}${preview ? ' (preview)' : ''}`);

  const usePng = !!flags.png;
  const workers = Math.max(1, Math.min(4, Number(flags.workers || 1)));
  const master = preview
    ? path.join(OUT_DIR, `${name}-preview${clip ? '-clip' : ''}.mp4`)
    : path.join(OUT_DIR, '.cache', `${name}${clip ? '-clip' : ''}-master.mkv`);
  const encArgs = preview
    ? ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p']
    : ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '8', '-pix_fmt', 'yuv420p'];
  const encode = (out) => run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', usePng ? 'png' : 'mjpeg', '-i', '-',
    '-vf', 'scale=in_range=full:out_range=tv,format=yuv420p', ...encArgs, '-an', '-f', 'matroska', out], { stdin: true });

  // Split the frame range into contiguous chunks, one browser + ffmpeg per worker, then concat.
  const chunks = [...Array(workers).keys()].map((k) => [Math.floor((k * nFrames) / workers), Math.floor(((k + 1) * nFrames) / workers)]);
  const stages = [stage];
  for (let k = 1; k < workers; k++) stages.push(await openStage({ unit, lang, base: server.url, dsf: preview ? scale : 1 }));
  let doneFrames = 0;
  const tr = Date.now();
  const segs = await Promise.all(chunks.map(async ([a, b], k) => {
    const seg = path.join(OUT_DIR, '.cache', `${name}-seg${k}.mkv`);
    const ff = encode(seg);
    let ffErr = null;
    ff.p.stdin.on('error', (e) => { ffErr = e; });
    const write = (buf) => new Promise((res) => (ff.p.stdin.write(buf) ? res() : ff.p.stdin.once('drain', res)));
    const st = stages[k];
    for (let i = a; i < b; i++) {
      if (ffErr) break;
      await st.seek(from + i / fps);
      await write(await st.shot({ format: usePng ? 'png' : 'jpeg', quality: Number(flags.quality || 95), scale }));
      doneFrames++;
      if (doneFrames % (fps * 2) === 0 || doneFrames === nFrames) process.stdout.write(`\r  frame ${doneFrames}/${nFrames}`);
    }
    ff.p.stdin.end();
    await ff.done;
    return seg;
  }));
  for (let k = 1; k < workers; k++) await stages[k].browser.close();
  {
    const list = path.join(OUT_DIR, '.cache', `${name}-segs.txt`);
    fs.writeFileSync(list, segs.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'));
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', ...(preview ? ['-movflags', '+faststart'] : []), master]).done;
    segs.forEach((f) => fs.rmSync(f, { force: true })); fs.rmSync(list, { force: true });
  }
  const renderSecs = (Date.now() - tr) / 1000;
  console.log(`\n  captured ${nFrames} frames in ${renderSecs.toFixed(1)}s = ${(nFrames / renderSecs).toFixed(1)} frames/s (${workers} worker${workers > 1 ? 's' : ''})`);

  if (preview) {
    console.log(`  preview: ${path.relative(ROOT, master)} (${mb(master)})`);
  } else {
    // Poster straight from the browser (sharper than a decoded video frame).
    await stage.seek(info.poster);
    // A poster should not show a half-filled progress bar.
    await stage.page.evaluate(() => document.querySelectorAll('.hud__track').forEach((e) => { e.style.visibility = 'hidden'; }));
    const posterJpg = path.join(OUT_DIR, `${name}${clip ? '-clip' : ''}-poster.jpg`);
    const poster960 = path.join(OUT_DIR, `${name}${clip ? '-clip' : ''}-poster-960.jpg`);
    fs.writeFileSync(posterJpg, await stage.shot({ quality: 86 }));
    fs.writeFileSync(poster960, await stage.shot({ quality: 84, scale: 0.5 }));
    await stage.browser.close(); stage = null;

    const mp4 = path.join(OUT_DIR, `${name}${clip ? '-clip' : ''}.mp4`);
    const webm = path.join(OUT_DIR, `${name}${clip ? '-clip' : ''}.webm`);
    const crf = String(flags.crf || 26);
    const te = Date.now();
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', master, '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-tune', 'animation',
      '-crf', crf, '-maxrate', '2500k', '-bufsize', '5000k', '-g', String(fps * 4), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4]).done;
    console.log(`  mp4  ${path.relative(ROOT, mp4)} ${mb(mp4)} (crf ${crf}, ${((Date.now() - te) / 1000).toFixed(1)}s)`);
    if (!clip || flags.webm) {
      const tw = Date.now();
      const wcrf = String(flags['webm-crf'] || 40);
      await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', master, '-c:v', 'libvpx-vp9', '-crf', wcrf, '-b:v', '0', '-row-mt', '1', '-threads', '4',
        '-deadline', 'good', '-cpu-used', '2', '-g', String(fps * 4), '-pix_fmt', 'yuv420p', '-an', webm]).done;
      console.log(`  webm ${path.relative(ROOT, webm)} ${mb(webm)} (vp9 crf ${wcrf}, ${((Date.now() - tw) / 1000).toFixed(1)}s)`);
    }
    console.log(`  poster ${path.relative(ROOT, posterJpg)} @ ${info.poster}s (${mb(posterJpg)}), ${path.basename(poster960)}`);
    const meta = { unit, lang, title: info.title, duration: info.duration, durationLabel: fmtDur(info.duration), poster: info.poster, transcript: info.transcript, fps, width: W, height: H,
      files: { mp4: path.basename(mp4), webm: fs.existsSync(webm) ? path.basename(webm) : null, poster: path.basename(posterJpg), poster960: path.basename(poster960) } };
    fs.writeFileSync(path.join(OUT_DIR, `${name}${clip ? '-clip' : ''}.json`), JSON.stringify(meta, null, 2));
    if (flags.publish && !clip) {
      const pub = path.join(ROOT, 'public', 'video');
      fs.mkdirSync(pub, { recursive: true });
      for (const f of [mp4, webm, posterJpg, poster960]) fs.copyFileSync(f, path.join(pub, path.basename(f)));
      console.log(`  published to public/video/`);
    }
    if (!flags['keep-master']) fs.rmSync(master, { force: true });
  }
  console.log(`  total ${((Date.now() - t0) / 1000).toFixed(1)}s`);
} finally {
  if (stage) await stage.browser.close();
  await server.close();
}

function fmtDur(s) { const r = Math.round(s); return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`; }
