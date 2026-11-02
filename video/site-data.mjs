#!/usr/bin/env node
/**
 * Puts finished renders on the site.
 *   node video/site-data.mjs            copies video/out/<unit>-<lang>.{mp4,webm,-poster.jpg,-poster-960.jpg}
 *                                       to public/video/ and writes src/data/videos.json
 *   node video/site-data.mjs --no-copy  only rewrites src/data/videos.json
 * Run it after `node video/render.mjs <unit> <lang>` for every unit and language you re-rendered, and after
 * editing a narration in video/voice/<unit>.json.
 *
 * Transcripts: when video/voice/<unit>.json has narration lines for a language, the transcript is the spoken
 * narration (one paragraph per line), because that is what visitors hear. Otherwise it falls back to the
 * renderer's on-screen transcript.
 *
 * Narrated units: the .mp4/.webm in video/out/ are silent, so they are NOT copied over the voiced files in
 * public/video/ (posters still are). After a re-render, publish the picture with `render.mjs --publish` and then
 * put the voice back with `node video/voice/mux.mjs <unit> <lang> --publish`.
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
const VOICE = path.join(ROOT, 'video/voice');

/** Spoken narration for a unit and language, or null when the unit has no voice-over. */
function narration(unit, lang) {
  const p = path.join(VOICE, `${unit}.json`);
  if (!fs.existsSync(p)) return null;
  const lines = JSON.parse(fs.readFileSync(p, 'utf8')).lines?.[lang];
  if (!Array.isArray(lines) || !lines.length) return null;
  return [...lines].sort((a, b) => a.at - b.at).map((l) => l.text.trim()).filter(Boolean).join('\n\n');
}

const previous = fs.existsSync(DATA) ? JSON.parse(fs.readFileSync(DATA, 'utf8')) : {};
const data = {};
const missing = [];
if (copy) fs.mkdirSync(PUB, { recursive: true });
for (const unit of UNITS) {
  for (const lang of LANGS) {
    const base = `${unit}-${lang}`;
    const jsonPath = path.join(OUT, `${base}.json`);
    // Without a fresh render (video/out/ is gitignored and may be empty), keep the entry already on the site.
    const j = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : previous[unit]?.[lang];
    if (!j) { missing.push(base); continue; }
    const rendered = fs.existsSync(jsonPath);
    (data[unit] ??= {})[lang] = {
      title: j.title,
      duration: j.duration,
      durationLabel: j.durationLabel,
      poster: j.poster,
      transcript: narration(unit, lang) ?? j.transcript,
    };
    if (copy && rendered) {
      const voiced = narration(unit, lang) !== null;
      for (const s of SUFFIXES) {
        if (voiced && (s === '.mp4' || s === '.webm')) continue; // keep the voiced files from mux.mjs --publish
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
