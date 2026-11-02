// 6-second sample proving the toolkit end to end. Copy is taken from the Brains page.
export const meta = { title: { en: 'Toolkit sample', es: 'Muestra del kit' } };

export const copy = {
  en: {
    unit: 'Brains',
    win: 'Sales agent',
    title: 'One brain for your company. <em>An agent for every process.</em>',
    user: 'Can we offer the annual plan to this lead?',
    agent: 'Yes. They match your criteria. I drafted the reply for your approval.',
    source: 'Source: Sales playbook',
    flag: 'Needs approval',
    apprTitle: 'Send reply to new lead',
    fields: [['Channel', 'Email'], ['Logged in', 'CRM']],
    approve: 'Approve', reject: 'Reject', approved: 'Approved',
    cta: 'Start with <em>one process.</em>',
  },
  es: {
    unit: 'Brains',
    win: 'Agente de ventas',
    title: 'Un cerebro para tu empresa. <em>Un agente para cada proceso.</em>',
    user: '¿Podemos ofrecerle el plan anual a este lead?',
    agent: 'Sí. Cumple tus criterios. Preparé la respuesta para que la apruebes.',
    source: 'Fuente: Playbook de ventas',
    flag: 'Requiere aprobación',
    apprTitle: 'Enviar respuesta al nuevo lead',
    fields: [['Canal', 'Email'], ['Registrado en', 'CRM']],
    approve: 'Aprobar', reject: 'Rechazar', approved: 'Aprobado',
    cta: 'Empieza con <em>un proceso.</em>',
  },
};

export const transcript = {
  en: 'One brain for your company. An agent for every process. The agent answers from your sources and asks a person to approve before it acts. Start with one process. Book a call at sandboxinnovate.com.',
  es: 'Un cerebro para tu empresa. Un agente para cada proceso. El agente responde con tus fuentes y pide la aprobación de una persona antes de actuar. Empieza con un proceso. Agenda una llamada en sandboxinnovate.com.',
};

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const tl = gsap.timeline({ paused: true });
  const { glow } = lib.setup(stage);
  const hud = lib.hud(stage, { ix: '01', unit: c.unit });

  // Beat 1: title card
  const L1 = lib.layer(stage, { visible: true });
  const card = lib.titleCard({ eyebrow: { ix: '01', text: c.unit }, title: c.title, size: 'lg', maxWidth: 1450 });
  L1.append(card.el);
  card.in(tl, 0.1);
  hud.in(tl, 0.3);
  card.out(tl, 1.9);

  // Beat 2: chat window + approval + cursor
  const L2 = lib.layer(stage);
  const w = lib.win({ title: c.win, badge: lang === 'es' ? 'Activo' : 'Live', x: 120, y: 190, w: 980, h: 640 });
  const thread = lib.chat({ messages: [
    { from: 'user', initials: 'MR', text: c.user },
    { from: 'agent', text: c.agent, meta: [{ text: c.source, kind: 'flame' }] },
  ] });
  w.body.append(thread.el);
  L2.append(w.el);
  const appr = lib.approval({ flag: c.flag, title: c.apprTitle, fields: c.fields, approve: c.approve, reject: c.reject, approved: c.approved, x: 1040, y: 360, w: 760 });
  L2.append(appr.el);
  const cur = lib.cursor(stage, { x: 1700, y: 1000 });

  lib.show(tl, L2, 2.15, { dur: 0.01 });
  w.in(tl, 2.15);
  thread.reveal(tl, 2.3, 0, { typing: 0 });
  thread.reveal(tl, 2.6, 1, { typing: 0.35 });
  appr.in(tl, 2.7);
  cur.in(tl, 2.8);
  cur.moveTo(tl, 2.8, appr.approveBtn, { dur: 0.7, dx: 10, dy: 6 });
  cur.click(tl, 3.5);
  appr.decide(tl, 3.5, 'approve');
  tl.addLabel('poster', 4.45);
  cur.out(tl, 4.2);
  lib.hide(tl, L2, 4.55, { dur: 0.4 });

  // Beat 3: CTA end card
  const L3 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.cta });
  L3.append(cta.el);
  lib.show(tl, L3, 4.75, { dur: 0.01 });
  hud.chrome(tl, 4.6, false);
  cta.in(tl, 4.75);
  lib.hold(tl, 0.4);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
