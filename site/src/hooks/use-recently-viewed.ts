import { useCallback, useEffect } from "react";

import { useLocalIdList } from "@/hooks/use-local-id-list";
import {
  GUEST_RECENTLY_VIEWED_KEY,
  RECENTLY_VIEWED_LIMIT,
  readStringList,
  writeStringList,
} from "@/lib/local-preferences";

/** Histórico local de produtos visualizados (máximo de 12 itens, sem dados pessoais). */
export function useRecentlyViewed() {
  const { ids, clear } = useLocalIdList(GUEST_RECENTLY_VIEWED_KEY);

  return { recentIds: ids, clearRecentlyViewed: clear, limit: RECENTLY_VIEWED_LIMIT };
}

/**
 * Registra a visualização de um produto assim que a página é montada.
 * Lê direto do storage para não depender do snapshot em memória (evita
 * sobrescrever registros feitos em outra aba).
 */
export function useRegisterRecentlyViewed(productId: string | undefined) {
  const register = useCallback((id: string) => {
    const current = readStringList(GUEST_RECENTLY_VIEWED_KEY).filter((item) => item !== id);
    writeStringList(GUEST_RECENTLY_VIEWED_KEY, [id, ...current].slice(0, RECENTLY_VIEWED_LIMIT));
  }, []);

  useEffect(() => {
    if (!productId) return;
    register(productId);
  }, [productId, register]);
}
