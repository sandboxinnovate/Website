# Sandbox — website

Marketing site for Sandbox (sandboxinnovate.com): AI systems, consulting, growth, academy, products and partners.
Bilingual (English at `/`, Spanish at `/es/`), static, fast, and built to be edited by a small team.

## Stack

- **Astro 7** — static pages, zero JavaScript by default.
- **React 19 islands** — only the interactive widgets ship JS, and most hydrate when scrolled into view.
- **Tailwind CSS v4** — design tokens live in `src/styles/global.css` (`@theme`).
- Fonts are self-hosted: **Unbounded** (display), **Satoshi** (body, from Fontshare — free for commercial use), **JetBrains Mono** (system labels).
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
| About / Work / Privacy copy | `src/i18n/about.ts`, `src/i18n/work.ts`, `src/i18n/privacy.ts` |
| Page layouts | `src/views/*.astro` (routes in `src/pages/` are thin wrappers) |
| Interactive widgets | `src/components/widgets/<Name>/` (each has its own `copy.ts`) |
| Logo (vector reconstruction of the brand cube) | `src/components/ui/Logo.astro`, `public/favicon.svg` |
| SEO: sitemap, robots, AI-crawler summary | auto `sitemap-index.xml`, `public/robots.txt`, `public/llms.txt` |
| Cache headers for Netlify / Cloudflare Pages | `public/_headers` |

## Editing copy

All user-facing text exists in English and Spanish side by side:

```ts
title: { en: 'Straight <em>answers</em>', es: 'Respuestas <em>directas</em>' }
```

`<em>` inside a section title renders a two-tone (grey) accent. The orange gradient accent is reserved for heroes, closing CTA bands and one section per page (pass `accent` to `SectionHeading` / `WidgetSection`). Spanish copy uses neutral Latin-American Spanish with "tú".

## House rules

- No prices or fee ranges anywhere on the site — pricing is discussed in meetings and depends on the market.
- Interactive demos are labelled as simulations; numbers in case studies come from real client work only.
- Do not mention client projects or client software by name without written permission.

## Before launch — checklist

- [ ] Set `PUBLIC_LEADS_ENDPOINT` and send a test lead from every form (and make sure `PUBLIC_LEADS_PREVIEW` is **not** set on the live build).
- [ ] Review the privacy policy (`src/i18n/privacy.ts`) with counsel and update its date if it changes.
- [ ] Replace the reconstructed cube logo with the official SVG if available.
- [ ] Confirm company stats in `src/data/site.ts` (15+ years, 200+ projects, 150+ clients).
- [ ] Confirm permission to show each client logo in `public/clients/`.
- [ ] Add real case studies for Brains / Consulting when available.
- [ ] Point the domain and check `https://sandboxinnovate.com/sitemap-index.xml`.
