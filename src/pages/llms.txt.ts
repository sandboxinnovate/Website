/**
 * /llms.txt: the AI-crawler summary. The hand-written part lives in src/data/llms.txt;
 * the blog section is generated from the posts (English first, then Spanish).
 */
import base from '@/data/llms.txt?raw';
import { BLOG } from '@/i18n/blog';
import { SITE } from '@/data/site';
import { getPosts, postHref, unitOf } from '@/lib/blog';

export async function GET() {
  const section = async (lang: 'en' | 'es') =>
    (await getPosts(lang))
      .map((p) => `- [${p.data.title}](${new URL(postHref(p), SITE.url).href}): ${p.data.description} (${unitOf(p).name.en})`)
      .join('\n');
  const [en, es] = await Promise.all([section('en'), section('es')]);
  const blog = `## Blog: ${BLOG.name.en}

Practical articles by Sandbox. English index: ${SITE.url}/blog/ · RSS: ${SITE.url}/rss.xml

${en || '- (no articles yet)'}

### En español: ${BLOG.name.es}

Índice: ${SITE.url}/es/blog/ · RSS: ${SITE.url}/es/rss.xml

${es || '- (todavía no hay artículos)'}
`;
  // Insert the blog section before "## Languages" (keeps the original order of the hand-written part).
  const marker = '\n## Languages';
  const text = base.includes(marker) ? base.replace(marker, `\n${blog}${marker}`) : `${base.trimEnd()}\n\n${blog}`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
