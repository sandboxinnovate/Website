import type { L10n } from './index';

type S = L10n<string>;

export const HOME = {
  seo: {
    title: {
      en: 'Sandbox: custom AI agents, AI consulting and AI marketing',
      es: 'Sandbox: agentes de IA, consultoría y marketing con IA',
    } as S,
    description: {
      en: 'Sandbox builds custom AI agents and company brains, and offers AI consulting, AI marketing and team training in the US, Europe and Latin America.',
      es: 'Sandbox crea agentes y brains de IA a medida, y ofrece consultoría, marketing con IA y formación para empresas de EE. UU., Europa y Latinoamérica.',
    } as S,
  },

  hero: {
    eyebrow: { en: 'AI systems · Consulting · Growth', es: 'Sistemas de IA · Consultoría · Growth' } as S,
    titleA: { en: 'AI that knows', es: 'IA que conoce' } as S,
    titleB: { en: 'your business', es: 'tu negocio' } as S,
    titleC: { en: 'and does the work.', es: 'y hace el trabajo.' } as S,
    lede: {
      en: 'We design, build and run AI for companies across the US, Europe and Latin America: company brains that know your business, custom agents, hands-on consulting and AI-native marketing. We use it in our own work first.',
      es: 'Diseñamos, construimos y operamos IA para empresas de Estados Unidos, Europa y Latinoamérica: brains (sistemas de IA que conocen tu empresa), agentes a medida, consultoría práctica y marketing nativo en IA. Primero la usamos en nuestro propio trabajo.',
    } as S,
    ctaPrimary: { en: 'Book a call', es: 'Agendar una llamada' } as S,
    ctaSecondary: { en: 'Take the 3-min AI diagnostic', es: 'Hacer el diagnóstico (3 min)' } as S,
    tickerLabel: { en: 'Typical jobs', es: 'Tareas típicas' } as S,
    ticker: ['kb.search', 'lead.score', 'inbox.triage', 'report.weekly', 'crm.sync', 'content.draft', 'ads.variant', 'ticket.route'],
    scroll: { en: 'Scroll', es: 'Scroll' } as S,
  },

  clients: {
    label: { en: 'Brands we’ve worked with', es: 'Marcas con las que hemos trabajado' } as S,
  },

  manifesto: {
    index: '01',
    eyebrow: { en: 'Why Sandbox', es: 'Por qué Sandbox' } as S,
    text: {
      en: 'Most companies don’t need another AI tool. They need AI that understands how they work, connects to the systems they already use and takes real work off their team’s plate. That’s what we build.',
      es: 'La mayoría de las empresas no necesita otra herramienta de IA. Necesita IA que entienda cómo trabaja, se conecte con los sistemas que ya usa y le quite trabajo real a su equipo. Eso es lo que construimos.',
    } as S,
    /** Words (lowercase, no punctuation) rendered in flame orange once lit */
    accents: {
      en: ['understands', 'connects', 'real', 'work', 'build'],
      es: ['entienda', 'conecte', 'trabajo', 'real', 'construimos'],
    } as L10n<string[]>,
    points: [
      { k: { en: 'Systems, not tools', es: 'Sistemas, no herramientas' } as S, v: { en: 'Connected to your CRM, inbox, docs and data. Not one more tab to open.', es: 'Conectados a tu CRM, correo, documentos y datos. No una pestaña más.' } as S },
      { k: { en: 'Humans approve what matters', es: 'Las personas aprueban lo importante' } as S, v: { en: 'Agents do the work; your team keeps the judgment calls.', es: 'Los agentes hacen el trabajo; tu equipo conserva las decisiones.' } as S },
      { k: { en: 'Measured in hours and revenue', es: 'Se mide en horas e ingresos' } as S, v: { en: 'Every system ships with the metric it has to move.', es: 'Cada sistema se entrega con la métrica que tiene que mover.' } as S },
    ],
  },

  units: {
    index: '02',
    eyebrow: { en: 'What we do', es: 'Qué hacemos' } as S,
    title: { en: 'Six ways we put <em>AI to work</em>', es: 'Seis formas de poner la <em>IA a trabajar</em>' } as S,
    lede: {
      en: 'Start with an AI opportunity audit, a single agent or a team workshop. Grow into a company-wide brain. Every unit plugs into the next.',
      es: 'Empieza con una auditoría de oportunidades de IA, un solo agente o un taller para tu equipo. Crece hasta un brain para toda la empresa. Cada unidad se conecta con la siguiente.',
    } as S,
    explore: { en: 'Explore', es: 'Ver más' } as S,
    earlyAccess: { en: 'Early access', es: 'Acceso anticipado' } as S,
  },

  console: {
    index: '03',
    eyebrow: { en: 'Interactive simulation', es: 'Simulación interactiva' } as S,
    title: { en: 'Watch a brain <em>do the work</em>', es: 'Mira un brain <em>haciendo el trabajo</em>' } as S,
    lede: {
      en: 'A simulated run of the kind of systems we deploy: real steps, real tools, and a human approving what matters. Pick a workflow.',
      es: 'Una simulación del tipo de sistemas que implementamos: pasos reales, herramientas reales y una persona que aprueba lo importante. Elige un flujo.',
    } as S,
  },

  method: {
    index: '04',
    eyebrow: { en: 'Method', es: 'Método' } as S,
    title: { en: 'From first call to <em>running system</em>', es: 'De la primera llamada a un <em>sistema funcionando</em>' } as S,
    lede: {
      en: 'Four phases, fixed scope per phase, working software early. You always know what ships next and what it will change.',
      es: 'Cuatro fases, alcance definido en cada una y software funcionando desde temprano. Siempre sabes qué se entrega después y qué va a cambiar.',
    } as S,
    deliverables: { en: 'You get', es: 'Recibes' } as S,
    steps: [
      {
        n: '01', key: 'discover',
        name: { en: 'Discover', es: 'Descubrir' } as S,
        time: { en: '1–2 weeks', es: '1–2 semanas' } as S,
        body: {
          en: 'We map how work actually happens (interviews, tools, data, bottlenecks) and rank every opportunity by impact and effort.',
          es: 'Mapeamos cómo se trabaja de verdad (entrevistas, herramientas, datos, cuellos de botella) y ordenamos cada oportunidad por impacto y esfuerzo.',
        } as S,
        out: { en: ['Process map', 'Opportunity matrix', '90-day roadmap'], es: ['Mapa de procesos', 'Matriz de oportunidades', 'Hoja de ruta a 90 días'] } as L10n<string[]>,
      },
      {
        n: '02', key: 'design',
        name: { en: 'Design', es: 'Diseñar' } as S,
        time: { en: '1 week', es: '1 semana' } as S,
        body: {
          en: 'We design the system before writing code: what the brain knows, what each agent does, where people approve and how success is measured.',
          es: 'Diseñamos el sistema antes de escribir código: qué sabe el brain, qué hace cada agente, dónde aprueban las personas y cómo se mide el éxito.',
        } as S,
        out: { en: ['System blueprint', 'Data & access plan', 'Success metrics'], es: ['Plano del sistema', 'Plan de datos y accesos', 'Métricas de éxito'] } as L10n<string[]>,
      },
      {
        n: '03', key: 'build',
        name: { en: 'Build', es: 'Construir' } as S,
        time: { en: '2–8 weeks', es: '2–8 semanas' } as S,
        body: {
          en: 'Short sprints with working software every week, connected to your tools and tested on your real cases before anyone relies on it.',
          es: 'Sprints cortos con software funcionando cada semana, conectado a tus herramientas y probado con tus casos reales antes de que alguien dependa de él.',
        } as S,
        out: { en: ['Working agents', 'Integrations', 'Evaluation suite'], es: ['Agentes funcionando', 'Integraciones', 'Conjunto de pruebas'] } as L10n<string[]>,
      },
      {
        n: '04', key: 'operate',
        name: { en: 'Operate', es: 'Operar' } as S,
        time: { en: 'Ongoing', es: 'Continuo' } as S,
        body: {
          en: 'We run it with you: monitoring, monthly improvements, new automations and training. The system gets better the longer it runs.',
          es: 'Lo operamos contigo: monitoreo, mejoras mensuales, nuevas automatizaciones y formación. El sistema mejora cuanto más tiempo funciona.',
        } as S,
        out: { en: ['Monitoring', 'Monthly improvements', 'Team enablement'], es: ['Monitoreo', 'Mejoras mensuales', 'Capacitación del equipo'] } as L10n<string[]>,
      },
    ],
    cta: {
      line: { en: 'Every engagement starts with a 30-minute call.', es: 'Todo proyecto empieza con una llamada de 30 minutos.' } as S,
      label: { en: 'Book a call', es: 'Agendar una llamada' } as S,
    },
  },

  geo: {
    index: '05',
    eyebrow: { en: 'Growth · AI search', es: 'Growth · Búsqueda con IA' } as S,
    title: { en: 'Be the answer, <em>not a link</em>', es: 'Sé la respuesta, <em>no un enlace</em>' } as S,
    lede: {
      en: 'Your next client won’t scroll ten blue links. They’ll ask an AI assistant and act on what it recommends. We make sure that recommendation is you.',
      es: 'Tu próximo cliente no va a revisar diez enlaces. Le va a preguntar a un asistente de IA y va a hacer lo que le recomiende. Nos encargamos de que esa recomendación seas tú.',
    } as S,
    cta: { en: 'See Growth', es: 'Ver Growth' } as S,
  },

  roi: {
    index: '06',
    eyebrow: { en: 'Impact', es: 'Impacto' } as S,
    title: { en: 'What could AI <em>give back</em> to your team?', es: '¿Cuánto tiempo le puede <em>devolver</em> la IA a tu equipo?' } as S,
    lede: {
      en: 'Move the sliders for a rough estimate. The AI diagnostic and a 30-minute call turn it into a plan.',
      es: 'Mueve los controles para una estimación rápida. El diagnóstico de IA y una llamada de 30 minutos la convierten en un plan.',
    } as S,
  },

  proof: {
    index: '07',
    eyebrow: { en: 'Evidence', es: 'Evidencia' } as S,
    title: { en: 'Numbers from <em>client work</em>', es: 'Números del <em>trabajo con clientes</em>' } as S,
    featureLabel: { en: 'Reference architecture · illustrative', es: 'Arquitectura de referencia · ilustrativa' } as S,
    featureTitle: { en: 'How a company brain is wired', es: 'Cómo se conecta un brain de empresa' } as S,
    featureBody: {
      en: 'We connect what a company knows (documents, CRM, conversations, history) to agents that research, draft, report and operate across its tools. People stay in the loop where it matters.',
      es: 'Conectamos lo que sabe una empresa (documentos, CRM, conversaciones, historial) con agentes que investigan, redactan, reportan y operan en sus herramientas. Las personas siguen al mando donde importa.',
    } as S,
    featureLayers: {
      en: ['Knowledge', 'Agents', 'Tools', 'Human approval'],
      es: ['Conocimiento', 'Agentes', 'Herramientas', 'Aprobación humana'],
    } as L10n<string[]>,
    featureCta: { en: 'Explore Brains', es: 'Ver Brains' } as S,
    casesLabel: { en: 'Client results · from our Growth work', es: 'Resultados de clientes · de nuestro trabajo en Growth' } as S,
    cases: [
      { id: 'videographer', metric: '+40%', label: { en: 'website traffic', es: 'tráfico web' } as S, client: { en: 'Videographer portfolio · content', es: 'Portfolio de videógrafo · contenido' } as S },
      { id: 'barbershop', metric: '+30%', label: { en: 'new client bookings', es: 'reservas de clientes nuevos' } as S, client: { en: 'Barbershop · local growth', es: 'Barbería · crecimiento local' } as S },
      { id: 'architecture', metric: '+60%', label: { en: 'organic traffic', es: 'tráfico orgánico' } as S, client: { en: 'Architecture firm · SEO', es: 'Estudio de arquitectura · SEO' } as S },
    ],
    seeWork: { en: 'See all work', es: 'Ver todos los casos' } as S,
  },

  diagnostic: {
    index: '08',
    eyebrow: { en: 'AI Diagnostic', es: 'Diagnóstico de IA' } as S,
    title: { en: 'Not sure where to <em>start</em>?', es: '¿No sabes por dónde <em>empezar</em>?' } as S,
    lede: {
      en: 'Ten questions about your strategy, data, processes, people and tools. You get a readiness score and the three moves we would make first.',
      es: 'Diez preguntas sobre tu estrategia, datos, procesos, equipo y herramientas. Recibes un puntaje de preparación y los tres pasos que daríamos primero.',
    } as S,
    bullets: {
      en: ['3 minutes, no sign-up to see your score', 'Readiness by dimension, not a vague grade', 'Concrete next moves mapped to real services'],
      es: ['3 minutos, sin registrarte para ver tu puntaje', 'Preparación por dimensión, no una nota vaga', 'Próximos pasos concretos, vinculados a servicios reales'],
    } as L10n<string[]>,
  },

  faq: {
    index: '09',
    eyebrow: { en: 'FAQ', es: 'Preguntas frecuentes' } as S,
    title: { en: 'Straight <em>answers</em>', es: 'Respuestas <em>directas</em>' } as S,
    items: [
      {
        q: { en: 'What exactly is an “AI brain”?', es: '¿Qué es exactamente un “brain” de IA?' } as S,
        a: {
          en: 'A system that knows your company (documents, processes, clients, history) and can act on it. It answers your team’s questions with sources, and its agents carry out tasks across your tools: qualifying leads, drafting replies, building reports, updating the CRM. People approve the steps that matter.',
          es: 'Un sistema que conoce tu empresa (documentos, procesos, clientes, historial) y puede actuar con esa información. Responde las preguntas de tu equipo citando fuentes, y sus agentes ejecutan tareas en tus herramientas: calificar leads, redactar respuestas, armar reportes, actualizar el CRM. Las personas aprueban los pasos importantes.',
        } as S,
      },
      {
        q: { en: 'Do we need clean data or an in-house tech team?', es: '¿Necesitamos datos ordenados o un equipo técnico propio?' } as S,
        a: {
          en: 'No. Most clients start with scattered docs and a handful of tools. Part of our work is organizing what the system needs to know. You need one person who owns the outcome and can give us access.',
          es: 'No. La mayoría de nuestros clientes empieza con documentos dispersos y unas pocas herramientas. Ordenar lo que el sistema necesita saber es parte de nuestro trabajo. Solo necesitas una persona responsable del resultado que pueda darnos acceso.',
        } as S,
      },
      {
        q: { en: 'Are we too small, or too big, to work with you?', es: '¿Somos demasiado pequeños, o demasiado grandes, para trabajar con ustedes?' } as S,
        a: {
          en: 'We work best when there is a real process with volume behind it: a team answering the same questions every day, chasing leads by hand or rebuilding the same report every week. If it’s too early, we tell you on the first call, and the AI diagnostic gives you a starting point either way.',
          es: 'Funcionamos mejor cuando hay un proceso real con volumen detrás: un equipo que responde las mismas preguntas todos los días, persigue leads a mano o rehace el mismo reporte cada semana. Si es muy pronto, te lo decimos en la primera llamada, y el diagnóstico de IA te da un punto de partida de todos modos.',
        } as S,
      },
      {
        q: { en: 'Which AI models do you use?', es: '¿Qué modelos de IA usan?' } as S,
        a: {
          en: 'We are model-agnostic. We choose the best model for each task (frontier models from the leading labs, or open-source models when privacy or cost call for it) and design systems so you can switch later without rebuilding.',
          es: 'No dependemos de un solo modelo. Elegimos el mejor modelo para cada tarea (modelos de frontera de los principales laboratorios, u open-source cuando la privacidad o el costo lo piden) y diseñamos los sistemas para que puedas cambiar más adelante sin reconstruir.',
        } as S,
      },
      {
        q: { en: 'How do you handle security and privacy?', es: '¿Cómo manejan la seguridad y la privacidad?' } as S,
        a: {
          en: 'Least-privilege access, your data stays in your accounts wherever possible, no training on your data, audit logs for every agent action, and human approval gates for anything sensitive. We sign NDAs and DPAs as standard.',
          es: 'Accesos mínimos necesarios, tus datos quedan en tus cuentas siempre que sea posible, no se entrena ningún modelo con tus datos, registro de cada acción de los agentes y aprobación humana para todo lo sensible. Firmamos NDA y acuerdos de tratamiento de datos en todos los proyectos.',
        } as S,
      },
      {
        q: { en: 'How long until we see results?', es: '¿En cuánto tiempo vemos resultados?' } as S,
        a: {
          en: 'An AI Opportunity Audit takes 2–3 weeks. A first agent is usually live in 3–5 weeks. Company-wide brains roll out in phases, with something useful in production from the first month.',
          es: 'Una auditoría de oportunidades de IA toma 2–3 semanas. Un primer agente suele estar funcionando en 3–5 semanas. Los brains para toda la empresa se implementan por fases, con algo útil en producción desde el primer mes.',
        } as S,
      },
      {
        q: { en: 'How do you price?', es: '¿Cómo cobran?' } as S,
        a: {
          en: 'Every engagement is scoped after a discovery call. You get a fixed proposal (a one-time build plus ongoing operation where it applies), tailored to your scope and market. No hourly billing surprises.',
          es: 'Cada proyecto se define después de una llamada inicial. Recibes una propuesta cerrada (una implementación única más la operación continua cuando aplica), ajustada a tu alcance y a tu mercado. Sin sorpresas por horas.',
        } as S,
      },
      {
        q: { en: 'Do you work in English and Spanish?', es: '¿Trabajan en inglés y en español?' } as S,
        a: {
          en: 'Yes. We work with companies in the United States, Europe and Latin America, in English and Spanish — and the systems we build can work in both.',
          es: 'Sí. Trabajamos con empresas de Estados Unidos, Europa y Latinoamérica, en inglés y en español — y los sistemas que construimos pueden funcionar en ambos idiomas.',
        } as S,
      },
      {
        q: { en: 'We’re an agency. Can we offer your systems to our clients?', es: 'Somos una agencia. ¿Podemos ofrecer sus sistemas a nuestros clientes?' } as S,
        a: {
          en: 'Yes — that’s our Partners program. We build and maintain white-label systems that you deliver under your brand, or we co-deliver with your team.',
          es: 'Sí — para eso existe nuestro programa Partners. Construimos y mantenemos sistemas marca blanca que entregas con tu marca, o los entregamos junto a tu equipo.',
        } as S,
      },
    ],
  },

  final: {
    big: { en: 'Let’s build.', es: 'Construyamos.' } as S,
    lede: {
      en: 'Tell us what you want AI to do for your business. We’ll come back within one business day with a plan for the first call.',
      es: 'Cuéntanos qué quieres que la IA haga por tu negocio. Te respondemos en un día hábil con un plan para la primera llamada.',
    } as S,
  },
};
