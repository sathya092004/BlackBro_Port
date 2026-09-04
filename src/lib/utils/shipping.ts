/**
 * Shipping calculation — centralized so the cart drawer, cart page,
 * and checkout summary always agree on the same rate/threshold.
 */
export const FREE_SHIPPING_THRESHOLD = 200;
export const STANDARD_SHIPPING_RATE = 12;

/** Flat-rate shipping with a free-shipping threshold. */
export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_RATE;
}

/** Amount remaining to unlock free shipping (0 once qualified). */
export function amountToFreeShipping(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
