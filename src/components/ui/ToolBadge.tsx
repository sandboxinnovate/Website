/**
 * React twin of ToolBadge.astro: a tinted "app tile" with a generic line icon for a business tool,
 * optionally followed by its label. Styles are inline so any island can use it without extra CSS.
 *   <ToolBadge tool="crm" lang={lang} />
 *   <ToolBadge tool="email" lang={lang} label={false} size={22} />
 */
import type { CSSProperties } from 'react';
import { TOOL_ICONS, TOOL_TINTS, type ToolKey } from './tool-icons';

type Lang = 'en' | 'es';

export function ToolTile({ tool, lang, size = 28, title }: { tool: ToolKey; lang: Lang; size?: number; title?: string }) {
  const t = TOOL_ICONS[tool];
  const [bg, fg] = TOOL_TINTS[t.tint];
  const style: CSSProperties = {
    flex: 'none', display: 'grid', placeItems: 'center', width: size, height: size, borderRadius: size * 0.3,
    background: bg, color: fg, boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .06)',
  };
  return (
    <span style={style} {...(title === '' ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title ?? t.label[lang] })}>
      <svg viewBox="0 0 24 24" width="58%" height="58%" fill="none" stroke="currentColor" strokeWidth={1.6}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: t.paths }} />
    </span>
  );
}

export function ToolBadge({ tool, lang, label = true, size = 28 }: { tool: ToolKey; lang: Lang; label?: boolean | string; size?: number }) {
  const text = typeof label === 'string' ? label : TOOL_ICONS[tool].label[lang];
  if (label === false) return <ToolTile tool={tool} lang={lang} size={size} />;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
      <ToolTile tool={tool} lang={lang} size={size} title="" />
      <span style={{ fontSize: size >= 34 ? 14 : 13, color: 'var(--color-bone)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
    </span>
  );
}

export type { ToolKey };
