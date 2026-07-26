import { useCallback, useEffect, useRef, useState } from "react";

import { PARTNER_LOGOS, type PartnerLogo } from "@/data/logos";
import { cn } from "@/lib/utils";

import { Container } from "./primitives";

export interface LogoCarouselProps {
  /** Lista de marcas. Padrão: dados demonstrativos de `src/data/logos.ts`. */
  logos?: PartnerLogo[];
  /** Velocidade da rolagem em pixels por segundo. */
  speed?: number;
  className?: string;
}

/** Slide individual: imagem uniforme, centralizada e dessaturada por padrão. */
function LogoSlide({ logo, ariaHidden }: { logo: PartnerLogo; ariaHidden?: boolean }) {
  const image = (
    <img
      src={logo.src}
      alt={ariaHidden ? "" : logo.alt}
      loading="lazy"
      decoding="async"
      width={240}
      height={64}
      draggable={false}
      className="h-7 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-200 group-hover/slide:opacity-100 group-hover/slide:grayscale-0 group-focus-visible/slide:opacity-100 group-focus-visible/slide:grayscale-0 sm:h-9"
    />
  );

  return (
    <li
      aria-hidden={ariaHidden || undefined}
      className="flex w-[clamp(5.5rem,18vw,9.875rem)] shrink-0 items-center justify-center px-[clamp(0.5rem,1.4vw,1.25rem)]"
    >
      {logo.link && !ariaHidden ? (
        <a
          href={logo.link}
          aria-label={`Ver ofertas de ${logo.name}`}
          className="group/slide flex min-h-11 w-full items-center justify-center rounded-lg"
        >
          {image}
        </a>
      ) : (
        <span className="group/slide flex min-h-11 w-full items-center justify-center">{image}</span>
      )}
    </li>
  );
}

/**
 * Carrossel de logotipos com rolagem infinita da direita para a esquerda.
 *
 * Técnica: a lista é duplicada e a faixa (`Track`) anima de `translateX(0)` até
 * `translateX(-50%)`, o que faz a segunda cópia assumir exatamente a posição da
 * primeira ao reiniciar — sem saltos visuais. A duração é derivada da largura
 * medida (`largura / speed`), mantendo a velocidade constante em qualquer tela.
 * A animação usa apenas `transform` + `will-change`, evitando reflow/repaint.
 */
export function LogoCarousel({ logos = PARTNER_LOGOS, speed = 50, className }: LogoCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [durationSeconds, setDurationSeconds] = useState(30);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // scrollWidth cobre as duas cópias; usamos metade (um ciclo completo).
    const cycleWidth = track.scrollWidth / 2;
    if (cycleWidth <= 0) return;
    setDurationSeconds(Math.max(8, cycleWidth / Math.max(10, speed)));
  }, [speed]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, logos.length]);

  return (
    <section
      aria-labelledby="parceiros-title"
      className={cn("section-band py-10 sm:py-14", className)}
    >
      <Container>
        <div className="flex flex-col items-center gap-6">
          <h2
            id="parceiros-title"
            className="text-fluid-micro font-semibold uppercase tracking-[0.28em] text-muted-foreground"
          >
            Lojas e marketplaces reconhecidos
          </h2>

          <div
            className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            role="group"
            aria-label="Carrossel de logotipos de lojas parceiras"
          >
            <ul
              ref={trackRef}
              className="marquee-track flex w-max flex-nowrap items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
              style={{ animationDuration: `${durationSeconds}s` }}
            >
              {logos.map((logo) => (
                <LogoSlide key={logo.id} logo={logo} />
              ))}
              {/* Cópia clonada apenas para o efeito visual de loop infinito. */}
              {logos.map((logo) => (
                <LogoSlide key={`clone-${logo.id}`} logo={logo} ariaHidden />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
