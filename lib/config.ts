const { env } = process;

export const config = {
  contact: {
    resendApiKey: env.RESEND_API_KEY,
    fromEmail: env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev',
    toEmail: env.CONTACT_TO_EMAIL ?? 'alpacafe@gmail.com',
  },
  site: {
    baseUrl: env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  },
} as const;
