import { useCallback, useMemo, useState } from "react";

import {
  CREDIT_OPTIONS,
  EMPTY_CATALOG_FILTERS,
  PRICE_RANGES,
  applyCatalogFilters,
  hasActiveFilters,
  sortCatalog,
  type CatalogFilters,
  type CatalogSortId,
} from "@/domain/products/catalog-filters";
import { useResource } from "@/hooks/use-async-resource";
import { categoryService, productService, storeService } from "@/services";
import type { Product } from "@/types";

/** Quantos itens são revelados a cada clique em "Carregar mais". */
export const CATALOG_PAGE_SIZE = 8;

/** Opção de faceta já com a contagem de produtos correspondentes. */
export interface FacetOption {
  id: string;
  label: string;
  count: number;
}

/** Chip de filtro ativo exibido acima dos resultados. */
export interface ActiveFilterChip {
  key: string;
  label: string;
  remove: () => void;
}

const EMPTY_PRODUCTS: readonly Product[] = [];

/**
 * Orquestra o catálogo completo: carregamento via serviços, facetas, busca,
 * ordenação e revelação progressiva.
 *
 * Toda a regra de filtragem vive em `@/domain/products/catalog-filters`; aqui
 * cuidamos apenas do estado de interface.
 */
export function useCatalog() {
  const productsResource = useResource(productQueries.list());
  const categoriesResource = useResource(categoryQueries.list());
  const storesResource = useResource(storeQueries.list({ activeOnly: true }));

  const products = productsResource.data ?? EMPTY_PRODUCTS;

  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS);
  const [sort, setSort] = useState<CatalogSortId>("relevance");
  const [visibleCount, setVisibleCount] = useState(CATALOG_PAGE_SIZE);

  /** Toda mudança de critério reinicia a revelação progressiva. */
  const patch = useCallback((changes: Partial<CatalogFilters>) => {
    setFilters((previous) => ({ ...previous, ...changes }));
    setVisibleCount(CATALOG_PAGE_SIZE);
  }, []);

  /** Alterna um valor dentro de uma faceta de múltipla escolha. */
  const toggle = useCallback(
    <K extends "categoryIds" | "storeIds" | "priceRangeIds" | "credits">(
      key: K,
      value: CatalogFilters[K][number],
    ) => {
      setFilters((previous) => {
        const current = previous[key] as readonly (typeof value)[];
        const next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...previous, [key]: next } as CatalogFilters;
      });
      setVisibleCount(CATALOG_PAGE_SIZE);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters(EMPTY_CATALOG_FILTERS);
    setVisibleCount(CATALOG_PAGE_SIZE);
  }, []);

  const results = useMemo(
    () => sortCatalog(applyCatalogFilters(products, filters), sort),
    [products, filters, sort],
  );

  const visibleProducts = useMemo(
    () => results.slice(0, visibleCount),
    [results, visibleCount],
  );

  /**
   * Facetas de categoria e loja derivadas dos produtos carregados: só
   * mostramos opções que realmente existem no catálogo, evitando filtros
   * que levariam a zero resultados.
   */
  const categoryOptions = useMemo<FacetOption[]>(() => {
    const catalog = categoriesResource.data ?? [];
    return catalog
      .map((category) => ({
        id: category.id,
        label: category.label,
        count: products.filter((product) => product.categoryId === category.id).length,
      }))
      .filter((option) => option.count > 0);
  }, [categoriesResource.data, products]);

  const storeOptions = useMemo<FacetOption[]>(() => {
    const catalog = storesResource.data ?? [];
    return catalog
      .map((store) => ({
        id: store.id,
        label: store.name,
        count: products.filter((product) => product.storeId === store.id).length,
      }))
      .filter((option) => option.count > 0);
  }, [storesResource.data, products]);

  /** Chips de remoção individual — um por valor selecionado. */
  const activeChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];
    const term = filters.term.trim();

    if (term) {
      chips.push({
        key: "term",
        label: `Busca: “${term}”`,
        remove: () => patch({ term: "" }),
      });
    }

    for (const id of filters.categoryIds) {
      const label = categoryOptions.find((option) => option.id === id)?.label ?? id;
      chips.push({ key: `cat-${id}`, label, remove: () => toggle("categoryIds", id) });
    }

    for (const id of filters.storeIds) {
      const label = storeOptions.find((option) => option.id === id)?.label ?? id;
      chips.push({ key: `store-${id}`, label, remove: () => toggle("storeIds", id) });
    }

    for (const id of filters.priceRangeIds) {
      const label = PRICE_RANGES.find((range) => range.id === id)?.label ?? id;
      chips.push({ key: `price-${id}`, label, remove: () => toggle("priceRangeIds", id) });
    }

    for (const credits of filters.credits) {
      const label = CREDIT_OPTIONS.find((option) => option.id === credits)?.label ?? `${credits}`;
      chips.push({ key: `credits-${credits}`, label, remove: () => toggle("credits", credits) });
    }

    if (filters.minDiscount > 0) {
      chips.push({
        key: "discount",
        label: `${filters.minDiscount}% ou mais`,
        remove: () => patch({ minDiscount: 0 }),
      });
    }

    if (filters.verifiedOnly) {
      chips.push({
        key: "verified",
        label: "Ofertas verificadas",
        remove: () => patch({ verifiedOnly: false }),
      });
    }

    return chips;
  }, [filters, categoryOptions, storeOptions, patch, toggle]);

  return {
    filters,
    sort,
    setSort,
    patch,
    toggle,
    reset,
    results,
    visibleProducts,
    hasMore: visibleCount < results.length,
    loadMore: () => setVisibleCount((count) => count + CATALOG_PAGE_SIZE),
    isActive: hasActiveFilters(filters),
    activeChips,
    categoryOptions,
    storeOptions,
    isLoading: productsResource.isLoading,
    error: productsResource.error,
    refetch: productsResource.refetch,
  };
}
