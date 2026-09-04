/**
 * Format a minor-unit-free numeric price into a currency string.
 * Centralized so currency formatting is consistent across the site
 * (product cards, cart, checkout summaries, etc).
 */
export function formatPrice(
  amount: number,
  currency: string = "INR",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
