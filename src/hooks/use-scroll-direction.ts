"use client";

import { useEffect, useState } from "react";

interface ScrollInfo {
  direction: "up" | "down";
  isScrolled: boolean;
}

/**
 * Tracks scroll direction and a "past threshold" flag so the navbar
 * can shrink/hide on scroll, mirroring premium editorial sites
 * without depending on any specific page's DOM structure.
 */
export function useScrollDirection(threshold: number = 24): ScrollInfo {
  const [info, setInfo] = useState<ScrollInfo>({ direction: "up", isScrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? "down" : "up";
      const isScrolled = currentY > threshold;

      setInfo((prev) =>
        prev.direction === direction && prev.isScrolled === isScrolled
          ? prev
          : { direction, isScrolled }
      );

      lastY = currentY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return info;
}
