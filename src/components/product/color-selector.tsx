"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { microTransition } from "@/lib/animations";
import type { ColorOption } from "@/lib/utils/product-options";

interface ColorSelectorProps {
  colors: ColorOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  className?: string;
}

export function ColorSelector({ colors, selected, onSelect, className }: ColorSelectorProps) {
  if (colors.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className="bb-eyebrow text-text-muted">Colour</span>
        {selected && <span className="text-xs text-text-muted">{selected}</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selected === color.value;
          const isLight = isLightSwatch(color.swatch);
          return (
            <motion.button
              key={color.value}
              type="button"
              onClick={() => onSelect(color.value)}
              whileTap={{ scale: 0.9 }}
              transition={microTransition}
              aria-pressed={isSelected}
              aria-label={`Select colour ${color.value}`}
              title={color.value}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-shadow",
                isSelected
                  ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-background dark:border-bone dark:ring-bone"
                  : "border-border-subtle hover:border-ink dark:hover:border-bone"
              )}
              style={{ backgroundColor: color.swatch }}
            >
              {isSelected && (
                <Check
                  size={14}
                  strokeWidth={2}
                  className={isLight ? "text-ink" : "text-paper"}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function isLightSwatch(hex: string): boolean {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
