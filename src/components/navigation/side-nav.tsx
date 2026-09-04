"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { primaryNav } from "@/config/site";
import { Logo } from "@/components/ui/logo";
import { slideInLeft, scrimFade, staggerContainer, fadeUp } from "@/lib/animations";
import { IconButton } from "@/components/motion";
import { useScrollLock } from "@/hooks";
import { useSearchStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile / touch navigation drawer.
 * Full-height panel sliding in from the left, listing primary
 * categories with large (44px+) tap targets and tap-to-expand
 * sub-groups. Groups without an `href` (e.g. "Clothing") render as a
 * plain expandable header rather than a dead link.
 */
export function SideNav({ isOpen, onClose }: SideNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const openSearch = useSearchStore((s) => s.open);

  useScrollLock(isOpen);

  function toggleGroup(label: string) {
    setExpanded((current) => (current === label ? null : label));
  }

  function handleSearch() {
    onClose();
    openSearch();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="side-nav-scrim"
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-[2px]"
            variants={scrimFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="side-nav-panel"
            className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[88vw] max-w-(--bb-side-nav-width) flex-col bg-paper text-ink dark:bg-void dark:text-bone"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <Logo variant="wordmark" height={20} />
              <IconButton
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-11 w-11 items-center justify-center hover:bg-surface-muted active:bg-surface-muted"
              >
                <X size={20} strokeWidth={1.5} />
              </IconButton>
            </div>

            <motion.button
              type="button"
              onClick={handleSearch}
              whileTap={{ scale: 0.98 }}
              className="mx-4 mb-2 flex h-12 items-center gap-3 rounded-full border border-border-subtle px-4 text-sm text-text-muted transition-colors active:bg-surface-muted"
            >
              <Search size={16} strokeWidth={1.5} />
              Search products…
            </motion.button>

            <div className="bb-hairline" />

            <motion.nav
              className="flex-1 overflow-y-auto px-4 py-2"
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col">
                {primaryNav.map((group) => {
                  const isGroupOpen = expanded === group.label;

                  return (
                    <motion.li key={group.label} variants={fadeUp}>
                      <div className="flex items-center justify-between">
                        {group.href ? (
                          <Link
                            href={group.href}
                            onClick={onClose}
                            className="flex min-h-12 flex-1 items-center py-3 font-display text-xl"
                          >
                            {group.label}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleGroup(group.label)}
                            aria-expanded={isGroupOpen}
                            className="flex min-h-12 flex-1 items-center py-3 text-left font-display text-xl"
                          >
                            {group.label}
                          </button>
                        )}

                        {group.children && (
                          <button
                            type="button"
                            onClick={() => toggleGroup(group.label)}
                            aria-expanded={isGroupOpen}
                            aria-label={`Toggle ${group.label} submenu`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors active:bg-surface-muted"
                          >
                            <ChevronDown
                              size={16}
                              strokeWidth={1.5}
                              className={cn(
                                "transition-transform duration-300",
                                isGroupOpen && "rotate-180"
                              )}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {group.children && isGroupOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-1"
                          >
                            {group.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex min-h-11 items-center py-2.5 text-sm text-text-muted transition-colors active:text-ink dark:active:text-bone"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      <div className="bb-hairline mt-1" />
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
