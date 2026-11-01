/**
 * Shape of the copy for one service (unit) page, in one language.
 * Each unit file exports `{ en: UnitCopy, es: UnitCopy }` so both languages
 * can be written natively, side by side.
 *
 * Strings marked "HTML" accept <em> for the flame-gradient accent words.
 */
export interface UnitOffer {
  name: string;
  /** What it is, in one or two sentences. */
  what: string;
  /** What's included (checklist). */
  includes: string[];
  /** Typical timeline in words/weeks — never prices. */
  timeline: string;
  bestFor: string;
  /** Optional status pill, e.g. "Early access". */
  tag?: string;
}

export interface UnitStep {
  name: string;
  time: string;
  body: string;
  out: string[];
}

export interface UnitCase {
  /** Industry or partner type (mono label). */
  industry: string;
  title: string;
  body: string;
  tags: string[];
}

export interface UnitCopy {
  seo: { title: string; description: string };
  hero: {
    /** HTML */
    title: string;
    lede: string;
    /** Label of the primary CTA (always goes to /contact?service=<slug>). */
    primary: string;
    /** Secondary contextual CTA. `href` is a language-neutral path ("/diagnostic") or an in-page anchor ("#demo"). */
    secondary: { label: string; href: string };
    /** "At a glance" facts under the hero. Timelines and formats only — no metrics. */
    facts: { k: string; v: string }[];
  };
  pains: { title: string; lede: string; items: { pain: string; outcome: string }[] };
  offers: { eyebrow: string; title: string; lede: string; items: UnitOffer[] };
  demo: {
    eyebrow: string;
    /** HTML */
    title: string;
    lede: string;
    /** Optional side notes (used where the widget is narrow). */
    notesTitle?: string;
    notes?: string[];
    link?: { label: string; href: string };
  };
  method: { title: string; lede: string; steps: [UnitStep, UnitStep, UnitStep, UnitStep] };
  /** `shape` labels the two blocks of the no-numbers billing diagram (one-time, recurring). */
  pricing: { body: string; points: string[]; shape: [string, string] };
  cases: { eyebrow: string; title: string; lede: string; note?: string; items: UnitCase[] };
  faq: { q: string; a: string }[];
  cta: { title: string; lede: string };
}
