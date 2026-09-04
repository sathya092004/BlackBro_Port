import type { ProductFitInfo as ProductFitInfoType } from "@/types";
import { PdpAccordion } from "./pdp-accordion";

interface ProductFitInfoProps {
  fit?: ProductFitInfoType;
}

export function ProductFitInfo({ fit }: ProductFitInfoProps) {
  if (!fit) return null;

  return (
    <PdpAccordion title="Fit information">
      <div className="flex flex-col gap-2">
        <p>{fit.description}</p>
        {fit.modelInfo && <p className="text-xs text-text-muted/80">{fit.modelInfo}</p>}
        {fit.sizingNote && <p className="text-xs text-text-muted/80">{fit.sizingNote}</p>}
      </div>
    </PdpAccordion>
  );
}
