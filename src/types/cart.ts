import type { ProductSummary } from "./product";

export interface CartLineItem {
  /** Unique per product+variant combination. */
  lineId: string;
  product: ProductSummary;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
}
