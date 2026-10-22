import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useResource } from "@/hooks/use-async-resource";
import { useProductModals } from "@/hooks/use-product-modals";
import { ProductModals } from "@/components/home/product-modals";
import { productQueries } from "@/services";

import { Shell, SolHeading, SolSection } from "./shell";
import { SolProductCard, SolProductSkeleton } from "./sol-product-card";
import { RetailerSearchLinks } from "./retailer-search-links";

export interface SolOffersProps {
  term: string;
  categoryLabel: string | null;
  onClearFilters: () => void;
}

/** Grade de ofertas reagindo em tempo real à busca e à categoria escolhida. */
export function SolOffers({ term, categoryLabel, onClearFilters }: SolOffersProps) {
  const modals = useProductModals();
  const products = useResource(
    productQueries.list({
      term: term || undefined,
      categoryLabel: categoryLabel ?? undefined,
      sort: "discount",
    }),
  );

  const items = products.data ?? [];
  const hasFilters = Boolean(term || categoryLabel);

  return (
    <SolSection id="sol-ofertas" tabIndex={-1}>
      <Shell>
        <SolHeading
          eyebrow="Curadoria"
          title="Exemplos de produtos"
          description="Explore o catálogo de demonstração e pesquise produtos diretamente em lojas conhecidas."
          action={
            <Link to="/ofertas" className="sol-pill-ghost text-sm">
              Ver todas as ofertas
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </Link>
          }
        />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            {products.isLoading ? "Carregando ofertas…" : `${items.length} produtos demonstrativos`}
          </span>
          {hasFilters ? (
            <>
              {term ? <span className="sol-chip sol-chip-active text-xs">“{term}”</span> : null}
              {categoryLabel ? (
                <span className="sol-chip sol-chip-active text-xs">{categoryLabel}</span>
              ) : null}
              <button type="button" onClick={onClearFilters} className="sol-chip text-xs">
                Limpar filtros
              </button>
            </>
          ) : null}
        </div>

        {products.error ? (
          <div className="sol-card mt-8 p-8 text-center">
            <p className="text-sm font-semibold text-foreground">{products.error}</p>
            <button type="button" onClick={products.refetch} className="sol-pill mt-4 text-sm">
              Tentar novamente
            </button>
          </div>
        ) : products.isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SolProductSkeleton key={`sol-skeleton-${index}`} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="sol-card mt-8 p-10 text-center">
            <p className="text-lg font-extrabold text-foreground">Nenhum exemplo com esse filtro</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tente outro termo ou volte para a vitrine completa.
            </p>
            <button type="button" onClick={onClearFilters} className="sol-pill mt-5 text-sm">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <SolProductCard
                key={product.id}
                product={product}
                onDetails={modals.openDetails}
                onRedeem={modals.openRedeem}
              />
            ))}
          </div>
        )}

        <RetailerSearchLinks term={term} />

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Dados demonstrativos: os preços, cupons e descontos são fictícios e servem apenas para ilustrar a
          interface nesta etapa do projeto.
        </p>
      </Shell>

      <ProductModals modals={modals} />
    </SolSection>
  );
}
