// Small motion helpers. Micro-interactions check this so prefers-reduced-motion users
// get no extra movement (WCAG 2.1).
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
