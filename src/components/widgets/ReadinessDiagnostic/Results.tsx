import { useEffect, useId, type CSSProperties, type Ref } from 'react';
import { localize, type Lang } from '@/i18n';
import { unitBySlug } from '@/data/site';
import { COPY } from './copy';
import { DIMS, LEVELS, type Answers, type Result } from './model';
import Gauge from './Gauge';
import Radar from './Radar';
import LeadForm from './LeadForm';
import Ico from './Ico';

interface Props {
  lang: Lang;
  result: Result;
  answers: Answers;
  sentTo: string | null;
  onSent: (email: string) => void;
  reduced: boolean;
  headingRef: Ref<HTMLHeadingElement>;
}

export default function Results({ lang, result, answers, sentTo, onSent, reduced, headingRef }: Props) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const level = LEVELS[result.level];
  const levelCopy = t.levels[level.id];
  const next = LEVELS[result.level + 1];
  const strongest = result.ranked[result.ranked.length - 1];
  const weakest = result.ranked[0];
  const balanced = result.dims[strongest] === result.dims[weakest];
  /** Contact with the result attached: the units behind the three moves, the score and the level. */
  const talkHref = localize(
    lang,
    `/contact?service=${[...new Set(result.moves.map((m) => m.unit))].join(',')}&from=diagnostic&score=${result.score}&level=${result.levelId}`,
  );

  // Let the page (e.g. the closing CTA on /diagnostic) point at the same hand-off.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('sbx:diagnostic-result', { detail: { href: talkHref } }));
  }, [talkHref]);
  const dimNames = DIMS.map((d) => t.dims[d].name);
  const radarAria = t.radarAria(DIMS.map((d) => `${t.dims[d].name} ${result.dims[d]}`).join(', '));

  return (
    <div className="rd-res">
      <div className="rd-res__top">
        <section className="rd-res__score" aria-labelledby={`${uid}-level`}>
          <div className="rd-res__level">
            <p className="rd-mono rd-mono--flame">{t.levelOf(result.level + 1, LEVELS.length)}</p>
            <h2 id={`${uid}-level`} ref={headingRef} tabIndex={-1} className="rd-res__name">
              {levelCopy.name}
            </h2>
          </div>
          <div className="rd-res__head">
            <Gauge
              score={result.score}
              level={result.level}
              label={t.scoreLabel}
              unit={t.outOf}
              ariaLabel={t.gaugeAria(result.score, levelCopy.name)}
              instant={reduced}
            />
            <p className="rd-res__text">{levelCopy.text}</p>
          </div>
          {balanced ? (
            <p className="rd-res__sw rd-res__sw--one">{t.balanced(result.dims[strongest])}</p>
          ) : (
            <dl className="rd-res__sw">
              <div>
                <dt>{t.strongest}</dt>
                <dd>
                  {t.dims[strongest].name} <b>{result.dims[strongest]}</b>
                </dd>
              </div>
              <div>
                <dt>{t.weakest}</dt>
                <dd>
                  {t.dims[weakest].name} <b>{result.dims[weakest]}</b>
                </dd>
              </div>
            </dl>
          )}
          <ol className="rd-ladder" aria-label={t.ladderLabel}>
            {LEVELS.map((l, i) => (
              <li
                key={l.id}
                data-state={i < result.level ? 'past' : i === result.level ? 'current' : 'future'}
                aria-current={i === result.level ? 'step' : undefined}
                style={{ ['--i' as string]: i } as CSSProperties}
              >
                <span className="rd-ladder__bar" />
                <span className="rd-ladder__name">{t.levels[l.id].name}</span>
                <span className="rd-ladder__range">
                  {l.min}-{l.max}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rd-res__radar" aria-label={t.byDimension}>
          <p className="rd-mono">{t.byDimension}</p>
          <Radar
            values={DIMS.map((d) => result.dims[d])}
            labels={dimNames}
            size="lg"
            showValues
            threshold={next ? next.min : 80}
            intro
            instant={reduced}
            ariaLabel={radarAria}
          />
          <p className="rd-res__legend">
            <svg width="22" height="6" viewBox="0 0 22 6" aria-hidden="true">
              <line x1="0" y1="3" x2="22" y2="3" />
            </svg>
            {next ? t.thresholdNote(t.levels[next.id].name, next.min) : t.topLevelNote}
          </p>
        </section>
      </div>

      <section className="rd-moves" aria-labelledby={`${uid}-moves`}>
        <header className="rd-moves__head">
          <h3 id={`${uid}-moves`} className="rd-moves__title">
            {t.movesTitle}
          </h3>
          <p className="rd-moves__lede">{t.movesLede}</p>
          <a className="btn btn-primary btn-sm rd-moves__cta" href={talkHref}>
            <span>{t.talkCta}</span>
            <span className="btn-chip">
              <Ico name="arrow-up-right" size={16} />
            </span>
          </a>
        </header>
        <ol className="rd-moves__list">
          {result.moves.map((m, i) => {
            const unit = unitBySlug(m.unit);
            const mv = t.moves[m.id];
            return (
              <li key={m.id} className="rd-move" style={{ ['--i' as string]: i } as CSSProperties}>
                <div className="rd-move__head">
                  <span className="rd-move__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rd-move__hz">{t.horizons[i]}</span>
                  <span className="rd-move__why">
                    {m.dim ? t.triggeredBy(t.dims[m.dim].name, result.dims[m.dim]) : t.triggeredByOverall(result.score)}
                  </span>
                </div>
                <h4 className="rd-move__title">{mv.title}</h4>
                <p className="rd-move__body">{mv.body}</p>
                {unit && (
                  <div className="rd-move__foot">
                    <a href={localize(lang, `/services/${m.unit}`)} className="rd-chip-link">
                      <span className="rd-chip-link__code">{unit.code}</span>
                      {t.seeUnit(unit.name[lang])}
                      <Ico name="arrow-up-right" size={14} />
                    </a>
                    {m.unit === 'products' && <span className="rd-move__tag">{t.earlyAccess}</span>}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <LeadForm lang={lang} result={result} answers={answers} sentTo={sentTo} onSent={onSent} talkHref={talkHref} />
    </div>
  );
}
