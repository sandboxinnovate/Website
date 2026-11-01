import type { L10n } from '@/i18n';
import type { IconKey } from './icons';

/**
 * The four simulated workflows. Every company, person, domain and number here is fictional
 * and only illustrates the kind of run a brain performs. Durations are in ms at 1× speed.
 */

export type ScenarioId = 'lead' | 'support' | 'report' | 'content';
export type StepKind = 'trigger' | 'tool' | 'model' | 'human' | 'action';

type T = L10n<string>;
/** A value that is either identical in both languages or localized. */
export type S = string | T;

export type LogDef =
  | { t: number; k: 'event'; text: S; minor?: boolean }
  | { t: number; k: 'call'; fn: string; args: S; code: number; ms: number; chip?: number; minor?: boolean }
  | { t: number; k: 'think' | 'info' | 'warn'; text: T; minor?: boolean };

export interface GateDef {
  /** Offset (ms from step start) where the run stops and waits for a human. */
  at: number;
  title: T;
  policy: T;
  excerpt: T;
  approver: T;
}

export interface StepDef {
  id: string;
  kind: StepKind;
  icon: IconKey;
  label: T;
  /** Mono sub-label shown while queued/running (a tool or function name). */
  tool: string;
  /** Short result shown on the node and in the log once done. */
  result: T;
  dur: number;
  chips?: T[];
  gate?: GateDef;
  logs: LogDef[];
}

export interface ScenarioDef {
  id: ScenarioId;
  icon: IconKey;
  tab: T;
  path: L10n<[string, string]>;
  trigger: T;
  tools: number;
  hex: string;
  steps: StepDef[];
  outcome: {
    headline: T;
    baseline: T;
    stats: { value: S; label: T }[];
    artifact: { label: T; meta: S; subject?: T; body: T };
  };
}

const l = (en: string, es: string): T => ({ en, es });

export const SCENARIOS: ScenarioDef[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    id: 'lead',
    icon: 'user',
    hex: '7f3a2c',
    tab: l('Inbound lead', 'Lead entrante'),
    path: { en: ['sales-brain', 'inbound-lead'], es: ['brain-ventas', 'lead-entrante'] },
    trigger: l('webhook', 'webhook'),
    tools: 5,
    steps: [
      {
        id: 'form', kind: 'trigger', icon: 'form', dur: 1500,
        label: l('Form submitted', 'Formulario recibido'),
        tool: 'form.webhook',
        result: l('Lead captured · lead_3091', 'Lead capturado · lead_3091'),
        logs: [
          { t: 0, k: 'event', text: 'form.submitted {company: "Quarrystone Freight", contact: "Dana Whitfield"}' },
          { t: 620, k: 'think', text: l(
            'Demo request from a VP of Operations. Mentions 40 drivers and dispatch delays.',
            'Pide una demo la VP de Operaciones. Menciona 40 conductores y retrasos en el despacho.',
          ) },
        ],
      },
      {
        id: 'enrich', kind: 'tool', icon: 'building', dur: 3100,
        label: l('Enrich company', 'Enriquecer empresa'),
        tool: 'company.enrich',
        result: l('120 staff · 3 depots', '120 personas · 3 centros'),
        logs: [
          { t: 80, k: 'call', fn: 'crm.lookup', args: 'domain: "northwind.co"', code: 200, ms: 312 },
          { t: 520, k: 'info', minor: true, text: l('No existing account. Treating as a new company.', 'No hay cuenta previa. Se trata como empresa nueva.') },
          { t: 950, k: 'call', fn: 'web.read', args: 'url: "northwind.co/about"', code: 200, ms: 864 },
          { t: 1900, k: 'call', fn: 'company.enrich', args: 'domain: "northwind.co"', code: 200, ms: 540 },
          { t: 2560, k: 'think', text: l(
            'Regional freight carrier, about 120 people, 3 depots. Dispatch runs on spreadsheets.',
            'Transportista regional, unas 120 personas y 3 centros. Despachan con hojas de cálculo.',
          ) },
        ],
      },
      {
        id: 'score', kind: 'model', icon: 'gauge', dur: 2500,
        label: l('Score fit', 'Calificar ajuste'),
        tool: 'score.fit',
        result: l('Fit 86/100 · tier A', 'Ajuste 86/100 · nivel A'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.search', args: l('q: "ideal customer profile"', 'q: "perfil de cliente ideal"'), code: 200, ms: 188 },
          { t: 620, k: 'think', text: l(
            'Industry, size and stated pain match tier A. No timeline given yet.',
            'Industria, tamaño y problema encajan en el nivel A. Todavía no menciona plazos.',
          ) },
          { t: 1500, k: 'call', fn: 'score.fit', args: 'lead: "lead_3091"', code: 200, ms: 402 },
        ],
      },
      {
        id: 'crm', kind: 'action', icon: 'database', dur: 2100,
        label: l('Update CRM', 'Actualizar CRM'),
        tool: 'crm.upsert',
        result: l('Deal D-2207 · Qualified', 'D-2207 · etapa Calificada'),
        logs: [
          { t: 80, k: 'call', fn: 'crm.create_company', args: 'name: "Quarrystone Freight"', code: 201, ms: 274 },
          { t: 660, k: 'call', fn: 'crm.create_deal', args: l('stage: "Qualified", owner: "S. Ortega"', 'stage: "Calificada", owner: "S. Ortega"'), code: 201, ms: 331 },
          { t: 1320, k: 'call', fn: 'crm.add_note', args: 'deal: "D-2207"', code: 200, ms: 156, minor: true },
        ],
      },
      {
        id: 'draft', kind: 'model', icon: 'pen', dur: 3200,
        label: l('Draft reply', 'Redactar respuesta'),
        tool: 'draft.email',
        result: l('Reply drafted · 2 slots', 'Borrador · 2 horarios'),
        logs: [
          { t: 80, k: 'call', fn: 'calendar.free_slots', args: 'owner: "S. Ortega", days: 5', code: 200, ms: 290 },
          { t: 620, k: 'think', text: l(
            'Open with their problem, offer two times this week, keep it under 120 words.',
            'Abrir con su problema, ofrecer dos horarios esta semana y no pasar de 120 palabras.',
          ) },
          { t: 1400, k: 'call', fn: 'llm.generate', args: l('template: "first_reply", voice: "brand"', 'template: "primera_respuesta", voice: "marca"'), code: 200, ms: 1240 },
        ],
      },
      {
        id: 'alert', kind: 'action', icon: 'chat', dur: 1500,
        label: l('Alert sales', 'Avisar a ventas'),
        tool: 'chat.post',
        result: l('Sam notified in chat', 'Aviso a Sam en el chat'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.save_draft', args: 'to: "dana@northwind.co"', code: 201, ms: 240 },
          { t: 600, k: 'call', fn: 'chat.post', args: l('channel: "#sales-inbound"', 'channel: "#ventas-entrantes"'), code: 200, ms: 198 },
        ],
      },
    ],
    outcome: {
      headline: l('Completed in {t}', 'Completado en {t}'),
      baseline: l('by hand ≈ 2 h (est.)', 'a mano ≈ 2 h (est.)'),
      stats: [
        { value: '3', label: l('systems updated', 'sistemas actualizados') },
        { value: '86', label: l('fit score', 'puntaje de ajuste') },
        { value: '1', label: l('reply ready to send', 'respuesta lista') },
      ],
      artifact: {
        label: l('Drafted reply', 'Respuesta redactada'),
        meta: 'dana@northwind.co',
        subject: l('Dispatch delays at Quarrystone Freight', 'Retrasos de despacho en Quarrystone Freight'),
        body: l(
          'Hi Dana,\n\nThanks for reaching out. Dispatching 40 drivers from spreadsheets across three depots is exactly where delays start to stack up.\n\nWe can walk you through how routes get assigned and late loads get flagged before they slip.\n\nWould Tue 10:00 or Thu 15:30 work for a 30-minute call?\n\nSam Ortega',
          'Hola, Dana:\n\nGracias por escribirnos. Despachar 40 conductores desde hojas de cálculo en tres centros es justo donde los retrasos empiezan a acumularse.\n\nPodemos mostrarte cómo se asignan las rutas y cómo se detectan las cargas en riesgo antes de que se atrasen.\n\n¿Te queda bien el martes a las 10:00 o el jueves a las 15:30 para una llamada de 30 minutos?\n\nSam Ortega',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 02 */
  {
    id: 'support',
    icon: 'ticket',
    hex: '91be04',
    tab: l('Support ticket', 'Ticket de soporte'),
    path: { en: ['support-brain', 'ticket-triage'], es: ['brain-soporte', 'triage-tickets'] },
    trigger: l('inbox', 'bandeja'),
    tools: 6,
    steps: [
      {
        id: 'email', kind: 'trigger', icon: 'mail', dur: 1500,
        label: l('Email arrives', 'Llega un correo'),
        tool: 'inbox.watch',
        result: l('Ticket T-5812 opened', 'Ticket T-5812 abierto'),
        logs: [
          { t: 0, k: 'event', text: l(
            'email.received {from: "carla.reyes@mail.co", subject: "Charged twice?"}',
            'email.received {from: "carla.reyes@mail.co", subject: "¿Me cobraron dos veces?"}',
          ) },
          { t: 620, k: 'think', text: l(
            'Patient says she was billed twice for a cleaning on Oct 14.',
            'La paciente dice que le cobraron dos veces una limpieza del 14 de octubre.',
          ) },
        ],
      },
      {
        id: 'classify', kind: 'model', icon: 'tag', dur: 2100,
        label: l('Classify intent', 'Clasificar el caso'),
        tool: 'classify.intent',
        result: l('Billing · urgency medium', 'Cobros · urgencia media'),
        logs: [
          { t: 80, k: 'call', fn: 'classify', args: 'labels: ["intent", "urgency"]', code: 200, ms: 286 },
          { t: 680, k: 'think', text: l(
            'Intent: duplicate charge. Urgency: medium. Tone: frustrated but polite.',
            'Intención: cobro duplicado. Urgencia: media. Tono: molesta pero cordial.',
          ) },
          { t: 1320, k: 'call', fn: 'crm.lookup', args: 'email: "carla.reyes@mail.co"', code: 200, ms: 204 },
        ],
      },
      {
        id: 'kb', kind: 'tool', icon: 'book', dur: 2700,
        label: l('Search knowledge base', 'Buscar en la base'),
        tool: 'kb.search',
        result: l('2 sources · double charge', '2 fuentes · cargo doble'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.search', args: l('q: "duplicate charge refund"', 'q: "reembolso cobro duplicado"'), code: 200, ms: 241 },
          { t: 620, k: 'call', fn: 'billing.invoices', args: 'patient: "P-1187", days: 30', code: 200, ms: 377 },
          { t: 1380, k: 'think', text: l(
            'Two identical charges on Oct 14. Policy: duplicates are refunded in 3–5 business days.',
            'Dos cargos idénticos el 14 de octubre. Política: los duplicados se reembolsan en 3 a 5 días hábiles.',
          ) },
        ],
      },
      {
        id: 'draft', kind: 'model', icon: 'pen', dur: 2800,
        label: l('Draft cited answer', 'Redactar con citas'),
        tool: 'draft.reply',
        result: l('Draft ready · 2 citations', 'Borrador listo · 2 citas'),
        logs: [
          { t: 80, k: 'call', fn: 'llm.generate', args: l('template: "support_reply", cite: true', 'template: "respuesta_soporte", cite: true'), code: 200, ms: 920 },
          { t: 1280, k: 'call', fn: 'policy.check', args: l('topic: "billing"', 'topic: "cobros"'), code: 200, ms: 118 },
          { t: 1720, k: 'think', text: l(
            'Billing replies need a human sign-off. Routing to the front-desk lead.',
            'Las respuestas sobre cobros requieren aprobación humana. Se envía a la coordinadora de recepción.',
          ) },
        ],
      },
      {
        id: 'approve', kind: 'human', icon: 'shield', dur: 1700,
        label: l('Human approval', 'Aprobación humana'),
        tool: 'approval.request',
        result: l('Approved', 'Aprobado'),
        gate: {
          at: 700,
          title: l('Send billing reply to Carla Reyes', 'Enviar respuesta de cobro a Carla Reyes'),
          policy: l('policy: billing → human review · confidence 0.93', 'política: cobros → revisión humana · confianza 0,93'),
          excerpt: l(
            'You’re right — your Oct 14 cleaning was charged twice [1]. We’ve flagged the duplicate for a refund…',
            'Tienes razón: la limpieza del 14 de octubre se cobró dos veces [1]. Ya marcamos el cargo duplicado para reembolso…',
          ),
          approver: l('front-desk lead', 'la coordinadora de recepción'),
        },
        logs: [
          { t: 80, k: 'call', fn: 'approval.request', args: l('to: "front-desk-lead"', 'to: "coordinacion-recepcion"'), code: 202, ms: 140 },
        ],
      },
      {
        id: 'send', kind: 'action', icon: 'send', dur: 1900,
        label: l('Send and log', 'Enviar y registrar'),
        tool: 'inbox.send',
        result: l('Sent · ticket solved', 'Enviado · ticket resuelto'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.send', args: 'ticket: "T-5812"', code: 202, ms: 310 },
          { t: 700, k: 'call', fn: 'billing.flag_refund', args: 'invoice: "INV-20931"', code: 200, ms: 260 },
          { t: 1260, k: 'call', fn: 'helpdesk.log', args: 'ticket: "T-5812", status: "solved"', code: 200, ms: 150 },
        ],
      },
    ],
    outcome: {
      headline: l('Resolved in {t}', 'Resuelto en {t}'),
      baseline: l('typical first reply ≈ 4 h (est.)', 'primera respuesta típica ≈ 4 h (est.)'),
      stats: [
        { value: '2', label: l('sources cited', 'fuentes citadas') },
        { value: '1', label: l('human approval', 'aprobación humana') },
        { value: '3', label: l('systems updated', 'sistemas actualizados') },
      ],
      artifact: {
        label: l('Sent reply', 'Respuesta enviada'),
        meta: 'carla.reyes@mail.co',
        subject: l('Re: Charged twice?', 'Re: ¿Me cobraron dos veces?'),
        body: l(
          'Hi Carla,\n\nYou’re right — your Oct 14 cleaning was charged twice [1]. We’ve flagged the duplicate for a refund, which usually lands in 3–5 business days [2].\n\nNothing to do on your side. If you don’t see it by Oct 23, just reply here.\n\nLumen Dental · Front desk\n\n[1] Invoice INV-20931  [2] Billing policy §4.2',
          'Hola, Carla:\n\nTienes razón: la limpieza del 14 de octubre se cobró dos veces [1]. Ya marcamos el cargo duplicado para reembolso, que suele llegar en 3 a 5 días hábiles [2].\n\nNo tienes que hacer nada. Si no lo ves antes del 23 de octubre, responde a este correo.\n\nLumen Dental · Recepción\n\n[1] Factura INV-20931  [2] Política de cobros §4.2',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 03 */
  {
    id: 'report',
    icon: 'chart',
    hex: 'c42d7e',
    tab: l('Weekly ops report', 'Reporte semanal'),
    path: { en: ['ops-brain', 'weekly-report'], es: ['brain-operaciones', 'reporte-semanal'] },
    trigger: l('schedule · Mon 07:00', 'programado · lun 07:00'),
    tools: 5,
    steps: [
      {
        id: 'cron', kind: 'trigger', icon: 'clock', dur: 1300,
        label: l('Scheduled trigger', 'Inicio programado'),
        tool: 'schedule.weekly',
        result: l('Week 44 · Mon 07:00', 'Semana 44 · lun 07:00'),
        logs: [
          { t: 0, k: 'event', text: 'schedule.fired {job: "weekly-ops", week: 44}' },
          { t: 560, k: 'think', text: l(
            'Weekly operations report for Atlas Logistics, week 44.',
            'Reporte semanal de operaciones de Atlas Logistics, semana 44.',
          ) },
        ],
      },
      {
        id: 'pull', kind: 'tool', icon: 'layers', dur: 3000,
        label: l('Pull data', 'Extraer datos'),
        tool: 'data.pull',
        chips: [l('Sheet', 'Hoja'), l('CRM', 'CRM'), l('Ads', 'Anuncios')],
        result: l('3 sources · 526 records', '3 fuentes · 526 registros'),
        logs: [
          { t: 80, k: 'call', fn: 'sheet.read', args: 'tab: "fleet", rows: 412', code: 200, ms: 420, chip: 0 },
          { t: 420, k: 'call', fn: 'crm.report', args: 'pipeline: "freight", period: "w44"', code: 200, ms: 690, chip: 1 },
          { t: 900, k: 'call', fn: 'ads.insights', args: 'account: "atlas", period: "w44"', code: 200, ms: 810, chip: 2 },
          { t: 2150, k: 'info', text: l('412 shipments, 96 deals and 18 campaigns merged.', '412 envíos, 96 oportunidades y 18 campañas combinadas.') },
        ],
      },
      {
        id: 'reconcile', kind: 'tool', icon: 'table', dur: 2200,
        label: l('Reconcile metrics', 'Conciliar métricas'),
        tool: 'metrics.compute',
        result: l('12 KPIs vs 8-week baseline', '12 KPI · base 8 semanas'),
        logs: [
          { t: 80, k: 'call', fn: 'metrics.compute', args: 'kpis: 12, baseline: "8w"', code: 200, ms: 530 },
          { t: 900, k: 'think', text: l(
            'Lead counts differ by 7 between ads and CRM. Using the CRM as the source of truth.',
            'El conteo de leads difiere en 7 entre anuncios y CRM. Tomo el CRM como fuente de verdad.',
          ) },
        ],
      },
      {
        id: 'anomaly', kind: 'model', icon: 'alert', dur: 2500,
        label: l('Detect anomalies', 'Detectar anomalías'),
        tool: 'anomaly.scan',
        result: l('2 anomalies flagged', '2 anomalías detectadas'),
        logs: [
          { t: 80, k: 'call', fn: 'anomaly.scan', args: 'method: "z-score", threshold: 2', code: 200, ms: 460 },
          { t: 760, k: 'warn', text: l('On-time delivery 88% (−6 pts) · Denver hub', 'Entregas a tiempo 88% (−6 pts) · centro Denver') },
          { t: 1240, k: 'warn', text: l('Cost per lead +38% · campaign freight-quote', 'Costo por lead +38% · campaña freight-quote') },
          { t: 1800, k: 'think', text: l(
            'The Denver drop lines up with 2 trucks in maintenance since Tuesday.',
            'La caída en Denver coincide con 2 camiones en mantenimiento desde el martes.',
          ) },
        ],
      },
      {
        id: 'summary', kind: 'model', icon: 'doc', dur: 3000,
        label: l('Write summary', 'Escribir resumen'),
        tool: 'draft.summary',
        result: l('176 words · 3 charts', '176 palabras · 3 gráficos'),
        logs: [
          { t: 80, k: 'call', fn: 'llm.generate', args: l('template: "exec_summary", words: 180', 'template: "resumen_ejecutivo", words: 180'), code: 200, ms: 1100 },
          { t: 1500, k: 'call', fn: 'chart.render', args: 'kpis: ["otd", "cpl", "shipments"]', code: 200, ms: 380 },
          { t: 2250, k: 'think', minor: true, text: l(
            'Lead with the two risks, then the wins. Plain language, no jargon.',
            'Primero los dos riesgos, luego los logros. Lenguaje simple, sin jerga.',
          ) },
        ],
      },
      {
        id: 'deliver', kind: 'action', icon: 'send', dur: 1600,
        label: l('Deliver', 'Entregar'),
        tool: 'deliver',
        chips: [l('Inbox', 'Correo'), l('Team chat', 'Chat')],
        result: l('6 people · 2 channels', '6 personas · 2 canales'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.send', args: 'to: "leadership@atlaslogistics.co"', code: 202, ms: 280, chip: 0 },
          { t: 520, k: 'call', fn: 'chat.post', args: l('channel: "#ops-weekly"', 'channel: "#ops-semanal"'), code: 200, ms: 190, chip: 1 },
        ],
      },
    ],
    outcome: {
      headline: l('Delivered in {t}', 'Entregado en {t}'),
      baseline: l('by hand ≈ 3 h (est.)', 'a mano ≈ 3 h (est.)'),
      stats: [
        { value: '3', label: l('sources merged', 'fuentes combinadas') },
        { value: '2', label: l('anomalies flagged', 'anomalías detectadas') },
        { value: '2', label: l('channels', 'canales') },
      ],
      artifact: {
        label: l('Executive summary', 'Resumen ejecutivo'),
        meta: l('Atlas Logistics · week 44', 'Atlas Logistics · semana 44'),
        body: l(
          'Watch\n• On-time delivery fell to 88% (−6 pts), driven by Denver: 2 trucks in maintenance since Tuesday.\n• Cost per lead is up 38% on freight-quote. Suggest pausing its two weakest ad sets.\n\nWins\n• Shipments up 2% week over week.\n• 3 new contracts signed; 41 qualified deals in the pipeline.',
          'Atención\n• Las entregas a tiempo bajaron a 88% (−6 pts) por Denver: 2 camiones en mantenimiento desde el martes.\n• El costo por lead subió 38% en freight-quote. Sugiero pausar sus dos grupos de anuncios más débiles.\n\nLogros\n• Envíos +2% frente a la semana anterior.\n• 3 contratos nuevos firmados; 41 oportunidades calificadas.',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 04 */
  {
    id: 'content',
    icon: 'repeat',
    hex: '5ea813',
    tab: l('Content repurpose', 'Reutilizar contenido'),
    path: { en: ['content-brain', 'repurpose'], es: ['brain-contenido', 'reutilizar'] },
    trigger: l('new file', 'archivo nuevo'),
    tools: 5,
    steps: [
      {
        id: 'file', kind: 'trigger', icon: 'video', dur: 1400,
        label: l('Webinar recording', 'Webinar grabado'),
        tool: 'files.watch',
        result: l('46 min · 1 recording', '46 min · 1 grabación'),
        logs: [
          { t: 0, k: 'event', text: l(
            'file.added {name: "webinar-first-time-buyers.mp4", length: "46:12"}',
            'file.added {name: "webinar-primera-vivienda.mp4", length: "46:12"}',
          ) },
          { t: 600, k: 'think', text: l(
            'New Halcyon Realty webinar in the shared folder. Starting the repurpose flow.',
            'Nuevo webinar de Halcyon Realty en la carpeta compartida. Inicio el flujo de reutilización.',
          ) },
        ],
      },
      {
        id: 'transcribe', kind: 'model', icon: 'wave', dur: 3000,
        label: l('Transcribe', 'Transcribir'),
        tool: 'audio.transcribe',
        result: l('6,812 words · 2 speakers', '6812 palabras · 2 voces'),
        logs: [
          { t: 80, k: 'call', fn: 'audio.transcribe', args: l('lang: "en", speakers: 2', 'lang: "es", speakers: 2'), code: 200, ms: 1620 },
          { t: 1950, k: 'info', text: l('14 chapters detected · 3 audience questions', '14 capítulos detectados · 3 preguntas del público') },
        ],
      },
      {
        id: 'ideas', kind: 'model', icon: 'bulb', dur: 2300,
        label: l('Extract key ideas', 'Extraer ideas clave'),
        tool: 'ideas.extract',
        result: l('5 ideas · 4 quotes', '5 ideas · 4 citas'),
        logs: [
          { t: 80, k: 'call', fn: 'ideas.extract', args: 'max: 5, quotes: true', code: 200, ms: 640 },
          { t: 960, k: 'think', text: l(
            'Strongest moment: the 3-question checklist at 18:40. Building everything around it.',
            'El mejor momento: la lista de 3 preguntas del minuto 18:40. Construyo todo alrededor de eso.',
          ) },
        ],
      },
      {
        id: 'write', kind: 'model', icon: 'pen', dur: 3800,
        label: l('Write assets', 'Redactar piezas'),
        tool: 'llm.generate',
        chips: [l('Blog', 'Blog'), l('5 posts', '5 posts'), l('Newsletter', 'Boletín')],
        result: l('7 assets drafted', '7 piezas redactadas'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.get', args: l('doc: "brand-voice-guide"', 'doc: "guia-de-voz"'), code: 200, ms: 150, minor: true },
          { t: 480, k: 'call', fn: 'llm.generate', args: 'asset: "blog", words: 1200', code: 200, ms: 1180, chip: 0 },
          { t: 1400, k: 'call', fn: 'llm.generate', args: 'asset: "social", count: 5', code: 200, ms: 880, chip: 1 },
          { t: 2300, k: 'call', fn: 'llm.generate', args: 'asset: "newsletter"', code: 200, ms: 820, chip: 2 },
        ],
      },
      {
        id: 'voice', kind: 'model', icon: 'spark', dur: 2100,
        label: l('Brand-voice check', 'Revisar el tono'),
        tool: 'voice.check',
        result: l('Voice match 0.94 · 2 edits', 'Tono 0,94 · 2 ajustes'),
        logs: [
          { t: 80, k: 'call', fn: 'voice.check', args: 'assets: 7', code: 200, ms: 480 },
          { t: 780, k: 'think', text: l(
            'Two posts read too salesy. Rewriting their opening lines.',
            'Dos posts suenan demasiado comerciales. Reescribo sus primeras líneas.',
          ) },
          { t: 1380, k: 'call', fn: 'llm.rewrite', args: 'assets: ["post_2", "post_4"]', code: 200, ms: 420 },
        ],
      },
      {
        id: 'schedule', kind: 'action', icon: 'calendar', dur: 1700,
        label: l('Schedule', 'Programar'),
        tool: 'calendar.schedule',
        result: l('Mon–Fri · 09:00', 'lun–vie · 09:00'),
        logs: [
          { t: 80, k: 'call', fn: 'cms.create_draft', args: 'type: "blog"', code: 201, ms: 260 },
          { t: 520, k: 'call', fn: 'social.schedule', args: l('posts: 5, from: "Mon 09:00"', 'posts: 5, from: "lun 09:00"'), code: 200, ms: 330 },
          { t: 1040, k: 'call', fn: 'email.schedule', args: l('list: "buyers", at: "Thu 08:00"', 'list: "compradores", at: "jue 08:00"'), code: 200, ms: 210 },
        ],
      },
    ],
    outcome: {
      headline: l('Done in {t}', 'Listo en {t}'),
      baseline: l('by hand ≈ 2 days (est.)', 'a mano ≈ 2 días (est.)'),
      stats: [
        { value: '7', label: l('assets drafted', 'piezas redactadas') },
        { value: l('0.94', '0,94'), label: l('voice match', 'tono de marca') },
        { value: '5', label: l('posts scheduled', 'posts programados') },
      ],
      artifact: {
        label: l('Social post 1 of 5', 'Post 1 de 5'),
        meta: l('Halcyon Realty · Mon 09:00', 'Halcyon Realty · lun 09:00'),
        body: l(
          'Before you tour a single home, answer three questions:\n\n1. What monthly payment still lets you sleep at night?\n2. Which neighborhood trade-off can you live with?\n3. How long will you really stay?\n\nThe full checklist from our webinar is on the blog.',
          'Antes de visitar una sola casa, responde tres preguntas:\n\n1. ¿Qué cuota mensual te deja dormir en paz?\n2. ¿Qué cedes en ubicación y qué no negocias?\n3. ¿Cuánto tiempo vas a vivir ahí, en serio?\n\nLa lista completa del webinar está en nuestro blog.',
        ),
      },
    },
  },
];

export const pickS = (v: S, lang: 'en' | 'es'): string => (typeof v === 'string' ? v : v[lang]);
