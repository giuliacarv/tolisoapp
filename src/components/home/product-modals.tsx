import type { Product } from "@/data/products";
import type { ProductModalsState } from "@/hooks/use-product-modals";

import { ProductDetailsModal } from "./product-details-dialog";
import { RedeemProductModal } from "./redeem-dialog";

export interface ProductModalsProps {
  modals: ProductModalsState;
}

/**
 * Par de modais de produto (detalhes + confirmação de resgate).
 * Encapsula a ligação entre eles para que cada seção monte apenas um componente.
 */
export function ProductModals({ modals }: ProductModalsProps) {
  const { selected, detailsOpen, redeemOpen, setDetailsOpen, setRedeemOpen, openRedeem } = modals;

  function handleRedeemFromDetails(product: Product) {
    openRedeem(product);
  }

  return (
    <>
      <ProductDetailsModal
        product={selected}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onRedeem={handleRedeemFromDetails}
      />
      <RedeemProductModal product={selected} open={redeemOpen} onOpenChange={setRedeemOpen} />
    </>
  );
}
