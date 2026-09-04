"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchStore } from "@/lib/store";
import { searchProducts } from "@/lib/data/discovery";
import { primaryNav } from "@/config/site";
import { formatPrice, cn } from "@/lib/utils";
import { scrimFade, staggerContainer, fadeUp, EASE_EDITORIAL } from "@/lib/animations";
import { IconButton } from "@/components/motion";
import { useScrollLock } from "@/hooks";
import { ProductMedia } from "@/components/product";

/** Flattened quick-jump shortcuts (top-level + nested) for the empty state. */
const quickLinks = primaryNav.flatMap((group) =>
  group.href ? [{ label: group.label, href: group.href }] : group.children ?? []
);

/**
 * Full-screen search takeover ("Search overlay" + "Live product search").
 * Opens from the Navbar or the left-nav rail via `useSearchStore`.
 * Filters the catalogue on every keystroke — no debounce needed against
 * the small in-memory demo dataset — and renders results with a
 * staggered entrance each time the query changes.
 */
export function SearchOverlay() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const results = useMemo(() => searchProducts(query, 8), [query]);

  function handleViewAll() {
    if (!query.trim()) return;
    close();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper"
          variants={scrimFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          onClick={close}
        >
          <div
            className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-16 pt-24 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={close}
              aria-label="Close search"
              className="absolute right-5 top-5 p-2 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper sm:right-8 sm:top-8"
            >
              <X size={22} strokeWidth={1.5} />
            </IconButton>

            <div className="flex items-center gap-4 border-b border-paper/20 pb-4">
              <Search size={20} strokeWidth={1.5} className="shrink-0 text-paper/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleViewAll();
                }}
                placeholder="Search products, categories…"
                aria-label="Search products"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent font-display text-2xl placeholder:text-paper/35 focus:outline-none sm:text-3xl"
              />
            </div>

            <div className="mt-8 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {query.trim() === "" ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="bb-eyebrow text-paper/40">Shop by category</span>
                    <motion.div
                      variants={staggerContainer(0.04)}
                      initial="hidden"
                      animate="visible"
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {quickLinks.map((link) => (
                        <motion.div key={link.href} variants={fadeUp}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className="inline-flex items-center rounded-full border border-paper/20 px-4 py-2 text-sm transition-colors hover:border-paper/60 hover:bg-paper/5"
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ) : results.length === 0 ? (
                  <motion.p
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-paper/50"
                  >
                    No products found for &ldquo;{query}&rdquo;.
                  </motion.p>
                ) : (
                  <motion.div
                    key="results"
                    variants={staggerContainer(0.04)}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                    className="flex flex-col"
                  >
                    {results.map((product) => {
                      const primaryImage =
                        product.images.find((img) => img.isPrimary) ?? product.images[0];
                      return (
                        <motion.div key={product.id} variants={fadeUp}>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={close}
                            className="group flex items-center gap-4 border-b border-paper/10 py-3 transition-colors hover:bg-paper/5"
                          >
                            <div className="h-16 w-14 shrink-0 overflow-hidden">
                              <ProductMedia
                                src={primaryImage?.url}
                                alt={primaryImage?.alt}
                                tone={primaryImage?.tone}
                                mark={false}
                                className="h-full w-full"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm">{product.name}</p>
                              <p className="mt-0.5 text-xs capitalize text-paper/45">
                                {product.category}
                              </p>
                            </div>
                            <p className="shrink-0 text-sm text-paper/70">
                              {formatPrice(product.price.amount, product.price.currency)}
                            </p>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {query.trim() !== "" && (
              <button
                type="button"
                onClick={handleViewAll}
                className={cn(
                  "group mt-6 flex items-center justify-center gap-2 border border-paper/20 py-3 text-xs uppercase tracking-[0.08em] text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
                )}
              >
                View all results for &ldquo;{query}&rdquo;
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
