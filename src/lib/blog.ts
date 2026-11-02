/**
 * Blog helpers ("Field notes on applied AI").
 * Posts live in src/content/blog/{en,es}/<slug>.md; see src/content.config.ts for the schema.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { localize, type Lang } from '@/i18n';
import { UNITS, type UnitMeta, type UnitSlug } from '@/data/site';

export type Post = CollectionEntry<'blog'>;

/** "en/what-is-a-company-brain" -> "what-is-a-company-brain" */
export const postSlug = (p: Post): string => p.id.slice(p.id.indexOf('/') + 1);
/** The language comes from the folder, which is the source of truth for the URL. */
export const postLang = (p: Post): Lang => (p.id.startsWith('es/') ? 'es' : 'en');
/** Root-relative URL with a trailing slash: /blog/<slug>/ or /es/blog/<slug>/ */
export const postHref = (p: Post): string => localize(postLang(p), `/blog/${postSlug(p)}/`);
export const blogIndexHref = (lang: Lang): string => localize(lang, '/blog/');
export const rssHref = (lang: Lang): string => localize(lang, '/rss.xml');

export const unitOf = (p: Post): UnitMeta => UNITS.find((u) => u.slug === p.data.unit)!;

let cached: Promise<Post[]> | null = null;
const warned = new Set<string>();
const warnOnce = (msg: string) => {
  if (warned.has(msg)) return;
  warned.add(msg);
  console.warn(`[blog] ${msg}`);
};

/** Every valid post in both languages. Posts whose `lang` contradicts their folder are skipped (with a warning). */
export function allPosts(): Promise<Post[]> {
  // Cache only in production builds; in dev the collection changes as files are edited.
  if (cached && import.meta.env.PROD) return cached;
  const p = getCollection('blog').then((all) =>
    all.filter((post) => {
      if (post.data.lang !== postLang(post)) {
        warnOnce(`${post.id}: frontmatter lang "${post.data.lang}" does not match its folder; skipped.`);
        return false;
      }
      if (postLang(post) === 'en' && post.data.translationKey !== postSlug(post)) {
        warnOnce(`${post.id}: translationKey "${post.data.translationKey}" should equal the EN slug.`);
      }
      return true;
    }),
  );
  cached = p;
  return p;
}

const time = (p: Post) => p.data.date.getTime();
const byTitle = (lang: Lang) => (a: Post, b: Post) => a.data.title.localeCompare(b.data.title, lang);

/** Newest first, then by title. */
export function sortPosts(posts: Post[], lang: Lang, { featuredFirst = false } = {}): Post[] {
  return [...posts].sort(
    (a, b) =>
      (featuredFirst ? Number(b.data.featured) - Number(a.data.featured) : 0) ||
      time(b) - time(a) ||
      byTitle(lang)(a, b),
  );
}

/** Posts of one language. `featuredFirst` puts featured posts on top (index lead story, home section). */
export async function getPosts(lang: Lang, opts: { featuredFirst?: boolean } = {}): Promise<Post[]> {
  const all = await allPosts();
  return sortPosts(all.filter((p) => postLang(p) === lang), lang, opts);
}

/** The same post in the other language, if it exists. */
export async function findTranslation(post: Post): Promise<Post | undefined> {
  const all = await allPosts();
  return all.find((p) => postLang(p) !== postLang(post) && p.data.translationKey === post.data.translationKey);
}

/** Related posts: same unit first, then shared tags, then newest. */
export async function relatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const lang = postLang(post);
  const tags = new Set(post.data.tags.map((t) => t.toLowerCase()));
  const pool = (await getPosts(lang)).filter((p) => p.id !== post.id);
  const score = (p: Post) =>
    (p.data.unit === post.data.unit ? 100 : 0) + p.data.tags.filter((t) => tags.has(t.toLowerCase())).length * 10;
  return [...pool]
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Posts of one unit (unit pages: "Related reading"). Featured first. */
export async function postsByUnit(lang: Lang, unit: UnitSlug, limit = 3): Promise<Post[]> {
  return (await getPosts(lang, { featuredFirst: true })).filter((p) => p.data.unit === unit).slice(0, limit);
}

/** Word count of a Markdown body (same rule as scripts/check-posts.mjs). */
export const countWords = (md = ''): number => md.replace(/[#>*_`|\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

/** Reading time in minutes: frontmatter first, otherwise ≈ words / 220. */
export const readingMinutes = (p: Post): number =>
  Number.isInteger(p.data.readingMinutes) && p.data.readingMinutes > 0
    ? p.data.readingMinutes
    : Math.max(1, Math.round(countWords(p.body) / 220));

/** Dates are calendar dates (YAML parses them as UTC midnight): always format in UTC. */
export function formatDate(d: Date, lang: Lang, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-419' : 'en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  }).format(d);
}
export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
