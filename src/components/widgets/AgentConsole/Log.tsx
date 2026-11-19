import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Lang } from '@/i18n';
import { ToolTile } from '@/components/ui/ToolBadge';
import type { ToolKey } from '@/components/ui/tool-icons';
import type { ConsoleCopy } from './copy';
import type { ScenarioDef } from './scenarios';
import {
  AUTO_APPROVE_MS, fmtLatency, fmtSec, fmtStamp, lineClock, pad2,
  type EngineState, type TLine, type Timeline,
} from './engine';
import Ico from './Ico';
import StepTile from './StepTile';

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

/** A line the activity feed shows: a plain sentence with the tool it touched. */
interface FeedItem { id: string; k: 'say' | 'think' | 'info' | 'warn'; text: string; tool: ToolKey; pending: boolean }

function toFeed(l: TLine, cursor: number, fallback: ToolKey): FeedItem | 'gate' | null {
  if (l.k === 'gate') return 'gate';
  if ((l.k === 'call' || l.k === 'event') && l.say) {
    const pending = l.k === 'call' && cursor < l.at + l.ms;
    return { id: l.id, k: 'say', text: l.say, tool: l.tool ?? fallback, pending };
  }
  if (l.k === 'think') return { id: l.id, k: 'think', text: l.say ?? l.text, tool: l.tool ?? 'ai', pending: false };
  if (l.k === 'info') return { id: l.id, k: 'info', text: l.say ?? l.text, tool: l.tool ?? fallback, pending: false };
  if (l.k === 'warn') return { id: l.id, k: 'warn', text: l.say ?? l.text, tool: l.tool ?? 'reports', pending: false };
  return null;
}

/** Highlights "strings" inside code-like text (technical details only). */
function Code({ text }: { text: string }) {
  return (
    <>
      {text.split(/("[^"]*")/g).map((p, i) =>
        p.startsWith('"') ? <span key={i} className="tk-s">{p}</span> : p ? <span key={i} className="tk-a">{p}</span> : null,
      )}
    </>
  );
}

/**
 * Right-hand panel: a readable activity feed (one plain sentence per thing the assistant did,
 * each with its tool tile), the approval card, and the raw run log tucked behind a toggle.
 */
export default function Log({ sc, tl, lang, ui, view, compact, onApprove, resultFor }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  const [techOpen, setTechOpen] = useState(false);
  const c = view.cursor;
  const shown = tl.lines.filter((l) => l.at <= c && !(compact && l.minor));
  const feed = shown
    .map((l) => ({ l, f: toFeed(l, c, sc.steps[l.step].uses === 'person' ? 'chat' : (sc.steps[l.step].uses as ToolKey)) }))
    .filter((x) => x.f !== null);

  // Follow the newest line unless the reader scrolled up. Never scrolls the page itself.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (feed.length === 0) stick.current = true;
    if (stick.current) el.scrollTop = el.scrollHeight;
  }, [feed.length, view.approved, c >= tl.runEnd, techOpen]);

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

  const gateCard = (l: TLine) => {
    const g = sc.steps[l.step].gate!;
    const ok = !!view.approved;
    const secs = Math.max(1, Math.ceil((AUTO_APPROVE_MS - view.extra) / 1000));
    const resolved =
      view.approved === 'you' ? ui.gate.byYou
      : view.approved === 'auto' ? ui.gate.byAuto
      : ui.gate.byStatic(g.approver[lang]);
    return (
      <li key={l.id} className="ac-gate" data-state={ok ? 'ok' : 'wait'} data-gate-node="">
        <div className="ac-gate__head">
          <StepTile tool="person" lang={lang} size={24} />
          <span>{ok ? ui.gate.resultStatic : ui.gate.title}</span>
        </div>
        <p className="ac-gate__title">{g.title[lang]}</p>
        <p className="ac-gate__ex">{g.excerpt[lang]}</p>
        <p className="ac-gate__pol"><b>{ui.gate.why}:</b> {g.policy[lang]}</p>
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
  };

  const feedRow = (f: FeedItem) => (
    <li key={f.id} className="ac-fd" data-k={f.k} data-pending={f.pending ? '' : undefined}>
      <ToolTile tool={f.tool} lang={lang} size={26} title="" />
      <span className="ac-fd__txt">
        {f.k === 'warn' && <Ico name="alert" size={13} className="ac-fd__warn" />}
        {f.text}
        {f.pending && <span className="ac-fd__dots" aria-hidden="true"><i /><i /><i /></span>}
      </span>
    </li>
  );

  /* ------------------------------------------------ technical details (raw log) */
  const ts = (at: number) => fmtStamp(lineClock(tl, view, at), lang);
  const techRow = (l: TLine) => {
    switch (l.k) {
      case 'step':
        return (
          <li key={l.id} className="ac-ln ac-ln--step">
            <span>[{pad2(l.step + 1)}]</span> <b>{sc.steps[l.step].label[lang]}</b>
          </li>
        );
      case 'gate':
        return (
          <li key={l.id} className="ac-ln" data-k="human">
            <span className="ac-ln__ts">{ts(l.at)}</span>
            <span className="ac-ln__tag">{ui.tags.human}</span>
            <span className="ac-ln__msg">approval.wait{view.approved ? ` → ${view.approved}` : ''}</span>
          </li>
        );
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
                <span className="tk-pend">→ …</span>
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
        {feed.length === 0 ? (
          <p className="ac-log__wait">
            <span className="ac-log__cursor" aria-hidden="true" />
            {ui.waiting}
          </p>
        ) : (
          <ol className="ac-feed">{feed.map(({ l, f }) => (f === 'gate' ? gateCard(l) : feedRow(f as FeedItem)))}</ol>
        )}
      </div>
      <details className="ac-tech" open={techOpen} onToggle={(e) => setTechOpen(e.currentTarget.open)}>
        <summary className="ac-tech__sum">
          <Ico name="chevron-down" size={14} className="ac-tech__chev" />
          {techOpen ? ui.tech.hide : ui.tech.show}
        </summary>
        {techOpen && (
          <div className="ac-tech__box" tabIndex={0} aria-label={ui.tech.label} role="region">
            <ol className="ac-log__list">{shown.map(techRow)}</ol>
          </div>
        )}
      </details>
    </>
  );
}
