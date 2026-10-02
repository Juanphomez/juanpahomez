/**
 * Verified results only. Every figure here traces back to documented
 * professional experience — nothing is estimated, rounded up or invented.
 */

export type Metric = {
  id: string;
  /** Numeric part, animated when it can be counted. */
  value: number | null;
  /** Rendered verbatim when `value` is null (e.g. a transition). */
  display?: string;
  prefix?: string;
  suffix?: string;
  /** Short label for the hero composition. */
  label: string;
  /** Fuller label for the results band. */
  caption: string;
  /** Accessible, unambiguous reading of the figure. */
  readAs: string;
};

export const metrics: readonly Metric[] = [
  {
    id: 'facturas',
    value: 26,
    suffix: 'M',
    label: 'facturas / año',
    caption: 'Facturas procesadas al año',
    readAs: '26 millones de facturas al año',
  },
  {
    id: 'ahorros',
    value: 380,
    prefix: '+$',
    suffix: 'M',
    label: 'en ahorros',
    caption: 'Ahorros generados',
    readAs: 'Más de 380 millones en ahorros',
  },
  {
    id: 'disponibilidad',
    value: null,
    display: 'D+5 → D+1',
    label: 'disponibilidad de información',
    caption: 'Disponibilidad de información',
    readAs:
      'Disponibilidad de información reducida de D más 5 a D más 1',
  },
  {
    id: 'experiencia',
    value: 8,
    prefix: '+',
    suffix: ' años',
    label: 'finanzas y tecnología',
    caption: 'Finanzas, datos y fintech',
    readAs: 'Más de 8 años en finanzas, datos y fintech',
  },
] as const;
