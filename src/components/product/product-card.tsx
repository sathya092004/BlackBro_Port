"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";
import { toProductSummary, type Product } from "@/types";
import { useQuickViewStore, useWishlistStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { EASE_EDITORIAL, microTransition } from "@/lib/animations";
import { ProductMedia } from "./product-media";

interface ProductCardProps {
  product: Product;
  /** Reveal delay for stagger effects when rendered inside a ProductGrid. */
  delayIndex?: number;
}

export function ProductCard({ product, delayIndex = 0 }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  // Second catalogue shot (e.g. a back/detail view), if one exists —
  // crossfaded in on hover so the card reads like a garment being
  // turned rather than a single static photo.
  const secondaryImage = product.images.find((img) => img.id !== primaryImage?.id);
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const openQuickView = useQuickViewStore((s) => s.open);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: delayIndex * 0.05, duration: 0.5, ease: EASE_EDITORIAL } }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            className="relative"
          >
            <ProductMedia
              src={primaryImage?.url}
              alt={primaryImage?.alt}
              tone={primaryImage?.tone}
              caption={product.category}
              className="aspect-[4/5] w-full"
            />
            {secondaryImage && (
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
              >
                <ProductMedia
                  src={secondaryImage.url}
                  alt={secondaryImage.alt}
                  tone={secondaryImage.tone}
                  caption={product.category}
                  className="h-full w-full"
                />
              </motion.div>
            )}
          </motion.div>

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && !product.isSoldOut && (
              <span className="bb-eyebrow rounded-full bg-ink px-2.5 py-1 text-[10px] text-paper dark:bg-bone dark:text-void">
                New
              </span>
            )}
            {product.price.compareAtAmount && !product.isSoldOut && (
              <span className="bb-eyebrow rounded-full bg-signal px-2.5 py-1 text-[10px] text-paper">
                Sale
              </span>
            )}
            {product.isSoldOut && (
              <span className="bb-eyebrow rounded-full bg-stone px-2.5 py-1 text-[10px] text-paper">
                Sold out
              </span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(toProductSummary(product));
            }}
            whileTap={{ scale: 0.88 }}
            transition={microTransition}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 dark:bg-void/70 dark:text-bone"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isWishlisted ? "filled" : "empty"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="flex"
              >
                <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            whileTap={{ scale: 0.97 }}
            transition={microTransition}
            className={cn(
              "absolute inset-x-3 bottom-3 flex h-10 translate-y-2 items-center justify-center gap-2 bg-paper/95 text-xs uppercase tracking-[0.08em] text-ink opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-void/85 dark:text-bone",
              product.isSoldOut && "pointer-events-none opacity-0"
            )}
          >
            <Eye size={14} strokeWidth={1.5} />
            Quick view
          </motion.button>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm">{product.name}</p>
            <p className="mt-0.5 text-xs text-text-muted">{product.brand}</p>
          </div>
          <p className="text-sm text-text-muted">
            {product.price.compareAtAmount && (
              <span className="mr-2 line-through">
                {formatPrice(product.price.compareAtAmount, product.price.currency)}
              </span>
            )}
            <span className={cn(product.price.compareAtAmount && "text-signal")}>
              {formatPrice(product.price.amount, product.price.currency)}
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
