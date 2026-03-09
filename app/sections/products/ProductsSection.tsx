'use client';

import Image from 'next/image';
import { siteSections } from '@/lib/constants';
import { Button, Heading, Section, Subtitle } from '@/components';
import { productsData } from './products.data';
import { MotionDiv } from '@/components/layout/MotionDiv';

export function ProductsSection() {
  return (
    <Section id={siteSections.products} aria-labelledby="products-title">
      <MotionDiv className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{productsData.subtitle}</Subtitle>
        <Heading as="h2" id="products-title">
          {productsData.title}
        </Heading>
      </MotionDiv>
      <div className="mt-6 w-full grid grid-cols-2 gap-0 min-[770px]:grid-cols-4">
        {productsData.products.map(({ href, title, desc, src, alt }) => (
          <MotionDiv key={title}>
            <div className="group relative flex flex-col justify-end overflow-hidden">
              <div className="relative aspect-[3/5] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  sizes="(max-width: 719px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40" aria-hidden />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-center">
                  <div
                    className="inline-flex flex-col text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={title}
                  >
                    <span className="text-lg font-bold uppercase text-foreground sm:text-xl">
                      {title}
                    </span>
                    <span className="text-sm text-foreground/90 sm:text-base">
                      {desc}
                    </span>
                    <Button
                      href={href}
                      variant="outline"
                      size="sm"
                      className="mt-6 mx-auto"
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </Section>
  );
}
