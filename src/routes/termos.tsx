import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

const SITE_URL = "https://descontai1.lovable.app";
const UPDATED_AT = "rascunho inicial";

const SECTIONS: LegalSection[] = [
  {
    id: "natureza-da-plataforma",
    title: "Natureza da plataforma",
    body: [
      "O EconomizAI é uma plataforma de descoberta e curadoria de ofertas e cupons. Reunimos, organizamos e apresentamos informações sobre produtos e promoções divulgados por lojas e marketplaces de terceiros.",
      "Não vendemos produtos, não processamos pagamentos, não emitimos notas fiscais e não realizamos entregas. Toda compra ocorre no site da loja escolhida, sob os termos, preços e condições dessa loja.",
    ],
    bullets: [
      "Não somos loja, intermediador de pagamento nem representante comercial das lojas listadas.",
      "As marcas citadas pertencem aos respectivos titulares e são mencionadas apenas para identificar a origem da oferta.",
      "Nesta fase, parte do conteúdo exibido é demonstrativa e serve para validar a experiência do produto.",
    ],
  },
  {
    id: "uso-dos-creditos",
    title: "Uso dos créditos",
    body: [
      "Créditos são uma unidade interna de uso da plataforma, utilizada para liberar o acesso a determinados conteúdos, como o link final de uma oferta ou o código completo de um cupom.",
      "Créditos não são moeda, não têm curso legal, não são conversíveis em dinheiro e não representam desconto adicional na loja.",
    ],
    bullets: [
      "Ofertas com preço até R$ 50,00 custam 1 crédito; acima de R$ 50,00, 2 créditos.",
      "Cupons custam 3 créditos.",
      "O consumo de créditos remunera a curadoria e a verificação do conteúdo, e não garante estoque, preço, aprovação de pedido ou êxito da compra.",
      "Regras, custos e formas de obtenção de créditos podem ser ajustados; mudanças relevantes serão comunicadas na plataforma.",
    ],
  },
  {
    id: "redirecionamentos-externos",
    title: "Redirecionamentos externos",
    body: [
      "Ao concluir um resgate, você poderá ser direcionado para um site de terceiros. A partir do momento em que sai do EconomizAI, aplicam-se exclusivamente os termos, a política de privacidade e as regras de compra do destino.",
      "Sempre que um link levar para fora da plataforma, essa saída será identificada na interface antes da confirmação.",
    ],
    bullets: [
      "Não controlamos o conteúdo, a disponibilidade nem as práticas de sites de terceiros.",
      "Recomendamos conferir preço final, frete, prazo, vendedor e política de troca diretamente na loja antes de finalizar a compra.",
    ],
  },
  {
    id: "responsabilidade-das-lojas",
    title: "Responsabilidade das lojas",
    body: [
      "A relação de consumo se estabelece entre você e a loja que efetua a venda. Cabe à loja a responsabilidade por cobrança, faturamento, entrega, garantia, troca, devolução, atendimento pós-venda e cumprimento das condições anunciadas.",
      "Podemos ajudar a esclarecer dúvidas sobre o conteúdo exibido aqui, mas não temos poder para alterar pedidos, reembolsar valores ou interferir em decisões da loja.",
    ],
  },
  {
    id: "disponibilidade-de-ofertas",
    title: "Disponibilidade de ofertas",
    body: [
      "Preços, descontos, estoques, prazos e condições são definidos pelas lojas e podem mudar ou terminar a qualquer momento, sem aviso prévio.",
      "Fazemos esforços razoáveis para manter as informações atualizadas, mas não garantimos que toda oferta ou cupom estará ativo, válido ou aplicável ao seu carrinho no momento da compra.",
    ],
    bullets: [
      "Cupons podem ter limites de uso, valor mínimo, restrição de categoria, região ou primeiro pedido.",
      "Erros evidentes de preço ou digitação podem ser corrigidos ou removidos sem aviso.",
      "A plataforma também pode ficar temporariamente indisponível por manutenção ou fatores técnicos.",
    ],
  },
  {
    id: "conduta-do-usuario",
    title: "Conduta do usuário",
    body: [
      "Você concorda em usar a plataforma de boa-fé, respeitando a legislação aplicável e os direitos de terceiros.",
    ],
    bullets: [
      "Não utilizar robôs, scripts, raspagem em massa ou qualquer automação que sobrecarregue ou contorne a plataforma.",
      "Não tentar burlar o sistema de créditos, criar contas em duplicidade ou explorar falhas em benefício próprio.",
      "Não reproduzir, revender ou redistribuir conteúdo, códigos de cupom e bases de dados sem autorização.",
      "Não inserir conteúdo ilícito, ofensivo, enganoso ou que viole direitos de propriedade intelectual.",
      "Manter seus dados de acesso em sigilo quando o cadastro estiver disponível.",
    ],
  },
  {
    id: "suspensao-de-conta",
    title: "Suspensão de conta",
    body: [
      "Quando o sistema de contas estiver disponível, poderemos limitar, suspender ou encerrar o acesso diante de indícios razoáveis de fraude, abuso do sistema de créditos, violação destes termos ou risco à segurança da plataforma e de outros usuários.",
      "Sempre que possível e adequado, a medida será comunicada e você poderá apresentar contestação pelos canais de contato. Créditos consumidos de forma abusiva podem ser revertidos ou cancelados.",
    ],
  },
  {
    id: "alteracoes-dos-termos",
    title: "Alterações dos termos",
    body: [
      "Este documento pode ser atualizado para refletir mudanças no produto, em parcerias ou na legislação. A versão vigente será sempre a publicada nesta página, com a respectiva data de referência.",
      "Mudanças significativas serão sinalizadas na plataforma. O uso contínuo após a atualização indica ciência do texto vigente.",
    ],
  },
  {
    id: "contato",
    title: "Contato",
    body: [
      "Dúvidas, correções de conteúdo, reclamações sobre uma oferta ou pedidos relacionados a estes termos podem ser enviados pela página de contato do EconomizAI.",
      "Nesta fase de pré-lançamento, o canal de atendimento e o endereço oficial de resposta ainda estão sendo definidos e serão publicados aqui antes da abertura ao público.",
    ],
  },
];

export const Route = createFileRoute("/termos")({
  head: () => {
    const title = "Termos de uso | EconomizAI";
    const description =
      "Termos de uso provisórios do EconomizAI: natureza da plataforma, créditos, redirecionamentos, responsabilidade das lojas e conduta do usuário.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/termos` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/termos` }],
    };
  },
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termos de uso"
      description="Como o EconomizAI funciona, o que os créditos representam e quais são as responsabilidades de cada parte na jornada até a loja."
      updatedAt={UPDATED_AT}
      sections={SECTIONS}
    />
  );
}
