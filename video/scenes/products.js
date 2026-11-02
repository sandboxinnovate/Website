// Products explainer. Storyboard: video/storyboards/products.json
// Story: a custom build is too much and generic tools do not know the industry; then a catalog of five
// industry packages in early access, opened into the real-estate package (agents + tools), a settings form,
// an illustrative Saturday-night portal inquiry that ends as a held Monday showing, an ops panel of running
// agents, and what always stays with the team. Claims and timelines come from src/i18n/units/products.ts and
// src/components/unit/ProductsSelector/copy.ts. Areas, hours, times, the listing and log rows are example
// UI states, not claims.

export const meta = {
  title: { en: 'How Sandbox industry products work', es: 'Cómo funcionan los productos por industria de Sandbox' },
};

export const copy = {
  en: {
    unit: 'Products',
    planWin: 'project-plan.doc', planKicker: 'Draft', planTitle: 'AI project plan v1',
    planSections: ['Discovery', 'Architecture', 'Integrations', 'Build', 'Testing', 'Rollout'],
    asstWin: 'Assistant', askPh: 'Ask anything',
    asstUser: 'Can you book showings for my listings?',
    asstReply: 'Sure. Can you explain what a showing is and how your team works?',
    hook1: 'A custom AI build is more than you need now.',
    hook2: 'Generic tools don’t know your industry.',
    heroTitle: 'Start from a brain<br><em>built for your industry.</em>',
    heroSub: 'Ready-made agents, set up on your data.',
    catWin: 'products / industries', catFoot: ['5 industries open', 'contents may change'],
    status: 'Early access',
    industries: [['RE', 'Real estate'], ['CL', 'Clinics'], ['PS', 'Professional services'], ['EC', 'E-commerce'], ['HO', 'Hospitality']],
    s1: 'Pick your industry’s package', s1t: '1 call', s1b: 'Agents already designed for your sector.',
    pkgWin: 'Package contents', agentsLabel: 'Agents included', connectsLabel: 'Connects to', pilotLabel: 'Pilot', pilot: '2-3 weeks',
    agents: [
      ['Inquiry responder', 'Answers portal and website inquiries in minutes, day or night.'],
      ['Lead qualifier', 'Asks about area, timing and property type, then scores and routes the lead.'],
      ['Showing scheduler', 'Books showings in the right agent’s calendar and sends reminders.'],
      ['Listing writer', 'Drafts listing descriptions from the property details you provide.'],
      ['Follow-up agent', 'Keeps cold leads warm with relevant new listings.'],
    ],
    connects: ['CRM', 'Calendar', 'Inbox', 'Listing portals', 'Messaging'],
    s2: 'Adapt it to your business', s2t: 'A few days', s2b: 'Your services, tone, hours and escalation rules.',
    setWin: 'real-estate / settings', setBadge: 'Draft',
    settings: [
      ['Services', 'Sales, Rentals'],
      ['Areas', 'North, Center, Coast'],
      ['Tone', 'Warm, short, no jargon'],
      ['Hours', 'Replies 24/7, showings Mon to Sat'],
      ['Escalation', 'Pricing questions go to the listing agent'],
    ],
    toPerson: 'To a person',
    s3: 'Pilot it on real cases', s3t: '2-4 weeks', s3b: 'Your team watches every step.',
    threadWin: 'Portal inquiry · Sat 23:40', illustrative: 'Illustrative scenario',
    thread: [
      ['user', 'Hi, is the 3-bedroom near the school still available?'],
      ['agent', 'Yes, it is. I’m the brokerage’s assistant. Which area works for you, and when do you plan to move?'],
      ['user', 'This area. Within 3 months.'],
      ['agent', 'Monday 9:30 or Tuesday 18:00 for a showing?'],
      ['user', 'Monday works.'],
    ],
    onThread: 'Agents on this thread',
    calWin: 'Listing agent · 3 days', days: ['Mon', 'Tue', 'Wed'],
    held: 'Showing · held', option: 'Option',
    crm: 'CRM', crmText: 'Lead qualified · area, timing',
    review: 'Team review', reviewText: 'Every pilot conversation visible to your team',
    s4: 'We host and run it', s4t: 'Subscription', s4b: 'Monitoring, updates and support included.',
    opsWin: 'real-estate / agents', agentCol: 'Agent', statusCol: 'Status', pilotSt: 'Pilot', running: 'Running',
    recent: 'Recent',
    logs: [['10:12', 'Pricing question → handed to listing agent'], ['08:00', 'Monitoring check · OK'], ['06:30', 'Product update installed']],
    staysLabel: 'Always stays with your team',
    stays: ['Pricing advice and negotiation', 'The showings themselves', 'Final say on every listing'],
    growLabel: 'When you outgrow the package',
    grow: [['Package', 'Ready-made agents'], ['Your setup', 'Your data and rules'], ['Custom brain', 'Built around your processes']],
    end1: 'People keep the calls that matter.',
    end2: 'Outgrow it? It extends without starting over.',
    ctaRow: 'Real estate · Clinics · Professional services · E-commerce · Hospitality',
    cta: 'Join <em>early access.</em>',
    ctaSub: 'Tell us your industry and volume.',
    ctaBtn: 'Request early access',
  },
  es: {
    unit: 'Products',
    planWin: 'plan-de-proyecto.doc', planKicker: 'Borrador', planTitle: 'Plan de proyecto de IA v1',
    planSections: ['Descubrimiento', 'Arquitectura', 'Integraciones', 'Desarrollo', 'Pruebas', 'Despliegue'],
    asstWin: 'Asistente', askPh: 'Pregunta lo que quieras',
    asstUser: '¿Puedes agendar visitas para mis propiedades?',
    asstReply: 'Claro. ¿Me explicas qué es una visita y cómo trabaja tu equipo?',
    hook1: 'Un desarrollo a medida es más de lo que necesitas hoy.',
    hook2: 'Y las herramientas genéricas no conocen tu industria.',
    heroTitle: 'Empieza con un brain<br><em>hecho para tu industria.</em>',
    heroSub: 'Agentes listos, configurados con tus datos.',
    catWin: 'productos / industrias', catFoot: ['5 industrias abiertas', 'el contenido puede cambiar'],
    status: 'Acceso anticipado',
    industries: [['IN', 'Inmobiliarias'], ['CL', 'Clínicas'], ['SP', 'Servicios profesionales'], ['EC', 'E-commerce'], ['HO', 'Hotelería']],
    s1: 'Elige el paquete de tu industria', s1t: '1 llamada', s1b: 'Agentes ya diseñados para tu sector.',
    pkgWin: 'Contenido del paquete', agentsLabel: 'Agentes incluidos', connectsLabel: 'Se conecta a', pilotLabel: 'Piloto', pilot: '2-3 semanas',
    agents: [
      ['Respuesta a consultas', 'Responde consultas de portales y del sitio web en minutos, a cualquier hora.'],
      ['Calificador de leads', 'Pregunta por zona, plazo y tipo de propiedad, y luego califica y deriva el lead.'],
      ['Agenda de visitas', 'Agenda visitas en el calendario del asesor que corresponde y envía recordatorios.'],
      ['Redactor de fichas', 'Redacta descripciones de propiedades a partir de los datos que le das.'],
      ['Seguimiento', 'Mantiene activos a los leads fríos con propiedades nuevas que les interesan.'],
    ],
    connects: ['CRM', 'Calendario', 'Correo', 'Portales inmobiliarios', 'Mensajería'],
    s2: 'Lo adaptamos a tu negocio', s2t: 'Unos días', s2b: 'Tus servicios, tono, horarios y derivaciones.',
    setWin: 'inmobiliaria / configuración', setBadge: 'Borrador',
    settings: [
      ['Servicios', 'Venta, Alquiler'],
      ['Zonas', 'Norte, Centro, Costa'],
      ['Tono', 'Cercano, breve, sin tecnicismos'],
      ['Horarios', 'Responde 24/7, visitas de lunes a sábado'],
      ['Derivación', 'Preguntas de precio van al asesor'],
    ],
    toPerson: 'Pasa a una persona',
    s3: 'Un piloto con casos reales', s3t: '2-4 semanas', s3b: 'Tu equipo ve cada paso.',
    threadWin: 'Consulta de portal · sáb 23:40', illustrative: 'Escenario ilustrativo',
    thread: [
      ['user', 'Hola, ¿sigue disponible la casa de 3 dormitorios cerca del colegio?'],
      ['agent', 'Sí, sigue disponible. Soy el asistente de la inmobiliaria. ¿Qué zona te sirve y cuándo piensas mudarte?'],
      ['user', 'Esta zona. En unos 3 meses.'],
      ['agent', '¿Te sirve una visita el lunes 9:30 o el martes 18:00?'],
      ['user', 'El lunes me sirve.'],
    ],
    onThread: 'Agentes en el hilo',
    calWin: 'Asesor · 3 días', days: ['Lun', 'Mar', 'Mié'],
    held: 'Visita · reservada', option: 'Opción',
    crm: 'CRM', crmText: 'Lead calificado · zona, plazo',
    review: 'Revisión del equipo', reviewText: 'Tu equipo ve cada conversación del piloto',
    s4: 'Nosotros lo alojamos y operamos', s4t: 'Suscripción', s4b: 'Monitoreo, actualizaciones y soporte incluidos.',
    opsWin: 'inmobiliaria / agentes', agentCol: 'Agente', statusCol: 'Estado', pilotSt: 'Piloto', running: 'Activo',
    recent: 'Reciente',
    logs: [['10:12', 'Pregunta de precio → derivada al asesor'], ['08:00', 'Revisión de monitoreo · OK'], ['06:30', 'Actualización del producto instalada']],
    staysLabel: 'Siempre queda en manos de tu equipo',
    stays: ['Asesoría de precio y negociación', 'Las visitas en sí', 'La última palabra en cada ficha'],
    growLabel: 'Cuando el paquete te queda chico',
    grow: [['Paquete', 'Agentes listos'], ['Tu configuración', 'Tus datos y reglas'], ['Brain a medida', 'Hecho en torno a tus procesos']],
    end1: 'Las decisiones importantes siguen siendo tuyas.',
    end2: '¿Te queda chico? Crece sin empezar de cero.',
    ctaRow: 'Inmobiliarias · Clínicas · Servicios profesionales · E-commerce · Hotelería',
    cta: 'Súmate al <em>acceso anticipado.</em>',
    ctaSub: 'Cuéntanos tu industria y tu volumen.',
    ctaBtn: 'Solicitar acceso anticipado',
  },
};

export const transcript = {
  en: [
    'A long AI project plan: discovery, architecture, integrations, build, testing, rollout. Next to it, a generic assistant is asked to book showings for a set of listings, and replies by asking what a showing is and how the team works. A custom AI build is more than you need now. Generic tools don’t know your industry.',
    'Start from a brain built for your industry: ready-made agents, set up on your data. Five industries are open, all in early access: real estate, clinics, professional services, e-commerce and hospitality.',
    '01. Pick your industry’s package. One call. The real estate package includes an inquiry responder, a lead qualifier, a showing scheduler, a listing writer and a follow-up agent. It connects to your CRM, calendar, inbox, listing portals and messaging, with a pilot in 2 to 3 weeks. Agents already designed for your sector.',
    '02. Adapt it to your business, in a few days: services, areas, tone, hours and escalation rules. For example, pricing questions go to the listing agent.',
    '03. Pilot it on real cases, 2 to 4 weeks. An illustrative scenario: a portal inquiry arrives on Saturday at 23:40. The assistant answers, asks two qualifying questions about area and timing, offers two showing times, and holds a Monday 9:30 showing in the listing agent’s calendar. The lead is marked qualified in the CRM. Your team watches every step.',
    '04. We host and run it, by subscription. Monitoring, updates and support included. Every agent is running, pricing questions are handed to the listing agent, and product updates are installed for you.',
    'Always stays with your team: pricing advice and negotiation, the showings themselves, and the final say on every listing. People keep the calls that matter. When you outgrow the package, it extends into a custom brain, without starting over.',
    'Join early access. Tell us your industry and volume. Request early access at sandboxinnovate.com.',
  ].join('\n\n'),
  es: [
    'Un plan de proyecto de IA muy largo: descubrimiento, arquitectura, integraciones, desarrollo, pruebas, despliegue. Al lado, a un asistente genérico se le pide agendar visitas para unas propiedades y responde preguntando qué es una visita y cómo trabaja el equipo. Un desarrollo a medida es más de lo que necesitas hoy. Y las herramientas genéricas no conocen tu industria.',
    'Empieza con un brain hecho para tu industria: agentes listos, configurados con tus datos. Hay cinco industrias abiertas, todas en acceso anticipado: inmobiliarias, clínicas, servicios profesionales, e-commerce y hotelería.',
    '01. Elige el paquete de tu industria. Una llamada. El paquete para inmobiliarias incluye respuesta a consultas, un calificador de leads, agenda de visitas, un redactor de fichas y seguimiento. Se conecta a tu CRM, calendario, correo, portales inmobiliarios y mensajería, con un piloto en 2 a 3 semanas. Agentes ya diseñados para tu sector.',
    '02. Lo adaptamos a tu negocio en unos días: servicios, zonas, tono, horarios y reglas de derivación. Por ejemplo, las preguntas de precio van al asesor.',
    '03. Un piloto con casos reales, de 2 a 4 semanas. Un escenario ilustrativo: llega una consulta de portal el sábado a las 23:40. El asistente responde, hace dos preguntas de calificación sobre zona y plazo, ofrece dos horarios y reserva una visita el lunes a las 9:30 en el calendario del asesor. El lead queda calificado en el CRM. Tu equipo ve cada paso.',
    '04. Nosotros lo alojamos y operamos, por suscripción. Monitoreo, actualizaciones y soporte incluidos. Todos los agentes están activos, las preguntas de precio se derivan al asesor y las actualizaciones del producto se instalan por ti.',
    'Siempre queda en manos de tu equipo: la asesoría de precio y negociación, las visitas en sí y la última palabra en cada ficha. Las decisiones importantes siguen siendo tuyas. Cuando el paquete te queda chico, se amplía a un brain a medida sin empezar de cero.',
    'Súmate al acceso anticipado. Cuéntanos tu industria y tu volumen. Solicita acceso anticipado en sandboxinnovate.com.',
  ].join('\n\n'),
};

/* Unit-specific styles (pr- prefix). */
const CSS = `
.stage .chip { font-size: 15px; }
.stage .win__badge { font-size: 15px; }
.pr-col { position: absolute; display: flex; flex-direction: column; }
.pr-mist { color: var(--mist) !important; }
.pr-badge-muted { color: var(--smoke) !important; }
.pr-badge-flame { color: var(--flame-400) !important; }
.pr-kicker { font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); display: flex; align-items: center; gap: 14px; }
.pr-kicker::before { content: ''; width: 28px; height: 1px; background: var(--flame-500); }

/* hook: long plan + generic assistant */
.pr-plan { position: absolute; left: 0; right: 0; top: 0; padding: 34px 40px; color: #1a1616; }
.pr-plan__k { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: #8a7f78; }
.pr-plan__t { font-family: var(--display); font-weight: 500; font-size: 34px; letter-spacing: -0.035em; color: #141010; margin: 10px 0 8px; }
.pr-plan__h { display: flex; align-items: baseline; gap: 14px; margin-top: 26px; font-size: 22px; font-weight: 600; color: #2a2422; }
.pr-plan__h span { font-family: var(--mono); font-size: 15px; font-weight: 500; color: #a0958e; }
.pr-plan__bar { height: 11px; border-radius: 6px; background: #ddd5cd; margin-top: 13px; }
.pr-plan__fade { position: absolute; left: 0; right: 0; bottom: 0; height: 110px; background: linear-gradient(rgb(244 239 233 / 0), #f4efe9 85%); }
.pr-generic .msg--agent .msg__av { background: var(--ink-600); border-color: var(--line); color: var(--mist); }
.pr-generic .msg__bubble { font-size: 25px; }

.pr-ask { position: absolute; left: 28px; right: 28px; bottom: 26px; height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px 0 22px; border-radius: 16px; border: 1px solid var(--line-strong); background: var(--ink-850); font-size: 22px; color: var(--smoke); }
.pr-ask__go { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: var(--ink-600); color: var(--mist); }
.pr-onthread { position: absolute; left: 28px; right: 28px; bottom: 22px; display: flex; align-items: center; gap: 10px; padding-top: 18px; border-top: 1px solid var(--line); }
.pr-onthread .chip { white-space: nowrap; }
.pr-onthread__k { font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); margin-right: 6px; white-space: nowrap; }

/* catalog */
.pr-cat__row { display: grid; grid-template-columns: 62px 1fr auto; align-items: center; gap: 20px; height: 82px; border-bottom: 1px solid var(--line); padding: 0 6px; }
.pr-code { display: grid; place-items: center; width: 56px; height: 38px; border-radius: 9px; border: 1px solid var(--line-strong); background: rgb(255 255 255 / .03); font-family: var(--mono); font-size: 16px; font-weight: 600; letter-spacing: .06em; color: var(--bone); }
.pr-cat__n { font-size: 27px; font-weight: 500; color: var(--bone); white-space: nowrap; }
.pr-cat__foot { display: flex; justify-content: space-between; padding: 18px 6px 0; font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.pr-early { color: var(--flame-300); border-color: rgb(245 131 39 / .35); background: rgb(245 131 39 / .07); }
.pr-early::before { content: ''; width: 7px; height: 7px; border-radius: 7px; background: currentColor; }

/* step header */
.pr-head { position: absolute; left: 120px; top: 150px; right: 120px; display: grid; grid-template-columns: 74px auto 1fr; column-gap: 8px; row-gap: 10px; align-items: baseline; }
.pr-head__n { font-family: var(--mono); font-size: 22px; font-weight: 500; letter-spacing: .1em; color: var(--flame-400); }
.pr-head .hl { white-space: nowrap; }
.pr-head__time { justify-self: start; align-self: center; margin-left: 22px; display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--line-strong); font-family: var(--mono); font-size: 17px; letter-spacing: .06em; color: var(--mist); }
.pr-head__time svg { color: var(--flame-400); }
.pr-head__sub { grid-column: 2 / 4; font-size: 30px; line-height: 1.3; color: var(--mist); font-weight: 400; }

/* package contents */
.pr-tabs { display: flex; gap: 12px; padding-bottom: 26px; border-bottom: 1px solid var(--line); }
.pr-tab { display: inline-flex; align-items: center; gap: 12px; height: 52px; padding: 0 20px 0 12px; border-radius: 999px; border: 1px solid var(--line-strong); background: rgb(255 255 255 / .02); font-size: 21px; font-weight: 500; color: var(--mist); white-space: nowrap; }
.pr-tab b { font-family: var(--mono); font-size: 15px; font-weight: 600; padding: 4px 7px; border-radius: 6px; background: rgb(255 255 255 / .06); color: var(--smoke); }
.pr-pkg { display: grid; grid-template-columns: 1fr 360px; column-gap: 48px; padding-top: 24px; }
.pr-pkg__label { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); margin-bottom: 8px; }
.pr-agent { display: grid; grid-template-columns: 34px 1fr; column-gap: 14px; padding: 11px 0; border-bottom: 1px solid var(--line); }
.pr-agent:last-child { border-bottom: 0; }
.pr-agent__ic { width: 34px; height: 34px; border-radius: 9px; display: grid; place-items: center; background: rgb(245 131 39 / .1); border: 1px solid rgb(245 131 39 / .3); color: var(--flame-400); margin-top: 2px; }
.pr-agent__n { font-size: 23px; font-weight: 500; color: var(--bone); line-height: 1.25; }
.pr-agent__d { font-size: 18px; color: var(--smoke); line-height: 1.35; margin-top: 2px; }
.pr-conn { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px; }
.pr-conn .chip { font-size: 17px; padding: 9px 14px; color: var(--bone); }
.pr-pilot { display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 14px; border: 1px solid rgb(245 131 39 / .35); background: rgb(245 131 39 / .06); }
.pr-pilot__k { font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: var(--flame-300); }
.pr-pilot__v { font-size: 25px; font-weight: 500; color: var(--bone); }

/* settings form */
.pr-set__row { position: relative; display: grid; grid-template-columns: 230px 1fr auto; align-items: center; column-gap: 24px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
.pr-set__row:last-child { border-bottom: 0; }
.pr-set__hi { position: absolute; inset: 0; border-left: 3px solid var(--flame-500); background: rgb(245 131 39 / .07); border-radius: 4px; }
.pr-set__k { position: relative; font-family: var(--mono); font-size: 16px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); }
.pr-set__v { position: relative; min-height: 60px; display: flex; align-items: center; padding: 0 20px; border-radius: 12px; background: var(--ink-850); border: 1px solid var(--line); font-size: 26px; color: var(--bone); white-space: nowrap; }
.pr-set__tag { position: relative; display: inline-flex; align-items: center; gap: 10px; }
.pr-set__tag .chip { font-size: 15px; }

/* pilot: thread + calendar */
.pr-thread .chat { gap: 16px; }
.pr-thread .msg { max-width: 86%; gap: 14px; }
.pr-thread .msg__av { width: 40px; height: 40px; font-size: 15px; margin-top: 2px; }
.pr-thread .msg__bubble { font-size: 23px; line-height: 1.38; padding: 13px 20px; border-radius: 18px; }
.pr-thread .typing { padding: 17px 20px; }
.pr-cal { position: relative; }
.pr-cal__head { display: grid; grid-template-columns: 62px repeat(3, 1fr); height: 34px; align-items: center; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); }
.pr-cal__grid { position: relative; height: 380px; }
.pr-cal__hr { position: absolute; left: 62px; right: 0; height: 1px; background: var(--line); }
.pr-cal__t { position: absolute; left: 0; width: 52px; font-family: var(--mono); font-size: 15px; color: var(--smoke); transform: translateY(-50%); }
.pr-cal__vl { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--line); }
.pr-busy { position: absolute; border-radius: 8px; background: rgb(255 255 255 / .05); border: 1px solid rgb(255 255 255 / .06); }
.pr-slot { position: absolute; border-radius: 8px; border: 2px dashed rgb(245 131 39 / .8); display: flex; align-items: center; padding: 0 10px; font-family: var(--mono); font-size: 15px; color: var(--flame-300); }
.pr-held { position: absolute; border-radius: 8px; background: var(--grad-cta); display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 16px; font-weight: 700; color: #1a0d03; white-space: nowrap; }
.pr-strip { display: flex; align-items: center; gap: 14px; padding: 0 20px; height: 58px; border-radius: 14px; border: 1px solid var(--line); background: var(--ink-850); }
.pr-strip__k { font-family: var(--mono); font-size: 15px; letter-spacing: .1em; text-transform: uppercase; color: var(--smoke); white-space: nowrap; }
.pr-strip__t { font-size: 21px; color: var(--bone); white-space: nowrap; }
.pr-strip svg { color: var(--flame-400); flex: none; }
.pr-strip--ok svg { color: var(--ok); }

/* ops panel */
.pr-ops { display: grid; grid-template-columns: 1fr 1fr; column-gap: 44px; }
.pr-ops__th { display: flex; justify-content: space-between; height: 40px; align-items: center; border-bottom: 1px solid var(--line-strong); font-family: var(--mono); font-size: 15px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); padding: 0 6px; }
.pr-ops__row { display: flex; justify-content: space-between; align-items: center; height: 74px; border-bottom: 1px solid var(--line); padding: 0 6px; }
.pr-ops__n { font-size: 24px; font-weight: 500; color: var(--bone); white-space: nowrap; }
.pr-stat { position: relative; display: grid; justify-items: end; }
.pr-stat > * { grid-area: 1 / 1; }
.pr-stat .chip::before { content: ''; width: 7px; height: 7px; border-radius: 7px; background: currentColor; }
.pr-log { position: relative; display: grid; grid-template-columns: 70px 1fr; align-items: center; column-gap: 14px; min-height: 74px; border-bottom: 1px solid var(--line); padding: 0 12px; }
.pr-log__hi { position: absolute; inset: 0; border-left: 3px solid var(--flame-500); background: rgb(245 131 39 / .07); border-radius: 4px; }
.pr-log__t { position: relative; font-family: var(--mono); font-size: 15px; color: var(--smoke); }
.pr-log__x { position: relative; font-size: 22px; color: var(--bone); line-height: 1.3; }

/* stays + grows */
.pr-card { position: absolute; padding: 36px 40px 40px; }
.pr-stay { display: grid; grid-template-columns: 44px 1fr; align-items: center; column-gap: 18px; height: 78px; border-bottom: 1px solid var(--line); }
.pr-stay:last-child { border-bottom: 0; }
.pr-stay__ic { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--ink-600); color: var(--bone); }
.pr-stay__t { font-size: 27px; font-weight: 500; color: var(--bone); }
.pr-grow .step { gap: 12px; padding-top: 32px; }
.pr-grow .step__label { font-size: 30px; }
.pr-grow--es .step__label { font-size: 27px; }
.pr-grow .step__sub { font-size: 19px; line-height: 1.35; }
.pr-grow .step:last-child .step__fill { background: var(--grad-flame); }

/* CTA */
.pr-ctarow { font-family: var(--mono); font-size: 17px; letter-spacing: .12em; text-transform: uppercase; color: var(--smoke); }
.pr-ctasub { font-size: 32px; color: var(--mist); margin-top: -18px; }
`;

export function build({ lang, stage, gsap, lib }) {
  const c = copy[lang];
  const es = lang === 'es';
  const { h, place } = lib;
  const tl = gsap.timeline({ paused: true });
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);

  const { glow } = lib.setup(stage, { glow: { x: 1500, y: 860, size: 1000 } });
  const hud = lib.hud(stage, { ix: '05', unit: c.unit });
  hud.in(tl, 0.2);

  // unit helper: step header ("01" + headline + time chip, sub line below)
  const stepHead = (n, title, time, sub) => {
    const el = h('div', 'pr-head');
    const num = h('div', 'pr-head__n', n);
    const hl = lib.headline(title, { size: 'sm' });
    const tm = h('div', 'pr-head__time');
    tm.append(lib.icon('clock', { size: 18 }), document.createTextNode(time));
    const s = h('div', 'pr-head__sub', sub);
    el.append(num, hl.el, tm, s);
    return {
      el,
      in(at, subAt) {
        lib.fadeUp(tl, num, at, { y: 10, dur: 0.6 });
        hl.in(tl, at + 0.05);
        lib.fadeUp(tl, tm, at + 0.6, { y: 8, dur: 0.6 });
        lib.fadeUp(tl, s, subAt, { y: 14, dur: 0.8 });
      },
    };
  };
  const earlyChip = () => h('span', 'chip pr-early', c.status);
  const AGENT_ICONS = ['inbox', 'target', 'calendar', 'pen', 'mail'];

  /* ============ 0 to 8: hook, a long plan and a generic assistant ============ */
  const L1 = lib.layer(stage, { visible: true });
  const pw = lib.win({ title: c.planWin, paper: true, x: 120, y: 190, w: 820, h: 540, bodyPad: 0 });
  pw.body.style.height = '482px';
  pw.body.style.overflow = 'hidden';
  const plan = h('div', 'pr-plan');
  plan.append(h('div', 'pr-plan__k', c.planKicker), h('div', 'pr-plan__t', c.planTitle));
  const BARS = [[1, 0.92, 0.64], [0.96, 1, 0.82, 0.4], [1, 0.88, 0.72], [0.94, 1, 0.9, 0.58], [1, 0.76], [0.9, 1, 0.66]];
  const planParts = [];
  c.planSections.forEach((s, i) => {
    const hd = h('div', 'pr-plan__h');
    hd.append(h('span', null, String(i + 1).padStart(2, '0')), document.createTextNode(s));
    plan.append(hd); planParts.push(hd);
    BARS[i].forEach((w) => { const b = h('div', 'pr-plan__bar'); b.style.width = Math.round(w * 100) + '%'; plan.append(b); planParts.push(b); });
  });
  pw.body.append(plan, h('div', 'pr-plan__fade'));

  const aw = lib.win({ title: c.asstWin, x: 1000, y: 190, w: 800, h: 540 });
  const ac = lib.chat({ agentIcon: 'chat', messages: [{ from: 'user', initials: 'DR', text: c.asstUser }, { from: 'agent', text: c.asstReply }] });
  aw.el.classList.add('pr-generic');
  aw.body.append(ac.el);
  aw.body.style.height = '482px';
  const ask = h('div', 'pr-ask');
  const go = h('div', 'pr-ask__go'); go.append(lib.icon('arrow', { size: 20 }));
  ask.append(h('span', null, c.askPh), go);
  aw.body.append(ask);

  const hookCol = place(h('div', 'pr-col'), { x: 120, y: 786, w: 1680 });
  hookCol.style.gap = '12px';
  const hk1 = lib.headline(c.hook1, { size: 'sm', maxWidth: 1680 });
  hk1.el.classList.add('pr-mist');
  const hk2 = lib.headline(c.hook2, { size: 'sm', maxWidth: 1680 });
  hookCol.append(hk1.el, hk2.el);
  L1.append(pw.el, aw.el, hookCol);

  pw.in(tl, 0.3, { y: 40 });
  lib.fadeUp(tl, plan.children, 0.5, { y: 10, dur: 0.5, stagger: 0.03 });
  tl.fromTo(plan, { y: 0 }, { y: -560, duration: 6.2, ease: 'power1.inOut' }, 1.2);
  aw.in(tl, 0.6, { y: 40 });
  ac.reveal(tl, 1.3, 0, { typing: 0 });
  ac.reveal(tl, 2.4, 1, { typing: 0.8 });
  hk1.in(tl, 2.0);
  hk2.in(tl, 4.2);
  lib.hide(tl, L1, 7.4, { dur: 0.6, y: -14 });

  /* ============ 8 to 15.6: promise, title + industry catalog (poster) ============ */
  const L2 = lib.layer(stage);
  const left = place(h('div', 'pr-col'), { x: 120, y: 330, w: 860 });
  const eb = lib.eyebrow({ ix: '05', text: c.unit });
  const pt = lib.headline(c.heroTitle, { size: 'md', maxWidth: 860 });
  pt.el.style.fontSize = es ? '50px' : '54px';
  pt.el.style.marginTop = '30px';
  const psub = h('p', 'lede', c.heroSub);
  psub.style.marginTop = '34px'; psub.style.fontSize = '30px';
  left.append(eb, pt.el, psub);

  const cw = lib.win({ title: c.catWin, x: es ? 1120 : 1150, y: 236, w: es ? 680 : 650 });
  const catRows = c.industries.map(([code, name]) => {
    const r = h('div', 'pr-cat__row');
    r.append(h('span', 'pr-code', code), h('div', 'pr-cat__n', name), earlyChip());
    cw.body.append(r);
    return r;
  });
  const cf = h('div', 'pr-cat__foot');
  c.catFoot.forEach((t) => cf.append(h('span', null, t)));
  cw.body.append(cf);
  L2.append(left, cw.el);
  lib.show(tl, L2, 7.95, { dur: 0.01 });
  lib.fadeUp(tl, eb, 8.2, { y: 12, dur: 0.7 });
  pt.in(tl, 8.4, { stagger: 1.0 });
  lib.fadeUp(tl, psub, 11.0, { y: 16, dur: 0.8 });
  cw.in(tl, 9.6, { y: 30, dur: 0.9 });
  lib.fadeUp(tl, [...catRows, cf], 10.0, { y: 16, dur: 0.7, stagger: 0.3 });
  tl.addLabel('poster', 12.5);

  /* ============ 15.6 to 23.6: step 01, pick the package ============ */
  const L3 = lib.layer(stage);
  lib.swap(tl, L2, L3, 15.6, { dur: 0.6 });
  const h1 = stepHead('01', c.s1, c.s1t, c.s1b);
  const kw = lib.win({ title: c.pkgWin, badge: c.status, x: 240, y: 300, w: 1440 });
  kw.bar.querySelector('.win__badge').classList.add('pr-badge-flame');
  const tabs = h('div', 'pr-tabs');
  const tabEls = c.industries.map(([code, name]) => { const t = h('div', 'pr-tab'); t.append(h('b', null, code), document.createTextNode(name)); tabs.append(t); return t; });
  const pkg = h('div', 'pr-pkg');
  const agCol = h('div');
  agCol.append(h('div', 'pr-pkg__label', c.agentsLabel));
  const agRows = c.agents.map(([n, d], i) => {
    const r = h('div', 'pr-agent');
    const ic = h('div', 'pr-agent__ic'); ic.append(lib.icon(AGENT_ICONS[i], { size: 18 }));
    const tx = h('div'); tx.append(h('div', 'pr-agent__n', n), h('div', 'pr-agent__d', d));
    r.append(ic, tx); agCol.append(r); return r;
  });
  const cnCol = h('div');
  const cnLabel = h('div', 'pr-pkg__label', c.connectsLabel);
  cnLabel.style.marginTop = '12px';
  const conn = h('div', 'pr-conn');
  const connChips = c.connects.map((t) => { const ch = h('span', 'chip', t); conn.append(ch); return ch; });
  const pilot = h('div', 'pr-pilot');
  pilot.append(lib.icon('clock', { size: 22 }));
  const pv = h('div'); pv.append(h('div', 'pr-pilot__k', c.pilotLabel), h('div', 'pr-pilot__v', c.pilot));
  pilot.querySelector('svg').style.color = 'var(--flame-400)';
  pilot.append(pv);
  cnCol.append(cnLabel, conn, pilot);
  pkg.append(agCol, cnCol);
  kw.body.append(tabs, pkg);
  L3.append(h1.el, kw.el);
  const cur = lib.cursor(stage, { x: 1560, y: 960 });

  h1.in(16.2, 20.4);
  kw.in(tl, 16.3, { y: 40 });
  cur.in(tl, 16.6);
  cur.moveTo(tl, 16.7, tabEls[0], { dur: 0.9, dx: 6, dy: 8 });
  cur.click(tl, 17.6, tabEls[0]);
  tl.to(tabEls[0], { backgroundColor: '#f58327', borderColor: '#f58327', color: '#1a0d03', duration: 0.3, ease: 'power2.out' }, 17.62);
  tl.to(tabEls[0].querySelector('b'), { backgroundColor: 'rgba(26,13,3,0.14)', color: '#1a0d03', duration: 0.3 }, 17.62);
  cur.out(tl, 18.4);
  lib.fadeUp(tl, agCol.firstChild, 17.9, { y: 10, dur: 0.6 });
  lib.fadeUp(tl, agRows, 18.0, { y: 14, dur: 0.7, stagger: 0.25 });
  lib.fadeUp(tl, cnLabel, 19.4, { y: 10, dur: 0.6 });
  lib.fadeUp(tl, connChips, 19.6, { y: 10, dur: 0.6, stagger: 0.08 });
  lib.fadeUp(tl, pilot, 20.2, { y: 14, dur: 0.7 });

  /* ============ 23.6 to 31.6: step 02, adapt ============ */
  const L4 = lib.layer(stage);
  lib.swap(tl, L3, L4, 23.6, { dur: 0.6 });
  const h2 = stepHead('02', c.s2, c.s2t, c.s2b);
  const sw = lib.win({ title: c.setWin, badge: c.setBadge, x: 240, y: 300, w: 1440 });
  sw.bar.querySelector('.win__badge').classList.add('pr-badge-muted');
  const setRows = c.settings.map(([k, v], i) => {
    const r = h('div', 'pr-set__row');
    const hi = h('div', 'pr-set__hi');
    const val = h('div', 'pr-set__v');
    const txt = h('span');
    val.append(txt);
    const tag = h('div', 'pr-set__tag');
    r.append(hi, h('div', 'pr-set__k', k), val, tag);
    gsap.set(hi, { autoAlpha: 0 });
    sw.body.append(r);
    return { r, hi, txt, v, tag };
  });
  const esc = setRows[4];
  const escChip = h('span', 'chip chip--flame');
  escChip.append(lib.icon('user', { size: 16 }), document.createTextNode(c.toPerson));
  esc.tag.append(escChip);
  gsap.set(escChip, { autoAlpha: 0 });
  L4.append(h2.el, sw.el);
  h2.in(24.2, 28.0);
  sw.in(tl, 24.3, { y: 40 });
  lib.fadeUp(tl, setRows.map((s) => s.r), 24.5, { y: 12, dur: 0.6, stagger: 0.06 });
  setRows.forEach((s, i) => lib.typeText(tl, s.txt, s.v, 24.9 + i * 0.7, { cps: 34 }));
  tl.to(esc.hi, { autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, 29.0);
  tl.fromTo(escChip, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 29.2);

  /* ============ 31.6 to 43.6: step 03, pilot on a real case ============ */
  const L5 = lib.layer(stage);
  lib.swap(tl, L4, L5, 31.6, { dur: 0.6 });
  const h3 = stepHead('03', c.s3, c.s3t, c.s3b);
  const tw = lib.win({ title: c.threadWin, badge: c.illustrative, x: 120, y: 290, w: 940, h: 650 });
  tw.bar.querySelector('.win__badge').classList.add('pr-badge-muted');
  tw.el.classList.add('pr-thread');
  tw.body.style.padding = '24px 28px';
  const th = lib.chat({ messages: c.thread.map(([from, text]) => ({ from, text, initials: 'AL' })) });
  tw.body.append(th.el);
  tw.body.style.height = '592px';
  const ot = h('div', 'pr-onthread');
  ot.append(h('span', 'pr-onthread__k', c.onThread));
  const otChips = [0, 1, 2].map((i) => { const ch = h('span', 'chip chip--flame', c.agents[i][0]); ot.append(ch); return ch; });
  tw.body.append(ot);

  // calendar (3-day view, 09:00 to 19:00)
  const CAL = { x: 1100, y: 290, w: 700 };
  const kal = lib.win({ title: c.calWin, x: CAL.x, y: CAL.y, w: CAL.w });
  kal.body.style.padding = '18px 24px 22px';
  const cal = h('div', 'pr-cal');
  const chead = h('div', 'pr-cal__head');
  chead.append(h('span'));
  c.days.forEach((d) => chead.append(h('span', null, d)));
  const grid = h('div', 'pr-cal__grid');
  const H0 = 9, PXH = 38, TC = 62;
  const colW = (CAL.w - 48 - TC) / 3;
  for (let hr = H0; hr <= 19; hr++) {
    const y = (hr - H0) * PXH;
    const ln = h('div', 'pr-cal__hr'); ln.style.top = y + 'px'; grid.append(ln);
    if (hr < 19) { const t = h('div', 'pr-cal__t', String(hr).padStart(2, '0') + ':00'); t.style.top = y + 'px'; grid.append(t); }
  }
  for (let d = 0; d < 3; d++) { const vl = h('div', 'pr-cal__vl'); vl.style.left = TC + d * colW + 'px'; grid.append(vl); }
  const box = (cls, day, from, to) => {
    const b = h('div', cls);
    place(b, { x: TC + day * colW + 6, y: (from - H0) * PXH + 3, w: colW - 12, h: (to - from) * PXH - 6 });
    grid.append(b);
    return b;
  };
  // example busy blocks (illustrative UI state)
  [[0, 11, 12.5], [0, 14, 15], [0, 16.5, 17.5], [1, 10, 11], [1, 12.5, 14], [1, 15.5, 17], [2, 9, 10.5], [2, 12, 13], [2, 14.5, 16], [2, 17, 18.5]]
    .forEach(([d, a, b]) => box('pr-busy', d, a, b));
  const slotA = box('pr-slot', 0, 9.5, 10.5);
  const slotB = box('pr-slot', 1, 18, 19);
  slotA.textContent = c.option + ' · 9:30';
  slotB.textContent = c.option + ' · 18:00';
  const held = box('pr-held', 0, 9.5, 10.5);
  held.append(lib.icon('check', { size: 16, stroke: 2.6 }), document.createTextNode(c.held));
  gsap.set([slotA, slotB, held], { autoAlpha: 0 });
  cal.append(chead, grid);
  kal.body.append(cal);

  const crm = place(h('div', 'pr-strip pr-strip--ok'), { x: CAL.x, y: 816, w: CAL.w });
  crm.append(lib.icon('db', { size: 20 }), h('span', 'pr-strip__k', c.crm), h('span', 'pr-strip__t', c.crmText));
  const rev = place(h('div', 'pr-strip'), { x: CAL.x, y: 882, w: CAL.w });
  rev.append(lib.icon('users', { size: 20 }), h('span', 'pr-strip__k', c.review), h('span', 'pr-strip__t', c.reviewText));
  rev.querySelector('.pr-strip__t').style.fontSize = es ? '19px' : '20px';
  L5.append(h3.el, tw.el, kal.el, crm, rev);

  h3.in(32.2, 40.0);
  tw.in(tl, 32.2, { y: 40 });
  kal.in(tl, 32.5, { y: 40 });
  th.reveal(tl, 32.8, 0, { typing: 0 });
  th.reveal(tl, 34.0, 1, { typing: 0.7 });
  th.reveal(tl, 36.0, 2, { typing: 0 });
  th.reveal(tl, 37.1, 3, { typing: 0.6 });
  th.reveal(tl, 38.6, 4, { typing: 0 });
  lib.fadeUp(tl, ot.firstChild, 33.0, { y: 8, dur: 0.6 });
  [34.8, 35.2, 37.8].forEach((t, i) => tl.fromTo(otChips[i], { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }, t));
  lib.popIn(tl, [slotA, slotB], 37.8, { scale: 0.96, dur: 0.6, stagger: 0.15 });
  tl.to(slotB, { autoAlpha: 0, duration: 0.4 }, 39.1);
  tl.to(slotA, { autoAlpha: 0, duration: 0.3 }, 39.2);
  tl.fromTo(held, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'expo.out' }, 39.1);
  tl.fromTo(crm, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 39.6);
  tl.fromTo(rev, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 40.4);

  /* ============ 43.6 to 51.6: step 04, we run it ============ */
  const L6 = lib.layer(stage);
  lib.swap(tl, L5, L6, 43.6, { dur: 0.6 });
  const h4 = stepHead('04', c.s4, c.s4t, c.s4b);
  const ow = lib.win({ title: c.opsWin, badge: c.s4t, x: 200, y: 300, w: 1520 });
  ow.bar.querySelector('.win__badge').classList.add('pr-badge-muted');
  const ops = h('div', 'pr-ops');
  const oL = h('div');
  const oth = h('div', 'pr-ops__th');
  oth.append(h('span', null, c.agentCol), h('span', null, c.statusCol));
  oL.append(oth);
  const stats = c.agents.map(([n]) => {
    const r = h('div', 'pr-ops__row');
    const st = h('div', 'pr-stat');
    const a = h('span', 'chip', c.pilotSt);
    const b = h('span', 'chip chip--ok', c.running);
    st.append(a, b);
    gsap.set(b, { autoAlpha: 0 });
    r.append(h('span', 'pr-ops__n', n), st);
    oL.append(r);
    return { r, a, b };
  });
  const oR = h('div');
  const orh = h('div', 'pr-ops__th');
  orh.append(h('span', null, c.recent));
  oR.append(orh);
  const logs = c.logs.map(([t, x]) => {
    const r = h('div', 'pr-log');
    const hi = h('div', 'pr-log__hi');
    gsap.set(hi, { autoAlpha: 0 });
    r.append(hi, h('span', 'pr-log__t', t), h('span', 'pr-log__x', x));
    oR.append(r);
    return { r, hi };
  });
  ops.append(oL, oR);
  ow.body.append(ops);
  L6.append(h4.el, ow.el);
  h4.in(44.2, 48.2);
  ow.in(tl, 44.3, { y: 40 });
  lib.fadeUp(tl, [oth, ...stats.map((s) => s.r)], 44.5, { y: 12, dur: 0.6, stagger: 0.06 });
  stats.forEach((s, i) => {
    const t = 45.0 + i * 0.3;
    tl.to(s.a, { autoAlpha: 0, duration: 0.25 }, t);
    tl.fromTo(s.b, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, t + 0.1);
  });
  lib.fadeUp(tl, [orh, ...logs.map((l) => l.r)], 46.6, { y: 14, dur: 0.7, stagger: 0.2 });
  tl.to(logs[0].hi, { autoAlpha: 1, duration: 0.5 }, 47.8);

  /* ============ 51.6 to 57.6: what stays with the team, how it grows ============ */
  const L7 = lib.layer(stage);
  lib.swap(tl, L6, L7, 51.6, { dur: 0.6 });
  const sc = place(h('div', 'card pr-card'), { x: 120, y: 256, w: 800 });
  const sk = h('div', 'pr-kicker', c.staysLabel);
  sk.style.marginBottom = '14px';
  sc.append(sk);
  const stayRows = c.stays.map((t) => {
    const r = h('div', 'pr-stay');
    const ic = h('div', 'pr-stay__ic'); ic.append(lib.icon('user', { size: 22 }));
    r.append(ic, h('div', 'pr-stay__t', t));
    sc.append(r); return r;
  });
  const gc = place(h('div', 'card pr-card pr-grow'), { x: 1000, y: 256, w: 800 });
  if (es) gc.classList.add('pr-grow--es');
  const gk = h('div', 'pr-kicker', c.growLabel);
  gc.append(gk);
  const gs = lib.steps({ items: c.grow.map(([label, sub]) => ({ label, sub })), x: 40, y: 104, w: 720, gap: 28 });
  gc.append(gs.el);
  const endCol = place(h('div', 'pr-col'), { x: 120, y: 734, w: 1680 });
  endCol.style.gap = '12px';
  const e1 = lib.headline(c.end1, { size: 'sm', maxWidth: 1680 });
  const e2 = lib.headline(c.end2, { size: 'sm', maxWidth: 1680 });
  e2.el.classList.add('pr-mist');
  endCol.append(e1.el, e2.el);
  L7.append(sc, gc, endCol);
  gc.style.height = sc.offsetHeight + 'px';
  lib.fadeUp(tl, [sc, gc], 52.1, { y: 24, dur: 0.8, stagger: 0.15 });
  lib.fadeUp(tl, stayRows, 52.4, { y: 12, dur: 0.6, stagger: 0.18 });
  gs.in(tl, 52.8);
  gs.go(tl, 53.4, 0);
  gs.go(tl, 54.4, 1);
  gs.go(tl, 55.2, 2);
  e1.in(tl, 52.6);
  e2.in(tl, 54.3);
  hud.chrome(tl, 57.6, false);
  lib.hide(tl, L7, 57.6, { dur: 0.5, y: -14 });

  /* ============ 58 to 64: CTA ============ */
  const L8 = lib.layer(stage);
  const cta = lib.ctaCard({ lang, title: c.cta, button: c.ctaBtn });
  cta.el.style.gap = '40px';
  const row = h('div', 'pr-ctarow', c.ctaRow);
  const csub = h('p', 'pr-ctasub', c.ctaSub);
  cta.el.insertBefore(row, cta.headline.el);
  cta.el.insertBefore(csub, cta.button);
  L8.append(cta.el);
  lib.show(tl, L8, 58.1, { dur: 0.01 });
  cta.in(tl, 58.2);
  lib.fadeUp(tl, row, 58.3, { y: 10, dur: 0.7 });
  lib.fadeUp(tl, csub, 59.2, { y: 12, dur: 0.8 });
  tl.set({}, {}, 64);

  hud.progress(tl);
  lib.drift(tl, glow);
  return tl;
}
