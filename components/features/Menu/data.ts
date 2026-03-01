import type { MenuContent } from './types';
import { IMAGE_URL } from '@/lib/constants';

export const menuData: MenuContent = {
  subtitle: 'Qué servimos',
  title: 'Nuestro menú',
  ctaText: 'Ver carta completa',
  images: [
    { src: IMAGE_URL.MENU.FLAT_WHITE2, alt: 'Bebidas con café calientes' },
    { src: IMAGE_URL.MENU.COLD_COFFEE_DRINK, alt: 'Bebidas con café frías' },
    { src: IMAGE_URL.MENU.SCONDWITCH, alt: 'Bebidas sin café frías' },
    { src: IMAGE_URL.MENU.V60_2, alt: 'Bebidas sin café calientes' },
    { src: IMAGE_URL.MENU.FOOD, alt: 'Comida' },
    { src: IMAGE_URL.MENU.COOKIES, alt: 'Comida' },
  ],
};
