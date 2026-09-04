import type { Variants } from "framer-motion";
import { editorialTransition, heroTransition, overlaySpring } from "./transitions";

/**
 * BLACK BRO Motion System — reusable variants.
 * Compose these on primitives (FadeIn, RevealOnScroll, PageTransition)
 * rather than writing bespoke motion props on every component.
 */

/** Simple opacity fade — the workhorse entrance animation. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: editorialTransition },
};

/** Fade + rise — used for editorial copy blocks and section headers. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: editorialTransition },
};

/** Fade + subtle scale — used for product imagery and hero media. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: heroTransition },
};

/** Slide in from the left — left side-nav panel. */
export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: overlaySpring },
  exit: { x: "-100%", transition: overlaySpring },
};

/** Slide in from the right — cart / wishlist drawers. */
export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: overlaySpring },
  exit: { x: "100%", transition: overlaySpring },
};

/** Overlay scrim used behind drawers/side-nav. */
export const scrimFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

/** Stagger container — wrap a list to cascade children with fadeUp/fadeIn. */
export const staggerContainer = (stagger: number = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

/**
 * Cinematic "curtain" reveal — the image itself is clipped and rises
 * into view, rather than just fading/scaling. Reserved for a handful
 * of higher-drama editorial moments (lookbook grid, campaign imagery)
 * so it stays a signature moment rather than the default treatment
 * used everywhere.
 */
export const curtainReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: heroTransition },
};

/** Full-page transition variants consumed by PageTransition. */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};
