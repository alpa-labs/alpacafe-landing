'use client';

import { siteSections } from '@/lib/constants';
import { Heading, Section, Subtitle } from '@/components/shared';
import { eventsData } from './events.data';
import { Event } from './Event';
import { MotionDiv } from '@/components/shared/layout/MotionDiv';

export function EventsSection() {
  const { subtitle, title, items } = eventsData;

  return (
    <Section id={siteSections.events} aria-labelledby="events-title">
      <MotionDiv className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{subtitle}</Subtitle>
        <Heading as="h2" id="events-title">
          {title}
        </Heading>
      </MotionDiv>
      {items.map((item, index) => (
        <Event key={item.id} item={item} imageOnLeft={index % 2 === 1} />
      ))}
    </Section>
  );
}
