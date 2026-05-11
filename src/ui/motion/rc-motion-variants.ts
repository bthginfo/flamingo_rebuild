/**
 * Motion tokens for Restaurant · klassisch preview (2026 standards).
 * Used with framer-motion; pair with `useReducedMotion()` for a11y.
 */
export const rcEase = [0.22, 1, 0.36, 1] as const;

export const rcViewportTransition = {
  duration: 0.58,
  ease: rcEase
} as const;

export const rcStaggerFast = {
  staggerChildren: 0.055,
  delayChildren: 0.04
} as const;

export const rcStaggerContainer = {
  hidden: {},
  show: {
    transition: rcStaggerFast
  }
} as const;

export const rcStaggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: rcEase }
  }
} as const;

export const rcHeroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 }
  }
} as const;

export const rcHeroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: rcEase }
  }
} as const;
