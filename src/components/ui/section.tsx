import type { ElementType, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

const SECTION_SPACING: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-48",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  spacing?: SectionSpacing;
  /** Render children inside a Container. Set false for full-bleed sections. */
  contained?: boolean;
  containerSize?: ContainerProps["size"];
  /** Apply the muted surface background token. */
  muted?: boolean;
}

/**
 * Vertical rhythm primitive — every editorial block on the site
 * (hero, product grid, lookbook strip, etc) should be built as a
 * <Section> so spacing scale and background tokens stay consistent.
 */
export function Section({
  children,
  as: Tag = "section",
  spacing = "md",
  contained = true,
  containerSize = "default",
  muted = false,
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        SECTION_SPACING[spacing],
        muted && "bg-surface-muted",
        className
      )}
      {...props}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </Tag>
  );
}
