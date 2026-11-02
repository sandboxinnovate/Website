// Academy explainer. Storyboard: video/storyboards/academy.json
// Story: an AI account nobody taught you to use, then the Academy method shown on one Operations person:
// survey and task inventory, the sample Operations track, a lab on their own weekly report with a review
// checklist, usage rules inside the exercise, and the follow up. Copy comes from src/i18n/units/academy.ts,
// src/components/unit/AcademyExplorer/copy.ts and the blog post training-teams-on-ai (review checklist).
// Every label in the mock UIs (2 h, M1 to M4, 90 min) is an example UI state from the site copy, not a claim.

export const meta = {
  title: { en: 'How Sandbox Academy trains a team', es: 'Cómo capacita Sandbox Academy a un equipo' },
};

export const copy = {
  en: {
    unit: 'Academy',
    evDay: 'Fri', evTitle: 'AI training: live demo', evMeta: '2 h · All staff', evDone: 'Done',
    asst: 'Assistant', monday: 'Monday', newChat: 'New chat', history: 'History', noChats: 'No chats yet',
    ask: 'Ask anything',
    hook1: 'Everyone got an AI account.',
    hook2: 'Nobody showed them what to do with it.',
    hook3: 'The two-hour demo?<br><em>Forgotten by Monday.</em>',
    hero: 'Learn AI on<br><em>your own work.</em>',
    lede1: 'Bring a real task. Leave with it done.',
    lede2: 'And a workflow you can repeat.',
    tasks: [['Monthly report', 'Sheet'], ['Client proposal', 'Doc'], ['Inbox', 'Mail']],
    taskDone: 'Done', wfSaved: 'Workflow saved',
    s1k: 'Assess · 1 week', s1: 'We start from your team’s real tasks.', s1b: 'A short survey and a few interviews.',
    survey: 'Pre-session survey', surveyBadge: 'Operations',
    fRole: 'Role', vRole: 'Operations',
    fTools: 'Tools you use', vTools: ['Spreadsheets', 'Email', 'Team chat'],
    fTasks: 'Which tasks eat your week?', vTasks: 'The weekly status report from a spreadsheet',
    inv: 'Task inventory', invMeta: 'Operations',
    invRows: [['Weekly status report', 'Weekly'], ['Supplier email triage', 'Daily'], ['Procedure for a weekly task', 'Weekly']],
    fromSurvey: 'From survey',
    s2k: 'Tailor · 1-2 weeks', s2: 'A curriculum built for each role.', s2b: 'Exercises made from your own documents.',
    rolesLabel: 'Choose a role', roles: ['Leadership', 'Sales', 'Marketing', 'Operations', 'Customer support'],
    curr: 'Curriculum · Operations', sample: 'Sample', modulesLabel: 'Modules',
    modules: [['Spreadsheets without the busywork', '90 min'], ['Reports that draft themselves', '90 min'], ['Documenting how work gets done', '90 min'], ['Your first automation', '60 min']],
    labTag: 'Lab', labText: 'Turn last month’s data into a weekly report draft.',
    s3k: 'Train · 1 day to 6 weeks', s3: 'Everyone practices on their own task.', s3b: 'Live or on-site, in English or Spanish.',
    labCard: 'Lab · M2', checkLabel: 'Review checklist',
    checks: ['Numbers match the source', 'Exceptions flagged', 'A person reviews before sending'],
    docWin: 'weekly-status-report', docKicker: 'Draft', docTitle: 'Weekly status report', docH: 'This week', docH2: 'Next week',
    docP1: '<mark>Deliveries on schedule this week</mark>, checked against the shared tracker.',
    docP2: 'Some supplier orders arrived late. <mark>Each one is flagged for follow-up</mark> with its owner.',
    saved: 'Saved to the team library',
    s4k: 'Usage rules', s4: 'Your rules, built into every exercise.', s4b: 'Which data, which tools, which uses.',
    rulesWin: 'ai-usage-rules', rulesTitle: 'AI usage rules', adapted: 'Adapted to your policy',
    rules: [['Tools', 'Use the tools your company approved'], ['Data', 'Sensitive data stays out of unapproved tools'], ['Review', 'A person reviews output before it leaves']],
    inLab: 'Rules in this lab',
    s5k: 'Follow up · after training', s5: 'We stay until the habits stick.', s5b: 'Follow-up, office hours, adoption tracking.',
    steps: [['Assess', '1 week'], ['Tailor', '1-2 weeks'], ['Train', '1 day to 6 weeks'], ['Follow up', 'After training']],
    delivs: [['book', 'Workflow library'], ['users', 'Follow-up session'], ['clock', 'Office hours'], ['chart', 'Adoption report']],
    formats: ['Workshops', 'Leadership program 4-6 weeks', 'Enablement 6-12 weeks'],
    cta: 'Train one team. <em>Then decide.</em>',
  },
  es: {
    unit: 'Academy',
    evDay: 'Vie', evTitle: 'Capacitación en IA: demo en vivo', evMeta: '2 h · Todo el equipo', evDone: 'Hecho',
    asst: 'Asistente', monday: 'Lunes', newChat: 'Nuevo chat', history: 'Historial', noChats: 'Sin chats todavía',
    ask: 'Pregunta lo que quieras',
    hook1: 'Todos recibieron una cuenta de IA.',
    hook2: 'Nadie les mostró qué hacer con ella.',
    hook3: '¿La demo de dos horas?<br><em>El lunes, olvidada.</em>',
    hero: 'Aprende IA con<br><em>tu propio trabajo.</em>',
    lede1: 'Trae una tarea real. Llévatela resuelta.',
    lede2: 'Y un flujo que puedes repetir.',
    tasks: [['Reporte mensual', 'Hoja'], ['Propuesta para cliente', 'Doc'], ['Bandeja de entrada', 'Correo']],
    taskDone: 'Resuelta', wfSaved: 'Flujo guardado',
    s1k: 'Evaluar · 1 semana', s1: 'Partimos de las tareas reales de tu equipo.', s1b: 'Una encuesta breve y algunas entrevistas.',
    survey: 'Encuesta previa', surveyBadge: 'Operaciones',
    fRole: 'Rol', vRole: 'Operaciones',
    fTools: 'Herramientas que usas', vTools: ['Hojas de cálculo', 'Correo', 'Chat del equipo'],
    fTasks: '¿Qué tareas te consumen la semana?', vTasks: 'El reporte semanal a partir de una hoja de cálculo',
    inv: 'Inventario de tareas', invMeta: 'Operaciones',
    invRows: [['Reporte semanal de estado', 'Semanal'], ['Clasificar correos de proveedores', 'Diaria'], ['Procedimiento de una tarea semanal', 'Semanal']],
    fromSurvey: 'De la encuesta',
    s2k: 'Adaptar · 1-2 semanas', s2: 'Un programa armado para cada rol.', s2b: 'Ejercicios hechos con tus propios documentos.',
    rolesLabel: 'Elige un rol', roles: ['Dirección', 'Ventas', 'Marketing', 'Operaciones', 'Atención al cliente'],
    curr: 'Programa · Operaciones', sample: 'Ejemplo', modulesLabel: 'Módulos',
    modules: [['Hojas de cálculo sin trabajo repetitivo', '90 min'], ['Reportes que se arman solos', '90 min'], ['Documentar cómo se hace el trabajo', '90 min'], ['Tu primera automatización', '60 min']],
    labTag: 'Laboratorio', labText: 'Convierte los datos del mes pasado en un borrador de reporte semanal.',
    s3k: 'Capacitar · de 1 día a 6 semanas', s3: 'Cada persona practica con su propia tarea.', s3b: 'En vivo o presencial, en español o inglés.',
    labCard: 'Laboratorio · M2', checkLabel: 'Lista de revisión',
    checks: ['Las cifras coinciden con la fuente', 'Excepciones marcadas', 'Una persona revisa antes de enviar'],
    docWin: 'reporte-semanal', docKicker: 'Borrador', docTitle: 'Reporte semanal de estado', docH: 'Esta semana', docH2: 'Próxima semana',
    docP1: '<mark>Entregas a tiempo esta semana</mark>, verificadas contra el registro compartido.',
    docP2: 'Algunos pedidos de proveedores llegaron tarde. <mark>Cada uno queda marcado para seguimiento</mark> con su responsable.',
    saved: 'Guardado en la biblioteca del equipo',
    s4k: 'Reglas de uso', s4: 'Tus reglas, dentro de cada ejercicio.', s4b: 'Qué datos, qué herramientas, qué usos.',
    rulesWin: 'reglas-de-uso-ia', rulesTitle: 'Reglas de uso de IA', adapted: 'Adaptadas a tu política',
    rules: [['Herramientas', 'Usa las herramientas que tu empresa aprobó'], ['Datos', 'Los datos sensibles no van a herramientas no aprobadas'], ['Revisión', 'Una persona revisa antes de que algo salga']],
    inLab: 'Reglas de este laboratorio',
    s5k: 'Acompañar · después de la formación', s5: 'Nos quedamos hasta que el hábito se instale.', s5b: 'Seguimiento, consultas y medición de adopción.',
    steps: [['Evaluar', '1 semana'], ['Adaptar', '1-2 semanas'], ['Capacitar', 'De 1 día a 6 semanas'], ['Acompañar', 'Después de la formación']],
    delivs: [['book', 'Biblioteca de flujos'], ['users', 'Sesión de seguimiento'], ['clock', 'Horario de consultas'], ['chart', 'Reporte de adopción']],
    formats: ['Talleres', 'Programa para líderes 4-6 semanas', 'Capacitación a medida 6-12 semanas'],
    cta: 'Forma a un equipo. <em>Después decides.</em>',
  },
};

export const transcript = {
  en: [
    'Everyone got an AI account. Nobody showed them what to do with it. The two-hour demo? Forgotten by Monday.',
    'Learn AI on your own work. Bring a real task, like a report, a proposal or a full inbox. Leave with it done, and a workflow you can repeat.',
    'Step 1, Assess, 1 week: we start from your team’s real tasks, with a short survey and a few interviews.',
    'Step 2, Tailor, 1 to 2 weeks: a curriculum built for each role, with exercises made from your own documents. For example, the Operations track: spreadsheets without the busywork, reports that draft themselves, documenting how work gets done, and your first automation.',
    'Step 3, Train, 1 day to 6 weeks: everyone practices on their own task, live or on-site, in English or Spanish. In the lab, each person reviews an AI draft of their weekly report against a checklist: numbers match the source, exceptions flagged, a person reviews before sending. The workflow is saved to the team library.',
    'Your rules, built into every exercise: which data, which tools, which uses, adapted to your policy.',
    'Step 4, Follow up, after training: we stay until the habits stick, with a follow-up session, office hours and adoption tracking. Formats: workshops, a leadership program of 4 to 6 weeks, and enablement of 6 to 12 weeks.',
    'Train one team. Then decide. Book a call at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    'Todos recibieron una cuenta de IA. Nadie les mostró qué hacer con ella. ¿La demo de dos horas? El lunes, olvidada.',
    'Aprende IA con tu propio trabajo. Trae una tarea real, como un reporte, una propuesta o una bandeja de entrada llena. Llévatela resuelta, y con un flujo que puedes repetir.',
    'Paso 1, Evaluar, 1 semana: partimos de las tareas reales de tu equipo, con una encuesta breve y algunas entrevistas.',
    'Paso 2, Adaptar, 1 a 2 semanas: un programa armado para cada rol, con ejercicios hechos con tus propios documentos. Por ejemplo, el recorrido de Operaciones: hojas de cálculo sin trabajo repetitivo, reportes que se arman solos, documentar cómo se hace el trabajo y tu primera automatización.',
    'Paso 3, Capacitar, de 1 día a 6 semanas: cada persona practica con su propia tarea, en vivo o presencial, en español o inglés. En el laboratorio, cada persona revisa un borrador de su reporte semanal hecho con IA contra una lista: las cifras coinciden con la fuente, las excepciones quedan marcadas, una persona revisa antes de enviar. El flujo queda guardado en la biblioteca del equipo.',
    'Tus reglas, dentro de cada ejercicio: qué datos, qué herramientas, qué usos, adaptadas a tu política.',
    'Paso 4, Acompañar, después de la formación: nos quedamos hasta que el hábito se instale, con una sesión de seguimiento, horario de consultas y medición de adopción. Formatos: talleres, un programa para líderes de 4 a 6 semanas y capacitación a medida de 6 a 12 semanas.',
    'Forma a un equipo. Después decides. Agenda una llamada en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* Unit-specific styles (scoped with ac- prefixes). */
const CSS = `
.ac-col { position: absolute; display: flex; flex-direction: column; }
.ac-mist { color: var(--mist) !important; }
.stage .chip { font-size: 15px; }
.stage .win__badge { font-size: 15px; }
.ac-badge-flame { color: var(--flame-400) !important; }
.ac-badge-muted { color: #8a7f78 !important; }

/* step header */
.ac-head { position: absolute; left: 120px; top: 150px; width: 1680px; display: flex; flex-direction: column; gap: 14px; }
.ac-head__k { display: flex; align-items: center; gap: 16px; font-family: var(--mono); font-size: 18px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--mist); }
.ac-head__k b { color: var(--flame-400); font-weight: 500; }
.ac-head__k i { width: 40px; height: 1px; background: var(--line-strong); display: block; }
.ac-head__sub { font-size: 30px; line-height: 1.3; color: var(--mist); margin-top: 2px; }

/* hook: calendar event */
.ac-event { width: 640px; padding: 28px 32px 30px 40px; position: absolute; overflow: hidden; display: grid; grid-template-columns: 84px 1fr; column-gap: 26px; align-items: start; }
.ac-event::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: var(--grad-flame); }
.ac-event__day { width: 84px; height: 84px; border-radius: 16px; background: var(--ink-700); border: 1px solid var(--line); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--mist); }
.ac-event__day span { font-family: var(--mono); font-size: 16px; letter-spacing: .14em; text-transform: uppercase; color: var(--flame-400); }
.ac-event__t { font-size: 30px; font-weight: 500; color: var(--bone); line-height: 1.25; }
.ac-event__m { font-family: var(--mono); font-size: 17px; letter-spacing: .06em; color: var(--smoke); margin-top: 10px; }
.ac-event__row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 20px; }
.ac-event__ppl { display: flex; }
.ac-event__ppl i { width: 34px; height: 34px; border-radius: 50%; background: var(--ink-600); border: 2px solid var(--ink-850); margin-left: -8px; display: block; }
.ac-event__ppl i:first-child { margin-left: 0; }

/* hook: empty assistant */
.ac-asst { display: grid; grid-template-columns: 250px 1fr; height: calc(100% - 58px); }
.ac-asst__side { border-right: 1px solid var(--line); padding: 26px 22px; display: flex; flex-direction: column; gap: 26px; background: rgb(255 255 255 / .012); }
.ac-asst__new { display: flex; align-items: center; gap: 12px; height: 50px; padding: 0 18px; border-radius: 12px; border: 1px solid var(--line-strong); font-size: 21px; color: var(--bone); }
.ac-asst__new svg { color: var(--smoke); }
.ac-asst__hist { display: flex; flex-direction: column; gap: 12px; }
.ac-asst__hist .mono { font-size: 15px; }
.ac-asst__none { font-size: 19px; color: var(--ink-500); color: #6e6662; }
.ac-asst__main { position: relative; }
.ac-asst__field { position: absolute; left: 44px; right: 44px; bottom: 40px; height: 76px; border-radius: 20px; border: 1px solid var(--line-strong); background: var(--ink-800); display: flex; align-items: center; padding: 0 14px 0 28px; gap: 14px; }
.ac-asst__ph { font-size: 25px; color: #6e6662; flex: 1; display: flex; align-items: center; }
.ac-asst__caret { display: inline-block; width: 2px; height: 30px; background: var(--flame-400); margin-right: 6px; }
.ac-asst__send { width: 48px; height: 48px; border-radius: 14px; background: var(--ink-600); display: grid; place-items: center; color: #6e6662; }

/* promise: task cards */
.ac-task { position: absolute; width: 540px; border-radius: 18px; background: #f4efe9; color: #1a1616; box-shadow: 0 40px 80px -30px rgb(0 0 0 / .85), 0 0 0 1px rgb(0 0 0 / .25); overflow: visible; }
.ac-task__bar { display: flex; align-items: center; gap: 14px; height: 64px; padding: 0 22px; border-bottom: 1px solid rgb(0 0 0 / .08); }
.ac-task__ic { width: 36px; height: 36px; border-radius: 10px; background: #e6ded5; display: grid; place-items: center; color: #6b625c; }
.ac-task__t { font-size: 23px; font-weight: 500; color: #1a1616; }
.ac-task__type { margin-left: auto; font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: #8a7f78; }
.ac-task__body { padding: 20px 22px 24px; height: 150px; }
.ac-sheet { display: grid; grid-template-columns: 1.6fr repeat(4, 1fr); border-top: 1px solid #ddd3ca; border-left: 1px solid #ddd3ca; }
.ac-sheet i { height: 26px; border-right: 1px solid #ddd3ca; border-bottom: 1px solid #ddd3ca; display: block; position: relative; }
.ac-sheet i.hd { background: #e9e2da; }
.ac-sheet i.v::after { content: ''; position: absolute; left: 8px; right: 30%; top: 10px; height: 6px; border-radius: 3px; background: #cfc5bb; }
.ac-lines { display: flex; flex-direction: column; gap: 14px; padding-top: 6px; }
.ac-lines i { height: 10px; border-radius: 5px; background: #ddd4ca; display: block; }
.ac-mrows { display: flex; flex-direction: column; gap: 14px; }
.ac-mrow { display: flex; align-items: center; gap: 14px; }
.ac-mrow b { width: 28px; height: 28px; border-radius: 50%; background: #ddd4ca; flex: none; }
.ac-mrow span { flex: 1; display: flex; flex-direction: column; gap: 7px; }
.ac-mrow span i { height: 8px; border-radius: 4px; background: #ddd4ca; display: block; }
.ac-done { position: absolute; bottom: -18px; right: 22px; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 999px; background: #1f3a2a; color: var(--ok); border: 1px solid rgb(122 209 155 / .5); font-family: var(--mono); font-size: 16px; letter-spacing: .06em; box-shadow: 0 10px 24px -8px rgb(0 0 0 / .6); }
.ac-saved { display: inline-flex; align-items: center; gap: 12px; font-family: var(--mono); font-size: 17px; letter-spacing: .12em; text-transform: uppercase; color: var(--mist); }
.ac-saved svg { color: var(--ok); }

/* assess: survey (paper) */
.ac-form { padding: 34px 40px 40px; display: flex; flex-direction: column; gap: 30px; color: #1a1616; }
.ac-field { display: flex; flex-direction: column; gap: 10px; }
.ac-field__l { font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: #8a7f78; }
.ac-input { height: 58px; border-radius: 12px; border: 1px solid #d9cfc6; background: #fbf8f5; display: flex; align-items: center; padding: 0 20px; font-size: 24px; color: #1a1616; }
.ac-input--area { height: 116px; align-items: flex-start; padding: 16px 20px; line-height: 1.4; border-color: #e09a5f; box-shadow: 0 0 0 3px rgb(245 131 39 / .14); }
.ac-input--area .search__caret { height: 1.05em; background: var(--flame-600, #e2540c); }
.ac-pchips { display: flex; gap: 10px; flex-wrap: wrap; }
.ac-pchip { display: inline-flex; align-items: center; gap: 10px; height: 44px; padding: 0 18px 0 14px; border-radius: 999px; border: 1px solid #d9cfc6; background: #fff; font-size: 20px; color: #1a1616; }
.ac-pchip svg { color: #c2560a; }

/* assess: inventory */
.ac-inv { position: absolute; padding: 28px 30px 18px; }
.ac-inv__hd { display: flex; align-items: baseline; justify-content: space-between; padding: 0 6px 18px; border-bottom: 1px solid var(--line-strong); }
.ac-inv__t { font-family: var(--display); font-weight: 500; font-size: 30px; letter-spacing: -0.03em; color: var(--bone); }
.ac-inv__row { position: relative; display: grid; grid-template-columns: 50px 1fr auto; align-items: center; gap: 14px; padding: 28px 16px; border-bottom: 1px solid var(--line); }
.ac-inv__row:last-child { border-bottom: 0; }
.ac-inv__n { font-family: var(--mono); font-size: 16px; color: var(--smoke); }
.ac-inv__x { font-size: 24px; color: var(--bone); line-height: 1.3; }
.ac-inv__sub { margin-top: 8px; }
.ac-inv__hi { position: absolute; inset: 4px 0; border-radius: 10px; background: rgb(245 131 39 / .08); box-shadow: inset 3px 0 0 var(--flame-500); }

/* tailor: role picker */
.ac-roles { position: absolute; display: flex; flex-direction: column; gap: 12px; }
.ac-roles .mono { font-size: 16px; margin-bottom: 6px; }
.ac-role { position: relative; display: flex; align-items: center; justify-content: space-between; height: 62px; padding: 0 22px; border-radius: 14px; border: 1px solid var(--line-strong); background: rgb(255 255 255 / .02); font-size: 23px; color: var(--mist); }
.ac-role__on { position: absolute; inset: -1px; border-radius: 14px; border: 1.5px solid var(--flame-500); background: rgb(245 131 39 / .1); opacity: 0; }
.ac-role__ic { position: relative; color: var(--flame-400); opacity: 0; }
.ac-role span { position: relative; }

/* tailor: modules */
.ac-mods .lessons { gap: 12px; }
.ac-mods .lesson { grid-template-columns: 74px 1fr auto; padding: 20px 26px; gap: 18px; align-items: start; }
.ac-mods .lesson__chk { display: none; }
.ac-mods .lesson__when { font-size: 18px; padding-top: 5px; }
.ac-mods .lesson__title { font-size: 26px; line-height: 1.3; }
.ac-mods .lesson__meta { font-size: 16px; padding-top: 6px; white-space: nowrap; }
.ac-lab { overflow: hidden; height: 0; }
.ac-lab__in { display: flex; gap: 14px; align-items: baseline; padding-top: 12px; }
.ac-lab__tag { flex: none; font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--flame-400); padding: 4px 9px; border-radius: 6px; border: 1px solid rgb(245 131 39 / .35); }
.ac-lab__t { font-size: 22px; color: var(--mist); line-height: 1.4; }
.ac-mods .lesson--open { border-color: rgb(245 131 39 / .4); }
.ac-modhd { display: flex; justify-content: space-between; margin-bottom: 16px; }
.ac-modhd .mono { font-size: 15px; }

/* practice: lab card */
.ac-labc { position: absolute; padding: 30px 32px 24px; display: flex; flex-direction: column; }
.ac-labc .ac-labc__l { margin-top: auto; }
.ac-labc__k { font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--flame-400); }
.ac-labc__t { font-size: 28px; font-weight: 500; line-height: 1.35; color: var(--bone); margin: 14px 0 26px; }
.ac-labc__l { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); padding-top: 22px; border-top: 1px solid var(--line-strong); margin-bottom: 8px; }
.ac-chk { display: flex; align-items: center; gap: 18px; padding: 15px 0; }
.ac-chk__b { position: relative; width: 32px; height: 32px; flex: none; border-radius: 8px; border: 2px solid var(--ink-500); display: grid; place-items: center; }
.ac-chk__fill { position: absolute; inset: -2px; border-radius: 8px; background: var(--flame-500); transform: scale(0); }
.ac-chk__b svg { position: relative; color: #1a0d03; opacity: 0; }
.ac-chk__t { font-size: 23px; color: var(--mist); line-height: 1.3; }

/* practice: draft doc */
.ac-doc .docp { padding: 36px 48px 30px; }
.ac-doc .docp__title { font-size: 38px; margin-bottom: 8px; }
.ac-doc .docp__p { font-size: 23px; line-height: 1.55; margin-bottom: 16px; }
.ac-doc .docp__kicker { margin-bottom: 14px; }
.ac-doc .docp__bar { height: 12px; margin-bottom: 14px; }
.ac-ai { display: inline-flex; align-items: center; gap: 8px; margin-left: 14px; padding: 3px 10px; border-radius: 6px; background: #e9e2da; color: #6b625c; letter-spacing: .08em; }
.ac-savechip { position: absolute; right: 28px; bottom: 26px; display: inline-flex; align-items: center; gap: 12px; height: 50px; padding: 0 20px 0 14px; border-radius: 12px; background: #1a1616; color: var(--bone); font-size: 20px; box-shadow: 0 18px 36px -14px rgb(0 0 0 / .6); }
.ac-savechip b { width: 28px; height: 28px; border-radius: 8px; background: rgb(122 209 155 / .16); color: var(--ok); display: grid; place-items: center; }

/* rules */
.ac-rules { padding: 34px 44px 30px; color: #1a1616; }
.ac-rules__hd { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 14px; }
.ac-rules__t { font-family: var(--display); font-weight: 500; font-size: 36px; letter-spacing: -0.035em; color: #141010; }
.ac-pol { display: inline-flex; align-items: center; gap: 9px; padding: 7px 13px; border-radius: 8px; border: 1px solid rgb(214 88 5 / .35); background: rgb(214 88 5 / .06); color: #b5530a; font-family: var(--mono); font-size: 15px; letter-spacing: .06em; white-space: nowrap; }
.ac-rule { position: relative; display: grid; grid-template-columns: 56px 1fr; gap: 22px; align-items: center; padding: 22px 10px; border-top: 1px solid rgb(0 0 0 / .08); }
.ac-rule__ic { width: 56px; height: 56px; border-radius: 14px; background: #e9e2da; color: #6b625c; display: grid; place-items: center; position: relative; }
.ac-rule__k { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #8a7f78; }
.ac-rule__x { font-size: 26px; color: #1a1616; line-height: 1.3; margin-top: 4px; }
.ac-rule__hi { position: absolute; inset: 6px -10px; border-radius: 12px; background: rgb(245 131 39 / .1); box-shadow: inset 3px 0 0 #e2540c; opacity: 0; }
.ac-rule > *:not(.ac-rule__hi) { position: relative; }
.ac-mini { position: absolute; padding: 26px 28px; }
.ac-mini .ac-labc__t { font-size: 23px; margin: 12px 0 22px; }
.ac-pin { display: flex; gap: 14px; align-items: flex-start; padding: 16px 18px; border-radius: 12px; background: rgb(245 131 39 / .08); border: 1px solid rgb(245 131 39 / .4); margin-top: 6px; }
.ac-pin svg { flex: none; color: var(--flame-400); margin-top: 3px; }
.ac-slot { position: relative; margin-top: 6px; border-radius: 12px; border: 1.5px dashed var(--line-strong); }
.ac-slot .ac-pin { margin-top: 0; }
.ac-pin span { font-size: 20px; color: var(--bone); line-height: 1.35; }
.ac-doc .mark { white-space: nowrap; }
.ac-mchk { display: flex; align-items: center; gap: 12px; padding: 7px 0; font-size: 19px; color: var(--mist); }
.ac-mchk b { width: 22px; height: 22px; border-radius: 6px; background: var(--flame-500); color: #1a0d03; display: grid; place-items: center; flex: none; }
.ac-mini .ac-labc__l { padding-top: 18px; margin-top: 4px; }

/* follow up */
.ac-steps .step__label { font-size: 38px; }
.ac-steps .step__sub { font-family: var(--mono); font-size: 16px; letter-spacing: .1em; text-transform: uppercase; }
.ac-delivs { position: absolute; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.ac-deliv { display: flex; align-items: center; gap: 16px; padding: 20px 22px; }
.ac-deliv__ic { width: 48px; height: 48px; flex: none; border-radius: 12px; display: grid; place-items: center; background: rgb(245 131 39 / .1); color: var(--flame-400); border: 1px solid rgb(245 131 39 / .3); }
.ac-deliv__t { font-size: 23px; font-weight: 500; color: var(--bone); line-height: 1.25; }
.ac-formats { position: absolute; display: flex; align-items: center; gap: 18px; font-family: var(--mono); font-size: 17px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.ac-formats i { width: 5px; height: 5px; border-radius: 5px; background: var(--ink-500); display: block; }
`;

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const es = lang === 'es';
  const { h, place } = lib;
  const tl = gsap.timeline({ paused: true });
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  const { glow } = lib.setup(stage, { glow: { x: 1500, y: 880, size: 1000 } });
  const hud = lib.hud(stage, { ix: '04', unit: c.unit });
  hud.in(tl, 0.2);

  /** Step header: mono kicker (with optional number), one line headline, mist sub line. */
  const stepHead = (ix, kicker, title, sub) => {
    const el = h('div', 'ac-head');
    const k = h('div', 'ac-head__k', `${ix ? `<b>${ix}</b><i></i>` : ''}${kicker}`);
    const hl = lib.headline(title, { size: 'sm', maxWidth: 1680 });
    const s = h('div', 'ac-head__sub', sub);
    el.append(k, hl.el, s);
    return {
      el,
      in(at) { lib.fadeUp(tl, k, at, { y: 10, dur: 0.6 }); hl.in(tl, at + 0.1); },
      sub(at) { lib.fadeUp(tl, s, at, { y: 14, dur: 0.7 }); },
    };
  };
  /** Small check box used by the lab checklist. */
  const checkBox = () => {
    const b = h('div', 'ac-chk__b');
    const fill = h('span', 'ac-chk__fill');
    const ic = lib.icon('check', { size: 18, stroke: 3 });
    b.append(fill, ic);
    return { b, fill, ic };
  };
  const tick = (cb, at) => {
    tl.to(cb.fill, { scale: 1, duration: 0.35, ease: 'back.out(2)' }, at);
    tl.to(cb.ic, { opacity: 1, duration: 0.2 }, at + 0.12);
    tl.to(cb.b, { borderColor: 'rgba(245,131,39,1)', duration: 0.2 }, at);
  };

  /* ============ 0 to 9: hook ============ */
  const L1 = lib.layer(stage, { visible: true });
  const ev = place(h('div', 'card ac-event'), { x: 120, y: 330 });
  const day = h('div', 'ac-event__day');
  day.append(h('span', null, c.evDay), lib.icon('calendar', { size: 28 }));
  const evBody = h('div');
  const evRow = h('div', 'ac-event__row');
  const ppl = h('div', 'ac-event__ppl', '<i></i><i></i><i></i><i></i><i></i>');
  const evDone = h('span', 'chip chip--ok', c.evDone);
  evRow.append(ppl, evDone);
  evBody.append(h('div', 'ac-event__t', c.evTitle), h('div', 'ac-event__m', c.evMeta), evRow);
  ev.append(day, evBody);
  L1.append(ev);
  lib.fadeUp(tl, ev, 0.4, { y: 30, dur: 1.0 });
  lib.fadeUp(tl, evDone, 1.4, { y: 6, dur: 0.5 });

  const aw = lib.win({ title: c.asst, badge: c.monday, x: 820, y: 180, w: 980, h: 520, bodyPad: 0 });
  aw.bar.querySelector('.win__badge').classList.add('ac-badge-flame');
  const asst = h('div', 'ac-asst');
  const side = h('div', 'ac-asst__side');
  const nb = h('div', 'ac-asst__new'); nb.append(lib.icon('pen', { size: 20 }), document.createTextNode(c.newChat));
  const hist = h('div', 'ac-asst__hist');
  hist.append(h('div', 'mono', c.history), h('div', 'ac-asst__none', c.noChats));
  side.append(nb, hist);
  const main = h('div', 'ac-asst__main');
  const field = h('div', 'ac-asst__field');
  const ph = h('div', 'ac-asst__ph'); ph.append(h('span', 'ac-asst__caret'), document.createTextNode(c.ask));
  const send = h('div', 'ac-asst__send'); send.append(lib.icon('arrow', { size: 22 }));
  field.append(ph, send);
  main.append(field);
  asst.append(side, main);
  aw.body.remove();
  aw.el.append(asst);
  L1.append(aw.el);
  tl.to(ev, { x: -60, opacity: 0.4, duration: 0.9, ease: 'power3.inOut' }, 3.0);
  aw.in(tl, 3.2);

  const hkBox = place(h('div', 'ac-col'), { x: 120, y: 770, w: 1680 });
  hkBox.style.gap = '14px';
  const hk1 = lib.headline(c.hook1, { size: 'md', maxWidth: 1680 });
  const hk2 = h('div', 'ac-head__sub', c.hook2); hk2.style.fontSize = '40px'; hk2.style.fontWeight = '500';
  hkBox.append(hk1.el, hk2);
  const hk3Box = place(h('div', 'ac-col'), { x: 120, y: 760, w: 1680 });
  const hk3 = lib.headline(c.hook3, { size: 'md', maxWidth: 1680 });
  hk3Box.append(hk3.el);
  L1.append(hkBox, hk3Box);
  hk1.in(tl, 0.8);
  lib.fadeUp(tl, hk2, 3.4, { y: 16, dur: 0.8 });
  hk1.out(tl, 5.6);
  lib.fadeOut(tl, hk2, 5.6, { y: -10, dur: 0.45 });
  hk3.in(tl, 6.0);
  lib.hide(tl, L1, 8.5, { dur: 0.5, y: -12 });

  /* ============ 9 to 17: promise (poster) ============ */
  const L2 = lib.layer(stage);
  lib.show(tl, L2, 9.0, { dur: 0.01 });
  const pCol = place(h('div', 'ac-col'), { x: 120, y: es ? 330 : 290, w: 1000 });
  const eb = lib.eyebrow({ ix: '04', text: c.unit });
  const heroHl = lib.headline(c.hero, { size: es ? 'md' : 'lg', maxWidth: 1040 });
  // a touch smaller than the scale so the poster center (play button) stays clear
  heroHl.el.style.fontSize = es ? '72px' : '84px';
  heroHl.el.style.marginTop = '40px';
  const ld1 = h('p', 'lede', c.lede1); ld1.style.fontSize = '32px'; ld1.style.marginTop = '48px'; ld1.style.color = 'var(--bone)';
  const ld2 = h('p', 'lede', c.lede2); ld2.style.fontSize = '32px'; ld2.style.marginTop = '8px';
  pCol.append(eb, heroHl.el, ld1, ld2);
  L2.append(pCol);
  lib.fadeUp(tl, eb, 9.2, { y: 12, dur: 0.7 });
  heroHl.in(tl, 9.4, { stagger: 0.8 });
  lib.fadeUp(tl, ld1, 11.6, { y: 16, dur: 0.8 });
  lib.fadeUp(tl, ld2, 13.0, { y: 16, dur: 0.8 });

  const mkTask = ([title, type], kind) => {
    const card = h('div', 'ac-task');
    const bar = h('div', 'ac-task__bar');
    const ic = h('div', 'ac-task__ic'); ic.append(lib.icon(kind === 'sheet' ? 'chart' : kind === 'doc' ? 'doc' : 'inbox', { size: 20 }));
    bar.append(ic, h('div', 'ac-task__t', title), h('div', 'ac-task__type', type));
    const body = h('div', 'ac-task__body');
    if (kind === 'sheet') {
      const g = h('div', 'ac-sheet');
      for (let r = 0; r < 5; r++) for (let k = 0; k < 5; k++) g.append(h('i', r === 0 ? 'hd' : (k === 0 || (r + k) % 3 !== 0) ? 'v' : null));
      body.append(g);
    } else if (kind === 'doc') {
      const ls = h('div', 'ac-lines');
      [0.55, 0.95, 0.88, 0.92, 0.6].forEach((w, i) => { const l = h('i'); l.style.width = w * 100 + '%'; if (!i) { l.style.height = '14px'; l.style.background = '#cfc5bb'; } ls.append(l); });
      body.append(ls);
    } else {
      const rs = h('div', 'ac-mrows');
      [[0.5, 0.85], [0.4, 0.7], [0.55, 0.8]].forEach(([a, b]) => {
        const r = h('div', 'ac-mrow'); const s = h('span');
        const i1 = h('i'); i1.style.width = a * 100 + '%'; i1.style.background = '#cfc5bb';
        const i2 = h('i'); i2.style.width = b * 100 + '%';
        s.append(i1, i2); r.append(h('b'), s); rs.append(r);
      });
      body.append(rs);
    }
    card.append(bar, body);
    return card;
  };
  // back to front: inbox, proposal, report
  const tInbox = place(mkTask(c.tasks[2], 'mail'), { x: 1262, y: 236 });
  const tProp = place(mkTask(c.tasks[1], 'doc'), { x: 1236, y: 400 });
  const tRep = place(mkTask(c.tasks[0], 'sheet'), { x: 1250, y: 566 });
  gsap.set(tInbox, { rotation: 1.6 }); gsap.set(tProp, { rotation: -1.2 }); gsap.set(tRep, { rotation: 0.4 });
  const done = h('span', 'ac-done'); done.append(lib.icon('check', { size: 18, stroke: 2.6 }), document.createTextNode(c.taskDone));
  tRep.append(done);
  const saved = place(h('div', 'ac-saved'), { x: 1262, y: 862 });
  saved.append(lib.icon('check', { size: 20, stroke: 2.4 }), document.createTextNode(c.wfSaved));
  L2.append(tInbox, tProp, tRep, saved);
  [tInbox, tProp, tRep].forEach((t, i) => tl.fromTo(t, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 10.6 + i * 0.3));
  lib.popIn(tl, done, 14.0, { scale: 0.85, dur: 0.6 });
  lib.fadeUp(tl, saved, 14.4, { y: 10, dur: 0.6 });
  tl.addLabel('poster', 15.6);
  lib.hide(tl, L2, 16.5, { dur: 0.5, y: -14 });

  /* ============ 17 to 25: step 1, assess ============ */
  const L3 = lib.layer(stage);
  lib.show(tl, L3, 17.0, { dur: 0.01 });
  const sh1 = stepHead('01', c.s1k, c.s1, c.s1b);
  L3.append(sh1.el);
  sh1.in(17.1);
  sh1.sub(18.6);

  const sv = lib.win({ title: c.survey, badge: c.surveyBadge, paper: true, x: 120, y: 360, w: 880, bodyPad: 0 });
  sv.bar.querySelector('.win__badge').classList.add('ac-badge-muted');
  const form = h('div', 'ac-form');
  const fld = (label, content) => { const f = h('div', 'ac-field'); f.append(h('div', 'ac-field__l', label), content); form.append(f); return f; };
  const f1 = fld(c.fRole, h('div', 'ac-input', c.vRole));
  const chipsBox = h('div', 'ac-pchips');
  const toolChips = c.vTools.map((t) => { const ch = h('span', 'ac-pchip'); ch.append(lib.icon('check', { size: 16, stroke: 2.6 }), document.createTextNode(t)); chipsBox.append(ch); return ch; });
  const f2 = fld(c.fTools, chipsBox);
  const area = h('div', 'ac-input ac-input--area');
  const areaTxt = h('span');
  area.append(areaTxt);
  const f3 = fld(c.fTasks, area);
  sv.body.append(form);
  L3.append(sv.el);
  sv.in(tl, 17.6);
  lib.fadeUp(tl, [f1, f2, f3], 17.9, { y: 14, dur: 0.6, stagger: 0.12 });
  lib.popIn(tl, toolChips, 18.3, { scale: 0.9, dur: 0.5, stagger: 0.1 });
  lib.typeText(tl, areaTxt, c.vTasks, 19.0, { cps: 28, caret: true });

  const inv = place(h('div', 'card ac-inv'), { x: 1060, y: 360, w: 740 });
  const invHd = h('div', 'ac-inv__hd');
  invHd.append(h('div', 'ac-inv__t', c.inv), h('div', 'mono mono--sm', c.invMeta));
  inv.append(invHd);
  const invRows = c.invRows.map(([t, f], i) => {
    const r = h('div', 'ac-inv__row');
    const hi = i === 0 ? h('div', 'ac-inv__hi') : null;
    if (hi) r.append(hi);
    const txt = h('div');
    txt.append(h('div', 'ac-inv__x', t));
    if (i === 0) { const sc = h('div', 'ac-inv__sub'); sc.append(h('span', 'chip chip--flame', c.fromSurvey)); txt.append(sc); }
    r.append(h('div', 'ac-inv__n', String(i + 1).padStart(2, '0')), txt, h('span', 'chip', f));
    [...r.children].forEach((n) => { if (n !== hi) n.style.position = 'relative'; });
    inv.append(r);
    return { r, hi };
  });
  L3.append(inv);
  lib.fadeUp(tl, inv, 20.6, { y: 30, dur: 0.9 });
  lib.fadeUp(tl, invRows.map((x) => x.r), 21.0, { y: 14, dur: 0.6, stagger: 0.4 });
  tl.fromTo(invRows[0].hi, { opacity: 0, scaleX: 0.96 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: '0 50%' }, 21.3);
  lib.hide(tl, L3, 24.6, { dur: 0.5, y: -14 });

  /* ============ 25 to 34: step 2, tailor ============ */
  const L4 = lib.layer(stage);
  lib.show(tl, L4, 25.0, { dur: 0.01 });
  const sh2 = stepHead('02', c.s2k, c.s2, c.s2b);
  L4.append(sh2.el);
  sh2.in(25.1);
  sh2.sub(28.6);

  const roles = place(h('div', 'ac-roles'), { x: 1330, y: 360, w: 470 });
  roles.append(h('div', 'mono', c.rolesLabel));
  const roleEls = c.roles.map((r) => {
    const d = h('div', 'ac-role');
    const on = h('div', 'ac-role__on');
    const ic = lib.icon('check', { size: 20, stroke: 2.6, cls: 'ac-role__ic' });
    d.append(on, h('span', null, r), ic);
    roles.append(d);
    return { d, on, ic };
  });
  L4.append(roles);
  lib.fadeUp(tl, [roles.firstChild, ...roleEls.map((x) => x.d)], 25.3, { y: 14, dur: 0.6, stagger: 0.06 });
  const opsRole = roleEls[3];
  const cur = lib.cursor(stage, { x: 1660, y: 990 });
  cur.in(tl, 25.6);
  cur.moveTo(tl, 25.6, opsRole.d, { dur: 0.8, dx: -40, dy: 6 });
  cur.click(tl, 26.5, opsRole.d);
  tl.to(opsRole.on, { opacity: 1, duration: 0.3 }, 26.55);
  tl.to(opsRole.ic, { opacity: 1, duration: 0.3 }, 26.6);
  tl.to(opsRole.d, { color: '#f4efe9', duration: 0.3 }, 26.55);
  cur.moveTo(tl, 27.0, { x: 1720, y: 960 }, { dur: 0.9 });
  cur.out(tl, 27.6);

  const cw = lib.win({ title: c.curr, badge: c.sample, x: 120, y: 340, w: 1130 });
  cw.bar.querySelector('.win__badge').classList.add('ac-badge-flame');
  cw.body.style.padding = '24px 28px 28px';
  cw.el.classList.add('ac-mods');
  const modHd = h('div', 'ac-modhd');
  modHd.append(h('div', 'mono', c.modulesLabel));
  const ls = lib.lessons({ items: c.modules.map(([title, meta], i) => ({ when: 'M' + (i + 1), title, meta })) });
  // lab line under M2 (collapsed until it opens)
  const m2 = ls.rows[1].el;
  const lab = h('div', 'ac-lab');
  const labIn = h('div', 'ac-lab__in');
  labIn.append(h('span', 'ac-lab__tag', c.labTag), h('span', 'ac-lab__t', c.labText));
  lab.append(labIn);
  const m2Title = m2.querySelector('.lesson__title');
  const tWrap = h('div');
  m2Title.replaceWith(tWrap);
  tWrap.append(m2Title, lab);
  cw.body.append(modHd, ls.el);
  L4.append(cw.el);
  cw.in(tl, 26.8);
  lib.fadeUp(tl, modHd, 27.1, { y: 8, dur: 0.5 });
  ls.in(tl, 27.2, { stagger: 0.25 });
  const labH = labIn.scrollHeight || 80;
  tl.to(lab, { height: labH, duration: 0.8, ease: 'power3.inOut' }, 29.2);
  tl.fromTo(labIn, { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 29.5);
  tl.to(m2, { borderColor: 'rgba(245,131,39,0.4)', duration: 0.5 }, 29.2);
  lib.hide(tl, L4, 33.6, { dur: 0.5, y: -14 });

  /* ============ 34 to 44: step 3, practice ============ */
  const L5 = lib.layer(stage);
  lib.show(tl, L5, 34.0, { dur: 0.01 });
  const sh3 = stepHead('03', c.s3k, c.s3, c.s3b);
  L5.append(sh3.el);
  sh3.in(34.1);
  sh3.sub(38.6);

  const lc = place(h('div', 'card ac-labc'), { x: 120, y: 350, w: 600, h: 540 });
  lc.append(h('div', 'ac-labc__k', c.labCard), h('div', 'ac-labc__t', c.labText), h('div', 'ac-labc__l', c.checkLabel));
  const cbs = c.checks.map((t) => {
    const row = h('div', 'ac-chk');
    const cb = checkBox();
    const tx = h('div', 'ac-chk__t', t);
    row.append(cb.b, tx);
    lc.append(row);
    return { ...cb, row, tx };
  });
  L5.append(lc);

  const dw = lib.win({ title: c.docWin, paper: true, x: 790, y: 350, w: 1010, h: 540, bodyPad: 0 });
  dw.el.classList.add('ac-doc');
  const dp = lib.docPage({ kicker: c.docKicker, title: c.docTitle, blocks: [{ h: c.docH }, { p: c.docP1 }, { p: c.docP2 }, { h: c.docH2 }, { bar: 0.92 }, { bar: 0.64 }] });
  const kick = dp.el.querySelector('.docp__kicker');
  kick.append(h('span', 'ac-ai', lang === 'es' ? 'IA' : 'AI'));
  dp.el.querySelectorAll('.docp__kicker')[1].style.marginTop = '22px';
  dp.el.querySelectorAll('.docp__kicker')[2].style.marginTop = '10px';
  dw.body.append(dp.el);
  const saveChip = h('div', 'ac-savechip');
  const sb = h('b'); sb.append(lib.icon('check', { size: 16, stroke: 2.8 }));
  saveChip.append(sb, document.createTextNode(c.saved));
  dw.el.append(saveChip);
  L5.append(dw.el);

  lib.fadeUp(tl, lc, 34.6, { y: 30, dur: 0.9 });
  dw.in(tl, 34.9);
  dp.in(tl, 35.3);
  const cur2 = lib.cursor(stage, { x: 1500, y: 960 });
  cur2.in(tl, 36.2);
  // the cursor rests at the end of each phrase as it gets marked
  const mk = dp.el.querySelectorAll('.mark');
  cur2.moveTo(tl, 36.2, mk[0], { dur: 0.8, dx: 40, dy: 14 });
  dp.mark(tl, 37.0, 0);
  tick(cbs[0], 37.5);
  cur2.moveTo(tl, 37.4, mk[1], { dur: 0.7, dx: 60, dy: 14 });
  dp.mark(tl, 38.1, 1);
  tick(cbs[1], 38.6);
  cur2.moveTo(tl, 38.6, cbs[2].b, { dur: 0.9, dx: 4, dy: 4 });
  cur2.click(tl, 39.6, cbs[2].b);
  tick(cbs[2], 39.6);
  tl.to(cbs.map((x) => x.tx), { color: '#f4efe9', duration: 0.4, stagger: 1.0 }, 37.5);
  cur2.moveTo(tl, 39.9, { x: 900, y: 960 }, { dur: 0.9 });
  cur2.out(tl, 40.4);
  lib.popIn(tl, saveChip, 40.6, { scale: 0.9, dur: 0.7 });
  lib.hide(tl, L5, 43.6, { dur: 0.5, y: -14 });

  /* ============ 44 to 52: usage rules ============ */
  const L6 = lib.layer(stage);
  lib.show(tl, L6, 44.0, { dur: 0.01 });
  const sh4 = stepHead(null, c.s4k, c.s4, c.s4b);
  L6.append(sh4.el);
  sh4.in(44.1);
  sh4.sub(48.0);

  const rw = lib.win({ title: c.rulesWin, paper: true, x: 690, y: 350, w: 1110, bodyPad: 0 });
  const rb = h('div', 'ac-rules');
  const rhd = h('div', 'ac-rules__hd');
  const pol = h('span', 'ac-pol'); pol.append(lib.icon('shield', { size: 18 }), document.createTextNode(c.adapted));
  rhd.append(h('div', 'ac-rules__t', c.rulesTitle), pol);
  rb.append(rhd);
  const ruleIcons = ['check', 'lock', 'user'];
  const ruleEls = c.rules.map(([k, t], i) => {
    const r = h('div', 'ac-rule');
    const hi = h('div', 'ac-rule__hi');
    const ic = h('div', 'ac-rule__ic'); ic.append(lib.icon(ruleIcons[i], { size: 26 }));
    const tx = h('div'); tx.append(h('div', 'ac-rule__k', k), h('div', 'ac-rule__x', t));
    r.append(hi, ic, tx);
    rb.append(r);
    return { r, hi };
  });
  rw.body.append(rb);
  L6.append(rw.el);

  const mini = place(h('div', 'card ac-mini'), { x: 120, y: 350, w: 520 });
  const pin = h('div', 'ac-pin');
  pin.append(lib.icon('lock', { size: 22 }), h('span', null, c.rules[1][1]));
  const slot = h('div', 'ac-slot'); slot.append(pin);
  const mchk = h('div'); mchk.style.marginBottom = '18px';
  c.checks.forEach((t) => { const r = h('div', 'ac-mchk'); const b = h('b'); b.append(lib.icon('check', { size: 14, stroke: 3 })); r.append(b, h('span', null, t)); mchk.append(r); });
  mini.append(h('div', 'ac-labc__k', c.labCard), h('div', 'ac-labc__t', c.labText), h('div', 'ac-labc__l', c.checkLabel), mchk, h('div', 'ac-labc__l', c.inLab), slot);
  L6.append(mini);

  lib.fadeUp(tl, mini, 44.5, { y: 24, dur: 0.9 });
  rw.in(tl, 44.6);
  lib.fadeUp(tl, rhd, 44.9, { y: 10, dur: 0.6 });
  lib.fadeUp(tl, ruleEls.map((x) => x.r), 45.2, { y: 14, dur: 0.6, stagger: 0.5 });
  tl.to(ruleEls[1].hi, { opacity: 1, duration: 0.4 }, 47.0);
  tl.fromTo(pin, { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: 'expo.out' }, 47.5);
  tl.to(slot, { borderColor: 'rgba(255,255,255,0)', duration: 0.4 }, 47.7);
  lib.hide(tl, L6, 51.6, { dur: 0.5, y: -14 });

  /* ============ 52 to 60: follow up ============ */
  const L7 = lib.layer(stage);
  lib.show(tl, L7, 52.0, { dur: 0.01 });
  const sh5 = stepHead('04', c.s5k, c.s5, c.s5b);
  L7.append(sh5.el);
  sh5.in(52.1);
  sh5.sub(55.4);

  const st = lib.steps({ items: c.steps.map(([label, sub]) => ({ label, sub })), x: 120, y: 440, w: 1680, gap: 36 });
  st.el.classList.add('ac-steps');
  L7.append(st.el);
  st.in(tl, 52.4);
  [0, 1, 2, 3].forEach((i) => st.go(tl, 52.9 + i * 0.5, i, { dur: 0.6 }));
  tl.to(st.steps[3].lab, { color: '#ff8442', duration: 0.5 }, 54.6);

  const dv = place(h('div', 'ac-delivs'), { x: 120, y: 690, w: 1680 });
  const dEls = c.delivs.map(([ic, t]) => {
    const d = h('div', 'card ac-deliv');
    const i = h('div', 'ac-deliv__ic'); i.append(lib.icon(ic, { size: 24 }));
    d.append(i, h('div', 'ac-deliv__t', t));
    dv.append(d);
    return d;
  });
  L7.append(dv);
  lib.fadeUp(tl, dEls, 54.6, { y: 18, dur: 0.7, stagger: 0.25 });
  const fm = place(h('div', 'ac-formats'), { x: 120, y: 830 });
  c.formats.forEach((t, i) => { if (i) fm.append(h('i')); fm.append(h('span', null, t)); });
  L7.append(fm);
  lib.fadeUp(tl, fm, 56.2, { y: 10, dur: 0.7 });
  hud.chrome(tl, 59.5, false);
  lib.hide(tl, L7, 59.5, { dur: 0.5, y: -14 });

  /* ============ 60 to 66: CTA ============ */
  const L8 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.cta });
  L8.append(cta.el);
  lib.show(tl, L8, 60.0, { dur: 0.01 });
  cta.in(tl, 60.2);
  tl.set({}, {}, 66);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
