'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Honeypot, SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { Alert, Check, Spinner } from '@/components/ui/Icon';
import {
  CONTACT_TOPICS,
  EMPTY_PAYLOAD,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactPayload,
  type ContactResponse,
} from '@/lib/contact';
import { AnalyticsEvent, track } from '@/lib/analytics';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import styles from './Contact.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY_PAYLOAD);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const startedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof ContactPayload) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    // The first keystroke is the signal that someone actually engaged.
    if (!startedRef.current) {
      startedRef.current = true;
      track(AnalyticsEvent.contactStart);
    }

    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validateContact(values);
    if (hasErrors(found)) {
      setErrors(found);
      setStatus('idle');
      setMessage('');
      // Move focus to the first field that needs attention.
      const first = Object.keys(found)[0];
      const control = event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`);
      control?.focus();
      return;
    }

    setErrors({});
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as ContactResponse;

      if (data.ok) {
        setStatus('success');
        setValues(EMPTY_PAYLOAD);
        track(AnalyticsEvent.contactSubmit, { tema: values.topic || 'sin especificar' });
        // Announce the confirmation to assistive tech and move focus to it.
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      if (data.code === 'validation') {
        setErrors(data.errors);
        setStatus('idle');
        track(AnalyticsEvent.contactError, { motivo: 'validacion' });
        return;
      }

      setStatus('error');
      setMessage(data.message);
      track(AnalyticsEvent.contactError, { motivo: data.code });
    } catch {
      setStatus('error');
      setMessage(
        `Hubo un problema de conexión. Escríbeme a ${site.email} y lo revisamos.`,
      );
      track(AnalyticsEvent.contactError, { motivo: 'red' });
    }
  };

  if (status === 'success') {
    return (
      <div
        className={styles.feedbackSuccessWrap}
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <h3 className={styles.successTitle}>
          <Check size={22} className={styles.successIcon} />
          Mensaje enviado
        </h3>
        <p className={styles.successBody}>
          Gracias por escribir. Te respondo normalmente dentro de las siguientes 48 horas
          hábiles. Si es urgente, escríbeme directamente a {site.email}.
        </p>
        <Button
          variant="secondary"
          className={styles.again}
          onClick={() => {
            setStatus('idle');
            startedRef.current = false;
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const loading = status === 'loading';

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <TextField
          label="Nombre"
          name="name"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          autoComplete="name"
          required
          disabled={loading}
        />
        <TextField
          label="Empresa"
          name="company"
          value={values.company}
          onChange={update('company')}
          error={errors.company}
          autoComplete="organization"
          optional
          disabled={loading}
        />
      </div>

      <TextField
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        value={values.email}
        onChange={update('email')}
        error={errors.email}
        autoComplete="email"
        required
        disabled={loading}
      />

      <SelectField
        label="¿Qué quieres resolver?"
        name="topic"
        options={CONTACT_TOPICS}
        value={values.topic}
        onChange={update('topic')}
        error={errors.topic}
        optional
        disabled={loading}
      />

      <TextAreaField
        label="Mensaje"
        name="message"
        value={values.message}
        onChange={update('message')}
        error={errors.message}
        hint="Con una descripción corta del proceso o del problema es suficiente."
        rows={5}
        required
        disabled={loading}
      />

      <Honeypot />

      {status === 'error' && message ? (
        <p className={cn(styles.feedback, styles.feedbackError)} role="alert">
          <Alert size={16} className={styles.feedbackIcon} />
          {message}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" size="lg" disabled={loading} trailing={loading ? 'none' : 'right'}>
          {loading ? (
            <>
              <Spinner size={16} className={styles.spinner} />
              Enviando
            </>
          ) : (
            'Enviar'
          )}
        </Button>
        <p className={styles.privacy}>
          Uso tus datos únicamente para responderte. No comparto información con terceros.
        </p>
      </div>
    </form>
  );
}
