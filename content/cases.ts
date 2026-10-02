/**
 * Applied experience. Problem → approach → result.
 * No client names, no confidential architecture, no invented figures.
 */

export type CaseStudy = {
  id: string;
  index: string;
  slug: string;
  eyebrow: string;
  headline: string;
  summary: string;
  /** The shape of the problem, kept non-confidential. */
  problem: string;
  /** How it was approached — this is the differentiator, not the stack. */
  approach: readonly string[];
  /** Headline figures for this case. */
  figures: readonly { value: string; label: string; readAs?: string }[];
  tags: readonly string[];
  cta: string;
};

export const cases: readonly CaseStudy[] = [
  {
    id: 'facturacion-electronica',
    index: '01',
    slug: 'facturacion-electronica',
    eyebrow: 'Automatización · Alto volumen',
    headline: '26 millones de facturas al año.',
    summary:
      'Liderazgo en la definición e implementación de una solución de facturación electrónica capaz de procesar aproximadamente 26 millones de facturas anuales, con ahorros superiores a $380 millones.',
    problem:
      'Un volumen de facturación que ningún proceso manual podía sostener, con requisitos normativos que no admiten errores ni retrasos.',
    approach: [
      'Entender el proceso de emisión de punta a punta antes de elegir proveedor o tecnología',
      'Definir reglas de negocio, validaciones y controles',
      'Integrar con los sistemas contables y con el proveedor por API',
      'Automatizar el procesamiento, almacenamiento y seguimiento',
      'Medir y ajustar sobre operación real',
    ],
    figures: [
      { value: '26M', label: 'facturas al año', readAs: '26 millones de facturas al año' },
      { value: '+$380M', label: 'en ahorros', readAs: 'más de 380 millones en ahorros' },
    ],
    tags: ['Facturación electrónica', 'APIs', 'ERP', 'Automatización'],
    cta: 'Ver caso',
  },
  {
    id: 'lago-datos',
    index: '02',
    slug: 'arquitectura-de-datos',
    eyebrow: 'Datos · Reporting regulatorio',
    headline: 'De cinco días a información disponible desde el día uno.',
    summary:
      'Construcción de un lago de datos financieros orientado a reporting regulatorio, reduciendo el tiempo de disponibilidad de la información de aproximadamente D+5 a D+1.',
    problem:
      'La información existía, pero llegaba tarde. Cuando estaba lista para analizarse, las decisiones ya se habían tomado.',
    approach: [
      'Mapear los orígenes de información y su calidad real',
      'Diseñar la arquitectura de datos y el modelo de reporting',
      'Automatizar la carga y las validaciones',
      'Reducir el ciclo de disponibilidad sin perder trazabilidad',
    ],
    figures: [
      {
        value: 'D+5 → D+1',
        label: 'disponibilidad de información',
        readAs: 'de D más 5 a D más 1',
      },
    ],
    tags: ['Arquitectura de datos', 'SQL', 'Reporting regulatorio', 'ETL'],
    cta: 'Ver caso',
  },
  {
    id: 'producto-fintech',
    index: '03',
    slug: 'producto-fintech',
    eyebrow: 'Producto · Medios de pago',
    headline: 'Productos financieros pensados de punta a punta.',
    summary:
      'Definición y evolución de productos transaccionales B2B de aceptación y dispersión de pagos mediante APIs y canales digitales, contemplando conciliación, liquidación, seguridad, modelos financieros y operación.',
    problem:
      'Un producto transaccional no se diseña solo en la interfaz: tiene que cerrar contablemente, liquidar bien, ser seguro y sostenerse en costos.',
    approach: [
      'Visión y roadmap priorizados por ingresos, costos y eficiencia',
      'Modelos de balance, liquidación y conciliación',
      'APIs, canales digitales y flujos de aprobación',
      'Seguridad y operación financiera',
    ],
    figures: [],
    tags: ['Producto', 'Medios de pago', 'APIs', 'Conciliación', 'Liquidación'],
    cta: 'Conocer experiencia',
  },
] as const;
