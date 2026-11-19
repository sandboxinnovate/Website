import { useId } from 'react';
import { arcPath, polar } from './geometry';
import { useTween } from './hooks';
import { LEVELS } from './model';

const W = 280;
const H = 248;
const CX = 140;
const CY = 140;
const R = 102;
const START = 135;
const SWEEP = 270;
const angleFor = (v: number) => START + (SWEEP * Math.max(0, Math.min(100, v))) / 100;

interface Props {
  score: number;
  level: number;
  label: string;
  unit: string;
  ariaLabel: string;
  instant?: boolean;
}

/**
 * Simple 270° score dial: a plain track split into the four levels, a value arc and the number
 * in the middle ("Your score", 42, "out of 100"). No tick marks or scale numbers.
 */
export default function Gauge({ score, level, label, unit, ariaLabel, instant = false }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [v] = useTween([score], { from: [0], duration: 1600, instant, delay: instant ? 0 : 150 });
  const end = angleFor(v);
  const [tx, ty] = polar(CX, CY, R, end);

  return (
    <div className="rd-gauge" role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <linearGradient id={`gg-${uid}`} x1="30" y1="0" x2="250" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d65805" />
            <stop offset="0.45" stopColor="#f58327" />
            <stop offset="0.8" stopColor="#fca800" />
            <stop offset="1" stopColor="#ffd21f" />
          </linearGradient>
          <filter id={`gb-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* zone track */}
        {LEVELS.map((l, i) => {
          const a0 = angleFor(l.min) + (i === 0 ? 0 : 1.1);
          const a1 = angleFor(i === LEVELS.length - 1 ? 100 : LEVELS[i + 1].min) - (i === LEVELS.length - 1 ? 0 : 1.1);
          return <path key={l.id} d={arcPath(CX, CY, R, a0, a1)} className="rd-gauge__zone" data-current={i === level ? '' : undefined} />;
        })}

        {/* value */}
        {v > 0.4 && (
          <>
            <path d={arcPath(CX, CY, R, START, end)} stroke={`url(#gg-${uid})`} className="rd-gauge__glow" filter={`url(#gb-${uid})`} />
            <path d={arcPath(CX, CY, R, START, end)} stroke={`url(#gg-${uid})`} className="rd-gauge__value" />
            <circle cx={tx} cy={ty} r="11" className="rd-gauge__tip-halo" />
            <circle cx={tx} cy={ty} r="4.5" className="rd-gauge__tip" />
          </>
        )}
      </svg>
      <div className="rd-gauge__readout" aria-hidden="true">
        <span className="rd-gauge__label">{label}</span>
        <span className="rd-gauge__num">{Math.round(v)}</span>
        <span className="rd-gauge__unit">{unit}</span>
      </div>
    </div>
  );
}
