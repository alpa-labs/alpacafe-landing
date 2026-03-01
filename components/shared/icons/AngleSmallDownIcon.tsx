import { cn } from '@/lib/utils';
import type { IconProps } from './types';

export function AngleSmallDownIcon({
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
      <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
    </svg>
  );
}
