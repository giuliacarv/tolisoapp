import { createFileRoute } from "@tanstack/react-router";

import { Homepage3View } from "@/components/home3/homepage3-view";

const SITE_URL = "https://economizai1.lovable.app";
const TITLE = "EconomizAI | Direção visual Solaris (rascunho)";
const DESCRIPTION =
  "Rascunho da home do EconomizAI na direção Solaris: laranja de ação, tinta marinho e cartões brancos com ofertas, cupons e créditos.";

export const Route = createFileRoute("/homepage3")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Rascunho de design: fora do índice enquanto a direção é validada.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/homepage3` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Homepage3,
});

function Homepage3() {
  return <Homepage3View />;
}
