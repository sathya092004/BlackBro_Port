import type { ElementType, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide" | "full";

const CONTAINER_SIZES: Record<ContainerSize, string> = {
  default: "max-w-[var(--bb-container-max)]",
  narrow: "max-w-4xl",
  wide: "max-w-[110rem]",
  full: "max-w-none",
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: ContainerSize;
  as?: ElementType;
}

/**
 * Horizontal layout primitive — centers content and applies the
 * global gutter. Use instead of ad-hoc `max-w-*` + `mx-auto` classes
 * so the site-wide max width stays a single source of truth.
 */
export function Container({
  children,
  size = "default",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-(--bb-gutter) sm:px-8 lg:px-12",
        CONTAINER_SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
