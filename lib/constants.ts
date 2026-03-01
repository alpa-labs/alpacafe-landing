export const URL = {
  INSTAGRAM: 'https://www.instagram.com/alpacafe.cba',
  FACEBOOK: 'https://www.facebook.com/profile.php?id=61555456238713',
  TIKTOK: 'https://www.tiktok.com/@alpacafe.cba',
  INSTAGRAM_ALPACAOS: 'https://www.instagram.com/alpacaos.cartas/',
  MENU: 'https://drive.google.com/drive/u/0/folders/13R_xIiiVyR1O1Tdp9INZB3_zZJPY8SQB',
  WHATSAPP: 'https://chat.whatsapp.com/FRCJLMRaat86mFgQLRu1ww',
  MAPS: 'https://maps.app.goo.gl/1P6H4wM3Gqi2WyV39',
} as const;

export const IMAGE_URL = {
  LOGO: {
    LOGO_CIRCLE: '/images/logo/logo-circle.png',
    LOGO_WORDMARK: '/images/logo/logo-wordmark.png',
  },
  HERO: {
    HERO_BACKGROUND: '/images/hero-background.jpg',
  },
  EVENTS: {
    HOME_COFFEE_WORKSHOP: '/images/home-coffee-workshop.jpg',
    TASTING: '/images/event-tasting.jpg',
    COFFEE_BREAK: '/images/coffee-break.jpg',
  },
  PRODUCTS: {
    ALPACAOS_CARTAS: '/images/alpacaos.jpg',
    ALPA_BEANS: '/images/alpa-beans.jpg',
    ALPA_CUPS: '/images/alpa-cups.jpg',
    ALPA_SPOONS: '/images/alpa-spoons.jpg',
  },
  MENU: {
    FLAT_WHITE2: '/images/flat-white2.jpg',
    COLD_COFFEE_DRINK: '/images/cold-coffee-drink.jpg',
    SCONDWITCH: '/images/scondwitch.jpg',
    V60_2: '/images/v60-2.jpg',
    FOOD: '/images/food.jpg',
    COOKIES: '/images/cookies.jpg',
  },
} as const;

/** Section IDs in page order (for scroll-spy). Keys define order. */
export const SECTION_NAMES = {
  about: 'nosotros',
  menu: 'menu',
  products: 'productos',
  events: 'eventos',
  contact: 'contacto',
} as const;

/** Section IDs in page order, derived from SECTION_NAMES. */
export const SECTION_IDS = Object.values(SECTION_NAMES);

export const NAV = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#menu', label: 'Menú' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
] as const;
