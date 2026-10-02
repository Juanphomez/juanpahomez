'use client';

import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/cn';
import type { Metric as MetricData } from '@/content/metrics';
import styles from './Metric.module.css';

type MetricProps = {
  metric: MetricData;
  size?: 'md' | 'sm';
  /** Uses the fuller caption instead of the short label. */
  caption?: boolean;
  wideLabel?: boolean;
  marked?: boolean;
  className?: string;
  /** Delay before the count begins, to stagger a row of figures. */
  delay?: number;
};

/**
 * A single figure. The visible number animates; the accessible reading is
 * always the final, unambiguous value, so assistive tech never hears a
 * partial count.
 */
export function Metric({
  metric,
  size = 'md',
  caption = false,
  wideLabel = false,
  marked = false,
  className,
  delay = 0,
}: MetricProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0 });
  const numeric = metric.value ?? 0;
  const animated = useCountUp(numeric, inView, 1300 + delay);
  const isText = metric.value === null;

  return (
    <div
      ref={ref}
      className={cn(styles.metric, size === 'sm' && styles.sm, marked && styles.marked, className)}
    >
      <p className={styles.value} data-kind={isText ? 'text' : 'number'} aria-hidden="true">
        {isText ? (
          metric.display
        ) : (
          <>
            {metric.prefix ? (
              <span className={cn(styles.affix, styles.prefix)}>{metric.prefix}</span>
            ) : null}
            <span>{Math.round(animated).toLocaleString('es-CO')}</span>
            {metric.suffix ? (
              <span className={cn(styles.affix, styles.suffix)}>{metric.suffix}</span>
            ) : null}
          </>
        )}
      </p>
      <p className={cn(styles.label, wideLabel && styles.labelWide)}>
        <span className="sr-only">{metric.readAs}. </span>
        {caption ? metric.caption : metric.label}
      </p>
    </div>
  );
}
