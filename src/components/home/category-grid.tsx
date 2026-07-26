import { ArrowRight, Home, Laptop, Shirt, Smartphone, Sparkles, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SectionHeading, cardBase } from "./primitives";

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
  isActive: boolean;
  onSelect: (id: string) => void;
}

function CategoryCard({ category, isActive, onSelect }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={isActive}
      className={cn(
        isActive ? cardBase : cardInteractive,
        "motion-safe-transform flex h-full w-full flex-col items-start gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive && "border-ink bg-ink bg-[image:var(--gradient-ink)] text-offwhite shadow-lift",
      )}
    >

      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors duration-200",
          isActive ? "border-offwhite/20 bg-offwhite/10" : "border-border bg-background",
        )}
      >
        <Icon
          className={cn("h-5 w-5", isActive ? "text-gold" : "text-muted-foreground")}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>

      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-serif text-lg font-medium tracking-tight">{category.label}</span>
        <span
          className={cn(
            "text-fluid-xs leading-relaxed",
            isActive ? "text-offwhite/75" : "text-muted-foreground",
          )}
        >
          {category.description}
        </span>
      </span>

      <span
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 text-xs font-semibold",
          isActive ? "text-gold" : "text-muted-foreground",
        )}
      >
        {category.offerCount} ofertas
        <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
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

      <ul className="mt-10 grid-fluid [--col-min:9rem]">
        {CATEGORIES.map((category) => (
          <li key={category.id} className="min-w-0">
            <CategoryCard
              category={category}
              isActive={activeCategory === category.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
