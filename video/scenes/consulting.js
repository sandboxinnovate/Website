// Consulting explainer. Storyboard: video/storyboards/consulting.json
// Story: fifty ideas and no plan, then the engagement as four steps (interview, prioritize, implement, lead)
// shown through Consulting-only mockups: interview notes + process map, a ranked table, a 90-day Gantt,
// an orders inbox in production and a monthly review agenda. Copy comes from src/i18n/units/consulting.ts
// and src/components/unit/visuals/copy.ts. Every number on screen is an example UI state.

export const meta = {
  title: { en: 'How a Consulting engagement works', es: 'Cómo funciona un proyecto de Consultoría' },
};

export const copy = {
  en: {
    unit: 'Consulting',
    ideasFile: 'ai-ideas.txt', unsorted: 'unsorted',
    ideas: ['Chatbot for the website', 'Summarize contracts', 'Read order emails', 'Draft the weekly report', 'Triage support tickets', 'Write proposals faster', 'Translate the help center', 'Clean the CRM', 'Forecast demand'],
    hook1: 'Fifty AI ideas.', hook2: 'No way to tell which ones matter.',
    painsTitle: 'Plenty of AI ideas.<br><em>No plan.</em>',
    painsLede: 'Short on a plan, an owner and hands.',
    pains: [['Tools', 'Personal accounts, no rules'], ['Pilots', 'A pilot that died after the demo'], ['Ownership', 'A strategy nobody owns']],
    heroTitle: 'Find where AI pays off.<br><em>Then make it happen.</em>',
    offers: ['Audit 2-3 wk', 'Sprint 4-8 wk', 'Head of AI monthly'],
    steps: [['Interview', 'Week 1'], ['Prioritize', 'Weeks 2-3'], ['Implement', 'Weeks 4-11'], ['Lead', 'Ongoing']],
    notesFile: 'interview-notes / ops', notesKicker: 'Interview 4 of 9', notesTitle: 'Order desk',
    notes: ['Orders arrive by email and spreadsheet.', '<mark>Every order is typed into the ERP by hand.</mark>', 'Exceptions are handled by whoever sees them.'],
    mapFile: 'process-map', draft: 'draft',
    nodes: ['Customer email', 'Spreadsheet', 'Order desk', 'ERP', 'Invoice'],
    retyped: 'Retyped by hand',
    capWeek1: 'Week 1', cap1: 'Interviews across teams.<br><em>We map how work actually flows.</em>',
    tableFile: 'opportunities / ranked', reviewed: '9 reviewed',
    cols: ['#', 'Opportunity', 'Return', 'Effort', 'Risk', 'Status'],
    lvl: { H: 'High', M: 'Med', L: 'Low' },
    opps: ['Chatbot for the website', 'Summarize contracts', 'Read order emails into the ERP', 'Draft the weekly report', 'Triage support tickets', 'Forecast demand'],
    scoped: 'Scoped', later: 'Later', example: 'example',
    rank1: 'Weeks 2 to 3:<br>every idea, ranked.', rank2: 'By return, effort and risk.', rank3: 'The first three projects <em>scoped.</em>',
    ganttFile: 'roadmap / 90 days', readout: 'readout',
    phases: ['Audit', 'Sprint', 'Ongoing'], week: 'W', today: 'Today',
    rows: ['Interviews', 'Process map', 'Ranked opportunities', 'Tools + usage policy', 'Automate: order intake', 'Automate: weekly report', 'Team training', 'Head of AI, monthly'],
    milestone: 'Roadmap',
    roadKicker: 'Audit deliverable', road1: 'A 90-day roadmap', road2: 'your leadership can read.',
    legend: ['Audit', 'Sprint', 'Ongoing', 'Milestone'],
    ordersFile: 'orders inbox', live: 'live',
    orders: [
      ['Purchasing, North branch', 'PN', 'PO attached', '08:12'],
      ['Buyer, retail account', 'BR', 'Reorder, same as last month', '08:47'],
      ['Purchasing, East branch', 'PE', 'Order sheet for next week', '09:05'],
      ['Ops, wholesale account', 'OW', 'Urgent: quantities changed', '09:31'],
    ],
    inErp: 'Read · validated · in ERP', exception: 'Exception → to a person',
    sprintKicker: 'Also in the sprint',
    sprint: ['Approved tools and access', 'AI usage policy and data rules', 'Role-based training'],
    baseLabel: 'Before / after', baseText: 'Measured against the baseline',
    capSprint: 'Implementation sprint · 4-8 weeks',
    capImpl: 'Then we roll it out: <em>2 or 3 processes automated end to end.</em>',
    capImpl2: 'Exceptions go to a person.',
    reviewFile: 'monthly review', reviewKicker: 'Head of AI · monthly', reviewTitle: 'Monthly review',
    agenda: ['Roadmap and priorities', 'Vendor and tool evaluation', 'Active AI projects', 'Policy and risk updates', 'Office hours for the team'],
    quarterly: 'Quarterly report to leadership', next: 'Next',
    lead1: 'Then, as your fractional Head of AI.', lead2: 'Each step leaves something you can use.',
    close: 'Start with <em>a clear picture.</em>',
  },
  es: {
    unit: 'Consultoría',
    ideasFile: 'ideas-ia.txt', unsorted: 'sin ordenar',
    ideas: ['Chatbot para el sitio web', 'Resumir contratos', 'Leer pedidos por correo', 'Redactar el reporte semanal', 'Clasificar tickets de soporte', 'Escribir propuestas más rápido', 'Traducir el centro de ayuda', 'Limpiar el CRM', 'Pronosticar demanda'],
    hook1: 'Cincuenta ideas de IA.', hook2: 'Ninguna forma de saber cuáles importan.',
    painsTitle: 'Muchas ideas de IA.<br><em>Ningún plan.</em>',
    painsLede: 'Falta un plan, un responsable y manos.',
    pains: [['Herramientas', 'Cuentas personales, sin reglas'], ['Pilotos', 'Un piloto que murió después de la demo'], ['Responsable', 'Una estrategia sin responsable']],
    heroTitle: 'Encuentra dónde rinde la IA.<br><em>Y hazlo realidad.</em>',
    offers: ['Auditoría 2-3 sem', 'Sprint 4-8 sem', 'Head of AI mensual'],
    steps: [['Entrevistar', 'Semana 1'], ['Priorizar', 'Semanas 2-3'], ['Implementar', 'Semanas 4-11'], ['Liderar', 'Continuo']],
    notesFile: 'notas-entrevista / operaciones', notesKicker: 'Entrevista 4 de 9', notesTitle: 'Mesa de pedidos',
    notes: ['Los pedidos llegan por correo y hoja de cálculo.', '<mark>Cada pedido se carga a mano en el ERP.</mark>', 'Las excepciones las resuelve quien las ve.'],
    mapFile: 'mapa-de-procesos', draft: 'borrador',
    nodes: ['Correo del cliente', 'Hoja de cálculo', 'Mesa de pedidos', 'ERP', 'Factura'],
    retyped: 'Se carga a mano',
    capWeek1: 'Semana 1', cap1: 'Entrevistas con los equipos.<br><em>Mapeamos cómo fluye de verdad el trabajo.</em>',
    tableFile: 'oportunidades / priorizadas', reviewed: '9 revisadas',
    cols: ['#', 'Oportunidad', 'Retorno', 'Esfuerzo', 'Riesgo', 'Estado'],
    lvl: { H: 'Alto', M: 'Medio', L: 'Bajo' },
    opps: ['Chatbot para el sitio web', 'Resumir contratos', 'Cargar pedidos del correo al ERP', 'Redactar el reporte semanal', 'Clasificar tickets de soporte', 'Pronosticar demanda'],
    scoped: 'Definido', later: 'Después', example: 'ejemplo',
    rank1: 'Semanas 2 a 3:<br>cada idea, priorizada.', rank2: 'Por retorno, esfuerzo y riesgo.', rank3: 'Los tres primeros proyectos, <em>definidos.</em>',
    ganttFile: 'hoja de ruta / 90 días', readout: 'presentación',
    phases: ['Auditoría', 'Sprint', 'Continuo'], week: 'S', today: 'Hoy',
    rows: ['Entrevistas', 'Mapa de procesos', 'Oportunidades priorizadas', 'Herramientas + política', 'Automatizar: pedidos', 'Automatizar: reporte', 'Capacitación del equipo', 'Head of AI, mensual'],
    milestone: 'Hoja de ruta',
    roadKicker: 'Entregable de la auditoría', road1: 'Una hoja de ruta<br>a 90 días', road2: 'que tu dirección puede leer.',
    legend: ['Auditoría', 'Sprint', 'Continuo', 'Hito'],
    ordersFile: 'pedidos', live: 'en marcha',
    orders: [
      ['Compras, sucursal Norte', 'CN', 'Adjunto orden de compra', '08:12'],
      ['Comprador, cuenta minorista', 'CM', 'Repetir pedido del mes pasado', '08:47'],
      ['Compras, sucursal Este', 'CE', 'Hoja de pedido para la próxima semana', '09:05'],
      ['Operaciones, cuenta mayorista', 'OM', 'Urgente: cambiaron las cantidades', '09:31'],
    ],
    inErp: 'Leído · validado · en ERP', exception: 'Excepción → a una persona',
    sprintKicker: 'También en el sprint',
    sprint: ['Herramientas aprobadas y accesos', 'Política de uso de IA y reglas de datos', 'Capacitación por rol'],
    baseLabel: 'Antes / después', baseText: 'Medido contra la línea base',
    capSprint: 'Sprint de implementación · 4-8 semanas',
    capImpl: 'Después lo implementamos: <em>2 o 3 procesos automatizados de punta a punta.</em>',
    capImpl2: 'Las excepciones pasan a una persona.',
    reviewFile: 'revisión mensual', reviewKicker: 'Head of AI · mensual', reviewTitle: 'Revisión mensual',
    agenda: ['Hoja de ruta y prioridades', 'Evaluación de proveedores y herramientas', 'Proyectos de IA activos', 'Actualización de políticas y riesgos', 'Horario de consultas para el equipo'],
    quarterly: 'Reporte trimestral a la dirección', next: 'Próximo',
    lead1: 'Después, como tu Head of AI fraccional.', lead2: 'Cada paso deja algo que puedes usar.',
    close: 'Empieza con <em>un panorama claro.</em>',
  },
};

export const transcript = {
  en: [
    'Fifty AI ideas. No way to tell which ones matter.',
    'Plenty of AI ideas. No plan. Most companies are short on a plan, an owner and hands: personal accounts with no rules, a pilot that died after the demo, a strategy nobody owns.',
    'Find where AI pays off. Then make it happen. An audit in 2 to 3 weeks, an implementation sprint in 4 to 8 weeks, then a Head of AI, monthly.',
    'Week 1: interviews across teams. We map how work actually flows, for example an order desk where every order is typed into the ERP by hand.',
    'Weeks 2 to 3: every idea, ranked by return, effort and risk, with the first three projects scoped. A 90-day roadmap your leadership can read.',
    'Then we roll it out: 2 or 3 processes automated end to end, and exceptions go to a person. Also in the sprint: approved tools and access, an AI usage policy and data rules, role-based training, all measured against the baseline.',
    'Then, as your fractional Head of AI: roadmap and priorities, vendor and tool evaluation, active AI projects, policy and risk updates, office hours for the team and a quarterly report to leadership. Each step leaves something you can use.',
    'Start with a clear picture. Book a call at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    'Cincuenta ideas de IA. Ninguna forma de saber cuáles importan.',
    'Muchas ideas de IA. Ningún plan. A la mayoría de las empresas le falta un plan, un responsable y manos: cuentas personales sin reglas, un piloto que murió después de la demo, una estrategia sin responsable.',
    'Encuentra dónde rinde la IA. Y hazlo realidad. Una auditoría de 2 a 3 semanas, un sprint de implementación de 4 a 8 semanas y después un Head of AI, mensual.',
    'Semana 1: entrevistas con los equipos. Mapeamos cómo fluye de verdad el trabajo, por ejemplo una mesa de pedidos donde cada pedido se carga a mano en el ERP.',
    'Semanas 2 a 3: cada idea, priorizada por retorno, esfuerzo y riesgo, con los tres primeros proyectos definidos. Una hoja de ruta a 90 días que tu dirección puede leer.',
    'Después lo implementamos: 2 o 3 procesos automatizados de punta a punta, y las excepciones pasan a una persona. También en el sprint: herramientas aprobadas y accesos, política de uso de IA y reglas de datos, capacitación por rol, todo medido contra la línea base.',
    'Después, como tu Head of AI fraccional: hoja de ruta y prioridades, evaluación de proveedores y herramientas, proyectos de IA activos, actualización de políticas y riesgos, horario de consultas para el equipo y un reporte trimestral a la dirección. Cada paso deja algo que puedes usar.',
    'Empieza con un panorama claro. Agenda una llamada en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* Unit-specific styles (scoped with cs- prefixes). */
const CSS = `
.cs-col { position: absolute; display: flex; flex-direction: column; }
.cs-mist { color: var(--mist) !important; }
.stage .chip { font-size: 15px; }
.stage .win__badge { font-size: 15px; }
.cs-badge-muted { color: var(--smoke) !important; }
.cs-badge-flame { color: var(--flame-400) !important; }

/* idea list */
.cs-ideas { position: relative; height: calc(100% - 58px); overflow: hidden;
  -webkit-mask-image: linear-gradient(#000 62%, transparent 100%); mask-image: linear-gradient(#000 62%, transparent 100%); }
.cs-ideas__list { padding: 10px 0; }
.cs-idea { display: flex; align-items: center; gap: 20px; height: 72px; padding: 0 38px; border-bottom: 1px solid var(--line); }
.cs-idea__ix { font-family: var(--mono); font-size: 16px; letter-spacing: .06em; color: var(--smoke); width: 46px; }
.cs-idea__dot { width: 10px; height: 10px; border-radius: 10px; border: 2px solid var(--ink-500); flex: none; }
.cs-idea__t { font-size: 26px; color: var(--bone); }
.cs-idea__bar { height: 12px; border-radius: 6px; background: var(--ink-700); }

/* pains */
.cs-pain { width: 620px; padding: 20px 26px 22px; display: flex; flex-direction: column; gap: 6px; }
.cs-pain .mono { font-size: 15px; letter-spacing: .12em; }
.cs-pain__t { font-size: 25px; color: var(--bone); line-height: 1.35; }

/* engagement pills */
.cs-pills { display: flex; align-items: center; justify-content: center; gap: 0; }
.cs-pill { padding: 14px 24px; border-radius: 999px; border: 1px solid var(--line-strong); background: rgb(255 255 255 / .03);
  font-family: var(--mono); font-size: 19px; letter-spacing: .1em; text-transform: uppercase; color: var(--bone); white-space: nowrap; }
.cs-pill b { color: var(--flame-400); font-weight: 500; }
.cs-pill-arrow { width: 56px; height: 1px; background: var(--line-strong); margin: 0 12px; transform-origin: 0 50%; position: relative; }
.cs-pill-arrow::after { content: ''; position: absolute; right: -1px; top: -4px; width: 8px; height: 8px; border-top: 1px solid rgb(255 255 255 / .3); border-right: 1px solid rgb(255 255 255 / .3); transform: rotate(45deg); }

/* compact step tracker */
.cs-steps .step { padding-top: 20px; flex-direction: row; align-items: baseline; gap: 14px; }
.cs-steps .step__n { font-size: 16px; }
.cs-steps .step__label { font-family: var(--sans); font-size: 26px; font-weight: 500; letter-spacing: 0; line-height: 1.2; }
.cs-steps .step__sub { margin-left: auto; font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; line-height: 1.2; white-space: nowrap; }

/* interview notes */
.cs-notes .docp { padding: 36px 42px; }
.cs-notes .docp__title { font-size: 36px; margin-bottom: 22px; }
.cs-notes .docp__p { font-size: 23px; line-height: 1.5; margin-bottom: 16px; padding-left: 20px; position: relative; }
.cs-notes .docp__p::before { content: ''; position: absolute; left: 0; top: .62em; width: 7px; height: 7px; border-radius: 7px; background: #b9aea5; }
.cs-flowchip { position: absolute; transform: translateX(-50%); }

/* ranked table */
.cs-table { position: relative; }
.cs-tr { display: grid; grid-template-columns: 52px 1fr 136px 136px 136px 128px; align-items: center; column-gap: 12px; padding: 0 14px; }
.cs-th { height: 46px; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 16px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.cs-rows { position: relative; height: calc(6 * 70px); }
.cs-row { position: absolute; left: 0; right: 0; height: 70px; border-bottom: 1px solid var(--line); }
.cs-row__n { font-family: var(--mono); font-size: 18px; color: var(--flame-400); }
.cs-row__t { font-size: 24px; color: var(--bone); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cs-meter { display: flex; align-items: center; gap: 10px; }
.cs-meter__segs { display: flex; gap: 4px; }
.cs-meter__segs i { width: 16px; height: 8px; border-radius: 4px; background: var(--ink-600); display: block; }
.cs-meter__segs i.on { background: var(--mist); }
.cs-meter--hot .cs-meter__segs i.on { background: var(--flame-500); }
.cs-meter__t { font-family: var(--mono); font-size: 15px; color: var(--mist); letter-spacing: .04em; }
.cs-status { position: relative; height: 34px; }
.cs-status .chip { position: absolute; left: 0; top: 0; }
.cs-note { display: flex; justify-content: flex-end; margin-top: 16px; font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); }
.cs-side { position: absolute; display: flex; flex-direction: column; gap: 0; }
.cs-side__item { padding: 26px 0; border-top: 1px solid var(--line-strong); }
.cs-side__item:first-child { border-top: 0; padding-top: 0; }
.cs-side__big { font-family: var(--display); font-weight: 500; font-size: 38px; letter-spacing: -0.035em; line-height: 1.15; color: var(--bone); text-wrap: balance; }
.cs-side__t { font-size: 32px; font-weight: 500; line-height: 1.3; color: var(--mist); }
.cs-side__t em { color: var(--flame-300); }

/* gantt */
.cs-gantt { display: grid; grid-template-columns: 290px minmax(0, 1fr); column-gap: 20px; }
.cs-phases { position: relative; height: 36px; }
.cs-phase { position: absolute; top: 0; height: 28px; display: flex; align-items: center; padding: 0 10px; border-radius: 7px; box-sizing: border-box;
  font-family: var(--mono); font-size: 15px; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; overflow: hidden;
  color: var(--mist); border: 1px solid var(--line); background: rgb(255 255 255 / .02); }
.cs-phase--0 { color: var(--sun); border-color: rgb(252 168 0 / .35); background: rgb(252 168 0 / .06); }
.cs-phase--1 { color: var(--flame-400); border-color: rgb(245 131 39 / .35); background: rgb(245 131 39 / .06); }
.cs-phase--2 { border-style: dashed; }
.cs-weeks { display: grid; grid-template-columns: repeat(12, 1fr); height: 34px; align-items: center; border-bottom: 1px solid var(--line); }
.cs-weeks span { font-family: var(--mono); font-size: 15px; color: var(--smoke); padding-left: 5px; }
.cs-labels { display: flex; flex-direction: column; }
.cs-label { height: 54px; display: flex; align-items: center; font-size: 22px; color: var(--mist); border-bottom: 1px solid rgb(255 255 255 / .04); white-space: nowrap; }
.cs-lanes { position: relative; background-image: linear-gradient(to right, rgb(255 255 255 / .055) 1px, transparent 1px); background-size: calc(100% / 12) 100%; }
.cs-lane { position: relative; height: 54px; border-bottom: 1px solid rgb(255 255 255 / .04); }
.cs-bar { position: absolute; top: 18px; height: 18px; border-radius: 9px; transform-origin: 0 50%; box-sizing: border-box; }
.cs-bar--ph0 { background: linear-gradient(90deg, #fca800, #f58327); }
.cs-bar--ph1 { border: 1.5px solid rgb(245 131 39 / .75); background: rgb(245 131 39 / .08); }
.cs-bar--sessions { border: 0; background: repeating-linear-gradient(90deg, rgb(245 131 39 / .55) 0 12px, transparent 12px 19px); }
.cs-bar--open { border: 2px dashed rgb(255 255 255 / .6); border-right: 0; border-radius: 9px 0 0 9px; background: rgb(255 255 255 / .06);
  -webkit-mask-image: linear-gradient(90deg, #000 55%, transparent); mask-image: linear-gradient(90deg, #000 55%, transparent); }
.cs-ms { position: absolute; top: 15px; display: flex; align-items: center; gap: 12px; }
.cs-ms__gem { width: 18px; height: 18px; transform: rotate(45deg); border-radius: 3px; background: var(--sun); box-shadow: 0 0 16px rgb(255 210 31 / .45); flex: none; }
.cs-ms__label { font-family: var(--mono); font-size: 16px; color: var(--sun); white-space: nowrap; letter-spacing: .04em; }
.cs-today { position: absolute; top: -34px; bottom: -8px; width: 2px; margin-left: -1px; background: linear-gradient(rgb(245 131 39 / .2), var(--flame-400)); }
.cs-today::before { content: ''; position: absolute; top: -5px; left: -4px; width: 10px; height: 10px; border-radius: 10px; background: var(--flame-400); }
.cs-today__tag { position: absolute; top: 100%; left: 50%; transform: translate(-50%, 6px); padding: 4px 12px; border-radius: 99px; background: var(--flame-500); color: #1a0d03;
  font-family: var(--mono); font-size: 15px; font-weight: 600; white-space: nowrap; }
.cs-lane__hi { position: absolute; inset: 0 -12px; border-radius: 8px; background: rgb(245 131 39 / .1); box-shadow: inset 3px 0 0 var(--flame-500); opacity: 0; }
.cs-legend { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; }
.cs-legend div { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: 16px; letter-spacing: .1em; text-transform: uppercase; color: var(--mist); }
.cs-sw { width: 34px; height: 12px; border-radius: 6px; flex: none; box-sizing: border-box; }

/* implement */
.cs-avatar { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: rgb(242 193 78 / .16); color: var(--warn); border: 1px solid rgb(242 193 78 / .4); }
.cs-checks { display: flex; flex-direction: column; gap: 12px; }
.cs-check { display: flex; align-items: center; gap: 18px; padding: 20px 24px; }
.cs-check__c { position: relative; width: 36px; height: 36px; flex: none; border-radius: 50%; border: 2px solid var(--ink-500); display: grid; place-items: center; }
.cs-check__fill { position: absolute; inset: -2px; border-radius: 50%; background: var(--flame-500); transform: scale(0); }
.cs-check__c svg { position: relative; color: #1a0d03; opacity: 0; }
.cs-check__t { font-size: 24px; color: var(--bone); line-height: 1.3; }
.cs-check__body { display: flex; flex-direction: column; gap: 4px; }
.cs-check__body .mono { font-size: 15px; color: var(--flame-400); }

/* monthly review (paper) */
.cs-review { padding: 34px 42px 30px; color: #1a1616; }
.cs-review__k { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #8a7f78; }
.cs-review__t { font-family: var(--display); font-weight: 500; font-size: 36px; letter-spacing: -0.035em; margin: 10px 0 18px; color: #141010; }
.cs-review .lessons { gap: 0; }
.cs-review .lesson { grid-template-columns: 92px 1fr auto 40px; padding: 15px 4px; border: 0; border-top: 1px solid rgb(0 0 0 / .08); border-radius: 0; background: transparent; }
.cs-review .lesson__when { color: var(--flame-700); font-size: 15px; display: flex; align-items: center; }
.cs-review .lesson__title { color: #1a1616; font-size: 24px; }
.cs-review .lesson__chk { width: 34px; height: 34px; border-color: #cfc6bd; }
.cs-review .lesson__chk svg { width: 18px; height: 18px; }
.cs-review .chip { color: var(--flame-700); border-color: rgb(214 88 5 / .35); background: rgb(214 88 5 / .06); }

/* close */
`;

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const es = lang === 'es';
  const { h, place } = lib;
  const tl = gsap.timeline({ paused: true });
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  const { glow } = lib.setup(stage, { glow: { x: 1480, y: 860, size: 1000 } });
  const hud = lib.hud(stage, { ix: '02', unit: c.unit });
  hud.in(tl, 0.2);

  /* ============ 0 to 13.9: hook + pains ============ */
  const L1 = lib.layer(stage, { visible: true });
  const ideaWin = lib.win({ title: c.ideasFile, badge: c.unsorted, x: 980, y: 190, w: 820, h: 710, bodyPad: 0 });
  ideaWin.bar.querySelector('.win__badge').classList.add('cs-badge-muted');
  const ideasBox = h('div', 'cs-ideas');
  const ideasList = h('div', 'cs-ideas__list');
  const ideaRows = c.ideas.map((t, i) => {
    const r = h('div', 'cs-idea');
    r.append(h('span', 'cs-idea__ix', `[${String(i + 1).padStart(2, '0')}]`), h('span', 'cs-idea__dot'), h('span', 'cs-idea__t', t));
    ideasList.append(r);
    return r;
  });
  [0.52, 0.38, 0.6, 0.44].forEach((wd, i) => {
    const r = h('div', 'cs-idea');
    const b = h('span', 'cs-idea__bar'); b.style.width = Math.round(wd * 560) + 'px';
    r.append(h('span', 'cs-idea__ix', `[${String(10 + i).padStart(2, '0')}]`), h('span', 'cs-idea__dot'), b);
    ideasList.append(r);
    ideaRows.push(r);
  });
  ideasBox.append(ideasList);
  ideaWin.el.append(ideasBox);
  ideaWin.body.remove();
  L1.append(ideaWin.el);
  ideaWin.in(tl, 0.25);
  lib.fadeUp(tl, ideaRows, 0.4, { y: 14, dur: 0.6, stagger: 0.12 });
  tl.fromTo(ideasList, { y: 0 }, { y: -190, duration: 13.1, ease: 'sine.inOut' }, 0.4);

  const hookCol = place(h('div', 'cs-col'), { x: 120, y: 370, w: 800 });
  hookCol.style.gap = '30px';
  const hk1 = lib.headline(c.hook1, { size: 'md', maxWidth: 800 });
  const hk2 = lib.headline(c.hook2, { size: 'sm', maxWidth: 760 });
  hk2.el.classList.add('cs-mist');
  hookCol.append(hk1.el, hk2.el);
  L1.append(hookCol);
  hk1.in(tl, 0.9);
  hk2.in(tl, 2.6);
  hk1.out(tl, 6.3); hk2.out(tl, 6.35);

  // pains: idea window slides right and dims to texture
  tl.to(ideaWin.el, { x: 220, opacity: 0.35, duration: 0.6, ease: 'power2.in' }, 6.5);
  const painCol = place(h('div', 'cs-col'), { x: 120, y: 214, w: 1000 });
  const painHl = lib.headline(c.painsTitle, { size: 'md', maxWidth: 1000 });
  const painLede = h('p', 'lede', c.painsLede);
  painLede.style.fontSize = '32px'; painLede.style.marginTop = '26px';
  const painCards = h('div', 'cs-col'); painCards.style.position = 'relative'; painCards.style.gap = '14px'; painCards.style.marginTop = '40px';
  const pc = c.pains.map(([k, t]) => { const d = h('div', 'card cs-pain'); d.append(h('div', 'mono', k), h('div', 'cs-pain__t', t)); painCards.append(d); return d; });
  painCol.append(painHl.el, painLede, painCards);
  L1.append(painCol);
  painHl.in(tl, 6.9);
  lib.fadeUp(tl, painLede, 8.8, { y: 16, dur: 0.8 });
  lib.fadeUp(tl, pc, 9.6, { y: 22, dur: 0.8, stagger: 0.25 });
  lib.hide(tl, L1, 13.6, { dur: 0.5, y: -12 });

  /* ============ 14 to 19.3: hero line + engagements ============ */
  const L2 = lib.layer(stage);
  const card = lib.titleCard({ eyebrow: { ix: '02', text: c.unit }, title: c.heroTitle, size: es ? 'md' : 'lg', align: 'center', maxWidth: 1680 });
  const pills = h('div', 'cs-pills');
  const pillEls = [], arrows = [];
  c.offers.forEach((o, i) => {
    const p = h('div', 'cs-pill');
    // name in bone, timing in flame
    const name = o.replace(/\s(\d.*|monthly|mensual)$/i, '');
    const when = o.slice(name.length + 1);
    p.innerHTML = `${name} <b>${when}</b>`;
    if (i) { const a = h('div', 'cs-pill-arrow'); pills.append(a); arrows.push(a); }
    pills.append(p); pillEls.push(p);
  });
  pills.style.marginTop = '12px';
  card.el.append(pills);
  L2.append(card.el);
  lib.show(tl, L2, 13.9, { dur: 0.01 });
  card.in(tl, 14.0);
  gsap.set(arrows, { scaleX: 0 });
  pillEls.forEach((p, i) => {
    lib.popIn(tl, p, 16.2 + i * 0.35, { scale: 0.92, dur: 0.7 });
    if (arrows[i]) tl.to(arrows[i], { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 16.2 + i * 0.35 + 0.2);
  });
  card.out(tl, 18.9);
  tl.to(pills, { y: -40, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 18.9);

  /* ============ persistent step tracker 19.2 to 57.8 ============ */
  const LT = lib.layer(stage, { z: 12 });
  const st = lib.steps({ items: c.steps.map(([label, sub]) => ({ label, sub })), x: 120, y: 146, w: 1680, gap: 40 });
  st.el.classList.add('cs-steps');
  LT.append(st.el);
  lib.show(tl, LT, 19.2, { dur: 0.01 });
  lib.fadeUp(tl, st.steps.map((s) => s.el), 19.2, { y: 24, dur: 0.8, stagger: 0.08 });
  st.go(tl, 19.6, 0);

  /* ============ 19.6 to 27.5: interview + process map ============ */
  const L3 = lib.layer(stage);
  const notes = lib.win({ title: c.notesFile, paper: true, x: 120, y: 256, w: 580, h: 524, bodyPad: 0 });
  notes.el.classList.add('cs-notes');
  const doc = lib.docPage({ kicker: c.notesKicker, title: c.notesTitle, blocks: c.notes.map((p) => ({ p })) });
  notes.body.append(doc.el);
  const map = lib.win({ title: c.mapFile, badge: c.draft, x: 730, y: 256, w: 1070, h: 524, bodyPad: 0 });
  map.bar.querySelector('.win__badge').classList.add('cs-badge-muted');
  const fl = lib.flow({ x: 20, y: 40, w: 1030, h: 420, nodes: [
    { id: 'mail', x: 175, y: 105, label: c.nodes[0], icon: 'mail' },
    { id: 'sheet', x: 175, y: 305, label: c.nodes[1], icon: 'doc' },
    { id: 'desk', x: 535, y: 205, label: c.nodes[2], icon: 'users', kind: 'human' },
    { id: 'erp', x: 885, y: 105, label: c.nodes[3], icon: 'db' },
    { id: 'inv', x: 885, y: 305, label: c.nodes[4], icon: 'box' },
  ], edges: [{ from: 'mail', to: 'desk', curve: 'h' }, { from: 'sheet', to: 'desk', curve: 'h' }, { from: 'desk', to: 'erp', hot: true, curve: 'h' }, { from: 'erp', to: 'inv', curve: 'v' }] });
  map.body.style.height = 'calc(100% - 58px)';
  map.body.append(fl.el);
  const deskChip = h('span', 'chip chip--flame cs-flowchip', c.retyped);
  place(deskChip, { x: 535, y: 262 });
  deskChip.style.position = 'absolute';
  fl.el.append(deskChip);
  L3.append(notes.el, map.el);
  const cap1 = lib.caption({ kicker: c.capWeek1, text: c.cap1, bottom: 128, maxWidth: 1600 });
  L3.append(cap1.el);
  lib.show(tl, L3, 19.6, { dur: 0.01 });
  notes.in(tl, 19.7);
  doc.in(tl, 20.1);
  map.in(tl, 20.0);
  fl.in(tl, 20.5, { order: ['mail', 'sheet', 'desk', 'erp', 'inv'], gap: 0.28 });
  doc.mark(tl, 22.4, 0);
  fl.focus(tl, 23.0, 'desk', { hold: 1.6 });
  lib.fadeUp(tl, deskChip, 23.1, { y: 8, dur: 0.5 });
  fl.pulse(tl, 23.4, 0, { dur: 0.9 });
  fl.pulse(tl, 24.4, 2, { dur: 0.9 });
  cap1.in(tl, 22.9);

  /* ============ 27.5 to 35.4: ranked opportunities ============ */
  const L4 = lib.layer(stage);
  lib.swap(tl, L3, L4, 27.5, { dur: 0.6 });
  st.go(tl, 27.6, 1);
  const tw = lib.win({ title: c.tableFile, badge: c.reviewed, x: 120, y: 250, w: 1120 });
  tw.bar.querySelector('.win__badge').classList.add('cs-badge-muted');
  const table = h('div', 'cs-table');
  const thead = h('div', 'cs-tr cs-th');
  c.cols.forEach((t) => thead.append(h('div', null, t)));
  const rowsBox = h('div', 'cs-rows');
  // [return, effort, risk] as example ratings; rank = final position
  const DATA = [['L', 'M', 'M', 5], ['M', 'L', 'H', 4], ['H', 'M', 'L', 1], ['H', 'L', 'L', 2], ['M', 'M', 'L', 3], ['M', 'H', 'M', 6]];
  const ROWH = 70;
  const meter = (lv, hot) => {
    const n = { H: 3, M: 2, L: 1 }[lv];
    const m = h('div', 'cs-meter' + (hot ? ' cs-meter--hot' : ''));
    const segs = h('span', 'cs-meter__segs');
    for (let i = 0; i < 3; i++) segs.append(h('i', i < n ? 'on' : null));
    m.append(segs, h('span', 'cs-meter__t', c.lvl[lv]));
    return m;
  };
  const trs = DATA.map(([r, e, k, rank], i) => {
    const row = h('div', 'cs-tr cs-row');
    row.style.top = i * ROWH + 'px';
    const n = h('div', 'cs-row__n', String(rank));
    const status = h('div', 'cs-status');
    row.append(n, h('div', 'cs-row__t', c.opps[i]), meter(r, true), meter(e), meter(k), status);
    rowsBox.append(row);
    gsap.set(n, { autoAlpha: 0 });
    return { row, n, status, rank };
  });
  table.append(thead, rowsBox, h('div', 'cs-note', c.example));
  tw.body.append(table);
  L4.append(tw.el);
  tw.in(tl, 27.8);
  lib.fadeUp(tl, trs.map((t) => t.row), 28.1, { y: 12, dur: 0.5, stagger: 0.06 });
  trs.forEach((t, i) => tl.to(t.row, { y: (t.rank - 1 - i) * ROWH, duration: 0.9, ease: 'expo.out' }, 29.6));
  tl.to(trs.map((t) => t.n), { autoAlpha: 1, duration: 0.4, stagger: 0.05 }, 30.2);
  const byRank = [...trs].sort((a, b) => a.rank - b.rank);
  byRank.forEach((t, j) => {
    const chip = h('span', j < 3 ? 'chip chip--flame' : 'chip', j < 3 ? c.scoped : c.later);
    t.status.append(chip);
    gsap.set(chip, { autoAlpha: 0 });
    const at = j < 3 ? 31.4 + j * 0.2 : 32.2;
    tl.fromTo(chip, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, at);
    if (j >= 3) tl.to(t.row, { opacity: 0.45, duration: 0.5 }, 32.2);
  });
  const side = place(h('div', 'cs-side'), { x: 1310, y: 300, w: 490 });
  const s1 = h('div', 'cs-side__item'); s1.append(h('div', 'cs-side__big', c.rank1));
  const s2 = h('div', 'cs-side__item'); s2.append(h('div', 'cs-side__t', c.rank2));
  const s3 = h('div', 'cs-side__item'); s3.append(h('div', 'cs-side__t', c.rank3));
  s3.firstChild.style.color = 'var(--bone)';
  side.append(s1, s2, s3);
  L4.append(side);
  lib.fadeUp(tl, s1, 28.0, { y: 18, dur: 0.8 });
  lib.fadeUp(tl, s2, 30.2, { y: 18, dur: 0.8 });
  lib.fadeUp(tl, s3, 32.0, { y: 18, dur: 0.8 });

  /* ============ 35.4 to 42.9: 90-day roadmap (poster) ============ */
  const L5 = lib.layer(stage);
  lib.swap(tl, L4, L5, 35.4, { dur: 0.6 });
  const gw = lib.win({ title: c.ganttFile, badge: c.readout, x: 120, y: 276, w: 1120 });
  gw.bar.querySelector('.win__badge').classList.add('cs-badge-flame');
  const WEEKS = 12, TODAY = 3;
  const ROWS = [[1, 2, 0, 'bar'], [2, 2, 0, 'bar'], [3, 1, 0, 'milestone'], [4, 3, 1, 'bar'], [5, 4, 1, 'bar'], [7, 4, 1, 'bar'], [6, 6, 1, 'sessions'], [11, 2, 2, 'open']];
  const PH = [[1, 3], [4, 10], [11, 12]];
  const g = h('div', 'cs-gantt');
  const phases = h('div', 'cs-phases');
  const phEls = PH.map(([a, b], i) => {
    const p = h('span', `cs-phase cs-phase--${i}`, c.phases[i]);
    p.style.left = `calc(${((a - 1) / WEEKS) * 100}% + 2px)`; p.style.width = `calc(${((b - a + 1) / WEEKS) * 100}% - 4px)`;
    phases.append(p); return p;
  });
  const weeks = h('div', 'cs-weeks');
  for (let i = 1; i <= WEEKS; i++) weeks.append(h('span', null, c.week + i));
  const labels = h('div', 'cs-labels');
  const lanes = h('div', 'cs-lanes');
  const labelEls = [], barEls = [], laneHi = [];
  let ms = null;
  ROWS.forEach(([s, span, ph, kind], i) => {
    const lb = h('div', 'cs-label', c.rows[i]); labels.append(lb); labelEls.push(lb);
    const lane = h('div', 'cs-lane');
    const hi = h('div', 'cs-lane__hi'); lane.append(hi); laneHi.push(hi);
    if (kind === 'milestone') {
      ms = h('span', 'cs-ms');
      ms.style.left = `calc(${((s - 1 + span) / WEEKS) * 100}% - 9px)`;
      ms.append(h('span', 'cs-ms__gem'), h('span', 'cs-ms__label', c.milestone));
      lane.append(ms);
    } else {
      const b = h('span', `cs-bar cs-bar--ph${ph} cs-bar--${kind}`);
      b.style.left = `calc(${((s - 1) / WEEKS) * 100}% + 3px)`; b.style.width = `calc(${(span / WEEKS) * 100}% - 6px)`;
      lane.append(b); barEls.push(b);
    }
    lanes.append(lane);
  });
  const today = h('span', 'cs-today');
  today.style.left = (TODAY / WEEKS) * 100 + '%';
  today.append(h('span', 'cs-today__tag', `${c.today} · ${c.week}${TODAY}`));
  lanes.append(today);
  g.append(h('div'), phases, h('div'), weeks, labels, lanes);
  gw.body.append(g);
  gw.body.style.paddingBottom = '52px';
  L5.append(gw.el);
  const road = place(h('div', 'cs-col'), { x: 1310, y: 300, w: 490 });
  road.style.gap = '0';
  const rk = h('div', 'mono mono--sm', c.roadKicker);
  const r1 = h('div', 'cs-side__big', c.road1); r1.style.marginTop = '22px'; r1.style.fontSize = '42px';
  const r2 = h('div', 'cs-side__t', c.road2); r2.style.marginTop = '14px';
  const legend = h('div', 'cs-legend'); legend.style.marginTop = '54px';
  const sw = [
    'background: linear-gradient(90deg, #fca800, #f58327)',
    'border: 1.5px solid rgb(245 131 39 / .75); background: rgb(245 131 39 / .08)',
    'border: 2px dashed rgb(255 255 255 / .6)',
  ];
  c.legend.forEach((t, i) => {
    const row = h('div');
    let mark;
    if (i < 3) { mark = h('span', 'cs-sw'); mark.setAttribute('style', sw[i]); }
    else { mark = h('span', 'cs-ms__gem'); mark.style.margin = '0 8px'; mark.style.width = '14px'; mark.style.height = '14px'; }
    row.append(mark, document.createTextNode(t));
    legend.append(row);
  });
  road.append(rk, r1, r2, legend);
  L5.append(road);
  gw.in(tl, 35.85);
  lib.fadeUp(tl, phEls, 36.1, { y: 8, dur: 0.6, stagger: 0.08 });
  lib.fadeUp(tl, [...weeks.children], 36.1, { y: 6, dur: 0.5, stagger: 0.02 });
  lib.fadeUp(tl, labelEls, 36.2, { y: 8, dur: 0.5, stagger: 0.06 });
  gsap.set(barEls, { scaleX: 0 });
  barEls.forEach((b, i) => tl.to(b, { scaleX: 1, duration: 0.8, ease: 'expo.out' }, 36.4 + i * 0.3));
  lib.popIn(tl, ms, 38.7, { scale: 0.7, dur: 0.6 });
  tl.fromTo(today, { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 38.9);
  lib.fadeUp(tl, rk, 36.6, { y: 12, dur: 0.6 });
  lib.fadeUp(tl, r1, 36.8, { y: 18, dur: 0.8 });
  lib.fadeUp(tl, r2, 37.3, { y: 18, dur: 0.8 });
  lib.fadeUp(tl, [...legend.children], 38.0, { y: 10, dur: 0.6, stagger: 0.1 });
  tl.addLabel('poster', 40.4);
  // the order-intake lane lights up before the roadmap gives way to production
  tl.to(laneHi[4], { opacity: 1, duration: 0.4 }, 42.1);
  tl.to(labelEls[4], { color: '#ff8442', duration: 0.4 }, 42.1);

  /* ============ 42.9 to 51.6: implementation sprint ============ */
  const L6 = lib.layer(stage);
  lib.swap(tl, L5, L6, 42.9, { dur: 0.6 });
  st.go(tl, 42.9, 2);
  const iw = lib.win({ title: c.ordersFile, badge: c.live, x: 120, y: 250, w: 980 });
  const ib = lib.inbox({ rows: c.orders.map(([from, initials, subject, time]) => ({ from, initials, subject, time })) });
  iw.body.style.padding = '18px 22px';
  iw.body.append(ib.el);
  L6.append(iw.el);
  const right = place(h('div', 'cs-col'), { x: 1170, y: 256, w: 630 });
  const rkk = h('div', 'mono mono--sm', c.sprintKicker); rkk.style.marginBottom = '18px';
  const checks = h('div', 'cs-checks');
  const chk = [...c.sprint, null].map((t, i) => {
    const d = h('div', 'card cs-check');
    const cc = h('div', 'cs-check__c'); const fill = h('span', 'cs-check__fill'); const ic = lib.icon('check', { size: 18, stroke: 3 });
    cc.append(fill, ic);
    const body = h('div', 'cs-check__body');
    if (t == null) { body.append(h('div', 'mono', c.baseLabel), h('div', 'cs-check__t', c.baseText)); }
    else body.append(h('div', 'cs-check__t', t));
    d.append(cc, body); checks.append(d);
    return { d, fill, ic, cc };
  });
  right.append(rkk, checks);
  L6.append(right);
  const cap2 = lib.caption({ kicker: c.capSprint, text: c.capImpl, bottom: 128, maxWidth: 1680 });
  const cap2b = h('div', 'cap__text', c.capImpl2);
  cap2b.style.fontSize = '32px'; cap2b.style.color = 'var(--mist)';
  cap2.el.querySelector('.cap__body').append(cap2b);
  L6.append(cap2.el);
  iw.in(tl, 43.1);
  ib.in(tl, 43.4);
  cap2.in(tl, 43.6);
  [0, 1, 2].forEach((i) => {
    const t = 44.4 + i * 0.75;
    ib.highlight(tl, t, i);
    ib.tag(tl, t + 0.3, i, c.inErp, 'ok');
    ib.highlight(tl, t + 0.75, i, { off: true });
  });
  ib.highlight(tl, 46.7, 3);
  ib.tag(tl, 47.0, 3, c.exception, 'flame');
  const av = h('span', 'cs-avatar'); av.append(lib.icon('user', { size: 17, stroke: 2 }));
  ib.rows[3].tags.append(av);
  gsap.set(av, { autoAlpha: 0 });
  tl.fromTo(av, { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 47.3);
  lib.fadeUp(tl, cap2b, 47.3, { y: 12, dur: 0.7 });
  lib.fadeUp(tl, rkk, 47.6, { y: 10, dur: 0.6 });
  lib.fadeUp(tl, chk.map((x) => x.d), 47.7, { y: 16, dur: 0.6, stagger: 0.12 });
  chk.forEach((x, i) => {
    const t = 48.3 + i * 0.6;
    tl.to(x.fill, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, t);
    tl.to(x.ic, { opacity: 1, duration: 0.25 }, t + 0.15);
    tl.to(x.cc, { borderColor: 'rgba(245,131,39,1)', duration: 0.2 }, t);
  });

  /* ============ 51.6 to 57.8: fractional Head of AI ============ */
  const L7 = lib.layer(stage);
  lib.swap(tl, L6, L7, 51.6, { dur: 0.6 });
  st.go(tl, 51.7, 3);
  const rw = lib.win({ title: c.reviewFile, paper: true, x: 800, y: 250, w: 1000, bodyPad: 0 });
  const rv = h('div', 'cs-review');
  rv.append(h('div', 'cs-review__k', c.reviewKicker), h('div', 'cs-review__t', c.reviewTitle));
  const slots = ['09:00', '09:20', '09:40', '10:00', '10:20'];
  const ag = lib.lessons({ items: [...c.agenda.map((title, i) => ({ when: slots[i], title })), { when: '', title: c.quarterly }] });
  const last = ag.rows[5];
  last.el.querySelector('.lesson__when').append(lib.icon('calendar', { size: 24 }));
  last.el.querySelector('.lesson__meta').append(h('span', 'chip', c.next));
  last.chk.style.visibility = 'hidden';
  rv.append(ag.el);
  rw.body.append(rv);
  L7.append(rw.el);
  const leadCol = place(h('div', 'cs-col'), { x: 120, y: 300, w: 620 });
  leadCol.style.gap = '34px';
  const ld1 = lib.headline(c.lead1, { size: 'sm', maxWidth: 620 });
  const ld2 = h('p', 'lede', c.lead2); ld2.style.fontSize = '32px';
  leadCol.append(ld1.el, ld2);
  L7.append(leadCol);
  rw.in(tl, 52.0);
  ag.in(tl, 52.4, { stagger: 0.08 });
  ld1.in(tl, 52.1);
  lib.fadeUp(tl, ld2, 54.3, { y: 16, dur: 0.8 });
  [0, 1, 2, 3, 4].forEach((i) => ag.check(tl, 53.2 + i * 0.45, i));

  /* ============ 57.8 to 63: close line on the CTA end card ============ */
  lib.hide(tl, LT, 57.8, { dur: 0.5, y: -10 });
  lib.hide(tl, L7, 57.8, { dur: 0.5, y: -16 });
  hud.chrome(tl, 57.8, false);
  const L9 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.close });
  L9.append(cta.el);
  lib.show(tl, L9, 58.3, { dur: 0.01 });
  cta.in(tl, 58.3);
  tl.set({}, {}, 63);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
