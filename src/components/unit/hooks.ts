import { useEffect, useState, type KeyboardEvent, type RefObject } from 'react';

/** True while the element is on screen and the tab is visible — used to pause CSS loops. */
export function useActive(ref: RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, [ref]);
  return inView && visible;
}

/**
 * Roving-tabindex keyboard handler for a tablist: ←/→ (and ↑/↓), Home, End.
 * Selection follows focus, as in the WAI-ARIA tabs pattern with automatic activation.
 */
export function tabKeys(count: number, current: number, select: (i: number) => void, ids: string[]) {
  return (e: KeyboardEvent<HTMLElement>) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % count;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + count) % count;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = count - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    document.getElementById(ids[next])?.focus();
  };
}
