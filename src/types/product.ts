/**
 * Product data structure.
 * Shaped to scale toward a real backend/CMS (variants, inventory,
 * localized pricing) without breaking consumers of the base type.
 */

/** Placeholder tones for editorial media frames — mirrors the palette
 *  used by `components/home/media-frame.tsx` (kept as a decoupled
 *  copy here since product data shouldn't import a home component). */
export type MediaTone = "onyx" | "graphite" | "bone" | "void" | "gold";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  /** Marks the image used in grid/card thumbnails. */
  isPrimary?: boolean;
  /** Placeholder frame tone (no real photography yet — see MediaFrame). */
  tone?: MediaTone;
  /** Short shot label — "Front", "Back", "Detail", "On model". */
  caption?: string;
  /** Ties this image to a specific colour variant's value, so the
   *  gallery can filter to the selected colour when one is chosen. */
  colorValue?: string;
}

export interface ProductVariant {
  id: string;
  /** e.g. "Size", "Colour" */
  optionName: string;
  value: string;
  /** Absolute stock for this variant; undefined = not tracked. */
  inventory?: number;
  priceOverride?: number;
  /** Hex swatch — only set on "Colour" variants. */
  swatch?: string;
}

/** Structured fit guidance shown in the PDP fit-information panel. */
export interface ProductFitInfo {
  description: string;
  modelInfo?: string;
  sizingNote?: string;
}

export interface ProductPrice {
  amount: number;
  currency: string;
  compareAtAmount?: number; // original price, for markdowns
}

export type ProductCategory =
  | "new-arrivals"
  | "outerwear"
  | "knitwear"
  | "shirting"
  | "trousers"
  | "bags"
  | "belts"
  | "eyewear"
  | "footwear"
  // ---- Shop taxonomy (category landing pages) ----
  | "men"
  | "women"
  | "formal"
  | "casuals"
  | "inners"
  | "accessories"
  | "additionals";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  category: ProductCategory;
  gender?: "men" | "women" | "unisex";
  price: ProductPrice;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Selling points shown in the PDP "Features" panel. */
  features?: string[];
  /** Composition/material breakdown shown in the "Materials" panel. */
  materials?: string[];
  /** Sizing/fit guidance shown in the "Fit information" panel. */
  fit?: ProductFitInfo;
  tags?: string[];
  isSoldOut?: boolean;
  isNew?: boolean;
  createdAt: string; // ISO date
}

/** Minimal shape needed by cart/wishlist line items — decoupled from
 *  the full Product so those stores don't hold redundant/staled data. */
export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: ProductPrice;
  image: ProductImage;
}

export function toProductSummary(product: Product): ProductSummary {
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: primaryImage,
  };
}
