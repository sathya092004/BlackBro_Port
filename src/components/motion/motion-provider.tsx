"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide Framer Motion configuration.
 *
 * `reducedMotion="user"` makes every `motion.*` element (across every
 * component that already exists — nothing needs to change at the
 * call site) automatically respect the OS-level "reduce motion"
 * setting: transform-driven animation (scale, x/y translation,
 * rotation) is skipped, while opacity transitions still run so
 * content doesn't just pop in. This is the single global switch;
 * individual components stay exactly as they are.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
