import { createFileRoute } from "@tanstack/react-router";

import { HomepageView } from "@/components/home/homepage-view";

const SITE_URL = "https://economizai1.lovable.app";
const TITLE = "EconomizAI | Ofertas e cupons selecionados";
const DESCRIPTION =
  "Inteligência Artificial pra Economizar de Verdade! Encontre ofertas, descontos e cupons selecionados nas principais lojas online do Brasil.";
const OG_IMAGE = `${SITE_URL}/og-descontai.jpg`;



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      // WhatsApp/Facebook: imagem absoluta, 1200x630 (1.91:1), com tipo e alt declarados.
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "EconomizAI — Ofertas e cupons selecionados",
      },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      {
        name: "twitter:image:alt",
        content: "EconomizAI — Ofertas e cupons selecionados",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "EconomizAI",
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
  return <HomepageView />;
}
