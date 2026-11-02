/**
 * Per-post Open Graph image (1200×630), generated at build time from the post's cover art
 * (src/lib/cover.ts) and rasterized with sharp. Text-free on purpose: system fonts differ between
 * build machines, and social cards show the title next to the image anyway.
 * If sharp is not available, the site default image is served instead, so the build never breaks.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { allPosts } from '@/lib/blog';
import { coverSvgDocument } from '@/lib/cover';
import type { UnitSlug } from '@/data/site';

export async function getStaticPaths() {
  const seen = new Map<string, UnitSlug>();
  for (const p of await allPosts()) seen.set(p.data.translationKey, p.data.unit);
  return [...seen].map(([key, unit]) => ({ params: { key }, props: { unit } }));
}

const CUBE = 'M50 6L88.11 28L88.11 72L50 94L11.89 72L11.89 28ZM50 44.28L78.2 28L65.62 20.74L50 25.36L34.38 20.74L21.8 28ZM47.14 54.07L16.85 36.58L16.85 49.78L32.09 58.58L32.09 77.94L47.14 86.63ZM52.86 54.07L83.15 36.58L83.15 49.78L67.91 58.58L67.91 77.94L52.86 86.63Z';

export async function GET({ params, props }: { params: { key: string }; props: { unit: UnitSlug } }) {
  const art = coverSvgDocument({ seed: params.key, unit: props.unit })
    .replace(/<text[\s\S]*?<\/text>/g, '')
    // brand mark, bottom-left, over a soft vignette
    .replace(
      /<\/svg>$/,
      `<rect y="535" width="1200" height="140" fill="url(#ogv)"/><defs><linearGradient id="ogv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0a0a" stop-opacity="0"/><stop offset="1" stop-color="#0a0a0a" stop-opacity=".85"/></linearGradient></defs>` +
        `<g transform="translate(64 560) scale(0.62)"><path fill="#f58327" fill-rule="evenodd" d="${CUBE}"/></g></svg>`,
    );
  try {
    const { default: sharp } = await import('sharp');
    const png = await sharp(Buffer.from(art)).png({ compressionLevel: 9 }).toBuffer();
    return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
  } catch {
    const fallback = await fs.readFile(path.join(process.cwd(), 'public/og/default.png'));
    return new Response(new Uint8Array(fallback), { headers: { 'Content-Type': 'image/png' } });
  }
}
