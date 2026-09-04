"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FrameTone = "onyx" | "graphite" | "bone" | "void" | "gold";

const TONE_GRADIENTS: Record<FrameTone, string> = {
  onyx: "from-[#2b2b28] via-[#161615] to-[#050505]",
  graphite: "from-[#3a3936] via-[#221f1c] to-[#0a0a09]",
  bone: "from-[#efece5] via-[#ddd8cd] to-[#b9b2a3]",
  void: "from-[#141414] via-[#050505] to-[#000000]",
  gold: "from-[#c9a877] via-[#8f6f45] to-[#332619]",
};

interface MediaFrameProps {
  /** Real photo URL. When present and loadable, renders instead of
   *  the placeholder gradient. */
  src?: string;
  /** Alt text for the real photo. Falls back to `caption`. */
  alt?: string;
  tone?: FrameTone;
  className?: string;
  /** Small caption pinned to a corner — e.g. a look index or category. */
  caption?: string;
  /** Render the faint garment silhouette mark. */
  mark?: boolean;
  children?: React.ReactNode;
}

/**
 * Editorial media slot. Renders a real photo when `src` is given and
 * loads successfully; otherwise falls back to a duotone gradient
 * field with fine grain and an optional silhouette mark, so every
 * homepage section reads consistently before real photography lands.
 */
export function MediaFrame({
  src,
  alt,
  tone = "onyx",
  className,
  caption,
  mark = true,
  children,
}: MediaFrameProps) {
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
      aria-hidden="true"
    >
      {showImage && (
        <Image
          src={src}
          alt={alt || caption || ""}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      )}

      <div
        className={cn(
          "bb-grain absolute inset-0 opacity-[0.18] mix-blend-overlay",
          showImage && "opacity-0"
        )}
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
        >
          <path d="M60 6c-14 0-22 10-22 22 0 9 5 15 5 15s-24 8-24 34v107c0 4 3 6 6 6h70c3 0 6-2 6-6V77c0-26-24-34-24-34s5-6 5-15c0-12-8-22-22-22Z" />
          <path d="M46 40c4 6 9 9 14 9s10-3 14-9" />
        </svg>
      )}

      {caption && (
        <span
          className={cn(
            "bb-eyebrow absolute bottom-4 left-4",
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
