import { BadgeCheck, Coins, Store as StoreIcon } from "lucide-react";

import { formatBRL, formatCreditsLabel, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

import { buttonOutline, cardBase } from "./primitives";

export interface ProductCardProps {
  product: Product;
  onRedeem: (product: Product) => void;
  /** Abre o modal de detalhes da oferta (clique no card). */
  onSelect?: (product: Product) => void;
  className?: string;
}

/** Card de produto com altura visual consistente (flex + mt-auto no rodapé). */
export function ProductCard({ product, onRedeem, onSelect, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        cardBase,
        "motion-safe-transform group relative flex h-full flex-col overflow-hidden hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={`Foto ilustrativa: ${product.name}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-offwhite">
          -{product.discountPercentage}%
        </span>
        {product.verified ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-fluid-micro font-semibold text-foreground backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-saving" strokeWidth={2} aria-hidden />
            Oferta verificada
          </span>
        ) : null}
        <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-fluid-micro font-semibold text-foreground backdrop-blur">
          <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          <span className="truncate">{product.store}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-fluid-sm font-semibold leading-snug text-foreground">
          {/* Stretched link: o botão cobre o card inteiro sem aninhar
              interativos, mantendo um único alvo semântico para leitores de tela. */}
          <button
            type="button"
            onClick={() => onSelect?.(product)}
            aria-label={`Ver detalhes de ${product.name}`}
            className="text-left after:absolute after:inset-0 after:rounded-[18px] after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold"
          >
            {product.name}
          </button>
        </h3>
        <p className="line-clamp-2 text-fluid-xs leading-relaxed text-muted-foreground">
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

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
            <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            {formatCreditsLabel(product.creditsRequired)}
          </span>

          <button
            type="button"
            onClick={() => onRedeem(product)}
            aria-label={`Resgatar desconto de ${product.name}`}
            className={cn(buttonOutline, "relative z-10 w-full bg-background hover:border-ink hover:bg-ink hover:text-offwhite")}
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
