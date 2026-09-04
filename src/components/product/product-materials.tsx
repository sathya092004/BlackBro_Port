import { PdpAccordion } from "./pdp-accordion";

interface ProductMaterialsProps {
  materials?: string[];
}

export function ProductMaterials({ materials }: ProductMaterialsProps) {
  if (!materials || materials.length === 0) return null;

  return (
    <PdpAccordion title="Materials">
      <ul className="flex flex-col gap-2">
        {materials.map((material) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-text-muted/80">
        Care instructions available on the garment label.
      </p>
    </PdpAccordion>
  );
}
