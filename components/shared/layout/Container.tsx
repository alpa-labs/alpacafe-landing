import * as React from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto max-w-[1120px] px-6', className)}
      {...props}
    />
  ),
);
Container.displayName = 'Container';

export { Container };
