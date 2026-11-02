import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import type { Lang } from '@/i18n';
import type { RoiCopy } from './copy';
import { fmtMoney, fmtMoneyShort, type Currency } from './model';
import { useTween, useWidth } from './hooks';

interface Props {
  lang: Lang;
  t: RoiCopy['chart'];
  cur: Currency;
  /** Tweened cumulative values, months 1…12. */
  cumulative: number[];
  /** Tweened full-pace values, months 1…12. */
  fullPace: number[];
  /** Tweened axis maximum. */
  yMax: number;
  /** Final axis maximum (sizes the label gutter without jitter while tweening). */
  yMaxTarget: number;
  /** Final (not tweened) year-one total, used for the accessible summary. */
  year1: number;
  annual: number;
  reveal: boolean;
  reduced: boolean;
}

type Pt = [number, number];

/** Monotone cubic (Fritsch-Carlson) through points, no overshoot on a cumulative curve. */
function monotonePath(pts: Pt[]): string {
  const n = pts.length;
  if (n < 2) return '';
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / (dx[i] || 1));
  }
  const tg: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) tg.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  tg.push(m[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      tg[i] = 0;
      tg[i + 1] = 0;
      continue;
    }
    const a = tg[i] / m[i];
    const b = tg[i + 1] / m[i];
    const s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      tg[i] = k * a * m[i];
      tg[i + 1] = k * b * m[i];
    }
  }
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(pts[i][0] + h).toFixed(2)},${(pts[i][1] + tg[i] * h).toFixed(2)} ${(pts[i + 1][0] - h).toFixed(2)},${(pts[i + 1][1] - tg[i + 1] * h).toFixed(2)} ${pts[i + 1][0].toFixed(2)},${pts[i + 1][1].toFixed(2)}`;
  }
  return d;
}

export default function Chart({ lang, t, cur, cumulative, fullPace, yMax, yMaxTarget, year1, annual, reveal, reduced }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const W = useWidth(wrapRef, 640);
  const narrow = W < 480;
  const H = narrow ? 160 : 176;
  // Left padding follows the widest y label ("$150K", "$150 mil", "€1.2 M").
  const yLabels = [0.5, 1].map((g) => fmtMoneyShort(lang, cur, g * yMaxTarget));
  const labelW = Math.max(...yLabels.map((l) => l.length)) * 6.1 + 14;
  const pad = { l: Math.max(narrow ? 38 : 46, Math.round(labelW)), r: narrow ? 8 : 10, t: 10, b: 24 };
  const iw = Math.max(10, W - pad.l - pad.r);
  const ih = H - pad.t - pad.b;
  const x = (m: number) => pad.l + (m / 12) * iw;
  const y = (v: number) => pad.t + ih - (yMax > 0 ? (v / yMax) * ih : 0);

  const ids = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? 12;

  // Left-to-right draw the first time the chart is seen.
  const [drawn] = useTween([reveal ? 1 : 0], { duration: 1500, from: [0], instant: reduced });

  // Small pulse on the end marker whenever the result changes.
  const [pulseKey, setPulseKey] = useState(0);
  const lastYear1 = useRef(year1);
  useEffect(() => {
    if (Math.abs(lastYear1.current - year1) < 0.5) return;
    lastYear1.current = year1;
    const id = window.setTimeout(() => setPulseKey((k) => k + 1), 380);
    return () => window.clearTimeout(id);
  }, [year1]);

  const pts: Pt[] = [[x(0), y(0)], ...cumulative.map((v, i) => [x(i + 1), y(v)] as Pt)];
  const line = monotonePath(pts);
  const area = `${line}L${x(12).toFixed(2)},${y(0).toFixed(2)}L${x(0).toFixed(2)},${y(0).toFixed(2)}Z`;
  const fullEnd = fullPace[11] ?? 0;

  const grid = [0.25, 0.5, 0.75, 1];
  const labelled = [0, 0.5, 1];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const showMonth = (m: number) => !narrow || m % 3 === 0 || m === 1;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const m = Math.round(((px - pad.l) / iw) * 12);
    setHover(Math.min(12, Math.max(1, m)));
  };

  const activeVal = cumulative[active - 1] ?? 0;
  const ax = x(active);
  const ay = y(activeVal);
  const endX = x(12);
  const endY = y(cumulative[11] ?? 0);

  return (
    <figure className="roi-chart" aria-labelledby={`${ids}-cap`}>
      <figcaption className="roi-chart__head" id={`${ids}-cap`}>
        <span className="roi-chart__title">{t.title}</span>
        <span className="roi-chart__readout" aria-hidden="true">
          <span className="roi-chart__readlabel">{hover ? t.readout(active) : t.year1}</span>
          <span className="roi-chart__readval">{fmtMoney(lang, cur, activeVal)}</span>
        </span>
        <span className="sr-only-roi">{t.aria({ year1: fmtMoney(lang, cur, year1), full: fmtMoney(lang, cur, annual) })}</span>
      </figcaption>

      <div className="roi-chart__plot" ref={wrapRef} style={{ height: H }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
          focusable="false"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={`${ids}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f58327" stopOpacity="0.34" />
              <stop offset="55%" stopColor="#d94c00" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#d94c00" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${ids}-line`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d65805" />
              <stop offset="60%" stopColor="#f58327" />
              <stop offset="100%" stopColor="#fca800" />
            </linearGradient>
            <clipPath id={`${ids}-clip`}>
              <rect x="0" y="0" width={pad.l + iw * drawn + 8} height={H} />
            </clipPath>
            <filter id={`${ids}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* grid */}
          <line x1={pad.l} x2={pad.l + iw} y1={y(0)} y2={y(0)} className="roi-chart__axis" />
          {grid.map((g) => (
            <line key={g} x1={pad.l} x2={pad.l + iw} y1={y(g * yMax)} y2={y(g * yMax)} className="roi-chart__grid" />
          ))}
          {labelled.map((g) => (
            <text key={g} x={pad.l - 10} y={y(g * yMax) + 3.5} textAnchor="end" className="roi-chart__ylab">
              {g === 0 ? '0' : fmtMoneyShort(lang, cur, g * yMax)}
            </text>
          ))}

          {/* month ticks */}
          {months.map((m) => (
            <g key={m}>
              <line x1={x(m)} x2={x(m)} y1={y(0)} y2={y(0) + (showMonth(m) ? 5 : 3)} className="roi-chart__tick" />
              {showMonth(m) && (
                <text x={x(m)} y={H - 6} textAnchor={m === 12 ? 'end' : 'middle'} className="roi-chart__xlab" data-on={m === active ? '' : undefined}>
                  {t.monthShort(m)}
                </text>
              )}
            </g>
          ))}

          {/* rollout shading: months 1-3 */}
          <rect x={x(0)} y={pad.t} width={x(3) - x(0)} height={ih} className="roi-chart__rampzone" />
          <line x1={x(3)} x2={x(3)} y1={pad.t} y2={y(0)} className="roi-chart__rampedge" />
          <text x={x(0) + 8} y={pad.t + 13} className="roi-chart__ramplab">
            {t.rollout}
          </text>

          <g clipPath={`url(#${ids}-clip)`}>
            {/* full pace (dashed reference) */}
            <line x1={x(0)} y1={y(0)} x2={x(12)} y2={y(fullEnd)} className="roi-chart__full" />
            <path d={area} fill={`url(#${ids}-area)`} />
            <path d={line} stroke={`url(#${ids}-line)`} strokeWidth="5" fill="none" opacity="0.35" filter={`url(#${ids}-glow)`} />
            <path d={line} stroke={`url(#${ids}-line)`} className="roi-chart__line" />
            {cumulative.map((v, i) => (
              <circle key={i} cx={x(i + 1)} cy={y(v)} r={i + 1 === active ? 0 : 1.6} className="roi-chart__pt" />
            ))}
          </g>

          {/* active month guide */}
          {drawn > 0.98 && (
            <g className="roi-chart__guide">
              <line x1={ax} x2={ax} y1={pad.t} y2={y(0)} />
              {active !== 12 && <circle cx={ax} cy={ay} r="4.5" className="roi-chart__dot" />}
            </g>
          )}

          {/* end marker */}
          {drawn > 0.98 && (
            <g>
              <circle key={pulseKey} cx={endX} cy={endY} r="10" className="roi-chart__pulse" />
              <circle cx={endX} cy={endY} r="5" className="roi-chart__end" />
            </g>
          )}
        </svg>
      </div>

      <div className="roi-chart__legend" aria-hidden="true">
        <span className="roi-key roi-key--ramp">{t.ramp}</span>
        <span className="roi-key roi-key--full">{t.full}</span>
      </div>
    </figure>
  );
}
