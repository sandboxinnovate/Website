import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { localize, type Lang } from '@/i18n';
import { ICONS } from '@/components/ui/icons';
import { CAT_IDS, COPY, METER, type CatId, type GeoCopy, type Mode, type Source } from './copy';
import { fillBrand, tokenDelay, tokenize, type Tokenized } from './stream';
import { useDebounced, useInView, usePageVisible, useReducedMotion, useTween } from './hooks';
import Meter from './Meter';
import './geo.css';

type Phase = 'idle' | 'typing' | 'searching' | 'streaming' | 'done';
interface Run { id: number; typeQ: boolean }

const MODES: Mode[] = ['before', 'after'];
const BRAND_MAX = 32;
/** The question never takes longer than this to type, whatever its length. */
const TYPE_BUDGET_MS = 1200;

function Ico({ name, size = 16 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

const score = (v: [number, number, number]) => Math.round((v[0] + v[1] + v[2]) / 3);

/* ------------------------------------------------------------------ */

interface AnswerProps {
  tk: Tokenized;
  sources: Source[];
  shown: number;
  active: boolean;
  streaming: boolean;
  sourceWord: string;
  hot: number | null;
  onHot: (n: number | null) => void;
}

/** One answer, fully laid out; tokens past `shown` are kept invisible so the box never jumps. */
function AnswerText({ tk, sources, shown, active, streaming, sourceWord, hot, onHot }: AnswerProps) {
  const caretAt = streaming ? shown : -1;
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];

  const flush = (key: string) => {
    if (list.length) out.push(<ul key={`ul-${key}`} className="ga-ans__list">{list}</ul>);
    list = [];
  };

  tk.blocks.forEach((b, bi) => {
    const nodes: ReactNode[] = [];
    if (caretAt === b.start) nodes.push(<span key="caret0" className="ga-caret" aria-hidden="true" />);
    b.toks.forEach((tok, j) => {
      const gi = b.start + j;
      const hidden = gi >= shown;
      const h = hidden ? '' : undefined;
      if (tok.k === 'w') {
        nodes.push(<span key={j} className="ga-t" data-h={h}>{tok.text}</span>);
      } else if (tok.k === 'name') {
        nodes.push(
          <strong key={j} className="ga-t ga-name" data-h={h} data-you={tok.you ? '' : undefined}>
            {tok.text}
          </strong>,
        );
      } else {
        const yours = sources[tok.n - 1]?.kind === 'yours';
        nodes.push(
          <span
            key={j}
            className="ga-t ga-cite"
            data-h={h}
            data-you={yours ? '' : undefined}
            data-hot={hot === tok.n ? '' : undefined}
            onPointerEnter={() => onHot(tok.n)}
            onPointerLeave={() => onHot(null)}
          >
            <span className="sr-only-ga">{sourceWord} </span>
            {tok.n}
          </span>,
        );
      }
      if (caretAt === gi + 1) nodes.push(<span key={`c${j}`} className="ga-caret" aria-hidden="true" />);
    });
    if (b.kind === 'li') {
      list.push(
        <li key={bi} data-h={b.start >= shown ? '' : undefined}>
          {nodes}
        </li>,
      );
    } else {
      flush(String(bi));
      out.push(<p key={bi}>{nodes}</p>);
    }
  });
  flush('end');

  return (
    <div className="ga-ans" data-active={active ? '' : undefined} aria-hidden={!active}>
      {out}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * "Be the answer" — an illustrative, Sandbox-styled AI answer panel.
 * A question types itself, the answer streams in token by token with citation chips,
 * and a Before / After toggle shows the visitor's brand absent vs. recommended and cited as [1].
 */
export default function GeoAnswer({ lang }: { lang: Lang }) {
  const t: GeoCopy = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Watch the answer panel itself: the whole widget can be taller than a phone screen.
  const inView = useInView(panelRef, 0.3);
  const pageVisible = usePageVisible();

  const [catId, setCatId] = useState<CatId>('dental');
  const [brandInput, setBrandInput] = useState('');
  const [mode, setMode] = useState<Mode>('before');
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState<Run>({ id: 0, typeQ: true });
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const [nudge, setNudge] = useState(false);
  const [live, setLive] = useState('');
  const interacted = useRef(false);

  const cat = t.cats.find((c) => c.id === catId) ?? t.cats[0];
  const brandNow = brandInput.trim().slice(0, BRAND_MAX) || t.defaultBrand;
  const brand = useDebounced(brandNow, 550);

  const tkBefore = useMemo(() => tokenize(cat.before.blocks, brand), [cat, brand]);
  const tkAfter = useMemo(() => tokenize(cat.after.blocks, brand), [cat, brand]);
  const active = mode === 'before' ? tkBefore : tkAfter;
  const activeSources = mode === 'before' ? cat.before.sources : cat.after.sources;

  // Latest values for the stream loop (it lives across renders).
  const totalRef = useRef(active.total);
  totalRef.current = active.total;
  const qLenRef = useRef(cat.question.length);
  qLenRef.current = cat.question.length;
  const activeRef = useRef(active);
  activeRef.current = active;
  const pausedRef = useRef(false);
  pausedRef.current = !inView || !pageVisible;
  /** Offscreen / hidden tab: the next step of the stream waits here instead of polling. */
  const resumeRef = useRef<(() => void) | null>(null);

  // Autoplay the first stream when the panel comes into view.
  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  const restart = (typeQ: boolean) => {
    setStarted(true);
    setRun((r) => ({ id: r.id + 1, typeQ }));
  };

  // Brand edits (debounced) re-stream the answer.
  const lastBrand = useRef(brand);
  useEffect(() => {
    if (lastBrand.current === brand) return;
    lastBrand.current = brand;
    if (started) restart(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  // The stream loop: type the question, "read sources", then stream tokens. Pauses offscreen / in hidden tabs.
  useEffect(() => {
    if (!started) return;
    const qLen = qLenRef.current;
    if (reduced) {
      setTyped(qLen);
      setShown(Number.MAX_SAFE_INTEGER);
      setPhase('done');
      setElapsed(null);
      return;
    }
    let cancelled = false;
    let timer = 0;
    let ph: Phase = run.typeQ ? 'typing' : 'searching';
    let ti = run.typeQ ? 0 : qLen;
    let si = 0;
    let t0 = 0;
    setPhase(ph);
    setTyped(ti);
    setShown(0);
    setElapsed(null);
    setHot(null);

    const later = (ms: number) => {
      timer = window.setTimeout(step, ms);
    };
    function step() {
      if (cancelled) return;
      if (pausedRef.current) {
        resumeRef.current = step;
        return;
      }
      if (ph === 'typing') {
        ti += 1;
        setTyped(ti);
        if (ti >= qLenRef.current) {
          ph = 'searching';
          setPhase(ph);
          t0 = performance.now();
          return later(900);
        }
        return later(Math.min(20 + Math.random() * 38, TYPE_BUDGET_MS / Math.max(1, qLenRef.current)));
      }
      if (ph === 'searching') {
        if (!t0) t0 = performance.now();
        ph = 'streaming';
        setPhase(ph);
      }
      si += 1;
      setShown(si);
      if (si >= totalRef.current) {
        ph = 'done';
        setPhase('done');
        setElapsed((performance.now() - t0) / 1000);
        return;
      }
      const tk = activeRef.current;
      const edge = tk.blocks.some((b) => b.start === si);
      const prev = tk.blocks.flatMap((b) => b.toks)[si - 1];
      later(tokenDelay(prev, edge));
    }
    later(run.typeQ ? 350 : 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      resumeRef.current = null;
    };
  }, [run, started, reduced]);

  // Back on screen (or tab visible again): pick the stream up where it stopped.
  useEffect(() => {
    if (!inView || !pageVisible || !resumeRef.current) return;
    const resume = resumeRef.current;
    resumeRef.current = null;
    resume();
  }, [inView, pageVisible]);

  // After the first autoplay ends on "Before", invite the visitor to flip to "After".
  useEffect(() => {
    if (phase !== 'done') return;
    if (!interacted.current && mode === 'before') {
      setNudge(true);
      return;
    }
    if (interacted.current) setLive(t.announce[mode](brand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const touch = () => {
    interacted.current = true;
    setNudge(false);
  };

  const chooseMode = (m: Mode) => {
    touch();
    if (m === mode) return;
    setMode(m);
    restart(false);
  };

  const onModeKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const next = mode === 'before' ? 'after' : 'before';
    chooseMode(next);
    const btn = e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-m="${next}"]`);
    btn?.focus();
  };

  // Meter: tween between the illustrative before / after profiles.
  const prof = METER[catId];
  const target = prof[mode];
  const meterVals = useTween([...target, score(target)], { duration: 1300, from: [0, 0, 0, 0], instant: reduced, enabled: started });

  const done = phase === 'done';
  const streaming = phase === 'streaming';
  // Until the first token lands, the answer area shows placeholder lines instead of an empty box.
  const waiting = phase === 'idle' || phase === 'typing' || phase === 'searching';
  const qShown = Math.min(typed, cat.question.length);
  const citedFirst = useMemo(() => {
    // Global index at which each citation first appears → the source row shows up with it.
    const first: Record<number, number> = {};
    active.blocks.forEach((b) =>
      b.toks.forEach((tok, j) => {
        if (tok.k === 'cite' && first[tok.n] === undefined) first[tok.n] = b.start + j;
      }),
    );
    return first;
  }, [active]);

  const phaseText =
    phase === 'done'
      ? t.phase.done(activeSources.length)
      : phase === 'idle'
        ? t.phase.idle
        : t.phase[phase];

  const modeLabel = mode === 'before' ? t.controls.before : t.controls.after;

  return (
    <div
      ref={rootRef}
      className="ga"
      role="group"
      aria-label={t.aria}
      data-mode={mode}
      data-phase={phase}
      data-paused={!inView || !pageVisible ? '' : undefined}
    >
      {/* ── window bar ─────────────────────────────── */}
      <div className="ga-bar">
        <div className="ga-bar__path">
          <span className="ga-bar__glyph" aria-hidden="true">
            <Ico name="globe" size={14} />
          </span>
          <span className="ga-bar__crumb">{t.bar.path}</span>
          <span className="ga-bar__sep" aria-hidden="true">/</span>
          <span className="ga-bar__file">{cat.slug}</span>
        </div>
        <div className="ga-bar__right">
          <span className="ga-pill">{t.bar.illustrative}</span>
          <button
            type="button"
            className="ga-iconbtn"
            onClick={() => {
              touch();
              restart(true);
            }}
            aria-label={t.bar.replayAria}
            title={t.bar.replay}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
              <path d="M4.5 4.5v3.2h3.2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="ga-body">
        <div className="ga-main">
          {/* ── controls ─────────────────────────────── */}
          <div className="ga-controls">
            <label className="ga-ctl ga-ctl--brand">
              <span className="ga-ctl__label">{t.controls.brand}</span>
              <span className="ga-field">
                <input
                  type="text"
                  value={brandInput}
                  maxLength={BRAND_MAX}
                  placeholder={t.controls.brandPlaceholder}
                  autoComplete="organization"
                  spellCheck={false}
                  onChange={(e) => {
                    touch();
                    setBrandInput(e.target.value);
                  }}
                />
              </span>
            </label>
            <label className="ga-ctl ga-ctl--cat">
              <span className="ga-ctl__label">{t.controls.category}</span>
              <span className="ga-field ga-field--select">
                <select
                  value={catId}
                  onChange={(e) => {
                    touch();
                    setCatId(e.target.value as CatId);
                    restart(true);
                  }}
                >
                  {CAT_IDS.map((id) => (
                    <option key={id} value={id}>
                      {t.cats.find((c) => c.id === id)?.label}
                    </option>
                  ))}
                </select>
                <span className="ga-field__chev" aria-hidden="true">
                  <Ico name="chevron-down" size={14} />
                </span>
              </span>
            </label>
            <div className="ga-ctl ga-ctl--mode">
              <span className="ga-ctl__label" id={`${uid}-mode`}>
                {t.controls.mode}
              </span>
              <div className="ga-toggle" role="radiogroup" aria-labelledby={`${uid}-mode`} data-mode={mode}>
                <span className="ga-toggle__thumb" aria-hidden="true" />
                {MODES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    data-m={m}
                    aria-checked={mode === m}
                    tabIndex={mode === m ? 0 : -1}
                    className="ga-toggle__btn"
                    data-nudge={m === 'after' && nudge ? '' : undefined}
                    onClick={() => chooseMode(m)}
                    onKeyDown={onModeKey}
                  >
                    <span className="ga-toggle__dot" aria-hidden="true" />
                    {m === 'before' ? t.controls.before : t.controls.after}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── assistant panel ─────────────────────────────── */}
          <div className="ga-panel" ref={panelRef}>
            <div className="ga-query">
              <span className="ga-query__icon" aria-hidden="true">
                <Ico name="search" size={16} />
              </span>
              <p className="ga-query__text">
                <span className="sr-only-ga">{t.query.label}: </span>
                <span>{cat.question.slice(0, qShown)}</span>
                {phase === 'typing' || phase === 'idle' ? <span className="ga-caret ga-caret--q" aria-hidden="true" /> : null}
                <span className="ga-query__rest" aria-hidden="true">
                  {cat.question.slice(qShown)}
                </span>
              </p>
              <span className="ga-query__send" aria-hidden="true" data-on={phase !== 'idle' && phase !== 'typing' ? '' : undefined}>
                <Ico name="arrow-up-right" size={15} />
              </span>
            </div>

            <div className="ga-answer">
              <div className="ga-answer__meta">
                <span className="ga-answer__glyph" aria-hidden="true">
                  <Ico name="spark" size={14} />
                </span>
                <span className="ga-answer__phase">
                  {phaseText}
                  {(phase === 'searching' || phase === 'streaming') && <span className="ga-dots" aria-hidden="true"><i /><i /><i /></span>}
                </span>
                {done && elapsed !== null && <span className="ga-answer__time">{elapsed.toFixed(1)} s</span>}
              </div>

              <div className="ga-answer__stack">
                <div className="ga-skel-group" data-on={waiting ? '' : undefined} aria-hidden="true">
                  <span className="ga-skel" style={{ width: '60%' }} />
                  <span className="ga-skel" style={{ width: '90%' }} />
                  <span className="ga-skel" style={{ width: '75%' }} />
                </div>
                <AnswerText
                  tk={tkBefore}
                  sources={cat.before.sources}
                  shown={mode === 'before' ? shown : 0}
                  active={mode === 'before'}
                  streaming={mode === 'before' && streaming}
                  sourceWord={t.sourceWord}
                  hot={hot}
                  onHot={setHot}
                />
                <AnswerText
                  tk={tkAfter}
                  sources={cat.after.sources}
                  shown={mode === 'after' ? shown : 0}
                  active={mode === 'after'}
                  streaming={mode === 'after' && streaming}
                  sourceWord={t.sourceWord}
                  hot={hot}
                  onHot={setHot}
                />
              </div>

              <div className="ga-sources">
                <span className="ga-sources__title">{t.sourcesTitle}</span>
                <div className="ga-sources__stack">
                  <div className="ga-skel-group ga-skel-group--src" data-on={waiting ? '' : undefined} aria-hidden="true">
                    {[0, 1].map((i) => (
                      <span key={i} className="ga-skel-row">
                        <span className="ga-skel ga-skel--n" />
                        <span className="ga-skel" style={{ width: i ? '46%' : '62%' }} />
                      </span>
                    ))}
                  </div>
                  {MODES.map((m) => {
                    const list = m === 'before' ? cat.before.sources : cat.after.sources;
                    const isActive = m === mode;
                    return (
                      <ol key={m} className="ga-src" data-active={isActive ? '' : undefined} aria-hidden={!isActive}>
                        {list.map((s, i) => {
                          const n = i + 1;
                          const visible = isActive && (citedFirst[n] ?? Infinity) < shown;
                          return (
                            <li
                              key={i}
                              className="ga-src__row"
                              data-v={visible ? '' : undefined}
                              data-you={s.kind === 'yours' ? '' : undefined}
                              data-hot={isActive && hot === n ? '' : undefined}
                              onPointerEnter={() => setHot(n)}
                              onPointerLeave={() => setHot(null)}
                            >
                              <span className="ga-src__n" aria-hidden="true">{n}</span>
                              <span className="ga-src__title">{fillBrand(s.title, brand)}</span>
                              <span className="ga-src__kind">{t.kinds[s.kind]}</span>
                            </li>
                          );
                        })}
                      </ol>
                    );
                  })}
                </div>
              </div>

              <p className="ga-verdict" data-on={done ? '' : undefined} data-mode={mode}>
                <span className="ga-verdict__dot" aria-hidden="true" />
                {t.verdict[mode](brand)}
              </p>
              <p className="ga-next" data-on={done ? '' : undefined}>
                <a
                  className="ga-cta"
                  href={localize(lang, '/contact?service=growth&offer=ai-search-visibility-geo')}
                  aria-hidden={done ? undefined : true}
                  tabIndex={done ? undefined : -1}
                >
                  {t.cta}
                  <Ico name="arrow-up-right" size={14} />
                </a>
              </p>
            </div>
          </div>
        </div>

        <aside className="ga-side">
          <Meter
            t={t.meter}
            mode={mode}
            values={meterVals}
            before={prof.before}
            beforeScore={score(prof.before)}
            modeLabel={modeLabel}
            headingId={`${uid}-meter`}
          />
        </aside>
      </div>

      <div className="sr-only-ga" role="status" aria-live="polite" aria-atomic="true">
        {live}
      </div>
    </div>
  );
}
