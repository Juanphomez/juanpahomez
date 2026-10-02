/**
 * How the work actually happens. The order matters more than the list.
 */

export type MethodStep = {
  index: string;
  title: string;
  question: string;
};

export const methodSteps: readonly MethodStep[] = [
  { index: '01', title: 'Entender', question: '¿Qué está pasando actualmente?' },
  { index: '02', title: 'Mapear', question: '¿Cómo funciona realmente el proceso?' },
  { index: '03', title: 'Medir', question: '¿Dónde están los tiempos, costos, errores y riesgos?' },
  { index: '04', title: 'Diseñar', question: '¿Cómo debería funcionar?' },
  { index: '05', title: 'Construir', question: '¿Qué tecnología necesitamos?' },
  { index: '06', title: 'Validar', question: '¿Realmente funciona?' },
  { index: '07', title: 'Medir', question: '¿Estamos mejorando?' },
  { index: '08', title: 'Iterar', question: '¿Qué debemos ajustar para hacerlo sostenible?' },
] as const;

/** The sequence shown in the problem visualisation, before and after. */
export const processStates = {
  before: {
    label: 'Hoy',
    note: 'Trabajo manual, reprocesos e información fragmentada.',
    steps: ['Excel', 'Correo', 'Archivo', 'Validación', 'Corrección', 'Reporte'],
  },
  after: {
    label: 'Después',
    note: 'Un proceso que se mantiene, se mide y se entiende.',
    steps: ['Datos', 'Automatización', 'Control', 'Información', 'Decisión'],
  },
} as const;
