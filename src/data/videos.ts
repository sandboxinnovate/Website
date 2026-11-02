/**
 * Explainer videos shown on the six unit pages (src/views/Unit.astro → UnitVideo).
 *
 * Titles, durations and transcripts come from videos.json, which `node video/site-data.mjs` writes
 * from the renderer's video/out/<unit>-<lang>.json files. Transcripts are the spoken narration from
 * video/voice/<unit>.json. The one-line descriptions below are written
 * by hand for the VideoObject structured data. Media files live in public/video/.
 */
import type { UnitSlug } from '@/data/site';
import type { Lang } from '@/i18n';
import data from './videos.json';

export interface UnitVideoData {
  title: string;
  /** Seconds. */
  duration: number;
  /** "1:04" */
  durationLabel: string;
  /** Seconds into the video where the poster frame is taken. */
  poster: number;
  /** Spoken narration as plain text; blank lines split paragraphs. */
  transcript: string;
  description: string;
}

/**
 * Date the current files went live (VideoObject.uploadDate). It is also the ?v= cache-busting token on every
 * media URL (files are cached for a year), so bump it whenever the videos are re-rendered or re-voiced.
 */
export const VIDEO_UPLOAD_DATE = '2026-11-03';

const DESCRIPTIONS: Record<UnitSlug, Record<Lang, string>> = {
  brains: {
    en: 'How a Sandbox brain connects your tools, answers with sources, runs agents in your systems and keeps a person approving what matters.',
    es: 'Cómo un brain de Sandbox conecta tus herramientas, responde con fuentes, opera agentes en tus sistemas y deja lo importante en manos de una persona.',
  },
  consulting: {
    en: 'How a Sandbox Consulting engagement goes from an audit and a 90-day roadmap to an implementation sprint and a fractional Head of AI.',
    es: 'Cómo un proyecto de Consultoría de Sandbox pasa de una auditoría y una hoja de ruta a 90 días a un sprint de implementación y un Head of AI fraccional.',
  },
  growth: {
    en: 'How Sandbox Growth tracks the questions your buyers ask AI, produces content in your voice, tests creative and outbound, and reports what moved.',
    es: 'Cómo Sandbox Growth mide las preguntas que tus clientes le hacen a la IA, produce contenido con tu voz, testea creatividades y prospección, y reporta qué se movió.',
  },
  academy: {
    en: 'How Sandbox Academy trains a team on its own work: assess, tailor by role, practice on real tasks with your rules, then follow up until the habits stick.',
    es: 'Cómo Sandbox Academy capacita a un equipo con su propio trabajo: evaluar, adaptar por rol, practicar con tareas reales y tus reglas, y acompañar hasta que el hábito se instale.',
  },
  products: {
    en: 'How a Sandbox industry product works: pick your industry package, adapt it to your business, pilot it on real cases, and we host and run it.',
    es: 'Cómo funciona un producto por industria de Sandbox: eliges el paquete de tu industria, lo adaptamos a tu negocio, lo pruebas con casos reales y nosotros lo alojamos y operamos.',
  },
  partners: {
    en: 'How agencies partner with Sandbox to sell AI under their own brand: qualify, package, deliver under your brand and run the systems behind you.',
    es: 'Cómo las agencias se asocian con Sandbox para vender IA con su propia marca: calificar, empaquetar, entregar con tu marca y operar los sistemas detrás de ti.',
  },
};

type Raw = Record<string, Record<string, Omit<UnitVideoData, 'description'>>>;

export function getUnitVideo(slug: UnitSlug, lang: Lang): UnitVideoData | null {
  const v = (data as Raw)[slug]?.[lang];
  return v ? { ...v, description: DESCRIPTIONS[slug][lang] } : null;
}

/** 64 → "PT1M4S" */
export const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${Math.round(sec % 60)}S`;
