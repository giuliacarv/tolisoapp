import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { FEATURED_PRODUCTS, type Product } from "@/data/products";

import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Container, SectionHeading } from "./primitives";
import { RedeemDialog } from "./redeem-dialog";

/**
 * Ofertas em destaque.
 * TODO: trocar o timeout por fetch real (API/banco). O skeleton já cobre o
 * estado de carregamento para essa futura integração.
 */
export function FeaturedOffers() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  function handleRedeem(product: Product) {
    setSelected(product);
    setDialogOpen(true);
  }

  return (
    <section id="ofertas" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Curadoria"
            title="Ofertas em destaque"
            description="Produtos selecionados com preços atrativos nas principais lojas online."
          />
          <a
            href="#ofertas"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Ver todas as ofertas
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} onRedeem={handleRedeem} />
              ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
          Produtos e valores meramente ilustrativos nesta versão inicial.
        </p>
      </Container>

      <RedeemDialog product={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
