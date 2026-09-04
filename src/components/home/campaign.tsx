"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { campaignContent } from "@/lib/data/homepage";

export function Campaign() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-6%]">
        <MediaFrame tone={campaignContent.tone} mark={false} className="h-full w-full" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20">
        <Reveal>
          <span className="bb-eyebrow text-paper/70">{campaignContent.season} Campaign</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-paper sm:text-5xl">
            {campaignContent.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-md text-sm text-paper/75">{campaignContent.copy}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link
            href={campaignContent.cta.href}
            className="mt-6 inline-flex w-fit items-center border-b border-paper/60 pb-1 text-sm text-paper transition-colors hover:border-paper"
          >
            {campaignContent.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
