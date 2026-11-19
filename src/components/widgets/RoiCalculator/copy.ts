import type { Lang } from '@/i18n';
import type { FieldId } from './model';

/** A sentence made of plain text and emphasised figures. */
export type Seg = string | { b: string };

export interface SentenceArgs {
  people: string;
  peopleN: number;
  hours: string;
  hoursN: number;
  automation: string;
  hoursBack: string;
  value: string;
  fte: number;
  fteText: string;
}

export interface RoiCopy {
  aria: string;
  bar: { title: string; sub: string; currency: string; currencyAria: string };
  inputsTitle: string;
  reset: string;
  resetAria: string;
  fields: Record<FieldId, { label: string; unit: (n: number) => string; hint?: string; valueText: (v: string, n: number) => string }>;
  band: string;
  tip: { label: string; title: string; body: string };
  outputsTitle: string;
  outputsMeta: string;
  kpi: {
    hours: { label: string; unit: string };
    value: { label: string; unit: (cur: string) => string };
    fte: { label: string; unit: (n: number) => string };
  };
  sentence: (a: SentenceArgs) => Seg[];
  live: (a: { hoursBack: string; value: string; fteText: string }) => string;
  year: {
    title: string;
    total: string;
    month: (m: number) => string;
    setup: string;
    full: string;
    legend: string;
    aria: (a: { year1: string; month3: string; month6: string }) => string;
  };
  split: {
    title: string;
    intro: (total: string) => Seg[];
    back: string;
    manual: string;
    aria: (a: { back: string; total: string; pct: string }) => string;
  };
  cta: { primary: string; secondary: string };
  disclaimer: string;
  assumptions: string;
}

const pl = (n: number, one: string, many: string) => (n === 1 ? one : many);

export const COPY: Record<Lang, RoiCopy> = {
  en: {
    aria: 'Time and value estimator',
    bar: { title: 'Time savings calculator', sub: 'Move the sliders. The results update as you go.', currency: 'Currency', currencyAria: 'Choose currency' },
    inputsTitle: 'Your team today',
    reset: 'Reset',
    resetAria: 'Reset to the starting values',
    fields: {
      people: {
        label: 'People doing repetitive work',
        unit: (n) => pl(n, 'person', 'people'),
        valueText: (v, n) => `${v} ${pl(n, 'person', 'people')}`,
      },
      hours: {
        label: 'Hours a week each spends on it',
        unit: () => 'h / week',
        hint: 'Copying data, chasing updates, reports, answering the same questions.',
        valueText: (v, n) => `${v} ${pl(n, 'hour', 'hours')} a week`,
      },
      rate: {
        label: 'Loaded hourly cost',
        unit: () => 'per hour',
        hint: 'Salary plus benefits and overhead, per person.',
        valueText: (v) => `${v} per hour`,
      },
      automation: {
        label: 'Share AI can take over',
        unit: () => '%',
        valueText: (v) => `${v} percent`,
      },
    },
    band: 'Typical',
    tip: {
      label: 'What is realistic?',
      title: 'What is realistic',
      body: 'For a first-year estimate, use 30 to 50%. Go above 60% only when the process follows clear rules and its data already lives in your tools.',
    },
    outputsTitle: 'What you get back',
    outputsMeta: 'Each year, once everything is running',
    kpi: {
      hours: { label: 'Hours back for your team', unit: 'hours a year' },
      value: { label: 'What those hours are worth', unit: (cur) => `${cur} a year, at what they cost you today` },
      fte: { label: 'The same as', unit: (n) => (n >= 0.95 && n < 1.05 ? 'full-time person' : 'full-time people') },
    },
    sentence: (a) => [
      `With ${a.people} ${pl(a.peopleN, 'person', 'people')} spending ${a.hours} ${pl(a.hoursN, 'hour', 'hours')} a week on repetitive work, handing `,
      { b: `${a.automation}%` },
      ' of it to AI gives back about ',
      { b: `${a.hoursBack} hours a year` },
      `: ${a.fteText}, worth `,
      { b: a.value },
      ' at what that time costs you today.',
    ],
    live: (a) => `Estimate: ${a.hoursBack} hours a year, worth ${a.value}, ${a.fteText}.`,
    year: {
      title: 'How the savings add up in year one',
      total: 'Year one total',
      month: (m) => `Month ${m}`,
      setup: 'Getting set up',
      full: 'Full pace',
      legend: 'Each bar is the total saved so far. The first three months are slower while the new way of working gets set up.',
      aria: (a) => `Savings add up month by month: about ${a.month3} by month 3, ${a.month6} by month 6 and ${a.year1} by month 12.`,
    },
    split: {
      title: 'Where the repetitive hours go',
      intro: (total) => ['Today your team spends ', { b: `${total} hours a year` }, ' on repetitive work.'],
      back: 'Back to your team',
      manual: 'Still done by hand',
      aria: (a) => `${a.back} of ${a.total} repetitive hours a year come back to the team (${a.pct}).`,
    },
    cta: { primary: 'Turn this into a plan', secondary: 'Take the AI diagnostic' },
    disclaimer: 'This is an estimate, not a quote.',
    assumptions: 'It assumes 46 working weeks a year and a 40-hour week. Real results depend on how your team works and where your information lives.',
  },

  es: {
    aria: 'Calculadora de tiempo y valor',
    bar: { title: 'Calculadora de ahorro de tiempo', sub: 'Mueve los controles. Los resultados cambian al instante.', currency: 'Moneda', currencyAria: 'Elige la moneda' },
    inputsTitle: 'Tu equipo hoy',
    reset: 'Reiniciar',
    resetAria: 'Volver a los valores iniciales',
    fields: {
      people: {
        label: 'Personas con trabajo repetitivo',
        unit: (n) => pl(n, 'persona', 'personas'),
        valueText: (v, n) => `${v} ${pl(n, 'persona', 'personas')}`,
      },
      hours: {
        label: 'Horas a la semana que le dedica cada una',
        unit: () => 'h / semana',
        hint: 'Copiar datos, perseguir actualizaciones, armar reportes, responder lo mismo.',
        valueText: (v, n) => `${v} ${pl(n, 'hora', 'horas')} a la semana`,
      },
      rate: {
        label: 'Costo real por hora',
        unit: () => 'por hora',
        hint: 'Sueldo más prestaciones y gastos, por persona.',
        valueText: (v) => `${v} por hora`,
      },
      automation: {
        label: 'Parte que puede hacer la IA',
        unit: () => '%',
        valueText: (v) => `${v} por ciento`,
      },
    },
    band: 'Habitual',
    tip: {
      label: '¿Qué es realista?',
      title: 'Qué es realista',
      body: 'Para estimar el primer año, usa entre 30% y 50%. Pasa del 60% solo si el proceso sigue reglas claras y sus datos ya están en tus herramientas.',
    },
    outputsTitle: 'Lo que recuperas',
    outputsMeta: 'Cada año, cuando todo ya está funcionando',
    kpi: {
      hours: { label: 'Horas que recupera tu equipo', unit: 'horas al año' },
      value: { label: 'Lo que valen esas horas', unit: (cur) => `${cur} al año, a lo que te cuestan hoy` },
      fte: { label: 'Equivale a', unit: (n) => (n >= 0.95 && n < 1.05 ? 'persona de tiempo completo' : 'personas de tiempo completo') },
    },
    sentence: (a) => [
      `Si ${a.people} ${pl(a.peopleN, 'persona dedica', 'personas dedican')} ${a.hours} ${pl(a.hoursN, 'hora', 'horas')} a la semana a trabajo repetitivo y le pasas a la IA el `,
      { b: `${a.automation}%` },
      ', recuperas cerca de ',
      { b: `${a.hoursBack} horas al año` },
      `: ${a.fteText}, que hoy te cuestan `,
      { b: a.value },
      '.',
    ],
    live: (a) => `Estimación: ${a.hoursBack} horas al año, con un valor de ${a.value}, ${a.fteText}.`,
    year: {
      title: 'Cómo se suma el ahorro en el primer año',
      total: 'Total del primer año',
      month: (m) => `Mes ${m}`,
      setup: 'Puesta en marcha',
      full: 'Ritmo pleno',
      legend: 'Cada barra es el total ahorrado hasta ese mes. Los primeros tres meses van más lento mientras se pone en marcha la nueva forma de trabajar.',
      aria: (a) => `El ahorro se suma mes a mes: cerca de ${a.month3} al mes 3, ${a.month6} al mes 6 y ${a.year1} al mes 12.`,
    },
    split: {
      title: 'A dónde van las horas repetitivas',
      intro: (total) => ['Hoy tu equipo dedica ', { b: `${total} horas al año` }, ' a trabajo repetitivo.'],
      back: 'Vuelven a tu equipo',
      manual: 'Siguen a mano',
      aria: (a) => `${a.back} de ${a.total} horas repetitivas al año vuelven al equipo (${a.pct}).`,
    },
    cta: { primary: 'Convertir esto en un plan', secondary: 'Hacer el diagnóstico de IA' },
    disclaimer: 'Es una estimación, no una cotización.',
    assumptions: 'Supone 46 semanas laborales al año y jornadas de 40 horas. El resultado real depende de cómo trabaja tu equipo y de dónde está tu información.',
  },
};

/** "the time of 2.3 full-time people": handles tiny totals, < 1 and ≈ 1. */
export function fteText(lang: Lang, fte: number, formatted: string): string {
  if (fte < 0.05) return lang === 'es' ? 'una pequeña parte de un puesto de tiempo completo' : 'a small slice of one full-time role';
  if (lang === 'es') {
    if (fte < 0.95) return `${formatted} de un puesto de tiempo completo`;
    if (fte < 1.05) return 'el tiempo de una persona de tiempo completo';
    return `el tiempo de ${formatted} personas de tiempo completo`;
  }
  if (fte < 0.95) return `${formatted} of a full-time role`;
  if (fte < 1.05) return 'the time of one full-time person';
  return `the time of ${formatted} full-time people`;
}
