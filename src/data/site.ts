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
      en: 'AI assistants connected to your tools that answer questions from your documents, process requests, build reports and update the CRM. A person approves anything sensitive. We call it a brain.',
      es: 'Asistentes de IA conectados a tus herramientas que responden consultas con tus documentos, procesan pedidos, arman reportes y actualizan el CRM. Una persona aprueba lo sensible. Lo llamamos brain.',
    },
  },
  {
    slug: 'consulting', code: '02', icon: 'compass',
    name: { en: 'Consulting', es: 'Consulting' },
    tagline: { en: 'AI strategy & implementation', es: 'Estrategia e implementación de IA' },
    summary: {
      en: 'We review your operation, find where AI saves the most time or money and put it in place. We can also be your Head of AI a few days a month.',
      es: 'Revisamos tu operación, encontramos dónde la IA ahorra más tiempo o dinero y la ponemos en marcha. También podemos ser tu responsable de IA algunos días al mes.',
    },
  },
  {
    slug: 'growth', code: '03', icon: 'growth',
    name: { en: 'Growth', es: 'Growth' },
    tagline: { en: 'AI-native marketing', es: 'Marketing nativo en IA' },
    summary: {
      en: 'Content in your voice, ads we test every week, outbound, and presence in the answers of ChatGPT, Gemini and other AI assistants.',
      es: 'Contenido con tu voz, anuncios que probamos cada semana, prospección y presencia en las respuestas de ChatGPT, Gemini y otros asistentes de IA.',
    },
  },
  {
    slug: 'academy', code: '04', icon: 'academy',
    name: { en: 'Academy', es: 'Academy' },
    tagline: { en: 'AI training for teams', es: 'Formación en IA para equipos' },
    summary: {
      en: 'Hands-on workshops on your team’s real tasks, plus an AI usage policy people actually understand.',
      es: 'Talleres prácticos con las tareas reales de tu equipo, más una política de uso de IA que la gente entienda.',
    },
  },
  {
    slug: 'products', code: '05', icon: 'box',
    name: { en: 'Products', es: 'Products' },
    tagline: { en: 'Packaged AI by industry', es: 'IA empaquetada por industria' },
    summary: {
      en: 'AI assistants already designed for your industry, set up on your data and tools. Faster to pilot than a custom build. Now in early access.',
      es: 'Asistentes de IA ya diseñados para tu industria, configurados con tus datos y herramientas. Un piloto más rápido que un desarrollo a medida. En acceso anticipado.',
    },
  },
  {
    slug: 'partners', code: '06', icon: 'handshake',
    name: { en: 'Partners', es: 'Partners' },
    tagline: { en: 'White-label AI for agencies', es: 'IA marca blanca para agencias' },
    summary: {
      en: 'We build and maintain the solutions; you deliver them under your brand, or we deliver them together.',
      es: 'Construimos y mantenemos las soluciones; tú las entregas con tu marca o las entregamos juntos.',
    },
  },
];

export const unitBySlug = (slug: string) => UNITS.find((u) => u.slug === slug);

/** Company numbers taken from the current site (confirm before launch). */
export const STATS: { value: string; label: L10n<string> }[] = [
  { value: '15+', label: { en: 'Years in business', es: 'Años de trayectoria' } },
  { value: '200+', label: { en: 'Projects shipped', es: 'Proyectos entregados' } },
  { value: '150+', label: { en: 'Clients served', es: 'Clientes atendidos' } },
  { value: '3', label: { en: 'Markets: US · Europe · LatAm', es: 'Mercados: EE. UU. · Europa · LatAm' } },
];

/**
 * Client logos from the current site ("Brands we've touched"). Files live in /public/clients.
 * Contract (shared by home ClientsMarquee and about Numbers):
 *   - `src` set: a white, trimmed 2x WebP (48px tall), rendered at calc(22px * scale) high.
 *   - no `src`: rendered as a text wordmark (no light tile).
 *   - `scale` evens out optical size between wide and compact marks (default 1).
 */
export interface ClientLogo { name: string; src?: string; w?: number; h?: number; scale?: number }

export const CLIENTS: ClientLogo[] = [
  { name: 'Tony Robbins', src: '/clients/tony-robbins.webp', w: 470, h: 48, scale: 0.85 },
  { name: 'The Lynx', src: '/clients/the-lynx.webp', w: 232, h: 48 },
  { name: 'Mastermind', src: '/clients/mastermind.webp', w: 397, h: 48 },
  { name: 'BroadEngagement', src: '/clients/broadengagement.webp', w: 387, h: 48 },
  { name: 'AR Marketing Digital', src: '/clients/ar-marketing.webp', w: 226, h: 48, scale: 1.3 },
  // Full-colour badge only (no white version yet): shown as a wordmark.
  { name: 'The Hathaway Agency' },
];
