import { useMemo } from "react";

import { PRODUCTS } from "@/data/products";
import { DEFAULT_PAGE_SIZE } from "@/domain/products/pagination";
import { ALL_FILTER_ID, useProductDiscovery } from "@/hooks/use-product-discovery";
import { useProductModals } from "@/hooks/use-product-modals";

import { CATEGORIES, CategoryGrid } from "./category-grid";
import { DiscoveryPanel } from "./discovery/discovery-panel";
import { ResultsHeader } from "./discovery/results-header";
import { EmptyResults } from "./empty-results";
import { Container } from "./primitives";
import { ProductGrid } from "./product-grid";
import { ProductModals } from "./product-modals";
import { Pagination } from "./results-controls";

/** Filtros rápidos — os ids espelham as categorias demonstrativas. */
const QUICK_FILTERS = [
  { id: ALL_FILTER_ID, label: "Todas as ofertas" },
  ...CATEGORIES.map((category) => ({ id: category.id, label: category.label })),
];

/** Sugestões demonstrativas exibidas no estado vazio. */
const SEARCH_SUGGESTIONS = ["Fone", "Smartwatch", "Skincare", "Teclado"];

const CATEGORY_LABEL_BY_ID = new Map(CATEGORIES.map((category) => [category.id, category.label]));

/**
 * Seção de descoberta: busca, filtros rápidos, categorias e resultados.
 * A regra de negócio vive em `@/domain/products`; o estado, em `useProductDiscovery`.
 */
export function SearchAndCategories() {
  const resolveCategoryLabel = useMemo(
    () => (filterId: string) => CATEGORY_LABEL_BY_ID.get(filterId),
    [],
  );

  const discovery = useProductDiscovery({ products: PRODUCTS, resolveCategoryLabel });
  const modals = useProductModals();

  function handlePageChange(next: number) {
    discovery.goToPage(next);
    document
      .getElementById("ofertas-filtradas")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSuggestion(suggestion: string) {
    discovery.changeFilter(ALL_FILTER_ID);
    discovery.changeQuery(suggestion);
  }

  return (
    <section id="categorias" className="scroll-mt-[calc(var(--header-h)+1rem)] py-4">
      <Container>
        <DiscoveryPanel
          query={discovery.query}
          onQueryChange={discovery.changeQuery}
          filters={QUICK_FILTERS}
          activeFilter={discovery.activeFilter}
          onFilterChange={discovery.changeFilter}
        />

        <div className="mt-16 sm:mt-20">
          <CategoryGrid
            activeCategory={discovery.activeFilter}
            onSelect={discovery.toggleFilter}
          />
        </div>

        <div
          id="ofertas-filtradas"
          className="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)] sm:mt-20"
        >
          <ResultsHeader
            title={discovery.hasActiveCriteria ? "Resultados da busca" : "Todas as ofertas"}
            isLoading={discovery.isLoading}
            total={discovery.results.length}
            page={discovery.page}
            totalPages={discovery.totalPages}
            sort={discovery.sort}
            onSortChange={discovery.changeSort}
            canReset={discovery.hasActiveCriteria}
            onReset={discovery.reset}
          />

          <div className="mt-6">
            <ProductGrid
              products={discovery.pageProducts}
              onRedeem={modals.openRedeem}
              onSelect={modals.openDetails}
              isLoading={discovery.isLoading}
              skeletonCount={DEFAULT_PAGE_SIZE}
              emptyState={
                <EmptyResults
                  query={discovery.query}
                  filterLabel={discovery.categoryLabel}
                  onReset={discovery.reset}
                  suggestions={SEARCH_SUGGESTIONS}
                  onSuggestionSelect={handleSuggestion}
                />
              }
            />
          </div>

          {!discovery.isLoading && (
            <Pagination
              page={discovery.page}
              totalPages={discovery.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Valores e produtos ilustrativos — serão substituídos por dados reais do backend.
          </p>
        </div>
      </Container>

      <ProductModals modals={modals} />
    </section>
  );
}
