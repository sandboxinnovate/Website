/**
 * Open Graph image for a post: generated at build time by src/pages/og/blog/[key].jpg.ts from the post's cover
 * photo (src/data/blog-covers.ts), one per translationKey, shared by the EN and ES versions.
 * Posts without a cover photo use the site default image.
 */
import { coverFor } from '@/data/blog-covers';

export const OG_DEFAULT = '/og/default.png';
export const ogImagePath = (translationKey: string): string =>
  coverFor(translationKey) ? `/og/blog/${translationKey}.jpg` : OG_DEFAULT;
