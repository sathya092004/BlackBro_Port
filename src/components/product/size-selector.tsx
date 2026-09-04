"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { microTransition } from "@/lib/animations";
import type { SizeOption } from "@/lib/utils/product-options";

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  className?: string;
}

export function SizeSelector({ sizes, selected, onSelect, className }: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className="bb-eyebrow text-text-muted">Size</span>
        {selected && <span className="text-xs text-text-muted">Selected: {selected}</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selected === size.value;
          return (
            <motion.button
              key={size.value}
              type="button"
              disabled={!size.available}
              onClick={() => onSelect(size.value)}
              whileTap={size.available ? { scale: 0.94 } : undefined}
              transition={microTransition}
              aria-pressed={isSelected}
              aria-label={
                size.available ? `Select size ${size.value}` : `Size ${size.value}, out of stock`
              }
              className={cn(
                "relative h-11 min-w-11 border px-3 text-sm transition-colors",
                isSelected
                  ? "border-ink bg-ink text-paper dark:border-bone dark:bg-bone dark:text-void"
                  : "border-border-subtle text-foreground hover:border-ink dark:hover:border-bone",
                !size.available &&
                  "cursor-not-allowed border-border-subtle text-text-muted opacity-50 hover:border-border-subtle"
              )}
            >
              {size.value}
              {!size.available && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="h-px w-[130%] rotate-[-18deg] bg-current" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
