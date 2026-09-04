import { create } from "zustand";

interface SearchOverlayState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Search overlay open/closed state — mirrors QuickView's shape
 * (transient UI, not persisted). Kept as its own store so the
 * Navbar, the desktop left-nav rail, and the mobile drawer can all
 * trigger the same overlay without prop-drilling a handler through
 * every layout component.
 */
export const useSearchStore = create<SearchOverlayState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
