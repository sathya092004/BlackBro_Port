import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductSummary, WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];

  isWishlisted: (productId: string) => boolean;
  toggleItem: (product: ProductSummary) => void;
  addItem: (product: ProductSummary) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

/**
 * Wishlist architecture mirrors the cart store's shape (persisted,
 * ProductSummary-based) so both can later share a generic
 * "saved collection" abstraction if the product surface grows
 * (e.g. multiple named wishlists).
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      isWishlisted: (productId) =>
        get().items.some((item) => item.product.id === productId),

      toggleItem: (product) => {
        const exists = get().isWishlisted(product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      addItem: (product) =>
        set((state) => {
          if (state.items.some((item) => item.product.id === product.id)) {
            return state;
          }
          return {
            items: [...state.items, { product, addedAt: new Date().toISOString() }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "black-bro-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
