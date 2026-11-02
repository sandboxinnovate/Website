# Sandbox website

Marketing site for Sandbox (sandboxinnovate.com): AI systems, consulting, growth, academy, products and partners.
Bilingual (English at `/`, Spanish at `/es/`), static, fast, and built to be edited by a small team.

## Stack

- **Astro 7**: static pages, zero JavaScript by default.
- **React 19 islands**: only the interactive widgets ship JS, and most hydrate when scrolled into view.
- **Tailwind CSS v4**: design tokens live in `src/styles/global.css` (`@theme`).
- Fonts are self-hosted: **Unbounded** (display), **Satoshi** (body, from Fontshare, free for commercial use), **JetBrains Mono** (system labels).
- No CMS, no tracking, no third-party scripts.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs the static site to dist/
npm run preview    # serves dist/ locally
```

## Deploy

`dist/` is a plain static site. Any static host works (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront).
On Vercel/Netlify: import the repository, framework preset **Astro**, build command `npm run build`, output directory `dist`.
`vercel.json` adds trailing-slash URLs, long caching for `/_astro/*`, and `noindex` on `*.vercel.app` links (so preview links never compete with the real domain).
On preview hosts (`*.vercel.app`, `*.netlify.app`, localhost) forms without an endpoint fake success so demos work; on the real domain they need `PUBLIC_LEADS_ENDPOINT`.

## Forms and leads

Every form (contact, AI diagnostic, ROI calculator, newsletter) goes through `src/lib/leads.ts`.
Set one environment variable at build time to choose where leads are sent:

```
PUBLIC_LEADS_ENDPOINT=https://your-endpoint.example.com/leads
```

Any endpoint that accepts a JSON `POST` works (Formspree, a serverless function, a CRM webhook, a Zapier/Make hook).

Without it:

- **`npm run dev`** logs each submission to the browser console (`[lead:preview]`) and shows the success state, so the flows can be tested end to end.
- **A production build** (`npm run build`) prints a warning, and every form shows its **error state with the email fallback** instead of pretending to succeed. No lead is ever silently discarded.
- **Preview builds:** set `PUBLIC_LEADS_PREVIEW=1` at build time to restore the console-only fake success (for demos and QA, never for the live site).

Each payload also carries the page it was sent from, the referrer, the visitor's time zone and a first-party `attribution` object (landing page, referrer and any `utm_*` tags of the visit). Nothing is stored or sent unless a form is submitted. The privacy policy lives at `/privacy` (`src/i18n/privacy.ts`).

## Where things live

| What | Where |
| --- | --- |
| Colors, fonts, spacing, shared component classes | `src/styles/global.css` |
| Company facts, the six units, stats, client logos | `src/data/site.ts` |
| Navigation, footer and shared button copy (EN/ES) | `src/i18n/ui.ts` |
| Home page copy (EN/ES) | `src/i18n/home.ts` |
| Service pages copy (EN/ES) | `src/i18n/units/` |
| Blog posts and copy | `src/content/blog/`, `src/i18n/blog.ts` (see **Blog** below) |
| About / Work / Privacy copy | `src/i18n/about.ts`, `src/i18n/work.ts`, `src/i18n/privacy.ts` |
| Page layouts | `src/views/*.astro` (routes in `src/pages/` are thin wrappers) |
| Interactive widgets | `src/components/widgets/<Name>/` (each has its own `copy.ts`) |
| Logo (vector reconstruction of the brand cube) | `src/components/ui/Logo.astro`, `public/favicon.svg` |
| SEO: sitemap, robots, AI-crawler summary | auto `sitemap-index.xml`, `public/robots.txt`, `/llms.txt` (`src/pages/llms.txt.ts` + `src/data/llms.txt`) |
| Unit explainer videos | `public/video/` (files), `src/data/videos.ts` + `videos.json` (titles, transcripts), `video/` (sources; see **Explainer videos**) |
| Cache headers for Netlify / Cloudflare Pages | `public/_headers` |

## Editing copy

All user-facing text exists in English and Spanish side by side:

```ts
title: { en: 'Straight <em>answers</em>', es: 'Respuestas <em>directas</em>' }
```

`<em>` inside a section title renders a two-tone (grey) accent. The orange gradient accent is reserved for heroes, closing CTA bands and one section per page (pass `accent` to `SectionHeading` / `WidgetSection`). Spanish copy uses neutral Latin-American Spanish with "tú".

## Blog

“Field notes on applied AI” / “Notas de campo sobre IA aplicada”, at `/blog/` and `/es/blog/`.

**Add a post:** write `src/content/blog/en/<en-slug>.md` and its Spanish pair `src/content/blog/es/<es-slug>.md` (plain Markdown, no MDX). Files starting with `_` are ignored (drafts). The two versions are paired by `translationKey` (= the EN slug); a post without its pair still builds, and the EN/ES switch falls back to the other language's blog index.

```yaml
---
title: "What a company brain is (and what it isn't)"   # 20-75 chars, sentence case (the H1)
description: "…"                                         # 110-170 chars (meta description)
dek: "…"                                                 # 40-240 chars (subtitle)
date: 2026-11-02
lang: en                                                 # must match the folder
translationKey: what-is-a-company-brain
unit: brains                                             # brains | consulting | growth | academy | products | partners
tags: ["agents", "knowledge base"]                       # 2-4, lowercase
readingMinutes: 8                                        # ≈ words / 220
takeaways: ["…", "…", "…"]                               # 3-5 → "Key takeaways" box
faq: [{ q: "…", a: "…" }]                                # optional, 2-4 → accordion + FAQPage JSON-LD
featured: true                                           # optional → lead story on the index / home
author: sandbox
---
```

Body: no H1; 1 to 3 intro paragraphs, then `## ` sections (`###` allowed). GFM tables, lists, fenced code blocks (rendered with a Copy button) and callouts written as `> **Example:** …`, `> **Note:** …`, `> **Rule of thumb:** …` (ES: `Ejemplo`, `Nota`, `Regla práctica`). Internal links are root-relative with a trailing slash (`/services/brains/`, `/es/blog/<es-slug>/`, `/#roi`).

**Check before committing:** `node scripts/check-posts.mjs [translationKey]`: 0 errors required; read every warning. The build also validates the frontmatter (`src/content.config.ts`) and fails on an invalid post.

| What | Where |
| --- | --- |
| Schema / helpers (sorting, translations, related posts) | `src/content.config.ts`, `src/lib/blog.ts` |
| Index and post templates | `src/views/Blog.astro`, `src/views/Post.astro`, prose styles in `src/styles/prose.css` |
| Markdown extras (heading anchors, callouts, scrollable tables, code Copy) | `src/lib/markdown/blog-hast.mjs` (registered in `astro.config.mjs`) |
| Generated cover art (seeded by `translationKey`, themed by unit) | `src/lib/cover.ts`, `src/components/blog/PostCover.astro` |
| Per-post OG images (built from the cover, sharp) | `src/pages/og/blog/[key].png.ts` |
| Copy (EN/ES), unit CTAs | `src/i18n/blog.ts` |
| RSS / AI-crawler summary / palette search index | `/rss.xml`, `/es/rss.xml`, `/llms.txt` (base text in `src/data/llms.txt`), `/blog/index.json` |

Posts also appear on the home page (“Field notes”, featured first), on their unit's service page (“Related reading”), in the ⌘K palette and in the sitemap (with hreflang pairs from `translationKey`). `node scripts/shoot-all.mjs` screenshots every post.

## Explainer videos

Each service page has a silent explainer of about a minute, in English and Spanish, right after the hero (`src/components/unit/UnitOverview.astro` → `UnitVideo.astro`). Nothing loads until the visitor presses play; the transcript sits under the player and the page emits a schema.org `VideoObject`.

The videos are code: every scene is a GSAP timeline in `video/scenes/<unit>.js`, rendered frame by frame with Playwright and encoded with ffmpeg (toolkit and rules in `video/README.md`, storyboards in `video/storyboards/`). To change one:

1. Edit `video/scenes/<unit>.js` (the copy check refuses dashes, prices, client names and the banned phrases).
2. Look at frames: `node video/frames.mjs <unit> <en|es> all --scale 0.5` (PNGs in `video/out/frames/`).
3. Render: `node video/render.mjs <unit> en` and `node video/render.mjs <unit> es` (about 6 to 8 minutes each; writes mp4, webm, two posters and a `.json` to `video/out/`, which is not committed).
4. Put it on the site: `node video/site-data.mjs` copies the finals to `public/video/` and rewrites `src/data/videos.json` (title, duration, transcript). Copying the four files by hand also works if the duration and transcript did not change.
5. Bump `VIDEO_UPLOAD_DATE` in `src/data/videos.ts`. `/video/*` is cached for a year, and that date is also the `?v=` cache buster on every media URL.

## House rules

- No prices or fee ranges anywhere on the site. Pricing is discussed in meetings and depends on the market.
- No em dashes (U+2014) or en dashes (U+2013) anywhere in site copy, code comments or meta text: they read as AI-written. Use a period, comma, colon or parentheses; write ranges as "3 to 5" in prose and "3-5" in labels. `scripts/check-posts.mjs` fails a post that contains one.
- Interactive demos are labelled as simulations; numbers in case studies come from real client work only.
- Do not mention client projects or client software by name without written permission.

## Before launch: checklist

- [ ] Set `PUBLIC_LEADS_ENDPOINT` and send a test lead from every form (and make sure `PUBLIC_LEADS_PREVIEW` is **not** set on the live build).
- [ ] Review the privacy policy (`src/i18n/privacy.ts`) with counsel and update its date if it changes.
- [ ] Replace the reconstructed cube logo with the official SVG if available.
- [ ] Confirm company stats in `src/data/site.ts` (15+ years, 200+ projects, 150+ clients).
- [ ] Confirm permission to show each client logo in `public/clients/`.
- [ ] Add real case studies for Brains / Consulting when available.
- [ ] Point the domain and check `https://sandboxinnovate.com/sitemap-index.xml`.
