import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/product";
import { getBestSellers } from "@/lib/data/discovery";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "The pieces everyone keeps reaching for.",
};

export default function BestSellersPage() {
  const products = getBestSellers(24);

  return (
    <Section spacing="lg">
      <Reveal>
        <span className="bb-eyebrow text-text-muted">Fan favourites</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Best Sellers</h1>
        <p className="mt-4 max-w-xl text-sm text-text-muted">
          The pieces everyone keeps reaching for, across the whole shop.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProductGrid products={products} emptyMessage="Nothing ranked yet — check back soon." />
      </div>
    </Section>
  );
}
