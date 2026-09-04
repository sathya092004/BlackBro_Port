"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { useRef, useState, type FocusEvent, type MouseEvent as ReactMouseEvent } from "react";
import { primaryNav, siteConfig, type NavGroup } from "@/config/site";
import { Logo } from "@/components/ui/logo";
import { useSearchStore } from "@/lib/store";
import { EASE_EDITORIAL, microTransition, staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { MediaTone } from "@/types";

const RAIL_COLLAPSED = 72; // px — matches --bb-rail-width (4.5rem)
const RAIL_EXPANDED = 336; // px — matches --bb-rail-width-expanded (21rem)

const TONE_DOT: Record<MediaTone, string> = {
  onyx: "#161615",
  graphite: "#3a3936",
  bone: "#e7e4de",
  void: "#000000",
  gold: "#b8935a",
};

/**
 * BLACK BRO desktop left-side navigation.
 * A slim, persistent rail (collapsed labels run vertically, spine-like)
 * that expands into a full editorial panel on hover/focus — labels
 * rotate to horizontal, descriptions fade in, and grouped categories
 * (e.g. "Clothing") reveal their children with a staggered cascade.
 * Hidden below `lg`; the mobile drawer (SideNav) covers small screens.
 */
export function LeftNav() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isExpanded = activeLabel !== null;
  const openSearch = useSearchStore((s) => s.open);

  function handleMouseLeave() {
    setActiveLabel(null);
  }

  function handleBlurCapture(e: FocusEvent<HTMLElement>) {
    if (navRef.current && !navRef.current.contains(e.relatedTarget as Node)) {
      setActiveLabel(null);
    }
  }

  return (
    <motion.nav
      ref={navRef}
      aria-label="Primary"
      onMouseLeave={handleMouseLeave}
      onBlurCapture={handleBlurCapture}
      animate={{ width: isExpanded ? RAIL_EXPANDED : RAIL_COLLAPSED }}
      transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
      className="fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-paper/10 bg-ink text-paper lg:flex lg:flex-col"
    >
      {/* Brand mark */}
      <Link
        href="/"
        aria-label={`${siteConfig.name} home`}
        onMouseEnter={() => setActiveLabel(null)}
        className="flex h-[var(--bb-header-height)] shrink-0 items-center justify-center border-b border-paper/10 transition-colors hover:bg-paper/4"
      >
        <Logo variant="mark" tone="dark" height={28} />
      </Link>

      {/* Nav items */}
      <ul className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {primaryNav.map((group, index) => (
          <RailItem
            key={group.label}
            group={group}
            index={index}
            isExpanded={isExpanded}
            isActive={activeLabel === group.label}
            onActivate={() => setActiveLabel(group.label)}
          />
        ))}
      </ul>

      {/* Search trigger */}
      <button
        type="button"
        onClick={openSearch}
        onMouseEnter={() => setActiveLabel("__search")}
        aria-label="Search"
        className="relative flex h-16 shrink-0 items-center border-t border-paper/10 transition-colors hover:bg-paper/4"
      >
        <span className="flex w-[72px] shrink-0 items-center justify-center">
          <Search size={16} strokeWidth={1.5} />
        </span>
        <span className="relative h-full flex-1">
          <motion.span
            className="absolute inset-y-0 left-0 flex items-center bb-eyebrow whitespace-nowrap text-paper/70"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.25, delay: isExpanded ? 0.1 : 0 }}
            aria-hidden="true"
          >
            Search
          </motion.span>
        </span>
      </button>
    </motion.nav>
  );
}

interface RailItemProps {
  group: NavGroup;
  index: number;
  isExpanded: boolean;
  isActive: boolean;
  onActivate: () => void;
}

function RailItem({ group, index, isExpanded, isActive, onActivate }: RailItemProps) {
  const dotColor = group.tone ? TONE_DOT[group.tone] : undefined;
  const showChildren = isExpanded && isActive && !!group.children?.length;

  function handleEnter(e: ReactMouseEvent) {
    e.stopPropagation();
    onActivate();
  }

  const rowContent = (
    <>
      <span className="flex w-[72px] shrink-0 items-center justify-center gap-1.5 font-mono text-[10px] text-paper/40">
        {dotColor && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: dotColor }}
            aria-hidden="true"
          />
        )}
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative h-full flex-1 py-4">
        {/* Collapsed: label reads bottom-to-top, spine-like */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap [writing-mode:vertical-rl] rotate-180 bb-eyebrow"
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={microTransition}
          aria-hidden="true"
        >
          {group.label}
        </motion.span>

        {/* Expanded: horizontal label + description */}
        <motion.span
          className="absolute inset-0 flex flex-col justify-center"
          animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0, ease: EASE_EDITORIAL }}
          aria-hidden="true"
        >
          <span className="flex items-center gap-2 font-display text-lg leading-tight">
            {group.label}
            {group.children && group.children.length > 0 && (
              <Plus
                size={12}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  showChildren && "rotate-45"
                )}
              />
            )}
          </span>
          {group.description && (
            <span className="mt-0.5 truncate text-xs text-paper/50">{group.description}</span>
          )}
        </motion.span>
      </span>
    </>
  );

  return (
    <li className="relative border-b border-paper/10">
      {group.href ? (
        <Link
          href={group.href}
          aria-label={group.label}
          onMouseEnter={handleEnter}
          onFocus={onActivate}
          className={cn(
            "relative flex h-16 items-center transition-colors",
            isActive && isExpanded ? "bg-paper/6" : "hover:bg-paper/4"
          )}
        >
          {rowContent}
        </Link>
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-expanded={showChildren}
          aria-label={`${group.label} — submenu`}
          onMouseEnter={handleEnter}
          onFocus={onActivate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onActivate();
            }
          }}
          className={cn(
            "relative flex h-16 cursor-default items-center transition-colors",
            isActive && isExpanded ? "bg-paper/6" : "hover:bg-paper/4"
          )}
        >
          {rowContent}
        </div>
      )}

      <AnimatePresence initial={false}>
        {showChildren && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
            className="overflow-hidden bg-paper/3"
          >
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="visible"
              className="flex flex-col py-2 pl-[72px] pr-4"
            >
              {group.children!.map((child) => (
                <motion.div key={child.href} variants={fadeUp}>
                  <Link
                    href={child.href}
                    className="flex flex-col gap-0.5 py-2.5 text-sm transition-colors hover:text-gold"
                  >
                    <span>{child.label}</span>
                    {child.description && (
                      <span className="text-xs text-paper/45">{child.description}</span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
