import type { L10n } from './index';
import type { UnitSlug } from '@/data/site';

type S = L10n<string>;

/** Blog ("Field notes on applied AI") copy: index, post template, home and unit-page sections. */
export const BLOG = {
  name: { en: 'Field notes on applied AI', es: 'Notas de campo sobre IA aplicada' } as S,
  nav: { en: 'Blog', es: 'Blog' } as S,

  seo: {
    title: { en: 'Blog: field notes on applied AI', es: 'Blog: notas de campo sobre IA aplicada' } as S,
    description: {
      en: 'Practical guides on AI agents, company brains, AI ROI, team training and visibility in AI answers, from the team that designs, builds and runs them.',
      es: 'Guías prácticas sobre agentes de IA, brains de empresa, ROI de la IA, capacitación de equipos y visibilidad en respuestas de IA, de quienes los diseñan y operan.',
    } as S,
  },

  index: {
    eyebrow: { en: 'Blog', es: 'Blog' } as S,
    title: { en: 'Field notes on <em>applied AI</em>', es: 'Notas de campo sobre <em>IA aplicada</em>' } as S,
    lede: {
      en: 'How to choose the first agent, where a person should approve, how to measure the return and how to show up in AI answers. Practical notes for the people who run the work.',
      es: 'Cómo elegir el primer agente, dónde debe aprobar una persona, cómo medir el retorno y cómo aparecer en las respuestas de IA. Notas prácticas para quienes llevan la operación.',
    } as S,
    count: { en: (n: number) => (n === 1 ? '1 article' : `${n} articles`), es: (n: number) => (n === 1 ? '1 artículo' : `${n} artículos`) },
    languages: { en: 'In English and Spanish', es: 'En español e inglés' } as S,
    rss: { en: 'RSS feed', es: 'Feed RSS' } as S,
    featured: { en: 'Featured', es: 'Destacado' } as S,
    read: { en: 'Read the article', es: 'Leer el artículo' } as S,
    allTitle: { en: 'All articles', es: 'Todos los artículos' } as S,
    filterLabel: { en: 'Filter by unit', es: 'Filtrar por unidad' } as S,
    all: { en: 'All', es: 'Todos' } as S,
    showing: {
      en: (n: number, total: number, unit?: string) => (unit ? `${n} of ${total} articles · ${unit}` : `${total} articles`),
      es: (n: number, total: number, unit?: string) => (unit ? `${n} de ${total} artículos · ${unit}` : `${total} artículos`),
    },
    empty: { en: 'Nothing here yet. New articles land every month.', es: 'Todavía no hay nada aquí. Publicamos artículos nuevos cada mes.' } as S,
    emptyTitle: { en: 'No articles yet', es: 'Aún no hay artículos' } as S,
    quiet: { en: 'Working on something specific?', es: '¿Tienes algo concreto entre manos?' } as S,
    quietBody: {
      en: 'Bring the process and its numbers to a 30-minute call. We will tell you honestly whether AI is the right tool for it.',
      es: 'Trae el proceso y sus números a una llamada de 30 minutos. Te diremos con honestidad si la IA es la herramienta adecuada.',
    } as S,
  },

  newsletter: {
    eyebrow: { en: 'Newsletter', es: 'Newsletter' } as S,
    title: { en: 'Field notes, <em>once a month</em>', es: 'Notas de campo, <em>una vez al mes</em>' } as S,
    body: {
      en: 'One email a month with what we built, what broke and what worked. No hype, no daily digest.',
      es: 'Un correo al mes con lo que construimos, lo que falló y lo que funcionó. Sin exageraciones ni resúmenes diarios.',
    } as S,
  },

  post: {
    breadcrumb: { en: 'Breadcrumb', es: 'Ruta de navegación' } as S,
    by: { en: 'By', es: 'Por' } as S,
    author: 'Sandbox',
    published: { en: 'Published', es: 'Publicado' } as S,
    minRead: { en: (n: number) => `${n} min read`, es: (n: number) => `${n} min de lectura` },
    takeaways: { en: 'Key takeaways', es: 'Puntos clave' } as S,
    toc: { en: 'On this page', es: 'En esta página' } as S,
    tocShort: { en: 'Contents', es: 'Contenido' } as S,
    progress: { en: 'Reading progress', es: 'Progreso de lectura' } as S,
    faqEyebrow: { en: 'FAQ', es: 'Preguntas frecuentes' } as S,
    faqTitle: { en: 'Questions readers <em>ask next</em>', es: 'Lo que suelen <em>preguntar después</em>' } as S,
    tags: { en: 'Topics', es: 'Temas' } as S,
    share: { en: 'Share', es: 'Compartir' } as S,
    shareTitle: { en: 'Share this article', es: 'Compartir este artículo' } as S,
    copyLink: { en: 'Copy link', es: 'Copiar enlace' } as S,
    copied: { en: 'Link copied', es: 'Enlace copiado' } as S,
    copyFailed: { en: 'Could not copy. Select the address bar instead.', es: 'No se pudo copiar. Copia la dirección desde la barra.' } as S,
    shareOn: { en: (n: string) => `Share on ${n}`, es: (n: string) => `Compartir en ${n}` },
    shareEmail: { en: 'Share by email', es: 'Compartir por correo' } as S,
    related: { en: 'Keep <em>reading</em>', es: 'Sigue <em>leyendo</em>' } as S,
    relatedEyebrow: { en: 'Related articles', es: 'Artículos relacionados' } as S,
    all: { en: 'All articles', es: 'Todos los artículos' } as S,
    back: { en: 'Back to the blog', es: 'Volver al blog' } as S,
    copyCode: { en: 'Copy', es: 'Copiar' } as S,
    copiedCode: { en: 'Copied', es: 'Copiado' } as S,
    untranslated: {
      en: 'This article is not available in Spanish yet.',
      es: 'Este artículo todavía no está disponible en inglés.',
    } as S,
  },

  /** Contextual CTA at the end of a post, by unit. */
  cta: {
    brains: {
      title: { en: 'Have a process an agent <em>could take over?</em>', es: '¿Tienes un proceso que un agente <em>podría asumir?</em>' } as S,
      body: {
        en: 'Tell us the process and its numbers. A first agent is typically live in 3–5 weeks, with a person approving the steps that matter.',
        es: 'Cuéntanos el proceso y sus números. Un primer agente suele estar funcionando en 3–5 semanas, con una persona que aprueba los pasos importantes.',
      } as S,
    },
    consulting: {
      title: { en: 'Not sure where AI <em>pays off first?</em>', es: '¿No sabes dónde rinde <em>primero la IA?</em>' } as S,
      body: {
        en: 'The AI Opportunity Audit maps your processes in 2–3 weeks and ranks the opportunities by return, with a roadmap your team can act on.',
        es: 'La Auditoría de oportunidades de IA mapea tus procesos en 2–3 semanas y ordena las oportunidades por retorno, con una hoja de ruta que tu equipo puede ejecutar.',
      } as S,
    },
    growth: {
      title: { en: 'Want AI assistants <em>to recommend you?</em>', es: '¿Quieres que los asistentes de IA <em>te recomienden?</em>' } as S,
      body: {
        en: 'We check how assistants describe your business today, then fix the pages, facts and content they rely on, in your brand’s voice.',
        es: 'Revisamos cómo te describen hoy los asistentes y corregimos las páginas, los datos y el contenido en los que se basan, con la voz de tu marca.',
      } as S,
    },
    academy: {
      title: { en: 'Want your team using AI <em>from week one?</em>', es: '¿Quieres que tu equipo use IA <em>desde la primera semana?</em>' } as S,
      body: {
        en: 'Hands-on workshops built around your team’s real work, not generic demos, with follow-up so the new habits stick.',
        es: 'Talleres prácticos sobre el trabajo real de tu equipo, no demos genéricas, con seguimiento para que los nuevos hábitos se queden.',
      } as S,
    },
    products: {
      title: { en: 'Is your business in <em>one of our industries?</em>', es: '¿Tu negocio está en <em>una de nuestras industrias?</em>' } as S,
      body: {
        en: 'Industry brains are in early access: agents designed for your sector, set up on your own data and tools.',
        es: 'Los brains por industria están en acceso anticipado: agentes diseñados para tu sector, configurados con tus propios datos y herramientas.',
      } as S,
    },
    partners: {
      title: { en: 'Want to offer AI <em>under your brand?</em>', es: '¿Quieres ofrecer IA <em>con tu marca?</em>' } as S,
      body: {
        en: 'We build and maintain white-label AI systems that your agency delivers to its clients, or we co-deliver with your team.',
        es: 'Construimos y mantenemos sistemas de IA marca blanca que tu agencia entrega a sus clientes, o los entregamos junto a tu equipo.',
      } as S,
    },
    see: { en: (unit: string) => `See ${unit}`, es: (unit: string) => `Ver ${unit}` },
  } satisfies Record<UnitSlug, { title: S; body: S }> & Record<string, unknown>,

  /** Home page section (before the FAQ). */
  home: {
    eyebrow: { en: 'Field notes', es: 'Notas de campo' } as S,
    title: { en: 'Notes from <em>the work</em>', es: 'Notas desde <em>el trabajo</em>' } as S,
    lede: {
      en: 'Guides, checklists and templates on putting AI to work, written from how we design, build and run these systems.',
      es: 'Guías, checklists y plantillas para poner la IA a trabajar, escritas desde cómo diseñamos, construimos y operamos estos sistemas.',
    } as S,
    all: { en: 'All articles', es: 'Todos los artículos' } as S,
  },

  /** Unit pages: "Related reading". */
  unit: {
    eyebrow: { en: 'Related reading', es: 'Lecturas relacionadas' } as S,
    title: { en: 'From the <em>field notes</em>', es: 'De las <em>notas de campo</em>' } as S,
    all: { en: 'All articles', es: 'Todos los artículos' } as S,
  },
};
