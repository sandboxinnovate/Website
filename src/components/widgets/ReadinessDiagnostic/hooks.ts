import { useEffect, useRef, useState, type RefObject } from 'react';
import { easeOutExpo } from './geometry';

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

/**
 * Tween an array of numbers toward `target` with ease-out-expo.
 * Starts from `from` (defaults to the target, i.e. no intro animation).
 */
export function useTween(target: number[], opts: { duration?: number; from?: number[]; instant?: boolean; delay?: number } = {}): number[] {
  const { duration = 1100, from, instant = false, delay = 0 } = opts;
  const [vals, setVals] = useState<number[]>(() => (from ?? target).slice());
  const cur = useRef<number[]>(vals);
  const key = target.map((v) => v.toFixed(3)).join('|');

  useEffect(() => {
    if (instant) {
      cur.current = target.slice();
      setVals(target.slice());
      return;
    }
    const start = cur.current.slice();
    let raf = 0;
    let t0 = 0;
    const timer = window.setTimeout(() => {
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
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, instant, duration, delay]);

  return vals;
}

/** True while `ref` is at least `threshold` visible. */
export function useInView(ref: RefObject<Element | null>, threshold = 0.2): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/** True while the document is visible (tab focused / not minimised). */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    on();
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  return visible;
}
