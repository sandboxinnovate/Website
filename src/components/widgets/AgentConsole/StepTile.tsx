import type { Lang } from '@/i18n';
import { ToolTile } from '@/components/ui/ToolBadge';
import { TOOL_ICONS } from '@/components/ui/tool-icons';
import type { StepTool } from './scenarios';
import Ico from './Ico';

/** The app tile for a step's tool, or a "person" tile for the human approval step. Decorative. */
export default function StepTile({ tool, lang, size = 28 }: { tool: StepTool; lang: Lang; size?: number }) {
  if (tool === 'person') {
    return (
      <span className="ac-person" style={{ width: size, height: size, borderRadius: size * 0.3 }} aria-hidden="true">
        <Ico name="user" size={Math.round(size * 0.58)} stroke={1.6} />
      </span>
    );
  }
  return <ToolTile tool={tool} lang={lang} size={size} title="" />;
}

/** Short tool name for step cards ("AI" reads better there than the shared "AI assistants"). */
export const toolName = (tool: StepTool, lang: Lang, person: string) =>
  tool === 'person' ? person : tool === 'ai' ? (lang === 'es' ? 'IA' : 'AI') : TOOL_ICONS[tool].label[lang];
