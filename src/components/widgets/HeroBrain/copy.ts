import type { L10n } from '@/i18n';

export interface HeroBrainCopy {
  /** Visually hidden description of the (decorative) canvas. */
  description: string;
  /**
   * Operation names flashed next to active nodes. They read as job identifiers inside a running
   * system, so they stay in code-style English in both languages, the way they would in real logs.
   */
  ops: readonly string[];
}

const OPS = [
  'crm.sync',
  'lead.score',
  'kb.search',
  'report.weekly',
  'inbox.triage',
  'ticket.route',
  'invoice.match',
  'calendar.book',
  'brief.draft',
  'sheet.update',
  'ads.variant',
  'policy.check',
  'kb.ingest',
  'handoff.human',
  'forecast.run',
  'content.draft',
  'churn.flag',
  'onboard.hr',
] as const;

export const HERO_BRAIN_COPY: L10n<HeroBrainCopy> = {
  en: {
    description:
      'Illustration: the Sandbox cube drawn as a network of connected points. Pulses of light travel between them, like AI agents passing work across a company’s tools and knowledge.',
    ops: OPS,
  },
  es: {
    description:
      'Ilustración: el cubo de Sandbox dibujado como una red de puntos conectados. Entre ellos viajan pulsos de luz, como agentes de IA que se pasan el trabajo entre las herramientas y el conocimiento de una empresa.',
    ops: OPS,
  },
};
