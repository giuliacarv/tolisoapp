import { Suspense, lazy, useRef } from "react";

import type { Product } from "@/types";
import type { ProductModalsState } from "@/hooks/use-product-modals";

/**
 * Code splitting por prioridade: os dois modais só entram no bundle quando o
 * usuário realmente abre um card. São ~2 chunks fora do critical path da home,
 * carregados sob interação (a rede já está ociosa nesse momento).
 */
const ProductDetailsModal = lazy(() =>
  import("./product-details-dialog").then((m) => ({ default: m.ProductDetailsModal })),
);
const RedeemProductModal = lazy(() =>
  import("./redeem-dialog").then((m) => ({ default: m.RedeemProductModal })),
);

export interface ProductModalsProps {
  modals: ProductModalsState;
  /** Repassada ao modal de resgate (ver `RedeemProductModal`). */
  confirmationMessage?: string;
}

/**
 * Par de modais de produto (detalhes + confirmação de resgate).
 * Encapsula a ligação entre eles para que cada seção monte apenas um componente.
 */
export function ProductModals({ modals, confirmationMessage }: ProductModalsProps) {
  const { selected, detailsOpen, redeemOpen, setDetailsOpen, setRedeemOpen, openRedeem } = modals;

  // Uma vez abertos, permanecem montados para preservar a animação de saída
  // do Radix (desmontar durante o fade causaria "corte" visual).
  const everOpened = useRef({ details: false, redeem: false });
  if (detailsOpen) everOpened.current.details = true;
  if (redeemOpen) everOpened.current.redeem = true;

  function handleRedeemFromDetails(product: Product) {
    openRedeem(product);
  }

  return (
    <Suspense fallback={null}>
      {everOpened.current.details ? (
        <ProductDetailsModal
          product={selected}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onRedeem={handleRedeemFromDetails}
        />
      ) : null}
      {everOpened.current.redeem ? (
        <RedeemProductModal
          product={selected}
          open={redeemOpen}
          onOpenChange={setRedeemOpen}
          confirmationMessage={confirmationMessage}
        />
      ) : null}
    </Suspense>
  );
}
