'use client';

import { Fragment, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

type LineRevealProps = {
  /**
   * The heading, split into display lines by hand. Splitting at author time
   * rather than measuring at runtime means no layout shift and no flash.
   */
  lines: readonly ReactNode[];
  as?: 'h1' | 'h2' | 'p' | 'div';
  className?: string;
  /** Milliseconds between consecutive lines. */
  stagger?: number;
  delay?: number;
  /** Shortens the entrance. Use above the fold — see Reveal. */
  fast?: boolean;
};

/**
 * Masked line-by-line reveal for display headings: each line slides up from
 * behind its own clipping box. Under reduced motion the lines simply appear.
 */
export function LineReveal({
  lines,
  as: Tag = 'h2',
  className,
  stagger = 90,
  delay = 0,
  fast = false,
}: LineRevealProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>({ threshold: 0 });

  return (
    <Tag ref={ref} className={cn(className)} data-revealed={inView ? 'true' : 'false'}>
      {lines.map((line, index) => (
        // Lines are authored, fixed and ordered — index is a stable key here.
        <Fragment key={index}>
          <span
            className="lineMask"
            style={
              {
                '--reveal-delay': `${delay + index * stagger}ms`,
                ...(fast ? { '--reveal-duration': 'var(--t-reveal-fast)' } : {}),
              } as React.CSSProperties
            }
          >
            <span>{line}</span>
          </span>
          {/* A real space between the lines: without it the heading reads as
              "…problemas realesa resultados…" to screen readers and crawlers.
              Whitespace between block boxes is dropped, so nothing shifts. */}
          {index < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
