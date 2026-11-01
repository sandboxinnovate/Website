import { useMemo, type CSSProperties } from 'react';
import type { Lang } from '@/i18n';
import type { RoiCopy } from './copy';
import { fmtInt, hoursPerDot } from './model';

export const MAX_DOTS = 120;

interface Props {
  lang: Lang;
  t: RoiCopy['dots'];
  /** Repetitive hours a year, before AI. */
  total: number;
  /** Hours a year given back. */
  back: number;
  automation: number;
  reveal: boolean;
}

/**
 * "Time reclaimed" matrix: every dot is N hours of repetitive work a year.
 * Lit dots are the share AI takes over; dim dots stay with the team.
 */
export default function Dots({ lang, t, total, back, automation, reveal }: Props) {
  const per = hoursPerDot(total, MAX_DOTS);
  const count = Math.max(1, Math.ceil(total / per));
  const lit = reveal ? Math.min(count, Math.max(back > 0 ? 1 : 0, Math.round(back / per))) : 0;
  const dots = useMemo(() => Array.from({ length: MAX_DOTS }, (_, i) => i), []);

  return (
    <div className="roi-dots">
      <div className="roi-dots__head">
        <span className="roi-dots__title">{t.title}</span>
        <span className="roi-dots__scale">{t.scale(fmtInt(lang, per))}</span>
      </div>
      <div
        className="roi-dots__grid"
        role="img"
        aria-label={t.aria({ back: fmtInt(lang, back), total: fmtInt(lang, total), pct: `${automation}%` })}
      >
        {dots.map((i) => (
          <span
            key={i}
            className="roi-dot"
            data-state={i >= count ? 'off' : i < lit ? 'lit' : 'dim'}
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </div>
      <div className="roi-dots__legend" aria-hidden="true">
        <span className="roi-key roi-key--lit">
          {t.back} <b>{fmtInt(lang, back)} h</b>
        </span>
        <span className="roi-key roi-key--dim">
          {t.manual} <b>{fmtInt(lang, Math.max(0, total - back))} h</b>
        </span>
      </div>
    </div>
  );
}
