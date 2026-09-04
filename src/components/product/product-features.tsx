import { PdpAccordion } from "./pdp-accordion";

interface ProductFeaturesProps {
  features?: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <PdpAccordion title="Features">
      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </PdpAccordion>
  );
}
