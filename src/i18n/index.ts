/**
 * Minimal i18n layer.
 * - English lives at the root (/), Spanish under /es/.
 * - Every page/component receives `lang` and picks copy from `{ en, es }` objects.
 */
export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

/** A piece of copy available in every language. */
export type L10n<T> = Record<Lang, T>;

export const LANG_META: Record<Lang, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_LA' },
};

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return (LANGS as readonly string[]).includes(first) ? (first as Lang) : DEFAULT_LANG;
}

/** Strip the language prefix: "/es/services/brains" -> "/services/brains" */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/(es)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/**
 * Build a localized href. `path` is the language-neutral path ("/", "/contact", "/#method").
 *   localize('es', '/contact') -> '/es/contact'
 *   localize('en', '/contact') -> '/contact'
 */
export function localize(lang: Lang, path: string): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  if (clean === '/') return `/${lang}/`;
  if (clean.startsWith('/#')) return `/${lang}/${clean.slice(1)}`;
  return `/${lang}${clean}`;
}

/** Same page in the other language. */
export function switchLang(pathname: string, to: Lang): string {
  return localize(to, stripLang(pathname));
}

/** Pick the right language from an `{ en, es }` object. */
export function pick<T>(copy: L10n<T>, lang: Lang): T {
  return copy[lang] ?? copy[DEFAULT_LANG];
}
