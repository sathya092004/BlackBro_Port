"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui";
import { MediaFrame } from "./media-frame";
import { heroContent } from "@/lib/data/homepage";
import { EASE_EDITORIAL } from "@/lib/animations";

const headlineWords = heroContent.headline.split(" ");

export function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden">
      <MediaFrame tone={heroContent.tone} mark={false} className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_EDITORIAL }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE_EDITORIAL }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full text-paper/[0.07]"
            fill="none"
            stroke="currentColor"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <path key={i} d={`M${-10 + i * 22} 0 L${10 + i * 22} 100`} strokeWidth="0.4" />
            ))}
          </svg>
        </motion.div>
      </MediaFrame>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-24">
        <motion.span
          className="bb-eyebrow text-paper/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL, delay: 0.2 }}
        >
          {heroContent.eyebrow}
        </motion.span>

        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.06] text-paper sm:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.28em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  ease: EASE_EDITORIAL,
                  delay: 0.35 + i * 0.07,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-md text-sm text-paper/75 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL, delay: 0.9 }}
        >
          {heroContent.subhead}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL, delay: 1.05 }}
        >
          <Link href="/category/men">
            <Button variant="primary" size="lg" className="bg-paper text-ink hover:opacity-90">
              Shop Men
            </Button>
          </Link>
          <Link href="/category/women">
            <Button
              variant="secondary"
              size="lg"
              className="border-paper text-paper hover:bg-paper hover:text-ink"
            >
              Shop Women
            </Button>
          </Link>
        </motion.div>
      </Container>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <motion.div
          className="h-9 w-px bg-paper/50"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
