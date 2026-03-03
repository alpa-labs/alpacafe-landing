'use client';

import { AngleSmallDownIcon } from '@/components/shared/icons';
import { siteConfig } from '@/lib/site.config';
import { Button } from '@/components/shared/ui';
import { heroData } from './hero.data';
import { MotionDiv } from '@/components/shared/layout/MotionDiv';

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center"
      aria-labelledby="hero-title"
      style={{
        backgroundImage: `url('${heroData.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      {/* Fade into next section background */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 min-h-[280px]"
        style={{
          background: `linear-gradient(to top, hsl(var(--background)), transparent)`,
        }}
        aria-hidden
      />
      <MotionDiv className="relative z-10 max-w-[640px]">
        <p className="mb-4 text-sm uppercase tracking-[0.15em] text-foreground">
          {heroData.tagline}
        </p>
        <h1
          id="hero-title"
          className="mb-6 text-4xl font-semibold leading-tight text-foreground drop-shadow-lg sm:text-6xl lg:text-7xl"
        >
          {heroData.title}
        </h1>
        <Button href={siteConfig.menu} variant="outline">
          {heroData.ctaText}
        </Button>
      </MotionDiv>
      <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-foreground/70">
        <span className="sr-only">{heroData.scrollLabel}</span>
        <AngleSmallDownIcon
          size={28}
          className="animate-bounce text-foreground/80"
          fill="currentColor"
        />
      </div>
    </section>
  );
}
