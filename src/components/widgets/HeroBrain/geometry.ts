/**
 * HeroBrain geometry: builds the node graph that draws the Sandbox cube.
 *
 * The brand mark (src/components/ui/Logo.astro) is an isometric cube: a pointy-top hexagon
 * (circumradius 44, centred on 50,50 in a 100×100 space) with three cut-outs, one per visible face.
 * We place nodes on the cube in 3D and use the mark as a stencil: seen from the rest pose, every node
 * lands on the solid part of the logo and the cut-outs stay empty, so the network reads as the mark.
 *
 * Cube space is [-1, 1]^3. The rest pose looks down the body diagonal (1,1,1), with +y pointing up.
 */

export type Vec3 = [number, number, number];

/** Node kinds (plain numbers: cheap to store in a typed array). */
export const K_CORE = 0; // the heart of the brain, at the cube centre
export const K_VERTEX = 1; // cube corners
export const K_EDGE = 2; // along the cube edges (silhouette + the "Y")
export const K_RIM = 3; // outlines of the logo cut-outs
export const K_FACE = 4; // fill on the three visible faces
export const K_BACK = 5; // sparse nodes on the hidden faces
export const K_INNER = 6; // interior cloud around the core

export interface BrainGraph {
  count: number;
  /** Rest positions in cube space. */
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  kind: Uint8Array;
  /** Base dot radius (css px at the reference size). */
  size: Float32Array;
  /** Random phase used for breathing / drift. */
  phase: Float32Array;
  /** Intro delay (s): nodes condense from the core outwards. */
  delay: Float32Array;
  /** 1 for nodes worth labelling (hubs on the visible faces). */
  hub: Uint8Array;
  /** Edge list as index pairs [a0, b0, a1, b1, …]. */
  edges: Uint16Array;
  edgeLen: Float32Array;
  /** 1 for structural links: the visible cube edges and the outlines of the three cut-outs. */
  edgeFrame: Uint8Array;
  /** For each node, the indices of its edges. */
  adj: number[][];
  /** Index of the core node (always 0). */
  core: number;
}

/* ------------------------------------------------------------------
   Rest-pose projection (orthographic) ↔ logo space
------------------------------------------------------------------- */
const S2 = Math.SQRT2;
const S3 = Math.sqrt(3);
const S6 = Math.sqrt(6);
export const REST_RIGHT: Vec3 = [1 / S2, 0, -1 / S2];
export const REST_UP: Vec3 = [-1 / S6, 2 / S6, -1 / S6];
export const REST_FWD: Vec3 = [1 / S3, 1 / S3, 1 / S3];
/** Circumradius of the cube silhouette at rest, in cube units. */
export const ISO_RADIUS = 4 / S6;
const LOGO_SCALE = 44 / ISO_RADIUS;

/** Cut-outs of the mark, copied from the logo path (logo space, y down). */
const HOLES: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [[50, 44.28], [78.2, 28], [65.62, 20.74], [50, 25.36], [34.38, 20.74], [21.8, 28]],
  [[47.14, 54.07], [16.85, 36.58], [16.85, 49.78], [32.09, 58.58], [32.09, 77.94], [47.14, 86.63]],
  [[52.86, 54.07], [83.15, 36.58], [83.15, 49.78], [67.91, 58.58], [67.91, 77.94], [52.86, 86.63]],
];

function toLogo(x: number, y: number, z: number): [number, number] {
  return [
    50 + LOGO_SCALE * (x * REST_RIGHT[0] + y * REST_RIGHT[1] + z * REST_RIGHT[2]),
    50 - LOGO_SCALE * (x * REST_UP[0] + y * REST_UP[1] + z * REST_UP[2]),
  ];
}

/** Map a logo point back onto one of the three visible faces (x=1, y=1 or z=1). */
function fromLogo(lx: number, ly: number): Vec3 | null {
  const X = (lx - 50) / LOGO_SCALE;
  const Y = -(ly - 50) / LOGO_SCALE;
  for (let k = 0; k < 3; k++) {
    const a = (k + 1) % 3;
    const b = (k + 2) % 3;
    const det = REST_RIGHT[a] * REST_UP[b] - REST_RIGHT[b] * REST_UP[a];
    const rx = X - REST_RIGHT[k];
    const ry = Y - REST_UP[k];
    const u = (rx * REST_UP[b] - REST_RIGHT[b] * ry) / det;
    const v = (REST_RIGHT[a] * ry - rx * REST_UP[a]) / det;
    if (Math.abs(u) <= 1.0001 && Math.abs(v) <= 1.0001) {
      const p: Vec3 = [0, 0, 0];
      p[k] = 1;
      p[a] = u;
      p[b] = v;
      return p;
    }
  }
  return null;
}

function inPoly(x: number, y: number, poly: ReadonlyArray<readonly [number, number]>): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function distToPoly(x: number, y: number, poly: ReadonlyArray<readonly [number, number]>): number {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ax, ay] = poly[j];
    const [bx, by] = poly[i];
    const dx = bx - ax;
    const dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    best = Math.min(best, Math.hypot(x - (ax + dx * t), y - (ay + dy * t)));
  }
  return best;
}

/** True when the logo point is on the solid part of the mark (at least `margin` away from a cut-out). */
function solidAt(lx: number, ly: number, margin: number): boolean {
  for (const h of HOLES) {
    const d = distToPoly(lx, ly, h);
    if (inPoly(lx, ly, h)) {
      // inside a cut-out: tolerated only when hugging its outline (rim nodes sit exactly on it)
      if (d > 0.9) return false;
    } else if (d < margin) {
      return false;
    }
  }
  return true;
}

function solid3(x: number, y: number, z: number, margin: number): boolean {
  const [lx, ly] = toLogo(x, y, z);
  return solidAt(lx, ly, margin);
}

function polyArea(poly: ReadonlyArray<readonly [number, number]>): number {
  let a = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) a += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
  return Math.abs(a) / 2;
}

const HEX_AREA = ((3 * S3) / 2) * 44 * 44;
const SOLID_FRACTION = 1 - HOLES.reduce((s, h) => s + polyArea(h), 0) / HEX_AREA;

/* ------------------------------------------------------------------
   Seeded RNG: the layout is identical on every load
------------------------------------------------------------------- */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------
   Builder
------------------------------------------------------------------- */
interface P {
  x: number;
  y: number;
  z: number;
  kind: number;
  size: number;
  hub: boolean;
}

export function buildBrain(target: number, seed = 20261101): BrainGraph {
  const rand = mulberry32(seed);
  const gauss = () => {
    const u = Math.max(1e-6, rand());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  };

  const nEdge = Math.round(target * 0.2);
  const nRim = Math.round(target * 0.17);
  const nBack = Math.round(target * 0.06);
  const nInner = Math.round(target * 0.1);
  const nFace = Math.max(20, target - nEdge - nRim - nBack - nInner - 9);

  // Typical spacing on the visible, solid surface; drives min distances and link lengths.
  const surface = 12 * SOLID_FRACTION;
  const spacing = Math.sqrt(surface / (nFace + nRim + nEdge * 0.6));

  const pts: P[] = [];
  // Spatial hash for blue-noise placement.
  const cell = spacing * 0.5;
  const grid = new Map<number, number[]>();
  const key = (ix: number, iy: number, iz: number) => (ix + 64) + (iy + 64) * 131 + (iz + 64) * 17161;
  const cellOf = (v: number) => Math.floor(v / cell);
  const push = (p: P) => {
    const k = key(cellOf(p.x), cellOf(p.y), cellOf(p.z));
    let arr = grid.get(k);
    if (!arr) grid.set(k, (arr = []));
    arr.push(pts.length);
    pts.push(p);
  };
  const farFrom = (x: number, y: number, z: number, d: number) => {
    const r = Math.ceil(d / cell);
    const cx = cellOf(x);
    const cy = cellOf(y);
    const cz = cellOf(z);
    const d2 = d * d;
    for (let i = -r; i <= r; i++)
      for (let j = -r; j <= r; j++)
        for (let k = -r; k <= r; k++) {
          const arr = grid.get(key(cx + i, cy + j, cz + k));
          if (!arr) continue;
          for (const idx of arr) {
            const q = pts[idx];
            const dx = q.x - x;
            const dy = q.y - y;
            const dz = q.z - z;
            if (dx * dx + dy * dy + dz * dz < d2) return false;
          }
        }
    return true;
  };

  // 0: the core
  push({ x: 0, y: 0, z: 0, kind: K_CORE, size: 2.6, hub: false });

  // 1: corners. The far corner (-1,-1,-1) hides behind the core at rest.
  const corners: Vec3[] = [];
  const cornerIdx: number[] = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) corners.push([x, y, z]);
  for (const [x, y, z] of corners) {
    const far = x + y + z === -3;
    cornerIdx.push(pts.length);
    push({ x, y, z, kind: far ? K_BACK : K_VERTEX, size: far ? 1.2 : 2.3, hub: !far });
  }
  /** Ordered node chains drawn as continuous structural lines. */
  const chains: { nodes: number[]; closed: boolean }[] = [];

  // 2. Cube edges: the nine visible ones draw the hexagon and the "Y".
  const cubeEdges: [number, number][] = [];
  for (let i = 0; i < 8; i++)
    for (let j = i + 1; j < 8; j++) {
      const a = corners[i];
      const b = corners[j];
      const diff = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
      if (diff === 2) cubeEdges.push([i, j]);
    }
  const perEdge = Math.max(3, Math.round(nEdge / 9));
  for (const [ia, ib] of cubeEdges) {
    const a = corners[ia];
    const b = corners[ib];
    const back = a[0] + a[1] + a[2] === -3 || b[0] + b[1] + b[2] === -3;
    const n = back ? Math.max(2, Math.round(perEdge / 3)) : perEdge;
    const chain = [cornerIdx[ia]];
    for (let i = 0; i < n; i++) {
      const t = (i + 1 + (rand() - 0.5) * 0.4) / (n + 1);
      const x = a[0] + (b[0] - a[0]) * t;
      const y = a[1] + (b[1] - a[1]) * t;
      const z = a[2] + (b[2] - a[2]) * t;
      if (back && !solid3(x, y, z, 1.5)) continue;
      chain.push(pts.length);
      push({ x, y, z, kind: back ? K_BACK : K_EDGE, size: back ? 1.1 : 1.65, hub: !back && rand() < 0.12 });
    }
    chain.push(cornerIdx[ib]);
    // hidden edges stay as loose dots; only the nine visible ones become lines
    if (!back) chains.push({ nodes: chain, closed: false });
  }

  // 3. Rims: trace the three cut-outs so the mark reads crisply.
  const perim = HOLES.reduce((s, h) => s + h.reduce((acc, p, i) => {
    const q = h[(i + 1) % h.length];
    return acc + Math.hypot(q[0] - p[0], q[1] - p[1]);
  }, 0), 0);
  const step = perim / Math.max(12, nRim);
  for (const h of HOLES) {
    const loop: number[] = [];
    for (let i = 0; i < h.length; i++) {
      const [ax, ay] = h[i];
      const [bx, by] = h[(i + 1) % h.length];
      const len = Math.hypot(bx - ax, by - ay);
      const n = Math.max(1, Math.round(len / step));
      for (let s = 0; s < n; s++) {
        const t = s / n;
        const p = fromLogo(ax + (bx - ax) * t, ay + (by - ay) * t);
        if (!p) continue;
        loop.push(pts.length);
        push({ x: p[0], y: p[1], z: p[2], kind: K_RIM, size: s === 0 ? 1.9 : 1.45, hub: s === 0 || rand() < 0.08 });
      }
    }
    if (loop.length > 2) chains.push({ nodes: loop, closed: true });
  }

  // 4. Face fill: blue-noise darts on the solid part of the three visible faces.
  const dFace = spacing * 0.82;
  let placed = 0;
  for (let tries = 0; tries < nFace * 60 && placed < nFace; tries++) {
    const k = Math.floor(rand() * 3);
    const p: Vec3 = [0, 0, 0];
    p[k] = 1;
    p[(k + 1) % 3] = rand() * 2 - 1;
    p[(k + 2) % 3] = rand() * 2 - 1;
    if (!solid3(p[0], p[1], p[2], 1.4)) continue;
    // keep a little clearance from the cube edges (they have their own nodes)
    if (Math.abs(p[(k + 1) % 3]) > 0.965 || Math.abs(p[(k + 2) % 3]) > 0.965) continue;
    if (!farFrom(p[0], p[1], p[2], dFace)) continue;
    p[k] += (rand() - 0.5) * 0.05; // a hair off the surface: depth, not a flat print
    push({ x: p[0], y: p[1], z: p[2], kind: K_FACE, size: 0.9 + rand() * 0.8, hub: rand() < 0.07 });
    placed++;
  }

  // 5. Hidden faces: sparse, and only where they don't fill the cut-outs at rest.
  const dBack = spacing * 1.7;
  placed = 0;
  for (let tries = 0; tries < nBack * 80 && placed < nBack; tries++) {
    const k = Math.floor(rand() * 3);
    const p: Vec3 = [0, 0, 0];
    p[k] = -1;
    p[(k + 1) % 3] = rand() * 2 - 1;
    p[(k + 2) % 3] = rand() * 2 - 1;
    if (!solid3(p[0], p[1], p[2], 2)) continue;
    if (!farFrom(p[0], p[1], p[2], dBack)) continue;
    push({ x: p[0], y: p[1], z: p[2], kind: K_BACK, size: 0.8 + rand() * 0.5, hub: false });
    placed++;
  }

  // 6: interior cloud around the core (also stencilled, so the cut-outs stay clean).
  const dInner = spacing * 0.95;
  placed = 0;
  for (let tries = 0; tries < nInner * 80 && placed < nInner; tries++) {
    const x = gauss() * 0.38;
    const y = gauss() * 0.38;
    const z = gauss() * 0.38;
    if (Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) > 0.82) continue;
    if (Math.hypot(x, y, z) < 0.12) continue;
    if (!solid3(x, y, z, 1.2)) continue;
    if (!farFrom(x, y, z, dInner)) continue;
    push({ x, y, z, kind: K_INNER, size: 1 + rand() * 0.9, hub: false });
    placed++;
  }

  /* ---------- links ---------- */
  const N = pts.length;
  const pairs: number[] = [];
  const seen = new Set<number>();
  const degree = new Uint16Array(N);
  const crossesHole = (i: number, j: number) => {
    const a = pts[i];
    const b = pts[j];
    for (const t of [0.25, 0.5, 0.75]) {
      if (!solid3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t, 0)) return true;
    }
    return false;
  };
  const frameKeys = new Set<number>();
  const link = (i: number, j: number, frame = false) => {
    if (i === j) return false;
    const k = i < j ? i * 4096 + j : j * 4096 + i;
    if (seen.has(k)) return false;
    if (frame) frameKeys.add(k);
    else if (crossesHole(i, j)) return false;
    seen.add(k);
    pairs.push(i, j);
    degree[i]++;
    degree[j]++;
    return true;
  };
  const d2 = (i: number, j: number) => {
    const a = pts[i];
    const b = pts[j];
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
  };

  for (const c of chains) {
    const n = c.nodes.length;
    for (let i = 0; i + 1 < n; i++) link(c.nodes[i], c.nodes[i + 1], true);
    if (c.closed) link(c.nodes[n - 1], c.nodes[0], true);
  }

  const maxD = spacing * 1.95;
  const near: { j: number; d: number }[] = [];
  for (let i = 0; i < N; i++) {
    const ki = pts[i].kind;
    const reach = ki === K_INNER || ki === K_BACK || ki === K_CORE ? maxD * 1.6 : maxD;
    const want = ki === K_INNER ? 3 : ki === K_BACK ? 2 : 3;
    near.length = 0;
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const kj = pts[j].kind;
      // interior ↔ surface links are made deliberately below (spokes), not by proximity
      if ((ki === K_INNER || ki === K_CORE) !== (kj === K_INNER || kj === K_CORE)) continue;
      const d = d2(i, j);
      if (d < reach * reach) near.push({ j, d });
    }
    near.sort((a, b) => a.d - b.d);
    let made = 0;
    for (const { j } of near) {
      if (made >= want) break;
      if (link(i, j) || seen.has(i < j ? i * 4096 + j : j * 4096 + i)) made++;
    }
  }

  // Spokes: the core reaches the interior; the interior reaches the surface.
  const inner = pts.map((p, i) => ({ p, i })).filter(({ p }) => p.kind === K_INNER);
  inner.sort((a, b) => Math.hypot(a.p.x, a.p.y, a.p.z) - Math.hypot(b.p.x, b.p.y, b.p.z));
  for (const { i } of inner.slice(0, 6)) link(0, i);
  const outer = inner.slice(-Math.max(5, Math.round(inner.length * 0.45)));
  for (const { i } of outer) {
    const cands: { j: number; d: number }[] = [];
    for (let j = 0; j < N; j++) {
      const kj = pts[j].kind;
      if (kj === K_FACE || kj === K_RIM || kj === K_EDGE || kj === K_VERTEX) cands.push({ j, d: d2(i, j) });
    }
    cands.sort((a, b) => a.d - b.d);
    for (const { j } of cands.slice(0, 6)) if (link(i, j)) break;
  }

  // Nobody left alone.
  for (let i = 0; i < N; i++) {
    if (degree[i] > 0) continue;
    const order = [...Array(N).keys()].filter((j) => j !== i).sort((a, b) => d2(i, a) - d2(i, b));
    for (const j of order.slice(0, 12)) if (link(i, j)) break;
  }

  /* ---------- pack ---------- */
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const pz = new Float32Array(N);
  const kind = new Uint8Array(N);
  const size = new Float32Array(N);
  const phase = new Float32Array(N);
  const delay = new Float32Array(N);
  const hub = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const p = pts[i];
    px[i] = p.x;
    py[i] = p.y;
    pz[i] = p.z;
    kind[i] = p.kind;
    size[i] = p.size;
    phase[i] = rand() * Math.PI * 2;
    hub[i] = p.hub && p.kind !== K_BACK && p.kind !== K_INNER ? 1 : 0;
    delay[i] = 0.05 + (Math.hypot(p.x, p.y, p.z) / S3) * 1.1 + rand() * 0.25;
  }
  const E = pairs.length / 2;
  const edges = new Uint16Array(pairs);
  const edgeLen = new Float32Array(E);
  const edgeFrame = new Uint8Array(E);
  const adj: number[][] = Array.from({ length: N }, () => []);
  for (let e = 0; e < E; e++) {
    const a = edges[e * 2];
    const b = edges[e * 2 + 1];
    edgeFrame[e] = frameKeys.has(a < b ? a * 4096 + b : b * 4096 + a) ? 1 : 0;
    edgeLen[e] = Math.sqrt(d2(a, b));
    adj[a].push(e);
    adj[b].push(e);
  }

  return { count: N, px, py, pz, kind, size, phase, delay, hub, edges, edgeLen, edgeFrame, adj, core: 0 };
}
