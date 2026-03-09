import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ScrollSpy } from '@/components';
import { siteImages } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';
import './globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-josefin',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - Café de especialidad en Córdoba, Argentina`,
  description: `Pasión por el café. Tostamos y servimos café de especialidad. ${siteConfig.address.replace(/\n/g, ', ')}.`,
  keywords: [
    siteConfig.name,
    'café Córdoba',
    'specialty coffee Argentina',
    'café de especialidad',
    'Nueva Córdoba',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    title: `${siteConfig.name} - Café de especialidad en Córdoba`,
    description: `Pasión por el café. Tostamos y servimos café de especialidad. ${siteConfig.address.replace(/\n/g, ', ')}.`,
    locale: 'es_AR',
  },
  robots: 'index, follow',
  icons: {
    icon: siteImages.logo.circle,
    apple: siteImages.logo.circle,
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
