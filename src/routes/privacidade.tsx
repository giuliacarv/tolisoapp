import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

const SITE_URL = "https://economizai1.lovable.app";
const UPDATED_AT = "rascunho inicial";

const SECTIONS: LegalSection[] = [
  {
    id: "dados-coletados",
    title: "Quais dados poderão ser coletados",
    body: [
      "Nesta versão, o EconomizAI não possui cadastro ativo, banco de dados de usuários nem envio de formulários. As informações digitadas em telas de login, cadastro ou contato permanecem no seu navegador e não são transmitidas.",
      "Quando as funcionalidades de conta e atendimento forem ativadas, os dados abaixo poderão ser coletados. Esta lista descreve o tratamento planejado, e não um sistema já em operação.",
    ],
    bullets: [
      "Dados de cadastro: nome, e-mail e senha (armazenada apenas de forma cifrada, nunca em texto puro).",
      "Dados de uso da conta: saldo e histórico de créditos, resgates realizados, ofertas e cupons acessados.",
      "Dados de atendimento: mensagens enviadas pelos canais de suporte e informações necessárias para respondê-las.",
      "Dados técnicos: endereço IP, tipo de dispositivo, navegador e registros de acesso, na medida necessária para segurança e funcionamento.",
      "Preferências salvas no seu próprio dispositivo: tema, filtros, favoritos e itens vistos recentemente.",
    ],
  },
  {
    id: "finalidade",
    title: "Finalidade",
    body: [
      "Os dados serão usados apenas para finalidades específicas, informadas e compatíveis com o serviço oferecido.",
    ],
    bullets: [
      "Criar e manter a conta, autenticar o acesso e administrar o saldo de créditos.",
      "Entregar o conteúdo resgatado e registrar o histórico de resgates.",
      "Responder solicitações de suporte e corrigir problemas relatados.",
      "Prevenir fraude, abuso do sistema de créditos e uso automatizado indevido.",
      "Entender, de forma agregada, como a plataforma é utilizada para priorizar melhorias.",
      "Enviar comunicações sobre novidades e ofertas somente com consentimento, com opção de descadastro em cada mensagem.",
    ],
  },
  {
    id: "base-de-tratamento",
    title: "Base de tratamento",
    body: [
      "Cada finalidade se apoia em uma base legal prevista na Lei Geral de Proteção de Dados (Lei nº 13.709/2018). A indicação abaixo é preliminar e será confirmada na revisão jurídica.",
    ],
    bullets: [
      "Execução de contrato: criação de conta, uso de créditos e entrega do conteúdo resgatado.",
      "Cumprimento de obrigação legal ou regulatória: guarda de registros de acesso e atendimento a autoridades competentes.",
      "Legítimo interesse: segurança da plataforma, prevenção a fraude e melhoria do serviço, sempre com avaliação de impacto e de suas expectativas.",
      "Consentimento: cookies não essenciais e comunicações de marketing, revogáveis a qualquer momento.",
    ],
  },
  {
    id: "armazenamento",
    title: "Armazenamento",
    body: [
      "Hoje, as únicas informações persistidas são preferências guardadas localmente no seu navegador (favoritos, histórico de visualização, tema e escolha de cookies). Elas ficam no seu dispositivo e podem ser apagadas por você a qualquer momento.",
      "Quando houver conta, os dados serão armazenados em provedores de infraestrutura em nuvem contratados para essa finalidade. O provedor, a região de armazenamento e as salvaguadas aplicáveis serão informados aqui antes da ativação.",
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    body: [
      "Adotaremos medidas técnicas e administrativas proporcionais ao risco, como transporte de dados por conexão cifrada, senhas armazenadas com algoritmo de hash, controle de acesso por perfil e registro de eventos relevantes.",
      "Não afirmamos que essas medidas já estejam implementadas nesta versão: a maior parte depende da camada de conta e servidor, ainda não ativada. Nenhum sistema é totalmente imune a incidentes; em caso de evento com risco relevante, os titulares e a autoridade competente serão comunicados na forma da lei.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento",
    body: [
      "Não vendemos dados pessoais. O compartilhamento ocorrerá apenas quando necessário e limitado ao mínimo indispensável.",
    ],
    bullets: [
      "Operadores contratados: hospedagem, envio de e-mail, atendimento e prevenção a fraude, sob obrigações contratuais de proteção.",
      "Lojas e redes de afiliados: ao clicar em um link de saída, a loja de destino passa a tratar seus dados sob a política dela. Não enviamos seu cadastro para as lojas.",
      "Autoridades públicas: mediante requisição legal, ordem judicial ou para defesa de direitos.",
      "Operações societárias: em caso de reorganização, mantendo as mesmas finalidades e informando os titulares.",
    ],
  },
  {
    id: "direitos-do-titular",
    title: "Direitos do titular",
    body: [
      "Você pode exercer, a qualquer momento e gratuitamente, os direitos garantidos pela LGPD.",
    ],
    bullets: [
      "Confirmação da existência de tratamento e acesso aos dados.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.",
      "Portabilidade e informação sobre compartilhamentos realizados.",
      "Revogação do consentimento e oposição a tratamentos baseados em legítimo interesse.",
      "Eliminação dos dados tratados com base em consentimento, ressalvadas as hipóteses de guarda obrigatória.",
    ],
  },
  {
    id: "retencao",
    title: "Retenção",
    body: [
      "Os dados serão mantidos apenas pelo tempo necessário às finalidades informadas ou ao cumprimento de obrigações legais.",
    ],
    bullets: [
      "Dados de conta: enquanto a conta existir e por período adicional razoável após o encerramento, para defesa de direitos.",
      "Registros de acesso: pelo prazo previsto no Marco Civil da Internet.",
      "Mensagens de suporte: pelo tempo necessário à solução e ao histórico de atendimento.",
      "Preferências locais: até que você as apague no dispositivo ou limpe os dados do navegador.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "Utilizamos armazenamento local e cookies essenciais para manter a interface funcionando e registrar a sua própria escolha de consentimento. Categorias de preferências, análise e publicidade/afiliados permanecem desativadas até autorização expressa.",
      "Nenhuma ferramenta de análise ou rastreamento publicitário está ativa nesta versão.",
    ],
    extra: (
      <p className="text-fluid-sm leading-[1.8] text-muted-foreground">
        Os detalhes por categoria estão na{" "}
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
    id: "contato-responsavel",
    title: "Contato do responsável",
    body: [
      "Pedidos relacionados a dados pessoais podem ser enviados pela página de contato, selecionando o assunto “Privacidade”.",
      "O encarregado pelo tratamento de dados (DPO) e o endereço oficial de contato ainda serão designados e publicados nesta página antes do lançamento público. Enquanto isso, responderemos pelos canais disponíveis na plataforma.",
    ],
  },
];

export const Route = createFileRoute("/privacidade")({
  head: () => {
    const title = "Política de privacidade | EconomizAI";
    const description =
      "Política de privacidade provisória do EconomizAI: dados que poderão ser coletados, finalidades, bases legais, segurança, retenção e direitos do titular.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/privacidade` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/privacidade` }],
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidade"
      description="O que poderá ser coletado quando as contas forem ativadas, com que finalidade, por quanto tempo e quais direitos você tem sobre esses dados."
      updatedAt={UPDATED_AT}
      sections={SECTIONS}
    />
  );
}
