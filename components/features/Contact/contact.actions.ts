'use server';

import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { checkRateLimitFromHeaders } from '@/lib/rate-limit';
import { contactSchema, type ContactSchema } from './contact.schema';

type ContactResult =
  | { success: true }
  | { success: false; error: string; field?: 'form' };

export async function submitContact(
  data: ContactSchema,
): Promise<ContactResult> {
  // Check rate limit
  const rateLimit = checkRateLimitFromHeaders(headers());
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: rateLimit.error,
      field: 'form',
    };
  }

  // Server-side validation (defense in depth - should not fail if client validation works)
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Datos inválidos. Por favor, verificá el formulario.',
      field: 'form',
    };
  }

  // Verify turnstile token
  const isTurnstileValid = await verifyTurnstileToken(
    data.turnstileToken || '',
  );
  if (!isTurnstileValid) {
    return {
      success: false,
      error:
        'El token de verificación es inválido. Por favor, intentá nuevamente.',
      field: 'form',
    };
  }

  // Build and send email
  const { subject, html } = buildContactEmail(parsed.data);
  const { error } = await sendEmail({
    replyTo: parsed.data.email,
    subject,
    html,
  });
  if (error) {
    return {
      success: false,
      error,
      field: 'form',
    };
  }
  return { success: true };
}

function buildContactEmail({ name, email, message }: ContactSchema) {
  // Escape HTML to prevent XSS attacks
  const escapeHtml = (text: string | undefined): string => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const escapedBaseUrl = escapeHtml(process.env.NEXT_PUBLIC_BASE_URL || '');

  return {
    subject: `Nuevo mensaje de contacto de ${escapedEmail}`,
    html: `
      <div style="font-family: sans-serif;">
        <p>
          ${escapedName ? `<strong>De:</strong> ${escapedName}<br/>` : ''}
          <strong>Correo electrónico:</strong> ${escapedEmail}<br/>
          <strong>Mensaje:</strong><br/>
          ${escapedMessage}
        </p>
        <hr style="margin:10px 0;border:none;border-bottom:1px solid grey">
        <p style="color: grey; font-size: 0.7rem; text-align: center;">
          Este mensaje fue enviado desde el formulario de contacto de ${escapedBaseUrl}
        </p>
      </div>
    `,
  };
}

async function sendEmail({
  replyTo,
  subject,
  html,
}: {
  replyTo: string;
  subject: string;
  html: string;
}) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return {
      error:
        'El envío no está configurado. Escribinos por nuestras redes sociales.',
    };
  }
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo,
      subject,
      html,
    });

    if (error) {
      console.error(
        `Error sending email from ${RESEND_FROM_EMAIL} to ${RESEND_TO_EMAIL}:`,
        error,
      );
      return {
        error: 'No se pudo enviar. Intentá más tarde.',
      };
    }

    console.log('Email sent successfully to:', RESEND_TO_EMAIL);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      error: 'Ocurrió un error. Intentá más tarde.',
    };
  }
}

/**
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
async function verifyTurnstileWithRetry(
  token: string,
  remoteip: string,
  maxRetries = 3,
): Promise<{ success: boolean }> {
  const { TURNSTILE_SECRET_KEY } = process.env;
  if (!TURNSTILE_SECRET_KEY) {
    return { success: false };
  }

  const idempotencyKey = randomUUID();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const formData = new FormData();
      formData.append('secret', TURNSTILE_SECRET_KEY);
      formData.append('response', token);
      formData.append('remoteip', remoteip);
      formData.append('idempotency_key', idempotencyKey);

      const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: formData,
        },
      );

      const result = (await response.json()) as { success: boolean };

      if (response.ok) {
        return result;
      }

      if (attempt === maxRetries) {
        return result;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    } catch (error) {
      console.error(`Turnstile verify attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        return { success: false };
      }
    }
  }

  return { success: false };
}

function getClientIp(headersList: Headers): string {
  return (
    headersList.get('cf-connecting-ip') ??
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    ''
  );
}

export async function verifyTurnstileToken(token: string) {
  const headersList = await headers();
  const remoteip = getClientIp(headersList);

  const result = await verifyTurnstileWithRetry(token, remoteip);
  return result.success;
}
