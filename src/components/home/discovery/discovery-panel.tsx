import { SearchBar } from "../search-bar";
import { QuickFilters, type QuickFilterOption } from "./quick-filters";

export interface DiscoveryPanelProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: readonly QuickFilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

/** Cartão de descoberta: campo de busca + chips de filtro rápido. */
export function DiscoveryPanel({
  query,
  onQueryChange,
  filters,
  activeFilter,
  onFilterChange,
}: DiscoveryPanelProps) {
  return (
    <div id="buscar" className="mx-auto max-w-3xl scroll-mt-[calc(var(--header-h)+1.5rem)]">
      <div className="glass-surface edge-highlight relative overflow-hidden rounded-[22px] p-5 sm:p-8">
        {/* Halo dourado discreto ancorado no canto superior direito do painel. */}
        <span
          aria-hidden
          className="halo-gradient pointer-events-none absolute -right-16 -top-24 h-56 w-72 opacity-45"
        />
        <div className="relative">
        <SearchBar value={query} onValueChange={onQueryChange} />
        <QuickFilters options={filters} activeId={activeFilter} onSelect={onFilterChange} />
        </div>
      </div>
    </div>
  );
}
