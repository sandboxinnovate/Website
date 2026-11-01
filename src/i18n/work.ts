import type { L10n } from './index';
import type { UnitSlug } from '@/data/site';

type S = L10n<string>;
type SL = L10n<string[]>;

/**
 * Work page copy + case studies (EN/ES).
 *
 * Case studies come from the current site (sandboxinnovate.com/case-studies). Metrics are taken
 * verbatim from that text. Client businesses are described by type, not by name (no permission
 * on file to name them). Add new cases at the end of CASES; the unit filter picks them up.
 */

export interface CaseMetric { value: string; label: S }
export interface CaseStudy {
  id: string;
  unit: UnitSlug;
  /** Services involved, shown as small tags */
  tags: SL;
  title: S;
  /** One-line summary under the title */
  dek: S;
  client: S;
  /** Square-ish card image + wide image for the detail view (both in /public/work) */
  card: string;
  wide: { src: string; w: number; h: number };
  metrics: CaseMetric[];
  challenge: S;
  did: SL;
  results: SL;
}

export const WORK = {
  seo: {
    title: { en: 'Work — client results and what we build with AI', es: 'Casos — resultados de clientes y lo que construimos con IA' } as S,
    description: {
      en: 'Client results from Sandbox: content, SEO, web and local growth case studies with real metrics — plus the reference architecture of a Sandbox AI brain.',
      es: 'Resultados de clientes de Sandbox: casos de contenido, SEO, web y crecimiento local con métricas reales — y la arquitectura de referencia de un brain de IA de Sandbox.',
    } as S,
  },

  hero: {
    eyebrow: { en: 'Work', es: 'Casos' } as S,
    title: { en: 'Work that moved the <em>numbers</em>', es: 'Trabajo que movió los <em>números</em>' } as S,
    lede: {
      en: 'Client results from our marketing work, and the shape of the AI systems we build now.',
      es: 'Resultados de clientes de nuestro trabajo en marketing, y la forma de los sistemas de IA que construimos hoy.',
    } as S,
    jump: { en: 'Jump to case studies', es: 'Ir a los casos' } as S,
    countLabel: { en: 'published cases', es: 'casos publicados' } as S,
  },

  brain: {
    index: '01',
    eyebrow: { en: 'What we build', es: 'Lo que construimos' } as S,
    title: { en: 'What a Sandbox <em>brain</em> looks like', es: 'Cómo se ve un <em>brain</em> de Sandbox' } as S,
    lede: {
      en: 'Every company is wired differently, but the shape repeats: agents that know the business, act through its tools, and stop for a human when it counts.',
      es: 'Cada empresa está conectada de forma distinta, pero la forma se repite: agentes que conocen el negocio, actúan con sus herramientas y se detienen ante una persona cuando importa.',
    } as S,
    label: { en: 'Reference architecture · illustrative, not a client system', es: 'Arquitectura de referencia · ilustrativa, no es un sistema de cliente' } as S,
    cta: { en: 'Explore Brains', es: 'Ver Brains' } as S,
    points: [
      { k: 'L1', t: { en: 'Knowledge', es: 'Conocimiento' } as S, d: { en: 'Documents, records and history in one memory that cites its sources.', es: 'Documentos, registros e historial en una sola memoria que cita sus fuentes.' } as S },
      { k: 'L2', t: { en: 'Agents', es: 'Agentes' } as S, d: { en: 'One agent per process, each with a clear job and limits.', es: 'Un agente por proceso, cada uno con una tarea y límites claros.' } as S },
      { k: 'L3', t: { en: 'Human approval', es: 'Aprobación humana' } as S, d: { en: 'People approve what reaches a client or moves money.', es: 'Las personas aprueban lo que llega a un cliente o mueve dinero.' } as S },
      { k: 'L4', t: { en: 'Tools', es: 'Herramientas' } as S, d: { en: 'Agents act inside the tools your team already uses.', es: 'Los agentes actúan dentro de las herramientas que tu equipo ya usa.' } as S },
    ],
    /** Labels inside the SVG diagram */
    svg: {
      request: { en: 'Request', es: 'Solicitud' } as S,
      requestSub: { en: 'email · form · chat', es: 'correo · web · chat' } as S,
      agents: { en: 'Agents', es: 'Agentes' } as S,
      agentNames: { en: ['Sales', 'Support', 'Operations', 'Reporting'], es: ['Ventas', 'Soporte', 'Operaciones', 'Reportes'] } as SL,
      agentSub: { en: 'agent', es: 'agente' } as S,
      knowledge: { en: 'Knowledge', es: 'Conocimiento' } as S,
      knowledgeItems: { en: ['Docs', 'CRM records', 'Calls & chats', 'Policies', 'History'], es: ['Documentos', 'Registros CRM', 'Llamadas y chats', 'Políticas', 'Historial'] } as SL,
      retrieve: { en: 'retrieves with sources', es: 'consulta con fuentes' } as S,
      draft: { en: 'draft', es: 'borrador' } as S,
      approval: { en: 'Human approval', es: 'Aprobación humana' } as S,
      approvalShort: { en: 'Human approval', es: 'Aprobación' } as S,
      decisions: { en: ['Approve', 'Edit', 'Reject'], es: ['Aprobar', 'Editar', 'Rechazar'] } as SL,
      tools: { en: 'Tools', es: 'Herramientas' } as S,
      toolItems: { en: ['CRM', 'Inbox', 'Team chat', 'Calendar', 'Spreadsheet', 'Knowledge base'], es: ['CRM', 'Bandeja', 'Chat del equipo', 'Calendario', 'Hoja de cálculo', 'Base de conocimiento'] } as SL,
      outcome: { en: 'Outcome', es: 'Resultado' } as S,
      outcomeSub: { en: 'done · logged', es: 'hecho · guardado' } as S,
      loop: { en: 'every action is logged back to memory', es: 'cada acción vuelve a la memoria' } as S,
      title: { en: 'Diagram of a Sandbox AI brain', es: 'Diagrama de un brain de IA de Sandbox' } as S,
      desc: {
        en: 'A request reaches the agent layer. Agents retrieve context from the knowledge layer, prepare a draft, and send it to a person who approves, edits or rejects it. Approved actions run in the company’s tools and every action is logged back into knowledge.',
        es: 'Una solicitud llega a la capa de agentes. Los agentes consultan el contexto en la capa de conocimiento, preparan un borrador y lo envían a una persona que lo aprueba, edita o rechaza. Las acciones aprobadas se ejecutan en las herramientas de la empresa y cada acción vuelve a registrarse en el conocimiento.',
      } as S,
    },
  },

  cases: {
    index: '02',
    eyebrow: { en: 'Case studies', es: 'Casos de estudio' } as S,
    title: { en: 'Client <em>results</em>', es: 'Resultados de <em>clientes</em>' } as S,
    lede: {
      en: 'Six projects from our marketing work — content, SEO, web and local growth — with the numbers each one moved.',
      es: 'Seis proyectos de nuestro trabajo en marketing — contenido, SEO, web y crecimiento local — con los números que movió cada uno.',
    } as S,
    filterLabel: { en: 'Filter case studies by unit', es: 'Filtrar casos por unidad' } as S,
    all: { en: 'All', es: 'Todos' } as S,
    noneYet: { en: 'No published cases yet', es: 'Aún sin casos publicados' } as S,
    showing: { en: 'Showing', es: 'Mostrando' } as S,
    of: { en: 'of', es: 'de' } as S,
    open: { en: 'Read the case', es: 'Ver el caso' } as S,
    close: { en: 'Close', es: 'Cerrar' } as S,
    prev: { en: 'Previous case', es: 'Caso anterior' } as S,
    next: { en: 'Next case', es: 'Caso siguiente' } as S,
    client: { en: 'Client', es: 'Cliente' } as S,
    challenge: { en: 'The challenge', es: 'El desafío' } as S,
    did: { en: 'What we did', es: 'Qué hicimos' } as S,
    results: { en: 'Results', es: 'Resultados' } as S,
    caseWord: { en: 'Case', es: 'Caso' } as S,
    mockup: { en: 'Website mockups', es: 'Mockups del sitio' } as S,
    slot: {
      label: { en: 'Next in this list', es: 'Lo próximo en esta lista' } as S,
      title: { en: 'Brains and Consulting case studies', es: 'Casos de Brains y Consultoría' } as S,
      body: {
        en: 'We publish a case only when the client signs off on it. Until then, we are happy to walk you through how we build on a call.',
        es: 'Publicamos un caso solo cuando el cliente lo aprueba. Mientras tanto, con gusto te mostramos cómo construimos en una llamada.',
      } as S,
      cta: { en: 'Book a walkthrough', es: 'Agendar un recorrido' } as S,
    },
  },

  cta: {
    title: { en: 'Your numbers could be <em>next</em>.', es: 'Tus números pueden ser los <em>siguientes</em>.' } as S,
    body: {
      en: 'Tell us what you want to move — hours, response time, pipeline — and we will tell you how we would get there.',
      es: 'Cuéntanos qué quieres mover — horas, tiempo de respuesta, pipeline — y te decimos cómo llegaríamos ahí.',
    } as S,
    primary: { en: 'Book a strategy call', es: 'Agendar una llamada' } as S,
    secondary: { en: 'Take the AI diagnostic', es: 'Hacer el diagnóstico de IA' } as S,
  },
};

export const CASES: CaseStudy[] = [
  {
    id: 'videographer',
    unit: 'growth',
    tags: { en: ['Content', 'Brand voice'], es: ['Contenido', 'Voz de marca'] },
    title: { en: 'Content writing for a videographer', es: 'Contenido para un estudio de video' },
    dek: {
      en: 'A boutique videography studio’s portfolio site, rewritten in its own voice.',
      es: 'El sitio de portfolio de un estudio boutique de video, reescrito con su propia voz.',
    },
    client: { en: 'Boutique videography studio', es: 'Estudio boutique de videografía' },
    card: '/work/videographer-card.webp',
    wide: { src: '/work/videographer-wide.webp', w: 1600, h: 1086 },
    metrics: [
      { value: '40%', label: { en: 'Increase in website traffic', es: 'Más tráfico web' } },
      { value: '70%', label: { en: 'Target keywords ranked', es: 'Palabras clave objetivo posicionadas' } },
    ],
    challenge: {
      en: 'The studio films weddings, events and corporate projects, and its footage spoke for itself. The website copy didn’t. It failed to carry the studio’s voice, show off the portfolio or turn visitors into new clients.',
      es: 'El estudio filma bodas, eventos y proyectos corporativos, y su material hablaba por sí solo. El texto del sitio no. No transmitía la voz del estudio, no lucía el portfolio y no convertía visitas en clientes nuevos.',
    },
    did: {
      en: [
        'Ran a discovery session on values, audience and selling points, then defined a brand voice and tone.',
        'Rewrote the portfolio as stories and organized it into weddings, events and corporate work.',
        'Wrote clear service descriptions that answer the questions clients usually ask before booking.',
        'Placed client testimonials next to specific projects as social proof.',
      ],
      es: [
        'Hicimos una sesión de descubrimiento sobre valores, público y diferenciales, y definimos la voz y el tono de la marca.',
        'Reescribimos el portfolio como historias y lo ordenamos en bodas, eventos y trabajos corporativos.',
        'Redactamos descripciones de servicio claras que responden lo que los clientes preguntan antes de contratar.',
        'Ubicamos testimonios de clientes junto a proyectos concretos como prueba social.',
      ],
    },
    results: {
      en: [
        '40% increase in website traffic in the first month after launch.',
        '70% of target keywords ranked.',
        'Longer time on page and a lower bounce rate.',
        'A clear rise in inquiries from new prospects.',
      ],
      es: [
        '40% más tráfico web durante el primer mes después del lanzamiento.',
        '70% de las palabras clave objetivo posicionadas.',
        'Más tiempo en página y una tasa de rebote más baja.',
        'Un aumento claro de consultas de clientes potenciales.',
      ],
    },
  },
  {
    id: 'barbershop',
    unit: 'growth',
    tags: { en: ['Web', 'Local SEO', 'Social', 'Ads'], es: ['Web', 'SEO local', 'Redes', 'Anuncios'] },
    title: { en: 'Transforming Barber Buzz', es: 'Más clientes para una barbería' },
    dek: {
      en: 'How a downtown barbershop grew its clientele with digital marketing.',
      es: 'Cómo una barbería del centro amplió su clientela con marketing digital.',
    },
    client: { en: 'Downtown barbershop', es: 'Barbería del centro' },
    card: '/work/barbershop-card.webp',
    wide: { src: '/work/barbershop-wide.webp', w: 1600, h: 1086 },
    metrics: [
      { value: '30%', label: { en: 'New client bookings', es: 'Más reservas de clientes nuevos' } },
      { value: '50%', label: { en: 'Traffic and online bookings, led by local search', es: 'Tráfico y reservas online, impulsados por búsqueda local' } },
    ],
    challenge: {
      en: 'A loyal base of regulars, but chain salons and booking apps were taking the new customers. The shop needed a modern online presence to keep growing.',
      es: 'Una base fiel de clientes habituales, pero las cadenas y las apps de reservas se quedaban con los clientes nuevos. La barbería necesitaba una presencia online moderna para seguir creciendo.',
    },
    did: {
      en: [
        'Built a new website with online booking, service descriptions and barber profiles, optimized for local search.',
        'Ran social content: before-and-after cuts, barber spotlights and grooming tips.',
        'Launched targeted local ads with promotions for first-time clients.',
        'Set up a referral program that rewards clients who bring friends and family.',
      ],
      es: [
        'Construimos un sitio nuevo con reservas online, descripciones de servicios y perfiles de cada barbero, optimizado para búsqueda local.',
        'Creamos contenido para redes: cortes antes y después, perfiles de barberos y consejos de cuidado.',
        'Lanzamos anuncios locales segmentados con promociones para clientes nuevos.',
        'Armamos un programa de referidos que premia a quienes traen amigos y familia.',
      ],
    },
    results: {
      en: [
        '30% increase in new client bookings within the first three months.',
        '50% growth in website traffic and online bookings, much of it from local search and social.',
        'Social engagement doubled.',
        'Referrals accounted for 20% of new bookings.',
      ],
      es: [
        '30% más reservas de clientes nuevos en los primeros tres meses.',
        '50% de crecimiento en tráfico web y reservas online, en gran parte desde búsqueda local y redes.',
        'La interacción en redes se duplicó.',
        'Los referidos generaron el 20% de las reservas nuevas.',
      ],
    },
  },
  {
    id: 'architecture',
    unit: 'growth',
    tags: { en: ['SEO', 'Content'], es: ['SEO', 'Contenido'] },
    title: { en: 'SEO for an architecture firm', es: 'SEO para un estudio de arquitectura' },
    dek: {
      en: 'How an architecture firm reached the first page of search with a strategic SEO program.',
      es: 'Cómo un estudio de arquitectura llegó a la primera página de búsqueda con una estrategia de SEO.',
    },
    client: { en: 'Architecture firm', es: 'Estudio de arquitectura' },
    card: '/work/architecture-card.webp',
    wide: { src: '/work/architecture-wide.webp', w: 1400, h: 950 },
    metrics: [
      { value: '60%', label: { en: 'Increase in organic traffic', es: 'Más tráfico orgánico' } },
      { value: 'Page 1', label: { en: 'Search ranking for key architecture terms', es: 'Posición en búsquedas clave de arquitectura' } },
    ],
    challenge: {
      en: 'Architecture runs on referrals and professional networks. To compete with larger firms, the studio needed to rank for the searches its future clients make and turn that traffic into inquiries.',
      es: 'La arquitectura vive de referencias y redes profesionales. Para competir con estudios más grandes, la firma necesitaba posicionarse en las búsquedas de sus futuros clientes y convertir ese tráfico en consultas.',
    },
    did: {
      en: [
        'Researched keywords by service, project type and location, then optimized content, meta tags and headings.',
        'Audited the site and fixed speed, mobile layout, structure and schema markup.',
        'Created content around the firm’s projects and design approach, plus a blog on architecture and design trends.',
        'Optimized local listings and directories, and encouraged reviews from satisfied clients.',
      ],
      es: [
        'Investigamos palabras clave por servicio, tipo de proyecto y ubicación, y optimizamos contenidos, metaetiquetas y encabezados.',
        'Auditamos el sitio y corregimos velocidad, versión móvil, estructura y datos estructurados.',
        'Creamos contenido sobre los proyectos y el enfoque de diseño del estudio, más un blog de arquitectura y tendencias.',
        'Optimizamos fichas locales y directorios, e impulsamos reseñas de clientes satisfechos.',
      ],
    },
    results: {
      en: [
        '60% increase in organic traffic within the first six months.',
        'First page of search results for key architecture keywords.',
        'Online inquiries and leads doubled, with a large share from organic search.',
      ],
      es: [
        '60% más tráfico orgánico en los primeros seis meses.',
        'Primera página de resultados para palabras clave importantes de arquitectura.',
        'Las consultas y leads online se duplicaron, en buena parte desde búsqueda orgánica.',
      ],
    },
  },
  {
    id: 'landscaping',
    unit: 'growth',
    tags: { en: ['SEO', 'Content', 'Links'], es: ['SEO', 'Contenido', 'Enlaces'] },
    title: { en: 'SEO for a landscaping business', es: 'SEO para una empresa de paisajismo' },
    dek: {
      en: 'A full SEO program — technical, content and links — for a landscaping company.',
      es: 'Un programa completo de SEO — técnico, contenido y enlaces — para una empresa de paisajismo.',
    },
    client: { en: 'Landscaping business', es: 'Empresa de paisajismo' },
    card: '/work/landscaping-card.webp',
    wide: { src: '/work/landscaping-wide.webp', w: 1600, h: 1086 },
    metrics: [
      { value: '60%', label: { en: 'Organic traffic increased', es: 'Aumento del tráfico orgánico' } },
      { value: '80%', label: { en: 'Target keywords ranked', es: 'Palabras clave objetivo posicionadas' } },
    ],
    challenge: {
      en: 'A good reputation offline, but little visibility in search. Competitors were capturing the people looking for exactly the services the business offered.',
      es: 'Buena reputación fuera de internet, pero poca visibilidad en buscadores. La competencia se quedaba con quienes buscaban justo los servicios que ofrecía la empresa.',
    },
    did: {
      en: [
        'Identified high-value keywords for each service and optimized content and meta tags around them.',
        'Ran technical audits and fixed site speed, mobile responsiveness, navigation and internal linking.',
        'Published guides and how-to articles that answer what customers search for.',
        'Ran a link-building campaign to earn backlinks from relevant, authoritative sites.',
      ],
      es: [
        'Identificamos palabras clave de alto valor para cada servicio y optimizamos contenidos y metaetiquetas.',
        'Hicimos auditorías técnicas y mejoramos velocidad, versión móvil, navegación y enlaces internos.',
        'Publicamos guías y artículos prácticos que responden lo que buscan los clientes.',
        'Hicimos una campaña de enlaces para conseguir backlinks de sitios relevantes y con autoridad.',
      ],
    },
    results: {
      en: [
        '60% increase in organic traffic within the first six months.',
        'Over 80% of target keywords ranked on the first page of search results.',
      ],
      es: [
        '60% más tráfico orgánico en los primeros seis meses.',
        'Más del 80% de las palabras clave objetivo en la primera página de resultados.',
      ],
    },
  },
  {
    id: 'copywriter',
    unit: 'growth',
    tags: { en: ['Web design', 'Copy'], es: ['Diseño web', 'Copy'] },
    title: { en: 'Crafting copy, crafting success', es: 'Un portfolio que consigue clientes' },
    dek: {
      en: 'A copywriter’s portfolio, redesigned to attract better clients.',
      es: 'El portfolio de una redactora, rediseñado para atraer mejores clientes.',
    },
    client: { en: 'Independent copywriter', es: 'Redactora independiente' },
    card: '/work/copywriter-card.webp',
    wide: { src: '/work/copywriter-wide.webp', w: 1600, h: 1280 },
    metrics: [
      { value: '50%', label: { en: 'More inquiries and client leads', es: 'Más consultas y leads de clientes' } },
      { value: '70%', label: { en: 'Growth in traffic and engagement', es: 'Crecimiento en tráfico y engagement' } },
    ],
    challenge: {
      en: 'Strong work across marketing, technology and healthcare, but a website that hid it: dated design, clumsy navigation and a portfolio that didn’t surface the best pieces.',
      es: 'Un gran trabajo en marketing, tecnología y salud, pero un sitio que lo escondía: diseño anticuado, navegación torpe y un portfolio que no destacaba sus mejores piezas.',
    },
    did: {
      en: [
        'Designed a clean, modern site with a consistent palette, typography and imagery.',
        'Rebuilt the portfolio around case studies and samples, filterable by industry, project type or keyword.',
        'Sharpened headlines, service descriptions and calls to action.',
        'Made the whole site fully responsive on mobile.',
      ],
      es: [
        'Diseñamos un sitio limpio y moderno, con paleta, tipografía e imágenes coherentes.',
        'Rearmamos el portfolio con casos y muestras que se pueden filtrar por industria, tipo de proyecto o palabra clave.',
        'Afinamos titulares, descripciones de servicio y llamados a la acción.',
        'Dejamos todo el sitio adaptado al celular.',
      ],
    },
    results: {
      en: [
        '50% increase in inquiries and client leads in the first month after relaunch.',
        '70% increase in traffic and engagement, including page views and time on site.',
        'Visitors pointed to the clearer portfolio as the reason they got in touch.',
      ],
      es: [
        '50% más consultas y leads de clientes durante el primer mes después del relanzamiento.',
        '70% más tráfico y engagement, incluyendo páginas vistas y tiempo en el sitio.',
        'Los visitantes mencionaron el portfolio más claro como la razón para escribir.',
      ],
    },
  },
  {
    id: 'pet-grooming',
    unit: 'growth',
    tags: { en: ['Web design', 'Local SEO', 'Email'], es: ['Diseño web', 'SEO local', 'Email'] },
    title: { en: 'Paws & Pampering website design', es: 'Sitio web para un spa de mascotas' },
    dek: {
      en: 'How a boutique pet grooming salon grew bookings with a new site and digital marketing.',
      es: 'Cómo una peluquería boutique de mascotas aumentó sus reservas con un sitio nuevo y marketing digital.',
    },
    client: { en: 'Boutique pet grooming salon', es: 'Peluquería boutique de mascotas' },
    card: '/work/pet-grooming-card.webp',
    wide: { src: '/work/pet-grooming-wide.webp', w: 1600, h: 1086 },
    metrics: [
      { value: '60%', label: { en: 'Online bookings surged', es: 'Aumento de reservas online' } },
      { value: '25%', label: { en: 'Increase in repeat business', es: 'Más clientes recurrentes' } },
    ],
    challenge: {
      en: 'Loved by local pet owners, but losing ground to grooming chains and DIY grooming at home. The salon needed new ways to attract clients and keep them coming back.',
      es: 'Muy querida por los dueños de mascotas de la zona, pero perdiendo terreno frente a las cadenas y al baño casero. La peluquería necesitaba nuevas formas de atraer clientes y lograr que volvieran.',
    },
    did: {
      en: [
        'Redesigned the website around services and a simpler booking flow, with local SEO.',
        'Built a social presence with pet photos, grooming tips and behind-the-scenes content.',
        'Ran email newsletters with specials, care tips and client stories.',
        'Partnered with local vets, pet stores and adoption events to reach more owners.',
      ],
      es: [
        'Rediseñamos el sitio en torno a los servicios y un flujo de reserva más simple, con SEO local.',
        'Construimos presencia en redes con fotos de mascotas, consejos de cuidado y contenido detrás de escena.',
        'Enviamos newsletters con promociones, consejos y historias de clientes.',
        'Generamos alianzas con veterinarias, tiendas de mascotas y jornadas de adopción para llegar a más dueños.',
      ],
    },
    results: {
      en: [
        '60% surge in website traffic and online bookings.',
        '40% increase in new client bookings within the first six months.',
        'Social followers and engagement more than doubled.',
        '25% increase in repeat business from the email program.',
      ],
      es: [
        '60% más tráfico web y reservas online.',
        '40% más reservas de clientes nuevos en los primeros seis meses.',
        'Los seguidores y la interacción en redes se duplicaron con creces.',
        '25% más clientes recurrentes gracias al programa de email.',
      ],
    },
  },
];
