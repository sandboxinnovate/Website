import type { Lang } from '@/i18n';
import Full from './Full';
import Teaser from './Teaser';
import './ReadinessDiagnostic.css';

interface Props {
  lang: Lang;
  /** 'full' = the complete diagnostic (on /diagnostic). 'teaser' = ~560×520 card that hands off to it. */
  variant?: 'full' | 'teaser';
  /** Lab / QA only: render the results screen for these answers (0-3 each). Not persisted. */
  demoAnswers?: number[];
  /** Persist progress in sessionStorage (default true). */
  persist?: boolean;
}

/**
 * AI Readiness Diagnostic: Sandbox's main lead magnet.
 * 10 questions × 5 dimensions → deterministic 0-100 score, maturity level, radar and three moves
 * mapped to Sandbox units, then an optional lead form (full report + 30-minute review call).
 */
export default function ReadinessDiagnostic({ lang, variant = 'full', demoAnswers, persist = true }: Props) {
  if (variant === 'teaser') return <Teaser lang={lang} />;
  return <Full lang={lang} demoAnswers={demoAnswers} persist={persist} />;
}
