'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Counts from 0 to `target` with requestAnimationFrame once `active` is true.
 * Before activation — and under reduced motion — the final value is returned
 * directly, so the rendered number is correct on the server, without JS and
 * for assistive tech. The reset to 0 on activation happens in the same frame
 * the element starts fading in, so it is never visible.
 */
export function useCountUp(target: number, active: boolean, duration = 1400): number {
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active || prefersReduced) return;

    const start = performance.now();
    // Ease-out cubic: fast start, settled finish — reads as a measurement.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * ease(progress));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [active, target, duration, prefersReduced]);

  // Not running, or motion is off: the final value, straight away.
  return active && !prefersReduced ? value : target;
}
