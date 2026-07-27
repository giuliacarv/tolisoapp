import { Coins, ExternalLink, Store as StoreIcon } from "lucide-react";
import { toast } from "sonner";

import { calculateSavings } from "@/domain/products/product-rules";
import { formatBRL, formatCreditsLabel } from "@/lib/format";
import type { Product } from "@/types";

import { ConfirmDialog } from "./confirm-dialog";

export interface RedeemProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Economia absoluta da oferta em reais.
 * Protegido contra dados inconsistentes (preço atual maior que o anterior).
 */
function calculateSavings(originalPrice: number, currentPrice: number): number {
  const savings = originalPrice - currentPrice;
  return savings > 0 ? savings : 0;
}

/**
 * Confirmação de resgate de produto.
 * Nesta etapa NÃO desconta créditos e NÃO redireciona — apenas antecipa o fluxo.
 */
export function RedeemProductModal({ product, open, onOpenChange }: RedeemProductModalProps) {
  const credits = product?.creditsRequired ?? 1;
  const savings = product ? calculateSavings(product.originalPrice, product.currentPrice) : 0;

  function handleContinue() {
    onOpenChange(false);
    toast("Faça login para resgatar esta oferta. A autenticação será adicionada na próxima etapa.");
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Resgatar esta oferta"
      description={
        <>
          Este resgate utilizará <strong className="font-semibold text-foreground">{formatCreditsLabel(credits)}</strong>.
          A compra, o pagamento, a entrega, a garantia e o atendimento serão realizados pela loja
          parceira.
        </>
      }
      summary={
        product ? (
          <div className="space-y-4">
            {/* Identificação da oferta: imagem em proporção fixa + nome e loja. */}
            <div className="flex gap-4 rounded-xl border border-border bg-background p-3">
              <img
                src={product.image}
                alt={`Foto ilustrativa: ${product.name}`}
                loading="lazy"
                decoding="async"
                width={160}
                height={160}
                className="aspect-square h-20 w-20 shrink-0 rounded-lg object-cover object-center"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-fluid-sm font-semibold leading-snug text-foreground">
                  {product.name}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-fluid-xs text-muted-foreground">
                  <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  <span className="truncate">{product.store}</span>
                </p>
              </div>
            </div>

            {/* Resumo financeiro: lista de definição para leitores de tela. */}
            <dl className="space-y-2 rounded-xl border border-border bg-background px-4 py-3 text-fluid-xs">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Preço anterior</dt>
                <dd className="text-muted-foreground line-through">
                  {formatBRL(product.originalPrice)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Preço atual</dt>
                <dd className="font-serif text-xl leading-none text-foreground">
                  {formatBRL(product.currentPrice)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-2">
                <dt className="text-muted-foreground">Desconto</dt>
                <dd className="font-semibold text-discount">-{product.discountPercentage}%</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-semibold text-foreground">Você economiza</dt>
                <dd className="font-semibold text-saving">{formatBRL(savings)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-2">
                <dt className="text-muted-foreground">Créditos necessários</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  {formatCreditsLabel(product.creditsRequired)}
                </dd>
              </div>
            </dl>

            {/* Aviso de redirecionamento externo. */}
            <p className="flex items-start gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-fluid-xs leading-relaxed text-muted-foreground">
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              <span>Ao continuar, você será redirecionado para um site externo.</span>
            </p>
          </div>
        ) : null
      }
      confirmLabel="Continuar"
      onConfirm={handleContinue}
    />
  );
}
