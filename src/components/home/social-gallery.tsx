"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { socialGallery } from "@/lib/data/homepage";
import { EASE_EDITORIAL } from "@/lib/animations";

const TONES = ["onyx", "bone", "graphite", "gold"] as const;

export function SocialGallery() {
  return (
    <Section spacing="lg" muted>
      <Reveal>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">{socialGallery.handle}</h2>
          <span className="text-sm text-text-muted">Tag us to be featured</span>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {socialGallery.posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.04}>
            <motion.div className="group relative aspect-square overflow-hidden" whileHover="hover">
              <motion.div
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                className="h-full w-full"
              >
                <MediaFrame tone={TONES[i % TONES.length]} mark={false} className="h-full w-full" />
              </motion.div>
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                <Heart size={18} strokeWidth={1.5} className="text-paper" />
              </motion.div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
