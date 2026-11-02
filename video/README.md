# Sandbox explainer videos

1920x1080 explainers, one per unit and language, rendered deterministically from HTML + GSAP, then narrated
with an offline voice-over (see "Voice-over" below and `voice/README.md`). The renderer outputs silent video;
on-screen text still carries the story, so every video must also work muted.
This folder is not part of the Astro build.

```
video/
  runtime/stage.html  stage.css  lib.js  boot.js   1920x1080 stage, brand tokens, component library
  runtime/fonts/       Unbounded + JetBrains Mono (latin) woff2 copies; Satoshi comes from /public/fonts
  runtime/vendor/      gsap-3.15.0.min.js (vendored so the stage never depends on node_modules)
  scenes/<unit>.js     one scene per unit (both languages)
  scenes/_sample.js    6-7 s end-to-end sample
  scenes/_gallery.js   every component on screen, as a code reference
  render.mjs           frame-by-frame renderer -> mp4 + webm + posters
  frames.mjs           still PNGs at given seconds, to look at specific moments
  lib/common.mjs       static server, browser boot, copy lint
  out/                 renders (git-ignored)
```

## Commands

```bash
node video/render.mjs <unit> <en|es> --preview            # 960x540 @ 15 fps, quick check -> out/<unit>-<lang>-preview.mp4
node video/render.mjs <unit> <en|es>                      # final: out/<unit>-<lang>.mp4, .webm, -poster.jpg, -poster-960.jpg, .json
node video/render.mjs <unit> <en|es> --from 12 --to 20    # just one beat (suffix -clip)
node video/render.mjs <unit> <en|es> --publish            # final + copy mp4/webm/posters into public/video/
node video/frames.mjs <unit> <en|es> 2.5,8,14.2           # PNGs in out/frames/<unit>-<lang>-<t>.png
node video/frames.mjs <unit> <en|es> all --scale 0.5      # one frame every 2 s + poster, half size
```

Options: `--crf n` (mp4, default 26), `--webm-crf n` (VP9, default 40), `--workers n` (parallel browsers,
default 1; use 2 only when nothing else is rendering on the machine), `--png` (lossless capture, slower),
`--keep-master`, `--no-lint` (throwaway tests only).

Measured on this 4-CPU box: about 7 to 8 frames/s with 1 worker, about 14 with 2. A 50 s video is
1500 frames, so about 3.5 min of capture plus about 2 min of mp4 + VP9 encoding. Size: the 7 s sample is
0.34 MB mp4 / 0.27 MB webm, so a 50 s video lands around 2 to 3 MB. If an mp4 goes above 5 MB, raise `--crf`
to 28; if text edges look soft, lower it to 24.

**Workflow that saves time:** write the scene, run `frames.mjs ... all --scale 0.5`, Read the PNGs, fix,
then `--preview`, then the final render. Look at frames before every final render.

## Determinism

Nothing moves on its own: the stage boots with a paused timeline, `gsap.ticker` asleep, and 2D transforms
(`force3D: false`). The renderer seeks to `frame / fps`, waits one animation frame and captures. The same `t`
gives the same pixels whatever was rendered before (verified by hash). Rules for scene code:

- No `Math.random()`, `Date`, `setTimeout`, CSS animations/transitions, video or GIFs. Use the timeline.
- Do not use `onUpdate`/`onComplete`/`.call()` to change the DOM. Text that changes over time uses
  `lib.typeText` or `lib.counter` (they render through tween modifiers, so seeking is exact).
- Measure layout only at build time with `lib.restRect(el)` (ignores transforms). Append elements before
  calling methods that measure (`headline.in`, `flow.in`, `cursor.moveTo`).
- No CSS `filter: blur()` or `mix-blend-mode` on large areas: each roughly doubles capture time.

## Scene contract

`video/scenes/<unit>.js` is an ES module loaded by the stage:

```js
export const meta = { title: { en: 'Brains in 50 seconds', es: 'Brains en 50 segundos' }, poster: 21.5 }; // poster optional
export const copy = { en: { ... }, es: { ... } };        // or a <unit>.json next to it (also linted)
export const transcript = { en: '...', es: '...' };      // plain text of everything on screen, for UnitVideo
export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const tl = gsap.timeline({ paused: true });
  const { glow } = lib.setup(stage);                      // background, grid, glow, grain, vignette
  const hud = lib.hud(stage, { ix: '01', unit: 'Brains' });
  // ... beats ...
  tl.addLabel('poster', 21.5);                            // or meta.poster; default is the midpoint
  hud.progress(tl);                                       // call these two LAST: they span the full duration
  lib.drift(tl, glow);
  return tl;                                              // duration = tl.duration()
}
```

`stage` is the 1920x1080 `#stage` div. `lang` is `'en'` or `'es'`. The renderer writes `out/<unit>-<lang>.json`
with `duration`, `durationLabel` ("0:52"), `poster`, `transcript` and file names, ready for `UnitVideo.astro`.

Positions (`at`) are gsap positions: seconds (`12.4`), labels, or `"+=0.3"`. Prefer absolute seconds per beat so
timing is easy to reason about and to check with `frames.mjs`.

## Layout grid and pacing

- Canvas 1920x1080. Side margins 120 px (`lib.M.x`), safe top/bottom 96 px. The HUD sits at y 52 (top) and
  bottom 46 px, so keep content between y 150 and y 950.
- 12 columns of 135 px with 24 px gutters inside the margins.
- Type scale: `headline` sizes `xl` 128, `lg` 96, `md` 68, `sm` 48 px; captions 40 px; body/UI 24 to 28 px;
  mono labels 15 to 22 px. Nothing smaller than 15 px (it must read on a phone at 360 px wide).
- Pacing: a line of on-screen text needs about `words / 3 + 1` seconds after it has fully appeared. Hold
  a finished UI state at least 1.2 s before leaving. Target 45 to 60 s total, 5 to 7 beats.
- Motion: one main movement at a time, `expo.out` for entrances, `power2.in` for exits, 0.5 to 1.1 s.
  No bounces except tiny button presses, no spinning, no zooms over 4 %.

## Content rules (enforced in part by the lint)

`render.mjs` refuses to render if the scene source contains: em or en dashes, Symphony or autoclient, prices
or currency, AI clichés (unlock, supercharge, seamless, game-changer, potenciar, desbloquear, revolucionar,
sin precedentes...), voseo or vosotros. The lint also scans code comments, so keep those clean too.
Not lintable, still mandatory: no invented facts, stats, clients, logos, testimonials or results (example
numbers in mock UIs must be clearly illustrative UI states, never claims like "40% faster"); timelines only as
written in `src/i18n/units/<unit>.ts`; neutral Latin American Spanish with "tú"; no robots, glowing brains or
blue circuits. Use the real unit copy as the source for every claim.

## Library API (`lib`)

All components return `{ el, ...methods }`. Append `el` to a layer (or a window body), then call methods.
Methods add tweens to `tl` at `at`.

**Stage and layers**
- `setup(stage, { grid, glow:{x,y,size}|false, grain, vignette })` -> `{ bg, glow }`
- `layer(stage, { visible=false, pad, z })` -> full-frame div (hidden until shown)
- `show(tl, layer, at, {dur, y})`, `hide(tl, layer, at, {dur, y})`, `swap(tl, from, to, at, {dur})`
- `hold(tl, seconds)` appends empty time; `drift(tl, glowEl, {x, y})` slow background drift (call last)
- `fadeUp(tl, targets, at, {y, dur, stagger})`, `fadeOut(...)`, `popIn(tl, targets, at, {scale, dur, stagger})`
- `h(tag, cls, html|nodes)`, `place(el, {x, y, w, h, right, bottom})`, `$`, `$$`, `restRect(el)`, `rectOf(el)`
- `icon(name, {size, stroke})`, `ICONS` (inbox, mail, chat, db, doc, check, x, user, users, bolt, search, calendar,
  chart, book, box, handshake, gear, globe, shield, arrow, arrowUpRight, play, layers, target, sparkle, clock,
  lock, phone, cart, pen, flag), `cube({size, mono})`, `wordmark({size})`
- Constants: `W`, `H`, `M` (margins), `EASE` (`out`, `soft`, `inOut`, `in`), `T` (default durations)

**Text**
- `eyebrow({ ix, text, pill, dot })` -> element, renders `[01] BRAINS`
- `headline(html, { size:'xl'|'lg'|'md'|'sm', maxWidth, align, tag })` -> `{ el, words, in(tl, at, {by:'line'|'word', stagger, dur}), out(tl, at) }`. `<em>` gets the flame gradient, `<br>` allowed.
- `titleCard({ eyebrow:{ix,text}, title, sub, size, align:'left'|'center', maxWidth, rule })` -> `{ el, headline, in, out }`
- `caption({ kicker, text, x, bottom, maxWidth })` -> lower third `{ el, in, out }` (`<em>` = flame text)
- `typeText(tl, el, text, at, { cps=26, dur, caret })`
- `counter(tl, el, at, { from, to, dur, decimals, prefix, suffix, lang })` (locale formatting per language)

**UI mockups**
- `win({ title, url, badge, x, y, w, h, paper, bodyPad })` -> `{ el, bar, body, in, out }` app window; `paper:true` = light document window
- `chat({ messages:[{ from:'user'|'agent', initials, text, meta:[str | {text, kind:'flame'|'ok'}] }], agentIcon })` -> `{ el, items, reveal(tl, at, i, {typing}), play(tl, at, {gap, typing}) }` (`play` returns the end time)
- `inbox({ rows:[{ from, initials, subject, preview, time, tag:{text,kind} }] })` -> `{ el, rows, in, highlight(tl, at, i, {off}), tag(tl, at, i, text, kind) }`
- `approval({ flag, title, fields:[[k,v]], approve, reject, approved, rejected, x, y, w })` -> `{ el, approveBtn, rejectBtn, in, decide(tl, at, 'approve'|'reject') }`
- `tiles({ items:[{ label, value, decimals, prefix, suffix, unit, note, text, spark:[n] }], cols, lang })` -> `{ el, tiles, in, count(tl, at, {dur, stagger}) }`
- `docPage({ kicker, title, blocks:[{p:'..<mark>..</mark>'} | {bar:0..1} | {h}] })` -> `{ el, marks, in, mark(tl, at, i) }`
- `aiAnswer({ query, placeholder, label, paragraphs:[html with <span class="brand">], sources:[str | {n,text}] })` -> `{ el, search, answer, typeQuery(tl, at, {cps}), in }`
- `lessons({ items:[{ when, title, meta }] })` -> `{ el, rows, in, check(tl, at, i) }`
- `flow({ x, y, w, h, nodes:[{ id, x, y, label, sub, icon, kind:'accent'|'human' }], edges:[{ from, to, hot, curve:'h'|'v' }] })` -> `{ el, nodes, edges, in(tl, at, {order, gap}), drawEdge(tl, at, i), pulse(tl, at, i, {dur}), focus(tl, at, id) }` (node x/y are centers inside the flow box)
- `steps({ items:[{ label, sub }], x, y, w, gap })` -> `{ el, steps, in, go(tl, at, i) }`
- `cursor(stage, { x, y })` -> `{ el, in, out, set, moveTo(tl, at, el|{x,y}, {dur, dx, dy}), click(tl, at, pressEl?) }`

**Frame and end cards**
- `hud(stage, { ix, unit, url, progressBar })` -> `{ el, in, out, chrome(tl, at, visible), progress(tl) }` (small wordmark, `[01] UNIT`, url, progress hairline)
- `logoCard({ tagline, size })` -> `{ el, in }`
- `ctaCard({ lang, title, button, url, logo })` -> `{ el, button, headline, in }` ("Book a call" / "Agendar una llamada", sandboxinnovate.com). Call `hud.chrome(tl, at, false)` before it so the logo is not shown twice.

CSS classes you can use directly in `h()`: `mono`, `mono--sm`, `lede`, `card`, `chip`, `chip--flame`, `chip--ok`,
`hair`, `num`, `grad-text`, `btnx btnx--primary|btnx--ghost`. Colors are CSS variables on `:root`
(`--ink-950..500`, `--bone`, `--mist`, `--smoke`, `--flame-100..800`, `--ok`, `--warn`, `--err`).

## Putting a video on a page

1. `node video/render.mjs <unit> en --publish` and the same for `es` (copies the silent picture into `public/video/`).
2. Put the voice back on: `node video/voice/mux.mjs <unit> <en|es> --publish` (see "Voice-over" below).
   Re-rendering with `--publish` always replaces the voiced file with a silent one.
3. Use `src/components/unit/UnitVideo.astro`:

```astro
<UnitVideo unit="brains" lang={lang} title="How a Brains agent works" duration="0:52" transcript={transcriptText} />
```

Pick a poster moment (`tl.addLabel('poster', t)`) with a finished, readable UI state and a fairly quiet
center: the player puts its play button and duration chip in the middle of the poster. The renderer hides
the progress hairline on posters.

It expects `/video/<unit>-<lang>.webm`, `.mp4`, `.vtt`, `-poster.jpg` and `-poster-960.jpg`.

## Voice-over

Every published video has a narration track. Full details (script format, pronunciation map, timing rules,
speaking rates) are in [`voice/README.md`](voice/README.md).

**Voices.** Kokoro-82M via `kokoro-onnx`, fully offline, Apache-2.0 (fine for commercial use). Venv:
`/home/user/tts/venv`; model files `/home/user/tts/kokoro-v1.0.onnx` and `/home/user/tts/voices-v1.0.bin`.

| Language | Voice | Kokoro `lang` |
|---|---|---|
| English | `af_heart` | `en-us` |
| Spanish | `ef_dora` | `es-419` (neutral Latin American: seseo, yeísmo) |

**Never use `lang="es"`.** It gives Castilian pronunciation (the "th" sound for c and z), which does not fit
the site's neutral Latin American Spanish. `synth.py` already passes `es-419`; keep it that way.

**Pipeline** (one unit and language at a time; 4 CPUs):

```bash
. /home/user/tts/venv/bin/activate
# 1. edit the narration in video/voice/<unit>.json (both languages; "at" = seconds into the video)
python video/voice/synth.py <unit> <en|es>            # 2. voice track + captions + timing report (exit 1 on ERROR)
python video/voice/synth.py <unit> <en|es> --check    # 3. whisper transcription, word error rate per line
node video/voice/mux.mjs <unit> <en|es> --publish     # 4. mux onto the silent picture, copy mp4/webm/vtt to public/video/
node video/site-data.mjs --no-copy                    # 5. transcripts in src/data/videos.json = the narration
```

Then bump `VIDEO_UPLOAD_DATE` in `src/data/videos.ts`. It is the `?v=` token on every media URL, and
`/video/*` is cached for a year, so without a bump visitors keep the old files.

Narration rules: no product names other than the site's, no prices, no invented facts or results, timelines
only as the site states them, no em or en dashes, numbers written the way they are spoken ("three to five
weeks", "de tres a cinco semanas"), Spanish with "tú". Say the on-screen text in other words or add the why;
do not read it verbatim. `synth.py` enforces part of this (dashes, currency, clichés, voseo).

The player (`src/components/unit/UnitVideo.astro`) plays with sound after the visitor presses play (never
autoplays), offers the `.vtt` as an optional captions track (off by default), and shows the narration as the
transcript under the video. `node video/site-data.mjs` never copies silent mp4/webm over a narrated unit's
voiced files; posters are still copied.
