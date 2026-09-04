import type { MediaTone, ProductCategory } from "@/types";

export interface CategoryInfo {
  slug: string;
  category: ProductCategory;
  label: string;
  eyebrow: string;
  description: string;
  tone: MediaTone;
}

/**
 * The seven top-level shop categories. Each backs a `/category/[slug]`
 * landing page — kept as a static, finite list (rather than derived
 * from product data) so the pages exist even before a category has
 * any products in it.
 */
export const categories: CategoryInfo[] = [
  {
    slug: "men",
    category: "men",
    label: "Men",
    eyebrow: "Menswear",
    description:
      "Tailoring, outerwear, and everyday staples built from honest materials.",
    tone: "graphite",
  },
  {
    slug: "women",
    category: "women",
    label: "Women",
    eyebrow: "Womenswear",
    description: "Considered ready-to-wear, cut for movement and built to last.",
    tone: "bone",
  },
  {
    slug: "formal",
    category: "formal",
    label: "Formal",
    eyebrow: "Formalwear",
    description: "Sharp tailoring for the occasions that call for it.",
    tone: "onyx",
  },
  {
    slug: "casuals",
    category: "casuals",
    label: "Casuals",
    eyebrow: "Everyday",
    description: "Relaxed, wearable pieces for life outside the office.",
    tone: "gold",
  },
  {
    slug: "inners",
    category: "inners",
    label: "Inners",
    eyebrow: "Innerwear",
    description: "Foundational layers in soft, breathable fabrications.",
    tone: "bone",
  },
  {
    slug: "accessories",
    category: "accessories",
    label: "Accessories",
    eyebrow: "Finishing touches",
    description: "The details that pull an outfit together.",
    tone: "void",
  },
  {
    slug: "additionals",
    category: "additionals",
    label: "Additionals",
    eyebrow: "Extras",
    description: "Small-batch and limited pieces outside the core line.",
    tone: "graphite",
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
