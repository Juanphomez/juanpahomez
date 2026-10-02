/**
 * A narrative of capabilities, not a CV. Each era adds to the previous one
 * instead of replacing it — that accumulation is the whole point.
 */

export type Era = {
  id: string;
  period: string;
  title: string;
  /** One line explaining what this era added. */
  note: string;
  capabilities: readonly string[];
};

export const eras: readonly Era[] = [
  {
    id: 'contabilidad',
    period: '2017',
    title: 'Contabilidad',
    note: 'El punto de partida: entender cómo se construyen los números.',
    capabilities: ['Conciliaciones', 'Estados financieros', 'Impuestos', 'Reporting'],
  },
  {
    id: 'automatizacion',
    period: '2018 — 2021',
    title: 'Automatización',
    note: 'Muchos problemas contables eran, en realidad, problemas de proceso.',
    capabilities: ['Excel', 'Google Sheets', 'SQL', 'Procesos financieros'],
  },
  {
    id: 'datos',
    period: '2021 — 2024',
    title: 'Datos',
    note: 'De automatizar tareas a construir información para decidir.',
    capabilities: ['R', 'Business Intelligence', 'Dashboards', 'Arquitectura de información'],
  },
  {
    id: 'producto',
    period: '2025 →',
    title: 'Producto',
    note: 'Diseñar soluciones completas, no funcionalidades aisladas.',
    capabilities: ['Fintech', 'APIs', 'Pagos', 'Productos B2B', 'Modelos transaccionales'],
  },
] as const;

/** Where all of it converges today. */
export const todayLabel = {
  period: 'Hoy',
  title: 'Finanzas + Datos + Tecnología + Producto',
  note: 'Entender un problema desde varias perspectivas antes de resolverlo.',
} as const;

export type Education = {
  institution: string;
  credential: string;
  primary: boolean;
};

export const education: readonly Education[] = [
  {
    institution: 'Universidad La Gran Colombia',
    credential: 'Contador Público',
    primary: true,
  },
  {
    institution: 'California State University San Marcos',
    credential: 'Leadership Management Skills',
    primary: true,
  },
] as const;

/** Complementary training — shown discreetly, never as a certificate wall. */
export const complementaryTraining: readonly string[] = [
  'Data Science',
  'Python',
  'Business Intelligence',
  'Google Data Studio',
  'dplyr',
] as const;
