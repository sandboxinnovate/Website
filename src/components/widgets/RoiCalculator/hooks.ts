import { useEffect, useRef, useState, type RefObject } from 'react';

export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** prefers-reduced-motion, live. SSR-safe (false until mounted). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Becomes true the first time `ref` is visible, then stays true. */
export function useSeenOnce(ref: RefObject<Element | null>, threshold = 0.2): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, seen]);
  return seen;
}

/**
 * Tween an array of numbers toward `target` with ease-out-expo.
 * `from` sets the starting values on mount (e.g. zeros for a count-up intro).
 * Skips frames while the tab is hidden (rAF does that for us).
 */
export function useTween(target: number[], opts: { duration?: number; from?: number[]; instant?: boolean; enabled?: boolean } = {}): number[] {
  const { duration = 900, from, instant = false, enabled = true } = opts;
  const [vals, setVals] = useState<number[]>(() => (from ?? target).slice());
  const cur = useRef<number[]>(vals);
  const key = target.map((v) => v.toFixed(4)).join('|');

  useEffect(() => {
    if (!enabled) return;
    if (instant) {
      cur.current = target.slice();
      setVals(target.slice());
      return;
    }
    const start = cur.current.slice();
    // Already there (e.g. the first render): nothing to animate.
    if (start.length === target.length && target.every((v, i) => v === start[i])) return;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / duration);
      const e = easeOutExpo(p);
      const next = target.map((v, i) => (start[i] ?? 0) + (v - (start[i] ?? 0)) * e);
      cur.current = next;
      setVals(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, instant, duration, enabled]);

  return vals;
}

/** Width of an element, live (ResizeObserver). */
export function useWidth(ref: RefObject<Element | null>, fallback: number): number {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(Math.max(1, Math.round(el.getBoundingClientRect().width)));
    measure();
    if (!('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

/** `value`, but only after it has stopped changing for `ms`. */
export function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setV(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return v;
}

/** localStorage-backed state; every access guarded (private mode, blocked storage). */
export function useStoredChoice<T extends string>(key: string, initial: T, allowed: readonly T[]): [T, (v: T) => void] {
  const [v, setV] = useState<T>(initial);
  useEffect(() => {
    try {
      const s = window.localStorage.getItem(key);
      if (s && (allowed as readonly string[]).includes(s)) setV(s as T);
    } catch {
      /* storage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = (next: T) => {
    setV(next);
    try {
      window.localStorage.setItem(key, next);
    } catch {
      /* storage unavailable */
    }
  };
  return [v, set];
}
