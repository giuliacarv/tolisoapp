import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";
const TITLE = "EconomizAI | Novo design (rascunho)";
const DESCRIPTION =
  "Ambiente de rascunho para o novo design da home do EconomizAI: ofertas, cupons e créditos.";

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
 * Cópia isolada da home. Recebe o tema escopado "Obsidian" (obsidiana +
 * violeta elétrico no escuro; roxo + laranja + branco no claro). O estado
 * de tema é controlado localmente, sem alterar o tema global do documento.
 */
function Homepage2() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className={cn(
        "theme-obsidian relative min-h-dvh bg-background text-foreground",
        isDark && "dark",
      )}
    >
      {/* Ambiência: focos de luz roxo e laranja, fixos, atrás de todo o conteúdo. */}
      <div
        aria-hidden
        className="ambient-light pointer-events-none fixed inset-0 -z-10 opacity-70"
      />

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
      <ThemeToggle
        theme={isDark ? "dark" : "light"}
        toggleTheme={() => setIsDark((prev) => !prev)}
        mounted={true}
      />
    </div>
  );
}

