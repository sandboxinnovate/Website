// Brains explainer. Storyboard: video/storyboards/brains.json. Claims and timelines from
// src/i18n/units/brains.ts and src/components/unit/visuals/copy.ts. Every value inside the mock UIs
// (order number, section numbers, clock times) is an illustrative UI state, not a claim.
export const meta = {
  title: { en: 'How a Sandbox brain works', es: 'Cómo funciona un brain de Sandbox' },
};

export const copy = {
  en: {
    unit: 'Brains',
    channel: '# operations',
    question: 'Where are the return terms for wholesale accounts?',
    peer1: 'Ask M., she knows',
    peer2: 'I think it’s in a shared folder somewhere',
    hook1: 'The answers live in three people’s heads',
    hook2: 'and a hundred documents nobody can find.',
    docs: [
      ['Returns_v3_FINAL', 'Shared drive / Ops'],
      ['Wholesale terms (old)', 'Email attachment'],
      ['Policies 2024 copy', 'Desktop / misc'],
      ['Returns_v3_FINAL (2)', 'Shared drive / Sales'],
      ['Notes from the call', 'Personal folder'],
      ['Terms_wholesale_draft', 'Team chat file'],
    ],
    promise1: 'One brain for your company.',
    promise2: 'An agent for every process.',
    promise3: 'Built on your data, tools and rules.',
    stack: {
      agents: ['Agents', 'act', ['Sales', 'Support', 'Ops', 'HR']],
      brain: ['Brain', 'remembers', ['Documents', 'Conversations', 'Systems']],
      sources: ['Sources', 'your tools', ['CRM', 'Inbox', 'Docs', 'Calendar', 'Team chat']],
    },
    s1a: 'Connect the tools you already use',
    s1b: 'Same permissions your team has today.',
    srcWin: 'brain / sources',
    srcRows: [
      ['doc', 'Docs & wiki', 'Shared drive'],
      ['mail', 'Inbox', 'Shared inboxes'],
      ['db', 'CRM', 'Contacts and deals'],
      ['calendar', 'Calendar', 'Team calendars'],
      ['chat', 'Team chat', 'Channels'],
    ],
    connecting: 'Connecting',
    synced: 'Synced',
    permTitle: 'Who can see what',
    perms: [['Sales', ['CRM', 'Inbox']], ['Support', ['Docs', 'Inbox']], ['HR', ['Handbook']]],
    permNote: 'Same access as today',
    s2a: 'Ask, and get answers with sources',
    s2b: 'And a clear “I don’t know” when it isn’t sure.',
    composer: 'Message # operations',
    answer: 'Wholesale returns are accepted within the agreed window, with the original invoice. Damaged items go to a person.',
    source: 'Source: Returns policy §3',
    confidence: 'Confidence: high',
    q2: 'Can we extend it for one key account?',
    idk: 'I don’t know. That decision isn’t in the policy. I’ll ask the owner.',
    idkChip: 'Sent to the policy owner',
    docWin: 'Returns policy',
    docKicker: 'Internal policy',
    docTitle: 'Returns and exchanges',
    docH2: '§2 Damaged items',
    docH3: '§3 Wholesale accounts',
    docP3: '<span class="bx-hl">Wholesale returns are accepted within the agreed window, with the original invoice.</span> Exceptions are decided by the policy owner.',
    s3a: 'Agents do the work in your tools',
    s3b: 'Qualify leads, resolve tickets, update the CRM.',
    inboxWin: 'Shared inbox',
    rows: [
      ['Website form', 'NW', 'New wholesale account inquiry', '09:12'],
      ['Helpdesk', 'RB', 'Order arrived damaged', '09:20'],
      ['Billing', 'CS', 'Question about an invoice', '09:31'],
      ['Internal', 'DP', 'Weekly report request', '09:40'],
    ],
    nodes: [
      ['inbox', 'Read request', 'Inbox'],
      ['book', 'Check the brain', 'Brain'],
      ['target', 'Qualify against your criteria', 'Your rules'],
      ['db', 'Update CRM', 'CRM'],
      ['pen', 'Draft reply', 'Inbox'],
    ],
    tagOk: 'Qualified · logged in CRM',
    tagWait: 'Waiting approval',
    s4a: 'A person approves what matters',
    s4b: 'Every step logged for your team to review.',
    flag: 'Needs approval',
    apprTitle: 'Refund above your limit',
    fields: [['Order', '#10482'], ['Reason', 'Arrived damaged, photo attached'], ['Policy', 'Returns policy §2'], ['Proposed', 'Full refund + apology email']],
    flagDone: 'Approved',
    approve: 'Approve', reject: 'Reject', approved: 'Approved by the support lead',
    logTitle: 'Run log · support agent',
    log: ['read ticket · order found', 'source: returns policy §2', 'approval: support lead', 'refund issued · customer notified'],
    m1: 'From one process <em>to a running system.</em>',
    method: [['Discover', '1-2 weeks'], ['Design', '1 week'], ['Build', '2-8 weeks'], ['Operate', 'Ongoing']],
    monthly: 'Monthly report',
    factK: 'First agent live',
    factV: '3 to 5 weeks',
    cta: 'Tell us one process.<br><em>We’ll sketch the agent.</em>',
  },
  es: {
    unit: 'Brains',
    channel: '# operaciones',
    question: '¿Dónde están las condiciones de devolución para mayoristas?',
    peer1: 'Pregúntale a M., ella sabe',
    peer2: 'Creo que está en alguna carpeta compartida',
    hook1: 'Las respuestas viven en tres cabezas',
    hook2: 'y en cien documentos que nadie encuentra.',
    docs: [
      ['Devoluciones_v3_FINAL', 'Unidad compartida / Ops'],
      ['Condiciones_viejas', 'Adjunto de correo'],
      ['Políticas 2024 copia', 'Escritorio / varios'],
      ['Devoluciones_v3 (2)', 'Unidad compartida / Ventas'],
      ['Notas de la llamada', 'Carpeta personal'],
      ['Condiciones_borrador', 'Archivo del chat'],
    ],
    promise1: 'Un brain para tu empresa.',
    promise2: 'Un agente para cada proceso.',
    promise3: 'Sobre tus datos, herramientas y reglas.',
    stack: {
      agents: ['Agentes', 'actúan', ['Ventas', 'Soporte', 'Operaciones', 'RR. HH.']],
      brain: ['Brain', 'recuerda', ['Documentos', 'Conversaciones', 'Sistemas']],
      sources: ['Fuentes', 'tus herramientas', ['CRM', 'Correo', 'Docs', 'Calendario', 'Chat']],
    },
    s1a: 'Conecta las herramientas que ya usas',
    s1b: 'Con los mismos permisos que tu equipo tiene hoy.',
    srcWin: 'brain / fuentes',
    srcRows: [
      ['doc', 'Docs y wiki', 'Unidad compartida'],
      ['mail', 'Correo', 'Bandejas compartidas'],
      ['db', 'CRM', 'Contactos y oportunidades'],
      ['calendar', 'Calendario', 'Calendarios del equipo'],
      ['chat', 'Chat del equipo', 'Canales'],
    ],
    connecting: 'Conectando',
    synced: 'Sincronizado',
    permTitle: 'Quién ve qué',
    perms: [['Ventas', ['CRM', 'Correo']], ['Soporte', ['Docs', 'Correo']], ['RR. HH.', ['Manual']]],
    permNote: 'El mismo acceso que hoy',
    s2a: 'Pregunta y recibe respuestas con fuentes',
    s2b: 'Y un “no lo sé” claro cuando no está seguro.',
    composer: 'Mensaje en # operaciones',
    answer: 'Las devoluciones mayoristas se aceptan dentro del plazo acordado, con la factura original. Los productos dañados pasan a una persona.',
    source: 'Fuente: Política de devoluciones §3',
    confidence: 'Confianza: alta',
    q2: '¿Podemos extenderlo para un cliente clave?',
    idk: 'No lo sé. Esa decisión no está en la política. Le pregunto al responsable.',
    idkChip: 'Enviado al responsable de la política',
    docWin: 'Política de devoluciones',
    docKicker: 'Política interna',
    docTitle: 'Devoluciones y cambios',
    docH2: '§2 Productos dañados',
    docH3: '§3 Cuentas mayoristas',
    docP3: '<span class="bx-hl">Las devoluciones mayoristas se aceptan dentro del plazo acordado, con la factura original.</span> Las excepciones las decide el responsable de la política.',
    s3a: 'Los agentes trabajan en tus herramientas',
    s3b: 'Califican leads, resuelven tickets, actualizan el CRM.',
    inboxWin: 'Bandeja compartida',
    rows: [
      ['Formulario web', 'NM', 'Consulta de nueva cuenta mayorista', '09:12'],
      ['Mesa de ayuda', 'RB', 'El pedido llegó dañado', '09:20'],
      ['Facturación', 'CS', 'Duda sobre una factura', '09:31'],
      ['Interno', 'DP', 'Solicitud del reporte semanal', '09:40'],
    ],
    nodes: [
      ['inbox', 'Lee la solicitud', 'Correo'],
      ['book', 'Consulta el brain', 'Brain'],
      ['target', 'Califica con tus criterios', 'Tus reglas'],
      ['db', 'Actualiza el CRM', 'CRM'],
      ['pen', 'Redacta la respuesta', 'Correo'],
    ],
    tagOk: 'Calificado · en el CRM',
    tagWait: 'Espera aprobación',
    s4a: 'Una persona aprueba lo importante',
    s4b: 'Cada paso queda registrado para revisarlo.',
    flag: 'Requiere aprobación',
    apprTitle: 'Reembolso sobre tu límite',
    fields: [['Pedido', '#10482'], ['Motivo', 'Llegó dañado, foto adjunta'], ['Política', 'Devoluciones §2'], ['Propuesta', 'Reembolso total + correo de disculpa']],
    flagDone: 'Aprobado',
    approve: 'Aprobar', reject: 'Rechazar', approved: 'Aprobado por líder de soporte',
    logTitle: 'Registro · agente de soporte',
    log: ['lee el ticket · pedido encontrado', 'fuente: política de devoluciones §2', 'aprobación: líder de soporte', 'reembolso emitido · cliente avisado'],
    m1: 'De un proceso <em>a un sistema en marcha.</em>',
    method: [['Descubrir', '1-2 semanas'], ['Diseñar', '1 semana'], ['Construir', '2-8 semanas'], ['Operar', 'Continuo']],
    monthly: 'Reporte mensual',
    factK: 'Primer agente en producción',
    factV: '3 a 5 semanas',
    cta: 'Cuéntanos un proceso.<br><em>Te dibujamos el agente.</em>',
  },
};

export const transcript = {
  en: [
    'Where are the return terms for wholesale accounts? Ask M., she knows. I think it’s in a shared folder somewhere. The answers live in three people’s heads and a hundred documents nobody can find.',
    'One brain for your company. An agent for every process. Built on your data, tools and rules: sources (your tools), a brain that remembers, and agents that act.',
    '01. Connect the tools you already use: docs and wiki, inbox, CRM, calendar and team chat. Same permissions your team has today.',
    '02. Ask, and get answers with sources. The assistant answers from the returns policy and cites the section it used. And a clear “I don’t know” when it isn’t sure: it sends the question to the policy owner.',
    '03. Agents do the work in your tools. They read the request, check the brain, qualify against your criteria, update the CRM and draft the reply. Qualify leads, resolve tickets, update the CRM.',
    '04. A person approves what matters. A refund above your limit waits for the support lead, who approves it. Every step logged for your team to review.',
    'From one process to a running system: Discover, 1 to 2 weeks. Design, 1 week. Build, 2 to 8 weeks. Operate, ongoing, with a monthly report. First agent live in 3 to 5 weeks.',
    'Tell us one process. We’ll sketch the agent. Book a call at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    '¿Dónde están las condiciones de devolución para mayoristas? Pregúntale a M., ella sabe. Creo que está en alguna carpeta compartida. Las respuestas viven en tres cabezas y en cien documentos que nadie encuentra.',
    'Un brain para tu empresa. Un agente para cada proceso. Sobre tus datos, herramientas y reglas: fuentes (tus herramientas), un brain que recuerda y agentes que actúan.',
    '01. Conecta las herramientas que ya usas: docs y wiki, correo, CRM, calendario y chat del equipo. Con los mismos permisos que tu equipo tiene hoy.',
    '02. Pregunta y recibe respuestas con fuentes. El asistente responde con la política de devoluciones y cita la sección que usó. Y un “no lo sé” claro cuando no está seguro: le pasa la pregunta al responsable de la política.',
    '03. Los agentes trabajan en tus herramientas. Leen la solicitud, consultan el brain, califican con tus criterios, actualizan el CRM y redactan la respuesta. Califican leads, resuelven tickets, actualizan el CRM.',
    '04. Una persona aprueba lo importante. Un reembolso sobre tu límite espera al líder de soporte, que lo aprueba. Cada paso queda registrado para revisarlo.',
    'De un proceso a un sistema en marcha: Descubrir, 1 a 2 semanas. Diseñar, 1 semana. Construir, 2 a 8 semanas. Operar, continuo, con un reporte mensual. Primer agente en producción en 3 a 5 semanas.',
    'Cuéntanos un proceso. Te dibujamos el agente. Agenda una llamada en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* Scene-only styles. Also lifts the shared 13 and 14 px UI labels to 15 px (minimum readable size). */
const CSS = `
.chip, .msg__meta, .win__badge { font-size: 15px; }
.node__sub { font-size: 15px; }
.msg--peer { align-self: flex-start; }
.msg--peer .msg__bubble { background: var(--ink-750); border-bottom-left-radius: 8px; color: var(--mist); }
.msg--peer .msg__av { background: var(--ink-700); color: var(--mist); }
.bx-name { font-family: var(--mono); font-size: 15px; letter-spacing: .06em; color: var(--smoke); margin: 0 0 6px 4px; }
.msg--user .bx-name { text-align: right; margin: 0 4px 6px 0; }

.bx-doc { position: absolute; width: max-content; min-width: 290px; padding: 22px 24px 20px; border-radius: 14px; background: #efe9e2; color: #1a1616;
  box-shadow: 0 30px 60px -24px rgb(0 0 0 / .8), 0 0 0 1px rgb(0 0 0 / .25); }
.bx-doc__top { display: flex; gap: 12px; align-items: flex-start; }
.bx-doc__top svg { flex: none; color: #8a7f78; margin-top: 2px; }
.bx-doc__name { font-weight: 700; font-size: 20px; line-height: 1.25; color: #1a1616; white-space: nowrap; }
.bx-doc__path { font-family: var(--mono); font-size: 15px; color: #8a7f78; margin: 8px 0 16px 36px; letter-spacing: .02em; }
.bx-doc__bar { height: 10px; border-radius: 5px; background: #ddd5cc; margin: 0 0 10px 36px; }

.bx-hook { position: absolute; left: 120px; top: 806px; display: flex; flex-direction: column; gap: 0; }
.bx-hook .hl--md { font-size: 62px; }

.bx-promise { position: absolute; left: 120px; top: 300px; width: 800px; display: flex; flex-direction: column; }
.bx-promise .eyebrow { margin-bottom: 40px; }
.bx-promise .lede { margin-top: 36px; font-size: 30px; }

.bx-stack { position: absolute; left: 1140px; top: 236px; width: 660px; display: flex; flex-direction: column; }
.bx-lay { padding: 26px 30px 28px; display: flex; flex-direction: column; gap: 18px; }
.bx-lay__head { display: flex; align-items: center; gap: 16px; }
.bx-lay__ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: var(--ink-600); color: var(--mist); flex: none; }
.bx-lay__name { font-family: var(--display); font-weight: 500; font-size: 32px; letter-spacing: -0.03em; color: var(--bone); }
.bx-lay__sub { margin-left: auto; font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); }
.bx-lay__chips { display: flex; flex-wrap: wrap; gap: 10px; }
.bx-lay__chips .chip { font-size: 17px; padding: 7px 14px; }
.bx-lay--brain { border-color: rgb(245 131 39 / .45); background: linear-gradient(180deg, rgb(245 131 39 / .09), rgb(245 131 39 / .02)), var(--ink-850); }
.bx-lay--brain .bx-lay__ic { background: var(--grad-flame); color: #1a0d03; }
.bx-link { height: 34px; display: flex; justify-content: center; }
.bx-link i { width: 1px; height: 100%; background: var(--line-strong); display: block; transform-origin: 50% 0; }

.bx-head { position: absolute; left: 120px; top: 148px; width: 1680px; }
.bx-head__row { display: flex; align-items: baseline; gap: 26px; }
.bx-head__n { font-family: var(--mono); font-size: 22px; font-weight: 500; letter-spacing: .12em; color: var(--flame-400); transform: translateY(-6px); }
.bx-head__sub { margin: 14px 0 0 0; padding-left: 0; font-size: 30px; line-height: 1.4; color: var(--mist); }
.bx-head__sub-wrap { padding-left: 58px; }

.bx-src { display: flex; flex-direction: column; }
.bx-src__row { display: grid; grid-template-columns: 52px 1fr auto; gap: 20px; align-items: center; padding: 16px 6px; border-bottom: 1px solid var(--line); }
.bx-src__row:last-child { border-bottom: 0; }
.bx-src__ic { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: var(--ink-700); border: 1px solid var(--line); color: var(--mist); }
.bx-src__name { font-size: 26px; font-weight: 500; color: var(--bone); line-height: 1.2; }
.bx-src__meta { font-family: var(--mono); font-size: 15px; letter-spacing: .06em; color: var(--smoke); margin-top: 4px; }
.bx-status { display: grid; justify-items: end; }
.bx-status > * { grid-area: 1 / 1; }
.bx-status .chip { font-size: 16px; padding: 7px 14px; }
.bx-status .chip::before { content: ""; width: 8px; height: 8px; border-radius: 8px; background: currentColor; opacity: .8; }

.bx-perm { position: absolute; padding: 30px 32px 30px; }
.bx-perm__title { font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); margin-bottom: 14px; }
.bx-perm__row { position: relative; display: grid; grid-template-columns: 40px 1fr; gap: 16px; align-items: center; padding: 18px 14px; border-bottom: 1px solid var(--line); border-radius: 12px; }
.bx-perm__row svg { color: var(--smoke); }
.bx-perm__role { font-size: 25px; font-weight: 500; color: var(--bone); }
.bx-perm__scope { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
.bx-perm__hi { position: absolute; inset: 0; border-radius: 12px; background: rgb(245 131 39 / .07); box-shadow: inset 3px 0 0 var(--flame-500); opacity: 0; }
.bx-perm__note { display: flex; align-items: center; gap: 12px; margin-top: 22px; font-size: 22px; color: var(--ok); }

.bx-chatwrap { position: relative; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 40px); mask-image: linear-gradient(to bottom, transparent 0, #000 40px); }
.bx-chatwrap .msg { max-width: 88%; }
.bx-composer { position: absolute; left: 24px; right: 24px; bottom: 22px; height: 64px; border-radius: 14px; border: 1px solid var(--line-strong); background: var(--ink-800);
  display: flex; align-items: center; gap: 14px; padding: 0 22px; font-size: 22px; color: var(--bone); }
.bx-composer__ph { color: var(--smoke); position: absolute; left: 22px; }
.bx-composer__send { margin-left: auto; width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: var(--ink-600); color: var(--mist); }

.bx-docnarrow .docp { padding: 36px 40px; }
.bx-docnarrow .docp__title { font-size: 34px; margin-bottom: 22px; }
.bx-docnarrow .docp__p { font-size: 21px; line-height: 1.55; }
.bx-docnarrow .docp__bar { height: 12px; }
.bx-hl { background-image: linear-gradient(rgb(252 168 0 / .38), rgb(252 168 0 / .38)); background-repeat: no-repeat; background-size: 0% 100%; padding: 1px 0; color: #141010; }

.bx-flow .node { width: 600px; }
.bx-flow .node__sub { margin-left: auto; }
.bx-flow .node__txt { flex: 1; flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; }

.bx-log { position: absolute; padding: 26px 30px 28px; }
.bx-log__title { font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); padding-bottom: 16px; border-bottom: 1px solid var(--line); margin-bottom: 8px; }
.bx-log__line { display: grid; grid-template-columns: 22px 1fr; gap: 14px; align-items: center; padding: 12px 0; font-family: var(--mono); font-size: 18px; color: var(--mist); letter-spacing: .01em; }
.bx-log__line svg { color: var(--ok); }

.bx-method { position: absolute; left: 120px; top: 190px; width: 1680px; }
.bx-method .step__sub { font-family: var(--mono); font-size: 20px; letter-spacing: .06em; }
.bx-monthly { margin-top: 4px; align-self: flex-start; }
.bx-fact { position: absolute; left: 120px; top: 730px; width: 1680px; display: flex; align-items: baseline; gap: 40px; padding-top: 30px; border-top: 1px solid var(--line-strong); }
.bx-fact__k { font-family: var(--mono); font-size: 20px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); }
.bx-fact__v { font-family: var(--display); font-weight: 500; font-size: 56px; letter-spacing: -0.04em; color: var(--bone); }
`;

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const { h, place, icon } = lib;
  const tl = gsap.timeline({ paused: true });
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  const { glow } = lib.setup(stage, { glow: { x: 1380, y: 640, size: 1000 } });
  const hud = lib.hud(stage, { ix: '01', unit: c.unit });
  hud.in(tl, 0.2);

  /* ---------- unit-specific helpers ---------- */
  const peerize = (thread, i) => {
    const it = thread.items[i];
    it.row.className = 'msg msg--peer';
    return it;
  };
  const stepHeader = (L, n, line1, line2) => {
    const el = h('div', 'bx-head');
    const row = h('div', 'bx-head__row');
    const num = h('div', 'bx-head__n', n);
    const hl = lib.headline(line1, { size: 'sm' });
    row.append(num, hl.el);
    const subWrap = h('div', 'bx-head__sub-wrap');
    const sub = h('p', 'lede bx-head__sub', line2);
    subWrap.append(sub);
    el.append(row, subWrap);
    L.append(el);
    gsap.set(sub, { autoAlpha: 0 });
    return {
      el,
      in1(at) { lib.fadeUp(tl, num, at, { y: 10, dur: 0.6 }); hl.in(tl, at + 0.05); },
      in2(at) { lib.fadeUp(tl, sub, at, { y: 14, dur: 0.8 }); },
    };
  };
  let prev = null;
  const beat = (at) => {
    const L = lib.layer(stage);
    if (prev) lib.swap(tl, prev, L, at, { dur: 0.7 }); else lib.show(tl, L, at, { dur: 0.01 });
    prev = L;
    return L;
  };

  /* ---------- 0 to 8: hook ---------- */
  let L = beat(0);
  const hw = lib.win({ title: c.channel, x: 120, y: 214, w: 960, h: 470 });
  const hookChat = lib.chat({ messages: [
    { from: 'user', initials: 'JL', text: c.question },
    { from: 'peer', initials: 'AR', text: c.peer1 },
    { from: 'peer', initials: 'TK', text: c.peer2 },
  ] });
  peerize(hookChat, 1); peerize(hookChat, 2);
  hw.body.append(hookChat.el);
  hw.body.style.paddingTop = '40px';
  L.append(hw.el);
  hw.in(tl, 0.15, { y: 40 });
  hookChat.reveal(tl, 0.6, 0, { typing: 0 });
  hookChat.reveal(tl, 1.6, 1, { typing: 0 });
  hookChat.reveal(tl, 2.5, 2, { typing: 0 });

  const docPos = [
    [1170, 200, -1.6], [1490, 236, 1.2], [1200, 384, 1.0],
    [1510, 420, -1.4], [1160, 566, -0.8], [1480, 596, 1.8],
  ];
  const docEls = c.docs.map(([name, path], i) => {
    const d = h('div', 'bx-doc');
    const top = h('div', 'bx-doc__top');
    top.append(icon('doc', { size: 24 }), h('div', 'bx-doc__name', name));
    d.append(top, h('div', 'bx-doc__path', path));
    [0.8, 0.55].forEach((wv) => { const b = h('div', 'bx-doc__bar'); b.style.width = `calc(${Math.round(wv * 100)}% - 36px)`; d.append(b); });
    place(d, { x: docPos[i][0], y: docPos[i][1] });
    d.style.rotate = docPos[i][2] + 'deg';
    d.style.zIndex = String(i);
    L.append(d);
    return d;
  });
  lib.fadeUp(tl, docEls, 1.0, { y: 30, dur: 0.9, stagger: 0.18 });

  const hookTxt = h('div', 'bx-hook');
  const hk1 = lib.headline(c.hook1, { size: 'md' });
  const hk2 = lib.headline(c.hook2, { size: 'md' });
  hk2.el.style.color = 'var(--mist)';
  hookTxt.append(hk1.el, hk2.el);
  L.append(hookTxt);
  hk1.in(tl, 1.9);
  hk2.in(tl, 3.9);

  /* ---------- 8 to 16: promise ---------- */
  L = beat(7.5);
  const pr = h('div', 'bx-promise');
  const pEb = lib.eyebrow({ ix: '01', text: c.unit });
  const p1 = lib.headline(c.promise1, { size: 'md' });
  const p2 = lib.headline(`<em>${c.promise2}</em>`, { size: 'md' });
  const p3 = h('p', 'lede', c.promise3);
  pr.append(pEb, p1.el, p2.el, p3);
  L.append(pr);
  lib.fadeUp(tl, pEb, 8.2, { y: 12, dur: 0.7 });
  p1.in(tl, 8.4);
  p2.in(tl, 9.3);
  lib.fadeUp(tl, p3, 10.9, { y: 18, dur: 0.9 });

  const stack = h('div', 'bx-stack');
  const mkLay = ([name, sub, chips], ic, mod) => {
    const card = h('div', 'card bx-lay' + (mod ? ` bx-lay--${mod}` : ''));
    const head = h('div', 'bx-lay__head');
    const icw = h('div', 'bx-lay__ic'); icw.append(icon(ic, { size: 22 }));
    head.append(icw, h('div', 'bx-lay__name', name), h('div', 'bx-lay__sub', sub));
    const ch = h('div', 'bx-lay__chips');
    chips.forEach((t) => ch.append(h('span', 'chip', t)));
    card.append(head, ch);
    return card;
  };
  const link = () => { const l = h('div', 'bx-link'); l.append(h('i')); return l; };
  const layA = mkLay(c.stack.agents, 'users');
  const layB = mkLay(c.stack.brain, 'book', 'brain');
  const layS = mkLay(c.stack.sources, 'layers');
  const lk1 = link(), lk2 = link();
  stack.append(layA, lk1, layB, lk2, layS);
  L.append(stack);
  lib.fadeUp(tl, layS, 10.0, { y: 24, dur: 0.9 });
  tl.fromTo(lk2.firstChild, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.out' }, 10.3);
  lib.fadeUp(tl, layB, 10.35, { y: 24, dur: 0.9 });
  tl.fromTo(lk1.firstChild, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.out' }, 10.65);
  lib.fadeUp(tl, layA, 10.7, { y: 24, dur: 0.9 });
  tl.addLabel('poster', 12.5);

  /* ---------- 16 to 24: step 01, connect ---------- */
  L = beat(15.5);
  const h1 = stepHeader(L, '01', c.s1a, c.s1b);
  h1.in1(16.2);
  const sw = lib.win({ title: c.srcWin, x: 120, y: 340, w: 1000 });
  sw.body.style.padding = '14px 30px';
  const src = h('div', 'bx-src');
  const statuses = c.srcRows.map(([ic, name, metaTxt]) => {
    const r = h('div', 'bx-src__row');
    const icw = h('div', 'bx-src__ic'); icw.append(icon(ic, { size: 24 }));
    const mid = h('div');
    mid.append(h('div', 'bx-src__name', name), h('div', 'bx-src__meta', metaTxt));
    const st = h('div', 'bx-status');
    const a = h('span', 'chip', c.connecting), b = h('span', 'chip chip--ok', c.synced);
    st.append(a, b);
    gsap.set(b, { autoAlpha: 0 });
    r.append(icw, mid, st);
    src.append(r);
    return { r, a, b };
  });
  sw.body.append(src);
  L.append(sw.el);
  sw.in(tl, 16.5, { y: 40 });
  lib.fadeUp(tl, statuses.map((s) => s.r), 16.8, { y: 16, dur: 0.6, stagger: 0.1 });
  statuses.forEach((s, i) => {
    const t = 18.0 + i * 0.35;
    tl.to(s.a, { autoAlpha: 0, duration: 0.25 }, t);
    tl.fromTo(s.b, { autoAlpha: 0, x: 6 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out' }, t + 0.1);
  });

  const perm = h('div', 'card bx-perm');
  place(perm, { x: 1180, y: 340, w: 620 });
  perm.append(h('div', 'bx-perm__title', c.permTitle));
  const permRows = c.perms.map(([role, scopes]) => {
    const r = h('div', 'bx-perm__row');
    const hi = h('div', 'bx-perm__hi');
    const right = h('div');
    const sc = h('div', 'bx-perm__scope');
    scopes.forEach((s) => sc.append(h('span', 'chip', s)));
    right.append(h('div', 'bx-perm__role', role), sc);
    r.append(hi, icon('lock', { size: 22 }), right);
    perm.append(r);
    return { r, hi };
  });
  const note = h('div', 'bx-perm__note');
  note.append(icon('shield', { size: 24 }), h('span', null, c.permNote));
  perm.append(note);
  L.append(perm);
  lib.popIn(tl, perm, 20.0, { scale: 0.98, dur: 0.9 });
  lib.fadeUp(tl, permRows.map((p) => p.r), 20.2, { y: 12, dur: 0.6, stagger: 0.1 });
  lib.fadeUp(tl, note, 20.6, { y: 10, dur: 0.6 });
  h1.in2(20.4);
  tl.to(permRows[1].hi, { autoAlpha: 1, duration: 0.4 }, 21.0);

  /* ---------- 24 to 33: step 02, ask ---------- */
  L = beat(23.5);
  const h2 = stepHeader(L, '02', c.s2a, c.s2b);
  h2.in1(24.2);
  const cw = lib.win({ title: c.channel, x: 120, y: 340, w: 1060, h: 600, bodyPad: 0 });
  const wrap = h('div', 'bx-chatwrap');
  cw.body.style.height = (600 - 58) + 'px';
  wrap.style.height = (600 - 58 - 108) + 'px';
  const inner = h('div');
  inner.style.padding = '28px 32px 20px';
  const thread = lib.chat({ messages: [
    { from: 'user', initials: 'JL', text: c.question },
    { from: 'agent', text: c.answer, meta: [{ text: c.source, kind: 'flame' }, { text: c.confidence, kind: 'ok' }] },
    { from: 'user', initials: 'JL', text: c.q2 },
    { from: 'agent', text: c.idk, meta: [c.idkChip] },
  ] });
  inner.append(thread.el);
  wrap.append(inner);
  const composer = h('div', 'bx-composer');
  const ph = h('span', 'bx-composer__ph', c.composer);
  const typed = h('span');
  const send = h('div', 'bx-composer__send'); send.append(icon('arrow', { size: 20 }));
  composer.append(ph, typed, send);
  cw.body.append(wrap, composer);
  L.append(cw.el);
  cw.in(tl, 24.3, { y: 40 });
  // question: typed in the composer, then sent
  tl.to(ph, { autoAlpha: 0, duration: 0.15 }, 24.7);
  lib.typeText(tl, typed, c.question, 24.7, { cps: 48 });
  const sendAt = 24.7 + Math.max(0.3, c.question.length / 48) + 0.15;
  tl.to(typed, { autoAlpha: 0, duration: 0.15 }, sendAt);
  tl.to(ph, { autoAlpha: 1, duration: 0.3 }, sendAt + 0.15);
  thread.reveal(tl, sendAt, 0, { typing: 0 });
  thread.reveal(tl, 26.0, 1, { typing: 0.6 });
  h2.in2(29.6);
  // the policy document
  const dw = lib.win({ title: c.docWin, paper: true, x: 1240, y: 340, w: 560, h: 600, bodyPad: 0 });
  dw.el.classList.add('bx-docnarrow');
  const dp = lib.docPage({ kicker: c.docKicker, title: c.docTitle, blocks: [
    { h: c.docH2 }, { bar: 0.94 }, { bar: 0.7 },
    { h: c.docH3 }, { p: c.docP3 }, { bar: 0.82 }, { bar: 0.6 },
  ] });
  dw.body.append(dp.el);
  L.append(dw.el);
  dw.in(tl, 27.2, { y: 40 });
  dp.in(tl, 27.5);
  const hlSpan = dp.el.querySelector('.bx-hl');
  tl.fromTo(hlSpan, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 1.1, ease: 'power2.inOut' }, 28.3);
  // second exchange: thread scrolls up like a real chat
  const visH = 600 - 58 - 108;
  const last = thread.items[3].row;
  const endY = lib.restRect(last).y + last.offsetHeight - lib.restRect(inner).y + 20;
  const shift = Math.max(0, endY - visH);
  tl.to(inner, { y: -shift, duration: 0.8, ease: 'power3.inOut' }, 29.1);
  thread.reveal(tl, 29.4, 2, { typing: 0 });
  thread.reveal(tl, 30.0, 3, { typing: 0.5 });

  /* ---------- 33 to 42: step 03, act ---------- */
  L = beat(32.5);
  const h3 = stepHeader(L, '03', c.s3a, c.s3b);
  h3.in1(33.2);
  const iw = lib.win({ title: c.inboxWin, x: 120, y: 340, w: 860 });
  iw.body.style.padding = '16px 18px';
  const ib = lib.inbox({ rows: c.rows.map(([from, initials, subject, time]) => ({ from, initials, subject, time })) });
  iw.body.append(ib.el);
  L.append(iw.el);
  iw.in(tl, 33.3, { y: 40 });
  ib.in(tl, 33.5);
  ib.highlight(tl, 34.0, 0);

  const fl = lib.flow({ x: 1040, y: 340, w: 760, h: 580, nodes: c.nodes.map(([ic, label, sub], i) => ({
    id: 'n' + i, x: 380, y: 50 + i * 120, label, sub, icon: ic, kind: i === 2 ? 'accent' : undefined,
  })), edges: [0, 1, 2, 3].map((i) => ({ from: 'n' + i, to: 'n' + (i + 1), curve: 'v', hot: i === 2 })) });
  fl.el.classList.add('bx-flow');
  L.append(fl.el);
  fl.in(tl, 34.4, { gap: 0.5 });
  [0, 1, 2, 3].forEach((i) => fl.pulse(tl, 36.9 + i * 0.4, i, { dur: 0.5 }));
  fl.focus(tl, 38.4, 'n3', { hold: 1.2 });
  ib.tag(tl, 38.6, 0, c.tagOk, 'ok');
  ib.tag(tl, 39.1, 1, c.tagWait, 'flame');
  h3.in2(37.4);

  /* ---------- 42 to 51: step 04, approve ---------- */
  L = beat(41.5);
  const h4 = stepHeader(L, '04', c.s4a, c.s4b);
  h4.in1(42.2);
  const ap = lib.approval({ flag: c.flag, title: c.apprTitle, fields: c.fields, approve: c.approve, reject: c.reject, approved: c.approved, x: 900, y: 340, w: 900 });
  L.append(ap.el);
  ap.in(tl, 42.6);
  const cur = lib.cursor(stage, { x: 1760, y: 1000 });
  cur.in(tl, 44.6);
  cur.moveTo(tl, 44.7, ap.approveBtn, { dur: 0.9, dx: -20, dy: 6 });
  cur.click(tl, 46.0);
  ap.decide(tl, 46.0, 'approve');
  ap.el.querySelector('.appr__flag > span > span:last-child').textContent = c.flagDone;
  cur.out(tl, 47.0);

  const log = h('div', 'card bx-log');
  place(log, { x: 120, y: 340, w: 720 });
  log.append(h('div', 'bx-log__title', c.logTitle));
  const logLines = c.log.map((t) => {
    const ln = h('div', 'bx-log__line');
    ln.append(icon('check', { size: 20, stroke: 2.4 }), h('span', null, t));
    log.append(ln);
    return ln;
  });
  L.append(log);
  lib.fadeUp(tl, log, 46.6, { y: 30, dur: 0.9 });
  lib.fadeUp(tl, logLines, 46.9, { y: 10, dur: 0.5, stagger: 0.35 });
  h4.in2(47.0);

  /* ---------- 51 to 58: method ---------- */
  L = beat(50.5);
  const mh = lib.headline(c.m1, { size: 'sm' });
  const mWrap = h('div', 'bx-method');
  mWrap.append(mh.el);
  L.append(mWrap);
  mh.in(tl, 51.3);
  const st = lib.steps({ y: 390, items: c.method.map(([label, sub]) => ({ label, sub })) });
  L.append(st.el);
  const monthly = h('span', 'chip chip--flame bx-monthly', c.monthly);
  st.steps[3].el.append(monthly);
  st.in(tl, 51.7);
  [52.2, 52.9, 53.6, 54.3].forEach((t, i) => st.go(tl, t, i));
  lib.fadeUp(tl, monthly, 54.7, { y: 8, dur: 0.5 });
  const fact = h('div', 'bx-fact');
  fact.append(h('div', 'bx-fact__k', c.factK), h('div', 'bx-fact__v', c.factV));
  L.append(fact);
  tl.fromTo(fact, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 54.8);
  hud.chrome(tl, 57.6, false);

  /* ---------- 58 to 64: CTA ---------- */
  L = beat(57.7);
  const cta = lib.ctaCard({ lang, title: c.cta });
  L.append(cta.el);
  const wm = cta.el.firstChild, url = cta.el.lastChild;
  lib.fadeUp(tl, wm, 58.1, { y: 14, dur: 0.8 });
  const ctaLines = lib.linesOf(cta.headline.el);
  gsap.set(cta.headline.words, { yPercent: 115 });
  ctaLines.forEach((ws, i) => tl.to(ws, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.015 }, i === 0 ? 58.3 : 59.1));
  lib.popIn(tl, cta.button, 60.0, { scale: 0.94, dur: 0.9 });
  lib.fadeUp(tl, url, 60.4, { y: 10, dur: 0.8 });
  tl.to({}, { duration: 64 - tl.duration() });

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
