import { useEffect, useId, useRef, useState, type SubmitEvent, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';
import { localize, type Lang } from '@/i18n';
import { SITE, UNITS, unitBySlug } from '@/data/site';
import { submitLead } from '@/lib/leads';
import { COPY, NEXT_STEPS } from './copy';
import {
  GOAL_MAX,
  NEEDS,
  STEP_COUNT,
  STEP_FIELDS,
  clearDraft,
  emptyDraft,
  isBlank,
  isFreeMail,
  isValidWebsite,
  loadDraft,
  normalizeWebsite,
  readInterest,
  readUrl,
  saveDraft,
  validate,
  type Context,
  type Draft,
  type FieldKey,
  type Need,
} from './model';
import { Field, Ico, Select } from './Fields';
import './contact-flow.css';

interface Props {
  lang: Lang;
  /** Preselect a unit (e.g. when embedded on a service page). ?service= in the URL also works. */
  initialService?: string;
}

interface Done {
  first: string;
  email: string;
  ref: string;
  from: Context['from'] | null;
}

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const makeRef = () => {
  const a = Date.now().toString(36).slice(-4).toUpperCase();
  const b = Math.floor(Math.random() * 36 ** 2).toString(36).padStart(2, '0').toUpperCase();
  return `SBX-${a}${b}`;
};

/** Units first, "not sure" last; picking "not sure" clears the rest and vice versa. */
function toggleNeed(list: Need[], n: Need): Need[] {
  if (list.includes(n)) return list.filter((x) => x !== n);
  if (n === 'unsure') return ['unsure'];
  return [...list.filter((x) => x !== 'unsure'), n].sort((a, b) => NEEDS.indexOf(a) - NEEDS.indexOf(b));
}

export default function ContactFlow({ lang, initialService }: Props) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const fid = (k: string) => `cf${uid}-${k}`;

  const [draft, setDraft] = useState<Draft>(() => {
    const d = emptyDraft(lang);
    if (initialService && (NEEDS as string[]).includes(initialService)) d.needs = [initialService as Need];
    return d;
  });
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animate, setAnimate] = useState(false);
  const [context, setContext] = useState<Context | null>(null);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [tried, setTried] = useState<boolean[]>(() => Array(STEP_COUNT).fill(false));
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [done, setDone] = useState<Done | null>(null);
  const [restored, setRestored] = useState(false);
  const [ready, setReady] = useState(false);
  const [trap, setTrap] = useState('');
  const [height, setHeight] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  /* restore the session draft + read URL hand-offs (client only, after hydration) */
  useEffect(() => {
    const stored = loadDraft();
    const url = readUrl(window.location.search);
    let d = draft;
    let s = 0;
    let m = 0;
    let ctx: Context | null = null;
    if (stored && !(isBlank(stored.draft, stored.draft.language) && !stored.context)) {
      d = stored.draft;
      s = stored.step;
      m = Math.max(stored.maxStep, stored.step);
      ctx = stored.context;
      setRestored(true);
    }
    if (url.needs.length) {
      let next = d.needs;
      for (const n of url.needs) if (!next.includes(n)) next = toggleNeed(next, n);
      d = { ...d, needs: next };
    }
    if (url.context) ctx = url.context;
    setDraft(d);
    setStep(s);
    setMaxStep(m);
    setContext(ctx);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* persist the draft for this tab */
  useEffect(() => {
    if (!ready || done) return;
    saveDraft({ draft, step, maxStep, context });
  }, [ready, done, draft, step, maxStep, context]);

  /* smooth height between steps */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* after a step change: move focus to the new heading, keep the card in view */
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    headingRef.current?.focus({ preventScroll: true });
    const root = rootRef.current;
    if (!root) return;
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top = root.getBoundingClientRect().top;
    if (top < navH + 8) window.scrollTo({ top: window.scrollY + top - navH - 16, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [step, done]);

  /* ---------------------------------------------------------------- state helpers */

  const errors = validate(step, draft, t);
  const shown = (k: FieldKey) => ((touched[k] || tried[step]) && errors[k]) || '';
  // step 1 has a single control: its inline message is the announcement (no extra summary)
  const errorCount = tried[step] && step > 0 ? Object.keys(errors).length : 0;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const touch = (k: FieldKey) => setTouched((s) => (s[k] ? s : { ...s, [k]: true }));

  function go(target: number) {
    moved.current = true;
    setAnimate(true);
    setDir(target > step ? 1 : -1);
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
    setRestored(false);
    setStatus('idle');
  }

  function focusFirstInvalid(s: number, errs: Partial<Record<FieldKey, string>>) {
    const key = STEP_FIELDS[s].find((k) => errs[k]);
    if (!key) return;
    const root = rootRef.current;
    let el: HTMLElement | null = null;
    if (key === 'needs') el = root?.querySelector<HTMLElement>('input[name="needs"]') ?? null;
    else if (key === 'timeline') el = root?.querySelector<HTMLElement>('input[name="timeline"]:checked, input[name="timeline"]') ?? null;
    else el = document.getElementById(fid(key));
    el?.focus();
  }

  function markTried(s: number) {
    setTried((arr) => arr.map((v, i) => (i === s ? true : v)));
  }

  function advance() {
    const errs = validate(step, draft, t);
    if (Object.keys(errs).length) {
      markTried(step);
      focusFirstInvalid(step, errs);
      return;
    }
    const target = editing ? STEP_COUNT - 1 : Math.min(step + 1, STEP_COUNT - 1);
    setEditing(false);
    go(target);
  }

  function back() {
    setEditing(false);
    go(Math.max(0, step - 1));
  }

  function jump(target: number) {
    if (target === step || target > maxStep) return;
    if (target > step) {
      const errs = validate(step, draft, t);
      if (Object.keys(errs).length) {
        markTried(step);
        focusFirstInvalid(step, errs);
        return;
      }
    }
    setEditing(false);
    go(target);
  }

  function editFrom(target: number) {
    setEditing(true);
    go(target);
  }

  function startOver() {
    clearDraft();
    setDraft(emptyDraft(lang));
    setTouched({});
    setTried(Array(STEP_COUNT).fill(false));
    setEditing(false);
    setRestored(false);
    setMaxStep(0);
    go(0);
  }

  async function submit() {
    for (let s = 0; s < STEP_COUNT - 1; s++) {
      const errs = validate(s, draft, t);
      if (Object.keys(errs).length) {
        markTried(s);
        go(s);
        return;
      }
    }
    const email = draft.email.trim();
    const first = draft.name.trim().split(/\s+/)[0] ?? '';
    const ref = makeRef();
    const finish = () => {
      clearDraft();
      moved.current = true;
      setAnimate(true);
      setDir(1);
      setDone({ first, email, ref, from: context?.from ?? null });
    };
    if (trap) {
      // honeypot filled: almost certainly a bot. Look successful, send nothing.
      finish();
      return;
    }
    setStatus('sending');
    const res = await submitLead({
      kind: 'contact',
      lang,
      email,
      name: draft.name.trim(),
      company: draft.company.trim(),
      role: draft.role.trim() || undefined,
      website: normalizeWebsite(draft.website) || undefined,
      companySize: draft.size,
      region: draft.region,
      preferredLanguage: draft.language,
      services: draft.needs,
      servicesLabel: draft.needs.map((n) => (n === 'unsure' ? 'Not sure yet' : unitBySlug(n)?.name.en ?? n)).join(', '),
      goal90Days: draft.goal.trim(),
      timeline: draft.timeline,
      source: draft.source || undefined,
      context: context ? { from: context.from, note: contextNote(context), ...context.data } : undefined,
      interest: readInterest(window.location.search),
      requestId: ref,
    });
    if (res.ok) {
      setStatus('idle');
      finish();
    } else {
      setStatus('error');
    }
  }

  function reset() {
    setDraft(emptyDraft(lang));
    setTouched({});
    setTried(Array(STEP_COUNT).fill(false));
    setContext(null);
    setEditing(false);
    setMaxStep(0);
    setStep(0);
    setDone(null);
    moved.current = true;
  }

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    if (step === STEP_COUNT - 1) void submit();
    else advance();
  }

  function contextNote(c: Context) {
    if (c.from === 'roi') return t.context.roi({ people: c.data.people, hours: c.data.hours, automation: c.data.automation });
    return t.context.diagnostic(c.data.score);
  }

  /* ---------------------------------------------------------------- pieces */

  const describedBy = (k: FieldKey) => `${fid(k)}-msg`;

  const text = (k: 'name' | 'email' | 'company' | 'role' | 'website', type: string, autoComplete: string, optional = false) => {
    const err = shown(k);
    const note = k === 'email' && !err && isFreeMail(draft.email) && touched.email ? t.s2.freeMail : '';
    return (
      <Field id={fid(k)} label={t.s2[k]} optional={optional ? t.optional : undefined} error={err} note={note} className={`cf-field--${k}`}>
        <input
          id={fid(k)}
          name={k}
          type={type}
          className="cf-input"
          value={draft[k]}
          placeholder={t.s2.ph[k]}
          autoComplete={autoComplete}
          inputMode={k === 'email' ? 'email' : k === 'website' ? 'url' : undefined}
          spellCheck={k === 'email' || k === 'website' ? false : undefined}
          autoCapitalize={k === 'email' || k === 'website' ? 'off' : undefined}
          maxLength={k === 'website' ? 200 : 120}
          required={!optional}
          aria-required={!optional || undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={describedBy(k)}
          onChange={(e) => set(k, e.target.value)}
          onBlur={() => touch(k)}
        />
      </Field>
    );
  };

  const total = String(STEP_COUNT).padStart(2, '0');

  const stepBody = () => {
    if (done) {
      const steps = NEXT_STEPS[lang];
      return (
        <div className="cf-done">
          <div className="cf-done__top">
            <span className="cf-done__mark" aria-hidden="true">
              <Ico name="check" size={24} stroke={2.2} />
            </span>
            <span className="cf-done__ref">
              <span>{t.done.ref}</span>
              <code>{done.ref}</code>
            </span>
          </div>
          <h3 className="cf-title" ref={headingRef} tabIndex={-1}>
            {t.done.title(done.first)}
          </h3>
          <p className="cf-lede">{t.done.body(done.email)}</p>

          <p className="cf-mono cf-done__label">{t.done.next}</p>
          <ol className="cf-next">
            {steps.map((s, i) => (
              <li key={s.title} className="cf-next__item" style={{ ['--i' as string]: i }}>
                <span className="cf-next__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="cf-next__body">
                  <span className="cf-next__when">{s.when}</span>
                  <span className="cf-next__title">{s.title}</span>
                  <span className="cf-next__text">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="cf-done__meanwhile">
            <p className="cf-mono">{t.done.meanwhile}</p>
            {done.from === 'diagnostic' ? (
              <a className="cf-linkcard" href={localize(lang, '/#services')}>
                <span className="cf-linkcard__body">
                  <span className="cf-linkcard__title">{t.done.explore}</span>
                </span>
                <span className="cf-linkcard__arrow">
                  <Ico name="arrow-up-right" size={16} stroke={1.8} />
                </span>
              </a>
            ) : (
              <a className="cf-linkcard" href={localize(lang, '/diagnostic')}>
                <span className="cf-linkcard__body">
                  <span className="cf-linkcard__title">{t.done.diagnostic}</span>
                  <span className="cf-linkcard__text">{t.done.diagnosticBody}</span>
                </span>
                <span className="cf-linkcard__arrow">
                  <Ico name="arrow-up-right" size={16} stroke={1.8} />
                </span>
              </a>
            )}
          </div>
          <button type="button" className="cf-textbtn" onClick={reset}>
            <Ico name="plus" size={14} stroke={2} />
            {t.done.another}
          </button>
        </div>
      );
    }

    if (step === 0) {
      const err = shown('needs');
      const options: { slug: Need; code: string; icon: string; name: string; tag: string }[] = [
        ...UNITS.map((u) => ({ slug: u.slug as Need, code: u.code, icon: u.icon as string, name: u.name[lang], tag: u.tagline[lang] })),
        { slug: 'unsure', code: '??', icon: 'compass', name: t.s1.unsure.name, tag: t.s1.unsure.tagline },
      ];
      return (
        <>
          <StepHead n={1} title={t.s1.title} lede={t.s1.lede} headingRef={headingRef} total={total} />
          <fieldset className="cf-needs" aria-describedby={describedBy('needs')} aria-invalid={err ? true : undefined}>
            <legend className="cf-sr">{t.s1.title}</legend>
            <div className="cf-needs__grid">
              {options.map((o) => {
                const on = draft.needs.includes(o.slug);
                return (
                  <label key={o.slug} className={`cf-need${o.slug === 'unsure' ? ' cf-need--unsure' : ''}`} data-on={on ? '' : undefined}>
                    <input
                      type="checkbox"
                      name="needs"
                      value={o.slug}
                      className="cf-sr"
                      checked={on}
                      onChange={() => {
                        set('needs', toggleNeed(draft.needs, o.slug));
                        touch('needs');
                      }}
                    />
                    <span className="cf-need__ico" aria-hidden="true">
                      <Ico name={o.icon} size={20} stroke={1.5} />
                    </span>
                    <span className="cf-need__body">
                      <span className="cf-need__name">
                        {o.name}
                        <span className="cf-need__code" aria-hidden="true">
                          {o.code}
                        </span>
                      </span>
                      <span className="cf-need__tag">{o.tag}</span>
                    </span>
                    <span className="cf-need__check" aria-hidden="true">
                      <Ico name="check" size={14} stroke={2.4} />
                    </span>
                  </label>
                );
              })}
            </div>
            <p id={describedBy('needs')} className={`cf-field__msg${err ? ' is-err' : ''}`} role="alert">
              {err && <Ico name="close" size={12} stroke={2.2} />}
              {err}
            </p>
          </fieldset>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <StepHead n={2} title={t.s2.title} lede={t.s2.lede} headingRef={headingRef} total={total} />
          <div className="cf-grid">
            {text('name', 'text', 'name')}
            {text('email', 'email', 'email')}
            {text('company', 'text', 'organization')}
            {text('role', 'text', 'organization-title', true)}
            {text('website', 'text', 'url', true)}
            <Field id={fid('size')} label={t.s2.size} error={shown('size')}>
              <Select
                id={fid('size')}
                value={draft.size}
                onChange={(v) => {
                  set('size', v);
                  touch('size');
                }}
                placeholder={t.s2.choose}
                options={t.s2.sizes}
                invalid={!!shown('size')}
                required
                describedBy={describedBy('size')}
              />
            </Field>
            <Field id={fid('region')} label={t.s2.region} error={shown('region')}>
              <Select
                id={fid('region')}
                value={draft.region}
                onChange={(v) => {
                  set('region', v);
                  touch('region');
                }}
                placeholder={t.s2.choose}
                options={t.s2.regions}
                invalid={!!shown('region')}
                required
                describedBy={describedBy('region')}
              />
            </Field>
            <fieldset className="cf-field cf-seg">
              <legend className="cf-field__label">{t.s2.language}</legend>
              <div className="cf-seg__row">
                {t.s2.languages.map(([v, label]) => (
                  <label key={v} className="cf-seg__opt" data-on={draft.language === v ? '' : undefined}>
                    <input
                      type="radio"
                      name="language"
                      value={v}
                      className="cf-sr"
                      checked={draft.language === v}
                      onChange={() => set('language', v as Lang)}
                    />
                    <span lang={v}>{label}</span>
                  </label>
                ))}
              </div>
              <p className="cf-field__msg" aria-hidden="true" />
            </fieldset>
          </div>
        </>
      );
    }

    if (step === 2) {
      const goalErr = shown('goal');
      const tlErr = shown('timeline');
      const len = draft.goal.length;
      return (
        <>
          <StepHead n={3} title={t.s3.title} lede={t.s3.lede} headingRef={headingRef} total={total} />
          <Field
            id={fid('goal')}
            label={t.s3.goal}
            error={goalErr}
            hint={t.s3.goalHelp}
            className="cf-field--goal"
            aside={
              <span className="cf-count" aria-hidden="true" data-warn={len > GOAL_MAX * 0.9 ? '' : undefined}>
                {t.s3.chars(len, GOAL_MAX)}
              </span>
            }
          >
            <textarea
              id={fid('goal')}
              name="goal"
              className="cf-input cf-textarea"
              rows={4}
              maxLength={GOAL_MAX}
              value={draft.goal}
              placeholder={t.s3.goalPh}
              required
              aria-required
              aria-invalid={goalErr ? true : undefined}
              aria-describedby={describedBy('goal')}
              onChange={(e) => set('goal', e.target.value)}
              onBlur={() => touch('goal')}
              onKeyDown={(e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  advance();
                }
              }}
            />
          </Field>

          <fieldset className="cf-field cf-timeline" aria-describedby={describedBy('timeline')} aria-invalid={tlErr ? true : undefined}>
            <legend className="cf-field__label">{t.s3.timeline}</legend>
            <div className="cf-timeline__grid">
              {t.s3.timelines.map(([v, label, sub]) => (
                <label key={v} className="cf-topt" data-on={draft.timeline === v ? '' : undefined}>
                  <input
                    type="radio"
                    name="timeline"
                    value={v}
                    className="cf-sr"
                    checked={draft.timeline === v}
                    onChange={() => {
                      set('timeline', v);
                      touch('timeline');
                    }}
                  />
                  <span className="cf-topt__dot" aria-hidden="true" />
                  <span className="cf-topt__body">
                    <span className="cf-topt__label">{label}</span>
                    <span className="cf-topt__sub">{sub}</span>
                  </span>
                </label>
              ))}
            </div>
            <p id={describedBy('timeline')} className={`cf-field__msg${tlErr ? ' is-err' : ''}`}>
              {tlErr && <Ico name="close" size={12} stroke={2.2} />}
              {tlErr}
            </p>
          </fieldset>

          <Field id={fid('source')} label={t.s3.source} optional={t.optional} className="cf-field--source">
            <Select
              id={fid('source')}
              value={draft.source}
              onChange={(v) => set('source', v)}
              placeholder={t.s2.choose}
              options={t.s3.sources}
              describedBy={describedBy('source')}
            />
          </Field>
        </>
      );
    }

    // step 3 — review
    const lbl = (list: [string, string][], v: string) => list.find(([k]) => k === v)?.[1] ?? '—';
    const tl = t.s3.timelines.find(([k]) => k === draft.timeline);
    const site = draft.website.trim() && isValidWebsite(draft.website) ? draft.website.trim().replace(/^https?:\/\//i, '') : '';
    return (
      <>
        <StepHead n={4} title={t.s4.title} lede={t.s4.lede} headingRef={headingRef} total={total} />
        <div className="cf-review">
          <section className="cf-review__block" aria-labelledby={fid('rv-need')}>
            <header className="cf-review__head">
              <h4 id={fid('rv-need')}>{t.s4.need}</h4>
              <button type="button" className="cf-edit" onClick={() => editFrom(0)} aria-label={`${t.s4.edit}: ${t.s4.need}`}>
                {t.s4.edit}
              </button>
            </header>
            <ul className="cf-chips">
              {draft.needs.map((n) => {
                const u = n === 'unsure' ? null : unitBySlug(n);
                return (
                  <li key={n} className="cf-chip">
                    {u && <span className="cf-chip__code">{u.code}</span>}
                    {u ? u.name[lang] : t.s1.unsure.name}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="cf-review__block" aria-labelledby={fid('rv-you')}>
            <header className="cf-review__head">
              <h4 id={fid('rv-you')}>{t.s4.you}</h4>
              <button type="button" className="cf-edit" onClick={() => editFrom(1)} aria-label={`${t.s4.edit}: ${t.s4.you}`}>
                {t.s4.edit}
              </button>
            </header>
            <p className="cf-review__lead">
              <strong>{draft.name.trim()}</strong>
              {draft.role.trim() ? `, ${draft.role.trim()}` : ''} · {draft.company.trim()}
            </p>
            <dl className="cf-dl">
              <div>
                <dt>{t.s2.email}</dt>
                <dd className="cf-dl__mono">{draft.email.trim()}</dd>
              </div>
              {site && (
                <div>
                  <dt>{t.s2.website}</dt>
                  <dd className="cf-dl__mono">{site}</dd>
                </div>
              )}
              <div>
                <dt>{t.s4.size}</dt>
                <dd>{lbl(t.s2.sizes, draft.size)}</dd>
              </div>
              <div>
                <dt>{t.s4.region}</dt>
                <dd>{lbl(t.s2.regions, draft.region)}</dd>
              </div>
              <div>
                <dt>{t.s4.language}</dt>
                <dd>{lbl(t.s2.languages, draft.language)}</dd>
              </div>
            </dl>
          </section>

          <section className="cf-review__block" aria-labelledby={fid('rv-proj')}>
            <header className="cf-review__head">
              <h4 id={fid('rv-proj')}>{t.s4.project}</h4>
              <button type="button" className="cf-edit" onClick={() => editFrom(2)} aria-label={`${t.s4.edit}: ${t.s4.project}`}>
                {t.s4.edit}
              </button>
            </header>
            <blockquote className="cf-quote">
              <span className="cf-mono">{t.s4.goal}</span>
              <p>{draft.goal.trim()}</p>
            </blockquote>
            <dl className="cf-dl">
              <div>
                <dt>{t.s4.timeline}</dt>
                <dd>{tl ? tl[1] : '—'}</dd>
              </div>
              {draft.source && (
                <div>
                  <dt>{t.s4.source}</dt>
                  <dd>{lbl(t.s3.sources, draft.source)}</dd>
                </div>
              )}
            </dl>
          </section>
          <p className="cf-consent">
            <Ico name="shield" size={15} stroke={1.6} />
            {t.s4.consent}
          </p>
        </div>
      </>
    );
  };

  const last = step === STEP_COUNT - 1;
  const animClass = animate && !reducedMotion() ? (dir > 0 ? ' cf-step--fwd' : ' cf-step--back') : '';

  return (
    <div className="cf" ref={rootRef}>
      <div className="cf__glow" aria-hidden="true" />

      <div className="cf-headbar">
        <span className="cf-headbar__title">
          <span className="cf-pulse" aria-hidden="true" />
          {t.head}
        </span>
        <span className="cf-headbar__step" aria-hidden="true">
          {done ? `${total} / ${total}` : `${String(step + 1).padStart(2, '0')} / ${total}`}
        </span>
      </div>

      <nav className="cf-progress" aria-label={t.progress}>
        <ol>
          {t.steps.map((label, i) => {
            const state = done || i < step ? 'done' : i === step ? 'current' : 'todo';
            const reachable = !done && i <= maxStep && i !== step;
            return (
              <li key={label} data-state={state}>
                <button
                  type="button"
                  className="cf-progress__btn"
                  onClick={() => jump(i)}
                  disabled={!reachable}
                  aria-current={!done && i === step ? 'step' : undefined}
                >
                  <span className="cf-progress__bar" aria-hidden="true">
                    <span />
                  </span>
                  <span className="cf-progress__label">
                    <span className="cf-progress__n" aria-hidden="true">
                      {state === 'done' ? <Ico name="check" size={11} stroke={2.6} /> : String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cf-progress__text">{label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {!done && (restored || context) && (
        <div className="cf-notes">
          {restored && (
            <p className="cf-restored">
              <Ico name="clock" size={13} />
              <span>{t.restored}</span>
              <button type="button" className="cf-textbtn cf-textbtn--sm" onClick={startOver}>
                {t.startOver}
              </button>
            </p>
          )}
          {context && (
            <div className="cf-note">
              <span className="cf-note__tag">{t.context.attached}</span>
              <p className="cf-note__text">{contextNote(context)}</p>
              <button type="button" className="cf-note__x" onClick={() => setContext(null)} aria-label={t.context.remove}>
                <Ico name="close" size={14} stroke={2} />
              </button>
            </div>
          )}
        </div>
      )}

      <form className="cf-form" onSubmit={onSubmit} noValidate aria-label={t.head}>
        <div
          className="cf-viewport"
          style={height != null ? { height, transition: animate && !reducedMotion() ? undefined : 'none' } : undefined}
        >
          <div className="cf-stage" ref={stageRef}>
            <div key={done ? 'done' : step} className={`cf-step${animClass}`}>
              {stepBody()}
            </div>
          </div>
        </div>

        {/* honeypot — hidden from people and assistive tech */}
        <div className="cf-hp" aria-hidden="true">
          <label>
            Leave this empty
            <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
          </label>
        </div>

        {!done && (
          <div className="cf-foot">
            <div className="cf-foot__left">
              {step > 0 ? (
                <button type="button" className="cf-back" onClick={back}>
                  <Ico name="arrow-left" size={16} stroke={1.8} />
                  {t.back}
                </button>
              ) : (
                <span className="cf-foot__count" aria-live="polite">
                  {draft.needs.length ? t.s1.selected(draft.needs.length) : ''}
                </span>
              )}
            </div>
            <div className="cf-foot__right">
              {(step === 1 || step === 2) && (
                <span className="cf-foot__hint" aria-hidden="true">
                  <kbd>{step === 2 ? 'Ctrl ↵' : '↵'}</kbd>
                  {t.enterHint}
                </span>
              )}
              <button type="submit" className="btn btn-primary cf-submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
                <span>
                  {last ? (status === 'sending' ? t.s4.sending : t.s4.submit) : editing ? t.saveReview : t.next}
                  {status === 'sending' && <span className="cf-dots" aria-hidden="true" />}
                </span>
                <span className="btn-chip">
                  <Ico name={last ? 'arrow-up-right' : 'arrow-right'} size={16} stroke={1.8} />
                </span>
              </button>
            </div>
            <p className="cf-foot__status" role="alert">
              {errorCount > 0 && t.fixErrors(errorCount)}
              {status === 'error' && (
                <>
                  {t.s4.error} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </>
              )}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

function StepHead({
  n,
  title,
  lede,
  total,
  headingRef,
}: {
  n: number;
  title: string;
  lede: string;
  total: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="cf-stephead">
      <span className="cf-mono cf-stephead__n" aria-hidden="true">
        [{String(n).padStart(2, '0')}/{total}]
      </span>
      <h3 className="cf-title" ref={headingRef} tabIndex={-1}>
        {title}
      </h3>
      <p className="cf-lede">{lede}</p>
    </div>
  );
}
