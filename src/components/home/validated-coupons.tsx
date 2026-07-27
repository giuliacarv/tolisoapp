import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { useAsyncResource } from "@/hooks/use-async-resource";
import { couponService } from "@/services";
import type { Coupon } from "@/types";

import { AutoCarousel } from "./auto-carousel";
import { CouponCard, CouponCardSkeleton, CouponDisclaimer } from "./coupon-card";
import { RedeemCouponModal } from "./coupon-redeem-dialog";
import { handleAnchorClick } from "@/lib/smooth-scroll";

import { Container, SectionHeading } from "./primitives";



/**
 * Cupons validados.
 * Os dados chegam pelo `couponService` — a troca para o Supabase não exige
 * nenhuma alteração neste componente.
 */
export function CouponSection() {
  const coupons = useAsyncResource(() => couponService.list(), []);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
            title="Cupom testado antes de chegar até você"
            description="Nada de código expirado no meio do carrinho: cada cupom mostra status de verificação e custa 3 créditos para liberar."
          />
          <a
            href="#cupons"
            onClick={(event) => handleAnchorClick(event, "#cupons")}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Ver todos os cupons
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          </a>
        </div>

        {coupons.isLoading ? (
          <div className="mt-10 grid-fluid [--col-min:18rem]">
            {Array.from({ length: 6 }).map((_, index) => (
              <CouponCardSkeleton key={`coupon-skeleton-${index}`} />
            ))}
          </div>
        ) : coupons.error ? (
          <div role="alert" className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">{coupons.error}</p>
            <button
              type="button"
              onClick={coupons.refetch}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-sm font-medium transition-colors duration-200 hover:bg-muted"
            >
              Tentar novamente
            </button>
          </div>
        ) : coupons.isEmpty ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Nenhum cupom disponível no momento.
          </p>
        ) : (
          <div className="mt-12">
            <AutoCarousel
              items={coupons.data ?? []}
              getKey={(coupon) => coupon.id}
              ariaLabel="Carrossel de cupons validados"
              speed={40}
              renderItem={(coupon) => (
                <div className="w-full">
                  <CouponCard coupon={coupon} onRedeem={handleRedeem} />
                </div>
              )}
            />
          </div>


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
