import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { Lang } from '@/i18n';
import { COPY } from './copy';
import { SCENARIOS } from './scenarios';
import {
  AUTO_APPROVE_MS, STATIC_GATE_WAIT, advance, atGate, buildTimeline, elapsedOf, fmtClock, fmtSec, freshEngine, nodeState,
  useFrame, viewKey, type EngineState, type FrameFn, type NodeState,
} from './engine';
import Graph from './Graph';
import Stepper from './Stepper';
import Log from './Log';
import Outcome from './Outcome';
import Ico from './Ico';
import './agent-console.css';

interface Props {
  lang: Lang;
  /** 'lead' | 'support' | 'report' | 'content' */
  initialScenario?: string;
  /** Tighter variant for narrower columns: graph above the log, fewer log lines. */
  compact?: boolean;
  className?: string;
}

type Status = 'ready' | 'running' | 'paused' | 'awaiting' | 'done';

/**
 * "Watch a brain work": a simulated orchestration console. Four fictional workflows run step
 * by step (graph on one side, live log on the other), with a human approval gate, controls,
 * and a final outcome card. Autoplays when visible, pauses offscreen and in background tabs.
 */
export default function AgentConsole({ lang, initialScenario, compact = false, className = '' }: Props) {
  const ui = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [idx, setIdx] = useState(() => Math.max(0, SCENARIOS.findIndex((s) => s.id === initialScenario)));
  const sc = SCENARIOS[idx];
  const tl = useMemo(() => buildTimeline(sc, lang), [sc, lang]);

  const [runNo, setRunNo] = useState(1);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [want, setWant] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState<EngineState>(freshEngine);
  const [announce, setAnnounce] = useState('');

  const eng = useRef<EngineState>(freshEngine());
  const live = useRef({ tl, sc, ui, lang, speed });
  live.current = { tl, sc, ui, lang, speed };
  const keyRef = useRef('');
  const prevStates = useRef<NodeState[]>([]);
  const hooks = useRef(new Set<FrameFn>());
  const reducedRef = useRef(false);
  const userRun = useRef(false);
  /** Progress is announced only after the visitor touched the console: autoplay stays silent for screen readers. */
  const userActed = useRef(false);
  const autoStarted = useRef(false);
  /** Is the waiting step (graph card or stepper row) at least half on screen? */
  const gateVisible = useRef(true);
  /** Latched once the gate has been seen: only then does the auto-approve countdown run. */
  const gateSeen = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const runHooks = useCallback(() => {
    const e = eng.current;
    hooks.current.forEach((fn) => fn(e));
  }, []);

  /** Push engine state into React when something discrete changed; announce progress politely. */
  const sync = useCallback((force = false) => {
    const { tl: t, sc: s, ui: u, lang: lg } = live.current;
    const e = eng.current;
    const key = viewKey(t, e);
    if (!force && key === keyRef.current) return;
    keyRef.current = key;

    const states = t.steps.map((_, i) => nodeState(t, i, e.cursor, !!e.approved));
    const prev = prevStates.current;
    if (prev.length === states.length) {
      let msg = '';
      states.forEach((st, i) => {
        if (st === 'done' && prev[i] !== 'done') msg = u.announce.step(i + 1, states.length, s.steps[i].label[lg], resultText(i));
        if (st === 'gate' && prev[i] !== 'gate') msg = u.announce.gate(s.steps[i].gate!.title[lg]);
      });
      if (states.every((x) => x === 'done') && !prev.every((x) => x === 'done')) msg = u.announce.done(fmtSec(elapsedOf(t, e), lg));
      if (msg && userActed.current) setAnnounce(msg);
    }
    prevStates.current = states;
    setView({ ...e });

    function resultText(i: number) {
      const step = s.steps[i];
      if (!step.gate) return step.result[lg];
      return e.approved === 'you' ? u.gate.resultYou : e.approved === 'auto' ? u.gate.resultAuto : u.gate.resultStatic;
    }
  }, []);

  /** (Re)load the current scenario, either at the start or already completed. */
  const load = useCallback((complete: boolean) => {
    const t = live.current.tl;
    const e = freshEngine();
    if (complete) {
      e.cursor = t.typeEnd;
      if (t.gateAt !== null) { e.approved = 'static'; e.extra = STATIC_GATE_WAIT; e.approvedAfter = STATIC_GATE_WAIT; }
    }
    eng.current = e;
    gateSeen.current = false;
    prevStates.current = t.steps.map((_, i) => nodeState(t, i, e.cursor, !!e.approved));
    setAnnounce('');
    sync(true);
  }, [sync]);

  // Reduced motion: show the finished run, no autoplay.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
    const on = () => { reducedRef.current = mq.matches; };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    load(reducedRef.current && !userRun.current);
  }, [tl, runNo, load]);

  // Autoplay when scrolled into view; pause when it leaves.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        // Several crossings can arrive in one batch: the newest entry is the current state.
        const entry = entries[entries.length - 1];
        const vis = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        setInView(vis);
        if (vis && !autoStarted.current) {
          autoStarted.current = true;
          if (!reducedRef.current) setWant(true);
        }
      },
      { threshold: [0, 0.2, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Watch the gate: its card in the graph or row in the stepper (only one is displayed), plus the
  // approval card in the run log once it is printed. Any of them half on screen starts the countdown.
  const gateLogged = tl.gateAt !== null && view.cursor >= tl.gateAt;
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-gate-node]'));
    if (!els.length) return;
    const shown = new Set<Element>();
    gateVisible.current = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && en.intersectionRatio >= 0.5) shown.add(en.target);
          else shown.delete(en.target);
        }
        gateVisible.current = shown.size > 0;
      },
      // the bottom margin keeps the mobile sticky booking bar from counting as "on screen"
      { threshold: [0, 0.5, 1], rootMargin: '0px 0px -72px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      gateVisible.current = true;
    };
  }, [sc.id, gateLogged]);

  useEffect(() => {
    const on = () => setHidden(document.hidden);
    on();
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  const finishedAll = view.cursor >= tl.typeEnd;
  const playing = want && inView && !hidden && !finishedAll;

  // The loop: advance → per-frame DOM updates → React sync on discrete changes.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const { tl: t, speed: sp } = live.current;
      const e = eng.current;
      if (!gateSeen.current && gateVisible.current && atGate(t, e)) gateSeen.current = true;
      advance(t, e, dt, sp, !gateSeen.current);
      runHooks();
      sync();
      if (eng.current.cursor < t.typeEnd) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing, runHooks, sync]);

  // Keep the DOM-driven bits (timer, bars, packets, typing) in step after every render.
  useEffect(() => { runHooks(); });

  useFrame(hooks, (e) => {
    const t = live.current.tl;
    if (timerRef.current) timerRef.current.textContent = fmtClock(elapsedOf(t, e), live.current.lang);
    if (progRef.current) progRef.current.style.transform = `scaleX(${Math.min(1, e.cursor / t.runEnd).toFixed(4)})`;
  });

  /* ------------------------------------------------------------ actions */

  const approve = useCallback(() => {
    const e = eng.current;
    if (e.approved) return;
    userActed.current = true;
    e.approved = 'you';
    e.approvedAfter = e.extra;
    setWant(true);
    sync(true);
    runHooks();
  }, [sync, runHooks]);

  const replay = () => {
    userRun.current = true;
    userActed.current = true;
    setRunNo((n) => n + 1);
    setWant(true);
  };

  const choose = (i: number) => {
    if (i === idx) return;
    userRun.current = false;
    userActed.current = true;
    setIdx(i);
    setRunNo((n) => n + 1);
    if (!reducedRef.current) setWant(true);
  };

  const onTabKey = (ev: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = SCENARIOS.length - 1;
    const to = ev.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : ev.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : ev.key === 'Home' ? 0
      : ev.key === 'End' ? last
      : -1;
    if (to < 0) return;
    ev.preventDefault();
    choose(to);
    tabRefs.current[to]?.focus();
  };

  const runComplete = view.cursor >= tl.runEnd;
  const togglePlay = () => {
    if (runComplete) { replay(); return; }
    userActed.current = true;
    if (want) { setWant(false); sync(true); }
    else { userRun.current = true; setWant(true); }
  };

  /* ------------------------------------------------------------ derived */

  const states = tl.steps.map((_, i) => nodeState(tl, i, view.cursor, !!view.approved));
  let focus = states.findIndex((s) => s === 'running' || s === 'gate');
  if (focus < 0) focus = Math.max(0, states.lastIndexOf('done'));

  const status: Status = runComplete ? 'done'
    : !want ? (view.cursor === 0 ? 'ready' : 'paused')
    : !inView || hidden ? 'paused'
    : atGate(tl, view) ? 'awaiting'
    : 'running';

  const resultFor = (i: number) => {
    const step = sc.steps[i];
    if (!step.gate) return step.result[lang];
    return view.approved === 'you' ? ui.gate.resultYou : view.approved === 'auto' ? ui.gate.resultAuto : ui.gate.resultStatic;
  };

  const [pathA, pathB] = sc.path[lang];
  const runId = `run_${sc.hex}${String(runNo).padStart(2, '0')}`;
  const isPlaying = want && !runComplete;
  const panelId = `${uid}-panel`;
  const doneSteps = states.filter((s) => s === 'done').length;
  const gateOpen = atGate(tl, view);
  const gateSecs = Math.max(1, Math.ceil((AUTO_APPROVE_MS - view.extra) / 1000));
  const shared = { sc, tl, lang, ui, states, focus, cursor: view.cursor, extra: view.extra, reg: hooks, resultFor, gateOpen, onApprove: approve };

  return (
    <div
      ref={rootRef}
      className={`ac${compact ? ' ac--compact' : ''}${className ? ` ${className}` : ''}`}
      data-status={status}
      data-anim={playing ? 'on' : 'off'}
      role="region"
      aria-label={ui.region}
    >
      {/* Title bar */}
      <div className="ac-bar">
        <div className="ac-bar__l">
          <span className="ac-bar__mark" aria-hidden="true"><Ico name="brain" size={14} /></span>
          <span className="ac-bar__path">
            <span className="ac-bar__seg">{pathA}</span>
            <span className="ac-bar__sep" aria-hidden="true">/</span>
            <b>{pathB}</b>
          </span>
          <span className="ac-bar__run">{runId}</span>
        </div>
        <div className="ac-bar__r">
          <span className="ac-sim">{ui.simulated}</span>
          <span className="ac-status">
            <span className="ac-status__dot" aria-hidden="true" />
            <span className="ac-status__txt">{ui.status[status]}</span>
            <span className="ac-status__time" ref={timerRef}>{fmtClock(0, lang)}</span>
          </span>
        </div>
      </div>

      {/* Scenario tabs + controls */}
      <div className="ac-tools">
        <div className="ac-tabs" role="tablist" aria-label={ui.workflows}>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${uid}-tab-${s.id}`}
              aria-selected={i === idx}
              aria-controls={panelId}
              tabIndex={i === idx ? 0 : -1}
              className="ac-tab"
              onClick={() => choose(i)}
              onKeyDown={(ev) => onTabKey(ev, i)}
            >
              <Ico name={s.icon} size={15} />
              <span>{s.tab[lang]}</span>
            </button>
          ))}
        </div>
        <div className="ac-ctrl">
          <span className="ac-ctrl__step">{ui.stepShort(focus + 1, sc.steps.length)}</span>
          <button
            type="button"
            className="ac-btn ac-btn--main"
            onClick={togglePlay}
            aria-label={isPlaying ? ui.pause : runComplete ? ui.replay : ui.play}
            title={isPlaying ? ui.pause : runComplete ? ui.replay : ui.play}
          >
            <Ico name={isPlaying ? 'pause' : 'play'} size={16} stroke={isPlaying ? 2 : 1.6} />
          </button>
          <button type="button" className="ac-btn" onClick={replay} aria-label={ui.replay} title={ui.replay}>
            <Ico name="replay" size={16} />
          </button>
          <button
            type="button"
            className="ac-btn ac-btn--speed"
            onClick={() => setSpeed((s) => (s === 1 ? 2 : 1))}
            aria-label={`${ui.speed}: ${speed}×`}
            title={ui.speedOpt(speed === 1 ? 2 : 1)}
          >
            {speed}×
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="ac-body" role="tabpanel" id={panelId} aria-labelledby={`${uid}-tab-${sc.id}`}>
        <section className="ac-graph" aria-label={ui.workflow}>
          <div className="ac-graph__head">
            <span>{ui.workflow} · {ui.steps(sc.steps.length)}</span>
            <span className="ac-graph__trig"><Ico name="bolt" size={12} />{ui.trigger} · {sc.trigger[lang]}</span>
          </div>
          <Graph {...shared} />
          <Stepper {...shared} gateSecs={gateSecs} />
          <div className="ac-legend" aria-hidden="true">
            <span data-k="idle"><span className="ac-dot" />{ui.legend.idle}</span>
            <span data-k="running"><span className="ac-dot" />{ui.legend.running}</span>
            <span data-k="done"><span className="ac-dot" />{ui.legend.done}</span>
            <span data-k="gate"><span className="ac-dot" />{ui.legend.gate}</span>
          </div>
        </section>
        <section className="ac-side" aria-label={ui.log}>
          <Log sc={sc} tl={tl} lang={lang} ui={ui} view={view} compact={compact} onApprove={approve} resultFor={resultFor} />
          <Outcome sc={sc} tl={tl} lang={lang} ui={ui} open={runComplete} elapsed={elapsedOf(tl, view)} reg={hooks} />
        </section>
      </div>

      {/* Status line */}
      <div className="ac-foot">
        <span className="ac-foot__prog" ref={progRef} aria-hidden="true" />
        <span className="ac-foot__l">
          <span className="ac-foot__ok"><span className="ac-dot" aria-hidden="true" />{ui.toolsConnected(sc.tools)}</span>
          <span className="ac-foot__steps">{doneSteps}/{sc.steps.length}</span>
        </span>
        <span className="ac-foot__r">{ui.simulatedNote}</span>
      </div>

      <p className="ac-sr" aria-live="polite" aria-atomic="true">{announce}</p>
    </div>
  );
}
