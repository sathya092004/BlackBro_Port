"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { microTransition } from "@/lib/animations";

export interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {}

/**
 * Consistent micro-interaction for icon-only controls — close buttons,
 * gallery prev/next, overlay dismissals. A small hover lift plus a
 * confident tap compression, so every "X" and chevron across the site
 * shares the same tactile feel instead of relying on bare CSS
 * `hover:bg-*` with no press feedback.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = "button", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        transition={microTransition}
        className={cn("rounded-full", className)}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
