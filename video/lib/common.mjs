// Shared node helpers for render.mjs and frames.mjs: static server, browser boot, copy lint.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export const VIDEO_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ROOT = path.resolve(VIDEO_DIR, '..');
export const OUT_DIR = path.join(VIDEO_DIR, 'out');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
};

/** Static server over the repo root (follows the node_modules symlink). Resolves { url, close }. */
export function serve() {
  const server = http.createServer((req, res) => {
    try {
      const u = new URL(req.url, 'http://x');
      const p = path.normalize(decodeURIComponent(u.pathname)).replace(/^([/\\])+/, '');
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      fs.stat(file, (err, st) => {
        if (err || !st.isFile()) { res.writeHead(404); return res.end('not found: ' + p); }
        res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
        fs.createReadStream(file).pipe(res);
      });
    } catch (e) { res.writeHead(500); res.end(String(e)); }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
  }));
}

/** Launch chromium, open the stage for a scene and wait until it is ready. */
export async function openStage({ unit, lang, base, dsf = 1 }) {
  const require = createRequire(import.meta.url);
  let playwright;
  try { playwright = require('playwright'); } catch { playwright = createRequire(path.join(ROOT, 'package.json'))('playwright'); }
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: dsf });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[console.${m.type()}] ${m.text()}`); });
  page.on('requestfailed', (r) => errors.push(`[requestfailed] ${r.url()}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`[http ${r.status()}] ${r.url()}`); });
  await page.goto(`${base}/video/runtime/stage.html?scene=${encodeURIComponent(unit)}&lang=${lang}`);
  await page.waitForFunction(() => window.__video && (window.__video.ready || window.__video.error), null, { timeout: 60000 });
  const info = await page.evaluate(() => ({ ...window.__video, seek: undefined }));
  if (info.error) { await browser.close(); throw new Error('Scene failed to build:\n' + info.error + (errors.length ? '\n' + errors.join('\n') : '')); }
  if (errors.length) console.warn('Stage warnings:\n  ' + errors.join('\n  '));
  const cdp = await context.newCDPSession(page);
  const seek = (t) => page.evaluate((tt) => window.__video.seek(tt), t);
  const shot = async ({ format = 'jpeg', quality = 95, scale = 1 } = {}) => {
    const r = await cdp.send('Page.captureScreenshot', {
      format, ...(format === 'png' ? {} : { quality }), optimizeForSpeed: true, fromSurface: true,
      clip: { x: 0, y: 0, width: 1920, height: 1080, scale },
    });
    return Buffer.from(r.data, 'base64');
  };
  return { browser, page, info, seek, shot, errors };
}

/* ------------------------------------------------------------------ copy lint (hard rules) */
const RULES = [
  [/[\u2014\u2013]/, 'em/en dash (use "3 to 5", "3 a 5" or "3-5")'],
  [/symphony|autoclient/i, 'client-specific name'],
  [/(?<![\w{])\$\s?\d|\d\s?\$|€|£|\bUSD\b|\bEUR\b|\bMXN\b|\bUS\$|\bd[oó]lares\b|\bdollars?\b|\beuros?\b/i, 'price or currency'],
  [/\bunlock|supercharg|revolutioni[sz]|seamless|game[- ]?changer|potenci(ar|a|amos|e)\b|desbloque|revolucion(ar|a|amos)\b|sin precedentes|cutting[- ]edge|next[- ]level|harness the power|unleash/i, 'AI cliché'],
  [/\bvosotros\b|\bvuestr[oa]s?\b|\b(pod|ten|quer|hab|sab|hac|dec|pens)éis\b|\bsois\b/i, 'vosotros form (use ustedes / tú)'],
  [/\b(quer|pod|ten|sab|hac|dec|pens|sent|necesit|ven)és\b|\bvos\b|\bmirá(?![a-z])|\bhacé(?![a-z])|\bdecí(?![a-z])|\bcontanos\b|\bescribinos\b|\bagendá(?![a-z])/i, 'voseo (use tú)'],
];
/** Lint a scene's source (and sibling .json copy). Returns a list of "file:line: problem: text". */
export function lintScene(unit) {
  const files = [path.join(VIDEO_DIR, 'scenes', `${unit}.js`), path.join(VIDEO_DIR, 'scenes', `${unit}.json`)].filter((f) => fs.existsSync(f));
  const problems = [];
  for (const f of files) {
    fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      for (const [re, why] of RULES) {
        const m = line.match(re);
        if (m) problems.push(`${path.relative(ROOT, f)}:${i + 1}: ${why}: "${m[0]}"  ${line.trim().slice(0, 120)}`);
      }
    });
  }
  return problems;
}

export function parseArgs(argv) {
  const pos = []; const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (next != null && !next.startsWith('--') && ['from', 'to', 'crf', 'webm-crf', 'fps', 'quality', 'scale', 'workers'].includes(k)) { flags[k] = next; i++; }
      else flags[k] = true;
    } else pos.push(a);
  }
  return { pos, flags };
}
