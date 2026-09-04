"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MediaTone } from "@/types";

const TONE_GRADIENTS: Record<MediaTone, string> = {
  onyx: "from-[#2b2b28] via-[#161615] to-[#050505]",
  graphite: "from-[#3a3936] via-[#221f1c] to-[#0a0a09]",
  bone: "from-[#efece5] via-[#ddd8cd] to-[#b9b2a3]",
  void: "from-[#141414] via-[#050505] to-[#000000]",
  gold: "from-[#c9a877] via-[#8f6f45] to-[#332619]",
};

interface ProductMediaProps {
  /** Real photo URL (e.g. from a product's `images[]`). When present
   *  and loadable, this renders instead of the placeholder tile. */
  src?: string;
  /** Alt text for the real photo. Falls back to `caption` or "Product photo". */
  alt?: string;
  tone?: MediaTone;
  caption?: string;
  className?: string;
  mark?: boolean;
  children?: React.ReactNode;
}

/**
 * Product photo slot. Renders a real image when `src` is given and
 * loads successfully; otherwise (no `src`, or the image 404s/errors)
 * falls back to the editorial placeholder tile so the catalogue never
 * shows a broken-image icon.
 */
export function ProductMedia({
  src,
  alt,
  tone = "onyx",
  caption,
  className,
  mark = true,
  children,
}: ProductMediaProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const isLight = tone === "bone" || tone === "gold";
  const showImage = !!src && !imageFailed;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br",
        TONE_GRADIENTS[tone],
        className
      )}
    >
      {showImage && (
        <Image
          src={src}
          alt={alt || caption || "Product photo"}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      )}

      {/* Grain + mark + caption stay under the real photo when one
          loads, and act as the placeholder tile when it doesn't. */}
      <div
        className={cn(
          "bb-grain absolute inset-0 opacity-[0.18] mix-blend-overlay",
          showImage && "opacity-0"
        )}
        aria-hidden="true"
      />

      {mark && !showImage && (
        <svg
          viewBox="0 0 120 200"
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-[70%] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]",
            isLight ? "text-ink" : "text-paper"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M60 6c-14 0-22 10-22 22 0 9 5 15 5 15s-24 8-24 34v107c0 4 3 6 6 6h70c3 0 6-2 6-6V77c0-26-24-34-24-34s5-6 5-15c0-12-8-22-22-22Z" />
          <path d="M46 40c4 6 9 9 14 9s10-3 14-9" />
        </svg>
      )}

      {caption && (
        <span
          className={cn(
            "bb-eyebrow absolute bottom-3 left-3",
            showImage ? "text-paper/80" : isLight ? "text-ink/60" : "text-paper/60"
          )}
        >
          {caption}
        </span>
      )}

      {children}
    </div>
  );
}
