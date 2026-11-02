/** RSS 2.0 for the blog (src/pages/rss.xml.ts, src/pages/es/rss.xml.ts). No dependency needed. */
import { BLOG } from '@/i18n/blog';
import { SITE } from '@/data/site';
import type { Lang } from '@/i18n';
import { blogIndexHref, getPosts, postHref, rssHref, unitOf } from './blog';

const x = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function rssResponse(lang: Lang): Promise<Response> {
  const posts = await getPosts(lang);
  const abs = (p: string) => new URL(p, SITE.url).href;
  const items = posts
    .map((p) => {
      const url = abs(postHref(p));
      return `    <item>
      <title>${x(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${x(p.data.description)}</description>
      <category>${x(unitOf(p).name[lang])}</category>
${p.data.tags.map((t) => `      <category>${x(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');
  const latest = posts.length ? new Date(Math.max(...posts.map((p) => p.data.date.getTime()))) : new Date(0);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(`${BLOG.name[lang]} — Sandbox`)}</title>
    <link>${abs(blogIndexHref(lang))}</link>
    <atom:link href="${abs(rssHref(lang))}" rel="self" type="application/rss+xml" />
    <description>${x(BLOG.seo.description[lang])}</description>
    <language>${lang === 'es' ? 'es' : 'en-us'}</language>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
