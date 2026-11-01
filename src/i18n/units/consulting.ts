import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const CONSULTING: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'AI consulting and fractional Head of AI',
      description:
        'Find where AI pays off in your business and make it happen: a 2–3 week AI Opportunity Audit, a 4–8 week Implementation Sprint and a Fractional Head of AI.',
    },
    hero: {
      title: 'Find where AI pays off. <em>Then make it happen.</em>',
      lede:
        'We interview your team, map how work actually flows and rank every AI opportunity by return and effort. Then we roll it out — tools, usage policies, automations and training — and stay on as your Head of AI if you need one.',
      primary: 'Book a call',
      secondary: { label: 'Take the 3-min AI diagnostic', href: '/diagnostic' },
      facts: [
        { k: 'Opportunity Audit', v: '2–3 weeks' },
        { k: 'Implementation Sprint', v: '4–8 weeks' },
        { k: 'Then', v: 'Monthly, as your Head of AI' },
      ],
    },
    pains: {
      title: 'Plenty of AI ideas. <em>No plan.</em>',
      lede: 'Most companies are not short on AI ideas. They are short on a plan, an owner and someone to do the work.',
      items: [
        {
          pain: 'Everyone uses AI on their own, with personal accounts and no rules.',
          outcome: 'Approved tools, a usage policy people actually read, and training by role.',
        },
        {
          pain: 'There are fifty ideas for AI and no way to tell which ones matter.',
          outcome: 'A list of opportunities ranked by return and effort, with the first three already scoped.',
        },
        {
          pain: 'A pilot worked in the demo and died in production.',
          outcome: 'Processes automated end to end, with owners, metrics and a plan for when something fails.',
        },
        {
          pain: 'Leadership wants an AI strategy by next quarter and nobody owns it.',
          outcome: 'A roadmap the board can read, and a senior person accountable for executing it.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we deliver',
      title: 'Audit, implement, <em>lead</em>',
      lede: 'Three engagements designed to follow each other. Start with the audit, or join at the stage you are already in.',
      items: [
        {
          name: 'AI Opportunity Audit',
          what: 'A fixed-scope assessment of where AI can save time, cut costs or grow revenue in your business — and what it would take to get there.',
          includes: [
            'Interviews with leadership and 6–12 team members',
            'Map of your key processes and the tools behind them',
            'Opportunities ranked by return, effort and risk',
            'Data readiness and security review',
            '90-day roadmap with the first three projects scoped',
            'Readout session with your leadership team',
          ],
          timeline: '2–3 weeks',
          bestFor: 'Companies that know AI matters but not where to start, or that need a plan before committing resources.',
        },
        {
          name: 'Implementation Sprint',
          what: 'We put the roadmap to work: roll out the right AI tools, write the rules for using them, automate two or three processes and train the people who will run them.',
          includes: [
            'Tool selection, setup and access management',
            'AI usage policy and data guidelines',
            '2–3 processes automated end to end',
            'Role-based training sessions',
            'Before-and-after metrics for each process',
            'Handover playbook for your team',
          ],
          timeline: '4–8 weeks',
          bestFor: 'Teams with a clear priority list that need hands to execute it.',
        },
        {
          name: 'Fractional Head of AI',
          what: 'A senior AI lead on your team a few days a month: owns the roadmap, chooses vendors, keeps projects moving and reports to leadership.',
          includes: [
            'Monthly roadmap and priority review',
            'Vendor and tool evaluation',
            'Oversight of internal and external AI projects',
            'Policy, risk and compliance updates',
            'Office hours for your team',
            'Quarterly report to leadership',
          ],
          timeline: 'Monthly, ongoing',
          bestFor: 'Companies that need AI leadership without hiring a full-time executive yet.',
        },
      ],
    },
    demo: {
      eyebrow: 'Self-assessment',
      title: 'How ready is your company <em>for AI?</em>',
      lede: 'Ten questions, three minutes. You get a readiness profile across strategy, data, processes, people and tools — the same dimensions we use to open an audit.',
      notesTitle: 'What the full audit adds',
      notes: [
        'Interviews with your team, not just a questionnaire',
        'A map of how work really flows between people and tools',
        'Opportunities ranked by return, effort and risk',
        'A 90-day roadmap with the first three projects scoped',
      ],
      link: { label: 'Open the AI diagnostic', href: '/diagnostic' },
    },
    method: {
      title: 'From interviews <em>to automations running</em>',
      lede: 'One continuous engagement in four steps. Each step ends with something you can use, even if you stop there.',
      steps: [
        {
          name: 'Interview',
          time: 'Week 1',
          body: 'Kickoff with leadership, then interviews across teams. We look at how work flows, where the hours go and which data already exists.',
          out: ['Interview notes', 'Process inventory'],
        },
        {
          name: 'Prioritize',
          time: 'Weeks 2–3',
          body: 'We size each opportunity by return, effort and risk and turn the best ones into a sequenced 90-day roadmap.',
          out: ['Ranked opportunities', '90-day roadmap'],
        },
        {
          name: 'Implement',
          time: 'Weeks 4–11',
          body: 'The implementation sprint: tools, policies, automations and training, shipped in two-week cycles and measured against the baseline.',
          out: ['Automated processes', 'AI usage policy', 'Trained team'],
        },
        {
          name: 'Lead',
          time: 'Ongoing',
          body: 'As your fractional Head of AI, we keep the roadmap current, evaluate new tools and report progress to leadership.',
          out: ['Monthly review', 'Quarterly report'],
        },
      ],
    },
    pricing: {
      body: 'The audit and the sprint are fixed-scope projects: you know exactly what you get before we start. The fractional Head of AI is a monthly engagement. We scope all three after a discovery call, according to the size of your team and the market you operate in.',
      points: [
        'Audit: fixed scope, fixed timeline',
        'Sprint: scoped from the audit roadmap',
        'Head of AI: monthly, adjustable as you grow',
        'Tailored to your market and the size of your team',
      ],
      shape: ['Audit + sprint', 'Head of AI, monthly'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'Typical engagements <em>by industry</em>',
      lede: 'Where an audit usually points first, depending on the sector.',
      items: [
        {
          industry: 'Professional services',
          title: 'From personal accounts to a governed setup',
          body: 'Approved tools, a usage policy and training for every practice, plus automated intake and document review.',
          tags: ['Policy', 'Training', 'Automation'],
        },
        {
          industry: 'Distribution',
          title: 'An order desk without retyping',
          body: 'Orders arriving by email and spreadsheet are read, validated and entered automatically; exceptions go to a person.',
          tags: ['Inbox', 'ERP'],
        },
        {
          industry: 'Clinics & health groups',
          title: 'Front desk and back office',
          body: 'Scheduling, reminders and insurance paperwork mapped and prioritized, with patient-data rules defined before anything is built.',
          tags: ['Compliance', 'Scheduling'],
        },
        {
          industry: 'Mid-size companies',
          title: 'A roadmap leadership can approve',
          body: 'An audit across sales, finance and operations that turns a long list of ideas into a sequenced plan with clear owners.',
          tags: ['Roadmap', 'Leadership'],
        },
        {
          industry: 'Software & SaaS',
          title: 'Support and success at scale',
          body: 'Ticket triage, gaps in the help center and renewal signals mapped across the customer journey, then automated in order.',
          tags: ['Helpdesk', 'CRM'],
        },
      ],
    },
    faq: [
      {
        q: 'What do we get at the end of the audit?',
        a: 'A written report and a readout session: your process map, a ranked list of AI opportunities with expected return and effort, a data and security review, and a 90-day roadmap with the first three projects scoped and ready to execute.',
      },
      {
        q: 'Do we have to continue with the sprint after the audit?',
        a: 'No. The roadmap is yours. You can execute it with your own team, with another partner or with us — and we can support your team as Head of AI while they do it.',
      },
      {
        q: 'Who from our team needs to be involved?',
        a: 'One leader who backs the project, one owner per area we review, and 6–12 people for interviews of about 45 minutes each. We work around your calendar.',
      },
      {
        q: 'How is this different from a strategy deck?',
        a: 'We stay through implementation. Opportunities are sized against the effort and data you actually have, and the sprint ends with automated processes running and a trained team — not slides.',
      },
      {
        q: 'Which AI tools do you recommend?',
        a: 'The ones that fit your stack, your data rules and your team’s skills. We explain the trade-offs of each option so the decision is yours and you can defend it internally.',
      },
      {
        q: 'Do you work in Spanish and English?',
        a: 'Yes. We run engagements in both languages for companies in the United States, Europe and Latin America.',
      },
      {
        q: 'What does a fractional Head of AI do each month?',
        a: 'Owns the AI roadmap, reviews priorities with leadership, evaluates vendors, oversees active projects, updates policies as tools change and holds office hours for your team.',
      },
    ],
    cta: {
      title: 'Start with <em>a clear picture.</em>',
      lede: 'A 30-minute call to understand your business and tell you honestly whether an audit makes sense right now.',
    },
  },

  es: {
    seo: {
      title: 'Consultoría de IA y Head of AI fraccional',
      description:
        'Encuentra dónde rinde la IA en tu negocio: auditoría de oportunidades de 2–3 semanas, sprint de implementación de 4–8 semanas y Head of AI fraccional.',
    },
    hero: {
      title: 'Encuentra dónde rinde la IA. <em>Y hazlo realidad.</em>',
      lede:
        'Entrevistamos a tu equipo, mapeamos cómo fluye realmente el trabajo y ordenamos cada oportunidad de IA por retorno y esfuerzo. Después la implementamos (herramientas, políticas de uso, automatizaciones y capacitación) y, si lo necesitas, seguimos como tu Head of AI.',
      primary: 'Agendar una llamada',
      secondary: { label: 'Hacer el diagnóstico (3 min)', href: '/diagnostic' },
      facts: [
        { k: 'Auditoría de oportunidades', v: '2–3 semanas' },
        { k: 'Sprint de implementación', v: '4–8 semanas' },
        { k: 'Después', v: 'Mensual, como tu Head of AI' },
      ],
    },
    pains: {
      title: 'Muchas ideas de IA. <em>Ningún plan.</em>',
      lede: 'A la mayoría de las empresas no le faltan ideas de IA. Le falta un plan, un responsable y alguien que haga el trabajo.',
      items: [
        {
          pain: 'Todos usan IA por su cuenta, con cuentas personales y sin reglas.',
          outcome: 'Herramientas aprobadas, una política de uso que la gente sí lee y capacitación por rol.',
        },
        {
          pain: 'Hay cincuenta ideas de IA y ninguna forma de saber cuáles importan.',
          outcome: 'Una lista de oportunidades ordenada por retorno y esfuerzo, con las tres primeras ya definidas.',
        },
        {
          pain: 'Un piloto funcionó en la demo y murió en producción.',
          outcome: 'Procesos automatizados de punta a punta, con responsables, métricas y un plan para cuando algo falla.',
        },
        {
          pain: 'La dirección quiere una estrategia de IA para el próximo trimestre y nadie se hace cargo.',
          outcome: 'Una hoja de ruta que el consejo directivo puede leer y una persona senior responsable de ejecutarla.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué entregamos',
      title: 'Auditar, implementar, <em>liderar</em>',
      lede: 'Tres servicios pensados para encadenarse. Empieza por la auditoría o entra en la etapa en la que ya estás.',
      items: [
        {
          name: 'Auditoría de oportunidades de IA',
          what: 'Una evaluación de alcance cerrado sobre dónde la IA puede ahorrar tiempo, reducir costos o aumentar ingresos en tu negocio, y qué se necesita para lograrlo.',
          includes: [
            'Entrevistas con la dirección y 6–12 personas del equipo',
            'Mapa de tus procesos clave y las herramientas detrás',
            'Oportunidades ordenadas por retorno, esfuerzo y riesgo',
            'Revisión de preparación de datos y seguridad',
            'Hoja de ruta a 90 días con los tres primeros proyectos definidos',
            'Sesión de presentación con tu equipo directivo',
          ],
          timeline: '2–3 semanas',
          bestFor: 'Empresas que saben que la IA importa pero no por dónde empezar, o que necesitan un plan antes de comprometer recursos.',
        },
        {
          name: 'Sprint de implementación',
          what: 'Ponemos la hoja de ruta a trabajar: desplegamos las herramientas de IA correctas, escribimos las reglas para usarlas, automatizamos dos o tres procesos y capacitamos a quienes los van a operar.',
          includes: [
            'Selección, configuración y gestión de accesos',
            'Política de uso de IA y lineamientos de datos',
            '2–3 procesos automatizados de punta a punta',
            'Sesiones de capacitación por rol',
            'Métricas de antes y después por proceso',
            'Manual de traspaso para tu equipo',
          ],
          timeline: '4–8 semanas',
          bestFor: 'Equipos con prioridades claras que necesitan manos para ejecutarlas.',
        },
        {
          name: 'Head of AI fraccional',
          what: 'Un líder senior de IA en tu equipo algunos días al mes: se hace cargo de la hoja de ruta, elige proveedores, mantiene los proyectos en marcha y reporta a la dirección.',
          includes: [
            'Revisión mensual de hoja de ruta y prioridades',
            'Evaluación de proveedores y herramientas',
            'Supervisión de proyectos de IA internos y externos',
            'Actualización de políticas, riesgos y cumplimiento',
            'Horario de consultas para tu equipo',
            'Reporte trimestral a la dirección',
          ],
          timeline: 'Mensual, continuo',
          bestFor: 'Empresas que necesitan liderazgo en IA sin contratar todavía a un ejecutivo de tiempo completo.',
        },
      ],
    },
    demo: {
      eyebrow: 'Autoevaluación',
      title: '¿Qué tan lista está tu empresa <em>para la IA?</em>',
      lede: 'Diez preguntas, tres minutos. Obtienes un perfil de preparación en estrategia, datos, procesos, personas y herramientas: las mismas dimensiones con las que abrimos una auditoría.',
      notesTitle: 'Lo que suma la auditoría completa',
      notes: [
        'Entrevistas con tu equipo, no solo un cuestionario',
        'Un mapa de cómo fluye realmente el trabajo entre personas y herramientas',
        'Oportunidades ordenadas por retorno, esfuerzo y riesgo',
        'Una hoja de ruta a 90 días con los tres primeros proyectos definidos',
      ],
      link: { label: 'Abrir el diagnóstico de IA', href: '/diagnostic' },
    },
    method: {
      title: 'De las entrevistas <em>a las automatizaciones en marcha</em>',
      lede: 'Un solo proceso en cuatro pasos. Cada paso termina con algo que puedes usar, aunque decidas parar ahí.',
      steps: [
        {
          name: 'Entrevistar',
          time: 'Semana 1',
          body: 'Arranque con la dirección y luego entrevistas con los equipos. Vemos cómo fluye el trabajo, adónde se van las horas y qué datos ya existen.',
          out: ['Notas de entrevistas', 'Inventario de procesos'],
        },
        {
          name: 'Priorizar',
          time: 'Semanas 2–3',
          body: 'Dimensionamos cada oportunidad por retorno, esfuerzo y riesgo, y convertimos las mejores en una hoja de ruta a 90 días.',
          out: ['Oportunidades priorizadas', 'Hoja de ruta a 90 días'],
        },
        {
          name: 'Implementar',
          time: 'Semanas 4–11',
          body: 'El sprint de implementación: herramientas, políticas, automatizaciones y capacitación, entregadas en ciclos de dos semanas y medidas contra la línea base.',
          out: ['Procesos automatizados', 'Política de uso de IA', 'Equipo capacitado'],
        },
        {
          name: 'Liderar',
          time: 'Continuo',
          body: 'Como tu Head of AI fraccional, mantenemos la hoja de ruta al día, evaluamos herramientas nuevas y reportamos avances a la dirección.',
          out: ['Revisión mensual', 'Reporte trimestral'],
        },
      ],
    },
    pricing: {
      body: 'La auditoría y el sprint son proyectos de alcance cerrado: sabes exactamente qué recibes antes de empezar. El Head of AI fraccional es un servicio mensual. Definimos los tres después de una llamada inicial, según el tamaño de tu equipo y el mercado en el que operas.',
      points: [
        'Auditoría: alcance y plazo cerrados',
        'Sprint: definido a partir de la hoja de ruta de la auditoría',
        'Head of AI: mensual, ajustable a medida que creces',
        'Ajustado a tu mercado y al tamaño de tu equipo',
      ],
      shape: ['Auditoría + sprint', 'Head of AI, mensual'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Proyectos típicos <em>por industria</em>',
      lede: 'Hacia dónde suele apuntar primero una auditoría, según el sector.',
      items: [
        {
          industry: 'Servicios profesionales',
          title: 'De cuentas personales a un uso ordenado',
          body: 'Herramientas aprobadas, política de uso y capacitación para cada área, más admisión de clientes y revisión de documentos automatizadas.',
          tags: ['Política', 'Capacitación', 'Automatización'],
        },
        {
          industry: 'Distribución',
          title: 'Pedidos sin volver a cargarlos a mano',
          body: 'Los pedidos que llegan por correo y hoja de cálculo se leen, validan y cargan solos; las excepciones pasan a una persona.',
          tags: ['Correo', 'ERP'],
        },
        {
          industry: 'Clínicas y grupos de salud',
          title: 'Recepción y administración',
          body: 'Agenda, recordatorios y trámites con aseguradoras mapeados y priorizados, con las reglas de datos de pacientes definidas antes de construir.',
          tags: ['Cumplimiento', 'Agenda'],
        },
        {
          industry: 'Empresas medianas',
          title: 'Una hoja de ruta que la dirección aprueba',
          body: 'Una auditoría en ventas, finanzas y operaciones que convierte una lista larga de ideas en un plan ordenado con responsables claros.',
          tags: ['Hoja de ruta', 'Dirección'],
        },
        {
          industry: 'Software y SaaS',
          title: 'Soporte y éxito de clientes a escala',
          body: 'Clasificación de tickets, vacíos en el centro de ayuda y señales de renovación mapeados a lo largo del recorrido del cliente, y luego automatizados en orden.',
          tags: ['Mesa de ayuda', 'CRM'],
        },
      ],
    },
    faq: [
      {
        q: '¿Qué recibimos al final de la auditoría?',
        a: 'Un informe escrito y una sesión de presentación: el mapa de tus procesos, una lista de oportunidades de IA ordenada por retorno y esfuerzo esperados, una revisión de datos y seguridad, y una hoja de ruta a 90 días con los tres primeros proyectos definidos y listos para ejecutar.',
      },
      {
        q: '¿Tenemos que seguir con el sprint después de la auditoría?',
        a: 'No. La hoja de ruta es tuya. Puedes ejecutarla con tu propio equipo, con otro proveedor o con nosotros, y también podemos acompañar a tu equipo como Head of AI mientras lo hace.',
      },
      {
        q: '¿Quiénes de nuestro equipo tienen que participar?',
        a: 'Un patrocinador en la dirección, un responsable por cada área que revisamos y entre 6 y 12 personas para entrevistas de unos 45 minutos. Nos adaptamos a tu agenda.',
      },
      {
        q: '¿En qué se diferencia de una presentación de estrategia?',
        a: 'Nos quedamos hasta la implementación. Las oportunidades se dimensionan según el esfuerzo y los datos que realmente tienes, y el sprint termina con procesos automatizados funcionando y un equipo capacitado, no con diapositivas.',
      },
      {
        q: '¿Qué herramientas de IA recomiendan?',
        a: 'Las que encajan con tu stack, tus reglas de datos y las habilidades de tu equipo. Te explicamos las ventajas y desventajas de cada opción para que la decisión sea tuya y puedas defenderla internamente.',
      },
      {
        q: '¿Trabajan en español e inglés?',
        a: 'Sí. Llevamos proyectos en ambos idiomas para empresas de Estados Unidos, Europa y Latinoamérica.',
      },
      {
        q: '¿Qué hace cada mes un Head of AI fraccional?',
        a: 'Se hace cargo de la hoja de ruta de IA, revisa prioridades con la dirección, evalúa proveedores, supervisa los proyectos activos, actualiza las políticas a medida que cambian las herramientas y tiene horario de consultas para tu equipo.',
      },
    ],
    cta: {
      title: 'Empieza con <em>una foto clara.</em>',
      lede: 'Una llamada de 30 minutos para entender tu negocio y decirte con honestidad si una auditoría tiene sentido ahora.',
    },
  },
};
