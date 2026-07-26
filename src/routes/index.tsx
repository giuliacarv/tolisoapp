import { createFileRoute } from "@tanstack/react-router";

import { CreditsSystem } from "@/components/home/credits-system";
import { FeaturedOffers } from "@/components/home/featured-offers";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { SearchAndCategories } from "@/components/home/search-categories";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { TrustSection } from "@/components/home/trust-section";
import { ValidatedCoupons } from "@/components/home/validated-coupons";

const TITLE = "DESCONTAI — Ofertas e cupons verificados das maiores lojas";
const DESCRIPTION =
  "Encontre ofertas reais e cupons validados de Shopee, TikTok Shop, Mercado Livre, Ponto Frio e Amazon, com curadoria, histórico de preço e transparência.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <SearchAndCategories />
        <FeaturedOffers />
        <ValidatedCoupons />
        <HowItWorks />
        <CreditsSystem />
        <TrustSection />
      </main>
      <SiteFooter />
    </div>
  );
}
