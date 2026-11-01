import { useEffect, useId, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { FIELDS, clamp, fromPos, nudge, parseTyped, toPos, type FieldId } from './model';

interface Props {
  field: FieldId;
  index: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  /** Shown inside the number box, before the value ("$"). */
  prefix?: string;
  /** Shown after the number box ("people", "%"). */
  unit: string;
  /** Spoken value for the slider ("25 people"). */
  valueText: string;
  /** Rendered next to the label (e.g. an info toggle). */
  aside?: ReactNode;
  /** Label for the highlighted band, when the field has one. */
  bandLabel?: string;
  formatTick?: (v: number) => string;
  /** Format the committed value for the number box. */
  formatValue?: (v: number) => string;
}

const RES = 1000; // slider resolution for log scales
const pct = (t: number) => `${(t * 100).toFixed(3)}%`;

/**
 * Restyled native range input + editable number box, kept in sync.
 * Decorations (track, fill, band, ticks) are drawn on a rail inset by half a thumb,
 * so they line up exactly with where the native thumb travels.
 */
export default function RangeField({
  field, index, label, hint, value, onChange, prefix, unit, valueText, aside, bandLabel, formatTick = String, formatValue = String,
}: Props) {
  const spec = FIELDS[field];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rangeId = `roi-${field}-${uid}`;
  const hintId = hint ? `${rangeId}-hint` : undefined;
  const pos = toPos(spec, value);
  const isLog = spec.scale === 'log';

  // Number box keeps its own draft while focused, so typing "1" on the way to "120" is not clamped mid-word.
  const [draft, setDraft] = useState<string | null>(null);
  useEffect(() => {
    if (draft === null) return;
    const n = parseTyped(draft);
    if (n !== null && n >= spec.min && n <= spec.max) onChange(Math.round(n));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const commitDraft = () => {
    if (draft === null) return;
    const n = parseTyped(draft);
    if (n !== null) onChange(clamp(Math.round(n), spec.min, spec.max));
    setDraft(null);
  };

  const onRangeKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isLog) return; // native handling is right for linear scales
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = nudge(spec, value, 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = nudge(spec, value, -1);
    else if (e.key === 'PageUp') next = nudge(spec, value, 1, true);
    else if (e.key === 'PageDown') next = nudge(spec, value, -1, true);
    else if (e.key === 'Home') next = spec.min;
    else if (e.key === 'End') next = spec.max;
    if (next !== null) {
      e.preventDefault();
      onChange(next);
    }
  };

  const onNumKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitDraft();
      (e.target as HTMLInputElement).select();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = nudge(spec, value, e.key === 'ArrowUp' ? 1 : -1, e.shiftKey);
      setDraft(null);
      onChange(next);
    } else if (e.key === 'Escape') {
      setDraft(null);
    }
  };

  const style = { '--t': pos.toFixed(4) } as CSSProperties;
  const band = spec.band ? { l: toPos(spec, spec.band[0]), r: toPos(spec, spec.band[1]) } : null;
  const inBand = spec.band ? value >= spec.band[0] && value <= spec.band[1] : false;

  return (
    <div className="roi-field" data-field={field}>
      <div className="roi-field__head">
        <span className="roi-field__idx" aria-hidden="true">{index}</span>
        <div className="roi-field__labelwrap">
          <label className="roi-field__label" htmlFor={rangeId}>
            {label}
          </label>
          {aside}
        </div>
        <div className="roi-field__value">
          <span className="roi-num" data-prefixed={prefix ? '' : undefined}>
            {prefix && <span className="roi-num__prefix" aria-hidden="true">{prefix}</span>}
            <input
              className="roi-num__input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              aria-label={`${label} (${unit})`}
              value={draft ?? formatValue(value)}
              onFocus={(e) => {
                setDraft(String(value));
                const el = e.currentTarget;
                requestAnimationFrame(() => el.select());
              }}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitDraft}
              onKeyDown={onNumKey}
            />
          </span>
          <span className="roi-num__unit" aria-hidden="true">{unit}</span>
        </div>
      </div>

      {hint && (
        <p className="roi-field__hint" id={hintId}>
          {hint}
        </p>
      )}

      <div className="roi-range" style={style} data-inband={inBand ? '' : undefined}>
        <div className="roi-range__rail" aria-hidden="true">
          <span className="roi-range__track" />
          {band && (
            <span className="roi-range__band" style={{ left: pct(band.l), width: pct(band.r - band.l) }}>
              {bandLabel && <span className="roi-range__bandlabel">{bandLabel}</span>}
            </span>
          )}
          <span className="roi-range__fill" />
          {spec.minor.map((v) => (
            <span key={`m${v}`} className="roi-range__tick" style={{ left: pct(toPos(spec, v)) }} />
          ))}
          {spec.major.map((v) => (
            <span
              key={`M${v}`}
              className="roi-range__tick roi-range__tick--major"
              data-on={value >= v ? '' : undefined}
              style={{ left: pct(toPos(spec, v)) }}
            />
          ))}
        </div>
        <input
          id={rangeId}
          className="roi-range__input"
          type="range"
          min={isLog ? 0 : spec.min}
          max={isLog ? RES : spec.max}
          step={isLog ? 1 : spec.step}
          value={isLog ? Math.round(pos * RES) : value}
          aria-valuetext={valueText}
          aria-describedby={hintId}
          onKeyDown={onRangeKey}
          onChange={(e) => {
            const raw = Number(e.target.value);
            setDraft(null);
            onChange(isLog ? fromPos(spec, raw / RES) : raw);
          }}
        />
        <div className="roi-range__labels" aria-hidden="true">
          {spec.major.map((v) => (
            <span key={v} style={{ left: pct(toPos(spec, v)) }} data-on={value === v ? '' : undefined}>
              {formatTick(v)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
