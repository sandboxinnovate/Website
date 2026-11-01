// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
      filter: (page) => !page.includes('/lab/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Lets several dev servers run side by side without fighting over the dep cache.
    cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  },
});
