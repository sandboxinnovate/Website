/**
 * Generic icons for the business tools our systems connect to (CRM, email, docs, team chat...).
 * Shared by Astro (ToolBadge.astro) and React islands (ToolBadge.tsx), so every widget shows the
 * same "app tile" for the same tool. These are generic pictograms on purpose: no third-party logos.
 *
 * Each tool has 24x24 line-icon paths (stroke = currentColor), a short label in EN/ES and a tint
 * (one of the brand-safe hues below) used for the tile background.
 */
import type { BrandKey } from './brand-icons';

export type ToolKey =
  | 'crm' | 'email' | 'docs' | 'kb' | 'chat' | 'calendar' | 'web' | 'ads' | 'reports' | 'sheet'
  | 'phone' | 'messaging' | 'forms' | 'tickets' | 'billing' | 'files' | 'ai' | 'social' | 'video' | 'store';

export type ToolTint = 'flame' | 'sky' | 'mint' | 'violet' | 'sand' | 'rose';

export interface ToolIcon {
  paths: string;
  /** Example brands for this kind of tool, most common first. The first one is drawn in tiles. */
  brands?: BrandKey[];
  label: { en: string; es: string };
  tint: ToolTint;
}

export const TOOL_ICONS: Record<ToolKey, ToolIcon> = {
  crm: {
    label: { en: 'CRM', es: 'CRM' }, tint: 'flame',
    brands: ['hubspot', 'salesforce', 'gohighlevel'],
    paths: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h3.5M14.5 13.5h2.5"/>',
  },
  email: {
    label: { en: 'Email', es: 'Correo' }, tint: 'sky',
    brands: ['gmail', 'outlook'],
    paths: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7.5 8 5.5 8-5.5"/>',
  },
  docs: {
    label: { en: 'Docs', es: 'Documentos' }, tint: 'sky',
    brands: ['googledocs', 'notion'],
    paths: '<path d="M7 3.5h6.5L18 8v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5Z"/><path d="M13 3.5V8h5M9 12h6M9 15.5h6"/>',
  },
  kb: {
    label: { en: 'Knowledge base', es: 'Base de conocimiento' }, tint: 'violet',
    brands: ['notion', 'googledrive'],
    paths: '<path d="M4.5 5.5A2 2 0 0 1 6.5 3.5H19v14H6.5a2 2 0 0 0-2 2Z"/><path d="M4.5 19.5a2 2 0 0 0 2 1H19v-3M9 8h6M9 11h4"/>',
  },
  chat: {
    label: { en: 'Team chat', es: 'Chat del equipo' }, tint: 'violet',
    brands: ['googlechat', 'slack', 'teams'],
    paths: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16h0A1.5 1.5 0 0 1 4 14.5Z"/><path d="M8.5 9h7M8.5 12h4.5"/>',
  },
  calendar: {
    label: { en: 'Calendar', es: 'Calendario' }, tint: 'rose',
    brands: ['googlecalendar', 'calendly', 'outlook'],
    paths: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><rect x="7.5" y="12.5" width="3.5" height="3.5" rx=".8"/>',
  },
  web: {
    label: { en: 'Website', es: 'Sitio web' }, tint: 'mint',
    paths: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5Z"/>',
  },
  ads: {
    label: { en: 'Ads', es: 'Anuncios' }, tint: 'flame',
    brands: ['meta', 'googleads', 'tiktok'],
    paths: '<path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',
  },
  reports: {
    label: { en: 'Reports', es: 'Reportes' }, tint: 'mint',
    brands: ['googleanalytics', 'looker'],
    paths: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 16.5v-4M12 16.5V8M16 16.5v-6"/>',
  },
  sheet: {
    label: { en: 'Spreadsheet', es: 'Hoja de cálculo' }, tint: 'mint',
    brands: ['googlesheets', 'excel', 'airtable'],
    paths: '<rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M3.5 9h17M3.5 14h17M9.5 4v16"/>',
  },
  phone: {
    label: { en: 'Phone', es: 'Teléfono' }, tint: 'sand',
    paths: '<path d="M6.5 3.5h2.8l1.4 4-2 1.3a10 10 0 0 0 6.5 6.5l1.3-2 4 1.4v2.8a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 5.1a1.5 1.5 0 0 1 1.5-1.6Z"/>',
  },
  messaging: {
    label: { en: 'Messaging', es: 'Mensajería' }, tint: 'mint',
    brands: ['whatsapp', 'instagram', 'telegram'],
    paths: '<path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 10.5h6M9 13.5h3.5"/>',
  },
  forms: {
    label: { en: 'Web form', es: 'Formulario' }, tint: 'sand',
    paths: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><rect x="7.5" y="7" width="9" height="2.5" rx=".8"/><rect x="7.5" y="11.5" width="9" height="2.5" rx=".8"/><path d="M7.5 17h4"/>',
  },
  tickets: {
    label: { en: 'Help desk', es: 'Mesa de ayuda' }, tint: 'rose',
    brands: ['zendesk', 'intercom'],
    paths: '<path d="M3.5 8a1.5 1.5 0 0 1 1.5-1.5h14A1.5 1.5 0 0 1 20.5 8v2a2 2 0 0 0 0 4v2a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 16v-2a2 2 0 0 0 0-4Z"/><path d="M14.5 6.5v11" stroke-dasharray="1.5 2"/>',
  },
  billing: {
    label: { en: 'Billing', es: 'Facturación' }, tint: 'sand',
    brands: ['quickbooks', 'stripe', 'xero'],
    paths: '<path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
  },
  files: {
    label: { en: 'Shared drive', es: 'Carpeta compartida' }, tint: 'sky',
    brands: ['googledrive', 'dropbox'],
    paths: '<path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4.2l2 2.2H19A1.5 1.5 0 0 1 20.5 9.2V17.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5Z"/>',
  },
  ai: {
    label: { en: 'AI assistants', es: 'Asistentes de IA' }, tint: 'violet',
    paths: '<path d="M12 3.5 13.8 9 19.5 10.8 13.8 12.6 12 18.2 10.2 12.6 4.5 10.8 10.2 9Z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z"/>',
  },
  social: {
    label: { en: 'Social', es: 'Redes sociales' }, tint: 'rose',
    brands: ['instagram', 'facebook', 'linkedin'],
    paths: '<circle cx="7" cy="12" r="2.5"/><circle cx="17" cy="6.5" r="2.5"/><circle cx="17" cy="17.5" r="2.5"/><path d="m9.2 10.8 5.6-3M9.2 13.2l5.6 3"/>',
  },
  video: {
    label: { en: 'Video calls', es: 'Videollamadas' }, tint: 'sky',
    brands: ['zoom', 'googlemeet', 'teams'],
    paths: '<rect x="3" y="6.5" width="12.5" height="11" rx="2.5"/><path d="m15.5 10.5 5.5-3v9l-5.5-3"/>',
  },
  store: {
    label: { en: 'Online store', es: 'Tienda online' }, tint: 'flame',
    brands: ['shopify', 'woocommerce', 'mercadopago'],
    paths: '<path d="M4 9.5 5.5 4.5h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5.5 12v7.5h13V12M10 19.5v-4h4v4"/>',
  },
};

/** CSS custom-property values for each tint: [tile background, icon colour]. Works on the dark site. */
export const TOOL_TINTS: Record<ToolTint, [string, string]> = {
  flame: ['rgb(245 131 39 / .14)', '#f9a35c'],
  sky: ['rgb(96 165 250 / .14)', '#93c0fb'],
  mint: ['rgb(74 222 160 / .13)', '#7fe0b4'],
  violet: ['rgb(167 139 250 / .15)', '#c2b0fb'],
  sand: ['rgb(234 200 140 / .14)', '#e8cb98'],
  rose: ['rgb(251 113 133 / .13)', '#f8a0ae'],
};
