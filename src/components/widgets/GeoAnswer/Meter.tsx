import type { CSSProperties } from 'react';
import type { GeoCopy, Mode } from './copy';

interface Props {
  t: GeoCopy['meter'];
  mode: Mode;
  /** Tweened [mentions, citations, sentiment, score]. */
  values: number[];
  /** Final "before" values, drawn as a ghost marker while showing "after". */
  before: [number, number, number];
  beforeScore: number;
  modeLabel: string;
  headingId: string;
}

const SEGMENTS = 24;

/** Side panel: illustrative visibility score + three bars that animate between before and after. */
export default function Meter({ t, mode, values, before, beforeScore, modeLabel, headingId }: Props) {
  const [mentions, citations, sentiment, score] = values;
  const lit = Math.round((score / 100) * SEGMENTS);
  const delta = Math.round(score - beforeScore);
  const rows = [
    { key: 'mentions', ...t.bars.mentions, v: mentions, b: before[0], text: `${Math.round(mentions)}%` },
    { key: 'citations', ...t.bars.citations, v: citations, b: before[1], text: `${Math.round(citations)}%` },
    { key: 'sentiment', ...t.bars.sentiment, v: sentiment, b: before[2], text: `${t.sentiment[mode]} · ${Math.round(sentiment)}` },
  ];

  return (
    <section className="ga-meter" aria-labelledby={headingId}>
      <header className="ga-meter__head">
        <h3 className="ga-meter__title" id={headingId}>
          {t.title}
        </h3>
        <span className="ga-meter__mode" data-mode={mode}>
          {modeLabel}
        </span>
      </header>
      <p className="ga-meter__sub">{t.sub}</p>

      <div className="ga-score">
        <div className="ga-score__num">
          <span className="ga-score__val">{Math.round(score)}</span>
          <span className="ga-score__max">/100</span>
          <span className="ga-score__delta" data-on={mode === 'after' && delta > 0 ? '' : undefined} aria-hidden={mode !== 'after'}>
            +{Math.max(0, delta)}
          </span>
        </div>
        <span className="ga-score__label">{t.score}</span>
        <div className="ga-score__seg" aria-hidden="true">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span key={i} data-on={i < lit ? '' : undefined} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>

      <ul className="ga-bars">
        {rows.map((r) => (
          <li key={r.key} className="ga-barrow">
            <div className="ga-barrow__top">
              <span className="ga-barrow__label">{r.label}</span>
              <span className="ga-barrow__val">{r.text}</span>
            </div>
            <span className="ga-barrow__desc">{r.desc}</span>
            <span
              className="ga-barrow__track"
              role="meter"
              aria-label={r.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(r.v)}
              aria-valuetext={r.text}
            >
              <span className="ga-barrow__fill" style={{ transform: `scaleX(${Math.max(0, Math.min(1, r.v / 100)).toFixed(4)})` }} />
              <span className="ga-barrow__ghost" data-on={mode === 'after' ? '' : undefined} style={{ left: `${r.b.toFixed(1)}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="ga-legend" data-on={mode === 'after' ? '' : undefined} aria-hidden="true">
        <span className="ga-legend__mark" />
        {t.beforeMark}
      </p>

      <div className="ga-pos" data-mode={mode}>
        <span className="ga-pos__label">{t.position}</span>
        <span className="ga-pos__val">
          <span className="ga-pos__dot" aria-hidden="true" />
          {t.positionValue[mode]}
        </span>
      </div>

      <div className="ga-levers">
        <span className="ga-levers__title">{t.leversTitle}</span>
        <ol>
          {t.levers.map((l, i) => (
            <li key={i}>
              <span className="ga-levers__n" aria-hidden="true">
                0{i + 1}
              </span>
              <span>{l}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
