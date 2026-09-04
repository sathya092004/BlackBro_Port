import type { Product } from "@/types";
import { getRelatedProducts } from "@/lib/data/products";
import { ProductGrid } from "./product-grid";

interface RelatedProductsProps {
  product: Product;
  limit?: number;
}

export function RelatedProducts({ product, limit = 4 }: RelatedProductsProps) {
  const related = getRelatedProducts(product, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border-subtle pt-12">
      <h2 className="font-display text-2xl sm:text-3xl">You may also like</h2>
      <div className="mt-8">
        <ProductGrid products={related} columns={4} />
      </div>
    </section>
  );
}
