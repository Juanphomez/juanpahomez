/**
 * Talks and workshops. Audience-first topics, no buzzwords.
 */

export type Talk = {
  id: string;
  title: string;
  description: string;
  audience: string;
};

export const talks: readonly Talk[] = [
  {
    id: 'ia-contadores',
    title: 'IA para contadores',
    description:
      'Cómo usar inteligencia artificial de manera práctica en el trabajo financiero y contable: análisis, documentación, reportes e investigación.',
    audience: 'Equipos financieros y contables',
  },
  {
    id: 'data-storytelling',
    title: 'Data storytelling',
    description:
      'Cómo transformar un análisis en una historia que permita tomar decisiones, no solo en un gráfico más.',
    audience: 'Analistas y equipos de datos',
  },
  {
    id: 'presentaciones',
    title: 'Presentaciones ejecutivas',
    description:
      'Cómo comunicar información financiera y compleja ante gerencia, comités y directivos.',
    audience: 'Gerencia media y líderes de área',
  },
  {
    id: 'automatizacion-aplicada',
    title: 'Automatización aplicada',
    description:
      'Cómo identificar qué procesos realmente vale la pena automatizar — y cuáles conviene primero simplificar.',
    audience: 'Operación, finanzas y procesos',
  },
] as const;

/** Training already delivered — capabilities, not a claim about audiences. */
export const trainingTopics: readonly string[] = ['R', 'SQL', 'Data Studio', 'Sheets', 'Excel'];
