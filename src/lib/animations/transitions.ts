import type { Transition } from "framer-motion";

/**
 * BLACK BRO Motion System — shared timing tokens.
 * Mirrors the CSS custom properties defined in globals.css so
 * JS-driven (Framer Motion) and CSS-driven transitions stay in sync.
 */
export const EASE_EDITORIAL: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];
export const EASE_STANDARD: [number, number, number, number] = [
  0.4, 0, 0.2, 1,
];

export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

/** Default transition — used for most fades/slides across the site. */
export const editorialTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_EDITORIAL,
};

/** Snappier transition for micro-interactions (buttons, toggles). */
export const microTransition: Transition = {
  duration: DURATION.fast,
  ease: EASE_STANDARD,
};

/** Slow, deliberate transition for full-bleed hero/editorial reveals. */
export const heroTransition: Transition = {
  duration: DURATION.slow,
  ease: EASE_EDITORIAL,
};

/** Spring preset for interactive drag/overlay elements (cart, side nav). */
export const overlaySpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};
