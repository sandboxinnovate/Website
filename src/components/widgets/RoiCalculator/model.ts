/**
 * RoiCalculator — the arithmetic, kept apart from the UI so it is easy to audit.
 *
 * hours given back / year = people × hours per week × working weeks × automation share
 * value / year            = hours given back × loaded hourly cost (the client's own cost, never a Sandbox price)
 * full-time equivalent    = people × hours per week × automation share ÷ 40 h
 *
 * The 12-month curve applies a short rollout ramp: AI does not take over 40 % of the work on day one.
 */
import type { Lang } from '@/i18n';

export type Currency = 'USD' | 'EUR';
export const CURRENCIES: Currency[] = ['USD', 'EUR'];

export const WEEKS_PER_YEAR = 46; // 52 minus holidays and vacation
export const FTE_HOURS_PER_WEEK = 40;
/** Share of full pace reached in months 1…12 (rollout ramp). */
export const RAMP = [0.15, 0.4, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 1, 1];

export interface Inputs {
  people: number;
  hours: number; // per person per week
  rate: number; // loaded cost per hour, in the chosen currency
  automation: number; // 0–100
}

export interface Result {
  totalHours: number; // repetitive hours a year, before AI
  hoursBack: number;
  value: number;
  fte: number;
  /** Cumulative value at the end of months 1…12, with the rollout ramp. */
  cumulative: number[];
  /** Cumulative value at the end of months 1…12, at full pace from day one. */
  fullPace: number[];
  year1: number;
}

export function compute(i: Inputs): Result {
  const a = i.automation / 100;
  const totalHours = i.people * i.hours * WEEKS_PER_YEAR;
  const hoursBack = totalHours * a;
  const value = hoursBack * i.rate;
  const fte = (i.people * i.hours * a) / FTE_HOURS_PER_WEEK;
  const monthly = value / 12;
  let acc = 0;
  const cumulative = RAMP.map((r) => (acc += monthly * r));
  const fullPace = RAMP.map((_, m) => monthly * (m + 1));
  return { totalHours, hoursBack, value, fte, cumulative, fullPace, year1: acc };
}

/* --------------------------------------------------------------------------
   Controls
--------------------------------------------------------------------------- */
export type FieldId = 'people' | 'hours' | 'rate' | 'automation';

export interface FieldSpec {
  id: FieldId;
  min: number;
  max: number;
  step: number;
  scale: 'linear' | 'log';
  /** Labelled ticks. */
  major: number[];
  /** Unlabelled hairline ticks. */
  minor: number[];
  /** Highlighted "realistic" band on the track. */
  band?: [number, number];
}

const range = (a: number, b: number, s: number) => {
  const out: number[] = [];
  for (let v = a; v <= b + 1e-9; v += s) out.push(Math.round(v * 100) / 100);
  return out;
};

export const FIELDS: Record<FieldId, FieldSpec> = {
  people: {
    id: 'people', min: 1, max: 500, step: 1, scale: 'log',
    major: [1, 5, 10, 25, 50, 100, 250, 500],
    minor: [2, 3, 4, 6, 7, 8, 9, 15, 20, 30, 40, 60, 70, 80, 90, 150, 200, 300, 400],
  },
  hours: {
    id: 'hours', min: 1, max: 30, step: 1, scale: 'linear',
    major: [1, 10, 20, 30],
    minor: range(2, 29, 1).filter((v) => v % 10 !== 0),
  },
  rate: {
    id: 'rate', min: 10, max: 200, step: 1, scale: 'linear',
    major: [10, 50, 100, 150, 200],
    minor: range(20, 190, 10).filter((v) => v % 50 !== 0),
  },
  automation: {
    id: 'automation', min: 20, max: 70, step: 5, scale: 'linear',
    major: [20, 30, 40, 50, 60, 70],
    minor: [25, 35, 45, 55, 65],
    band: [30, 50],
  },
};

export const DEFAULTS: Inputs = { people: 25, hours: 8, rate: 40, automation: 40 };

/** 0…1 position of a value on the track. */
export function toPos(f: FieldSpec, v: number): number {
  const c = clamp(v, f.min, f.max);
  if (f.scale === 'log') return Math.log(c / f.min) / Math.log(f.max / f.min);
  return (c - f.min) / (f.max - f.min);
}

/** Value at a 0…1 position, snapped to a step that feels natural at that magnitude. */
export function fromPos(f: FieldSpec, t: number): number {
  const p = clamp(t, 0, 1);
  if (f.scale === 'log') return snapPeople(f.min * Math.pow(f.max / f.min, p));
  return clamp(Math.round((f.min + p * (f.max - f.min)) / f.step) * f.step, f.min, f.max);
}

function snapPeople(v: number): number {
  const s = peopleStep(v);
  return clamp(Math.round(v / s) * s, 1, 500);
}

/** Keyboard / drag step for the people slider: 1 under 20, then 5, 10, 25. */
export function peopleStep(v: number): number {
  if (v < 20) return 1;
  if (v < 100) return 5;
  if (v < 250) return 10;
  return 25;
}

export function nudge(f: FieldSpec, v: number, dir: 1 | -1, big = false): number {
  if (f.scale === 'log') {
    if (big) return clamp(Math.round(dir > 0 ? v * 1.5 : v / 1.5), f.min, f.max);
    const s = peopleStep(dir > 0 ? v : v - 1);
    // land on the step grid first (e.g. 23 → 25 / 20), then move by whole steps
    const next = dir > 0 ? Math.floor(v / s) * s + s : Math.ceil(v / s) * s - s;
    return clamp(next, f.min, f.max);
  }
  const s = big ? f.step * (f.id === 'automation' ? 2 : 5) : f.step;
  return clamp(v + dir * s, f.min, f.max);
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

/** Parse a typed value ("1,200", "45.5", "€40") — returns null when there is no number in it. */
export function parseTyped(raw: string): number | null {
  const digits = raw.replace(/[^\d.,-]/g, '').replace(/,/g, '');
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

/* --------------------------------------------------------------------------
   Formatting
--------------------------------------------------------------------------- */
export const LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-419' };

export function fmtInt(lang: Lang, n: number): string {
  return new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function fmtDec(lang: Lang, n: number, digits = 1): string {
  return new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
}

/**
 * Compact amounts are formatted by hand (not Intl "compact"): server and browser ICU builds
 * disagree on compact output ("$75K" vs "$75.0K"), which would break hydration.
 */
function compact(lang: Lang, n: number): string {
  const a = Math.abs(n);
  const trim = (v: number) => fmtDec(lang, v, 1).replace(/[.,]0$/, '');
  if (a >= 1_000_000) return `${trim(n / 1_000_000)}${lang === 'es' ? ' M' : 'M'}`;
  if (a >= 1_000) return `${trim(n / 1_000)}${lang === 'es' ? ' mil' : 'K'}`;
  return fmtInt(lang, n);
}

/** Full amount under 10M ("$165,600"), compact above ("$96.6M"). */
export function fmtMoney(lang: Lang, cur: Currency, n: number): string {
  if (Math.abs(n) >= 10_000_000) return `${currencySymbol(lang, cur)}${compact(lang, n)}`;
  return new Intl.NumberFormat(LOCALE[lang], {
    style: 'currency',
    currency: cur,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/** Axis labels: "$50K", "$1.2M" (es: "$50 mil", "$1.2 M"). */
export function fmtMoneyShort(lang: Lang, cur: Currency, n: number): string {
  return `${currencySymbol(lang, cur)}${compact(lang, n)}`;
}

export function currencySymbol(_lang: Lang, cur: Currency): string {
  return cur === 'EUR' ? '€' : '$';
}

/** A "nice" axis maximum ≥ v: 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8 × 10^k. */
export function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const k = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / k;
  const steps = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const s = steps.find((x) => x >= m - 1e-9) ?? 10;
  return s * k;
}

/** Hours per dot so the matrix shows at most `maxDots` dots. */
export const DOT_STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000];
export function hoursPerDot(total: number, maxDots: number): number {
  return DOT_STEPS.find((n) => Math.ceil(total / n) <= maxDots) ?? DOT_STEPS[DOT_STEPS.length - 1];
}

/** Query string for the contact hand-off. */
export function handoffQuery(i: Inputs, cur: Currency): string {
  const q = new URLSearchParams({
    from: 'roi',
    people: String(i.people),
    hours: String(i.hours),
    rate: String(i.rate),
    currency: cur,
    automation: String(i.automation),
  });
  return q.toString();
}
