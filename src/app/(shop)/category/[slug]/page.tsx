import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductGrid, ProductMedia } from "@/components/product";
import { getAllCategorySlugs, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryInfo = getCategoryBySlug(slug);

  if (!categoryInfo) return { title: "Category not found" };

  return {
    title: categoryInfo.label,
    description: categoryInfo.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = getCategoryBySlug(slug);

  if (!categoryInfo) notFound();

  const products = getProductsByCategory(categoryInfo.category);

  return (
    <>
      <div className="relative h-[36vh] min-h-[16rem] w-full overflow-hidden sm:h-[44vh]">
        <ProductMedia tone={categoryInfo.tone} className="h-full w-full" mark={false}>
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-12">
            <Reveal>
              <span
                className={`bb-eyebrow ${
                  categoryInfo.tone === "bone" || categoryInfo.tone === "gold"
                    ? "text-ink/70"
                    : "text-paper/70"
                }`}
              >
                {categoryInfo.eyebrow}
              </span>
              <h1
                className={`mt-2 font-display text-4xl sm:text-5xl ${
                  categoryInfo.tone === "bone" || categoryInfo.tone === "gold"
                    ? "text-ink"
                    : "text-paper"
                }`}
              >
                {categoryInfo.label}
              </h1>
            </Reveal>
          </div>
        </ProductMedia>
      </div>

      <Section spacing="lg">
        <Reveal>
          <p className="max-w-xl text-sm text-text-muted">{categoryInfo.description}</p>
        </Reveal>

        <div className="mt-10">
          <ProductGrid
            products={products}
            emptyMessage={`No products in ${categoryInfo.label} yet — check back soon.`}
          />
        </div>
      </Section>
    </>
  );
}
