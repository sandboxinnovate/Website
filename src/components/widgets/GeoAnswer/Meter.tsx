import type { Band, GeoCopy, Mode } from './copy';

interface Props {
  t: GeoCopy['meter'];
  mode: Mode;
  /** Tweened [mentions, citations, sentiment, score]. */
  values: number[];
  /** Final "before" values, drawn as a thin white line while showing "after". */
  before: [number, number, number];
  beforeScore: number;
  /** Plain-word band of the target score (not the tweened one, so the words never flicker). */
  band: Band;
  modeLabel: string;
  headingId: string;
}

const BANDS: Band[] = ['low', 'mid', 'high'];
const pct = (v: number) => `${Math.max(0, Math.min(100, v)).toFixed(1)}%`;

/**
 * Side panel: one big number with a plain-word reading ("Hard to find"), a simple Low / Medium / High
 * bar, and three labelled bars that animate between before and after.
 */
export default function Meter({ t, mode, values, before, beforeScore, band, modeLabel, headingId }: Props) {
  const [mentions, citations, sentiment, score] = values;
  const delta = Math.round(score - beforeScore);
  const rows = [
    { key: 'mentions', ...t.bars.mentions, v: mentions, b: before[0], text: `${Math.round(mentions)}%` },
    { key: 'citations', ...t.bars.citations, v: citations, b: before[1], text: `${Math.round(citations)}%` },
    { key: 'sentiment', ...t.bars.sentiment, v: sentiment, b: before[2], text: t.sentiment[mode] },
  ];
  const reading = t.band[band];

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

      <div className="ga-score" data-band={band}>
        <div className="ga-score__num">
          <span className="ga-score__val">{Math.round(score)}</span>
          <span className="ga-score__max">{t.outOf}</span>
        </div>
        <p className="ga-score__band">
          <span className="ga-score__dot" aria-hidden="true" />
          {reading.name}
        </p>
        <p className="ga-score__text">{reading.text}</p>
        <div
          className="ga-scale"
          role="meter"
          aria-label={t.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(score)}
          aria-valuetext={`${Math.round(score)} ${t.outOf}. ${reading.name}`}
        >
          <span className="ga-scale__track" aria-hidden="true">
            <span className="ga-scale__fill" style={{ width: pct(score) }} />
            <span className="ga-scale__cut" style={{ left: '30%' }} />
            <span className="ga-scale__cut" style={{ left: '60%' }} />
          </span>
          <span className="ga-scale__labels" aria-hidden="true">
            {BANDS.map((b) => (
              <span key={b} data-on={b === band ? '' : undefined}>
                {t.scale[b]}
              </span>
            ))}
          </span>
        </div>
        <p className="ga-score__delta" data-on={mode === 'after' && delta > 0 ? '' : undefined} aria-hidden={mode !== 'after'}>
          {t.delta(Math.max(0, delta))}
        </p>
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
        <ul>
          {t.levers.map((l, i) => (
            <li key={i}>
              <svg className="ga-levers__ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
