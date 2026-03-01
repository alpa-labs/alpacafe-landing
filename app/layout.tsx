import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ScrollSpy } from '@/components/shared/ui/ScrollSpy';
import { IMAGE_URL } from '@/lib/constants';
import './globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-josefin',
});

export const metadata: Metadata = {
  title: 'ALPA CAFÉ - Café de especialidad en Córdoba, Argentina',
  description:
    'Pasión por el café. Tostamos y servimos café de especialidad. Ituzaingó 1202, Nueva Córdoba, Córdoba.',
  keywords: [
    'ALPA CAFÉ',
    'café Córdoba',
    'specialty coffee Argentina',
    'café de especialidad',
    'Nueva Córdoba',
  ],
  authors: [{ name: 'ALPA CAFÉ' }],
  openGraph: {
    type: 'website',
    title: 'ALPA CAFÉ - Café de especialidad en Córdoba',
    description:
      'Pasión por el café. Tostamos y servimos café de especialidad. Ituzaingó 1202, Nueva Córdoba, Córdoba.',
    locale: 'es_AR',
  },
  robots: 'index, follow',
  icons: {
    icon: IMAGE_URL.LOGO.LOGO_CIRCLE,
    apple: IMAGE_URL.LOGO.LOGO_CIRCLE,
  },
  other: {
    'theme-color': '#07090A',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${josefin.variable} font-sans antialiased`}>
        <ScrollSpy />
        {children}
      </body>
    </html>
  );
}
