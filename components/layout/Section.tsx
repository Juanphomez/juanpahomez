import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

type SectionProps = {
  children: ReactNode;
  id?: string;
  /**
   * Declares the colour context. Every descendant resolves --fg, --rule,
   * --btn-* and the rest from here, so no component needs light/dark logic.
   */
  surface?: 'paper' | 'sunken' | 'deep';
  /** Vertical rhythm. Sections deliberately differ to vary the pace. */
  space?: 'default' | 'tight' | 'loose' | 'flush';
  ruled?: 'top' | 'bottom' | 'both' | 'none';
  /** Faint vertical grid. Use sparingly. */
  grid?: boolean;
  /** Accessible name for the landmark, when no visible heading suits. */
  label?: string;
  labelledBy?: string;
  className?: string;
};

export function Section({
  children,
  id,
  surface = 'paper',
  space = 'default',
  ruled = 'none',
  grid = false,
  label,
  labelledBy,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn(
        styles.section,
        space !== 'default' && styles[space],
        (ruled === 'top' || ruled === 'both') && styles.ruledTop,
        (ruled === 'bottom' || ruled === 'both') && styles.ruledBottom,
        grid && styles.grid,
        className,
      )}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
}
