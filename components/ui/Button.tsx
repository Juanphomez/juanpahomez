'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { track, type AnalyticsEventName, type AnalyticsPayload } from '@/lib/analytics';
import { ArrowDown, ArrowRight, ArrowUpRight } from './Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';
type Trailing = 'right' | 'down' | 'external' | 'none';

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing affordance. Decorative — the label still describes the action. */
  trailing?: Trailing;
  /** Stretch to full width on narrow viewports. */
  fluid?: boolean;
  block?: boolean;
  className?: string;
  /** Fires a typed analytics event on activation. */
  event?: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof SharedProps> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof SharedProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const TRAILING_ICONS = {
  right: ArrowRight,
  down: ArrowDown,
  external: ArrowUpRight,
} as const;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    trailing = 'none',
    fluid = false,
    block = false,
    className,
    event,
    eventPayload,
    ...rest
  } = props;

  const classes = cn(
    styles.base,
    styles[variant],
    size !== 'md' && styles[size],
    fluid && styles.fluid,
    block && styles.block,
    className,
  );

  const Trailing = trailing === 'none' ? null : TRAILING_ICONS[trailing];
  const iconSize = size === 'sm' ? 15 : 17;

  const content = (
    <>
      <span>{children}</span>
      {Trailing ? <Trailing size={iconSize} className={styles.icon} /> : null}
    </>
  );

  const handleEvent = () => {
    if (event) track(event, eventPayload);
  };

  if (props.href !== undefined) {
    const { href, onClick, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'> & {
      href: string;
    };
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    const direction = trailing === 'down' ? 'down' : undefined;

    const onAnchorClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      handleEvent();
      onClick?.(e);
    };

    if (isExternal) {
      return (
        <a
          {...anchorRest}
          href={href}
          className={classes}
          data-direction={direction}
          onClick={onAnchorClick}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        {...anchorRest}
        href={href}
        className={classes}
        data-direction={direction}
        onClick={onAnchorClick}
      >
        {content}
      </Link>
    );
  }

  const { onClick, type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;

  return (
    <button
      {...buttonRest}
      type={type}
      className={classes}
      data-direction={trailing === 'down' ? 'down' : undefined}
      onClick={(e) => {
        handleEvent();
        onClick?.(e);
      }}
    >
      {content}
    </button>
  );
}
