import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgePercent } from "lucide-react";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

const SITE_URL = "https://descontai1.lovable.app";
const UPDATED_AT = "rascunho inicial";

const SECTIONS: LegalSection[] = [
  {
    id: "como-funciona-comissao",
    title: "Como funciona a comissão",
    body: [
      "Participamos de programas de afiliados de lojas e marketplaces. Quando você clica em um link de afiliado e realiza uma compra elegível, a loja pode pagar ao DESCONTAI uma comissão sobre aquela venda.",
      "Essa remuneração é o que sustenta a curadoria, a verificação de cupons e a manutenção da plataforma.",
    ],
  },
  {
    id: "sem-custo-adicional",
    title: "A comissão não altera o preço",
    body: [
      "O valor pago por você é exatamente o mesmo que pagaria acessando a loja diretamente. A comissão é paga pela loja ao DESCONTAI, e não somada ao seu pedido.",
      "Também não recebemos pagamento para inflar avaliações: a presença de uma oferta na plataforma não garante que ela seja a melhor do mercado naquele momento.",
    ],
  },
  {
    id: "responsabilidade-da-loja",
    title: "A loja é responsável pela venda",
    body: [
      "A compra é concluída no site do parceiro. Cobrança, faturamento, entrega, garantia, troca, devolução e atendimento pós-venda são de responsabilidade exclusiva da loja vendedora.",
      "O DESCONTAI não processa pagamentos, não emite nota fiscal e não pode alterar, cancelar ou reembolsar pedidos.",
    ],
  },
  {
    id: "ofertas-podem-mudar",
    title: "Ofertas podem mudar",
    body: [
      "Preços, descontos, estoques, prazos e regras de cupom são definidos pelas lojas e podem mudar ou encerrar a qualquer momento, sem aviso prévio.",
      "Confira sempre as condições finais na página do produto, antes de concluir a compra.",
    ],
  },
  {
    id: "redirecionamento-identificado",
    title: "O redirecionamento será identificado",
    body: [
      "Sempre que um link levar você para fora da plataforma, isso será sinalizado antes da confirmação, junto com a identificação da loja de destino.",
      "Links de afiliado também são identificados nas páginas de oferta e cupom, para que a relação comercial fique clara antes do clique.",
    ],
  },
  {
    id: "cookies-afiliados",
    title: "Cookies de afiliados",
    body: [
      "A atribuição de comissões costuma depender de cookies gravados pela rede do parceiro. No DESCONTAI, essa categoria só é ativada mediante consentimento e permanece desligada por padrão.",
    ],
    extra: (
      <p className="text-fluid-sm leading-[1.8] text-muted-foreground">
        Detalhes por categoria estão na{" "}
        <Link
          to="/cookies"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Política de cookies
        </Link>
        .
      </p>
    ),
  },
  {
    id: "contato-afiliados",
    title: "Contato",
    body: [
      "Dúvidas sobre esta divulgação, sobre parcerias ou sobre uma oferta específica podem ser enviadas pela página de contato.",
    ],
  },
];

export const Route = createFileRoute("/afiliados")({
  head: () => {
    const title = "Divulgação de afiliados | DESCONTAI";
    const description =
      "Alguns links do DESCONTAI são links de afiliado. Podemos receber uma comissão por compras elegíveis, sem custo adicional para o usuário.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/afiliados` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/afiliados` }],
    };
  },
  component: AffiliateDisclosurePage,
});

function AffiliateDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Transparência"
      title="Divulgação de afiliados"
      description="Como o DESCONTAI é remunerado, por que isso não muda o preço para você e o que continua sendo responsabilidade da loja."
      updatedAt={UPDATED_AT}
      sections={SECTIONS}
      intro={
        <div className="gilded-frame flex items-start gap-4 rounded-[20px] border border-gold/30 bg-gold/5 p-6 shadow-soft">
          <BadgePercent className="mt-0.5 size-6 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          <p className="text-fluid-base leading-[1.7] text-pretty text-foreground">
            Alguns links do DESCONTAI são links de afiliado. Podemos receber uma comissão por
            compras elegíveis, sem custo adicional para o usuário.
          </p>
        </div>
      }
    />
  );
}
