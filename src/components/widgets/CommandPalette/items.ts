import { localize, type Lang } from '@/i18n';
import { SITE, UNITS, type IconName } from '@/data/site';
import { CASES } from '@/i18n/work';

export type GroupId = 'recent' | 'answers' | 'pages' | 'sections' | 'cases' | 'posts' | 'actions' | 'fallback';
export type ItemIcon = IconName | 'home' | 'copy' | 'hash' | 'clock';

export type Run =
  | { kind: 'go'; href: string }
  | { kind: 'copy-email' }
  | { kind: 'switch-lang'; to: Lang };

export interface Item {
  id: string;
  group: Exclude<GroupId, 'recent' | 'fallback'>;
  label: string;
  hint?: string;
  /** Right-aligned mono detail (a path, an anchor, a language code). */
  meta?: string;
  icon: ItemIcon;
  keywords: string[];
  run: Run;
  /** Quick answers only */
  answer?: string;
  cta?: string;
}

type Both = Record<Lang, string>;
const both = (en: string, es: string): Both => ({ en, es });

/** Extra search words per unit (both languages are always searchable). */
const UNIT_KEYWORDS: Record<string, string> = {
  brains: 'agents agent knowledge base assistant copilot automation integrations custom ai system agentes conocimiento asistente automatizacion',
  consulting: 'strategy roadmap diagnostic audit implementation sprint fractional head of ai advisory estrategia hoja de ruta auditoria implementacion consultoria',
  growth: 'marketing content seo geo ads creative outbound email visibility ai answers contenido anuncios prospeccion visibilidad',
  academy: 'training workshop workshops course courses learn program leaders webinar newsletter formacion taller talleres curso capacitacion',
  products: 'industry packaged subscription ready early access producto industria suscripcion',
  partners: 'agency agencies white label resell reseller consultancy agencia agencias marca blanca revender socios',
};

interface PageDef {
  id: string;
  path: string;
  label: Both;
  hint: Both;
  icon: ItemIcon;
  kw: string;
}

const PAGES: PageDef[] = [
  { id: 'home', path: '/', label: both('Home', 'Inicio'), hint: both('What we do, interactive demos and how we work', 'Qué hacemos, demos interactivas y cómo trabajamos'), icon: 'home', kw: 'home start index inicio portada' },
  { id: 'diagnostic', path: '/diagnostic', label: both('AI Diagnostic', 'Diagnóstico de IA'), hint: both('Your readiness score in 3 minutes', 'Tu puntaje de preparación en 3 minutos'), icon: 'chart', kw: 'diagnostic readiness score assessment quiz test diagnostico evaluacion puntaje' },
  { id: 'work', path: '/work', label: both('Work', 'Casos'), hint: both('Selected projects', 'Proyectos seleccionados'), icon: 'layers', kw: 'work cases case studies projects portfolio casos proyectos portafolio' },
  { id: 'blog', path: '/blog/', label: both('Blog', 'Blog'), hint: both('Field notes on applied AI', 'Notas de campo sobre IA aplicada'), icon: 'layers', kw: 'blog articles article posts guides notes field notes newsletter articulos articulo guias notas' },
  { id: 'about', path: '/about', label: both('About', 'Nosotros'), hint: both('Who we are and how we work', 'Quiénes somos y cómo trabajamos'), icon: 'spark', kw: 'about team company who story nosotros equipo empresa quienes' },
  { id: 'contact', path: '/contact', label: both('Contact', 'Contacto'), hint: both('Tell us what you need', 'Cuéntanos qué necesitas'), icon: 'mail', kw: 'contact talk call email form contacto hablar llamada formulario' },
];

const SECTIONS: PageDef[] = [
  { id: 'method', path: '/#method', label: both('Method', 'Método'), hint: both('How an engagement runs, step by step', 'Cómo avanza un proyecto, paso a paso'), icon: 'flow', kw: 'method process how we work steps metodo proceso pasos' },
  { id: 'console', path: '/#console', label: both('Agent demo (simulated)', 'Demo de agentes (simulación)'), hint: both('A simulated run, step by step', 'Una ejecución simulada, paso a paso'), icon: 'bolt', kw: 'demo console agents simulation run consola agentes simulacion' },
  { id: 'faq', path: '/#faq', label: both('FAQ', 'Preguntas frecuentes'), hint: both('Pricing, timelines, data and security', 'Precios, plazos, datos y seguridad'), icon: 'chat', kw: 'faq questions answers preguntas frecuentes respuestas dudas' },
  { id: 'roi', path: '/#roi', label: both('ROI estimator', 'Calculadora de ROI'), hint: both('Estimate the hours AI could give back', 'Estima las horas que la IA le puede devolver a tu equipo'), icon: 'clock', kw: 'roi calculator estimate hours savings time calculadora ahorro horas' },
];

interface AnswerDef {
  id: string;
  q: Both;
  a: Both;
  cta: Both;
  path: string;
  kw: string;
}

/** Short versions of the home FAQ. Never numbers about price. */
const ANSWERS: AnswerDef[] = [
  {
    id: 'price',
    q: both('How do you price?', '¿Cómo cobran?'),
    a: both(
      'Every engagement is scoped after a discovery call. You get a fixed proposal tailored to your scope and your market, with no hourly billing surprises.',
      'Cada proyecto se define después de una llamada inicial. Recibes una propuesta cerrada, ajustada a tu alcance y a tu mercado, sin sorpresas por horas.',
    ),
    cta: both('Book a call', 'Agendar una llamada'),
    path: '/contact',
    kw: 'price prices pricing cost costs fee fees rate rates quote budget how much expensive proposal precio precios costo costos cuesta cobran cobro tarifa tarifas presupuesto cotizacion cuanto propuesta',
  },
  {
    id: 'timeline',
    q: both('How long until we see results?', '¿En cuánto tiempo vemos resultados?'),
    a: both(
      'An AI Opportunity Audit takes 2–3 weeks. A first agent is usually live in 3–5 weeks. Company-wide brains roll out in phases, with something useful in production from the first month.',
      'Una auditoría de oportunidades de IA toma 2–3 semanas. Un primer agente suele estar funcionando en 3–5 semanas. Los brains para toda la empresa se implementan por fases, con algo útil en producción desde el primer mes.',
    ),
    cta: both('Take the AI diagnostic', 'Hacer el diagnóstico de IA'),
    path: '/diagnostic',
    kw: 'time timeline long how long weeks fast quick when results duration start tiempo plazo plazos tarda demora semanas rapido cuando resultados duracion',
  },
  {
    id: 'brain',
    q: both('What exactly is an AI brain?', '¿Qué es exactamente un brain de IA?'),
    a: both(
      'A system that knows your company — documents, processes, clients — answers your team with sources and acts across your tools. People approve the steps that matter.',
      'Un sistema que conoce tu empresa (documentos, procesos, clientes), responde a tu equipo citando fuentes y actúa en tus herramientas. Las personas aprueban los pasos importantes.',
    ),
    cta: both('See Brains', 'Ver Brains'),
    path: '/services/brains',
    kw: 'brain brains knowledge base assistant agent agents copilot what is cerebro conocimiento asistente agente agentes que es',
  },
  {
    id: 'data',
    q: both('Do we need clean data or a tech team?', '¿Necesitamos datos ordenados o un equipo técnico?'),
    a: both(
      'No. Most clients start with scattered documents and a few tools. Organizing what the system needs is part of our work. You need one person who owns the outcome.',
      'No. La mayoría empieza con documentos dispersos y pocas herramientas. Ordenar lo que el sistema necesita es parte de nuestro trabajo. Solo necesitas una persona responsable del resultado.',
    ),
    cta: both('Take the AI diagnostic', 'Hacer el diagnóstico de IA'),
    path: '/diagnostic',
    kw: 'data clean messy tech team engineers developers it ready requirements need datos ordenados equipo tecnico desarrolladores requisitos necesitamos',
  },
  {
    id: 'security',
    q: both('How do you handle security and privacy?', '¿Cómo manejan la seguridad y la privacidad?'),
    a: both(
      'Least-privilege access, your data stays in your accounts where possible, no training on your data, audit logs for every agent action and human approval for anything sensitive. NDAs and DPAs as standard.',
      'Accesos mínimos, tus datos quedan en tus cuentas siempre que se pueda, ningún modelo se entrena con ellos, registro de cada acción de los agentes y aprobación humana para lo sensible. NDA y acuerdos de datos en todos los proyectos.',
    ),
    cta: both('Book a call', 'Agendar una llamada'),
    path: '/contact',
    kw: 'security secure privacy private data protection nda dpa gdpr compliance safe confidential seguridad seguro privacidad proteccion datos confidencial cumplimiento',
  },
  {
    id: 'models',
    q: both('Which AI models do you use?', '¿Qué modelos de IA usan?'),
    a: both(
      'We are model-agnostic: the best model for each task, frontier or open-source, in systems designed so you can switch later without rebuilding.',
      'No dependemos de un solo modelo: el mejor para cada tarea, de frontera u open-source, en sistemas pensados para que puedas cambiar después sin reconstruir.',
    ),
    cta: both('See Brains', 'Ver Brains'),
    path: '/services/brains',
    kw: 'model models llm llms provider vendor open source which ai stack modelo modelos proveedor codigo abierto cual',
  },
  {
    id: 'languages',
    q: both('Do you work in English and Spanish?', '¿Trabajan en inglés y en español?'),
    a: both(
      'Yes. We work with companies in the United States, Europe and Latin America, in English and Spanish, and the systems we build can work in both.',
      'Sí. Trabajamos con empresas de Estados Unidos, Europa y Latinoamérica, en inglés y en español, y los sistemas que construimos funcionan en ambos idiomas.',
    ),
    cta: both('Book a call', 'Agendar una llamada'),
    path: '/contact',
    kw: 'spanish english language languages bilingual where location countries markets latam latin america europe us remote espanol ingles idioma idiomas bilingue donde paises mercados latinoamerica europa',
  },
  {
    id: 'agencies',
    q: both('We’re an agency. Can we resell your systems?', 'Somos una agencia. ¿Podemos revender sus sistemas?'),
    a: both(
      'Yes, that’s our Partners program. We build and maintain white-label systems you deliver under your brand, or we co-deliver with your team.',
      'Sí, para eso existe Partners. Construimos y mantenemos sistemas marca blanca que entregas con tu marca, o los entregamos junto a tu equipo.',
    ),
    cta: both('See Partners', 'Ver Partners'),
    path: '/services/partners',
    kw: 'agency agencies white label whitelabel resell reseller partner partners consultancy agencia agencias marca blanca revender revendedor socio consultora',
  },
];

const words = (s: string) => s.split(/\s+/).filter(Boolean);

/** A blog post from /blog/index.json (src/pages/blog/index.json.ts). */
export interface PostRef { lang: Lang; href: string; title: string; dek: string; unit: string; tags: string[] }

export function buildItems(lang: Lang, posts: PostRef[] = []): Item[] {
  const other: Lang = lang === 'en' ? 'es' : 'en';
  const items: Item[] = [];

  const home = PAGES[0];
  items.push({ id: `page:${home.id}`, group: 'pages', label: home.label[lang], hint: home.hint[lang], meta: localize(lang, home.path), icon: home.icon, keywords: [...words(home.kw), home.label[other]], run: { kind: 'go', href: localize(lang, home.path) } });

  for (const u of UNITS) {
    const href = localize(lang, `/services/${u.slug}`);
    items.push({
      id: `page:${u.slug}`,
      group: 'pages',
      label: u.name[lang],
      hint: u.tagline[lang],
      meta: href,
      icon: u.icon,
      keywords: [...words(UNIT_KEYWORDS[u.slug] ?? ''), u.name[other], 'service', 'services', 'servicio', 'servicios', u.code],
      run: { kind: 'go', href },
    });
  }

  for (const p of PAGES.slice(1)) {
    const href = localize(lang, p.path);
    items.push({ id: `page:${p.id}`, group: 'pages', label: p.label[lang], hint: p.hint[lang], meta: href, icon: p.icon, keywords: [...words(p.kw), p.label[other]], run: { kind: 'go', href } });
  }

  for (const s of SECTIONS) {
    items.push({
      id: `section:${s.id}`,
      group: 'sections',
      label: s.label[lang],
      hint: s.hint[lang],
      meta: s.path.slice(1),
      icon: s.icon,
      keywords: [...words(s.kw), s.label[other]],
      run: { kind: 'go', href: localize(lang, s.path) },
    });
  }

  // Case studies: found by search only (not in the default list); they open the case on /work.
  for (const c of CASES) {
    items.push({
      id: `case:${c.id}`,
      group: 'cases',
      label: c.title[lang],
      hint: c.client[lang],
      icon: 'layers',
      keywords: [c.id, ...c.tags.en, ...c.tags.es, c.title[other], 'case', 'caso', 'work', 'casos'],
      run: { kind: 'go', href: localize(lang, `/work#case-${c.id}`) },
    });
  }

  // Blog posts (this language): found by search only, like case studies.
  for (const p of posts.filter((x) => x.lang === lang)) {
    items.push({
      id: `post:${p.href}`,
      group: 'posts',
      label: p.title,
      hint: p.dek,
      icon: 'chat',
      keywords: [...p.tags.flatMap(words), p.unit, 'blog', 'article', 'articulo', 'guide', 'guia'],
      run: { kind: 'go', href: p.href },
    });
  }

  const A = {
    book: { label: both('Book a call', 'Agendar una llamada'), hint: both('A 30-minute discovery call', 'Una llamada inicial de 30 minutos') },
    diag: { label: both('Take the AI diagnostic', 'Hacer el diagnóstico de IA'), hint: both('10 questions · 3 minutes', '10 preguntas · 3 minutos') },
    lang: { label: both('Switch to Spanish', 'Cambiar a inglés'), hint: both('Ver esta página en español', 'View this page in English') },
    copy: { label: both('Copy email address', 'Copiar el correo') },
  };
  items.push(
    { id: 'action:book', group: 'actions', label: A.book.label[lang], hint: A.book.hint[lang], icon: 'calendar', keywords: words('book call meeting schedule talk discovery demo agendar llamada reunion hablar cita'), run: { kind: 'go', href: localize(lang, '/contact') } },
    { id: 'action:diagnostic', group: 'actions', label: A.diag.label[lang], hint: A.diag.hint[lang], icon: 'bolt', keywords: words('diagnostic readiness score quiz assessment diagnostico puntaje evaluacion'), run: { kind: 'go', href: localize(lang, '/diagnostic') } },
    { id: 'action:lang', group: 'actions', label: A.lang.label[lang], hint: A.lang.hint[lang], meta: other.toUpperCase(), icon: 'globe', keywords: words('language idioma spanish espanol english ingles translate traducir switch cambiar'), run: { kind: 'switch-lang', to: other } },
    { id: 'action:copy-email', group: 'actions', label: A.copy.label[lang], hint: SITE.email, icon: 'copy', keywords: words('copy email mail address contact copiar correo direccion contacto'), run: { kind: 'copy-email' } },
  );

  for (const a of ANSWERS) {
    items.push({
      id: `answer:${a.id}`,
      group: 'answers',
      label: a.q[lang],
      answer: a.a[lang],
      cta: a.cta[lang],
      icon: 'chat',
      keywords: words(a.kw),
      run: { kind: 'go', href: localize(lang, a.path) },
    });
  }

  return items;
}
