"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, amountToFreeShipping } from "@/lib/utils";
import { microTransition } from "@/lib/animations";

/**
 * Full shopping bag page — the dedicated counterpart to the cart
 * drawer, for people who want to review/edit their bag on its own
 * page rather than in the slide-over. Reads/writes the same
 * `useCartStore` so both surfaces always agree.
 */
export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = calculateShipping(totalPrice);
  const remainingForFreeShipping = amountToFreeShipping(totalPrice);

  if (items.length === 0) {
    return (
      <Container as="div" className="py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <ShoppingBag size={28} strokeWidth={1.25} className="text-text-muted" />
            <h1 className="font-display text-3xl sm:text-4xl">Your bag is empty</h1>
            <p className="max-w-sm text-sm text-text-muted">
              Items you add to your bag will show up here.
            </p>
            <Button size="lg" className="mt-2" onClick={() => router.push("/")}>
              Continue shopping
            </Button>
          </div>
        </Reveal>
      </Container>
    );
  }

  return (
    <Container as="div" className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl sm:text-4xl">Shopping Bag</h1>
        <p className="mt-2 text-sm text-text-muted">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col divide-y divide-border-subtle">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.lineId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={microTransition}
                className="flex gap-5 overflow-hidden py-6 first:pt-0"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-32 w-24 shrink-0 overflow-hidden bg-surface-muted sm:h-40 sm:w-32"
                >
                  <Image
                    src={item.product.image.url}
                    alt={item.product.image.alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-text-muted">{item.product.brand}</p>
                      {item.variantLabel && (
                        <p className="mt-1 text-xs text-text-muted">{item.variantLabel}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.lineId)}
                      aria-label={`Remove ${item.product.name} from bag`}
                      className="rounded-full p-1.5 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-3 border border-border-subtle px-2 py-1.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center transition-transform hover:scale-110 active:scale-90"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="w-4 text-center text-xs tabular-nums" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center transition-transform hover:scale-110 active:scale-90"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>

                    <p className="text-sm font-medium">
                      {formatPrice(
                        item.product.price.amount * item.quantity,
                        item.product.price.currency
                      )}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <Reveal delay={0.08}>
          <aside className="sticky top-24 flex flex-col gap-6 bg-surface-muted p-6">
            <h2 className="bb-eyebrow">Order Summary</h2>

            {remainingForFreeShipping > 0 && (
              <p className="text-xs text-text-muted">
                Add {formatPrice(remainingForFreeShipping)} more for free shipping.
              </p>
            )}

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border-subtle pt-3 text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(totalPrice + shipping)}</span>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={() => router.push("/checkout")}>
              Proceed to checkout
            </Button>

            <Link
              href="/"
              className="text-center text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Continue shopping
            </Link>
          </aside>
        </Reveal>
      </div>
    </Container>
  );
}
