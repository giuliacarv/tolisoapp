import { useCallback } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, Info, Trash2 } from "lucide-react";

import { Container, buttonSolid } from "@/components/home/primitives";
import { ProductGrid } from "@/components/home/product-grid";
import { ProductModals } from "@/components/home/product-modals";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { RecentlyViewedSection } from "@/components/product/recently-viewed-section";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useFavorites } from "@/hooks/use-favorites";
import { useProductModals } from "@/hooks/use-product-modals";
import { cn } from "@/lib/utils";
import { productService } from "@/services";
import type { Product } from "@/types";

const SITE_URL = "https://descontai1.lovable.app";

/** Aviso obrigatório: os favoritos ainda não pertencem a uma conta. */
const LOCAL_ONLY_NOTICE = "Seus favoritos estão salvos apenas neste dispositivo.";

const REDEEM_CONFIRMATION_MESSAGE =
  "O resgate real será ativado após a integração segura com o sistema de contas e créditos.";

export const Route = createFileRoute("/favoritos")({
  head: () => {
    const title = "Favoritos | DESCONTAI";
    const description =
      "Veja as ofertas que você salvou neste dispositivo e os produtos vistos recentemente no DESCONTAI.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/favoritos` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favoriteIds, count, clearFavorites } = useFavorites();
  const modals = useProductModals();

  // A chave em string mantém a dependência estável entre renders.
  const key = favoriteIds.join(",");
  const fetchFavorites = useCallback(
    () => (favoriteIds.length > 0 ? productService.listByIds(favoriteIds) : Promise.resolve([])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const favorites = useAsyncResource<Product[]>(fetchFavorites, [key]);
  const products = favorites.data ?? [];

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <Container className="py-12 sm:py-16">
          <header className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Heart className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              Preferência local
            </span>
            <h1 className="mt-3 font-serif text-fluid-h1 leading-[1.05] tracking-tight text-foreground">
              Favoritos
            </h1>
            <p className="mt-4 text-fluid-base leading-relaxed text-muted-foreground">
              Ofertas salvas para consultar depois. Quando as contas forem ativadas, esta lista
              poderá ser sincronizada com o seu perfil.
            </p>
          </header>

          <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-fluid-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>{LOCAL_ONLY_NOTICE}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p role="status" className="text-fluid-sm text-muted-foreground">
              {count === 0
                ? "Nenhum produto salvo"
                : `${count} ${count === 1 ? "produto salvo" : "produtos salvos"}`}
            </p>

            {count > 0 ? (
              <button
                type="button"
                onClick={clearFavorites}
                className="touch-target inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Trash2 className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                Limpar favoritos
              </button>
            ) : null}
          </div>

          <div className="mt-8">
            {favorites.error ? (
              <div role="alert" className="rounded-[18px] border border-border bg-card p-10 text-center">
                <p className="font-medium text-foreground">Não foi possível carregar seus favoritos</p>
                <p className="mt-1 text-sm text-muted-foreground">{favorites.error}</p>
                <button type="button" onClick={favorites.refetch} className={cn(buttonSolid, "mt-6")}>
                  Tentar novamente
                </button>
              </div>
            ) : (
              <ProductGrid
                products={products}
                isLoading={favoriteIds.length > 0 && favorites.isLoading}
                skeletonCount={Math.min(favoriteIds.length, 4)}
                onRedeem={modals.openRedeem}
                onSelect={modals.openDetails}
                emptyState={<FavoritesEmptyState />}
              />
            )}
          </div>

          <RecentlyViewedSection
            className="mt-16"
            onRedeem={modals.openRedeem}
            onSelect={modals.openDetails}
          />
        </Container>
      </main>

      <Footer />
      <ThemeToggle />
      <ProductModals modals={modals} confirmationMessage={REDEEM_CONFIRMATION_MESSAGE} />
    </div>
  );
}

/** Estado vazio com o texto e o CTA definidos para a página. */
function FavoritesEmptyState() {
  return (
    <div
      role="status"
      className="rounded-[18px] border border-border bg-card p-10 text-center sm:p-14"
    >
      <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/30 bg-secondary">
        <Heart className="size-6 text-gold" strokeWidth={1.5} aria-hidden />
      </span>

      <h2 className="mt-6 font-serif text-fluid-h3 tracking-tight text-foreground">
        Você ainda não adicionou favoritos
      </h2>
      <p className="mx-auto mt-3 max-w-md text-fluid-sm leading-relaxed text-muted-foreground">
        Salve produtos para encontrá-los mais facilmente depois.
      </p>

      <Link to="/ofertas" className={cn(buttonSolid, "mt-8")}>
        Explorar ofertas
        <ArrowRight className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
      </Link>
    </div>
  );
}
