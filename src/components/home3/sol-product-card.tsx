import { Coins, Heart, ShieldCheck } from "lucide-react";
import { getProductUnavailableReason, formatUnavailableLabel } from "@/domain/products/product-rules";
import { hasLiveCatalog } from "@/services/live-catalog-source";

import { formatBRL } from "@/lib/format";
import { formatCreditsLabel } from "@/lib/format";
import type { Product } from "@/types";

export interface SolProductCardProps {
  product: Product;
  onDetails: (product: Product) => void;
  onRedeem: (product: Product) => void;
}

/**
 * Cartão de oferta do tema Solaris: imagem em moldura cinza-clara com raio
 * grande, preço em destaque e pílula de resgate laranja.
 */
export function SolProductCard({ product, onDetails, onRedeem }: SolProductCardProps) {
  const unavailable = getProductUnavailableReason(product);
  const live = hasLiveCatalog();
  return (
    <article className="sol-card sol-card-hover flex h-full flex-col p-3">
      <button
        type="button"
        onClick={() => onDetails(product)}
        className="group relative overflow-hidden rounded-[1.5rem] bg-secondary"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
          -{product.discountPercentage}%
        </span>
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card text-muted-foreground">
          <Heart className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {product.store}
          {product.verified && !unavailable ? (
            <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2.4} aria-hidden />
          ) : null}
        </p>
        {unavailable ? (
          <p className="mt-2 text-xs font-semibold text-muted-foreground">{formatUnavailableLabel(unavailable)}</p>
        ) : null}
        <h3 className="mt-1.5 line-clamp-2 text-base font-extrabold leading-snug tracking-[-0.02em] text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <p className="mt-2 text-xs text-muted-foreground">{live ? "Preço informado na última verificação" : "Preço e desconto ilustrativos"}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <span>
            <span className="block text-xs text-muted-foreground line-through">
              {formatBRL(product.originalPrice)}
            </span>
            <span className="block text-xl font-extrabold tracking-[-0.03em] text-foreground">
              {formatBRL(product.currentPrice)}
            </span>
          </span>
          {!live ? <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-foreground">
            <Coins className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} aria-hidden />
            {formatCreditsLabel(product.creditsRequired)}
          </span> : null}
        </div>

        {live && !unavailable ? (
          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
            className="sol-pill mt-4 w-full text-sm">
            Abrir na loja
          </a>
        ) : (
          <button type="button"
            onClick={() => unavailable ? onDetails(product) : onRedeem(product)}
            className="sol-pill mt-4 w-full text-sm">
            {unavailable ? "Ver detalhes (exemplo)" : "Simular resgate"}
          </button>
        )}
      </div>
    </article>
  );
}

/** Esqueleto com a mesma silhueta do cartão (evita CLS). */
export function SolProductSkeleton() {
  return (
    <div className="sol-card p-3">
      <div className="aspect-[4/3] w-full animate-pulse rounded-[1.5rem] bg-secondary" />
      <div className="space-y-2 px-2 pb-2 pt-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-secondary" />
        <div className="h-4 w-full animate-pulse rounded-full bg-secondary" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-secondary" />
        <div className="h-11 w-full animate-pulse rounded-full bg-secondary" />
      </div>
    </div>
  );
}
