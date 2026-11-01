import type { L10n } from '@/i18n';
import type { UnitSlug } from '@/data/site';
import type { UnitCopy } from './types';
import { BRAINS } from './brains';
import { CONSULTING } from './consulting';
import { GROWTH } from './growth';
import { ACADEMY } from './academy';
import { PRODUCTS } from './products';
import { PARTNERS } from './partners';

export type { UnitCopy, UnitOffer, UnitStep, UnitCase } from './types';
export { UNIT_COMMON } from './common';

/** Service-page copy for each unit, in every language. */
export const UNIT_COPY: Record<UnitSlug, L10n<UnitCopy>> = {
  brains: BRAINS,
  consulting: CONSULTING,
  growth: GROWTH,
  academy: ACADEMY,
  products: PRODUCTS,
  partners: PARTNERS,
};
