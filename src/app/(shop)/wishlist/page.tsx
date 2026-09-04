"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { Reveal, IconButton } from "@/components/motion";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { microTransition } from "@/lib/animations";

/**
 * Wishlist page — the saved-items counterpart to the cart page.
 * Reads/writes `useWishlistStore` directly (same store the product
 * card heart button and PDP wishlist toggle use), so state stays in
 * sync everywhere. "Move to bag" adds the item to the cart store and
 * removes it from the wishlist in one action.
 */
export default function WishlistPage() {
  const router = useRouter();
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleMoveToCart(productId: string) {
    const item = items.find((i) => i.product.id === productId);
    if (!item) return;
    addToCart(item.product);
    removeItem(productId);
    openCart();
  }

  if (items.length === 0) {
    return (
      <Container as="div" className="py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <Heart size={28} strokeWidth={1.25} className="text-text-muted" />
            <h1 className="font-display text-3xl sm:text-4xl">Your wishlist is empty</h1>
            <p className="max-w-sm text-sm text-text-muted">
              Tap the heart on any product to save it here for later.
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
        <h1 className="font-display text-3xl sm:text-4xl">Wishlist</h1>
        <p className="mt-2 text-sm text-text-muted">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
              transition={microTransition}
              className="group relative"
            >
              <IconButton
                onClick={() => removeItem(item.product.id)}
                aria-label={`Remove ${item.product.name} from wishlist`}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-paper/90 text-ink backdrop-blur-sm dark:bg-void/70 dark:text-bone"
              >
                <X size={16} strokeWidth={1.5} />
              </IconButton>

              <Link href={`/products/${item.product.slug}`} className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted">
                  <Image
                    src={item.product.image.url}
                    alt={item.product.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm">{item.product.name}</p>
                    <p className="mt-0.5 text-xs text-text-muted">{item.product.brand}</p>
                  </div>
                  <p className="text-sm text-text-muted">
                    {formatPrice(item.product.price.amount, item.product.price.currency)}
                  </p>
                </div>
              </Link>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                className="mt-3"
                onClick={() => handleMoveToCart(item.product.id)}
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                Move to bag
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Container>
  );
}
