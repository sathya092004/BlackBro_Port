"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { microTransition } from "@/lib/animations";

const BUTTON_VARIANTS = {
  primary: "bg-ink text-paper dark:bg-bone dark:text-void hover:opacity-90",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper dark:text-bone dark:border-bone dark:hover:bg-bone dark:hover:text-void",
  ghost:
    "bg-transparent text-ink hover:bg-surface-muted dark:text-bone",
  link: "bg-transparent text-ink underline-offset-4 hover:underline p-0 dark:text-bone",
} as const;

const BUTTON_SIZES = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/**
 * BLACK BRO base Button — every clickable CTA on the site should
 * route through this component so hover/tap motion, sizing, and
 * variant styling stay consistent.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", fullWidth, children, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={microTransition}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.08em] font-medium transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none",
          BUTTON_VARIANTS[variant],
          BUTTON_SIZES[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
