/**
 * Fonte única de verdade para a preferência de movimento do sistema.
 *
 * Por que centralizar: várias camadas precisam da mesma decisão (rolagem
 * suave, parallax do hero, marquee dos carrosséis, animações de entrada).
 * Duplicar `matchMedia` espalha bugs sutis — por exemplo, componentes que
 * leem a preferência só na montagem e não reagem quando o usuário troca a
 * configuração do sistema com a aba aberta.
 */

/** Media query padrão de redução de movimento (WCAG 2.3.3 / 2.2.2). */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getMediaQueryList(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return null;
  return window.matchMedia(REDUCED_MOTION_QUERY);
}

/**
 * Retorna `true` quando o usuário pediu menos movimento.
 * No servidor (SSR/prerender) devolve `false`: o CSS já cobre o caso real,
 * e assumir `true` causaria divergência de hidratação em telas comuns.
 */
export function prefersReducedMotion(): boolean {
  return getMediaQueryList()?.matches ?? false;
}

/**
 * Observa mudanças da preferência. Retorna a função de cancelamento.
 * Suporta o `addListener` legado (Safari < 14) sem quebrar tipagem.
 */
export function subscribeToReducedMotion(listener: (reduced: boolean) => void): () => void {
  const mql = getMediaQueryList();
  if (!mql) return () => {};

  const handler = (event: MediaQueryListEvent) => listener(event.matches);

  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }

  // Fallback legado.
  const legacy = mql as MediaQueryList & {
    addListener?: (cb: (event: MediaQueryListEvent) => void) => void;
    removeListener?: (cb: (event: MediaQueryListEvent) => void) => void;
  };
  legacy.addListener?.(handler);
  return () => legacy.removeListener?.(handler);
}

/** Comportamento de rolagem coerente com a preferência do usuário. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}
