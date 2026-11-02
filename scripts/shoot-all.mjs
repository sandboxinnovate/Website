#!/usr/bin/env node
/**
 * Screenshot every route, blog posts included (desktop 1440 + mobile 390) as JPG, scrolling first so reveals fire.
 *   node scripts/shoot-all.mjs http://127.0.0.1:4321 qa/site [--only=/,/es/]
 * Prints console errors per page and checks for horizontal overflow.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(require.resolve('playwright', { paths: ['/opt/node-tools/node_modules'] })); }
const { chromium } = pw;

const [base = 'http://127.0.0.1:4321', outDir = 'qa/site', ...flags] = process.argv.slice(2);
const units = ['brains', 'consulting', 'growth', 'academy', 'products', 'partners'];
let routes = ['/', '/diagnostic', '/contact', '/about', '/work', '/blog/', ...units.map((u) => `/services/${u}`), '/404'];
routes = [...routes, ...routes.filter((r) => r !== '/404').map((r) => (r === '/' ? '/es/' : `/es${r}`))];
// Blog posts: every Markdown file in src/content/blog/{en,es} (files starting with "_" are drafts).
for (const lang of ['en', 'es']) {
  const dir = new URL(`../src/content/blog/${lang}/`, import.meta.url);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).sort()) {
    if (f.endsWith('.md') && !f.startsWith('_')) routes.push(`${lang === 'es' ? '/es' : ''}/blog/${f.replace(/\.md$/, '')}/`);
  }
}
const only = flags.find((f) => f.startsWith('--only='));
if (only) routes = only.slice(7).split(',');

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  for (const route of routes) {
    const page = await ctx.newPage();
    const problems = [];
    page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
    page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()}`));
    const res = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 }).catch((e) => ({ status: () => `ERR ${e.message}` }));
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 320) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(100); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) problems.push(`horizontal overflow: ${overflow}px`);
    const slug = (route.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home');
    await page.screenshot({ path: `${outDir}/${name}-${slug}.jpg`, fullPage: true, type: 'jpeg', quality: 72 });
    report.push({ viewport: name, route, status: res?.status?.(), problems });
    console.log(`${name} ${route} ${res?.status?.()} ${problems.length ? '⚠ ' + problems.join(' | ') : '✓'}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
