/* Sandbox video runtime library.
 * Every component returns { el, ...methods }. Methods take a gsap timeline `tl` and a gsap
 * position `at` (seconds number, label, or relative string like "+=0.4") and add tweens to it.
 * Append `el` to a layer BEFORE calling methods that measure layout (headline.in, flow.in, cursor.moveTo).
 * Everything is driven by the paused timeline, never by real time, so renders are deterministic.
 */
const gsap = window.gsap;

export const W = 1920, H = 1080;
export const M = { x: 120, y: 96, gut: 24, col: 135 };
export const EASE = { out: 'expo.out', soft: 'power3.out', inOut: 'power3.inOut', in: 'power2.in', linear: 'none' };
export const T = { in: 0.9, out: 0.5, stagger: 0.07 };

/* ------------------------------------------------------------------ DOM helpers */
export function h(tag, cls, content) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (content == null) return el;
  if (Array.isArray(content)) content.forEach((c) => c != null && el.append(c));
  else if (content instanceof Node) el.append(content);
  else el.innerHTML = String(content);
  return el;
}
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export function place(el, { x, y, w, h: hh, right, bottom } = {}) {
  el.style.position = 'absolute';
  if (x != null) el.style.left = px(x);
  if (y != null) el.style.top = px(y);
  if (right != null) el.style.right = px(right);
  if (bottom != null) el.style.bottom = px(bottom);
  if (w != null) el.style.width = px(w);
  if (hh != null) el.style.height = px(hh);
  return el;
}
const px = (v) => (typeof v === 'number' ? v + 'px' : v);
/** Resting layout rect relative to the stage, IGNORING transforms (so it is the same at any timeline time).
 *  Use this for anything that must be deterministic (cursor targets). */
export function restRect(el) {
  const stage = document.getElementById('stage');
  let x = 0, y = 0, n = el;
  while (n && n !== stage) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  const w = el.offsetWidth, hh = el.offsetHeight;
  return { x, y, w, h: hh, cx: x + w / 2, cy: y + hh / 2 };
}
/** Rect of an element relative to the stage as currently rendered (includes transforms). */
export function rectOf(el) {
  const s = document.getElementById('stage').getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height, cx: r.left - s.left + r.width / 2, cy: r.top - s.top + r.height / 2 };
}

/* ------------------------------------------------------------------ icons (24x24 stroke) */
const ICON_PATHS = {
  inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1.2-3.4 3.6-5 6.5-5s5.3 1.6 6.5 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.8 5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  book: '<path d="M4 5c3-1.5 5.5-1.5 8 0v15c-2.5-1.5-5-1.5-8 0z"/><path d="M12 5c2.5-1.5 5-1.5 8 0v15c-3-1.5-5.5-1.5-8 0"/>',
  box: '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
  handshake: '<path d="m2 12 4-5 4 2 3-2 4 1 5 4"/><path d="m7 13 3 3a1.5 1.5 0 0 0 2-2M10 16l1.5 1.5a1.5 1.5 0 0 0 2-2M13 17.5a1.5 1.5 0 0 0 2-2l-3-3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  play: '<path d="M7 4.5v15l13-7.5z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sparkle: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
  flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
};
export function icon(name, { size = 24, stroke = 1.8, cls = '' } = {}) {
  const p = ICON_PATHS[name] || ICON_PATHS.sparkle;
  const wrap = document.createElement('span');
  wrap.innerHTML = `<svg class="${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  return wrap.firstChild;
}
export const ICONS = Object.keys(ICON_PATHS);

const CUBE_PATH = 'M50 6L88.11 28L88.11 72L50 94L11.89 72L11.89 28ZM50 44.28L78.2 28L65.62 20.74L50 25.36L34.38 20.74L21.8 28ZM47.14 54.07L16.85 36.58L16.85 49.78L32.09 58.58L32.09 77.94L47.14 86.63ZM52.86 54.07L83.15 36.58L83.15 49.78L67.91 58.58L67.91 77.94L52.86 86.63Z';
let gid = 0;
/** The Sandbox cube mark (same vector as src/components/ui/Logo.astro). `mono` paints it with currentColor. */
export function cube({ size = 48, mono = false, cls = 'wordmark__mark' } = {}) {
  const id = 'cg' + ++gid;
  const wrap = document.createElement('span');
  wrap.innerHTML = `<svg class="${cls}" viewBox="11.89 6 76.21 88" style="height:${size}px;width:auto" aria-hidden="true">${mono ? '' : `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD21F"/><stop offset=".42" stop-color="#F7921E"/><stop offset="1" stop-color="#E2540C"/></linearGradient></defs>`}<path fill="${mono ? 'currentColor' : `url(#${id})`}" fill-rule="evenodd" d="${CUBE_PATH}"/></svg>`;
  return wrap.firstChild;
}
/** "SANDB" + cube + "X" wordmark, exactly like the site Nav logo. size = font-size in px. */
export function wordmark({ size = 64 } = {}) {
  const el = h('div', 'wordmark');
  el.style.fontSize = size + 'px';
  const mark = cube({ size: Math.round(size * 1.02) });
  mark.style.height = '1.02em';
  el.append(h('span', 'wordmark__txt', 'SANDB'), mark, h('span', 'wordmark__txt', 'X'));
  return el;
}

/* ------------------------------------------------------------------ stage setup */
/** Adds background atmosphere + optional grain/vignette. Call once per scene.
 *  opts: { grid=true, glow={x,y,size}|false, grain=true, vignette=true } -> { bg, glow } */
export function setup(stage, { grid = true, glow = { x: 1340, y: 620, size: 900 }, grain = true, vignette = true } = {}) {
  const bg = h('div', 'bg');
  bg.append(h('div', 'bg__base'));
  if (grid) bg.append(h('div', 'bg__grid'));
  let g = null;
  if (glow) {
    g = h('div', 'bg__glow');
    const s = glow.size || 900;
    Object.assign(g.style, { width: s + 'px', height: s + 'px', left: glow.x - s / 2 + 'px', top: glow.y - s / 2 + 'px' });
    bg.append(g);
  }
  stage.append(bg);
  if (vignette) stage.append(h('div', 'fx-vignette'));
  if (grain) stage.append(h('div', 'fx-grain'));
  return { bg, glow: g };
}
/** Slowly drift an element (e.g. the glow) across the whole timeline. Call AFTER the timeline is complete. */
export function drift(tl, el, { x = -260, y = -120, from = 0 } = {}) {
  if (!el) return tl;
  const d = Math.max(0.1, tl.duration() - from);
  return tl.fromTo(el, { x: 0, y: 0 }, { x, y, duration: d, ease: 'sine.inOut' }, from);
}

/** A full-frame layer. Hidden by default (autoAlpha 0) unless visible:true. */
export function layer(stage, { visible = false, pad = false, z } = {}) {
  const el = h('div', 'layer' + (pad ? ' layer--pad' : ''));
  if (z != null) el.style.zIndex = z;
  stage.append(el);
  gsap.set(el, { autoAlpha: visible ? 1 : 0 });
  return el;
}
export function show(tl, el, at, { dur = 0.6, y = 0 } = {}) {
  return tl.fromTo(el, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: dur, ease: EASE.soft, immediateRender: false }, at);
}
export function hide(tl, el, at, { dur = 0.5, y = 0 } = {}) {
  return tl.to(el, { autoAlpha: 0, y, duration: dur, ease: EASE.in }, at);
}
/** Crossfade between two layers (out first, in overlapping). */
export function swap(tl, from, to, at, { dur = 0.6 } = {}) {
  hide(tl, from, at, { dur: dur * 0.8, y: -16 });
  return show(tl, to, typeof at === 'number' ? at + dur * 0.45 : `${at}+=${dur * 0.45}`, { dur, y: 16 });
}
/** Add empty time at the end of the timeline. */
export const hold = (tl, s) => (s > 0 ? tl.to({}, { duration: s }) : tl);

export function fadeUp(tl, targets, at, { y = 36, dur = T.in, stagger = T.stagger, ease = EASE.out } = {}) {
  return tl.fromTo(targets, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: dur, stagger, ease }, at);
}
export function fadeOut(tl, targets, at, { y = -18, dur = T.out, stagger = 0 } = {}) {
  return tl.to(targets, { autoAlpha: 0, y, duration: dur, stagger, ease: EASE.in }, at);
}
export function popIn(tl, targets, at, { scale = 0.94, dur = 0.8, stagger = T.stagger } = {}) {
  return tl.fromTo(targets, { autoAlpha: 0, scale, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: dur, stagger, ease: EASE.out }, at);
}

/* ------------------------------------------------------------------ text */
/** Wrap every word of an element's text in .w > span masks (keeps <em>, <strong>, <br>). */
export function splitWords(el) {
  const walk = (node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const parts = n.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.append(document.createTextNode(' '));
          else {
            const w = h('span', 'w'); const i = h('span'); i.textContent = p; w.append(i); frag.append(w);
          }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  };
  walk(el);
  return $$('.w > span', el);
}
/** Group split words into visual lines (call after the element is in the DOM). */
export function linesOf(el) {
  const lines = []; let last = null;
  $$('.w', el).forEach((w) => {
    const top = Math.round(w.offsetTop);
    if (last === null || Math.abs(top - last) > 4) { lines.push([]); last = top; }
    lines[lines.length - 1].push(w.firstChild);
  });
  return lines;
}

/** Kinetic headline. html may contain <em> (flame gradient) and <br>.
 *  size: 'xl'|'lg'|'md'|'sm'. Returns { el, words, in(tl, at, {by:'line'|'word', stagger, dur}), out(tl, at) } */
export function headline(html, { size = 'lg', tag = 'h2', maxWidth, align, cls = '' } = {}) {
  const el = h(tag, `hl hl--${size} ${cls}`, html);
  if (maxWidth) el.style.maxWidth = px(maxWidth);
  if (align) el.style.textAlign = align;
  const words = splitWords(el);
  return {
    el, words,
    in(tl, at, { by = 'line', stagger, dur = 1.1 } = {}) {
      gsap.set(words, { yPercent: 115 });
      if (by === 'word') return tl.to(words, { yPercent: 0, duration: dur, ease: EASE.out, stagger: stagger ?? 0.05 }, at);
      const lines = linesOf(el);
      const st = stagger ?? 0.12;
      lines.forEach((ws, i) => tl.to(ws, { yPercent: 0, duration: dur, ease: EASE.out, stagger: 0.015 }, typeof at === 'number' ? at + i * st : `${at}+=${i * st}`));
      return tl;
    },
    out(tl, at, { dur = 0.55 } = {}) {
      return tl.to(words, { yPercent: -115, duration: dur, ease: EASE.in, stagger: 0.012 }, at);
    },
  };
}

/** Typewriter: deterministic (driven by a tween setter, not callbacks). */
export function typeText(tl, el, text, at, { cps = 26, dur, ease = 'none', caret = false } = {}) {
  const d = dur ?? Math.max(0.3, text.length / cps);
  let caretEl = null;
  if (caret) { caretEl = h('span', 'search__caret'); }
  let n = -1;
  const target = { set: (v) => { const k = Math.round(v); if (k === n) return; n = k; el.textContent = text.slice(0, k); if (caretEl) el.append(caretEl); }, val: 0 };
  target.set(0);
  const obj = { v: 0 };
  return tl.to(obj, { v: text.length, duration: d, ease, modifiers: { v: (v) => { target.set(v); return v; } } }, at);
}

/** Number counter, deterministic. opts: { from=0, to, dur=1.6, decimals=0, prefix='', suffix='', lang='en' } */
export function counter(tl, el, at, { from = 0, to, dur = 1.6, decimals = 0, prefix = '', suffix = '', lang = 'en', ease = 'power2.out' } = {}) {
  const fmt = new Intl.NumberFormat(lang === 'es' ? 'es-MX' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const render = (v) => { el.textContent = prefix + fmt.format(v) + suffix; };
  render(from);
  const obj = { v: from };
  return tl.to(obj, { v: to, duration: dur, ease, modifiers: { v: (v) => { render(v); return v; } } }, at);
}

/* ------------------------------------------------------------------ eyebrow, title card, caption */
/** Mono eyebrow like "[01] BRAINS". */
export function eyebrow({ ix, text, pill = false, dot = false } = {}) {
  const el = h('div', 'eyebrow' + (pill ? ' eyebrow--pill' : ''));
  if (dot) el.append(h('span', 'eyebrow__dot'));
  if (ix != null) el.append(h('span', 'eyebrow__ix', `[${ix}]`));
  if (text) el.append(h('span', null, text));
  return el;
}

/** Title card: eyebrow + kinetic headline + optional sub. { eyebrow:{ix,text}, title(html), sub(html), size, align:'left'|'center', maxWidth, rule } */
export function titleCard({ eyebrow: eb, title, sub, size = 'lg', align = 'left', maxWidth = 1500, rule = false } = {}) {
  const el = h('div', 'tcard' + (align === 'center' ? ' tcard--center' : ''));
  const ebEl = eb ? eyebrow(eb) : null;
  const ruleEl = rule ? h('div', 'tcard__rule') : null;
  const hl = headline(title, { size, maxWidth, align: align === 'center' ? 'center' : undefined });
  const subEl = sub ? h('p', 'lede', sub) : null;
  if (subEl && align === 'center') subEl.style.textAlign = 'center';
  [ebEl, ruleEl, hl.el, subEl].forEach((x) => x && el.append(x));
  return {
    el, headline: hl, eyebrow: ebEl, sub: subEl,
    in(tl, at = 0) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      if (ebEl) fadeUp(tl, ebEl, t0, { y: 14, dur: 0.7 });
      if (ruleEl) tl.fromTo(ruleEl, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: EASE.inOut }, t0);
      hl.in(tl, t0 + 0.15);
      if (subEl) fadeUp(tl, subEl, t0 + 0.75, { y: 20, dur: 0.9 });
      return tl;
    },
    out(tl, at) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      hl.out(tl, t0);
      return fadeOut(tl, [ebEl, ruleEl, subEl].filter(Boolean), t0, { y: -10 });
    },
  };
}

/** Lower-third caption. { kicker (mono), text (html, <em> = flame), x, bottom, maxWidth } */
export function caption({ kicker, text, x, bottom, maxWidth } = {}) {
  const el = h('div', 'cap');
  if (x != null) el.style.left = px(x);
  if (bottom != null) el.style.bottom = px(bottom);
  if (maxWidth) el.style.maxWidth = px(maxWidth);
  const bar = h('div', 'cap__bar');
  const body = h('div', 'cap__body');
  const k = kicker ? h('div', 'mono mono--sm', kicker) : null;
  const t = h('div', 'cap__text', text);
  if (k) body.append(k);
  body.append(t);
  el.append(bar, body);
  return {
    el,
    in(tl, at) {
      tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: EASE.inOut }, at);
      return fadeUp(tl, [k, t].filter(Boolean), typeof at === 'number' ? at + 0.15 : `${at}+=0.15`, { y: 16, dur: 0.8, stagger: 0.08 });
    },
    out(tl, at) {
      tl.to(bar, { scaleY: 0, transformOrigin: '50% 100%', duration: 0.45, ease: EASE.in }, at);
      return fadeOut(tl, [k, t].filter(Boolean), at, { y: -8, dur: 0.4 });
    },
  };
}

/* ------------------------------------------------------------------ UI window */
/** App window frame. { title, url, badge, x, y, w, h, paper } -> { el, bar, body, in(tl, at), out(tl, at) } */
export function win({ title = '', url, badge, x, y, w = 1100, h: hh, paper = false, bodyPad } = {}) {
  const el = h('div', 'win' + (paper ? ' win--paper' : ''));
  place(el, { x, y, w, h: hh });
  const bar = h('div', 'win__bar');
  const dots = h('div', 'win__dots', '<i></i><i></i><i></i>');
  bar.append(dots, h('div', 'win__title', title));
  if (url) bar.append(h('div', 'win__url', url));
  if (badge) bar.append(h('div', 'win__badge', badge));
  const body = h('div', 'win__body');
  if (bodyPad != null) body.style.padding = px(bodyPad);
  el.append(bar, body);
  return {
    el, bar, body,
    in(tl, at, { y: dy = 60, dur = 1.1 } = {}) {
      return tl.fromTo(el, { autoAlpha: 0, y: dy, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: dur, ease: EASE.out }, at);
    },
    out(tl, at) { return fadeOut(tl, el, at, { y: -24, dur: 0.55 }); },
  };
}

/* ------------------------------------------------------------------ chat thread */
/** Chat thread. messages: [{ from:'user'|'agent'|'human', initials, text(html), meta:[strings|{text,kind:'flame'|'ok'}] }]
 *  Bubbles keep their layout space while hidden, so nothing reflows when they appear.
 *  -> { el, items, reveal(tl, at, i, {typing}), play(tl, at, {gap, typing}) returns end time } */
export function chat({ messages = [], agentIcon } = {}) {
  const el = h('div', 'chat');
  const items = messages.map((m) => {
    const isAgent = m.from === 'agent';
    const row = h('div', `msg msg--${isAgent ? 'agent' : 'user'}`);
    const av = h('div', 'msg__av');
    if (isAgent) av.append(agentIcon ? icon(agentIcon, { size: 22 }) : cube({ size: 22, cls: '' }));
    else av.textContent = m.initials || 'JD';
    const col = h('div', 'msg__col');
    const bubble = h('div', 'msg__bubble', m.text);
    col.append(bubble);
    let meta = null;
    if (m.meta && m.meta.length) {
      meta = h('div', 'msg__meta');
      m.meta.forEach((c) => meta.append(typeof c === 'string' ? h('span', 'chip', c) : h('span', `chip chip--${c.kind || 'flame'}`, c.text)));
      col.append(meta);
    }
    let typing = null;
    if (isAgent) { typing = h('div', 'typing', '<i></i><i></i><i></i>'); typing.style.position = 'absolute'; col.style.position = 'relative'; col.prepend(typing); }
    row.append(av, col);
    el.append(row);
    gsap.set([av, bubble, meta, typing].filter(Boolean), { autoAlpha: 0 });
    return { row, av, bubble, meta, typing, from: m.from };
  });
  const api = {
    el, items,
    reveal(tl, at, i, { typing = 0.9 } = {}) {
      const it = items[i];
      let t = typeof at === 'number' ? at : tl.duration();
      tl.fromTo(it.av, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: EASE.soft }, t);
      if (it.typing && typing > 0) {
        tl.fromTo(it.typing, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE.soft }, t);
        tl.fromTo(it.typing.children, { opacity: 0.25 }, { opacity: 1, duration: 0.3, stagger: { each: 0.12, repeat: Math.max(1, Math.round(typing / 0.45)), yoyo: true }, ease: 'sine.inOut' }, t);
        tl.to(it.typing, { autoAlpha: 0, duration: 0.15 }, t + typing);
        t += typing;
      }
      tl.fromTo(it.bubble, { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: EASE.out, transformOrigin: it.from === 'agent' ? '0% 100%' : '100% 100%' }, t);
      if (it.meta) tl.fromTo(it.meta, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE.soft }, t + 0.35);
      return t + 0.6;
    },
    play(tl, at, { gap = 1.4, typing = 0.9 } = {}) {
      let t = typeof at === 'number' ? at : tl.duration();
      items.forEach((it, i) => { t = api.reveal(tl, t, i, { typing: it.typing ? typing : 0 }) + gap; });
      return t - gap;
    },
  };
  return api;
}

/* ------------------------------------------------------------------ inbox list */
/** Inbox/list. rows: [{ from, initials, subject, preview, time, tag:{text,kind} }]
 *  -> { el, rows, in(tl, at, {stagger}), highlight(tl, at, i, {off}), tag(tl, at, i, text, kind) } */
export function inbox({ rows = [] } = {}) {
  const el = h('div', 'inbox');
  const out = rows.map((r) => {
    const row = h('div', 'row');
    const hi = h('div', 'row__hi');
    const av = h('div', 'row__av', r.initials || (r.from || '?').slice(0, 2).toUpperCase());
    const main = h('div', 'row__main');
    const top = h('div', 'row__top');
    top.append(h('span', 'row__from', r.from || ''));
    const tags = h('span', 'row__tags');
    tags.style.display = 'inline-flex'; tags.style.gap = '8px';
    if (r.tag) tags.append(h('span', `chip chip--${r.tag.kind || 'flame'}`, r.tag.text));
    top.append(tags);
    main.append(top, h('div', 'row__subj', r.subject || ''));
    if (r.preview) { const p = h('div', 'row__subj', r.preview); p.style.color = 'var(--smoke)'; p.style.fontSize = '20px'; main.append(p); }
    const time = h('div', 'row__time', r.time || '');
    row.append(hi, av, main, time);
    el.append(row);
    return { row, hi, tags, time };
  });
  return {
    el, rows: out,
    in(tl, at, { stagger = 0.09 } = {}) { return fadeUp(tl, out.map((r) => r.row), at, { y: 20, dur: 0.7, stagger }); },
    highlight(tl, at, i, { off = false } = {}) { return tl.to(out[i].hi, { autoAlpha: off ? 0 : 1, duration: 0.4, ease: EASE.soft }, at); },
    tag(tl, at, i, text, kind = 'flame') {
      const c = h('span', `chip chip--${kind}`, text);
      out[i].tags.append(c);
      gsap.set(c, { autoAlpha: 0 });
      return tl.fromTo(c, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: EASE.soft }, at);
    },
  };
}

/* ------------------------------------------------------------------ approval card */
/** Approval card. { flag, title, fields:[[k,v]], approve, reject, approved, rejected, x, y, w }
 *  -> { el, approveBtn, rejectBtn, in(tl, at), decide(tl, at, 'approve'|'reject') } */
export function approval({ flag = 'Needs approval', title = '', fields = [], approve = 'Approve', reject = 'Reject', approved = 'Approved', rejected = 'Rejected', x, y, w } = {}) {
  const el = h('div', 'appr');
  place(el, { x, y, w });
  const head = h('div', 'appr__head');
  head.append(h('div', 'appr__flag', flag));
  el.append(head, h('h3', 'appr__title', title));
  const kv = h('dl', 'appr__kv');
  fields.forEach(([k, v]) => kv.append(h('dt', null, k), h('dd', null, v)));
  if (fields.length) el.append(kv);
  const acts = h('div', 'appr__actions');
  const rejectBtn = h('div', 'btnx btnx--ghost', reject);
  const approveBtn = h('div', 'btnx btnx--primary');
  approveBtn.append(h('span', null, approve));
  const chipEl = h('span', 'btnx__chip'); chipEl.append(icon('check', { size: 18, stroke: 2.4 }));
  approveBtn.append(chipEl);
  approveBtn.style.paddingRight = '34px';
  acts.append(rejectBtn, approveBtn);
  el.append(acts);
  // Decision state: buttons give way to a status pill, the flag turns green (or red).
  acts.style.position = 'relative';
  const mkDone = (ok) => {
    const d = h('div', 'appr__done' + (ok ? '' : ' appr__done--reject'));
    d.append(icon(ok ? 'check' : 'x', { size: 22, stroke: 2.4 }), document.createTextNode(ok ? approved : rejected));
    acts.append(d); gsap.set(d, { autoAlpha: 0 }); return d;
  };
  const doneOk = mkDone(true), doneNo = mkDone(false);
  const flagEl = head.firstChild;
  flagEl.innerHTML = '';
  const fWrap = h('span'); fWrap.style.display = 'grid';
  const f1 = h('span', null, flag), f2 = h('span');
  f1.style.gridArea = f2.style.gridArea = '1 / 1';
  fWrap.append(f1, f2); flagEl.append(fWrap); gsap.set(f2, { autoAlpha: 0 });
  return {
    el, approveBtn, rejectBtn,
    in(tl, at) { return popIn(tl, el, at, { scale: 0.96, dur: 0.9 }); },
    decide(tl, at, which = 'approve') {
      const ok = which === 'approve';
      const b = ok ? approveBtn : rejectBtn;
      const done = ok ? doneOk : doneNo;
      const t0 = typeof at === 'number' ? at : tl.duration();
      tl.to(b, { scale: 0.95, duration: 0.09, ease: 'power2.out' }, t0).to(b, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, t0 + 0.09);
      tl.to([rejectBtn, approveBtn], { autoAlpha: 0, y: -8, duration: 0.35, ease: EASE.in, stagger: 0.04 }, t0 + 0.35);
      tl.fromTo(done, { autoAlpha: 0, y: 10, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: EASE.out }, t0 + 0.6);
      f2.textContent = ok ? approved : rejected;
      tl.to(f1, { autoAlpha: 0, y: -6, duration: 0.3 }, t0 + 0.6).fromTo(f2, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 }, t0 + 0.75);
      tl.to(flagEl, { color: ok ? '#7ad19b' : '#ff6b5a', duration: 0.4 }, t0 + 0.6);
      return tl.to(el, { borderColor: ok ? 'rgba(122,209,155,.45)' : 'rgba(255,107,90,.45)', duration: 0.6 }, t0 + 0.6);
    },
  };
}

/* ------------------------------------------------------------------ dashboard tiles */
/** Dashboard tiles. items: [{ label, value(number), decimals, prefix, suffix, unit(small text), note, text(static string instead of number), spark:[numbers] }]
 *  cols, w, lang -> { el, tiles, in(tl, at), count(tl, at, {dur}) } */
export function tiles({ items = [], cols = 3, lang = 'en' } = {}) {
  const el = h('div', 'tiles');
  el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  const ts = items.map((it) => {
    const t = h('div', 'tile');
    t.append(h('div', 'tile__label', it.label));
    const v = h('div', 'tile__value');
    const num = h('span', null, it.text ?? '');
    v.append(num);
    if (it.unit) v.append(h('small', null, it.unit));
    t.append(v);
    if (it.note) t.append(h('div', 'tile__note', it.note));
    let path = null;
    if (it.spark && it.spark.length > 1) {
      t.style.paddingBottom = '86px';
      const max = Math.max(...it.spark), min = Math.min(...it.spark);
      const pts = it.spark.map((s, i) => [(i / (it.spark.length - 1)) * 100, 60 - ((s - min) / (max - min || 1)) * 50 - 5]);
      const d = 'M' + pts.map((p) => p.map((n) => n.toFixed(2)).join(' ')).join(' L');
      const id = 'sf' + ++gid;
      const wrap = h('div');
      wrap.innerHTML = `<svg class="tile__spark" viewBox="0 0 100 60" preserveAspectRatio="none"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f58327" stop-opacity=".22"/><stop offset="1" stop-color="#f58327" stop-opacity="0"/></linearGradient></defs><path class="area" style="fill:url(#${id})" d="${d} L100 60 L0 60 Z"/><path class="line" d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`;
      t.append(wrap.firstChild);
      path = t.querySelector('path.line');
    }
    el.append(t);
    return { el: t, num, item: it, path, area: t.querySelector('path.area') };
  });
  return {
    el, tiles: ts,
    in(tl, at, { stagger = 0.1 } = {}) { return popIn(tl, ts.map((t) => t.el), at, { scale: 0.97, stagger }); },
    count(tl, at, { dur = 1.8, stagger = 0.12 } = {}) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      ts.forEach((t, i) => {
        const it = t.item;
        if (typeof it.value === 'number') counter(tl, t.num, t0 + i * stagger, { from: it.from ?? 0, to: it.value, decimals: it.decimals || 0, prefix: it.prefix || '', suffix: it.suffix || '', lang, dur });
        if (t.path) {
          tl.to(t.path, { strokeDashoffset: 0, duration: dur * 1.1, ease: 'power2.inOut' }, t0 + i * stagger);
          tl.fromTo(t.area, { opacity: 0 }, { opacity: 1, duration: dur, ease: 'none' }, t0 + i * stagger + 0.3);
        }
      });
      return tl;
    },
  };
}

/* ------------------------------------------------------------------ document page */
/** Document page (best inside win({paper:true})). blocks: [{p:'html with <mark>x</mark>'} | {bar:0..1} | {h:'subheading'}]
 *  -> { el, marks, in(tl, at), mark(tl, at, i) } */
export function docPage({ kicker, title, blocks = [] } = {}) {
  const el = h('div', 'docp');
  if (kicker) el.append(h('div', 'docp__kicker', kicker));
  if (title) el.append(h('h3', 'docp__title', title));
  const parts = [];
  blocks.forEach((b) => {
    let n;
    if (b.bar != null) { n = h('div', 'docp__bar'); n.style.width = Math.round(b.bar * 100) + '%'; }
    else if (b.h) { n = h('div', 'docp__kicker', b.h); n.style.marginTop = '28px'; }
    else n = h('p', 'docp__p', b.p);
    el.append(n); parts.push(n);
  });
  const marks = $$('mark', el).map((m) => {
    const s = h('span', 'mark'); s.innerHTML = m.innerHTML; const bg = h('span', 'mark__bg'); s.prepend(bg); m.replaceWith(s); return bg;
  });
  return {
    el, marks,
    in(tl, at, { stagger = 0.06 } = {}) { return fadeUp(tl, Array.from(el.children), at, { y: 14, dur: 0.6, stagger }); },
    mark(tl, at, i = 0) { return tl.to(marks[i], { scaleX: 1, duration: 0.7, ease: EASE.inOut }, at); },
  };
}

/* ------------------------------------------------------------------ search / AI answer */
/** Search box + AI-answer card. { query, label, paragraphs:[html, <span class="brand">X</span> highlights], sources:[{n, text}] | [strings] }
 *  -> { el, search, answer, typeQuery(tl, at, {cps}), in(tl, at) } */
export function aiAnswer({ query = '', placeholder = '', label = 'AI answer', paragraphs = [], sources = [] } = {}) {
  const el = h('div', 'aians');
  const search = h('div', 'search');
  search.append(icon('search', { size: 28 }));
  const q = h('span', 'search__q', placeholder);
  search.append(q);
  const answer = h('div', 'answer');
  const lab = h('div', 'answer__label'); lab.append(h('i'), document.createTextNode(label));
  answer.append(lab);
  const ps = paragraphs.map((p) => { const n = h('p', 'answer__p', p); answer.append(n); return n; });
  let src = null;
  if (sources.length) {
    src = h('div', 'answer__src');
    sources.forEach((s, i) => src.append(h('span', 'chip', typeof s === 'string' ? `<b>${i + 1}</b> ${s}` : `<b>${s.n ?? i + 1}</b> ${s.text}`)));
    answer.append(src);
  }
  el.append(search, answer);
  gsap.set(answer, { autoAlpha: 0 });
  return {
    el, search, answer, paragraphs: ps, sources: src,
    typeQuery(tl, at, { cps = 22 } = {}) { return typeText(tl, q, query, at, { cps, caret: true }); },
    in(tl, at) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      tl.fromTo(answer, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out }, t0);
      fadeUp(tl, [lab, ...ps, src].filter(Boolean), t0 + 0.2, { y: 12, dur: 0.6, stagger: 0.18 });
      const brands = $$('.brand', answer);
      if (brands.length) tl.fromTo(brands, { backgroundColor: 'rgba(245,131,39,0)' }, { backgroundColor: 'rgba(245,131,39,0.14)', duration: 0.6 }, t0 + 0.9);
      return tl;
    },
  };
}

/* ------------------------------------------------------------------ lessons / calendar list */
/** Lesson or calendar list. items: [{ when, title, meta }] -> { el, rows, in(tl, at), check(tl, at, i) } */
export function lessons({ items = [] } = {}) {
  const el = h('div', 'lessons');
  const rows = items.map((it) => {
    const r = h('div', 'lesson');
    const chk = h('div', 'lesson__chk');
    const fill = h('span', 'lesson__chk-fill');
    const ic = icon('check', { size: 20, stroke: 3 });
    chk.append(fill, ic);
    r.append(h('div', 'lesson__when', it.when || ''), h('div', 'lesson__title', it.title || ''), h('div', 'lesson__meta', it.meta || ''), chk);
    el.append(r);
    return { el: r, fill, ic, chk };
  });
  return {
    el, rows,
    in(tl, at, { stagger = 0.09 } = {}) { return fadeUp(tl, rows.map((r) => r.el), at, { y: 18, dur: 0.7, stagger }); },
    check(tl, at, i) {
      const r = rows[i];
      tl.to(r.fill, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, at);
      tl.to(r.ic, { opacity: 1, duration: 0.25 }, typeof at === 'number' ? at + 0.15 : '<0.15');
      return tl.to(r.chk, { borderColor: 'rgba(245,131,39,1)', duration: 0.2 }, '<');
    },
  };
}

/* ------------------------------------------------------------------ flow diagram */
/** Flow diagram. nodes: [{ id, x, y (center, px inside the flow box), label, sub, icon, kind:'accent'|'human'|undefined }]
 *  edges: [{ from, to, hot, curve:'h'|'v' }]. Box: { x, y, w, h }.
 *  -> { el, nodes:{id:el}, edges:[{path,len}], in(tl, at, {order}), drawEdge(tl, at, i), pulse(tl, at, i, {dur}), focus(tl, at, id) } */
export function flow({ nodes = [], edges = [], x = 0, y = 0, w = 1680, h: hh = 700 } = {}) {
  const el = h('div', 'flow');
  place(el, { x, y, w, h: hh });
  const svgWrap = h('div');
  svgWrap.innerHTML = `<svg class="flow__edges" width="${w}" height="${hh}" viewBox="0 0 ${w} ${hh}"></svg>`;
  const svg = svgWrap.firstChild;
  el.append(svg);
  const map = {};
  nodes.forEach((n) => {
    const d = h('div', 'node' + (n.kind ? ` node--${n.kind}` : ''));
    d.style.left = n.x + 'px'; d.style.top = n.y + 'px';
    if (n.icon) { const ic = h('div', 'node__ic'); ic.append(icon(n.icon, { size: 22 })); d.append(ic); }
    const tx = h('div', 'node__txt');
    tx.append(h('div', 'node__label', n.label || ''));
    if (n.sub) tx.append(h('div', 'node__sub', n.sub));
    d.append(tx, h('div', 'node__ring'));
    el.append(d);
    map[n.id] = d;
  });
  const NS = 'http://www.w3.org/2000/svg';
  const es = edges.map((e) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('class', 'flow__edge' + (e.hot ? ' flow__edge--hot' : ''));
    svg.append(p);
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '6'); dot.setAttribute('class', 'flow__pulse'); dot.setAttribute('opacity', '0');
    svg.append(dot);
    return { ...e, path: p, dot, len: 0, laid: false };
  });
  const layout = () => {
    es.forEach((e) => {
      if (e.laid) return;
      const a = map[e.from], b = map[e.to];
      const A = { x: a.offsetLeft, y: a.offsetTop, w: a.offsetWidth, h: a.offsetHeight };
      const B = { x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight };
      const dx = B.x - A.x, dy = B.y - A.y;
      const vert = e.curve ? e.curve === 'v' : Math.abs(dy) > Math.abs(dx);
      let x1, y1, x2, y2, d;
      if (!vert) {
        const s = Math.sign(dx) || 1;
        x1 = A.x + s * A.w / 2 + s * 6; y1 = A.y; x2 = B.x - s * B.w / 2 - s * 6; y2 = B.y;
        const m = (x2 - x1) / 2;
        d = `M${x1} ${y1} C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}`;
      } else {
        const s = Math.sign(dy) || 1;
        x1 = A.x; y1 = A.y + s * A.h / 2 + s * 6; x2 = B.x; y2 = B.y - s * B.h / 2 - s * 6;
        const m = (y2 - y1) / 2;
        d = `M${x1} ${y1} C${x1} ${y1 + m} ${x2} ${y2 - m} ${x2} ${y2}`;
      }
      e.path.setAttribute('d', d);
      e.len = e.path.getTotalLength();
      e.path.style.strokeDasharray = `${e.len} ${e.len}`;
      e.path.style.strokeDashoffset = e.len;
      e.laid = true;
    });
  };
  const nodeEls = nodes.map((n) => map[n.id]);
  gsap.set(nodeEls, { autoAlpha: 0 });
  const api = {
    el, nodes: map, edges: es, layout,
    /** Reveal nodes in order and draw edges as both ends become visible. */
    in(tl, at, { order, gap = 0.35 } = {}) {
      layout();
      const ids = order || nodes.map((n) => n.id);
      let t = typeof at === 'number' ? at : tl.duration();
      const shown = new Set();
      ids.forEach((id) => {
        tl.fromTo(map[id], { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: EASE.out }, t);
        shown.add(id);
        es.forEach((e, i) => { if (!e.drawn && shown.has(e.from) && shown.has(e.to)) { e.drawn = true; api.drawEdge(tl, t + 0.1, i); } });
        t += gap;
      });
      return t;
    },
    drawEdge(tl, at, i, { dur = 0.7 } = {}) {
      layout();
      const e = es[i];
      return tl.fromTo(e.path, { strokeDashoffset: () => e.len }, { strokeDashoffset: 0, duration: dur, ease: EASE.inOut }, at);
    },
    /** A glowing dot travelling along edge i. */
    pulse(tl, at, i, { dur = 0.9 } = {}) {
      layout();
      const e = es[i];
      const o = { p: 0 };
      const setP = (p) => { const pt = e.path.getPointAtLength(p * e.len); e.dot.setAttribute('cx', pt.x); e.dot.setAttribute('cy', pt.y); return p; };
      tl.set(e.dot, { attr: { opacity: 1 } }, at);
      tl.fromTo(o, { p: 0 }, { p: 1, duration: dur, ease: 'power1.inOut', modifiers: { p: setP }, immediateRender: false }, at);
      return tl.set(e.dot, { attr: { opacity: 0 } }, typeof at === 'number' ? at + dur : '>');
    },
    /** Flash a ring around a node. */
    focus(tl, at, id, { hold: hd = 0.8 } = {}) {
      const r = map[id].querySelector('.node__ring');
      tl.fromTo(r, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.35, ease: EASE.soft }, at);
      return tl.to(r, { opacity: 0, duration: 0.5 }, typeof at === 'number' ? at + hd : `>+=${hd}`);
    },
  };
  return api;
}

/* ------------------------------------------------------------------ steps 1-2-3 */
/** Progress steps. items: [{ label, sub }], { x, y, w, gap } -> { el, steps, in(tl, at), go(tl, at, i) } */
export function steps({ items = [], x = M.x, y = 560, w = 1680, gap = 48 } = {}) {
  const el = h('div', 'steps');
  place(el, { x, y, w });
  el.style.gridTemplateColumns = `repeat(${items.length}, 1fr)`;
  el.style.columnGap = gap + 'px';
  const ss = items.map((it, i) => {
    const s = h('div', 'step');
    const line = h('div', 'step__line'); const fill = h('div', 'step__fill'); line.append(fill);
    const n = h('div', 'step__n', String(i + 1).padStart(2, '0'));
    const lab = h('div', 'step__label', it.label);
    s.append(line, n, lab);
    let sub = null;
    if (it.sub) { sub = h('div', 'step__sub', it.sub); s.append(sub); }
    el.append(s);
    return { el: s, fill, n, lab, sub };
  });
  return {
    el, steps: ss,
    in(tl, at) { return fadeUp(tl, ss.map((s) => s.el), at, { y: 24, dur: 0.8, stagger: 0.12 }); },
    go(tl, at, i, { dur = 0.9 } = {}) {
      const s = ss[i];
      tl.to(s.fill, { scaleX: 1, duration: dur, ease: EASE.inOut }, at);
      tl.to(s.n, { color: '#ff8442', duration: 0.4 }, at);
      tl.to(s.lab, { color: '#f4efe9', duration: 0.5 }, at);
      if (s.sub) tl.to(s.sub, { color: '#b8b0aa', duration: 0.5 }, at);
      return tl;
    },
  };
}

/* ------------------------------------------------------------------ cursor */
/** Cursor. -> { el, set(x,y), moveTo(tl, at, target(el|{x,y}), {dur, dx, dy}), click(tl, at, pressEl?), in(tl, at), out(tl, at) }
 *  Element targets are measured at build time with restRect() (layout position without transforms),
 *  so the element must already be appended. The tip of the arrow lands on the element's center + (dx, dy). */
export function cursor(stage, { x = 1500, y = 900 } = {}) {
  const el = h('div', 'cursor');
  el.innerHTML = '<div class="cursor__ring"></div><svg viewBox="0 0 40 40"><path d="M6 4 L6 31 L13 24.5 L18 35 L22.5 33 L17.6 22.6 L27 22.6 Z" fill="#f4efe9" stroke="#0a0a0a" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  stage.append(el);
  gsap.set(el, { x, y, autoAlpha: 0 });
  const svg = el.querySelector('svg'), ring = el.querySelector('.cursor__ring');
  const pt = (target, k, off) => {
    if (target instanceof Element) { const r = restRect(target); return (k === 'x' ? r.cx : r.cy) + off; }
    return target[k] + off;
  };
  return {
    el,
    set(nx, ny) { gsap.set(el, { x: nx, y: ny }); },
    in(tl, at) { return tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, at); },
    out(tl, at) { return tl.to(el, { autoAlpha: 0, duration: 0.3 }, at); },
    moveTo(tl, at, target, { dur = 1.0, dx = 0, dy = 0, ease = 'power3.inOut' } = {}) {
      return tl.to(el, { x: pt(target, 'x', dx), y: pt(target, 'y', dy), duration: dur, ease }, at);
    },
    click(tl, at, pressEl) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      tl.to(svg, { scale: 0.82, duration: 0.08, ease: 'power2.out' }, t0).to(svg, { scale: 1, duration: 0.22, ease: 'power2.out' }, t0 + 0.08);
      tl.fromTo(ring, { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 1.3, duration: 0.6, ease: 'power2.out', immediateRender: false }, t0);
      if (pressEl) tl.to(pressEl, { scale: 0.96, duration: 0.08 }, t0).to(pressEl, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, t0 + 0.08);
      return tl;
    },
  };
}

/* ------------------------------------------------------------------ HUD, logo card, CTA card */
/** Persistent frame chrome: small wordmark top-left, "[ix] UNIT" top-right, url bottom-left, progress hairline.
 *  -> { el, in(tl, at), out(tl, at), progress(tl) (call last) } */
export function hud(stage, { ix, unit, url = 'sandboxinnovate.com', progressBar = true } = {}) {
  const el = h('div', 'hud');
  const top = h('div', 'hud__top');
  top.append(wordmark({ size: 22 }), eyebrow({ ix, text: unit }));
  top.lastChild.style.fontSize = '17px';
  el.append(top);
  const bottom = h('div', 'hud__bottom');
  bottom.append(h('div', 'mono mono--sm', url));
  el.append(bottom);
  let bar = null;
  if (progressBar) { const tr = h('div', 'hud__track'); bar = h('div', 'hud__bar'); tr.append(bar); el.append(tr); bottom.style.bottom = '54px'; }
  stage.append(el);
  gsap.set(el, { autoAlpha: 0 });
  return {
    el,
    in(tl, at) { return tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: EASE.soft, immediateRender: false }, at); },
    out(tl, at) { return tl.to(el, { autoAlpha: 0, duration: 0.5 }, at); },
    /** Fade only the top/bottom chrome (keeps the progress bar), e.g. under an end card that shows its own logo. */
    chrome(tl, at, visible = false) { return tl.to([top, bottom], { autoAlpha: visible ? 1 : 0, duration: 0.5, ease: EASE.soft }, at); },
    progress(tl, { from = 0, to } = {}) {
      if (!bar) return tl;
      const end = to ?? tl.duration();
      return tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: end - from, ease: 'none' }, from);
    },
  };
}

/** Logo end card: big wordmark + optional mono tagline. -> { el, in(tl, at) } */
export function logoCard({ tagline, size = 120 } = {}) {
  const el = h('div', 'endcard');
  const wm = wordmark({ size });
  el.append(wm);
  const tg = tagline ? h('div', 'endcard__tag', tagline) : null;
  if (tg) el.append(tg);
  return {
    el,
    in(tl, at) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      const mark = wm.querySelector('svg');
      tl.fromTo(wm.querySelectorAll('.wordmark__txt'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out, stagger: 0.08 }, t0);
      tl.fromTo(mark, { autoAlpha: 0, rotate: -60, scale: 0.7 }, { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.3, ease: EASE.out, transformOrigin: '50% 50%' }, t0 + 0.1);
      if (tg) fadeUp(tl, tg, t0 + 0.6, { y: 10, dur: 0.8 });
      return tl;
    },
  };
}

/** CTA end card. { lang, title(html), button, url, note } defaults: Book a call / Agendar una llamada + sandboxinnovate.com
 *  -> { el, button, in(tl, at) } */
export function ctaCard({ lang = 'en', title, button, url = 'sandboxinnovate.com', logo = true } = {}) {
  const el = h('div', 'endcard');
  el.style.gap = '56px';
  const wm = logo ? wordmark({ size: 40 }) : null;
  const hl = title ? headline(title, { size: 'md', maxWidth: 1400, align: 'center' }) : null;
  const btn = h('div', 'cta-btn');
  btn.append(h('span', null, button || (lang === 'es' ? 'Agendar una llamada' : 'Book a call')));
  const chipEl = h('span', 'cta-btn__chip'); chipEl.append(icon('arrowUpRight', { size: 26, stroke: 2.2 })); btn.append(chipEl);
  const u = h('div', 'endcard__url', url);
  [wm, hl && hl.el, btn, u].forEach((x) => x && el.append(x));
  return {
    el, button: btn, headline: hl,
    in(tl, at) {
      const t0 = typeof at === 'number' ? at : tl.duration();
      if (wm) fadeUp(tl, wm, t0, { y: 14, dur: 0.8 });
      if (hl) hl.in(tl, t0 + 0.15);
      popIn(tl, btn, t0 + 0.7, { scale: 0.92, dur: 0.9 });
      fadeUp(tl, u, t0 + 1.0, { y: 10, dur: 0.8 });
      return tl;
    },
  };
}
