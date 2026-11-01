import type { IconName } from '@/data/site';

/**
 * Hand-drawn 24×24 line icons (stroke = currentColor, 1.5px).
 * Shared by Astro (Icon.astro) and React islands (import { ICONS } and render the paths).
 */
export const ICONS: Record<IconName, string> = {
  brain:
    '<path d="M9 4.5a3 3 0 0 0-3 3v.2A3.3 3.3 0 0 0 4 10.8a3.3 3.3 0 0 0 1 2.4A3.5 3.5 0 0 0 7.5 19 2.5 2.5 0 0 0 12 19.5V6a1.8 1.8 0 0 0-3-1.5Z"/><path d="M15 4.5a3 3 0 0 1 3 3v.2a3.3 3.3 0 0 1 2 3.1 3.3 3.3 0 0 1-1 2.4A3.5 3.5 0 0 1 16.5 19 2.5 2.5 0 0 1 12 19.5"/><path d="M12 6a1.8 1.8 0 0 1 3-1.5"/><circle cx="8.5" cy="11" r="1"/><circle cx="15.5" cy="13" r="1"/><path d="M9.5 11h2.5M12 13h2.5"/>',
  compass:
    '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/><path d="M12 3.5v1.5M12 19v1.5M3.5 12H5M19 12h1.5"/>',
  growth:
    '<path d="M3.5 19.5h17"/><path d="M5 15.5l4.2-4.2 3.3 3.3 6.5-6.6"/><path d="M14.5 8h4.5v4.5"/>',
  academy:
    '<path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z"/><path d="M6.5 11v4.6c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2V11"/><path d="M21.5 9v5.5"/>',
  box:
    '<path d="M12 2.8 20 7.4v9.2L12 21.2l-8-4.6V7.4l8-4.6Z"/><path d="M4 7.4 12 12l8-4.6M12 12v9.2"/>',
  handshake:
    '<path d="m11 7.5-1.6-1.2a2.6 2.6 0 0 0-2.9-.1L3 8.5v6l2 .8"/><path d="m21 8.5-3.4-2.3a2.6 2.6 0 0 0-2.8 0L10 9.3a1.4 1.4 0 0 0 1.4 2.4l2.1-1.1 4.5 4.1L21 14.5v-6Z"/><path d="m18 14.7-1.2 1.2M5 15.3l3.7 3.2a1.4 1.4 0 0 0 2-.2M9.8 13.8l3.2 2.7a1.4 1.4 0 0 0 2-.1l1.8-1.8"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  'arrow-right': '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19.5 12h-15M10.5 6l-6 6 6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  spark: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 16.5c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2Z"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H12l-1 8L19.5 10.5H12l1-8Z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  command: '<path d="M9 6.5A2.5 2.5 0 1 0 6.5 9H9V6.5Zm0 0v11m0 0A2.5 2.5 0 1 1 6.5 15H9m0 2.5V15m6-8.5A2.5 2.5 0 1 1 17.5 9H15V6.5Zm0 0v11m0 0a2.5 2.5 0 1 0 2.5-2.5H15M9 9h6M9 15h6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  shield: '<path d="M12 3 5 5.8v5.4c0 4.4 3 8.3 7 9.8 4-1.5 7-5.4 7-9.8V5.8L12 3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  layers: '<path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
  flow: '<rect x="3" y="4" width="6" height="5" rx="1.5"/><rect x="15" y="4" width="6" height="5" rx="1.5"/><rect x="9" y="15" width="6" height="5" rx="1.5"/><path d="M6 9v2.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V9M12 13v2"/>',
  chat: '<path d="M20.5 12a8 8 0 0 1-11.7 7.1L3.5 20.5l1.4-5.1A8 8 0 1 1 20.5 12Z"/><path d="M8.5 11h7M8.5 14h4"/>',
  chart: '<path d="M4 20V4M4 20h16"/><rect x="7.5" y="12" width="3" height="5" rx=".8"/><rect x="12.5" y="8" width="3" height="9" rx=".8"/><rect x="17.5" y="5" width="3" height="12" rx=".8"/>',
};
