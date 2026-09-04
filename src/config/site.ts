import type { MediaTone } from "@/types";

/**
 * Central site configuration.
 * Navigation, brand metadata, and route constants live here so
 * components never hardcode strings that might change.
 */

export const siteConfig = {
  name: "BLACK BRO",
  shortName: "BB",
  description:
    "BLACK BRO — premium international menswear and lifestyle apparel.",
  url: "https://blackbro.com",
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** One-line description shown in the desktop flyout panel. */
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Omit for a pure grouping header (e.g. "Clothing") that only
   *  exists to hold children — not a navigable destination itself. */
  href?: string;
  /** Sub-links shown when this group is expanded (side nav accordion
   *  and desktop rail flyout). */
  children?: NavLink[];
  /** Editorial placeholder tone used for the flyout preview tile. */
  tone?: MediaTone;
  /** Short line shown under the label in the desktop flyout. */
  description?: string;
}

/** Top-level utility links shown in the navbar (right side). */
export const utilityNav: NavLink[] = [
  { label: "Search", href: "/search" },
  { label: "Account", href: "/account" },
];

/**
 * Primary navigation architecture — powers the desktop left-side rail,
 * the mobile drawer, and any future nav surface. "Clothing" is a
 * grouping-only header (no href) whose children route to the existing
 * `/category/[slug]` landing pages.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Men",
    href: "/category/men",
    tone: "graphite",
    description: "Tailoring, outerwear & everyday staples.",
  },
  {
    label: "Women",
    href: "/category/women",
    tone: "bone",
    description: "Considered ready-to-wear, cut for movement.",
  },
  {
    label: "Clothing",
    tone: "onyx",
    description: "Formal, casual & foundational layers.",
    children: [
      { label: "Formal", href: "/category/formal", description: "Sharp tailoring for the occasion." },
      { label: "Casuals", href: "/category/casuals", description: "Relaxed pieces for everyday wear." },
      { label: "Inners", href: "/category/inners", description: "Foundational layers, soft fabrications." },
    ],
  },
  {
    label: "Accessories",
    href: "/category/accessories",
    tone: "void",
    description: "The details that pull an outfit together.",
  },
  {
    label: "Additionals",
    href: "/category/additionals",
    tone: "gold",
    description: "Small-batch pieces outside the core line.",
  },
  {
    label: "New Arrivals",
    href: "/new-arrivals",
    tone: "graphite",
    description: "Fresh into the studio this week.",
  },
  {
    label: "Best Sellers",
    href: "/best-sellers",
    tone: "onyx",
    description: "The pieces everyone keeps reaching for.",
  },
  {
    label: "Collections",
    href: "/collections",
    tone: "bone",
    description: "Browse the full shop, by category.",
  },
];
