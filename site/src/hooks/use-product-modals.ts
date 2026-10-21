import { useCallback, useState } from "react";

import type { Product } from "@/types";

export interface ProductModalsState {
  selected: Product | null;
  detailsOpen: boolean;
  redeemOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
  setRedeemOpen: (open: boolean) => void;
  /** Abre o modal de detalhes (sem custo de créditos). */
  openDetails: (product: Product) => void;
  /** Abre a confirmação de resgate. */
  openRedeem: (product: Product) => void;
}

/**
 * Centraliza a seleção de produto e a abertura dos dois modais.
 * Compartilhado pelas seções de destaque e de descoberta (evita duplicação).
 */
export function useProductModals(): ProductModalsState {
  const [selected, setSelected] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);

  const openDetails = useCallback((product: Product) => {
    setSelected(product);
    setDetailsOpen(true);
  }, []);

  const openRedeem = useCallback((product: Product) => {
    setSelected(product);
    setRedeemOpen(true);
  }, []);

  return {
    selected,
    detailsOpen,
    redeemOpen,
    setDetailsOpen,
    setRedeemOpen,
    openDetails,
    openRedeem,
  };
}
