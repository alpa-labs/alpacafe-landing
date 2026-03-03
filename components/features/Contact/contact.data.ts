import type { ContactContent } from './contact.types';
import { siteConfig } from '@/lib/site.config';

export const contactData: ContactContent = {
  subtitle: 'Contacto',
  title: 'Contactanos',
  intro:
    'Reservas para grupos, eventos o una consulta, nos encantaría saber de vos.',
  addressLabel: 'Dirección',
  addressLines: siteConfig.address,
  hoursLabel: 'Horarios',
  hoursText: siteConfig.hours,
  socialLabel: 'Seguinos',
  mapsButtonText: 'Abrir en Google Maps',
};
