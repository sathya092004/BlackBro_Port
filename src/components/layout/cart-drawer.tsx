"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { slideInRight, scrimFade, microTransition, EASE_EDITORIAL } from "@/lib/animations";
import { useScrollLock } from "@/hooks";
import { formatPrice, calculateShipping, amountToFreeShipping } from "@/lib/utils";
import { Button } from "@/components/ui";
import { IconButton } from "@/components/motion";

/**
 * Right-side cart drawer — line items, quantity controls, and an
 * order summary (subtotal / shipping / total) that feeds straight
 * into the /checkout flow. Mirrors the wishlist panel's drawer
 * pattern (scrim + slide-in-right spring).
 */
export function CartDrawer() {
  const router = useRouter();
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());
  const shipping = calculateShipping(totalPrice);
  const remainingForFreeShipping = amountToFreeShipping(totalPrice);

  useScrollLock(isOpen);

  function handleCheckout() {
    closeCart();
    router.push("/checkout");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-scrim"
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-[2px]"
            variants={scrimFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            key="cart-panel"
            className="fixed inset-y-0 right-0 z-50 flex h-dvh w-[90vw] max-w-md flex-col bg-paper text-ink dark:bg-void dark:text-bone"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="bb-eyebrow">Cart ({totalItems})</span>
              <IconButton
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 hover:bg-surface-muted"
              >
                <X size={18} strokeWidth={1.5} />
              </IconButton>
            </div>

            <div className="bb-hairline" />

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <p className="text-sm text-text-muted">Your cart is empty.</p>
                  <Button variant="secondary" size="sm" onClick={closeCart}>
                    Continue shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.lineId}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={microTransition}
                        className="flex gap-4 overflow-hidden"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-muted">
                          <Image
                            src={item.product.image.url}
                            alt={item.product.image.alt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.product.name}</p>
                            {item.variantLabel && (
                              <p className="text-xs text-text-muted">{item.variantLabel}</p>
                            )}
                            <p className="mt-1 text-sm">
                              {formatPrice(item.product.price.amount, item.product.price.currency)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-border-subtle px-2 py-1">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                                className="transition-transform hover:scale-110 active:scale-90"
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="relative flex w-3 justify-center overflow-hidden text-xs tabular-nums" aria-live="polite">
                                <AnimatePresence mode="popLayout" initial={false}>
                                  <motion.span
                                    key={item.quantity}
                                    initial={{ y: 8, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -8, opacity: 0 }}
                                    transition={{ duration: 0.18, ease: EASE_EDITORIAL }}
                                  >
                                    {item.quantity}
                                  </motion.span>
                                </AnimatePresence>
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                className="transition-transform hover:scale-110 active:scale-90"
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.lineId)}
                              className="text-xs text-text-muted underline-offset-4 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border-subtle px-6 py-6">
                {remainingForFreeShipping > 0 && (
                  <p className="mb-4 text-xs text-text-muted">
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

                <div className="mt-5 flex flex-col gap-3">
                  <Button fullWidth size="lg" onClick={handleCheckout}>
                    Checkout
                  </Button>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-center text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    View full bag
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
