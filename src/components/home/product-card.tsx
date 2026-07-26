import { BadgeCheck, Coins, Store as StoreIcon } from "lucide-react";

import {
  formatBRL,
  formatCreditsLabel,
  formatUnavailableLabel,
  getProductUnavailableReason,
  type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";

import { cardBase } from "./primitives";

export interface ProductCardProps {
  product: Product;
  onRedeem: (product: Product) => void;
  /** Abre o modal de detalhes da oferta (clique no card). */
  onSelect?: (product: Product) => void;
  className?: string;
}

/**
 * Card de produto com altura visual consistente.
 * Estrutura: mídia com proporção fixa 4/3 → conteúdo flexível → rodapé
 * ancorado (`mt-auto`), garantindo botões alinhados entre cards vizinhos.
 */
export function ProductCard({ product, onRedeem, onSelect, className }: ProductCardProps) {
  // Ofertas expiradas ou esgotadas não podem consumir créditos do usuário.
  const unavailableReason = getProductUnavailableReason(product);
  const isDisabled = unavailableReason !== null;

  return (
    <article
      aria-disabled={isDisabled || undefined}
      className={cn(
        cardBase,
        "motion-safe-transform group relative flex h-full flex-col overflow-hidden",
        isDisabled
          ? "opacity-60 saturate-50"
          : "interactive-lift gilded-frame hover:border-gold/40",
        className,
      )}
    >
      {/* Mídia: proporção única para todos os cards, sem distorção (object-cover). */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={`Foto ilustrativa: ${product.name}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className={cn(
            "h-full w-full object-cover object-center transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            isDisabled ? "grayscale" : "group-hover:scale-[1.04]",
          )}
        />

        {/* Faixa superior: badges em linha para nunca se sobreporem. */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-offwhite">
            -{product.discountPercentage}%
          </span>

          {isDisabled ? (
            <span className="rounded-lg border border-border bg-card/90 px-2.5 py-1 text-fluid-micro font-semibold text-muted-foreground backdrop-blur">
              {formatUnavailableLabel(unavailableReason)}
            </span>
          ) : product.verified ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-fluid-micro font-semibold text-foreground backdrop-blur">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-saving" strokeWidth={2} aria-hidden />
              <span className="truncate">Oferta verificada</span>
            </span>
          ) : null}
        </div>

        {/* Loja: faixa inferior isolada, sem colidir com a faixa superior. */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-fluid-micro font-semibold text-foreground backdrop-blur">
            <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span className="truncate">{product.store}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </span>

        {/* Alturas mínimas fixas mantêm o alinhamento entre cards com textos curtos. */}
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

        <p className="line-clamp-2 min-h-[2.5rem] text-fluid-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto space-y-3 pt-3">
          {/* Preços: anterior riscado + atual em destaque, na mesma linha de base. */}
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm text-muted-foreground line-through">
              <span className="sr-only">Preço anterior: </span>
              {formatBRL(product.originalPrice)}
            </span>
            <span className="font-serif text-2xl leading-none text-foreground">
              <span className="sr-only">Preço atual: </span>
              {formatBRL(product.currentPrice)}
            </span>
          </p>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
            <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            {formatCreditsLabel(product.creditsRequired)}
          </span>

          <button
            type="button"
            onClick={() => onRedeem(product)}
            disabled={isDisabled}
            aria-label={
              isDisabled
                ? `${formatUnavailableLabel(unavailableReason)}: ${product.name}`
                : `Resgatar desconto de ${product.name}`
            }
            className={cn(
              "touch-target relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isDisabled
                ? "cursor-not-allowed border border-border bg-secondary text-muted-foreground opacity-70"
                : "bg-[image:var(--gradient-ink)] text-offwhite shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
            )}

          >
            {isDisabled ? formatUnavailableLabel(unavailableReason) : "Resgatar Desconto"}
          </button>
        </div>
      </div>
    </article>
  );
}

/** Skeleton com as mesmas proporções do card real (evita CLS). */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft"
    >
      <div className="aspect-[4/3] w-full shrink-0 animate-pulse bg-secondary" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
        <div className="min-h-[2.75rem] space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-secondary" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-secondary" />
        </div>
        <div className="min-h-[2.5rem] space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-secondary" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
        </div>
        <div className="mt-auto space-y-3 pt-3">
          <div className="h-7 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-secondary" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-secondary" />
        </div>
      </div>
    </div>
  );
}
