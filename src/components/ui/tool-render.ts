/**
 * One renderer for tool tiles, shared by ToolBadge.astro, ToolBadge.tsx and SvgToolTile.astro, so a
 * tool looks the same everywhere. Each function returns an <svg> string: it works inline in HTML and
 * nested inside a larger SVG drawing (pass x/y for the latter).
 *
 * - A tool with example brands (CRM -> HubSpot, Salesforce, GoHighLevel) is drawn with its brand
 *   marks: a light "app icon" tile with the logo in the brand colour, or a monogram badge for brands
 *   without a public single-path mark.
 * - Other tools (website, phone, AI, forms) keep the generic tinted line icon.
 */
import { BRANDS, type BrandKey, type BrandMark } from './brand-icons';
import { TOOL_ICONS, TOOL_TINTS, type ToolKey } from './tool-icons';

type Lang = 'en' | 'es';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const r1 = (n: number) => Math.round(n * 10) / 10;
const TILE_BG = '#f6f2ec';

/** Inner markup (no outer <svg>) for one brand mark in a 32x32 box at (ox, oy) with scale k. */
function brandInner(b: BrandMark, ox = 0, oy = 0, k = 1, ring = false): string {
  const s = 32 * k;
  const rx = r1(s * 0.3);
  const ringRect = ring ? `<rect x="${r1(ox - 1.5)}" y="${r1(oy - 1.5)}" width="${r1(s + 3)}" height="${r1(s + 3)}" rx="${r1(rx + 1.5)}" fill="#151312"/>` : '';
  if (b.mono) {
    const fs = b.mono.length > 1 ? 12.5 : 15;
    // In a cluster the left edge of a mark sits under its neighbour: centre the letters in the visible part.
    const cx = ring ? ox + s * 0.6 : ox + s / 2;
    return `${ringRect}<rect x="${r1(ox)}" y="${r1(oy)}" width="${r1(s)}" height="${r1(s)}" rx="${rx}" fill="${b.hex}"/>`
      + `<text x="${r1(cx)}" y="${r1(oy + s / 2)}" dy=".36em" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-weight="700" font-size="${r1(fs * k)}" fill="#fff">${esc(b.mono)}</text>`;
  }
  const inner = 19 * k;
  const off = (s - inner) / 2;
  return `${ringRect}<rect x="${r1(ox)}" y="${r1(oy)}" width="${r1(s)}" height="${r1(s)}" rx="${rx}" fill="${TILE_BG}"/>`
    + `<g transform="translate(${r1(ox + off)} ${r1(oy + off)}) scale(${r1(inner / 24 * 1000) / 1000})"><path d="${b.path}" fill="${b.hex}"/></g>`;
}

function genericInner(tool: ToolKey, size = 32): string {
  const t = TOOL_ICONS[tool];
  const [bg, fg] = TOOL_TINTS[t.tint];
  const pad = size * 0.21;
  return `<rect width="${size}" height="${size}" rx="${r1(size * 0.3)}" fill="#1b1817"/>`
    + `<rect width="${size}" height="${size}" rx="${r1(size * 0.3)}" fill="${bg}" stroke="rgb(255 255 255 / .08)"/>`
    + `<svg x="${r1(pad)}" y="${r1(pad)}" width="${r1(size - pad * 2)}" height="${r1(size - pad * 2)}" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${t.paths}</svg>`;
}

export function brandsFor(tool: ToolKey): BrandKey[] {
  return (TOOL_ICONS[tool].brands ?? []) as BrandKey[];
}

/** Names of the example brands, e.g. "HubSpot, Salesforce, GoHighLevel". */
export function brandNames(tool: ToolKey): string {
  return brandsFor(tool).map((b) => (BRANDS[b] as BrandMark).title).join(', ');
}

interface TileOpts { size?: number; x?: number; y?: number; brand?: BrandKey; generic?: boolean; label?: string; lang?: Lang }

/** A single square tile: the tool's main brand, a given brand, or the generic icon. */
export function tileSVG(tool: ToolKey, o: TileOpts = {}): string {
  const size = o.size ?? 28;
  const brand = o.generic ? undefined : (o.brand ?? brandsFor(tool)[0]);
  const pos = o.x != null ? ` x="${r1(o.x)}" y="${r1(o.y ?? 0)}"` : '';
  const a11y = o.label ? ` role="img" aria-label="${esc(o.label)}"` : ' aria-hidden="true"';
  const body = brand ? brandInner(BRANDS[brand] as BrandMark) : genericInner(tool);
  return `<svg${pos} width="${size}" height="${size}" viewBox="0 0 32 32"${a11y} style="flex:none;display:block">${body}</svg>`;
}

/**
 * Up to three overlapping brand marks for the tool (or the generic tile when it has no brands).
 * Returns the svg and its rendered width so callers can lay it out.
 */
export function clusterSVG(tool: ToolKey, o: TileOpts & { max?: number } = {}): { svg: string; width: number } {
  const size = o.size ?? 28;
  const list = o.generic ? [] : brandsFor(tool).slice(0, o.max ?? 3);
  if (list.length <= 1) return { svg: tileSVG(tool, o), width: size };
  const step = 25; // marks are 32 units wide and overlap by 7
  const vbW = 32 + step * (list.length - 1) + 3;
  const width = r1((size * vbW) / 35);
  // Draw from the last to the first so the main brand sits on top.
  const parts = list.map((b, i) => brandInner(BRANDS[b] as BrandMark, 1.5 + i * step, 1.5, 1, true)).reverse();
  const a11y = o.label ? ` role="img" aria-label="${esc(o.label)}"` : ' aria-hidden="true"';
  const pos = o.x != null ? ` x="${r1(o.x)}" y="${r1(o.y ?? 0)}"` : '';
  return { svg: `<svg${pos} width="${width}" height="${size}" viewBox="0 0 ${vbW} 35"${a11y} style="flex:none;display:block">${parts.join('')}</svg>`, width };
}
