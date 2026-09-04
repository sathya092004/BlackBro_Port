"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  /** Variant set to animate through — defaults to fade + rise. */
  variants?: Variants;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  className?: string;
  /** Element tag to render — defaults to div. */
  as?: "div" | "section" | "li" | "span";
  /** Re-trigger every time the element scrolls into view. */
  repeat?: boolean;
}

/**
 * Scroll-triggered reveal used throughout editorial sections
 * (headlines, copy blocks, product grids). Wraps Framer Motion's
 * `whileInView` so call sites stay declarative:
 *
 *   <Reveal><h2>Section title</h2></Reveal>
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
  repeat = false,
}: RevealProps) {
  const MotionTag = motion[as];

  // Merge the requested delay into the variant's own transition so both
  // the variant-level easing/duration and the call-site delay apply.
  const visibleState = variants.visible as
    | { transition?: object; [key: string]: unknown }
    | undefined;
  const delayedVariants: Variants = {
    ...variants,
    visible: visibleState
      ? { ...visibleState, transition: { ...visibleState.transition, delay } }
      : { transition: { delay } },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.3 }}
      variants={delayedVariants}
    >
      {children}
    </MotionTag>
  );
}
