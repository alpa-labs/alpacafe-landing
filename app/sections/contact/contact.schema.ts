import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .transform((s) => s.trim()),
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .pipe(z.email({ message: 'Correo inválido' })),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje supera el límite máximo de caracteres')
    .transform((s) => s.trim()),
  turnstileToken: z.string().optional().nullable(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
