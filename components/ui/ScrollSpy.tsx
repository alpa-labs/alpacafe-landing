'use client';

import { useEffect } from 'react';
import { siteSections } from '@/lib/constants';

const TOP_OFFSET = 120; // px offset for fixed header
const SECTION_IDS = Object.values(siteSections);

export function ScrollSpy() {
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let activeId: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // We only care about entries intersecting the adjusted viewport
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

        if (visible.length === 0) return;

        const newActiveId = visible[0].target.id;

        if (activeId !== newActiveId) {
          activeId = newActiveId;

          const newHash = `#${newActiveId}`;
          if (window.location.hash !== newHash) {
            history.replaceState(
              null,
              '',
              window.location.pathname + window.location.search + newHash,
            );
          }
        }
      },
      {
        // Shrink top of viewport by header height
        root: null,
        rootMargin: `-${TOP_OFFSET}px 0px 0px 0px`,
        threshold: 0.1, // triggers when at least 10% is visible
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Scroll to hash on initial load
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
