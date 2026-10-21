import {
  DISCOUNT_TYPE_OPTIONS,
  MINIMUM_PURCHASE_RANGES,
  STATUS_OPTIONS,
  type CouponFilters,
} from "@/domain/coupons/coupon-filters";
import type { CouponFacetOption } from "@/hooks/use-coupon-catalog";
import { CheckRow, FacetGroup } from "@/components/ui/facet-group";
import { linkQuiet } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

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
