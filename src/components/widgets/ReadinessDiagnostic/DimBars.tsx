import type { CSSProperties } from 'react';
import { useTween } from './hooks';

export type DimBand = 'low' | 'mid' | 'high';
/** Plain-word band for one area's score (dimension scores are 0, 17, 33, 50, 67, 83 or 100). */
export const dimBandOf = (v: number): DimBand => (v < 34 ? 'low' : v < 67 ? 'mid' : 'high');

export interface DimRow {
  id: string;
  name: string;
  blurb?: string;
  /** 0-100, or null when the area has no answers yet. */
  value: number | null;
  /** Highlight (the area being answered, or the weakest one). */
  current?: boolean;
}

interface Props {
  rows: DimRow[];
  /** Plain words for each band, shown next to the number. Omit to hide. */
  bands?: Record<DimBand, string>;
  outOf?: string;
  /** Thin white line at this value (the next level's threshold). */
  marker?: number | null;
  size?: 'lg' | 'sm';
  intro?: boolean;
  instant?: boolean;
  ariaLabel?: string;
}

/** Labelled horizontal bars, one per area: name, plain-word band, number and a simple bar. */
export default function DimBars({ rows, bands, outOf, marker = null, size = 'lg', intro = false, instant = false, ariaLabel }: Props) {
  const target = rows.map((r) => r.value ?? 0);
  const anim = useTween(target, {
    from: intro ? target.map(() => 0) : undefined,
    duration: 1100,
    instant,
    delay: intro && !instant ? 250 : 0,
  });

  return (
    <ul className={`rd-dims rd-dims--${size}`} role={ariaLabel ? 'list' : undefined} aria-label={ariaLabel}>
      {rows.map((r, i) => {
        const v = r.value;
        const band = v === null ? null : dimBandOf(v);
        return (
          <li
            key={r.id}
            className="rd-dims__row"
            data-current={r.current ? '' : undefined}
            data-band={band ?? undefined}
            style={{ ['--i' as string]: i } as CSSProperties}
          >
            <div className="rd-dims__top">
              <span className="rd-dims__name">{r.name}</span>
              <span className="rd-dims__val">
                {v !== null && bands && band && <span className="rd-dims__band">{bands[band]}</span>}
                <b>{v === null ? '-' : Math.round(anim[i] ?? 0)}</b>
                {v !== null && outOf && <span className="rd-dims__of">{outOf}</span>}
              </span>
            </div>
            {r.blurb && <span className="rd-dims__blurb">{r.blurb}</span>}
            <span className="rd-dims__track" aria-hidden="true">
              <i style={{ transform: `scaleX(${Math.max(0, Math.min(1, (anim[i] ?? 0) / 100)).toFixed(4)})` }} />
              {marker !== null && <span className="rd-dims__mark" style={{ left: `${marker}%` }} />}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
