// Growth explainer. Storyboard: video/storyboards/growth.json
// Story: buyers ask AI first and it names other brands; then the four engines in one voice, shown as four
// steps through Growth-only mockups: a question-set tracker with findings, the content pipeline, a weekly
// ad-variant board with an outbound approval, and a monthly report. Claims and timelines come from
// src/i18n/units/growth.ts (hero, offers, method, faq, cta) and src/components/unit/visuals/copy.ts.
// Brand A/B/C, the questions, variant numbers and the recipient are illustrative UI states, not claims.

export const meta = {
  title: { en: 'How Sandbox Growth works', es: 'Cómo funciona Sandbox Growth' },
};

export const copy = {
  en: {
    unit: 'Growth',
    query: 'Which accounting firm is best for a growing startup?',
    aiLabel: 'AI answer',
    answers: [
      ['Brand A', 'works with venture-backed startups.'],
      ['Brand B', 'fixed monthly packages for small teams.'],
      ['Brand C', 'strong reviews for tax season support.'],
    ],
    sources: ['review site', 'industry guide', 'directory'],
    brand: 'yourbrand.com', notMentioned: 'not mentioned',
    hook1: 'Your buyers ask AI before they search.',
    hook2: 'Today it recommends your competitors.',
    heroTitle: 'Be the answer<br><em>when buyers ask AI.</em>',
    heroSub: 'Four engines. One brand voice.',
    enginesKicker: 'Same voice · same data · one report',
    engines: [['search', 'AI search visibility', 'GEO'], ['pen', 'Content engine', 'Your voice'], ['layers', 'Performance creative', 'Tested weekly'], ['mail', 'Personalized outbound', 'From your inbox']],
    s1: 'Track the questions your buyers ask', s1b: 'Then find out why AI cites others.',
    qWin: 'visibility / question set', baseline: 'Baseline',
    qCol: 'Buyer question', asst: ['Assistant A', 'Assistant B', 'Assistant C'],
    questions: ['Best accounting firm for a startup?', 'Who handles payroll for small teams?', 'Accountant for a first funding round?', 'Firms that do monthly bookkeeping?'],
    st: { no: 'not mentioned', others: 'cites others', yes: 'mentioned' },
    fWin: 'findings', fKicker: 'Question 1 · findings', fTitle: 'Why they cite others',
    findings: ['Directory listing shows an old address', 'Services page has no plain answers', 'Missing from the industry guide'],
    s2: 'Content in your voice, from your experts', s2b: 'An editor approves every piece.',
    nodes: [['chat', 'Expert interview', 'your team'], ['book', 'Voice guide', 'what we say and never say'], ['pen', 'Draft', 'in your voice'], ['user', 'Editor review', 'a person'], ['check', 'Approved', 'ready to publish']],
    outputs: [['doc', 'Article'], ['mail', 'Newsletter'], ['chat', 'Social post'], ['play', 'Video script']],
    readyChip: 'ready for approval', thisWeek: 'this week',
    s3: 'New ad creative tested every week', s3b: 'Outbound researched per account, approved first.',
    adsWin: 'ads / this week', variant: 'Variant',
    angles: ['Founder story', 'Speed', 'Expert tip'],
    adSt: { test: 'testing', scaled: 'scaled', retired: 'retired', fresh: 'new' },
    apprFlag: 'Needs approval', apprTitle: 'Outbound sequence&nbsp;· account research done',
    apprFields: [['To', 'Plant manager, industrial distributor (example)'], ['Context', 'Opened a second warehouse this year'], ['Draft', '“Saw the new warehouse. One question about…”']],
    approve: 'Approve', edit: 'Edit', approvedPill: 'Approved · sends from your inbox', approvedFlag: 'Approved',
    s4: 'Publish weekly. Report what moved.', s4b: 'No one can guarantee citations. We commit to the process.',
    rWin: 'monthly report', exampleView: 'example view',
    metrics: ['Citations', 'Traffic', 'Leads', 'Pipeline'],
    rCols: ['Question', 'Status', 'What moved'],
    rRows: [
      ['Best accounting firm for a startup?', 'Directory listing fixed'],
      ['Who handles payroll for small teams?', null],
      ['Accountant for a first funding round?', 'Still cited'],
    ],
    nextFix: 'Next fix: third-party mentions',
    howTitle: 'Your team sets the strategy and approves.',
    method: [['Audit', '1 week'], ['Calibrate', '1 week'], ['Launch', '2-3 weeks'], ['Publish weekly', 'Monthly report']],
    facts: [['First outputs', 'Weeks 3 to 5'], ['Brand voice', 'Trained on your material, approved by you'], ['Accounts', 'We work inside your own accounts']],
    cta: 'See where you stand <em>in AI answers.</em>',
  },
  es: {
    unit: 'Growth',
    query: '¿Qué estudio contable conviene para una startup en crecimiento?',
    aiLabel: 'Respuesta de IA',
    answers: [
      ['Marca A', 'trabaja con startups con inversión.'],
      ['Marca B', 'paquetes mensuales para equipos pequeños.'],
      ['Marca C', 'muy bien valorada en temporada de impuestos.'],
    ],
    sources: ['sitio de reseñas', 'guía del sector', 'directorio'],
    brand: 'tumarca.com', notMentioned: 'no aparece',
    hook1: 'Tus clientes le preguntan primero a la IA.',
    hook2: 'Hoy recomienda a tu competencia.',
    heroTitle: 'Sé la respuesta<br><em>cuando tus clientes le&nbsp;preguntan a la IA.</em>',
    heroSub: 'Cuatro motores. Una sola voz.',
    enginesKicker: 'Misma voz · mismos datos · un reporte',
    engines: [['search', 'Visibilidad en IA', 'GEO'], ['pen', 'Motor de contenido', 'Con tu voz'], ['layers', 'Creatividades', 'Testeadas cada semana'], ['mail', 'Prospección personalizada', 'Desde tu correo']],
    s1: 'Medimos las preguntas de tus clientes', s1b: 'Y vemos por qué la IA cita a otros.',
    qWin: 'visibilidad / preguntas', baseline: 'Línea base',
    qCol: 'Pregunta del cliente', asst: ['Asistente A', 'Asistente B', 'Asistente C'],
    questions: ['¿Mejor estudio contable para una startup?', '¿Quién lleva la nómina de equipos pequeños?', '¿Contador para una primera ronda?', '¿Estudios con contabilidad mensual?'],
    st: { no: 'no aparece', others: 'cita a otros', yes: 'aparece' },
    fWin: 'hallazgos', fKicker: 'Pregunta 1 · hallazgos', fTitle: 'Por qué citan a otros',
    findings: ['El directorio muestra una dirección antigua', 'La página de servicios no responde nada concreto', 'No apareces en la guía del sector'],
    s2: 'Contenido con tu voz, desde tus expertos', s2b: 'Un editor aprueba cada pieza.',
    nodes: [['chat', 'Entrevista', 'con tu equipo'], ['book', 'Guía de voz', 'qué decimos y qué no'], ['pen', 'Borrador', 'con tu voz'], ['user', 'Revisión editorial', 'una persona'], ['check', 'Aprobado', 'listo para publicar']],
    outputs: [['doc', 'Artículo'], ['mail', 'Newsletter'], ['chat', 'Publicación'], ['play', 'Guion de video']],
    readyChip: 'listo para aprobar', thisWeek: 'esta semana',
    s3: 'Creatividades nuevas testeadas cada semana', s3b: 'Prospección investigada por cuenta, aprobada antes.',
    adsWin: 'anuncios / esta semana', variant: 'Variante',
    angles: ['Historia del fundador', 'Rapidez', 'Consejo experto'],
    adSt: { test: 'en test', scaled: 'escalada', retired: 'retirada', fresh: 'nueva' },
    apprFlag: 'Requiere aprobación', apprTitle: 'Secuencia de prospección&nbsp;· cuenta investigada',
    apprFields: [['Para', 'Gerente de planta, distribuidor industrial (ejemplo)'], ['Contexto', 'Abrió un segundo almacén este año'], ['Borrador', '“Vi el nuevo almacén. Una pregunta sobre…”']],
    approve: 'Aprobar', edit: 'Editar', approvedPill: 'Aprobada · sale desde tu correo', approvedFlag: 'Aprobada',
    s4: 'Publicar cada semana. Reportar qué se movió.', s4b: 'Nadie puede garantizar citas. Lo que asumimos es el proceso.',
    rWin: 'reporte mensual', exampleView: 'vista de ejemplo',
    metrics: ['Citas', 'Tráfico', 'Leads', 'Oportunidades'],
    rCols: ['Pregunta', 'Estado', 'Qué se movió'],
    rRows: [
      ['¿Mejor estudio contable para una startup?', 'Directorio corregido'],
      ['¿Quién lleva la nómina de equipos pequeños?', null],
      ['¿Contador para una primera ronda?', 'Sigue apareciendo'],
    ],
    nextFix: 'Siguiente ajuste: menciones de terceros',
    howTitle: 'Tu equipo define la estrategia y aprueba.',
    method: [['Auditar', '1 semana'], ['Calibrar', '1 semana'], ['Lanzar', '2-3 semanas'], ['Publicar cada semana', 'Reporte mensual']],
    facts: [['Primeras piezas', 'Semanas 3 a 5'], ['Voz de marca', 'Entrenada con tu material, aprobada por ti'], ['Cuentas', 'Trabajamos en tus propias cuentas']],
    cta: 'Mira dónde estás<br><em>en las respuestas de IA.</em>',
  },
};

export const transcript = {
  en: [
    'A buyer asks an AI assistant: which accounting firm is best for a growing startup? The answer names Brand A, Brand B and Brand C. Your brand is not mentioned. Your buyers ask AI before they search. Today it recommends your competitors.',
    'Be the answer when buyers ask AI. Four engines, one brand voice: AI search visibility (GEO), a content engine, performance creative and personalized outbound, sharing the same voice, the same data and one report.',
    '01. Track the questions your buyers ask, assistant by assistant, against a baseline. Then find out why AI cites others: for example a directory listing with an old address, a services page with no plain answers, or a brand missing from the industry guide.',
    '02. Content in your voice, from your experts: an expert interview and your voice guide become a draft, an editor reviews it, and the approved piece becomes an article, a newsletter, a social post and a video script. An editor approves every piece.',
    '03. New ad creative tested every week: variants are tested, scaled or retired. Outbound is researched per account and approved first, then sent from your inbox.',
    '04. Publish weekly and report what moved: citations, traffic, leads and pipeline, question by question, with the next fix for what did not move. No one can guarantee citations. We commit to the process.',
    'Your team sets the strategy and approves. Audit, 1 week. Calibrate, 1 week. Launch, 2 to 3 weeks. Then publish weekly with a monthly report. First outputs in weeks 3 to 5, with a brand voice trained on your material and approved by you, inside your own accounts.',
    'See where you stand in AI answers. Book a call at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    'Un cliente le pregunta a un asistente de IA: ¿qué estudio contable conviene para una startup en crecimiento? La respuesta nombra a la Marca A, la Marca B y la Marca C. Tu marca no aparece. Tus clientes le preguntan primero a la IA. Hoy recomienda a tu competencia.',
    'Sé la respuesta cuando tus clientes le preguntan a la IA. Cuatro motores, una sola voz: visibilidad en IA (GEO), un motor de contenido, creatividades y prospección personalizada, con la misma voz, los mismos datos y un solo reporte.',
    '01. Medimos las preguntas de tus clientes, asistente por asistente, contra una línea base. Y vemos por qué la IA cita a otros: por ejemplo un directorio con una dirección antigua, una página de servicios que no responde nada concreto o una marca que no aparece en la guía del sector.',
    '02. Contenido con tu voz, desde tus expertos: una entrevista con tu equipo y tu guía de voz se convierten en un borrador, un editor lo revisa y la pieza aprobada se convierte en artículo, newsletter, publicación y guion de video. Un editor aprueba cada pieza.',
    '03. Creatividades nuevas testeadas cada semana: las variantes se testean, se escalan o se retiran. La prospección se investiga por cuenta y se aprueba antes de salir desde tu correo.',
    '04. Publicar cada semana y reportar qué se movió: citas, tráfico, leads y oportunidades, pregunta por pregunta, con el siguiente ajuste para lo que no se movió. Nadie puede garantizar citas. Lo que asumimos es el proceso.',
    'Tu equipo define la estrategia y aprueba. Auditar, 1 semana. Calibrar, 1 semana. Lanzar, 2 a 3 semanas. Después, publicar cada semana con un reporte mensual. Primeras piezas en las semanas 3 a 5, con una voz de marca entrenada con tu material y aprobada por ti, en tus propias cuentas.',
    'Mira dónde estás en las respuestas de IA. Agenda una llamada en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* Unit-specific styles (gr- prefix). */
const CSS = `
.stage .chip { font-size: 15px; }
.stage .win__badge { font-size: 15px; }
.gr-col { position: absolute; display: flex; flex-direction: column; }
.gr-mist { color: var(--mist) !important; }
.gr-badge-muted { color: var(--smoke) !important; }
.gr-badge-flame { color: var(--flame-400) !important; }

/* hook */
.gr-ai .search { font-size: 28px; }
.gr-ai .answer { padding: 30px 36px 30px; }
.gr-ai .answer__p { margin-bottom: 10px; }
.gr-ai .answer__p .brand { font-weight: 500; }
.gr-cite { display: inline-grid; place-items: center; min-width: 26px; height: 26px; padding: 0 6px; margin-left: 6px; border-radius: 7px; vertical-align: 3px;
  font-family: var(--mono); font-size: 15px; font-weight: 600; color: var(--mist); background: rgb(255 255 255 / .06); border: 1px solid var(--line); }
.gr-miss { display: flex; justify-content: flex-end; margin-top: 20px; }
.gr-miss__chip { display: inline-flex; align-items: center; gap: 14px; padding: 12px 18px; border-radius: 12px; border: 1px dashed rgb(255 255 255 / .22); background: rgb(255 255 255 / .02);
  font-family: var(--mono); font-size: 18px; letter-spacing: .02em; color: var(--mist); }
.gr-miss__chip b { color: var(--bone); font-weight: 500; }
.gr-miss__chip i { width: 12px; height: 12px; border-radius: 12px; border: 2px solid var(--smoke); display: block; }
.gr-miss__chip span { color: var(--smoke); }

/* engines */
.gr-eng { display: grid; grid-template-columns: 52px 1fr auto; align-items: center; gap: 20px; padding: 22px 24px; }
.gr-eng__ic { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: rgb(245 131 39 / .1); color: var(--flame-400); border: 1px solid rgb(245 131 39 / .3); }
.gr-eng__t { font-size: 27px; font-weight: 500; color: var(--bone); line-height: 1.2; }
.gr-kicker { font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); display: flex; align-items: center; gap: 14px; }
.gr-kicker::before { content: ''; width: 28px; height: 1px; background: var(--flame-500); }

/* step header */
.gr-head { position: absolute; left: 120px; top: 150px; right: 120px; display: grid; grid-template-columns: 74px 1fr; column-gap: 8px; row-gap: 10px; align-items: baseline; }
.gr-head__n { font-family: var(--mono); font-size: 22px; font-weight: 500; letter-spacing: .1em; color: var(--flame-400); }
.gr-head .hl { white-space: nowrap; }
.gr-head__sub { grid-column: 2; font-size: 30px; line-height: 1.3; color: var(--mist); font-weight: 400; }

/* question tracker */
.gr-q { display: flex; flex-direction: column; }
.gr-q__tr { display: grid; grid-template-columns: 1fr 160px 160px 160px; column-gap: 12px; align-items: center; padding: 0 8px; }
.gr-q__th { height: 46px; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.gr-q__row { height: 84px; border-bottom: 1px solid var(--line); }
.gr-q__t { font-size: 23px; color: var(--bone); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gr-st { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 8px; font-family: var(--mono); font-size: 15px; letter-spacing: .02em; white-space: nowrap; border: 1px solid var(--line); }
.gr-st::before { content: ''; width: 7px; height: 7px; border-radius: 7px; background: currentColor; flex: none; }
.gr-st--no { color: var(--smoke); background: transparent; border-style: dashed; border-color: rgb(255 255 255 / .16); }
.gr-st--others { color: var(--mist); background: rgb(255 255 255 / .04); }
.gr-st--yes { color: var(--ok); border-color: rgb(122 209 155 / .35); background: rgb(122 209 155 / .07); }
.gr-cell { position: relative; height: 36px; display: flex; align-items: center; }
.gr-cell .gr-st { position: absolute; left: 0; }
.gr-q__foot { display: flex; justify-content: space-between; margin-top: 18px; font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); padding: 0 8px; }

/* findings (paper) */
.gr-find { padding: 34px 38px; color: #1a1616; }
.gr-find__k { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #8a7f78; }
.gr-find__t { font-family: var(--display); font-weight: 500; font-size: 34px; letter-spacing: -0.035em; line-height: 1.12; margin: 12px 0 22px; color: #141010; }
.gr-find__item { display: grid; grid-template-columns: 34px 1fr; gap: 14px; padding: 16px 0; border-top: 1px solid rgb(0 0 0 / .09); align-items: start; }
.gr-find__n { font-family: var(--mono); font-size: 15px; font-weight: 600; color: var(--flame-700); padding-top: 4px; }
.gr-find__p { font-size: 24px; line-height: 1.45; color: #2a2422; }
.gr-find__hl { padding: 1px 5px; margin: 0 -5px; border-radius: 5px; -webkit-box-decoration-break: clone; box-decoration-break: clone;
  background: linear-gradient(rgb(245 131 39 / .22), rgb(245 131 39 / .22)) no-repeat 0 0 / 0% 100%; }

/* content pipeline */
.gr-flow .node__sub { font-size: 15px; letter-spacing: .06em; }
.gr-bracket { position: absolute; left: 0; top: 0; overflow: visible; }
.gr-bracket path { fill: none; stroke: rgb(245 131 39 / .55); stroke-width: 2; }
.gr-out { position: absolute; padding: 22px 24px 24px; display: flex; flex-direction: column; gap: 14px; }
.gr-out__top { display: flex; align-items: center; gap: 14px; }
.gr-out__ic { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: var(--ink-600); color: var(--mist); flex: none; }
.gr-out__t { font-size: 25px; font-weight: 500; color: var(--bone); }
.gr-out__bar { height: 12px; border-radius: 6px; background: var(--ink-600); }
.gr-out__foot { display: flex; justify-content: space-between; align-items: center; min-height: 34px; }
.gr-out__foot .mono { font-size: 15px; }

/* ad board */
.gr-ads { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.gr-ad { border-radius: 16px; border: 1px solid var(--line); background: var(--ink-850); overflow: hidden; position: relative; }
.gr-ad__th { position: relative; height: 150px; overflow: hidden; background: var(--ink-750); }
.gr-ad__meta { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 4px; }
.gr-ad__v { font-family: var(--mono); font-size: 15px; letter-spacing: .08em; text-transform: uppercase; color: var(--smoke); }
.gr-ad__a { font-size: 20px; color: var(--bone); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gr-ad__chip { position: absolute; left: 12px; top: 12px; z-index: 2; }
.gr-ad__chip .chip { background: rgb(17 16 16 / .88); }
.gr-th-a { position: absolute; border-radius: 6px; }

/* outbound approval */
.gr-appr.appr { padding: 30px 34px 32px; }
.gr-appr .appr__title { font-size: 30px; margin-bottom: 20px; text-wrap: balance; }
.gr-appr .appr__kv { grid-template-columns: 130px 1fr; font-size: 23px; line-height: 1.35; }
.gr-appr .appr__kv dd:last-of-type { color: var(--mist); font-style: italic; }
.gr-appr .appr__done { font-size: 17px; padding: 0 26px; }

/* report */
.gr-mtiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.gr-mt { position: relative; height: 176px; border-radius: 16px; border: 1px solid var(--line); background: var(--ink-850); padding: 20px 22px; overflow: hidden; }
.gr-mt__l { font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--mist); }
.gr-mt svg { position: absolute; left: 22px; bottom: 22px; width: 348px; height: 96px; overflow: visible; }
.gr-mt .ax { stroke: rgb(255 255 255 / .08); stroke-width: 1; }
.gr-mt .ln { fill: none; stroke: var(--flame-500); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
.gr-mt .ar { stroke: none; }
.gr-rtab { margin-top: 26px; }
.gr-rtr { display: grid; grid-template-columns: 1fr 210px 520px; column-gap: 20px; align-items: center; padding: 0 8px; }
.gr-rth { height: 42px; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.gr-rrow { height: 66px; border-bottom: 1px solid var(--line); }
.gr-rrow .gr-q__t { font-size: 22px; }
.gr-moved { font-size: 21px; color: var(--mist); }
.gr-next { display: inline-flex; align-items: center; gap: 10px; padding: 7px 14px; border-radius: 8px; border: 1px solid rgb(245 131 39 / .35); background: rgb(245 131 39 / .07); color: var(--flame-300); font-family: var(--mono); font-size: 15px; white-space: nowrap; }
.gr-next svg { width: 16px; height: 16px; }

/* method + facts */
.gr-steps .step__sub { font-family: var(--mono); font-size: 18px; letter-spacing: .1em; text-transform: uppercase; }
.gr-steps .step__label { font-size: 38px; }
.gr-facts { position: absolute; left: 120px; right: 120px; top: 770px; display: grid; grid-template-columns: 1fr 1.5fr 1.3fr; column-gap: 48px; border-top: 1px solid var(--line-strong); padding-top: 26px; }
.gr-fact { display: flex; flex-direction: column; gap: 10px; }
.gr-fact .mono { font-size: 16px; }
.gr-fact__v { font-size: 28px; font-weight: 500; color: var(--bone); line-height: 1.3; }
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
  const hud = lib.hud(stage, { ix: '03', unit: c.unit });
  hud.in(tl, 0.2);

  // unit helper: step header ("01" + headline + sub line), top left
  const stepHead = (n, title, sub) => {
    const el = h('div', 'gr-head');
    const num = h('div', 'gr-head__n', n);
    const hl = lib.headline(title, { size: 'sm' });
    const s = h('div', 'gr-head__sub', sub);
    el.append(num, hl.el, s);
    return {
      el,
      in(at, subAt) {
        lib.fadeUp(tl, num, at, { y: 10, dur: 0.6 });
        hl.in(tl, at + 0.05);
        lib.fadeUp(tl, s, subAt, { y: 14, dur: 0.8 });
      },
    };
  };
  const statusChip = (kind) => h('span', `gr-st gr-st--${kind}`, c.st[kind]);

  /* ============ 0 to 8: hook, an AI answer that names other brands ============ */
  const L1 = lib.layer(stage, { visible: true });
  const ai = lib.aiAnswer({
    query: c.query,
    label: c.aiLabel,
    paragraphs: c.answers.map(([b, t], i) => `<span class="brand">${b}:</span> ${t}<span class="gr-cite">${i + 1}</span>`),
    sources: c.sources,
  });
  ai.el.classList.add('gr-ai');
  place(ai.el, { x: 300, y: 170, w: 1320 });
  const miss = h('div', 'gr-miss');
  const missChip = h('div', 'gr-miss__chip');
  missChip.append(h('i'), h('b', null, c.brand), h('span', null, '·'), document.createTextNode(c.notMentioned));
  miss.append(missChip);
  ai.el.append(miss);
  gsap.set(missChip, { autoAlpha: 0 });
  const hookCol = place(h('div', 'gr-col'), { x: 300, y: 752, w: 1320 });
  hookCol.style.gap = '14px';
  const hk1 = lib.headline(c.hook1, { size: 'sm', maxWidth: 1320 });
  hk1.el.classList.add('gr-mist');
  const hk2 = lib.headline(c.hook2, { size: 'sm', maxWidth: 1320 });
  hookCol.append(hk1.el, hk2.el);
  L1.append(ai.el, hookCol);
  lib.fadeUp(tl, ai.search, 0.3, { y: 20, dur: 0.8 });
  hk1.in(tl, 0.7);
  ai.typeQuery(tl, 0.9, { cps: es ? 30 : 26 });
  ai.in(tl, 3.1);
  tl.to(ai.search.querySelector('.search__caret'), { autoAlpha: 0, duration: 0.3 }, 3.0);
  tl.fromTo(missChip, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 4.4);
  hk2.in(tl, 4.8);
  lib.hide(tl, L1, 7.5, { dur: 0.5, y: -14 });

  /* ============ 8 to 15.6: promise, title + four engines (poster) ============ */
  const L2 = lib.layer(stage);
  const left = place(h('div', 'gr-col'), { x: 120, y: 350, w: es ? 900 : 860 });
  const eb = lib.eyebrow({ ix: '03', text: c.unit });
  const pt = lib.headline(c.heroTitle, { size: es ? 'sm' : 'md', maxWidth: es ? 900 : 860 });
  if (es) pt.el.style.fontSize = '56px';
  pt.el.style.marginTop = '30px';
  const psub = h('p', 'lede', c.heroSub);
  psub.style.marginTop = '34px'; psub.style.fontSize = '32px';
  left.append(eb, pt.el, psub);
  const right = place(h('div', 'gr-col'), { x: 1180, y: 290, w: 620 });
  right.style.gap = '16px';
  const ek = h('div', 'gr-kicker', c.enginesKicker);
  ek.style.marginBottom = '10px';
  right.append(ek);
  const engs = c.engines.map(([ic, t, chipT]) => {
    const d = h('div', 'card gr-eng');
    const icb = h('div', 'gr-eng__ic'); icb.append(lib.icon(ic, { size: 24 }));
    d.append(icb, h('div', 'gr-eng__t', t), h('span', 'chip', chipT));
    right.append(d);
    return d;
  });
  L2.append(left, right);
  lib.show(tl, L2, 7.95, { dur: 0.01 });
  lib.fadeUp(tl, eb, 8.1, { y: 12, dur: 0.7 });
  pt.in(tl, 8.25, { stagger: 0.45 });
  lib.fadeUp(tl, psub, 10.0, { y: 16, dur: 0.8 });
  lib.fadeUp(tl, ek, 9.9, { y: 10, dur: 0.6 });
  lib.fadeUp(tl, engs, 10.1, { y: 24, dur: 0.8, stagger: 0.25 });
  tl.addLabel('poster', 12.5);

  /* ============ 15.6 to 24.6: step 01, question set + findings ============ */
  const L3 = lib.layer(stage);
  lib.swap(tl, L2, L3, 15.6, { dur: 0.6 });
  const h1 = stepHead('01', c.s1, c.s1b);
  L3.append(h1.el);
  const qw = lib.win({ title: c.qWin, badge: c.baseline, x: 120, y: 330, w: 1100 });
  qw.bar.querySelector('.win__badge').classList.add('gr-badge-flame');
  const qt = h('div', 'gr-q');
  const qth = h('div', 'gr-q__tr gr-q__th');
  [c.qCol, ...c.asst].forEach((t) => qth.append(h('div', null, t)));
  qt.append(qth);
  // example baseline grid (illustrative UI state)
  const GRID = [['no', 'others', 'no'], ['others', 'no', 'no'], ['no', 'yes', 'others'], ['no', 'no', 'others']];
  const qRows = [], qChips = [];
  c.questions.forEach((q, i) => {
    const r = h('div', 'gr-q__tr gr-q__row');
    r.append(h('div', 'gr-q__t', q));
    GRID[i].forEach((k) => {
      const cell = h('div', 'gr-cell'); const ch = statusChip(k);
      cell.append(ch); r.append(cell); qChips.push(ch);
    });
    qt.append(r); qRows.push(r);
  });
  const foot = h('div', 'gr-q__foot');
  foot.append(h('span', null, es ? 'pregunta por pregunta' : 'question by question'), h('span', null, es ? 'ejemplo' : 'example'));
  qt.append(foot);
  qw.body.append(qt);
  gsap.set(qChips, { autoAlpha: 0 });
  const fw = lib.win({ title: c.fWin, paper: true, x: 1260, y: 330, w: 540, bodyPad: 0 });
  const fd = h('div', 'gr-find');
  fd.append(h('div', 'gr-find__k', c.fKicker), h('div', 'gr-find__t', c.fTitle));
  const fItems = c.findings.map((t, i) => {
    const it = h('div', 'gr-find__item');
    const p = h('div', 'gr-find__p');
    const hl = h('span', 'gr-find__hl', t);
    p.append(hl);
    it.append(h('div', 'gr-find__n', String(i + 1).padStart(2, '0')), p);
    fd.append(it);
    return { it, hl };
  });
  fw.body.append(fd);
  L3.append(qw.el, fw.el);
  h1.in(16.1, 20.2);
  qw.in(tl, 16.4);
  lib.fadeUp(tl, qth, 16.8, { y: 10, dur: 0.5 });
  lib.fadeUp(tl, qRows, 16.95, { y: 14, dur: 0.6, stagger: 0.12 });
  qChips.forEach((ch, i) => tl.fromTo(ch, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out' }, 17.8 + Math.floor(i / 3) * 0.32 + (i % 3) * 0.1));
  fw.in(tl, 20.3);
  lib.fadeUp(tl, [fd.children[0], fd.children[1]], 20.6, { y: 10, dur: 0.6, stagger: 0.08 });
  lib.fadeUp(tl, fItems.map((f) => f.it), 20.8, { y: 12, dur: 0.6, stagger: 0.12 });
  fItems.forEach((f, i) => tl.fromTo(f.hl, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 0.7, ease: 'power3.inOut', immediateRender: false }, 21.5 + i * 0.8));

  /* ============ 24.6 to 33.6: step 02, content pipeline ============ */
  const L4 = lib.layer(stage);
  lib.swap(tl, L3, L4, 24.6, { dur: 0.6 });
  const h2 = stepHead('02', c.s2, c.s2b);
  L4.append(h2.el);
  // one row; centers are spread evenly after measuring the real node widths (both languages)
  const FX = [150, 500, 850, 1200, 1550], FY = [70, 70, 70, 70, 70];
  const fl = lib.flow({ x: 120, y: 330, w: 1680, h: 150, nodes: c.nodes.map(([ic, label, sub], i) => ({
    id: 'n' + i, x: FX[i], y: FY[i], label, sub, icon: ic, kind: i === 3 ? 'human' : i === 4 ? 'accent' : undefined,
  })), edges: [0, 1, 2, 3].map((i) => ({ from: 'n' + i, to: 'n' + (i + 1), curve: 'h', hot: i === 3 })) });
  fl.el.classList.add('gr-flow');
  L4.append(fl.el);
  {
    const ns = c.nodes.map((_, i) => fl.nodes['n' + i]);
    const ws = ns.map((n) => n.offsetWidth);
    const gap = (1680 - ws.reduce((a, b) => a + b, 0)) / (ns.length - 1);
    let x0 = 0;
    ns.forEach((n, i) => { FX[i] = x0 + ws[i] / 2; n.style.left = FX[i] + 'px'; x0 += ws[i] + gap; });
  }
  // outputs fan out from Approved
  const OY = 650, OW = 396, OG = 32;
  const outs = c.outputs.map(([ic, t], i) => {
    const d = h('div', 'card gr-out');
    place(d, { x: 120 + i * (OW + OG), y: OY, w: OW });
    const top = h('div', 'gr-out__top');
    const icb = h('div', 'gr-out__ic'); icb.append(lib.icon(ic, { size: 22 }));
    top.append(icb, h('div', 'gr-out__t', t));
    const b1 = h('div', 'gr-out__bar'); b1.style.width = ['88%', '80%', '92%', '76%'][i];
    const b2 = h('div', 'gr-out__bar'); b2.style.width = ['62%', '54%', '40%', '66%'][i];
    const ft = h('div', 'gr-out__foot');
    ft.append(h('span', 'mono mono--sm', c.thisWeek));
    d.append(top, b1, b2, ft);
    L4.append(d);
    return { d, ft };
  });
  const ready = h('span', 'chip chip--flame', c.readyChip);
  outs[0].ft.append(ready);
  gsap.set(ready, { autoAlpha: 0 });
  // bracket: down from Approved, across, and down into each card
  const ax = 120 + FX[4], ay = 330 + FY[4] + 44, busY = 590;
  const NS = 'http://www.w3.org/2000/svg';
  const br = document.createElementNS(NS, 'svg');
  br.setAttribute('class', 'gr-bracket'); br.setAttribute('width', '1920'); br.setAttribute('height', '1080');
  const cx = outs.map((_, i) => 120 + i * (OW + OG) + OW / 2);
  const paths = [`M${ax} ${ay} L${ax} ${busY - 14} Q${ax} ${busY} ${ax - 14} ${busY} L${cx[0] + 14} ${busY} Q${cx[0]} ${busY} ${cx[0]} ${busY + 14} L${cx[0]} ${OY}`,
    ...cx.slice(1).map((x) => `M${x} ${busY} L${x} ${OY}`)];
  const brPaths = paths.map((d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); br.append(p); return p; });
  L4.append(br);
  h2.in(25.0, 29.4);
  fl.in(tl, 25.6, { gap: 0.42 });
  [0, 1, 2, 3].forEach((i) => fl.pulse(tl, 28.0 + i * 0.5, i, { dur: 0.5 }));
  fl.focus(tl, 29.3, 'n3', { hold: 1.0 });
  brPaths.forEach((p, i) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });
    tl.to(p, { strokeDashoffset: 0, duration: i ? 0.3 : 1.0, ease: i ? 'power2.out' : 'power2.inOut' }, i ? 30.5 + (3 - i) * 0.12 : 30.0);
  });
  // cards land right to left, following the line from Approved
  [3, 2, 1, 0].forEach((i, k) => lib.fadeUp(tl, outs[i].d, 30.7 + k * 0.15, { y: 20, dur: 0.7 }));
  tl.fromTo(ready, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, 31.7);

  /* ============ 33.6 to 42.6: step 03, ad variants + outbound approval ============ */
  const L5 = lib.layer(stage);
  lib.swap(tl, L4, L5, 33.6, { dur: 0.6 });
  const h3 = stepHead('03', c.s3, c.s3b);
  L5.append(h3.el);
  const aw = lib.win({ title: c.adsWin, x: 120, y: 330, w: 860 });
  aw.body.style.padding = '24px 26px 26px';
  const board = h('div', 'gr-ads');
  // thumbnail compositions: abstract ad layouts, no imagery
  const thumb = (k) => {
    const th = h('div', 'gr-ad__th');
    const add = (css) => { const s = h('span', 'gr-th-a'); s.setAttribute('style', css); th.append(s); return s; };
    if (k === 0) { add('right:22px;top:26px;width:86px;height:86px;border-radius:50%;background:#3d3737'); add('left:18px;bottom:48px;width:120px;height:12px;background:#f4efe9;opacity:.85'); add('left:18px;bottom:28px;width:80px;height:10px;background:#968d87'); }
    if (k === 1) { add('left:0;top:0;bottom:0;width:46%;background:linear-gradient(180deg,#f58327,#d65805)'); add('right:18px;top:34px;width:92px;height:14px;background:#f4efe9;opacity:.85'); add('right:18px;top:58px;width:64px;height:10px;background:#968d87'); add('right:18px;bottom:22px;width:70px;height:24px;border-radius:12px;background:#2f2a2a'); }
    if (k === 2) { add('right:20px;top:14px;font:600 54px/1 "Unbounded Variable";color:#ff8442;border-radius:0'); th.lastChild.textContent = '“'; add('left:18px;top:76px;width:150px;height:12px;background:#f4efe9;opacity:.85'); add('left:18px;top:98px;width:116px;height:12px;background:#f4efe9;opacity:.5'); add('left:18px;bottom:14px;width:26px;height:26px;border-radius:50%;background:#3d3737'); }
    return th;
  };
  // [angle, status] per variant (example UI state)
  const ADS = [[0, 'test'], [1, 'scaled'], [2, 'fresh'], [1, 'test'], [0, 'retired'], [2, 'fresh']];
  const adEls = ADS.map(([a, s], i) => {
    const d = h('div', 'gr-ad');
    const th = thumb(a);
    const meta = h('div', 'gr-ad__meta');
    meta.append(h('div', 'gr-ad__v', `${c.variant} ${12 + i}`), h('div', 'gr-ad__a', c.angles[a]));
    const cw = h('div', 'gr-ad__chip');
    const kind = s === 'test' ? 'chip chip--flame' : s === 'scaled' ? 'chip chip--ok' : 'chip';
    const ch = h('span', kind, c.adSt[s]);
    cw.append(ch);
    d.append(th, meta, cw);
    board.append(d);
    gsap.set(ch, { autoAlpha: 0 });
    return { d, ch, s };
  });
  aw.body.append(board);
  const ap = lib.approval({ flag: c.apprFlag, title: c.apprTitle, fields: c.apprFields, approve: c.approve, reject: c.edit, approved: c.approvedPill, x: 1030, y: 330, w: 770 });
  ap.el.classList.add('gr-appr');
  L5.append(aw.el, ap.el);
  const cur = lib.cursor(stage, { x: 1560, y: 1000 });
  h3.in(34.0, 37.9);
  aw.in(tl, 34.3);
  lib.popIn(tl, adEls.map((a) => a.d), 34.6, { scale: 0.96, dur: 0.7, stagger: 0.08 });
  adEls.forEach((a, i) => {
    tl.fromTo(a.ch, { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 36.0 + i * 0.14);
    if (a.s === 'retired') tl.to(a.d, { opacity: 0.42, duration: 0.6 }, 36.9);
    if (a.s === 'scaled') tl.to(a.d, { borderColor: 'rgba(122,209,155,.4)', duration: 0.6 }, 36.4);
  });
  ap.in(tl, 37.6);
  cur.in(tl, 39.1);
  cur.moveTo(tl, 39.2, ap.approveBtn, { dur: 1.1, dx: -30, dy: 6 });
  cur.click(tl, 40.45, ap.approveBtn);
  ap.decide(tl, 40.5, 'approve');
  ap.el.querySelector('.appr__flag > span > span:nth-child(2)').textContent = c.approvedFlag;
  cur.out(tl, 41.3);

  /* ============ 42.6 to 50.6: step 04, monthly report ============ */
  const L6 = lib.layer(stage);
  lib.swap(tl, L5, L6, 42.6, { dur: 0.6 });
  const h4 = stepHead('04', c.s4, c.s4b);
  L6.append(h4.el);
  const rw = lib.win({ title: c.rWin, badge: c.exampleView, x: 120, y: 330, w: 1680 });
  rw.bar.querySelector('.win__badge').classList.add('gr-badge-muted');
  rw.body.style.padding = '24px 28px 22px';
  const mt = h('div', 'gr-mtiles');
  // sparkline shapes only, no values: one dip then rise, two gentle rises, one flat
  const SHAPES = [[30, 26, 22, 28, 34, 40, 46], [20, 24, 23, 28, 31, 33, 38], [30, 31, 29, 30, 31, 30, 31], [18, 20, 26, 25, 30, 34, 37]];
  const sparks = c.metrics.map((m, i) => {
    const d = h('div', 'gr-mt');
    d.append(h('div', 'gr-mt__l', m));
    const v = SHAPES[i];
    const pts = v.map((y, j) => [(j / (v.length - 1)) * 348, 96 - (y / 50) * 96]);
    const dd = 'M' + pts.map((p) => p.map((n) => n.toFixed(2)).join(' ')).join(' L');
    const wrap = h('div');
    wrap.innerHTML = `<svg viewBox="0 0 348 96"><defs><linearGradient id="grsp${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f58327" stop-opacity=".2"/><stop offset="1" stop-color="#f58327" stop-opacity="0"/></linearGradient></defs><line class="ax" x1="0" y1="96" x2="348" y2="96"/><path class="ar" fill="url(#grsp${i})" d="${dd} L348 96 L0 96 Z"/><path class="ln" d="${dd}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`;
    d.append(wrap.firstChild);
    mt.append(d);
    return { d, ln: d.querySelector('.ln'), ar: d.querySelector('.ar') };
  });
  const rt = h('div', 'gr-rtab');
  const rth = h('div', 'gr-rtr gr-rth');
  c.rCols.forEach((t) => rth.append(h('div', null, t)));
  rt.append(rth);
  const rRows = c.rRows.map(([q, moved], i) => {
    const r = h('div', 'gr-rtr gr-rrow');
    const cell = h('div', 'gr-cell');
    const third = h('div');
    r.append(h('div', 'gr-q__t', q), cell, third);
    rt.append(r);
    return { r, cell, third, moved, i };
  });
  // row 0 flips, row 1 stays with a next fix, row 2 steady
  const r0a = statusChip('no'), r0b = statusChip('yes');
  rRows[0].cell.append(r0a, r0b);
  gsap.set(r0b, { autoAlpha: 0 });
  const r0m = h('span', 'gr-moved', rRows[0].moved); rRows[0].third.append(r0m); gsap.set(r0m, { autoAlpha: 0 });
  rRows[1].cell.append(statusChip('no'));
  const nf = h('span', 'gr-next'); nf.append(lib.icon('arrow', { size: 16, stroke: 2 }), document.createTextNode(c.nextFix));
  rRows[1].third.append(nf); gsap.set(nf, { autoAlpha: 0 });
  rRows[2].cell.append(statusChip('yes'));
  rRows[2].third.append(h('span', 'gr-moved', rRows[2].moved));
  rw.body.append(mt, rt);
  L6.append(rw.el);
  h4.in(43.0, 46.6);
  rw.in(tl, 43.3);
  lib.fadeUp(tl, sparks.map((s) => s.d), 43.6, { y: 16, dur: 0.6, stagger: 0.08 });
  sparks.forEach((s, i) => {
    tl.to(s.ln, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 43.9 + i * 0.15);
    tl.fromTo(s.ar, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 44.3 + i * 0.15);
  });
  lib.fadeUp(tl, [rth, ...rRows.map((r) => r.r)], 44.3, { y: 12, dur: 0.6, stagger: 0.1 });
  tl.to(r0a, { autoAlpha: 0, y: -8, duration: 0.3, ease: 'power2.in' }, 45.6);
  tl.fromTo(r0b, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 45.85);
  tl.fromTo(r0m, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, 46.0);
  tl.fromTo(nf, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, 46.4);

  /* ============ 50.6 to 57.6: how we run it ============ */
  const L7 = lib.layer(stage);
  lib.swap(tl, L6, L7, 50.6, { dur: 0.6 });
  const how = lib.headline(c.howTitle, { size: 'md', maxWidth: 1680 });
  if (es) how.el.style.fontSize = '60px';
  place(how.el, { x: 120, y: 230 });
  const st = lib.steps({ items: c.method.map(([label, sub]) => ({ label, sub })), x: 120, y: 470, w: 1680, gap: 40 });
  st.el.classList.add('gr-steps');
  const facts = h('div', 'gr-facts');
  const factEls = c.facts.map(([k, v]) => { const f = h('div', 'gr-fact'); f.append(h('div', 'mono', k), h('div', 'gr-fact__v', v)); facts.append(f); return f; });
  L7.append(how.el, st.el, facts);
  how.in(tl, 51.1);
  st.in(tl, 51.7);
  [0, 1, 2, 3].forEach((i) => st.go(tl, 52.2 + i * 0.7, i));
  tl.fromTo(facts, { borderTopColor: 'rgba(255,255,255,0)' }, { borderTopColor: 'rgba(255,255,255,0.14)', duration: 0.6 }, 54.6);
  lib.fadeUp(tl, factEls, 54.8, { y: 16, dur: 0.7, stagger: 0.2 });
  hud.chrome(tl, 57.6, false);
  lib.hide(tl, L7, 57.6, { dur: 0.5, y: -14 });

  /* ============ 58 to 64: CTA ============ */
  const L8 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.cta });
  L8.append(cta.el);
  lib.show(tl, L8, 58.1, { dur: 0.01 });
  cta.in(tl, 58.2);
  tl.set({}, {}, 64);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
