import { BadgeCheck, Coins, Store as StoreIcon } from "lucide-react";

import { formatBRL, formatCreditsLabel, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  onRedeem: (product: Product) => void;
  className?: string;
}

/** Card de produto com altura visual consistente (flex + mt-auto no rodapé). */
export function ProductCard({ product, onRedeem, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-white">
          -{product.discountPercentage}%
        </span>
        {product.verified ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-saving" strokeWidth={2} />
            Oferta verificada
          </span>
        ) : null}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
          <StoreIcon className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
          {product.store}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto space-y-3 pt-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {formatBRL(product.originalPrice)}
            </span>
            <span className="font-serif text-2xl text-foreground">
              {formatBRL(product.currentPrice)}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold text-foreground">
            <Coins className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
            {formatCreditsLabel(product.creditsRequired)}
          </span>

          <button
            type="button"
            onClick={() => onRedeem(product)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-transparent hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Resgatar Desconto
          </button>
        </div>
      </div>
    </article>
  );
}

/** Skeleton com as mesmas proporções do card real (evita CLS). */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft">
      <div className="aspect-[4/3] w-full animate-pulse bg-secondary" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="mt-auto space-y-3 pt-4">
          <div className="h-7 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-secondary" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-secondary" />
        </div>
      </div>
    </div>
  );
}
