import { create } from "zustand";
import type { Product } from "@/types";

interface QuickViewState {
  product: Product | null;
  isOpen: boolean;
  open: (product: Product) => void;
  close: () => void;
}

/**
 * Quick View architecture mirrors the cart/wishlist stores (isOpen +
 * actions), but intentionally isn't persisted — quick view state is
 * transient UI, not something that should survive a reload.
 */
export const useQuickViewStore = create<QuickViewState>()((set) => ({
  product: null,
  isOpen: false,
  open: (product) => set({ product, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
