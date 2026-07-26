import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBRL, formatCreditsLabel, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

import { buttonOutline, buttonSolid } from "./primitives";

export interface RedeemProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal de confirmação de resgate de produto.
 * Nesta etapa NÃO desconta créditos e NÃO redireciona — apenas antecipa o fluxo.
 * Acessibilidade (Escape, foco preso, bloqueio de rolagem) vem do Radix Dialog.
 */
export function RedeemProductModal({ product, open, onOpenChange }: RedeemProductModalProps) {
  const credits = product?.creditsRequired ?? 1;

  function handleContinue() {
    onOpenChange(false);
    toast("Fluxo de resgate será ativado após a implementação do login.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto rounded-[20px] border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-tight text-foreground">
            Resgatar esta oferta
          </DialogTitle>
          <DialogDescription className="pt-1 text-[15px] leading-relaxed text-muted-foreground">
            Esta oferta utilizará {formatCreditsLabel(credits)}. Na próxima etapa, conectaremos este
            processo à sua conta e ao redirecionamento seguro para a loja.
          </DialogDescription>
        </DialogHeader>

        {product ? (
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-sm font-medium text-foreground">{product.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {product.store} · {formatBRL(product.currentPrice)}
            </p>
          </div>
        ) : null}

        <DialogFooter className="gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonOutline, "w-full sm:w-auto")}
          >
            Cancelar
          </button>
          <button type="button" onClick={handleContinue} className={cn(buttonSolid, "w-full sm:w-auto")}>
            Continuar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { RedeemProductModal as RedeemDialog };
