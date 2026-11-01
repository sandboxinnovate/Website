import type { Lang } from '@/i18n';

// STUB — to be replaced by the real widget.
export default function AgentConsole({ lang }: { lang: Lang; initialScenario?: string; compact?: boolean }) {
  return <div data-stub="AgentConsole" style={{ padding: 24, border: '1px dashed #444', borderRadius: 16, color: '#888' }}>AgentConsole — stub ({lang})</div>;
}
