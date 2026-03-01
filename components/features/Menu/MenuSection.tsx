'use client';

import Image from 'next/image';
import { SECTION_NAMES, URL } from '@/lib/constants';
import { Heading, Section, Subtitle, Button } from '@/components/shared';
import { menuData } from './data';

export function MenuSection() {
  return (
    <Section id={SECTION_NAMES.menu} aria-labelledby="menu-title">
      <div className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{menuData.subtitle}</Subtitle>
        <Heading as="h2" id="menu-title">
          {menuData.title}
        </Heading>
      </div>
      <div className="w-full grid grid-cols-2 gap-0 md:grid-cols-3 mb-8">
        {menuData.images.map(({ src, alt }) => (
          <div
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
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1120px] px-6 flex justify-center">
        <Button href={URL.MENU} variant="outline">
          {menuData.ctaText}
        </Button>
      </div>
    </Section>
  );
}
