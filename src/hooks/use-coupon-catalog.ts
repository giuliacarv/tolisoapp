import { useCallback, useMemo, useState } from "react";

import {
  DISCOUNT_TYPE_OPTIONS,
  EMPTY_COUPON_FILTERS,
  MINIMUM_PURCHASE_RANGES,
  STATUS_OPTIONS,
  applyCouponFilters,
  hasActiveCouponFilters,
  sortCoupons,
  type CouponFilters,
  type CouponSortId,
} from "@/domain/coupons/coupon-filters";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { couponService, storeService } from "@/services";
import type { Coupon } from "@/types";

/** Opção de faceta já com a contagem de cupons correspondentes. */
export interface CouponFacetOption {
  id: string;
  label: string;
  count: number;
}

/** Chip de filtro ativo exibido acima dos resultados. */
export interface CouponFilterChip {
  key: string;
  label: string;
  remove: () => void;
}

const EMPTY_COUPONS: readonly Coupon[] = [];

/**
 * Orquestra a página de cupons: carregamento via `couponService`, facetas,
 * busca e ordenação. Toda a regra pura vive em `coupon-filters`; aqui só
 * gerenciamos estado de interface.
 */
export function useCouponCatalog() {
  const couponsResource = useAsyncResource(() => couponService.list(), []);
  const storesResource = useAsyncResource(() => storeService.list({ activeOnly: true }), []);

  const coupons = couponsResource.data ?? EMPTY_COUPONS;

  const [filters, setFilters] = useState<CouponFilters>(EMPTY_COUPON_FILTERS);
  const [sort, setSort] = useState<CouponSortId>("relevance");

  const patch = useCallback((changes: Partial<CouponFilters>) => {
    setFilters((previous) => ({ ...previous, ...changes }));
  }, []);

  const toggle = useCallback(
    <K extends "storeIds" | "discountTypes" | "statuses" | "minimumRangeIds">(
      key: K,
      value: CouponFilters[K][number],
    ) => {
      setFilters((previous) => {
        const current = previous[key] as readonly (typeof value)[];
        const next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...previous, [key]: next } as CouponFilters;
      });
    },
    [],
  );

  const reset = useCallback(() => setFilters(EMPTY_COUPON_FILTERS), []);

  const results = useMemo(
    () => sortCoupons(applyCouponFilters(coupons, filters), sort),
    [coupons, filters, sort],
  );

  /** Só exibimos lojas que realmente possuem cupons demonstrativos. */
  const storeOptions = useMemo<CouponFacetOption[]>(() => {
    const stores = storesResource.data ?? [];
    return stores
      .map((store) => ({
        id: store.id,
        label: store.name,
        count: coupons.filter((coupon) => coupon.storeId === store.id).length,
      }))
      .filter((option) => option.count > 0);
  }, [storesResource.data, coupons]);

  const activeChips = useMemo<CouponFilterChip[]>(() => {
    const chips: CouponFilterChip[] = [];
    const term = filters.term.trim();

    if (term) {
      chips.push({ key: "term", label: `Busca: “${term}”`, remove: () => patch({ term: "" }) });
    }

    for (const id of filters.storeIds) {
      const label = storeOptions.find((option) => option.id === id)?.label ?? id;
      chips.push({ key: `store-${id}`, label, remove: () => toggle("storeIds", id) });
    }

    for (const type of filters.discountTypes) {
      const label = DISCOUNT_TYPE_OPTIONS.find((option) => option.id === type)?.label ?? type;
      chips.push({ key: `type-${type}`, label, remove: () => toggle("discountTypes", type) });
    }

    for (const status of filters.statuses) {
      const label = STATUS_OPTIONS.find((option) => option.id === status)?.label ?? status;
      chips.push({ key: `status-${status}`, label, remove: () => toggle("statuses", status) });
    }

    for (const id of filters.minimumRangeIds) {
      const label = MINIMUM_PURCHASE_RANGES.find((range) => range.id === id)?.label ?? id;
      chips.push({ key: `min-${id}`, label, remove: () => toggle("minimumRangeIds", id) });
    }

    if (filters.noMinimumOnly) {
      chips.push({
        key: "no-minimum",
        label: "Sem compra mínima",
        remove: () => patch({ noMinimumOnly: false }),
      });
    }

    return chips;
  }, [filters, storeOptions, patch, toggle]);

  return {
    filters,
    sort,
    setSort,
    patch,
    toggle,
    reset,
    results,
    storeOptions,
    activeChips,
    isActive: hasActiveCouponFilters(filters),
    isLoading: couponsResource.isLoading,
    error: couponsResource.error,
    refetch: couponsResource.refetch,
  };
}
