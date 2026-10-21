import { useCallback } from "react";

import { useLocalIdList } from "@/hooks/use-local-id-list";
import { GUEST_FAVORITES_KEY } from "@/lib/local-preferences";

/**
 * Favoritos do visitante (somente IDs públicos de produto).
 * TODO(backend): sincronizar com a conta após a integração com o Supabase.
 */
export function useFavorites() {
  const { ids, idSet, set, clear } = useLocalIdList(GUEST_FAVORITES_KEY);

  const isFavorite = useCallback((productId: string) => idSet.has(productId), [idSet]);

  const toggleFavorite = useCallback(
    (productId: string): boolean => {
      const alreadySaved = idSet.has(productId);
      // Novos favoritos entram no topo para refletir a ordem de interesse.
      set(alreadySaved ? ids.filter((id) => id !== productId) : [productId, ...ids]);
      return !alreadySaved;
    },
    [ids, idSet, set],
  );

  const removeFavorite = useCallback(
    (productId: string) => set(ids.filter((id) => id !== productId)),
    [ids, set],
  );

  return {
    favoriteIds: ids,
    count: ids.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites: clear,
  };
}
