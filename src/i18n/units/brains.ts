import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const BRAINS: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'AI brains and custom agents for your business',
      description:
        'Custom AI systems by Sandbox: a company brain that knows your business and agents for sales, support, ops and HR, connected to the tools you already use.',
    },
    hero: {
      title: 'One brain for your company. <em>An agent for every process.</em>',
      lede:
        'We build AI systems around your data, your tools and the way your team actually works: a living knowledge base that answers with sources, and agents that qualify leads, resolve tickets and close the loop in your CRM — with a person approving what matters.',
      primary: 'Book a call',
      secondary: { label: 'Watch an agent run', href: '#demo' },
      facts: [
        { k: 'First agent live', v: '3–5 weeks' },
        { k: 'Connects to', v: 'CRM · Inbox · Knowledge base · Team chat' },
        { k: 'Human in the loop', v: 'Approval on every sensitive action' },
      ],
    },
    pains: {
      title: 'Where the work <em>gets stuck</em>',
      lede: 'These are the problems that usually start the conversation — and what changes once the work runs through a brain.',
      items: [
        {
          pain: 'The answers live in three people’s heads and a hundred documents nobody can find.',
          outcome: 'One brain that answers from your own documents, with the source attached, for anyone on the team.',
        },
        {
          pain: 'Leads wait hours for a reply while your team copies data from one tool to another.',
          outcome: 'An agent replies in minutes, qualifies against your criteria and logs everything in the CRM.',
        },
        {
          pain: 'You tried a chatbot. It made things up and nobody trusted it again.',
          outcome: 'Answers grounded in your knowledge base, with limits, permissions and a clear “I don’t know”.',
        },
        {
          pain: 'Every report means someone exporting spreadsheets on a Friday afternoon.',
          outcome: 'Reports assembled from live data and sent on schedule, flagged when a number looks off.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we build',
      title: 'Three ways <em>to start</em>',
      lede: 'Start with one process and grow into a company-wide system. Every build is scoped to your data, your tools and your rules.',
      items: [
        {
          name: 'Single Agent',
          what: 'One agent for one process, with a clear owner and a clear finish line: qualifying inbound leads, answering support tickets, preparing the weekly report.',
          includes: [
            'Process mapping with the people who do the work',
            'Connections to 2–3 of your tools',
            'Guardrails, approvals and escalation to a person',
            'Dashboard with every run, step and decision',
            'Handover, documentation and 30 days of tuning',
          ],
          timeline: '3–5 weeks',
          bestFor: 'Teams that want proof on one painful process before going wider.',
        },
        {
          name: 'Company Brain',
          what: 'A living knowledge base built from your documents, conversations and systems, plus an assistant your team can ask — and that can act: draft, file, update, notify.',
          includes: [
            'Ingestion of docs, wikis, inbox and CRM history',
            'Permissions that mirror who can see what today',
            'Assistant in your team chat and on the web',
            'Answers with sources and a confidence level',
            'Agents for 2–3 processes on top of the brain',
            'Sync that keeps the knowledge current',
          ],
          timeline: '6–10 weeks',
          bestFor: 'Companies of 20–500 people where knowledge is scattered and the same questions come up every day.',
        },
        {
          name: 'Custom Platform',
          what: 'A multi-agent system designed around your operation: internal copilots, deep integrations with your core systems, your own interfaces and the monitoring to run it at scale.',
          includes: [
            'Architecture and security review with your IT team',
            'Agents per department sharing one brain',
            'Custom integrations, APIs and internal tools',
            'Evaluation suite and quality monitoring',
            'Deployment in your cloud or ours',
            'Ongoing operation and roadmap',
          ],
          timeline: '10–16 weeks to first release',
          bestFor: 'Operations where AI becomes core infrastructure, with compliance and scale requirements.',
        },
      ],
    },
    demo: {
      eyebrow: 'Interactive simulation',
      title: 'Watch an agent <em>work a real process</em>',
      lede: 'A simulated run of the kind of system we deploy: it reads, decides, uses your tools and asks a person before anything sensitive. Pick a workflow.',
      notesTitle: 'What you are watching',
      notes: [
        'The agent reads the request and pulls context from the brain',
        'It works through your tools over approved connections',
        'Anything sensitive waits for a person to approve it',
        'Every step is logged so your team can review it',
      ],
    },
    method: {
      title: 'From one process <em>to a running system</em>',
      lede: 'The same four steps for a single agent or a full platform. What changes is how many processes go through them.',
      steps: [
        {
          name: 'Discover',
          time: '1–2 weeks',
          body: 'We sit with the people who do the work, map the process step by step and audit the data and tools it touches.',
          out: ['Process map', 'Data & access audit', 'Success criteria'],
        },
        {
          name: 'Design',
          time: '1 week',
          body: 'We define what the agent decides alone, what it asks about and what it never touches. You approve the blueprint before we write code.',
          out: ['Agent blueprint', 'Guardrails & approvals', 'Integration plan'],
        },
        {
          name: 'Build',
          time: '2–8 weeks',
          body: 'We build in short cycles against real cases from your business and test with your team until the answers hold up.',
          out: ['Working agent', 'Evaluation set', 'Team walkthrough'],
        },
        {
          name: 'Operate',
          time: 'Ongoing',
          body: 'We monitor quality, tune instructions and knowledge, add processes and report every month on what the system did.',
          out: ['Monitoring', 'Monthly report', 'New processes'],
        },
      ],
    },
    pricing: {
      body: 'Every brain has two parts: a one-time build, and a monthly fee to run, monitor and improve it. We scope both after a discovery call, once we know the processes, the tools involved and the market you operate in.',
      points: [
        'Setup: discovery, design, build and launch',
        'Ongoing: hosting, model usage, monitoring and improvements',
        'Scoped after a discovery call — no fixed packages',
        'Tailored to your market and scope',
      ],
      shape: ['Build', 'Run & improve, monthly'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'What a brain does <em>in your industry</em>',
      lede: 'Typical first processes we scope with companies in each sector.',
      items: [
        {
          industry: 'Real estate',
          title: 'Lead response and showings',
          body: 'An agent answers portal inquiries day and night, qualifies by area and timing, and books showings in each broker’s calendar.',
          tags: ['CRM', 'Calendar', 'Inbox'],
        },
        {
          industry: 'Professional services',
          title: 'A brain for proposals and precedents',
          body: 'Consultants ask for past proposals, clauses and case notes and get a first draft with sources, not a folder to dig through.',
          tags: ['Knowledge base', 'Docs'],
        },
        {
          industry: 'E-commerce',
          title: 'Support that resolves, not deflects',
          body: 'Order status, returns and product questions handled end to end, with refunds above your limit sent to a person.',
          tags: ['Helpdesk', 'Store admin'],
        },
        {
          industry: 'Clinics',
          title: 'Intake and reminders',
          body: 'Patients book, reschedule and get prep instructions by message; staff see a clean summary before each visit.',
          tags: ['Calendar', 'Messaging'],
        },
        {
          industry: 'Distribution',
          title: 'Quotes from the catalog',
          body: 'Sales reps get quotes assembled from price lists and stock levels, checked against discount rules before they go out.',
          tags: ['Spreadsheet', 'ERP'],
        },
        {
          industry: 'Multi-location teams',
          title: 'Answers for every employee',
          body: 'New hires ask about policies, procedures and benefits in team chat and get answers from the handbook, in their language.',
          tags: ['Team chat', 'Handbook'],
        },
      ],
    },
    faq: [
      {
        q: 'What exactly is a company brain?',
        a: 'A knowledge base built from your documents, conversations and systems, kept up to date automatically, with an assistant on top that answers with sources and can take actions in your tools. Agents for specific processes use the same brain, so they all work from the same facts.',
      },
      {
        q: 'Which tools can it connect to?',
        a: 'Most tools your team already uses: CRM, inbox, calendar, team chat, helpdesk, spreadsheets, document storage and databases. If a tool has an API or can export data, we can usually connect it. We confirm every integration during discovery.',
      },
      {
        q: 'Is our data safe? Is it used to train models?',
        a: 'Your data stays in accounts you control or in an isolated environment we manage for you. We use model providers under business terms that exclude training on your data, apply the same permissions your team has today and log every action the system takes.',
      },
      {
        q: 'What happens when the AI is not sure?',
        a: 'It says so. Each agent has rules for what it can do alone, what needs approval and when to hand off to a person. Sensitive actions — changing records, issuing refunds, writing to certain customers — go through an approval step you define.',
      },
      {
        q: 'Do we need a technical team?',
        a: 'No. We build, host and run the system. It helps to have one person on your side who owns the process and can make decisions; we train them and your team to use and adjust it.',
      },
      {
        q: 'How long until something is live?',
        a: 'A single agent typically goes live in three to five weeks; a company brain takes six to ten. We ship working pieces along the way, so your team uses it before the project is finished.',
      },
      {
        q: 'How is it priced?',
        a: 'It depends on the scope: number of processes, integrations and usage. Every project has a one-time build and a monthly fee to operate it. We send a clear proposal after a discovery call.',
      },
    ],
    cta: {
      title: 'Tell us one process. <em>We’ll sketch the agent.</em>',
      lede: 'A 30-minute call: we map the process with you and tell you what a first agent would do, how long it takes and what it needs from your side.',
    },
  },

  es: {
    seo: {
      title: 'Brains de IA y agentes a medida para tu empresa',
      description:
        'Sistemas de IA a medida: un brain que conoce tu empresa y agentes para ventas, soporte, operaciones y RR. HH., conectados a las herramientas que ya usas.',
    },
    hero: {
      title: 'Un brain para tu empresa. <em>Un agente para cada proceso.</em>',
      lede:
        'Construimos sistemas de IA sobre tus datos, tus herramientas y la forma real en que trabaja tu equipo: una base de conocimiento viva que responde con fuentes, y agentes que califican leads, resuelven tickets y cierran el ciclo en tu CRM, con una persona aprobando lo importante.',
      primary: 'Agendar una llamada',
      secondary: { label: 'Ver un agente en acción', href: '#demo' },
      facts: [
        { k: 'Primer agente en producción', v: '3–5 semanas' },
        { k: 'Se conecta a', v: 'CRM · Correo · Base de conocimiento · Chat del equipo' },
        { k: 'Control humano', v: 'Aprobación en cada acción sensible' },
      ],
    },
    pains: {
      title: 'Dónde se <em>atasca</em> el trabajo',
      lede: 'Estos son los problemas con los que suele empezar la conversación, y lo que cambia cuando el trabajo pasa por un brain.',
      items: [
        {
          pain: 'Las respuestas viven en la cabeza de tres personas y en cien documentos que nadie encuentra.',
          outcome: 'Un brain que responde con tus propios documentos, citando la fuente, para cualquiera del equipo.',
        },
        {
          pain: 'Los leads esperan horas una respuesta mientras tu equipo copia datos de una herramienta a otra.',
          outcome: 'Un agente responde en minutos, califica según tus criterios y registra todo en el CRM.',
        },
        {
          pain: 'Probaste un chatbot. Inventó respuestas y nadie volvió a confiar en él.',
          outcome: 'Respuestas basadas en tu base de conocimiento, con límites, permisos y un “no lo sé” claro.',
        },
        {
          pain: 'Cada reporte implica que alguien exporte hojas de cálculo un viernes por la tarde.',
          outcome: 'Reportes armados con datos en vivo y enviados a tiempo, con una alerta cuando un número no cuadra.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué construimos',
      title: 'Tres formas <em>de empezar</em>',
      lede: 'Empieza por un proceso y crece hasta un sistema para toda la empresa. Cada proyecto se define según tus datos, tus herramientas y tus reglas.',
      items: [
        {
          name: 'Agente único',
          what: 'Un agente para un proceso, con un responsable y un objetivo claros: calificar leads entrantes, responder tickets de soporte, preparar el reporte semanal.',
          includes: [
            'Mapeo del proceso con quienes lo hacen hoy',
            'Conexión con 2–3 de tus herramientas',
            'Límites, aprobaciones y derivación a una persona',
            'Panel con cada ejecución, paso y decisión',
            'Entrega, documentación y 30 días de ajustes',
          ],
          timeline: '3–5 semanas',
          bestFor: 'Equipos que quieren una prueba concreta en un proceso crítico antes de escalar.',
        },
        {
          name: 'Brain de empresa',
          what: 'Una base de conocimiento viva construida con tus documentos, conversaciones y sistemas, y un asistente al que tu equipo le puede preguntar y que además actúa: redacta, archiva, actualiza, avisa.',
          includes: [
            'Ingesta de documentos, wikis, correo e historial del CRM',
            'Permisos que replican quién ve qué hoy',
            'Asistente en el chat del equipo y en la web',
            'Respuestas con fuentes y nivel de confianza',
            'Agentes para 2–3 procesos sobre el brain',
            'Sincronización que mantiene el conocimiento al día',
          ],
          timeline: '6–10 semanas',
          bestFor: 'Empresas de 20 a 500 personas con el conocimiento disperso y las mismas preguntas todos los días.',
        },
        {
          name: 'Plataforma a medida',
          what: 'Un sistema multiagente diseñado alrededor de tu operación: copilotos internos, integraciones profundas con tus sistemas centrales, interfaces propias y el monitoreo para operarlo a escala.',
          includes: [
            'Arquitectura y revisión de seguridad con tu equipo de TI',
            'Agentes por área que comparten un mismo brain',
            'Integraciones, APIs y herramientas internas a medida',
            'Suite de evaluación y monitoreo de calidad',
            'Despliegue en tu nube o en la nuestra',
            'Operación continua y hoja de ruta',
          ],
          timeline: '10–16 semanas a la primera versión',
          bestFor: 'Operaciones donde la IA pasa a ser infraestructura central, con requisitos de cumplimiento y escala.',
        },
      ],
    },
    demo: {
      eyebrow: 'Simulación interactiva',
      title: 'Mira a un agente <em>trabajar un proceso real</em>',
      lede: 'Una ejecución simulada del tipo de sistema que desplegamos: lee, decide, usa tus herramientas y le pregunta a una persona antes de cualquier acción sensible. Elige un flujo.',
      notesTitle: 'Qué estás viendo',
      notes: [
        'El agente lee el pedido y toma contexto del brain',
        'Trabaja en tus herramientas a través de conexiones aprobadas',
        'Todo lo sensible espera la aprobación de una persona',
        'Cada paso queda registrado para que tu equipo lo revise',
      ],
    },
    method: {
      title: 'De un proceso <em>a un sistema en marcha</em>',
      lede: 'Los mismos cuatro pasos para un agente o para una plataforma completa. Lo que cambia es cuántos procesos pasan por ellos.',
      steps: [
        {
          name: 'Descubrir',
          time: '1–2 semanas',
          body: 'Nos sentamos con quienes hacen el trabajo, mapeamos el proceso paso a paso y auditamos los datos y las herramientas que toca.',
          out: ['Mapa del proceso', 'Auditoría de datos y accesos', 'Criterios de éxito'],
        },
        {
          name: 'Diseñar',
          time: '1 semana',
          body: 'Definimos qué decide el agente solo, qué consulta y qué no toca nunca. Apruebas el plano antes de que escribamos una línea de código.',
          out: ['Plano del agente', 'Límites y aprobaciones', 'Plan de integración'],
        },
        {
          name: 'Construir',
          time: '2–8 semanas',
          body: 'Construimos en ciclos cortos con casos reales de tu negocio y probamos con tu equipo hasta que las respuestas se sostienen.',
          out: ['Agente funcionando', 'Conjunto de pruebas', 'Recorrido con el equipo'],
        },
        {
          name: 'Operar',
          time: 'Continuo',
          body: 'Monitoreamos la calidad, ajustamos instrucciones y conocimiento, sumamos procesos y te contamos cada mes qué hizo el sistema.',
          out: ['Monitoreo', 'Reporte mensual', 'Nuevos procesos'],
        },
      ],
    },
    pricing: {
      body: 'Cada brain tiene dos partes: una construcción inicial y una cuota mensual para operarlo, monitorearlo y mejorarlo. Definimos ambas después de una llamada inicial, cuando ya conocemos los procesos, las herramientas involucradas y el mercado en el que operas.',
      points: [
        'Implementación: descubrimiento, diseño, construcción y lanzamiento',
        'Continuo: infraestructura, uso de modelos, monitoreo y mejoras',
        'Se define después de una llamada, sin paquetes cerrados',
        'Ajustado a tu mercado y a tu alcance',
      ],
      shape: ['Construcción', 'Operación y mejora, mensual'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Qué hace un brain <em>en tu industria</em>',
      lede: 'Los primeros procesos que solemos definir con empresas de cada sector.',
      items: [
        {
          industry: 'Inmobiliarias',
          title: 'Respuesta a leads y visitas',
          body: 'Un agente responde consultas de portales a cualquier hora, califica por zona y plazo, y agenda visitas en el calendario de cada asesor.',
          tags: ['CRM', 'Calendario', 'Correo'],
        },
        {
          industry: 'Servicios profesionales',
          title: 'Un brain de propuestas y antecedentes',
          body: 'Los consultores piden propuestas anteriores, cláusulas y notas de casos, y reciben un primer borrador con fuentes, no una carpeta para revisar.',
          tags: ['Base de conocimiento', 'Documentos'],
        },
        {
          industry: 'E-commerce',
          title: 'Soporte que resuelve, no que desvía',
          body: 'Estado de pedidos, devoluciones y preguntas de producto resueltas de punta a punta; los reembolsos sobre tu límite pasan a una persona.',
          tags: ['Mesa de ayuda', 'Admin de tienda'],
        },
        {
          industry: 'Clínicas',
          title: 'Admisión y recordatorios',
          body: 'Los pacientes agendan, reprograman y reciben indicaciones por mensaje; el equipo ve un resumen claro antes de cada consulta.',
          tags: ['Calendario', 'Mensajería'],
        },
        {
          industry: 'Distribución',
          title: 'Cotizaciones desde el catálogo',
          body: 'Los vendedores reciben cotizaciones armadas con listas de precios y stock, validadas contra las reglas de descuento antes de enviarse.',
          tags: ['Hoja de cálculo', 'ERP'],
        },
        {
          industry: 'Equipos con varias sedes',
          title: 'Respuestas para cada colaborador',
          body: 'Quienes recién ingresan preguntan por políticas, procedimientos y beneficios en el chat del equipo y reciben respuestas del manual, en su idioma.',
          tags: ['Chat del equipo', 'Manual'],
        },
      ],
    },
    faq: [
      {
        q: '¿Qué es exactamente un brain de empresa?',
        a: 'Una base de conocimiento construida con tus documentos, conversaciones y sistemas, que se actualiza sola, con un asistente encima que responde citando fuentes y puede ejecutar acciones en tus herramientas. Los agentes de cada proceso usan el mismo brain, así que todos trabajan con la misma información.',
      },
      {
        q: '¿Con qué herramientas se conecta?',
        a: 'Con la mayoría de las que tu equipo ya usa: CRM, correo, calendario, chat del equipo, mesa de ayuda, hojas de cálculo, almacenamiento de documentos y bases de datos. Si una herramienta tiene API o permite exportar datos, normalmente la podemos conectar. Confirmamos cada integración en la etapa de descubrimiento.',
      },
      {
        q: '¿Mis datos están seguros? ¿Se usan para entrenar modelos?',
        a: 'Tus datos quedan en cuentas que tú controlas o en un entorno aislado que administramos por ti. Trabajamos con proveedores de modelos bajo condiciones empresariales que excluyen el entrenamiento con tus datos, aplicamos los mismos permisos que tu equipo tiene hoy y registramos cada acción del sistema.',
      },
      {
        q: '¿Qué pasa cuando la IA no está segura?',
        a: 'Lo dice. Cada agente tiene reglas sobre qué puede hacer solo, qué necesita aprobación y cuándo derivar a una persona. Las acciones sensibles (modificar registros, emitir reembolsos, escribirle a ciertos clientes) pasan por un paso de aprobación que defines tú.',
      },
      {
        q: '¿Necesito un equipo técnico?',
        a: 'No. Nosotros construimos, alojamos y operamos el sistema. Ayuda tener a una persona de tu lado que sea dueña del proceso y pueda tomar decisiones; la capacitamos a ella y a tu equipo para usarlo y ajustarlo.',
      },
      {
        q: '¿Cuánto tarda en estar funcionando?',
        a: 'Un agente único suele estar en producción en tres a cinco semanas; un brain de empresa, en seis a diez. Entregamos partes funcionando en el camino, así que tu equipo lo usa antes de que el proyecto termine.',
      },
      {
        q: '¿Cómo se cotiza?',
        a: 'Depende del alcance: cantidad de procesos, integraciones y uso. Todo proyecto tiene una construcción inicial y una cuota mensual de operación. Te enviamos una propuesta clara después de una llamada inicial.',
      },
    ],
    cta: {
      title: 'Cuéntanos un proceso. <em>Te dibujamos el agente.</em>',
      lede: 'Una llamada de 30 minutos: mapeamos el proceso contigo y te decimos qué haría un primer agente, cuánto tarda y qué necesita de tu lado.',
    },
  },
};
