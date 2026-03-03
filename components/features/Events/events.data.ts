import type { EventsContent } from './events.types';
import { siteImages } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';

export const eventsData: EventsContent = {
  subtitle: 'Eventos',
  title: 'Eventos',
  items: [
    {
      id: 'taller',
      title: 'Taller de café en casa',
      description:
        'Aprendé a preparar café de especialidad en tu casa. V60, AeroPress y métodos de filtrado con baristas de ALPA CAFÉ.',
      image: {
        src: siteImages.events.homeCoffeeWorkshop,
        alt: 'Taller de café en casa',
      },
    },
    {
      id: 'catas',
      title: 'Catas de café de todo el mundo',
      description:
        'Sumate al canal de WhatsApp para enterarte de las catas y probar cafés de distintos orígenes junto a la comunidad.',
      image: {
        src: siteImages.events.tasting,
        alt: 'Catas de café de todo el mundo',
      },
      cta: { href: siteConfig.whatsapp, text: 'Canal de catas' },
    },
    {
      id: 'menu-pasos',
      title: 'Menú de pasos',
      description:
        'Una experiencia guiada de varios pasos con café de especialidad y comida en armonía, pensada para disfrutar con calma, preparada en conjunto con Petit Brulé.',
      image: {
        src: siteImages.events.coffeeBreak,
        alt: 'Menú de pasos',
      },
    },
  ],
};
