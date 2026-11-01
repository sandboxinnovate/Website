import type { L10n } from '@/i18n';
import type { UnitCopy } from './types';

export const PARTNERS: L10n<UnitCopy> = {
  en: {
    seo: {
      title: 'White-label AI for agencies and consultancies',
      description:
        'Resell AI systems built by Sandbox under your own brand: white-label builds, co-delivery or referral partnerships for agencies and consultancies.',
    },
    hero: {
      title: 'Sell AI under your brand. <em>We build it behind you.</em>',
      lede:
        'Your clients are asking for AI and you don’t want to build an engineering team to answer them. Partner with us: you keep the relationship and the brand; we design, build and run the systems.',
      primary: 'Book a partner call',
      secondary: { label: 'See how it works', href: '#demo' },
      facts: [
        { k: 'Models', v: 'White-label · Co-delivery · Referral' },
        { k: 'Your brand', v: 'On every deliverable, if you want it' },
        { k: 'Markets', v: 'US · Europe · Latin America' },
      ],
    },
    pains: {
      title: 'Your clients want AI. <em>You don’t have the team.</em>',
      lede: 'Agencies and consultancies are getting AI requests faster than they can staff for them.',
      items: [
        {
          pain: 'Clients ask for AI and you send them somewhere else.',
          outcome: 'You add AI systems to your offer without hiring engineers.',
        },
        {
          pain: 'An in-house AI team is slow to build and hard to keep busy.',
          outcome: 'Our team works as your back office, sized to the projects you close.',
        },
        {
          pain: 'Freelancers deliver demos, not systems you can support for years.',
          outcome: 'Production systems with monitoring, documentation and ongoing operation.',
        },
        {
          pain: 'You worry a partner will go around you to your clients.',
          outcome: 'The client relationship stays with you, in writing, and your brand is on every deliverable.',
        },
      ],
    },
    offers: {
      eyebrow: 'What we build',
      title: 'Three ways <em>to partner</em>',
      lede: 'Choose how visible we are. From fully white-label to a simple referral, your client gets the same quality of work.',
      items: [
        {
          name: 'White-label Build',
          what: 'We design, build and run the system; you sell it, brand it and own the client relationship. Your client only sees you.',
          includes: [
            'Pre-sales support: scoping and proposal input',
            'Delivery under your brand and domain',
            'Branded dashboards, docs and reports',
            'Ongoing operation and support behind your team',
            'Partner terms designed for resale',
          ],
          timeline: '3–10 weeks per project',
          bestFor: 'Marketing and digital agencies with an established client base.',
        },
        {
          name: 'Co-delivery',
          what: 'We join your team on the project, openly, as your AI partner. You lead strategy and the relationship; we lead the build.',
          includes: [
            'Joint discovery and scoping',
            'Shared project management',
            'Knowledge transfer to your team',
            'Co-branded or your-brand deliverables',
            'Option to move to white-label later',
          ],
          timeline: 'Per project',
          bestFor: 'Consultancies and IT firms that want to build AI capability while they deliver.',
        },
        {
          name: 'Referral Partnership',
          what: 'You introduce clients who need AI; we scope, sell and deliver directly, and keep you informed along the way.',
          includes: [
            'Simple referral agreement',
            'Joint intro call with your client',
            'Status updates on referred projects',
            'Referral compensation agreed upfront',
            'Co-marketing opportunities',
          ],
          timeline: 'Ongoing',
          bestFor: 'Consultants, advisors and firms that want to offer AI without delivering it.',
        },
      ],
    },
    demo: {
      eyebrow: 'How it works',
      title: 'Who does what, <em>model by model</em>',
      lede: 'Pick a partnership model to see who owns each stage of a client project — and what your client sees.',
    },
    method: {
      title: 'From first call <em>to first client live</em>',
      lede: 'We start with one real opportunity, not a contract full of hypotheticals.',
      steps: [
        {
          name: 'Qualify',
          time: '1–2 calls',
          body: 'We learn about your agency, your clients and the AI requests you are getting, and agree on the model that fits.',
          out: ['Partnership model', 'First opportunity'],
        },
        {
          name: 'Package',
          time: '1–2 weeks',
          body: 'Partner agreement, brand kit, sales materials and the first client opportunity scoped together.',
          out: ['Agreement', 'Branded sales kit'],
        },
        {
          name: 'Deliver',
          time: 'Per project',
          body: 'We build the first client system under your brand, with your team in every review.',
          out: ['First system live', 'Delivery playbook'],
        },
        {
          name: 'Grow',
          time: 'Ongoing',
          body: 'We run the systems, support your team and grow the offer as your clients ask for more.',
          out: ['Operation & support', 'Quarterly review'],
        },
      ],
    },
    pricing: {
      body: 'Partners work on partner terms and set their own price to the client. Each project still follows our model — setup plus ongoing operation — scoped with you after discovery and adjusted to your market.',
      points: [
        'You set the price to your client',
        'Setup plus ongoing operation, per project',
        'Partner terms agreed in the partnership call',
        'Adjusted to your markets and volume',
      ],
      shape: ['Setup, per project', 'Ongoing operation'],
    },
    cases: {
      eyebrow: 'Use cases',
      title: 'What partners <em>sell with us</em>',
      lede: 'How different kinds of firms typically add AI to their offer.',
      items: [
        {
          industry: 'Marketing agency',
          title: 'AI search visibility in every retainer',
          body: 'Offer visibility tracking and content engines under your brand; we run the engines behind your team.',
          tags: ['White-label', 'Growth'],
        },
        {
          industry: 'Web & digital studio',
          title: 'An assistant with every website',
          body: 'A brain trained on the client’s site and documents, delivered with the launch and run as a monthly service.',
          tags: ['White-label', 'Brains'],
        },
        {
          industry: 'Management consultancy',
          title: 'From roadmap to rollout',
          body: 'Your consultants deliver the strategy; we implement the agents and automations it calls for.',
          tags: ['Co-delivery', 'Consulting'],
        },
        {
          industry: 'IT & managed services',
          title: 'AI as part of the stack',
          body: 'Copilots and agents deployed on infrastructure you already manage for your clients.',
          tags: ['Co-delivery', 'Brains'],
        },
        {
          industry: 'Industry advisors',
          title: 'A product for your niche',
          body: 'Pair an industry brain with your expertise and offer it to your network, with us delivering behind you.',
          tags: ['Referral', 'Products'],
        },
      ],
    },
    faq: [
      {
        q: 'Will our clients know Sandbox is involved?',
        a: 'Only if you want them to. In a white-label build we work under your brand, with your domain, your templates and your team in front of the client.',
      },
      {
        q: 'Who owns the client relationship?',
        a: 'You do. We don’t contact your clients directly unless you ask us to, and we put that in writing.',
      },
      {
        q: 'Do we need technical people on our side?',
        a: 'No. It helps to have a project lead who understands the client’s business; we handle architecture, build and operation.',
      },
      {
        q: 'Can you help us sell?',
        a: 'Yes. We join pre-sales calls as part of your team, help scope proposals and provide sales materials you can brand as your own.',
      },
      {
        q: 'What can we resell?',
        a: 'What we build: single agents, company brains, content and AI-visibility engines, training, and the industry products in early access.',
      },
      {
        q: 'How do partner terms work?',
        a: 'They depend on the model, the volume of projects and the markets you work in, so we agree them in a partnership call rather than publishing a rate card.',
      },
    ],
    cta: {
      title: 'Bring us <em>your next AI request.</em>',
      lede: 'A short call to understand your agency, your clients and the projects they are asking for. We’ll tell you which model fits.',
    },
  },

  es: {
    seo: {
      title: 'IA marca blanca para agencias y consultoras',
      description:
        'Revende sistemas de IA construidos por Sandbox con tu marca: desarrollo marca blanca, entrega conjunta o referidos para agencias y consultoras.',
    },
    hero: {
      title: 'Vende IA con tu marca. <em>Nosotros la construimos.</em>',
      lede:
        'Tus clientes te piden IA y no quieres armar un equipo de ingeniería para responderles. Asóciate con nosotros: tú mantienes la relación y la marca; nosotros diseñamos, construimos y operamos los sistemas.',
      primary: 'Agendar una llamada de partners',
      secondary: { label: 'Ver cómo funciona', href: '#demo' },
      facts: [
        { k: 'Modelos', v: 'Marca blanca · Entrega conjunta · Referidos' },
        { k: 'Tu marca', v: 'En cada entregable, si así lo quieres' },
        { k: 'Mercados', v: 'EE. UU. · Europa · Latinoamérica' },
      ],
    },
    pains: {
      title: 'Tus clientes piden IA. <em>Te falta el equipo.</em>',
      lede: 'Las agencias y consultoras reciben pedidos de IA más rápido de lo que pueden armar equipo para atenderlos.',
      items: [
        {
          pain: 'Tus clientes te piden IA y terminas mandándolos a otro lado.',
          outcome: 'Sumas sistemas de IA a tu oferta sin contratar ingenieros.',
        },
        {
          pain: 'Un equipo interno de IA tarda en armarse y cuesta mantenerlo ocupado.',
          outcome: 'Nuestro equipo funciona como tu back office, dimensionado según los proyectos que cierras.',
        },
        {
          pain: 'Los freelancers entregan demos, no sistemas que puedas sostener durante años.',
          outcome: 'Sistemas en producción con monitoreo, documentación y operación continua.',
        },
        {
          pain: 'Te preocupa que un partner se acerque directamente a tus clientes.',
          outcome: 'La relación con el cliente sigue siendo tuya, por escrito, y tu marca va en cada entregable.',
        },
      ],
    },
    offers: {
      eyebrow: 'Qué construimos',
      title: 'Tres formas <em>de asociarte</em>',
      lede: 'Elige qué tan visibles somos. Desde marca blanca total hasta un simple referido, tu cliente recibe la misma calidad de trabajo.',
      items: [
        {
          name: 'Desarrollo marca blanca',
          what: 'Nosotros diseñamos, construimos y operamos el sistema; tú lo vendes, le pones tu marca y eres dueño de la relación con el cliente. Tu cliente solo te ve a ti.',
          includes: [
            'Apoyo en preventa: alcance y aportes a la propuesta',
            'Entrega con tu marca y tu dominio',
            'Paneles, documentación y reportes con tu marca',
            'Operación y soporte continuos detrás de tu equipo',
            'Condiciones de partner pensadas para reventa',
          ],
          timeline: '3–10 semanas por proyecto',
          bestFor: 'Agencias de marketing y digitales con una cartera de clientes establecida.',
        },
        {
          name: 'Entrega conjunta',
          what: 'Nos sumamos a tu equipo en el proyecto, de forma abierta, como tu partner de IA. Tú lideras la estrategia y la relación; nosotros, la construcción.',
          includes: [
            'Descubrimiento y alcance en conjunto',
            'Gestión de proyecto compartida',
            'Transferencia de conocimiento a tu equipo',
            'Entregables con ambas marcas o solo con la tuya',
            'Opción de pasar a marca blanca más adelante',
          ],
          timeline: 'Por proyecto',
          bestFor: 'Consultoras y empresas de TI que quieren desarrollar capacidad en IA mientras entregan.',
        },
        {
          name: 'Alianza de referidos',
          what: 'Nos presentas clientes que necesitan IA; nosotros definimos el alcance, vendemos y entregamos directamente, y te mantenemos al tanto en todo momento.',
          includes: [
            'Acuerdo de referidos simple',
            'Llamada de presentación conjunta con tu cliente',
            'Novedades sobre los proyectos referidos',
            'Compensación por referido acordada de antemano',
            'Oportunidades de co-marketing',
          ],
          timeline: 'Continuo',
          bestFor: 'Consultores, asesores y firmas que quieren ofrecer IA sin entregarla ellos mismos.',
        },
      ],
    },
    demo: {
      eyebrow: 'Cómo funciona',
      title: 'Quién hace qué, <em>modelo por modelo</em>',
      lede: 'Elige un modelo de alianza para ver quién se encarga de cada etapa de un proyecto, y qué ve tu cliente.',
    },
    method: {
      title: 'De la primera llamada <em>al primer cliente en marcha</em>',
      lede: 'Empezamos con una oportunidad real, no con un contrato lleno de supuestos.',
      steps: [
        {
          name: 'Calificar',
          time: '1–2 llamadas',
          body: 'Conocemos tu agencia, tus clientes y los pedidos de IA que estás recibiendo, y acordamos el modelo que encaja.',
          out: ['Modelo de alianza', 'Primera oportunidad'],
        },
        {
          name: 'Empaquetar',
          time: '1–2 semanas',
          body: 'Acuerdo de partners, kit de marca, materiales de venta y la primera oportunidad con alcance definido en conjunto.',
          out: ['Acuerdo', 'Kit de venta con tu marca'],
        },
        {
          name: 'Entregar',
          time: 'Por proyecto',
          body: 'Construimos el primer sistema para tu cliente con tu marca, con tu equipo en cada revisión.',
          out: ['Primer sistema en marcha', 'Manual de entrega'],
        },
        {
          name: 'Crecer',
          time: 'Continuo',
          body: 'Operamos los sistemas, damos soporte a tu equipo y ampliamos la oferta a medida que tus clientes piden más.',
          out: ['Operación y soporte', 'Revisión trimestral'],
        },
      ],
    },
    pricing: {
      body: 'Los partners trabajan con condiciones de partner y fijan su propio precio al cliente. Cada proyecto sigue nuestro modelo (implementación más operación continua), con un alcance que definimos contigo después del descubrimiento y ajustado a tu mercado.',
      points: [
        'Tú fijas el precio a tu cliente',
        'Implementación más operación continua, por proyecto',
        'Condiciones de partner acordadas en la llamada',
        'Ajustado a tus mercados y a tu volumen',
      ],
      shape: ['Implementación, por proyecto', 'Operación continua'],
    },
    cases: {
      eyebrow: 'Casos de uso',
      title: 'Qué venden <em>los partners con nosotros</em>',
      lede: 'Cómo suelen sumar IA a su oferta distintos tipos de firmas.',
      items: [
        {
          industry: 'Agencia de marketing',
          title: 'Visibilidad en IA en cada servicio mensual',
          body: 'Ofrece seguimiento de visibilidad y motores de contenido con tu marca; nosotros los operamos detrás de tu equipo.',
          tags: ['Marca blanca', 'Growth'],
        },
        {
          industry: 'Estudio web y digital',
          title: 'Un asistente con cada sitio web',
          body: 'Un brain entrenado con el sitio y los documentos del cliente, entregado con el lanzamiento y operado como servicio mensual.',
          tags: ['Marca blanca', 'Brains'],
        },
        {
          industry: 'Consultora de gestión',
          title: 'De la hoja de ruta a la implementación',
          body: 'Tus consultores entregan la estrategia; nosotros implementamos los agentes y automatizaciones que plantea.',
          tags: ['Entrega conjunta', 'Consulting'],
        },
        {
          industry: 'TI y servicios gestionados',
          title: 'La IA como parte del stack',
          body: 'Copilotos y agentes desplegados sobre la infraestructura que ya administras para tus clientes.',
          tags: ['Entrega conjunta', 'Brains'],
        },
        {
          industry: 'Asesores de industria',
          title: 'Un producto para tu nicho',
          body: 'Combina un brain de industria con tu experiencia y ofrécelo a tu red, con nosotros entregando detrás.',
          tags: ['Referidos', 'Products'],
        },
      ],
    },
    faq: [
      {
        q: '¿Nuestros clientes van a saber que Sandbox participa?',
        a: 'Solo si tú quieres. En un desarrollo marca blanca trabajamos con tu marca, tu dominio, tus plantillas y tu equipo frente al cliente.',
      },
      {
        q: '¿De quién es la relación con el cliente?',
        a: 'Tuya. No contactamos a tus clientes directamente salvo que nos lo pidas, y lo dejamos por escrito.',
      },
      {
        q: '¿Necesitamos perfiles técnicos de nuestro lado?',
        a: 'No. Ayuda tener un líder de proyecto que entienda el negocio del cliente; nosotros nos encargamos de la arquitectura, la construcción y la operación.',
      },
      {
        q: '¿Nos ayudan a vender?',
        a: 'Sí. Participamos en llamadas de preventa como parte de tu equipo, ayudamos a definir el alcance de las propuestas y te damos materiales de venta para usar con tu marca.',
      },
      {
        q: '¿Qué podemos revender?',
        a: 'Lo que construimos: agentes únicos, brains de empresa, motores de contenido y de visibilidad en IA, formación, y los productos por industria en acceso anticipado.',
      },
      {
        q: '¿Cómo funcionan las condiciones de partner?',
        a: 'Dependen del modelo, del volumen de proyectos y de los mercados en los que trabajas, por eso las acordamos en una llamada en lugar de publicar una tarifa.',
      },
    ],
    cta: {
      title: 'Tráenos <em>tu próximo pedido de IA.</em>',
      lede: 'Una llamada breve para conocer tu agencia, tus clientes y los proyectos que te están pidiendo. Te decimos qué modelo encaja.',
    },
  },
};
