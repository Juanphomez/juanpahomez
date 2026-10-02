import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import {
  EMPTY_PAYLOAD,
  hasErrors,
  validateContact,
  type ContactPayload,
  type ContactResponse,
} from '@/lib/contact';

/**
 * Receives a contact submission, validates it again on the server and forwards
 * it through whichever channel is configured:
 *
 *   CONTACT_WEBHOOK_URL  — POSTs the submission as JSON (Zapier, Make, n8n…)
 *   RESEND_API_KEY       — sends the email through Resend's HTTP API
 *   CONTACT_TO_EMAIL     — recipient; defaults to the address in content/site
 *   CONTACT_FROM_EMAIL   — verified sender, required by Resend
 *
 * With none of them set it answers 503 and the form tells the visitor to write
 * directly, instead of pretending the message was delivered.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Very small in-memory throttle: enough to stop a careless script. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);

  // Keep the map from growing without bound in a long-lived process.
  if (recent.size > 500) {
    for (const [k, times] of recent) {
      if (times.every((time) => now - time > WINDOW_MS)) recent.delete(k);
    }
  }

  return hits.length > MAX_PER_WINDOW;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function buildEmail(payload: ContactPayload) {
  const company = payload.company.trim();
  const lines = [
    `Nombre:  ${payload.name.trim()}`,
    company ? `Empresa: ${company}` : null,
    `Email:   ${payload.email.trim()}`,
    payload.topic ? `Tema:    ${payload.topic}` : null,
    '',
    payload.message.trim(),
  ].filter((line): line is string => line !== null);

  return {
    subject: `Nuevo mensaje de ${payload.name.trim()}${company ? ` (${company})` : ''}`,
    text: lines.join('\n'),
  };
}

async function deliver(payload: ContactPayload): Promise<'sent' | 'unconfigured' | 'failed'> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    });
    return response.ok ? 'sent' : 'failed';
  }

  if (resendKey) {
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    if (!from) return 'unconfigured';

    const { subject, text } = buildEmail(payload);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email.trim(),
        subject,
        text,
      }),
    });
    return response.ok ? 'sent' : 'failed';
  }

  return 'unconfigured';
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        code: 'rate_limit',
        message: 'Has enviado varios mensajes seguidos. Intenta de nuevo en unos minutos.',
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: 'delivery', message: 'No pude leer el formulario.' },
      { status: 400 },
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // A hidden field real people never fill in.
  if (asString(raw.website).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const payload: ContactPayload = {
    ...EMPTY_PAYLOAD,
    name: asString(raw.name),
    company: asString(raw.company),
    email: asString(raw.email),
    topic: asString(raw.topic),
    message: asString(raw.message),
  };

  const errors = validateContact(payload);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, code: 'validation', errors }, { status: 422 });
  }

  let result: Awaited<ReturnType<typeof deliver>>;
  try {
    result = await deliver(payload);
  } catch (error) {
    console.error('[contacto] delivery threw', error);
    result = 'failed';
  }

  if (result === 'sent') {
    return NextResponse.json({ ok: true });
  }

  if (result === 'unconfigured') {
    console.warn(
      '[contacto] No delivery channel configured. Set CONTACT_WEBHOOK_URL or RESEND_API_KEY + CONTACT_FROM_EMAIL.',
    );
    return NextResponse.json(
      {
        ok: false,
        code: 'unconfigured',
        message: `El formulario todavía no está conectado. Escríbeme directamente a ${site.email}.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: 'delivery',
      message: `No pude enviar el mensaje. Escríbeme a ${site.email} y lo resolvemos.`,
    },
    { status: 502 },
  );
}
