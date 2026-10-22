import { ArrowUpRight, Clock3, TicketPercent } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useResource } from "@/hooks/use-async-resource";
import { couponQueries } from "@/services";
import { hasLiveCatalog } from "@/services/live-catalog-source";
import { formatDiscountLabel, getCouponStatus, maskCouponCode } from "@/domain/coupons/coupon-rules";
import { formatDateBR } from "@/lib/format";
import { Shell, SolHeading, SolSection } from "./shell";

/**
 * A vitrine atual contém somente cupons fictícios. Não oferecemos resgate e
 * não sugerimos validação real, independentemente dos dados históricos do mock.
 */
export function SolCoupons() {
  const coupons = useResource(couponQueries.list());
  const live = hasLiveCatalog();
  const items = (coupons.data ?? []).slice(0, 6);

  return (
    <SolSection id="sol-cupons" className="bg-secondary/60">
      <Shell>
        <SolHeading
          eyebrow="Cupons"
          title={live ? "Cupons publicados" : "Exemplos de cupons"}
          description={live ? "Consulte cupons recentemente conferidos. A liberação de códigos ainda não foi ativada." : "Esta é uma demonstração visual. Os códigos são fictícios e não podem ser utilizados em lojas."}
          action={
            <Link to="/cupons" className="sol-pill-ghost text-sm">
              Explorar o catálogo demonstrativo
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          }
        />

        {live && !coupons.isLoading && !coupons.error && items.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-border p-6 text-sm text-muted-foreground">Ainda não existem cupons publicados e verificados.</p>
        ) : null}

        {coupons.error ? (
          <p role="alert" className="mt-8 text-sm text-destructive">{coupons.error}</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coupons.isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="sol-ticket h-52 animate-pulse" />
                ))
              : items.map((coupon) => {
                  const isExpired = getCouponStatus(coupon) === "expired";
                  return (
                    <article key={coupon.id} className="sol-ticket flex flex-col gap-4 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          {coupon.store}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground">
                          <Clock3 className="h-3.5 w-3.5" aria-hidden />
                          {isExpired ? "Expirado" : "Exemplo fictício"}
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
                        <span>Data ilustrativa: {formatDateBR(coupon.expiresAt)}</span>
                        <span className="inline-flex items-center gap-1">
                          <TicketPercent className="h-4 w-4" aria-hidden />
                          Sem resgate real
                        </span>
                      </div>
                    </article>
                  );
                })}
          </div>
        )}
      </Shell>
    </SolSection>
  );
}
