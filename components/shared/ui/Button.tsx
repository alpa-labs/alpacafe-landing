'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { IconProps } from '@/components/shared/icons';

/* Border and variant styles live in globals.css (.btn-border-*, .btn-variant-*). Do not add Tailwind border-* in base/variants or they may override. */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium uppercase leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'btn-border-default btn-variant-default',
        outline: 'btn-border-outline btn-variant-outline',
        ghost: 'btn-border-ghost btn-variant-ghost',
      },
      size: {
        default: 'h-[42px] px-5',
        sm: 'h-[34px] px-4 text-xs',
        lg: 'h-[46px] px-8',
        icon: 'h-[38px] w-[38px] p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const ICON_SIZE = 20;

function renderIcon(Icon: React.ComponentType<IconProps> | undefined) {
  if (!Icon) return null;
  return React.createElement(Icon, {
    size: ICON_SIZE,
    fill: 'currentColor',
    className: 'shrink-0',
  });
}

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  icon?: React.ComponentType<IconProps>;
  iconRight?: React.ComponentType<IconProps>;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { className, variant, size, icon, iconRight, children, ...rest } =
    props;

  const hasLabel = children != null && children !== '';
  const slotCount = [!!icon, hasLabel, !!iconRight].filter(Boolean).length;
  const hasMultipleSlots = slotCount >= 2;

  const sharedClass = cn(
    buttonVariants({ variant, size }),
    hasMultipleSlots && 'gap-[0.5rem]',
    className,
  );

  const iconLeftEl = renderIcon(icon);
  const iconRightEl = renderIcon(iconRight);

  if ('href' in rest && rest.href) {
    const { href, external = true, ...anchorProps } = rest;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...(external && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        className={sharedClass}
        {...anchorProps}
      >
        {iconLeftEl}
        {hasLabel ? (
          <span className="translate-y-[2px]">{children}</span>
        ) : null}
        {iconRightEl}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type as 'button' | 'submit' | 'reset'}
      className={sharedClass}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {iconLeftEl}
      {hasLabel ? <span className="translate-y-[2px]">{children}</span> : null}
      {iconRightEl}
    </button>
  );
});

Button.displayName = 'Button';
