'use client';

import { siteSections } from '@/lib/constants';
import { aboutData } from './about.data';
import { Section, Subtitle, Heading } from '@/components/shared';
import { MotionDiv } from '@/components/shared/layout/MotionDiv';

export function AboutSection() {
  return (
    <Section id={siteSections.about} aria-labelledby="about-title">
      <MotionDiv className="mx-auto max-w-[1120px] px-6">
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
      </MotionDiv>
    </Section>
  );
}
