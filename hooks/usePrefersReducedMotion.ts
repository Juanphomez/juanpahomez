'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Tracks the user's motion preference. The server snapshot is `true` so that
 * no JS-driven animation can run before the preference is known.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', true);
}
