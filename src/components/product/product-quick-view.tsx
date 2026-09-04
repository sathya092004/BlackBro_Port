"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { IconButton } from "@/components/motion";
import { useCartStore, useQuickViewStore } from "@/lib/store";
import { scrimFade, EASE_EDITORIAL } from "@/lib/animations";
import { useScrollLock } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import { getColorOptions, getSizeOptions, buildVariantSelection, getGalleryImages } from "@/lib/utils/product-options";
import { toProductSummary } from "@/types";
import { ProductMedia } from "./product-media";
import { SizeSelector } from "./size-selector";
import { ColorSelector } from "./color-selector";
import { QuantitySelector } from "./quantity-selector";

export function ProductQuickView() {
  const product = useQuickViewStore((s) => s.product);
  const isOpen = useQuickViewStore((s) => s.isOpen);
  const close = useQuickViewStore((s) => s.close);
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useScrollLock(isOpen);

  // Reset local selection state whenever a new product is opened.
  // Adjusting state during render (rather than in an effect) avoids an
  // extra cascading render each time a product is opened.
  const [trackedProduct, setTrackedProduct] = useState(product);
  if (product !== trackedProduct) {
    setTrackedProduct(product);
    const sizes = product ? getSizeOptions(product) : [];
    const colors = product ? getColorOptions(product) : [];
    setSelectedSize(sizes.find((s) => s.available)?.value ?? null);
    setSelectedColor(colors[0]?.value ?? null);
    setQuantity(1);
    setJustAdded(false);
  }

  if (!product) return null;

  const sizes = getSizeOptions(product);
  const colors = getColorOptions(product);
  const images = getGalleryImages(product, selectedColor);
  const heroImage = images[0];

  function handleAddToCart() {
    if (!product) return;
    const { variantId, variantLabel } = buildVariantSelection(selectedSize, selectedColor);
    addToCart(toProductSummary(product), variantId, variantLabel, quantity);
    setJustAdded(true);
    openCart();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="quick-view-scrim"
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-[2px]"
            variants={scrimFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            key="quick-view-panel"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[88vh] max-w-3xl -translate-y-1/2 overflow-y-auto bg-paper text-ink sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 dark:bg-void dark:text-bone"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view — ${product.name}`}
          >
            <IconButton
              onClick={close}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 bg-paper/90 p-2 hover:bg-surface-muted dark:bg-void/80"
            >
              <X size={18} strokeWidth={1.5} />
            </IconButton>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={heroImage?.id ?? "empty"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                    className="absolute inset-0"
                  >
                    <ProductMedia
                      src={heroImage?.url}
                      alt={heroImage?.alt}
                      tone={heroImage?.tone}
                      caption={heroImage?.caption}
                      className="h-full w-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div>
                  <p className="bb-eyebrow text-text-muted">{product.brand}</p>
                  <h2 className="mt-1 font-display text-2xl">{product.name}</h2>
                  <p className="mt-2 text-sm">
                    {product.price.compareAtAmount && (
                      <span className="mr-2 text-text-muted line-through">
                        {formatPrice(product.price.compareAtAmount, product.price.currency)}
                      </span>
                    )}
                    {formatPrice(product.price.amount, product.price.currency)}
                  </p>
                </div>

                <p className="text-sm text-text-muted">{product.description}</p>

                <ColorSelector colors={colors} selected={selectedColor} onSelect={setSelectedColor} />
                <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
                <QuantitySelector quantity={quantity} onChange={setQuantity} />

                <div className="mt-2 flex flex-col gap-3">
                  <Button
                    size="lg"
                    fullWidth
                    disabled={product.isSoldOut || (sizes.length > 0 && !selectedSize)}
                    onClick={handleAddToCart}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={justAdded ? "added" : "idle"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                      >
                        {product.isSoldOut ? "Sold out" : justAdded ? "Added" : "Add to bag"}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={close}
                    className="text-center text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    View full details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
