'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
  /** Stop observing after the first intersection. Default: true. */
  once?: boolean;
  /**
   * Fraction of the element that must be visible. Defaults to 0 on purpose:
   * a ratio threshold can never be met by an element taller than the viewport
   * divided by that threshold, which would leave tall blocks invisible
   * forever. The bottom rootMargin below is what delays the trigger instead.
   */
  threshold?: number;
  /** Shrinks the viewport so elements trigger before reaching the fold. */
  rootMargin?: string;
};

/**
 * Minimal IntersectionObserver wrapper. One observer per element, torn down
 * as soon as it is no longer needed — cheaper than a global scroll listener.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const { once = true, threshold = 0, rootMargin = '0px 0px -12% 0px' } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Without IntersectionObserver nothing is ever hidden: the document is
    // only opted into the reveal styles when the API exists (app/layout.tsx).
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
