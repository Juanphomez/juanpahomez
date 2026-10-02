/**
 * Five capabilities, not twenty services. Each one answers a business
 * problem first and names technology second.
 */

/**
 * A piece of supporting material attached to a service: a recorded talk, a
 * webinar, a business case, a dashboard. Leave `url` out while something is
 * still in preparation — the card then says so instead of linking nowhere.
 *
 * Nothing is listed here yet. Adding one is a data change, not a code change.
 */
export type ServiceResource = {
  kind: 'video' | 'webinar' | 'caso' | 'tablero' | 'articulo';
  title: string;
  /** Omit while unpublished. */
  url?: string;
  /** e.g. "42 min", "2024". Shown beside the title when present. */
  meta?: string;
};

export type Service = {
  id: string;
  /** Display index — part of the editorial composition. */
  index: string;
  /** Short name, used in navigation. */
  name: string;
  /** Conceptual headline. */
  headline: string;
  /** Two short paragraphs maximum. */
  body: readonly string[];
  /** Concrete deliverables — proof that this is real work, not a promise. */
  examples: readonly string[];
  /** Intent-specific CTA label. */
  cta: string;
  /** Future dedicated route. */
  slug: string;
  /** Talks, webinars, cases and dashboards. Empty until there is real material. */
  resources: readonly ServiceResource[];
};

export const services: readonly Service[] = [
  {
    id: 'automatizacion',
    index: '01',
    name: 'Automatización financiera',
    headline: 'Menos tareas repetitivas. Más tiempo para analizar.',
    body: [
      'Reviso cómo funciona realmente un proceso financiero o contable para identificar qué puede eliminarse, simplificarse, automatizarse o integrarse. En ese orden.',
      'No asumo que todo necesita software. A veces la mejor solución es una fórmula bien construida; a veces es una integración por API. Depende del problema.',
    ],
    examples: [
      'Conciliaciones',
      'Cierres y reportes recurrentes',
      'Facturación electrónica',
      'Procesamiento de archivos',
      'Controles y validaciones',
      'Integraciones por API',
      'Google Workspace y Apps Script',
      'Flujos administrativos internos',
    ],
    cta: 'Explorar automatización',
    slug: 'automatizacion',
    resources: [],
  },
  {
    id: 'datos',
    index: '02',
    name: 'Datos & Business Intelligence',
    headline: 'Tener datos no significa entender el negocio.',
    body: [
      'Construyo sistemas de información que ayudan a tomar mejores decisiones: desde el origen del dato hasta el indicador que alguien mira para decidir.',
      'El objetivo no es un tablero más. Es pasar de reportar números a explicar qué significan: por qué cambió, desde cuándo, qué área lo explica y qué debería hacer la gerencia.',
    ],
    examples: [
      'Análisis de rentabilidad y márgenes',
      'Estados financieros y cuentas contables',
      'Modelos de costos',
      'Flujo de caja y presupuestos',
      'Comportamiento de clientes y productos',
      'Reporting gerencial',
      'SQL · Python · R',
      'Looker Studio · Power BI · ETL',
    ],
    cta: 'Convertir datos en decisiones',
    slug: 'datos-bi',
    resources: [],
  },
  {
    id: 'producto',
    index: '03',
    name: 'Producto & transformación digital',
    headline: 'Una buena idea necesita convertirse en algo que funcione.',
    body: [
      'Acompaño la estructuración de productos y soluciones digitales: entender el problema, definir la solución, construir un MVP, medirlo y hacerlo evolucionar.',
      'Y lo evalúo también desde las finanzas: costos, ingresos, márgenes, pricing, punto de equilibrio y escenarios. Un producto tiene que tener sentido operativo, tecnológico, financiero y comercial.',
    ],
    examples: [
      'Discovery y definición del problema',
      'Diseño de solución y MVP',
      'Roadmap y priorización por impacto',
      'Reglas de negocio y requerimientos',
      'Modelo de negocio y pricing',
      'Modelo financiero y viabilidad',
      'APIs e integraciones',
      'Indicadores, operación y medición',
    ],
    cta: 'Construir un producto',
    slug: 'producto',
    resources: [],
  },
  {
    id: 'web',
    index: '04',
    name: 'Web & presencia digital',
    headline: 'Una página debería hacer algo más que verse bien.',
    body: [
      'Construyo activos digitales que pueden medirse y mejorarse. Una web no es una pieza de diseño: es un canal que debería traer oportunidades y dejar datos.',
      'Al final tienes que poder responder preguntas concretas: cuántas personas llegan, de dónde vienen, qué contenido funciona y qué convierte.',
    ],
    examples: [
      'UX/UI y desarrollo responsive',
      'SEO técnico',
      'Analytics y Search Console',
      'Eventos y conversiones',
      'Performance y Core Web Vitals',
      'Formularios e integraciones',
      'Dashboard de resultados',
      'Estrategia de contenido',
    ],
    cta: 'Crear mi presencia digital',
    slug: 'desarrollo-web',
    resources: [],
  },
  {
    id: 'formacion',
    index: '05',
    name: 'Formación & conferencias',
    headline: 'Tecnología útil para profesionales reales.',
    body: [
      'Diseño charlas y talleres para empresas, universidades y equipos que quieren aplicar tecnología, datos e inteligencia artificial en su trabajo del día a día.',
      'Sin promesas exageradas: casos concretos, herramientas que ya tienen y criterio para decidir qué vale la pena cambiar.',
    ],
    examples: [
      'IA para contadores',
      'Data storytelling',
      'Presentaciones ejecutivas',
      'Automatización aplicada',
      'Contabilidad basada en datos',
      'Producto y finanzas',
      'Formación empresarial',
      'Formación universitaria',
    ],
    cta: 'Invítame a una conferencia',
    slug: 'formacion',
    resources: [],
  },
] as const;
