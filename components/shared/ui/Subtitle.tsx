import { cn } from '@/lib/utils';

type SubtitleProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const defaultClassName =
  'mb-2 block text-xs font-medium uppercase tracking-widest text-primary';

export function Subtitle({ id, children, className }: SubtitleProps) {
  return (
    <span id={id} className={cn(defaultClassName, className)}>
      {children}
    </span>
  );
}
