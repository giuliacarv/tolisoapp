import type { ReactNode } from "react";
import { Check } from "lucide-react";

import {
  CREDIT_OPTIONS,
  MIN_DISCOUNT_OPTIONS,
  PRICE_RANGES,
  type CatalogFilters,
} from "@/domain/products/catalog-filters";
import type { FacetOption } from "@/hooks/use-catalog";
import { linkQuiet } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

/** Bloco de faceta com título discreto e ritmo vertical de 8pt. */
function FacetGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </legend>
      <div className="mt-3 flex flex-col gap-1">{children}</div>
    </fieldset>
  );
}

interface CheckRowProps {
  checked: boolean;
  label: string;
  count?: number;
  onToggle: () => void;
}

/**
 * Linha de seleção acessível.
 * O input nativo permanece no DOM (leitores de tela e teclado funcionam); o
 * quadrado dourado é apenas a representação visual.
 */
function CheckRow({ checked, label, count, onToggle }: CheckRowProps) {
  return (
    <label
      className={cn(
        "group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors duration-200",
        "hover:bg-secondary focus-within:ring-2 focus-within:ring-gold/50",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors duration-200",
          checked ? "border-gold bg-gold text-ink" : "border-border bg-background",
        )}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate transition-colors duration-200",
          checked ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      {count !== undefined ? (
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground/70">{count}</span>
      ) : null}
    </label>
  );
}

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
