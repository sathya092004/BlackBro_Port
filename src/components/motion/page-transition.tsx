"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { pageTransitionVariants } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps route content so every navigation gets a consistent
 * fade/rise enter-exit, mirroring the editorial pacing of the
 * reference site's route changes without copying its exact motion.
 *
 * Consumed from `app/template.tsx`, which Next.js re-mounts on every
 * navigation — the correct primitive for exit animations in the App
 * Router (unlike layout.tsx, which persists across routes).
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
