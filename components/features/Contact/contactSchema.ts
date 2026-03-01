import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(120, 'Nombre demasiado largo')
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .email('Correo no válido'),
  message: z
    .string()
    .min(1, 'El mensaje es obligatorio')
    .max(2000, 'Mensaje demasiado largo')
    .transform((s) => s.trim()),
  // Honeypot: must be empty (bots often fill all fields)
  website: z.literal('').optional().or(z.string().max(0)),
});

export type ContactSchema = z.infer<typeof contactSchema>;
