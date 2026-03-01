import { cn } from '@/lib/utils';
import {
  CheckCircleIcon,
  ErrorIcon,
  WarningIcon,
} from '@/components/shared/icons';

export type FormStatusMessageVariant = 'success' | 'error' | 'warning';

const variantConfig = {
  success: {
    Icon: CheckCircleIcon,
    className: 'text-green-400',
  },
  error: {
    Icon: ErrorIcon,
    className: 'text-red-400',
  },
  warning: {
    Icon: WarningIcon,
    className: 'text-amber-400',
  },
} as const;

export type FormStatusMessageProps = {
  variant: FormStatusMessageVariant;
  children: React.ReactNode;
  className?: string;
  /** Use true for error messages that should be announced to screen readers. */
  roleAlert?: boolean;
};

export function FormStatusMessage({
  variant,
  children,
  className,
  roleAlert,
}: FormStatusMessageProps) {
  const { Icon, className: variantClass } = variantConfig[variant];
  const isError = variant === 'error';

  return (
    <p
      className={cn('flex items-center gap-2 text-sm', variantClass, className)}
      role={roleAlert ?? isError ? 'alert' : undefined}
    >
      <Icon size={20} className="shrink-0" />
      {children}
    </p>
  );
}
