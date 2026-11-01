import { useId } from 'react';
import { axisAngle, labelAnchor, polar, radarPoints, ringPoints, toPoly } from './geometry';
import { useTween } from './hooks';

type Size = 'lg' | 'md' | 'sm';

const GEO: Record<Size, { w: number; h: number; cx: number; cy: number; r: number; gap: number; name: number; value: number }> = {
  lg: { w: 500, h: 410, cx: 250, cy: 214, r: 140, gap: 20, name: 11, value: 22 },
  md: { w: 300, h: 262, cx: 150, cy: 138, r: 86, gap: 13, name: 9.5, value: 0 },
  sm: { w: 232, h: 206, cx: 116, cy: 108, r: 76, gap: 11, name: 9, value: 0 },
};

interface Props {
  /** 0–100 per axis; null = not answered yet (axis drawn dashed, no vertex). */
  values: (number | null)[];
  labels: string[];
  size?: Size;
  /** Show the numeric value under each label (lg only). */
  showValues?: boolean;
  /** Dashed reference ring at this value (0–100). */
  threshold?: number | null;
  /** Highlight one axis (the dimension being answered). */
  activeIndex?: number | null;
  /** Grow the shape from the centre on mount. */
  intro?: boolean;
  /** Skip tweening (reduced motion). */
  instant?: boolean;
  duration?: number;
  ariaLabel?: string;
  className?: string;
}

/** Hand-drawn SVG radar: hairline rings, ember-filled polygon, glowing vertices. */
export default function Radar({
  values,
  labels,
  size = 'lg',
  showValues = false,
  threshold = null,
  activeIndex = null,
  intro = false,
  instant = false,
  duration = 1300,
  ariaLabel,
  className,
}: Props) {
  const g = GEO[size];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const n = values.length;
  const target = values.map((v) => (v ?? 0) / 100);
  const anim = useTween(target, {
    from: intro ? target.map(() => 0) : undefined,
    duration,
    instant,
    delay: intro && !instant ? 250 : 0,
  });
  const pts = radarPoints(anim, g.cx, g.cy, g.r);
  const hasAny = values.some((v) => v !== null);

  return (
    <svg
      className={['rd-radar', `rd-radar--${size}`, className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${g.w} ${g.h}`}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      data-intro={intro ? '' : undefined}
    >
      <defs>
        <radialGradient id={`rf-${uid}`} cx={g.cx} cy={g.cy} r={g.r} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f58327" stopOpacity="0.06" />
          <stop offset="0.7" stopColor="#f58327" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffb831" stopOpacity="0.34" />
        </radialGradient>
        <radialGradient id={`rg-${uid}`} cx={g.cx} cy={g.cy} r={g.r * 1.1} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d94c00" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d94c00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow under the chart */}
      <circle cx={g.cx} cy={g.cy} r={g.r * 1.1} fill={`url(#rg-${uid})`} />

      {/* rings */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={toPoly(ringPoints(n, g.cx, g.cy, g.r, f))} className={f === 1 ? 'rd-radar__ring rd-radar__ring--outer' : 'rd-radar__ring'} />
      ))}

      {/* axes */}
      {values.map((v, i) => {
        const [x, y] = polar(g.cx, g.cy, g.r, axisAngle(i, n));
        return (
          <line
            key={i}
            x1={g.cx}
            y1={g.cy}
            x2={x}
            y2={y}
            className="rd-radar__axis"
            data-active={activeIndex === i ? '' : undefined}
            data-empty={v === null ? '' : undefined}
          />
        );
      })}

      {/* scale marks along the top axis (large only) */}
      {size === 'lg' &&
        [25, 50, 75, 100].map((s) => (
          <text key={s} x={g.cx + 6} y={g.cy - (g.r * s) / 100 + 3} className="rd-radar__scale">
            {s}
          </text>
        ))}

      {threshold !== null && (
        <polygon points={toPoly(ringPoints(n, g.cx, g.cy, g.r, threshold / 100))} className="rd-radar__threshold" />
      )}

      {/* shape */}
      {hasAny && (
        <g className="rd-radar__shape">
          <polygon points={toPoly(pts)} fill={`url(#rf-${uid})`} className="rd-radar__fill" />
          <polygon points={toPoly(pts)} className="rd-radar__stroke" />
          {pts.map(([x, y], i) =>
            values[i] === null ? null : (
              <g key={i} className="rd-radar__vertex" style={{ ['--i' as string]: i }}>
                <circle cx={x} cy={y} r={size === 'lg' ? 9 : 6.5} className="rd-radar__halo" />
                <circle cx={x} cy={y} r={size === 'lg' ? 3.6 : 2.8} className="rd-radar__dot" />
              </g>
            ),
          )}
        </g>
      )}

      {/* labels */}
      {labels.map((label, i) => {
        const a = axisAngle(i, n);
        const [x, y] = polar(g.cx, g.cy, g.r + g.gap, a);
        const { anchor, dy } = labelAnchor(a);
        const withValue = showValues && size === 'lg';
        const lineGap = withValue ? g.value + 2 : 0;
        // vertical layout of the [name, value] stack
        let nameY = y + g.name * 0.35;
        if (dy < 0) nameY = y - lineGap - 2;
        else if (dy > 0) nameY = y + g.name + 2;
        else if (withValue) nameY = y - lineGap / 2 + g.name * 0.3;
        const v = values[i];
        return (
          <g key={i} className="rd-radar__label" data-active={activeIndex === i ? '' : undefined} style={{ ['--i' as string]: i }}>
            <text x={x} y={nameY} textAnchor={anchor} className="rd-radar__name">
              {label}
            </text>
            {withValue && (
              <text x={x} y={nameY + g.value + 3} textAnchor={anchor} className="rd-radar__value">
                {v === null ? '—' : Math.round((anim[i] ?? 0) * 100)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
