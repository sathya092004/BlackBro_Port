"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Container, Logo } from "@/components/ui";
import { IconButton } from "@/components/motion";
import { SideNav, LeftNav, SearchOverlay } from "@/components/navigation";
import { siteConfig } from "@/config/site";
import { useScrollDirection } from "@/hooks";
import { useCartStore, useWishlistStore, useSearchStore } from "@/lib/store";
import { microTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Global Navbar.
 * - Triggers the mobile SideNav drawer (hamburger hidden at `lg`+,
 *   where the persistent LeftNav rail takes over).
 * - Shrinks slightly once the page is scrolled (editorial feel).
 * - Surfaces cart/wishlist counts sourced from their respective stores.
 */
export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isScrolled } = useScrollDirection();
  const openSearch = useSearchStore((state) => state.open);

  const cartCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-30 w-full border-b border-border-subtle bg-background/90 backdrop-blur-md transition-[height] duration-300",
          isScrolled ? "h-[var(--bb-header-height-scrolled)]" : "h-[var(--bb-header-height)]"
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            <IconButton
              onClick={() => setIsNavOpen(true)}
              aria-label="Open menu"
              className="p-2 hover:bg-surface-muted lg:hidden"
            >
              <Menu size={20} strokeWidth={1.5} />
            </IconButton>
            <IconButton
              onClick={openSearch}
              aria-label="Search"
              className="hidden p-2 hover:bg-surface-muted sm:inline-flex"
            >
              <Search size={18} strokeWidth={1.5} />
            </IconButton>
          </div>

          <Link
            href="/"
            className="flex items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo variant="wordmark" height={42} priority />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1">
            <IconButton
              onClick={openSearch}
              aria-label="Search"
              className="p-2 hover:bg-surface-muted sm:hidden"
            >
              <Search size={18} strokeWidth={1.5} />
            </IconButton>

            <IconLink href="/account" label="Account">
              <User size={18} strokeWidth={1.5} />
            </IconLink>

            <IconLink href="/wishlist" label="Wishlist" count={wishlistCount}>
              <Heart size={18} strokeWidth={1.5} />
            </IconLink>

            <IconButton
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 hover:bg-surface-muted"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && <CountBadge count={cartCount} />}
            </IconButton>
          </div>
        </Container>
      </motion.header>

      <LeftNav />
      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <SearchOverlay />
    </>
  );
}

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative rounded-full p-2 transition-colors hover:bg-surface-muted"
    >
      <motion.span
        className="flex"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        transition={microTransition}
      >
        {children}
      </motion.span>
      {!!count && count > 0 && <CountBadge count={count} />}
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={microTransition}
      className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] text-paper dark:bg-bone dark:text-void"
    >
      {count > 9 ? "9+" : count}
    </motion.span>
  );
}
