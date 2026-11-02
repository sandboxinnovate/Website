// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import fs from 'node:fs';
import { loadEnv } from 'vite';
import { blogHast } from './src/lib/markdown/blog-hast.mjs';

// Leads: without PUBLIC_LEADS_ENDPOINT a production build shows each form's error state (see src/lib/leads.ts).
// Only warn here: preview builds must still succeed.
const env = loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', process.cwd(), '');
if (process.argv.includes('build') && !env.PUBLIC_LEADS_ENDPOINT && !process.env.PUBLIC_LEADS_ENDPOINT) {
  console.warn('\n[sandbox] WARNING: PUBLIC_LEADS_ENDPOINT is not set. Forms will show their error state. Set PUBLIC_LEADS_PREVIEW=1 to fake success in a preview build.\n');
}

// Blog posts have different slugs per language, so the sitemap's automatic i18n pairing (same path
// under /es/) can't see their translations. Pair them by `translationKey` from the frontmatter instead.
const SITE_URL = 'https://sandboxinnovate.com';
/** @type {Map<string, Record<string, string>> | undefined} */
let blogPairs;
function blogAlternates() {
  if (blogPairs) return blogPairs;
  const byKey = new Map();
  for (const lang of ['en', 'es']) {
    const dir = new URL(`./src/content/blog/${lang}/`, import.meta.url);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md') || f.startsWith('_')) continue;
      const head = fs.readFileSync(new URL(f, dir), 'utf8').match(/^---\n([\s\S]*?)\n---/);
      const key = head?.[1].match(/^translationKey:\s*["']?([a-z0-9-]+)["']?\s*$/m)?.[1];
      if (!key) continue;
      const url = `${SITE_URL}${lang === 'es' ? '/es' : ''}/blog/${f.replace(/\.md$/, '')}/`;
      byKey.set(key, { ...byKey.get(key), [lang]: url });
    }
  }
  const map = new Map();
  for (const pair of byKey.values()) for (const url of Object.values(pair)) map.set(url, pair);
  return (blogPairs = map);
}

export default defineConfig({
  site: 'https://sandboxinnovate.com',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  markdown: {
    // Blog posts: heading anchors, scrollable tables, callouts and copyable code blocks (src/lib/markdown/blog-hast.mjs).
    processor: satteri({ hastPlugins: [blogHast()] }),
    // Token colours come from CSS variables (--astro-code-*) defined with the prose styles, so code matches the brand.
    shikiConfig: { theme: 'css-variables' },
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/lab/') && !/\/404\/?$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      serialize(item) {
        if (!/\/blog\/[^/]+\/$/.test(item.url)) return item;
        const pair = blogAlternates().get(item.url);
        item.links = pair ? Object.entries(pair).map(([lang, url]) => ({ lang, url })) : undefined;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Lets several dev servers run side by side without fighting over the dep cache.
    cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  },
});
