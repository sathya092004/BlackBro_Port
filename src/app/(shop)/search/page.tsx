import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui";
import { SearchView } from "./search-view";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the full BLACK BRO catalogue.",
};

/**
 * `useSearchParams()` inside SearchView requires a Suspense boundary
 * so the route can still be statically shelled — the fallback only
 * ever flashes for a client-side navigation, not the initial load.
 */
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <Section spacing="lg">
          <div className="h-96" />
        </Section>
      }
    >
      <SearchView />
    </Suspense>
  );
}
