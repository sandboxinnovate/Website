import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const PRODUCTS: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'Industry AI Brains — Early Access',
      description:
        'AI brains packaged by industry: real estate, clinics, professional services, e-commerce and hospitality. Ready-made agents set up on your own data. Now in early access.',
    },
    hero: {
      title: 'Start from a brain <em>built for your industry.</em>',
      lede:
        'Businesses in the same industry keep needing the same agents: lead response, scheduling, intake, follow-up. We are packaging them into subscription products you set up on your own data and tools. Now opening to a small group of early-access companies.',
      primary: 'Request early access',
      secondary: { label: 'Browse industries', href: '#demo' },
      facts: [
        { k: 'Status', v: 'Early access' },
        { k: 'Model', v: 'Subscription, set up on your data' },
        { k: 'Industries open', v: 'Real estate · Clinics · Professional services · E-commerce · Hospitality' },
      ],
    },
    pains: {
      title: 'Sound <em>familiar?</em>',
      lede: 'Not every company needs a custom build to get started. Some need something proven, sized for them, running soon.',
      items: [
        {
          pain: 'A custom AI build is more than you need right now.',
          outcome: 'Start from agents designed for your industry and tune them to your business.',
        },
        {
          pain: 'Generic AI tools don’t know how your industry works.',
          outcome: 'The workflows, vocabulary and rules of your sector built in from the first day.',
        },
        {
          pain: 'You can’t wait months to find out whether AI works for you.',
          outcome: 'Set up on your data and running on real cases in a short pilot.',
        },
        {
          pain: 'You’re worried about getting locked into something rigid.',
          outcome: 'When you outgrow the package, it extends into a custom brain without starting over.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we build',
      title: 'Industry brains in <em>early access</em>',
      lede: 'Five industries are open. Each package includes the agents below, set up on your data and tools, with a subscription that covers hosting, updates and support.',
      items: [
        {
          name: 'Real estate',
          what: 'For brokerages and property managers: answer every inquiry, book showings and keep leads warm until they are ready to move.',
          includes: [
            'Inquiry response for portals and website',
            'Lead qualification by area, timing and type',
            'Showing scheduler with calendar sync',
            'Listing description writer',
            'Follow-up sequences for cold leads',
          ],
          timeline: '2–3 weeks to pilot',
          bestFor: 'Brokerages and property managers with steady inbound volume.',
          tag: 'Early access',
        },
        {
          name: 'Clinics',
          what: 'For private clinics and practices: scheduling, reminders and patient questions handled by message, with clean handoffs to staff.',
          includes: [
            'Appointment booking and rescheduling',
            'Reminders and pre-visit instructions',
            'Questions answered from your own service information',
            'Intake summaries for staff',
            'Anything clinical escalated to a person',
          ],
          timeline: '3–4 weeks to pilot',
          bestFor: 'Clinics and practices with a busy front desk.',
          tag: 'Early access',
        },
        {
          name: 'Professional services',
          what: 'For law, accounting and consulting firms: client intake, first drafts and knowledge retrieval from your own precedents.',
          includes: [
            'Client intake and pre-screening',
            'Knowledge assistant over precedents and templates',
            'First drafts of recurring documents',
            'Meeting notes turned into action items',
            'Deadline and follow-up tracker',
          ],
          timeline: '3–4 weeks to pilot',
          bestFor: 'Firms of 5–100 people that reuse knowledge every day.',
          tag: 'Early access',
        },
        {
          name: 'E-commerce',
          what: 'For online stores: support that resolves orders end to end, product questions answered from your catalog and recovery of abandoned carts.',
          includes: [
            'Order status, returns and exchanges',
            'Product advisor trained on your catalog',
            'Abandoned-cart and post-purchase messages',
            'Review and feedback summaries',
            'Refunds above your limit sent to a person',
          ],
          timeline: '2–3 weeks to pilot',
          bestFor: 'Stores with recurring support volume and a large catalog.',
          tag: 'Early access',
        },
        {
          name: 'Hospitality',
          what: 'For hotels, rentals and restaurants: guest questions, reservations and pre-arrival messages handled in the guest’s language, day and night.',
          includes: [
            'Multilingual guest messaging',
            'Reservation requests and changes',
            'Pre-arrival and upgrade messages',
            'Drafted replies to reviews',
            'Special requests handed to staff',
          ],
          timeline: '2–3 weeks to pilot',
          bestFor: 'Independent hotels, rental operators and restaurant groups.',
          tag: 'Early access',
        },
      ],
    },
    demo: {
      eyebrow: 'Inside each package',
      title: 'Choose your industry. <em>See what’s inside.</em>',
      lede: 'Select an industry to see the agents included, the tools they connect to and what always stays with your team.',
    },
    method: {
      title: 'From fit check <em>to a running pilot</em>',
      lede: 'Shorter than a custom build, because most of the design is already done. Your part is the data, the rules and the feedback.',
      steps: [
        {
          name: 'Discover',
          time: '1 call',
          body: 'We check fit: your industry, your volume and the tools you use. If a package is not right for you, we say so.',
          out: ['Fit check', 'Pilot scope'],
        },
        {
          name: 'Design',
          time: 'A few days',
          body: 'We adapt the agents to your services, policies, tone, hours and escalation rules.',
          out: ['Configured agents', 'Escalation rules'],
        },
        {
          name: 'Build',
          time: '2–4 weeks',
          body: 'Setup on your data and tools, then a pilot on real cases with your team watching every step.',
          out: ['Connected tools', 'Pilot on real cases'],
        },
        {
          name: 'Operate',
          time: 'Subscription',
          body: 'We host, monitor and update the agents. New capabilities arrive as the product grows.',
          out: ['Monitoring', 'Product updates'],
        },
      ],
    },
    pricing: {
      body: 'Products are a subscription with a one-time setup. During early access we agree the terms with each company directly, based on your industry, your volume and your market.',
      points: [
        'Setup: configuration on your data and tools',
        'Subscription: hosting, updates, monitoring and support',
        'Early-access terms agreed one to one',
        'Tailored to your market and volume',
      ],
      shape: ['Setup', 'Subscription'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'What it handles <em>on a normal day</em>',
      lede: 'Illustrative moments from each package — the kind of work the agents take off your team’s plate.',
      note: 'Illustrative scenarios',
      items: [
        {
          industry: 'Real estate · Sat 23:40',
          title: 'A late-night inquiry, booked',
          body: 'A portal inquiry gets an answer in minutes, two qualifying questions and a showing booked for Monday morning.',
          tags: ['Inquiry', 'Showing'],
        },
        {
          industry: 'Clinics · 07:05',
          title: 'A cancelled slot, refilled',
          body: 'A patient reschedules by message; the slot reopens and the next person on the waitlist is offered it.',
          tags: ['Reschedule', 'Waitlist'],
        },
        {
          industry: 'Professional services · 09:30',
          title: 'A new client, ready to brief',
          body: 'A new client’s intake form becomes a summary, a checklist of missing documents and a draft engagement letter.',
          tags: ['Intake', 'Draft'],
        },
        {
          industry: 'E-commerce · 14:15',
          title: 'A wrong size, exchanged',
          body: 'A customer asks where an order is; the agent checks the carrier, answers and offers an exchange for the wrong size.',
          tags: ['Order', 'Exchange'],
        },
        {
          industry: 'Hospitality · 22:50',
          title: 'A late arrival, handled',
          body: 'A guest arriving late asks about check-in; the assistant sends instructions and alerts the night staff.',
          tags: ['Guest', 'Handoff'],
        },
      ],
    },
    faq: [
      {
        q: 'What does early access mean?',
        a: 'The products are opening to a small group of companies per industry. You get the full package, direct access to the team building it and a say in the roadmap, in exchange for regular feedback during the first months.',
      },
      {
        q: 'How is a product different from a custom brain?',
        a: 'A product starts from agents already designed for your industry, so setup is faster and the scope is defined. A custom brain is built from scratch around your processes. A product can grow into a custom build later.',
      },
      {
        q: 'Can we customize the agents?',
        a: 'Yes, within the package: services, tone, rules, hours, escalation and the tools they connect to. Deeper changes move to a custom project with our Brains team.',
      },
      {
        q: 'My industry is not listed. Can I still join?',
        a: 'Tell us about your business. If a package is close enough we can adapt it; if not, a single agent from our Brains unit is usually the better place to start.',
      },
      {
        q: 'Where does our data live?',
        a: 'In an isolated environment per company, with access limited to your team and ours. Your data is not used to train models and is never shared with other customers.',
      },
      {
        q: 'What happens when early access ends?',
        a: 'You keep your setup and your history. We agree with you, ahead of time, how the move to the standard product works.',
      },
    ],
    cta: {
      title: 'Join <em>early access.</em>',
      lede: 'Tell us your industry and the volume you handle. If there is a fit, we set up a pilot on your data.',
    },
  },

  es: {
    seo: {
      title: 'Brains de IA por industria — acceso anticipado',
      description:
        'Brains de IA empaquetados por industria: inmobiliarias, clínicas, servicios profesionales, e-commerce y hotelería. Agentes listos, configurados con tus datos.',
    },
    hero: {
      title: 'Empieza con un brain <em>hecho para tu industria.</em>',
      lede:
        'Las empresas de una misma industria necesitan una y otra vez los mismos agentes: respuesta a leads, agenda, admisión, seguimiento. Los estamos empaquetando en productos por suscripción que se configuran con tus propios datos y herramientas. Abrimos ahora a un grupo reducido de empresas en acceso anticipado.',
      primary: 'Solicitar acceso',
      secondary: { label: 'Ver industrias', href: '#demo' },
      facts: [
        { k: 'Estado', v: 'Acceso anticipado' },
        { k: 'Modelo', v: 'Suscripción, configurada con tus datos' },
        { k: 'Industrias abiertas', v: 'Inmobiliarias · Clínicas · Servicios profesionales · E-commerce · Hotelería' },
      ],
    },
    pains: {
      title: '¿Te <em>suena?</em>',
      lede: 'No todas las empresas necesitan un desarrollo a medida para empezar. Algunas necesitan algo probado, a su medida y funcionando pronto.',
      items: [
        {
          pain: 'Un desarrollo de IA a medida es más de lo que necesitas hoy.',
          outcome: 'Parte de agentes diseñados para tu industria y ajústalos a tu negocio.',
        },
        {
          pain: 'Las herramientas genéricas de IA no entienden cómo funciona tu industria.',
          outcome: 'Los flujos, el vocabulario y las reglas de tu sector incorporados desde el primer día.',
        },
        {
          pain: 'No puedes esperar meses para saber si la IA te sirve.',
          outcome: 'Configurado con tus datos y trabajando con casos reales en un piloto corto.',
        },
        {
          pain: 'Te preocupa quedar atado a algo rígido.',
          outcome: 'Cuando el paquete te queda chico, se amplía a un brain a medida sin empezar de cero.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué construimos',
      title: 'Brains por industria en <em>acceso anticipado</em>',
      lede: 'Hay cinco industrias abiertas. Cada paquete incluye los agentes que ves abajo, configurados con tus datos y herramientas, y una suscripción que cubre infraestructura, actualizaciones y soporte.',
      items: [
        {
          name: 'Inmobiliarias',
          what: 'Para corredoras y administradoras de propiedades: responder cada consulta, agendar visitas y mantener activos a los leads hasta que estén listos.',
          includes: [
            'Respuesta a consultas de portales y sitio web',
            'Calificación de leads por zona, plazo y tipo',
            'Agenda de visitas sincronizada con el calendario',
            'Redacción de fichas de propiedades',
            'Secuencias de seguimiento para leads fríos',
          ],
          timeline: '2–3 semanas al piloto',
          bestFor: 'Corredoras y administradoras con un flujo constante de consultas.',
          tag: 'Acceso anticipado',
        },
        {
          name: 'Clínicas',
          what: 'Para clínicas y consultorios privados: agenda, recordatorios y preguntas de pacientes resueltas por mensaje, con derivaciones claras al equipo.',
          includes: [
            'Reserva y reprogramación de citas',
            'Recordatorios e indicaciones previas',
            'Respuestas basadas en la información de tus servicios',
            'Resúmenes de admisión para el equipo',
            'Todo lo clínico se deriva a una persona',
          ],
          timeline: '3–4 semanas al piloto',
          bestFor: 'Clínicas y consultorios con una recepción muy cargada.',
          tag: 'Acceso anticipado',
        },
        {
          name: 'Servicios profesionales',
          what: 'Para estudios jurídicos, contables y consultoras: admisión de clientes, primeros borradores y búsqueda en tus propios antecedentes.',
          includes: [
            'Admisión y preevaluación de clientes',
            'Asistente de conocimiento sobre antecedentes y plantillas',
            'Primeros borradores de documentos recurrentes',
            'Notas de reunión convertidas en tareas',
            'Seguimiento de plazos y pendientes',
          ],
          timeline: '3–4 semanas al piloto',
          bestFor: 'Firmas de 5 a 100 personas que reutilizan conocimiento todos los días.',
          tag: 'Acceso anticipado',
        },
        {
          name: 'E-commerce',
          what: 'Para tiendas online: soporte que resuelve pedidos de punta a punta, preguntas de producto respondidas desde tu catálogo y recuperación de carritos abandonados.',
          includes: [
            'Estado de pedidos, devoluciones y cambios',
            'Asesor de productos entrenado con tu catálogo',
            'Mensajes de carrito abandonado y posventa',
            'Resúmenes de reseñas y comentarios',
            'Reembolsos sobre tu límite derivados a una persona',
          ],
          timeline: '2–3 semanas al piloto',
          bestFor: 'Tiendas con volumen de soporte recurrente y un catálogo amplio.',
          tag: 'Acceso anticipado',
        },
        {
          name: 'Hotelería',
          what: 'Para hoteles, alquileres vacacionales y restaurantes: preguntas de huéspedes, reservas y mensajes previos a la llegada en el idioma de cada huésped, a cualquier hora.',
          includes: [
            'Mensajería con huéspedes en varios idiomas',
            'Solicitudes y cambios de reserva',
            'Mensajes previos a la llegada y mejoras de habitación',
            'Borradores de respuesta a reseñas',
            'Pedidos especiales derivados al equipo',
          ],
          timeline: '2–3 semanas al piloto',
          bestFor: 'Hoteles independientes, operadores de alquileres y grupos gastronómicos.',
          tag: 'Acceso anticipado',
        },
      ],
    },
    demo: {
      eyebrow: 'Dentro de cada paquete',
      title: 'Elige tu industria. <em>Mira qué incluye.</em>',
      lede: 'Selecciona una industria para ver los agentes incluidos, las herramientas a las que se conectan y lo que siempre queda en manos de tu equipo.',
    },
    method: {
      title: 'De la evaluación <em>a un piloto en marcha</em>',
      lede: 'Más corto que un desarrollo a medida, porque la mayor parte del diseño ya está hecha. Tu parte son los datos, las reglas y la retroalimentación.',
      steps: [
        {
          name: 'Descubrir',
          time: '1 llamada',
          body: 'Evaluamos el encaje: tu industria, tu volumen y las herramientas que usas. Si un paquete no es para ti, te lo decimos.',
          out: ['Evaluación de encaje', 'Alcance del piloto'],
        },
        {
          name: 'Diseñar',
          time: 'Unos días',
          body: 'Adaptamos los agentes a tus servicios, políticas, tono, horarios y reglas de derivación.',
          out: ['Agentes configurados', 'Reglas de derivación'],
        },
        {
          name: 'Construir',
          time: '2–4 semanas',
          body: 'Configuración con tus datos y herramientas, y luego un piloto con casos reales con tu equipo viendo cada paso.',
          out: ['Herramientas conectadas', 'Piloto con casos reales'],
        },
        {
          name: 'Operar',
          time: 'Suscripción',
          body: 'Alojamos, monitoreamos y actualizamos los agentes. Las nuevas funciones llegan a medida que el producto crece.',
          out: ['Monitoreo', 'Actualizaciones'],
        },
      ],
    },
    pricing: {
      body: 'Los productos funcionan con una suscripción y una configuración inicial. Durante el acceso anticipado acordamos las condiciones directamente con cada empresa, según tu industria, tu volumen y tu mercado.',
      points: [
        'Configuración: puesta en marcha con tus datos y herramientas',
        'Suscripción: infraestructura, actualizaciones, monitoreo y soporte',
        'Condiciones de acceso anticipado acordadas una a una',
        'Ajustado a tu mercado y a tu volumen',
      ],
      shape: ['Configuración', 'Suscripción'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Qué resuelve <em>en un día normal</em>',
      lede: 'Momentos ilustrativos de cada paquete: el tipo de trabajo que los agentes le quitan de encima a tu equipo.',
      note: 'Escenarios ilustrativos',
      items: [
        {
          industry: 'Inmobiliarias · sáb 23:40',
          title: 'Una consulta nocturna, con visita agendada',
          body: 'Una consulta de portal recibe respuesta en minutos, dos preguntas de calificación y una visita agendada para el lunes por la mañana.',
          tags: ['Consulta', 'Visita'],
        },
        {
          industry: 'Clínicas · 07:05',
          title: 'Una cita cancelada, vuelta a ocupar',
          body: 'Un paciente reprograma por mensaje; el horario se libera y se le ofrece a la siguiente persona en lista de espera.',
          tags: ['Reprogramación', 'Lista de espera'],
        },
        {
          industry: 'Servicios profesionales · 09:30',
          title: 'Un cliente nuevo, listo para la reunión',
          body: 'El formulario de admisión de un cliente nuevo se convierte en un resumen, una lista de documentos faltantes y un borrador de carta de encargo.',
          tags: ['Admisión', 'Borrador'],
        },
        {
          industry: 'E-commerce · 14:15',
          title: 'Una talla equivocada, cambiada',
          body: 'Un cliente pregunta dónde está su pedido; el agente consulta al transportista, responde y ofrece el cambio por la talla correcta.',
          tags: ['Pedido', 'Cambio'],
        },
        {
          industry: 'Hotelería · 22:50',
          title: 'Una llegada tarde, resuelta',
          body: 'Un huésped que llega tarde pregunta por el check-in; el asistente le envía las instrucciones y avisa al equipo de noche.',
          tags: ['Huésped', 'Derivación'],
        },
      ],
    },
    faq: [
      {
        q: '¿Qué significa acceso anticipado?',
        a: 'Los productos se abren a un grupo reducido de empresas por industria. Recibes el paquete completo, acceso directo al equipo que lo construye y voz en la hoja de ruta, a cambio de retroalimentación periódica durante los primeros meses.',
      },
      {
        q: '¿En qué se diferencia un producto de un brain a medida?',
        a: 'Un producto parte de agentes ya diseñados para tu industria, así que la puesta en marcha es más rápida y el alcance está definido. Un brain a medida se construye desde cero sobre tus procesos. Un producto puede convertirse más adelante en un desarrollo a medida.',
      },
      {
        q: '¿Podemos personalizar los agentes?',
        a: 'Sí, dentro del paquete: servicios, tono, reglas, horarios, derivaciones y las herramientas a las que se conectan. Los cambios más profundos pasan a un proyecto a medida con nuestro equipo de Brains.',
      },
      {
        q: 'Mi industria no está en la lista. ¿Puedo sumarme igual?',
        a: 'Cuéntanos sobre tu negocio. Si algún paquete se acerca lo suficiente, lo adaptamos; si no, un agente único de nuestra unidad Brains suele ser el mejor punto de partida.',
      },
      {
        q: '¿Dónde quedan nuestros datos?',
        a: 'En un entorno aislado por empresa, con acceso limitado a tu equipo y al nuestro. Tus datos no se usan para entrenar modelos y nunca se comparten con otros clientes.',
      },
      {
        q: '¿Qué pasa cuando termina el acceso anticipado?',
        a: 'Conservas tu configuración y tu historial. Acordamos contigo, con anticipación, cómo es el paso al producto estándar.',
      },
    ],
    cta: {
      title: 'Súmate al <em>acceso anticipado.</em>',
      lede: 'Cuéntanos tu industria y el volumen que manejas. Si hay encaje, armamos un piloto con tus datos.',
    },
  },
};
