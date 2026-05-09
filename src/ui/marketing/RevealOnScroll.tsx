'use client';

import { createElement, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
};

/**
 * Adds `is-revealed` when the block enters the viewport (once).
 * Uses `fm-reveal--armed` after mount so SSR shows content; motion only after arm + intersect.
 */
export function RevealOnScroll({ children, className = '', as: tag = 'div', id }: RevealOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    ref.current?.classList.add('fm-reveal--armed');
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed');
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            obs.disconnect();
          }
        }
      },
      { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.08 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const merged = ['fm-reveal', className].filter(Boolean).join(' ');

  return createElement(tag, { ref, className: merged, ...(id ? { id } : {}) }, children);
}
