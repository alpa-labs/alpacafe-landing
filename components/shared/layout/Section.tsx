'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const defaultClassName = 'w-full scroll-mt-20 py-16 md:py-20';

type SectionProps = {
  id: string;
  'aria-labelledby': string;
  className?: string;
  children: React.ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, 'aria-labelledby': ariaLabelledBy, className, children }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(defaultClassName, className)}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = 'Section';
