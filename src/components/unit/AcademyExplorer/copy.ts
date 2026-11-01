import type { L10n } from '@/i18n';

export interface Track {
  id: string;
  role: string;
  /** Who the track is for, one line. */
  for: string;
  modules: { title: string; lab: string; time: string }[];
  outcomes: string[];
}

export interface AcademyCopy {
  bar: string;
  barMeta: string;
  rolesLabel: string;
  modulesLabel: string;
  labLabel: string;
  outcomesLabel: string;
  forLabel: string;
  cta: string;
  tracks: Track[];
}

export const COPY: L10n<AcademyCopy> = {
  en: {
    bar: 'Sample curriculum',
    barMeta: 'Adapted to each team',
    rolesLabel: 'Choose a role',
    modulesLabel: 'Modules',
    labLabel: 'Lab',
    outcomesLabel: 'By the end, each person has',
    forLabel: 'For',
    cta: 'Plan a workshop for this team',
    tracks: [
      {
        id: 'leaders',
        role: 'Leadership',
        for: 'Founders, executives and managers who decide where AI goes.',
        modules: [
          { title: 'Where AI changes your business', lab: 'Map the three decisions in your area that AI could speed up.', time: '90 min' },
          { title: 'Choosing projects that pay off', lab: 'Score two real project ideas by return, effort and risk.', time: '90 min' },
          { title: 'Leading adoption', lab: 'Draft the message and the ground rules for your team’s first month.', time: '90 min' },
          { title: 'Risk, policy and vendors', lab: 'Review a vendor proposal against a short checklist.', time: '60 min' },
        ],
        outcomes: ['A personal AI workflow for weekly reporting', 'A shortlist of projects with a business case', 'A 90-day plan for their area'],
      },
      {
        id: 'sales',
        role: 'Sales',
        for: 'Account executives, SDRs and sales managers.',
        modules: [
          { title: 'Account research in minutes', lab: 'Build a one-page brief on a real prospect from public sources.', time: '90 min' },
          { title: 'Outreach that doesn’t read like a template', lab: 'Rewrite your last five outreach emails for specific people.', time: '90 min' },
          { title: 'Call prep and follow-up', lab: 'Turn a call transcript into notes, next steps and a follow-up email.', time: '90 min' },
          { title: 'A cleaner pipeline', lab: 'Summarize your open deals for the weekly review, with risks flagged.', time: '60 min' },
        ],
        outcomes: ['A research brief template', 'A personalized outreach routine', 'A post-call follow-up workflow'],
      },
      {
        id: 'marketing',
        role: 'Marketing',
        for: 'Content, brand, growth and communications teams.',
        modules: [
          { title: 'Your brand voice, written down', lab: 'Build a voice guide from your five best pieces.', time: '90 min' },
          { title: 'One idea, ten formats', lab: 'Turn one article into posts, an email and a short video script.', time: '90 min' },
          { title: 'Showing up in AI answers', lab: 'Check how assistants answer three questions in your category.', time: '90 min' },
          { title: 'From data to decisions', lab: 'Summarize last month’s campaign results into three decisions.', time: '60 min' },
        ],
        outcomes: ['A voice guide the whole team uses', 'A repurposing workflow', 'A monthly AI-visibility check'],
      },
      {
        id: 'ops',
        role: 'Operations',
        for: 'Operations, finance and admin teams who live in spreadsheets.',
        modules: [
          { title: 'Spreadsheets without the busywork', lab: 'Clean and analyze a real export from one of your systems.', time: '90 min' },
          { title: 'Reports that draft themselves', lab: 'Turn last month’s data into a weekly report draft.', time: '90 min' },
          { title: 'Documenting how work gets done', lab: 'Write the procedure for a task you do every week.', time: '90 min' },
          { title: 'Your first automation', lab: 'Design a simple automation for a repetitive handoff.', time: '60 min' },
        ],
        outcomes: ['A reusable reporting workflow', 'Two documented procedures', 'One automation ready to build'],
      },
      {
        id: 'support',
        role: 'Customer support',
        for: 'Support, success and front-desk teams.',
        modules: [
          { title: 'Answers from your knowledge base', lab: 'Draft replies to ten real tickets, with sources.', time: '90 min' },
          { title: 'Tone, empathy and escalation', lab: 'Rewrite difficult replies and define when to escalate.', time: '90 min' },
          { title: 'Finding gaps in your help center', lab: 'Group a month of tickets by theme and spot missing articles.', time: '90 min' },
          { title: 'Working alongside an AI agent', lab: 'Review, correct and approve an agent’s draft replies.', time: '60 min' },
        ],
        outcomes: ['A reply workflow with sources', 'A list of help-center gaps', 'Clear escalation rules'],
      },
    ],
  },
  es: {
    bar: 'Programa de ejemplo',
    barMeta: 'Se adapta a cada equipo',
    rolesLabel: 'Elige un rol',
    modulesLabel: 'Módulos',
    labLabel: 'Laboratorio',
    outcomesLabel: 'Al terminar, cada persona tiene',
    forLabel: 'Para',
    cta: 'Planificar un taller para este equipo',
    tracks: [
      {
        id: 'leaders',
        role: 'Dirección',
        for: 'Fundadores, directivos y gerentes que deciden hacia dónde va la IA.',
        modules: [
          { title: 'Dónde cambia la IA tu negocio', lab: 'Mapea las tres decisiones de tu área que la IA podría acelerar.', time: '90 min' },
          { title: 'Elegir proyectos que rinden', lab: 'Evalúa dos ideas reales de proyecto por retorno, esfuerzo y riesgo.', time: '90 min' },
          { title: 'Liderar la adopción', lab: 'Redacta el mensaje y las reglas básicas para el primer mes de tu equipo.', time: '90 min' },
          { title: 'Riesgos, políticas y proveedores', lab: 'Revisa una propuesta de proveedor con una lista de control breve.', time: '60 min' },
        ],
        outcomes: ['Un flujo de IA personal para el reporte semanal', 'Una lista corta de proyectos con su caso de negocio', 'Un plan a 90 días para su área'],
      },
      {
        id: 'sales',
        role: 'Ventas',
        for: 'Ejecutivos de cuenta, SDR y gerentes comerciales.',
        modules: [
          { title: 'Investigar una cuenta en minutos', lab: 'Arma una ficha de una página sobre un prospecto real con fuentes públicas.', time: '90 min' },
          { title: 'Prospección que no parece plantilla', lab: 'Reescribe tus últimos cinco correos de prospección para personas concretas.', time: '90 min' },
          { title: 'Preparar llamadas y hacer seguimiento', lab: 'Convierte la transcripción de una llamada en notas, próximos pasos y un correo de seguimiento.', time: '90 min' },
          { title: 'Un pipeline más ordenado', lab: 'Resume tus oportunidades abiertas para la revisión semanal, con los riesgos marcados.', time: '60 min' },
        ],
        outcomes: ['Una plantilla de ficha de cuenta', 'Una rutina de prospección personalizada', 'Un flujo de seguimiento después de cada llamada'],
      },
      {
        id: 'marketing',
        role: 'Marketing',
        for: 'Equipos de contenido, marca, growth y comunicación.',
        modules: [
          { title: 'Tu voz de marca, por escrito', lab: 'Arma una guía de voz a partir de tus cinco mejores piezas.', time: '90 min' },
          { title: 'Una idea, diez formatos', lab: 'Convierte un artículo en publicaciones, un email y un guion de video corto.', time: '90 min' },
          { title: 'Aparecer en las respuestas de IA', lab: 'Revisa cómo responden los asistentes tres preguntas de tu categoría.', time: '90 min' },
          { title: 'De los datos a las decisiones', lab: 'Resume los resultados de campaña del mes pasado en tres decisiones.', time: '60 min' },
        ],
        outcomes: ['Una guía de voz que usa todo el equipo', 'Un flujo para reutilizar contenido', 'Una revisión mensual de visibilidad en IA'],
      },
      {
        id: 'ops',
        role: 'Operaciones',
        for: 'Equipos de operaciones, finanzas y administración que viven en hojas de cálculo.',
        modules: [
          { title: 'Hojas de cálculo sin trabajo repetitivo', lab: 'Limpia y analiza una exportación real de uno de tus sistemas.', time: '90 min' },
          { title: 'Reportes que se arman solos', lab: 'Convierte los datos del mes pasado en un borrador de reporte semanal.', time: '90 min' },
          { title: 'Documentar cómo se hace el trabajo', lab: 'Escribe el procedimiento de una tarea que haces todas las semanas.', time: '90 min' },
          { title: 'Tu primera automatización', lab: 'Diseña una automatización simple para un traspaso repetitivo.', time: '60 min' },
        ],
        outcomes: ['Un flujo de reportes reutilizable', 'Dos procedimientos documentados', 'Una automatización lista para construir'],
      },
      {
        id: 'support',
        role: 'Atención al cliente',
        for: 'Equipos de soporte, éxito de clientes y recepción.',
        modules: [
          { title: 'Respuestas desde tu base de conocimiento', lab: 'Redacta respuestas a diez tickets reales, con fuentes.', time: '90 min' },
          { title: 'Tono, empatía y derivación', lab: 'Reescribe respuestas difíciles y define cuándo derivar.', time: '90 min' },
          { title: 'Encontrar vacíos en tu centro de ayuda', lab: 'Agrupa un mes de tickets por tema y detecta los artículos que faltan.', time: '90 min' },
          { title: 'Trabajar junto a un agente de IA', lab: 'Revisa, corrige y aprueba los borradores de un agente.', time: '60 min' },
        ],
        outcomes: ['Un flujo de respuesta con fuentes', 'Una lista de vacíos del centro de ayuda', 'Reglas de derivación claras'],
      },
    ],
  },
};
