import { ArrowRight, Home, Laptop, Shirt, Smartphone, Sparkles, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Category, CategoryIconName } from "@/types";

import { SectionHeading, cardInteractive } from "./primitives";
import { Reveal } from "./reveal";

/**
 * Mapa chave → componente de ícone.
 * Os dados guardam apenas a string (`iconName`), serializável e pronta para o
 * banco; a escolha do componente React acontece só na camada de apresentação.
 */
const CATEGORY_ICONS: Record<CategoryIconName, LucideIcon> = {
  smartphone: Smartphone,
  home: Home,
  sparkles: Sparkles,
  shirt: Shirt,
  laptop: Laptop,
  watch: Watch,
};

/** Tamanhos do bento. Cada variante define proporção e densidade tipográfica. */
type BentoSize = "hero" | "wide" | "compact";

interface BentoSlot {
  size: BentoSize;
  /** Classes de posicionamento na grade (mobile → sm → lg). */
  span: string;
}

/**
 * Malha assimétrica de 4 colunas × linhas de 176px (22 × 8px).
 *
 *   ┌───────────────┬───────────────┐
 *   │               │     wide      │
 *   │     hero      ├───────┬───────┤
 *   │   (2 × 2)     │ comp. │ comp. │
 *   ├───────────────┼───────┴───────┤
 *   │     wide      │     wide      │
 *   └───────────────┴───────────────┘
 *
 * O padrão cobre 6 blocos e se repete em ciclo caso o catálogo cresça, sempre
 * fechando linhas cheias — nunca sobra buraco na grade.
 */
const BENTO_PATTERN: readonly BentoSlot[] = [
  { size: "hero", span: "sm:col-span-2 sm:row-span-2" },
  { size: "wide", span: "sm:col-span-2" },
  { size: "compact", span: "sm:col-span-1" },
  { size: "compact", span: "sm:col-span-1" },
  { size: "wide", span: "sm:col-span-2" },
  { size: "wide", span: "sm:col-span-2" },
];

function slotAt(index: number): BentoSlot {
  return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

interface CategoryCardProps {
  category: Category;
  index: number;
  isActive: boolean;
  size: BentoSize;
  onSelect: (id: string) => void;
}

function CategoryCard({ category, index, isActive, size, onSelect }: CategoryCardProps) {
  const Icon = CATEGORY_ICONS[category.iconName] ?? Smartphone;
  const isHero = size === "hero";
  // Bloco focal e bloco selecionado recebem o mesmo tratamento de superfície
  // escura, deixando claro qual filtro está ativo.
  const dark = isHero || isActive;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={isActive}
      className={cn(
        cardInteractive,
        "border-0 hover:border-0",
        "motion-safe-transform group relative isolate flex h-full w-full flex-col items-start overflow-hidden text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "!shadow-none hover:!shadow-none",
        // Espaçamento interno em múltiplos de 8px: 24px / 32px / 40px.
        size === "compact" && "p-6",
        size === "wide" && "p-6 sm:p-8",
        isHero && "p-8 sm:p-10",
        dark &&
          "bg-ink bg-[image:var(--gradient-ink)] text-offwhite",
      )}
    >
      {/* Halo dourado assimétrico + contraluz frio nas superfícies escuras. */}
      {dark ? (
        <>
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute -right-24 -top-28 -z-10 h-64 w-80 opacity-60"
          />
          <span
            aria-hidden
            className="glow-orb-cool absolute -bottom-16 -left-16 -z-10 h-40 w-40"
          />
        </>
      ) : null}

      {/* Índice editorial: numeração discreta que dá ritmo à grade. */}
      <span
        aria-hidden
        className={cn(
          "absolute right-6 top-6 font-serif tabular-nums transition-colors duration-200",
          isHero ? "text-2xl" : "text-lg",
          dark ? "text-offwhite/20" : "text-border",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl border transition-colors duration-200",
          isHero ? "h-14 w-14" : "h-11 w-11",
          dark ? "border-gold/30 bg-offwhite/8" : "border-gold/25 bg-gold/8",
        )}
      >
        <Icon
          className={cn(isHero ? "h-6 w-6" : "h-5 w-5", "text-gold")}
          strokeWidth={1.6}
          aria-hidden
        />
      </span>

      {/* Ritmo vertical 8pt: 32px (hero) ou 24px depois do ícone. */}
      <span className={cn("flex min-w-0 flex-col gap-2", isHero ? "mt-8" : "mt-6")}>
        <span
          className={cn(
            "font-serif tracking-tight",
            isHero ? "text-2xl leading-[1.15] sm:text-3xl" : "text-lg font-medium",
          )}
        >
          {category.label}
        </span>
        <span
          className={cn(
            "max-w-[38ch] leading-relaxed",
            isHero ? "text-fluid-sm" : "text-fluid-xs",
            dark ? "text-offwhite/70" : "text-muted-foreground",
            // Nos blocos baixos a descrição fica em duas linhas para não
            // empurrar o rodapé do card.
            size === "compact" && "line-clamp-2",
          )}
        >
          {category.description}
        </span>
      </span>

      <span
        className={cn(
          "mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em]",
          dark ? "text-gold" : "text-muted-foreground",
        )}
      >
        {category.offerCount} ofertas
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </button>
  );
}

export interface CategoryGridProps {
  /** Categorias resolvidas pelo `categoryService`. */
  categories: readonly Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

/**
 * Classes da malha. Linhas de 224px (28 × 8) e gaps de 16px/24px mantêm todo o
 * bento sobre a grade de 8px. Compartilhado entre conteúdo e skeleton para que
 * o placeholder tenha exatamente a mesma geometria (CLS zero).
 */
const BENTO_GRID =
  "mt-12 grid auto-rows-[14rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6";

/** Placeholder com a mesma malha bento, evitando salto de layout (CLS). */
function CategoryGridSkeleton() {
  return (
    <ul className={BENTO_GRID} aria-hidden>
      {Array.from({ length: BENTO_PATTERN.length }).map((_, index) => (
        <li
          key={`category-skeleton-${index}`}
          className={cn(
            "min-w-0 animate-pulse rounded-[18px] bg-muted/50",
            slotAt(index).span,
          )}
        />
      ))}
    </ul>
  );
}

export function CategoryGrid({
  categories,
  activeCategory,
  onSelect,
  isLoading = false,
}: CategoryGridProps) {
  return (
    <div>
      <SectionHeading
        align="center"
        eyebrow="Categorias"
        title="Comece por onde dói no bolso"
        description="Escolha uma categoria e veja na hora onde estão os maiores cortes de preço."
        className="mx-auto items-center text-center"
      />

      {isLoading ? (
        <CategoryGridSkeleton />
      ) : (
        <ul className={BENTO_GRID}>
          {categories.map((category, index) => {
            const slot = slotAt(index);

            return (
              <Reveal
                as="li"
                key={category.id}
                delay={index * 60}
                className={cn("min-w-0", slot.span)}
              >
                <CategoryCard
                  category={category}
                  index={index}
                  size={slot.size}
                  isActive={activeCategory === category.id}
                  onSelect={onSelect}
                />
              </Reveal>
            );
          })}
        </ul>
      )}
    </div>
  );
}
