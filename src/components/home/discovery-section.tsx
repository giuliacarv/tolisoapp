import { useMemo } from "react";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";

import { PRODUCTS } from "@/data/products";
import { DEFAULT_PAGE_SIZE } from "@/domain/products/pagination";
import { ALL_FILTER_ID, useProductDiscovery } from "@/hooks/use-product-discovery";
import { useProductModals } from "@/hooks/use-product-modals";
import { scrollToId } from "@/lib/smooth-scroll";

import { CATEGORIES, CategoryGrid } from "./category-grid";
import { DiscoveryPanel } from "./discovery/discovery-panel";
import { ResultsHeader } from "./discovery/results-header";
import { EmptyResults } from "./empty-results";
import { Container, SectionHeading, chipIdle } from "./primitives";
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
 * Descoberta + vitrine.
 * Renderiza, nesta ordem: busca e filtros, categorias e "Ofertas em destaque"
 * (cabeçalho antes do conteúdo, sempre com o grid abaixo do título).
 */
export function SearchAndCategories() {
  const resolveCategoryLabel = useMemo(
    () => (filterId: string) => CATEGORY_LABEL_BY_ID.get(filterId),
    [],
  );

  const discovery = useProductDiscovery({ products: PRODUCTS, resolveCategoryLabel });
  const modals = useProductModals();

  function scrollToOffers() {
    scrollToId("#ofertas");
  }

  function handlePageChange(next: number) {
    discovery.goToPage(next);
    scrollToOffers();
  }

  function handleSuggestion(suggestion: string) {
    discovery.changeFilter(ALL_FILTER_ID);
    discovery.changeQuery(suggestion);
  }

  function handleSeeAll() {
    discovery.reset();
    scrollToOffers();
  }

  const activeChips = [
    discovery.query.trim()
      ? { key: "query", label: `Busca: “${discovery.query.trim()}”`, clear: () => discovery.changeQuery("") }
      : null,
    discovery.categoryLabel
      ? {
          key: "category",
          label: discovery.categoryLabel,
          clear: () => discovery.changeFilter(ALL_FILTER_ID),
        }
      : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <>
      {/* Busca e filtros */}
      <section id="buscar" className="scroll-mt-[calc(var(--header-h)+1rem)] py-4">
        <Container>
          <DiscoveryPanel
            query={discovery.query}
            onQueryChange={discovery.changeQuery}
            filters={QUICK_FILTERS}
            activeFilter={discovery.activeFilter}
            onFilterChange={discovery.changeFilter}
          />
        </Container>
      </section>

      {/* Categorias */}
      <section id="categorias" className="scroll-mt-[calc(var(--header-h)+1rem)] pt-16 sm:pt-20">
        <Container>
          <CategoryGrid
            activeCategory={discovery.activeFilter}
            onSelect={discovery.toggleFilter}
          />
        </Container>
      </section>

      {/* Ofertas em destaque */}
      <section id="ofertas" className="section-y scroll-mt-[calc(var(--header-h)+1rem)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <SectionHeading
              eyebrow="Curadoria"
              title="Ofertas em destaque"
              description="Produtos selecionados com preços atrativos nas principais lojas online."
            />
            <button
              type="button"
              onClick={handleSeeAll}
              className="group inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Ver todas as ofertas
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </button>
          </div>

          {/* Régua de controle — não repete o título da seção. */}
          <div className="mt-8">
            <ResultsHeader
              label={discovery.hasActiveCriteria ? "Resultados da busca" : "Todas as ofertas"}
              isLoading={discovery.isLoading}
              total={discovery.results.length}
              page={discovery.page}
              totalPages={discovery.totalPages}
              sort={discovery.sort}
              onSortChange={discovery.changeSort}
              canReset={discovery.hasActiveCriteria}
              onReset={discovery.reset}
            />
          </div>


          {activeChips.length > 0 ? (
            <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Filtros ativos">
              {activeChips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={chip.clear}
                    className={`${chipIdle} gap-1.5`}
                    aria-label={`Remover filtro ${chip.label}`}
                  >
                    {chip.label}
                    <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

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

          <p className="mt-8 inline-flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
              strokeWidth={1.75}
              aria-hidden
            />
            Produtos, preços e descontos demonstrativos nesta versão inicial.
          </p>
        </Container>

        <ProductModals modals={modals} />
      </section>
    </>
  );
}
