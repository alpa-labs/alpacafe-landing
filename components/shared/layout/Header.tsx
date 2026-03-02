'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/shared/ui';
import { cn } from '@/lib/utils';
import { IMAGE_URL, NAV } from '@/lib/constants';
import { MenuIcon } from '@/components/shared/icons';

const HERO_THRESHOLD = 0.4; // percentage of hero visibility
const MOBILE_BREAKPOINT = 768; // match Tailwind md

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport (md and below)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Detect whether hero is in view
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting);
      },
      {
        threshold: HERO_THRESHOLD,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const menuLabel = mobileOpen ? 'Cerrar menú' : 'Abrir menú';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300 backdrop-blur-sm mb-6"
      role="banner"
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        ...(isMobile && mobileOpen
          ? {
              maskImage:
                'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
            }
          : {
              maskImage:
                'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
            }),
      }}
    >
      {/* Glass layer: solid at top, vanishes at bottom only */}
      <div className="pointer-events-none absolute inset-0 " aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full"
          aria-label="ALPA CAFÉ - Home"
        >
          <Image
            src={IMAGE_URL.LOGO.LOGO_CIRCLE}
            alt="ALPA CAFÉ"
            fill
            className="object-cover border-none"
            sizes="44px"
            priority
          />
        </Link>

        {/* Desktop Nav - absolutely centered in the row */}
        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          aria-label="Navegación principal"
        >
          <ul className="flex gap-8">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200 uppercase',
                    overHero
                      ? 'text-white hover:text-white/80'
                      : 'text-foreground hover:text-primary',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: same width as logo on desktop (keeps nav centered), mobile menu trigger on mobile */}
        <div className="flex h-11 w-11 items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            icon={MenuIcon}
            aria-label={menuLabel}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={cn('md:hidden')}
            onClick={() => setMobileOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile Menu - subtle glass */}
      <nav
        id="mobile-menu"
        className={cn(
          'backdrop-blur-sm transition-all duration-200 md:hidden',
          overHero ? 'bg-black/25' : 'bg-background/85',
          mobileOpen ? 'block' : 'hidden',
        )}
        aria-label="Navegación móvil"
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors uppercase',
                  overHero
                    ? 'text-white hover:text-white/80'
                    : 'text-foreground',
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
