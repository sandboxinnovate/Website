import { useEffect, useRef } from 'react';
import type { Lang } from '@/i18n';
import { HERO_BRAIN_COPY } from './copy';
import { createHeroBrain } from './engine';

interface Props {
  lang: Lang;
  className?: string;
  /** Lab / QA only: force the reduced-motion still frame. */
  still?: boolean;
}

/**
 * Signature hero visual: the Sandbox cube drawn as a living network.
 * Fills its parent (the parent defines the size); the background stays transparent.
 */
export default function HeroBrain({ lang, className, still = false }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copy = HERO_BRAIN_COPY[lang] ?? HERO_BRAIN_COPY.en;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const engine = createHeroBrain(canvas, host, { ops: copy.ops, still });
    return () => engine.destroy();
  }, [copy, still]);

  return (
    <div
      ref={hostRef}
      className={className}
      data-hero-brain=""
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <p className="sr-only">{copy.description}</p>
    </div>
  );
}
