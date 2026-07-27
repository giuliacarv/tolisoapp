import { useState } from "react";

import { SolHeader } from "./sol-header";
import { SolHero } from "./sol-hero";
import { SolTicker } from "./sol-ticker";
import { SolDiscovery } from "./sol-discovery";
import { SolOffers } from "./sol-offers";
import { SolCoupons } from "./sol-coupons";
import { SolSteps } from "./sol-steps";
import { SolCredits } from "./sol-credits";
import { SolTrust } from "./sol-trust";
import { SolFooter } from "./sol-footer";

/**
 * Home alternativa (/homepage3) — tema escopado "Solaris".
 * Mesmo conteúdo da /homepage2, com linguagem visual oposta: fundo lavanda
 * claro, laranja de ação, tinta marinho, cartões brancos de raio muito grande.
 */
export function Homepage3View() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  return (
    <div className="theme-solaris min-h-dvh bg-background text-foreground">
      <a
        href="#sol-conteudo"
        className="sr-only rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100]"
      >
        Pular para o conteúdo principal
      </a>

      <SolHeader />

      <main id="sol-conteudo" tabIndex={-1}>
        <SolHero />
        <SolTicker />
        <SolDiscovery
          term={term}
          onTermChange={setTerm}
          activeCategory={category}
          onCategoryChange={setCategory}
        />
        <SolOffers
          term={term}
          categoryLabel={category}
          onClearFilters={() => {
            setTerm("");
            setCategory(null);
          }}
        />
        <SolCoupons />
        <SolSteps />
        <SolCredits />
        <SolTrust />
      </main>

      <SolFooter />
    </div>
  );
}
