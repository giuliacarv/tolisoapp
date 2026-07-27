import { useCallback, useMemo, useState } from "react";

import type { Product } from "@/types";
import { filterProducts } from "@/domain/products/filters";
import { DEFAULT_PAGE_SIZE, paginate } from "@/domain/products/pagination";
import { sortProducts, type SortId } from "@/domain/products/sorting";

/** Id reservado para "sem filtro de categoria". */
export const ALL_FILTER_ID = "all";

export interface UseProductDiscoveryOptions {
  products: readonly Product[];
  /** Carregamento vindo da camada de serviços (`useAsyncResource`). */
  isLoading?: boolean;
  /** Traduz o id do filtro para o rótulo de categoria dos dados. */
  resolveCategoryLabel: (filterId: string) => string | undefined;
  pageSize?: number;
}

/**
 * Orquestra busca, filtro, ordenação e paginação da vitrine.
 * Mantém a UI livre de regra de negócio — a lógica vive em `@/domain/products`.
 */
export function useProductDiscovery({
  products,
  isLoading = false,
  resolveCategoryLabel,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseProductDiscoveryOptions) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER_ID);
  const [sort, setSort] = useState<SortId>("recommended");
  const [page, setPage] = useState(1);

  const categoryLabel =
    activeFilter === ALL_FILTER_ID ? undefined : resolveCategoryLabel(activeFilter);

  const results = useMemo(
    () => sortProducts(filterProducts(products, { term: query, categoryLabel }), sort),
    [products, query, categoryLabel, sort],
  );

  const { items: pageProducts, safePage, totalPages } = paginate(results, page, pageSize);

  /** Toda mudança de critério volta para a primeira página. */
  const changeQuery = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const changeFilter = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    setPage(1);
  }, []);

  const toggleFilter = useCallback((filterId: string) => {
    setActiveFilter((prev) => (prev === filterId ? ALL_FILTER_ID : filterId));
    setPage(1);
  }, []);

  const changeSort = useCallback((value: SortId) => {
    setSort(value);
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setQuery("");
    setActiveFilter(ALL_FILTER_ID);
    setPage(1);
  }, []);

  return {
    query,
    activeFilter,
    sort,
    page: safePage,
    totalPages,
    isLoading,
    results,
    pageProducts,
    categoryLabel,
    hasActiveCriteria: activeFilter !== ALL_FILTER_ID || query.trim() !== "",
    changeQuery,
    changeFilter,
    toggleFilter,
    changeSort,
    goToPage: setPage,
    reset,
  };
}
