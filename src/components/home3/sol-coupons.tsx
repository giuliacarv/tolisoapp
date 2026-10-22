import { useState } from "react";
import { ArrowUpRight, Clock3, ShieldCheck, TicketPercent } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { useResource } from "@/hooks/use-async-resource";
import { couponQueries } from "@/services";
import {
  COUPON_REDEMPTION_COST,
  formatDiscountLabel,
  getCouponStatus,
  maskCouponCode,
} from "@/domain/coupons/coupon-rules";
import { formatCreditsLabel, formatDateBR } from "@/lib/format";
import type { Coupon, CouponStatus } from "@/types";
import { cn } from "@/lib/utils";

import { Shell, SolHeading, SolSection } from "./shell";

const RedeemCouponModal = lazy(() =>
  import("@/components/home/coupon-redeem-dialog").then((m) => ({ default: m.RedeemCouponModal })),
);

const STATUS: Record<CouponStatus, { label: string; className: string }> = {
  validated: { label: "Validado", className: "bg-saving/12 text-saving" },
  pending: { label: "Validação pendente", className: "bg-amber/15 text-amber" },
  expired: { label: "Expirado", className: "bg-destructive/12 text-destructive" },
};

/** Cupons apresentados como tickets recortados sobre faixa clara. */
export function SolCoupons() {
  const coupons = useResource(couponQueries.list());
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [open, setOpen] = useState(false);

  const items = (coupons.data ?? []).slice(0, 6);

  return (
    <SolSection id="sol-cupons" className="bg-secondary/60">
      <Shell>
        <SolHeading
          eyebrow="Cupons"
          title="Como serão os cupons"
          description="Os cupons exibidos são exemplos fictícios e expirados. O resgate real ainda não está disponível."
          action={
            <Link to="/cupons" className="sol-pill-ghost text-sm">
              Ver todos os cupons
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </Link>
          }
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={`sol-coupon-skeleton-${index}`} className="sol-ticket h-52 animate-pulse" />
              ))
            : items.map((coupon) => {
                const status = getCouponStatus(coupon);
                const meta = STATUS[status];

                return (
                  <article key={coupon.id} className="sol-ticket flex flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {coupon.store}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold",
                          meta.className,
                        )}
                      >
                        {status === "validated" ? (
                          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                        ) : (
                          <Clock3 className="h-3.5 w-3.5" aria-hidden />
                        )}
                        {meta.label}
                      </span>
                    </div>

                    <p className="text-3xl font-extrabold tracking-[-0.04em] text-primary">
                      {formatDiscountLabel(coupon)}
                    </p>
                    <p className="line-clamp-2 text-sm font-semibold text-foreground">
                      {coupon.title}
                    </p>

                    <p className="rounded-2xl border border-dashed border-border bg-secondary px-4 py-3 text-center font-mono text-sm font-bold tracking-[0.2em] text-foreground">
                      {maskCouponCode(coupon.code)}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>Válido até {formatDateBR(coupon.expiresAt)}</span>
                      <span className="font-bold text-foreground">
                        {formatCreditsLabel(coupon.creditsRequired)}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={status === "expired"}
                      onClick={() => {
                        setSelected(coupon);
                        setOpen(true);
                      }}
                      className="sol-pill w-full text-sm disabled:pointer-events-none disabled:opacity-50"
                    >
                      <TicketPercent className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      Liberar cupom
                    </button>
                  </article>
                );
              })}
        </div>
      </Shell>

      <Suspense fallback={null}>
        {selected ? <RedeemCouponModal coupon={selected} open={open} onOpenChange={setOpen} /> : null}
      </Suspense>
    </SolSection>
  );
}
