import { useRef } from 'react';
import type { Lang } from '@/i18n';
import type { ConsoleCopy } from './copy';
import type { ScenarioDef } from './scenarios';
import { chipStates, clamp01, fmtSec, pad2, useFrame, type FrameRegistry, type NodeState, type Timeline } from './engine';
import Ico from './Ico';

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
}

/** Narrow-container version of the workflow: a vertical stepper with the active step expanded. */
export default function Stepper({ sc, tl, lang, ui, states, focus, cursor, extra, reg, resultFor }: Props) {
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
        const dur = step.dur + (step.gate ? extra : 0);
        return (
          <li key={step.id} className="ac-st" data-state={st} data-open={open ? '' : undefined}>
            <span className="ac-st__dot" aria-hidden="true">
              <Ico name={st === 'done' ? 'check' : step.icon} size={14} stroke={st === 'done' ? 2 : 1.5} />
            </span>
            <div className="ac-st__row">
              <span className="ac-st__idx">{pad2(i + 1)}</span>
              <span className="ac-st__label">{step.label[lang]}</span>
              <span className="ac-st__meta">
                <span className="ac-dot" aria-hidden="true" />
                {st === 'done' ? fmtSec(dur, lang) : ui.node[st]}
              </span>
            </div>
            <div className="ac-st__more" aria-hidden={open ? undefined : true}>
              <div className="ac-st__inner">
                <div className="ac-st__box">
                  <span className="ac-st__tool">
                    {ui.kinds[step.kind]} · {step.tool}
                  </span>
                  {st === 'done' ? (
                    <span className="ac-st__res">{resultFor(i)}</span>
                  ) : chips ? (
                    <span className="ac-node__chips">
                      {step.chips!.map((ch, j) => (
                        <span key={j} className="ac-chip" data-state={chips[j]}>
                          <span className="ac-dot" aria-hidden="true" />
                          {ch[lang]}
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
