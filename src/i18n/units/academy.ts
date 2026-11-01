import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const ACADEMY: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'AI Training for Teams: Workshops & Programs',
      description:
        'Hands-on AI workshops for teams, multi-week programs for leaders and company-wide enablement. Your people working with AI on their own tasks from week one.',
    },
    hero: {
      title: 'Learn AI on <em>your own work.</em>',
      lede:
        'Hands-on workshops and programs where people bring real tasks — a report, a proposal, a full inbox — and leave with them done and a workflow they can repeat. Designed by a team that uses AI in its own work every day.',
      primary: 'Book a call',
      secondary: { label: 'Explore the curriculum', href: '#demo' },
      facts: [
        { k: 'Formats', v: 'Workshops · Programs · Enablement' },
        { k: 'Delivery', v: 'On-site or live online' },
        { k: 'Languages', v: 'English · Spanish' },
      ],
    },
    pains: {
      title: 'Sound <em>familiar?</em>',
      lede: 'Buying AI licenses is the easy part. Getting people to change how they work is where most rollouts stall.',
      items: [
        {
          pain: 'People got AI accounts and nobody showed them what to do with them.',
          outcome: 'Each person leaves with three workflows for their own role, already tested on their own tasks.',
        },
        {
          pain: 'The training was a two-hour demo. By Monday nobody remembered it.',
          outcome: 'Short, hands-on sessions spread over weeks, with exercises in between and office hours.',
        },
        {
          pain: 'Leaders are asked for an AI plan they don’t feel ready to make.',
          outcome: 'A program for leaders about judgment, not tools: where AI fits, what can go wrong, how to lead the change.',
        },
        {
          pain: 'Nobody knows what is allowed: which data, which tools, which uses.',
          outcome: 'Clear rules built into every exercise, adapted to your company’s policy.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we deliver',
      title: 'Formats that <em>stick</em>',
      lede: 'From a single workshop to a company-wide program. Every format is hands-on and built around your team’s real work.',
      items: [
        {
          name: 'Team Workshops',
          what: 'Half-day or full-day hands-on sessions for one team or department. People work on their own tasks with AI, guided step by step.',
          includes: [
            'Pre-session survey of roles and tools',
            'Exercises built on your real tasks',
            'Prompt and workflow library for the team',
            'Usage rules adapted to your policy',
            'Follow-up session two weeks later',
          ],
          timeline: 'Half day or full day',
          bestFor: 'Teams that already have AI tools and want people using them well.',
        },
        {
          name: 'Leadership Program',
          what: 'A multi-week program for founders, executives and managers: what AI changes in your business, how to choose projects, how to lead adoption and manage risk.',
          includes: [
            'Weekly live sessions in a small group',
            'Cases from your industry',
            'A personal AI workflow for each leader',
            'Framework to choose and justify AI projects',
            'Final session: your company’s 90-day AI plan',
          ],
          timeline: '4–6 weeks',
          bestFor: 'Leadership teams that need to make AI decisions with confidence.',
        },
        {
          name: 'Custom Training & Enablement',
          what: 'A training plan for the whole company, designed around your tools, your processes and your policy, with internal champions to keep it going after we leave.',
          includes: [
            'Skills assessment by role',
            'Curriculum per department',
            'Train-the-trainer track for internal champions',
            'Internal playbook and recorded material',
            'Adoption tracking for leadership',
          ],
          timeline: '6–12 weeks',
          bestFor: 'Companies rolling out AI tools to every employee.',
        },
      ],
    },
    demo: {
      eyebrow: 'Sample curriculum',
      title: 'Pick a role. <em>See what they’ll learn.</em>',
      lede: 'Every program is adapted to your team. This is how a typical four-module track looks for each role — and the lab each module ends with.',
    },
    method: {
      title: 'Built on your tasks, <em>not on slides</em>',
      lede: 'We design every session from your team’s real work, then stay long enough for the habits to stick.',
      steps: [
        {
          name: 'Discover',
          time: '1 week',
          body: 'A short survey and a few interviews tell us which tools your people use, which tasks eat their time and what they are allowed to do.',
          out: ['Skills snapshot', 'Task inventory'],
        },
        {
          name: 'Design',
          time: '1–2 weeks',
          body: 'We build the exercises from your real tasks and documents, and adapt the rules to your AI policy.',
          out: ['Custom curriculum', 'Exercise kit'],
        },
        {
          name: 'Build',
          time: '1 day to 6 weeks',
          body: 'Hands-on sessions, live or on-site. Everyone works on their own tasks, with short exercises between sessions.',
          out: ['Live sessions', 'Workflow library'],
        },
        {
          name: 'Operate',
          time: 'After training',
          body: 'Office hours, a follow-up session and adoption tracking, so the habits stay once we leave.',
          out: ['Follow-up session', 'Adoption report'],
        },
      ],
    },
    pricing: {
      body: 'Workshops are scoped per session and group, programs per cohort and enablement plans per company. We define each one after a short call about your team, your tools and your market. Webinars and the newsletter are free.',
      points: [
        'Workshops: per session and group',
        'Leadership program: per cohort',
        'Enablement: a plan scoped to your company',
        'Free webinars and newsletter, always',
      ],
      shape: ['Workshop or program', 'Follow-up & office hours'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'What teams practice, <em>by industry</em>',
      lede: 'The tasks we usually build exercises around in each sector.',
      items: [
        {
          industry: 'Professional services',
          title: 'Research, drafting and review',
          body: 'Consultants and lawyers practice research, drafting and document review with AI, inside clear confidentiality rules.',
          tags: ['Drafting', 'Confidentiality'],
        },
        {
          industry: 'Real estate',
          title: 'Listings, replies and market notes',
          body: 'Agents learn to write listings, answer inquiries and prepare market summaries with AI as a daily assistant.',
          tags: ['Writing', 'Follow-up'],
        },
        {
          industry: 'Clinics',
          title: 'Admin without the paperwork pile',
          body: 'Front-desk and admin staff learn safe uses for scheduling messages, summaries and internal documents, with patient-data rules first.',
          tags: ['Admin', 'Data rules'],
        },
        {
          industry: 'Manufacturing',
          title: 'Operations and quality reports',
          body: 'Supervisors learn to turn logs and spreadsheets into clear reports and to spot issues earlier.',
          tags: ['Spreadsheets', 'Reports'],
        },
        {
          industry: 'Nonprofits & education',
          title: 'Small teams, big workloads',
          body: 'Grant writing, reporting and communications with AI, adapted to tight resources and shared tools.',
          tags: ['Writing', 'Reporting'],
        },
      ],
    },
    faq: [
      {
        q: 'Do participants need technical knowledge?',
        a: 'No. Workshops start from zero and move fast. If someone can write an email and use a spreadsheet, they can follow along. Technical teams get advanced tracks.',
      },
      {
        q: 'Which AI tools do you teach?',
        a: 'The ones your company has approved, or the ones we recommend for your case. We teach methods that carry over from one tool to another, so the training still works when the tools change.',
      },
      {
        q: 'Online or in person?',
        a: 'Both. Workshops work best on-site; programs run live online with sessions spread over several weeks. Everything is available in English or Spanish.',
      },
      {
        q: 'How do you make sure people use it after the training?',
        a: 'Every session ends with workflows each person applies to their own tasks. Then we add a follow-up session, office hours and adoption tracking that leadership can see.',
      },
      {
        q: 'Can you train on our internal policy and data rules?',
        a: 'Yes. We review your AI policy before the training and build it into the exercises. If you don’t have a policy yet, we can help you write one.',
      },
      {
        q: 'Is there free content?',
        a: 'Yes. We run free webinars and send one email a month with what we are building and learning. You can subscribe at the bottom of any page.',
      },
    ],
    cta: {
      title: 'Train one team. <em>Then decide.</em>',
      lede: 'Start with a single workshop for one team, see what it changes in their week, and expand from there.',
    },
  },

  es: {
    seo: {
      title: 'Capacitación en IA para equipos y líderes',
      description:
        'Talleres prácticos de IA para equipos, programas para líderes y capacitación para toda la empresa. Tu gente trabajando con IA en sus propias tareas.',
    },
    hero: {
      title: 'Aprende IA con <em>tu propio trabajo.</em>',
      lede:
        'Talleres y programas prácticos donde cada persona trae tareas reales —un reporte, una propuesta, una bandeja de entrada llena— y se va con ellas resueltas y un flujo que puede repetir. Diseñados por un equipo que usa IA en su propio trabajo todos los días.',
      primary: 'Agendar llamada',
      secondary: { label: 'Explorar el programa', href: '#demo' },
      facts: [
        { k: 'Formatos', v: 'Talleres · Programas · Capacitación a medida' },
        { k: 'Modalidad', v: 'Presencial o en vivo online' },
        { k: 'Idiomas', v: 'Inglés · Español' },
      ],
    },
    pains: {
      title: '¿Te <em>suena?</em>',
      lede: 'Comprar licencias de IA es lo fácil. Lograr que la gente cambie su forma de trabajar es donde se frena la mayoría de las implementaciones.',
      items: [
        {
          pain: 'Le dieron cuentas de IA a todo el equipo y nadie les mostró qué hacer con ellas.',
          outcome: 'Cada persona se va con tres flujos para su propio rol, ya probados en sus propias tareas.',
        },
        {
          pain: 'La capacitación fue una demo de dos horas. El lunes nadie se acordaba.',
          outcome: 'Sesiones cortas y prácticas a lo largo de varias semanas, con ejercicios entre medio y horario de consultas.',
        },
        {
          pain: 'A los líderes les piden un plan de IA que no se sienten preparados para armar.',
          outcome: 'Un programa para líderes sobre criterio, no sobre herramientas: dónde encaja la IA, qué puede salir mal, cómo liderar el cambio.',
        },
        {
          pain: 'Nadie sabe qué está permitido: qué datos, qué herramientas, qué usos.',
          outcome: 'Reglas claras integradas en cada ejercicio, adaptadas a la política de tu empresa.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué entregamos',
      title: 'Formatos que <em>se quedan</em>',
      lede: 'Desde un solo taller hasta un programa para toda la empresa. Cada formato es práctico y está construido sobre el trabajo real de tu equipo.',
      items: [
        {
          name: 'Talleres para equipos',
          what: 'Sesiones prácticas de medio día o día completo para un equipo o área. Cada persona trabaja en sus propias tareas con IA, guiada paso a paso.',
          includes: [
            'Encuesta previa de roles y herramientas',
            'Ejercicios armados con tus tareas reales',
            'Biblioteca de prompts y flujos para el equipo',
            'Reglas de uso adaptadas a tu política',
            'Sesión de seguimiento dos semanas después',
          ],
          timeline: 'Medio día o día completo',
          bestFor: 'Equipos que ya tienen herramientas de IA y quieren usarlas bien.',
        },
        {
          name: 'Programa para líderes',
          what: 'Un programa de varias semanas para fundadores, directivos y gerentes: qué cambia la IA en tu negocio, cómo elegir proyectos, cómo liderar la adopción y gestionar los riesgos.',
          includes: [
            'Sesiones semanales en vivo, en grupo reducido',
            'Casos de tu industria',
            'Un flujo de IA personal para cada líder',
            'Marco para elegir y justificar proyectos de IA',
            'Sesión final: el plan de IA a 90 días de tu empresa',
          ],
          timeline: '4–6 semanas',
          bestFor: 'Equipos directivos que necesitan tomar decisiones sobre IA con seguridad.',
        },
        {
          name: 'Capacitación a medida',
          what: 'Un plan de formación para toda la empresa, diseñado sobre tus herramientas, tus procesos y tu política, con referentes internos que lo sostienen cuando nos vamos.',
          includes: [
            'Evaluación de habilidades por rol',
            'Programa por área',
            'Formación de formadores para referentes internos',
            'Manual interno y material grabado',
            'Seguimiento de adopción para la dirección',
          ],
          timeline: '6–12 semanas',
          bestFor: 'Empresas que están desplegando herramientas de IA para todo el personal.',
        },
      ],
    },
    demo: {
      eyebrow: 'Programa de ejemplo',
      title: 'Elige un rol. <em>Mira qué va a aprender.</em>',
      lede: 'Cada programa se adapta a tu equipo. Así se ve un recorrido típico de cuatro módulos para cada rol, y el laboratorio con el que termina cada módulo.',
    },
    method: {
      title: 'Sobre tus tareas, <em>no sobre diapositivas</em>',
      lede: 'Diseñamos cada sesión a partir del trabajo real de tu equipo y nos quedamos lo suficiente para que los hábitos se instalen.',
      steps: [
        {
          name: 'Descubrir',
          time: '1 semana',
          body: 'Una encuesta breve y algunas entrevistas nos dicen qué herramientas usa tu gente, qué tareas les consumen el tiempo y qué tienen permitido hacer.',
          out: ['Foto de habilidades', 'Inventario de tareas'],
        },
        {
          name: 'Diseñar',
          time: '1–2 semanas',
          body: 'Armamos los ejercicios con tus tareas y documentos reales, y adaptamos las reglas a tu política de IA.',
          out: ['Programa a medida', 'Kit de ejercicios'],
        },
        {
          name: 'Construir',
          time: 'De 1 día a 6 semanas',
          body: 'Sesiones prácticas, en vivo o presenciales. Cada persona trabaja en sus propias tareas, con ejercicios breves entre sesiones.',
          out: ['Sesiones en vivo', 'Biblioteca de flujos'],
        },
        {
          name: 'Operar',
          time: 'Después de la formación',
          body: 'Horario de consultas, una sesión de seguimiento y medición de adopción, para que los hábitos sigan cuando nos vamos.',
          out: ['Sesión de seguimiento', 'Reporte de adopción'],
        },
      ],
    },
    pricing: {
      body: 'Los talleres se cotizan por sesión y grupo, los programas por cohorte y la capacitación a medida por empresa. Definimos cada uno después de una llamada breve sobre tu equipo, tus herramientas y tu mercado. Los webinars y la newsletter son gratuitos.',
      points: [
        'Talleres: por sesión y grupo',
        'Programa para líderes: por cohorte',
        'Capacitación a medida: un plan para tu empresa',
        'Webinars y newsletter gratuitos, siempre',
      ],
      shape: ['Taller o programa', 'Seguimiento y consultas'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Qué practican los equipos, <em>por industria</em>',
      lede: 'Las tareas sobre las que solemos armar ejercicios en cada sector.',
      items: [
        {
          industry: 'Servicios profesionales',
          title: 'Investigación, redacción y revisión',
          body: 'Consultores y abogados practican investigación, redacción y revisión de documentos con IA, dentro de reglas claras de confidencialidad.',
          tags: ['Redacción', 'Confidencialidad'],
        },
        {
          industry: 'Inmobiliarias',
          title: 'Fichas, respuestas y notas de mercado',
          body: 'Los asesores aprenden a escribir fichas, responder consultas y preparar resúmenes de mercado con la IA como asistente diario.',
          tags: ['Redacción', 'Seguimiento'],
        },
        {
          industry: 'Clínicas',
          title: 'Administración sin pilas de papeles',
          body: 'El personal de recepción y administración aprende usos seguros para mensajes de agenda, resúmenes y documentos internos, con las reglas de datos de pacientes primero.',
          tags: ['Administración', 'Reglas de datos'],
        },
        {
          industry: 'Manufactura',
          title: 'Reportes de operación y calidad',
          body: 'Los supervisores aprenden a convertir registros y hojas de cálculo en reportes claros y a detectar problemas antes.',
          tags: ['Hojas de cálculo', 'Reportes'],
        },
        {
          industry: 'ONG y educación',
          title: 'Equipos chicos, mucha carga',
          body: 'Postulación a fondos, reportes y comunicaciones con IA, adaptados a recursos ajustados y herramientas compartidas.',
          tags: ['Redacción', 'Reportes'],
        },
      ],
    },
    faq: [
      {
        q: '¿Los participantes necesitan conocimientos técnicos?',
        a: 'No. Los talleres empiezan desde cero y avanzan rápido. Si alguien sabe escribir un correo y usar una hoja de cálculo, puede seguirlos. Para equipos técnicos hay recorridos avanzados.',
      },
      {
        q: '¿Qué herramientas de IA enseñan?',
        a: 'Las que tu empresa ya aprobó, o las que te recomendamos para tu caso. Enseñamos métodos que sirven de una herramienta a otra, así la formación sigue funcionando cuando las herramientas cambian.',
      },
      {
        q: '¿Online o presencial?',
        a: 'Las dos. Los talleres funcionan mejor presenciales; los programas se hacen en vivo online, con sesiones repartidas en varias semanas. Todo está disponible en español o inglés.',
      },
      {
        q: '¿Cómo se aseguran de que la gente lo use después?',
        a: 'Cada sesión termina con flujos que cada persona aplica a sus propias tareas. Después sumamos una sesión de seguimiento, horario de consultas y una medición de adopción que la dirección puede ver.',
      },
      {
        q: '¿Pueden formar sobre nuestra política interna y reglas de datos?',
        a: 'Sí. Revisamos tu política de IA antes de la formación y la integramos en los ejercicios. Si todavía no tienes una, te ayudamos a escribirla.',
      },
      {
        q: '¿Hay contenido gratuito?',
        a: 'Sí. Hacemos webinars gratuitos y enviamos un email al mes con lo que estamos construyendo y aprendiendo. Puedes suscribirte al pie de cualquier página.',
      },
    ],
    cta: {
      title: 'Forma a un equipo. <em>Después decides.</em>',
      lede: 'Empieza con un solo taller para un equipo, mira qué cambia en su semana y crece desde ahí.',
    },
  },
};
