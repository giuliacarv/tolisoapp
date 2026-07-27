import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AutoCarouselProps<T> {
  /** Itens exibidos. A lista é clonada internamente para o loop infinito. */
  items: readonly T[];
  /** Chave estável de cada item. */
  getKey: (item: T, index: number) => string;
  /** Render do conteúdo de um slide. */
  renderItem: (item: T) => ReactNode;
  /** Rótulo acessível do carrossel (ex.: "Carrossel de ofertas"). */
  ariaLabel: string;
  /** Velocidade da rolagem em pixels por segundo. */
  speed?: number;
  /** Largura de cada slide (classe utilitária). */
  itemClassName?: string;
  className?: string;
}

/**
 * Carrossel automático de conteúdo (ofertas, cupons…).
 *
 * Técnica idêntica à do carrossel de logotipos: a lista é duplicada e a faixa
 * anima de `translateX(0)` até `translateX(-50%)`, de modo que a segunda cópia
 * assume exatamente a posição da primeira ao reiniciar — sem salto visual.
 * A duração deriva da largura medida (`largura / speed`), mantendo a velocidade
 * constante em qualquer tela, e a animação usa somente `transform`.
 *
 * Acessibilidade:
 * - pausa automática em `hover` e em `focus-within` (teclado);
 * - botão explícito de pausar/retomar (WCAG 2.2.2 — conteúdo em movimento);
 * - com `prefers-reduced-motion`, o movimento é desligado e a faixa vira uma
 *   lista rolável horizontalmente (a cópia clonada é ocultada);
 * - a cópia clonada é `aria-hidden` e não recebe foco.
 */
export function AutoCarousel<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  speed = 45,
  itemClassName = "w-[clamp(15rem,78vw,19rem)]",
  className,
}: AutoCarouselProps<T>) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [durationSeconds, setDurationSeconds] = useState(40);
  const [paused, setPaused] = useState(false);
  const trackId = useId();

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // scrollWidth cobre as duas cópias; usamos metade (um ciclo completo).
    const cycleWidth = track.scrollWidth / 2;
    if (cycleWidth <= 0) return;
    setDurationSeconds(Math.max(12, cycleWidth / Math.max(10, speed)));
  }, [speed]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, items.length]);

  if (items.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        className={cn(
          "group relative -mx-[var(--gutter)] overflow-x-hidden px-[var(--gutter)] py-2",
          // Sem movimento: vira uma lista rolável pelo próprio usuário.
          "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto",
          "sm:[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]",
        )}
      >
        <ul
          id={trackId}
          ref={trackRef}
          className={cn(
            "marquee-track flex w-max flex-nowrap items-stretch gap-5",
            "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          )}
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((item, index) => (
            <li
              key={getKey(item, index)}
              className={cn("flex shrink-0 snap-start", itemClassName)}
            >
              {renderItem(item)}
            </li>
          ))}

          {/* Cópia clonada: existe apenas para o loop visual contínuo. */}
          {items.map((item, index) => (
            <li
              key={`clone-${getKey(item, index)}`}
              aria-hidden
              // `inert` evita foco por teclado nos controles duplicados.
              {...{ inert: "" }}
              className={cn("flex shrink-0 motion-reduce:hidden", itemClassName)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-controls={trackId}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-gold/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:hidden"
        >
          {paused ? (
            <Play className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          ) : (
            <Pause className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          )}
          {paused ? "Retomar rolagem" : "Pausar rolagem"}
        </button>
        <p className="text-xs text-muted-foreground">
          Passe o mouse ou use o teclado para pausar e explorar.
        </p>
      </div>
    </div>
  );
}
