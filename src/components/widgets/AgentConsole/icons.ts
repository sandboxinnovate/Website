import { ICONS } from '@/components/ui/icons';

/**
 * Icons used by the agent console: the shared site set plus a few
 * hand-drawn 24×24 line glyphs (stroke = currentColor, 1.5px) specific to workflows.
 */
const EXTRA = {
  play: '<path d="M8 5.8v12.4c0 .6.7 1 1.2.7l9.6-6.2a.8.8 0 0 0 0-1.4L9.2 5.1C8.7 4.8 8 5.2 8 5.8Z"/>',
  pause: '<path d="M8.5 5.5v13M15.5 5.5v13"/>',
  replay: '<path d="M4.6 13a7.5 7.5 0 1 0 1.9-6.4"/><path d="M5 3.8v3.9h3.9"/>',
  form: '<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  building:
    '<path d="M4.5 20.5v-15l7-2v17"/><path d="M11.5 8.5h7a1 1 0 0 1 1 1v11"/><path d="M3 20.5h18"/><path d="M7.5 9h1M7.5 12.5h1M7.5 16h1M14.5 12.5h2M14.5 16h2"/>',
  gauge: '<path d="M4.3 17.5a8.5 8.5 0 1 1 15.4 0"/><path d="M12 14.2 15.6 9"/><circle cx="12" cy="14.5" r="1.4"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  pen: '<path d="m4.5 19.5.8-3.8L15.6 5.4a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.3 18.7l-3.8.8Z"/><path d="m13.8 7.2 3 3"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.3 6.3a1.5 1.5 0 0 1-2.1 0l-8.6-8Z"/><circle cx="8" cy="8" r="1.4"/>',
  book: '<path d="M4.5 18.5v-13a2 2 0 0 1 2-2h13v14h-13a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h13"/><path d="M8.5 8h7M8.5 11h5"/>',
  send: '<path d="M20.5 3.5 10.2 13.8"/><path d="m20.5 3.5-6.4 17-3.9-6.7-6.7-3.9 17-6.4Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10"/>',
  alert: '<path d="M10.3 4.6a2 2 0 0 1 3.4 0l7 12.1a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3l7-12.1Z"/><path d="M12 9.5v4M12 16.6v.1"/>',
  doc: '<path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5l-5-5Z"/><path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h5"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3"/>',
  wave: '<path d="M3.5 12h1.5M7.5 8.5v7M11 5.5v13M14.5 9v6M18 7v10M21 11v2"/>',
  bulb: '<path d="M9.2 17.5h5.6M10 20.5h4"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2v1h5v-1c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
  inbox: '<path d="M3.5 13.5 6 5.5h12l2.5 8v5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-5Z"/><path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5"/>',
  ticket: '<path d="M3.5 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1.5a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V16a2 2 0 0 1 0-4v0a2 2 0 0 0 0-4V6.5a1 1 0 0 0-1-1h-15a1 1 0 0 0-1 1V8Z"/><path d="M14.5 5.5v13" stroke-dasharray="1.5 2"/>',
  repeat: '<path d="M17 3.5 20.5 7 17 10.5"/><path d="M3.5 12V10a3 3 0 0 1 3-3h14"/><path d="M7 20.5 3.5 17 7 13.5"/><path d="M20.5 12v2a3 3 0 0 1-3 3h-14"/>',
} as const;

export const AC_ICONS = { ...ICONS, ...EXTRA };
export type IconKey = keyof typeof AC_ICONS;
