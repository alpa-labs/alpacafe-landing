'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { config } from '@/lib/config';
import { checkRateLimitFromHeaders } from '@/lib/rate-limit';
import { contactSchema, type ContactSchema } from './contactSchema';

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
  const escapedBaseUrl = escapeHtml(config.site.baseUrl);

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
  const { apiKey, fromEmail, toEmail } = config.resend;
  if (!apiKey) {
    return {
      error: 'El envío no está configurado. Escribinos a alpacafe@gmail.com.',
    };
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject,
      html,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return {
        error: 'No se pudo enviar. Intentá más tarde.',
      };
    }

    console.log('Email sent successfully to:', toEmail);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      error: 'Ocurrió un error. Intentá más tarde.',
    };
  }
}
