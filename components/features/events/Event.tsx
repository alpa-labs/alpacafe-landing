'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { WhatsappIcon } from '@/components/shared/icons';
import { Button, Heading } from '@/components/shared';
import type { EventItem } from './events.types';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/components/shared/layout/MotionDiv';

type EventProps = {
  item: EventItem;
  /** When true, image is on the left on desktop; when false, image is on the right. */
  imageOnLeft: boolean;
};

export const Event = forwardRef<HTMLDivElement, EventProps>(function Event(
  { item, imageOnLeft },
  ref,
) {
  const textBlock = (
    <div
      className={cn(
        'order-1 w-full',
        imageOnLeft
          ? 'pl-6 pr-[max(1.5rem,calc((100vw-1120px)/2+1.5rem))] md:pl-6'
          : 'pl-[max(1.5rem,calc((100vw-1120px)/2+1.5rem))] pr-6 md:pr-0',
        imageOnLeft ? 'md:order-2' : 'md:order-1',
      )}
    >
      <Heading
        as="h3"
        className="mb-4 text-2xl font-semibold leading-tight sm:text-3xl normal-case"
      >
        {item.title}
      </Heading>
      <p
        className={cn(
          'text-muted-foreground leading-relaxed',
          item.cta && 'mb-6',
        )}
      >
        {item.description}
      </p>
      {item.cta && (
        <Button href={item.cta.href} icon={WhatsappIcon} variant="outline">
          {item.cta.text}
        </Button>
      )}
    </div>
  );

  const imageBlock = (
    <div
      className={cn(
        'order-2 relative h-[280px] w-full min-h-[240px] sm:h-[320px] md:h-[360px] md:min-w-0',
        imageOnLeft ? 'md:order-1' : 'md:order-2',
      )}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <MotionDiv
      ref={ref}
      className="mt-12 grid grid-cols-1 gap-4 md:mt-0 md:grid-cols-2 md:items-center md:gap-0 first:mt-0"
    >
      {imageOnLeft ? imageBlock : textBlock}
      {imageOnLeft ? textBlock : imageBlock}
    </MotionDiv>
  );
});
Event.displayName = 'Event';
