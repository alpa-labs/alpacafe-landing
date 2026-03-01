export type EventItem = {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  cta?: { href: string; text: string };
};

export type EventsContent = {
  subtitle: string;
  title: string;
  items: EventItem[];
};
