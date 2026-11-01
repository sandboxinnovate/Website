import type { L10n } from './index';

type S = L10n<string>;

/**
 * Privacy policy copy (/privacy, /es/privacy).
 * `{email}` is replaced by a mailto link to SITE.email in src/views/Privacy.astro.
 * Keep it factual: no named processors, no prices. Update `updated` whenever the text changes.
 */
export interface PrivacySection {
  title: S;
  body?: S;
  list?: L10n<string[]>;
}

export const PRIVACY = {
  seo: {
    title: { en: 'Privacy policy', es: 'Política de privacidad' } as S,
    description: {
      en: 'How Sandbox handles the personal data you send through sandboxinnovate.com: what we collect, why, how long we keep it and your rights.',
      es: 'Cómo trata Sandbox los datos personales que envías a través de sandboxinnovate.com: qué recopilamos, para qué, cuánto tiempo los guardamos y tus derechos.',
    } as S,
  },
  eyebrow: { en: 'Legal', es: 'Legal' } as S,
  title: { en: 'Privacy policy', es: 'Política de privacidad' } as S,
  updated: { en: 'Last updated: November 1, 2026', es: 'Última actualización: 1 de noviembre de 2026' } as S,
  updatedIso: '2026-11-01',
  intro: {
    en: 'This policy explains what Sandbox Innovate LLC (“Sandbox”, “we”) collects through sandboxinnovate.com, why, and what you can ask us to do with it.',
    es: 'Esta política explica qué datos recopila Sandbox Innovate LLC («Sandbox», «nosotros») a través de sandboxinnovate.com, para qué los usa y qué puedes pedirnos sobre ellos.',
  } as S,
  sections: [
    {
      title: { en: 'Who is responsible', es: 'Quién es responsable' },
      body: {
        en: 'Sandbox Innovate LLC, Albuquerque, New Mexico, United States, is responsible for the personal data described here. Questions or requests: {email}.',
        es: 'Sandbox Innovate LLC, con sede en Albuquerque, Nuevo México, Estados Unidos, es responsable de los datos personales que se describen aquí. Preguntas o solicitudes: {email}.',
      },
    },
    {
      title: { en: 'What we collect', es: 'Qué datos recopilamos' },
      list: {
        en: [
          'Contact form: name, work email, company, role, website, company size, region, preferred call language, the services you selected, what you want to achieve and how you heard about us. If you came from the ROI estimate or the AI diagnostic, the figures you chose to attach.',
          'AI diagnostic: your answers and score. If you ask for the full report, also your name, work email, company and role.',
          'Newsletter: your email address.',
          'With every form: the page you sent it from, the page that referred you, the language, the time and your time zone, and the page and campaign tags (utm_*) your visit started with, if any.',
        ],
        es: [
          'Formulario de contacto: nombre, correo de trabajo, empresa, cargo, sitio web, tamaño de la empresa, región, idioma de la llamada, los servicios que elegiste, lo que quieres lograr y cómo nos conociste. Si llegaste desde la estimación de ROI o el diagnóstico de IA, los datos que decidiste adjuntar.',
          'Diagnóstico de IA: tus respuestas y tu puntaje. Si pides el reporte completo, también tu nombre, correo de trabajo, empresa y cargo.',
          'Newsletter: tu correo electrónico.',
          'Con cada formulario: la página desde la que lo enviaste, la página que te trajo, el idioma, la hora y tu zona horaria, y la página y las etiquetas de campaña (utm_*) con las que empezó tu visita, si las hay.',
        ],
      },
    },
    {
      title: { en: 'What we don’t collect', es: 'Qué no recopilamos' },
      body: {
        en: 'This site uses no advertising or analytics cookies and loads no third-party tracking scripts. Form drafts, diagnostic answers and calculator inputs are saved only in your browser’s storage so you don’t lose your progress. They are not sent to us unless you submit a form.',
        es: 'Este sitio no usa cookies de publicidad ni de analítica y no carga scripts de seguimiento de terceros. Los borradores de formularios, las respuestas del diagnóstico y los datos de la calculadora se guardan solo en el almacenamiento de tu navegador para que no pierdas tu avance. No nos llegan a menos que envíes un formulario.',
      },
    },
    {
      title: { en: 'Why we use it', es: 'Para qué los usamos' },
      body: {
        en: 'To reply to your request and prepare the call, to send the report you asked for, and to send the newsletter if you subscribed. We don’t sell your data or use it to train AI models.',
        es: 'Para responder tu solicitud y preparar la llamada, enviarte el reporte que pediste y enviarte la newsletter si te suscribiste. No vendemos tus datos ni los usamos para entrenar modelos de IA.',
      },
    },
    {
      title: { en: 'Who else sees it', es: 'Quién más los ve' },
      body: {
        en: 'Form submissions reach us through a service provider that processes them on our behalf and only for this purpose. We share data with authorities only when the law requires it.',
        es: 'Los formularios nos llegan a través de un proveedor de servicios que los procesa en nuestro nombre y solo para este fin. Solo compartimos datos con autoridades cuando la ley lo exige.',
      },
    },
    {
      title: { en: 'How long we keep it', es: 'Cuánto tiempo los guardamos' },
      body: {
        en: 'Requests and diagnostic reports: as long as we need them to reply and, if we work together, for the length of the relationship. Newsletter: until you unsubscribe. You can ask us to delete your data at any time.',
        es: 'Solicitudes y reportes del diagnóstico: el tiempo necesario para responderte y, si trabajamos juntos, mientras dure la relación. Newsletter: hasta que te des de baja. Puedes pedirnos que borremos tus datos en cualquier momento.',
      },
    },
    {
      title: { en: 'Your rights', es: 'Tus derechos' },
      body: {
        en: 'You can ask to access, correct, export or delete your data, object to its use or withdraw your consent by writing to {email}. If you are in the European Union or Latin America, you can also file a complaint with your local data protection authority.',
        es: 'Puedes pedir acceso, corrección, copia o eliminación de tus datos, oponerte a su uso o retirar tu consentimiento escribiendo a {email}. Si estás en la Unión Europea o en Latinoamérica, también puedes presentar un reclamo ante la autoridad de protección de datos de tu país.',
      },
    },
    {
      title: { en: 'Where it is processed', es: 'Dónde se procesan' },
      body: {
        en: 'We are based in the United States, so your data is processed there.',
        es: 'Estamos en Estados Unidos, por lo que tus datos se procesan allí.',
      },
    },
    {
      title: { en: 'Changes', es: 'Cambios' },
      body: {
        en: 'If we change this policy, we will update this page and the date above.',
        es: 'Si cambiamos esta política, actualizaremos esta página y la fecha de arriba.',
      },
    },
  ] as PrivacySection[],
};
