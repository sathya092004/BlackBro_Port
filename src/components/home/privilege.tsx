"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { Section, Button } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { privilegeTiers } from "@/lib/data/homepage";
import { editorialTransition, staggerContainer, fadeUp } from "@/lib/animations";

export function Privilege() {
  const [activeId, setActiveId] = useState(privilegeTiers[0].id);
  const active = privilegeTiers.find((t) => t.id === activeId) ?? privilegeTiers[0];

  return (
    <Section spacing="lg">
      <Reveal>
        <span className="bb-eyebrow text-text-muted">Loyalty</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 max-w-lg font-display text-3xl sm:text-4xl">
          BLACK BRO Privilege
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <div className="relative flex border-b border-border-subtle">
            {privilegeTiers.map((tier) => (
              <motion.button
                key={tier.id}
                type="button"
                onClick={() => setActiveId(tier.id)}
                aria-pressed={activeId === tier.id}
                whileTap={{ scale: 0.98 }}
                transition={editorialTransition}
                className="relative flex-1 pb-4 pt-2 text-left"
              >
                <span
                  className={`bb-eyebrow block transition-colors ${
                    activeId === tier.id ? "text-foreground" : "text-text-muted"
                  }`}
                >
                  {tier.name}
                </span>
                {activeId === tier.id && (
                  <motion.div
                    layoutId="privilege-indicator"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-ink dark:bg-bone"
                    transition={editorialTransition}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={editorialTransition}
              className="pt-8"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-gold">
                {active.threshold}
              </span>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
                {active.description}
              </p>

              <motion.ul
                key={`${active.id}-perks`}
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
                className="mt-6 flex flex-col gap-3"
              >
                {active.perks.map((perk) => (
                  <motion.li key={perk} variants={fadeUp} className="flex items-start gap-3 text-sm">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span>{perk}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <Button variant="secondary" size="md" className="mt-8">
                Join Privilege
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={editorialTransition}
          >
            <MediaFrame tone="graphite" caption={active.name} className="aspect-[16/11] w-full" />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
