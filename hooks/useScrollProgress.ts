'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Progress of an element through the viewport, from 0 when its top reaches the
 * bottom of the viewport to 1 when its bottom leaves the top.
 *
 * Returns a callback ref rather than a ref object on purpose: the element it
 * measures is mounted conditionally (the sticky stage only exists on wide
 * viewports without a reduced-motion preference), so an effect keyed on a ref
 * object would run once while the ref was still null and never run again.
 *
 * The listener is passive and the value is read inside requestAnimationFrame,
 * so scrolling is never blocked, and it only measures while the element is
 * near the viewport.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  number,
] {
  const [element, setElement] = useState<T | null>(null);
  const [progress, setProgress] = useState(0);

  const ref = useCallback((node: T | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;

    let ticking = false;
    let active = true;

    const measure = () => {
      ticking = false;
      const rect = element.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;

      // Shorter than the viewport: fall back to how far it has crossed.
      const value =
        travel > 0
          ? -rect.top / travel
          : (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      setProgress(Math.min(Math.max(value, 0), 1));
    };

    const onScroll = () => {
      if (ticking || !active) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    // Only listen while the element is anywhere near the viewport.
    const gate = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        active = entry?.isIntersecting ?? false;
        if (active) measure();
      },
      { rootMargin: '100% 0px' },
    );
    gate.observe(element);

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      gate.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [element]);

  return [ref, progress];
}
