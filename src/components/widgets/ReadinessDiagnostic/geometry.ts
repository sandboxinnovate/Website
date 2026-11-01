/**
 * Small, dependency-free SVG geometry helpers for the radar and the gauge.
 * Angles are in degrees, measured clockwise from 3 o'clock (SVG y axis points down).
 */

export type Pt = [number, number];

const RAD = Math.PI / 180;

/** Rounded to 1/100 px so server and browser trig never disagree (hydration-safe attributes). */
const r2 = (v: number) => Math.round(v * 100) / 100;

export function polar(cx: number, cy: number, r: number, deg: number): Pt {
  return [r2(cx + r * Math.cos(deg * RAD)), r2(cy + r * Math.sin(deg * RAD))];
}

/** Angle of axis `i` of an `n`-axis radar, starting at 12 o'clock. */
export const axisAngle = (i: number, n: number) => -90 + (i * 360) / n;

/** Radar vertices for values in 0..1. */
export function radarPoints(values: number[], cx: number, cy: number, r: number): Pt[] {
  const n = values.length;
  return values.map((v, i) => polar(cx, cy, r * clamp01(v), axisAngle(i, n)));
}

/** Regular polygon (a radar ring) at fraction `f` of the radius. */
export function ringPoints(n: number, cx: number, cy: number, r: number, f = 1): Pt[] {
  return Array.from({ length: n }, (_, i) => polar(cx, cy, r * f, axisAngle(i, n)));
}

export const toPoly = (pts: Pt[]) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

/** Clockwise SVG arc from `a0` to `a1` (degrees). */
export function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

/** Label placement around a radar: anchor + baseline nudge so text never overlaps the chart. */
export function labelAnchor(deg: number): { anchor: 'start' | 'middle' | 'end'; dy: number } {
  const c = Math.cos(deg * RAD);
  const s = Math.sin(deg * RAD);
  const anchor = c > 0.25 ? 'start' : c < -0.25 ? 'end' : 'middle';
  // top label sits above its point, bottom labels below, side labels centred
  const dy = s < -0.6 ? -1 : s > 0.4 ? 0.9 : 0;
  return { anchor, dy };
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
