import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductMedia } from "@/components/product";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse the full BLACK BRO shop, by category.",
};

export default function CollectionsPage() {
  return (
    <Section spacing="lg">
      <Reveal>
        <span className="bb-eyebrow text-text-muted">Browse</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Collections</h1>
        <p className="mt-4 max-w-xl text-sm text-text-muted">
          The full shop, organized by category — start here if you&rsquo;re not sure
          where to begin.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={(index % 6) * 0.06}>
            <Link href={`/category/${category.slug}`} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <ProductMedia
                  tone={category.tone}
                  caption={category.eyebrow}
                  className="h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.045]"
                />
              </div>
              <div className="mt-4">
                <p className="font-display text-2xl">{category.label}</p>
                <p className="mt-1 text-sm text-text-muted">{category.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
