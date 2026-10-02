/**
 * Insights. Structured for a future CMS: the shape here is the shape the
 * CMS should return, so swapping the source changes nothing downstream.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  readingTime: string;
  /** ISO date, or null while unpublished. */
  publishedAt: string | null;
  status: 'published' | 'draft';
};

export const articles: readonly Article[] = [
  {
    slug: 'la-automatizacion-empieza-antes-de-escribir-codigo',
    title: 'La automatización empieza antes de escribir código',
    excerpt:
      'Automatizar un proceso que nadie entiende solo hace que los errores ocurran más rápido.',
    topic: 'Automatización',
    readingTime: '6 min',
    publishedAt: null,
    status: 'draft',
  },
  {
    slug: 'por-que-un-dashboard-no-mejora-las-decisiones',
    title: 'Por qué un dashboard no necesariamente mejora las decisiones',
    excerpt:
      'Un tablero muestra qué pasó. Decidir requiere entender por qué pasó y qué hacer al respecto.',
    topic: 'Datos',
    readingTime: '7 min',
    publishedAt: null,
    status: 'draft',
  },
  {
    slug: 'ia-para-contadores-donde-genera-valor',
    title: 'IA para contadores: dónde realmente puede generar valor',
    excerpt:
      'Menos promesas y más casos concretos: dónde la IA ayuda hoy en el trabajo contable y dónde todavía no.',
    topic: 'Inteligencia artificial',
    readingTime: '8 min',
    publishedAt: null,
    status: 'draft',
  },
  {
    slug: 'como-presentar-informacion-financiera-a-un-comite',
    title: 'Cómo presentar información financiera a un comité directivo',
    excerpt:
      'La información no cambia. Lo que cambia es qué decisión le estás pidiendo a quien escucha.',
    topic: 'Comunicación',
    readingTime: '5 min',
    publishedAt: null,
    status: 'draft',
  },
  {
    slug: 'cuando-excel-deja-de-ser-suficiente',
    title: 'Cuándo Excel deja de ser suficiente',
    excerpt:
      'Excel casi nunca es el problema. El problema aparece cuando se convierte en la base de datos de la empresa.',
    topic: 'Procesos',
    readingTime: '6 min',
    publishedAt: null,
    status: 'draft',
  },
] as const;
