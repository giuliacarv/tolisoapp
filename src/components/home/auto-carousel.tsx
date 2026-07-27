import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Espaçamento entre slides — precisa espelhar a classe `gap-5` da faixa. */
const GAP_PX = 20;
/** Duração da transição de um passo (deslizar de um item para o próximo). */
const SLIDE_MS = 520;

export interface AutoCarouselProps<T> {
  /** Itens exibidos. A lista é clonada internamente para o loop infinito. */
  items: readonly T[];
  /** Chave estável de cada item. */
  getKey: (item: T, index: number) => string;
  /** Render do conteúdo de um slide. */
  renderItem: (item: T) => ReactNode;
  /** Rótulo acessível do carrossel (ex.: "Carrossel de ofertas"). */
  ariaLabel: string;
  /** Tempo de leitura entre um passo e outro, em milissegundos. */
  intervalMs?: number;
  /** Largura de cada slide (classe utilitária). */
  itemClassName?: string;
  className?: string;
}

/**
 * Carrossel automático em PASSOS discretos (ofertas, cupons…).
 *
 * Ao contrário de um marquee contínuo, a faixa avança exatamente um item por
 * vez e permanece parada durante `intervalMs`, dando tempo de ler o card antes
 * do próximo deslocamento. O deslocamento usa apenas `transform` (composited),
 * e o loop é infinito: a lista é clonada e, ao terminar o primeiro ciclo, o
 * índice volta a zero com a transição desligada — o salto é imperceptível
 * porque a cópia ocupa exatamente a mesma posição visual.
 *
 * Acessibilidade:
 * - pausa automática em `hover` e em `focus-within` (teclado);
 * - botão explícito de pausar/retomar (WCAG 2.2.2 — conteúdo em movimento);
 * - setas avançam/retrocedem um item e pausam o avanço automático;
 * - com `prefers-reduced-motion`, o movimento é desligado e a faixa vira uma
 *   lista rolável horizontalmente (a cópia clonada é ocultada);
 * - a cópia clonada é `aria-hidden` e não recebe foco.
 */
export function AutoCarousel<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  intervalMs = 3600,
  itemClassName = "w-[clamp(15rem,78vw,19rem)]",
  className,
}: AutoCarouselProps<T>) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();

  /** Índice do primeiro item visível. Pode chegar a `items.length` (clone). */
  const [index, setIndex] = useState(0);
  /** Desligada apenas no instante do rebobinamento invisível. */
  const [animating, setAnimating] = useState(true);
  /** Pausa manual pelo botão. */
  const [paused, setPaused] = useState(false);
  /** Pausa temporária por hover/foco do usuário. */
  const [hovered, setHovered] = useState(false);
  /** Largura de um passo: card + gap. */
  const [stepWidth, setStepWidth] = useState(0);

  const reduceMotion = useReducedMotion();
  const total = items.length;
  const isRunning = !paused && !hovered && !reduceMotion && total > 1;

  /** Mede a largura de um slide para converter índice em deslocamento. */
  const measure = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return;
    setStepWidth(first.offsetWidth + GAP_PX);
  }, []);

  useLayoutEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, total]);

  /** Avanço automático: um item por vez, com pausa de leitura entre eles. */
  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setIndex((value) => value + 1), intervalMs);
    return () => window.clearInterval(timer);
  }, [isRunning, intervalMs]);

  /**
   * Rebobinamento invisível: ao ultrapassar o último item real, esperamos a
   * transição terminar e voltamos ao índice 0 sem animação. Como o clone está
   * na mesma posição visual, o usuário não percebe o corte.
   */
  useEffect(() => {
    if (index < total) return;
    const timer = window.setTimeout(() => {
      setAnimating(false);
      setIndex(0);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, total]);

  /** Reativa a transição no quadro seguinte ao rebobinamento. */
  useEffect(() => {
    if (animating) return;
    const frame = requestAnimationFrame(() => setAnimating(true));
    return () => cancelAnimationFrame(frame);
  }, [animating]);

  /** Passo manual pelas setas: também interrompe o avanço automático. */
  const step = useCallback(
    (direction: -1 | 1) => {
      setPaused(true);
      setIndex((value) => {
        const next = value + direction;
        // Antes do primeiro item, salta para o fim do ciclo (sem animar).
        if (next < 0) return total - 1;
        return next;
      });
    },
    [total],
  );

  if (total === 0) return null;

  const arrowClass =
    "hidden size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-gold/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex";

  return (
    <div className={cn("relative", className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
        className={cn(
          "relative -mx-[var(--gutter)] overflow-x-hidden px-[var(--gutter)] py-2",
          // Sem movimento: vira uma lista rolável pelo próprio usuário.
          "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto",
          reduceMotion && "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]",
          "sm:[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]",
        )}
      >
        <ul
          id={trackId}
          ref={trackRef}
          className="flex w-max flex-nowrap items-stretch gap-5 will-change-transform"
          style={
            reduceMotion
              ? undefined
              : {
                  transform: `translate3d(-${index * stepWidth}px,0,0)`,
                  transition: animating
                    ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                    : "none",
                }
          }
        >
          {items.map((item, itemIndex) => (
            <li
              key={getKey(item, itemIndex)}
              className={cn("flex shrink-0 snap-start", itemClassName)}
            >
              {renderItem(item)}
            </li>
          ))}

          {/* Cópia clonada: existe apenas para o loop visual contínuo. */}
          {items.map((item, itemIndex) => (
            <li
              key={`clone-${getKey(item, itemIndex)}`}
              aria-hidden
              // `inert` evita foco por teclado nos controles duplicados.
              inert
              className={cn("flex shrink-0 motion-reduce:hidden", reduceMotion && "hidden", itemClassName)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
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

        {/* Setas manuais: reforço de usabilidade no desktop (ocultas no mobile,
            onde o gesto de arrastar já resolve). */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-controls={trackId}
            aria-label={`${ariaLabel}: item anterior`}
            className={arrowClass}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-controls={trackId}
            aria-label={`${ariaLabel}: próximo item`}
            className={arrowClass}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          {paused
            ? "Rolagem pausada — use as setas para navegar item a item."
            : "Avança um item por vez. Passe o mouse ou use o teclado para pausar."}
        </p>
      </div>
    </div>
  );
}
