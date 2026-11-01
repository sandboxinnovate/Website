import { useEffect, useRef } from 'react';
import type { Lang } from '@/i18n';
import { pickS, type ScenarioDef } from './scenarios';

/**
 * Timeline engine for the simulated run.
 *
 * - `cursor` is timeline time (ms at 1×). It stops at a human gate until the gate is approved.
 * - `extra` is the time spent waiting at the gate; the visible clock is cursor + extra.
 * Everything visual derives from these two numbers, so the run can pause, change speed
 * or jump to its final state without any per-element bookkeeping.
 */

export const LEAD_IN = 650; // idle time before the trigger fires
export const HANDOFF = 560; // a light packet travels to the next node
export const OUTCOME_DELAY = 750; // outcome card opens, then the artifact types out
export const TYPE_MS = 8; // per character
export const AUTO_APPROVE_MS = 6000; // demo convenience: approve if nobody clicks
export const STATIC_GATE_WAIT = 3400; // nominal wait shown in the reduced-motion final state

export type NodeState = 'idle' | 'running' | 'gate' | 'done';
export type ChipState = 'idle' | 'running' | 'done';

interface LineBase { id: string; at: number; step: number; minor?: boolean }
export type TLine =
  | (LineBase & { k: 'step' })
  | (LineBase & { k: 'event'; text: string })
  | (LineBase & { k: 'call'; fn: string; args: string; code: number; ms: number; chip?: number })
  | (LineBase & { k: 'think' | 'info' | 'warn'; text: string })
  | (LineBase & { k: 'gate' })
  | (LineBase & { k: 'done' });

export interface TLStep { start: number; end: number; gateAt: number | null }

export interface Timeline {
  steps: TLStep[];
  lines: TLine[];
  runEnd: number;
  typeStart: number;
  typeEnd: number;
  gateStep: number;
  gateAt: number | null;
}

export function buildTimeline(sc: ScenarioDef, lang: Lang): Timeline {
  const steps: TLStep[] = [];
  const lines: TLine[] = [];
  let t = LEAD_IN;
  let gateStep = -1;
  let gateAt: number | null = null;

  sc.steps.forEach((s, i) => {
    const start = t;
    const end = t + s.dur;
    const g = s.gate ? start + s.gate.at : null;
    if (g !== null) { gateStep = i; gateAt = g; }
    steps.push({ start, end, gateAt: g });
    lines.push({ id: `${i}-h`, at: start, step: i, k: 'step' });
    s.logs.forEach((d, j) => {
      const id = `${i}-${j}`;
      const at = start + d.t;
      if (d.k === 'call') {
        lines.push({ id, at, step: i, k: 'call', fn: d.fn, args: pickS(d.args, lang), code: d.code, ms: d.ms, chip: d.chip, minor: d.minor });
      } else {
        lines.push({ id, at, step: i, k: d.k, text: pickS(d.text, lang), minor: d.minor } as TLine);
      }
    });
    if (g !== null) lines.push({ id: `${i}-g`, at: g, step: i, k: 'gate' });
    lines.push({ id: `${i}-d`, at: end, step: i, k: 'done' });
    t = end + HANDOFF;
  });

  lines.sort((a, b) => a.at - b.at);
  const runEnd = steps[steps.length - 1].end;
  const typeStart = runEnd + OUTCOME_DELAY;
  const typeEnd = typeStart + sc.outcome.artifact.body[lang].length * TYPE_MS + 200;
  return { steps, lines, runEnd, typeStart, typeEnd, gateStep, gateAt };
}

/* ------------------------------------------------------------------ state */

export interface EngineState {
  cursor: number;
  extra: number;
  approved: null | 'you' | 'auto' | 'static';
  approvedAfter: number;
}

export const freshEngine = (): EngineState => ({ cursor: 0, extra: 0, approved: null, approvedAfter: 0 });

export const atGate = (tl: Timeline, e: EngineState) => tl.gateAt !== null && !e.approved && e.cursor >= tl.gateAt;

/** Advance the run by `dt` real milliseconds at `speed`. Mutates `e`. */
export function advance(tl: Timeline, e: EngineState, dt: number, speed: number) {
  const sdt = dt * speed;
  if (atGate(tl, e)) {
    e.extra += sdt;
    if (e.extra >= AUTO_APPROVE_MS) { e.approved = 'auto'; e.approvedAfter = e.extra; }
    return;
  }
  let next = e.cursor + sdt;
  if (tl.gateAt !== null && !e.approved && next > tl.gateAt) next = tl.gateAt;
  e.cursor = Math.min(next, tl.typeEnd);
}

export function nodeState(tl: Timeline, i: number, cursor: number, approved: boolean): NodeState {
  const s = tl.steps[i];
  if (cursor < s.start) return 'idle';
  if (cursor >= s.end) return 'done';
  if (s.gateAt !== null && !approved && cursor >= s.gateAt) return 'gate';
  return 'running';
}

export function chipStates(tl: Timeline, step: number, count: number, cursor: number): ChipState[] {
  const out: ChipState[] = Array.from({ length: count }, () => 'idle');
  for (const l of tl.lines) {
    if (l.k !== 'call' || l.step !== step || l.chip === undefined) continue;
    out[l.chip] = cursor < l.at ? 'idle' : cursor < l.at + l.ms ? 'running' : 'done';
  }
  if (cursor >= tl.steps[step].end) out.fill('done');
  return out;
}

/** Visible clock: timeline time plus the human wait. */
export const elapsedOf = (tl: Timeline, e: EngineState) => Math.min(e.cursor, tl.runEnd) + e.extra;

/** Clock value at which a line was printed. */
export const lineClock = (tl: Timeline, e: EngineState, at: number) => at + (tl.gateAt !== null && at > tl.gateAt ? e.extra : 0);

/** A compact key that changes only when something discrete on screen changes. */
export function viewKey(tl: Timeline, e: EngineState): string {
  const c = e.cursor;
  let n = 0;
  let r = 0;
  for (const l of tl.lines) {
    if (l.at > c) break;
    n++;
    if (l.k === 'call' && c >= l.at + l.ms) r++;
  }
  let st = '';
  for (let i = 0; i < tl.steps.length; i++) st += nodeState(tl, i, c, !!e.approved)[0];
  const gate = atGate(tl, e) ? Math.ceil((AUTO_APPROVE_MS - e.extra) / 1000) : 0;
  const phase = c >= tl.typeEnd ? 2 : c >= tl.runEnd ? 1 : 0;
  return `${n}.${r}.${st}.${gate}.${e.approved ?? '-'}.${phase}`;
}

/* --------------------------------------------------------------- format */

const dec = (s: string, lang: Lang) => (lang === 'es' ? s.replace('.', ',') : s);

/** 00:12.48 */
export function fmtClock(ms: number, lang: Lang): string {
  const cs = Math.max(0, Math.floor(ms / 10));
  const m = Math.floor(cs / 6000);
  const s = (cs % 6000) / 100;
  return `${String(m).padStart(2, '0')}:${dec(s.toFixed(2).padStart(5, '0'), lang)}`;
}

/** 12.4s / 12,4 s */
export function fmtSec(ms: number, lang: Lang): string {
  const v = (ms / 1000).toFixed(1);
  return lang === 'es' ? `${v.replace('.', ',')} s` : `${v}s`;
}

/** Tool latency, code-style (same in both languages). */
export const fmtLatency = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`);

export const pad2 = (n: number) => String(n).padStart(2, '0');

/* ---------------------------------------------------------- frame hooks */

export type FrameFn = (e: EngineState) => void;
export type FrameRegistry = { current: Set<FrameFn> };

/**
 * Register a per-frame DOM updater (timer text, progress bars, packets, typing).
 * These run outside React renders so the console stays smooth.
 */
export function useFrame(reg: FrameRegistry, fn: FrameFn) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const f: FrameFn = (e) => ref.current(e);
    reg.current.add(f);
    return () => { reg.current.delete(f); };
  }, [reg]);
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
