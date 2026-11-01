import type { L10n } from '@/i18n';

/** Labels shared by the six service pages (the template, not the unit-specific copy). */
export const UNIT_COMMON = {
  breadcrumb: { en: 'Services', es: 'Servicios' },
  breadcrumbLabel: { en: 'Breadcrumb', es: 'Ruta de navegación' },
  unitOf: { en: 'Unit', es: 'Unidad' },
  glance: { en: 'At a glance', es: 'En resumen' },

  pains: {
    eyebrow: { en: 'Before and after', es: 'Antes y después' },
    today: { en: 'Today', es: 'Hoy' },
    after: { en: 'With Sandbox', es: 'Con Sandbox' },
  },

  offers: {
    included: { en: 'What’s included', es: 'Qué incluye' },
    timeline: { en: 'Typical timeline', es: 'Plazo típico' },
    bestFor: { en: 'Best for', es: 'Ideal para' },
    ask: { en: 'Ask about this', es: 'Preguntar por este servicio' },
  },

  method: {
    eyebrow: { en: 'How engagements work', es: 'Cómo trabajamos' },
    outputs: { en: 'You get', es: 'Recibes' },
  },

  pricing: {
    eyebrow: { en: 'How pricing works', es: 'Cómo se cotiza' },
    title: { en: 'Scoped to your business, <em>not a price list</em>', es: 'Definido para tu negocio, <em>no una lista de precios</em>' },
    cta: { en: 'Book a call', es: 'Agendar una llamada' },
  },

  /** Published client results (only on units that have cases in src/i18n/work.ts). */
  results: {
    eyebrow: { en: 'Client results', es: 'Resultados de clientes' },
    title: { en: 'Numbers from our <em>marketing work</em>', es: 'Números de nuestro <em>trabajo en marketing</em>' },
    lede: {
      en: 'Six published cases in content, SEO, web and local growth, with the number each one moved.',
      es: 'Seis casos publicados de contenido, SEO, web y crecimiento local, con el número que movió cada uno.',
    },
    all: { en: 'See all work', es: 'Ver todos los casos' },
  },

  faq: {
    eyebrow: { en: 'FAQ', es: 'Preguntas frecuentes' },
    title: { en: 'Straight <em>answers</em>', es: 'Respuestas <em>directas</em>' },
    more: { en: 'Something else?', es: '¿Otra pregunta?' },
    moreBody: { en: 'Write to us and a person on the team will answer.', es: 'Escríbenos y te responde una persona del equipo.' },
  },

  related: {
    eyebrow: { en: 'The other units', es: 'Las otras unidades' },
    title: { en: 'One company, <em>six ways in</em>', es: 'Una empresa, <em>seis puntos de entrada</em>' },
    all: { en: 'All services', es: 'Todos los servicios' },
  },

  cta: {
    diagnostic: { en: 'Take the AI diagnostic', es: 'Hacer el diagnóstico de IA' },
    meta: { en: 'US · Europe · Latin America — in English and Spanish', es: 'EE. UU. · Europa · Latinoamérica — en inglés y español' },
  },

  illustrative: { en: 'Illustrative', es: 'Ilustrativo' },
  simulated: { en: 'Simulated', es: 'Simulación' },
  earlyAccess: { en: 'Early access', es: 'Acceso anticipado' },
} satisfies Record<string, unknown>;

export type CommonKey = keyof typeof UNIT_COMMON;
export type Localized = L10n<string>;
