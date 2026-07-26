import { createFileRoute } from "@tanstack/react-router";

import { CreditsSection } from "@/components/home/credits-system";
import { ProductSection } from "@/components/home/featured-offers";
import { HeroSection } from "@/components/home/hero";
import { LogoCarousel } from "@/components/home/logo-carousel";
import { HowItWorks } from "@/components/home/how-it-works";
import { SearchAndCategories } from "@/components/home/discovery-section";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { TrustSection } from "@/components/home/trust-section";
import { CouponSection } from "@/components/home/validated-coupons";

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
    <div className="min-h-dvh bg-background">
      <Header />
      <main>
        <HeroSection />
        <LogoCarousel />
        <SearchAndCategories />
        <ProductSection />
        <CouponSection />
        <HowItWorks />
        <CreditsSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
