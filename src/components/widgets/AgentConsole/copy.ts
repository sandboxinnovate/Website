import type { Lang } from '@/i18n';
import type { StepKind } from './scenarios';

/** Interface copy for the agent console. Scenario content lives in scenarios.ts. */
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
  kinds: Record<StepKind, string>;
  tags: Record<'event' | 'call' | 'think' | 'info' | 'warn' | 'done' | 'human', string>;
  workflow: string;
  steps: (n: number) => string;
  trigger: string;
  graphLabel: string;
  legend: Record<'idle' | 'running' | 'done' | 'gate', string>;
  log: string;
  events: (n: number) => string;
  live: string;
  waiting: string;
  stepShort: (i: number, n: number) => string;
  toolsConnected: (n: number) => string;
  gate: {
    title: string;
    approve: string;
    auto: (s: number) => string;
    byYou: (t: string) => string;
    byAuto: (t: string) => string;
    byStatic: (who: string) => string;
    resultYou: string;
    resultAuto: string;
    resultStatic: string;
  };
  outcome: string;
  to: string;
  announce: {
    step: (i: number, n: number, label: string, result: string) => string;
    gate: (title: string) => string;
    done: (t: string) => string;
  };
}

export const COPY: Record<Lang, ConsoleCopy> = {
  en: {
    region: 'Agent console, simulated demo',
    simulated: 'Simulated run',
    simulatedNote: 'Illustrative data · fictional companies',
    workflows: 'Workflows',
    play: 'Play run',
    pause: 'Pause run',
    replay: 'Replay run',
    speed: 'Playback speed',
    speedOpt: (s) => `${s}× speed`,
    status: { ready: 'Ready', running: 'Running', paused: 'Paused', awaiting: 'Awaiting approval', done: 'Completed' },
    node: { idle: 'queued', running: 'running', gate: 'waiting', done: 'done' },
    kinds: { trigger: 'trigger', tool: 'tool', model: 'model', human: 'human', action: 'action' },
    tags: { event: 'event', call: 'call', think: 'think', info: 'info', warn: 'alert', done: 'done', human: 'human' },
    workflow: 'Workflow',
    steps: (n) => `${n} steps`,
    trigger: 'Trigger',
    graphLabel: 'Workflow steps',
    legend: { idle: 'Queued', running: 'Running', done: 'Done', gate: 'Needs approval' },
    log: 'Run log',
    events: (n) => `${n} ${n === 1 ? 'event' : 'events'}`,
    live: 'Live',
    waiting: 'Listening for the trigger…',
    stepShort: (i, n) => `Step ${i}/${n}`,
    toolsConnected: (n) => `${n} tools connected`,
    gate: {
      title: 'Approval required',
      approve: 'Approve',
      auto: (s) => `Auto-approves in ${s}s · demo`,
      byYou: (t) => `Approved by you after ${t}`,
      byAuto: (t) => `No answer in ${t} · auto-approved for the demo`,
      byStatic: (who) => `Approved by the ${who}`,
      resultYou: 'Approved by you',
      resultAuto: 'Auto-approved (demo)',
      resultStatic: 'Approved',
    },
    outcome: 'Outcome',
    to: 'To',
    announce: {
      step: (i, n, label, result) => `Step ${i} of ${n} done: ${label}. ${result}.`,
      gate: (title) => `Approval needed: ${title}. The Approve button is in the run log.`,
      done: (t) => `Run completed in ${t}.`,
    },
  },
  es: {
    region: 'Consola de agentes, demo simulada',
    simulated: 'Simulación',
    simulatedNote: 'Datos ilustrativos · empresas ficticias',
    workflows: 'Flujos de trabajo',
    play: 'Reproducir',
    pause: 'Pausar',
    replay: 'Repetir desde el inicio',
    speed: 'Velocidad de reproducción',
    speedOpt: (s) => `Velocidad ${s}×`,
    status: { ready: 'Listo', running: 'En curso', paused: 'En pausa', awaiting: 'Esperando aprobación', done: 'Completado' },
    node: { idle: 'en cola', running: 'en curso', gate: 'esperando', done: 'listo' },
    kinds: { trigger: 'disparador', tool: 'conector', model: 'modelo', human: 'humano', action: 'acción' },
    tags: { event: 'evento', call: 'llamada', think: 'razona', info: 'info', warn: 'alerta', done: 'listo', human: 'humano' },
    workflow: 'Flujo',
    steps: (n) => `${n} pasos`,
    trigger: 'Disparador',
    graphLabel: 'Pasos del flujo',
    legend: { idle: 'En cola', running: 'En curso', done: 'Listo', gate: 'Requiere aprobación' },
    log: 'Registro',
    events: (n) => `${n} ${n === 1 ? 'evento' : 'eventos'}`,
    live: 'En vivo',
    waiting: 'Esperando el disparador…',
    stepShort: (i, n) => `Paso ${i}/${n}`,
    toolsConnected: (n) => `${n} herramientas conectadas`,
    gate: {
      title: 'Requiere aprobación',
      approve: 'Aprobar',
      auto: (s) => `Se aprueba sola en ${s} s · demo`,
      byYou: (t) => `Aprobado por ti en ${t}`,
      byAuto: (t) => `Sin respuesta en ${t} · aprobado automáticamente para la demo`,
      byStatic: (who) => `Aprobado por ${who}`,
      resultYou: 'Aprobado por ti',
      resultAuto: 'Aprobación automática',
      resultStatic: 'Aprobado',
    },
    outcome: 'Resultado',
    to: 'Para',
    announce: {
      step: (i, n, label, result) => `Paso ${i} de ${n} listo: ${label}. ${result}.`,
      gate: (title) => `Se necesita aprobación: ${title}. El botón Aprobar está en el registro.`,
      done: (t) => `Ejecución completada en ${t}.`,
    },
  },
};
