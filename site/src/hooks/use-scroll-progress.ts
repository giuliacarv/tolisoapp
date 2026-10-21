import { useEffect, useState } from "react";

export interface ScrollProgressState {
  /** `true` assim que a página sai do topo absoluto (> 8px). */
  scrolled: boolean;
  /** Progresso de leitura normalizado entre 0 e 1. */
  progress: number;
}

/**
 * PROGRESSO DE ROLAGEM
 * ---------------------------------------------------------------------------
 * Por que existe: o `Header` acumulava estado de scroll, cálculo de progresso e
 * gestão de listeners junto com a renderização. Isolar o efeito reduz a
 * complexidade do componente e torna a regra testável de forma independente.
 *
 * Listeners são passivos (não bloqueiam a rolagem) e `resize` é observado
 * porque a altura rolável muda quando o layout se reflui.
 */
export function useScrollProgress(threshold = 8): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({ scrolled: false, progress: 0 });

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        scrolled: window.scrollY > threshold,
        // Evita divisão por zero em páginas curtas (progresso permanece 0).
        progress: scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0,
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return state;
}
