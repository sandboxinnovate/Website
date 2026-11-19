import type { L10n } from '@/i18n';

export interface HeroBrainCopy {
  /** Visually hidden description of the (decorative) canvas. */
  description: string;
  /**
   * Short, plain-language tasks flashed next to active nodes, so a business owner can read what
   * the "brain" is doing at a glance (no code-style job names). Keep them short: they sit in a pill.
   */
  ops: readonly string[];
}

const OPS_EN = [
  'CRM updated',
  'Lead scored',
  'Answer found',
  'Weekly report ready',
  'Inbox sorted',
  'Ticket routed',
  'Invoice matched',
  'Meeting booked',
  'Brief drafted',
  'Sheet updated',
  'New ad version',
  'Policy checked',
  'New docs learned',
  'Handed to a person',
  'Forecast ready',
  'Post drafted',
  'At-risk client flagged',
  'New hire onboarded',
] as const;

const OPS_ES = [
  'CRM actualizado',
  'Prospecto calificado',
  'Respuesta encontrada',
  'Reporte semanal listo',
  'Correos ordenados',
  'Ticket asignado',
  'Factura conciliada',
  'Reunión agendada',
  'Brief redactado',
  'Planilla actualizada',
  'Nuevo anuncio',
  'Política revisada',
  'Documentos aprendidos',
  'Pasado a una persona',
  'Pronóstico listo',
  'Publicación redactada',
  'Cliente en riesgo',
  'Nuevo ingreso listo',
] as const;

export const HERO_BRAIN_COPY: L10n<HeroBrainCopy> = {
  en: {
    description:
      'Illustration: the Sandbox cube drawn as a network of connected points. Pulses of light travel between them, like AI agents passing work across a company’s tools and knowledge.',
    ops: OPS_EN,
  },
  es: {
    description:
      'Ilustración: el cubo de Sandbox dibujado como una red de puntos conectados. Entre ellos viajan pulsos de luz, como agentes de IA que se pasan el trabajo entre las herramientas y el conocimiento de una empresa.',
    ops: OPS_ES,
  },
};
