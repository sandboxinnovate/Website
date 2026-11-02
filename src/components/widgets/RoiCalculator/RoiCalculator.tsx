import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { localize, type Lang } from '@/i18n';
import { ICONS } from '@/components/ui/icons';
import { COPY, fteText, type Seg } from './copy';
import {
  CURRENCIES, DEFAULTS, compute, currencySymbol, fmtFte, fmtInt, fmtMoney, handoffQuery, niceCeil,
  type Currency, type FieldId, type Inputs,
} from './model';
import { useDebounced, useReducedMotion, useSeenOnce, useStoredChoice, useTween } from './hooks';
import RangeField from './RangeField';
import Chart from './Chart';
import Dots from './Dots';
import './roi.css';

const STORE_KEY = 'sbx:roi:currency';

function Ico({ name, size = 16 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

function Sentence({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => (typeof s === 'string' ? <span key={i}>{s}</span> : <strong key={i}>{s.b}</strong>))}
    </>
  );
}

/**
 * "What could AI give back to your team?": a transparent estimator.
 * Four inputs → hours given back, value of that time (the client's own cost), FTE equivalent,
 * a 12-month cumulative curve with a rollout ramp, and a dot matrix of reclaimed time.
 * Never shows Sandbox prices: the only money on screen is what the team's time costs today.
 */
export default function RoiCalculator({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const outRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Count-up and chart draw start when the results (not just the inputs) are on screen.
  const seen = useSeenOnce(outRef, 0.15);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [cur, setCur] = useStoredChoice<Currency>(STORE_KEY, 'USD', CURRENCIES);
  const [tipOpen, setTipOpen] = useState(false);

  const set = useCallback((id: FieldId) => (v: number) => setInputs((p) => (p[id] === v ? p : { ...p, [id]: v })), []);
  const setters = useMemo(
    () => ({ people: set('people'), hours: set('hours'), rate: set('rate'), automation: set('automation') }),
    [set],
  );

  const r = useMemo(() => compute(inputs), [inputs]);
  const yMax = niceCeil(r.fullPace[11] || 1);

  // Numbers render final on the server and on hydration (no 0 → n count-up); after that, edits
  // morph from the previous values. The chart still draws itself in when first seen.
  const target = [r.hoursBack, r.value, r.fte, yMax, ...r.cumulative, ...r.fullPace];
  const tw = useTween(target, { duration: 700, instant: reduced });
  const [twHours, twValue, twFte, twYMax] = tw;
  const twCum = tw.slice(4, 16);
  const twFull = tw.slice(16, 28);

  // Close the info popover on Escape / outside click.
  const tipRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!tipOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setTipOpen(false);
    const onDown = (e: PointerEvent) => {
      if (tipRef.current && !tipRef.current.contains(e.target as Node)) setTipOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [tipOpen]);

  const sym = currencySymbol(lang, cur);
  const money = (n: number) => fmtMoney(lang, cur, n);
  const fteFmt = fmtFte(lang, r.fte);
  const fteSentence = fteText(lang, r.fte, fteFmt);

  const sentence = t.sentence({
    people: fmtInt(lang, inputs.people),
    peopleN: inputs.people,
    hours: fmtInt(lang, inputs.hours),
    hoursN: inputs.hours,
    automation: String(inputs.automation),
    hoursBack: fmtInt(lang, r.hoursBack),
    value: money(r.value),
    fte: r.fte,
    fteText: fteSentence,
  });

  const liveText = t.live({ hoursBack: fmtInt(lang, r.hoursBack), value: money(r.value), fteText: fteSentence });
  const announced = useDebounced(liveText, 900);
  const [live, setLive] = useState('');
  const firstAnnounce = useRef(true);
  useEffect(() => {
    // Skip the initial value: only announce what the visitor changed.
    if (firstAnnounce.current) {
      firstAnnounce.current = false;
      return;
    }
    setLive(announced);
  }, [announced]);

  const planHref = `${localize(lang, '/contact')}?${handoffQuery(inputs, cur)}`;
  const diagHref = localize(lang, '/diagnostic');
  const isDefault = (Object.keys(DEFAULTS) as FieldId[]).every((k) => DEFAULTS[k] === inputs[k]);
  const tipId = `roi-tip-${uid}`;

  return (
    <div className="roi" data-seen={seen ? '' : undefined} role="group" aria-label={t.aria}>
      {/* ── window bar ─────────────────────────────── */}
      <div className="roi-bar">
        <div className="roi-bar__path">
          <span className="roi-bar__glyph" aria-hidden="true">
            <Ico name="chart" size={14} />
          </span>
          <span className="roi-bar__crumb">{t.bar.path}</span>
          <span className="roi-bar__sep" aria-hidden="true">/</span>
          <span className="roi-bar__file">{t.bar.file}</span>
        </div>
        <div className="roi-bar__right">
          <div className="roi-seg" role="radiogroup" aria-label={t.bar.currencyAria}>
            <span className="roi-seg__label" aria-hidden="true">{t.bar.currency}</span>
            {CURRENCIES.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={cur === c}
                tabIndex={cur === c ? 0 : -1}
                className="roi-seg__btn"
                onClick={() => setCur(c)}
                onKeyDown={(e) => {
                  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                    e.preventDefault();
                    const next = CURRENCIES[(CURRENCIES.indexOf(c) + 1) % CURRENCIES.length];
                    setCur(next);
                    const sib = (e.currentTarget.parentElement?.querySelectorAll('button') ?? [])[CURRENCIES.indexOf(next)] as HTMLButtonElement | undefined;
                    sib?.focus();
                  }
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="roi-pill">{t.bar.estimate}</span>
        </div>
      </div>

      <div className="roi-body">
        {/* ── inputs ─────────────────────────────── */}
        <section className="roi-in" aria-labelledby={`${uid}-in`}>
          <header className="roi-panel__head">
            <h3 className="roi-panel__title" id={`${uid}-in`}>
              <span aria-hidden="true">[A]</span> {t.inputsTitle}
            </h3>
            <button
              type="button"
              className="roi-reset"
              onClick={() => setInputs(DEFAULTS)}
              disabled={isDefault}
              aria-label={t.resetAria}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
                <path d="M4.5 4.5v3.2h3.2" />
              </svg>
              <span>{t.reset}</span>
            </button>
          </header>

          <div className="roi-fields">
            <RangeField
              field="people"
              index="01"
              label={t.fields.people.label}
              value={inputs.people}
              onChange={setters.people}
              unit={t.fields.people.unit(inputs.people)}
              valueText={t.fields.people.valueText(fmtInt(lang, inputs.people), inputs.people)}
              formatValue={(v) => fmtInt(lang, v)}
            />
            <RangeField
              field="hours"
              index="02"
              label={t.fields.hours.label}
              hint={t.fields.hours.hint}
              value={inputs.hours}
              onChange={setters.hours}
              unit={t.fields.hours.unit(inputs.hours)}
              valueText={t.fields.hours.valueText(String(inputs.hours), inputs.hours)}
            />
            <RangeField
              field="rate"
              index="03"
              label={t.fields.rate.label}
              hint={t.fields.rate.hint}
              value={inputs.rate}
              onChange={setters.rate}
              prefix={sym}
              unit={`${cur} / h`}
              valueText={t.fields.rate.valueText(money(inputs.rate), inputs.rate)}
              formatTick={(v) => `${sym}${v}`}
            />
            <RangeField
              field="automation"
              index="04"
              label={t.fields.automation.label}
              value={inputs.automation}
              onChange={setters.automation}
              unit="%"
              valueText={t.fields.automation.valueText(String(inputs.automation), inputs.automation)}
              bandLabel={t.band}
              formatTick={(v) => `${v}%`}
              aside={
                <span className="roi-tip" ref={tipRef}>
                  <button
                    type="button"
                    className="roi-tip__btn"
                    aria-expanded={tipOpen}
                    aria-controls={tipId}
                    aria-label={t.tip.label}
                    onClick={() => setTipOpen((o) => !o)}
                  >
                    <span aria-hidden="true">i</span>
                  </button>
                  <span className="roi-tip__pop" id={tipId} role="note" data-open={tipOpen ? '' : undefined} hidden={!tipOpen}>
                    <span className="roi-tip__title">{t.tip.title}</span>
                    {t.tip.body}
                  </span>
                </span>
              }
            />
          </div>
        </section>

        {/* ── outputs ─────────────────────────────── */}
        <section className="roi-out" ref={outRef} aria-labelledby={`${uid}-out`}>
          <header className="roi-panel__head">
            <h3 className="roi-panel__title" id={`${uid}-out`}>
              <span aria-hidden="true">[B]</span> {t.outputsTitle}
            </h3>
            <span className="roi-panel__meta">{t.outputsMeta}</span>
          </header>

          <dl className="roi-kpis">
            <div className="roi-kpi roi-kpi--hero">
              <dt>{t.kpi.hours.label}</dt>
              <dd>
                <span className="roi-kpi__num">{fmtInt(lang, twHours)}</span>
                <span className="roi-kpi__unit">{t.kpi.hours.unit}</span>
              </dd>
            </div>
            <div className="roi-kpi">
              <dt>{t.kpi.value.label}</dt>
              <dd>
                <span className="roi-kpi__num">{money(twValue)}</span>
                <span className="roi-kpi__unit">{t.kpi.value.unit(cur)}</span>
              </dd>
            </div>
            <div className="roi-kpi">
              <dt>{t.kpi.fte.label}</dt>
              <dd>
                <span className="roi-kpi__num">{fmtFte(lang, twFte)}</span>
                <span className="roi-kpi__unit">{t.kpi.fte.unit(r.fte)}</span>
              </dd>
            </div>
          </dl>

          <p className="roi-sentence">
            <Sentence segs={sentence} />
          </p>

          <div className="roi-viz">
            <Chart
              lang={lang}
              t={t.chart}
              cur={cur}
              cumulative={twCum}
              fullPace={twFull}
              yMax={twYMax || yMax}
              yMaxTarget={yMax}
              year1={r.year1}
              annual={r.value}
              reveal={seen}
              reduced={reduced}
            />
            <Dots lang={lang} t={t.dots} total={r.totalHours} back={r.hoursBack} automation={inputs.automation} reveal={seen} />
          </div>
        </section>
      </div>

      {/* ── footer ─────────────────────────────── */}
      <div className="roi-foot">
        <p className="roi-foot__note">
          <span className="roi-foot__dot" aria-hidden="true" />
          <span>
            <b>{t.disclaimer}</b> {t.assumptions}
          </span>
        </p>
        <div className="roi-foot__ctas">
          <a className="btn btn-ghost btn-sm roi-cta" href={diagHref}>
            {t.cta.secondary}
            <span className="btn-chip">
              <Ico name="arrow-up-right" />
            </span>
          </a>
          <a className="btn btn-primary btn-sm roi-cta" href={planHref}>
            {t.cta.primary}
            <span className="btn-chip">
              <Ico name="arrow-up-right" />
            </span>
          </a>
        </div>
      </div>

      <div className="sr-only-roi" role="status" aria-live="polite" aria-atomic="true">
        {live}
      </div>
    </div>
  );
}
