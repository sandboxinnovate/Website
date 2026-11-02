#!/usr/bin/env node
/**
 * Validate blog posts in src/content/blog/{en,es}/*.md (files starting with "_" are ignored).
 *   node scripts/check-posts.mjs            # all posts
 *   node scripts/check-posts.mjs <key>      # only the EN/ES pair whose translationKey is <key>
 * Errors exit with code 1. Warnings are for a human/editor to judge.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIR = path.join(ROOT, 'src/content/blog');
const UNITS = ['brains', 'consulting', 'growth', 'academy', 'products', 'partners'];
const STATIC = ['/', '/diagnostic/', '/contact/', '/about/', '/work/', '/privacy/', '/blog/', ...UNITS.map((u) => `/services/${u}/`)];
const only = process.argv[2];
const COVERS = fs.existsSync(path.join(ROOT, 'src/data/blog-covers.ts')) ? fs.readFileSync(path.join(ROOT, 'src/data/blog-covers.ts'), 'utf8') : '';

const BANNED = {
  en: [/\bdelv(e|ing)\b/i, /\bunlock(s|ing)?\b/i, /\bunleash/i, /\bseamless(ly)?\b/i, /\bgame[- ]chang/i, /\brevolutioni[sz]e/i, /\bsupercharg/i, /\bempower/i, /\bharness(ing)? the\b/i, /\belevate\b/i, /\bcutting[- ]edge\b/i, /\bnext[- ]level\b/i, /fast[- ]paced world/i, /ever[- ]evolving/i, /\bin conclusion\b/i, /let'?s dive in/i, /\btapestry\b/i, /\btestament to\b/i, /\blandscape of\b/i, /navigate the complexit/i],
  es: [/en el mundo actual/i, /en la era de/i, /\bpotenci(ar|a|e)\b/i, /\bdesbloque/i, /\brevolucion(ar|a)\b/i, /sin precedentes/i, /\bsumerj/i, /aprovechar al m[aá]ximo/i, /un antes y un despu[eé]s/i, /cabe destacar/i, /en conclusi[oó]n/i, /llevar(lo)? al siguiente nivel/i, /\bsinergia/i],
};
const VOSEO = /\b(vos|ten[eé]s|pod[eé]s|quer[eé]s|sabés|ven[ií]s|sos|hacés|dec[ií]s|mirá |fijate|ten[eé] en cuenta|vosotros|vuestr[oa]s?|ten[eé]is|pod[eé]is|ordenador)\b/i;
const FORBIDDEN = /symphon|sinfon[ií]a os|auto[ -_]?client/i;
const MONEY = /(US?\$|€|£|USD|EUR|MXN|ARS|COP|CLP)\s?\d|\d\s?(USD|EUR|d[oó]lares|euros)\b/i;

const errors = [];
const warns = [];
const posts = [];

for (const lang of ['en', 'es']) {
  const d = path.join(DIR, lang);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.md') || f.startsWith('_')) continue;
    const file = path.join(d, f);
    const raw = fs.readFileSync(file, 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) { errors.push(`${lang}/${f}: missing frontmatter block`); continue; }
    let fm;
    try { fm = parse(m[1]); } catch (e) { errors.push(`${lang}/${f}: YAML error ${e.message}`); continue; }
    posts.push({ lang, slug: f.replace(/\.md$/, ''), file: `${lang}/${f}`, fm, body: m[2] });
  }
}

const slugsByLang = { en: new Set(posts.filter((p) => p.lang === 'en').map((p) => p.slug)), es: new Set(posts.filter((p) => p.lang === 'es').map((p) => p.slug)) };
const isRoute = (href, lang) => {
  const h = href.split('#')[0].replace(/\?.*$/, '');
  if (!h) return true;
  const withSlash = h.endsWith('/') ? h : h + '/';
  const base = lang === 'es' ? withSlash.replace(/^\/es(?=\/)/, '') : withSlash;
  if (lang === 'es' && !withSlash.startsWith('/es/')) return { wrongLang: true };
  if (STATIC.includes(base)) return true;
  const bm = base.match(/^\/blog\/([a-z0-9-]+)\/$/);
  if (bm) return slugsByLang[lang].has(bm[1]) || { missingPost: bm[1] };
  return false;
};

for (const p of posts) {
  if (only && p.fm.translationKey !== only) continue;
  const { fm, file, lang, body } = p;
  const req = (k, ok, msg) => { if (!ok) errors.push(`${file}: ${k} ${msg}`); };
  req('title', typeof fm.title === 'string' && fm.title.length >= 20 && fm.title.length <= 75, `must be 20–75 chars (got ${fm.title?.length})`);
  req('description', typeof fm.description === 'string' && fm.description.length >= 110 && fm.description.length <= 170, `must be 110–170 chars (got ${fm.description?.length})`);
  req('dek', typeof fm.dek === 'string' && fm.dek.length >= 40 && fm.dek.length <= 240, `must be 40–240 chars`);
  req('date', /^\d{4}-\d{2}-\d{2}$/.test(String(fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : fm.date)), 'must be YYYY-MM-DD');
  req('lang', fm.lang === lang, `must equal folder (${lang})`);
  req('translationKey', typeof fm.translationKey === 'string' && /^[a-z0-9-]+$/.test(fm.translationKey), 'must be a lowercase slug');
  req('unit', UNITS.includes(fm.unit), `must be one of ${UNITS.join(', ')}`);
  req('tags', Array.isArray(fm.tags) && fm.tags.length >= 2 && fm.tags.length <= 4 && fm.tags.every((t) => typeof t === 'string' && t === t.toLowerCase()), 'must be 2–4 lowercase strings');
  req('readingMinutes', Number.isInteger(fm.readingMinutes) && fm.readingMinutes >= 3 && fm.readingMinutes <= 20, 'must be an integer 3–20');
  req('takeaways', Array.isArray(fm.takeaways) && fm.takeaways.length >= 3 && fm.takeaways.length <= 5, 'must have 3–5 items');
  if (fm.faq !== undefined) req('faq', Array.isArray(fm.faq) && fm.faq.length >= 2 && fm.faq.length <= 5 && fm.faq.every((x) => x && typeof x.q === 'string' && typeof x.a === 'string'), 'must be 2–5 {q, a}');
  req('author', fm.author === 'sandbox', "must be 'sandbox'");
  if (lang === 'en') req('translationKey', fm.translationKey === p.slug, 'must equal the EN file slug');
  if (lang === 'en' && typeof fm.translationKey === 'string') {
    const hasFile = fs.existsSync(path.join(ROOT, 'src/assets/blog', `${fm.translationKey}.jpg`));
    const hasEntry = new RegExp(`['"]${fm.translationKey}['"]\\s*:`).test(COVERS);
    if (!hasFile || !hasEntry) warns.push(`${file}: no cover photo (${!hasFile ? `src/assets/blog/${fm.translationKey}.jpg missing` : ''}${!hasFile && !hasEntry ? '; ' : ''}${!hasEntry ? 'no entry in src/data/blog-covers.ts' : ''}); a plain panel and the default OG image are used`);
  }

  const pair = posts.find((x) => x.lang !== lang && x.fm.translationKey === fm.translationKey);
  if (!pair) errors.push(`${file}: no ${lang === 'en' ? 'es' : 'en'} version with translationKey "${fm.translationKey}"`);
  else if (pair.fm.unit !== fm.unit) errors.push(`${file}: unit differs from its translation`);

  if (/^#\s/m.test(body)) errors.push(`${file}: body must not contain an H1 (# ...) — the layout renders the title`);
  const words = body.replace(/[#>*_`|\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 1100) warns.push(`${file}: only ${words} words (target 1,300–1,900)`);
  if (words > 2600) warns.push(`${file}: ${words} words (long; target 1,300–1,900)`);
  const est = Math.max(3, Math.round(words / 220));
  if (Number.isInteger(fm.readingMinutes) && Math.abs(est - fm.readingMinutes) > 2) warns.push(`${file}: readingMinutes ${fm.readingMinutes} but ~${est} by word count`);
  if ((body.match(/^## /gm) || []).length < 3) warns.push(`${file}: fewer than 3 H2 sections`);

  const all = [fm.title, fm.description, fm.dek, ...(fm.takeaways || []), ...(fm.faq || []).flatMap((x) => [x.q, x.a]), body].join('\n');
  if (FORBIDDEN.test(all)) errors.push(`${file}: forbidden term (client software / autoclient)`);
  if (lang === 'es' && VOSEO.test(all)) errors.push(`${file}: voseo / Spain-only form: "${all.match(VOSEO)[0]}"`);
  for (const re of BANNED[lang]) { const mm = all.match(re); if (mm) warns.push(`${file}: cliché "${mm[0]}"`); }
  const money = all.match(MONEY); if (money) warns.push(`${file}: currency amount "${money[0]}" — never a Sandbox price; only allowed as a clearly hypothetical client-side example`);
  const paras = body.split(/\n{2,}/);
  const dashHeavy = paras.filter((x) => (x.match(/—/g) || []).length > 1).length;
  if (dashHeavy) warns.push(`${file}: ${dashHeavy} paragraph(s) with more than one em dash`);
  const totalDash = (body.match(/—/g) || []).length;
  if (totalDash > words / 120) warns.push(`${file}: ${totalDash} em dashes (keep them rare)`);

  for (const mm of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const r = isRoute(mm[1], lang);
    if (r === true) continue;
    if (r && r.missingPost) warns.push(`${file}: link to blog post "${r.missingPost}" not written yet (ok while others are in progress)`);
    else if (r && r.wrongLang) errors.push(`${file}: Spanish post links to an English page ${mm[1]}`);
    else errors.push(`${file}: internal link to unknown route ${mm[1]}`);
  }
  const ext = [...body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((x) => x[1]);
  if (ext.some((u) => /sandboxinnovate\.com/.test(u))) warns.push(`${file}: use relative links for sandboxinnovate.com pages`);
}

for (const e of errors) console.log('ERROR ', e);
for (const w of warns) console.log('warn  ', w);
console.log(`\n${posts.length} file(s) scanned${only ? ` (checked key "${only}")` : ''}: ${errors.length} error(s), ${warns.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
