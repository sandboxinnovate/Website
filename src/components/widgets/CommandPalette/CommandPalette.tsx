import { useEffect, useRef, useState, type ComponentType } from 'react';
import type { Lang } from '@/i18n';
import type { PaletteProps } from './Palette';

/**
 * Global command palette (mounted once in Base.astro with client:idle).
 *
 * This root stays tiny: it only listens for ⌘K / Ctrl+K and the `sbx:cmdk` window event
 * and renders nothing until the first open. The panel itself (UI, search, styles) is a
 * separate chunk loaded on demand, and warmed up when a pointer heads for a trigger.
 *
 *   window.dispatchEvent(new CustomEvent('sbx:cmdk', { detail: { open: true, query: 'pricing' } }))
 *   detail.open === false closes it; detail.toggle === true toggles it.
 */

type Panel = ComponentType<PaletteProps>;
/** Flags shared with the nav script: it queues an open request until this island is ready. */
type CmdkWindow = Window & { __sbxCmdkReady?: boolean; __sbxCmdkQueued?: boolean | string };
let chunk: Promise<{ default: Panel }> | null = null;
const load = () => (chunk ??= import('./Palette'));

export default function CommandPalette({ lang }: { lang: Lang }) {
  const [PanelComp, setPanel] = useState<Panel | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const openRef = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = (q = '') => {
      if (!openRef.current) returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      openRef.current = true;
      setQuery(q);
      setOpen(true);
      load()
        .then((m) => setPanel(() => m.default))
        .catch(() => {
          // chunk failed (offline?): reset so the next attempt retries
          chunk = null;
          openRef.current = false;
          setOpen(false);
        });
    };
    const hide = () => {
      openRef.current = false;
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      const isK = e.key === 'k' || e.key === 'K' || e.code === 'KeyK';
      if (isK && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        if (openRef.current) hide();
        else show();
      } else if (e.key === 'Meta' || e.key === 'Control') {
        void load(); // likely about to press K
      }
    };
    const onEvent = (e: Event) => {
      const d = ((e as CustomEvent).detail ?? {}) as { open?: boolean; toggle?: boolean; query?: string };
      if (d.open === false || (d.toggle && openRef.current)) hide();
      else show(typeof d.query === 'string' ? d.query : '');
    };
    const warm = (e: Event) => {
      const el = e.target as Element | null;
      if (el && typeof el.closest === 'function' && el.closest('[data-cmdk-open]')) void load();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('sbx:cmdk', onEvent);
    document.addEventListener('pointerover', warm, { passive: true });
    document.addEventListener('focusin', warm);

    // Hand-shake with the nav: a ⌘K / click before this island hydrated is queued, not lost.
    const w = window as CmdkWindow;
    w.__sbxCmdkReady = true;
    if (w.__sbxCmdkQueued) {
      const q = w.__sbxCmdkQueued;
      w.__sbxCmdkQueued = false;
      show(typeof q === 'string' ? q : '');
    }

    return () => {
      w.__sbxCmdkReady = false;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('sbx:cmdk', onEvent);
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
    };
  }, []);

  if (!PanelComp) return null;
  return (
    <PanelComp
      lang={lang}
      open={open}
      initialQuery={query}
      returnFocus={returnFocus}
      onClose={() => {
        openRef.current = false;
        setOpen(false);
      }}
    />
  );
}
