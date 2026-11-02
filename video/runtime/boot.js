/* Stage bootstrap: ?scene=<unit>&lang=<en|es>
 * Exposes window.__video = { ready, error, duration, poster, fps, seek(t) } for the renderer. */
import * as lib from './lib.js';

const gsap = window.gsap;
const params = new URLSearchParams(location.search);
const sceneName = params.get('scene') || '_sample';
const lang = params.get('lang') === 'es' ? 'es' : 'en';
document.documentElement.lang = lang;

const api = (window.__video = { ready: false, error: null, duration: 0, poster: null, fps: 30 });

async function fontsReady() {
  const faces = [
    '400 40px "Satoshi"', '500 40px "Satoshi"', '700 40px "Satoshi"',
    '500 40px "Unbounded Variable"', '600 40px "Unbounded Variable"',
    '500 20px "JetBrains Mono Variable"',
  ];
  await Promise.all(faces.map((f) => document.fonts.load(f, 'AaÑñáé0')));
  await document.fonts.ready;
  const missing = faces.filter((f) => !document.fonts.check(f, 'AaÑñáé'));
  if (missing.length) throw new Error('Fonts failed to load: ' + missing.join(', '));
}

try {
  gsap.ticker.lagSmoothing(0);
  gsap.config({ force3D: false }); // 2D transforms: no layer promotion, identical pixels regardless of seek history
  gsap.ticker.sleep(); // nothing advances on its own; the renderer seeks the timeline
  await fontsReady();
  const mod = await import(`../scenes/${sceneName}.js?v=${Date.now()}`);
  const stage = document.getElementById('stage');
  const tl = mod.build({ lang, stage, gsap, lib });
  if (!tl || typeof tl.seek !== 'function') throw new Error('build() must return a gsap timeline');
  tl.pause(0);
  await fontsReady(); // scenes may add text in weights not preloaded
  const meta = mod.meta || {};
  const labelPoster = tl.labels && tl.labels.poster;
  api.duration = Math.round(tl.duration() * 1000) / 1000;
  api.poster = meta.poster ?? (labelPoster != null ? labelPoster : api.duration * 0.5);
  api.title = meta.title ? meta.title[lang] : sceneName;
  api.transcript = mod.transcript ? mod.transcript[lang] : '';
  api.seek = (t) => new Promise((resolve) => {
    tl.seek(Math.min(t, api.duration), false);
    requestAnimationFrame(() => resolve(true));
  });
  window.__tl = tl;
  // Lay out the first frame so measurements and fonts are settled before frame 0.
  await api.seek(0);
  api.ready = true;
} catch (e) {
  console.error(e);
  api.error = String(e && e.stack || e);
}
