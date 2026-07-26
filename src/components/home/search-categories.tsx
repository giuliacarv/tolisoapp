import { useEffect, useMemo, useState } from "react";

import { PRODUCTS, type Product } from "@/data/products";

import { CATEGORIES, CategoryGrid } from "./category-grid";
import { EmptyResults } from "./empty-results";
import { Container } from "./primitives";
import { ProductGrid } from "./product-grid";
import { ProductDetailsModal } from "./product-details-dialog";
import { RedeemProductModal } from "./redeem-dialog";
import {
  PAGE_SIZE,
  Pagination,
  SortSelect,
  sortProducts,
  type SortId,
} from "./results-controls";
import { SearchBar } from "./search-bar";

/** Filtros rápidos — os ids espelham as categorias demonstrativas. */
const QUICK_FILTERS = [
  { id: "all", label: "Todas as ofertas" },
  ...CATEGORIES.map((category) => ({ id: category.id, label: category.label })),
];

/** Sugestões demonstrativas exibidas no estado vazio. */
const SEARCH_SUGGESTIONS = ["Fone", "Smartwatch", "Skincare", "Teclado"];

/** Mapeia o id da categoria para o rótulo usado nos dados demonstrativos. */
const CATEGORY_LABEL_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c.label]));


/**
 * Seção de descoberta: busca, filtros rápidos, categorias e resultados.
 * TODO: a filtragem local será substituída por consulta ao backend.
 */
export function SearchAndCategories() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sort, setSort] = useState<SortId>("recommended");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const categoryLabel = CATEGORY_LABEL_BY_ID.get(activeFilter);

    const filtered = PRODUCTS.filter((product) => {
      const matchesFilter = activeFilter === "all" || product.category === categoryLabel;
      const matchesSearch =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        product.store.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });

    return sortProducts(filtered, sort);
  }, [query, activeFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  /**
   * Qualquer mudança de filtro/busca/ordenação reinicia a paginação e simula
   * a latência do futuro backend, exibindo os skeletons.
   * TODO: substituir pelo estado de carregamento real da consulta.
   */
  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(timeout);
  }, [query, activeFilter, sort]);

  function handlePageChange(next: number) {
    setPage(Math.min(Math.max(1, next), totalPages));
    document.getElementById("ofertas-filtradas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleReset() {
    setQuery("");
    setActiveFilter("all");
  }




  function handleCategorySelect(id: string) {
    setActiveFilter((prev) => (prev === id ? "all" : id));
  }

  function handleRedeem(product: Product) {
    setSelected(product);
    setModalOpen(true);
  }

  /** Clique no card: abre os detalhes da oferta (sem custo de créditos). */
  function handleSelect(product: Product) {
    setSelected(product);
    setDetailsOpen(true);
  }

  return (
    <section id="categorias" className="scroll-mt-[calc(var(--header-h)+1rem)] py-4">
      <Container>
        <div id="buscar" className="mx-auto max-w-3xl scroll-mt-[calc(var(--header-h)+1.5rem)]">
          <div className="rounded-[22px] border border-border bg-card p-5 shadow-soft sm:p-8">
            <SearchBar value={query} onValueChange={setQuery} />

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {QUICK_FILTERS.map(({ id, label }) => {
                const isActive = activeFilter === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(id)}
                    className={
                      isActive
                        ? "inline-flex min-h-11 items-center rounded-full bg-ink px-4 py-2 text-fluid-xs font-medium text-offwhite transition-colors duration-200"
                        : "inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 py-2 text-fluid-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-gold/40 hover:text-foreground"
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <CategoryGrid activeCategory={activeFilter} onSelect={handleCategorySelect} />
        </div>

        <div id="ofertas-filtradas" className="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)] sm:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
              {activeFilter === "all" && query.trim() === ""
                ? "Todas as ofertas"
                : "Resultados da busca"}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                {isLoading
                  ? "Carregando ofertas…"
                  : `${filteredProducts.length} ${
                      filteredProducts.length === 1 ? "oferta encontrada" : "ofertas encontradas"
                    }${totalPages > 1 ? ` — página ${safePage} de ${totalPages}` : ""}`}
              </p>
              <SortSelect value={sort} onValueChange={setSort} />
              {(activeFilter !== "all" || query.trim() !== "") && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-gold/40 hover:text-foreground"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <ProductGrid
              products={pageProducts}
              onRedeem={handleRedeem}
              onSelect={handleSelect}
              isLoading={isLoading}
              skeletonCount={PAGE_SIZE}
              emptyState={
                <EmptyResults
                  query={query}
                  filterLabel={
                    activeFilter === "all" ? undefined : CATEGORY_LABEL_BY_ID.get(activeFilter)
                  }
                  onReset={handleReset}
                  suggestions={SEARCH_SUGGESTIONS}
                  onSuggestionSelect={(suggestion) => {
                    setActiveFilter("all");
                    setQuery(suggestion);
                  }}
                />
              }
            />
          </div>

          {!isLoading && (
            <Pagination page={safePage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}





          <p className="mt-6 text-center text-xs text-muted-foreground">
            Valores e produtos ilustrativos — serão substituídos por dados reais do backend.
          </p>
        </div>
      </Container>

      <ProductDetailsModal
        product={selected}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onRedeem={handleRedeem}
      />
      <RedeemProductModal product={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
