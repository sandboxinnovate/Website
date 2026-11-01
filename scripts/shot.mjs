#!/usr/bin/env node
/**
 * Visual QA helper.
 *   node scripts/shot.mjs <url> <outPrefix> [--desktop-only|--mobile-only] [--wait=1500] [--viewport-only] [--video=6000] [--scroll]
 *
 * - Saves <outPrefix>-desktop.png (1440×900) and <outPrefix>-mobile.png (390×844), full page by default.
 * - --viewport-only: capture only the first screen.
 * - --video=MS: also records a webm of the first screen for MS milliseconds (<outPrefix>-desktop.webm).
 * - --scroll: scrolls the page slowly before the screenshot so scroll-triggered elements appear.
 * - Prints console errors, page errors and failed requests — fix all of them.
 */
import { createRequire } from 'node:module';
// Use the machine's preinstalled Playwright (matches the bundled Chromium); fall back to a local install.
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(require.resolve('playwright', { paths: [process.env.PLAYWRIGHT_DIR || '/opt/node-tools/node_modules', ...(process.env.NODE_PATH || '').split(':')] })); }
const { chromium } = pw;
import fs from 'node:fs';
import path from 'node:path';

const [url, out, ...flags] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node scripts/shot.mjs <url> <outPrefix> [flags]');
  process.exit(1);
}
const flag = (n) => flags.find((f) => f === `--${n}` || f.startsWith(`--${n}=`));
const val = (n, d) => { const f = flag(n); return f && f.includes('=') ? Number(f.split('=')[1]) : d; };
const wait = val('wait', 1500);
const video = val('video', 0);
const full = !flag('viewport-only');
const doScroll = !!flag('scroll');
const targets = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
].filter(([n]) => !(flag('desktop-only') && n === 'mobile') && !(flag('mobile-only') && n === 'desktop'));

fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
const browser = await chromium.launch();
let problems = 0;
for (const [name, viewport] of targets) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    ...(video && name === 'desktop' ? { recordVideo: { dir: path.dirname(path.resolve(out)), size: viewport } } : {}),
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') { problems++; console.log(`[${name}] console.${m.type()}: ${m.text()}`); } });
  page.on('pageerror', (e) => { problems++; console.log(`[${name}] pageerror: ${e.message}`); });
  page.on('requestfailed', (r) => { problems++; console.log(`[${name}] requestfailed: ${r.url()} ${r.failure()?.errorText}`); });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  if (doScroll) {
    // Step from the Node side so IntersectionObserver-driven reveals fire like real scrolling.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 300) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(110); }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.waitForTimeout(video && name === 'desktop' ? video : wait);
  await page.screenshot({ path: `${out}-${name}.png`, fullPage: full });
  const vid = page.video();
  await ctx.close();
  if (vid) { const p = await vid.path(); fs.renameSync(p, `${out}-${name}.webm`); console.log(`video: ${out}-${name}.webm`); }
  console.log(`saved: ${out}-${name}.png`);
}
await browser.close();
console.log(problems ? `⚠ ${problems} console/page/network problem(s) above` : '✓ no console errors');
