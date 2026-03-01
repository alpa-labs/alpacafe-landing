const { env } = process;

export const config = {
  resend: {
    apiKey: env.RESEND_API_KEY,
    fromEmail: env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
    toEmail: env.RESEND_TO_EMAIL ?? 'alpacafe@gmail.com',
  },
  site: {
    baseUrl: env.NEXT_PUBLIC_BASE_URL,
  },
} as const;
