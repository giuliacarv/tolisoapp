import { ArrowRight, Home, Laptop, Shirt, Smartphone, Sparkles, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SectionHeading, cardInteractive } from "./primitives";
import { Reveal } from "./reveal";


/**
 * ============================================================
 * DADOS DEMONSTRATIVOS — SERÃO SUBSTITUÍDOS PELO BANCO DE DADOS
 * ============================================================
 * As categorias e as contagens abaixo são ilustrativas e devem vir
 * da API/banco (`categories.offer_count`) na próxima fase.
 */
export interface Category {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Contagem ilustrativa — substituir por dado real do backend. */
  offerCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "eletronicos",
    label: "Eletrônicos",
    description: "Fones, smartwatches e gadgets do dia a dia.",
    icon: Smartphone,
    offerCount: 24,
  },
  {
    id: "casa",
    label: "Casa e decoração",
    description: "Eletrodomésticos, organização e conforto.",
    icon: Home,
    offerCount: 18,
  },
  {
    id: "beleza",
    label: "Beleza e cuidados",
    description: "Skincare, perfumaria e itens de autocuidado.",
    icon: Sparkles,
    offerCount: 12,
  },
  {
    id: "moda",
    label: "Moda",
    description: "Roupas, calçados e acessórios de vestuário.",
    icon: Shirt,
    offerCount: 16,
  },
  {
    id: "informatica",
    label: "Informática",
    description: "Notebooks, periféricos e itens de escritório.",
    icon: Laptop,
    offerCount: 14,
  },
  {
    id: "acessorios",
    label: "Acessórios",
    description: "Óculos, relógios, bolsas e complementos.",
    icon: Watch,
    offerCount: 11,
  },
];

interface CategoryCardProps {
  category: Category;
  index: number;
  isActive: boolean;
  /** O primeiro bloco da grade bento ocupa 2x2 e recebe tratamento noir. */
  featured?: boolean;
  onSelect: (id: string) => void;
}

function CategoryCard({ category, index, isActive, featured = false, onSelect }: CategoryCardProps) {
  const Icon = category.icon;
  const dark = featured || isActive;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={isActive}
      className={cn(
        cardInteractive,
        "motion-safe-transform group relative isolate flex h-full w-full flex-col items-start overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        featured ? "p-8 sm:p-10" : "p-6",
        dark &&
          "border-ink bg-ink bg-[image:var(--gradient-ink)] text-offwhite shadow-lift hover:border-gold/45",
      )}
    >
      {/* Halo dourado assimétrico exclusivo do bloco em destaque. */}
      {dark ? (
        <span
          aria-hidden
          className="halo-gradient pointer-events-none absolute -right-24 -top-28 -z-10 h-64 w-80 opacity-60"
        />
      ) : null}

      {/* Índice editorial: numeração discreta que dá ritmo à grade. */}
      <span
        aria-hidden
        className={cn(
          "absolute right-5 top-5 font-serif tabular-nums transition-colors duration-200",
          featured ? "text-2xl" : "text-lg",
          dark ? "text-offwhite/20" : "text-border",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl border transition-colors duration-200",
          featured ? "h-14 w-14" : "h-11 w-11",
          dark ? "border-gold/30 bg-offwhite/8" : "border-gold/25 bg-gold/8",
        )}
      >
        <Icon
          className={cn(featured ? "h-6 w-6" : "h-5 w-5", "text-gold")}
          strokeWidth={1.6}
          aria-hidden
        />
      </span>

      <span className={cn("flex min-w-0 flex-col gap-1.5", featured ? "mt-8" : "mt-4")}>
        <span
          className={cn(
            "font-serif tracking-tight",
            featured ? "text-fluid-h2 leading-[1.1]" : "text-lg font-medium",
          )}
        >
          {category.label}
        </span>
        <span
          className={cn(
            "max-w-[38ch] leading-relaxed",
            featured ? "text-fluid-sm" : "text-fluid-xs",
            dark ? "text-offwhite/70" : "text-muted-foreground",
          )}
        >
          {category.description}
        </span>
      </span>

      <span
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold uppercase tracking-[0.14em]",
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
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryGrid({ activeCategory, onSelect }: CategoryGridProps) {
  return (
    <div>
      <SectionHeading
        align="center"
        eyebrow="Categorias"
        title="Explore por categoria"
        description="Encontre as melhores oportunidades de acordo com o que você procura."
        className="mx-auto items-center text-center"
      />

      {/*
       * Bento assimétrico: o primeiro bloco ocupa 2 colunas x 2 linhas a partir
       * de `lg`, criando um ponto focal e evitando a monotonia de 6 caixas iguais.
       */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {CATEGORIES.map((category, index) => (
          <Reveal
            as="li"
            key={category.id}
            delay={index * 60}
            className={cn(
              "min-w-0",
              // 6 itens em 8 células: o primeiro e o último ocupam duas colunas,
              // fechando duas linhas cheias sem buracos na grade.
              index === 0 && "sm:col-span-2",
              index === CATEGORIES.length - 1 && "sm:col-span-2",
            )}
          >

            <CategoryCard
              category={category}
              index={index}
              featured={index === 0}
              isActive={activeCategory === category.id}
              onSelect={onSelect}
            />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

