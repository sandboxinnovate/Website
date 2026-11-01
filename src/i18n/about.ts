import type { L10n } from './index';

type S = L10n<string>;

/**
 * About page copy (EN/ES).
 * Rules: no prices, no invented results, no client or client-software names.
 * `<em>` inside titles renders the flame-gradient accent.
 */
export const ABOUT = {
  seo: {
    title: { en: 'About Sandbox — an AI company that started as a marketing agency', es: 'Nosotros — Sandbox, una empresa de IA que nació como agencia de marketing' } as S,
    description: {
      en: 'Sandbox started as a digital marketing agency. Using AI in our own work changed how we operate. Now we design, build and run AI for businesses in the US, Europe and Latin America.',
      es: 'Sandbox nació como agencia de marketing digital. Usar IA en nuestro propio trabajo cambió cómo operamos. Hoy diseñamos, construimos y operamos IA para empresas de Estados Unidos, Europa y Latinoamérica.',
    } as S,
  },

  hero: {
    eyebrow: { en: 'About Sandbox', es: 'Sobre Sandbox' } as S,
    title: {
      en: 'We ran the experiment on <em>ourselves</em> first.',
      es: 'Hicimos el experimento con <em>nosotros</em> primero.',
    } as S,
    lede: {
      en: 'Sandbox started as a digital marketing agency. Putting AI into our own work changed how we operate — so now we design, build and run it for other businesses.',
      es: 'Sandbox nació como una agencia de marketing digital. Meter IA en nuestro propio trabajo cambió cómo operamos — y ahora la diseñamos, construimos y operamos para otras empresas.',
    } as S,
    /** The "config diff" under the headline: an old value gets replaced by a new one. */
    diffFile: 'sandbox.config',
    diffKey: 'what_we_do',
    diffOld: { en: '"marketing agency"', es: '"agencia de marketing"' } as S,
    diffNew: { en: '"design, build and run AI for businesses"', es: '"diseñar, construir y operar IA para empresas"' } as S,
    meta: [
      { k: { en: 'Founder', es: 'Fundador' } as S, v: { en: 'Axel Parra', es: 'Axel Parra' } as S },
      { k: { en: 'Base', es: 'Base' } as S, v: { en: 'Albuquerque, NM', es: 'Albuquerque, NM' } as S },
      { k: { en: 'Markets', es: 'Mercados' } as S, v: { en: 'US · Europe · LatAm', es: 'EE. UU. · Europa · LatAm' } as S },
      { k: { en: 'Languages', es: 'Idiomas' } as S, v: { en: 'English · Spanish', es: 'Inglés · Español' } as S },
    ],
    scroll: { en: 'The story', es: 'La historia' } as S,
  },

  story: {
    index: '01',
    eyebrow: { en: 'How we got here', es: 'Cómo llegamos aquí' } as S,
    title: { en: 'Four phases, one <em>direction</em>', es: 'Cuatro fases, una <em>dirección</em>' } as S,
    lede: {
      en: 'No big pivot announcement. Each phase grew out of the work of the one before it.',
      es: 'Sin grandes anuncios de cambio de rumbo. Cada fase nació del trabajo de la anterior.',
    } as S,
    diagramLabel: { en: 'How the company is wired, phase by phase', es: 'Cómo está conectada la empresa, fase por fase' } as S,
    phases: [
      {
        tag: { en: 'Marketing agency', es: 'Agencia de marketing' } as S,
        title: { en: 'We built websites and campaigns', es: 'Hacíamos sitios web y campañas' } as S,
        body: {
          en: 'Websites, SEO, content and paid media for brands and growing businesses. Years of client work taught us how businesses actually win and keep customers — and how much of a team’s week goes to repetitive work.',
          es: 'Sitios web, SEO, contenido y pauta para marcas y empresas en crecimiento. Años de trabajo con clientes nos enseñaron cómo las empresas consiguen y retienen clientes de verdad — y cuánto de la semana de un equipo se va en trabajo repetitivo.',
        } as S,
        notes: { en: ['Web', 'SEO', 'Content', 'Ads'], es: ['Web', 'SEO', 'Contenido', 'Anuncios'] } as L10n<string[]>,
      },
      {
        tag: { en: 'AI in our own workflow', es: 'IA en nuestro propio flujo' } as S,
        title: { en: 'We put AI to work on our own desk', es: 'Pusimos la IA a trabajar en nuestro escritorio' } as S,
        body: {
          en: 'Research, first drafts, reporting, QA. We rebuilt our own delivery around AI before offering it to anyone — keeping what saved real hours and dropping what only looked good in a demo.',
          es: 'Investigación, primeros borradores, reportes, control de calidad. Rediseñamos nuestra propia operación con IA antes de ofrecérsela a nadie — nos quedamos con lo que ahorraba horas reales y descartamos lo que solo se veía bien en una demo.',
        } as S,
        notes: { en: ['Research', 'Drafts', 'Reports', 'QA'], es: ['Investigación', 'Borradores', 'Reportes', 'QA'] } as L10n<string[]>,
      },
      {
        tag: { en: 'Building AI systems for clients', es: 'Sistemas de IA para clientes' } as S,
        title: { en: 'Clients asked for the same thing', es: 'Los clientes pidieron lo mismo' } as S,
        body: {
          en: 'Once clients saw how we worked, they wanted it inside their own companies. We started building brains and agents connected to their documents, CRM and inbox — with people approving the steps that matter.',
          es: 'Cuando los clientes vieron cómo trabajábamos, lo quisieron dentro de sus empresas. Empezamos a construir brains y agentes conectados a sus documentos, CRM y bandeja de entrada — con personas aprobando los pasos importantes.',
        } as S,
        notes: { en: ['Brains', 'Agents', 'Integrations'], es: ['Brains', 'Agentes', 'Integraciones'] } as L10n<string[]>,
      },
      {
        tag: { en: 'AI company', es: 'Empresa de IA' } as S,
        title: { en: 'Today: six ways to put AI to work', es: 'Hoy: seis formas de poner la IA a trabajar' } as S,
        body: {
          en: 'Custom systems, consulting, AI-native growth, training, packaged products and white-label for partners. Marketing is still part of what we do — it is now one of six units, and it runs on the same systems we build for clients.',
          es: 'Sistemas a medida, consultoría, growth nativo en IA, formación, productos empaquetados y marca blanca para partners. El marketing sigue siendo parte de lo que hacemos — ahora es una de seis unidades y funciona con los mismos sistemas que construimos para clientes.',
        } as S,
        notes: { en: ['6 units', 'One method'], es: ['6 unidades', 'Un método'] } as L10n<string[]>,
      },
    ],
    phaseWord: { en: 'Phase', es: 'Fase' } as S,
    /** Node labels for the evolving diagram */
    diagram: {
      core: 'SANDBOX',
      services: { en: ['Web', 'SEO', 'Content', 'Ads'], es: ['Web', 'SEO', 'Contenido', 'Ads'] } as L10n<string[]>,
      ai: { en: ['research', 'drafts', 'reports', 'QA'], es: ['investigación', 'borradores', 'reportes', 'QA'] } as L10n<string[]>,
      client: { en: 'client', es: 'cliente' } as S,
      clientParts: { en: ['brain', 'agents'], es: ['brain', 'agentes'] } as L10n<string[]>,
    },
  },

  principles: {
    index: '02',
    eyebrow: { en: 'Principles', es: 'Principios' } as S,
    title: { en: 'How we <em>decide</em>', es: 'Cómo <em>decidimos</em>' } as S,
    lede: {
      en: 'Six rules we hold ourselves to on every project, from a single agent to a full rollout.',
      es: 'Seis reglas que nos exigimos en cada proyecto, desde un solo agente hasta una implementación completa.',
    } as S,
    items: [
      {
        title: { en: 'We use it before we sell it', es: 'Lo usamos antes de venderlo' } as S,
        body: {
          en: 'Every playbook we offer has run on our own work first. If it didn’t save us time, it doesn’t reach your team.',
          es: 'Cada método que ofrecemos lo probamos primero en nuestro propio trabajo. Si no nos ahorró tiempo a nosotros, no llega a tu equipo.',
        } as S,
      },
      {
        title: { en: 'Systems over tools', es: 'Sistemas, no herramientas' } as S,
        body: {
          en: 'A new app rarely changes a business. A process redesigned around AI — with data, owners and guardrails — does.',
          es: 'Una app nueva casi nunca cambia un negocio. Un proceso rediseñado con IA — con datos, responsables y límites claros — sí.',
        } as S,
      },
      {
        title: { en: 'Humans approve what matters', es: 'Las personas aprueban lo importante' } as S,
        body: {
          en: 'Agents research, draft and prepare. People sign off on anything that reaches a client, moves money or can’t be undone.',
          es: 'Los agentes investigan, redactan y preparan. Las personas aprueban todo lo que llega a un cliente, mueve dinero o no se puede deshacer.',
        } as S,
      },
      {
        title: { en: 'Measured in hours and revenue, not demos', es: 'Se mide en horas e ingresos, no en demos' } as S,
        body: {
          en: 'We agree on the number before we build: hours returned, response time, pipeline. If it doesn’t move, we change the system.',
          es: 'Acordamos el número antes de construir: horas recuperadas, tiempo de respuesta, pipeline. Si no se mueve, cambiamos el sistema.',
        } as S,
      },
      {
        title: { en: 'Start small, then scale', es: 'Empezar chico, después escalar' } as S,
        body: {
          en: 'One process that hurts, proven in weeks. Then the next one. Big-bang AI projects are how budgets disappear.',
          es: 'Un proceso que duele, probado en semanas. Después el siguiente. Los proyectos de IA gigantes son la forma más rápida de perder presupuesto.',
        } as S,
      },
      {
        title: { en: 'You own what we build', es: 'Lo que construimos es tuyo' } as S,
        body: {
          en: 'Your data, your prompts, your documentation. Your team can see what the system did and why — no black boxes.',
          es: 'Tus datos, tus prompts, tu documentación. Tu equipo puede ver qué hizo el sistema y por qué — sin cajas negras.',
        } as S,
      },
    ],
  },

  markets: {
    index: '03',
    eyebrow: { en: 'How we work', es: 'Cómo trabajamos' } as S,
    title: { en: 'One team, three <em>markets</em>', es: 'Un equipo, tres <em>mercados</em>' } as S,
    lede: {
      en: 'Headquartered in Albuquerque, New Mexico. Remote-first, working with companies in the United States, Europe and Latin America — in English or Spanish.',
      es: 'Con base en Albuquerque, Nuevo México. Trabajamos de forma remota con empresas de Estados Unidos, Europa y Latinoamérica — en inglés o en español.',
    } as S,
    clockLabel: { en: 'Local time right now', es: 'Hora local ahora' } as S,
    overlapLabel: { en: 'Shared working hours', es: 'Horario compartido' } as S,
    hoursNote: { en: 'Bars show 9:00–18:00 local, on a UTC ruler.', es: 'Las barras muestran 9:00–18:00 hora local, sobre una regla en UTC.' } as S,
    nowLabel: { en: 'now', es: 'ahora' } as S,
    zones: [
      { id: 'us', tz: 'America/Denver', name: { en: 'United States', es: 'Estados Unidos' } as S, note: { en: 'Mountain Time · HQ', es: 'Hora de la Montaña · base' } as S },
      { id: 'eu', tz: 'Europe/Madrid', name: { en: 'Europe', es: 'Europa' } as S, note: { en: 'Central European Time', es: 'Hora de Europa Central' } as S },
      { id: 'latam', tz: 'America/Mexico_City', name: { en: 'Latin America', es: 'Latinoamérica' } as S, note: { en: 'Mexico City time', es: 'Hora de Ciudad de México' } as S },
    ],
    facts: [
      {
        icon: 'globe',
        title: { en: 'Remote-first', es: 'Remoto primero' } as S,
        body: {
          en: 'We work where your team works: shared channels, recorded walkthroughs and written decisions, so nobody waits for a meeting.',
          es: 'Trabajamos donde trabaja tu equipo: canales compartidos, recorridos grabados y decisiones por escrito, para que nadie dependa de una reunión.',
        } as S,
      },
      {
        icon: 'chat',
        title: { en: 'Bilingual by default', es: 'Bilingües por defecto' } as S,
        body: {
          en: 'Workshops, documentation and the systems themselves in English or Spanish — or both, for teams that work across borders.',
          es: 'Talleres, documentación y los propios sistemas en inglés o en español — o en ambos, para equipos que trabajan entre países.',
        } as S,
      },
      {
        icon: 'shield',
        title: { en: 'Local rules, local context', es: 'Reglas y contexto locales' } as S,
        body: {
          en: 'Data handling, usage policies and tone of voice adapted to each market — not one template copied across three continents.',
          es: 'Manejo de datos, políticas de uso y tono de voz adaptados a cada mercado — no una plantilla copiada en tres continentes.',
        } as S,
      },
    ],
  },

  numbers: {
    index: '04',
    eyebrow: { en: 'Track record', es: 'Trayectoria' } as S,
    title: { en: 'Fifteen years of <em>shipping</em>', es: 'Quince años <em>entregando</em>' } as S,
    brandsLabel: { en: 'Brands we’ve worked with', es: 'Marcas con las que trabajamos' } as S,
  },

  cta: {
    title: { en: 'Want to see what we’d build <em>for you</em>?', es: '¿Quieres ver qué construiríamos <em>para ti</em>?' } as S,
    body: {
      en: 'A 30-minute call. We look at one process together and tell you honestly whether AI is worth it there.',
      es: 'Una llamada de 30 minutos. Revisamos juntos un proceso y te decimos con honestidad si ahí vale la pena usar IA.',
    } as S,
    primary: { en: 'Book a strategy call', es: 'Agendar una llamada' } as S,
    secondary: { en: 'See our work', es: 'Ver casos' } as S,
  },
};
