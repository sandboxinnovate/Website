/**
 * Generated cover art for blog posts: a deterministic SVG seeded by the post's translationKey
 * (so the EN and ES versions share one cover) and themed by its unit, echoing the unit
 * micro-visuals of the home page (src/components/home/UnitsBento.astro):
 *
 *   brains → node graph · consulting → roadmap bars · growth → rising curve
 *   academy → stacked bars · products → cubes · partners → connection line
 *
 * Returns SVG markup for a 1200×675 viewBox. Colours are literal values (no CSS variables)
 * so the same markup can be rasterized at build time. No text here except short, language-neutral
 * system labels; titles and unit names are rendered in HTML by PostCover.astro.
 */
import type { UnitSlug } from '@/data/site';

export const COVER_W = 1200;
export const COVER_H = 675;

const FLAME = '#f58327';
const FLAME_LIGHT = '#ff8442';
const AMBER = '#fca800';
const DEEP = '#d65805';
const INK = '#111010';
const INK_2 = '#161414';
const LINE = 'rgba(255,255,255,0.12)';
const LINE_SOFT = 'rgba(255,255,255,0.06)';
const SMOKE = '#968d87';

/** FNV-1a 32-bit. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32: small, fast, deterministic. */
function rng(seed: number) {
  let a = seed;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    range: (min: number, max: number) => min + next() * (max - min),
    int: (min: number, max: number) => Math.floor(min + next() * (max - min + 1)),
    pick: <T,>(arr: readonly T[]): T => arr[Math.floor(next() * arr.length)],
    shuffle: <T,>(arr: readonly T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}
type Rng = ReturnType<typeof rng>;

const r1 = (n: number) => Math.round(n * 10) / 10;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const MONO = `font-family="'JetBrains Mono Variable','JetBrains Mono',ui-monospace,monospace"`;
const label = (x: number, y: number, s: string, opts: { size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end' } = {}) =>
  `<text class="cv-label" x="${r1(x)}" y="${r1(y)}" ${MONO} font-size="${opts.size ?? 15}" letter-spacing="1" fill="${opts.fill ?? SMOKE}" text-anchor="${opts.anchor ?? 'start'}">${esc(s)}</text>`;

/* ------------------------------------------------------------------ motifs */

function brains(r: Rng, id: string): string {
  const cx = r1(600 + r.range(-60, 60));
  const cy = r1(338 + r.range(-24, 24));
  const n = r.int(7, 10);
  const names = r.shuffle(['kb', 'crm', 'inbox', 'docs', 'calendar', 'tickets', 'reports', 'web', 'chat', 'erp', 'drive', 'forms', 'sheets', 'ads']);
  const start = r.range(0, Math.PI * 2);
  const nodes = Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2 + r.range(-0.22, 0.22);
    const rad = r.range(0.62, 1);
    return { x: r1(cx + Math.cos(a) * 360 * rad), y: r1(cy + Math.sin(a) * 230 * rad), a, name: names[i % names.length] };
  });
  const hot = new Set(r.shuffle(nodes.map((_, i) => i)).slice(0, r.int(2, 3)));
  let out = '';
  // ring links
  nodes.forEach((p, i) => {
    const q = nodes[(i + 1) % n];
    if (r.next() < 0.55) out += `<path d="M${p.x} ${p.y} L${q.x} ${q.y}" stroke="${LINE_SOFT}" stroke-width="1.2" stroke-dasharray="4 6" fill="none"/>`;
  });
  // satellites
  const sats = nodes.filter(() => r.next() < 0.4).map((p) => {
    const d = r.range(70, 120);
    return { from: p, x: r1(p.x + Math.cos(p.a) * d), y: r1(p.y + Math.sin(p.a) * d * 0.7) };
  });
  sats.forEach((s) => (out += `<path d="M${s.from.x} ${s.from.y} L${s.x} ${s.y}" stroke="${LINE}" stroke-width="1" fill="none"/>`));
  // spokes
  nodes.forEach((p, i) => {
    out += `<path d="M${cx} ${cy} L${p.x} ${p.y}" stroke="${hot.has(i) ? `url(#${id}-hot)` : LINE}" stroke-width="${hot.has(i) ? 2.4 : 1.2}" fill="none" stroke-linecap="round"/>`;
  });
  // core rings
  out += `<circle cx="${cx}" cy="${cy}" r="92" fill="none" stroke="rgba(245,131,39,0.18)" stroke-width="1" stroke-dasharray="2 7"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="44" fill="rgba(245,131,39,0.12)" stroke="rgba(245,131,39,0.45)" stroke-width="1.2"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="16" fill="${FLAME}"/>`;
  // nodes + labels
  sats.forEach((s) => (out += `<circle cx="${s.x}" cy="${s.y}" r="4" fill="${INK}" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>`));
  nodes.forEach((p, i) => {
    const h = hot.has(i);
    out += `<circle cx="${p.x}" cy="${p.y}" r="${h ? 8 : 7}" fill="${h ? FLAME_LIGHT : INK}" stroke="${h ? FLAME_LIGHT : 'rgba(255,255,255,0.5)'}" stroke-width="1.4"/>`;
    const right = Math.cos(p.a) >= 0;
    out += label(p.x + (right ? 16 : -16), p.y + 5, p.name, { anchor: right ? 'start' : 'end', fill: h ? FLAME_LIGHT : SMOKE });
  });
  return out;
}

function consulting(r: Rng, id: string): string {
  const rows = r.int(4, 6);
  const x0 = 250;
  const x1 = 1000;
  const top = 170;
  const gap = Math.min(86, 380 / (rows - 1));
  const weeks = 8;
  const wk = (x1 - x0) / weeks;
  let out = '';
  // week columns
  for (let w = 0; w <= weeks; w++) {
    const x = r1(x0 + w * wk);
    out += `<path d="M${x} ${top - 46} L${x} ${top + gap * (rows - 1) + 40}" stroke="${LINE_SOFT}" stroke-width="1" fill="none"/>`;
    if (w < weeks) out += label(x + 8, top - 54, `W${w + 1}`, { size: 13 });
  }
  let cursor = r.range(0, 0.6);
  for (let k = 0; k < rows; k++) {
    const y = r1(top + k * gap);
    const len = r.range(1.6, 3.2);
    const s = Math.min(cursor, weeks - len);
    const bx = r1(x0 + s * wk);
    const bw = r1(len * wk);
    const last = k === rows - 1;
    out += `<rect x="${x0}" y="${y - 10}" width="${x1 - x0}" height="20" rx="10" fill="rgba(255,255,255,0.035)"/>`;
    out += last
      ? `<rect x="${bx}" y="${y - 10}" width="${bw}" height="20" rx="10" fill="url(#${id}-dash)" stroke="rgba(245,131,39,0.55)" stroke-width="1.2"/>`
      : `<rect x="${bx}" y="${y - 10}" width="${bw}" height="20" rx="10" fill="url(#${id}-bar)"/>`;
    if (r.next() < 0.5 && !last) {
      const mx = r1(bx + bw + 22);
      if (mx < x1 - 10) out += `<path d="M${mx} ${y - 8} L${mx + 8} ${y} L${mx} ${y + 8} L${mx - 8} ${y} Z" fill="none" stroke="${FLAME_LIGHT}" stroke-width="1.4"/>`;
    }
    out += label(x0 - 22, y + 5, String(k + 1).padStart(2, '0'), { anchor: 'end', size: 13 });
    cursor = s + len * r.range(0.45, 0.85);
  }
  const today = r1(x0 + r.range(2.2, 4.8) * wk);
  const bottom = top + gap * (rows - 1) + 40;
  out += `<path d="M${today} ${top - 30} L${today} ${bottom}" stroke="${FLAME_LIGHT}" stroke-width="1.4" stroke-dasharray="3 5" fill="none"/>`;
  out += `<circle cx="${today}" cy="${top - 30}" r="5" fill="${FLAME_LIGHT}"/>`;
  return out;
}

function growth(r: Rng, id: string): string {
  const x0 = 200;
  const x1 = 1000;
  const yb = 540;
  const n = r.int(6, 8);
  const pts: [number, number][] = [];
  let y = yb - r.range(10, 40);
  for (let i = 0; i < n; i++) {
    const x = x0 + (i / (n - 1)) * (x1 - x0);
    const t = i / (n - 1);
    const target = yb - (40 + Math.pow(t, 1.6) * 360);
    y = i === 0 ? y : Math.min(y - 4, target + r.range(-30, 30));
    pts.push([r1(x), r1(Math.max(140, y))]);
  }
  const smooth = (p: [number, number][]) => {
    let d = `M${p[0][0]} ${p[0][1]}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] ?? p[i];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2] ?? p2;
      const c1 = [r1(p1[0] + (p2[0] - p0[0]) / 6), r1(p1[1] + (p2[1] - p0[1]) / 6)];
      const c2 = [r1(p2[0] - (p3[0] - p1[0]) / 6), r1(p2[1] - (p3[1] - p1[1]) / 6)];
      d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
    }
    return d;
  };
  const line = smooth(pts);
  const base = pts.map(([x, yy], i) => [x, r1(yb - (yb - yy) * r.range(0.32, 0.5) - i * 2)] as [number, number]);
  let out = '';
  for (let g = 0; g < 5; g++) {
    const gy = r1(yb - g * 90);
    out += `<path d="M${x0} ${gy} L${x1} ${gy}" stroke="${g === 0 ? LINE : LINE_SOFT}" stroke-width="1" stroke-dasharray="${g === 0 ? '0' : '2 6'}" fill="none"/>`;
  }
  out += `<path d="${smooth(base)}" stroke="rgba(255,255,255,0.28)" stroke-width="1.6" stroke-dasharray="5 7" fill="none"/>`;
  out += `<path d="${line} L${x1} ${yb} L${x0} ${yb} Z" fill="url(#${id}-area)"/>`;
  out += `<path d="${line}" stroke="url(#${id}-hot)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  pts.forEach(([x, yy], i) => {
    if (i === 0 || i === pts.length - 1 || r.next() < 0.4) out += `<circle cx="${x}" cy="${yy}" r="${i === pts.length - 1 ? 7 : 4.5}" fill="${i === pts.length - 1 ? FLAME_LIGHT : INK}" stroke="${FLAME_LIGHT}" stroke-width="1.6"/>`;
  });
  const [ex, ey] = pts[pts.length - 1];
  const cw = 150;
  const chx = r1(Math.min(ex - cw / 2, x1 - cw + 30));
  const chy = r1(ey - 72);
  out += `<rect x="${chx}" y="${chy}" width="${cw}" height="40" rx="20" fill="rgba(245,131,39,0.14)" stroke="rgba(245,131,39,0.55)" stroke-width="1.2"/>`;
  out += label(chx + 18, chy + 26, '[1]', { fill: FLAME_LIGHT, size: 15 });
  out += label(chx + 58, chy + 26, 'source', { fill: '#f4efe9', size: 15 });
  return out;
}

function academy(r: Rng, id: string): string {
  const cols = r.int(6, 8);
  const x0 = 260;
  const x1 = 940;
  const yb = 545;
  const cw = (x1 - x0) / cols;
  const bw = r1(cw * 0.62);
  const bh = 44;
  const gap = 10;
  let out = `<path d="M${x0 - 30} ${yb + 14} L${x1 + 10} ${yb + 14}" stroke="${LINE}" stroke-width="1" fill="none"/>`;
  for (let c = 0; c < cols; c++) {
    const t = c / (cols - 1);
    const stack = Math.max(1, Math.min(7, Math.round(1 + t * 5 + r.range(-0.8, 0.8))));
    const bx = r1(x0 + c * cw + (cw - bw) / 2);
    for (let s = 0; s < stack; s++) {
      const by = r1(yb - (s + 1) * bh - s * gap + bh);
      const topBlock = s === stack - 1;
      const hot = topBlock && (c === cols - 1 || r.next() < 0.3);
      out += hot
        ? `<rect x="${bx}" y="${by - bh}" width="${bw}" height="${bh}" rx="8" fill="url(#${id}-bar)"/>`
        : `<rect x="${bx}" y="${by - bh}" width="${bw}" height="${bh}" rx="8" fill="rgba(255,255,255,${r1(0.03 + s * 0.012)})" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>`;
    }
    out += label(bx + bw / 2, yb + 44, String(c + 1).padStart(2, '0'), { anchor: 'middle', size: 13 });
  }
  // progress trace over the tops
  return out;
}

function products(r: Rng, id: string): string {
  const s = 74; // cube half-width
  const h = s * 0.58; // iso half-height of the top face
  const iso = (gx: number, gy: number, gz: number) => ({ x: 600 + (gx - gy) * s, y: 420 + (gx + gy) * h - gz * s * 1.12 });
  const cube = (gx: number, gy: number, gz: number, hot: boolean) => {
    const { x, y } = iso(gx, gy, gz);
    const d = s * 1.12;
    const top = `M${r1(x)} ${r1(y - h)} L${r1(x + s)} ${r1(y)} L${r1(x)} ${r1(y + h)} L${r1(x - s)} ${r1(y)} Z`;
    const left = `M${r1(x - s)} ${r1(y)} L${r1(x)} ${r1(y + h)} L${r1(x)} ${r1(y + h + d)} L${r1(x - s)} ${r1(y + d)} Z`;
    const right = `M${r1(x + s)} ${r1(y)} L${r1(x)} ${r1(y + h)} L${r1(x)} ${r1(y + h + d)} L${r1(x + s)} ${r1(y + d)} Z`;
    const stroke = hot ? FLAME_LIGHT : 'rgba(255,255,255,0.32)';
    return (
      `<path d="${left}" fill="${hot ? 'rgba(214,88,5,0.55)' : INK_2}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="${right}" fill="${hot ? 'rgba(245,131,39,0.38)' : '#1c1919'}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="${top}" fill="${hot ? `url(#${id}-top)` : '#242020'}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>`
    );
  };
  // iso floor grid
  let out = '';
  for (let i = -3; i <= 3; i++) {
    const a = iso(i, -3, 0);
    const b = iso(i, 3, 0);
    const c = iso(-3, i, 0);
    const d = iso(3, i, 0);
    out += `<path d="M${r1(a.x)} ${r1(a.y + s * 1.12 + h)} L${r1(b.x)} ${r1(b.y + s * 1.12 + h)}" stroke="${LINE_SOFT}" stroke-width="1" fill="none"/>`;
    out += `<path d="M${r1(c.x)} ${r1(c.y + s * 1.12 + h)} L${r1(d.x)} ${r1(d.y + s * 1.12 + h)}" stroke="${LINE_SOFT}" stroke-width="1" fill="none"/>`;
  }
  // a small seeded arrangement on a 3x3 footprint
  const cells: { gx: number; gy: number; gz: number }[] = [];
  const footprint = r.shuffle([[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1]]).slice(0, r.int(3, 5));
  footprint.forEach(([gx, gy], i) => {
    cells.push({ gx, gy, gz: 0 });
    if (i < 2 && r.next() < 0.7) cells.push({ gx, gy, gz: 1 });
  });
  if (!cells.some((c) => c.gx === 0 && c.gy === 0)) cells.push({ gx: 0, gy: 0, gz: 0 });
  const hotIdx = cells.reduce((best, c, i, arr) => (c.gz > arr[best].gz || (c.gz === arr[best].gz && c.gx + c.gy > arr[best].gx + arr[best].gy) ? i : best), 0);
  const order = cells.map((c, i) => ({ ...c, i })).sort((a, b) => a.gx + a.gy - (b.gx + b.gy) || a.gz - b.gz);
  order.forEach((c) => (out += cube(c.gx, c.gy, c.gz, c.i === hotIdx)));
  // floating "next" cube outline
  const f = iso(r.pick([2, -2]), r.pick([-1, 0]), 2.1);
  out += `<path d="M${r1(f.x)} ${r1(f.y - h * 0.6)} L${r1(f.x + s * 0.6)} ${r1(f.y)} L${r1(f.x)} ${r1(f.y + h * 0.6)} L${r1(f.x - s * 0.6)} ${r1(f.y)} Z" fill="none" stroke="rgba(245,131,39,0.6)" stroke-width="1.2" stroke-dasharray="4 5"/>`;
  return out;
}

function partners(r: Rng, id: string): string {
  const ay = r1(338 + r.range(-30, 30));
  const ax = 380;
  const bx = 820;
  const clients = r.int(3, 5);
  let out = '';
  // clients fan out from the agency node
  for (let i = 0; i < clients; i++) {
    const y = r1(150 + (i / (clients - 1)) * 375 + r.range(-12, 12));
    const x = r1(170 + r.range(-10, 20));
    out += `<path d="M${x + 26} ${y} C${x + 110} ${y} ${ax - 140} ${ay} ${ax - 84} ${ay}" stroke="${LINE}" stroke-width="1.2" fill="none"/>`;
    out += `<rect x="${x - 26}" y="${y - 18}" width="52" height="36" rx="10" fill="${INK}" stroke="rgba(255,255,255,0.28)" stroke-width="1.2"/>`;
    out += `<circle cx="${x - 8}" cy="${y}" r="3" fill="${SMOKE}"/><path d="M${x + 1} ${y} L${x + 12} ${y}" stroke="${SMOKE}" stroke-width="2" stroke-linecap="round"/>`;
  }
  // the wire
  const midY = r1(ay + r.range(-50, 50));
  const wire = `M${ax + 84} ${ay} C${ax + 200} ${ay} ${bx - 220} ${midY} ${bx - 96} ${midY}`;
  out += `<path d="${wire}" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-dasharray="5 7" fill="none"/>`;
  out += `<path d="${wire}" stroke="url(#${id}-hot)" stroke-width="2.6" stroke-dasharray="80 1000" stroke-dashoffset="${-r.int(40, 220)}" fill="none" stroke-linecap="round"/>`;
  // nodes
  out += `<rect x="${ax - 84}" y="${ay - 40}" width="168" height="80" rx="18" fill="${INK_2}" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>`;
  out += label(ax, ay + 6, 'your.brand', { anchor: 'middle', fill: '#f4efe9', size: 16 });
  out += `<rect x="${bx - 96}" y="${midY - 48}" width="192" height="96" rx="20" fill="rgba(245,131,39,0.1)" stroke="${FLAME_LIGHT}" stroke-width="1.6"/>`;
  out += label(bx, midY + 6, 'sbx.core', { anchor: 'middle', fill: FLAME_LIGHT, size: 16 });
  // packets along the wire (approximate points on the bezier)
  const bez = (t: number) => {
    const p0 = [ax + 84, ay], p1 = [ax + 200, ay], p2 = [bx - 220, midY], p3 = [bx - 96, midY];
    const u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  };
  [r.range(0.15, 0.35), r.range(0.55, 0.8)].forEach((t, i) => {
    const [px, py] = bez(t);
    out += `<circle cx="${r1(px)}" cy="${r1(py)}" r="${i ? 5 : 6.5}" fill="${FLAME_LIGHT}"/>`;
  });
  // right side: the stack behind sbx.core
  for (let i = 0; i < 3; i++) {
    const y = r1(midY - 70 + i * 70);
    out += `<path d="M${bx + 96} ${midY} L${bx + 150} ${y}" stroke="${LINE}" stroke-width="1" fill="none"/>`;
    out += `<rect x="${bx + 150}" y="${y - 12}" width="${r.int(60, 110)}" height="24" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>`;
  }
  return out;
}

const MOTIFS: Record<UnitSlug, (r: Rng, id: string) => string> = { brains, consulting, growth, academy, products, partners };

/** Unique ids per SVG on a page (gradients/masks). Deterministic within a build. */
let counter = 0;
export const coverUid = (seed: string) => `cv${(hash(seed) % 46656).toString(36)}${(++counter).toString(36)}`;

export interface CoverOptions {
  seed: string;
  unit: UnitSlug;
  /** Unique id prefix for defs (coverUid). */
  uid: string;
}

/** Inner markup (defs + layers) for <svg viewBox="0 0 1200 675">. */
export function coverMarkup({ seed, unit, uid }: CoverOptions): string {
  const r = rng(hash(`${unit}:${seed}`));
  const gx = r1(r.range(420, 780));
  const gy = r1(r.range(240, 420));
  const defs = `<defs>
<radialGradient id="${uid}-bg" cx="${gx}" cy="${gy}" r="720" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2a1a10"/><stop offset=".42" stop-color="${INK_2}"/><stop offset="1" stop-color="#0b0a0a"/></radialGradient>
<radialGradient id="${uid}-fade" cx="600" cy="338" r="640" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".7" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="${uid}-m"><rect width="${COVER_W}" height="${COVER_H}" fill="url(#${uid}-fade)"/></mask>
<pattern id="${uid}-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern>
<linearGradient id="${uid}-hot" x1="150" y1="0" x2="1050" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${DEEP}"/><stop offset=".55" stop-color="${FLAME}"/><stop offset="1" stop-color="${AMBER}"/></linearGradient>
<linearGradient id="${uid}-bar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${DEEP}"/><stop offset="1" stop-color="${FLAME_LIGHT}"/></linearGradient>
<linearGradient id="${uid}-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${AMBER}"/><stop offset="1" stop-color="${FLAME}"/></linearGradient>
<linearGradient id="${uid}-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FLAME}" stop-opacity=".32"/><stop offset="1" stop-color="${FLAME}" stop-opacity="0"/></linearGradient>
<pattern id="${uid}-dash" width="12" height="20" patternUnits="userSpaceOnUse"><rect width="7" height="20" fill="rgba(245,131,39,0.55)"/></pattern>
</defs>`;
  const bg = `<rect width="${COVER_W}" height="${COVER_H}" fill="url(#${uid}-bg)"/><rect width="${COVER_W}" height="${COVER_H}" fill="url(#${uid}-grid)" mask="url(#${uid}-m)"/>`;
  const art = `<g class="cv-art">${MOTIFS[unit](r, uid)}</g>`;
  return defs + bg + art;
}

/** A short, stable plate number shown on covers ("FN-4F2A"). */
export const plate = (seed: string) => `FN-${(hash(seed) & 0xffff).toString(16).toUpperCase().padStart(4, '0')}`;

/** Standalone SVG document (for rasterizing OG images at build time). */
export function coverSvgDocument(o: Omit<CoverOptions, 'uid'>, width = 1200, height = 630): string {
  const uid = `og${(hash(o.seed) % 46656).toString(36)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${COVER_W} ${COVER_H}" preserveAspectRatio="xMidYMid slice">${coverMarkup({ ...o, uid })}</svg>`;
}
