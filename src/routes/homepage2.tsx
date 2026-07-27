import { createFileRoute } from "@tanstack/react-router";

import { HomepageView } from "@/components/home/homepage-view";

const SITE_URL = "https://economizai1.lovable.app";
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
 * Alias histórico da home. Renderiza exatamente a mesma view de "/",
 * mantida apenas para links antigos e para os testes de regressão visual.
 */
function Homepage2() {
  return <HomepageView />;
}
