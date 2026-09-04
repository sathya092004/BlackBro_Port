"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { EASE_EDITORIAL } from "@/lib/animations";

const SESSION_KEY = "bb-intro-seen";

/**
 * Full-screen opening mark shown once per browser session before the
 * homepage reveals itself — the site's single orchestrated load
 * moment. Everything else on the page stays restrained by comparison.
 */
export function OpeningLogo() {
  const [phase, setPhase] = useState<"intro" | "exiting" | "done">("intro");

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (alreadySeen) {
      timers.push(setTimeout(() => setPhase("done"), 0));
      return () => timers.forEach(clearTimeout);
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    timers.push(setTimeout(() => setPhase("exiting"), 1500));
    timers.push(setTimeout(() => setPhase("done"), 2300));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.9, ease: EASE_EDITORIAL },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_EDITORIAL, delay: 0.15 }}
          >
            <Logo variant="mark" tone="dark" height={64} priority />
          </motion.div>

          <motion.div
            className="mt-5 h-px bg-paper/50"
            initial={{ width: 0 }}
            animate={{ width: "3.5rem" }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL, delay: 0.7 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
