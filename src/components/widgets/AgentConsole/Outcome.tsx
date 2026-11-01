import { useRef } from 'react';
import type { Lang } from '@/i18n';
import type { ConsoleCopy } from './copy';
import { pickS, type ScenarioDef } from './scenarios';
import { TYPE_MS, fmtSec, useFrame, type FrameRegistry, type Timeline } from './engine';
import Ico from './Ico';

interface Props {
  sc: ScenarioDef;
  tl: Timeline;
  lang: Lang;
  ui: ConsoleCopy;
  open: boolean;
  elapsed: number;
  reg: FrameRegistry;
}

/** Final card: time, three facts, and the artifact the run produced, typed out. */
export default function Outcome({ sc, tl, lang, ui, open, elapsed, reg }: Props) {
  const o = sc.outcome;
  const body = o.artifact.body[lang];
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const last = useRef(-1);

  useFrame(reg, (e) => {
    const el = typedRef.current;
    if (!el) return;
    const n = Math.max(0, Math.min(body.length, Math.floor((e.cursor - tl.typeStart) / TYPE_MS)));
    if (n === last.current && el.dataset.src === body) return;
    const justFinished = el.dataset.src === body && last.current >= 0 && last.current < body.length && n === body.length;
    last.current = n;
    el.dataset.src = body;
    el.textContent = body.slice(0, n);
    if (caretRef.current) caretRef.current.dataset.on = n > 0 && n < body.length ? '' : 'off';
    const box = boxRef.current;
    if (!box) return;
    if (n < body.length) box.scrollTop = box.scrollHeight;
    else if (n === 0 || !justFinished) box.scrollTop = 0;
    // Once typed, glide back to the top so the subject and greeting stay in view.
    if (justFinished) window.setTimeout(() => box.scrollTo({ top: 0, behavior: 'smooth' }), 1100);
  });

  return (
    <div className="ac-out" data-open={open ? '' : undefined} aria-hidden={open ? undefined : true} inert={!open}>
      <div className="ac-out__inner">
        <div className="ac-out__card">
          <div className="ac-out__head">
            <span className="ac-out__ok" aria-hidden="true"><Ico name="check" size={14} stroke={2.2} /></span>
            <p className="ac-out__title">
              <span className="ac-out__eyebrow">{ui.outcome}</span>
              {o.headline[lang].replace('{t}', fmtSec(elapsed, lang))}
            </p>
            <span className="ac-out__base">{o.baseline[lang]}</span>
          </div>
          <dl className="ac-out__stats">
            {o.stats.map((s, i) => (
              <div key={i} className="ac-out__stat">
                <dt>{s.label[lang]}</dt>
                <dd>{pickS(s.value, lang)}</dd>
              </div>
            ))}
          </dl>
          <figure className="ac-art">
            <figcaption className="ac-art__cap">
              <b>{o.artifact.label[lang]}</b>
              <span className="ac-art__meta">
                {o.artifact.subject ? `${ui.to}: ` : ''}
                {pickS(o.artifact.meta, lang)}
              </span>
            </figcaption>
            <div className="ac-art__box" ref={boxRef}>
              {o.artifact.subject && <p className="ac-art__subj">{o.artifact.subject[lang]}</p>}
              <p className="ac-art__body">
                <span ref={typedRef} aria-hidden="true" />
                <span ref={caretRef} className="ac-caret" aria-hidden="true" data-on="off" />
                <span className="ac-sr">{body}</span>
              </p>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
