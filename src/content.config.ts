/**
 * Content collections (Astro content layer).
 *
 * blog — "Field notes on applied AI": src/content/blog/{en,es}/<slug>.md
 *   - Files whose name starts with "_" are ignored (drafts, templates).
 *   - The EN and ES versions of a post are paired by `translationKey` (= the EN slug).
 *   - The schema mirrors the contract checked by `node scripts/check-posts.mjs` (see README → Blog).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const UNIT_SLUGS = ['brains', 'consulting', 'growth', 'academy', 'products', 'partners'] as const;

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: ['{en,es}/*.md', '!**/_*'],
    // "en/what-is-a-company-brain" — the language folder plus the file slug, untouched.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(20).max(75),
    description: z.string().min(110).max(170),
    dek: z.string().min(40).max(240),
    date: z.coerce.date(),
    lang: z.enum(['en', 'es']),
    translationKey: z.string().regex(/^[a-z0-9-]+$/, 'translationKey must be a lowercase slug'),
    unit: z.enum(UNIT_SLUGS),
    tags: z
      .array(z.string().min(1).refine((t) => t === t.toLowerCase(), 'tags must be lowercase'))
      .min(2)
      .max(4),
    readingMinutes: z.number().int().min(1).max(30),
    takeaways: z.array(z.string().min(1)).min(3).max(5),
    // The contract asks for 2–4 items; the checker tolerates 5, so the build does too.
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(2).max(5).optional(),
    featured: z.boolean().default(false),
    author: z.literal('sandbox'),
  }),
});

export const collections = { blog };
