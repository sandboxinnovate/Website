/**
 * React twin of ToolBadge.astro. Tiles show the tool's example brands (CRM -> HubSpot, Salesforce,
 * GoHighLevel; Ads -> Meta, Google Ads, TikTok...) or a generic icon for tools without brands.
 *   <ToolBadge tool="crm" lang={lang} />                  brand marks + "CRM"
 *   <ToolTile tool="email" lang={lang} size={22} />        main brand only (Gmail)
 *   <ToolTile tool="ai" lang={lang} brand="perplexity" />  a specific brand
 */
import type { BrandKey } from './brand-icons';
import { TOOL_ICONS, type ToolKey } from './tool-icons';
import { brandNames, clusterSVG, tileSVG } from './tool-render';

type Lang = 'en' | 'es';

export function ToolTile({ tool, lang, size = 28, title, brand, generic }: { tool: ToolKey; lang: Lang; size?: number; title?: string; brand?: BrandKey; generic?: boolean }) {
  const label = title === '' ? undefined : (title ?? TOOL_ICONS[tool].label[lang]);
  return <span style={{ display: 'inline-flex', flex: 'none' }} dangerouslySetInnerHTML={{ __html: tileSVG(tool, { size, brand, generic, label }) }} />;
}

export function ToolBadge({ tool, lang, label = true, size = 28, max = 3 }: { tool: ToolKey; lang: Lang; label?: boolean | string; size?: number; max?: number }) {
  const text = typeof label === 'string' ? label : TOOL_ICONS[tool].label[lang];
  const names = brandNames(tool);
  if (label === false) return <ToolTile tool={tool} lang={lang} size={size} title={names ? `${text}: ${names}` : text} />;
  const { svg } = clusterSVG(tool, { size, max });
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }} title={names || undefined}>
      <span style={{ display: 'inline-flex', flex: 'none' }} dangerouslySetInnerHTML={{ __html: svg }} />
      <span style={{ fontSize: size >= 34 ? 14 : 13, color: 'var(--color-bone)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
    </span>
  );
}

export type { ToolKey };
