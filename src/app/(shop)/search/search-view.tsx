"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/product";
import { searchProducts } from "@/lib/data/discovery";
import { primaryNav } from "@/config/site";

const quickLinks = primaryNav.flatMap((group) =>
  group.href ? [{ label: group.label, href: group.href }] : group.children ?? []
);

/**
 * Full search results page — the destination for "View all results" in
 * the SearchOverlay, and a directly linkable/shareable `/search?q=...`
 * URL. Mirrors the overlay's live-filter behaviour but with a full
 * product grid instead of a compact list.
 */
export function SearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.replace(`/search${params.toString() ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    }, 300);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const results = useMemo(() => searchProducts(query, 48), [query]);

  return (
    <Section spacing="lg">
      <Reveal>
        <span className="bb-eyebrow text-text-muted">Search</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Search products</h1>

        <div className="mt-6 flex max-w-xl items-center gap-3 border-b border-border-subtle pb-3">
          <Search size={18} strokeWidth={1.5} className="shrink-0 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories…"
            aria-label="Search products"
            autoFocus
            className="w-full bg-transparent text-lg focus:outline-none"
          />
        </div>
      </Reveal>

      <div className="mt-10">
        {query.trim() === "" ? (
          <div>
            <span className="bb-eyebrow text-text-muted">Shop by category</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-full border border-border-subtle px-4 py-2 text-sm transition-colors hover:border-ink dark:hover:border-bone"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
            <ProductGrid
              products={results}
              emptyMessage={`No products found for "${query}".`}
            />
          </>
        )}
      </div>
    </Section>
  );
}
