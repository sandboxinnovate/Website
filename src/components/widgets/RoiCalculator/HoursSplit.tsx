import type { Lang } from '@/i18n';
import type { RoiCopy, Seg } from './copy';
import { fmtInt } from './model';

interface Props {
  lang: Lang;
  t: RoiCopy['split'];
  /** Repetitive hours a year, before AI (tweened). */
  total: number;
  /** Hours a year given back (tweened). */
  back: number;
  /** Final values, for the accessible summary. */
  finalTotal: number;
  finalBack: number;
  automation: number;
  reveal: boolean;
}

function Segs({ segs }: { segs: Seg[] }) {
  return <>{segs.map((s, i) => (typeof s === 'string' ? <span key={i}>{s}</span> : <strong key={i}>{s.b}</strong>))}</>;
}

/** One simple bar: hours that come back to the team vs hours still done by hand. */
export default function HoursSplit({ lang, t, total, back, finalTotal, finalBack, automation, reveal }: Props) {
  const share = total > 0 ? Math.min(1, back / total) : 0;
  const manual = Math.max(0, total - back);

  return (
    <div className="roi-split">
      <span className="roi-viz__title">{t.title}</span>
      <p className="roi-split__intro">
        <Segs segs={t.intro(fmtInt(lang, total))} />
      </p>
      <div
        className="roi-split__bar"
        role="img"
        aria-label={t.aria({ back: fmtInt(lang, finalBack), total: fmtInt(lang, finalTotal), pct: `${automation}%` })}
      >
        <span className="roi-split__back" style={{ width: `${(reveal ? share : 0) * 100}%` }}>
          <span className="roi-split__pct">{automation}%</span>
        </span>
      </div>
      <div className="roi-split__legend" aria-hidden="true">
        <span className="roi-split__key roi-split__key--back">
          <span className="roi-split__swatch" />
          <span>
            <span className="roi-split__keylabel">{t.back}</span>
            <b>{fmtInt(lang, back)} h</b>
          </span>
        </span>
        <span className="roi-split__key roi-split__key--manual">
          <span className="roi-split__swatch" />
          <span>
            <span className="roi-split__keylabel">{t.manual}</span>
            <b>{fmtInt(lang, manual)} h</b>
          </span>
        </span>
      </div>
    </div>
  );
}
