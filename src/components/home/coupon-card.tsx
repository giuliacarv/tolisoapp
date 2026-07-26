import { BadgeCheck, CalendarClock, Clock3, Coins, ShieldAlert, Ticket } from "lucide-react";

import {
  COUPON_REDEMPTION_COST,
  formatBRL,
  formatDateBR,
  formatDiscountLabel,
  maskCouponCode,
  type Coupon,
} from "@/data/coupons";

export interface CouponCardProps {
  coupon: Coupon;
  onRedeem: (coupon: Coupon) => void;
}

export function CouponCard({ coupon, onRedeem }: CouponCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[18px] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {coupon.store}
          </span>
          <p className="font-serif text-xl leading-tight text-foreground">
            {formatDiscountLabel(coupon)}
          </p>
        </div>
        {coupon.validated ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-saving/40 bg-saving/10 px-2.5 py-1 text-[11px] font-semibold text-saving">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
            Validado
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" strokeWidth={2} />
            Validação pendente
          </span>
        )}
      </div>

      <div className="min-h-[3.5rem] space-y-1">
        <h3 className="text-[15px] font-semibold leading-snug text-foreground">{coupon.title}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {coupon.description}
        </p>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3"
        aria-label="Código do cupom parcialmente oculto"
      >
        <Ticket className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
        <span className="font-mono text-sm font-semibold tracking-[0.14em] text-foreground">
          {maskCouponCode(coupon.code)}
        </span>
        <span className="ml-auto text-[11px] text-muted-foreground">Código oculto</span>
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
            <CalendarClock className="h-3.5 w-3.5" strokeWidth={1.75} />
            Validade
          </dt>
          <dd className="font-medium text-foreground">{formatDateBR(coupon.expiresAt)}</dd>
        </div>
      </dl>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground">
        <Coins className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        Custa {COUPON_REDEMPTION_COST} créditos
      </span>

      <button
        type="button"
        onClick={() => onRedeem(coupon)}
        aria-label={`Resgatar cupom ${coupon.title} da loja ${coupon.store}`}
        className={cn(buttonOutline, "w-full bg-background hover:border-ink hover:bg-ink hover:text-offwhite")}
      >
        Resgatar Cupom
      </button>

    </article>
  );
}

/** Skeleton alinhado ao card real, para a futura carga assíncrona. */
export function CouponCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[18px] border border-border bg-card p-6 shadow-soft">
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
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} />
      Cupons podem sofrer alterações ou expirar conforme as regras de cada loja.
    </p>
  );
}
