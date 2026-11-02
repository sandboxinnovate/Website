import { useId, useRef, useState, type SubmitEvent } from 'react';
import { localize, type Lang } from '@/i18n';
import { SITE, unitBySlug } from '@/data/site';
import { isValidEmail, submitLead } from '@/lib/leads';
import { COPY } from './copy';
import { QUESTIONS, type Answers, type Result } from './model';
import Ico from './Ico';

type Field = 'name' | 'email' | 'company' | 'role';
type Region = '' | 'us' | 'eu' | 'latam' | 'other';

interface Props {
  lang: Lang;
  result: Result;
  answers: Answers;
  /** Email the report was already requested for (restored from the session). */
  sentTo: string | null;
  onSent: (email: string) => void;
  /** /contact with the score attached (built by Results). */
  talkHref: string;
}

export default function LeadForm({ lang, result, answers, sentTo, onSent, talkHref }: Props) {
  const t = COPY[lang];
  const f = t.form;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [vals, setVals] = useState<Record<Field, string>>({ name: '', email: '', company: '', role: '' });
  const [region, setRegion] = useState<Region>('');
  const [wantsCall, setWantsCall] = useState(false);
  const [trap, setTrap] = useState('');
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), company: useRef<HTMLInputElement>(null) };

  const errors: Partial<Record<Field, string>> = {
    name: vals.name.trim() ? '' : f.required,
    email: !vals.email.trim() ? f.required : isValidEmail(vals.email) ? '' : f.badEmail,
    company: vals.company.trim() ? '' : f.required,
  };
  const errorKeys = (['name', 'email', 'company'] as const).filter((k) => errors[k]);
  const shown = (k: Field) => ((touched[k] || tried) && errors[k]) || '';

  const set = (k: Field) => (e: { target: { value: string } }) => setVals((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: Field) => () => setTouched((s) => ({ ...s, [k]: true }));

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setTried(true);
    if (errorKeys.length) {
      refs[errorKeys[0]].current?.focus();
      return;
    }
    const email = vals.email.trim();
    if (trap) {
      // bot filled the hidden field: pretend success, send nothing
      onSent(email);
      return;
    }
    setStatus('sending');
    const res = await submitLead({
      kind: 'diagnostic',
      lang,
      email,
      name: vals.name.trim(),
      company: vals.company.trim(),
      role: vals.role.trim() || undefined,
      region: region || undefined,
      wantsCall,
      score: result.score,
      level: result.levelId,
      levelName: t.levels[result.levelId].name,
      dimensions: result.dims,
      answers: QUESTIONS.map((q, i) => ({
        id: q.id,
        dimension: q.dim,
        option: (answers[i] ?? 0) + 1,
        answer: t.questions[q.id].options[answers[i] ?? 0],
      })),
      moves: result.moves.map((m) => ({ id: m.id, unit: m.unit })),
      runId: `SBX-${result.runId}`,
    });
    if (res.ok) {
      setStatus('idle');
      onSent(email);
    } else {
      setStatus('error');
    }
  }

  if (sentTo) {
    const units = Array.from(new Set(result.moves.map((m) => m.unit)));
    return (
      <div className="rd-lead rd-lead--ok" role="status">
        <div className="rd-lead__glow" aria-hidden="true" />
        <span className="rd-lead__okmark" aria-hidden="true">
          <Ico name="check" size={22} stroke={2} />
        </span>
        <div className="rd-lead__ok">
          <h3 className="rd-lead__title">{f.okTitle}</h3>
          <p className="rd-lead__body">{f.okBody(sentTo, wantsCall)}</p>
          <a className="btn btn-primary btn-sm rd-lead__call" href={talkHref}>
            <span>{f.okCall}</span>
            <span className="btn-chip">
              <Ico name="arrow-up-right" size={16} />
            </span>
          </a>
          <p className="rd-lead__next">
            <span>{f.okNext}</span>
            {units.map((u) => {
              const unit = unitBySlug(u);
              if (!unit) return null;
              return (
                <a key={u} href={localize(lang, `/services/${u}`)} className="rd-chip-link">
                  <span className="rd-chip-link__code">{unit.code}</span>
                  {unit.name[lang]}
                  <Ico name="arrow-up-right" size={14} />
                </a>
              );
            })}
          </p>
        </div>
      </div>
    );
  }

  const field = (k: Field, type: string, autoComplete: string, required = true) => {
    const id = `${uid}-${k}`;
    const err = shown(k);
    return (
      <div className={`rd-field rd-field--${k}`} data-invalid={err ? '' : undefined}>
        <label htmlFor={id} className="rd-field__label">
          {f[k]}
          {!required && <span className="rd-field__opt"> · {f.optional}</span>}
        </label>
        <input
          ref={k === 'role' ? undefined : refs[k]}
          id={id}
          name={k}
          type={type}
          inputMode={k === 'email' ? 'email' : undefined}
          autoComplete={autoComplete}
          placeholder={f.ph[k]}
          value={vals[k]}
          onChange={set(k)}
          onBlur={required ? blur(k) : undefined}
          required={required}
          aria-required={required || undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-err` : undefined}
          className="rd-input"
          spellCheck={k === 'email' ? false : undefined}
        />
        <span id={`${id}-err`} className="rd-field__err" aria-live="polite">
          {err}
        </span>
      </div>
    );
  };

  const regions: [Region, string][] = [
    ['us', f.regions.us],
    ['eu', f.regions.eu],
    ['latam', f.regions.latam],
    ['other', f.regions.other],
  ];

  return (
    <section className="rd-lead" aria-labelledby={`${uid}-title`}>
      <div className="rd-lead__glow" aria-hidden="true" />
      <div className="rd-lead__copy">
        <span className="rd-tag">{f.eyebrow}</span>
        <h3 id={`${uid}-title`} className="rd-lead__title">
          {f.title}
        </h3>
        <p className="rd-lead__body">{f.body}</p>
        <ul className="rd-lead__list">
          {f.bullets.map((b) => (
            <li key={b}>
              <Ico name="check" size={15} stroke={2} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <form className="rd-form" onSubmit={onSubmit} noValidate>
        <div className="rd-form__grid">
          {field('name', 'text', 'name')}
          {field('email', 'email', 'email')}
          {field('company', 'text', 'organization')}
          {field('role', 'text', 'organization-title', false)}
        </div>

        <fieldset className="rd-seg">
          <legend className="rd-field__label">
            {f.region}
            <span className="rd-field__opt"> · {f.optional}</span>
          </legend>
          <div className="rd-seg__row">
            {regions.map(([v, label]) => (
              <label key={v} className="rd-seg__opt">
                <input type="radio" name={`${uid}-region`} value={v} checked={region === v} onChange={() => setRegion(v)} onClick={() => region === v && setRegion('')} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* honeypot, hidden from people and assistive tech */}
        <div className="rd-hp" aria-hidden="true">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
          </label>
        </div>

        <label className="rd-check">
          <input type="checkbox" name="wantsCall" checked={wantsCall} onChange={(e) => setWantsCall(e.target.checked)} />
          <span className="rd-check__box" aria-hidden="true">
            <Ico name="check" size={13} stroke={2.4} />
          </span>
          <span className="rd-check__label">{f.wantsCall}</span>
        </label>

        <div className="rd-form__foot">
          <button type="submit" className="btn btn-primary rd-submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
            <span>
              {status === 'sending' ? f.sending : f.submit}
              {status === 'sending' && <span className="rd-dots" aria-hidden="true" />}
            </span>
            <span className="btn-chip">
              <Ico name="arrow-right" size={16} stroke={1.8} />
            </span>
          </button>
          <p className="rd-form__consent">
            {f.consent}{' '}
            <a className="rd-link" href={localize(lang, '/privacy')}>
              {f.privacy}
            </a>
          </p>
        </div>

        <p className="rd-form__status" role="alert">
          {tried && errorKeys.length > 0 ? f.fixErrors(errorKeys.length) : ''}
          {status === 'error' && (
            <>
              {f.error} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </>
          )}
        </p>
      </form>
    </section>
  );
}
