#!/usr/bin/env node
// Save still PNGs of a scene at given seconds, to LOOK at specific moments (e.g. with the Read tool).
//   node video/frames.mjs <unit> <lang> <t1,t2,...|all> [--scale 0.5]
// "all" = one frame every 2 seconds plus the poster frame. Output: video/out/frames/<unit>-<lang>-<t>.png
import fs from 'node:fs';
import path from 'node:path';
import { serve, openStage, lintScene, parseArgs, OUT_DIR, ROOT } from './lib/common.mjs';

const { pos, flags } = parseArgs(process.argv.slice(2));
const [unit, lang = 'en', times = 'all'] = pos;
if (!unit) { console.error('usage: node video/frames.mjs <unit> <en|es> <t1,t2,...|all> [--scale 0.5]'); process.exit(1); }
const dir = path.join(OUT_DIR, 'frames');
fs.mkdirSync(dir, { recursive: true });
const scale = Number(flags.scale || 1);

const problems = lintScene(unit);
if (problems.length) console.warn(`Copy lint (${problems.length}):\n  ` + problems.join('\n  '));

const server = await serve();
let stage;
try {
  stage = await openStage({ unit, lang, base: server.url });
  const { info } = stage;
  let ts = times === 'all'
    ? [...Array(Math.floor(info.duration / 2) + 1).keys()].map((i) => i * 2).concat([info.poster, info.duration - 0.01])
    : times.split(',').map(Number);
  ts = [...new Set(ts.filter((t) => !Number.isNaN(t)).map((t) => Math.max(0, Math.min(t, info.duration))))].sort((a, b) => a - b);
  console.log(`${unit}-${lang}: duration ${info.duration}s, poster ${info.poster}s`);
  for (const t of ts) {
    await stage.seek(t);
    const f = path.join(dir, `${unit}-${lang}-${t.toFixed(2)}.png`);
    fs.writeFileSync(f, await stage.shot({ format: 'png', scale }));
    console.log('  ' + f);
  }
} finally {
  if (stage) await stage.browser.close();
  await server.close();
}
