import type { L10n } from './index';

/** Shared UI copy (navigation, footer, common CTAs). Page copy lives next to each page/section. */
export const UI = {
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  nav: {
    services: { en: 'Services', es: 'Servicios' },
    method: { en: 'Method', es: 'Método' },
    work: { en: 'Work', es: 'Casos' },
    about: { en: 'About', es: 'Nosotros' },
    blog: { en: 'Blog', es: 'Blog' },
    diagnostic: { en: 'AI Diagnostic', es: 'Diagnóstico de IA' },
    contact: { en: 'Contact', es: 'Contacto' },
    cta: { en: 'Book a call', es: 'Agendar una llamada' },
    menu: { en: 'Menu', es: 'Menú' },
    close: { en: 'Close', es: 'Cerrar' },
    search: { en: 'Search or jump to…', es: 'Buscar o ir a…' },
    language: { en: 'Language', es: 'Idioma' },
    allServices: { en: 'All services', es: 'Todos los servicios' },
    servicesIntro: {
      en: 'Six ways we put AI to work, from a single agent to an AI-native company.',
      es: 'Seis formas de poner la IA a trabajar, desde un solo agente hasta una empresa nativa en IA.',
    },
  },
  cta: {
    primary: { en: 'Book a call', es: 'Agendar una llamada' },
    diagnostic: { en: 'Take the AI diagnostic', es: 'Hacer el diagnóstico de IA' },
    explore: { en: 'Explore', es: 'Explorar' },
    learnMore: { en: 'Learn more', es: 'Ver más' },
  },
  footer: {
    tagline: {
      en: 'We design, build and run AI systems for businesses in the US, Europe and Latin America.',
      es: 'Diseñamos, construimos y operamos sistemas de IA para empresas de Estados Unidos, Europa y Latinoamérica.',
    },
    services: { en: 'Services', es: 'Servicios' },
    company: { en: 'Company', es: 'Empresa' },
    contact: { en: 'Contact', es: 'Contacto' },
    rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
    privacy: { en: 'Privacy', es: 'Privacidad' },
    status: { en: 'Now booking new projects', es: 'Agenda abierta para nuevos proyectos' },
    newsletterTitle: { en: 'Field notes on applied AI', es: 'Notas de campo sobre IA aplicada' },
    newsletterBody: {
      en: 'One email a month. What we built, what broke, what worked.',
      es: 'Un correo al mes. Qué construimos, qué falló, qué funcionó.',
    },
    newsletterPlaceholder: { en: 'you@company.com', es: 'tu@empresa.com' },
    newsletterCta: { en: 'Subscribe', es: 'Suscribirme' },
    newsletterOk: { en: 'You’re in. First note lands next month.', es: 'Listo. La primera nota llega el mes que viene.' },
    newsletterLegal: { en: 'Unsubscribe anytime · ', es: 'Te das de baja cuando quieras · ' },
    newsletterLabel: { en: 'Email', es: 'Correo electrónico' },
    newsletterInvalid: { en: 'Enter a valid email, like name@company.com.', es: 'Escribe un correo válido, por ejemplo nombre@empresa.com.' },
    newsletterFail: { en: 'We couldn’t subscribe you right now. Try again or write to ', es: 'No pudimos suscribirte ahora. Inténtalo de nuevo o escríbenos a ' },
  },
} satisfies Record<string, Record<string, L10n<string>> | L10n<string>>;
