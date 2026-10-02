'use client';

import { useEffect, useState } from 'react';

/**
 * Reports which of the given element ids is currently crossing the middle of
 * the viewport. Uses a single IntersectionObserver for the whole set rather
 * than a scroll listener, so it costs nothing while the user is not scrolling.
 */
export function useActiveId(ids: readonly string[], offsetTop = 45): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Narrow band across the viewport: an element is "active" while it
    // overlaps that band.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const first = visible[0];
        if (first) setActiveId(first.target.id);
      },
      { rootMargin: `-${offsetTop}% 0px -${100 - offsetTop - 10}% 0px`, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offsetTop]);

  return activeId;
}
