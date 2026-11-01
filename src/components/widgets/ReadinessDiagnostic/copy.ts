import type { Lang } from '@/i18n';
import type { DimId, LevelId, MoveId } from './model';

/**
 * All copy for the AI Readiness Diagnostic (EN + neutral Latin-American ES, "tú").
 * Question ids and dimension ids match model.ts.
 */

export interface QuestionCopy {
  text: string;
  help: string;
  options: [string, string, string, string];
}

export interface DiagnosticCopy {
  system: string;
  version: string;
  dims: Record<DimId, { name: string; short: string; blurb: string }>;
  questions: Record<string, QuestionCopy>;
  levels: Record<LevelId, { name: string; text: string }>;
  moves: Record<MoveId, { title: string; body: string }>;

  // runner
  counter: (i: number, n: number) => string;
  ofDim: (i: number, n: number) => string;
  timeLeft: (questionsLeft: number) => string;
  back: string;
  next: string;
  seeResult: string;
  keys: { select: string; next: string; back: string };
  restart: string;
  resumed: string;
  handoff: string;
  progressLabel: string;
  liveProfile: string;
  liveNote: string;
  state: { done: string; current: string; todo: string };
  announceQuestion: (i: number, n: number, dim: string, q: string) => string;
  optionsLabel: string;

  // results
  result: string;
  run: (id: string) => string;
  scoredLocally: string;
  scoreLabel: string;
  outOf: string;
  levelOf: (i: number, n: number) => string;
  ladderLabel: string;
  strongest: string;
  weakest: string;
  /** Shown instead of strongest / weakest when every dimension has the same score. */
  balanced: (score: number) => string;
  byDimension: string;
  thresholdNote: (level: string, min: number) => string;
  topLevelNote: string;
  movesTitle: string;
  movesLede: string;
  horizons: [string, string, string];
  triggeredBy: (dim: string, score: number) => string;
  triggeredByOverall: (score: number) => string;
  earlyAccess: string;
  seeUnit: (unit: string) => string;
  /** Primary action next to the three moves: opens /contact with the score attached. */
  talkCta: string;
  editAnswers: string;
  gaugeAria: (score: number, level: string) => string;
  radarAria: (pairs: string) => string;
  announceResult: (score: number, level: string) => string;

  // lead form
  form: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: [string, string, string];
    name: string;
    email: string;
    company: string;
    role: string;
    region: string;
    optional: string;
    regions: { us: string; eu: string; latam: string; other: string };
    ph: { name: string; email: string; company: string; role: string };
    required: string;
    badEmail: string;
    submit: string;
    sending: string;
    wantsCall: string;
    consent: string;
    privacy: string;
    error: string;
    okTitle: string;
    okBody: (email: string, wantsCall: boolean) => string;
    okCall: string;
    okNext: string;
    fixErrors: (n: number) => string;
  };

  // teaser
  teaser: {
    kicker: string;
    meta: string;
    illustrative: string;
    sampleAria: string;
    prompt: string;
    open: string;
    opening: string;
    scoreUnit: string;
  };
}

const en: DiagnosticCopy = {
  system: 'SBX / Readiness diagnostic',
  version: 'v1.0',
  dims: {
    strategy: { name: 'Strategy', short: 'STR', blurb: 'Ownership, priorities and a plan' },
    data: { name: 'Data', short: 'DAT', blurb: 'Where knowledge lives and how clean it is' },
    processes: { name: 'Processes', short: 'PRC', blurb: 'How work is documented and automated' },
    people: { name: 'People', short: 'PPL', blurb: 'Skills, habits and clear rules' },
    stack: { name: 'Stack', short: 'STK', blurb: 'Connected tools and who can build' },
  },
  questions: {
    q01: {
      text: 'How is AI showing up in your company today?',
      help: 'Think about everyday work, not plans.',
      options: [
        'Hardly at all — nobody uses it for work yet',
        'A few people use AI assistants on their own',
        'Several teams use AI tools with shared habits',
        'AI already runs inside at least one core process',
      ],
    },
    q02: {
      text: 'Who owns AI at the leadership level?',
      help: 'Pilots without an owner rarely make it to production.',
      options: [
        'No one — it hasn’t come up',
        'It comes up often, but nobody owns it',
        'One leader owns it, without a written plan',
        'A named owner, a roadmap and goals we track',
      ],
    },
    q03: {
      text: 'Where does your company’s know-how live?',
      help: 'Processes, policies, client history, answers to common questions.',
      options: [
        'In people’s heads and scattered chats',
        'In docs and drives, but it’s hard to find',
        'In a shared knowledge base, mostly up to date',
        'Structured, current and readable by our systems',
      ],
    },
    q04: {
      text: 'How reliable is your customer and operating data?',
      help: 'CRM, orders, tickets, finance — whatever runs the business.',
      options: [
        'Spreadsheets and copies that don’t match',
        'There’s a CRM, but records are incomplete',
        'Main systems are reliable, with known gaps',
        'One source of truth, with owners and rules',
      ],
    },
    q05: {
      text: 'How are your core processes documented?',
      help: 'Sales, delivery, support, onboarding, reporting.',
      options: [
        'They aren’t — everyone does it their way',
        'A few checklists; the rest is habit',
        'Key processes are written down and followed',
        'Documented, measured and reviewed regularly',
      ],
    },
    q06: {
      text: 'How much of your repetitive work is automated?',
      help: 'Data entry, follow-ups, hand-offs between tools and teams.',
      options: [
        'Almost none — it’s all manual',
        'Some templates and simple rules',
        'Several workflows run between our tools',
        'Most hand-offs are automated and monitored',
      ],
    },
    q07: {
      text: 'How comfortable is your team with AI tools?',
      help: 'Think of the typical person on the team, not the enthusiast.',
      options: [
        'Skeptical, or they haven’t really tried them',
        'Curious, with a few early adopters',
        'Most use them weekly for drafts and research',
        'They build their own workflows and share what works',
      ],
    },
    q08: {
      text: 'Are there clear rules for using AI at work?',
      help: 'What data can go where, which tools are approved, who reviews the output.',
      options: [
        'No — everyone decides on their own',
        'Informal advice, nothing written',
        'A written policy on data and approved tools',
        'Policy, training and a place to share use cases',
      ],
    },
    q09: {
      text: 'How connected are your core tools?',
      help: 'CRM, inbox, docs, calendar, spreadsheets, team chat.',
      options: [
        'Not at all — we copy and paste between them',
        'A few built-in integrations',
        'Most are connected and sync on their own',
        'Connected through APIs, with someone maintaining them',
      ],
    },
    q10: {
      text: 'Who could build or run an AI system on your side?',
      help: 'Someone to own integrations, access and day-to-day upkeep.',
      options: [
        'No one in-house today',
        'A tech-savvy person, part-time',
        'An internal IT or operations team',
        'Developers or a data team with capacity',
      ],
    },
  },
  levels: {
    explorer: {
      name: 'Explorer',
      text: 'AI is still more idea than practice in your company — and that’s a fine place to start. The risk right now isn’t falling behind on tools; it’s scattered experiments with no owner and no data to build on. Pick one process that costs real hours, give it an owner, and get your knowledge into one place before you buy anything.',
    },
    builder: {
      name: 'Builder',
      text: 'There’s real momentum: people use AI and some foundations exist, but it depends on individuals, not systems. This is the stage where a clear roadmap pays off most — decide which two or three processes matter, clean up the data they rely on, and set simple rules so usage can grow safely.',
    },
    operator: {
      name: 'Operator',
      text: 'AI is already part of how you work. Your next gains come from connecting it: agents that act across your tools, a company brain your team trusts, and a metric on every workflow. The bottleneck at this stage is usually integration and ownership, not ideas.',
    },
    native: {
      name: 'AI-native',
      text: 'You run like an AI-native company: clear owners, clean data, documented processes and a team that builds. The work now is compounding — more processes automated each quarter, systems you can reuse, and growth driven by AI. Protect the habits that got you here.',
    },
  },
  moves: {
    diagnostic: {
      title: 'Map where AI pays off',
      body: 'A 2–3 week AI Opportunity Audit: interviews, a process map and opportunities ranked by return, ending in a roadmap you can act on.',
    },
    headOfAi: {
      title: 'Give AI a senior owner',
      body: 'A fractional Head of AI keeps the roadmap moving month to month — priorities, vendors, rollouts — without a full-time hire.',
    },
    knowledge: {
      title: 'Put your know-how in one place',
      body: 'Turn docs, FAQs and process notes into a living knowledge base — the foundation every assistant and agent will read from.',
    },
    brain: {
      title: 'Build your company brain',
      body: 'Your data is ready for it: an assistant that answers with sources, and agents that act on what it knows.',
    },
    sprint: {
      title: 'Automate your first 2–3 processes',
      body: 'A 4–8 week Implementation Sprint: document the hand-offs that eat the most hours, automate them and train the people who run them.',
    },
    agents: {
      title: 'Put agents on your busiest process',
      body: 'Sales follow-up, support triage or weekly reporting: agents do the work, your team approves what matters.',
    },
    workshop: {
      title: 'Train the whole team, hands-on',
      body: 'A practical workshop on their real work: safe habits, useful prompts and a shared playbook from day one.',
    },
    leaders: {
      title: 'Grow an AI lead in every team',
      body: 'A multi-week program for the people who will own AI use cases in sales, operations and support.',
    },
    connect: {
      title: 'Connect your core tools',
      body: 'Link CRM, inbox, docs and calendar so AI can read and act across them — not just inside one tab.',
    },
    packaged: {
      title: 'Start from an industry brain',
      body: 'Brains packaged by industry that plug into the tools you already run, so you skip most of the build.',
    },
    growth: {
      title: 'Point AI at growth',
      body: 'Content in your brand’s voice, visibility inside AI answers and ad creative tested at scale.',
    },
  },

  counter: (i, n) => `Q${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`,
  ofDim: (i, n) => `${i} of ${n}`,
  timeLeft: (q) => (q <= 3 ? 'Under a minute left' : `About ${Math.ceil((q * 18) / 60)} min left`),
  back: 'Back',
  next: 'Continue',
  seeResult: 'See my result',
  keys: { select: 'select', next: 'continue', back: 'back' },
  restart: 'Start over',
  resumed: 'Picked up where you left off.',
  handoff: 'First answer saved — you’re on question 2.',
  progressLabel: 'Diagnostic progress',
  liveProfile: 'Live profile',
  liveNote: 'Builds as you answer. Scored in your browser — nothing is sent.',
  state: { done: 'done', current: 'now', todo: 'next' },
  announceQuestion: (i, n, dim, q) => `Question ${i} of ${n}, ${dim}: ${q}`,
  optionsLabel: 'Answers',

  result: 'Result',
  run: (id) => `Run SBX-${id}`,
  scoredLocally: 'Scored in your browser · nothing sent yet',
  scoreLabel: 'Readiness',
  outOf: '/ 100',
  levelOf: (i, n) => `Level ${i} of ${n}`,
  ladderLabel: 'Maturity levels',
  strongest: 'Strongest',
  weakest: 'Holding you back',
  balanced: (s) => `Balanced: every dimension at ${s}`,
  byDimension: 'By dimension',
  thresholdNote: (level, min) => `Dashed line: ${level} starts at ${min}`,
  topLevelNote: 'Dashed line: the AI-native threshold (80)',
  movesTitle: 'Your next three moves',
  movesLede: 'In the order we’d make them, based on your weakest dimensions.',
  horizons: ['Now', 'Next', 'Then'],
  triggeredBy: (dim, s) => `${dim} · ${s}`,
  triggeredByOverall: (s) => `Overall · ${s}`,
  earlyAccess: 'Early access',
  seeUnit: (u) => `See ${u}`,
  talkCta: 'Review my result on a call',
  editAnswers: 'Change answers',
  gaugeAria: (s, l) => `Readiness score ${s} out of 100. Level: ${l}.`,
  radarAria: (pairs) => `Readiness by dimension: ${pairs}.`,
  announceResult: (s, l) => `Your readiness score is ${s} out of 100. Level: ${l}.`,

  form: {
    eyebrow: 'Full report',
    title: 'Get the full report by email',
    body: 'A written breakdown of every dimension, the reasoning behind your three moves and what each one involves. If you want, add 30 minutes with our team to test it against your business.',
    bullets: ['Breakdown by dimension', 'The reasoning behind each move', 'Optional 30-minute review call'],
    name: 'Name',
    email: 'Work email',
    company: 'Company',
    role: 'Role',
    region: 'Region',
    optional: 'optional',
    regions: { us: 'United States', eu: 'Europe', latam: 'Latin America', other: 'Other' },
    ph: { name: 'Your name', email: 'you@company.com', company: 'Company name', role: 'e.g. COO, Head of Sales' },
    required: 'Required',
    badEmail: 'Enter a valid work email',
    submit: 'Send me the report',
    sending: 'Sending',
    wantsCall: 'Also set up a 30-minute review call',
    consent: 'We use your answers only to prepare the report and, if you ask, the call. No newsletter unless you ask for it.',
    privacy: 'Privacy policy',
    error: 'We couldn’t send it. Try again, or write to us at',
    okTitle: 'Report requested',
    okBody: (e, call) => `We’ll send your full report to ${e}.${call ? ' We’ll also suggest times for the review call.' : ''}`,
    okCall: 'Book the review call now',
    okNext: 'Meanwhile, explore',
    fixErrors: (n) => (n === 1 ? '1 field needs attention.' : `${n} fields need attention.`),
  },

  teaser: {
    kicker: 'AI readiness',
    meta: '10 questions · 3 min',
    illustrative: 'Illustrative profiles',
    sampleAria: 'Animated radar cycling through four illustrative readiness profiles: Explorer, Builder, Operator and AI-native.',
    prompt: 'Answer to start — 9 more to go.',
    open: 'Open the diagnostic',
    opening: 'Opening the diagnostic',
    scoreUnit: '/100',
  },
};

const es: DiagnosticCopy = {
  system: 'SBX / Diagnóstico de preparación',
  version: 'v1.0',
  dims: {
    strategy: { name: 'Estrategia', short: 'EST', blurb: 'Responsables, prioridades y un plan' },
    data: { name: 'Datos', short: 'DAT', blurb: 'Dónde vive el conocimiento y qué tan limpio está' },
    processes: { name: 'Procesos', short: 'PRO', blurb: 'Cómo se documenta y automatiza el trabajo' },
    people: { name: 'Personas', short: 'PER', blurb: 'Habilidades, hábitos y reglas claras' },
    stack: { name: 'Tecnología', short: 'TEC', blurb: 'Herramientas conectadas y quién puede construir' },
  },
  questions: {
    q01: {
      text: '¿Cómo está presente la IA hoy en tu empresa?',
      help: 'Piensa en el trabajo de todos los días, no en planes.',
      options: [
        'Casi nada — nadie la usa todavía para trabajar',
        'Algunas personas usan asistentes de IA por su cuenta',
        'Varios equipos usan herramientas de IA con prácticas compartidas',
        'La IA ya opera dentro de al menos un proceso clave',
      ],
    },
    q02: {
      text: '¿Quién se hace cargo de la IA en la dirección?',
      help: 'Los pilotos sin un responsable rara vez llegan a producción.',
      options: [
        'Nadie — no ha sido tema',
        'Se habla seguido, pero nadie se hace cargo',
        'Un líder se encarga, sin un plan por escrito',
        'Un responsable, una hoja de ruta y metas que medimos',
      ],
    },
    q03: {
      text: '¿Dónde vive el conocimiento de tu empresa?',
      help: 'Procesos, políticas, historial de clientes, respuestas a preguntas frecuentes.',
      options: [
        'En la cabeza de las personas y en chats dispersos',
        'En documentos y carpetas, pero cuesta encontrarlo',
        'En una base de conocimiento compartida, casi siempre al día',
        'Estructurado, actualizado y accesible para nuestros sistemas',
      ],
    },
    q04: {
      text: '¿Qué tan confiables son tus datos de clientes y de operación?',
      help: 'CRM, pedidos, tickets, finanzas — lo que mueve el negocio.',
      options: [
        'Hojas de cálculo y copias que no coinciden',
        'Hay un CRM, pero los registros están incompletos',
        'Los sistemas principales son confiables, con huecos conocidos',
        'Una sola fuente de verdad, con responsables y reglas',
      ],
    },
    q05: {
      text: '¿Cómo están documentados tus procesos clave?',
      help: 'Ventas, entrega, soporte, onboarding, reportes.',
      options: [
        'No lo están — cada quien lo hace a su manera',
        'Algunas listas de pasos; el resto es costumbre',
        'Los procesos clave están escritos y se siguen',
        'Documentados, medidos y revisados con frecuencia',
      ],
    },
    q06: {
      text: '¿Cuánto de tu trabajo repetitivo está automatizado?',
      help: 'Carga de datos, seguimientos, traspasos entre herramientas y equipos.',
      options: [
        'Casi nada — todo es manual',
        'Algunas plantillas y reglas simples',
        'Varios flujos corren entre nuestras herramientas',
        'La mayoría de los traspasos está automatizada y monitoreada',
      ],
    },
    q07: {
      text: '¿Qué tan cómodo se siente tu equipo con herramientas de IA?',
      help: 'Piensa en la persona típica del equipo, no en la más entusiasta.',
      options: [
        'Escéptico, o casi no las ha probado',
        'Con curiosidad, y algunas personas pioneras',
        'La mayoría las usa cada semana para borradores e investigación',
        'Arman sus propios flujos y comparten lo que funciona',
      ],
    },
    q08: {
      text: '¿Hay reglas claras para usar IA en el trabajo?',
      help: 'Qué datos se pueden usar, qué herramientas están aprobadas, quién revisa los resultados.',
      options: [
        'No — cada quien decide por su cuenta',
        'Consejos informales, nada por escrito',
        'Una política escrita sobre datos y herramientas aprobadas',
        'Política, capacitación y un espacio para compartir casos de uso',
      ],
    },
    q09: {
      text: '¿Qué tan conectadas están tus herramientas principales?',
      help: 'CRM, correo, documentos, calendario, hojas de cálculo, chat del equipo.',
      options: [
        'Nada — copiamos y pegamos entre ellas',
        'Algunas integraciones que ya vienen incluidas',
        'La mayoría está conectada y se sincroniza sola',
        'Conectadas por API, con alguien que las mantiene',
      ],
    },
    q10: {
      text: '¿Quién podría construir u operar un sistema de IA de tu lado?',
      help: 'Alguien que se haga cargo de integraciones, accesos y el mantenimiento diario.',
      options: [
        'Hoy nadie en la empresa',
        'Alguien con perfil técnico, a medio tiempo',
        'Un equipo interno de TI u operaciones',
        'Desarrolladores o un equipo de datos con capacidad',
      ],
    },
  },
  levels: {
    explorer: {
      name: 'Explorador',
      text: 'En tu empresa, la IA todavía es más idea que práctica, y es un buen punto de partida. El riesgo hoy no es quedarte atrás en herramientas; es acumular experimentos sueltos, sin responsable y sin datos sobre los cuales construir. Elige un proceso que cueste horas reales, asígnale un responsable y reúne tu conocimiento en un solo lugar antes de comprar nada.',
    },
    builder: {
      name: 'Constructor',
      text: 'Ya hay impulso real: la gente usa IA y existen algunas bases, pero todo depende de personas, no de sistemas. Es la etapa en la que una hoja de ruta clara rinde más: define los dos o tres procesos que importan, ordena los datos de los que dependen y fija reglas simples para que el uso crezca de forma segura.',
    },
    operator: {
      name: 'Operador',
      text: 'La IA ya es parte de cómo trabajas. Lo que sigue es conectarla: agentes que actúan entre tus herramientas, un brain de empresa en el que tu equipo confía y una métrica en cada flujo. En esta etapa, el cuello de botella suele estar en la integración y en quién se hace cargo, no en las ideas.',
    },
    native: {
      name: 'Nativo en IA',
      text: 'Operas como una empresa nativa en IA: responsables claros, datos limpios, procesos documentados y un equipo que construye. Ahora toca multiplicar: más procesos automatizados cada trimestre, sistemas que puedes reutilizar y crecimiento impulsado por IA. Cuida los hábitos que te trajeron hasta aquí.',
    },
  },
  moves: {
    diagnostic: {
      title: 'Mapea dónde rinde la IA',
      body: 'Una auditoría de oportunidades de IA de 2 a 3 semanas: entrevistas, mapa de procesos y oportunidades ordenadas por retorno, con una hoja de ruta lista para ejecutar.',
    },
    headOfAi: {
      title: 'Dale a la IA un responsable senior',
      body: 'Un Head of AI fraccional mantiene la hoja de ruta en marcha mes a mes (prioridades, proveedores, implementaciones) sin contratar a tiempo completo.',
    },
    knowledge: {
      title: 'Reúne tu conocimiento en un solo lugar',
      body: 'Convierte documentos, preguntas frecuentes y notas de procesos en una base de conocimiento viva: la base que van a leer todos tus asistentes y agentes.',
    },
    brain: {
      title: 'Construye el brain de tu empresa',
      body: 'Tus datos están listos: un asistente que responde citando fuentes y agentes que actúan con lo que sabe.',
    },
    sprint: {
      title: 'Automatiza tus primeros 2 o 3 procesos',
      body: 'Un sprint de implementación de 4 a 8 semanas: documentamos los traspasos que más horas consumen, los automatizamos y capacitamos a quienes los operan.',
    },
    agents: {
      title: 'Pon agentes en tu proceso con más volumen',
      body: 'Seguimiento comercial, clasificación de soporte o reportes semanales: los agentes hacen el trabajo y tu equipo aprueba lo importante.',
    },
    workshop: {
      title: 'Capacita a todo el equipo, en la práctica',
      body: 'Un taller práctico sobre su trabajo real: hábitos seguros, prompts útiles y una guía compartida desde el primer día.',
    },
    leaders: {
      title: 'Forma un líder de IA en cada equipo',
      body: 'Un programa de varias semanas para quienes van a liderar casos de uso de IA en ventas, operaciones y soporte.',
    },
    connect: {
      title: 'Conecta tus herramientas principales',
      body: 'Une CRM, correo, documentos y calendario para que la IA pueda leer y actuar entre ellos, no solo dentro de una pestaña.',
    },
    packaged: {
      title: 'Parte de un brain para tu industria',
      body: 'Brains empaquetados por industria que se conectan con las herramientas que ya usas, para saltarte buena parte de la construcción.',
    },
    growth: {
      title: 'Pon la IA a trabajar en crecimiento',
      body: 'Contenido con la voz de tu marca, visibilidad dentro de las respuestas de IA y anuncios probados a escala.',
    },
  },

  counter: (i, n) => `P${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`,
  ofDim: (i, n) => `${i} de ${n}`,
  timeLeft: (q) => (q <= 3 ? 'Menos de un minuto' : `Faltan unos ${Math.ceil((q * 18) / 60)} min`),
  back: 'Atrás',
  next: 'Continuar',
  seeResult: 'Ver mi resultado',
  keys: { select: 'elegir', next: 'continuar', back: 'atrás' },
  restart: 'Empezar de nuevo',
  resumed: 'Retomamos donde lo dejaste.',
  handoff: 'Guardamos tu primera respuesta — sigues en la pregunta 2.',
  progressLabel: 'Avance del diagnóstico',
  liveProfile: 'Perfil en vivo',
  liveNote: 'Se arma mientras respondes. Se calcula en tu navegador — no se envía nada.',
  state: { done: 'listo', current: 'ahora', todo: 'luego' },
  announceQuestion: (i, n, dim, q) => `Pregunta ${i} de ${n}, ${dim}: ${q}`,
  optionsLabel: 'Respuestas',

  result: 'Resultado',
  run: (id) => `Ejecución SBX-${id}`,
  scoredLocally: 'Calculado en tu navegador · aún no se envió nada',
  scoreLabel: 'Preparación',
  outOf: '/ 100',
  levelOf: (i, n) => `Nivel ${i} de ${n}`,
  ladderLabel: 'Niveles de madurez',
  strongest: 'Lo más fuerte',
  weakest: 'Lo que te frena',
  balanced: (s) => `Parejo: todas las dimensiones en ${s}`,
  byDimension: 'Por dimensión',
  thresholdNote: (level, min) => `Línea punteada: ${level} empieza en ${min}`,
  topLevelNote: 'Línea punteada: el umbral de Nativo en IA (80)',
  movesTitle: 'Tus próximos tres pasos',
  movesLede: 'En el orden en que los daríamos, según tus dimensiones más débiles.',
  horizons: ['Ahora', 'Después', 'Más adelante'],
  triggeredBy: (dim, s) => `${dim} · ${s}`,
  triggeredByOverall: (s) => `General · ${s}`,
  earlyAccess: 'Acceso anticipado',
  seeUnit: (u) => `Ver ${u}`,
  talkCta: 'Revisar mi resultado en una llamada',
  editAnswers: 'Cambiar respuestas',
  gaugeAria: (s, l) => `Puntaje de preparación: ${s} de 100. Nivel: ${l}.`,
  radarAria: (pairs) => `Preparación por dimensión: ${pairs}.`,
  announceResult: (s, l) => `Tu puntaje de preparación es ${s} de 100. Nivel: ${l}.`,

  form: {
    eyebrow: 'Reporte completo',
    title: 'Recibe el reporte completo por correo',
    body: 'Un análisis por escrito de cada dimensión, el porqué de tus tres pasos y qué implica cada uno. Si quieres, suma 30 minutos con nuestro equipo para contrastarlo con tu negocio.',
    bullets: ['Análisis por dimensión', 'El porqué de cada paso', 'Llamada de revisión de 30 minutos, opcional'],
    name: 'Nombre',
    email: 'Correo de trabajo',
    company: 'Empresa',
    role: 'Cargo',
    region: 'Región',
    optional: 'opcional',
    regions: { us: 'Estados Unidos', eu: 'Europa', latam: 'Latinoamérica', other: 'Otra' },
    ph: { name: 'Tu nombre', email: 'tu@empresa.com', company: 'Nombre de la empresa', role: 'Ej.: gerente de operaciones' },
    required: 'Obligatorio',
    badEmail: 'Ingresa un correo de trabajo válido',
    submit: 'Enviarme el reporte',
    sending: 'Enviando',
    wantsCall: 'Quiero también una llamada de revisión de 30 minutos',
    consent: 'Usamos tus respuestas solo para preparar el reporte y, si la pides, la llamada. Nada de newsletter si no lo pides.',
    privacy: 'Política de privacidad',
    error: 'No pudimos enviarlo. Inténtalo de nuevo o escríbenos a',
    okTitle: 'Reporte solicitado',
    okBody: (e, call) => `Te enviaremos el reporte completo a ${e}.${call ? ' También te propondremos horarios para la llamada de revisión.' : ''}`,
    okCall: 'Agendar ahora la llamada de revisión',
    okNext: 'Mientras tanto, explora',
    fixErrors: (n) => (n === 1 ? 'Revisa 1 campo.' : `Revisa ${n} campos.`),
  },

  teaser: {
    kicker: 'Preparación en IA',
    meta: '10 preguntas · 3 min',
    illustrative: 'Perfiles ilustrativos',
    sampleAria: 'Radar animado que recorre cuatro perfiles ilustrativos de preparación: Explorador, Constructor, Operador y Nativo en IA.',
    prompt: 'Responde para empezar — quedan 9.',
    open: 'Abrir el diagnóstico',
    opening: 'Abriendo el diagnóstico',
    scoreUnit: '/100',
  },
};

export const COPY: Record<Lang, DiagnosticCopy> = { en, es };
