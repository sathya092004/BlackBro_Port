import type { Product } from "@/types";
import { getAllProducts } from "./products";

/**
 * Discovery helpers — New Arrivals, Best Sellers, and live search.
 * Kept as a separate module (rather than editing `products.ts`) so the
 * source catalogue stays a single, untouched source of truth; these
 * are just read-only views over it.
 */

/** Most recently added products, newest first. */
export function getNewArrivals(limit: number = 12): Product[] {
  return [...getAllProducts()]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Best Sellers — no real sales/order data exists yet in this demo
 * catalogue, so this derives a deterministic, plausible ranking from
 * signals already on the product (marked down, newly launched, decent
 * stock depth) rather than inventing a "sold count" field.
 */
export function getBestSellers(limit: number = 12): Product[] {
  const scored = getAllProducts().map((product, index) => {
    const totalInventory = product.variants.reduce(
      (sum, v) => sum + (v.inventory ?? 0),
      0
    );
    let score = 0;
    if (product.price.compareAtAmount) score += 3;
    if (product.isNew) score += 2;
    if (totalInventory > 15) score += 1;
    if (!product.isSoldOut) score += 1;
    // Deterministic tie-break spread so results don't just mirror catalogue order.
    score += (index * 7) % 5;

    return { product, score };
  });

  return scored
    .filter((s) => !s.product.isSoldOut)
    .sort((a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id))
    .slice(0, limit)
    .map((s) => s.product);
}

/**
 * Live product search — case-insensitive, ranked substring match
 * across name, brand, category, and tags. Cheap enough to run on
 * every keystroke against the in-memory catalogue (no debounce needed).
 */
export function searchProducts(query: string, limit: number = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = getAllProducts()
    .map((product) => {
      const name = product.name.toLowerCase();
      const haystack = [product.name, product.brand, product.category, ...(product.tags ?? [])]
        .join(" ")
        .toLowerCase();

      let score = 0;
      if (name === q) score = 4;
      else if (name.startsWith(q)) score = 3;
      else if (name.includes(q)) score = 2;
      else if (haystack.includes(q)) score = 1;

      return { product, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
