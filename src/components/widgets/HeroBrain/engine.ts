/**
 * HeroBrain renderer — Canvas 2D, no dependencies.
 *
 * Draws the node graph from geometry.ts as a slowly swaying, breathing 3D network in the shape of
 * the Sandbox cube: hairline links, an ember core, light pulses hopping across links (agents at
 * work), mono job labels, pointer tilt with inertia and click/tap bursts.
 *
 * Performance notes
 * - Everything is drawn in a handful of batched paths: nodes and links are bucketed by colour family
 *   and quantised alpha (counting sort, no per-frame allocation), so one frame is ~40 fills/strokes
 *   plus a few dozen sprites for the active elements.
 * - DPR is capped at 2 and drops to 1 if the device cannot hold ~40 fps.
 * - The loop only runs while the canvas is on screen and the tab is visible.
 * - prefers-reduced-motion renders a single, simulated still frame (re-rendered on resize).
 */
import {
  buildBrain,
  mulberry32,
  ISO_RADIUS,
  K_BACK,
  K_CORE,
  K_INNER,
  REST_FWD,
  REST_RIGHT,
  REST_UP,
  type BrainGraph,
} from './geometry';

export interface HeroBrainOptions {
  /** Job names flashed next to active nodes. */
  ops: readonly string[];
  /** Render the still frame regardless of the motion preference (QA / lab). */
  still?: boolean;
}

export interface HeroBrainEngine {
  destroy(): void;
}

/* ------------------------------------------------------------------
   Constants
------------------------------------------------------------------- */
const TAU = Math.PI * 2;
const CAM = 9; // camera distance in cube units: gentle perspective, the hexagon still reads
const FIT = 0.82; // share of the container's short side used by the cube
const LEVELS = 12; // alpha quantisation steps for batched drawing
const FAM_SURFACE = 0;
const FAM_INNER = 1;
const FAM_BACK = 2;
const FAM_FRAME = 3; // links only: visible cube edges + cut-out outlines
const FAMS = 4;

const NODE_RGB = ['244,239,233', '255,158,98', '196,186,178', '244,239,233'];
const NODE_MAX = [0.95, 0.9, 0.4, 0.95];
const EDGE_RGB = ['244,226,210', '255,128,56', '196,186,178', '255,190,120'];
const EDGE_MAX = [0.2, 0.26, 0.08, 0.62];
const EDGE_W = [0.75, 0.8, 0.6, 1.05];

const FONT = '500 10.5px "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const INTERACTIVE = 'a,button,input,select,textarea,label,summary,[role="button"],[contenteditable="true"]';
/** Labels never land on page copy or controls drawn over the canvas (pages can opt areas in with data-brain-avoid). */
const OCCLUDERS = `h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,nav,.eyebrow,[data-brain-avoid],${INTERACTIVE}`;

const LABEL_IN = 0.42;
const LABEL_HOLD = 2.5;
const LABEL_OUT = 0.7;
const LABEL_LIFE = LABEL_IN + LABEL_HOLD + LABEL_OUT;
const RING_LIFE = 1.35;
const WAVE_PERIOD = 7.5;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

interface Pulse {
  on: boolean;
  e: number;
  a: number;
  b: number;
  t: number;
  v: number;
  hops: number;
  label: number;
  hot: number;
}

interface Label {
  on: boolean;
  node: number;
  op: string;
  ms: string;
  age: number;
  opW: number;
  w: number;
  side: 1 | -1;
}

interface Ring {
  on: boolean;
  node: number;
  age: number;
}

function radialSprite(stops: ReadonlyArray<readonly [number, string]>, size = 64): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  if (x) {
    const h = size / 2;
    const gr = x.createRadialGradient(h, h, 0, h, h, h);
    for (const [o, col] of stops) gr.addColorStop(o, col);
    x.fillStyle = gr;
    x.fillRect(0, 0, size, size);
  }
  return c;
}

/** Node count for a container: denser on big screens, ~120–170 on phones. */
function nodeTarget(w: number, h: number): number {
  const s = Math.min(w, h);
  let t = 40 + (s * s) / 1600;
  if (typeof window !== 'undefined' && window.innerWidth < 640) t = Math.min(t, 170);
  return Math.round(Math.max(120, Math.min(380, t)));
}

/* ------------------------------------------------------------------
   Engine
------------------------------------------------------------------- */
export function createHeroBrain(canvas: HTMLCanvasElement, host: HTMLElement, opts: HeroBrainOptions): HeroBrainEngine {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return { destroy() {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const ops = opts.ops.length ? opts.ops : ['job.run'];
  let rnd = mulberry32(0x5bd1e995);

  const GLOW = radialSprite([
    [0, 'rgba(255,214,150,1)'],
    [0.14, 'rgba(255,150,70,0.8)'],
    [0.42, 'rgba(230,92,12,0.22)'],
    [1, 'rgba(217,76,0,0)'],
  ]);

  // Pre-built style strings: [family][level]
  const nodeStyle: string[][] = [];
  const edgeStyle: string[][] = [];
  for (let f = 0; f < FAMS; f++) {
    nodeStyle.push([]);
    edgeStyle.push([]);
    for (let l = 0; l < LEVELS; l++) {
      const k = l / (LEVELS - 1);
      nodeStyle[f].push(`rgba(${NODE_RGB[f]},${(NODE_MAX[f] * k).toFixed(3)})`);
      edgeStyle[f].push(`rgba(${EDGE_RGB[f]},${(EDGE_MAX[f] * k).toFixed(3)})`);
    }
  }

  /* ---------- size ---------- */
  let W = 0;
  let H = 0;
  let dpr = 1;
  let dprCap = 2;
  let lowPower = false;
  let S = 1; // px per cube unit
  let ui = 1; // UI scale relative to the reference size
  let hoverR = 120;
  let clipL = 0;
  let clipR = 0;

  /* ---------- graph + per-node buffers ---------- */
  let g: BrainGraph | null = null;
  let N = 0;
  let E = 0;
  let builtFor = 0;
  let fam = new Uint8Array(0);
  let efam = new Uint8Array(0);
  let rad = new Float32Array(0);
  let sx = new Float32Array(0);
  let sy = new Float32Array(0);
  let sk = new Float32Array(0);
  let fg = new Float32Array(0); // depth fog 0..1
  let dep = new Float32Array(0); // raw depth 0 (far) .. 1 (near)
  let ia = new Float32Array(0); // intro alpha
  let act = new Float32Array(0);
  let hov = new Float32Array(0);
  let eAct = new Float32Array(0);
  let nKey = new Uint8Array(0);
  let eKey = new Uint8Array(0);
  let nOrder = new Int32Array(0);
  let eOrder = new Int32Array(0);
  const NB = FAMS * LEVELS;
  const bStart = new Int32Array(NB + 1);
  const bCur = new Int32Array(NB);

  /* ---------- simulation state ---------- */
  let maxPulses = 90;
  let maxLabels = 3;
  const pulses: Pulse[] = [];
  const labels: Label[] = [];
  const rings: Ring[] = [];
  for (let i = 0; i < 4; i++) labels.push({ on: false, node: 0, op: '', ms: '', age: 0, opW: 0, w: 0, side: 1 });
  for (let i = 0; i < 6; i++) rings.push({ on: false, node: 0, age: 0 });

  let time = 0;
  let introT = 0;
  let introOn = true;
  let spawnIn = 0.8;
  let lastLabelAt = -10;
  let coreFlash = 0;
  let waveAge = WAVE_PERIOD - 1.6;
  let fontOk = false;

  // rotation
  const M = new Float64Array(9);
  let yaw = 0;
  let pitch = 0;
  let tYaw = 0; // pointer tilt (spring)
  let tPitch = 0;
  let vYaw = 0;
  let vPitch = 0;
  let tgtYaw = 0;
  let tgtPitch = 0;
  let parX = 0;
  let parY = 0;

  // pointer
  let pClientX = 0;
  let pClientY = 0;
  let pKnown = false;
  let pMouse = false;
  let pIn = false;
  let pres = 0;
  let hovDirty = false;
  let pLocalX = -1e4;
  let pLocalY = -1e4;
  let tapUntil = 0;
  let downX = 0;
  let downY = 0;
  let downT = 0;
  let lastBurst = -1;
  const nearI = new Int32Array(6);
  const nearD = new Float32Array(6);

  // loop
  let raf = 0;
  let running = false;
  let visible = false;
  let last = 0;
  let destroyed = false;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let still = !!opts.still || mq.matches;
  let stillDirty = true;

  // perf watchdog
  let perfFrames = 0;
  let perfSum = 0;
  let perfDone = false;

  /* ---------- graph ---------- */
  function build(target: number) {
    g = buildBrain(target);
    builtFor = target;
    N = g.count;
    E = g.edges.length / 2;
    fam = new Uint8Array(N);
    rad = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const k = g.kind[i];
      fam[i] = k === K_INNER || k === K_CORE ? FAM_INNER : k === K_BACK ? FAM_BACK : FAM_SURFACE;
      rad[i] = Math.hypot(g.px[i], g.py[i], g.pz[i]);
    }
    efam = new Uint8Array(E);
    for (let e = 0; e < E; e++) {
      const fa = fam[g.edges[e * 2]];
      const fb = fam[g.edges[e * 2 + 1]];
      efam[e] =
        fa === FAM_INNER || fb === FAM_INNER
          ? FAM_INNER
          : fa === FAM_BACK || fb === FAM_BACK
            ? FAM_BACK
            : g.edgeFrame[e]
              ? FAM_FRAME
              : FAM_SURFACE;
    }
    sx = new Float32Array(N);
    sy = new Float32Array(N);
    sk = new Float32Array(N);
    fg = new Float32Array(N);
    dep = new Float32Array(N);
    ia = new Float32Array(N);
    act = new Float32Array(N);
    hov = new Float32Array(N);
    eAct = new Float32Array(E);
    nKey = new Uint8Array(N);
    eKey = new Uint8Array(E);
    nOrder = new Int32Array(N);
    eOrder = new Int32Array(E);
    for (const p of pulses) p.on = false;
    for (const l of labels) l.on = false;
    for (const r of rings) r.on = false;
  }

  /* ---------- sizing ---------- */
  function measureClip() {
    const r = canvas.getBoundingClientRect();
    clipL = Math.max(0, -r.left);
    clipR = Math.min(W, window.innerWidth - r.left);
    if (clipR - clipL < 40) {
      clipL = 0;
      clipR = W;
    }
  }

  function resize(w: number, h: number) {
    if (w < 8 || h < 8) return;
    W = w;
    H = h;
    dpr = Math.min(dprCap, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    // hexagon circumradius ≈ ISO_RADIUS·S; front corners grow ~6% with perspective
    S = (Math.min(W, H) * 0.5 * FIT) / (ISO_RADIUS * 1.06);
    ui = Math.max(0.78, Math.min(1.25, S / 185));
    hoverR = Math.max(80, Math.min(150, S * 0.62));
    const small = window.innerWidth < 640;
    maxPulses = small || lowPower ? 46 : 90;
    maxLabels = small ? 2 : 3;
    while (pulses.length < maxPulses) pulses.push({ on: false, e: 0, a: 0, b: 0, t: 0, v: 1, hops: 0, label: -1, hot: 1 });
    const target = nodeTarget(W, H);
    if (!g || Math.abs(target - builtFor) / builtFor > 0.22) {
      build(target);
      if (time > 0) {
        introOn = true;
        introT = 0;
      }
    }
    measureClip();
    stillDirty = true;
    if (still) renderStill();
    else if (!running) {
      // keep the last frame crisp at the new size
      project();
      draw();
    }
  }

  /* ---------- rotation & projection ---------- */
  function updateMatrix() {
    // M = Tilt(view) · Rest · Turntable(cube y)
    const cy = Math.cos(yaw);
    const sy_ = Math.sin(yaw);
    // rest basis rows applied after turntable: row · Ry
    // Ry = [[c,0,s],[0,1,0],[-s,0,c]]
    const r0 = [REST_RIGHT[0] * cy - REST_RIGHT[2] * sy_, REST_RIGHT[1], REST_RIGHT[0] * sy_ + REST_RIGHT[2] * cy];
    const r1 = [REST_UP[0] * cy - REST_UP[2] * sy_, REST_UP[1], REST_UP[0] * sy_ + REST_UP[2] * cy];
    const r2 = [REST_FWD[0] * cy - REST_FWD[2] * sy_, REST_FWD[1], REST_FWD[0] * sy_ + REST_FWD[2] * cy];
    // view-space tilt: yaw a around Y, then pitch b around X
    const ca = Math.cos(tYaw);
    const sa = Math.sin(tYaw);
    const cb = Math.cos(pitch + tPitch);
    const sb = Math.sin(pitch + tPitch);
    for (let c = 0; c < 3; c++) {
      const X = r0[c];
      const Y = r1[c];
      const Z = r2[c];
      const X1 = X * ca + Z * sa;
      const Z1 = -X * sa + Z * ca;
      const Y2 = Y * cb - Z1 * sb;
      const Z2 = Y * sb + Z1 * cb;
      M[c] = X1;
      M[3 + c] = Y2;
      M[6 + c] = Z2;
    }
  }

  function project() {
    if (!g) return;
    updateMatrix();
    const cx = W / 2 + parX;
    const cy = H / 2 + parY;
    const breath = 1 + 0.012 * Math.sin(time * 0.75);
    const px = g.px;
    const py = g.py;
    const pz = g.pz;
    const ph = g.phase;
    for (let i = 0; i < N; i++) {
      let p = 1;
      if (introOn) {
        p = easeOutExpo(clamp01((introT - g.delay[i] * 0.75) / 1.3));
        ia[i] = clamp01(p * 1.5);
      } else ia[i] = 1;
      const f = fam[i];
      const ph_ = ph[i];
      const sc = (f === FAM_INNER ? breath * (1 + 0.055 * Math.sin(time * 0.9 + ph_)) : breath) * p;
      const dr = 0.011 * p;
      const x = px[i] * sc + dr * Math.sin(time * 0.53 + ph_);
      const y = py[i] * sc + dr * Math.sin(time * 0.47 + ph_ * 1.3);
      const z = pz[i] * sc + dr * Math.sin(time * 0.61 + ph_ * 1.7);
      const X = M[0] * x + M[1] * y + M[2] * z;
      const Y = M[3] * x + M[4] * y + M[5] * z;
      const Z = M[6] * x + M[7] * y + M[8] * z;
      const k = CAM / (CAM - Z);
      sx[i] = cx + X * S * k;
      sy[i] = cy - Y * S * k;
      sk[i] = k;
      const d = clamp01((Z + 1.75) / 3.5);
      dep[i] = d;
      fg[i] = 0.14 + 0.86 * Math.pow(d, 1.35);
    }
  }

  /* ---------- pulses ---------- */
  function fire(from: number, e: number, hops: number, label: number, v: number, hot = 1): boolean {
    if (!g) return false;
    for (let i = 0; i < maxPulses; i++) {
      const p = pulses[i];
      if (p.on) continue;
      const a = g.edges[e * 2];
      const b = g.edges[e * 2 + 1];
      p.on = true;
      p.e = e;
      p.a = from;
      p.b = a === from ? b : a;
      p.t = 0;
      p.v = v;
      p.hops = hops;
      p.label = label;
      p.hot = hot;
      if (eAct[e] < 0.3) eAct[e] = 0.3;
      return true;
    }
    return false;
  }

  function nextEdge(node: number, not: number, not2 = -1): number {
    if (!g) return -1;
    const ad = g.adj[node];
    const n = ad.length;
    if (n === 0) return -1;
    const start = Math.floor(rnd() * n);
    for (let k = 0; k < n; k++) {
      const e = ad[(start + k) % n];
      if (e !== not && e !== not2) return e;
    }
    return -1;
  }

  function spawnJob() {
    if (!g) return;
    const fromCore = rnd() < 0.2;
    let start = g.core;
    if (fromCore) coreFlash = Math.min(1.5, coreFlash + 0.4);
    else {
      start = 1 + Math.floor(rnd() * (N - 1));
      if (!g.hub[start] && rnd() < 0.5) start = 1 + Math.floor(rnd() * (N - 1));
    }
    const e = nextEdge(start, -1);
    if (e < 0) return;
    const hops = fromCore ? 4 + Math.floor(rnd() * 4) : 2 + Math.floor(rnd() * 5);
    const label = rnd() < 0.55 ? Math.floor(rnd() * ops.length) : -1;
    if (act[start] < 0.7) act[start] = 0.7;
    fire(start, e, hops, label, 0.75 + rnd() * 0.55);
    // some jobs fan out from the start: a supervisor handing work to two agents
    if (!fromCore && rnd() < 0.22) {
      const e2 = nextEdge(start, e);
      if (e2 >= 0) fire(start, e2, Math.max(1, hops - 2), -1, 0.7 + rnd() * 0.5);
    }
  }

  function arrive(p: Pulse) {
    if (!g) return;
    const b = p.b;
    act[b] = Math.min(1.8, act[b] + 0.85 * p.hot);
    eAct[p.e] = 1;
    if (p.hops > 0) {
      const ne = nextEdge(b, p.e);
      if (ne >= 0) {
        fire(b, ne, p.hops - 1, p.label, p.v, p.hot);
        if (rnd() < 0.13) {
          const ne2 = nextEdge(b, p.e, ne);
          if (ne2 >= 0) fire(b, ne2, Math.max(0, p.hops - 2), -1, p.v * 0.92, p.hot);
        }
        return;
      }
    }
    if (p.label >= 0) requestLabel(b, p.label, false);
  }

  /* ---------- labels ---------- */
  function requestLabel(node: number, opIdx: number, force: boolean): boolean {
    if (!g) return false;
    if (!fontOk && !force) return false;
    let free: Label | null = null;
    let live = 0;
    for (const l of labels) {
      if (l.on) live++;
      else if (!free) free = l;
    }
    if (!free || live >= maxLabels) return false;
    if (!force && time - lastLabelAt < 0.85) return false;
    if (fam[node] !== FAM_SURFACE || dep[node] < 0.42 || ia[node] < 0.95) return false;
    const x = sx[node];
    const y = sy[node];
    if (x < clipL + 20 || x > clipR - 20 || y < 30 || y > H - 22) return false;
    for (const l of labels) {
      if (!l.on) continue;
      if (Math.abs(sx[l.node] - x) < 200 && Math.abs(sy[l.node] - y) < 54) return false;
    }
    // never show the same job twice at once
    let op = ops[opIdx % ops.length];
    for (let k = 1; k < ops.length && labels.some((l) => l.on && l.op === op); k++) op = ops[(opIdx + k) % ops.length];
    const ms = `${36 + Math.floor(rnd() * 420)}ms`;
    ctx.font = FONT;
    const opW = ctx.measureText(op).width;
    const msW = ctx.measureText(ms).width;
    const w = 20 + opW + 9 + msW + 11;
    let side: 1 | -1 = 1;
    if (x + 20 + w > clipR - 6) side = -1;
    if (side === -1 && x - 20 - w < clipL + 6) return false;
    // keep clear of copy and controls layered over the canvas
    const r = canvas.getBoundingClientRect();
    const ly = r.top + y - 14;
    const x0 = r.left + x + side * 18;
    const x1 = x0 + side * w;
    if (covered(r.left + x, r.top + y) || covered(x0, ly) || covered((x0 + x1) / 2, ly) || covered(x1, ly)) return false;
    free.on = true;
    free.node = node;
    free.op = op;
    free.ms = ms;
    free.age = 0;
    free.opW = opW;
    free.w = w;
    free.side = side;
    lastLabelAt = time;
    return true;
  }

  function covered(cx: number, cy: number): boolean {
    if (cx < 0 || cy < 0 || cx > window.innerWidth || cy > window.innerHeight) return false;
    const el = document.elementFromPoint(cx, cy);
    if (!el || host.contains(el)) return false;
    return !!el.closest(OCCLUDERS);
  }

  /* ---------- interaction ---------- */
  function nearestNode(x: number, y: number, maxD: number): number {
    let best = -1;
    let bd = maxD * maxD;
    for (let i = 0; i < N; i++) {
      if (fam[i] === FAM_BACK || ia[i] < 0.5) continue;
      const dx = sx[i] - x;
      const dy = sy[i] - y;
      // favour nodes closer to the viewer
      const d = (dx * dx + dy * dy) * (1.25 - dep[i] * 0.5);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  }

  function burst(x: number, y: number) {
    if (!g || still) return;
    if (time - lastBurst < 0.12) return;
    const n = nearestNode(x, y, hoverR * 1.25);
    if (n < 0) return;
    lastBurst = time;
    act[n] = 2;
    coreFlash = Math.min(1.6, coreFlash + 0.35);
    const ad = g.adj[n];
    let labelled = false;
    for (let k = 0; k < ad.length; k++) {
      const lab = !labelled && rnd() < 0.7 ? Math.floor(rnd() * ops.length) : -1;
      if (lab >= 0) labelled = true;
      fire(n, ad[k], 2 + Math.floor(rnd() * 3), lab, 1.5 + rnd() * 0.7, 1.25);
    }
    for (const r of rings) {
      if (r.on) continue;
      r.on = true;
      r.node = n;
      r.age = 0;
      break;
    }
  }

  /** Clicks on controls or copy (e.g. selecting headline text) never fire a burst. */
  function isInteractive(t: EventTarget | null): boolean {
    return !!(t && t instanceof Element && t.closest(OCCLUDERS));
  }

  function inCanvas(clientX: number, clientY: number): boolean {
    const r = canvas.getBoundingClientRect();
    return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    pClientX = e.clientX;
    pClientY = e.clientY;
    pKnown = true;
    pMouse = true;
  }

  function onDown(e: PointerEvent) {
    if (still || !running) return;
    downX = e.clientX;
    downY = e.clientY;
    downT = performance.now();
    if (e.pointerType === 'mouse') {
      if (e.button !== 0 || isInteractive(e.target) || !inCanvas(e.clientX, e.clientY)) return;
      const r = canvas.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top);
    }
  }

  function onUp(e: PointerEvent) {
    if (still || !running || e.pointerType === 'mouse') return;
    // touch / pen: a tap (no scroll) fires a burst
    if (performance.now() - downT > 400 || Math.hypot(e.clientX - downX, e.clientY - downY) > 12) return;
    if (isInteractive(e.target) || !inCanvas(e.clientX, e.clientY)) return;
    const r = canvas.getBoundingClientRect();
    pClientX = e.clientX;
    pClientY = e.clientY;
    pKnown = true;
    pMouse = false;
    tapUntil = time + 1.4;
    burst(e.clientX - r.left, e.clientY - r.top);
  }

  function onLeave() {
    pKnown = false;
  }

  /* ---------- simulation step ---------- */
  function step(dt: number) {
    if (!g) return;
    time += dt;
    if (introOn) {
      introT += dt;
      if (introT > 2.6) introOn = false;
    }

    // autonomous sway (turntable) + a slow nod
    yaw = 0.2 * Math.sin(time * 0.15) + 0.05 * Math.sin(time * 0.41 + 1.3);
    pitch = 0.045 * Math.sin(time * 0.12 + 0.6);

    // pointer → tilt target
    pIn = false;
    if (pKnown && (pMouse || time < tapUntil)) {
      const r = canvas.getBoundingClientRect();
      pLocalX = pClientX - r.left;
      pLocalY = pClientY - r.top;
      pIn = pLocalX >= 0 && pLocalX <= W && pLocalY >= 0 && pLocalY <= H;
      const nx = Math.max(-1, Math.min(1, (pClientX - (r.left + W / 2)) / (window.innerWidth * 0.5)));
      const ny = Math.max(-1, Math.min(1, (pClientY - (r.top + H / 2)) / (window.innerHeight * 0.5)));
      tgtYaw = nx * 0.3;
      tgtPitch = ny * 0.18;
    } else {
      tgtYaw = 0;
      tgtPitch = 0;
    }
    // damped spring → inertia with a whisper of overshoot
    const K = 20;
    const C = 7.2;
    vYaw += ((tgtYaw - tYaw) * K - vYaw * C) * dt;
    vPitch += ((tgtPitch - tPitch) * K - vPitch * C) * dt;
    tYaw += vYaw * dt;
    tPitch += vPitch * dt;
    parX = (tYaw / 0.3) * 10 * ui;
    parY = (tPitch / 0.18) * 6 * ui;
    pres += ((pIn ? 1 : 0) - pres) * (1 - Math.exp(-dt * 7));

    project();

    // hover field
    if (pres > 0.01) {
      const R = hoverR;
      for (let i = 0; i < N; i++) {
        const dx = sx[i] - pLocalX;
        const dy = sy[i] - pLocalY;
        const d = Math.sqrt(dx * dx + dy * dy);
        const v = d < R ? 1 - d / R : 0;
        hov[i] = v * v * pres;
      }
      hovDirty = true;
    } else if (hovDirty) {
      hov.fill(0);
      hovDirty = false;
    }

    // activity
    if (!introOn || introT > 1.4) {
      spawnIn -= dt;
      if (spawnIn <= 0) {
        spawnJob();
        spawnIn = (N < 200 ? 0.5 : 0.32) + rnd() * 0.45;
      }
    }
    waveAge += dt;
    if (waveAge > WAVE_PERIOD) {
      waveAge = 0;
      coreFlash = Math.min(1.6, coreFlash + 0.55);
    }
    const decay = Math.exp(-dt * 2.4);
    const eDecay = Math.exp(-dt * 1.5);
    for (let i = 0; i < N; i++) if (act[i] > 0.001) act[i] *= decay;
    for (let e = 0; e < E; e++) if (eAct[e] > 0.001) eAct[e] *= eDecay;
    coreFlash *= Math.exp(-dt * 1.6);

    for (let i = 0; i < maxPulses; i++) {
      const p = pulses[i];
      if (!p.on) continue;
      p.t += (dt * p.v) / Math.max(0.05, g.edgeLen[p.e]);
      if (p.t >= 1) {
        p.on = false;
        arrive(p);
      }
    }
    for (const l of labels) {
      if (!l.on) continue;
      l.age += dt;
      if (l.age > LABEL_LIFE) l.on = false;
    }
    for (const r of rings) {
      if (!r.on) continue;
      r.age += dt;
      if (r.age > RING_LIFE) r.on = false;
    }
  }

  /* ---------- drawing ---------- */
  function bucketize(keys: Uint8Array, n: number, order: Int32Array) {
    bStart.fill(0);
    for (let i = 0; i < n; i++) bStart[keys[i] + 1]++;
    for (let b = 0; b < NB; b++) bStart[b + 1] += bStart[b];
    for (let b = 0; b < NB; b++) bCur[b] = bStart[b];
    for (let i = 0; i < n; i++) order[bCur[keys[i]]++] = i;
  }

  function draw() {
    if (!g) return;
    frameNo++;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    const edges = g.edges;
    const introGlow = introOn ? clamp01((introT - 0.2) / 1.6) : 1;

    // ember core — sits behind the "Y" junction of the mark
    {
      const ccx = sx[g.core] - parX * 0.5;
      const ccy = sy[g.core] - parY * 0.5;
      const beat = 0.82 + 0.18 * Math.sin(time * 1.15);
      const I = introGlow * (beat + coreFlash * 0.55);
      const R = ISO_RADIUS * S * 0.95;
      const gr = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, R);
      gr.addColorStop(0, `rgba(255,128,48,${(0.3 * I).toFixed(3)})`);
      gr.addColorStop(0.3, `rgba(217,76,0,${(0.14 * I).toFixed(3)})`);
      gr.addColorStop(0.65, `rgba(217,76,0,${(0.04 * I).toFixed(3)})`);
      gr.addColorStop(1, 'rgba(217,76,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(ccx - R, ccy - R, R * 2, R * 2);
      const r2 = S * 0.42 * (1 + coreFlash * 0.25);
      ctx.globalAlpha = clamp01(0.55 * I);
      ctx.drawImage(GLOW, ccx - r2, ccy - r2, r2 * 2, r2 * 2);
      ctx.globalAlpha = 1;
    }

    // links, batched by family × alpha level
    for (let e = 0; e < E; e++) {
      const a = edges[e * 2];
      const b = edges[e * 2 + 1];
      const v = ((fg[a] + fg[b]) * 0.5) * Math.min(ia[a], ia[b]);
      eKey[e] = efam[e] * LEVELS + Math.round(v * (LEVELS - 1));
    }
    bucketize(eKey, E, eOrder);
    for (let bkt = 0; bkt < NB; bkt++) {
      const s0 = bStart[bkt];
      const s1 = bStart[bkt + 1];
      const lvl = bkt % LEVELS;
      if (s0 === s1 || lvl === 0) continue;
      const f = (bkt / LEVELS) | 0;
      if (f === FAM_FRAME) {
        ctx.strokeStyle = frameGrad();
        ctx.globalAlpha = (EDGE_MAX[f] * lvl) / (LEVELS - 1);
      } else {
        ctx.strokeStyle = edgeStyle[f][lvl];
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      for (let j = s0; j < s1; j++) {
        const e = eOrder[j];
        const a = edges[e * 2];
        const b = edges[e * 2 + 1];
        ctx.moveTo(sx[a], sy[a]);
        ctx.lineTo(sx[b], sy[b]);
      }
      ctx.lineWidth = EDGE_W[f];
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // recently travelled links glow orange, then cool down
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(255,124,48)';
    for (let e = 0; e < E; e++) {
      const v = eAct[e];
      if (v < 0.02) continue;
      const a = edges[e * 2];
      const b = edges[e * 2 + 1];
      ctx.globalAlpha = Math.min(1, v * 0.5 * (fg[a] + fg[b]) * 0.5 + 0.02);
      ctx.beginPath();
      ctx.moveTo(sx[a], sy[a]);
      ctx.lineTo(sx[b], sy[b]);
      ctx.stroke();
    }
    // links inside the pointer's field
    if (pres > 0.01) {
      ctx.strokeStyle = 'rgb(255,190,140)';
      for (let e = 0; e < E; e++) {
        const a = edges[e * 2];
        const b = edges[e * 2 + 1];
        const v = Math.min(hov[a], hov[b]);
        if (v < 0.01) continue;
        ctx.globalAlpha = v * 0.6;
        ctx.beginPath();
        ctx.moveTo(sx[a], sy[a]);
        ctx.lineTo(sx[b], sy[b]);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    // nodes, batched
    const rs = ui;
    for (let i = 0; i < N; i++) nKey[i] = fam[i] * LEVELS + Math.round(fg[i] * ia[i] * (LEVELS - 1));
    bucketize(nKey, N, nOrder);
    for (let bkt = 0; bkt < NB; bkt++) {
      const s0 = bStart[bkt];
      const s1 = bStart[bkt + 1];
      const lvl = bkt % LEVELS;
      if (s0 === s1 || lvl === 0) continue;
      const f = (bkt / LEVELS) | 0;
      ctx.beginPath();
      for (let j = s0; j < s1; j++) {
        const i = nOrder[j];
        const r = g.size[i] * sk[i] * rs * (0.72 + 0.28 * fg[i]);
        ctx.moveTo(sx[i] + r, sy[i]);
        ctx.arc(sx[i], sy[i], r, 0, TAU);
      }
      ctx.fillStyle = nodeStyle[f][lvl];
      ctx.fill();
    }

    // heartbeat wave + pointer field brighten nodes
    const waveOn = waveAge < 2.2;
    const waveR = waveAge * 1.05 - 0.1;
    ctx.fillStyle = 'rgb(255,214,170)';
    for (let i = 0; i < N; i++) {
      let boost = hov[i] > 0 ? hov[i] : 0;
      if (waveOn) {
        const dw = (rad[i] - waveR) / 0.16;
        boost += 0.42 * Math.exp(-dw * dw) * (1 - waveAge / 2.2);
      }
      if (boost < 0.03) continue;
      const r = g.size[i] * sk[i] * rs * (1 + boost * 0.5);
      ctx.globalAlpha = Math.min(1, boost * fg[i] * ia[i]);
      ctx.beginPath();
      ctx.arc(sx[i], sy[i], r, 0, TAU);
      ctx.fill();
    }

    // pointer lines: the cursor joins the network
    if (pres > 0.02) {
      let m = 0;
      for (let i = 0; i < N; i++) {
        if (hov[i] <= 0.02 || fam[i] === FAM_BACK) continue;
        const dx = sx[i] - pLocalX;
        const dy = sy[i] - pLocalY;
        const d = dx * dx + dy * dy;
        if (m < nearI.length) {
          nearI[m] = i;
          nearD[m] = d;
          m++;
        } else {
          let worst = 0;
          for (let k = 1; k < m; k++) if (nearD[k] > nearD[worst]) worst = k;
          if (d < nearD[worst]) {
            nearI[worst] = i;
            nearD[worst] = d;
          }
        }
      }
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgb(255,170,110)';
      for (let k = 0; k < m; k++) {
        const i = nearI[k];
        ctx.globalAlpha = Math.min(0.85, hov[i] * 1.4);
        ctx.beginPath();
        ctx.moveTo(pLocalX, pLocalY);
        ctx.lineTo(sx[i], sy[i]);
        ctx.stroke();
      }
      ctx.globalAlpha = pres * 0.9;
      ctx.fillStyle = 'rgb(255,190,130)';
      ctx.beginPath();
      ctx.arc(pLocalX, pLocalY, 2, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = pres * 0.35;
      ctx.strokeStyle = 'rgb(255,150,80)';
      ctx.beginPath();
      ctx.arc(pLocalX, pLocalY, 9, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // active nodes
    for (let i = 0; i < N; i++) {
      const a = act[i];
      if (a < 0.03 || ia[i] < 0.2) continue;
      const f = fg[i];
      const r = (7 + 12 * Math.min(1.4, a)) * sk[i] * rs * (0.6 + 0.4 * f);
      ctx.globalAlpha = Math.min(1, a * 0.75) * (0.35 + 0.65 * f);
      ctx.drawImage(GLOW, sx[i] - r, sy[i] - r, r * 2, r * 2);
      ctx.globalAlpha = Math.min(1, a) * (0.4 + 0.6 * f);
      ctx.fillStyle = a > 1 ? 'rgb(255,226,170)' : 'rgb(255,176,110)';
      ctx.beginPath();
      ctx.arc(sx[i], sy[i], g.size[i] * sk[i] * rs * (1 + 0.35 * Math.min(1, a)), 0, TAU);
      ctx.fill();
    }

    // pulses: a short comet along the link
    for (let i = 0; i < maxPulses; i++) {
      const p = pulses[i];
      if (!p.on) continue;
      const ax = sx[p.a];
      const ay = sy[p.a];
      const bx = sx[p.b];
      const by = sy[p.b];
      const t = p.t;
      const t0 = Math.max(0, t - 0.6);
      const hx = ax + (bx - ax) * t;
      const hy = ay + (by - ay) * t;
      const tx = ax + (bx - ax) * t0;
      const ty = ay + (by - ay) * t0;
      const f = fg[p.a] + (fg[p.b] - fg[p.a]) * t;
      const k = sk[p.a] + (sk[p.b] - sk[p.a]) * t;
      const alpha = (0.3 + 0.7 * f) * Math.min(ia[p.a], ia[p.b]);
      if (alpha < 0.02) continue;
      const tg = ctx.createLinearGradient(tx, ty, hx, hy);
      tg.addColorStop(0, 'rgba(255,120,40,0)');
      tg.addColorStop(1, 'rgba(255,186,110,1)');
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = tg;
      ctx.lineWidth = 1.4 * k;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      const r = 9 * k * rs * p.hot;
      ctx.globalAlpha = alpha * 0.9;
      ctx.drawImage(GLOW, hx - r, hy - r, r * 2, r * 2);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgb(255,240,214)';
      ctx.beginPath();
      ctx.arc(hx, hy, 1.25 * k, 0, TAU);
      ctx.fill();
    }

    // burst rings
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(255,140,66)';
    for (const r of rings) {
      if (!r.on) continue;
      for (let w = 0; w < 2; w++) {
        const age = r.age - w * 0.16;
        if (age <= 0) continue;
        const q = clamp01(age / (RING_LIFE - 0.16));
        const rr = (6 + 92 * easeOutExpo(q)) * ui;
        ctx.globalAlpha = (1 - q) * (1 - q) * (w ? 0.35 : 0.7);
        ctx.beginPath();
        ctx.arc(sx[r.node], sy[r.node], rr, 0, TAU);
        ctx.stroke();
      }
    }

    // labels sit on top, with normal blending so their pill reads
    ctx.globalCompositeOperation = 'source-over';
    for (const l of labels) if (l.on) drawLabel(l);
    ctx.globalAlpha = 1;
  }

  /** The logo's vertical gradient (sun → orange → deep), spanning the cube on screen. */
  let gradCache: CanvasGradient | null = null;
  let gradFrame = -1;
  let frameNo = 0;
  function frameGrad(): CanvasGradient {
    if (gradCache && gradFrame === frameNo) return gradCache;
    const cy = H / 2 + parY;
    const r = ISO_RADIUS * S * 1.05;
    const gr = ctx.createLinearGradient(0, cy - r, 0, cy + r);
    gr.addColorStop(0, 'rgb(255,214,96)');
    gr.addColorStop(0.42, 'rgb(250,150,52)');
    gr.addColorStop(1, 'rgb(226,84,12)');
    gradCache = gr;
    gradFrame = frameNo;
    return gr;
  }

  function pill(x: number, y: number, w: number, h: number) {
    const r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + r, r, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.closePath();
  }

  function drawLabel(l: Label) {
    const age = l.age;
    const a =
      age < LABEL_IN
        ? easeOutExpo(age / LABEL_IN)
        : age < LABEL_IN + LABEL_HOLD
          ? 1
          : 1 - clamp01((age - LABEL_IN - LABEL_HOLD) / LABEL_OUT);
    if (a <= 0.01) return;
    const s = l.side;
    const nx = sx[l.node];
    const ny = sy[l.node];
    const ex = nx + s * 12;
    const ey = ny - 14;
    const slide = age < LABEL_IN ? (1 - a) * 8 * s : 0;
    const x0 = ex + s * 6 + slide;
    const left = s > 0 ? x0 : x0 - l.w;
    const ph = 21;
    const top = ey - ph / 2;

    // target ring + leader
    ctx.globalAlpha = a;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,132,66,0.95)';
    ctx.beginPath();
    ctx.arc(nx, ny, 4.6, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,132,66,0.55)';
    ctx.beginPath();
    ctx.moveTo(nx + s * 3.4, ny - 3.4);
    ctx.lineTo(ex, ey);
    ctx.lineTo(x0, ey);
    ctx.stroke();

    // pill
    pill(left, top, l.w, ph);
    ctx.fillStyle = 'rgba(14,12,12,0.86)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.13)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(245,131,39)';
    ctx.beginPath();
    ctx.arc(left + 10.5, ey, 2.3, 0, TAU);
    ctx.fill();

    // typed text + caret
    ctx.font = FONT;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const typed = clamp01((age - 0.05) / 0.4);
    const n = Math.ceil(l.op.length * typed);
    const tx = left + 19;
    ctx.fillStyle = 'rgb(244,239,233)';
    ctx.fillText(n >= l.op.length ? l.op : l.op.slice(0, n), tx, ey + 0.5);
    if (typed < 1) {
      const cw = l.opW / l.op.length;
      ctx.fillStyle = 'rgba(255,132,66,0.9)';
      ctx.fillRect(tx + n * cw + 1, ey - 5, Math.max(4, cw * 0.8), 10);
    }
    const msA = clamp01((age - 0.48) / 0.3);
    if (msA > 0) {
      ctx.globalAlpha = a * msA;
      ctx.fillStyle = 'rgb(184,176,170)';
      ctx.fillText(l.ms, tx + l.opW + 9, ey + 0.5);
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- still frame (reduced motion) ---------- */
  function renderStill() {
    if (!g || W < 8) return;
    stillDirty = false;
    // deterministic: same frame on every load and resize
    const seeded = mulberry32(20261101);
    const prevRnd = rnd;
    rnd = seeded;
    time = 0;
    introOn = false;
    introT = 9;
    act.fill(0);
    eAct.fill(0);
    for (const p of pulses) p.on = false;
    for (const l of labels) l.on = false;
    for (const r of rings) r.on = false;
    pKnown = false;
    pres = 0;
    tYaw = tPitch = vYaw = vPitch = 0;
    waveAge = 3; // no wave in the still frame
    lastLabelAt = -10;
    const dt = 1 / 30;
    for (let f = 0; f < 150; f++) step(dt);
    // pose: the brand mark, with a hint of depth
    time = 0;
    yaw = 0.06;
    pitch = 0.015;
    waveAge = 3;
    coreFlash = 0.35;
    project();
    // two labels, fully typed, mid-hold — placed against the final pose
    for (const l of labels) l.on = false;
    let placed = 0;
    for (let tries = 0; tries < 400 && placed < 2; tries++) {
      const n = 1 + Math.floor(seeded() * (N - 1));
      if (!g.hub[n]) continue;
      if (requestLabel(n, Math.floor(seeded() * ops.length), true)) {
        placed++;
        act[n] = Math.max(act[n], 0.9);
      }
    }
    for (const l of labels) if (l.on) l.age = LABEL_IN + 0.6;
    draw();
    rnd = prevRnd;
  }

  /* ---------- loop ---------- */
  function frame(now: number) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const raw = (now - last) / 1000;
    last = now;
    const dt = Math.min(0.05, Math.max(0, raw));
    step(dt);
    draw();
    // watchdog: if the device can't hold ~40 fps after the intro, drop to DPR 1 and fewer pulses
    if (!perfDone && !introOn) {
      perfFrames++;
      perfSum += raw;
      if (perfFrames >= 90) {
        perfDone = true;
        if (perfSum / perfFrames > 0.026 && dprCap > 1) {
          dprCap = 1;
          lowPower = true;
          resize(W, H);
        }
      }
    }
  }

  function setState(v: string) {
    if (host.dataset.state !== v) host.dataset.state = v;
  }

  function start() {
    if (running || destroyed) return;
    running = true;
    setState('running');
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    setState(still ? 'still' : 'paused');
    perfFrames = 0;
    perfSum = 0;
  }

  function sync() {
    if (destroyed) return;
    const canRun = visible && !document.hidden && !still && !!g && W > 0;
    if (canRun) start();
    else stop();
    if (still && visible && stillDirty) renderStill();
  }

  /* ---------- wiring ---------- */
  const ro = new ResizeObserver((entries) => {
    const r = entries[0]?.contentRect;
    if (!r) return;
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w === W && h === H) return;
    resize(w, h);
    sync();
  });
  ro.observe(host);

  const io = new IntersectionObserver(
    (entries) => {
      const en = entries[entries.length - 1];
      visible = !!en && en.isIntersecting;
      if (visible) measureClip();
      sync();
    },
    { rootMargin: '80px 0px' },
  );
  io.observe(canvas);

  const onVis = () => sync();
  const onMq = () => {
    still = !!opts.still || mq.matches;
    stillDirty = true;
    if (!still) {
      // resume the living version from a clean slate
      act.fill(0);
      introOn = false;
    }
    sync();
  };
  const onWinResize = () => measureClip();

  document.addEventListener('visibilitychange', onVis);
  mq.addEventListener('change', onMq);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  window.addEventListener('resize', onWinResize, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  window.addEventListener('blur', onLeave);

  if (document.fonts && document.fonts.load) {
    const ready = () => {
      if (fontOk || destroyed) return;
      fontOk = true;
      if (still) {
        stillDirty = true;
        sync();
      }
    };
    document.fonts.load(FONT).then(ready, ready);
    window.setTimeout(() => (fontOk = true), 1500);
  } else fontOk = true;

  // first size synchronously so there is no blank frame once visible
  {
    const r = host.getBoundingClientRect();
    resize(Math.round(r.width), Math.round(r.height));
  }

  return {
    destroy() {
      destroyed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', onMq);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', onWinResize);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    },
  };
}
