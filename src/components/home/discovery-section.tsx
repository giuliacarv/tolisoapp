import { useCallback, useMemo } from "react";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";

import { DEFAULT_PAGE_SIZE } from "@/domain/products/pagination";
import { useResource } from "@/hooks/use-async-resource";
import { ALL_FILTER_ID, useProductDiscovery } from "@/hooks/use-product-discovery";
import { useProductModals } from "@/hooks/use-product-modals";
import { scrollToId } from "@/lib/smooth-scroll";
import { categoryQueries, productQueries } from "@/services";

import { AutoCarousel } from "./auto-carousel";
import { CategoryGrid } from "./category-grid";
import { DiscoveryPanel } from "./discovery/discovery-panel";
import { ResultsHeader } from "./discovery/results-header";
import { EmptyResults } from "./empty-results";
import { Container, SectionHeading, chipIdle } from "./primitives";
import { ProductCard } from "./product-card";
import { ProductGrid } from "./product-grid";
import { ProductModals } from "./product-modals";


/** Sugestões demonstrativas exibidas no estado vazio. */
const SEARCH_SUGGESTIONS = ["Fone", "Smartwatch", "Skincare", "Teclado"];

const EMPTY_PRODUCTS: readonly never[] = [];
const EMPTY_CATEGORIES: readonly never[] = [];

/**
 * Descoberta + vitrine.
 * Renderiza, nesta ordem: busca e filtros, categorias e "Ofertas em destaque"
 * (cabeçalho antes do conteúdo, sempre com o grid abaixo do título).
 */
export function SearchAndCategories() {
  // Camada de serviços: hoje resolve mocks, amanhã o Supabase — sem mudar a UI.
  const productsResource = useResource(productQueries.list());
  const categoriesResource = useResource(categoryQueries.list());

  const products = productsResource.data ?? EMPTY_PRODUCTS;
  const categories = categoriesResource.data ?? EMPTY_CATEGORIES;

  const categoryLabelById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories],
  );

  const resolveCategoryLabel = useCallback(
    (filterId: string) => categoryLabelById.get(filterId),
    [categoryLabelById],
  );

  const quickFilters = useMemo(
    () => [
      { id: ALL_FILTER_ID, label: "Todas as ofertas" },
      ...categories.map((category) => ({ id: category.id, label: category.label })),
    ],
    [categories],
  );

  const discovery = useProductDiscovery({
    products,
    isLoading: productsResource.isLoading,
    resolveCategoryLabel,
  });
  const modals = useProductModals();

  function scrollToOffers() {
    scrollToId("#ofertas");
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
      <section
        id="buscar"
        className="relative isolate scroll-mt-[calc(var(--header-h)+1rem)] overflow-hidden py-16 sm:py-20"
      >
        <span
          aria-hidden
          className="glow-orb pointer-events-none absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 opacity-40"
        />
        <span aria-hidden className="rule-fade absolute inset-x-0 top-0 h-px" />
        <span aria-hidden className="rule-fade absolute inset-x-0 bottom-0 h-px" />
        <Container>
          <DiscoveryPanel
            query={discovery.query}
            onQueryChange={discovery.changeQuery}
            filters={quickFilters}
            activeFilter={discovery.activeFilter}
            onFilterChange={discovery.changeFilter}
          />
        </Container>
      </section>


      {/*
        Categorias + Ofertas dividem a MESMA faixa tonal: juntas formam o bloco
        de descoberta e se destacam da busca (fundo base) que vem antes e dos
        cupons (fundo base) que vêm depois.
      */}
      <div className="section-band relative">
        {/* Categorias */}
        <section id="categorias" className="scroll-mt-[calc(var(--header-h)+1rem)] pt-16 sm:pt-20">
          <Container>
            <CategoryGrid
              categories={categories}
              isLoading={categoriesResource.isLoading}
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
              title="As ofertas que passaram no crivo"
              description="Preço comparado, loja reconhecida e desconto conferido. O que não passou, não aparece aqui."
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
              page={1}
              totalPages={1}

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

          {productsResource.error ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-border bg-card p-8 text-center"
            >
              <p className="text-sm text-muted-foreground">{productsResource.error}</p>
              <button
                type="button"
                onClick={productsResource.refetch}
                className={`${chipIdle} mt-4`}
              >
                Tentar novamente
              </button>
            </div>
          ) : (
          <div className="mt-6">
            {discovery.isLoading || discovery.results.length === 0 ? (
              <ProductGrid
                products={[]}
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
            ) : (
              <AutoCarousel
                items={discovery.results}
                getKey={(product) => product.id}
                ariaLabel="Carrossel de ofertas em destaque"
                intervalMs={3600}
                renderItem={(product) => (
                  <div className="w-full">
                    <ProductCard
                      product={product}
                      onRedeem={modals.openRedeem}
                      onSelect={modals.openDetails}
                    />
                  </div>
                )}
              />
            )}
          </div>
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
      </div>
    </>

  );
}
