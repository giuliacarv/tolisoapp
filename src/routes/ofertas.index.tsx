import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";

import { CatalogFiltersPanel } from "@/components/catalog/catalog-filters-panel";
import { CatalogSearch } from "@/components/catalog/catalog-search";
import { EmptyResults } from "@/components/home/empty-results";
import { Container, SectionHeading, chipIdle } from "@/components/home/primitives";
import { ProductGrid } from "@/components/home/product-grid";
import { ProductModals } from "@/components/home/product-modals";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CATALOG_SORT_OPTIONS, type CatalogSortId } from "@/domain/products/catalog-filters";
import { CATALOG_PAGE_SIZE, useCatalog } from "@/hooks/use-catalog";
import { useProductModals } from "@/hooks/use-product-modals";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";
const TITLE = "Ofertas selecionadas | DESCONTAI";
const DESCRIPTION =
  "Explore produtos selecionados em diferentes lojas, categorias e faixas de preço no catálogo do DESCONTAI.";
const OG_IMAGE = `${SITE_URL}/og-descontai.jpg`;

export const Route = createFileRoute("/ofertas/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/ofertas` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ofertas` }],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const catalog = useCatalog();
  const modals = useProductModals();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Props compartilhadas entre a barra lateral e o drawer: uma única
  // configuração evita que as duas versões divirjam com o tempo.
  const panelProps = {
    filters: catalog.filters,
    categoryOptions: catalog.categoryOptions,
    storeOptions: catalog.storeOptions,
    onToggle: catalog.toggle,
    onPatch: catalog.patch,
    onReset: catalog.reset,
    isActive: catalog.isActive,
  };

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main id="catalogo" className="pt-[var(--header-h)]">
        {/* Cabeçalho editorial da página */}
        <section className="border-b border-border bg-secondary/40 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Ofertas selecionadas"
              as="h1"
              title="Encontre sua próxima oportunidade de economia"
              description="Explore produtos selecionados em diferentes lojas, categorias e faixas de preço."
            />
            <CatalogSearch
              value={catalog.filters.term}
              onSearch={(term) => catalog.patch({ term })}
              className="mt-8 max-w-2xl"
            />
          </Container>
        </section>

        <section className="py-10 sm:py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
              {/* Barra lateral — apenas no desktop. */}
              <aside
                aria-label="Filtros do catálogo"
                className="hidden lg:block"
              >
                <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
                  <CatalogFiltersPanel {...panelProps} />
                </div>
              </aside>

              <div className="min-w-0">
                {/* Régua de controle: contagem, drawer mobile e ordenação. */}
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm text-muted-foreground"
                  >
                    {catalog.isLoading
                      ? "Carregando ofertas…"
                      : `${catalog.results.length} ${
                          catalog.results.length === 1
                            ? "produto encontrado"
                            : "produtos encontrados"
                        }`}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                      <SheetTrigger asChild>
                        <button
                          type="button"
                          className={cn(chipIdle, "gap-2 lg:hidden")}
                        >
                          <SlidersHorizontal className="size-4" strokeWidth={1.75} aria-hidden />
                          Filtrar
                          {catalog.activeChips.length > 0 ? (
                            <span className="grid size-5 place-items-center rounded-full cta-surface text-[11px] font-semibold">
                              {catalog.activeChips.length}
                            </span>
                          ) : null}
                        </button>
                      </SheetTrigger>
                      <SheetContent
                        side="right"
                        className="flex w-[min(22rem,90vw)] flex-col gap-0 overflow-y-auto overscroll-contain border-l border-border bg-background p-[var(--gutter)]"
                      >
                        <SheetHeader className="p-0 text-left">
                          <SheetTitle className="font-serif text-xl tracking-tight">
                            Filtrar ofertas
                          </SheetTitle>
                        </SheetHeader>
                        <CatalogFiltersPanel {...panelProps} className="mt-6" />
                        <button
                          type="button"
                          onClick={() => setDrawerOpen(false)}
                          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl cta-surface px-6 text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
                        >
                          Ver {catalog.results.length}{" "}
                          {catalog.results.length === 1 ? "resultado" : "resultados"}
                        </button>
                      </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-2">
                      <label htmlFor="ordenar-catalogo" className="text-xs text-muted-foreground">
                        Ordenar por
                      </label>
                      <select
                        id="ordenar-catalogo"
                        value={catalog.sort}
                        onChange={(event) =>
                          catalog.setSort(event.target.value as CatalogSortId)
                        }
                        className="min-h-11 rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors duration-200 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                      >
                        {CATALOG_SORT_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filtros ativos */}
                {catalog.activeChips.length > 0 ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <ul className="flex flex-wrap gap-2" aria-label="Filtros ativos">
                      {catalog.activeChips.map((chip) => (
                        <li key={chip.key}>
                          <button
                            type="button"
                            onClick={chip.remove}
                            aria-label={`Remover filtro ${chip.label}`}
                            className={cn(chipIdle, "gap-1.5")}
                          >
                            {chip.label}
                            <span aria-hidden className="text-base leading-none">
                              ×
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={catalog.reset}
                      className="min-h-11 rounded-lg px-2 text-xs font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    >
                      Limpar filtros
                    </button>
                  </div>
                ) : null}

                {/* Resultados */}
                {catalog.error ? (
                  <div
                    role="alert"
                    className="mt-8 rounded-2xl border border-border bg-card p-8 text-center"
                  >
                    <p className="text-sm text-muted-foreground">{catalog.error}</p>
                    <button
                      type="button"
                      onClick={catalog.refetch}
                      className={cn(chipIdle, "mt-4")}
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : (
                  <div className="mt-8">
                    <ProductGrid
                      products={catalog.visibleProducts}
                      onRedeem={modals.openRedeem}
                      onSelect={modals.openDetails}
                      isLoading={catalog.isLoading}
                      skeletonCount={CATALOG_PAGE_SIZE}
                      emptyState={
                        <EmptyResults
                          title="Nenhuma oferta encontrada"
                          description="Tente remover alguns filtros ou buscar outro produto."
                          onReset={catalog.reset}
                        />
                      }
                    />
                  </div>
                )}

                {catalog.hasMore && !catalog.isLoading && !catalog.error ? (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={catalog.loadMore}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-gold/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    >
                      Carregar mais
                    </button>
                  </div>
                ) : null}

                <p className="mt-10 text-xs text-muted-foreground">
                  Produtos, preços e descontos demonstrativos nesta versão inicial.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <ThemeToggle />
      <ProductModals modals={modals} />
    </div>
  );
}
