/**
 * Tools, grouped by the job they do — never as a wall of logos.
 * The closing line matters more than the list.
 */

export type ToolGroup = {
  id: string;
  label: string;
  items: readonly string[];
};

export const toolGroups: readonly ToolGroup[] = [
  {
    id: 'analisis',
    label: 'Análisis',
    items: ['Python', 'R', 'SQL', 'Excel', 'Google Sheets'],
  },
  {
    id: 'informacion',
    label: 'Información',
    items: ['Power BI', 'Looker Studio', 'Bases de datos', 'Analytics'],
  },
  {
    id: 'construccion',
    label: 'Construcción',
    items: ['APIs', 'Apps Script', 'Automatización', 'IA'],
  },
] as const;

export const toolsClosingLine =
  'Elegimos la tecnología después de entender el problema, no antes.';

/** The words that appear in the brand statement, in order. */
export const statementTools: readonly string[] = [
  'Excel',
  'Sheets',
  'SQL',
  'Python',
  'R',
  'Power BI',
  'Looker Studio',
  'APIs',
  'IA',
  'Automatización',
  'Desarrollo',
] as const;
