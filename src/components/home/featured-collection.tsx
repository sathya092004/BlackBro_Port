"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductMedia } from "@/components/product/product-media";
import { featuredCollection } from "@/lib/data/homepage";
import { formatPrice } from "@/lib/utils";
import { EASE_EDITORIAL } from "@/lib/animations";

export function FeaturedCollection() {
  return (
    <Section spacing="lg">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <div>
            <span className="bb-eyebrow text-text-muted">Featured</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              This week&rsquo;s edit
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href="/new-arrivals"
            className="text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
        {featuredCollection.map((product, i) => {
          const primaryImage =
            product.images.find((img) => img.isPrimary) ?? product.images[0];
          return (
            <Reveal key={product.id} delay={i * 0.06}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.045 }}
                    transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                  >
                    <ProductMedia
                      src={primaryImage?.url}
                      alt={primaryImage?.alt}
                      tone={primaryImage?.tone}
                      caption={product.category}
                      className="aspect-[4/5] w-full"
                    />
                  </motion.div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm">{product.name}</p>
                    {product.isNew && (
                      <span className="text-xs text-gold">New</span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">
                    {product.price.compareAtAmount && (
                      <span className="mr-2 line-through">
                        {formatPrice(product.price.compareAtAmount, product.price.currency)}
                      </span>
                    )}
                    {formatPrice(product.price.amount, product.price.currency)}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
