"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { shopTheLook } from "@/lib/data/homepage";
import { getProductBySlug } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { editorialTransition } from "@/lib/animations";

export function ShopTheLook() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Section spacing="lg">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <div
            className="relative aspect-[4/5] w-full"
            onClick={() => setActiveId(null)}
          >
            <MediaFrame tone="onyx" className="h-full w-full" />

            {shopTheLook.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(activeId === hotspot.id ? null : hotspot.id);
                  }}
                  aria-label="View product"
                >
                  <motion.span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm"
                    animate={{ rotate: activeId === hotspot.id ? 45 : 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={editorialTransition}
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeId === hotspot.id && (
                    <ProductPopover
                      slug={hotspot.productSlug}
                      onClose={() => setActiveId(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="bb-eyebrow text-text-muted">Editorial</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{shopTheLook.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-sm text-sm text-text-muted">{shopTheLook.copy}</p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            {shopTheLook.hotspots.map((hotspot, i) => {
              const product = getProductBySlug(hotspot.productSlug);
              if (!product) return null;
              return (
                <Reveal key={hotspot.id} delay={0.16 + i * 0.05}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between border-b border-border-subtle pb-4 text-sm transition-colors hover:text-text-muted"
                  >
                    <span>{product.name}</span>
                    <span>{formatPrice(product.price.amount, product.price.currency)}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProductPopover({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const product = getProductBySlug(slug);
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={editorialTransition}
      className="absolute left-1/2 top-full z-10 mt-3 w-48 -translate-x-1/2 bg-paper p-4 text-left text-ink shadow-lg dark:bg-void dark:text-bone"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-2 top-2 text-text-muted"
        aria-label="Close"
      >
        <X size={12} strokeWidth={1.5} />
      </button>
      <p className="text-xs">{product.name}</p>
      <p className="mt-1 text-xs text-text-muted">
        {formatPrice(product.price.amount, product.price.currency)}
      </p>
    </motion.div>
  );
}
