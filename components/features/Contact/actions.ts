'use server';

import { Resend } from 'resend';
import { config } from '@/lib/config';
import { contactSchema } from './contactSchema';

type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(
  formData: FormData,
): Promise<ContactResult> {
  // Honeypot: if filled, treat as bot
  const website = formData.get('website');
  if (website && String(website).trim().length > 0) {
    return { success: true }; // pretend success to not alert bots
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    website: formData.get('website') ?? '',
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.name?.[0] ??
      first.email?.[0] ??
      first.message?.[0] ??
      'Datos inválidos';
    return { success: false, error: msg };
  }

  const { resendApiKey: apiKey, fromEmail, toEmail } = config.contact;

  if (!apiKey) {
    return {
      success: false,
      error: 'El envío no está configurado. Escribinos a alpacafe@gmail.com.',
    };
  }

  const resend = new Resend(apiKey);
  const subject = `Contacto de ${parsed.data.name}`;
  const html = `
    <p><strong>De:</strong> ${parsed.data.name} &lt;${parsed.data.email}&gt;</p>
    <p><strong>Mensaje:</strong></p>
    <p>${parsed.data.message.replace(/\n/g, '<br>')}</p>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: parsed.data.email,
    subject,
    html,
  });

  if (error) {
    return { success: false, error: 'No se pudo enviar. Intentá más tarde.' };
  }

  return { success: true };
}
