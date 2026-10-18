'use client';

import { useSyncExternalStore } from 'react';

// Static snapshot: token values only change in <html> style, which reloads the page
const subscribe = () => () => {};

/**
 * Reads a design-token variable (e.g. --primary) resolved to a concrete value
 * from the :root computed style. Needed where APIs can't parse CSS variables
 * (canvas 2D fillStyle, WebGL uniforms, etc.) per the token rules in
 * docs/ARCHITECTURE.md.
 */
export function useCssVar(name: string, fallback = ''): string {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback,
    () => fallback
  );

  return snapshot;
}
