import type { CSSProperties } from 'react';
import type { Lang } from '@/i18n';
import type { RoiCopy } from './copy';
import { fmtMoney, type Currency } from './model';

interface Props {
  lang: Lang;
  t: RoiCopy['year'];
  cur: Currency;
  /** Tweened running total at the end of months 1…12 (with the set-up months). */
  cumulative: number[];
  /** Final (not tweened) running totals, for the accessible summary. */
  finalCumulative: number[];
  reveal: boolean;
}

const SETUP_MONTHS = 3;

/**
 * "How the savings add up in year one": twelve plain columns, one per month, each showing the
 * running total saved so far. No axes or gridlines: two group labels (getting set up / full pace),
 * month labels at both ends and one clear figure for the year-one total.
 */
export default function YearBars({ lang, t, cur, cumulative, finalCumulative, reveal }: Props) {
  const max = Math.max(cumulative[11] ?? 0, 1);
  const total = cumulative[11] ?? 0;
  const money = (n: number) => fmtMoney(lang, cur, n);

  return (
    <figure className="roi-year">
      <figcaption className="roi-year__head">
        <span className="roi-viz__title">{t.title}</span>
        <span className="roi-year__total">
          <span className="roi-year__totallabel">{t.total}</span>
          <span className="roi-year__totalval">{money(total)}</span>
        </span>
        <span className="sr-only-roi">
          {t.aria({ month3: money(finalCumulative[2] ?? 0), month6: money(finalCumulative[5] ?? 0), year1: money(finalCumulative[11] ?? 0) })}
        </span>
      </figcaption>

      <div className="roi-year__plot" aria-hidden="true">
        <div className="roi-year__groups">
          <span className="roi-year__group roi-year__group--setup" style={{ flexGrow: SETUP_MONTHS }}>{t.setup}</span>
          <span className="roi-year__group" style={{ flexGrow: 12 - SETUP_MONTHS }}>{t.full}</span>
        </div>
        <div className="roi-year__bars">
          {cumulative.map((v, i) => (
            <span
              key={i}
              className="roi-year__bar"
              data-setup={i < SETUP_MONTHS ? '' : undefined}
              data-last={i === 11 ? '' : undefined}
              style={{ '--h': reveal ? Math.max(0.02, v / max).toFixed(4) : '0', '--i': i } as CSSProperties}
            />
          ))}
        </div>
        <div className="roi-year__months">
          <span>{t.month(1)}</span>
          <span>{t.month(12)}</span>
        </div>
      </div>

      <p className="roi-viz__note">{t.legend}</p>
    </figure>
  );
}
