/**
 * Blog cover photos, keyed by the post's translationKey (shared by the EN and ES versions).
 * Files live in src/assets/blog/<translationKey>.jpg (2400px wide JPEG, landscape) and are
 * optimized at build time by astro:assets (AVIF/WebP, responsive widths) in PostCover.astro.
 * The per-post OG image (src/pages/og/blog/[key].jpg.ts) is cropped from the same file.
 *
 * Rule: only photos that are "Free to use under the Unsplash License" (never Unsplash+),
 * with no brand logos, no readable personal data and no AI-generated images.
 * `focal` is a CSS object-position ("x% y%") that keeps the subject in frame at 21:9, 16:9 and 4:3.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n';

import companyBrain from '@/assets/blog/what-is-a-company-brain.jpg';
import firstAgent from '@/assets/blog/choosing-your-first-ai-agent.jpg';
import humanInTheLoop from '@/assets/blog/human-in-the-loop-ai-approvals.jpg';
import pilotsStall from '@/assets/blog/why-ai-pilots-stall.jpg';
import measuringRoi from '@/assets/blog/measuring-ai-roi.jpg';
import vendorSecurity from '@/assets/blog/ai-vendor-security-questions.jpg';
import usagePolicy from '@/assets/blog/ai-usage-policy-template.jpg';
import trainingTeams from '@/assets/blog/training-teams-on-ai.jpg';
import geoGuide from '@/assets/blog/generative-engine-optimization-guide.jpg';
import contentSlop from '@/assets/blog/ai-content-without-the-slop.jpg';
import realEstate from '@/assets/blog/ai-for-real-estate-teams.jpg';
import whiteLabel from '@/assets/blog/white-label-ai-for-agencies.jpg';

export interface BlogCover {
  image: ImageMetadata;
  alt: Record<Lang, string>;
  /** CSS object-position, e.g. "45% 70%". */
  focal: string;
  /**
   * Optional exposure multiplier on top of the shared grade (default 1), for photos far darker or brighter
   * than the rest of the series. Applied to the cover (CSS brightness) and the OG image alike.
   */
  exposure?: number;
  credit: {
    /** Photographer's name as shown on Unsplash. */
    name: string;
    /** Photographer's Unsplash profile. */
    url: string;
    /** The photo's page on Unsplash. */
    photoPage: string;
  };
}

export const BLOG_COVERS: Record<string, BlogCover> = {
  'what-is-a-company-brain': {
    image: companyBrain,
    alt: {
      en: 'A hand pulls an index card from an open drawer of a wooden library card catalog',
      es: 'Una mano saca una ficha de un cajón abierto de un fichero de biblioteca de madera',
    },
    focal: '18% 62%',
    credit: { name: 'Daniel Forsman', url: 'https://unsplash.com/@danielforsman', photoPage: 'https://unsplash.com/photos/Ph4ZJrwf4x8' },
  },
  'choosing-your-first-ai-agent': {
    image: firstAgent,
    alt: {
      en: 'Four colleagues lean over a wooden table with coffee mugs, comparing printed sheets spread between them',
      es: 'Cuatro colegas inclinados sobre una mesa de madera con tazas de café comparan hojas impresas entre ellos',
    },
    focal: '48% 40%',
    credit: { name: 'Andreea Avramescu', url: 'https://unsplash.com/@minakko', photoPage: 'https://unsplash.com/photos/wR56AUlEsE4' },
  },
  'human-in-the-loop-ai-approvals': {
    image: humanInTheLoop,
    alt: {
      en: "A person in an orange shirt leans over a dark wooden table to sign a paper while a colleague's hands rest beside it",
      es: 'Una persona con camisa naranja se inclina sobre una mesa oscura para firmar un papel junto a las manos de un colega',
    },
    focal: '62% 45%',
    credit: { name: 'Romain Dancre', url: 'https://unsplash.com/@romaindancre', photoPage: 'https://unsplash.com/photos/doplSDELX7E' },
  },
  'why-ai-pilots-stall': {
    image: pilotsStall,
    alt: {
      en: 'Weathered concrete column with bare rebar jutting from its top in front of an unfinished, abandoned apartment block',
      es: 'Columna de concreto desgastada con varillas expuestas frente a un edificio de departamentos inconcluso y abandonado',
    },
    focal: '45% 38%',
    exposure: 0.88,
    credit: { name: 'Muhammed Faizan Hussain', url: 'https://unsplash.com/@5zantrigger', photoPage: 'https://unsplash.com/photos/xbeeNZCgrFI' },
  },
  'measuring-ai-roi': {
    image: measuringRoi,
    alt: {
      en: 'Hand-drawn line graph on paper beside a steel ruler and two pens on a dark wooden desk',
      es: 'Gráfico de líneas dibujado a mano sobre papel junto a una regla metálica y dos bolígrafos en un escritorio de madera oscura',
    },
    focal: '52% 45%',
    credit: { name: 'Isaac Smith', url: 'https://unsplash.com/@isaacmsmith', photoPage: 'https://unsplash.com/photos/6EnTPvPPL6I' },
  },
  'ai-vendor-security-questions': {
    image: vendorSecurity,
    alt: {
      en: 'A hand turns a small key in a wall of numbered steel safe-deposit boxes, a few drawers left open',
      es: 'Una mano gira una llave pequeña en una pared de cajas de seguridad de acero numeradas, con algunos cajones abiertos',
    },
    focal: '66% 45%',
    credit: { name: 'rc.xyz NFT gallery', url: 'https://unsplash.com/@moneyphotos', photoPage: 'https://unsplash.com/photos/RcvQHQB9zgA' },
  },
  'ai-usage-policy-template': {
    image: usagePolicy,
    alt: {
      en: 'Person at a meeting table leafing through printed pages, other papers and colleagues blurred behind',
      es: 'Persona en una mesa de reunión hojeando páginas impresas, con otros papeles y colegas desenfocados detrás',
    },
    focal: '40% 55%',
    credit: { name: 'Anastassia Anufrieva', url: 'https://unsplash.com/@antoie', photoPage: 'https://unsplash.com/photos/ecHGTPfjNfA' },
  },
  'training-teams-on-ai': {
    image: trainingTeams,
    alt: {
      en: 'Adults seated at long tables in a training room, listening to an off-camera speaker, water bottles in front of them',
      es: 'Adultos sentados en mesas largas en una sala de capacitación escuchan a un ponente fuera de cuadro',
    },
    focal: '62% 45%',
    exposure: 0.94,
    credit: { name: 'Dwayne joe', url: 'https://unsplash.com/@spliff_dj_joe', photoPage: 'https://unsplash.com/photos/HETN8rHahA8' },
  },
  'generative-engine-optimization-guide': {
    image: geoGuide,
    alt: {
      en: 'Woman in sunglasses checks her phone at a sunlit sidewalk café table beside empty wooden chairs',
      es: 'Mujer con lentes de sol revisa su teléfono en la mesa de un café al sol, junto a sillas de madera vacías',
    },
    focal: '45% 45%',
    credit: { name: 'Valentin', url: 'https://unsplash.com/@omikron', photoPage: 'https://unsplash.com/photos/dVUSUGotack' },
  },
  'ai-content-without-the-slop': {
    image: contentSlop,
    alt: {
      en: "A man's hand holds a pen beside an open notebook and a vintage typewriter on a dim wooden desk",
      es: 'Mano de un hombre con un bolígrafo junto a una libreta abierta y una máquina de escribir antigua en un escritorio oscuro',
    },
    focal: '45% 60%',
    exposure: 1.3,
    credit: { name: 'Christian', url: 'https://unsplash.com/@axcreativeagency', photoPage: 'https://unsplash.com/photos/MjROQpMVNVA' },
  },
  'ai-for-real-estate-teams': {
    image: realEstate,
    alt: {
      en: 'A hand holds out a ring of brass house keys against a dim, warm, blurred room',
      es: 'Una mano sostiene un llavero con llaves de casa doradas frente a una habitación cálida y desenfocada',
    },
    focal: '50% 55%',
    credit: { name: 'Jakub Żerdzicki', url: 'https://unsplash.com/@jakubzerdzicki', photoPage: 'https://unsplash.com/photos/Ebj87ehFNNU' },
  },
  'white-label-ai-for-agencies': {
    image: whiteLabel,
    alt: {
      en: 'Color swatch book and paper samples beside a tablet with hand-drawn palette sketches on a dark desk',
      es: 'Muestrario de colores y tiras de papel junto a una tableta con bocetos de paletas sobre un escritorio oscuro',
    },
    focal: '60% 50%',
    credit: { name: 'Balázs Kétyi', url: 'https://unsplash.com/@balazsketyi', photoPage: 'https://unsplash.com/photos/LPWl2pEVGKc' },
  },
};

export const coverFor = (translationKey: string): BlogCover | undefined => BLOG_COVERS[translationKey];
