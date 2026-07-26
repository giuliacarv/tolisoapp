import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { FEATURED_PRODUCTS, type Product } from "@/data/products";

import { Container, SectionHeading } from "./primitives";
import { ProductGrid } from "./product-grid";
import { RedeemProductModal } from "./redeem-dialog";

/**
 * Ofertas em destaque.
 * TODO: trocar o timeout por fetch real (API/banco). O skeleton já cobre o
 * estado de carregamento para essa futura integração.
 */
export function FeaturedOffers() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  function handleRedeem(product: Product) {
    setSelected(product);
    setModalOpen(true);
  }

  return (
    <section id="ofertas" className="section-y scroll-mt-[calc(var(--header-h)+1rem)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Curadoria"
            title="Ofertas em destaque"
            description="Produtos selecionados com preços atrativos nas principais lojas online."
          />
          <a
            href="#categorias"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Ver todas as ofertas
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          </a>
        </div>

        <div className="mt-10">
          <ProductGrid
            products={FEATURED_PRODUCTS}
            onRedeem={handleRedeem}
            isLoading={isLoading}
            skeletonCount={8}
          />
        </div>

        <p className="mt-8 inline-flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          Produtos e valores meramente ilustrativos nesta versão inicial.
        </p>
      </Container>

      <RedeemProductModal product={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}

export { FeaturedOffers as ProductSection };
