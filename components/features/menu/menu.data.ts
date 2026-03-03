import type { MenuContent } from './menu.types';
import { siteImages } from '@/lib/constants';

export const menuData: MenuContent = {
  subtitle: 'Qué servimos',
  title: 'Nuestro menú',
  ctaText: 'Ver carta completa',
  images: [
    { src: siteImages.menu.hotCoffee, alt: 'Bebidas con café calientes' },
    { src: siteImages.menu.icedCoffee, alt: 'Bebidas con café frías' },
    { src: siteImages.menu.scondwitch, alt: 'Bebidas sin café frías' },
    { src: siteImages.menu.brewing, alt: 'Bebidas sin café calientes' },
    { src: siteImages.menu.food, alt: 'Comida' },
    { src: siteImages.menu.cookies, alt: 'Comida' },
  ],
};
