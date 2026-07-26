import { useEffect, useState } from "react";

/**
 * Simula a latência do futuro backend para exibir os skeletons.
 * Isolado propositalmente: quando a API existir, basta trocar este hook pelo
 * estado de carregamento real (ex.: `isFetching` do TanStack Query).
 */
export function useSimulatedLoading(deps: readonly unknown[], delayMs = 420): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), delayMs);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delayMs]);

  return isLoading;
}
