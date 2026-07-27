import { Sparkles, TrendingUp } from "lucide-react";

import { SearchBar } from "../search-bar";
import { QuickFilters, type QuickFilterOption } from "./quick-filters";

export interface DiscoveryPanelProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: readonly QuickFilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

/** Termos demonstrativos de busca em alta. */
const TRENDING_TERMS = ["Fone bluetooth", "Smartwatch", "Skincare", "Teclado mecânico", "Air fryer"];

/** Cartão de descoberta: campo de busca + termos em alta + chips de filtro rápido. */
export function DiscoveryPanel({
  query,
  onQueryChange,
  filters,
  activeFilter,
  onFilterChange,
}: DiscoveryPanelProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3.5 py-1.5 text-fluid-micro font-medium uppercase tracking-[0.18em] text-gold">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
          Descoberta
        </span>
        <h2 className="mt-4 text-balance text-fluid-h2 font-semibold tracking-tight text-foreground">
          Diga o que você quer. Nós achamos o <span className="gold-text">melhor preço</span>.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-fluid-sm text-muted-foreground">
          Digite um produto, marca ou loja e refine com um toque. Os resultados mudam na hora —
          sem recarregar, sem enrolação.
        </p>
      </div>

      <div className="luxe-card relative overflow-hidden rounded-[26px] p-5 sm:p-8">
        {/* Camadas atmosféricas do painel. */}
        <span
          aria-hidden
          className="halo-gradient pointer-events-none absolute -right-20 -top-28 h-64 w-80 opacity-50"
        />
        <span
          aria-hidden
          className="glow-orb pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 opacity-30"
        />
        <span aria-hidden className="texture-grain pointer-events-none absolute inset-0 opacity-[0.35]" />

        <div className="relative">
          <SearchBar value={query} onValueChange={onQueryChange} />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-fluid-micro font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-gold" strokeWidth={1.9} aria-hidden />
              Em alta
            </span>
            {TRENDING_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onQueryChange(term)}
                // Alvo de toque de 44px sem inflar o chip visualmente: a altura
                // mínima cresce, o padding horizontal permanece compacto.
                className="inline-flex min-h-11 items-center rounded-full px-2.5 py-1.5 text-fluid-xs text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                {term}
              </button>
            ))}
          </div>

          <div aria-hidden className="rule-fade my-6 h-px w-full" />

          <QuickFilters options={filters} activeId={activeFilter} onSelect={onFilterChange} />
        </div>
      </div>
    </div>
  );
}
