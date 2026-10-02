import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Tag.module.css';

type TagProps = {
  children: ReactNode;
  variant?: 'outline' | 'solid' | 'plain';
  className?: string;
};

export function Tag({ children, variant = 'outline', className }: TagProps) {
  return (
    <span
      className={cn(styles.tag, variant === 'solid' && styles.solid, variant === 'plain' && styles.plain, className)}
    >
      {children}
    </span>
  );
}

type TagListProps = {
  items: readonly string[];
  variant?: 'outline' | 'solid' | 'plain';
  wide?: boolean;
  className?: string;
  /** Describes the set for screen readers, e.g. "Ejemplos". */
  label?: string;
};

/** A real list in the markup — a set of related items, announced as such. */
export function TagList({ items, variant = 'outline', wide = false, className, label }: TagListProps) {
  return (
    <ul className={cn(styles.list, wide && styles.listWide, className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
