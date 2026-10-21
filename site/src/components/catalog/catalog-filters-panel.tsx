import {
  CREDIT_OPTIONS,
  MIN_DISCOUNT_OPTIONS,
  PRICE_RANGES,
  type CatalogFilters,
} from "@/domain/products/catalog-filters";
import type { FacetOption } from "@/hooks/use-catalog";
import { CheckRow, FacetGroup } from "@/components/ui/facet-group";
import { linkQuiet } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

export interface CatalogFiltersPanelProps {
  filters: CatalogFilters;
  categoryOptions: FacetOption[];
  storeOptions: FacetOption[];
  onToggle: <K extends "categoryIds" | "storeIds" | "priceRangeIds" | "credits">(
    key: K,
    value: CatalogFilters[K][number],
  ) => void;
  onPatch: (changes: Partial<CatalogFilters>) => void;
  onReset: () => void;
  isActive: boolean;
  className?: string;
}

/**
 * Painel de facetas do catálogo.
 * O mesmo componente serve a barra lateral do desktop e o drawer do mobile —
 * uma única fonte de verdade para a marcação e para a acessibilidade.
 */
export function CatalogFiltersPanel({
  filters,
  categoryOptions,
  storeOptions,
  onToggle,
  onPatch,
  onReset,
  isActive,
  className,
}: CatalogFiltersPanelProps) {
  return (
    <div className={cn("flex flex-col gap-7", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-lg tracking-tight text-foreground">Filtros</h2>
        {isActive ? (
          <button type="button" onClick={onReset} className={linkQuiet}>
            Limpar filtros
          </button>
        ) : null}
      </div>

      {categoryOptions.length > 0 ? (
        <FacetGroup title="Categoria">
          {categoryOptions.map((option) => (
            <CheckRow
              key={option.id}
              label={option.label}
              count={option.count}
              checked={filters.categoryIds.includes(option.id)}
              onToggle={() => onToggle("categoryIds", option.id)}
            />
          ))}
        </FacetGroup>
      ) : null}

      {storeOptions.length > 0 ? (
        <FacetGroup title="Loja">
          {storeOptions.map((option) => (
            <CheckRow
              key={option.id}
              label={option.label}
              count={option.count}
              checked={filters.storeIds.includes(option.id)}
              onToggle={() => onToggle("storeIds", option.id)}
            />
          ))}
        </FacetGroup>
      ) : null}

      <FacetGroup title="Faixa de preço">
        {PRICE_RANGES.map((range) => (
          <CheckRow
            key={range.id}
            label={range.label}
            checked={filters.priceRangeIds.includes(range.id)}
            onToggle={() => onToggle("priceRangeIds", range.id)}
          />
        ))}
      </FacetGroup>

      <FacetGroup title="Créditos">
        {CREDIT_OPTIONS.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            checked={filters.credits.includes(option.id)}
            onToggle={() => onToggle("credits", option.id)}
          />
        ))}
      </FacetGroup>

      <FacetGroup title="Desconto mínimo">
        <label htmlFor="desconto-minimo" className="sr-only">
          Percentual mínimo de desconto
        </label>
        <select
          id="desconto-minimo"
          value={filters.minDiscount}
          onChange={(event) => onPatch({ minDiscount: Number(event.target.value) })}
          className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground transition-colors duration-200 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        >
          {MIN_DISCOUNT_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FacetGroup>

      <FacetGroup title="Verificação">
        <CheckRow
          label="Somente ofertas verificadas"
          checked={filters.verifiedOnly}
          onToggle={() => onPatch({ verifiedOnly: !filters.verifiedOnly })}
        />
      </FacetGroup>
    </div>
  );
}
