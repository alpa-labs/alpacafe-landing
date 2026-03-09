import { cn } from '@/lib/utils';
import type { IconProps } from './types';

export function MenuIcon({
  size = 24,
  className,
  fill = 'currentColor',
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}
