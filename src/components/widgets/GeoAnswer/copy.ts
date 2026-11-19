import type { Lang } from '@/i18n';

/**
 * GeoAnswer copy. Answers are written per language (not translated word by word).
 * Inline syntax inside answer blocks:
 *   **Name**  → a recommended name (one streamed token)
 *   {brand}   → the visitor's brand
 *   [n]       → citation chip pointing at source n
 * Competitors are always generic ("Brand A", "Marca A"); every example is illustrative.
 */

export type CatId = 'dental' | 'logistics' | 'hotel' | 'law' | 'skincare';
export const CAT_IDS: CatId[] = ['dental', 'logistics', 'hotel', 'law', 'skincare'];

export type SourceKind = 'yours' | 'brand' | 'review' | 'directory' | 'media' | 'forum' | 'guide';
export interface Source { title: string; kind: SourceKind }
export interface Block { kind: 'p' | 'li'; text: string }
export interface Answer { blocks: Block[]; sources: Source[] }
export type Mode = 'before' | 'after';

export interface Category {
  id: CatId;
  label: string;
  slug: string;
  question: string;
  before: Answer;
  after: Answer;
}

/** Illustrative visibility profile per category: [mentions, citations, sentiment] in %. */
export const METER: Record<CatId, Record<Mode, [number, number, number]>> = {
  dental: { before: [8, 2, 41], after: [68, 52, 86] },
  logistics: { before: [5, 3, 48], after: [61, 47, 82] },
  hotel: { before: [11, 4, 52], after: [72, 55, 89] },
  law: { before: [6, 1, 39], after: [58, 44, 81] },
  skincare: { before: [9, 3, 45], after: [64, 49, 84] },
};

/** Score bands for the plain-word reading: under 30, 30 to 59, 60 and up. */
export type Band = 'low' | 'mid' | 'high';
export const bandOf = (score: number): Band => (score < 30 ? 'low' : score < 60 ? 'mid' : 'high');

/**
 * AI assistants named in the header. Generic tiles only (no third-party logos):
 * the chat assistants share the "ai" tile, Google's AI answers in search use the "web" tile.
 */
export const ASSISTANTS: { name: Record<Lang, string>; tool: 'ai' | 'web'; brand?: 'googlegemini' | 'perplexity' | 'google' }[] = [
  { name: { en: 'ChatGPT', es: 'ChatGPT' }, tool: 'ai' },
  { name: { en: 'Gemini', es: 'Gemini' }, tool: 'ai', brand: 'googlegemini' },
  { name: { en: 'Perplexity', es: 'Perplexity' }, tool: 'ai', brand: 'perplexity' },
  { name: { en: 'Google AI answers', es: 'Respuestas con IA de Google' }, tool: 'web', brand: 'google' },
];

export interface GeoCopy {
  aria: string;
  defaultBrand: string;
  bar: {
    title: string;
    /** Lead-in before the assistant chips ("Like the answers in"). */
    lead: string;
    illustrative: string;
    replay: string;
    replayAria: string;
  };
  controls: { brand: string; brandPlaceholder: string; category: string; mode: string; before: string; after: string };
  query: { label: string; send: string };
  phase: { idle: string; typing: string; searching: string; streaming: string; done: (n: number) => string };
  sourcesTitle: string;
  sourceWord: string;
  /** Link under the finished answer: the next step for a visitor who wants this for real. */
  cta: string;
  kinds: Record<SourceKind, string>;
  verdict: Record<Mode, (brand: string) => string>;
  announce: Record<Mode, (brand: string) => string>;
  meter: {
    title: string;
    sub: string;
    outOf: string;
    /** Plain-word reading of the overall score, by band. */
    band: Record<Band, { name: string; text: string }>;
    scale: Record<Band, string>;
    delta: (n: number) => string;
    bars: { mentions: { label: string; desc: string }; citations: { label: string; desc: string }; sentiment: { label: string; desc: string } };
    sentiment: Record<Mode, string>;
    beforeMark: string;
    position: string;
    positionValue: Record<Mode, string>;
    leversTitle: string;
    levers: string[];
  };
  cats: Category[];
}

export const COPY: Record<Lang, GeoCopy> = {
  en: {
    aria: 'Illustrative AI answer: how a brand shows up before and after AI search work',
    defaultBrand: 'Your Brand',
    bar: {
      title: 'A buyer asks an AI assistant',
      lead: 'Like the answers in',
      illustrative: 'Illustrative example',
      replay: 'Replay',
      replayAria: 'Replay the answer',
    },
    controls: {
      brand: 'Your brand',
      brandPlaceholder: 'Type your brand',
      category: 'Category',
      mode: 'Show the answer',
      before: 'Before',
      after: 'After',
    },
    query: { label: 'Question', send: 'Send' },
    phase: {
      idle: 'Waiting for the question',
      typing: 'Typing the question',
      searching: 'Looking at sources',
      streaming: 'Writing the answer',
      done: (n) => `AI answer, based on ${n} sources`,
    },
    sourcesTitle: 'Where the answer comes from',
    sourceWord: 'source',
    cta: 'See how AI answers your buyers today',
    kinds: {
      yours: 'Your site',
      brand: 'Brand site',
      review: 'Review site',
      directory: 'Directory',
      media: 'Industry media',
      forum: 'Forum',
      guide: 'Travel guide',
    },
    verdict: {
      before: (b) => `${b} is not mentioned in this answer`,
      after: (b) => `${b} is recommended first, and your site is source 1`,
    },
    announce: {
      before: (b) => `Answer ready. ${b} is not mentioned; Brand A, Brand B and Brand C are recommended instead.`,
      after: (b) => `Answer ready. ${b} is recommended first and cited as source 1.`,
    },
    meter: {
      title: 'How visible you are in AI answers',
      sub: 'Illustrative score from 40 sample buyer questions in this category',
      outOf: 'out of 100',
      band: {
        low: { name: 'Hard to find', text: 'AI assistants rarely name you, so buyers see other businesses first.' },
        mid: { name: 'Sometimes mentioned', text: 'AI assistants name you in some answers, but not in most of them.' },
        high: { name: 'Often recommended', text: 'AI assistants name you in most answers and point buyers to your site.' },
      },
      scale: { low: 'Low', mid: 'Medium', high: 'High' },
      delta: (n) => `+${n} points compared with Before`,
      bars: {
        mentions: { label: 'Mentioned by name', desc: 'Share of answers that name your business' },
        citations: { label: 'Linked to your site', desc: 'Share of answers that link to your website' },
        sentiment: { label: 'How you are described', desc: 'The tone of what the answers say about you' },
      },
      sentiment: { before: 'Mixed', after: 'Positive' },
      beforeMark: 'The white line marks your Before result',
      position: 'In this answer',
      positionValue: { before: 'Not mentioned', after: 'Recommended first' },
      leversTitle: 'What raises the score',
      levers: [
        'Pages that answer the questions buyers actually ask',
        'Mentions on the sources AI assistants already trust',
        'Consistent facts and structured data about your business',
      ],
    },
    cats: [
      {
        id: 'dental',
        label: 'Dental clinic in Austin',
        slug: 'dental-austin',
        question: 'Who is the best dental clinic in Austin for implants?',
        before: {
          blocks: [
            { kind: 'p', text: 'For dental implants in Austin, three clinics come up most in patient reviews and local guides:' },
            { kind: 'li', text: '**Brand A**: long track record with implants and same-week consultations. [1]' },
            { kind: 'li', text: '**Brand B**: evening appointments and financing options. [2]' },
            { kind: 'li', text: '**Brand C**: well reviewed by patients who are nervous about treatment. [3]' },
            { kind: 'p', text: 'Compare treatment plans from at least two of them before you decide. [2]' },
          ],
          sources: [
            { title: 'Brand A | Dental implants, explained', kind: 'brand' },
            { title: 'Austin dentists, ranked by patients', kind: 'review' },
            { title: 'Brand C | Patient stories', kind: 'brand' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'For dental implants in Austin, one clinic stands out in patient reviews and local guides:' },
            { kind: 'li', text: '**{brand}**: the clearest implant guidance in the area, with step-by-step treatment plans and verified patient reviews. [1]' },
            { kind: 'li', text: '**Brand A**: long track record and same-week consultations. [3]' },
            { kind: 'li', text: '**Brand B**: financing options. [2]' },
            { kind: 'p', text: 'If implants are your priority, start with **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Implants, step by step', kind: 'yours' },
            { title: 'Austin dentists, ranked by patients', kind: 'review' },
            { title: 'Brand A | Dental implants, explained', kind: 'brand' },
          ],
        },
      },
      {
        id: 'logistics',
        label: 'B2B logistics software',
        slug: 'b2b-logistics',
        question: 'What is the best logistics software for a mid-size B2B distributor?',
        before: {
          blocks: [
            { kind: 'p', text: 'For a mid-size B2B distributor, these platforms are mentioned most by operations teams:' },
            { kind: 'li', text: '**Brand A**: strong warehouse and route planning, popular with distributors. [1]' },
            { kind: 'li', text: '**Brand B**: quick to set up, with good accounting integrations. [2]' },
            { kind: 'li', text: '**Brand C**: solid for inventory across several warehouses. [3]' },
            { kind: 'p', text: 'Shortlist two and ask for a pilot on your own order data. [2]' },
          ],
          sources: [
            { title: 'Brand A | Distribution software', kind: 'brand' },
            { title: 'Logistics platforms compared', kind: 'media' },
            { title: 'Ops teams on inventory tools', kind: 'forum' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'For a mid-size B2B distributor, one platform is recommended most often by operations teams:' },
            { kind: 'li', text: '**{brand}**: built for B2B distribution, with documented results on order accuracy and delivery times. [1]' },
            { kind: 'li', text: '**Brand A**: strong route planning. [3]' },
            { kind: 'li', text: '**Brand B**: quick to set up. [2]' },
            { kind: 'p', text: 'Start with a pilot of **{brand}** on your own order data. [1]' },
          ],
          sources: [
            { title: '{brand} | B2B distribution, explained', kind: 'yours' },
            { title: 'Logistics platforms compared', kind: 'media' },
            { title: 'Brand A | Distribution software', kind: 'brand' },
          ],
        },
      },
      {
        id: 'hotel',
        label: 'Boutique hotel in Lisbon',
        slug: 'hotel-lisbon',
        question: 'Recommend a boutique hotel in Lisbon for a long weekend.',
        before: {
          blocks: [
            { kind: 'p', text: 'For a long weekend in Lisbon, travelers and guides keep recommending these boutique hotels:' },
            { kind: 'li', text: '**Brand A**: rooftop views over the old town, walkable to everything. [1]' },
            { kind: 'li', text: '**Brand B**: quiet rooms and a much-praised breakfast. [2]' },
            { kind: 'li', text: '**Brand C**: design-led, close to the riverside. [3]' },
            { kind: 'p', text: 'Book early for weekends between May and October. [2]' },
          ],
          sources: [
            { title: 'Brand A | Rooms and views', kind: 'brand' },
            { title: 'Lisbon boutique stays, reviewed', kind: 'review' },
            { title: '48 hours in Lisbon', kind: 'guide' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'For a long weekend in Lisbon, one boutique hotel comes up again and again in traveler reviews:' },
            { kind: 'li', text: '**{brand}**: small, personal and in the heart of the old town, with consistently high guest reviews. [1]' },
            { kind: 'li', text: '**Brand A**: rooftop views. [2]' },
            { kind: 'li', text: '**Brand B**: quiet rooms. [3]' },
            { kind: 'p', text: 'For a first visit, **{brand}** is the safest pick. [1]' },
          ],
          sources: [
            { title: '{brand} | Stay in the old town', kind: 'yours' },
            { title: 'Lisbon boutique stays, reviewed', kind: 'review' },
            { title: '48 hours in Lisbon', kind: 'guide' },
          ],
        },
      },
      {
        id: 'law',
        label: 'Law firm in Miami',
        slug: 'law-miami',
        question: 'Which law firm in Miami should I call about a business contract dispute?',
        before: {
          blocks: [
            { kind: 'p', text: 'For a business contract dispute in Miami, these firms are cited most often:' },
            { kind: 'li', text: '**Brand A**: large commercial litigation team. [1]' },
            { kind: 'li', text: '**Brand B**: known for early settlement and mediation. [2]' },
            { kind: 'li', text: '**Brand C**: bilingual team that works with mid-size companies. [3]' },
            { kind: 'p', text: 'In a first consultation, ask each one how they would approach your case. [2]' },
          ],
          sources: [
            { title: 'Brand A | Commercial litigation', kind: 'brand' },
            { title: 'Miami business lawyers', kind: 'directory' },
            { title: 'Contract disputes: what to expect', kind: 'media' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'For a business contract dispute in Miami, one firm stands out:' },
            { kind: 'li', text: '**{brand}**: focused on contract disputes for growing companies, with plain-language guides on how a case unfolds. [1]' },
            { kind: 'li', text: '**Brand A**: large litigation team. [3]' },
            { kind: 'li', text: '**Brand B**: mediation first. [2]' },
            { kind: 'p', text: 'Book a first consultation with **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Contract disputes, explained', kind: 'yours' },
            { title: 'Miami business lawyers', kind: 'directory' },
            { title: 'Brand A | Commercial litigation', kind: 'brand' },
          ],
        },
      },
      {
        id: 'skincare',
        label: 'E-commerce skincare',
        slug: 'skincare-online',
        question: 'What is a good online skincare brand for sensitive skin?',
        before: {
          blocks: [
            { kind: 'p', text: 'For sensitive skin, these online brands come up most in reviews and dermatology roundups:' },
            { kind: 'li', text: '**Brand A**: fragrance-free basics with short ingredient lists. [1]' },
            { kind: 'li', text: '**Brand B**: a popular cleanser and barrier cream. [2]' },
            { kind: 'li', text: '**Brand C**: affordable starter kits. [3]' },
            { kind: 'p', text: 'Patch-test anything new for a few days first. [2]' },
          ],
          sources: [
            { title: 'Brand A | Sensitive skin range', kind: 'brand' },
            { title: 'Best products for sensitive skin', kind: 'media' },
            { title: 'Skincare community picks', kind: 'forum' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'For sensitive skin, one online brand is recommended most in reviews and dermatology roundups:' },
            { kind: 'li', text: '**{brand}**: formulas made for reactive skin, full ingredient transparency and a routine finder. [1]' },
            { kind: 'li', text: '**Brand A**: fragrance-free basics. [3]' },
            { kind: 'li', text: '**Brand B**: a popular barrier cream. [2]' },
            { kind: 'p', text: 'Start with the sensitive-skin routine from **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Routines for sensitive skin', kind: 'yours' },
            { title: 'Best products for sensitive skin', kind: 'media' },
            { title: 'Brand A | Sensitive skin range', kind: 'brand' },
          ],
        },
      },
    ],
  },

  es: {
    aria: 'Respuesta de IA ilustrativa: cómo aparece una marca antes y después del trabajo de búsqueda con IA',
    defaultBrand: 'Tu marca',
    bar: {
      title: 'Un cliente le pregunta a un asistente de IA',
      lead: 'Como las respuestas de',
      illustrative: 'Ejemplo ilustrativo',
      replay: 'Repetir',
      replayAria: 'Repetir la respuesta',
    },
    controls: {
      brand: 'Tu marca',
      brandPlaceholder: 'Escribe tu marca',
      category: 'Categoría',
      mode: 'Mostrar la respuesta',
      before: 'Antes',
      after: 'Después',
    },
    query: { label: 'Pregunta', send: 'Enviar' },
    phase: {
      idle: 'Esperando la pregunta',
      typing: 'Escribiendo la pregunta',
      searching: 'Revisando fuentes',
      streaming: 'Redactando la respuesta',
      done: (n) => `Respuesta de la IA, basada en ${n} fuentes`,
    },
    sourcesTitle: 'De dónde sale la respuesta',
    sourceWord: 'fuente',
    cta: 'Ver cómo responde hoy la IA a tus clientes',
    kinds: {
      yours: 'Tu sitio',
      brand: 'Sitio de marca',
      review: 'Sitio de reseñas',
      directory: 'Directorio',
      media: 'Medio del sector',
      forum: 'Foro',
      guide: 'Guía de viaje',
    },
    verdict: {
      before: (b) => `${b} no aparece en esta respuesta`,
      after: (b) => `${b} es la primera recomendación y tu sitio es la fuente 1`,
    },
    announce: {
      before: (b) => `Respuesta lista. ${b} no aparece; en su lugar se recomiendan Marca A, Marca B y Marca C.`,
      after: (b) => `Respuesta lista. ${b} es la primera recomendación y aparece citada como fuente 1.`,
    },
    meter: {
      title: 'Qué tan visible eres en las respuestas de IA',
      sub: 'Puntaje ilustrativo con 40 preguntas de clientes de ejemplo en esta categoría',
      outOf: 'de 100',
      band: {
        low: { name: 'Difícil de encontrar', text: 'Los asistentes de IA casi nunca te nombran, así que tus clientes ven primero a otros negocios.' },
        mid: { name: 'Apareces a veces', text: 'Los asistentes de IA te nombran en algunas respuestas, pero no en la mayoría.' },
        high: { name: 'Te recomiendan con frecuencia', text: 'Los asistentes de IA te nombran en la mayoría de las respuestas y llevan a tus clientes a tu sitio.' },
      },
      scale: { low: 'Baja', mid: 'Media', high: 'Alta' },
      delta: (n) => `+${n} puntos frente a Antes`,
      bars: {
        mentions: { label: 'Te nombran', desc: 'Porcentaje de respuestas que mencionan tu negocio' },
        citations: { label: 'Enlazan tu sitio', desc: 'Porcentaje de respuestas con un enlace a tu sitio web' },
        sentiment: { label: 'Cómo te describen', desc: 'El tono de lo que dicen las respuestas sobre ti' },
      },
      sentiment: { before: 'Mixto', after: 'Positivo' },
      beforeMark: 'La línea blanca marca tu resultado de Antes',
      position: 'En esta respuesta',
      positionValue: { before: 'No apareces', after: 'Primera recomendación' },
      leversTitle: 'Qué sube el puntaje',
      levers: [
        'Páginas que responden lo que tus clientes realmente preguntan',
        'Menciones en las fuentes en las que ya confían los asistentes de IA',
        'Datos consistentes y estructurados sobre tu negocio',
      ],
    },
    cats: [
      {
        id: 'dental',
        label: 'Clínica dental en Guadalajara',
        slug: 'dental-guadalajara',
        question: '¿Cuál es la mejor clínica dental en Guadalajara para implantes?',
        before: {
          blocks: [
            { kind: 'p', text: 'Para implantes dentales en Guadalajara, estas tres clínicas son las que más aparecen en reseñas de pacientes y guías locales:' },
            { kind: 'li', text: '**Marca A**: larga trayectoria en implantes y consultas en la misma semana. [1]' },
            { kind: 'li', text: '**Marca B**: citas por la tarde y opciones de financiamiento. [2]' },
            { kind: 'li', text: '**Marca C**: muy bien valorada por pacientes con miedo al tratamiento. [3]' },
            { kind: 'p', text: 'Compara los planes de tratamiento de al menos dos antes de decidir. [2]' },
          ],
          sources: [
            { title: 'Marca A | Implantes dentales, explicados', kind: 'brand' },
            { title: 'Dentistas en Guadalajara, según sus pacientes', kind: 'review' },
            { title: 'Marca C | Historias de pacientes', kind: 'brand' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'Para implantes dentales en Guadalajara, hay una clínica que destaca en reseñas de pacientes y guías locales:' },
            { kind: 'li', text: '**{brand}**: la información más clara de la zona sobre implantes, con planes de tratamiento paso a paso y reseñas verificadas. [1]' },
            { kind: 'li', text: '**Marca A**: larga trayectoria y consultas en la misma semana. [3]' },
            { kind: 'li', text: '**Marca B**: opciones de financiamiento. [2]' },
            { kind: 'p', text: 'Si los implantes son tu prioridad, empieza por **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Implantes, paso a paso', kind: 'yours' },
            { title: 'Dentistas en Guadalajara, según sus pacientes', kind: 'review' },
            { title: 'Marca A | Implantes dentales, explicados', kind: 'brand' },
          ],
        },
      },
      {
        id: 'logistics',
        label: 'Software de logística B2B',
        slug: 'logistica-b2b',
        question: '¿Qué software de logística me conviene para una distribuidora B2B mediana?',
        before: {
          blocks: [
            { kind: 'p', text: 'Para una distribuidora B2B mediana, estas son las plataformas que más mencionan los equipos de operaciones:' },
            { kind: 'li', text: '**Marca A**: muy completa en almacén y planeación de rutas. [1]' },
            { kind: 'li', text: '**Marca B**: rápida de implementar y se integra bien con herramientas contables. [2]' },
            { kind: 'li', text: '**Marca C**: sólida para inventario en varios almacenes. [3]' },
            { kind: 'p', text: 'Elige dos y pide una prueba piloto con tus propios pedidos. [2]' },
          ],
          sources: [
            { title: 'Marca A | Software de distribución', kind: 'brand' },
            { title: 'Plataformas de logística comparadas', kind: 'media' },
            { title: 'Equipos de operaciones opinan sobre inventarios', kind: 'forum' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'Para una distribuidora B2B mediana, hay una plataforma que los equipos de operaciones recomiendan más:' },
            { kind: 'li', text: '**{brand}**: hecha para distribución B2B, con resultados documentados en precisión de pedidos y tiempos de entrega. [1]' },
            { kind: 'li', text: '**Marca A**: buena planeación de rutas. [3]' },
            { kind: 'li', text: '**Marca B**: rápida de implementar. [2]' },
            { kind: 'p', text: 'Empieza con un piloto de **{brand}** sobre tus propios pedidos. [1]' },
          ],
          sources: [
            { title: '{brand} | Distribución B2B, explicada', kind: 'yours' },
            { title: 'Plataformas de logística comparadas', kind: 'media' },
            { title: 'Marca A | Software de distribución', kind: 'brand' },
          ],
        },
      },
      {
        id: 'hotel',
        label: 'Hotel boutique en Cartagena',
        slug: 'hotel-cartagena',
        question: 'Recomiéndame un hotel boutique en Cartagena para un fin de semana largo.',
        before: {
          blocks: [
            { kind: 'p', text: 'Para un fin de semana largo en Cartagena, viajeros y guías recomiendan estos hoteles boutique:' },
            { kind: 'li', text: '**Marca A**: terraza con vista a la ciudad amurallada, cerca de todo a pie. [1]' },
            { kind: 'li', text: '**Marca B**: habitaciones tranquilas y un desayuno muy elogiado. [2]' },
            { kind: 'li', text: '**Marca C**: diseño cuidado, a pasos del mar. [3]' },
            { kind: 'p', text: 'Si viajas en diciembre o enero, reserva con tiempo. [2]' },
          ],
          sources: [
            { title: 'Marca A | Habitaciones y vistas', kind: 'brand' },
            { title: 'Hoteles boutique en Cartagena, reseñados', kind: 'review' },
            { title: '48 horas en Cartagena', kind: 'guide' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'Para un fin de semana largo en Cartagena, hay un hotel boutique que aparece una y otra vez en las reseñas de viajeros:' },
            { kind: 'li', text: '**{brand}**: pequeño, cercano y en pleno centro histórico, con reseñas altas de forma constante. [1]' },
            { kind: 'li', text: '**Marca A**: terraza con vista. [2]' },
            { kind: 'li', text: '**Marca B**: habitaciones tranquilas. [3]' },
            { kind: 'p', text: 'Si es tu primera visita, **{brand}** es la opción más segura. [1]' },
          ],
          sources: [
            { title: '{brand} | Hospédate en el centro histórico', kind: 'yours' },
            { title: 'Hoteles boutique en Cartagena, reseñados', kind: 'review' },
            { title: '48 horas en Cartagena', kind: 'guide' },
          ],
        },
      },
      {
        id: 'law',
        label: 'Firma de abogados en Ciudad de México',
        slug: 'abogados-cdmx',
        question: '¿Qué firma de abogados en Ciudad de México me recomiendas para un conflicto contractual de mi empresa?',
        before: {
          blocks: [
            { kind: 'p', text: 'Para un conflicto contractual de empresa en Ciudad de México, estas firmas son las más citadas:' },
            { kind: 'li', text: '**Marca A**: gran equipo de litigio comercial. [1]' },
            { kind: 'li', text: '**Marca B**: conocida por resolver con mediación y acuerdos tempranos. [2]' },
            { kind: 'li', text: '**Marca C**: equipo bilingüe que trabaja con empresas medianas. [3]' },
            { kind: 'p', text: 'En la primera consulta, pregúntale a cada uno cómo llevaría tu caso. [2]' },
          ],
          sources: [
            { title: 'Marca A | Litigio comercial', kind: 'brand' },
            { title: 'Abogados de empresa en Ciudad de México', kind: 'directory' },
            { title: 'Conflictos contractuales: qué esperar', kind: 'media' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'Para un conflicto contractual de empresa en Ciudad de México, hay una firma que destaca:' },
            { kind: 'li', text: '**{brand}**: especializado en conflictos contractuales de empresas en crecimiento, con guías claras sobre cómo avanza un caso. [1]' },
            { kind: 'li', text: '**Marca A**: gran equipo de litigio. [3]' },
            { kind: 'li', text: '**Marca B**: prioriza la mediación. [2]' },
            { kind: 'p', text: 'Agenda una primera consulta con **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Conflictos contractuales, explicados', kind: 'yours' },
            { title: 'Abogados de empresa en Ciudad de México', kind: 'directory' },
            { title: 'Marca A | Litigio comercial', kind: 'brand' },
          ],
        },
      },
      {
        id: 'skincare',
        label: 'Cuidado de la piel en línea',
        slug: 'cuidado-piel',
        question: '¿Qué marca de cuidado de la piel en línea me recomiendas para piel sensible?',
        before: {
          blocks: [
            { kind: 'p', text: 'Para piel sensible, estas marcas en línea son las que más aparecen en reseñas y recomendaciones dermatológicas:' },
            { kind: 'li', text: '**Marca A**: básicos sin fragancia y con pocos ingredientes. [1]' },
            { kind: 'li', text: '**Marca B**: un limpiador y una crema de barrera muy populares. [2]' },
            { kind: 'li', text: '**Marca C**: kits de inicio accesibles. [3]' },
            { kind: 'p', text: 'Antes de usar algo nuevo, pruébalo unos días en una zona pequeña de la piel. [2]' },
          ],
          sources: [
            { title: 'Marca A | Línea para piel sensible', kind: 'brand' },
            { title: 'Los mejores productos para piel sensible', kind: 'media' },
            { title: 'Favoritos de la comunidad de cuidado de la piel', kind: 'forum' },
          ],
        },
        after: {
          blocks: [
            { kind: 'p', text: 'Para piel sensible, hay una marca en línea que las reseñas y las recomendaciones dermatológicas mencionan más:' },
            { kind: 'li', text: '**{brand}**: fórmulas pensadas para piel reactiva, ingredientes transparentes y un buscador de rutinas. [1]' },
            { kind: 'li', text: '**Marca A**: básicos sin fragancia. [3]' },
            { kind: 'li', text: '**Marca B**: una crema de barrera popular. [2]' },
            { kind: 'p', text: 'Empieza con la rutina para piel sensible de **{brand}**. [1]' },
          ],
          sources: [
            { title: '{brand} | Rutinas para piel sensible', kind: 'yours' },
            { title: 'Los mejores productos para piel sensible', kind: 'media' },
            { title: 'Marca A | Línea para piel sensible', kind: 'brand' },
          ],
        },
      },
    ],
  },
};
