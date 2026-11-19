import { useRef } from 'react';
import type { Lang } from '@/i18n';
import type { ConsoleCopy } from './copy';
import type { ScenarioDef } from './scenarios';
import { chipStates, clamp01, useFrame, type FrameRegistry, type NodeState, type Timeline } from './engine';
import Ico from './Ico';
import StepTile, { toolName } from './StepTile';

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
  /** Seconds left before the demo approves on its own. */
  gateSecs: number;
}

/** Narrow-container version of the workflow: a vertical stepper with the active step expanded. */
export default function Stepper({ sc, tl, lang, ui, states, focus, cursor, reg, resultFor, gateOpen, onApprove, gateSecs }: Props) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useFrame(reg, (e) => {
    tl.steps.forEach((s, i) => {
      const bar = barRefs.current[i];
      if (bar) bar.style.transform = `scaleX(${clamp01((e.cursor - s.start) / (s.end - s.start)).toFixed(4)})`;
    });
  });

  return (
    <ol className="ac-steps" aria-label={ui.graphLabel}>
      {sc.steps.map((step, i) => {
        const st = states[i];
        const open = i === focus;
        const chips = step.chips ? chipStates(tl, i, step.chips.length, cursor) : null;
        return (
          <li key={step.id} className="ac-st" data-state={st} data-open={open ? '' : undefined} data-gate-node={step.gate ? '' : undefined}>
            <span className="ac-st__dot" aria-hidden="true">
              <StepTile tool={step.uses} lang={lang} size={30} />
              <span className="ac-node__check"><Ico name="check" size={10} stroke={2.4} /></span>
            </span>
            <div className="ac-st__row">
              <span className="ac-st__label">{step.label[lang]}</span>
              <span className="ac-st__meta">
                <span className="ac-dot" aria-hidden="true" />
                {ui.node[st]}
              </span>
            </div>
            <div className="ac-st__more" aria-hidden={open ? undefined : true}>
              <div className="ac-st__inner">
                <div className="ac-st__box">
                  <span className="ac-st__tool">
                    {ui.stepNo(i + 1)} · {toolName(step.uses, lang, ui.person)}
                  </span>
                  {st === 'gate' && gateOpen && step.gate ? (
                    <>
                      <span className="ac-st__gate">{step.gate.title[lang]}</span>
                      <span className="ac-st__act">
                        <button type="button" className="ac-approve ac-approve--node" onClick={onApprove} tabIndex={open ? undefined : -1}>
                          <span className="ac-approve__chip" aria-hidden="true"><Ico name="check" size={14} stroke={2} /></span>
                          {ui.gate.approve}
                        </button>
                        <span className="ac-gate__auto">{ui.gate.auto(gateSecs)}</span>
                      </span>
                    </>
                  ) : st === 'done' ? (
                    <span className="ac-st__res">{resultFor(i)}</span>
                  ) : chips ? (
                    <span className="ac-node__chips">
                      {step.chips!.map((ch, j) => (
                        <span key={j} className="ac-chip" data-state={chips[j]}>
                          <StepTile tool={ch.tool} lang={lang} size={16} />
                          {ch.label[lang]}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="ac-st__track" aria-hidden="true">
                      <span ref={(el) => { barRefs.current[i] = el; }} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
