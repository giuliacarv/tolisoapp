import { toast } from "sonner";

import { formatBRL, formatCreditsLabel, type Product } from "@/data/products";

import { ConfirmDialog } from "./confirm-dialog";

export interface RedeemProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Confirmação de resgate de produto.
 * Nesta etapa NÃO desconta créditos e NÃO redireciona — apenas antecipa o fluxo.
 */
export function RedeemProductModal({ product, open, onOpenChange }: RedeemProductModalProps) {
  const credits = product?.creditsRequired ?? 1;

  function handleContinue() {
    onOpenChange(false);
    toast("Fluxo de resgate será ativado após a implementação do login.");
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Resgatar esta oferta"
      description={`Esta oferta utilizará ${formatCreditsLabel(credits)}. Na próxima etapa, conectaremos este processo à sua conta e ao redirecionamento seguro para a loja.`}
      summary={
        product ? (
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-sm font-medium text-foreground">{product.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {product.store} · {formatBRL(product.currentPrice)}
            </p>
          </div>
        ) : null
      }
      confirmLabel="Continuar"
      onConfirm={handleContinue}
    />
  );
}
