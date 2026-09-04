"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while `locked` is true — used by the left side
 * navigation, cart drawer, and wishlist drawer so the background
 * page doesn't scroll behind an open overlay.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    document.documentElement.classList.add("bb-scroll-lock");
    return () => {
      document.documentElement.classList.remove("bb-scroll-lock");
    };
  }, [locked]);
}
