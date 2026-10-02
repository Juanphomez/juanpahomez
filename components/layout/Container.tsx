import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  size?: 'content' | 'wide' | 'narrow' | 'full';
  as?: ElementType;
  className?: string;
};

/** The only place horizontal page measure is decided. */
export function Container({
  children,
  size = 'content',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag className={cn(styles.container, size !== 'content' && styles[size], className)}>
      {children}
    </Tag>
  );
}
