import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';
import { switchLang, type Lang } from '@/i18n';
import { SITE } from '@/data/site';
import { ICONS } from '@/components/ui/icons';
import { COPY } from './copy';
import { buildItems, type ItemIcon } from './items';
import { fallback, prepare, search, type Group, type Row } from './search';
import './palette.css';

export interface PaletteProps {
  lang: Lang;
  open: boolean;
  /** Prefilled query (from the `sbx:cmdk` event detail). */
  initialQuery?: string;
  onClose: () => void;
  returnFocus: RefObject<HTMLElement | null>;
}

/* ---------------------------------------------------------------- icons */

const EXTRA: Record<string, string> = {
  home: '<path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
  hash: '<path d="M9.5 4 8 20M16 4l-1.5 16M4.5 9h15M4 15h15"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  enter: '<path d="M19 5v6.5a3 3 0 0 1-3 3H5.5"/><path d="m9.5 10.5-4 4 4 4"/>',
};

function Svg({ name, size = 18, stroke = 1.5 }: { name: ItemIcon | 'enter' | 'close' | 'search' | 'check' | 'arrow-right'; size?: number; stroke?: number }) {
  const html = (ICONS as Record<string, string>)[name] ?? EXTRA[name] ?? '';
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
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ---------------------------------------------------------------- helpers */

const RECENT_KEY = 'sbx:cmdk:recent';

function readRecent(): string[] {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 6) : [];
  } catch {
    return [];
  }
}

function pushRecent(id: string): void {
  try {
    const next = [id, ...readRecent().filter((x) => x !== id)].slice(0, 6);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: recents are a convenience */
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      // legacy path for non-secure contexts where the async clipboard API is missing
      const ok = (document as unknown as { execCommand(cmd: string): boolean }).execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/** Label with the matched characters wrapped in <mark>. */
function Highlight({ text, indices }: { text: string; indices: number[] }) {
  if (!indices.length) return <>{text}</>;
  const hit = new Set(indices);
  const parts: { s: string; on: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const on = hit.has(i);
    const last = parts[parts.length - 1];
    if (last && last.on === on) last.s += text[i];
    else parts.push({ s: text[i], on });
  }
  return (
    <>
      {parts.map((p, i) => (p.on ? <mark key={i}>{p.s}</mark> : <span key={i}>{p.s}</span>))}
    </>
  );
}

/* ---------------------------------------------------------------- component */

export default function Palette({ lang, open, initialQuery = '', onClose, returnFocus }: PaletteProps) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const prepared = useMemo(() => prepare(buildItems(lang)), [lang]);

  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [toast, setToast] = useState<{ text: string; n: number } | null>(null);
  const [path, setPath] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const keyNav = useRef(false);
  const skipRestore = useRef(false);
  const afterClose = useRef<(() => void) | null>(null);

  /* open / close lifecycle (exit animation keeps it mounted ~200ms) */
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      setQuery(initialQuery);
      setActive(0);
      setRecent(readRecent());
      setPath(location.pathname.replace(/\/$/, '') || '/');
      skipRestore.current = false;
      return;
    }
    setClosing(true);
    const id = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, reducedMotion() ? 0 : 190);
    return () => window.clearTimeout(id);
  }, [open, initialQuery]);

  const live = mounted && !closing;

  /* while open: lock scroll, make the rest of the page inert, focus the input; undo on close */
  useEffect(() => {
    if (!live) return;
    const root = document.documentElement;
    const body = document.body;
    const gap = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, pr: body.style.paddingRight };
    root.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    const inerted: Element[] = [];
    const host = dialogRef.current;
    if (host) {
      for (const el of Array.from(body.children)) {
        if (el.contains(host) || el.hasAttribute('inert') || el.tagName === 'SCRIPT') continue;
        el.setAttribute('inert', '');
        inerted.push(el);
      }
    }
    inputRef.current?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = prev.overflow;
      body.style.paddingRight = prev.pr;
      inerted.forEach((el) => el.removeAttribute('inert'));
      const target = returnFocus.current;
      if (!skipRestore.current && target && document.contains(target)) target.focus({ preventScroll: true });
      const next = afterClose.current;
      afterClose.current = null;
      if (next) next();
    };
  }, [live, returnFocus]);

  /* toast auto-hide */
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  /* results */
  const results: Group[] = useMemo(() => search(query, prepared, recent), [query, prepared, recent]);
  const noMatch = query.trim() !== '' && results.length === 0;
  const groups = noMatch ? fallback(prepared) : results;
  const flat: Row[] = useMemo(() => groups.flatMap((g) => g.rows), [groups]);
  const activeRow = flat[Math.min(active, flat.length - 1)];

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!keyNav.current || !activeRow) return;
    keyNav.current = false;
    document.getElementById(activeRow.key)?.scrollIntoView({ block: 'nearest' });
  }, [activeRow]);

  /* actions */
  function run(row: Row, newTab = false) {
    const { item } = row;
    if (item.group !== 'answers') pushRecent(item.id);
    const r = item.run;

    if (r.kind === 'copy-email') {
      void copyText(SITE.email).then((ok) =>
        setToast({ text: ok ? `${t.copied} · ${SITE.email}` : `${t.copyFailed} ${SITE.email}`, n: Date.now() }),
      );
      onClose();
      return;
    }

    const href = r.kind === 'switch-lang' ? switchLang(location.pathname, r.to) + location.hash : r.href;
    if (newTab) {
      window.open(href, '_blank', 'noopener');
      return;
    }
    const url = new URL(href, location.href);
    const samePage = url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '') && url.search === location.search;
    if (samePage && url.hash) {
      // same page: close first (unlocks scroll), then jump to the section
      skipRestore.current = true;
      afterClose.current = () => {
        history.pushState(null, '', url.hash);
        const el = document.getElementById(url.hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        }
      };
      onClose();
      return;
    }
    if (samePage && !url.hash) {
      onClose();
      return;
    }
    skipRestore.current = true;
    onClose();
    window.location.assign(url.href);
  }

  function move(delta: number) {
    if (!flat.length) return;
    keyNav.current = true;
    setActive((i) => (Math.min(i, flat.length - 1) + delta + flat.length) % flat.length);
  }

  function jumpGroup(dir: 1 | -1) {
    if (groups.length < 2 || !activeRow) {
      return;
    }
    let gi = groups.findIndex((g) => g.rows.some((r) => r.key === activeRow.key));
    gi = (gi + dir + groups.length) % groups.length;
    const first = groups[gi].rows[0];
    keyNav.current = true;
    setActive(flat.findIndex((r) => r.key === first.key));
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        move(-1);
        break;
      case 'PageDown':
        e.preventDefault();
        move(5);
        break;
      case 'PageUp':
        e.preventDefault();
        move(-5);
        break;
      case 'Tab':
        // focus stays in the search field (focus trap); Tab walks the groups instead
        e.preventDefault();
        jumpGroup(e.shiftKey ? -1 : 1);
        if (document.activeElement !== inputRef.current) inputRef.current?.focus();
        break;
      case 'Enter':
        if (e.nativeEvent.isComposing) return;
        e.preventDefault();
        if (activeRow) run(activeRow, e.metaKey || e.ctrlKey);
        break;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        onClose();
        break;
    }
  }

  const mod = isMac() ? '⌘' : 'Ctrl';
  const listId = `${uid}-list`;
  const resultCount = noMatch ? 0 : flat.length;

  return (
    <>
      {mounted && (
        <div className="cmdk" data-state={closing ? 'closing' : 'open'} ref={dialogRef}>
          <div className="cmdk__backdrop" aria-hidden="true" onMouseDown={onClose} />
          <div
            className="cmdk__panel"
            role="dialog"
            aria-modal="true"
            aria-label={t.dialog}
            onKeyDown={onKeyDown}
            onMouseDown={(e) => {
              // keep focus in the search field (clicks on padding, headings or answers)
              if (e.target !== inputRef.current) e.preventDefault();
            }}
          >
            <div className="cmdk__bar">
              <span className="cmdk__lens" data-on={query ? '' : undefined}>
                <Svg name="search" size={18} />
              </span>
              <input
                ref={inputRef}
                className="cmdk__input"
                type="text"
                role="combobox"
                aria-label={t.inputLabel}
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeRow?.key}
                aria-describedby={`${uid}-help`}
                placeholder={t.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="go"
              />
              <button type="button" className="cmdk__close" onClick={onClose} tabIndex={-1} aria-label={t.close}>
                <span className="cmdk__close-esc">Esc</span>
                <span className="cmdk__close-x">
                  <Svg name="close" size={18} />
                </span>
              </button>
            </div>
            <p id={`${uid}-help`} className="cmdk-sr">
              {t.help}
            </p>

            {!query && (
              <div className="cmdk__try" aria-hidden="true">
                <span className="cmdk__try-label">{t.try}</span>
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    tabIndex={-1}
                    className="cmdk__chip"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setQuery(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {noMatch && (
              <div className="cmdk__empty">
                <p className="cmdk__empty-title">{t.empty(query.trim())}</p>
                <p className="cmdk__empty-body">{t.emptyBody}</p>
              </div>
            )}

            <div className="cmdk__list" id={listId} role="listbox" aria-label={t.dialog} ref={listRef}>
              {groups.map((g) => (
                <div key={g.id} role="group" aria-labelledby={`${uid}-g-${g.id}`} className="cmdk__group">
                  <div id={`${uid}-g-${g.id}`} className="cmdk__group-head" aria-hidden="true">
                    <span>{t.groups[g.id]}</span>
                    <span className="cmdk__group-n">
                      {String(g.rows.length).padStart(2, '0')}
                    </span>
                  </div>
                  {g.rows.map((row) => {
                    const idx = flat.indexOf(row);
                    const on = activeRow?.key === row.key;
                    const it = row.item;
                    const isAnswer = it.group === 'answers';
                    const here = it.run.kind === 'go' && !isAnswer && it.group === 'pages' && (it.run.href.replace(/\/$/, '') || '/') === path;
                    return (
                      <div
                        key={row.key}
                        id={row.key}
                        role="option"
                        aria-selected={on}
                        className={`cmdk__opt${isAnswer ? ' cmdk__opt--answer' : ''}`}
                        data-active={on ? '' : undefined}
                        onMouseMove={() => idx !== active && setActive(idx)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => run(row, e.metaKey || e.ctrlKey)}
                      >
                        <span className="cmdk__ico">
                          <Svg name={it.icon} size={17} />
                        </span>
                        <span className="cmdk__body">
                          <span className="cmdk__label">
                            <Highlight text={it.label} indices={row.indices} />
                          </span>
                          {isAnswer ? (
                            <span className="cmdk__answer">
                              {it.answer}
                              <span className="cmdk__cta">
                                {it.cta}
                                <Svg name="arrow-right" size={13} stroke={1.8} />
                              </span>
                            </span>
                          ) : (
                            it.hint && <span className="cmdk__hint">{it.hint}</span>
                          )}
                        </span>
                        <span className="cmdk__meta">
                          {isAnswer && <span className="cmdk__tag">{t.answerTag}</span>}
                          {here && <span className="cmdk__tag cmdk__tag--here">{t.here}</span>}
                          {!isAnswer && !here && it.meta && <span className="cmdk__path">{it.meta}</span>}
                          <span className="cmdk__enter" aria-hidden="true">
                            <Svg name="enter" size={14} stroke={1.7} />
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="cmdk__foot" aria-hidden="true">
              <span className="cmdk__keys">
                <span className="cmdk__key">
                  <kbd>↑</kbd>
                  <kbd>↓</kbd>
                  {t.hints.move}
                </span>
                <span className="cmdk__key">
                  <kbd>↵</kbd>
                  {t.hints.open}
                </span>
                <span className="cmdk__key cmdk__key--wide">
                  <kbd>Tab</kbd>
                  {t.hints.groups}
                </span>
                <span className="cmdk__key cmdk__key--wide">
                  <kbd>{mod}</kbd>
                  <kbd>↵</kbd>
                  {t.hints.newTab}
                </span>
              </span>
              <span className="cmdk__brand">
                <span className="cmdk__dot" />
                Sandbox · {lang.toUpperCase()}
              </span>
            </div>

            <div className="cmdk-sr" aria-live="polite" aria-atomic="true">
              {query.trim() ? (resultCount ? t.count(resultCount) : t.noResults) : ''}
            </div>
          </div>
        </div>
      )}

      <div className="cmdk-toast" role="status" aria-live="polite" data-show={toast ? '' : undefined}>
        {toast && (
          <span key={toast.n} className="cmdk-toast__in">
            <span className="cmdk-toast__ok">
              <Svg name="check" size={14} stroke={2.2} />
            </span>
            {toast.text}
          </span>
        )}
      </div>
    </>
  );
}
