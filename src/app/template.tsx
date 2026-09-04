"use client";

import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion";

/**
 * `template.tsx` re-mounts on every navigation (unlike layout.tsx,
 * which persists), making it the correct place to hook the
 * enter/exit page transition without disturbing the persistent
 * Navbar/Footer/CartDrawer defined in layout.tsx.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
