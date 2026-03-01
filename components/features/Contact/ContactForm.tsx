'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormInput,
  FormStatusMessage,
  FormTextArea,
  Heading,
} from '@/components/shared';
import { submitContact } from './actions';
import { contactSchema, type ContactSchema } from './contactSchema';

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

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

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
