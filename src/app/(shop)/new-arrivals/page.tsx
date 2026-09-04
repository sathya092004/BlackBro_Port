import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/product";
import { getNewArrivals } from "@/lib/data/discovery";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Fresh into the studio this week — the latest pieces from BLACK BRO.",
};

export default function NewArrivalsPage() {
  const products = getNewArrivals(24);

  return (
    <Section spacing="lg">
      <Reveal>
        <span className="bb-eyebrow text-text-muted">Just in</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">New Arrivals</h1>
        <p className="mt-4 max-w-xl text-sm text-text-muted">
          The newest pieces from the studio, sorted the moment they land.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProductGrid products={products} emptyMessage="No new arrivals right now — check back soon." />
      </div>
    </Section>
  );
}
