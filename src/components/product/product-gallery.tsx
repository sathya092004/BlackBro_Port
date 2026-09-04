"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_EDITORIAL } from "@/lib/animations";
import type { ProductImage } from "@/types";
import { ProductMedia } from "./product-media";
import { FullscreenImageViewer } from "./fullscreen-image-viewer";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

export function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Tracks whether the index moved forward or back so the crossfade
  // can carry a small directional drift instead of a flat dissolve —
  // a cheap opacity+x tween, no layout thrash.
  const direction = useRef(1);

  // Selecting a new colour swaps the image set — reset to its first
  // image. Adjusting state during render (rather than in an effect)
  // avoids an extra cascading render on every colour change.
  const [trackedImages, setTrackedImages] = useState(images);
  if (images !== trackedImages) {
    setTrackedImages(images);
    setActiveIndex(0);
  }

  function selectIndex(i: number) {
    direction.current = i > activeIndex ? 1 : -1;
    setActiveIndex(i);
  }

  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-[4.5rem_1fr] gap-3 sm:grid-cols-[5.5rem_1fr]">
        <div className="flex flex-col gap-3">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => selectIndex(i)}
              aria-label={`Show image ${i + 1}: ${image.caption ?? image.alt}`}
              aria-current={i === activeIndex}
              className={cn(
                "relative aspect-[4/5] overflow-hidden border border-transparent transition-opacity",
                i === activeIndex ? "opacity-100" : "opacity-70 hover:opacity-100"
              )}
            >
              <ProductMedia src={image.url} alt={image.alt} tone={image.tone} mark={false} className="h-full w-full" />
              {i === activeIndex && (
                <motion.span
                  layoutId="gallery-thumb-active"
                  className="pointer-events-none absolute inset-0 border-2 border-ink dark:border-bone"
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction.current}>
            <motion.div
              key={active.id}
              custom={direction.current}
              initial={{ opacity: 0, x: 12 * direction.current }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 * direction.current }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="aspect-[4/5] w-full"
            >
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                aria-label={`Open full screen view of ${productName}`}
                className="group relative block h-full w-full"
              >
                <ProductMedia
                  src={active.url}
                  alt={active.alt}
                  tone={active.tone}
                  caption={active.caption}
                  className="h-full w-full"
                />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-void/40 text-paper opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Expand size={16} strokeWidth={1.5} />
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <FullscreenImageViewer
        images={images}
        index={activeIndex}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
