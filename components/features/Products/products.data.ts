import type { ProductsContent } from './products.types';
import { siteImages } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';

export const productsData: ProductsContent = {
  subtitle: 'Qué ofrecemos',
  title: 'Nuestros productos',
  products: [
    {
      href: siteConfig.social.instagramAlpacaos,
      title: 'Alpa Caos',
      desc: 'Nuestro juego de cartas',
      src: siteImages.products.alpacaos,
      alt: 'Alpa Caos - juego de cartas',
    },
    {
      href: siteConfig.menu,
      title: 'Café en grano',
      desc: 'Café de especialidad para llevar',
      src: siteImages.products.alpaBeans,
      alt: 'Café de especialidad para llevar',
    },
    {
      href: '#contacto',
      title: 'Vasos reutilizables',
      desc: `Vasos con el logo de ${siteConfig.nameRegistered} para llevar tu bebida.`,
      src: siteImages.products.alpaCups,
      alt: `Vasos con el logo de ${siteConfig.nameRegistered}`,
    },
    {
      href: '#contacto',
      title: 'Cucharas',
      desc: `Cucharas de cata con el logo de ${siteConfig.nameRegistered}.`,
      src: siteImages.products.alpaSpoons,
      alt: `Cucharas de cata con el logo de ${siteConfig.nameRegistered}`,
    },
  ],
};
