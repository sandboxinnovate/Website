import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { Lang } from '@/i18n';
import { COPY } from './copy';
import {
  DIMS,
  HANDOFF_PARAM,
  N_OPTIONS,
  N_QUESTIONS,
  QUESTIONS,
  clearSaved,
  emptyAnswers,
  evaluate,
  isComplete,
  loadSaved,
  partialScores,
  saveState,
  type Answers,
} from './model';
import { useReducedMotion } from './hooks';
import Radar from './Radar';
import Results from './Results';
import Ico from './Ico';

interface Props {
  lang: Lang;
  /** Lab / QA: render the results for these answers (0–3 each); not persisted. */
  demoAnswers?: number[];
  /** Persist progress in sessionStorage (default true). */
  persist?: boolean;
}

type Phase = 'questions' | 'results';
interface St {
  answers: Answers;
  step: number;
  phase: Phase;
  sentTo: string | null;
}

const fresh = (): St => ({ answers: emptyAnswers(), step: 0, phase: 'questions', sentTo: null });

function fromDemo(a: number[]): St {
  const answers: Answers = Array.from({ length: N_QUESTIONS }, (_, i) => {
    const v = a[i];
    return typeof v === 'number' && v >= 0 && v < N_OPTIONS ? v : 0;
  });
  return { answers, step: N_QUESTIONS - 1, phase: 'results', sentTo: null };
}

const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement && !!el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="dialog"], [role="combobox"]');

export default function Full({ lang, demoAnswers, persist = true }: Props) {
  const t = COPY[lang];
  const demo = Array.isArray(demoAnswers);
  const store = persist && !demo;
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  const [st, setSt] = useState<St>(() => (demo ? fromDemo(demoAnswers!) : fresh()));
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [notice, setNotice] = useState<null | 'resumed' | 'handoff'>(null);
  const [ready, setReady] = useState(false);
  const [announce, setAnnounce] = useState('');
  /** Entrance motion only once the content actually changes (never on the SSR → hydrate pass). */
  const [anim, setAnim] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef(0);
  const userNav = useRef(false);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  /* ---------- restore (session + teaser hand-off) ---------- */
  useEffect(() => {
    if (demo) {
      setReady(true);
      return;
    }
    let s: St | null = null;
    if (store) {
      const saved = loadSaved();
      if (saved) s = { answers: saved.answers, step: saved.step, phase: saved.phase, sentTo: saved.sentTo ?? null };
    }
    let n: typeof notice = null;
    try {
      const url = new URL(window.location.href);
      const raw = url.searchParams.get(HANDOFF_PARAM);
      if (raw && /^[1-4]$/.test(raw)) {
        const v = Number(raw) - 1;
        const keep = !!s && s.phase === 'questions' && s.answers[0] === v;
        const base = keep && s ? s : fresh();
        const answers = base.answers.slice();
        answers[0] = v;
        s = { ...base, answers, step: Math.max(1, base.step), phase: 'questions' };
        n = 'handoff';
        url.searchParams.delete(HANDOFF_PARAM);
        window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
      } else if (s && (s.step > 0 || s.phase === 'results')) {
        n = 'resumed';
      }
    } catch {
      /* URL / history unavailable — ignore */
    }
    if (s) {
      setSt(s);
      if (s.step !== 0 || s.phase !== 'questions') setAnim(true);
    }
    setNotice(n);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready && store) saveState(st);
  }, [st, ready, store]);

  /* ---------- actions ---------- */
  const go = useCallback((fn: (s: St) => St, d: 'fwd' | 'back') => {
    window.clearTimeout(timer.current);
    userNav.current = true;
    setAnim(true);
    setDir(d);
    setNotice(null);
    setSt(fn);
  }, []);

  const next = useCallback(() => {
    go((s) => {
      if (s.phase !== 'questions' || s.answers[s.step] === null) return s;
      if (s.step < N_QUESTIONS - 1) return { ...s, step: s.step + 1 };
      return isComplete(s.answers) ? { ...s, phase: 'results' } : { ...s, step: s.answers.findIndex((v) => v === null) };
    }, 'fwd');
  }, [go]);

  const back = useCallback(() => {
    go((s) => (s.phase === 'questions' && s.step > 0 ? { ...s, step: s.step - 1 } : s), 'back');
  }, [go]);

  const select = useCallback(
    (i: number) => {
      userNav.current = true;
      setSt((s) => {
        if (s.phase !== 'questions') return s;
        const answers = s.answers.slice();
        answers[s.step] = i;
        return { ...s, answers };
      });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(next, reducedRef.current ? 140 : 420);
    },
    [next],
  );

  const restart = useCallback(() => {
    if (store) clearSaved();
    go(() => fresh(), 'back');
  }, [go, store]);

  const edit = useCallback(() => go((s) => ({ ...s, phase: 'questions', step: 0 }), 'back'), [go]);

  const onSent = useCallback((email: string) => setSt((s) => ({ ...s, sentTo: email })), []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /* ---------- keyboard: 1–4 select, Enter / → continue, ← back ---------- */
  useEffect(() => {
    if (st.phase !== 'questions') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      const root = rootRef.current;
      if (!root) return;
      const active = document.activeElement;
      const inside = !!active && root.contains(active);
      const idle = !active || active === document.body || active === document.documentElement;
      // shortcuts work while focus is inside the widget, or when nothing is focused and the widget fills the screen
      const r = root.getBoundingClientRect();
      const onScreen = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!inside && !(idle && onScreen)) return;
      const onControl = e.target instanceof HTMLElement && !!e.target.closest('button, a');
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        select(Number(e.key) - 1);
      } else if (e.key === 'Enter' && !onControl) {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowRight' && !e.shiftKey) {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' && !e.shiftKey) {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [st.phase, select, next, back]);

  /* ---------- focus, scroll and announcements after navigation ---------- */
  useEffect(() => {
    if (!userNav.current) return;
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    const nav = 92;
    if (top < nav - 4) window.scrollTo({ top: window.scrollY + top - nav, behavior: reducedRef.current ? 'auto' : 'smooth' });
    const target = st.phase === 'results' ? resultHeadingRef.current : titleRef.current;
    target?.focus({ preventScroll: true });
    if (st.phase === 'questions') {
      const q = QUESTIONS[st.step];
      setAnnounce(t.announceQuestion(st.step + 1, N_QUESTIONS, t.dims[q.dim].name, t.questions[q.id].text));
    } else {
      const r = evaluate(st.answers);
      setAnnounce(t.announceResult(r.score, t.levels[r.levelId].name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.step, st.phase]);

  /* ---------- derived ---------- */
  const q = QUESTIONS[st.step];
  const qc = t.questions[q.id];
  const dimIdx = DIMS.indexOf(q.dim);
  const inDim = QUESTIONS.filter((x) => x.dim === q.dim);
  const posInDim = inDim.findIndex((x) => x.id === q.id) + 1;
  const sel = st.answers[st.step];
  const answered = st.answers.filter((v) => v !== null).length;
  const partial = partialScores(st.answers);
  const result = useMemo(() => (st.phase === 'results' ? evaluate(st.answers) : null), [st.phase, st.answers]);
  const hasProgress = answered > 0 || st.phase === 'results';
  const isLast = st.step === N_QUESTIONS - 1;
  const qTitleId = `${uid}-${q.id}`;

  return (
    <div ref={rootRef} className="rd rd-full" data-phase={st.phase} data-ready={ready ? '' : undefined} data-anim={anim ? '' : undefined} data-reduced={reduced ? '' : undefined}>
      <div className="rd-full__glow" aria-hidden="true" />

      {/* system bar */}
      <div className="rd-bar">
        <div className="rd-bar__id">
          <span className="rd-pulse" aria-hidden="true" />
          <span className="rd-bar__sys">
            {t.system.split(' / ')[0]}
            <span className="rd-bar__sys-rest"> / {t.system.split(' / ').slice(1).join(' / ')}</span>
          </span>
          <span className="rd-bar__ver">{t.version}</span>
        </div>
        <div className="rd-bar__right">
          {st.phase === 'questions' ? (
            <>
              <span className="rd-bar__count">{t.counter(st.step + 1, N_QUESTIONS)}</span>
              <span className="rd-bar__time">{t.timeLeft(N_QUESTIONS - answered)}</span>
            </>
          ) : (
            result && (
              <>
                <span className="rd-bar__count">{t.run(result.runId)}</span>
                <span className="rd-bar__time">{t.scoredLocally}</span>
              </>
            )
          )}
          {hasProgress && (
            <button type="button" className="rd-iconbtn" onClick={restart}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
                <path d="M4.5 4.5v4h4" />
              </svg>
              <span>{t.restart}</span>
            </button>
          )}
        </div>
      </div>

      {st.phase === 'questions' ? (
        <>
          {/* progress rail */}
          <div
            className="rd-rail"
            role="progressbar"
            aria-label={t.progressLabel}
            aria-valuemin={0}
            aria-valuemax={N_QUESTIONS}
            aria-valuenow={answered}
            aria-valuetext={t.counter(st.step + 1, N_QUESTIONS)}
          >
            {DIMS.map((d, di) => {
              const idx = QUESTIONS.map((x, i) => (x.dim === d ? i : -1)).filter((i) => i >= 0);
              const segState = di < dimIdx ? 'done' : di === dimIdx ? 'current' : 'todo';
              return (
                <div key={d} className="rd-rail__seg" data-state={segState}>
                  <div className="rd-rail__bars">
                    {idx.map((qi) => (
                      <span
                        key={qi}
                        className="rd-rail__bar"
                        data-state={qi === st.step ? 'current' : st.answers[qi] !== null ? 'done' : 'todo'}
                      />
                    ))}
                  </div>
                  <span className="rd-rail__label">
                    <span className="rd-rail__code">{String(di + 1).padStart(2, '0')}</span>
                    <span className="rd-rail__name">{t.dims[d].name}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="rd-stage">
            <div className="rd-main">
              {notice && (
                <p className="rd-notice">
                  <Ico name="check" size={14} stroke={2} />
                  {notice === 'handoff' ? t.handoff : t.resumed}
                </p>
              )}

              <div className="rd-q" key={`${st.step}`} data-dir={dir}>
                <p className="rd-q__meta">
                  <span className="rd-q__dim">
                    [{String(dimIdx + 1).padStart(2, '0')}] {t.dims[q.dim].name}
                  </span>
                  <span className="rd-q__of">{t.ofDim(posInDim, inDim.length)}</span>
                </p>
                <h2 id={qTitleId} ref={titleRef} tabIndex={-1} className="rd-q__title">
                  {qc.text}
                </h2>
                <p className="rd-q__help">{qc.help}</p>

                <div className="rd-opts" role="group" aria-labelledby={qTitleId}>
                  {qc.options.map((o, i) => (
                    <button
                      key={i}
                      type="button"
                      className="rd-opt"
                      aria-pressed={sel === i}
                      onClick={() => select(i)}
                      style={{ ['--i' as string]: i } as CSSProperties}
                    >
                      <span className="rd-opt__key" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="rd-opt__text">{o}</span>
                      <span className="rd-opt__mark" aria-hidden="true">
                        <Ico name="check" size={12} stroke={2.4} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rd-foot">
                <button type="button" className="rd-back" onClick={back} disabled={st.step === 0}>
                  <Ico name="arrow-left" size={16} />
                  <span>{t.back}</span>
                </button>
                <p className="rd-keys" aria-hidden="true">
                  <span>
                    <kbd>1</kbd>–<kbd>4</kbd> {t.keys.select}
                  </span>
                  <span>
                    <kbd>↵</kbd> {t.keys.next}
                  </span>
                  <span>
                    <kbd>←</kbd> {t.keys.back}
                  </span>
                </p>
                <button type="button" className="btn btn-primary btn-sm rd-next" onClick={next} disabled={sel === null}>
                  <span>{isLast ? t.seeResult : t.next}</span>
                  <span className="btn-chip">
                    <Ico name="arrow-right" size={16} stroke={1.8} />
                  </span>
                </button>
              </div>
            </div>

            <aside className="rd-aside" aria-label={t.liveProfile}>
              <div className="rd-aside__grid" aria-hidden="true" />
              <p className="rd-mono">{t.liveProfile}</p>
              <Radar
                size="md"
                values={DIMS.map((d) => partial[d])}
                labels={DIMS.map((d) => t.dims[d].name)}
                activeIndex={dimIdx}
                instant={reduced}
                duration={900}
              />
              <ul className="rd-aside__list">
                {DIMS.map((d, di) => {
                  const v = partial[d];
                  const state = di < dimIdx ? 'done' : di === dimIdx ? 'current' : 'todo';
                  return (
                    <li key={d} data-state={state}>
                      <span className="rd-aside__code">{String(di + 1).padStart(2, '0')}</span>
                      <span className="rd-aside__name">{t.dims[d].name}</span>
                      <span className="rd-aside__bar" aria-hidden="true">
                        <i style={{ transform: `scaleX(${(v ?? 0) / 100})` }} />
                      </span>
                      <span className="rd-aside__val">{v === null ? '—' : v}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="rd-aside__note">{t.liveNote}</p>
            </aside>
          </div>
        </>
      ) : (
        result && (
          <>
            <Results
              lang={lang}
              result={result}
              answers={st.answers}
              sentTo={st.sentTo}
              onSent={onSent}
              reduced={reduced}
              headingRef={resultHeadingRef}
            />
            <div className="rd-res__actions">
              <button type="button" className="rd-back" onClick={edit}>
                <Ico name="arrow-left" size={16} />
                <span>{t.editAnswers}</span>
              </button>
              <button type="button" className="rd-back" onClick={restart}>
                <span>{t.restart}</span>
              </button>
            </div>
          </>
        )
      )}

      <p className="rd-sr" aria-live="polite" aria-atomic="true">
        {announce}
      </p>
    </div>
  );
}
