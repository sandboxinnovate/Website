// Partners explainer. Storyboard: video/storyboards/partners.json
// Story: the agency's inbox fills with client AI requests, then the partnership in four steps
// (qualify, package, deliver, grow) told through partner-only mockups: call notes with the three models,
// the partner kit, a white-label brand swap on the delivered product, and the "who does what" board.
// Claims come from src/i18n/units/partners.ts, src/components/unit/PartnersFlow/copy.ts,
// src/components/unit/visuals/copy.ts and the white-label blog post. The agency is always the
// placeholder "Your Agency". Inbox times and the sample chat answer are example UI states.

export const meta = {
  title: { en: 'How partnering with Sandbox works', es: 'Cómo funciona ser partner de Sandbox' },
  poster: 12.5,
};

export const copy = {
  en: {
    unit: 'Partners',
    agency: 'Your Agency', domain: 'ai.youragency.com',
    inboxTitle: 'Inbox · Your Agency', inboxFolder: 'Clients', unread: '4 unread',
    mail: [
      ['R.M. · Client, retail', 'RM', 'Quarterly review: so what are we doing with AI?', '09:12'],
      ['J.P. · Client, clinic', 'JP', 'Can the new site come with an assistant?', '10:40'],
      ['A.L. · Client, B2B', 'AL', 'Do we show up when people ask AI assistants?', '11:05'],
      ['C.S. · Client, hotel', 'CS', 'Another firm pitched us an AI assistant', '14:31'],
    ],
    aiTag: 'AI request',
    hook1: 'Your clients are asking for AI.', hook2: 'You don’t have the team to build it.',
    heroTitle: 'Sell AI under your brand.<br><em>We build it behind you.</em>',
    heroLede: 'You keep the client. We build and run it.',
    handoff: { sbx: 'Sandbox', sbxSub: 'builds & runs', layer: 'your brand applied', you: 'Your agency', youSub: 'sells & owns the client', client: 'Your client', clientSub: 'sees one brand', packets: ['agent', 'brain', 'report'] },
    steps: [['Qualify', '1-2 calls'], ['Package', '1-2 weeks'], ['Deliver', 'Per project'], ['Grow', 'Ongoing']],
    s1: 'We agree on the model that fits.',
    models: [['White-label', 'Your brand, our build'], ['Co-delivery', 'One team, openly'], ['Referral', 'You introduce, we deliver']],
    modelsKicker: 'Partnership models', fits: 'Model that fits',
    notesTitle: 'Partner call · notes', notesKicker: 'Call 1 · discovery',
    notes: ['Clients asking for: <mark>an assistant with every website</mark>', 'Team: account leads, no engineers', 'First opportunity: <mark>one client, one process</mark>'],
    s2: 'Agreement, brand kit and sales materials.',
    agreement: 'Partner agreement', parties: 'Your Agency · Sandbox',
    terms: ['Client relationship stays with you', 'No contact with your clients unless you ask', 'Your brand on every deliverable'],
    brandKit: 'Brand kit', swatches: ['Bone', 'Ink', 'Accent'], typeLabel: 'Headings · Body',
    salesKit: 'Sales kit', proposal: 'Proposal', proposalTitle: 'AI assistant for your website', onePager: 'One-pager',
    s3: 'Delivered under your brand and domain.', s3b: 'Your team is in every review.',
    appTitle: 'Website assistant', staging: 'staging.build', sbxBuild: 'Sandbox build', live: 'Live',
    nav: ['Conversations', 'Knowledge', 'Reports', 'Settings'],
    preview: 'Website assistant · preview', aiLabel: 'AI assistant',
    q: 'Do you deliver on weekends?', a: 'Yes, Saturdays until 2 pm. Want me to check your area?',
    inputPh: 'Ask a question',
    review: { flag: 'Launch review', title: 'Ready for your client', fields: [['Brand', 'Your Agency'], ['Domain', 'ai.youragency.com'], ['Docs', 'Your template'], ['Support', 'Behind your team']], approve: 'Approve', reject: 'Reject', approved: 'Approved by your project lead', closed: 'Review closed' },
    s4: 'We run the systems behind you.', s4b: 'The client stays yours. In writing.',
    board: { stage: 'Stage', you: 'Your agency', sbx: 'Sandbox', youShort: 'You', rows: ['Client relationship', 'Selling & proposal', 'Build & operation', 'Brand on deliverables', 'First-line support'] },
    sees: 'Your client sees', seesV: 'Your brand only', ongoing: 'Ongoing', grow: ['Operation & support', 'Quarterly review'],
    m1: 'Three ways to partner.', m2: 'You choose how visible we are.', timeline: 'Timeline',
    cards: [['White-label', 'Your client only sees you', '3-10 weeks per project', 'Your brand only'], ['Co-delivery', 'We join your team, openly', 'Per project', 'Your brand, with Sandbox as your AI partner'], ['Referral', 'You introduce, we deliver', 'Ongoing', 'Sandbox, introduced by you']],
    signHere: ['Your Agency', 'Sandbox'],
    ctaTitle: 'Bring us<br><em>your next AI request.</em>', ctaButton: 'Book a partner call',
  },
  es: {
    unit: 'Partners',
    agency: 'Tu Agencia', domain: 'ai.tuagencia.com',
    inboxTitle: 'Bandeja · Tu Agencia', inboxFolder: 'Clientes', unread: '4 sin leer',
    mail: [
      ['R.M. · Cliente, retail', 'RM', 'Revisión trimestral: ¿y qué hacemos con IA?', '09:12'],
      ['J.P. · Cliente, clínica', 'JP', '¿El sitio nuevo puede venir con un asistente?', '10:40'],
      ['A.L. · Cliente, B2B', 'AL', '¿Aparecemos cuando la gente pregunta a un asistente de IA?', '11:05'],
      ['C.S. · Cliente, hotel', 'CS', 'Otra firma nos ofreció un asistente de IA', '14:31'],
    ],
    aiTag: 'Pedido de IA',
    hook1: 'Tus clientes te piden IA.', hook2: 'No tienes el equipo para construirla.',
    heroTitle: 'Vende IA con tu marca.<br><em>Nosotros la construimos.</em>',
    heroLede: 'El cliente es tuyo. Nosotros construimos y operamos.',
    handoff: { sbx: 'Sandbox', sbxSub: 'construye y opera', layer: 'se aplica tu marca', you: 'Tu agencia', youSub: 'vende y lleva al cliente', client: 'Tu cliente', clientSub: 've una sola marca', packets: ['agente', 'brain', 'reporte'] },
    steps: [['Calificar', '1-2 llamadas'], ['Empaquetar', '1-2 semanas'], ['Entregar', 'Por proyecto'], ['Crecer', 'Continuo']],
    s1: 'Acordamos el modelo que encaja.',
    models: [['Marca blanca', 'Tu marca, nuestra construcción'], ['Entrega conjunta', 'Un solo equipo, a la vista'], ['Referidos', 'Tú presentas, nosotros entregamos']],
    modelsKicker: 'Modelos de alianza', fits: 'Modelo que encaja',
    notesTitle: 'Llamada de partners · notas', notesKicker: 'Llamada 1 · diagnóstico',
    notes: ['Los clientes piden: <mark>un asistente con cada sitio web</mark>', 'Equipo: líderes de cuenta, sin ingenieros', 'Primera oportunidad: <mark>un cliente, un proceso</mark>'],
    s2: 'Acuerdo, kit de marca y materiales de venta.',
    agreement: 'Acuerdo de partners', parties: 'Tu Agencia · Sandbox',
    terms: ['La relación con el cliente es tuya', 'Sin contacto con tus clientes salvo que lo pidas', 'Tu marca en cada entregable'],
    brandKit: 'Kit de marca', swatches: ['Hueso', 'Tinta', 'Acento'], typeLabel: 'Títulos · Texto',
    salesKit: 'Kit de venta', proposal: 'Propuesta', proposalTitle: 'Asistente de IA para tu sitio web', onePager: 'Resumen',
    s3: 'Entregado con tu marca y tu dominio.', s3b: 'Tu equipo está en cada revisión.',
    appTitle: 'Asistente del sitio web', staging: 'staging.build', sbxBuild: 'Versión de Sandbox', live: 'En marcha',
    nav: ['Conversaciones', 'Conocimiento', 'Reportes', 'Ajustes'],
    preview: 'Asistente del sitio · vista previa', aiLabel: 'Asistente de IA',
    q: '¿Hacen entregas los fines de semana?', a: 'Sí, los sábados hasta las 14 h. ¿Reviso si llegamos a tu zona?',
    inputPh: 'Escribe una pregunta',
    review: { flag: 'Revisión de lanzamiento', title: 'Listo para tu cliente', fields: [['Marca', 'Tu Agencia'], ['Dominio', 'ai.tuagencia.com'], ['Docs', 'Tu plantilla'], ['Soporte', 'Detrás de tu equipo']], approve: 'Aprobar', reject: 'Rechazar', approved: 'Aprobado por tu líder de proyecto', closed: 'Revisión cerrada' },
    s4: 'Operamos los sistemas detrás de ti.', s4b: 'El cliente sigue siendo tuyo. Por escrito.',
    board: { stage: 'Etapa', you: 'Tu agencia', sbx: 'Sandbox', youShort: 'Tú', rows: ['Relación con el cliente', 'Venta y propuesta', 'Construcción y operación', 'Marca en los entregables', 'Soporte de primera línea'] },
    sees: 'Tu cliente ve', seesV: 'Solo tu marca', ongoing: 'Continuo', grow: ['Operación y soporte', 'Revisión trimestral'],
    m1: 'Tres formas de asociarte.', m2: 'Tú eliges qué tan visibles somos.', timeline: 'Plazo',
    cards: [['Marca blanca', 'Tu cliente solo te ve a ti', '3-10 semanas por proyecto', 'Solo tu marca'], ['Entrega conjunta', 'Nos sumamos a tu equipo, a la vista', 'Por proyecto', 'Tu marca, con Sandbox como partner de IA'], ['Referidos', 'Tú presentas, nosotros entregamos', 'Continuo', 'Sandbox, presentado por ti']],
    signHere: ['Tu Agencia', 'Sandbox'],
    ctaTitle: 'Tráenos<br><em>tu próximo pedido de IA.</em>', ctaButton: 'Agendar una llamada de partners',
  },
};

export const transcript = {
  en: [
    'Your clients are asking for AI. You don’t have the team to build it. In the agency inbox: “So what are we doing with AI?”, “Can the new site come with an assistant?”, “Do we show up when people ask AI assistants?”, “Another firm pitched us an AI assistant.”',
    'Sell AI under your brand. We build it behind you. You keep the client. We build and run it: Sandbox builds and runs, your brand is applied, your agency sells and owns the client, and your client sees one brand.',
    'Step 1, Qualify, 1 to 2 calls. We agree on the model that fits: white-label, co-delivery or referral.',
    'Step 2, Package, 1 to 2 weeks. Agreement, brand kit and sales materials. The client relationship stays with you, no contact with your clients unless you ask, and your brand on every deliverable.',
    'Step 3, Deliver, per project. Delivered under your brand and domain. Your team is in every review, and your project lead approves the launch.',
    'Step 4, Grow, ongoing. We run the systems behind you. The client stays yours. In writing. Your client sees your brand only, with operation and support and a quarterly review.',
    'Three ways to partner. You choose how visible we are. White-label: your client only sees you, 3 to 10 weeks per project. Co-delivery: we join your team, openly, per project. Referral: you introduce, we deliver, ongoing.',
    'Bring us your next AI request. Book a partner call at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    'Tus clientes te piden IA. No tienes el equipo para construirla. En la bandeja de la agencia: “¿Y qué hacemos con IA?”, “¿El sitio nuevo puede venir con un asistente?”, “¿Aparecemos cuando la gente pregunta a un asistente de IA?”, “Otra firma nos ofreció un asistente de IA.”',
    'Vende IA con tu marca. Nosotros la construimos. El cliente es tuyo. Nosotros construimos y operamos: Sandbox construye y opera, se aplica tu marca, tu agencia vende y lleva al cliente, y tu cliente ve una sola marca.',
    'Paso 1, Calificar, 1 a 2 llamadas. Acordamos el modelo que encaja: marca blanca, entrega conjunta o referidos.',
    'Paso 2, Empaquetar, 1 a 2 semanas. Acuerdo, kit de marca y materiales de venta. La relación con el cliente es tuya, sin contacto con tus clientes salvo que lo pidas y con tu marca en cada entregable.',
    'Paso 3, Entregar, por proyecto. Entregado con tu marca y tu dominio. Tu equipo está en cada revisión, y tu líder de proyecto aprueba el lanzamiento.',
    'Paso 4, Crecer, continuo. Operamos los sistemas detrás de ti. El cliente sigue siendo tuyo. Por escrito. Tu cliente ve solo tu marca, con operación y soporte y una revisión trimestral.',
    'Tres formas de asociarte. Tú eliges qué tan visibles somos. Marca blanca: tu cliente solo te ve a ti, 3 a 10 semanas por proyecto. Entrega conjunta: nos sumamos a tu equipo, a la vista, por proyecto. Referidos: tú presentas, nosotros entregamos, continuo.',
    'Tráenos tu próximo pedido de IA. Agenda una llamada de partners en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* The agency's placeholder accent: a muted sage green that never reads as Sandbox orange. */
const AG = '#86ad8f';

const CSS = `
.stage { --agency: ${AG}; --agency-dim: rgb(134 173 143 / .14); }
.stage .chip { font-size: 15px; }
.stage .win__badge { font-size: 15px; }
.pt-col { position: absolute; display: flex; flex-direction: column; }
.pt-mist { color: var(--mist) !important; }
.chip--warn { color: var(--warn); border-color: rgb(242 193 78 / .35); background: rgb(242 193 78 / .07); }

/* step header */
.pt-head { position: absolute; left: 120px; top: 150px; width: 1680px; display: flex; flex-direction: column; gap: 14px; }
.pt-kick { display: flex; align-items: center; gap: 16px; font-family: var(--mono); font-size: 20px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--mist); }
.pt-kick b { color: var(--flame-400); font-weight: 500; }
.pt-kick i { width: 40px; height: 1px; background: var(--line-strong); display: block; }
.pt-kick .pt-time { color: var(--smoke); }
.pt-sub { font-size: 30px; line-height: 1.35; color: var(--mist); margin: 2px 0 0; }

/* inbox */
.pt-inbox .row { padding: 18px 20px; }
.pt-inbox .row__from { font-size: 22px; font-weight: 500; }
.pt-inbox .row__subj { font-size: 24px; color: var(--bone); margin-top: 4px; }
.pt-listhead { display: flex; align-items: center; justify-content: space-between; padding: 0 20px 14px; border-bottom: 1px solid var(--line-strong); }
.pt-listhead .mono { font-size: 16px; }
.pt-av--1 { background: #2f2826 !important; } .pt-av--2 { background: #262a2b !important; } .pt-av--3 { background: #2b2a24 !important; }

/* handoff diagram */
.pt-hand { position: absolute; left: 1080px; top: 228px; width: 720px; height: 640px; }
.pt-node { position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 16px; padding: 16px 26px 16px 16px; border-radius: 16px;
  background: var(--ink-800); border: 1px solid var(--line-strong); white-space: nowrap; box-shadow: 0 30px 60px -30px rgb(0 0 0 / .8); }
.pt-node__ic { width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; background: var(--ink-600); color: var(--mist); flex: none; }
.pt-node__l { font-size: 25px; font-weight: 500; color: var(--bone); line-height: 1.2; }
.pt-node__s { font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); margin-top: 2px; }
.pt-node--sbx { border: 1.5px dashed rgb(255 255 255 / .22); background: rgb(255 255 255 / .02); box-shadow: none; }
.pt-node--sbx .pt-node__ic { background: rgb(245 131 39 / .1); }
.pt-node--you { border-color: rgb(244 239 233 / .5); background: linear-gradient(180deg, rgb(244 239 233 / .07), rgb(244 239 233 / .02)), var(--ink-800); }
.pt-node--you .pt-node__ic { background: var(--bone); color: var(--ink-900); }
.pt-vline { position: absolute; width: 0; border-left: 1.5px solid rgb(255 255 255 / .2); transform-origin: 50% 0; }
.pt-vline--hot { border-left-color: rgb(245 131 39 / .55); }
.pt-band { position: absolute; left: 0; right: 0; height: 64px; border-radius: 10px; border: 1px solid rgb(244 239 233 / .18);
  background: repeating-linear-gradient(135deg, rgb(244 239 233 / .1) 0 2px, transparent 2px 13px); transform-origin: 0 50%; }
.pt-band__lab { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); padding: 6px 10px; border-radius: 8px; background: var(--ink-900); border: 1px solid var(--line-strong);
  font-family: var(--mono); font-size: 15px; letter-spacing: .06em; text-transform: uppercase; color: var(--bone); }
.pt-packet { position: absolute; transform: translateX(-50%); padding: 7px 14px; border-radius: 8px; background: var(--ink-900); border: 1.5px solid var(--flame-500);
  font-family: var(--mono); font-size: 16px; letter-spacing: .06em; color: var(--flame-300); white-space: nowrap; }

/* step 1 */
.pt-models { position: absolute; left: 120px; top: 350px; width: 580px; display: flex; flex-direction: column; gap: 14px; }
.pt-models .mono { font-size: 16px; margin-bottom: 6px; }
.pt-model { position: relative; display: grid; grid-template-columns: 54px 1fr; align-items: center; padding: 28px 26px; border-radius: 16px; background: var(--ink-850); border: 1px solid var(--line); }
.pt-model__ix { font-family: var(--mono); font-size: 17px; color: var(--smoke); }
.pt-model__n { font-size: 27px; font-weight: 500; color: var(--bone); line-height: 1.2; }
.pt-model__l { font-size: 21px; color: var(--mist); margin-top: 3px; }
.pt-model__sel { position: absolute; inset: -1px; border-radius: 16px; border: 2px solid var(--flame-500); background: rgb(245 131 39 / .06); opacity: 0; }
.pt-model .chip { position: absolute; right: 22px; top: 22px; }
.pt-notes .docp { padding: 44px 56px 30px; }
.pt-notes .docp__title { font-size: 40px; margin-bottom: 26px; }
.pt-notes .docp__p { font-size: 27px; line-height: 1.5; margin-bottom: 18px; padding-left: 22px; position: relative; }
.pt-notes .docp__bar { margin: 26px 0 0 22px; }
.pt-notes .docp__p::before { content: ''; position: absolute; left: 0; top: .62em; width: 7px; height: 7px; border-radius: 7px; background: #b9aea5; }

/* step 2 */
.pt-kit { position: absolute; top: 350px; width: 520px; height: 470px; padding: 30px 32px; display: flex; flex-direction: column; }
.pt-kit__h { display: flex; align-items: center; gap: 12px; color: var(--mist); }
.pt-kit__h .mono { font-size: 17px; color: var(--mist); }
.pt-kit__sub { font-family: var(--mono); font-size: 15px; letter-spacing: .06em; color: var(--smoke); margin-top: 10px; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
.pt-term { display: grid; grid-template-columns: 40px 1fr; gap: 18px; align-items: center; padding: 22px 0; border-bottom: 1px solid var(--line); }
.pt-signs { margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.pt-sign i { display: block; height: 1px; background: var(--line-strong); margin-bottom: 10px; }
.pt-sign div { font-family: var(--mono); font-size: 15px; letter-spacing: .06em; color: var(--smoke); }
.pt-term__t { font-size: 24px; color: var(--bone); line-height: 1.3; }
.pt-chk { position: relative; width: 38px; height: 38px; border-radius: 50%; border: 2px solid var(--ink-500); display: grid; place-items: center; }
.pt-chk__fill { position: absolute; inset: -2px; border-radius: 50%; background: var(--flame-500); transform: scale(0); }
.pt-chk svg { position: relative; color: #1a0d03; opacity: 0; }
.pt-logo { display: inline-flex; align-items: center; gap: 14px; }
.pt-logo__mark { flex: none; display: block; }
.pt-logo__txt { font-family: var(--display); font-weight: 600; letter-spacing: -0.03em; white-space: nowrap; }
.pt-logobox { margin-top: 22px; height: 128px; border-radius: 14px; background: var(--ink-900); border: 1px solid var(--line); display: grid; place-items: center; color: var(--bone); }
.pt-sw { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
.pt-sw__c { height: 70px; border-radius: 10px; border: 1px solid var(--line-strong); }
.pt-sw__l { font-family: var(--mono); font-size: 15px; color: var(--smoke); margin-top: 8px; letter-spacing: .04em; }
.pt-type { display: flex; align-items: baseline; gap: 22px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line); }
.pt-type__aa { font-family: var(--display); font-weight: 500; font-size: 62px; letter-spacing: -0.04em; line-height: 1; color: var(--bone); }
.pt-type__aa span { font-family: var(--sans); font-weight: 400; margin-left: 10px; color: var(--mist); }
.pt-type .mono { font-size: 15px; }
.pt-paper { position: absolute; border-radius: 10px; background: #f4efe9; color: #1a1616; box-shadow: 0 30px 60px -24px rgb(0 0 0 / .8); }
.pt-paper__k { text-align: inherit; font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #8a7f78; }
.pt-paper__t { font-family: var(--display); font-weight: 500; font-size: 28px; letter-spacing: -0.035em; line-height: 1.15; color: #141010; margin-top: 12px; }
.pt-paper__bar { height: 10px; border-radius: 5px; background: #e2dbd3; margin-top: 12px; }
.pt-paper__rule { height: 4px; width: 56px; border-radius: 2px; background: var(--agency); margin-top: 18px; }

/* step 3: product window, two states */
.pt-swap { position: absolute; left: 680px; top: 330px; width: 1120px; height: 560px; }
.pt-app { position: absolute; inset: 0; border-radius: 22px; overflow: hidden; background: linear-gradient(180deg, rgb(255 255 255 / .03), rgb(255 255 255 / .01)), var(--ink-850);
  border: 1px solid var(--line-strong); box-shadow: 0 60px 120px -40px rgb(0 0 0 / .85); display: flex; flex-direction: column; }
.pt-app--a { border: 2px dashed rgb(255 255 255 / .26); box-shadow: none; background: var(--ink-900); }
.pt-app .win__bar { flex: none; }
.pt-app .win__url { min-width: 300px; text-align: center; }
.pt-app--b .win__url { color: var(--bone); }
.pt-app--a .win__badge { color: var(--flame-400); }
.pt-app__main { flex: 1; display: grid; grid-template-columns: 270px 1fr; min-height: 0; }
.pt-side { border-right: 1px solid var(--line); padding: 26px 20px; display: flex; flex-direction: column; gap: 6px; }
.pt-side__brand { display: flex; align-items: center; gap: 12px; padding: 0 10px 22px; margin-bottom: 10px; border-bottom: 1px solid var(--line); font-size: 22px; font-weight: 700; color: var(--bone); white-space: nowrap; }
.pt-side__item { display: flex; align-items: center; gap: 14px; padding: 12px 12px; border-radius: 10px; font-size: 20px; color: var(--mist); white-space: nowrap; }
.pt-side__item svg { flex: none; }
.pt-side__item--on { color: var(--bone); background: rgb(255 255 255 / .04); box-shadow: inset 3px 0 0 var(--acc); }
.pt-pane { display: flex; flex-direction: column; padding: 24px 34px 26px; min-width: 0; }
.pt-pane__head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
.pt-pane__head .mono { font-size: 16px; }
.pt-ai { display: inline-flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 999px; font-family: var(--mono); font-size: 15px; letter-spacing: .06em; color: var(--acc); border: 1px solid var(--acc-line); }
.pt-ai::before { content: ''; width: 7px; height: 7px; border-radius: 7px; background: currentColor; }
.pt-msgs { flex: 1; display: flex; flex-direction: column; gap: 20px; padding-top: 26px; }
.pt-msg { display: flex; gap: 14px; align-items: flex-start; max-width: 86%; }
.pt-msg--user { align-self: flex-end; flex-direction: row-reverse; }
.pt-msg__av { flex: none; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--ink-600); font-family: var(--mono); font-size: 15px; font-weight: 600; color: var(--mist); }
.pt-msg--bot .pt-msg__av { background: var(--acc-dim); border: 1px solid var(--acc-line); color: var(--acc); }
.pt-msg__b { text-wrap: balance; padding: 16px 22px; border-radius: 20px; font-size: 25px; line-height: 1.4; color: var(--bone); background: var(--ink-700); border: 1px solid var(--line); }
.pt-msg--user .pt-msg__b { background: var(--ink-600); border-bottom-right-radius: 6px; }
.pt-msg--bot .pt-msg__b { border-bottom-left-radius: 6px; background: var(--ink-800); }
.pt-input { display: flex; align-items: center; gap: 14px; height: 62px; padding: 0 10px 0 22px; border-radius: 14px; border: 1px solid var(--line-strong); background: rgb(255 255 255 / .02); }
.pt-input span { flex: 1; font-size: 21px; color: var(--smoke); }
.pt-input b { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; background: var(--acc); color: var(--ink-950); }
.pt-app--a { --acc: var(--flame-400); --acc-dim: rgb(245 131 39 / .12); --acc-line: rgb(245 131 39 / .45); }
.pt-app--b { --acc: var(--agency); --acc-dim: var(--agency-dim); --acc-line: rgb(134 173 143 / .5); }
.pt-sweep { position: absolute; top: -34px; bottom: -14px; left: 0; width: 84px; margin-left: -42px; z-index: 5; pointer-events: none; }
.pt-sweep__band { position: absolute; left: 0; right: 0; top: 34px; bottom: 0; border-left: 1.5px solid rgb(244 239 233 / .7); border-right: 1.5px solid rgb(244 239 233 / .25);
  background: repeating-linear-gradient(135deg, rgb(244 239 233 / .22) 0 2px, rgb(10 10 10 / .55) 2px 12px); }
.pt-sweep__lab { position: absolute; left: 50%; top: 0; transform: translateX(-50%); padding: 4px 12px; border-radius: 7px; background: var(--bone); color: var(--ink-950);
  font-family: var(--mono); font-size: 15px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
.pt-appr { width: 520px !important; padding: 28px 30px 30px !important; }
.pt-appr .appr__title { font-size: 32px; margin-bottom: 18px; }
.pt-appr .appr__kv { grid-template-columns: 130px 1fr; gap: 10px 18px; padding: 18px 0; font-size: 22px; }
.pt-appr .appr__kv dd { white-space: nowrap; }
.pt-appr .appr__actions { margin-top: 22px; }
.pt-appr .btnx { height: 58px; padding: 0 26px; font-size: 16px; }
.pt-appr .btnx__chip { width: 42px; height: 42px; margin-right: -18px; }
.pt-appr .appr__done { height: 58px; padding: 0 22px; font-size: 15px; letter-spacing: .06em; gap: 10px; white-space: nowrap; }

/* step 4: who does what */
.pt-board { position: absolute; left: 120px; top: 340px; width: 1080px; padding: 10px 30px 14px; }
.pt-brow { display: grid; grid-template-columns: 1fr 230px 230px; align-items: center; height: 82px; border-bottom: 1px solid var(--line); }
.pt-brow:last-child { border-bottom: 0; }
.pt-brow--h { height: 56px; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 16px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.pt-brow--h .pt-lh--you { color: var(--bone); } .pt-brow--h .pt-lh--sbx { color: var(--flame-400); }
.pt-brow__t { font-size: 25px; color: var(--bone); }
.pt-cell { height: 100%; display: flex; align-items: center; border-left: 1px solid var(--line); padding-left: 22px; }
.pt-own { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 999px; font-family: var(--mono); font-size: 16px; letter-spacing: .06em; white-space: nowrap; }
.pt-own::before { content: ''; width: 9px; height: 9px; border-radius: 9px; background: currentColor; }
.pt-own--you { color: var(--bone); border: 1px solid rgb(244 239 233 / .4); background: rgb(244 239 233 / .06); }
.pt-own--sbx { color: var(--flame-300); border: 1px solid rgb(245 131 39 / .45); background: rgb(245 131 39 / .08); }
.pt-sees { position: absolute; left: 1280px; top: 340px; width: 520px; }
.pt-sees__box { padding: 30px 32px; border-radius: 20px; border: 1.5px solid rgb(245 131 39 / .55); background: linear-gradient(180deg, rgb(245 131 39 / .08), rgb(245 131 39 / .02)); }
.pt-sees__box .mono { font-size: 16px; color: var(--flame-300); }
.pt-sees__v { font-family: var(--display); font-weight: 500; font-size: 44px; letter-spacing: -0.035em; line-height: 1.1; margin-top: 14px; color: var(--bone); }
.pt-sees__more { margin-top: 30px; display: flex; flex-direction: column; gap: 12px; }
.pt-sees__more .mono { font-size: 16px; margin-bottom: 4px; }
.pt-pill { display: flex; align-items: center; gap: 14px; padding: 18px 22px; border-radius: 14px; background: var(--ink-850); border: 1px solid var(--line); font-size: 24px; color: var(--bone); }
.pt-pill svg { color: var(--flame-400); flex: none; }

/* three models */
.pt-cards { position: absolute; left: 120px; top: 360px; width: 1680px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.pt-mc { position: relative; padding: 30px 34px 30px; min-height: 430px; display: flex; flex-direction: column; }
.pt-mc--hot { border-color: rgb(245 131 39 / .45); }
.pt-mc__ix { font-family: var(--mono); font-size: 18px; color: var(--flame-400); letter-spacing: .08em; }
.pt-mc__n { font-family: var(--display); font-weight: 500; font-size: 38px; letter-spacing: -0.035em; line-height: 1.1; margin-top: 20px; color: var(--bone); }
.pt-mc__l { font-size: 26px; line-height: 1.35; color: var(--mist); margin-top: 14px; }
.pt-mc__sees { margin-top: 26px; display: flex; flex-direction: column; gap: 6px; }
.pt-mc__sees .mono { font-size: 15px; }
.pt-mc__sees div:last-child { font-size: 24px; color: var(--bone); line-height: 1.3; }
.pt-mc--hot .pt-mc__sees .mono { color: var(--flame-300); }
.pt-mc__f { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px; }
.pt-mc__f .mono { font-size: 15px; }
.pt-mc__f div:last-child { font-size: 26px; font-weight: 500; color: var(--bone); }
`;

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const { h, place } = lib;
  const tl = gsap.timeline({ paused: true });
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  const { glow } = lib.setup(stage, { glow: { x: 1500, y: 820, size: 1000 } });
  const hud = lib.hud(stage, { ix: '06', unit: c.unit });
  hud.in(tl, 0.1);

  /* unit helpers */
  const agencyLogo = (size = 30, color = 'var(--agency)') => {
    const el = h('span', 'pt-logo');
    const m = h('span');
    m.innerHTML = `<svg class="pt-logo__mark" viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true"><rect width="32" height="32" rx="9" fill="${color}"/><circle cx="16" cy="16" r="7" fill="none" stroke="#0d0c0c" stroke-width="3"/><rect x="14" y="5" width="13" height="13" rx="2" fill="#0d0c0c" opacity=".85"/></svg>`;
    const t = h('span', 'pt-logo__txt', c.agency);
    t.style.fontSize = Math.round(size * 0.78) + 'px';
    el.append(m.firstChild, t);
    return el;
  };
  const stepHead = (i, title, sub) => {
    const el = h('div', 'pt-head');
    const k = h('div', 'pt-kick');
    k.append(h('b', null, String(i + 1).padStart(2, '0')), h('span', null, c.steps[i][0]), h('i'), h('span', 'pt-time', c.steps[i][1]));
    const hl = lib.headline(title, { size: 'sm', maxWidth: 1680 });
    el.append(k, hl.el);
    const s = sub ? h('p', 'pt-sub', sub) : null;
    if (s) el.append(s);
    return {
      el, sub: s,
      in(t0, tSub) {
        lib.fadeUp(tl, k, t0, { y: 12, dur: 0.7 });
        hl.in(tl, t0 + 0.2);
        if (s) lib.fadeUp(tl, s, tSub, { y: 14, dur: 0.8 });
      },
    };
  };
  const check = () => {
    const chk = h('div', 'pt-chk');
    const fill = h('span', 'pt-chk__fill');
    const ic = lib.icon('check', { size: 18, stroke: 3 });
    chk.append(fill, ic);
    return { chk, fill, ic };
  };
  const tick = (x, at) => {
    tl.to(x.fill, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, at);
    tl.to(x.ic, { opacity: 1, duration: 0.25 }, at + 0.15);
    tl.to(x.chk, { borderColor: 'rgba(245,131,39,1)', duration: 0.2 }, at);
  };

  /* ============ 0 to 8: hook, the agency's inbox ============ */
  const L1 = lib.layer(stage, { visible: true });
  const iw = lib.win({ title: c.inboxTitle, x: 120, y: 262, w: 1010, bodyPad: 0 });
  iw.body.style.padding = '22px 22px 14px';
  iw.el.classList.add('pt-inbox');
  const lh = h('div', 'pt-listhead');
  lh.append(h('div', 'mono', c.inboxFolder), h('span', 'chip', c.unread));
  const ib = lib.inbox({ rows: c.mail.map(([from, initials, subject, time]) => ({ from, initials, subject, time })) });
  ib.rows.forEach((r, i) => r.row.querySelector('.row__av').classList.add('pt-av--' + (i % 3 + 1)));
  iw.body.append(lh, ib.el);
  L1.append(iw.el);
  iw.in(tl, 0.2, { y: 40 });
  lib.fadeUp(tl, lh, 0.4, { y: 12, dur: 0.6 });
  ib.in(tl, 0.4, { stagger: 0.25 });
  [0, 1, 2, 3].forEach((i) => {
    const t = 2.0 + i * 0.5;
    ib.highlight(tl, t, i);
    if (i) ib.highlight(tl, t, i - 1, { off: true });
    ib.tag(tl, t + 0.15, i, c.aiTag, 'warn');
  });
  ib.highlight(tl, 4.6, 3, { off: true });

  const hookCol = place(h('div', 'pt-col'), { x: 1210, y: 300, w: 590 });
  hookCol.style.gap = '34px';
  const hk1 = lib.headline(c.hook1, { size: 'md', maxWidth: 590 });
  const hk2 = lib.headline(c.hook2, { size: 'sm', maxWidth: 560 });
  hk2.el.classList.add('pt-mist');
  hookCol.append(hk1.el, hk2.el);
  L1.append(hookCol);
  hk1.in(tl, 1.6);
  hk2.in(tl, 3.6);
  lib.hide(tl, L1, 7.4, { dur: 0.6, y: -12 });

  /* ============ 8 to 16: promise + handoff (poster 12.5) ============ */
  const L2 = lib.layer(stage);
  const pcol = h('div', 'pt-col');
  Object.assign(pcol.style, { left: '120px', top: '540px', width: '860px', transform: 'translateY(-50%)', gap: '34px' });
  const peb = lib.eyebrow({ ix: '06', text: c.unit.toUpperCase() });
  const phl = lib.headline(c.heroTitle, { size: 'md', maxWidth: 860 });
  if (lang === 'es') phl.el.style.fontSize = '62px';
  const plede = h('p', 'lede', c.heroLede);
  plede.style.fontSize = '30px'; plede.style.maxWidth = '720px';
  pcol.append(peb, phl.el, plede);
  L2.append(pcol);

  const hd = c.handoff;
  const hand = h('div', 'pt-hand');
  const mkNode = (cls, ic, label, sub, y) => {
    const n = h('div', 'pt-node ' + cls);
    n.style.top = y + 'px';
    const icw = h('div', 'pt-node__ic');
    icw.append(ic);
    const tx = h('div');
    tx.append(h('div', 'pt-node__l', label), h('div', 'pt-node__s', sub));
    n.append(icw, tx);
    return n;
  };
  const nSbx = mkNode('pt-node--sbx', lib.cube({ size: 24, cls: '' }), hd.sbx, hd.sbxSub, 0);
  const nYou = mkNode('pt-node--you', lib.icon('users', { size: 22 }), hd.you, hd.youSub, 392);
  const nCli = mkNode('', lib.icon('user', { size: 22 }), hd.client, hd.clientSub, 560);
  const band = h('div', 'pt-band');
  band.style.top = '196px';
  band.append(h('div', 'pt-band__lab', hd.layer));
  const PX = [240, 360, 480];
  const vlines = PX.map((x) => {
    const v = h('div', 'pt-vline');
    Object.assign(v.style, { left: x + 'px', top: '82px', height: '308px' });
    return v;
  });
  const cl = h('div', 'pt-vline');
  Object.assign(cl.style, { left: '360px', top: '474px', height: '84px' });
  const packets = hd.packets.map((t, i) => {
    const p = h('div', 'pt-packet', t);
    Object.assign(p.style, { left: PX[i] + 'px', top: '104px' });
    return p;
  });
  hand.append(...vlines, cl, band, ...packets, nSbx, nYou, nCli);
  L2.append(hand);

  lib.show(tl, L2, 8.0, { dur: 0.01 });
  lib.fadeUp(tl, peb, 8.2, { y: 14, dur: 0.7 });
  phl.in(tl, 8.4, { stagger: 0.25 });
  lib.fadeUp(tl, plede, 11.0, { y: 18, dur: 0.9 });
  lib.fadeUp(tl, nSbx, 9.4, { y: 16, dur: 0.8 });
  tl.fromTo(band, { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 9.6);
  lib.fadeUp(tl, nYou, 9.8, { y: 16, dur: 0.8 });
  gsap.set([...vlines, cl], { scaleY: 0 });
  vlines.forEach((v, i) => tl.to(v, { scaleY: 1, duration: 0.6, ease: 'power3.inOut' }, 10.0 + i * 0.3));
  packets.forEach((p, i) => {
    const t = 10.2 + i * 0.3;
    tl.fromTo(p, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, t);
    tl.to(p, { y: 226, duration: 1.2, ease: 'power2.inOut' }, t + 0.3);
    tl.to(p, { borderColor: 'rgba(244,239,233,.7)', color: '#f4efe9', duration: 0.3, ease: 'none' }, t + 0.7);
  });
  tl.to(cl, { scaleY: 1, duration: 0.5, ease: 'power3.inOut' }, 11.3);
  lib.fadeUp(tl, nCli, 11.55, { y: 14, dur: 0.7 });
  tl.addLabel('poster', 12.5);

  /* ============ 16 to 24: 01 qualify ============ */
  const L3 = lib.layer(stage);
  lib.swap(tl, L2, L3, 15.4, { dur: 0.6 });
  const h1 = stepHead(0, c.s1);
  L3.append(h1.el);
  const models = h('div', 'pt-models');
  models.append(h('div', 'mono', c.modelsKicker));
  const mEls = c.models.map(([n, l], i) => {
    const m = h('div', 'pt-model');
    const sel = h('div', 'pt-model__sel');
    const tx = h('div');
    tx.append(h('div', 'pt-model__n', n), h('div', 'pt-model__l', l));
    m.append(sel, h('div', 'pt-model__ix', String(i + 1).padStart(2, '0')), tx);
    models.append(m);
    return { m, sel };
  });
  const fits = h('span', 'chip chip--ok', c.fits);
  mEls[0].m.append(fits);
  gsap.set(fits, { autoAlpha: 0 });
  L3.append(models);
  const nw = lib.win({ title: c.notesTitle, paper: true, x: 760, y: 350, w: 1040, bodyPad: 0 });
  nw.el.classList.add('pt-notes');
  const doc = lib.docPage({ kicker: c.notesKicker, title: c.agency, blocks: [...c.notes.map((p) => ({ p })), { bar: 0.62 }, { bar: 0.4 }] });
  nw.body.append(doc.el);
  L3.append(nw.el);
  h1.in(16.2);
  nw.in(tl, 16.7, { y: 40 });
  doc.in(tl, 17.0);
  lib.fadeUp(tl, [models.firstChild, ...mEls.map((x) => x.m)], 17.1, { y: 18, dur: 0.7, stagger: 0.12 });
  doc.mark(tl, 17.8, 0);
  doc.mark(tl, 19.6, 1);
  tl.to(mEls[0].sel, { opacity: 1, duration: 0.5, ease: 'power3.out' }, 20.6);
  tl.to([mEls[1].m, mEls[2].m], { opacity: 0.5, duration: 0.5 }, 20.6);
  tl.fromTo(fits, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, 20.9);

  /* ============ 24 to 33: 02 package ============ */
  const L4 = lib.layer(stage);
  lib.swap(tl, L3, L4, 23.4, { dur: 0.6 });
  const h2 = stepHead(1, c.s2);
  L4.append(h2.el);
  const kitHead = (ic, label) => {
    const d = h('div', 'pt-kit__h');
    d.append(lib.icon(ic, { size: 22 }), h('div', 'mono', label));
    return d;
  };
  // A: agreement
  const kA = place(h('div', 'card pt-kit'), { x: 120 });
  kA.append(kitHead('handshake', c.agreement), h('div', 'pt-kit__sub', c.parties));
  const terms = c.terms.map((t) => {
    const r = h('div', 'pt-term');
    const x = check();
    r.append(x.chk, h('div', 'pt-term__t', t));
    kA.append(r);
    return x;
  });
  const signs = h('div', 'pt-signs');
  c.signHere.forEach((t) => { const d = h('div', 'pt-sign'); d.append(h('i'), h('div', null, t)); signs.append(d); });
  kA.append(signs);
  // B: brand kit
  const kB = place(h('div', 'card pt-kit'), { x: 700 });
  kB.append(kitHead('pen', c.brandKit));
  const lbox = h('div', 'pt-logobox');
  lbox.append(agencyLogo(46));
  const sw = h('div', 'pt-sw');
  [['#f4efe9', c.swatches[0], '#F4EFE9'], ['#141212', c.swatches[1], '#141212'], [AG, c.swatches[2], AG.toUpperCase()]].forEach(([col, name, hex]) => {
    const d = h('div');
    const s = h('div', 'pt-sw__c'); s.style.background = col;
    d.append(s, h('div', 'pt-sw__l', `${name} ${hex}`));
    sw.append(d);
  });
  const type = h('div', 'pt-type');
  type.append(h('div', 'pt-type__aa', 'Aa<span>Aa</span>'), h('div', 'mono', c.typeLabel));
  kB.append(lbox, sw, type);
  // C: sales kit
  const kC = place(h('div', 'card pt-kit'), { x: 1280 });
  kC.append(kitHead('doc', c.salesKit));
  const stack = h('div'); stack.style.position = 'relative'; stack.style.flex = '1'; stack.style.marginTop = '24px';
  const one = place(h('div', 'pt-paper'), { x: 140, y: 120, w: 316, h: 230 });
  one.style.padding = '22px 24px';
  one.style.textAlign = 'right';
  one.append(h('div', 'pt-paper__k', c.onePager));
  [0.9, 0.75, 0.82, 0.5].forEach((w) => { const b = h('div', 'pt-paper__bar'); b.style.width = w * 100 + '%'; one.append(b); });
  const prop = place(h('div', 'pt-paper'), { x: 0, y: 0, w: 330, h: 300 });
  prop.style.padding = '24px 26px';
  prop.style.display = 'flex'; prop.style.flexDirection = 'column';
  const pl = agencyLogo(26, AG); pl.querySelector('.pt-logo__txt').style.color = '#141010';
  const pk = h('div', 'pt-paper__k', c.proposal); pk.style.marginTop = 'auto';
  prop.append(pl, pk, h('div', 'pt-paper__t', c.proposalTitle), h('div', 'pt-paper__rule'));
  stack.append(one, prop);
  kC.append(stack);
  L4.append(kA, kB, kC);
  h2.in(24.2);
  lib.fadeUp(tl, [kA, kB, kC], 24.6, { y: 30, dur: 0.9, stagger: 0.35 });
  terms.forEach((x, i) => tick(x, 26.2 + i * 0.6));
  lib.popIn(tl, sw.children, 27.6, { scale: 0.9, dur: 0.6, stagger: 0.12 });
  tl.fromTo(one, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 28.4);

  /* ============ 33 to 43: 03 deliver, the brand swap ============ */
  const L5 = lib.layer(stage);
  lib.swap(tl, L4, L5, 32.4, { dur: 0.6 });
  const h3 = stepHead(2, c.s3, c.s3b);
  L5.append(h3.el);
  const swapBox = h('div', 'pt-swap');
  const mkApp = (b) => {
    const app = h('div', 'pt-app ' + (b ? 'pt-app--b' : 'pt-app--a'));
    const bar = h('div', 'win__bar');
    const url = h('div', 'win__url', b ? '' : c.staging);
    bar.append(h('div', 'win__dots', '<i></i><i></i><i></i>'), h('div', 'win__title', c.appTitle), url, h('div', 'win__badge', b ? c.live : c.sbxBuild));
    const main = h('div', 'pt-app__main');
    const side = h('div', 'pt-side');
    const brand = h('div', 'pt-side__brand');
    if (b) brand.append(agencyLogo(30));
    else { brand.append(lib.cube({ size: 28, cls: '' }), document.createTextNode('Sandbox')); }
    side.append(brand);
    ['chat', 'book', 'chart', 'gear'].forEach((ic, i) => {
      const it = h('div', 'pt-side__item' + (i === 0 ? ' pt-side__item--on' : ''));
      it.append(lib.icon(ic, { size: 20 }), document.createTextNode(c.nav[i]));
      side.append(it);
    });
    const pane = h('div', 'pt-pane');
    const ph = h('div', 'pt-pane__head');
    ph.append(h('div', 'mono', c.preview), h('span', 'pt-ai', c.aiLabel));
    const msgs = h('div', 'pt-msgs');
    const mu = h('div', 'pt-msg pt-msg--user');
    mu.append(h('div', 'pt-msg__av', 'VS'), h('div', 'pt-msg__b', c.q));
    const mb = h('div', 'pt-msg pt-msg--bot');
    const bav = h('div', 'pt-msg__av');
    bav.append(lib.icon('chat', { size: 20 }));
    mb.append(bav, h('div', 'pt-msg__b', c.a));
    msgs.append(mu, mb);
    const inp = h('div', 'pt-input');
    const send = h('b'); send.append(lib.icon('arrow', { size: 20, stroke: 2.2 }));
    inp.append(h('span', null, c.inputPh), send);
    pane.append(ph, msgs, inp);
    main.append(side, pane);
    app.append(bar, main);
    return { app, url, msgs: [mu, mb] };
  };
  const A = mkApp(false), B = mkApp(true);
  const sweep = h('div', 'pt-sweep');
  sweep.append(h('div', 'pt-sweep__lab', c.handoff.layer), h('div', 'pt-sweep__band'));
  swapBox.append(A.app, B.app, sweep);
  L5.append(swapBox);
  const SW = 1120;
  gsap.set(B.app, { clipPath: 'inset(0px 1120px 0px 0px)' });
  gsap.set(sweep, { x: 0, autoAlpha: 0 });

  const appr = lib.approval({ ...c.review, x: 120, y: 350 });
  appr.el.classList.add('pt-appr');
  L5.append(appr.el);
  const cur = lib.cursor(stage, { x: 760, y: 1000 });

  h3.in(33.2, 38.8);
  tl.fromTo(swapBox, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 33.5);
  lib.fadeUp(tl, A.msgs, 34.0, { y: 14, dur: 0.6, stagger: 0.4 });
  tl.set(sweep, { autoAlpha: 1 }, 35.6);
  tl.to(sweep, { x: SW, duration: 1.1, ease: 'power2.inOut' }, 35.6);
  tl.to(B.app, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.1, ease: 'power2.inOut' }, 35.6);
  tl.to(sweep, { autoAlpha: 0, duration: 0.3 }, 36.7);
  tl.set(A.app, { autoAlpha: 0 }, 36.8);
  lib.typeText(tl, B.url, c.domain, 36.7, { cps: 24 });
  appr.in(tl, 38.3);
  cur.in(tl, 39.4);
  cur.moveTo(tl, 39.45, appr.approveBtn, { dur: 1.0, dx: -6, dy: 4 });
  cur.click(tl, 40.6, appr.approveBtn);
  appr.decide(tl, 40.6, 'approve');
  const f2 = appr.el.querySelector('.appr__flag > span > span:nth-child(2)');
  if (f2) f2.textContent = c.review.closed;
  cur.moveTo(tl, 41.0, { x: 560, y: 900 }, { dur: 0.8 });
  cur.out(tl, 41.5);

  /* ============ 43 to 51: 04 grow, who does what ============ */
  const L6 = lib.layer(stage);
  lib.swap(tl, L5, L6, 42.4, { dur: 0.6 });
  const h4 = stepHead(3, c.s4, c.s4b);
  L6.append(h4.el);
  const bd = c.board;
  const board = h('div', 'card pt-board');
  const bh = h('div', 'pt-brow pt-brow--h');
  bh.append(h('div', null, bd.stage), h('div', 'pt-cell pt-lh--you', bd.you), h('div', 'pt-cell pt-lh--sbx', bd.sbx));
  board.append(bh);
  const OWN = ['you', 'you', 'sbx', 'you', 'you'];
  const brows = bd.rows.map((t, i) => {
    const r = h('div', 'pt-brow');
    const cy = h('div', 'pt-cell'), cs = h('div', 'pt-cell');
    const mk = h('span', 'pt-own pt-own--' + OWN[i], OWN[i] === 'you' ? bd.youShort : bd.sbx);
    (OWN[i] === 'you' ? cy : cs).append(mk);
    gsap.set(mk, { autoAlpha: 0 });
    r.append(h('div', 'pt-brow__t', t), cy, cs);
    board.append(r);
    return { r, mk };
  });
  L6.append(board);
  const sees = h('div', 'pt-sees');
  const box = h('div', 'pt-sees__box');
  box.append(h('div', 'mono', c.sees), h('div', 'pt-sees__v', c.seesV));
  const more = h('div', 'pt-sees__more');
  more.append(h('div', 'mono', c.ongoing));
  const pills = c.grow.map((t, i) => {
    const p = h('div', 'pt-pill');
    p.append(lib.icon(i ? 'calendar' : 'gear', { size: 22 }), document.createTextNode(t));
    more.append(p);
    return p;
  });
  sees.append(box, more);
  L6.append(sees);
  h4.in(43.2, 47.2);
  tl.fromTo(board, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 43.4);
  lib.fadeUp(tl, [bh, ...brows.map((b) => b.r)], 43.6, { y: 12, dur: 0.6, stagger: 0.2 });
  brows.forEach((b, i) => tl.fromTo(b.mk, { autoAlpha: 0, x: -36 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'expo.out' }, 44.6 + i * 0.35));
  lib.fadeUp(tl, box, 46.6, { y: 20, dur: 0.8 });
  lib.fadeUp(tl, [more.firstChild, ...pills], 47.6, { y: 16, dur: 0.7, stagger: 0.15 });

  /* ============ 51 to 58: three models ============ */
  const L7 = lib.layer(stage);
  lib.swap(tl, L6, L7, 50.4, { dur: 0.6 });
  const mh = h('div', 'pt-head');
  const mk7 = h('div', 'pt-kick');
  mk7.append(h('span', null, c.modelsKicker));
  const m1 = lib.headline(c.m1, { size: 'sm', maxWidth: 1680 });
  const m2 = h('p', 'pt-sub', c.m2);
  mh.append(mk7, m1.el, m2);
  L7.append(mh);
  const cards = h('div', 'pt-cards');
  const cEls = c.cards.map(([n, l, t, seen], i) => {
    const d = h('div', 'card pt-mc' + (i === 0 ? ' pt-mc--hot' : ''));
    const f = h('div', 'pt-mc__f');
    f.append(h('div', 'mono', c.timeline), h('div', null, t));
    const sv = h('div', 'pt-mc__sees');
    sv.append(h('div', 'mono', c.sees), h('div', null, seen));
    d.append(h('div', 'pt-mc__ix', String(i + 1).padStart(2, '0')), h('div', 'pt-mc__n', n), h('div', 'pt-mc__l', l), sv, f);
    cards.append(d);
    return d;
  });
  L7.append(cards);
  lib.fadeUp(tl, mk7, 51.1, { y: 12, dur: 0.7 });
  m1.in(tl, 51.3);
  lib.popIn(tl, cEls, 52.0, { scale: 0.97, dur: 0.8, stagger: 0.25 });
  lib.fadeUp(tl, m2, 54.2, { y: 14, dur: 0.8 });
  hud.chrome(tl, 57.4, false);
  lib.hide(tl, L7, 57.4, { dur: 0.5, y: -12 });

  /* ============ 58 to 64: CTA ============ */
  const L8 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.ctaTitle, button: c.ctaButton });
  L8.append(cta.el);
  lib.show(tl, L8, 58.0, { dur: 0.01 });
  cta.in(tl, 58.1);
  tl.set({}, {}, 64);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
