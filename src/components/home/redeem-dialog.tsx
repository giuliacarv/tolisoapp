import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCreditsLabel, type Product } from "@/data/products";

export interface RedeemDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal de confirmação de resgate.
 * Nesta etapa NÃO desconta créditos e NÃO redireciona — apenas antecipa o fluxo.
 */
export function RedeemDialog({ product, open, onOpenChange }: RedeemDialogProps) {
  const credits = product?.creditsRequired ?? 1;

  function handleContinue() {
    onOpenChange(false);
    toast("Fluxo de resgate será ativado após a implementação do login.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[20px] border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-tight text-foreground">
            Resgatar esta oferta
          </DialogTitle>
          <DialogDescription className="pt-1 text-[15px] leading-relaxed text-muted-foreground">
            Esta oferta utilizará {formatCreditsLabel(credits)}. Na próxima etapa, conectaremos
            este processo à sua conta e ao redirecionamento seguro para a loja.
          </DialogDescription>
        </DialogHeader>

        {product ? (
          <p className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground">
            {product.name}
          </p>
        ) : null}

        <DialogFooter className="gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Continuar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
