"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "./media-frame";
import { genderSplit } from "@/lib/data/homepage";
import { EASE_EDITORIAL } from "@/lib/animations";

export function GenderSplit() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="flex min-h-[85vh] w-full flex-col sm:flex-row">
      {genderSplit.map((panel) => {
        const isDimmed = hovered !== null && hovered !== panel.id;

        return (
          <Link
            key={panel.id}
            href={panel.href}
            onMouseEnter={() => setHovered(panel.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex-1 overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0"
              animate={{ scale: hovered === panel.id ? 1.045 : 1 }}
              transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
            >
              <MediaFrame
                src={panel.image}
                alt={panel.label}
                tone={panel.tone}
                caption={`0${genderSplit.indexOf(panel) + 1}`}
                className="h-full w-full"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-ink"
              animate={{ opacity: isDimmed ? 0.45 : 0 }}
              transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
            />

            <div
              className={
                panel.tone === "bone"
                  ? "relative flex h-full min-h-[42vh] flex-col items-start justify-end p-8 text-ink sm:p-12"
                  : "relative flex h-full min-h-[42vh] flex-col items-start justify-end p-8 text-paper sm:p-12"
              }
            >
              <span className="bb-eyebrow opacity-70">{panel.kicker}</span>
              <span className="mt-3 flex items-center gap-3 font-display text-4xl sm:text-5xl">
                {panel.label}
                <motion.span
                  animate={{ x: hovered === panel.id ? 6 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                >
                  <ArrowRight size={28} strokeWidth={1.25} />
                </motion.span>
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
