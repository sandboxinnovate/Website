import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { localize, type Lang } from '@/i18n';
import { COPY } from './copy';
import { ARCHETYPES, DIMS, HANDOFF_PARAM, LEVELS, QUESTIONS, archetypeScore } from './model';
import { useInView, usePageVisible, useReducedMotion, useTween } from './hooks';
import Radar from './Radar';
import Ico from './Ico';

const CYCLE_MS = 3000;

/**
 * ~560×520 teaser card: a mini radar morphing between illustrative maturity profiles,
 * plus question 1 rendered live. Picking an answer opens the full diagnostic at question 2.
 * Options are real links, so the hand-off works before hydration and without JS.
 */
export default function Teaser({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const rootRef = useRef<HTMLDivElement>(null);
  const qId = `${useId().replace(/[^a-zA-Z0-9]/g, '')}-q`;
  const reduced = useReducedMotion();
  const inView = useInView(rootRef, 0.15);
  const visible = usePageVisible();
  const [idx, setIdx] = useState(1);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !inView || !visible || picked !== null) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % ARCHETYPES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView, visible, picked]);

  const arche = ARCHETYPES[idx];
  const levelI = LEVELS.findIndex((l) => l.id === arche.level);
  const anim = useTween(arche.dims, { duration: 1100, instant: reduced });
  const shown = archetypeScore(anim);

  const q = QUESTIONS[0];
  const qc = t.questions[q.id];
  const base = localize(lang, '/diagnostic');
  const hrefFor = (i: number) => `${base}?${HANDOFF_PARAM}=${i + 1}#run`;

  const onPick = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (picked !== null) return;
    setPicked(i);
    const go = () => window.location.assign(hrefFor(i));
    if (reduced) go();
    else window.setTimeout(go, 520);
  };

  return (
    <div ref={rootRef} className="rd rd-teaser" data-picked={picked !== null ? '' : undefined}>
      <div className="rd-teaser__glow" aria-hidden="true" />

      <div className="rd-teaser__bar">
        <span className="rd-teaser__kicker">
          <span className="rd-pulse" aria-hidden="true" />
          {t.teaser.kicker}
        </span>
        <span className="rd-teaser__meta">{t.teaser.meta}</span>
      </div>

      <div className="rd-teaser__profile">
        <div className="rd-teaser__radar" role="img" aria-label={t.teaser.sampleAria}>
          <Radar
            size="sm"
            values={anim.map((v) => Math.max(0, v))}
            labels={DIMS.map((d) => t.dims[d].short)}
            instant
            threshold={null}
          />
        </div>
        <div className="rd-teaser__info" aria-hidden="true">
          <span className="rd-teaser__illus">{t.teaser.illustrative}</span>
          <span className="rd-teaser__headline">
            <span className="rd-teaser__level" key={arche.level}>
              {t.levels[arche.level].name}
            </span>
            <span className="rd-teaser__score">
              <b>{shown}</b>
              <i>{t.teaser.scoreUnit}</i>
            </span>
          </span>
          <ul className="rd-teaser__legend">
            {DIMS.map((d, i) => (
              <li key={d}>
                <span>{t.dims[d].short}</span>
                <span className="n">{t.dims[d].name}</span>
                <span className="b">
                  <i style={{ transform: `scaleX(${Math.max(0, anim[i] ?? 0) / 100})` }} />
                </span>
                <span className="v">{Math.round(Math.max(0, anim[i] ?? 0))}</span>
              </li>
            ))}
          </ul>
          <span className="rd-teaser__ladder">
            {LEVELS.map((l, i) => (
              <span key={l.id} data-on={i <= levelI ? '' : undefined} data-current={i === levelI ? '' : undefined} />
            ))}
          </span>
        </div>
      </div>

      <div className="rd-teaser__q">
        <p className="rd-teaser__qmeta">
          <span>{t.counter(1, QUESTIONS.length)}</span>
          <span>{t.dims[q.dim].name}</span>
        </p>
        <p id={qId} className="rd-teaser__qtext">
          {qc.text}
        </p>
        <ul className="rd-teaser__opts" aria-labelledby={qId}>
          {qc.options.map((o, i) => (
            <li key={i} style={{ ['--i' as string]: i } as CSSProperties}>
              <a
                href={hrefFor(i)}
                className="rd-topt"
                data-selected={picked === i ? '' : undefined}
                aria-current={picked === i ? 'true' : undefined}
                onClick={onPick(i)}
              >
                <span className="rd-topt__key" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="rd-topt__text">{o}</span>
                <span className="rd-topt__go" aria-hidden="true">
                  <Ico name={picked === i ? 'check' : 'arrow-right'} size={14} stroke={2} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rd-teaser__foot">
        <span className="rd-teaser__prompt" aria-live="polite">
          {picked !== null ? (
            <>
              {t.teaser.opening}
              <span className="rd-dots" aria-hidden="true" />
            </>
          ) : (
            t.teaser.prompt
          )}
        </span>
        <a href={`${base}#run`} className="rd-teaser__open">
          {t.teaser.open}
          <Ico name="arrow-up-right" size={14} />
        </a>
      </div>
    </div>
  );
}
