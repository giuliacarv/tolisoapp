import { useEffect, useRef, useState, type ComponentProps, type ElementType } from "react";

import { cn } from "@/lib/utils";

export interface RevealProps extends ComponentProps<"div"> {
  /** Elemento renderizado (permite manter a semântica: section, li, article...). */
  as?: ElementType;
  /** Atraso em milissegundos — use 50 a 200ms para cascatas. */
  delay?: number;
  /** Fração do elemento visível necessária para disparar a entrada. */
  threshold?: number;
}

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * Decisões:
 * - IntersectionObserver em vez de listener de scroll: evita trabalho por frame.
 * - A animação vive no CSS (`@utility reveal`), então `prefers-reduced-motion`
 *   é respeitado em um único lugar.
 * - Observação encerrada após a primeira revelação (conteúdo não "some" ao voltar).
 * - Fallback: navegadores sem IntersectionObserver revelam imediatamente.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  threshold = 0.12,
  className,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-revealed={revealed ? "true" : "false"}
      className={cn("reveal", className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...props}
    />
  );
}
