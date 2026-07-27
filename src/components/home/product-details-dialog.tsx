import { BadgeCheck, Coins, ExternalLink, Store as StoreIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBRL, formatCreditsLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import { buttonOutline, buttonSolid } from "./primitives";

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

  function handleViewOffer() {
    toast("Redirecionamento para a loja parceira será ativado na próxima etapa.");
  }

  function handleRedeem() {
    if (!product) return;
    onOpenChange(false);
    onRedeem?.(product);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-x-0 bottom-0 top-auto max-h-[90dvh] w-full max-w-none translate-x-0 translate-y-0 gap-4 overflow-y-auto overscroll-contain rounded-t-[20px] border-border bg-card p-[var(--gutter)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px] sm:p-6">
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
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
              <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              {product.store}
            </span>
            {product.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-saving/40 bg-saving/10 px-2.5 py-1 text-fluid-micro font-semibold text-saving">
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

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-border bg-background px-4 py-3">
          <span className="text-sm text-muted-foreground line-through">
            {formatBRL(product.originalPrice)}
          </span>
          <span className="font-serif text-fluid-h3 text-foreground">
            {formatBRL(product.currentPrice)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
            <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            {formatCreditsLabel(product.creditsRequired)}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Preço, disponibilidade e condições são definidos pela loja parceira e podem mudar sem
          aviso. Valores ilustrativos nesta versão inicial.
        </p>

        <DialogFooter className="gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleRedeem}
            className={cn(buttonOutline, "w-full sm:w-auto")}
          >
            Resgatar Desconto
          </button>
          <button
            type="button"
            onClick={handleViewOffer}
            className={cn(buttonSolid, "w-full sm:w-auto")}
          >
            Ver oferta
            <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
