"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={className}>
      <span className="bb-eyebrow text-text-muted">Quantity</span>
      <div
        className={cn(
          "mt-3 inline-flex h-11 items-center border border-border-subtle"
        )}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={quantity <= min}
          onClick={() => onChange(Math.max(min, quantity - 1))}
          className="flex h-full w-11 items-center justify-center transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={quantity >= max}
          onClick={() => onChange(Math.min(max, quantity + 1))}
          className="flex h-full w-11 items-center justify-center transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
