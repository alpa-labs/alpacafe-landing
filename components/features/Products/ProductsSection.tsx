'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SECTION_NAMES } from '@/lib/constants';
import { Heading, Section, Subtitle } from '@/components/shared';
import { productsData } from './data';

export function ProductsSection() {
  return (
    <Section id={SECTION_NAMES.products} aria-labelledby="products-title">
      <div className="mx-auto max-w-[1120px] px-6">
        <Subtitle>{productsData.subtitle}</Subtitle>
        <Heading as="h2" id="products-title">
          {productsData.title}
        </Heading>
      </div>
      <div className="mt-6 w-full grid grid-cols-2 gap-0 min-[770px]:grid-cols-4">
        {productsData.products.map(({ href, title, desc, src, alt }) => (
          <Link
            key={title}
            href={href}
            {...(href.startsWith('http') && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
            className="relative flex flex-col justify-end overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={title}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 719px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50" aria-hidden />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
                <span className="text-lg font-bold uppercase text-foreground sm:text-xl">
                  {title}
                </span>
                <span className="text-sm text-foreground/90 sm:text-base">
                  {desc}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
