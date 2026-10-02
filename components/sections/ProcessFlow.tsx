'use client';

import { processStates } from '@/content/method';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/cn';
import styles from './ProcessFlow.module.css';

/** Fixed vertical offsets that make the manual sequence look provisional. */
const SCATTER = [0, 14, -10, 18, -14, 8];

type SequenceProps = {
  steps: readonly string[];
  variant: 'before' | 'after';
  scattered?: boolean;
};

function Sequence({ steps, variant, scattered = false }: SequenceProps) {
  return (
    <ol className={cn(styles.sequence, styles[variant])}>
      {steps.map((step, index) => (
        <li
          key={step}
          className={styles.step}
          style={
            scattered
              ? ({ '--scatter': `${SCATTER[index % SCATTER.length]}px` } as React.CSSProperties)
              : undefined
          }
        >
          <span className={styles.chip}>{step}</span>
          {index < steps.length - 1 ? (
            <span className={styles.connector} aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function StateHeader({ state }: { state: 'before' | 'after' }) {
  const data = state === 'before' ? processStates.before : processStates.after;
  return (
    <div className={styles.stateHeader}>
      <p className={styles.stateLabel}>
        <span
          className={cn(styles.dot, state === 'after' && styles.dotAfter)}
          aria-hidden="true"
        />
        {data.label}
      </p>
      <p className={styles.stateNote}>{data.note}</p>
    </div>
  );
}

/** Both states, laid out plainly. Used on small screens and under reduced motion. */
function StaticFlow() {
  return (
    <div className={styles.static}>
      <div className={cn(styles.staticPanel, styles.before)}>
        <StateHeader state="before" />
        <Sequence steps={processStates.before.steps} variant="before" />
        <p className={styles.loop}>
          <span className={styles.loopLine} aria-hidden="true" />
          Reproceso
        </p>
      </div>

      <div className={cn(styles.staticPanel, styles.after)}>
        <StateHeader state="after" />
        <Sequence steps={processStates.after.steps} variant="after" />
        <p className={styles.outcome}>
          <span className={styles.outcomeLine} aria-hidden="true" />
          Sostenible
        </p>
      </div>
    </div>
  );
}

/**
 * The problem, drawn. Scrolling past the stage reorganises one sequence from
 * fragmented manual work into a process that holds together.
 *
 * Both states are always in the DOM, so assistive tech and users without
 * JavaScript read the full comparison. Below 60rem — and whenever the user
 * asks for reduced motion — the sticky morph is replaced by the static layout,
 * because a sticky stage on a small screen costs more than it explains.
 */
export function ProcessFlow() {
  const prefersReduced = usePrefersReducedMotion();
  const wide = useMediaQuery('(min-width: 60rem)');
  const [ref, progress] = useScrollProgress<HTMLDivElement>();

  if (prefersReduced || !wide) {
    return (
      <div className={styles.track}>
        <StaticFlow />
      </div>
    );
  }

  // Eased so the crossfade lands in the middle of the scroll, not at the edges.
  const eased = progress * progress * (3 - 2 * progress);

  return (
    <div
      ref={ref}
      className={cn(styles.track, styles.animatedTrack)}
      style={{ '--p': eased } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={styles.layers}>
          <div
            className={cn(styles.layer, styles.layerBefore, styles.before)}
            data-hidden={eased > 0.6 ? 'true' : 'false'}
          >
            <StateHeader state="before" />
            <Sequence steps={processStates.before.steps} variant="before" scattered />
            <p className={styles.loop}>
              <span className={styles.loopLine} aria-hidden="true" />
              Reproceso
            </p>
          </div>

          <div
            className={cn(styles.layer, styles.layerAfter, styles.after)}
            data-hidden={eased < 0.42 ? 'true' : 'false'}
          >
            <StateHeader state="after" />
            <Sequence steps={processStates.after.steps} variant="after" />
            <p className={styles.outcome}>
              <span className={styles.outcomeLine} aria-hidden="true" />
              Sostenible
            </p>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}
