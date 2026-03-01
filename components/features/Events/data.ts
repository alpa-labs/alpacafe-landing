import type { EventsContent } from './types';
import { IMAGE_URL, URL } from '@/lib/constants';

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
        src: IMAGE_URL.EVENTS.HOME_COFFEE_WORKSHOP,
        alt: 'Taller de café en casa',
      },
    },
    {
      id: 'catas',
      title: 'Catas de café de todo el mundo',
      description:
        'Sumate al canal de WhatsApp para enterarte de las catas y probar cafés de distintos orígenes junto a la comunidad.',
      image: {
        src: IMAGE_URL.EVENTS.TASTING,
        alt: 'Catas de café de todo el mundo',
      },
      cta: { href: URL.WHATSAPP, text: 'Canal de catas' },
    },
    {
      id: 'menu-pasos',
      title: 'Menú de pasos',
      description:
        'Una experiencia guiada de varios pasos con café de especialidad y comida en armonía, pensada para disfrutar con calma, preparada en conjunto con Petit Brulé.',
      image: {
        src: IMAGE_URL.EVENTS.COFFEE_BREAK,
        alt: 'Menú de pasos',
      },
    },
  ],
};
