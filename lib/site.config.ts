/**
 * Centralized global site configuration.
 * Update this file to change brand metadata, social links, address, and hours.
 */
const name = 'ALPA CAFÉ';
export const siteConfig = {
  name,
  nameRegistered: `${name}®`,
  year: new Date().getFullYear(),

  social: {
    instagram: 'https://www.instagram.com/alpacafe.cba',
    facebook: 'https://www.facebook.com/profile.php?id=61555456238713',
    tiktok: 'https://www.tiktok.com/@alpacafe.cba',
    instagramAlpacaos: 'https://www.instagram.com/alpacaos.cartas/',
  },

  address: 'Ituzaingó 1202, Nueva Córdoba\nCórdoba, Argentina',

  hours:
    'Lunes - Viernes\n8:00 - 20:30 hs\n\nSábado - Domingo\n9:00 - 13:00 hs\n16:30 - 20:30 hs',

  menu: 'https://drive.google.com/drive/u/0/folders/13R_xIiiVyR1O1Tdp9INZB3_zZJPY8SQB',

  maps: 'https://maps.app.goo.gl/1P6H4wM3Gqi2WyV39',

  whatsapp: 'https://chat.whatsapp.com/FRCJLMRaat86mFgQLRu1ww',
} as const;

export const siteImages = {
  logo: {
    circle: '/images/logo/logo-circle.png',
    wordmark: '/images/logo/logo-wordmark.png',
  },
  hero: {
    background: '/images/hero/hero-background.jpg',
  },
  events: {
    homeCoffeeWorkshop: '/images/events/home-coffee-workshop.jpg',
    tasting: '/images/events/tasting.jpg',
    coffeeBreak: '/images/events/coffee-break.jpg',
  },
  products: {
    alpacaos: '/images/products/alpacaos.jpg',
    alpaBeans: '/images/products/alpa-beans.jpg',
    alpaCups: '/images/products/alpa-cups.jpg',
    alpaSpoons: '/images/products/alpa-spoons.jpg',
  },
  menu: {
    hotCoffee: '/images/menu/hot-coffee.jpg',
    icedCoffee: '/images/menu/iced-coffee.jpg',
    scondwitch: '/images/menu/scondwitch.jpg',
    brewing: '/images/menu/brewing.jpg',
    food: '/images/menu/food.jpg',
    cookies: '/images/menu/cookies.jpg',
  },
} as const;
