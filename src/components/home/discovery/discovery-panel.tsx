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
      <div className="rounded-[22px] border border-border bg-card p-5 shadow-soft sm:p-8">
        <SearchBar value={query} onValueChange={onQueryChange} />
        <QuickFilters options={filters} activeId={activeFilter} onSelect={onFilterChange} />
      </div>
    </div>
  );
}
