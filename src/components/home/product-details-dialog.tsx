import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Coins, ExternalLink, Store as StoreIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBRL, formatCreditsLabel } from "@/lib/format";
import { getProductUnavailableReason } from "@/domain/products/product-rules";
import { getRetailerSearchLinks } from "@/lib/retailer-search";
import { hasLiveCatalog } from "@/services/live-catalog-source";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import {
  buttonOutline,
  buttonSolid,
  chipMeta,
  linkGold,
  panelInset,
  sheetDialogContentWide,
} from "./primitives";

export interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Encaminha para o fluxo de resgate (modal de créditos). */
  onRedeem?: (product: Product) => void;
}

/**
 * Modal de detalhes da oferta, aberto ao clicar no card.
 * Somente leitura nesta etapa: o botão "Ver oferta" é fictício e não
 * redireciona para o link de afiliado.
 * Acessibilidade (Escape, foco preso, bloqueio de rolagem de fundo) vem do
 * Radix Dialog; no mobile o conteúdo vira bottom-sheet com scroll interno.
 */
export function ProductDetailsModal({
  product,
  open,
  onOpenChange,
  onRedeem,
}: ProductDetailsModalProps) {
  if (!product) return null;

  const unavailable = getProductUnavailableReason(product);
  const live = hasLiveCatalog();
  const searchLinks = getRetailerSearchLinks(product.name);

  function handleRedeem() {
    if (!product) return;
    onOpenChange(false);
    onRedeem?.(product);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sheetDialogContentWide}>
        {/* Imagem com aspect-ratio fixo: sem salto de layout ao abrir. */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-secondary">
          <img
            src={product.image}
            alt={`Foto ilustrativa: ${product.name}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={450}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3 rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-offwhite">
            -{product.discountPercentage}%
          </span>
        </div>

        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <span className={chipMeta}>
              <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              {product.store}
            </span>
            {product.verified && !unavailable && live ? (
              <span
                className={cn(chipMeta, "border-saving/40 bg-saving/10 text-saving")}
              >
                <BadgeCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                Oferta verificada
              </span>
            ) : null}
            <span className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {product.category}
            </span>
          </div>

          <DialogTitle className="pt-2 text-left font-serif text-fluid-h3 leading-snug tracking-tight text-foreground">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-left text-fluid-sm leading-relaxed text-muted-foreground">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className={cn(panelInset, "flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
          <span className="text-sm text-muted-foreground line-through">
            {formatBRL(product.originalPrice)}
          </span>
          <span className="font-serif text-fluid-h3 text-foreground">
            {formatBRL(product.currentPrice)}
          </span>
          <span className={cn(chipMeta, "ml-auto")}>
            <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            {formatCreditsLabel(product.creditsRequired)}
          </span>
        </div>

        {/* Acesso à página dedicada: mantém o modal como resumo. */}
        <Link
          to="/ofertas/$slug"
          params={{ slug: product.slug }}
          onClick={() => onOpenChange(false)}
          className={cn(linkGold, "self-start")}
        >
          Ver página da oferta
          <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        </Link>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {live ? "Valor informado na verificação da oferta. Confira preço, frete e estoque na loja." : "Todos os preços e descontos deste exemplo são fictícios. Use a pesquisa nas lojas para consultar produtos reais."}
        </p>

        <DialogFooter className="gap-2 sm:gap-3">
          {live && !unavailable ? (
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
              className={cn(buttonSolid, "w-full sm:w-auto")}>
              Abrir oferta na loja
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          ) : null}
          {!live && !unavailable && onRedeem ? (
            <button
              type="button"
              onClick={handleRedeem}
              className={cn(buttonOutline, "w-full sm:w-auto")}
            >
              Simular resgate
            </button>
          ) : null}
          {searchLinks.map(({ name, url }, index) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(index === 0 ? buttonSolid : buttonOutline, "w-full sm:w-auto")}
            >
              Pesquisar {name === "Mercado Livre" ? "no" : "na"} {name}
              <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
            </a>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
