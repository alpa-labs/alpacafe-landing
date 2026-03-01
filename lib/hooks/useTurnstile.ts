import { RefObject, useEffect, useState } from 'react';

declare const turnstile: {
  render: (
    element: HTMLElement | string,
    options: {
      sitekey: string;
      language?: string;
      theme?: 'auto' | 'light' | 'dark';
      execution?: 'render' | 'execute';
      callback: (token: string) => void;
      'error-callback'?: (ref: RefObject<HTMLDivElement>) => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

export default function useTurnstile(
  ref: RefObject<HTMLDivElement>,
  updateToken: (token: string) => void,
) {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function buildTurnstile() {
    if (ref.current === null) {
      return;
    }

    // render widget inside the ref
    const widgetIdRendered = turnstile.render(ref.current, {
      sitekey: turnstileSiteKey || '',
      language: 'es',
      theme: 'dark',
      execution: 'render',
      callback: (token: string) => updateToken(token),
      'error-callback': () => {
        updateToken('');
        // Don't call reset() here - it triggers another challenge attempt,
        // which with "always blocks" key causes an infinite retry loop.
        // Use resetTurnstile() after form errors instead.
      },
    });
    setWidgetId(widgetIdRendered);
  }

  // If validation fails, reset the widget and try again
  function resetTurnstile() {
    if (!widgetId || typeof turnstile === 'undefined') {
      return;
    }

    turnstile.reset(widgetId);
    turnstile.execute(widgetId);
  }

  useEffect(() => {
    return () => {
      if (widgetId && typeof turnstile !== 'undefined') {
        try {
          turnstile.remove(widgetId);
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
