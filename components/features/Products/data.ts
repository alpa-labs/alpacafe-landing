import type { ProductsContent } from './types';
import { IMAGE_URL, URL } from '@/lib/constants';

export const productsData: ProductsContent = {
  subtitle: 'Qué ofrecemos',
  title: 'Nuestros productos',
  products: [
    {
      href: URL.INSTAGRAM_ALPACAOS,
      title: 'Alpa Caos',
      desc: 'Nuestro juego de cartas',
      src: IMAGE_URL.PRODUCTS.ALPACAOS_CARTAS,
      alt: 'Alpa Caos - juego de cartas',
    },
    {
      href: URL.MENU,
      title: 'Café en grano',
      desc: 'Café de especialidad para llevar',
      src: IMAGE_URL.PRODUCTS.ALPA_BEANS,
      alt: 'Café de especialidad para llevar',
    },
    {
      href: '#contacto',
      title: 'Vasos reutilizables',
      desc: 'Vasos con el logo de ALPA CAFÉ para llevar tu bebida.',
      src: IMAGE_URL.PRODUCTS.ALPA_CUPS,
      alt: 'Vasos con el logo de ALPA CAFÉ',
    },
    {
      href: '#contacto',
      title: 'Cucharas',
      desc: 'Cucharas de cata con el logo de ALPA CAFÉ.',
      src: IMAGE_URL.PRODUCTS.ALPA_SPOONS,
      alt: 'Cucharas de cata con el logo de ALPA CAFÉ',
    },
  ],
};
