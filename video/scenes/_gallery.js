// Component gallery for visual QA and as a code reference. Not a publishable video.
// node video/frames.mjs _gallery en 2.5,6.5,10.5,14.5,18.5,22.5,26.5
export const meta = { title: { en: 'Component gallery', es: 'Galería de componentes' } };

export function build({ lang, stage, gsap, lib }) {
  const tl = gsap.timeline({ paused: true });
  const { glow } = lib.setup(stage);
  const hud = lib.hud(stage, { ix: '00', unit: 'Gallery' });
  hud.in(tl, 0);
  const es = lang === 'es';
  let prev = null;
  const beat = (at) => { const L = lib.layer(stage); if (prev) lib.swap(tl, prev, L, at); else lib.show(tl, L, at); prev = L; return L; };

  // 0 to 4: dashboard tiles + caption
  let L = beat(0);
  const t = lib.tiles({ lang, cols: 3, items: [
    { label: es ? 'Tickets resueltos' : 'Tickets resolved', value: 128, spark: [3, 5, 4, 7, 6, 9, 8, 11] },
    { label: es ? 'Tiempo de respuesta' : 'Response time', value: 4, unit: 'min', spark: [9, 8, 8, 6, 5, 5, 4, 4] },
    { label: es ? 'Escalados a una persona' : 'Escalated to a person', value: 12, spark: [2, 3, 2, 4, 3, 3, 2, 3] },
  ] });
  lib.place(t.el, { x: 120, y: 240, w: 1680 });
  L.append(t.el);
  t.in(tl, 0.3); t.count(tl, 0.6);
  const cap = lib.caption({ kicker: es ? 'Placeholder, no son datos reales' : 'Placeholder, not real data', text: es ? 'Tiles con <em>contadores</em> y sparklines.' : 'Tiles with <em>counters</em> and sparklines.' });
  L.append(cap.el); cap.in(tl, 1.0);

  // 4 to 8: document page in a paper window, with highlight
  L = beat(4);
  const w = lib.win({ title: es ? 'Política de devoluciones' : 'Returns policy', paper: true, x: 460, y: 170, w: 1000, h: 760, bodyPad: 0 });
  const d = lib.docPage({ kicker: es ? 'Documento interno' : 'Internal document', title: es ? 'Devoluciones y cambios' : 'Returns and exchanges', blocks: [
    { p: es ? 'Los clientes pueden solicitar un cambio <mark>dentro de los primeros 30 días</mark> con el comprobante de compra.' : 'Customers can request an exchange <mark>within the first 30 days</mark> with proof of purchase.' },
    { bar: 0.92 }, { bar: 0.78 }, { h: es ? 'Excepciones' : 'Exceptions' }, { bar: 0.85 }, { bar: 0.6 },
  ] });
  w.body.append(d.el); L.append(w.el);
  w.in(tl, 4.2); d.in(tl, 4.6); d.mark(tl, 5.6, 0);

  // 8 to 12: search + AI answer
  L = beat(8);
  const a = lib.aiAnswer({ query: es ? 'mejor agencia de IA aplicada para pymes' : 'best applied AI partner for a mid-size company', label: es ? 'Respuesta de IA' : 'AI answer',
    paragraphs: [es ? 'Varias opciones combinan estrategia e implementación. <span class="brand">Sandbox</span> aparece entre las fuentes citadas.' : 'Several options combine strategy and implementation. <span class="brand">Sandbox</span> appears among the cited sources.'],
    sources: ['sandboxinnovate.com', es ? 'Guía del sector' : 'Industry guide'] });
  lib.place(a.el, { x: 260, y: 240, w: 1400 });
  L.append(a.el);
  fadeIn(a.search, 8.2);
  a.typeQuery(tl, 8.5); a.in(tl, 10.3);

  // 12 to 16: lessons list with checks
  L = beat(12);
  const ls = lib.lessons({ items: [
    { when: es ? 'Sem 1' : 'Week 1', title: es ? 'Fundamentos para tu equipo' : 'Foundations for your team', meta: '90 min' },
    { when: es ? 'Sem 2' : 'Week 2', title: es ? 'Prompts para tu trabajo diario' : 'Prompts for your daily work', meta: '90 min' },
    { when: es ? 'Sem 3' : 'Week 3', title: es ? 'Automatiza una tarea real' : 'Automate one real task', meta: '120 min' },
  ] });
  lib.place(ls.el, { x: 360, y: 300, w: 1200 }); L.append(ls.el);
  ls.in(tl, 12.3); ls.check(tl, 13.4, 0); ls.check(tl, 14.0, 1);

  // 16 to 21: flow diagram drawing + pulses
  L = beat(16);
  const f = lib.flow({ x: 120, y: 200, w: 1680, h: 640, nodes: [
    { id: 'in', x: 180, y: 320, label: es ? 'Correo entrante' : 'Inbound email', sub: 'Inbox', icon: 'mail' },
    { id: 'kb', x: 700, y: 120, label: es ? 'Base de conocimiento' : 'Knowledge base', sub: 'Docs', icon: 'book' },
    { id: 'ag', x: 700, y: 320, label: es ? 'Agente' : 'Agent', sub: es ? 'Redacta' : 'Drafts', icon: 'bolt', kind: 'accent' },
    { id: 'hu', x: 1200, y: 320, label: es ? 'Aprobación' : 'Approval', sub: es ? 'Persona' : 'Person', icon: 'user', kind: 'human' },
    { id: 'crm', x: 1500, y: 520, label: 'CRM', sub: es ? 'Registro' : 'Logged', icon: 'db' },
  ], edges: [{ from: 'in', to: 'ag' }, { from: 'kb', to: 'ag', curve: 'v' }, { from: 'ag', to: 'hu', hot: true }, { from: 'hu', to: 'crm' }] });
  L.append(f.el);
  f.in(tl, 16.2, { order: ['in', 'kb', 'ag', 'hu', 'crm'] });
  f.pulse(tl, 18.4, 0); f.pulse(tl, 19.1, 2); f.focus(tl, 19.9, 'hu'); f.pulse(tl, 20.2, 3);

  // 21 to 25: steps 1-2-3 + headline
  L = beat(21);
  const hl = lib.headline(es ? 'Así <em>trabajamos</em>' : 'How we <em>work</em>', { size: 'md' });
  lib.place(hl.el, { x: 120, y: 260 }); L.append(hl.el); hl.in(tl, 21.3);
  const st = lib.steps({ y: 520, items: [
    { label: es ? 'Diagnóstico' : 'Diagnose', sub: es ? 'Mapeamos el proceso con tu equipo.' : 'We map the process with your team.' },
    { label: es ? 'Construcción' : 'Build', sub: es ? 'Conectamos tus herramientas.' : 'We connect your tools.' },
    { label: es ? 'Ajuste' : 'Tune', sub: es ? 'Medimos y mejoramos.' : 'We measure and improve.' },
  ] });
  L.append(st.el); st.in(tl, 21.6); st.go(tl, 22.4, 0); st.go(tl, 23.1, 1); st.go(tl, 23.8, 2);

  // 25 to 28: logo card
  L = beat(25);
  const lc = lib.logoCard({ tagline: es ? 'IA aplicada' : 'Applied AI' });
  L.append(lc.el); hud.chrome(tl, 24.8, false); lc.in(tl, 25.3);
  lib.hold(tl, 1.2);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;

  function fadeIn(el, at) { lib.fadeUp(tl, el, at, { y: 16, dur: 0.6 }); }
}
