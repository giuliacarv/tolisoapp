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
import { ThemeToggle } from "@/components/home/theme-toggle";

const SITE_URL = "https://descontai1.lovable.app";
const TITLE = "DESCONTAI | Novo design (rascunho)";
const DESCRIPTION =
  "Ambiente de rascunho para o novo design da home do DESCONTAI: ofertas, cupons e créditos.";

export const Route = createFileRoute("/homepage2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Página de rascunho: não deve ser indexada enquanto o design é validado.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/homepage2` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Homepage2,
});

/**
 * Cópia isolada da home atual. Serve como área de trabalho para aplicar o
 * novo design de referência sem alterar a página inicial em produção.
 */
function Homepage2() {
  return (
    <div className="theme-vivid min-h-dvh bg-background">

      <Header />
      <main>
        <HeroSection />
        <LogoCarousel />

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
      <ThemeToggle />
    </div>
  );
}
