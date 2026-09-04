import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MediaFrame } from "./media-frame";
import { brandStory } from "@/lib/data/homepage";

export function BrandStory() {
  return (
    <Section spacing="lg" muted>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <MediaFrame tone="gold" caption="Porto, 2026" className="aspect-[4/5] w-full" />
        </Reveal>

        <div>
          <Reveal>
            <span className="bb-eyebrow text-text-muted">{brandStory.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-md font-display text-3xl leading-tight sm:text-4xl">
              {brandStory.title}
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4">
            {brandStory.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p className="max-w-md text-sm leading-relaxed text-text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="mt-8 flex items-baseline gap-3 border-t border-border-subtle pt-6">
              <span className="font-display text-5xl text-gold">{brandStory.stat.value}</span>
              <span className="max-w-[10rem] text-xs uppercase tracking-[0.14em] text-text-muted">
                {brandStory.stat.label}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
