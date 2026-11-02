import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const GROWTH: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'AI-native marketing and AI search visibility (GEO)',
      description:
        'Marketing engineered with AI: a content engine in your brand voice, visibility inside AI answers, ad creative tested at volume and personalized outbound.',
    },
    hero: {
      title: 'Be the answer <em>when buyers ask AI.</em>',
      lede:
        'Your buyers now ask an assistant before they search. We build the marketing engine for that: content in your brand’s voice, visibility inside AI answers, ad creative generated and tested at volume, and outbound that reads like it was written for one person.',
      primary: 'Book a call',
      secondary: { label: 'See how AI answers', href: '#demo' },
      facts: [
        { k: 'Channels', v: 'AI answers · Search · Paid social · Email' },
        { k: 'First outputs', v: 'Weeks 3-5' },
        { k: 'Brand voice', v: 'Trained on your material, approved by you' },
      ],
    },
    pains: {
      title: 'More channels, <em>same team</em>',
      lede: 'Marketing teams are being asked for more output, in more channels, with the same people. This is where AI earns its place.',
      items: [
        {
          pain: 'Ask an AI assistant about your category and it recommends your competitors.',
          outcome: 'Content and signals structured so AI answers cite you, tracked question by question.',
        },
        {
          pain: 'Content takes weeks and still sounds like everyone else.',
          outcome: 'An engine that drafts in your voice from your team’s expertise, with editors approving every piece.',
        },
        {
          pain: 'Your ads run the same three creatives until they burn out.',
          outcome: 'New concepts and variants every week, tested in a structured way and rotated on what the data says.',
        },
        {
          pain: 'Outbound gets ignored because it reads like a template.',
          outcome: 'Messages researched per account and personalized at volume, with a person reviewing every sequence.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we deliver',
      title: 'Four engines, <em>one voice</em>',
      lede: 'Run one engine or all four. They share the same brand voice, the same data and the same monthly report.',
      items: [
        {
          name: 'AI Content Engine',
          what: 'A system that turns your team’s expertise into articles, social posts, newsletters and video scripts in your brand’s voice: researched, drafted and ready for approval every week.',
          includes: [
            'Brand voice model trained on your best material',
            'Editorial calendar tied to search and AI demand',
            'Drafts for blog, social, email and video',
            'Human editing and approval workflow',
            'Performance report by piece and topic',
          ],
          timeline: '2-4 weeks to set up, then ongoing',
          bestFor: 'Brands with real expertise and no time to publish it.',
        },
        {
          name: 'AI Search Visibility (GEO)',
          what: 'Generative engine optimization: we track how AI assistants answer the questions your buyers ask, find why they cite others, and fix it with content, structure and third-party signals.',
          includes: [
            'Question set built from real buyer questions',
            'Baseline of mentions and citations across assistants',
            'Technical fixes: structure, schema, crawlability',
            'Content and source plan to earn citations',
            'Monthly visibility tracking',
          ],
          timeline: '3-4 weeks to baseline, then monthly',
          bestFor: 'Companies whose buyers research with AI before they ever reach the website.',
        },
        {
          name: 'AI Performance Creative',
          what: 'Ad creative produced with AI and tested like a lab: many concepts, hooks and formats per week, with spend moving to what works.',
          includes: [
            'Creative strategy and angle library',
            'Image, video and copy variants every week',
            'Structured testing plan in your ads manager',
            'Brand and compliance review on every asset',
            'Weekly learnings report',
          ],
          timeline: '2 weeks to first tests',
          bestFor: 'Advertisers with steady spend who are held back by creative volume.',
        },
        {
          name: 'Personalized Outbound',
          what: 'Prospecting that researches each account, writes a message for that person and runs the sequence from your inbox, with your team approving before anything goes out.',
          includes: [
            'Ideal customer profile and account lists',
            'Research agent per account and contact',
            'Personalized emails and follow-ups',
            'Deliverability setup and domain care',
            'Replies routed to your CRM',
          ],
          timeline: '3-4 weeks to first sends',
          bestFor: 'B2B teams selling high-value deals to a defined list of accounts.',
        },
      ],
    },
    demo: {
      eyebrow: 'Interactive simulation',
      title: 'How AI decides <em>who to recommend</em>',
      lede: 'A simulated assistant answering a buyer’s question. See which sources it reads, which brands it cites and what changes the answer.',
    },
    method: {
      title: 'Audit, engine, <em>weekly output</em>',
      lede: 'Setup takes a few weeks. After that, the engines produce every week and the report tells you what moved.',
      steps: [
        {
          name: 'Audit',
          time: '1 week',
          body: 'We audit your channels and content, and how AI assistants answer the questions in your category today.',
          out: ['Channel audit', 'AI visibility baseline'],
        },
        {
          name: 'Calibrate',
          time: '1 week',
          body: 'We train the brand voice, define the question set, the creative angles and the accounts to target, and agree on the metrics that matter.',
          out: ['Voice guide', 'Questions & angles', 'Scorecard'],
        },
        {
          name: 'Launch',
          time: '2-3 weeks',
          body: 'We set up the engines, connect your ads manager, CRM and inbox, and ship the first batch of content and tests.',
          out: ['Engines live', 'First outputs'],
        },
        {
          name: 'Publish weekly',
          time: 'Monthly',
          body: 'We publish, test and iterate every week, and report what moved: citations, traffic, leads and pipeline.',
          out: ['Weekly outputs', 'Monthly report'],
        },
      ],
    },
    pricing: {
      body: 'Growth engagements have a setup phase and a monthly retainer for running the engines. Media spend is separate and stays in your own ad accounts. We scope it after a discovery call, based on the engines you need, your volume and your market.',
      points: [
        'Setup: audit, voice training, engine configuration',
        'Monthly: production, testing, tracking and reporting',
        'Media spend stays in your own accounts',
        'Tailored to your market and scope',
      ],
      shape: ['Setup', 'Monthly retainer'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'Where the engines <em>pull their weight</em>',
      lede: 'How each engine is typically used, sector by sector.',
      items: [
        {
          industry: 'B2B software',
          title: 'Show up in “best tools for…” answers',
          body: 'Comparison pages, documentation and third-party mentions structured so assistants cite the product for the right use cases.',
          tags: ['GEO', 'Content'],
        },
        {
          industry: 'Professional services',
          title: 'Partner expertise, published',
          body: 'Short interviews with partners become articles, newsletters and posts in each person’s voice, approved in one pass.',
          tags: ['Content engine'],
        },
        {
          industry: 'E-commerce',
          title: 'Creative testing at volume',
          body: 'Product angles turned into image and video variants every week, with winners scaled and the rest retired.',
          tags: ['Creative', 'Ads manager'],
        },
        {
          industry: 'Hospitality',
          title: 'Direct bookings from AI trip planning',
          body: 'Content and listings structured so travel questions to AI assistants surface the property, not only the marketplaces.',
          tags: ['GEO', 'Content'],
        },
        {
          industry: 'Industrial B2B',
          title: 'Account-based outbound',
          body: 'Research per plant or distributor, messages that reference real context, and replies routed straight to the sales team.',
          tags: ['Outbound', 'CRM'],
        },
      ],
    },
    faq: [
      {
        q: 'What is generative engine optimization (GEO)?',
        a: 'It is the work of making your brand appear (and be cited) inside the answers AI assistants give. It overlaps with SEO but adds new work: tracking questions instead of keywords, earning mentions on the sources assistants trust and structuring content so it can be quoted.',
      },
      {
        q: 'Can you guarantee we’ll be cited by AI assistants?',
        a: 'No one can, because assistants keep changing how they answer. What we commit to is the process: a measured baseline, specific fixes and monthly tracking, so you can see exactly what moved and why.',
      },
      {
        q: 'Will AI-generated content hurt our brand or rankings?',
        a: 'Thin, generic content hurts, whoever writes it. Our engine starts from your team’s real expertise, follows your voice guide and goes through human editing before anything is published.',
      },
      {
        q: 'Do you replace our marketing team?',
        a: 'No. We give your team an engine and the people to run it. Your marketers set the strategy and approve the output; the engine handles research, drafts, variants and reporting.',
      },
      {
        q: 'Which ad platforms and tools do you work with?',
        a: 'The main search, social and professional ad networks, plus the CRM, email and analytics tools you already use. We work inside your accounts, so the data and history stay with you.',
      },
      {
        q: 'How do you keep outbound compliant?',
        a: 'We set up sending domains, volumes and opt-out handling according to the rules of each market you target, and only contact business addresses that match your ideal customer profile.',
      },
      {
        q: 'How do you measure results?',
        a: 'Each engine has its own scorecard: citations and share of answers for GEO, output and engagement for content, cost per result for creative, replies and meetings for outbound. Everything rolls up into one monthly report.',
      },
    ],
    cta: {
      title: 'See where you stand <em>in AI answers.</em>',
      lede: 'Book a call and we’ll look together at how AI assistants answer your buyers’ questions today, and what it would take to change that.',
    },
  },

  es: {
    seo: {
      title: 'Marketing con IA y visibilidad en la IA (GEO)',
      description:
        'Marketing diseñado con IA: contenido con la voz de tu marca, visibilidad en las respuestas de IA, creatividades testeadas a escala y prospección personalizada.',
    },
    hero: {
      title: 'Sé la respuesta <em>cuando tus clientes le preguntan a la IA.</em>',
      lede:
        'Hoy tus clientes le preguntan a un asistente antes de buscar. Construimos el motor de marketing para ese escenario: contenido con la voz de tu marca, visibilidad dentro de las respuestas de IA, creatividades generadas y testeadas a escala, y prospección que parece escrita para una sola persona.',
      primary: 'Agendar una llamada',
      secondary: { label: 'Ver cómo responde la IA', href: '#demo' },
      facts: [
        { k: 'Canales', v: 'Respuestas de IA · Búsqueda · Anuncios en redes · Email' },
        { k: 'Primeras piezas', v: 'Semanas 3-5' },
        { k: 'Voz de marca', v: 'Entrenada con tu material, aprobada por ti' },
      ],
    },
    pains: {
      title: 'Más canales, <em>el mismo equipo</em>',
      lede: 'A los equipos de marketing se les pide más producción, en más canales, con la misma gente. Ahí es donde la IA se gana su lugar.',
      items: [
        {
          pain: 'Le preguntas a un asistente de IA por tu categoría y recomienda a tu competencia.',
          outcome: 'Contenido y señales estructurados para que las respuestas de IA te citen, medidos pregunta por pregunta.',
        },
        {
          pain: 'El contenido tarda semanas y aun así suena igual que el de todos.',
          outcome: 'Un motor que redacta con tu voz a partir del conocimiento de tu equipo, con editores aprobando cada pieza.',
        },
        {
          pain: 'Tus anuncios repiten las mismas tres creatividades hasta que se agotan.',
          outcome: 'Conceptos y variantes nuevas cada semana, testeadas con método y rotadas según lo que dicen los datos.',
        },
        {
          pain: 'Nadie responde tu prospección porque se nota que es una plantilla.',
          outcome: 'Mensajes investigados por cuenta y personalizados a escala, con una persona revisando cada secuencia.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué entregamos',
      title: 'Cuatro motores, <em>una sola voz</em>',
      lede: 'Activa un motor o los cuatro. Comparten la misma voz de marca, los mismos datos y el mismo reporte mensual.',
      items: [
        {
          name: 'Motor de contenido con IA',
          what: 'Un sistema que convierte el conocimiento de tu equipo en artículos, publicaciones, newsletters y guiones de video con la voz de tu marca: investigados, redactados y listos para aprobar cada semana.',
          includes: [
            'Modelo de voz entrenado con tu mejor material',
            'Calendario editorial basado en la demanda en buscadores e IA',
            'Borradores para blog, redes, email y video',
            'Flujo de edición y aprobación humana',
            'Reporte de rendimiento por pieza y tema',
          ],
          timeline: '2-4 semanas de puesta en marcha, luego continuo',
          bestFor: 'Marcas con conocimiento real y sin tiempo para publicarlo.',
        },
        {
          name: 'Visibilidad en buscadores de IA (GEO)',
          what: 'Optimización para motores generativos: medimos cómo responden los asistentes de IA a las preguntas de tus clientes, entendemos por qué citan a otros y lo corregimos con contenido, estructura y señales de terceros.',
          includes: [
            'Banco de preguntas basado en consultas reales de clientes',
            'Línea base de menciones y citas en asistentes',
            'Ajustes técnicos: estructura, schema, rastreabilidad',
            'Plan de contenido y fuentes para ganar citas',
            'Seguimiento mensual de visibilidad',
          ],
          timeline: '3-4 semanas a la línea base, luego mensual',
          bestFor: 'Empresas cuyos clientes investigan con IA antes de llegar a su sitio.',
        },
        {
          name: 'Creatividades de performance con IA',
          what: 'Creatividades para anuncios producidas con IA y testeadas como en un laboratorio: muchos conceptos, ganchos y formatos por semana, con la inversión moviéndose hacia lo que funciona.',
          includes: [
            'Estrategia creativa y biblioteca de ángulos',
            'Variantes de imagen, video y texto cada semana',
            'Plan de testeo estructurado en tu administrador de anuncios',
            'Revisión de marca y cumplimiento en cada pieza',
            'Reporte semanal de aprendizajes',
          ],
          timeline: '2 semanas a los primeros tests',
          bestFor: 'Anunciantes con inversión constante a quienes les falta volumen creativo.',
        },
        {
          name: 'Prospección personalizada',
          what: 'Prospección que investiga cada cuenta, escribe un mensaje para esa persona y ejecuta la secuencia desde tu correo, con tu equipo aprobando antes de que salga cualquier envío.',
          includes: [
            'Perfil de cliente ideal y listas de cuentas',
            'Agente de investigación por cuenta y contacto',
            'Correos y seguimientos personalizados',
            'Configuración de entregabilidad y cuidado de dominios',
            'Respuestas derivadas a tu CRM',
          ],
          timeline: '3-4 semanas a los primeros envíos',
          bestFor: 'Equipos B2B que venden contratos de alto valor a una lista definida de cuentas.',
        },
      ],
    },
    demo: {
      eyebrow: 'Simulación interactiva',
      title: 'Cómo decide la IA <em>a quién recomendar</em>',
      lede: 'Un asistente simulado respondiendo la pregunta de un cliente. Mira qué fuentes lee, qué marcas cita y qué cambia la respuesta.',
    },
    method: {
      title: 'Auditoría, motor, <em>producción semanal</em>',
      lede: 'La puesta en marcha toma unas semanas. Después, los motores producen cada semana y el reporte te dice qué se movió.',
      steps: [
        {
          name: 'Auditar',
          time: '1 semana',
          body: 'Auditamos tus canales y tu contenido, y cómo responden hoy los asistentes de IA a las preguntas de tu categoría.',
          out: ['Auditoría de canales', 'Línea base de visibilidad en IA'],
        },
        {
          name: 'Calibrar',
          time: '1 semana',
          body: 'Entrenamos la voz de marca, definimos el banco de preguntas, los ángulos creativos y las cuentas objetivo, y acordamos las métricas que importan.',
          out: ['Guía de voz', 'Preguntas y ángulos', 'Tablero de métricas'],
        },
        {
          name: 'Lanzar',
          time: '2-3 semanas',
          body: 'Configuramos los motores, conectamos tu administrador de anuncios, tu CRM y tu correo, y entregamos la primera tanda de contenido y tests.',
          out: ['Motores activos', 'Primeras piezas'],
        },
        {
          name: 'Publicar cada semana',
          time: 'Mensual',
          body: 'Publicamos, testeamos e iteramos cada semana, y reportamos qué se movió: citas, tráfico, leads y oportunidades.',
          out: ['Producción semanal', 'Reporte mensual'],
        },
      ],
    },
    pricing: {
      body: 'Los proyectos de Growth tienen una etapa de puesta en marcha y una cuota mensual para operar los motores. La inversión en medios va aparte y se queda en tus propias cuentas publicitarias. Lo definimos después de una llamada, según los motores que necesitas, tu volumen y tu mercado.',
      points: [
        'Puesta en marcha: auditoría, voz de marca, configuración',
        'Mensual: producción, testeo, seguimiento y reportes',
        'La inversión en medios queda en tus cuentas',
        'Ajustado a tu mercado y a tu alcance',
      ],
      shape: ['Puesta en marcha', 'Cuota mensual'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Dónde los motores <em>hacen la diferencia</em>',
      lede: 'Cómo se suele usar cada motor, sector por sector.',
      items: [
        {
          industry: 'Software B2B',
          title: 'Aparecer en las respuestas “mejores herramientas para…”',
          body: 'Páginas comparativas, documentación y menciones de terceros estructuradas para que los asistentes citen el producto en los casos de uso correctos.',
          tags: ['GEO', 'Contenido'],
        },
        {
          industry: 'Servicios profesionales',
          title: 'El conocimiento de los socios, publicado',
          body: 'Entrevistas breves con los socios se convierten en artículos, newsletters y publicaciones con la voz de cada uno, aprobadas en una sola revisión.',
          tags: ['Motor de contenido'],
        },
        {
          industry: 'E-commerce',
          title: 'Testeo creativo a escala',
          body: 'Los ángulos de producto se convierten en variantes de imagen y video cada semana; las ganadoras escalan y el resto se retira.',
          tags: ['Creatividades', 'Anuncios'],
        },
        {
          industry: 'Hotelería',
          title: 'Reservas directas desde la planificación con IA',
          body: 'Contenido y fichas estructurados para que, cuando alguien planifica un viaje con IA, aparezca tu propiedad y no solo los marketplaces.',
          tags: ['GEO', 'Contenido'],
        },
        {
          industry: 'B2B industrial',
          title: 'Prospección por cuenta',
          body: 'Investigación por planta o distribuidor, mensajes con contexto real y respuestas que llegan directo al equipo comercial.',
          tags: ['Prospección', 'CRM'],
        },
      ],
    },
    faq: [
      {
        q: '¿Qué es la optimización para motores generativos (GEO)?',
        a: 'Es el trabajo de hacer que tu marca aparezca (y sea citada) dentro de las respuestas que dan los asistentes de IA. Se cruza con el SEO, pero suma tareas nuevas: medir preguntas en lugar de palabras clave, ganar menciones en las fuentes en las que confían los asistentes y estructurar el contenido para que se pueda citar.',
      },
      {
        q: '¿Pueden garantizar que los asistentes de IA nos citen?',
        a: 'Nadie puede, porque los asistentes cambian constantemente su forma de responder. Lo que sí asumimos es el proceso: una línea base medida, ajustes concretos y seguimiento mensual, para que veas exactamente qué se movió y por qué.',
      },
      {
        q: '¿El contenido generado con IA puede dañar nuestra marca o posicionamiento?',
        a: 'El contenido vacío y genérico daña, lo escriba quien lo escriba. Nuestro motor parte del conocimiento real de tu equipo, sigue tu guía de voz y pasa por edición humana antes de publicarse.',
      },
      {
        q: '¿Reemplazan a nuestro equipo de marketing?',
        a: 'No. Le damos a tu equipo un motor y las personas para operarlo. Tu equipo define la estrategia y aprueba lo que sale; el motor se encarga de la investigación, los borradores, las variantes y los reportes.',
      },
      {
        q: '¿Con qué plataformas y herramientas trabajan?',
        a: 'Con las principales redes de búsqueda, sociales y profesionales, y con el CRM, el email y las herramientas de analítica que ya usas. Trabajamos dentro de tus cuentas, así que los datos y el historial quedan contigo.',
      },
      {
        q: '¿Cómo cuidan el cumplimiento en la prospección?',
        a: 'Configuramos dominios de envío, volúmenes y gestión de bajas según las reglas de cada mercado al que apuntas, y solo contactamos direcciones corporativas que coinciden con tu perfil de cliente ideal.',
      },
      {
        q: '¿Cómo miden los resultados?',
        a: 'Cada motor tiene su propio tablero: citas y participación en respuestas para GEO, producción e interacción para contenido, costo por resultado para creatividades, respuestas y reuniones para prospección. Todo se consolida en un reporte mensual.',
      },
    ],
    cta: {
      title: 'Mira dónde estás <em>en las respuestas de IA.</em>',
      lede: 'Agenda una llamada y revisamos juntos cómo responden hoy los asistentes de IA a las preguntas de tus clientes, y qué haría falta para cambiarlo.',
    },
  },
};
