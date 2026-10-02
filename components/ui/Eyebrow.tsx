import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Eyebrow.module.css';

type EyebrowProps = {
  children: ReactNode;
  /** Leading hairline. Decorative. */
  ruled?: boolean;
  as?: 'p' | 'span' | 'div';
  className?: string;
};

/** Small uppercase label that opens a section. Never a heading element. */
export function Eyebrow({
  children,
  ruled = true,
  as: Tag = 'p',
  className,
}: EyebrowProps) {
  return (
    <Tag
      className={cn(styles.eyebrow, ruled && styles.ruled, className)}
    >
      <span>{children}</span>
    </Tag>
  );
}
