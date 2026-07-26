import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { COUPONS, type Coupon } from "@/data/coupons";

import { CouponCard, CouponCardSkeleton, CouponDisclaimer } from "./coupon-card";
import { CouponRedeemDialog } from "./coupon-redeem-dialog";
import { Container, SectionHeading } from "./primitives";

/**
 * Cupons validados.
 * TODO: substituir o timeout por fetch real quando o backend existir.
 */
export function ValidatedCoupons() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  function handleRedeem(coupon: Coupon) {
    setSelected(coupon);
    setDialogOpen(true);
  }

  return (
    <section
      id="cupons"
      className="scroll-mt-24 border-y border-border bg-secondary/60 py-20 sm:py-24"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Cupons"
            title="Cupons validados"
            description="Cupons selecionados e revisados para você aproveitar descontos reais nas lojas participantes."
          />
          <a
            href="#cupons"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Ver todos os cupons
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CouponCardSkeleton key={`coupon-skeleton-${index}`} />
              ))
            : COUPONS.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} onRedeem={handleRedeem} />
              ))}
        </div>

        <div className="mt-8">
          <CouponDisclaimer />
        </div>
      </Container>

      <CouponRedeemDialog coupon={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
