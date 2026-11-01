import type { Lang } from '@/i18n';
import { UNITS, type UnitSlug } from '@/data/site';
import { isValidEmail } from '@/lib/leads';
import type { FlowCopy } from './copy';

export type Need = UnitSlug | 'unsure';
export const NEEDS: Need[] = [...UNITS.map((u) => u.slug), 'unsure'];

export interface Draft {
  needs: Need[];
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  size: string;
  region: string;
  language: Lang;
  goal: string;
  timeline: string;
  source: string;
}

export interface Context {
  from: 'roi' | 'diagnostic';
  data: Record<string, string>;
}

export type FieldKey = Exclude<keyof Draft, 'needs' | 'language'> | 'needs';

export const GOAL_MIN = 20;
export const GOAL_MAX = 1000;
export const STEP_COUNT = 4;

export const emptyDraft = (lang: Lang): Draft => ({
  needs: [],
  name: '',
  email: '',
  company: '',
  role: '',
  website: '',
  size: '',
  region: '',
  language: lang,
  goal: '',
  timeline: '',
  source: '',
});

const FREE_MAIL = /@(gmail|googlemail|hotmail|outlook|live|yahoo|ymail|icloud|me|aol|proton|protonmail|gmx|mail|yandex)\.[a-z.]+$/i;
export const isFreeMail = (email: string) => FREE_MAIL.test(email.trim());

/** Loose domain check: "acme.com", "https://www.acme.co.uk/about". */
export const isValidWebsite = (v: string) => /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.trim());
export const normalizeWebsite = (v: string) => {
  const s = v.trim();
  if (!s) return '';
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

/** Errors for one step (0-based). Empty object = valid. */
export function validate(step: number, d: Draft, t: FlowCopy): Partial<Record<FieldKey, string>> {
  const e: Partial<Record<FieldKey, string>> = {};
  if (step === 0) {
    if (!d.needs.length) e.needs = t.s1.error;
  }
  if (step === 1) {
    if (!d.name.trim()) e.name = t.s2.err.name;
    if (!d.email.trim()) e.email = t.s2.err.email;
    else if (!isValidEmail(d.email)) e.email = t.s2.err.emailBad;
    if (!d.company.trim()) e.company = t.s2.err.company;
    if (d.website.trim() && !isValidWebsite(d.website)) e.website = t.s2.err.website;
    if (!d.size) e.size = t.s2.err.size;
    if (!d.region) e.region = t.s2.err.region;
  }
  if (step === 2) {
    const g = d.goal.trim();
    if (!g) e.goal = t.s3.err.goal;
    else if (g.length < GOAL_MIN) e.goal = t.s3.err.goalShort;
    if (!d.timeline) e.timeline = t.s3.err.timeline;
  }
  return e;
}

/** Field order per step, used to focus the first invalid field. */
export const STEP_FIELDS: FieldKey[][] = [
  ['needs'],
  ['name', 'email', 'company', 'role', 'website', 'size', 'region'],
  ['goal', 'timeline', 'source'],
  [],
];

/* ------------------------------------------------------------------ session draft */

const KEY = 'sbx:contact:draft:v1';

interface Stored {
  draft: Draft;
  step: number;
  maxStep: number;
  context: Context | null;
}

export function loadDraft(): Stored | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Stored>;
    if (!v || typeof v !== 'object' || !v.draft) return null;
    const d = v.draft as Partial<Draft>;
    const str = (x: unknown) => (typeof x === 'string' ? x.slice(0, 2000) : '');
    const draft: Draft = {
      needs: Array.isArray(d.needs) ? (d.needs.filter((n) => (NEEDS as string[]).includes(n)) as Need[]) : [],
      name: str(d.name),
      email: str(d.email),
      company: str(d.company),
      role: str(d.role),
      website: str(d.website),
      size: str(d.size),
      region: str(d.region),
      language: d.language === 'es' ? 'es' : 'en',
      goal: str(d.goal),
      timeline: str(d.timeline),
      source: str(d.source),
    };
    const clamp = (n: unknown) => (typeof n === 'number' && n >= 0 && n < STEP_COUNT ? Math.floor(n) : 0);
    const ctx = v.context && (v.context.from === 'roi' || v.context.from === 'diagnostic') ? v.context : null;
    return { draft, step: clamp(v.step), maxStep: clamp(v.maxStep), context: ctx };
  } catch {
    return null;
  }
}

export function saveDraft(s: Stored): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage blocked — the form still works */
  }
}

export function clearDraft(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export const isBlank = (d: Draft, lang: Lang) => JSON.stringify(d) === JSON.stringify(emptyDraft(lang));

/* ------------------------------------------------------------------ URL hand-offs */

const num = (v: string | null, max: number) => {
  if (v == null || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 && n <= max ? String(Math.round(n * 10) / 10) : null;
};

export interface UrlIntent {
  needs: Need[];
  context: Context | null;
}

/** ?service=brains[,growth] · ?from=roi&people=&hours=&automation= · ?from=diagnostic&score= */
export function readUrl(search: string): UrlIntent {
  const q = new URLSearchParams(search);
  const needs = (q.get('service') ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is Need => (NEEDS as string[]).includes(s));

  let context: Context | null = null;
  const from = q.get('from');
  if (from === 'roi') {
    const people = num(q.get('people'), 100000);
    const hours = num(q.get('hours'), 80);
    if (people && hours) {
      const data: Record<string, string> = { people, hours };
      const automation = num(q.get('automation'), 100);
      if (automation) data.automation = automation;
      const rate = num(q.get('rate'), 100000);
      if (rate) data.rate = rate;
      const currency = q.get('currency');
      if (currency && /^[A-Z]{3}$/.test(currency)) data.currency = currency;
      context = { from: 'roi', data };
    }
  } else if (from === 'diagnostic') {
    const score = num(q.get('score'), 100);
    if (score) {
      const data: Record<string, string> = { score };
      const level = q.get('level');
      if (level && /^[a-z-]{2,24}$/i.test(level)) data.level = level;
      context = { from: 'diagnostic', data };
    }
  }
  return { needs: Array.from(new Set(needs)), context };
}

/** Which card the visitor clicked on a service page (?offer= · ?industry= · ?team= · ?model=), sent with the lead. */
export function readInterest(search: string): Record<string, string> | undefined {
  const q = new URLSearchParams(search);
  const out: Record<string, string> = {};
  for (const k of ['offer', 'industry', 'team', 'model']) {
    const v = q.get(k);
    if (v && /^[a-z0-9-]{1,48}$/i.test(v)) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}
