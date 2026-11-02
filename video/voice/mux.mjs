#!/usr/bin/env node
// Mux a narration track (video/out/voice/<name>-<lang>.wav from synth.py) onto the existing silent
// explainer video without re-encoding the picture.
//
//   node video/voice/mux.mjs <name> <en|es>              -> video/out/voiced/<name>-<lang>.mp4 + .webm
//   node video/voice/mux.mjs <name> <en|es> --publish    -> also copies them (and the .vtt) over public/video/<unit>-<lang>.*
//
// <name> is the stem of video/voice/<name>.json (its "unit" field names the video). Whenever public/video holds a
// silent file (first run, or after render.mjs --publish) it is copied to video/out/silent/; that backup is always
// the source, so re-running never stacks audio on audio. Names starting with "_" (samples) cannot be published.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VIDEO_DIR = path.resolve(HERE, '..');
const ROOT = path.resolve(VIDEO_DIR, '..');
const rel = (p) => path.relative(ROOT, p);

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const [name, lang] = args.filter((a) => !a.startsWith('--'));
if (!name || !['en', 'es'].includes(lang)) {
  console.error('usage: node video/voice/mux.mjs <name> <en|es> [--publish]');
  process.exit(2);
}
const publish = flags.has('--publish');

const specPath = path.join(HERE, `${name}.json`);
const unit = fs.existsSync(specPath) ? JSON.parse(fs.readFileSync(specPath, 'utf8')).unit || name : name;
if (publish && name.startsWith('_')) {
  console.error(`refusing to publish "${name}": names starting with "_" are samples`);
  process.exit(2);
}

const voice = path.join(VIDEO_DIR, 'out', 'voice', `${name}-${lang}.wav`);
if (!fs.existsSync(voice)) {
  console.error(`missing ${rel(voice)}: run  python video/voice/synth.py ${name} ${lang}  first`);
  process.exit(1);
}
const report = path.join(VIDEO_DIR, 'out', 'voice', `${name}-${lang}.report.json`);
if (fs.existsSync(report)) {
  const r = JSON.parse(fs.readFileSync(report, 'utf8'));
  if (r.errors?.length) {
    console.error(`${rel(report)} has ${r.errors.length} ERROR(s); fix the narration first:\n  ${r.errors.join('\n  ')}`);
    process.exit(1);
  }
}

const PUB = path.join(ROOT, 'public', 'video');
const SILENT = path.join(VIDEO_DIR, 'out', 'silent');
const VOICED = path.join(VIDEO_DIR, 'out', 'voiced');
fs.mkdirSync(SILENT, { recursive: true });
fs.mkdirSync(VOICED, { recursive: true });

function run(cmd, argv) {
  const r = spawnSync(cmd, argv, { encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) {
    console.error(`${cmd} ${argv.join(' ')}\n${(r.stderr || '').slice(-3000)}`);
    process.exit(1);
  }
  return r.stdout;
}

function probe(file) {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-show_entries',
    'format=duration:stream=index,codec_type,codec_name,sample_rate,channels,bit_rate,duration:stream_tags=DURATION',
    '-of', 'json', file]));
  const dur = (s) => {
    if (s.duration && s.duration !== 'N/A') return Number(s.duration);
    const t = s.tags?.DURATION; // matroska/webm: HH:MM:SS.nnnnnnnnn
    if (!t) return NaN;
    const [h, m, sec] = t.split(':').map(Number);
    return h * 3600 + m * 60 + sec;
  };
  return {
    format: Number(j.format.duration),
    video: j.streams.filter((s) => s.codec_type === 'video').map((s) => ({ ...s, dur: dur(s) })),
    audio: j.streams.filter((s) => s.codec_type === 'audio').map((s) => ({ ...s, dur: dur(s) })),
  };
}

const MAX_TP = -1.0;
function truePeak(file) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-vn', '-af', 'ebur128=peak=true:framelog=quiet', '-f', 'null', '-'], { encoding: 'utf8' });
  const m = [...(r.stderr || '').matchAll(/Peak:\s+(-?[\d.]+|-inf) dBFS/g)];
  return m.length ? Number(m[m.length - 1][1]) : NaN;
}

const results = [];
for (const ext of ['mp4', 'webm']) {
  const pub = path.join(PUB, `${unit}-${lang}.${ext}`);
  const backup = path.join(SILENT, `${unit}-${lang}.${ext}`);
  const src = backup;
  if (fs.existsSync(pub) && !probe(pub).audio.length) {
    // the public file is silent (first run, or a fresh render.mjs --publish): it is the newest picture
    const same = fs.existsSync(backup) && fs.statSync(backup).size === fs.statSync(pub).size
      && fs.readFileSync(backup).equals(fs.readFileSync(pub));
    if (!same) {
      fs.copyFileSync(pub, backup);
      console.log(`backed up silent ${rel(pub)} -> ${rel(backup)}`);
    }
  } else if (!fs.existsSync(backup)) {
    console.error(fs.existsSync(pub)
      ? `${rel(pub)} already has audio and there is no silent backup in ${rel(SILENT)}; re-render the silent video first (node video/render.mjs ${unit} ${lang} --publish)`
      : `missing ${rel(pub)}`);
    process.exit(1);
  }
  const sp = probe(src);
  if (!sp.video.length) { console.error(`${rel(src)} has no video stream`); process.exit(1); }
  const vdur = Number.isFinite(sp.video[0].dur) ? sp.video[0].dur : sp.format;

  const out = path.join(VOICED, `${unit === name ? unit : name}-${lang}.${ext}`);
  // Lossy codecs overshoot the voice track's -1.5 dBTP a little; Opus at 96k can reach -0.8 dBTP on some
  // voices. Encode, measure the decoded true peak, and step the bitrate up until it stays at or below -1 dBTP.
  const rates = ext === 'mp4' ? ['128k', '160k', '192k'] : ['96k', '128k', '160k'];
  let tp = NaN; let rate;
  for (rate of rates) {
    const audioArgs = ext === 'mp4'
      ? ['-c:a', 'aac', '-b:a', rate, '-ar', '48000', '-movflags', '+faststart']
      : ['-c:a', 'libopus', '-b:a', rate, '-ar', '48000'];
    run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-i', src, '-i', voice,
      '-map', '0:v:0', '-map', '1:a:0',
      '-c:v', 'copy',
      '-af', `apad=whole_dur=${vdur.toFixed(3)}`, // pad with silence up to the video length
      ...audioArgs,
      '-t', vdur.toFixed(3),
      '-metadata:s:a:0', `language=${lang === 'es' ? 'spa' : 'eng'}`,
      out]);
    tp = truePeak(out);
    if (tp <= MAX_TP) break;
  }

  const p = probe(out);
  const a = p.audio[0]; const v = p.video[0];
  const problems = [];
  if (p.video.length !== 1 || p.audio.length !== 1) problems.push(`expected 1 video + 1 audio stream, got ${p.video.length} + ${p.audio.length}`);
  if (v && v.codec_name !== sp.video[0].codec_name) problems.push(`video codec changed (${sp.video[0].codec_name} -> ${v.codec_name})`);
  const vd = Number.isFinite(v?.dur) ? v.dur : p.format;
  if (Math.abs(vd - vdur) > 0.05) problems.push(`video duration ${vd} != source ${vdur}`);
  if (a && Math.abs(a.dur - vdur) > 0.1) problems.push(`audio duration ${a.dur.toFixed(3)} != video ${vdur.toFixed(3)}`);
  if (a && Number(a.sample_rate) !== 48000) problems.push(`audio sample rate ${a.sample_rate}`);
  if (!(tp <= MAX_TP)) problems.push(`audio true peak ${tp} dBTP above ${MAX_TP} even at ${rate}`);
  const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + ' KB';
  results.push({ ext, out, pub, problems });
  console.log(`${rel(out)}  video ${v?.codec_name} ${vd.toFixed(3)}s (copied)  audio ${a?.codec_name} ${a?.sample_rate} Hz ${a?.channels}ch ${a?.dur.toFixed(3)}s ${rate} TP ${tp.toFixed(1)} dBTP  ${kb(src)} -> ${kb(out)}`);
  for (const pr of problems) console.error(`  PROBLEM: ${pr}`);
}

if (results.some((r) => r.problems.length)) process.exit(1);
if (publish) {
  for (const r of results) {
    fs.copyFileSync(r.out, r.pub);
    console.log(`published ${rel(r.out)} -> ${rel(r.pub)}`);
  }
  const vtt = path.join(VIDEO_DIR, 'out', 'voice', `${name}-${lang}.vtt`);
  if (fs.existsSync(vtt)) {
    const dst = path.join(PUB, `${unit}-${lang}.vtt`);
    fs.copyFileSync(vtt, dst);
    console.log(`published ${rel(vtt)} -> ${rel(dst)}  (captions for <track kind="captions">)`);
  }
}
