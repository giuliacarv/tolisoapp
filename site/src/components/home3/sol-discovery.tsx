import { Home, Laptop, Search, Shirt, Smartphone, Sparkles, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useResource } from "@/hooks/use-async-resource";
import { categoryQueries } from "@/services";
import type { CategoryIconName } from "@/types";
import { cn } from "@/lib/utils";

import { Shell, SolHeading, SolSection } from "./shell";

const ICONS: Record<CategoryIconName, LucideIcon> = {
  smartphone: Smartphone,
  home: Home,
  sparkles: Sparkles,
  shirt: Shirt,
  laptop: Laptop,
  watch: Watch,
};

const TRENDING = ["Fone bluetooth", "Air fryer", "Teclado mecânico", "Skincare", "Tênis running"];

export interface SolDiscoveryProps {
  term: string;
  onTermChange: (term: string) => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

/**
 * Busca em barra branca gigante + grade de categorias em cartões coloridos.
 * O estado vive na view (a grade de ofertas reage em tempo real).
 */
export function SolDiscovery({
  term,
  onTermChange,
  activeCategory,
  onCategoryChange,
}: SolDiscoveryProps) {
  const categories = useResource(categoryQueries.list());
  const [draft, setDraft] = useState(term);
  const navigate = useNavigate();

  return (
    <SolSection id="sol-busca">
      <Shell>
        <div className="sol-card mx-auto max-w-4xl p-[clamp(1.25rem,3vw,2.5rem)] text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] text-foreground">
            O que você quer comprar hoje?
          </h2>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              onTermChange(draft.trim());
            }}
          >
            <label className="sr-only" htmlFor="sol-search">
              Buscar ofertas
            </label>
            <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-secondary px-5">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <input
                id="sol-search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Busque por produto, marca ou loja"
                className="min-h-12 w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button type="submit" className="sol-pill text-sm">
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Em alta
            </span>
            {TRENDING.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setDraft(item);
                  onTermChange(item);
                }}
                className="sol-chip text-xs"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div id="sol-categorias" className="mt-[clamp(3rem,6vw,5rem)] scroll-mt-28">
          <SolHeading
            eyebrow="Categorias"
            title="Escolha por onde começar"
            description="Cada categoria reúne ofertas e cupons já filtrados pela curadoria."
            action={
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className="sol-pill-ghost text-sm"
              >
                Ver tudo
              </button>
            }
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(categories.data ?? []).map((category, index) => {
              const Icon = ICONS[category.iconName];
              const isActive = activeCategory === category.label;
              const isFeature = index === 0;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(isActive ? null : category.label)}
                  className={cn(
                    "sol-card sol-card-hover flex flex-col items-start gap-3 p-6 text-left",
                    isFeature && "lg:col-span-2 lg:flex-row lg:items-center lg:justify-between",
                    isActive && "sol-band",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl",
                      isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-extrabold tracking-[-0.02em]">
                      {category.label}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-sm",
                        isActive ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {category.description}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-secondary text-foreground",
                    )}
                  >
                    {category.offerCount} ofertas
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => void navigate({ to: "/ofertas" })}
            className="sol-pill-ghost mt-8 w-full text-sm sm:w-auto"
          >
            Explorar catálogo completo
          </button>
        </div>
      </Shell>
    </SolSection>
  );
}
