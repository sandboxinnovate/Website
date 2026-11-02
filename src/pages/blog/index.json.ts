/** Search index for the command palette (both languages). Fetched lazily when the palette opens. */
import { allPosts, postHref, postLang, unitOf } from '@/lib/blog';

export async function GET() {
  const posts = (await allPosts()).map((p) => ({
    lang: postLang(p),
    href: postHref(p),
    title: p.data.title,
    dek: p.data.dek,
    unit: unitOf(p).slug,
    tags: p.data.tags,
  }));
  return new Response(JSON.stringify({ posts }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
