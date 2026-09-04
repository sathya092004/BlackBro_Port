import { PdpAccordion } from "./pdp-accordion";

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <PdpAccordion title="Description" defaultOpen>
      <p className="leading-relaxed">{description}</p>
    </PdpAccordion>
  );
}
