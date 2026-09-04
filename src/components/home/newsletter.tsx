"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { editorialTransition } from "@/lib/animations";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitted");
  }

  return (
    <Section spacing="lg" className="bg-ink text-paper">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="bb-eyebrow text-paper/60">Stay in the loop</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-md font-display text-3xl sm:text-4xl">
              First word on new arrivals and studio sales.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 w-full max-w-md">
            {status === "idle" ? (
              <form onSubmit={handleSubmit} className="flex items-center border-b border-paper/40 pb-2">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-paper placeholder:text-paper/40 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe"
                  whileHover={{ x: 4 }}
                  transition={editorialTransition}
                  className="shrink-0 pl-4"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </motion.button>
              </form>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={editorialTransition}
                className="text-sm text-paper/80"
              >
                You&rsquo;re on the list — welcome to BLACK BRO.
              </motion.p>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
