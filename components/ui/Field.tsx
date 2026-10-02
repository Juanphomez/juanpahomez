'use client';

import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Alert } from './Icon';
import styles from './Field.module.css';

type BaseProps = {
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
};

function useFieldIds(error?: string, hint?: ReactNode) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return { id, errorId, hintId, describedBy };
}

function FieldShell({
  label,
  id,
  optional,
  error,
  errorId,
  hint,
  hintId,
  children,
}: BaseProps & {
  id: string;
  errorId: string;
  hintId: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {optional ? <span className={styles.optional}>Opcional</span> : null}
      </div>

      {children}

      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}

      {/* Errors announce themselves as they appear, and pair the colour with
          an icon and text so colour is never the only signal. */}
      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          <Alert size={14} className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = BaseProps & Omit<ComponentPropsWithoutRef<'input'>, 'id'>;

export function TextField({ label, error, hint, optional, className, ...rest }: InputProps) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint);

  return (
    <FieldShell
      label={label}
      id={id}
      optional={optional}
      error={error}
      errorId={errorId}
      hint={hint}
      hintId={hintId}
    >
      <input
        {...rest}
        id={id}
        className={cn(styles.control, className)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
      />
    </FieldShell>
  );
}

type TextAreaProps = BaseProps & Omit<ComponentPropsWithoutRef<'textarea'>, 'id'>;

export function TextAreaField({
  label,
  error,
  hint,
  optional,
  className,
  ...rest
}: TextAreaProps) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint);

  return (
    <FieldShell
      label={label}
      id={id}
      optional={optional}
      error={error}
      errorId={errorId}
      hint={hint}
      hintId={hintId}
    >
      <textarea
        {...rest}
        id={id}
        className={cn(styles.control, styles.textarea, className)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
      />
    </FieldShell>
  );
}

type SelectProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'select'>, 'id'> & {
    options: readonly string[];
    placeholder?: string;
  };

export function SelectField({
  label,
  error,
  hint,
  optional,
  options,
  placeholder = 'Selecciona una opción',
  className,
  ...rest
}: SelectProps) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint);

  return (
    <FieldShell
      label={label}
      id={id}
      optional={optional}
      error={error}
      errorId={errorId}
      hint={hint}
      hintId={hintId}
    >
      <div className={styles.selectWrap}>
        <select
          {...rest}
          id={id}
          className={cn(styles.control, styles.select, className)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className={styles.selectArrow}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}

/** Bot trap. Named like a field a scraper would fill, hidden from everyone else. */
export function Honeypot() {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
