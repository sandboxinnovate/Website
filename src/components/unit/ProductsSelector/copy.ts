import type { L10n } from '@/i18n';

export interface Industry {
  id: string;
  code: string;
  name: string;
  pilot: string;
  agents: { name: string; does: string }[];
  connects: string[];
  stays: string[];
}

export interface ProductsCopy {
  bar: string;
  barMeta: string;
  pick: string;
  agentsLabel: string;
  connectsLabel: string;
  staysLabel: string;
  pilotLabel: string;
  status: string;
  cta: (industry: string) => string;
  industries: Industry[];
}

export const COPY: L10n<ProductsCopy> = {
  en: {
    bar: 'Package contents',
    barMeta: 'Early access · contents may change',
    pick: 'Choose an industry',
    agentsLabel: 'Agents included',
    connectsLabel: 'Connects to',
    staysLabel: 'Always stays with your team',
    pilotLabel: 'Pilot',
    status: 'Early access',
    cta: (i) => `Request early access · ${i}`,
    industries: [
      {
        id: 'real-estate', code: 'RE', name: 'Real estate', pilot: '2-3 weeks',
        agents: [
          { name: 'Inquiry responder', does: 'Answers portal and website inquiries in minutes, day or night.' },
          { name: 'Lead qualifier', does: 'Asks about area, timing and property type, then scores and routes the lead.' },
          { name: 'Showing scheduler', does: 'Books showings in the right agent’s calendar and sends reminders.' },
          { name: 'Listing writer', does: 'Drafts listing descriptions from the property details you provide.' },
          { name: 'Follow-up agent', does: 'Keeps cold leads warm with relevant new listings.' },
        ],
        connects: ['CRM', 'Calendar', 'Inbox', 'Listing portals', 'Messaging'],
        stays: ['Pricing advice and negotiation', 'The showings themselves', 'Final say on every listing'],
      },
      {
        id: 'clinics', code: 'CL', name: 'Clinics', pilot: '3-4 weeks',
        agents: [
          { name: 'Booking assistant', does: 'Books, moves and cancels appointments by message.' },
          { name: 'Reminder agent', does: 'Sends reminders and prep instructions before each visit.' },
          { name: 'Front-desk answers', does: 'Answers questions about services, hours, location and coverage.' },
          { name: 'Intake summarizer', does: 'Turns intake forms into a short summary for staff.' },
          { name: 'Waitlist manager', does: 'Offers freed-up slots to the next patient in line.' },
        ],
        connects: ['Calendar', 'Messaging', 'Patient forms', 'Inbox'],
        stays: ['Every clinical question', 'Diagnosis and treatment', 'Exceptions to your policies'],
      },
      {
        id: 'professional-services', code: 'PS', name: 'Professional services', pilot: '3-4 weeks',
        agents: [
          { name: 'Intake agent', does: 'Collects client details and documents, and flags what is missing.' },
          { name: 'Knowledge assistant', does: 'Finds precedents, templates and past work, with sources.' },
          { name: 'Drafting agent', does: 'Produces first drafts of recurring documents from your templates.' },
          { name: 'Meeting notes', does: 'Turns meetings into notes, decisions and action items.' },
          { name: 'Deadline tracker', does: 'Watches key dates and nudges the right person in time.' },
        ],
        connects: ['Document storage', 'Inbox', 'Calendar', 'Practice management'],
        stays: ['Advice to clients', 'Review and sign-off on every document', 'Fees and engagement terms'],
      },
      {
        id: 'e-commerce', code: 'EC', name: 'E-commerce', pilot: '2-3 weeks',
        agents: [
          { name: 'Order support', does: 'Handles order status, returns and exchanges end to end.' },
          { name: 'Product advisor', does: 'Recommends products from your catalog based on what the shopper needs.' },
          { name: 'Cart recovery', does: 'Sends timely, personal follow-ups on abandoned carts.' },
          { name: 'Review summarizer', does: 'Groups reviews and feedback into themes for your team.' },
          { name: 'Escalation agent', does: 'Routes refunds above your limit and upset customers to a person.' },
        ],
        connects: ['Store admin', 'Helpdesk', 'Email', 'Shipping carriers'],
        stays: ['Refunds above your limit', 'Supplier and pricing decisions', 'Brand and promotion calls'],
      },
      {
        id: 'hospitality', code: 'HO', name: 'Hospitality', pilot: '2-3 weeks',
        agents: [
          { name: 'Guest messaging', does: 'Answers guests in their own language, day and night.' },
          { name: 'Reservations', does: 'Handles booking requests, changes and cancellations within your rules.' },
          { name: 'Pre-arrival', does: 'Sends check-in details and offers extras before arrival.' },
          { name: 'Review replies', does: 'Drafts responses to reviews for a manager to approve.' },
          { name: 'Staff handoff', does: 'Passes special requests and issues to the right person on shift.' },
        ],
        connects: ['Reservation system', 'Messaging', 'Inbox', 'Team chat'],
        stays: ['Rates and availability strategy', 'Complaints that need a call', 'Approval of every public reply'],
      },
    ],
  },
  es: {
    bar: 'Contenido del paquete',
    barMeta: 'Acceso anticipado · el contenido puede cambiar',
    pick: 'Elige una industria',
    agentsLabel: 'Agentes incluidos',
    connectsLabel: 'Se conecta a',
    staysLabel: 'Siempre queda en manos de tu equipo',
    pilotLabel: 'Piloto',
    status: 'Acceso anticipado',
    cta: (i) => `Solicitar acceso anticipado · ${i}`,
    industries: [
      {
        id: 'real-estate', code: 'IN', name: 'Inmobiliarias', pilot: '2-3 semanas',
        agents: [
          { name: 'Respuesta a consultas', does: 'Responde consultas de portales y del sitio web en minutos, a cualquier hora.' },
          { name: 'Calificador de leads', does: 'Pregunta por zona, plazo y tipo de propiedad, y luego califica y deriva el lead.' },
          { name: 'Agenda de visitas', does: 'Agenda visitas en el calendario del asesor que corresponde y envía recordatorios.' },
          { name: 'Redactor de fichas', does: 'Redacta descripciones de propiedades a partir de los datos que le das.' },
          { name: 'Seguimiento', does: 'Mantiene activos a los leads fríos con propiedades nuevas que les interesan.' },
        ],
        connects: ['CRM', 'Calendario', 'Correo', 'Portales inmobiliarios', 'Mensajería'],
        stays: ['Asesoría de precio y negociación', 'Las visitas en sí', 'La última palabra en cada ficha'],
      },
      {
        id: 'clinics', code: 'CL', name: 'Clínicas', pilot: '3-4 semanas',
        agents: [
          { name: 'Asistente de citas', does: 'Reserva, cambia y cancela citas por mensaje.' },
          { name: 'Recordatorios', does: 'Envía recordatorios e indicaciones antes de cada consulta.' },
          { name: 'Respuestas de recepción', does: 'Responde sobre servicios, horarios, ubicación y coberturas.' },
          { name: 'Resumen de admisión', does: 'Convierte los formularios de admisión en un resumen breve para el equipo.' },
          { name: 'Lista de espera', does: 'Ofrece los horarios liberados al siguiente paciente en espera.' },
        ],
        connects: ['Calendario', 'Mensajería', 'Formularios de pacientes', 'Correo'],
        stays: ['Toda pregunta clínica', 'Diagnóstico y tratamiento', 'Excepciones a tus políticas'],
      },
      {
        id: 'professional-services', code: 'SP', name: 'Servicios profesionales', pilot: '3-4 semanas',
        agents: [
          { name: 'Admisión de clientes', does: 'Reúne datos y documentos del cliente y marca lo que falta.' },
          { name: 'Asistente de conocimiento', does: 'Encuentra antecedentes, plantillas y trabajos anteriores, con fuentes.' },
          { name: 'Redacción', does: 'Prepara primeros borradores de documentos recurrentes con tus plantillas.' },
          { name: 'Notas de reunión', does: 'Convierte reuniones en notas, decisiones y tareas.' },
          { name: 'Control de plazos', does: 'Vigila las fechas clave y avisa a tiempo a la persona indicada.' },
        ],
        connects: ['Almacenamiento de documentos', 'Correo', 'Calendario', 'Gestión de casos'],
        stays: ['El asesoramiento a clientes', 'Revisión y firma de cada documento', 'Honorarios y condiciones'],
      },
      {
        id: 'e-commerce', code: 'EC', name: 'E-commerce', pilot: '2-3 semanas',
        agents: [
          { name: 'Soporte de pedidos', does: 'Resuelve estado de pedidos, devoluciones y cambios de punta a punta.' },
          { name: 'Asesor de productos', does: 'Recomienda productos de tu catálogo según lo que necesita cada cliente.' },
          { name: 'Recuperación de carritos', does: 'Envía seguimientos oportunos y personales a carritos abandonados.' },
          { name: 'Resumen de reseñas', does: 'Agrupa reseñas y comentarios por tema para tu equipo.' },
          { name: 'Derivación', does: 'Deriva a una persona los reembolsos sobre tu límite y los clientes molestos.' },
        ],
        connects: ['Admin de tienda', 'Mesa de ayuda', 'Email', 'Transportistas'],
        stays: ['Reembolsos sobre tu límite', 'Decisiones de proveedores y precios', 'Marca y promociones'],
      },
      {
        id: 'hospitality', code: 'HO', name: 'Hotelería', pilot: '2-3 semanas',
        agents: [
          { name: 'Mensajería con huéspedes', does: 'Responde a cada huésped en su idioma, a cualquier hora.' },
          { name: 'Reservas', does: 'Gestiona solicitudes, cambios y cancelaciones dentro de tus reglas.' },
          { name: 'Antes de la llegada', does: 'Envía los datos de check-in y ofrece extras antes de la llegada.' },
          { name: 'Respuesta a reseñas', does: 'Redacta respuestas a reseñas para que las apruebe un responsable.' },
          { name: 'Derivación al equipo', does: 'Pasa pedidos especiales e incidencias a la persona de turno.' },
        ],
        connects: ['Sistema de reservas', 'Mensajería', 'Correo', 'Chat del equipo'],
        stays: ['Estrategia de tarifas y disponibilidad', 'Reclamos que requieren una llamada', 'Aprobación de cada respuesta pública'],
      },
    ],
  },
};
