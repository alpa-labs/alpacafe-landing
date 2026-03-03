export { siteImages } from './site.config';

/** Section IDs in page order (for scroll-spy). Keys define order. */
export const siteSections = {
  about: 'nosotros',
  menu: 'menu',
  products: 'productos',
  events: 'eventos',
  contact: 'contacto',
} as const;

export const siteNav = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#menu', label: 'Menú' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
] as const;
