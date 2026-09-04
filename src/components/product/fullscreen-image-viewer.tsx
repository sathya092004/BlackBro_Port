"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useScrollLock } from "@/hooks";
import { scrimFade, EASE_EDITORIAL } from "@/lib/animations";
import { IconButton } from "@/components/motion";
import type { ProductImage } from "@/types";
import { ProductMedia } from "./product-media";

interface FullscreenImageViewerProps {
  images: ProductImage[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-bleed lightbox for the active product gallery — opened from
 * ProductGallery's main frame. Supports keyboard (Esc/arrows) and
 * on-screen prev/next navigation, wrapping at the ends.
 */
export function FullscreenImageViewer({
  images,
  index,
  isOpen,
  onClose,
  onNavigate,
}: FullscreenImageViewerProps) {
  useScrollLock(isOpen);

  // Tracks navigation direction so the crossfade carries a small
  // directional drift (left/right) rather than a flat dissolve.
  const direction = useRef(1);

  function goTo(nextIndex: number) {
    direction.current = nextIndex > index || (index === images.length - 1 && nextIndex === 0) ? 1 : -1;
    onNavigate(nextIndex);
  }

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo((index + 1) % images.length);
      if (e.key === "ArrowLeft") goTo((index - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, images.length, onClose]);

  const active = images[index];

  return (
    <AnimatePresence>
      {isOpen && active && (
        <motion.div
          key="fullscreen-viewer"
          className="fixed inset-0 z-[60] flex flex-col bg-void"
          variants={scrimFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.alt} — full screen view`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="bb-eyebrow text-paper/70">
              {index + 1} / {images.length}
            </span>
            <IconButton
              onClick={onClose}
              aria-label="Close full screen view"
              className="p-2 text-paper transition-colors hover:bg-paper/10"
            >
              <X size={20} strokeWidth={1.5} />
            </IconButton>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-12">
            <AnimatePresence mode="wait" initial={false} custom={direction.current}>
              <motion.div
                key={active.id}
                custom={direction.current}
                initial={{ opacity: 0, x: 24 * direction.current }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * direction.current }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="relative h-full w-full max-w-3xl"
              >
                <ProductMedia
                  src={active.url}
                  alt={active.alt}
                  tone={active.tone}
                  caption={active.caption}
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous image"
                  onClick={() => goTo((index - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-paper transition-colors hover:bg-paper/10 sm:left-4"
                >
                  <ChevronLeft size={28} strokeWidth={1.25} />
                </IconButton>
                <IconButton
                  aria-label="Next image"
                  onClick={() => goTo((index + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-paper transition-colors hover:bg-paper/10 sm:right-4"
                >
                  <ChevronRight size={28} strokeWidth={1.25} />
                </IconButton>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
