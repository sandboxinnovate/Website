#!/usr/bin/env node
/**
 * Puts finished renders on the site.
 *   node video/site-data.mjs            copies video/out/<unit>-<lang>.{mp4,webm,-poster.jpg,-poster-960.jpg}
 *                                       to public/video/ and writes src/data/videos.json
 *   node video/site-data.mjs --no-copy  only rewrites src/data/videos.json
 * Run it after `node video/render.mjs <unit> <lang>` for every unit and language you re-rendered.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'video/out');
const PUB = path.join(ROOT, 'public/video');
const DATA = path.join(ROOT, 'src/data/videos.json');
const UNITS = ['brains', 'consulting', 'growth', 'academy', 'products', 'partners'];
const LANGS = ['en', 'es'];
const SUFFIXES = ['.mp4', '.webm', '-poster.jpg', '-poster-960.jpg'];
const copy = !process.argv.includes('--no-copy');

const data = {};
const missing = [];
if (copy) fs.mkdirSync(PUB, { recursive: true });
for (const unit of UNITS) {
  for (const lang of LANGS) {
    const base = `${unit}-${lang}`;
    const jsonPath = path.join(OUT, `${base}.json`);
    if (!fs.existsSync(jsonPath)) { missing.push(base); continue; }
    const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    (data[unit] ??= {})[lang] = {
      title: j.title,
      duration: j.duration,
      durationLabel: j.durationLabel,
      poster: j.poster,
      transcript: j.transcript,
    };
    if (copy) {
      for (const s of SUFFIXES) {
        const src = path.join(OUT, base + s);
        if (!fs.existsSync(src)) { missing.push(base + s); continue; }
        fs.copyFileSync(src, path.join(PUB, base + s));
      }
    }
  }
}
fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n');
console.log(`wrote ${path.relative(ROOT, DATA)}${copy ? ' and copied files to public/video/' : ''}`);
if (missing.length) {
  console.error(`missing: ${missing.join(', ')}`);
  process.exitCode = 1;
}
