import type { L10n } from '@/i18n';

export type Owner = 'you' | 'sbx' | 'both';

export interface PartnersCopy {
  bar: string;
  barMeta: string;
  modelsLabel: string;
  stageCol: string;
  you: string;
  sbx: string;
  both: string;
  /** Short owner labels for narrow screens. */
  short: { you: string; sbx: string; both: string };
  clientSees: string;
  youOwn: (n: number, total: number) => string;
  cta: string;
  stages: string[];
  models: { id: string; name: string; line: string; summary: string; sees: string; owners: Owner[] }[];
}

/**
 * Ownership per stage, in the order of `stages`:
 * finding the client · relationship · selling · scoping · build & operation · brand · first-line support · invoicing
 */
const WL: Owner[] = ['you', 'you', 'you', 'both', 'sbx', 'you', 'you', 'you'];
const CO: Owner[] = ['you', 'you', 'both', 'both', 'sbx', 'both', 'both', 'you'];
const REF: Owner[] = ['you', 'sbx', 'sbx', 'sbx', 'sbx', 'sbx', 'sbx', 'sbx'];

export const COPY: L10n<PartnersCopy> = {
  en: {
    bar: 'Partnership models',
    barMeta: 'Who owns each stage',
    modelsLabel: 'Choose a model',
    stageCol: 'Stage',
    you: 'Your agency',
    sbx: 'Sandbox',
    both: 'Together',
    short: { you: 'You', sbx: 'Sandbox', both: 'Together' },
    clientSees: 'Your client sees',
    youOwn: (n, total) => `You lead ${n} of ${total} stages`,
    cta: 'Talk about this model',
    stages: ['Finding the client', 'Client relationship', 'Selling & proposal', 'Scoping', 'Build & operation', 'Brand on deliverables', 'First-line support', 'Invoicing the client'],
    models: [
      {
        id: 'white-label', name: 'White-label', line: 'Your brand, our build',
        summary: 'You sell and deliver under your brand. We design, build and run the system behind your team, and join pre-sales when you need us.',
        sees: 'Your brand only',
        owners: WL,
      },
      {
        id: 'co-delivery', name: 'Co-delivery', line: 'One team, openly',
        summary: 'We join the project as your AI partner. You lead strategy and the relationship; we lead the build and transfer knowledge to your team.',
        sees: 'Your brand, with Sandbox as your AI partner',
        owners: CO,
      },
      {
        id: 'referral', name: 'Referral', line: 'You introduce, we deliver',
        summary: 'You make the introduction. We scope, sell and deliver directly, and keep you posted on how the project goes.',
        sees: 'Sandbox, introduced by you',
        owners: REF,
      },
    ],
  },
  es: {
    bar: 'Modelos de alianza',
    barMeta: 'Quién se encarga de cada etapa',
    modelsLabel: 'Elige un modelo',
    stageCol: 'Etapa',
    you: 'Tu agencia',
    sbx: 'Sandbox',
    both: 'En conjunto',
    short: { you: 'Tú', sbx: 'Sandbox', both: 'En conjunto' },
    clientSees: 'Tu cliente ve',
    youOwn: (n, total) => `Lideras ${n} de ${total} etapas`,
    cta: 'Conversar sobre este modelo',
    stages: ['Conseguir al cliente', 'Relación con el cliente', 'Venta y propuesta', 'Alcance', 'Construcción y operación', 'Marca en los entregables', 'Soporte de primera línea', 'Facturación al cliente'],
    models: [
      {
        id: 'white-label', name: 'Marca blanca', line: 'Tu marca, nuestra construcción',
        summary: 'Vendes y entregas con tu marca. Nosotros diseñamos, construimos y operamos el sistema detrás de tu equipo, y te acompañamos en la preventa cuando lo necesitas.',
        sees: 'Solo tu marca',
        owners: WL,
      },
      {
        id: 'co-delivery', name: 'Entrega conjunta', line: 'Un solo equipo, a la vista',
        summary: 'Nos sumamos al proyecto como tu partner de IA. Tú lideras la estrategia y la relación; nosotros, la construcción, y le transferimos conocimiento a tu equipo.',
        sees: 'Tu marca, con Sandbox como partner de IA',
        owners: CO,
      },
      {
        id: 'referral', name: 'Referidos', line: 'Tú presentas, nosotros entregamos',
        summary: 'Tú haces la presentación. Nosotros definimos el alcance, vendemos y entregamos directamente, y te mantenemos al tanto del proyecto.',
        sees: 'Sandbox, presentado por ti',
        owners: REF,
      },
    ],
  },
};
