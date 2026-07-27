import { useCallback } from "react";
import { History, Trash2 } from "lucide-react";

import { ProductGrid } from "@/components/home/product-grid";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { cn } from "@/lib/utils";
import { productService } from "@/services";
import type { Product } from "@/types";

export interface RecentlyViewedSectionProps {
  /** Abre o modal de resgate a partir do card. */
  onRedeem: (product: Product) => void;
  onSelect?: (product: Product) => void;
  className?: string;
}

/**
 * Histórico local de navegação (máx. 12 produtos).
 * Guarda apenas identificadores públicos — nenhum dado pessoal é registrado.
 */
export function RecentlyViewedSection({
  onRedeem,
  onSelect,
  className,
}: RecentlyViewedSectionProps) {
  const { recentIds, clearRecentlyViewed, limit } = useRecentlyViewed();
  const key = recentIds.join(",");

  const fetchRecent = useCallback(
    () => (recentIds.length > 0 ? productService.listByIds(recentIds) : Promise.resolve([])),
    // `key` mantém a identidade estável entre renders sem mudança real.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const recent = useAsyncResource<Product[]>(fetchRecent, [key]);
  const products = recent.data ?? [];

  if (recentIds.length === 0) return null;

  return (
    <section aria-labelledby="vistos-recentemente" className={cn("scroll-mt-28", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-12">
        <div>
          <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <History className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            Histórico local
          </span>
          <h2
            id="vistos-recentemente"
            className="mt-2 font-serif text-fluid-h3 tracking-tight text-foreground"
          >
            Vistos recentemente
          </h2>
          <p className="mt-2 max-w-prose text-fluid-sm text-muted-foreground">
            Últimos {limit} produtos abertos neste dispositivo. Nenhuma informação pessoal é
            registrada.
          </p>
        </div>

        <button
          type="button"
          onClick={clearRecentlyViewed}
          className="touch-target inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Trash2 className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Limpar histórico
        </button>
      </div>

      <div className="mt-8">
        <ProductGrid
          products={products}
          isLoading={recent.isLoading}
          skeletonCount={Math.min(recentIds.length, 4)}
          onRedeem={onRedeem}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
}
