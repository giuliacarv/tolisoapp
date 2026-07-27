import { useCallback, useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Coins,
  ExternalLink,
  RefreshCcw,
  Store as StoreIcon,
} from "lucide-react";

import { Container } from "@/components/home/primitives";
import { buttonSolid } from "@/components/home/primitives";
import { ProductGrid } from "@/components/home/product-grid";
import { ProductModals } from "@/components/home/product-modals";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import {
  ProductDetailSkeleton,
  ProductNotFound,
} from "@/components/product/product-detail-states";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductShare } from "@/components/product/product-share";
import {
  calculateSavings,
  formatUnavailableLabel,
  getProductUnavailableReason,
} from "@/domain/products/product-rules";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useProductModals } from "@/hooks/use-product-modals";
import { formatBRL, formatCreditsLabel, formatDateBR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { productService } from "@/services";
import type { Product } from "@/types";

const SITE_URL = "https://descontai1.lovable.app";

/** Mensagem exigida após a confirmação enquanto não há contas nem créditos. */
const REDEEM_CONFIRMATION_MESSAGE =
  "O resgate real será ativado após a integração segura com o sistema de contas e créditos.";

const EXTERNAL_NOTICE =
  "A compra, o pagamento, a entrega, a garantia e o atendimento são realizados pela loja parceira.";

export const Route = createFileRoute("/ofertas/$slug")({
  head: ({ params }) => {
    const title = "Detalhes da oferta | DESCONTAI";
    const description =
      "Veja preço, desconto, condições e créditos necessários desta oferta demonstrativa no DESCONTAI.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/ofertas/${params.slug}` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/ofertas/${params.slug}` }],
    };
  },
  component: ProductDetailPage,
  errorComponent: () => (
    <PageShell>
      <ProductNotFound />
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <ProductNotFound />
    </PageShell>
  ),
});

/** Moldura comum (header/footer) usada também pelos estados de erro. */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-[var(--header-h)]">
        <Container className="py-12 sm:py-16">{children}</Container>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const modals = useProductModals();

  const fetchProduct = useCallback(() => productService.findBySlug(slug), [slug]);
  const product = useAsyncResource<Product | null>(fetchProduct, [slug]);

  const currentId = product.data?.id ?? null;
  const fetchRelated = useCallback(
    () => (currentId ? productService.listRelated(currentId, 4) : Promise.resolve([])),
    [currentId],
  );
  const related = useAsyncResource<Product[]>(fetchRelated, [currentId]);

  if (product.isLoading) {
    return (
      <PageShell>
        <ProductDetailSkeleton />
      </PageShell>
    );
  }

  if (product.error) {
    return (
      <PageShell>
        <div role="alert" className="mx-auto max-w-md text-center">
          <p className="text-fluid-sm text-muted-foreground">{product.error}</p>
          <button type="button" onClick={product.refetch} className={cn(buttonSolid, "mt-6")}>
            Tentar novamente
          </button>
        </div>
      </PageShell>
    );
  }

  if (!product.data) {
    return (
      <PageShell>
        <ProductNotFound />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <ProductDetailContent
        product={product.data}
        related={related.data ?? []}
        relatedLoading={related.isLoading}
        modals={modals}
      />
    </PageShell>
  );
}

interface ProductDetailContentProps {
  product: Product;
  related: Product[];
  relatedLoading: boolean;
  modals: ReturnType<typeof useProductModals>;
}

function ProductDetailContent({
  product,
  related,
  relatedLoading,
  modals,
}: ProductDetailContentProps) {
  const savings = useMemo(
    () => calculateSavings(product.originalPrice, product.currentPrice),
    [product.originalPrice, product.currentPrice],
  );
  const unavailableReason = getProductUnavailableReason(product);
  const highlights = product.highlights ?? [];

  return (
    <>
      {/* Navegação de retorno — nunca deixa o usuário sem saída. */}
      <Link
        to="/ofertas"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-fluid-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        Voltar para as ofertas
      </Link>

      <article className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery
          image={product.image}
          gallery={product.gallery}
          name={product.name}
          discountPercentage={product.discountPercentage}
        />

        <div className="min-w-0">
          {/* Categoria, loja e verificação */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {product.category}
            </span>
            <span aria-hidden className="text-muted-foreground/40">
              •
            </span>
            <span className="inline-flex items-center gap-1.5 text-fluid-xs font-medium text-foreground">
              <StoreIcon className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              {product.store}
            </span>
            {product.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-saving/40 bg-saving/10 px-2.5 py-1 text-fluid-micro font-semibold text-saving">
                <BadgeCheck className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                Oferta verificada
              </span>
            ) : (
              <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-muted-foreground">
                Verificação pendente
              </span>
            )}
          </div>

          <h1 className="mt-3 font-serif text-fluid-h2 leading-[1.1] tracking-[-0.02em] text-balance text-foreground">
            {product.name}
          </h1>

          {/* Bloco de preço */}
          <dl className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <dt className="sr-only">Preço atual</dt>
              <dd className="font-serif text-fluid-h2 leading-none text-foreground">
                {formatBRL(product.currentPrice)}
              </dd>
              <dt className="sr-only">Preço anterior</dt>
              <dd className="text-fluid-sm text-muted-foreground line-through">
                {formatBRL(product.originalPrice)}
              </dd>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-offwhite">
                -{product.discountPercentage}%
              </span>
              <span className="rounded-lg border border-saving/40 bg-saving/10 px-2.5 py-1 text-xs font-semibold text-saving">
                Economia de {formatBRL(savings)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground">
                <Coins className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                {formatCreditsLabel(product.creditsRequired)}
              </span>
            </div>
          </dl>

          {/* Ação principal */}
          <div className="mt-6 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => modals.openRedeem(product)}
              disabled={unavailableReason !== null}
              className={cn(buttonSolid, "w-full sm:w-auto sm:min-w-64")}
            >
              {unavailableReason
                ? formatUnavailableLabel(unavailableReason)
                : "Resgatar Desconto"}
            </button>

            <ProductShare title={product.name} text={`${product.name} — ${product.store}`} />
          </div>

          <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-fluid-xs leading-relaxed text-muted-foreground">
            <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>{EXTERNAL_NOTICE}</span>
          </p>

          {/* Descrição e características */}
          <section className="mt-8" aria-labelledby="sobre-a-oferta">
            <h2
              id="sobre-a-oferta"
              className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground"
            >
              Sobre a oferta
            </h2>
            <p className="mt-3 text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
              {product.description}
            </p>

            {highlights.length > 0 ? (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-fluid-xs leading-relaxed text-foreground"
                  >
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {/* Condições e datas */}
          <section className="mt-8" aria-labelledby="condicoes-da-oferta">
            <h2
              id="condicoes-da-oferta"
              className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground"
            >
              Condições
            </h2>
            <p className="mt-3 text-fluid-xs leading-[1.7] text-muted-foreground">
              {product.terms}
            </p>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <dt className="inline-flex items-center gap-1.5 text-fluid-micro uppercase tracking-[0.18em] text-muted-foreground">
                  <RefreshCcw className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  Última atualização
                </dt>
                <dd className="mt-1.5 text-fluid-sm font-semibold text-foreground">
                  {formatDateBR(product.updatedAt ?? product.publishedAt)}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <dt className="inline-flex items-center gap-1.5 text-fluid-micro uppercase tracking-[0.18em] text-muted-foreground">
                  <CalendarClock className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  Validade da oferta
                </dt>
                <dd className="mt-1.5 text-fluid-sm font-semibold text-foreground">
                  {formatDateBR(product.expiresAt)}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-fluid-micro text-muted-foreground">
              Produto, preço e desconto demonstrativos nesta versão inicial.
            </p>
          </section>
        </div>
      </article>

      {/* Produtos relacionados */}
      {relatedLoading || related.length > 0 ? (
        <section className="mt-16 border-t border-border pt-12" aria-labelledby="relacionados">
          <h2
            id="relacionados"
            className="font-serif text-fluid-h3 tracking-tight text-foreground"
          >
            Ofertas relacionadas
          </h2>
          <p className="mt-2 text-fluid-sm text-muted-foreground">
            Outras oportunidades em {product.category}.
          </p>
          <div className="mt-8">
            <ProductGrid
              products={related}
              onRedeem={modals.openRedeem}
              onSelect={modals.openDetails}
              isLoading={relatedLoading}
              skeletonCount={4}
              // Grade fixa: com 1 ou 2 relacionados o auto-fit esticaria os cards.
              className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4"
            />
          </div>
        </section>
      ) : null}

      <ProductModals modals={modals} confirmationMessage={REDEEM_CONFIRMATION_MESSAGE} />
    </>
  );
}
