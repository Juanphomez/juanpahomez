/**
 * Contact form contract. Shared by the client and the route handler so the
 * two can never disagree about what a valid submission is.
 */

export const CONTACT_TOPICS = [
  'Automatización de procesos',
  'Datos y Business Intelligence',
  'Producto o solución digital',
  'Página web y presencia digital',
  'Conferencia o formación',
  'Todavía no lo tengo claro',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const EMPTY_PAYLOAD: ContactPayload = {
  name: '',
  company: '',
  email: '',
  topic: '',
  message: '',
};

const LIMITS = {
  name: 80,
  company: 120,
  email: 160,
  message: 2000,
} as const;

/**
 * Deliberately permissive: the only email check that matters here is that the
 * address has a plausible shape. Anything stricter rejects valid addresses.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (name.length < 2) {
    errors.name = 'Escribe tu nombre.';
  } else if (name.length > LIMITS.name) {
    errors.name = `Máximo ${LIMITS.name} caracteres.`;
  }

  if (email.length === 0) {
    errors.email = 'Necesito un correo para responderte.';
  } else if (!EMAIL.test(email) || email.length > LIMITS.email) {
    errors.email = 'Revisa el correo: parece incompleto.';
  }

  if (payload.company.trim().length > LIMITS.company) {
    errors.company = `Máximo ${LIMITS.company} caracteres.`;
  }

  if (payload.topic.length > 0 && !CONTACT_TOPICS.includes(payload.topic as ContactTopic)) {
    errors.topic = 'Selecciona una de las opciones.';
  }

  if (message.length < 10) {
    errors.message = 'Cuéntame un poco más: con dos líneas es suficiente.';
  } else if (message.length > LIMITS.message) {
    errors.message = `Máximo ${LIMITS.message} caracteres.`;
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; code: 'validation'; errors: ContactErrors }
  | { ok: false; code: 'unconfigured' | 'delivery' | 'rate_limit'; message: string };
