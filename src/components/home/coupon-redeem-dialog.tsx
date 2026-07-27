import { BadgeCheck, CalendarDays, Clock, Coins, Store as StoreIcon, Tag } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import {
  COUPON_REDEMPTION_COST,
  formatDiscountLabel,
  getCouponStatus,
} from "@/domain/coupons/coupon-rules";
import { DEMO_CREDIT_BALANCE, getRemainingBalance } from "@/domain/credits/credit-rules";
import { formatBRL, formatCreditsLabel, formatDateBR } from "@/lib/format";
import type { Coupon, CouponStatus } from "@/types";

import { ConfirmDialog } from "./confirm-dialog";

export interface RedeemCouponModalProps {
  coupon: Coupon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Rótulos legíveis dos estados exibidos no card e no modal. */
const STATUS_LABEL: Record<CouponStatus, string> = {
  validated: "Validado",
  pending: "Validação pendente",
  expired: "Expirado",
};

const STATUS_CLASS: Record<CouponStatus, string> = {
  validated: "text-saving",
  pending: "text-gold",
  expired: "text-muted-foreground",
};

/** Linha de resumo (rótulo + valor) dentro da lista de definição. */
function DetailRow({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: ReactNode;
  icon?: typeof Tag;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden /> : null}
        {label}
      </dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  );
}

/**
 * Confirmação de resgate de cupom.
 * Nesta etapa NÃO debita créditos, NÃO revela o código completo e NÃO
 * redireciona para a loja parceira — apenas antecipa o fluxo final.
 */
export function RedeemCouponModal({ coupon, open, onOpenChange }: RedeemCouponModalProps) {
  const status = coupon ? getCouponStatus(coupon) : "pending";
  const remaining = getRemainingBalance(DEMO_CREDIT_BALANCE, COUPON_REDEMPTION_COST);

  function handleContinue() {
    // Fecha primeiro para que o Radix devolva o foco ao botão de origem.
    onOpenChange(false);
    toast("Faça login para concluir o resgate. A autenticação será adicionada na próxima etapa.");
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Resgatar cupom"
      description={`Este resgate utilizará ${COUPON_REDEMPTION_COST} créditos. O código completo será liberado depois que o sistema de autenticação e créditos for conectado.`}
      summary={
        coupon ? (
          <div className="space-y-4">
            {/* Identificação: loja e benefício em destaque. */}
            <div className="rounded-xl border border-border bg-background px-4 py-3">
              <p className="inline-flex items-center gap-1.5 text-fluid-xs text-muted-foreground">
                <StoreIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                <span className="truncate">{coupon.store}</span>
              </p>
              <p className="mt-1.5 text-fluid-sm font-semibold leading-snug text-foreground">
                {coupon.title}
              </p>
              <p className="mt-1.5 text-fluid-xs leading-relaxed text-muted-foreground">
                {coupon.description}
              </p>
            </div>

            {/* Condições do cupom em lista de definição (acessível a leitores de tela). */}
            <dl className="space-y-2 rounded-xl border border-border bg-background px-4 py-3 text-fluid-xs">
              <DetailRow label="Benefício" icon={Tag}>
                {formatDiscountLabel(coupon)}
              </DetailRow>
              <DetailRow label="Compra mínima">
                {coupon.minimumPurchase === null ? "Sem valor mínimo" : formatBRL(coupon.minimumPurchase)}
              </DetailRow>
              <DetailRow label="Validade" icon={CalendarDays}>
                {formatDateBR(coupon.expiresAt)}
              </DetailRow>
              <DetailRow label="Última verificação" icon={Clock}>
                {coupon.checkedAt ? formatDateBR(coupon.checkedAt) : "Não verificado"}
              </DetailRow>
              <DetailRow label="Status" icon={BadgeCheck}>
                <span className={STATUS_CLASS[status]}>{STATUS_LABEL[status]}</span>
              </DetailRow>
            </dl>

            {/* Custo e saldo — ambos demonstrativos, nada é debitado. */}
            <dl className="space-y-2 rounded-xl border border-border bg-secondary px-4 py-3 text-fluid-xs">
              <DetailRow label="Custo do resgate" icon={Coins}>
                {formatCreditsLabel(COUPON_REDEMPTION_COST)}
              </DetailRow>
              <DetailRow label="Saldo demonstrativo">
                {formatCreditsLabel(DEMO_CREDIT_BALANCE)}
              </DetailRow>
              <div className="flex items-start justify-between gap-4 border-t border-border pt-2">
                <dt className="font-semibold text-foreground">Saldo após o resgate</dt>
                <dd className="text-right font-semibold text-foreground">
                  {formatCreditsLabel(remaining)}
                </dd>
              </div>
              <p className="pt-1 leading-relaxed text-muted-foreground">
                Valores ilustrativos. Nenhum crédito é debitado nesta etapa.
              </p>
            </dl>
          </div>
        ) : null
      }
      confirmLabel="Continuar"
      cancelLabel="Cancelar"
      onConfirm={handleContinue}
    />
  );
}
