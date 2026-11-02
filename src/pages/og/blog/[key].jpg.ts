/**
 * Per-post Open Graph image (1200×630 JPEG), built from the post's cover photo (src/data/blog-covers.ts):
 * cropped around its focal point and given the same brand grade as PostCover.astro (slight desaturation,
 * warm flame wash, bottom vignette) plus the brand mark. Text-free on purpose: social cards show the title.
 * One image per translationKey (shared by EN and ES). Posts without a cover use /og/default.png (src/lib/og.ts);
 * if sharp fails here, the default image is served instead so the build never breaks.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { allPosts } from '@/lib/blog';
import { coverFor } from '@/data/blog-covers';

const W = 1200;
const H = 630;

export async function getStaticPaths() {
  const keys = new Set<string>();
  for (const p of await allPosts()) if (coverFor(p.data.translationKey)) keys.add(p.data.translationKey);
  return [...keys].map((key) => ({ params: { key } }));
}

const CUBE = 'M50 6L88.11 28L88.11 72L50 94L11.89 72L11.89 28ZM50 44.28L78.2 28L65.62 20.74L50 25.36L34.38 20.74L21.8 28ZM47.14 54.07L16.85 36.58L16.85 49.78L32.09 58.58L32.09 77.94L47.14 86.63ZM52.86 54.07L83.15 36.58L83.15 49.78L67.91 58.58L67.91 77.94L52.86 86.63Z';

/** Same layers as .pcv__grade in PostCover.astro (minus the soft-light wash, applied separately). */
const OVERLAY = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
<linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#0a0908" stop-opacity="0"/><stop offset="1" stop-color="#0a0908" stop-opacity=".6"/></linearGradient>
<radialGradient id="e" cx=".5" cy=".4" r=".75"><stop offset=".6" stop-color="#0a0908" stop-opacity="0"/><stop offset="1" stop-color="#0a0908" stop-opacity=".45"/></radialGradient>
<linearGradient id="w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d65805" stop-opacity=".1"/><stop offset=".55" stop-color="#f58327" stop-opacity=".03"/><stop offset="1" stop-color="#140e0a" stop-opacity=".12"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#w)"/><rect width="${W}" height="${H}" fill="url(#e)"/><rect width="${W}" height="${H}" fill="url(#v)"/>
<g transform="translate(60 528) scale(0.66)"><path fill="#f58327" fill-rule="evenodd" d="${CUBE}"/></g>
</svg>`;

const pct = (s: string | undefined, fallback: number) => {
  const n = Number.parseFloat(s ?? '');
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) / 100 : fallback;
};

export async function GET({ params }: { params: { key: string } }) {
  const cover = coverFor(params.key)!;
  try {
    const { default: sharp } = await import('sharp');
    const src = path.join(process.cwd(), 'src/assets/blog', `${params.key}.jpg`);
    const { width: sw = W, height: sh = H } = await sharp(src).metadata();
    // Scale to cover 1200×630, then crop around the focal point (like CSS object-position).
    const scale = Math.max(W / sw, H / sh);
    const rw = Math.round(sw * scale);
    const rh = Math.round(sh * scale);
    const [fx, fy] = cover.focal.split(/\s+/);
    const left = Math.round((rw - W) * pct(fx, 0.5));
    const top = Math.round((rh - H) * pct(fy, 0.5));
    const graded = await sharp(src)
      .resize(rw, rh)
      .extract({ left, top, width: W, height: H })
      .modulate({ saturation: 0.86, brightness: 0.9 * (cover.exposure ?? 1) })
      .linear(1.04, -5.1)
      .toBuffer();
    const jpg = await sharp(graded)
      .composite([
        { input: { create: { width: W, height: H, channels: 4, background: { r: 245, g: 131, b: 39, alpha: 0.12 } } }, blend: 'soft-light' },
        { input: Buffer.from(OVERLAY), blend: 'over' },
      ])
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer();
    return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
  } catch (err) {
    console.warn(`[og] ${params.key}: could not build the OG image (${(err as Error).message}); using the default.`);
    const fallback = await fs.readFile(path.join(process.cwd(), 'public/og/default.png'));
    return new Response(new Uint8Array(fallback), { headers: { 'Content-Type': 'image/png' } });
  }
}
