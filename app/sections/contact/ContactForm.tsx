'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormInput,
  FormStatusMessage,
  FormTextArea,
  Heading,
} from '@/components';
import { submitContact } from './contact.actions';
import { contactSchema, type ContactSchema } from './contact.schema';
import Script from 'next/script';
import { useTurnstile } from '@/hooks';

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const { buildTurnstile, resetTurnstile } = useTurnstile(
    ref,
    (token: string) => setValue('turnstileToken', token),
  );

  const onSubmit = async (data: ContactSchema) => {
    setStatus('sending');
    setErrorMessage('');

    const result = await submitContact(data);
    if (result.success) {
      reset();
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error);
      resetTurnstile();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-0 flex-col gap-4"
    >
      <Heading as="h3">Escribinos</Heading>
      <FormInput
        id="contact-name"
        name="name"
        label="Nombre"
        placeholder="Juan Pérez"
        required
        error={dirtyFields.name ? errors.name?.message : undefined}
        register={register('name')}
      />
      <FormInput
        id="contact-email"
        name="email"
        type="email"
        label="Correo electrónico"
        placeholder="juan.perez@ejemplo.com"
        required
        error={dirtyFields.email ? errors.email?.message : undefined}
        register={register('email')}
      />
      <FormTextArea
        id="contact-message"
        name="message"
        label="Mensaje"
        placeholder="Escribí tu mensaje aquí"
        rows={8}
        required
        error={dirtyFields.message ? errors.message?.message : undefined}
        register={register('message')}
      />

      {status === 'success' && (
        <FormStatusMessage variant="success">
          Mensaje enviado. Te responderemos pronto.
        </FormStatusMessage>
      )}
      {status === 'error' && errorMessage && (
        <FormStatusMessage variant="error" roleAlert>
          {errorMessage}
        </FormStatusMessage>
      )}

      {turnstileSiteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            onReady={buildTurnstile}
          />
          <div
            ref={ref}
            className="min-h-[65px] flex items-center"
            data-sitekey={turnstileSiteKey}
            aria-label="Verificación de seguridad"
          />
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Configurá NEXT_PUBLIC_TURNSTILE_SITE_KEY para habilitar la
          verificación.
        </p>
      )}

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
