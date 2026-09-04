import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** "mark" = icon only (square). "wordmark" = icon + BLACKBRO type (wide). */
  variant?: "mark" | "wordmark";
  /**
   * Rendering context, controls color:
   * - "auto": black mark, inverts to white in dark mode (`dark:invert`)
   * - "light": always black (for permanently light surfaces)
   * - "dark": always white (for permanently dark surfaces, e.g. the ink rail)
   */
  tone?: "auto" | "light" | "dark";
  className?: string;
  /** Pixel height to render at — width is derived from the asset's aspect ratio. */
  height?: number;
  priority?: boolean;
}

const SOURCES = {
  mark: { src: "/logo/mark.png", width: 743, height: 726 },
  wordmark: { src: "/logo/wordmark.png", width: 1626, height: 355 },
} as const;

const TONE_CLASS = {
  auto: "dark:invert",
  light: "",
  dark: "invert",
} as const;

/**
 * BLACK BRO brand mark. Source art is pure black on a transparent
 * background, so dark surfaces simply invert it via CSS filter rather
 * than shipping a second asset.
 */
export function Logo({
  variant = "wordmark",
  tone = "auto",
  className,
  height = 32,
  priority,
}: LogoProps) {
  const source = SOURCES[variant];
  const width = Math.round((source.width / source.height) * height);

  return (
    <Image
  src={source.src}
  alt="BLACK BRO"
  width={width}
  height={height}
  priority={priority}
  className={cn("object-contain", TONE_CLASS[tone], className)}
  style={{ width, height }}
/>
  );
}
