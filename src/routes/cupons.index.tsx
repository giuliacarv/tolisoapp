import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";

import { CouponCard, CouponCardSkeleton, CouponDisclaimer } from "@/components/home/coupon-card";
import { RedeemCouponModal } from "@/components/home/coupon-redeem-dialog";
import { CouponFiltersPanel } from "@/components/coupons/coupon-filters-panel";
import { CouponSearch } from "@/components/coupons/coupon-search";
import { EmptyResults } from "@/components/home/empty-results";
import { Container, SectionHeading, chipIdle, linkQuiet } from "@/components/home/primitives";
import { Reveal } from "@/components/home/reveal";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { COUPON_SORT_OPTIONS, type CouponSortId } from "@/domain/coupons/coupon-filters";
import { useCouponCatalog } from "@/hooks/use-coupon-catalog";
import { cn } from "@/lib/utils";
import type { Coupon } from "@/types";

const SITE_URL = "https://economizai1.lovable.app";
const TITLE = "Cupons selecionados | EconomizAI";
const DESCRIPTION =
  "Consulte condições, validade e status de verificação dos cupons demonstrativos das principais lojas online do Brasil.";
const OG_IMAGE = `${SITE_URL}/og-descontai.jpg`;

export const Route = createFileRoute("/cupons/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/cupons` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cupons` }],
  }),
  component: CouponsPage,
});

function CouponsPage() {
  const catalog = useCouponCatalog();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleRedeem(coupon: Coupon) {
    setSelected(coupon);
    setModalOpen(true);
  }

  // Uma única configuração alimenta a barra lateral e o drawer.
  const panelProps = {
    filters: catalog.filters,
    storeOptions: catalog.storeOptions,
    onToggle: catalog.toggle,
    onPatch: catalog.patch,
    onReset: catalog.reset,
    isActive: catalog.isActive,
  };

  const total = catalog.results.length;

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main id="cupons" className="pt-[var(--header-h)]">
        <section className="border-b border-border bg-secondary/40 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Benefícios selecionados"
              as="h1"
              title="Cupons para economizar nas suas lojas favoritas"
              description="Consulte condições, validade e status de verificação antes de realizar o resgate."
            />
            <CouponSearch
              value={catalog.filters.term}
              onSearch={(term) => catalog.patch({ term })}
              className="mt-8 max-w-2xl"
            />
          </Container>
        </section>

        <section className="py-10 sm:py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
              <aside aria-label="Filtros de cupons" className="hidden lg:block">
                <div className="sticky top-[calc(var(--header-h)+1.5rem)]">
                  <CouponFiltersPanel {...panelProps} />
                </div>
              </aside>

              <div className="min-w-0">
                {/* Régua de controle: contagem, drawer mobile e ordenação. */}
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                  <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                    {catalog.isLoading
                      ? "Carregando cupons…"
                      : `${total} ${total === 1 ? "cupom encontrado" : "cupons encontrados"}`}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                      <SheetTrigger asChild>
                        <button type="button" className={cn(chipIdle, "gap-2 lg:hidden")}>
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
                            Filtrar cupons
                          </SheetTitle>
                        </SheetHeader>
                        <CouponFiltersPanel {...panelProps} className="mt-6" />
                        <button
                          type="button"
                          onClick={() => setDrawerOpen(false)}
                          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl cta-surface px-6 text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
                        >
                          Ver {total} {total === 1 ? "resultado" : "resultados"}
                        </button>
                      </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-2">
                      <label htmlFor="ordenar-cupons" className="text-xs text-muted-foreground">
                        Ordenar por
                      </label>
                      <select
                        id="ordenar-cupons"
                        value={catalog.sort}
                        onChange={(event) => catalog.setSort(event.target.value as CouponSortId)}
                        className="min-h-11 rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors duration-200 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                      >
                        {COUPON_SORT_OPTIONS.map((option) => (
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
                      className={linkQuiet}
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
                ) : catalog.isLoading ? (
                  <div className="mt-8 grid-fluid [--col-min:18rem]">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <CouponCardSkeleton key={`coupon-skeleton-${index}`} />
                    ))}
                  </div>
                ) : total === 0 ? (
                  <div className="mt-8">
                    <EmptyResults
                      title="Nenhum cupom encontrado"
                      description="Tente buscar outra loja ou remover os filtros selecionados."
                      onReset={catalog.reset}
                    />
                  </div>
                ) : (
                  <ul className="mt-8 grid-fluid [--col-min:18rem]">
                    {catalog.results.map((coupon, index) => (
                      <Reveal
                        as="li"
                        key={coupon.id}
                        delay={Math.min(index, 5) * 70}
                        className="min-w-0"
                      >
                        <CouponCard coupon={coupon} onRedeem={handleRedeem} />
                      </Reveal>
                    ))}
                  </ul>
                )}

                <div className="mt-10">
                  <CouponDisclaimer />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <ThemeToggle />
      <RedeemCouponModal coupon={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
