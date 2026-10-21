import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { CookiePreferencesPanel } from "@/components/legal/cookie-preferences-panel";

const SITE_URL = "https://economizai1.lovable.app";
const UPDATED_AT = "rascunho inicial";

const SECTIONS: LegalSection[] = [
  {
    id: "o-que-sao",
    title: "O que são cookies",
    body: [
      "Cookies e tecnologias equivalentes (como o armazenamento local do navegador) são pequenos registros gravados no seu dispositivo quando você usa um site. Eles servem para manter a interface funcionando, lembrar escolhas e, dependendo da categoria, medir uso ou apoiar publicidade.",
      "Nesta versão do EconomizAI, apenas recursos essenciais e preferências locais estão em uso. Nenhum script de análise, pixel publicitário ou rastreador de rede de afiliados é carregado.",
    ],
  },
  {
    id: "essenciais",
    title: "Essenciais",
    body: [
      "São indispensáveis para exibir a plataforma, manter a navegação estável, proteger contra uso abusivo e registrar a sua própria escolha sobre cookies.",
      "Por serem necessários ao funcionamento do serviço, não podem ser desativados na plataforma. É possível bloqueá-los no navegador, mas partes da interface deixarão de funcionar corretamente.",
    ],
  },
  {
    id: "preferencias",
    title: "Preferências",
    body: [
      "Guardam escolhas feitas por você, no seu dispositivo, para que a experiência continue igual na próxima visita.",
    ],
    bullets: [
      "Tema claro ou escuro.",
      "Filtros, ordenação e chips selecionados na busca.",
      "Favoritos e itens vistos recentemente.",
    ],
  },
  {
    id: "analise",
    title: "Análise",
    body: [
      "Poderão medir, de forma agregada, quais seções são mais acessadas, onde ocorrem erros e quais fluxos precisam de ajuste.",
      "Nenhuma ferramenta de análise está implementada nesta versão. Se e quando for adotada, ela só será inicializada depois do seu consentimento nesta categoria, e esta página será atualizada com o nome do serviço utilizado.",
    ],
  },
  {
    id: "publicidade-afiliados",
    title: "Publicidade e afiliados",
    body: [
      "Esta categoria abrange cookies de redes de afiliados e de publicidade, usados para atribuir cliques a comissões e para exibir comunicações mais relevantes.",
      "Cookies de marketing não são ativados sem o seu consentimento. Enquanto você não autorizar esta categoria, nenhum rastreador de publicidade ou de atribuição é carregado pelo EconomizAI.",
      "Importante: ao clicar em um link de saída e chegar à loja de destino, o site do parceiro pode gravar os próprios cookies, sob a política dele. Essa decisão está fora do nosso controle.",
    ],
    extra: (
      <p className="text-fluid-sm leading-[1.8] text-muted-foreground">
        Entenda como funcionam as comissões na{" "}
        <Link
          to="/afiliados"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Divulgação de afiliados
        </Link>
        .
      </p>
    ),
  },
  {
    id: "gerenciar",
    title: "Como gerenciar suas escolhas",
    body: [
      "Você pode revisar sua decisão a qualquer momento no painel abaixo. A escolha fica registrada apenas neste dispositivo e navegador; ao limpar os dados do navegador, o banner será exibido novamente.",
      "Também é possível bloquear ou apagar cookies diretamente nas configurações do seu navegador.",
    ],
    extra: <CookiePreferencesPanel />,
  },
  {
    id: "contato-cookies",
    title: "Contato",
    body: [
      "Dúvidas sobre esta política podem ser enviadas pela página de contato, selecionando o assunto “Privacidade”. O responsável formal pelo tratamento de dados será designado antes do lançamento público.",
    ],
  },
];

export const Route = createFileRoute("/cookies")({
  head: () => {
    const title = "Política de cookies | EconomizAI";
    const description =
      "Política de cookies provisória do EconomizAI: categorias essenciais, de preferências, de análise e de publicidade/afiliados, com controle das suas escolhas.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/cookies` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/cookies` }],
    };
  },
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de cookies"
      description="Quais categorias existem, o que cada uma faz e como controlar suas preferências. Categorias não essenciais permanecem desativadas até você autorizar."
      updatedAt={UPDATED_AT}
      sections={SECTIONS}
    />
  );
}
