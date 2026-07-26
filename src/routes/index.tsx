import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/home/reveal";
import { CreditsSection } from "@/components/home/credits-system";
import { HeroSection } from "@/components/home/hero";
import { LogoCarousel } from "@/components/home/logo-carousel";
import { HowItWorks } from "@/components/home/how-it-works";
import { SearchAndCategories } from "@/components/home/discovery-section";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { TrustSection } from "@/components/home/trust-section";
import { CouponSection } from "@/components/home/validated-coupons";

const SITE_URL = "https://descontai1.lovable.app";
const TITLE = "DESCONTAI | Ofertas e cupons selecionados";
const DESCRIPTION =
  "Encontre ofertas, descontos e cupons selecionados nas principais lojas online do Brasil.";
const OG_IMAGE = `${SITE_URL}/og-descontai.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DESCONTAI",
          url: `${SITE_URL}/`,
          description: DESCRIPTION,
          inLanguage: "pt-BR",
        }),
      },
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

        {/* Cada seção entra com um leve deslocamento ao alcançar a viewport. */}
        <Reveal>
          <SearchAndCategories />
        </Reveal>
        <Reveal>
          <CouponSection />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <CreditsSection />
        </Reveal>
        <Reveal>
          <TrustSection />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
