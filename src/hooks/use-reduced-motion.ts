import { useSyncExternalStore } from "react";

import { prefersReducedMotion, subscribeToReducedMotion } from "@/lib/motion";

/**
 * Hook reativo para `prefers-reduced-motion`.
 *
 * Usa `useSyncExternalStore` para: (1) evitar mismatch de hidratação — o
 * snapshot do servidor é sempre `false`, igual ao primeiro render do cliente;
 * (2) reagir imediatamente quando o usuário muda a preferência no sistema.
 *
 * Use-o apenas para animações controladas por JavaScript. Animações puramente
 * declarativas devem ser resolvidas no CSS (`motion-safe:` / `motion-reduce:`).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribeToReducedMotion(() => onStoreChange()),
    prefersReducedMotion,
    () => false,
  );
}
