'use client';

import { useEffect } from 'react';
import { SECTION_IDS } from '@/lib/constants';
const TOP_OFFSET = 120; // px from top of viewport to consider section "active"

export function ScrollSpy() {
  useEffect(() => {
    let ticking = false;

    const updateHash = () => {
      let activeId: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= TOP_OFFSET) {
          activeId = id;
        }
      }

      const newHash = activeId ? `#${activeId}` : '';
      if (window.location.hash !== newHash) {
        history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search + newHash,
        );
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHash);
      }
    };

    // Scroll to hash on load (e.g. refresh on #events) and after nav click
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    updateHash();
    // Scroll to section when page loads with hash (e.g. #events) or after nav click
    const t = window.setTimeout(() => {
      updateHash();
      scrollToHash();
    }, 150);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
