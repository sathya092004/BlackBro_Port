import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
  columns = 3,
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-sm text-text-muted">{emptyMessage}</p>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-12",
        COLUMN_CLASSES[columns],
        className
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} delayIndex={i % 6} />
      ))}
    </div>
  );
}
