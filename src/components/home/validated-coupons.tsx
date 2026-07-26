import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { COUPONS, type Coupon } from "@/data/coupons";

import { CouponCard, CouponCardSkeleton, CouponDisclaimer } from "./coupon-card";
import { RedeemCouponModal } from "./coupon-redeem-dialog";
import { Container, SectionHeading } from "./primitives";

/**
 * Cupons validados.
 * TODO: substituir o timeout por fetch real quando o backend existir.
 */
export function CouponSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  function handleRedeem(coupon: Coupon) {
    setSelected(coupon);
    setModalOpen(true);
  }

  return (
    <section
      id="cupons"
      className="section-y scroll-mt-[calc(var(--header-h)+1rem)] border-y border-border bg-secondary/50"
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
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Ver todos os cupons
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          </a>
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CouponCardSkeleton key={`coupon-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COUPONS.map((coupon) => (
              <li key={coupon.id} className="min-w-0">
                <CouponCard coupon={coupon} onRedeem={handleRedeem} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <CouponDisclaimer />
        </div>
      </Container>

      <RedeemCouponModal coupon={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}

export { CouponSection as ValidatedCoupons };
