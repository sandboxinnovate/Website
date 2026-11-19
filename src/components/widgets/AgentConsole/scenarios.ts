import type { L10n } from '@/i18n';
import type { ToolKey } from '@/components/ui/tool-icons';
import type { IconKey } from './icons';

/**
 * The four simulated workflows. Every company, person, domain and number here is fictional
 * and only illustrates the kind of work an AI assistant performs. Durations are in ms at 1× speed.
 *
 * Each log entry has two faces:
 * - `say` (or `text` for notes): a plain sentence for the activity feed, with the tool it touched;
 * - the technical fields (`fn`, `args`, `code`, `ms`): only shown under "Show technical details".
 */

export type ScenarioId = 'lead' | 'support' | 'report' | 'content';
export type StepKind = 'trigger' | 'tool' | 'model' | 'human' | 'action';
/** A business tool from the shared icon set, or a person (the approval step). */
export type StepTool = ToolKey | 'person';

type T = L10n<string>;
/** A value that is either identical in both languages or localized. */
export type S = string | T;

interface LogCommon {
  t: number;
  minor?: boolean;
  /** Plain-language line for the activity feed. Entries without one only appear in the technical details. */
  say?: T;
  /** Tool tile shown next to the feed line (defaults: notes use the AI tile, alerts the reports tile). */
  tool?: ToolKey;
}

export type LogDef =
  | (LogCommon & { k: 'event'; text: S })
  | (LogCommon & { k: 'call'; fn: string; args: S; code: number; ms: number; chip?: number })
  | (LogCommon & { k: 'think' | 'info' | 'warn'; text: T });

export interface GateDef {
  /** Offset (ms from step start) where the run stops and waits for a human. */
  at: number;
  title: T;
  /** Why a person has to approve, in plain words. */
  policy: T;
  excerpt: T;
  approver: T;
}

export interface StepDef {
  id: string;
  kind: StepKind;
  /** The tool this step works in (shown as an app tile on the step card). */
  uses: StepTool;
  /** What happens, in plain words. */
  label: T;
  /** Short result shown on the step once done. */
  result: T;
  dur: number;
  chips?: { label: T; tool: ToolKey }[];
  gate?: GateDef;
  logs: LogDef[];
}

export interface ScenarioDef {
  id: ScenarioId;
  icon: IconKey;
  tab: T;
  /** Who is doing the work, e.g. "Sales assistant". */
  name: T;
  /** What starts the work, in plain words. */
  trigger: T;
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
    tab: l('New sales inquiry', 'Consulta de venta'),
    name: l('Sales assistant', 'Asistente de ventas'),
    trigger: l('someone fills in your contact form', 'alguien completa tu formulario de contacto'),
    steps: [
      {
        id: 'form', kind: 'trigger', uses: 'forms', dur: 1500,
        label: l('Reads the new inquiry', 'Lee la consulta nueva'),
        result: l('From Quarrystone Freight', 'De Quarrystone Freight'),
        logs: [
          { t: 0, k: 'event', text: 'form.submitted {company: "Quarrystone Freight", contact: "Dana Whitfield"}', tool: 'forms',
            say: l('New inquiry from Dana Whitfield at Quarrystone Freight', 'Consulta nueva de Dana Whitfield, de Quarrystone Freight') },
          { t: 620, k: 'think', text: l(
            'She runs operations and wants a demo. Mentions 40 drivers and delays in dispatch.',
            'Dirige operaciones y pide una demo. Menciona 40 conductores y retrasos en el despacho.',
          ) },
        ],
      },
      {
        id: 'enrich', kind: 'tool', uses: 'web', dur: 3100,
        label: l('Looks up the company', 'Investiga la empresa'),
        result: l('About 120 people, 3 depots', 'Unas 120 personas, 3 centros'),
        logs: [
          { t: 80, k: 'call', fn: 'crm.lookup', args: 'domain: "quarrystone.example"', code: 200, ms: 312 },
          { t: 520, k: 'info', tool: 'crm', text: l('Not in the CRM yet, so this is a new company.', 'Todavía no está en el CRM: es una empresa nueva.') },
          { t: 950, k: 'call', fn: 'web.read', args: 'url: "quarrystone.example/about"', code: 200, ms: 864, tool: 'web',
            say: l('Reads the company website', 'Lee el sitio web de la empresa') },
          { t: 1900, k: 'call', fn: 'company.enrich', args: 'domain: "quarrystone.example"', code: 200, ms: 540 },
          { t: 2560, k: 'info', tool: 'web', text: l(
            'Found the company: regional freight carrier, about 120 people, 3 depots. Dispatch runs on spreadsheets.',
            'Empresa encontrada: transportista regional, unas 120 personas y 3 centros. Despachan con planillas.',
          ) },
        ],
      },
      {
        id: 'score', kind: 'model', uses: 'ai', dur: 2500,
        label: l('Scores the fit', 'Evalúa si encaja'),
        result: l('86/100, a strong match', '86/100, muy buen candidato'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.search', args: l('q: "ideal customer profile"', 'q: "perfil de cliente ideal"'), code: 200, ms: 188, tool: 'kb',
            say: l('Compares it with your ideal customer profile', 'La compara con tu perfil de cliente ideal') },
          { t: 620, k: 'think', text: l(
            'Industry, size and problem all match. No timeline mentioned yet.',
            'Industria, tamaño y problema encajan. Todavía no menciona plazos.',
          ) },
          { t: 1500, k: 'call', fn: 'score.fit', args: 'lead: "lead_3091"', code: 200, ms: 402, tool: 'ai',
            say: l('Fit score 86/100, a strong match', 'Puntaje 86/100, muy buen candidato') },
        ],
      },
      {
        id: 'crm', kind: 'action', uses: 'crm', dur: 2100,
        label: l('Updates the CRM', 'Actualiza el CRM'),
        result: l('New deal for Sam Ortega', 'Oportunidad para Sam Ortega'),
        logs: [
          { t: 80, k: 'call', fn: 'crm.create_company', args: 'name: "Quarrystone Freight"', code: 201, ms: 274, tool: 'crm',
            say: l('Adds Quarrystone Freight to the CRM', 'Agrega Quarrystone Freight al CRM') },
          { t: 660, k: 'call', fn: 'crm.create_deal', args: l('stage: "Qualified", owner: "S. Ortega"', 'stage: "Calificada", owner: "S. Ortega"'), code: 201, ms: 331, tool: 'crm',
            say: l('Opens a deal marked Qualified and assigns it to Sam Ortega', 'Abre una oportunidad como Calificada y se la asigna a Sam Ortega') },
          { t: 1320, k: 'call', fn: 'crm.add_note', args: 'deal: "D-2207"', code: 200, ms: 156, minor: true },
        ],
      },
      {
        id: 'draft', kind: 'model', uses: 'email', dur: 3200,
        label: l('Drafts the reply', 'Redacta la respuesta'),
        result: l('Ready, with 2 meeting times', 'Lista, con 2 horarios'),
        logs: [
          { t: 80, k: 'call', fn: 'calendar.free_slots', args: 'owner: "S. Ortega", days: 5', code: 200, ms: 290, tool: 'calendar',
            say: l('Finds two free times in Sam’s calendar', 'Busca dos horarios libres en el calendario de Sam') },
          { t: 620, k: 'think', text: l(
            'Open with her problem, offer two times this week, keep it short.',
            'Empezar por su problema, ofrecer dos horarios esta semana y ser breve.',
          ) },
          { t: 1400, k: 'call', fn: 'llm.generate', args: l('template: "first_reply", voice: "brand"', 'template: "primera_respuesta", voice: "marca"'), code: 200, ms: 1240, tool: 'email',
            say: l('Writes the reply in your company’s tone', 'Escribe la respuesta con el tono de tu empresa') },
        ],
      },
      {
        id: 'alert', kind: 'action', uses: 'chat', dur: 1500,
        label: l('Notifies sales', 'Avisa a ventas'),
        result: l('Sam got a chat message', 'Sam recibió un aviso'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.save_draft', args: 'to: "dana@quarrystone.example"', code: 201, ms: 240, tool: 'email',
            say: l('Saves the reply as a draft. Nothing is sent until Sam reviews it.', 'Guarda la respuesta como borrador. No se envía nada hasta que Sam la revise.') },
          { t: 600, k: 'call', fn: 'chat.post', args: l('channel: "#sales-inbound"', 'channel: "#ventas-entrantes"'), code: 200, ms: 198, tool: 'chat',
            say: l('Lets Sam know in the sales channel', 'Le avisa a Sam en el canal de ventas') },
        ],
      },
    ],
    outcome: {
      headline: l('Done in {t}', 'Listo en {t}'),
      baseline: l('By hand: about 2 hours (estimate)', 'A mano: unas 2 horas (estimado)'),
      stats: [
        { value: '3', label: l('tools updated', 'herramientas actualizadas') },
        { value: '86', label: l('fit score', 'puntaje de ajuste') },
        { value: '1', label: l('reply ready to review', 'respuesta para revisar') },
      ],
      artifact: {
        label: l('Drafted reply', 'Respuesta redactada'),
        meta: l('Dana Whitfield, Quarrystone Freight', 'Dana Whitfield, Quarrystone Freight'),
        subject: l('Dispatch delays at Quarrystone Freight', 'Retrasos de despacho en Quarrystone Freight'),
        body: l(
          'Hi Dana,\n\nThanks for reaching out. Dispatching 40 drivers from spreadsheets across three depots is exactly where delays start to stack up.\n\nWe can walk you through how routes get assigned and late loads get flagged before they slip.\n\nWould Tue 10:00 or Thu 15:30 work for a 30-minute call?\n\nSam Ortega',
          'Hola, Dana:\n\nGracias por escribirnos. Despachar 40 conductores desde planillas en tres centros es justo donde los retrasos empiezan a acumularse.\n\nPodemos mostrarte cómo se asignan las rutas y cómo se detectan las cargas en riesgo antes de que se atrasen.\n\n¿Te queda bien el martes a las 10:00 o el jueves a las 15:30 para una llamada de 30 minutos?\n\nSam Ortega',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 02 */
  {
    id: 'support',
    icon: 'ticket',
    tab: l('Customer email', 'Correo de cliente'),
    name: l('Support assistant', 'Asistente de soporte'),
    trigger: l('a customer writes to your support inbox', 'un cliente escribe a tu correo de soporte'),
    steps: [
      {
        id: 'email', kind: 'trigger', uses: 'email', dur: 1500,
        label: l('Reads the email', 'Lee el correo'),
        result: l('New ticket opened', 'Ticket nuevo abierto'),
        logs: [
          { t: 0, k: 'event', tool: 'email', text: l(
            'email.received {from: "carla.reyes@email.example", subject: "Charged twice?"}',
            'email.received {from: "carla.reyes@email.example", subject: "¿Me cobraron dos veces?"}',
          ), say: l('Email from Carla Reyes: “Charged twice?”', 'Correo de Carla Reyes: “¿Me cobraron dos veces?”') },
          { t: 620, k: 'think', text: l(
            'She says her Oct 14 cleaning was billed twice.',
            'Dice que le cobraron dos veces la limpieza del 14 de octubre.',
          ) },
        ],
      },
      {
        id: 'classify', kind: 'model', uses: 'ai', dur: 2100,
        label: l('Understands the request', 'Entiende el pedido'),
        result: l('Billing, medium urgency', 'Cobros, urgencia media'),
        logs: [
          { t: 80, k: 'call', fn: 'classify', args: 'labels: ["intent", "urgency"]', code: 200, ms: 286 },
          { t: 680, k: 'think', text: l(
            'A duplicate charge. Medium urgency. She’s frustrated but polite.',
            'Un cobro duplicado. Urgencia media. Está molesta, pero es cordial.',
          ) },
          { t: 1320, k: 'call', fn: 'crm.lookup', args: 'email: "carla.reyes@email.example"', code: 200, ms: 204, tool: 'crm',
            say: l('Finds Carla’s record in the CRM', 'Encuentra la ficha de Carla en el CRM') },
        ],
      },
      {
        id: 'kb', kind: 'tool', uses: 'kb', dur: 2700,
        label: l('Checks the facts', 'Verifica los datos'),
        result: l('Duplicate charge confirmed', 'Cobro duplicado confirmado'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.search', args: l('q: "duplicate charge refund"', 'q: "reembolso cobro duplicado"'), code: 200, ms: 241, tool: 'kb',
            say: l('Looks up the refund policy in your knowledge base', 'Busca la política de reembolsos en tu base de conocimiento') },
          { t: 620, k: 'call', fn: 'billing.invoices', args: 'patient: "P-1187", days: 30', code: 200, ms: 377, tool: 'billing',
            say: l('Opens Carla’s invoices from the last 30 days', 'Abre las facturas de Carla de los últimos 30 días') },
          { t: 1380, k: 'info', tool: 'billing', text: l(
            'Two identical charges on Oct 14. Duplicates are refunded in 3 to 5 business days.',
            'Dos cargos idénticos el 14 de octubre. Los duplicados se reembolsan en 3 a 5 días hábiles.',
          ) },
        ],
      },
      {
        id: 'draft', kind: 'model', uses: 'email', dur: 2800,
        label: l('Drafts the answer', 'Redacta la respuesta'),
        result: l('Draft ready, with 2 sources', 'Borrador listo, con 2 fuentes'),
        logs: [
          { t: 80, k: 'call', fn: 'llm.generate', args: l('template: "support_reply", cite: true', 'template: "respuesta_soporte", cite: true'), code: 200, ms: 920, tool: 'email',
            say: l('Writes a reply that points to the invoice and the policy', 'Escribe una respuesta que cita la factura y la política') },
          { t: 1280, k: 'call', fn: 'policy.check', args: l('topic: "billing"', 'topic: "cobros"'), code: 200, ms: 118 },
          { t: 1720, k: 'think', text: l(
            'Replies about billing need a person’s OK. Sending it to the front desk lead.',
            'Las respuestas sobre cobros necesitan el visto bueno de una persona. Se la paso a la coordinadora de recepción.',
          ) },
        ],
      },
      {
        id: 'approve', kind: 'human', uses: 'person', dur: 1700,
        label: l('A person approves', 'Una persona aprueba'),
        result: l('Approved', 'Aprobado'),
        gate: {
          at: 700,
          title: l('Send the billing reply to Carla Reyes?', '¿Enviar la respuesta de cobro a Carla Reyes?'),
          policy: l('Replies about money always wait for a person’s OK before they are sent.', 'Las respuestas sobre dinero siempre esperan el visto bueno de una persona antes de enviarse.'),
          excerpt: l(
            'You’re right, your Oct 14 cleaning was charged twice [1]. We’ve flagged the duplicate for a refund…',
            'Tienes razón: la limpieza del 14 de octubre se cobró dos veces [1]. Ya marcamos el cargo duplicado para reembolso…',
          ),
          approver: l('front desk lead', 'la coordinadora de recepción'),
        },
        logs: [
          { t: 80, k: 'call', fn: 'approval.request', args: l('to: "front-desk-lead"', 'to: "coordinacion-recepcion"'), code: 202, ms: 140, tool: 'chat',
            say: l('Asks the front desk lead to review it', 'Le pide a la coordinadora de recepción que la revise') },
        ],
      },
      {
        id: 'send', kind: 'action', uses: 'tickets', dur: 1900,
        label: l('Sends the reply', 'Envía la respuesta'),
        result: l('Sent, ticket closed', 'Enviado, ticket cerrado'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.send', args: 'ticket: "T-5812"', code: 202, ms: 310, tool: 'email',
            say: l('Sends the approved reply to Carla', 'Envía a Carla la respuesta aprobada') },
          { t: 700, k: 'call', fn: 'billing.flag_refund', args: 'invoice: "INV-20931"', code: 200, ms: 260, tool: 'billing',
            say: l('Marks the duplicate charge for a refund', 'Marca el cargo duplicado para reembolso') },
          { t: 1260, k: 'call', fn: 'helpdesk.log', args: 'ticket: "T-5812", status: "solved"', code: 200, ms: 150, tool: 'tickets',
            say: l('Closes the ticket in the help desk', 'Cierra el ticket en la mesa de ayuda') },
        ],
      },
    ],
    outcome: {
      headline: l('Resolved in {t}', 'Resuelto en {t}'),
      baseline: l('Typical first reply: about 4 hours (estimate)', 'Primera respuesta típica: unas 4 horas (estimado)'),
      stats: [
        { value: '2', label: l('sources cited', 'fuentes citadas') },
        { value: '1', label: l('person approved', 'persona aprobó') },
        { value: '3', label: l('tools updated', 'herramientas actualizadas') },
      ],
      artifact: {
        label: l('Sent reply', 'Respuesta enviada'),
        meta: 'Carla Reyes',
        subject: l('Re: Charged twice?', 'Re: ¿Me cobraron dos veces?'),
        body: l(
          'Hi Carla,\n\nYou’re right, your Oct 14 cleaning was charged twice [1]. We’ve flagged the duplicate for a refund, which usually lands in 3 to 5 business days [2].\n\nNothing to do on your side. If you don’t see it by Oct 23, just reply here.\n\nLumen Dental, Front desk\n\n[1] Invoice INV-20931  [2] Billing policy, section 4.2',
          'Hola, Carla:\n\nTienes razón: la limpieza del 14 de octubre se cobró dos veces [1]. Ya marcamos el cargo duplicado para reembolso, que suele llegar en 3 a 5 días hábiles [2].\n\nNo tienes que hacer nada. Si no lo ves antes del 23 de octubre, responde a este correo.\n\nLumen Dental, Recepción\n\n[1] Factura INV-20931  [2] Política de cobros, sección 4.2',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 03 */
  {
    id: 'report',
    icon: 'chart',
    tab: l('Weekly report', 'Reporte semanal'),
    name: l('Operations assistant', 'Asistente de operaciones'),
    trigger: l('it’s Monday at 7:00', 'es lunes a las 7:00'),
    steps: [
      {
        id: 'cron', kind: 'trigger', uses: 'calendar', dur: 1300,
        label: l('Starts the report', 'Inicia el reporte'),
        result: l('Week 44, Monday 7:00', 'Semana 44, lunes 7:00'),
        logs: [
          { t: 0, k: 'event', text: 'schedule.fired {job: "weekly-ops", week: 44}', tool: 'calendar',
            say: l('Monday, 7:00: time for the week 44 report', 'Lunes, 7:00: toca el reporte de la semana 44') },
          { t: 560, k: 'think', text: l(
            'Weekly operations report for Atlas Logistics.',
            'Reporte semanal de operaciones de Atlas Logistics.',
          ) },
        ],
      },
      {
        id: 'pull', kind: 'tool', uses: 'sheet', dur: 3000,
        label: l('Gathers the numbers', 'Reúne los números'),
        chips: [
          { label: l('Spreadsheet', 'Planilla'), tool: 'sheet' },
          { label: l('CRM', 'CRM'), tool: 'crm' },
          { label: l('Ads', 'Anuncios'), tool: 'ads' },
        ],
        result: l('3 sources, 526 records', '3 fuentes, 526 registros'),
        logs: [
          { t: 80, k: 'call', fn: 'sheet.read', args: 'tab: "fleet", rows: 412', code: 200, ms: 420, chip: 0, tool: 'sheet',
            say: l('Reads this week’s shipments from the fleet spreadsheet', 'Lee los envíos de la semana en la planilla de flota') },
          { t: 420, k: 'call', fn: 'crm.report', args: 'pipeline: "freight", period: "w44"', code: 200, ms: 690, chip: 1, tool: 'crm',
            say: l('Pulls this week’s deals from the CRM', 'Trae las oportunidades de la semana desde el CRM') },
          { t: 900, k: 'call', fn: 'ads.insights', args: 'account: "atlas", period: "w44"', code: 200, ms: 810, chip: 2, tool: 'ads',
            say: l('Pulls the ad results', 'Trae los resultados de los anuncios') },
          { t: 2150, k: 'info', tool: 'reports', text: l('412 shipments, 96 deals and 18 campaigns combined.', '412 envíos, 96 oportunidades y 18 campañas combinadas.') },
        ],
      },
      {
        id: 'reconcile', kind: 'tool', uses: 'reports', dur: 2200,
        label: l('Checks the numbers', 'Cuadra los números'),
        result: l('12 numbers vs. 8 weeks', '12 cifras vs. 8 semanas'),
        logs: [
          { t: 80, k: 'call', fn: 'metrics.compute', args: 'kpis: 12, baseline: "8w"', code: 200, ms: 530, tool: 'reports',
            say: l('Compares 12 key numbers with the last 8 weeks', 'Compara 12 cifras clave con las últimas 8 semanas') },
          { t: 900, k: 'think', text: l(
            'Ads and CRM disagree by 7 leads. Going with the CRM number.',
            'Anuncios y CRM difieren en 7 contactos. Me quedo con la cifra del CRM.',
          ) },
        ],
      },
      {
        id: 'anomaly', kind: 'model', uses: 'ai', dur: 2500,
        label: l('Spots anything unusual', 'Detecta lo inusual'),
        result: l('2 things need attention', '2 temas requieren atención'),
        logs: [
          { t: 80, k: 'call', fn: 'anomaly.scan', args: 'method: "z-score", threshold: 2', code: 200, ms: 460 },
          { t: 760, k: 'warn', text: l('On-time delivery fell to 88%, 6 points lower, at the Denver hub', 'Las entregas a tiempo bajaron a 88%, 6 puntos menos, en el centro de Denver') },
          { t: 1240, k: 'warn', text: l('Cost per lead is up 38% on the freight-quote campaign', 'El costo por contacto subió 38% en la campaña freight-quote') },
          { t: 1800, k: 'think', text: l(
            'The Denver drop lines up with 2 trucks in maintenance since Tuesday.',
            'La caída en Denver coincide con 2 camiones en mantenimiento desde el martes.',
          ) },
        ],
      },
      {
        id: 'summary', kind: 'model', uses: 'docs', dur: 3000,
        label: l('Writes the summary', 'Escribe el resumen'),
        result: l('One page, 3 charts', 'Una página, 3 gráficos'),
        logs: [
          { t: 80, k: 'call', fn: 'llm.generate', args: l('template: "exec_summary", words: 180', 'template: "resumen_ejecutivo", words: 180'), code: 200, ms: 1100, tool: 'docs',
            say: l('Writes a short summary for the leadership team', 'Escribe un resumen breve para la dirección') },
          { t: 1500, k: 'call', fn: 'chart.render', args: 'kpis: ["otd", "cpl", "shipments"]', code: 200, ms: 380, tool: 'reports',
            say: l('Adds 3 charts', 'Agrega 3 gráficos') },
          { t: 2250, k: 'think', minor: true, text: l(
            'Lead with the two risks, then the wins. Plain language.',
            'Primero los dos riesgos, luego los logros. Lenguaje simple.',
          ) },
        ],
      },
      {
        id: 'deliver', kind: 'action', uses: 'email', dur: 1600,
        label: l('Sends it to the team', 'Lo envía al equipo'),
        chips: [
          { label: l('Email', 'Correo'), tool: 'email' },
          { label: l('Team chat', 'Chat'), tool: 'chat' },
        ],
        result: l('6 people, 2 channels', '6 personas, 2 canales'),
        logs: [
          { t: 80, k: 'call', fn: 'inbox.send', args: 'to: "leadership@atlaslogistics.example"', code: 202, ms: 280, chip: 0, tool: 'email',
            say: l('Emails the summary to the leadership team', 'Envía el resumen por correo a la dirección') },
          { t: 520, k: 'call', fn: 'chat.post', args: l('channel: "#ops-weekly"', 'channel: "#ops-semanal"'), code: 200, ms: 190, chip: 1, tool: 'chat',
            say: l('Posts it in the operations channel', 'Lo publica en el canal de operaciones') },
        ],
      },
    ],
    outcome: {
      headline: l('Delivered in {t}', 'Entregado en {t}'),
      baseline: l('By hand: about 3 hours (estimate)', 'A mano: unas 3 horas (estimado)'),
      stats: [
        { value: '3', label: l('sources combined', 'fuentes combinadas') },
        { value: '2', label: l('issues flagged', 'alertas') },
        { value: '2', label: l('channels', 'canales') },
      ],
      artifact: {
        label: l('Weekly summary', 'Resumen semanal'),
        meta: l('Atlas Logistics, week 44', 'Atlas Logistics, semana 44'),
        body: l(
          'Watch\n• On-time delivery fell to 88% (down 6 points), driven by Denver: 2 trucks in maintenance since Tuesday.\n• Cost per lead is up 38% on freight-quote. Suggest pausing its two weakest ad sets.\n\nWins\n• Shipments up 2% week over week.\n• 3 new contracts signed; 41 qualified deals in the pipeline.',
          'Atención\n• Las entregas a tiempo bajaron a 88% (6 puntos menos) por Denver: 2 camiones en mantenimiento desde el martes.\n• El costo por contacto subió 38% en freight-quote. Sugiero pausar sus dos grupos de anuncios más débiles.\n\nLogros\n• Envíos +2% frente a la semana anterior.\n• 3 contratos nuevos firmados; 41 oportunidades calificadas.',
        ),
      },
    },
  },

  /* ---------------------------------------------------------------- 04 */
  {
    id: 'content',
    icon: 'repeat',
    tab: l('Webinar to posts', 'Webinar a publicaciones'),
    name: l('Content assistant', 'Asistente de contenido'),
    trigger: l('a new recording lands in your shared folder', 'llega una grabación nueva a tu carpeta compartida'),
    steps: [
      {
        id: 'file', kind: 'trigger', uses: 'video', dur: 1400,
        label: l('Picks up the recording', 'Toma la grabación'),
        result: l('46-minute webinar', 'Webinar de 46 minutos'),
        logs: [
          { t: 0, k: 'event', tool: 'files', text: l(
            'file.added {name: "webinar-first-time-buyers.mp4", length: "46:12"}',
            'file.added {name: "webinar-primera-vivienda.mp4", length: "46:12"}',
          ), say: l('New webinar in the shared folder: “First-time buyers”, 46 minutes', 'Webinar nuevo en la carpeta compartida: “Tu primera vivienda”, 46 minutos') },
          { t: 600, k: 'think', text: l(
            'A new Halcyon Realty webinar. Time to turn it into posts.',
            'Un webinar nuevo de Halcyon Realty. Hora de convertirlo en publicaciones.',
          ) },
        ],
      },
      {
        id: 'transcribe', kind: 'model', uses: 'ai', dur: 3000,
        label: l('Transcribes it', 'Lo transcribe'),
        result: l('6,812 words, 2 speakers', '6812 palabras, 2 voces'),
        logs: [
          { t: 80, k: 'call', fn: 'audio.transcribe', args: l('lang: "en", speakers: 2', 'lang: "es", speakers: 2'), code: 200, ms: 1620, tool: 'ai',
            say: l('Turns the recording into text', 'Convierte la grabación en texto') },
          { t: 1950, k: 'info', tool: 'ai', text: l('Finds 14 topics and 3 audience questions.', 'Encuentra 14 temas y 3 preguntas del público.') },
        ],
      },
      {
        id: 'ideas', kind: 'model', uses: 'ai', dur: 2300,
        label: l('Picks the key ideas', 'Elige las ideas clave'),
        result: l('5 ideas, 4 quotes', '5 ideas, 4 citas'),
        logs: [
          { t: 80, k: 'call', fn: 'ideas.extract', args: 'max: 5, quotes: true', code: 200, ms: 640 },
          { t: 960, k: 'think', text: l(
            'Best moment: the 3-question checklist at minute 18. Everything builds on it.',
            'El mejor momento: la lista de 3 preguntas del minuto 18. Todo se construye sobre eso.',
          ) },
        ],
      },
      {
        id: 'write', kind: 'model', uses: 'docs', dur: 3800,
        label: l('Writes the posts', 'Escribe las piezas'),
        chips: [
          { label: l('Blog', 'Blog'), tool: 'web' },
          { label: l('5 posts', '5 posts'), tool: 'social' },
          { label: l('Newsletter', 'Boletín'), tool: 'email' },
        ],
        result: l('7 pieces drafted', '7 piezas redactadas'),
        logs: [
          { t: 80, k: 'call', fn: 'kb.get', args: l('doc: "brand-voice-guide"', 'doc: "guia-de-voz"'), code: 200, ms: 150, minor: true, tool: 'kb',
            say: l('Reads your brand voice guide', 'Lee tu guía de tono de marca') },
          { t: 480, k: 'call', fn: 'llm.generate', args: 'asset: "blog", words: 1200', code: 200, ms: 1180, chip: 0, tool: 'web',
            say: l('Writes a blog article', 'Escribe un artículo para el blog') },
          { t: 1400, k: 'call', fn: 'llm.generate', args: 'asset: "social", count: 5', code: 200, ms: 880, chip: 1, tool: 'social',
            say: l('Writes 5 social media posts', 'Escribe 5 publicaciones para redes') },
          { t: 2300, k: 'call', fn: 'llm.generate', args: 'asset: "newsletter"', code: 200, ms: 820, chip: 2, tool: 'email',
            say: l('Writes the newsletter', 'Escribe el boletín') },
        ],
      },
      {
        id: 'voice', kind: 'model', uses: 'ai', dur: 2100,
        label: l('Checks the brand voice', 'Revisa el tono de marca'),
        result: l('On brand, 2 small edits', 'Tono correcto, 2 ajustes'),
        logs: [
          { t: 80, k: 'call', fn: 'voice.check', args: 'assets: 7', code: 200, ms: 480 },
          { t: 780, k: 'think', text: l(
            'Two posts sound too salesy. Rewriting their first lines.',
            'Dos publicaciones suenan demasiado comerciales. Reescribo sus primeras líneas.',
          ) },
          { t: 1380, k: 'call', fn: 'llm.rewrite', args: 'assets: ["post_2", "post_4"]', code: 200, ms: 420 },
        ],
      },
      {
        id: 'schedule', kind: 'action', uses: 'calendar', dur: 1700,
        label: l('Schedules everything', 'Programa todo'),
        result: l('Monday to Friday, 9:00', 'Lunes a viernes, 9:00'),
        logs: [
          { t: 80, k: 'call', fn: 'cms.create_draft', args: 'type: "blog"', code: 201, ms: 260, tool: 'web',
            say: l('Saves the article as a draft on your website', 'Guarda el artículo como borrador en tu sitio web') },
          { t: 520, k: 'call', fn: 'social.schedule', args: l('posts: 5, from: "Mon 09:00"', 'posts: 5, from: "lun 09:00"'), code: 200, ms: 330, tool: 'social',
            say: l('Schedules the 5 posts, Monday to Friday at 9:00', 'Programa las 5 publicaciones, de lunes a viernes a las 9:00') },
          { t: 1040, k: 'call', fn: 'email.schedule', args: l('list: "buyers", at: "Thu 08:00"', 'list: "compradores", at: "jue 08:00"'), code: 200, ms: 210, tool: 'email',
            say: l('Schedules the newsletter for Thursday at 8:00', 'Programa el boletín para el jueves a las 8:00') },
        ],
      },
    ],
    outcome: {
      headline: l('Done in {t}', 'Listo en {t}'),
      baseline: l('By hand: about 2 days (estimate)', 'A mano: unos 2 días (estimado)'),
      stats: [
        { value: '7', label: l('pieces drafted', 'piezas redactadas') },
        { value: '2', label: l('edits for tone', 'ajustes de tono') },
        { value: '5', label: l('posts scheduled', 'posts programados') },
      ],
      artifact: {
        label: l('Social post 1 of 5', 'Post 1 de 5'),
        meta: l('Halcyon Realty, Monday 9:00', 'Halcyon Realty, lunes 9:00'),
        body: l(
          'Before you tour a single home, answer three questions:\n\n1. What monthly payment still lets you sleep at night?\n2. Which neighborhood trade-off can you live with?\n3. How long will you really stay?\n\nThe full checklist from our webinar is on the blog.',
          'Antes de visitar una sola casa, responde tres preguntas:\n\n1. ¿Qué cuota mensual te deja dormir en paz?\n2. ¿Qué cedes en ubicación y qué no negocias?\n3. ¿Cuánto tiempo vas a vivir ahí, en serio?\n\nLa lista completa del webinar está en nuestro blog.',
        ),
      },
    },
  },
];

export const pickS = (v: S, lang: 'en' | 'es'): string => (typeof v === 'string' ? v : v[lang]);

/** Every tool a scenario touches, in order of first use (for the "Works with" strip). */
export function toolsOf(sc: ScenarioDef): ToolKey[] {
  const out: ToolKey[] = [];
  const add = (k?: StepTool) => { if (k && k !== 'person' && !out.includes(k)) out.push(k); };
  for (const s of sc.steps) {
    add(s.uses);
    s.chips?.forEach((c) => add(c.tool));
    s.logs.forEach((d) => add(d.tool));
  }
  return out;
}
