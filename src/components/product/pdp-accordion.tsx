"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PdpAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/** A single collapsible PDP info panel — description, features,
 *  materials, fit information all share this shell so the section
 *  header/expand behavior stays consistent. */
export function PdpAccordion({
  title,
  children,
  defaultOpen = false,
  className,
}: PdpAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-t border-border-subtle", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="bb-eyebrow">{title}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-text-muted">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
