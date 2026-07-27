import { useState } from "react";

import { Reveal } from "@/components/home/reveal";
import { CreditsSection } from "@/components/home/credits-system";
import { HeroSection } from "@/components/home/hero";
import { LogoCarousel } from "@/components/home/logo-carousel";
import { HowItWorks } from "@/components/home/how-it-works";
import { SearchAndCategories } from "@/components/home/discovery-section";
import { InstitutionalFooter } from "@/components/home/institutional-footer";
import { Header } from "@/components/home/site-header";
import { TrustSection } from "@/components/home/trust-section";
import { CouponSection } from "@/components/home/validated-coupons";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Home do EconomizAI com o tema escopado "Obsidian":
 * obsidiana + violeta elétrico no escuro; roxo + laranja + branco no claro.
 *
 * O tema é controlado localmente (sem alterar a classe do documento) para que
 * o restante do site continue usando a identidade global.
 */
export function HomepageView() {
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

      {/* WCAG 2.4.1 — primeiro item da ordem de tabulação, visível ao focar. */}
      <a
        href="#conteudo-principal"
        className="sr-only rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]"
      >
        Pular para o conteúdo principal
      </a>

      <Header />
      <main id="conteudo-principal" tabIndex={-1}>

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
      <InstitutionalFooter />
      <ThemeToggle
        theme={isDark ? "dark" : "light"}
        toggleTheme={() => setIsDark((prev) => !prev)}
        mounted={true}
      />
    </div>
  );
}
