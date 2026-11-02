/**
 * Open Graph image for a post: generated at build time by src/pages/og/blog/[key].png.ts
 * (one per translationKey, shared by the EN and ES versions; falls back to the site default if sharp is missing).
 */
export const OG_DEFAULT = '/og/default.png';
export const ogImagePath = (translationKey: string): string => `/og/blog/${translationKey}.png`;
