'use client';

import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  /** Direction of the entrance. 'up' is the default workhorse. */
  from?: 'up' | 'left' | 'scale';
  /** Stagger delay in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
  threshold?: number;
  /**
   * Shortens the entrance. Use above the fold: the browser does not count an
   * element at opacity 0 as painted, so a long fade there delays LCP.
   */
  fast?: boolean;
};

/**
 * Fades and translates its children in once they enter the viewport.
 *
 * The animation lives entirely in CSS (see styles/motion.css) and is gated on
 * [data-js='on'], so content is visible without JavaScript and the movement
 * disappears under prefers-reduced-motion.
 */
export function Reveal({
  children,
  from = 'up',
  delay = 0,
  as: Tag = 'div',
  className,
  threshold = 0,
  fast = false,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold });

  const style: React.CSSProperties = {};
  if (delay) (style as Record<string, string>)['--reveal-delay'] = `${delay}ms`;
  if (fast) (style as Record<string, string>)['--reveal-duration'] = 'var(--t-reveal-fast)';

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      data-reveal={from === 'up' ? '' : from}
      data-revealed={inView ? 'true' : 'false'}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </Tag>
  );
}
