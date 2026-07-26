import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COUPON_REDEMPTION_COST, type Coupon } from "@/data/coupons";
import { cn } from "@/lib/utils";

import { buttonOutline, buttonSolid } from "./primitives";

export interface RedeemCouponModalProps {
  coupon: Coupon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Confirmação de resgate de cupom.
 * Nesta etapa NÃO debita créditos e NÃO revela o código completo.
 */
export function RedeemCouponModal({ coupon, open, onOpenChange }: RedeemCouponModalProps) {
  function handleConfirm() {
    onOpenChange(false);
    toast("Autenticação necessária para concluir o resgate.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-x-0 bottom-0 top-auto max-h-[90dvh] w-full max-w-none translate-x-0 translate-y-0 gap-4 overflow-y-auto overscroll-contain rounded-t-[20px] border-border bg-card p-[var(--gutter)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px] sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-serif text-fluid-h3 tracking-tight text-foreground">
            Resgatar cupom
          </DialogTitle>
          <DialogDescription className="pt-1 text-fluid-sm leading-relaxed text-muted-foreground">
            Este cupom utilizará {COUPON_REDEMPTION_COST} créditos. Após a confirmação, o código
            será liberado e você poderá acessar a loja participante.
          </DialogDescription>
        </DialogHeader>

        {coupon ? (
          <div className="space-y-1 rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-sm font-semibold text-foreground">{coupon.title}</p>
            <p className="text-xs text-muted-foreground">
              {coupon.store} · {coupon.terms}
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
          <button type="button" onClick={handleConfirm} className={cn(buttonSolid, "w-full sm:w-auto")}>
            Confirmar resgate
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { RedeemCouponModal as CouponRedeemDialog };

