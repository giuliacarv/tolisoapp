import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Descrição declarativa de um orbe de luz decorativo do hero.
 *
 * `speed` é o fator de parallax aplicado ao scroll (0.04 = 4% do deslocamento).
 * Orbes "distantes" recebem fatores menores; orbes "próximos", maiores.
 * `maxShift` limita o deslocamento em px para o orbe nunca escapar da faixa.
 */
export interface OrbSpec {
  id: string;
  /** Classes de posição/tamanho/aparência (usa os utilitários glow-orb). */
  className: string;
  /** Fator de parallax vertical. Faixa recomendada: 0.02 – 0.18. */
  speed: number;
  /** Deslocamento vertical máximo, em px. Evita vazamento visual. */
  maxShift: number;
  /** Profundidade percebida — vira z-index. Maior = mais próximo. */
  depth: number;
  /** Atraso da entrada em cascata, em ms. */
  delay: number;
}

/** Composição padrão de iluminação do hero (assimétrica de propósito). */
export const HERO_ORBS: OrbSpec[] = [
  {
    id: "warm-top-right",
    className: "glow-orb -right-24 -top-32 h-72 w-72 sm:h-96 sm:w-96",
    speed: 0.16,
    maxShift: 140,
    depth: 3,
    delay: 0,
  },
  {
    id: "cool-left",
    className: "glow-orb-cool -left-32 top-1/3 h-64 w-64 sm:h-80 sm:w-80",
    speed: 0.09,
    maxShift: 96,
    depth: 2,
    delay: 90,
  },
  {
    id: "warm-bottom",
    className:
      "glow-orb bottom-[-6rem] left-1/2 h-56 w-56 opacity-70 sm:h-72 sm:w-72",
    speed: 0.04,
    maxShift: 60,
    depth: 1,
    delay: 180,
  },
];

/** Largura mínima (px) para habilitar o parallax; abaixo disso ele é estático. */
const MIN_WIDTH_FOR_PARALLAX = 768;

/**
 * Orbes de luz com parallax suave em `transform: translate3d`.
 *
 * Performance: o listener de scroll é passivo e apenas agenda um
 * `requestAnimationFrame` (coalescendo múltiplos eventos em ~1 frame/16ms).
 * Nenhuma propriedade de layout é tocada — só `transform` e `opacity`.
 */
export function ParallaxOrbs({
  orbs = HERO_ORBS,
  className,
}: {
  orbs?: OrbSpec[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Reativo: se o usuário ligar "reduzir movimento" com a aba aberta, o
  // parallax é desmontado no mesmo instante (o efeito abaixo depende disso).
  const reduceMotion = useReducedMotion();

  // Entrada em cascata assim que a seção entra na viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Parallax vertical durante o scroll.
  useEffect(() => {
    if (reduceMotion) {
      // Zera qualquer deslocamento remanescente antes de desistir do efeito.
      orbRefs.current.forEach((el) => {
        if (el) el.style.transform = "";
      });
      return;
    }

    let active = window.innerWidth >= MIN_WIDTH_FOR_PARALLAX;

    const reset = () => {
      orbRefs.current.forEach((el) => {
        if (el) el.style.transform = "translate3d(0, 0, 0)";
      });
    };

    const update = () => {
      frameRef.current = null;
      const node = containerRef.current;
      if (!node || !active) return;

      // `getBoundingClientRect` é leitura pura; nada é escrito antes dela.
      const progress = -node.getBoundingClientRect().top;

      orbs.forEach((orb, index) => {
        const el = orbRefs.current[index];
        if (!el) return;
        const raw = progress * orb.speed;
        const shift = Math.max(-orb.maxShift, Math.min(orb.maxShift, raw));
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      });
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      const next = window.innerWidth >= MIN_WIDTH_FOR_PARALLAX;
      if (next === active) return;
      active = next;
      if (!active) reset();
      else schedule();
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [orbs, reduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {orbs.map((orb, index) => (
        <div
          key={orb.id}
          // Wrapper cuida do fade-in em cascata; o filho cuida do parallax,
          // evitando que as duas transformações disputem a mesma propriedade.
          className={cn(
            "absolute inset-0 transition-opacity duration-[900ms] ease-out",
            visible || reduceMotion ? "opacity-100" : "opacity-0",
          )}
          style={{ zIndex: orb.depth, transitionDelay: `${orb.delay}ms` }}
        >
          <div
            ref={(el) => {
              orbRefs.current[index] = el;
            }}
            className={cn("absolute will-change-transform", orb.className)}
          />
        </div>
      ))}
    </div>
  );
}
