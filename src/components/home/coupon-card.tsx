import { BadgeCheck, CalendarClock, CalendarX2, Clock3, Coins, ShieldAlert, Ticket } from "lucide-react";

import {
  COUPON_REDEMPTION_COST,
  formatBRL,
  formatDateBR,
  formatDiscountLabel,
  getCouponStatus,
  maskCouponCode,
  type Coupon,
  type CouponStatus,
} from "@/data/coupons";
import { cn } from "@/lib/utils";

import { buttonOutline, cardBase } from "./primitives";

export interface CouponCardProps {
  coupon: Coupon;
  onRedeem: (coupon: Coupon) => void;
}

/** Aparência de cada estado — verde discreto, âmbar e cinza. */
const STATUS_STYLES: Record<CouponStatus, { label: string; className: string }> = {
  validated: {
    label: "Validado",
    className: "border-saving/40 bg-saving/10 text-saving",
  },
  pending: {
    label: "Validação pendente",
    className: "border-gold/45 bg-gold/12 text-gold-strong",
  },
  expired: {
    label: "Expirado",
    className: "border-border bg-secondary text-muted-foreground",
  },
};

const STATUS_ICON: Record<CouponStatus, typeof BadgeCheck> = {
  validated: BadgeCheck,
  pending: Clock3,
  expired: CalendarX2,
};

export function CouponCard({ coupon, onRedeem }: CouponCardProps) {
  const status = getCouponStatus(coupon);
  const isExpired = status === "expired";
  const StatusIcon = STATUS_ICON[status];
  const statusStyle = STATUS_STYLES[status];

  return (
    <article
      aria-disabled={isExpired || undefined}
      className={cn(
        cardBase,
        "motion-safe-transform flex h-full flex-col gap-4 p-6",
        isExpired
          ? "border-dashed opacity-60 saturate-50"
          : "hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Cupom demonstrativo
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0 space-y-1">
          <span className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {coupon.store}
          </span>
          <p className="font-serif text-xl leading-tight text-foreground">
            {formatDiscountLabel(coupon)}
          </p>
        </div>

        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-fluid-micro font-semibold",
            statusStyle.className,
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          {statusStyle.label}
        </span>
      </div>

      <div className="min-h-[3.5rem] space-y-1">
        <h3 className="text-fluid-sm font-semibold leading-snug text-foreground">{coupon.title}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {coupon.description}
        </p>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3"
        aria-label="Código do cupom parcialmente oculto"
      >
        <Ticket className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        <span className="truncate font-mono text-sm font-semibold tracking-[0.14em] text-foreground">
          {maskCouponCode(coupon.code)}
        </span>
        <span className="ml-auto shrink-0 text-fluid-micro text-muted-foreground">Código oculto</span>
      </div>

      <dl className="mt-auto space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-3">
          <dt>Compra mínima</dt>
          <dd className="font-medium text-foreground">
            {coupon.minimumPurchase === null ? "Sem valor mínimo" : formatBRL(coupon.minimumPurchase)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="inline-flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
            Validade
          </dt>
          <dd className="font-medium text-foreground">{formatDateBR(coupon.expiresAt)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt>Última verificação</dt>
          <dd className="font-medium text-foreground">
            {coupon.checkedAt ? formatDateBR(coupon.checkedAt) : "Ainda não verificado"}
          </dd>
        </div>
      </dl>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
        <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        Custa {COUPON_REDEMPTION_COST} créditos
      </span>

      {isExpired ? (
        <button
          type="button"
          disabled
          aria-label={`Cupom expirado: ${coupon.title} da loja ${coupon.store}`}
          className={cn(
            buttonOutline,
            "w-full cursor-not-allowed bg-secondary text-muted-foreground hover:border-border hover:bg-secondary hover:text-muted-foreground",
          )}
        >
          Cupom expirado
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onRedeem(coupon)}
          aria-label={`Resgatar cupom ${coupon.title} da loja ${coupon.store} por ${COUPON_REDEMPTION_COST} créditos`}
          className={cn(
            buttonOutline,
            "w-full bg-background hover:border-ink hover:bg-ink hover:text-offwhite",
          )}
        >
          Resgatar Cupom
        </button>
      )}
    </article>
  );
}

/** Skeleton alinhado ao card real, para a futura carga assíncrona. */
export function CouponCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[18px] border border-border bg-card p-6 shadow-soft">
      <div className="h-5 w-40 animate-pulse rounded-full bg-secondary" />
      <div className="h-3 w-20 animate-pulse rounded bg-secondary" />
      <div className="h-6 w-28 animate-pulse rounded bg-secondary" />
      <div className="h-4 w-full animate-pulse rounded bg-secondary" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-secondary" />
      <div className="mt-auto h-4 w-3/4 animate-pulse rounded bg-secondary" />
      <div className="h-6 w-32 animate-pulse rounded-full bg-secondary" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-secondary" />
    </div>
  );
}

export function CouponDisclaimer() {
  return (
    <p className="inline-flex items-start gap-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
      Cupons demonstrativos, criados apenas para ilustrar a interface: os códigos são fictícios e não
      geram desconto real. Condições e validade dependem das regras de cada loja.
    </p>
  );
}
