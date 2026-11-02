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
  bar: { path: string; file: string; estimate: string; currency: string; currencyAria: string };
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
  chart: {
    title: string;
    ramp: string;
    full: string;
    month: (m: number) => string;
    monthShort: (m: number) => string;
    year1: string;
    rollout: string;
    aria: (a: { year1: string; full: string }) => string;
    readout: (m: number) => string;
  };
  dots: { title: string; back: string; manual: string; scale: (n: string) => string; aria: (a: { back: string; total: string; pct: string }) => string };
  cta: { primary: string; secondary: string };
  disclaimer: string;
  assumptions: string;
}

const pl = (n: number, one: string, many: string) => (n === 1 ? one : many);

export const COPY: Record<Lang, RoiCopy> = {
  en: {
    aria: 'Time and value estimator',
    bar: { path: 'impact-estimator', file: 'your-team', estimate: 'Estimate', currency: 'Currency', currencyAria: 'Choose currency' },
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
    outputsTitle: 'What comes back',
    outputsMeta: 'per year · at full pace',
    kpi: {
      hours: { label: 'Hours given back', unit: 'hours / year' },
      value: { label: 'Value of that time', unit: (cur) => `${cur} / year` },
      fte: { label: 'Full-time equivalent', unit: (n) => (n >= 0.95 && n < 1.05 ? 'person' : 'people') },
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
    chart: {
      title: 'First 12 months, cumulative',
      ramp: 'With a 3-month rollout',
      full: 'At full pace',
      month: (m) => `Month ${m}`,
      monthShort: (m) => `M${m}`,
      year1: 'Year one',
      rollout: 'Rollout',
      aria: (a) => `Cumulative value over the first 12 months: ${a.year1} with a three-month rollout, ${a.full} at full pace from day one.`,
      readout: (m) => `Month ${m}`,
    },
    dots: {
      title: 'Time reclaimed',
      back: 'Given back',
      manual: 'Still by hand',
      scale: (n) => `1 dot = ${n} h`,
      aria: (a) => `${a.back} of ${a.total} repetitive hours a year come back to the team (${a.pct}).`,
    },
    cta: { primary: 'Turn this into a plan', secondary: 'Take the AI diagnostic' },
    disclaimer: 'Estimates, not a quote.',
    assumptions: '46 working weeks a year · 40-hour week · results depend on your processes and data.',
  },

  es: {
    aria: 'Calculadora de tiempo y valor',
    bar: { path: 'estimador-impacto', file: 'tu-equipo', estimate: 'Estimación', currency: 'Moneda', currencyAria: 'Elige la moneda' },
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
    outputsMeta: 'por año · a ritmo pleno',
    kpi: {
      hours: { label: 'Horas que recuperas', unit: 'horas / año' },
      value: { label: 'Valor de ese tiempo', unit: (cur) => `${cur} / año` },
      fte: { label: 'Equivalente a tiempo completo', unit: (n) => (n >= 0.95 && n < 1.05 ? 'persona' : 'personas') },
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
    chart: {
      title: 'Primeros 12 meses, acumulado',
      ramp: 'Con 3 meses de puesta en marcha',
      full: 'A ritmo pleno',
      month: (m) => `Mes ${m}`,
      monthShort: (m) => `M${m}`,
      year1: 'Primer año',
      rollout: 'Arranque',
      aria: (a) => `Valor acumulado en los primeros 12 meses: ${a.year1} con tres meses de puesta en marcha, ${a.full} a ritmo pleno desde el primer día.`,
      readout: (m) => `Mes ${m}`,
    },
    dots: {
      title: 'Tiempo recuperado',
      back: 'Recuperado',
      manual: 'Sigue a mano',
      scale: (n) => `1 punto = ${n} h`,
      aria: (a) => `${a.back} de ${a.total} horas repetitivas al año vuelven al equipo (${a.pct}).`,
    },
    cta: { primary: 'Convertir esto en un plan', secondary: 'Hacer el diagnóstico de IA' },
    disclaimer: 'Es una estimación, no una cotización.',
    assumptions: '46 semanas laborales al año · jornada de 40 horas · el resultado depende de tus procesos y tus datos.',
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
