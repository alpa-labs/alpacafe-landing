'use client';

import Image from 'next/image';
import { siteSections } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';
import { Heading, Section, Subtitle, Button } from '@/components/shared';
import { menuData } from './menu.data';
import { MotionDiv } from '@/components/shared/layout/MotionDiv';

export function MenuSection() {
  return (
    <Section id={siteSections.menu} aria-labelledby="menu-title">
      <MotionDiv className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{menuData.subtitle}</Subtitle>
        <Heading as="h2" id="menu-title">
          {menuData.title}
        </Heading>
      </MotionDiv>
      <div className="w-full grid grid-cols-2 gap-0 md:grid-cols-3 mb-8">
        {menuData.images.map(({ src, alt }) => (
          <MotionDiv
            key={src}
            className="relative aspect-[4/3] w-full overflow-hidden"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </MotionDiv>
        ))}
      </div>
      <MotionDiv className="mx-auto max-w-[1120px] px-6 flex justify-center">
        <Button href={siteConfig.menu} variant="outline">
          {menuData.ctaText}
        </Button>
      </MotionDiv>
    </Section>
  );
}
