import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { aboutUs } from "@/lib/data/homepage";

/**
 * Homepage "About Us" block — short company description plus customer
 * service contact details. All copy in `aboutUs` (lib/data/homepage.ts)
 * is a placeholder; swap it for the real thing before launch.
 */
export function AboutUs() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="bb-eyebrow text-text-muted">{aboutUs.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            {aboutUs.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-sm leading-relaxed text-text-muted">
            {aboutUs.description}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:gap-10">
            <a
              href={`mailto:${aboutUs.supportEmail}`}
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-ink dark:hover:text-bone"
            >
              <Mail size={16} strokeWidth={1.5} />
              {aboutUs.supportEmail}
            </a>
            <a
              href={`tel:${aboutUs.supportPhone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-ink dark:hover:text-bone"
            >
              <Phone size={16} strokeWidth={1.5} />
              {aboutUs.supportPhone}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
