'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor-reactive hero backdrop (GPU-friendly: only transform updates in rAF).
 * Disabled when `prefers-reduced-motion: reduce` — host still mounts; parent may hide via CSS.
 */
export type MouseGlowProps = {
  colorA?: string;
  colorB?: string;
  className?: string;
  initial?: { x: number; y: number };
};

export function MouseGlow({
  colorA = 'rgba(124, 58, 237, 0.55)',
  colorB = 'rgba(242, 65, 113, 0.65)',
  className = '',
  initial = { x: 50, y: 35 }
}: MouseGlowProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const blobA = blobARef.current;
    const blobB = blobBRef.current;
    const mesh = meshRef.current;
    if (!host || !blobA || !blobB) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let rect = host.getBoundingClientRect();
    let targetX = (initial.x / 100) * rect.width;
    let targetY = (initial.y / 100) * rect.height;
    let curAX = targetX;
    let curAY = targetY;
    let curBX = targetX;
    let curBY = targetY;
    let raf = 0;
    let t = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const onResize = () => {
      rect = host.getBoundingClientRect();
    };

    const tick = () => {
      curAX += (targetX - curAX) * 0.06;
      curAY += (targetY - curAY) * 0.06;
      curBX += (targetX - curBX) * 0.18;
      curBY += (targetY - curBY) * 0.18;

      t += 0.008;
      const wobX = Math.sin(t) * 12;
      const wobY = Math.cos(t * 0.7) * 12;

      blobA.style.transform = `translate3d(${curAX - 320 + wobX}px, ${curAY - 320 + wobY}px, 0)`;
      blobB.style.transform = `translate3d(${curBX - 140}px, ${curBY - 140}px, 0)`;
      if (mesh) {
        mesh.style.transform = `translate3d(${(targetX - rect.width / 2) * 0.015}px, ${(targetY - rect.height / 2) * 0.015}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [initial.x, initial.y]);

  return (
    <div ref={hostRef} aria-hidden className={['fm-mouse-glow', className].filter(Boolean).join(' ')}>
      <div
        ref={meshRef}
        className="fm-mouse-glow__mesh"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 25%, rgba(124,58,237,0.28), transparent 70%),' +
            'radial-gradient(50% 45% at 85% 15%, rgba(242,65,113,0.22), transparent 70%),' +
            'radial-gradient(70% 60% at 50% 100%, rgba(34,211,238,0.18), transparent 70%)'
        }}
      />
      <div
        ref={blobARef}
        className="fm-mouse-glow__blob fm-mouse-glow__blob--a"
        style={{
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: colorA,
          filter: 'blur(80px)'
        }}
      />
      <div
        ref={blobBRef}
        className="fm-mouse-glow__blob fm-mouse-glow__blob--b"
        style={{
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: colorB,
          filter: 'blur(40px)'
        }}
      />
      <div
        className="fm-mouse-glow__vignette"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.55) 100%)'
        }}
      />
    </div>
  );
}
