import type { L10n } from '@/i18n';

export const SITE = {
  name: 'Sandbox',
  legalName: 'Sandbox Innovate LLC',
  url: 'https://sandboxinnovate.com',
  email: 'marketing@sandboxinnovate.com',
  location: 'Albuquerque, NM',
  markets: { en: 'United States · Europe · Latin America', es: 'Estados Unidos · Europa · Latinoamérica' } as L10n<string>,
};

/** The six business units. Order matters (it is the order shown everywhere). */
export type UnitSlug = 'brains' | 'consulting' | 'growth' | 'academy' | 'products' | 'partners';

export interface UnitMeta {
  slug: UnitSlug;
  code: string; // system-style index shown in mono, e.g. "01"
  icon: IconName;
  name: L10n<string>;
  tagline: L10n<string>;
  /** One sentence used in menus and cards. */
  summary: L10n<string>;
}

export type IconName =
  | 'brain' | 'compass' | 'growth' | 'academy' | 'box' | 'handshake'
  | 'arrow-up-right' | 'arrow-right' | 'arrow-left' | 'chevron-down' | 'plus' | 'minus' | 'check' | 'close' | 'menu'
  | 'spark' | 'bolt' | 'search' | 'command' | 'globe' | 'mail' | 'pin' | 'calendar' | 'shield' | 'layers' | 'flow' | 'chat' | 'chart';

export const UNITS: UnitMeta[] = [
  {
    slug: 'brains', code: '01', icon: 'brain',
    name: { en: 'Brains', es: 'Brains' },
    tagline: { en: 'Custom AI systems', es: 'Sistemas de IA a medida' },
    summary: {
      en: 'AI brains and agents built around your data, your tools and the way your team actually works.',
      es: 'Brains y agentes de IA construidos sobre tus datos, tus herramientas y la forma real en que trabaja tu equipo.',
    },
  },
  {
    slug: 'consulting', code: '02', icon: 'compass',
    name: { en: 'Consulting', es: 'Consultoría' },
    tagline: { en: 'AI strategy & implementation', es: 'Estrategia e implementación de IA' },
    summary: {
      en: 'From diagnosis to rollout: we find where AI pays off in your business and make it happen.',
      es: 'Del diagnóstico a la implementación: encontramos dónde la IA rinde en tu negocio y lo hacemos realidad.',
    },
  },
  {
    slug: 'growth', code: '03', icon: 'growth',
    name: { en: 'Growth', es: 'Growth' },
    tagline: { en: 'AI-native marketing', es: 'Marketing nativo en IA' },
    summary: {
      en: 'Content, ads, outbound and visibility inside AI answers — marketing engineered with AI.',
      es: 'Contenido, anuncios, prospección y visibilidad dentro de las respuestas de IA — marketing diseñado con IA.',
    },
  },
  {
    slug: 'academy', code: '04', icon: 'academy',
    name: { en: 'Academy', es: 'Academy' },
    tagline: { en: 'AI training for teams', es: 'Formación en IA para equipos' },
    summary: {
      en: 'Hands-on workshops and programs that get your people working with AI from week one.',
      es: 'Talleres y programas prácticos para que tu gente trabaje con IA desde la primera semana.',
    },
  },
  {
    slug: 'products', code: '05', icon: 'box',
    name: { en: 'Products', es: 'Productos' },
    tagline: { en: 'Ready-to-deploy AI', es: 'IA lista para usar' },
    summary: {
      en: 'Proven brains packaged by industry, ready to plug into your business in days.',
      es: 'Brains probados y empaquetados por industria, listos para conectar a tu negocio en días.',
    },
  },
  {
    slug: 'partners', code: '06', icon: 'handshake',
    name: { en: 'Partners', es: 'Partners' },
    tagline: { en: 'White-label AI for agencies', es: 'IA marca blanca para agencias' },
    summary: {
      en: 'Agencies and consultancies resell our systems under their own brand. We build, you deliver.',
      es: 'Agencias y consultoras revenden nuestros sistemas con su propia marca. Nosotros construimos, ustedes entregan.',
    },
  },
];

export const unitBySlug = (slug: string) => UNITS.find((u) => u.slug === slug);

/** Company numbers taken from the current site — confirm before launch. */
export const STATS: { value: string; label: L10n<string> }[] = [
  { value: '15+', label: { en: 'Years building for the web', es: 'Años construyendo para la web' } },
  { value: '200+', label: { en: 'Projects shipped', es: 'Proyectos entregados' } },
  { value: '150+', label: { en: 'Clients served', es: 'Clientes atendidos' } },
  { value: '3', label: { en: 'Continents, one team', es: 'Continentes, un equipo' } },
];

/** Client logos from the current site ("Brands we've touched"). Files live in /public/clients. */
export const CLIENTS: { name: string; src: string; w: number; h: number }[] = [
  // White logos, trimmed, 96px tall. Render at ~22–28px height.
  { name: 'Tony Robbins', src: '/clients/tony-robbins.png', w: 939, h: 96 },
  { name: 'The Lynx', src: '/clients/the-lynx.png', w: 465, h: 96 },
  { name: 'Mastermind', src: '/clients/mastermind.png', w: 794, h: 96 },
  { name: 'BroadEngagement', src: '/clients/broadengagement.png', w: 774, h: 96 },
  { name: 'AR Marketing Digital', src: '/clients/ar-marketing.png', w: 452, h: 96 },
  // Full-colour badge on white (not a white logo) — render inside a small white tile.
  { name: 'The Hathaway Agency', src: '/clients/hathaway.webp', w: 240, h: 310 },
];
