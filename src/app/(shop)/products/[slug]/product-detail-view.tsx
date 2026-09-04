"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import {
  ProductGallery,
  ProductDescription,
  ProductFeatures,
  ProductMaterials,
  ProductFitInfo,
  SizeSelector,
  ColorSelector,
  QuantitySelector,
  RelatedProducts,
} from "@/components/product";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import {
  getSizeOptions,
  getColorOptions,
  getGalleryImages,
  buildVariantSelection,
} from "@/lib/utils/product-options";
import { getCategoryBySlug } from "@/lib/data/categories";
import { toProductSummary, type Product } from "@/types";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const sizes = useMemo(() => getSizeOptions(product), [product]);
  const colors = useMemo(() => getColorOptions(product), [product]);
  const categoryInfo = getCategoryBySlug(product.category);

  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.find((s) => s.available)?.value ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0]?.value ?? null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const images = getGalleryImages(product, selectedColor);

  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  const canAddToCart = !product.isSoldOut && (sizes.length === 0 || !!selectedSize);

  function handleAddToCart() {
    const { variantId, variantLabel } = buildVariantSelection(selectedSize, selectedColor);
    addToCart(toProductSummary(product), variantId, variantLabel, quantity);
    setJustAdded(true);
    openCart();
  }

  return (
    <Container as="div" className="py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        {categoryInfo && (
          <>
            <Link href={`/category/${categoryInfo.slug}`} className="hover:text-foreground">
              {categoryInfo.label}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={images} productName={product.name} />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-col gap-6 lg:max-w-md">
            <div>
              <p className="bb-eyebrow text-text-muted">{product.brand}</p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>
              <p className="mt-3 text-lg">
                {product.price.compareAtAmount && (
                  <span className="mr-2 text-text-muted line-through">
                    {formatPrice(product.price.compareAtAmount, product.price.currency)}
                  </span>
                )}
                <span className={cn(product.price.compareAtAmount && "text-signal")}>
                  {formatPrice(product.price.amount, product.price.currency)}
                </span>
              </p>
              {product.isSoldOut && (
                <p className="mt-2 text-xs text-text-muted">Currently sold out.</p>
              )}
            </div>

            <ColorSelector colors={colors} selected={selectedColor} onSelect={setSelectedColor} />
            <SizeSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
            <QuantitySelector quantity={quantity} onChange={setQuantity} />

            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1"
                disabled={!canAddToCart}
                onClick={handleAddToCart}
              >
                {product.isSoldOut ? "Sold out" : justAdded ? "Added to bag" : "Add to bag"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleWishlist(toProductSummary(product))}
              >
                <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
              </Button>
            </div>

            <div className="mt-2">
              <ProductDescription description={product.description} />
              <ProductFeatures features={product.features} />
              <ProductMaterials materials={product.materials} />
              <ProductFitInfo fit={product.fit} />
            </div>
          </div>
        </Reveal>
      </div>

      <RelatedProducts product={product} />
    </Container>
  );
}
