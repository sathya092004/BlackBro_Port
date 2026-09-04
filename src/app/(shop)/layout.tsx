import type { ReactNode } from "react";
import { ProductQuickView } from "@/components/product";

/**
 * Route-group layout for the shop surface (product + category pages).
 * Mounts the Quick View overlay once here — matching how CartDrawer is
 * mounted once in the root layout — instead of touching the root
 * layout that also renders the homepage.
 */
export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ProductQuickView />
    </>
  );
}
