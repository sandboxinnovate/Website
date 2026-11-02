/**
 * AI Readiness Diagnostic: the scoring model.
 * Pure, deterministic functions: the same answers always produce the same score, level and moves.
 *
 *  - 10 questions, 2 per dimension, 4 ordered options each (0 = least mature … 3 = most mature).
 *  - Dimension score = points / max points × 100 (0, 17, 33, 50, 67, 83 or 100).
 *  - Overall = 80% average of the five dimensions + 20% the weakest one, because the weakest
 *    dimension is what usually stalls a rollout. Rounded to an integer 0-100.
 *  - Level thresholds: Explorer < 30 ≤ Builder < 55 ≤ Operator < 80 ≤ AI-native.
 *  - Moves: one per weakest dimension (3); the "build on it" variant only from 67 up,
 *    otherwise the "foundations" variant;
 *    above 70 overall, the third move becomes "point AI at growth".
 */
import type { UnitSlug } from '@/data/site';

export type DimId = 'strategy' | 'data' | 'processes' | 'people' | 'stack';
export const DIMS: DimId[] = ['strategy', 'data', 'processes', 'people', 'stack'];

export interface QuestionDef {
  id: string;
  dim: DimId;
}

/** Question order = dimension order (two per dimension). Copy lives in copy.ts under the same ids. */
export const QUESTIONS: QuestionDef[] = [
  { id: 'q01', dim: 'strategy' },
  { id: 'q02', dim: 'strategy' },
  { id: 'q03', dim: 'data' },
  { id: 'q04', dim: 'data' },
  { id: 'q05', dim: 'processes' },
  { id: 'q06', dim: 'processes' },
  { id: 'q07', dim: 'people' },
  { id: 'q08', dim: 'people' },
  { id: 'q09', dim: 'stack' },
  { id: 'q10', dim: 'stack' },
];
export const N_QUESTIONS = QUESTIONS.length;
export const N_OPTIONS = 4;
const MAX_POINTS = N_OPTIONS - 1;

export type LevelId = 'explorer' | 'builder' | 'operator' | 'native';
export const LEVELS: { id: LevelId; min: number; max: number }[] = [
  { id: 'explorer', min: 0, max: 29 },
  { id: 'builder', min: 30, max: 54 },
  { id: 'operator', min: 55, max: 79 },
  { id: 'native', min: 80, max: 100 },
];

export type MoveId =
  | 'diagnostic' | 'headOfAi'
  | 'knowledge' | 'brain'
  | 'sprint' | 'agents'
  | 'workshop' | 'leaders'
  | 'connect' | 'packaged'
  | 'growth';

export const MOVE_UNIT: Record<MoveId, UnitSlug> = {
  diagnostic: 'consulting',
  headOfAi: 'consulting',
  knowledge: 'brains',
  brain: 'brains',
  sprint: 'consulting',
  agents: 'brains',
  workshop: 'academy',
  leaders: 'academy',
  connect: 'brains',
  packaged: 'products',
  growth: 'growth',
};

/** [foundations variant, build-on-it variant (score ≥ HIGH_FROM)] per dimension. */
const HIGH_FROM = 67;
const DIM_MOVES: Record<DimId, [MoveId, MoveId]> = {
  strategy: ['diagnostic', 'headOfAi'],
  data: ['knowledge', 'brain'],
  processes: ['sprint', 'agents'],
  people: ['workshop', 'leaders'],
  stack: ['connect', 'packaged'],
};

export type Answers = (number | null)[];
export type DimScores = Record<DimId, number>;

export const emptyAnswers = (): Answers => Array.from({ length: N_QUESTIONS }, () => null);

export const isComplete = (a: Answers) => a.length === N_QUESTIONS && a.every((v) => v !== null);

export function firstUnanswered(a: Answers): number {
  const i = a.findIndex((v) => v === null);
  return i === -1 ? N_QUESTIONS - 1 : i;
}

/** Final dimension scores (unanswered counts as 0). */
export function dimensionScores(a: Answers): DimScores {
  const out = {} as DimScores;
  for (const d of DIMS) {
    const qs = QUESTIONS.map((q, i) => (q.dim === d ? i : -1)).filter((i) => i >= 0);
    const pts = qs.reduce((s, i) => s + (a[i] ?? 0), 0);
    out[d] = Math.round((pts / (qs.length * MAX_POINTS)) * 100);
  }
  return out;
}

/** Live (partial) scores: average of the answered questions per dimension, or null when none yet. */
export function partialScores(a: Answers): Record<DimId, number | null> {
  const out = {} as Record<DimId, number | null>;
  for (const d of DIMS) {
    const vals = QUESTIONS.map((q, i) => (q.dim === d ? a[i] : null)).filter((v): v is number => v !== null && v !== undefined);
    out[d] = vals.length ? Math.round((vals.reduce((s, v) => s + v, 0) / (vals.length * MAX_POINTS)) * 100) : null;
  }
  return out;
}

export function overallScore(d: DimScores): number {
  const vals = DIMS.map((k) => d[k]);
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  const min = Math.min(...vals);
  return Math.round(0.8 * mean + 0.2 * min);
}

export function levelIndex(score: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) if (score >= LEVELS[i].min) return i;
  return 0;
}

/** Dimensions sorted weakest first; ties keep the foundational order (strategy → stack). */
export function rankDims(d: DimScores): DimId[] {
  return DIMS.slice().sort((a, b) => d[a] - d[b] || DIMS.indexOf(a) - DIMS.indexOf(b));
}

export interface Move {
  id: MoveId;
  unit: UnitSlug;
  /** The dimension that triggered it (null for the growth move). */
  dim: DimId | null;
}

export function pickMoves(d: DimScores, overall: number): Move[] {
  const moves: Move[] = rankDims(d)
    .slice(0, 3)
    .map((dim) => {
      const id = DIM_MOVES[dim][d[dim] >= HIGH_FROM ? 1 : 0];
      return { id, unit: MOVE_UNIT[id], dim };
    });
  if (overall >= 70) moves[2] = { id: 'growth', unit: MOVE_UNIT.growth, dim: null };
  return moves;
}

export interface Result {
  dims: DimScores;
  score: number;
  level: number;
  levelId: LevelId;
  ranked: DimId[];
  moves: Move[];
  runId: string;
}

export function evaluate(a: Answers): Result {
  const dims = dimensionScores(a);
  const score = overallScore(dims);
  const level = levelIndex(score);
  return { dims, score, level, levelId: LEVELS[level].id, ranked: rankDims(dims), moves: pickMoves(dims, score), runId: runId(a) };
}

/** Short deterministic id for a set of answers (FNV-1a), shown as a "run" reference. */
export function runId(a: Answers): string {
  let h = 0x811c9dc5;
  const s = a.map((v) => (v === null ? '-' : String(v))).join('');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0').slice(0, 4);
}

/* ------------------------------------------------------------------
   Illustrative archetypes (teaser only, not client data)
------------------------------------------------------------------- */
export const ARCHETYPES: { level: LevelId; dims: number[] }[] = [
  { level: 'explorer', dims: [17, 33, 17, 33, 0] },
  { level: 'builder', dims: [50, 33, 50, 67, 33] },
  { level: 'operator', dims: [67, 83, 67, 50, 83] },
  { level: 'native', dims: [100, 83, 100, 83, 100] },
];

export function archetypeScore(dims: number[]): number {
  const mean = dims.reduce((s, v) => s + v, 0) / dims.length;
  return Math.round(0.8 * mean + 0.2 * Math.min(...dims));
}

/* ------------------------------------------------------------------
   Session persistence (sessionStorage; never throws)
------------------------------------------------------------------- */
export const STORAGE_KEY = 'sbx:diagnostic:v1';
/** Query param the teaser uses to hand over the first answer (1-4). */
export const HANDOFF_PARAM = 'q1';

export interface Saved {
  answers: Answers;
  step: number;
  phase: 'questions' | 'results';
  /** Email the report was requested for (lead already sent). */
  sentTo?: string | null;
}

export function loadSaved(): Saved | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Partial<Saved>;
    if (!Array.isArray(s.answers) || s.answers.length !== N_QUESTIONS) return null;
    const answers: Answers = s.answers.map((v) => (typeof v === 'number' && v >= 0 && v < N_OPTIONS ? Math.floor(v) : null));
    const step = typeof s.step === 'number' ? Math.min(Math.max(0, Math.floor(s.step)), N_QUESTIONS - 1) : 0;
    const phase = s.phase === 'results' && isComplete(answers) ? 'results' : 'questions';
    return { answers, step, phase, sentTo: typeof s.sentTo === 'string' ? s.sentTo : null };
  } catch {
    return null;
  }
}

export function saveState(s: Saved) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable (private mode, quota): the widget still works in memory */
  }
}

export function clearSaved() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
