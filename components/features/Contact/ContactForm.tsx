'use client';

import { useState } from 'react';
import { Button, Heading } from '@/components/shared';
import { submitContact } from './actions';
import { contactSchema } from './contactSchema';
import { EnvelopeIcon } from '@/components/shared/icons';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = contactSchema.safeParse({
    name,
    email,
    message,
    website: '',
  }).success;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid || status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitContact(formData);

    if (result.success) {
      setName('');
      setEmail('');
      setMessage('');
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-4">
      <Heading as="h3">Escribinos</Heading>

      {/* Honeypot: hidden from users, bots often fill it */}
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <label htmlFor="contact-website">Sitio web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border-0 bg-[hsl(var(--brand-grey))] px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Nombre"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Correo electrónico
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-0 bg-[hsl(var(--brand-grey))] px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Correo electrónico"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border-0 bg-[hsl(var(--brand-grey))] px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Mensaje"
        />
      </div>

      {status === 'success' && (
        <p className="text-sm text-green-400">
          Mensaje enviado. Te responderemos pronto.
        </p>
      )}
      {status === 'error' && errorMessage && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="default"
        iconRight={EnvelopeIcon}
        disabled={!isFormValid || status === 'sending'}
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
