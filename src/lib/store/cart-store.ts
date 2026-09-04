import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLineItem, ProductSummary } from "@/types";

interface CartState {
  items: CartLineItem[];
  isOpen: boolean;

  // Derived-ish helpers computed from state
  totalItems: () => number;
  totalPrice: () => number;

  // Actions
  addItem: (product: ProductSummary, variantId?: string, variantLabel?: string, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

function makeLineId(productId: string, variantId?: string) {
  return variantId ? `${productId}::${variantId}` : productId;
}

/**
 * Cart architecture notes:
 * - Persisted to localStorage under "black-bro-cart" so the cart
 *   survives reloads; swap the storage adapter for a server-synced
 *   implementation later without touching call sites.
 * - `isOpen` drives the cart drawer (a slideInRight motion panel),
 *   kept in the same store since it's tightly coupled UI state.
 * - Line items are keyed by product+variant so distinct variants of
 *   the same product don't collapse into one row.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price.amount * item.quantity,
          0
        ),

      addItem: (product, variantId, variantLabel, quantity = 1) => {
        const lineId = makeLineId(product.id, variantId);

        set((state) => {
          const existing = state.items.find((item) => item.lineId === lineId);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.lineId === lineId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: CartLineItem = {
            lineId,
            product,
            variantId,
            variantLabel,
            quantity,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        })),

      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.lineId !== lineId)
              : state.items.map((item) =>
                  item.lineId === lineId ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "black-bro-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
