import { cn } from '@/lib/utils';

const defaultByLevel: Record<'h1' | 'h2' | 'h3', string> = {
  h1: 'mb-8 text-3xl font-semibold leading-tight sm:text-4xl',
  h2: 'mb-8 text-3xl font-semibold leading-tight sm:text-4xl',
  h3: 'mb-2 text-sm font-semibold uppercase tracking-wider text-foreground',
};

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3';
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function Heading({ as: Tag, id, children, className }: HeadingProps) {
  return (
    <Tag id={id} className={cn(defaultByLevel[Tag], className)}>
      {children}
    </Tag>
  );
}
