import type { ReactNode } from 'react';
import { ICONS } from '@/components/ui/icons';

const EXTRA: Record<string, string> = {
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
};

export function Ico({ name, size = 18, stroke = 1.6 }: { name: string; size?: number; stroke?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: (ICONS as Record<string, string>)[name] ?? EXTRA[name] ?? '' }}
    />
  );
}

interface FieldProps {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  hint?: string;
  /** Soft, non-blocking note (e.g. personal email) */
  note?: string;
  className?: string;
  /** Right side of the label row (e.g. a character counter) */
  aside?: ReactNode;
  children: ReactNode;
}

/** Label + control + one line for the message. The message slot is always rendered so layout stays put. */
export function Field({ id, label, optional, error, hint, note, className = '', aside, children }: FieldProps) {
  const msg = error || note || hint || '';
  return (
    <div className={`cf-field ${className}`} data-invalid={error ? '' : undefined}>
      <div className="cf-field__row">
        <label htmlFor={id} className="cf-field__label">
          {label}
          {optional && <span className="cf-field__opt"> · {optional}</span>}
        </label>
        {aside}
      </div>
      {children}
      <p id={`${id}-msg`} className={`cf-field__msg${error ? ' is-err' : note ? ' is-note' : ''}`}>
        {error && <Ico name="close" size={12} stroke={2.2} />}
        {msg}
      </p>
    </div>
  );
}

export function Select({
  id,
  value,
  onChange,
  placeholder,
  options,
  invalid,
  required,
  describedBy,
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: [string, string][];
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  autoComplete?: string;
}) {
  return (
    <div className="cf-select" data-empty={value ? undefined : ''}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
        className="cf-input"
      >
        <option value="">{placeholder}</option>
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
      <span className="cf-select__chev" aria-hidden="true">
        <Ico name="chevron-down" size={16} stroke={1.8} />
      </span>
    </div>
  );
}
