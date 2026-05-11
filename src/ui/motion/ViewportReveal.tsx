'use client';

import { createElement, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { rcViewportTransition } from './rc-motion-variants';

type ViewportRevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
  style?: CSSProperties;
  'data-rc-slug'?: string;
};

const hidden = { opacity: 0, y: 26 };
const show = { opacity: 1, y: 0 };

/**
 * Viewport-driven section reveal (modern motion baseline + reduced-motion safe).
 */
export function ViewportReveal({
  children,
  className = '',
  as: tag = 'div',
  id,
  style,
  'data-rc-slug': dataRcSlug
}: ViewportRevealProps) {
  const reduceMotion = useReducedMotion();
  const common = { className, id, style, ...(dataRcSlug !== undefined ? { 'data-rc-slug': dataRcSlug } : {}) };

  if (reduceMotion) {
    return createElement(tag, common, children);
  }

  const MotionTag = tag === 'section' ? motion.section : motion.div;

  return (
    <MotionTag
      {...common}
      initial={hidden}
      whileInView={show}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
      transition={rcViewportTransition}
    >
      {children}
    </MotionTag>
  );
}
