import type { Lang } from '@/i18n';

/** Interface copy for the assistant demo. Scenario content lives in scenarios.ts. */
export interface ConsoleCopy {
  region: string;
  simulated: string;
  simulatedNote: string;
  workflows: string;
  play: string;
  pause: string;
  replay: string;
  speed: string;
  speedOpt: (s: number) => string;
  status: Record<'ready' | 'running' | 'paused' | 'awaiting' | 'done', string>;
  node: Record<'idle' | 'running' | 'gate' | 'done', string>;
  /** Labels for the raw log under "technical details". */
  tags: Record<'event' | 'call' | 'think' | 'info' | 'warn' | 'done' | 'human', string>;
  person: string;
  stepNo: (i: number) => string;
  workflow: string;
  steps: (n: number) => string;
  trigger: string;
  graphLabel: string;
  legend: Record<'idle' | 'running' | 'done' | 'gate', string>;
  log: string;
  live: string;
  waiting: string;
  stepShort: (i: number, n: number) => string;
  worksWith: string;
  tech: { show: string; hide: string; label: string };
  gate: {
    title: string;
    why: string;
    approve: string;
    auto: (s: number) => string;
    byYou: string;
    byAuto: string;
    byStatic: (who: string) => string;
    resultYou: string;
    resultAuto: string;
    resultStatic: string;
  };
  outcome: string;
  /** Text link at the end of the outcome card (a booking hand-off). */
  outcomeCta: string;
  to: string;
  announce: {
    step: (i: number, n: number, label: string, result: string) => string;
    gate: (title: string) => string;
    done: (t: string) => string;
  };
}

export const COPY: Record<Lang, ConsoleCopy> = {
  en: {
    region: 'AI assistant demo (simulation)',
    simulated: 'Simulation',
    simulatedNote: 'Illustrative data, fictional companies',
    workflows: 'Example tasks',
    play: 'Play',
    pause: 'Pause',
    replay: 'Start over',
    speed: 'Playback speed',
    speedOpt: (s) => `${s}× speed`,
    status: { ready: 'Ready', running: 'Working', paused: 'Paused', awaiting: 'Waiting for your OK', done: 'Done' },
    node: { idle: 'Up next', running: 'Working', gate: 'Needs your OK', done: 'Done' },
    tags: { event: 'event', call: 'call', think: 'note', info: 'info', warn: 'alert', done: 'done', human: 'human' },
    person: 'A person on your team',
    stepNo: (i) => `Step ${i}`,
    workflow: 'What the assistant does',
    steps: (n) => `${n} steps`,
    trigger: 'Starts when',
    graphLabel: 'Steps',
    legend: { idle: 'Up next', running: 'Working', done: 'Done', gate: 'Waits for a person' },
    log: 'What’s happening',
    live: 'Live',
    waiting: 'Waiting to start…',
    stepShort: (i, n) => `Step ${i} of ${n}`,
    worksWith: 'Works with',
    tech: { show: 'Show technical details', hide: 'Hide technical details', label: 'Technical details' },
    gate: {
      title: 'Needs your OK',
      why: 'Why',
      approve: 'Approve',
      auto: (s) => `Demo only: approves by itself in ${s}s`,
      byYou: 'You approved it. Sending now.',
      byAuto: 'No click, so the demo approved it for you.',
      byStatic: (who) => `Approved by the ${who}.`,
      resultYou: 'You approved it',
      resultAuto: 'Approved (demo)',
      resultStatic: 'Approved',
    },
    outcome: 'Result',
    outcomeCta: 'Want this on one of your processes? Book a call',
    to: 'To',
    announce: {
      step: (i, n, label, result) => `Step ${i} of ${n} done: ${label}. ${result}.`,
      gate: (title) => `A person needs to approve: ${title} The Approve button is on the step and in the activity feed.`,
      done: (t) => `Finished in ${t}.`,
    },
  },
  es: {
    region: 'Demo de asistente de IA (simulación)',
    simulated: 'Simulación',
    simulatedNote: 'Datos ilustrativos, empresas ficticias',
    workflows: 'Tareas de ejemplo',
    play: 'Reproducir',
    pause: 'Pausar',
    replay: 'Empezar de nuevo',
    speed: 'Velocidad de reproducción',
    speedOpt: (s) => `Velocidad ${s}×`,
    status: { ready: 'Listo', running: 'Trabajando', paused: 'En pausa', awaiting: 'Espera tu aprobación', done: 'Terminado' },
    node: { idle: 'Pendiente', running: 'Trabajando', gate: 'Espera tu OK', done: 'Listo' },
    tags: { event: 'evento', call: 'llamada', think: 'nota', info: 'info', warn: 'alerta', done: 'listo', human: 'humano' },
    person: 'Una persona de tu equipo',
    stepNo: (i) => `Paso ${i}`,
    workflow: 'Lo que hace el asistente',
    steps: (n) => `${n} pasos`,
    trigger: 'Empieza cuando',
    graphLabel: 'Pasos',
    legend: { idle: 'Pendiente', running: 'Trabajando', done: 'Listo', gate: 'Espera a una persona' },
    log: 'Lo que está pasando',
    live: 'En vivo',
    waiting: 'Esperando para empezar…',
    stepShort: (i, n) => `Paso ${i} de ${n}`,
    worksWith: 'Trabaja con',
    tech: { show: 'Ver detalles técnicos', hide: 'Ocultar detalles técnicos', label: 'Detalles técnicos' },
    gate: {
      title: 'Necesita tu aprobación',
      why: 'Por qué',
      approve: 'Aprobar',
      auto: (s) => `Solo en la demo: se aprueba sola en ${s} s`,
      byYou: 'Lo aprobaste. Enviando.',
      byAuto: 'Nadie hizo clic, así que la demo lo aprobó por ti.',
      byStatic: (who) => `Aprobado por ${who}.`,
      resultYou: 'Lo aprobaste tú',
      resultAuto: 'Aprobado (demo)',
      resultStatic: 'Aprobado',
    },
    outcome: 'Resultado',
    outcomeCta: '¿Quieres esto en uno de tus procesos? Agenda una llamada',
    to: 'Para',
    announce: {
      step: (i, n, label, result) => `Paso ${i} de ${n} listo: ${label}. ${result}.`,
      gate: (title) => `Una persona tiene que aprobar: ${title} El botón Aprobar está en el paso y en la actividad.`,
      done: (t) => `Terminado en ${t}.`,
    },
  },
};
