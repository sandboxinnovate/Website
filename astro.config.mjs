// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

// Leads: without PUBLIC_LEADS_ENDPOINT a production build shows each form's error state (see src/lib/leads.ts).
// Only warn here: preview builds must still succeed.
const env = loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', process.cwd(), '');
if (process.argv.includes('build') && !env.PUBLIC_LEADS_ENDPOINT && !process.env.PUBLIC_LEADS_ENDPOINT) {
  console.warn('\n[sandbox] WARNING: PUBLIC_LEADS_ENDPOINT is not set. Forms will show their error state. Set PUBLIC_LEADS_PREVIEW=1 to fake success in a preview build.\n');
}

export default defineConfig({
  site: 'https://sandboxinnovate.com',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Lets several dev servers run side by side without fighting over the dep cache.
    cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  },
});
