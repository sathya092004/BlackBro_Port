import type { ProductSummary } from "./product";

export interface WishlistItem {
  product: ProductSummary;
  addedAt: string; // ISO date
}
