import type { ReactNode } from "react";
import { Check } from "lucide-react";

import {
  DISCOUNT_TYPE_OPTIONS,
  MINIMUM_PURCHASE_RANGES,
  STATUS_OPTIONS,
  type CouponFilters,
} from "@/domain/coupons/coupon-filters";
import type { CouponFacetOption } from "@/hooks/use-coupon-catalog";
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

/** Linha acessível: o input nativo continua no DOM; o quadrado é decorativo. */
function CheckRow({ checked, label, count, onToggle }: CheckRowProps) {
  return (
    <label
      className={cn(
        "group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors duration-200",
        "hover:bg-secondary focus-within:ring-2 focus-within:ring-gold/50",
      )}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
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

export interface CouponFiltersPanelProps {
  filters: CouponFilters;
  storeOptions: CouponFacetOption[];
  onToggle: <K extends "storeIds" | "discountTypes" | "statuses" | "minimumRangeIds">(
    key: K,
    value: CouponFilters[K][number],
  ) => void;
  onPatch: (changes: Partial<CouponFilters>) => void;
  onReset: () => void;
  isActive: boolean;
  className?: string;
}

/**
 * Painel de facetas dos cupons.
 * O mesmo componente serve a barra lateral do desktop e o drawer do mobile,
 * garantindo que as duas versões nunca divirjam.
 */
export function CouponFiltersPanel({
  filters,
  storeOptions,
  onToggle,
  onPatch,
  onReset,
  isActive,
  className,
}: CouponFiltersPanelProps) {
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

      <FacetGroup title="Tipo de desconto">
        {DISCOUNT_TYPE_OPTIONS.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            checked={filters.discountTypes.includes(option.id)}
            onToggle={() => onToggle("discountTypes", option.id)}
          />
        ))}
      </FacetGroup>

      <FacetGroup title="Status">
        {STATUS_OPTIONS.map((option) => (
          <CheckRow
            key={option.id}
            label={option.label}
            checked={filters.statuses.includes(option.id)}
            onToggle={() => onToggle("statuses", option.id)}
          />
        ))}
      </FacetGroup>

      <FacetGroup title="Compra mínima">
        {MINIMUM_PURCHASE_RANGES.map((range) => (
          <CheckRow
            key={range.id}
            label={range.label}
            checked={filters.minimumRangeIds.includes(range.id)}
            onToggle={() => onToggle("minimumRangeIds", range.id)}
          />
        ))}
        <CheckRow
          label="Sem compra mínima"
          checked={filters.noMinimumOnly}
          onToggle={() => onPatch({ noMinimumOnly: !filters.noMinimumOnly })}
        />
      </FacetGroup>
    </div>
  );
}
