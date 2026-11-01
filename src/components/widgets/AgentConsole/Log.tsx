import { useEffect, useLayoutEffect, useRef } from 'react';
import type { Lang } from '@/i18n';
import type { ConsoleCopy } from './copy';
import type { ScenarioDef } from './scenarios';
import {
  AUTO_APPROVE_MS, fmtClock, fmtLatency, fmtSec, lineClock, pad2,
  type EngineState, type TLine, type Timeline,
} from './engine';
import Ico from './Ico';

interface Props {
  sc: ScenarioDef;
  tl: Timeline;
  lang: Lang;
  ui: ConsoleCopy;
  view: EngineState;
  compact: boolean;
  onApprove: () => void;
  resultFor: (i: number) => string;
}

/** Highlights "strings" inside code-like text. */
function Code({ text }: { text: string }) {
  return (
    <>
      {text.split(/("[^"]*")/g).map((p, i) =>
        p.startsWith('"') ? <span key={i} className="tk-s">{p}</span> : p ? <span key={i} className="tk-a">{p}</span> : null,
      )}
    </>
  );
}

export default function Log({ sc, tl, lang, ui, view, compact, onApprove, resultFor }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const c = view.cursor;
  const lines = tl.lines.filter((l) => l.at <= c && !(compact && (l.minor || l.k === 'info')));
  const count = lines.filter((l) => l.k !== 'step').length;

  // Follow the newest line unless the reader scrolled up. Never scrolls the page itself.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (lines.length === 0) stick.current = true;
    if (stick.current) el.scrollTop = el.scrollHeight;
  }, [lines.length, view.approved, c >= tl.runEnd]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { if (stick.current) el.scrollTop = el.scrollHeight; });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onScroll = () => {
    const el = ref.current;
    if (el) stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
  };

  const ts = (at: number) => fmtClock(lineClock(tl, view, at), lang);

  const row = (l: TLine) => {
    switch (l.k) {
      case 'step': {
        const s = sc.steps[l.step];
        return (
          <li key={l.id} className="ac-ln ac-ln--step">
            <span>[{pad2(l.step + 1)}]</span> <b>{s.label[lang]}</b>
          </li>
        );
      }
      case 'gate': {
        const g = sc.steps[l.step].gate!;
        const ok = !!view.approved;
        const secs = Math.max(1, Math.ceil((AUTO_APPROVE_MS - view.extra) / 1000));
        const resolved =
          view.approved === 'you' ? ui.gate.byYou(fmtSec(view.approvedAfter, lang))
          : view.approved === 'auto' ? ui.gate.byAuto(fmtSec(view.approvedAfter, lang))
          : ui.gate.byStatic(g.approver[lang]);
        return (
          <li key={l.id} className="ac-gate" data-state={ok ? 'ok' : 'wait'} data-gate-node="">
            <div className="ac-gate__head">
              <Ico name="shield" size={14} />
              <span>{ui.gate.title}</span>
              <span className="ac-gate__ts">{ts(l.at)}</span>
            </div>
            <p className="ac-gate__title">{g.title[lang]}</p>
            <p className="ac-gate__ex">{g.excerpt[lang]}</p>
            <p className="ac-gate__pol">{g.policy[lang]}</p>
            <div className="ac-gate__act">
              {ok ? (
                <span className="ac-gate__done"><Ico name="check" size={14} stroke={2} />{resolved}</span>
              ) : (
                <>
                  <button type="button" className="ac-approve" onClick={onApprove}>
                    <span className="ac-approve__chip" aria-hidden="true"><Ico name="check" size={15} stroke={2} /></span>
                    {ui.gate.approve}
                  </button>
                  <span className="ac-gate__auto">{ui.gate.auto(secs)}</span>
                </>
              )}
            </div>
          </li>
        );
      }
      case 'call': {
        const done = c >= l.at + l.ms;
        return (
          <li key={l.id} className="ac-ln" data-k="call">
            <span className="ac-ln__ts">{ts(l.at)}</span>
            <span className="ac-ln__tag">{ui.tags.call}</span>
            <span className="ac-ln__msg">
              <span className="tk-fn">{l.fn}</span>
              <span className="tk-p">(</span>
              <Code text={l.args} />
              <span className="tk-p">)</span>{' '}
              {done ? (
                <>
                  <span className={l.code < 300 ? 'tk-ok' : 'tk-err'}>→ {l.code}</span>
                  <span className="tk-lat"> · {fmtLatency(l.ms)}</span>
                </>
              ) : (
                <span className="tk-pend">→ <i /><i /><i /></span>
              )}
            </span>
          </li>
        );
      }
      case 'event': {
        const sp = l.text.indexOf(' ');
        return (
          <li key={l.id} className="ac-ln" data-k="event">
            <span className="ac-ln__ts">{ts(l.at)}</span>
            <span className="ac-ln__tag">{ui.tags.event}</span>
            <span className="ac-ln__msg">
              <span className="tk-fn">{sp > 0 ? l.text.slice(0, sp) : l.text}</span>
              {sp > 0 && <Code text={l.text.slice(sp)} />}
            </span>
          </li>
        );
      }
      case 'done': {
        const s = tl.steps[l.step];
        const dur = s.end - s.start + (s.gateAt !== null ? view.extra : 0);
        return (
          <li key={l.id} className="ac-ln" data-k="done">
            <span className="ac-ln__ts">{ts(l.at)}</span>
            <span className="ac-ln__tag">{ui.tags.done}</span>
            <span className="ac-ln__msg">
              {resultFor(l.step)} <span className="tk-lat">· {fmtSec(dur, lang)}</span>
            </span>
          </li>
        );
      }
      default:
        return (
          <li key={l.id} className="ac-ln" data-k={l.k}>
            <span className="ac-ln__ts">{ts(l.at)}</span>
            <span className="ac-ln__tag">{l.k === 'warn' ? ui.tags.warn : l.k === 'think' ? ui.tags.think : ui.tags.info}</span>
            <span className="ac-ln__msg">{l.text}</span>
          </li>
        );
    }
  };

  return (
    <>
      <div className="ac-side__head">
        <span className="ac-side__title">{ui.log}</span>
        <span className="ac-side__count">{ui.events(count)}</span>
        <span className="ac-side__live" data-on={c > 0 && c < tl.runEnd ? '' : undefined}>
          <span className="ac-dot" aria-hidden="true" />
          {ui.live}
        </span>
      </div>
      <div
        className="ac-log"
        ref={ref}
        onScroll={onScroll}
        role="log"
        aria-live="off"
        aria-label={ui.log}
        tabIndex={0}
      >
        {lines.length === 0 ? (
          <p className="ac-log__wait">
            <span className="ac-log__cursor" aria-hidden="true" />
            {ui.waiting}
          </p>
        ) : (
          <ol className="ac-log__list">{lines.map(row)}</ol>
        )}
      </div>
    </>
  );
}
