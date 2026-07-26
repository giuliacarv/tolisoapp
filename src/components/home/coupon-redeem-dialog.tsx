import { toast } from "sonner";

import { COUPON_REDEMPTION_COST, type Coupon } from "@/data/coupons";

import { ConfirmDialog } from "./confirm-dialog";

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
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Resgatar cupom"
      description={`Este cupom utilizará ${COUPON_REDEMPTION_COST} créditos. Após a confirmação, o código será liberado e você poderá acessar a loja participante.`}
      summary={
        coupon ? (
          <div className="space-y-1 rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-sm font-semibold text-foreground">{coupon.title}</p>
            <p className="text-xs text-muted-foreground">
              {coupon.store} · {coupon.terms}
            </p>
          </div>
        ) : null
      }
      confirmLabel="Confirmar resgate"
      onConfirm={handleConfirm}
    />
  );
}
