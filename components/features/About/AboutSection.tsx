'use client';

import { SECTION_NAMES } from '@/lib/constants';
import { useRef, useState, useEffect } from 'react';
import { aboutData } from './data';
import { Section, Subtitle, Heading } from '@/components/shared';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const contentClass = inView ? 'about-content-in' : 'about-content-reset';

  return (
    <Section
      ref={sectionRef}
      id={SECTION_NAMES.about}
      aria-labelledby="about-title"
    >
      <div className={`mx-auto max-w-[1120px] px-6 ${contentClass}`}>
        <Subtitle>{aboutData.subtitle}</Subtitle>
        <Heading
          as="h2"
          id="about-title"
          className="mb-6 text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {aboutData.title}
        </Heading>
        {aboutData.paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              i === 0 ? 'mb-4 text-muted-foreground' : 'text-muted-foreground'
            }
          >
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
