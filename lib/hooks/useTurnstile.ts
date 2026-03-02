import { RefObject, useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string;
          language?: string;
          theme?: 'auto' | 'light' | 'dark';
          execution?: 'render' | 'execute';
          callback: (token: string) => void;
          'error-callback'?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export default function useTurnstile(
  ref: RefObject<HTMLDivElement>,
  updateToken: (token: string) => void,
) {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const buildTurnstile = useCallback(() => {
    if (
      typeof window === 'undefined' ||
      !window.turnstile ||
      ref.current === null ||
      !turnstileSiteKey
    ) {
      return;
    }
    if (widgetId) return; // Already rendered

    const turnstile = window.turnstile;
    const widgetIdRendered = turnstile.render(ref.current, {
      sitekey: turnstileSiteKey,
      language: 'es',
      theme: 'dark',
      execution: 'render',
      callback: (token: string) => updateToken(token),
      'error-callback': () => {
        updateToken('');
      },
    });
    setWidgetId(widgetIdRendered);
  }, [turnstileSiteKey, updateToken, widgetId]);

  // If validation fails, reset the widget and try again
  function resetTurnstile() {
    if (!widgetId || typeof window === 'undefined' || !window.turnstile) {
      return;
    }
    window.turnstile.reset(widgetId);
    window.turnstile.execute(widgetId);
  }

  // Handle script-already-loaded (e.g. React Strict Mode remount, cached script)
  // Next.js Script onReady may not fire again when script is cached
  useEffect(() => {
    const timer = setTimeout(() => {
      buildTurnstile();
    }, 150);
    return () => clearTimeout(timer);
  }, [buildTurnstile]);

  useEffect(() => {
    return () => {
      if (widgetId && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Widget may already be removed when DOM is cleared (e.g. navigation)
        }
      }
    };
  }, [widgetId]);

  return {
    buildTurnstile,
    resetTurnstile,
  };
}
