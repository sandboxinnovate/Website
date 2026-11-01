import { useLayoutEffect, useRef, useState } from 'react';
import type { Lang } from '@/i18n';
import type { ConsoleCopy } from './copy';
import type { ScenarioDef } from './scenarios';
import {
  chipStates, clamp01, easeInOut, fmtSec, pad2, useFrame,
  type FrameRegistry, type NodeState, type Timeline,
} from './engine';
import Ico from './Ico';

interface Box { x: number; y: number; w: number; h: number }
interface Edge { d: string; x1: number; y1: number; x2: number; y2: number }
interface Geo { w: number; h: number; boxes: Box[]; edges: Edge[] }

const BEND = 46; // how far a U-turn connector swings outside the cards
const TAIL = 54;

/** Snake layout: row 0 left→right, row 1 right→left, row 2 left→right… */
const cell = (i: number) => {
  const row = Math.floor(i / 2);
  const col = row % 2 === 0 ? (i % 2) + 1 : 2 - (i % 2);
  return { row: row + 1, col };
};

function edgeBetween(a: Box, b: Box, w: number): Edge {
  const ya = a.y + a.h / 2;
  const yb = b.y + b.h / 2;
  if (Math.abs(ya - yb) < 2) {
    const ltr = a.x < b.x;
    const x1 = ltr ? a.x + a.w : a.x;
    const x2 = ltr ? b.x : b.x + b.w;
    const m = (x1 + x2) / 2;
    return { d: `M${x1} ${ya} C${m} ${ya} ${m} ${yb} ${x2} ${yb}`, x1, y1: ya, x2, y2: yb };
  }
  const right = a.x + a.w / 2 > w / 2;
  const x1 = right ? a.x + a.w : a.x;
  const x2 = right ? b.x + b.w : b.x;
  const k = right ? BEND : -BEND;
  return { d: `M${x1} ${ya} C${x1 + k} ${ya} ${x2 + k} ${yb} ${x2} ${yb}`, x1, y1: ya, x2, y2: yb };
}

const sameGeo = (a: Geo | null, b: Geo) =>
  !!a && a.w === b.w && a.h === b.h && a.edges.length === b.edges.length && a.edges.every((e, i) => e.d === b.edges[i].d);

interface Props {
  sc: ScenarioDef;
  tl: Timeline;
  lang: Lang;
  ui: ConsoleCopy;
  states: NodeState[];
  focus: number;
  cursor: number;
  extra: number;
  reg: FrameRegistry;
  resultFor: (i: number) => string;
  /** The run is waiting at the human gate (not yet approved). */
  gateOpen: boolean;
  onApprove: () => void;
}

export default function Graph({ sc, tl, lang, ui, states, focus, cursor, extra, reg, resultFor, gateOpen, onApprove }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cometRefs = useRef<(SVGPathElement | null)[][]>([]);
  const headRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lens = useRef<number[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const n = sc.steps.length;

  // Measure the laid-out cards and route connectors between them.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const measure = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const boxes = sc.steps.map((_, i) => {
        const el = nodeRefs.current[i];
        return el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : { x: 0, y: 0, w: 0, h: 0 };
      });
      const edges: Edge[] = [];
      for (let i = 0; i < boxes.length - 1; i++) edges.push(edgeBetween(boxes[i], boxes[i + 1], w));
      const next = { w, h, boxes, edges };
      setGeo((prev) => (sameGeo(prev, next) ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); });
    ro.observe(wrap);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [sc]);

  useLayoutEffect(() => {
    if (!geo) return;
    lens.current = pathRefs.current.map((p) => (p ? p.getTotalLength() : 0));
    cometRefs.current.forEach((pair, i) => {
      const L = lens.current[i] || 0;
      pair?.forEach((c, j) => {
        if (!c) return;
        const tail = Math.min(j === 0 ? TAIL : TAIL * 0.4, L * 0.8);
        c.style.strokeDasharray = `${tail} ${L + tail}`;
        c.dataset.tail = String(tail);
      });
    });
  }, [geo]);

  // Per-frame: packets on the active connector + progress bar on the running card.
  useFrame(reg, (e) => {
    const c = e.cursor;
    for (let i = 0; i < n - 1; i++) {
      const path = pathRefs.current[i];
      const head = headRefs.current[i];
      const pair = cometRefs.current[i];
      if (!path || !head || !pair) continue;
      const s0 = tl.steps[i].end;
      const s1 = tl.steps[i + 1].start;
      const on = c > s0 && c < s1;
      if (on) {
        const L = lens.current[i] || path.getTotalLength();
        const s = easeInOut(clamp01((c - s0) / (s1 - s0))) * L;
        pair.forEach((cm) => {
          if (!cm) return;
          cm.style.strokeDashoffset = String(Number(cm.dataset.tail || 0) - s);
          cm.style.opacity = '1';
        });
        const pt = path.getPointAtLength(s);
        head.setAttribute('cx', pt.x.toFixed(1));
        head.setAttribute('cy', pt.y.toFixed(1));
        head.style.opacity = '1';
      } else {
        pair.forEach((cm) => { if (cm) cm.style.opacity = '0'; });
        head.style.opacity = '0';
      }
    }
    tl.steps.forEach((s, i) => {
      const bar = barRefs.current[i];
      if (bar) bar.style.transform = `scaleX(${clamp01((c - s.start) / (s.end - s.start)).toFixed(4)})`;
    });
  });

  const edgeState = (i: number) => {
    const s0 = tl.steps[i].end;
    const s1 = tl.steps[i + 1].start;
    return cursor >= s1 ? 'done' : cursor > s0 ? 'active' : 'idle';
  };

  const fb = geo?.boxes[focus];
  const anyActive = states.some((s) => s !== 'idle');

  return (
    <div className="ac-snake" ref={wrapRef}>
      <div
        className="ac-glow"
        aria-hidden="true"
        data-on={fb && anyActive ? '' : undefined}
        style={fb ? { transform: `translate3d(${(fb.x + fb.w / 2).toFixed(0)}px, ${(fb.y + fb.h / 2).toFixed(0)}px, 0)` } : undefined}
      />
      {geo && (
        <svg className="ac-wires" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true" focusable="false">
          {geo.edges.map((ed, i) => (
            <g key={i} className="ac-wire" data-state={edgeState(i)}>
              <path ref={(el) => { pathRefs.current[i] = el; }} className="ac-wire__base" d={ed.d} />
              <path className="ac-wire__flow" d={ed.d} />
              <path ref={(el) => { (cometRefs.current[i] ||= [])[0] = el; }} className="ac-wire__comet ac-wire__comet--tail" d={ed.d} />
              <path ref={(el) => { (cometRefs.current[i] ||= [])[1] = el; }} className="ac-wire__comet" d={ed.d} />
              <circle ref={(el) => { headRefs.current[i] = el; }} className="ac-wire__head" r="3.2" cx={ed.x1} cy={ed.y1} />
              <circle className="ac-port" cx={ed.x1} cy={ed.y1} r="3.5" />
              <circle className="ac-port" cx={ed.x2} cy={ed.y2} r="3.5" />
            </g>
          ))}
        </svg>
      )}
      <ol className="ac-nodes" aria-label={ui.graphLabel}>
        {sc.steps.map((step, i) => {
          const st = states[i];
          const { row, col } = cell(i);
          const chips = step.chips ? chipStates(tl, i, step.chips.length, cursor) : null;
          const dur = step.dur + (step.gate ? extra : 0);
          // Stacked layouts show Approve on the waiting card itself (CSS decides), so nobody has to find it in the log.
          const approveHere = st === 'gate' && gateOpen;
          return (
            <li
              key={step.id}
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="ac-node"
              data-state={st}
              data-kind={step.kind}
              data-gate-node={step.gate ? '' : undefined}
              data-approve={approveHere ? '' : undefined}
              style={{ gridRow: row, gridColumn: col }}
            >
              <span className="ac-node__icon" aria-hidden="true">
                <Ico name={step.icon} size={18} />
                <span className="ac-node__check"><Ico name="check" size={10} stroke={2.4} /></span>
              </span>
              <span className="ac-node__main">
                <span className="ac-node__top">
                  <span className="ac-node__idx">{pad2(i + 1)}</span>
                  <span className="ac-node__kind">{ui.kinds[step.kind]}</span>
                  <span className="ac-node__state">
                    <span className="ac-dot" aria-hidden="true" />
                    {st === 'done' ? fmtSec(dur, lang) : ui.node[st]}
                  </span>
                </span>
                <span className="ac-node__label">{step.label[lang]}</span>
                {chips && st !== 'done' ? (
                  <span className="ac-node__chips">
                    {step.chips!.map((ch, j) => (
                      <span key={j} className="ac-chip" data-state={chips[j]}>
                        <span className="ac-dot" aria-hidden="true" />
                        {ch[lang]}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="ac-node__sub">{st === 'done' ? resultFor(i) : step.tool}</span>
                )}
                {approveHere && (
                  <button type="button" className="ac-approve ac-approve--node" onClick={onApprove}>
                    <Ico name="check" size={12} stroke={2.4} />
                    {ui.gate.approve}
                  </button>
                )}
              </span>
              <span className="ac-node__bar" aria-hidden="true" ref={(el) => { barRefs.current[i] = el; }} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
