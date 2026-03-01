'use client';

import { useRef, useState, useEffect } from 'react';
import { SECTION_NAMES } from '@/lib/constants';
import { Heading, Section, Subtitle } from '@/components/shared';
import { eventsData } from './data';
import { Event } from './Event';

export function EventsSection() {
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const refs = [ref0, ref1, ref2];
  const [inView, setInView] = useState([false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) =>
          setInView((prev) => {
            const next = [...prev];
            next[i] = entry.isIntersecting;
            return next;
          }),
        { threshold: 0.12 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable; run once on mount
  }, []);

  const { subtitle, title, items } = eventsData;

  return (
    <Section
      id={SECTION_NAMES.events}
      className="bg-muted/50"
      aria-labelledby="events-title"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{subtitle}</Subtitle>
        <Heading as="h2" id="events-title">
          {title}
        </Heading>
      </div>
      {items.map((item, index) => (
        <Event
          key={item.id}
          ref={refs[index]}
          item={item}
          imageOnLeft={index % 2 === 1}
          inView={inView[index] ?? false}
        />
      ))}
    </Section>
  );
}
