"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { lookbookItems } from "@/lib/data/homepage";
import { EASE_EDITORIAL, curtainReveal } from "@/lib/animations";

const TONES = ["onyx", "graphite", "bone", "gold"] as const;

export function Lookbook() {
  return (
    <Section spacing="lg" muted>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <div>
            <span className="bb-eyebrow text-text-muted">Lookbook</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">FW26, in full</h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {lookbookItems.map((item, i) => (
          <Reveal
            key={item.id}
            delay={i * 0.05}
            variants={curtainReveal}
            className={item.span === "tall" ? "row-span-2" : ""}
          >
            <motion.div
              className="group relative overflow-hidden"
              whileHover="hover"
            >
              <motion.div
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="h-full w-full"
              >
                <MediaFrame
                  tone={TONES[i % TONES.length]}
                  caption={item.index}
                  className={item.span === "tall" ? "aspect-[3/5] w-full" : "aspect-[3/4] w-full"}
                />
              </motion.div>
              <motion.div
                variants={{ hover: { opacity: 1, y: 0 } }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4"
              >
                <span className="text-sm text-paper">{item.title}</span>
              </motion.div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
