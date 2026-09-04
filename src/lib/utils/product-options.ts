import type { Product, ProductImage, ProductVariant } from "@/types";

/**
 * Product variants are stored as a flat list of single-axis entries
 * (`optionName` + `value`) rather than precomputed size/colour lists —
 * these helpers derive the two axes on demand so selector components
 * don't each re-implement the same filtering.
 */

export interface SizeOption {
  value: string;
  variantId: string;
  available: boolean;
  inventory?: number;
}

export interface ColorOption {
  value: string;
  variantId: string;
  swatch: string;
}

function isSizeAxis(optionName: string) {
  return optionName.toLowerCase() === "size";
}

function isColorAxis(optionName: string) {
  const key = optionName.toLowerCase();
  return key === "colour" || key === "color";
}

export function getSizeOptions(product: Product): SizeOption[] {
  return product.variants
    .filter((v: ProductVariant) => isSizeAxis(v.optionName))
    .map((v) => ({
      value: v.value,
      variantId: v.id,
      available: (v.inventory ?? 1) > 0,
      inventory: v.inventory,
    }));
}

export function getColorOptions(product: Product): ColorOption[] {
  return product.variants
    .filter((v: ProductVariant) => isColorAxis(v.optionName))
    .map((v) => ({
      value: v.value,
      variantId: v.id,
      swatch: v.swatch ?? "#8c8880",
    }));
}

/** Builds a stable, opaque cart line identifier from the selected axes. */
export function buildVariantSelection(size?: string | null, color?: string | null) {
  const parts = [size, color].filter(Boolean);
  if (parts.length === 0) return { variantId: undefined, variantLabel: undefined };
  return {
    variantId: parts.join("::").toLowerCase().replace(/\s+/g, "-"),
    variantLabel: parts.join(" / "),
  };
}

/** Resolves the image set to display in the gallery for a given colour
 *  selection — falls back to the full image list when nothing matches
 *  (either no colour is selected, or the product only has one colourway). */
export function getGalleryImages(product: Product, selectedColor?: string | null): ProductImage[] {
  if (!selectedColor) return product.images;
  const filtered = product.images.filter((img) => img.colorValue === selectedColor);
  return filtered.length > 0 ? filtered : product.images;
}
