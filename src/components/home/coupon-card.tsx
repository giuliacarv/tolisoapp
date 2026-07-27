import { BadgeCheck, CalendarClock, CalendarX2, Clock3, Coins, ShieldAlert, Ticket } from "lucide-react";

import {
  COUPON_REDEMPTION_COST,
  formatDiscountLabel,
  getCouponStatus,
  maskCouponCode,
} from "@/domain/coupons/coupon-rules";
import { formatBRL, formatDateBR } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Coupon, CouponStatus } from "@/types";

import { buttonOutline } from "./primitives";

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
    className: "border-amber/40 bg-amber/10 text-amber",
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
        "gilded-frame motion-safe-transform relative flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft transition-[transform,box-shadow,border-color] duration-300",
        !isExpired && "hover:-translate-y-1 hover:shadow-float",
        isExpired && "border-dashed opacity-55 saturate-50",
      )}
    >
      {/* Cabeçalho do "bilhete": tinta dourada + benefício em destaque. */}
      <header className="relative overflow-hidden bg-[image:var(--gradient-ink)] px-6 pb-5 pt-5 text-offwhite sm:px-7">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-40 w-52 halo-gradient opacity-70"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <span className="text-fluid-micro font-semibold uppercase tracking-[0.2em] text-offwhite/60">
            {coupon.store}
          </span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-fluid-micro font-semibold",
              status === "validated" && "border-saving/45 bg-saving/15 text-[oklch(0.82_0.13_160)]",
              status === "pending" && "border-amber/45 bg-amber/15 text-[oklch(0.85_0.11_80)]",
              status === "expired" && "border-offwhite/20 bg-offwhite/10 text-offwhite/60",
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {statusStyle.label}
          </span>
        </div>

        <p className="relative mt-2 font-serif text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
          <span className="gold-text">{formatDiscountLabel(coupon)}</span>
        </p>

        <span className="relative mt-3 inline-flex items-center rounded-full border border-offwhite/15 bg-offwhite/5 px-2.5 py-1 text-fluid-micro font-semibold uppercase tracking-[0.14em] text-offwhite/60">
          Cupom demonstrativo
        </span>
      </header>

      {/* Perfuração do bilhete: dois entalhes e um filete tracejado. */}
      <div className="relative h-0">
        <span
          aria-hidden
          className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-border bg-background"
        />
        <span
          aria-hidden
          className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-border bg-background"
        />
        <span
          aria-hidden
          className="absolute inset-x-6 -top-px block border-t border-dashed border-border"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-6 sm:px-7">
        <div className="min-h-[3.5rem] space-y-1">
          <h3 className="text-fluid-sm font-semibold leading-snug text-foreground">
            {coupon.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {coupon.description}
          </p>
        </div>

        <div
          className="flex items-center gap-2 rounded-xl border border-dashed border-gold/45 bg-gold/8 px-4 py-3"
          aria-label="Código do cupom parcialmente oculto"
        >
          <Ticket className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          <span className="truncate font-mono text-sm font-semibold tracking-[0.14em] text-foreground">
            {maskCouponCode(coupon.code)}
          </span>
          <span className="ml-auto shrink-0 text-fluid-micro text-muted-foreground">
            Código oculto
          </span>
        </div>

        <dl className="mt-auto space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <dt>Compra mínima</dt>
            <dd className="font-medium text-foreground">
              {coupon.minimumPurchase === null
                ? "Sem valor mínimo"
                : formatBRL(coupon.minimumPurchase)}
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

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-fluid-micro font-semibold text-foreground">
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
            className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-ink)] px-5 py-3 text-sm font-semibold text-offwhite shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Ticket className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden />
            Resgatar Cupom
          </button>
        )}
      </div>
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
      Cupons demonstrativos. A validação automática será conectada ao banco de dados em uma próxima
      etapa.
    </p>
  );
}

