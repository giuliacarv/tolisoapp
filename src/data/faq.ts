/**
 * Conteúdo estático da Central de Ajuda.
 * Mantido em arquivo separado para que a futura migração para banco de dados
 * ou CMS troque apenas a origem dos dados, sem tocar na interface.
 */

export type FaqCategory =
  | "Conta"
  | "Créditos"
  | "Ofertas"
  | "Cupons"
  | "Compras nas lojas"
  | "Privacidade e segurança";

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  "Conta",
  "Créditos",
  "Ofertas",
  "Cupons",
  "Compras nas lojas",
  "Privacidade e segurança",
] as const;

export interface FaqEntry {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    id: "conta-criar",
    category: "Conta",
    question: "Como criar uma conta no DESCONTAI?",
    answer:
      "As telas de cadastro e acesso já existem, mas a autenticação ainda não está conectada. Quando a integração for concluída, a criação de conta será feita com e-mail e senha e sua conta começará com 5 créditos.",
  },
  {
    id: "conta-dados",
    category: "Conta",
    question: "Preciso de conta para navegar pelas ofertas?",
    answer:
      "Não. Navegar, buscar e comparar ofertas e cupons é livre. A conta será necessária apenas para resgatar oportunidades com créditos.",
  },
  {
    id: "creditos-como-funcionam",
    category: "Créditos",
    question: "Como funcionam os créditos?",
    answer:
      "Créditos são usados para liberar o acesso a uma oportunidade. Produtos até R$ 50,00 custam 1 crédito, produtos acima de R$ 50,00 custam 2 créditos e cada cupom custa 3 créditos.",
  },
  {
    id: "creditos-comprar",
    category: "Créditos",
    question: "Como serão comprados novos créditos?",
    answer:
      "Os pacotes de créditos ainda não estão disponíveis. Quando o pagamento seguro estiver conectado, a compra será feita dentro da própria plataforma, com valores e condições informados antes da confirmação.",
  },
  {
    id: "creditos-expiram",
    category: "Créditos",
    question: "O saldo exibido hoje é real?",
    answer:
      "Não. O saldo de 5 créditos mostrado nesta versão é demonstrativo e serve apenas para ilustrar a experiência. Nenhum crédito é debitado nesta etapa.",
  },
  {
    id: "ofertas-expirar",
    category: "Ofertas",
    question: "O que acontece se uma oferta expirar?",
    answer:
      "Ofertas expiradas ficam visualmente desativadas e o botão de resgate é desabilitado. Preços, disponibilidade e condições podem ser alterados pelas lojas parceiras sem aviso prévio.",
  },
  {
    id: "ofertas-preco",
    category: "Ofertas",
    question: "O preço exibido é sempre o preço final?",
    answer:
      "O preço apresentado reflete a informação disponível no momento da curadoria. O valor final, o frete e as condições de pagamento são sempre os exibidos na loja parceira no momento da compra.",
  },
  {
    id: "cupons-validado",
    category: "Cupons",
    question: "Como saber se um cupom foi validado?",
    answer:
      "Cada cupom mostra o status e a data da última verificação. \"Validado\" indica que a checagem mais recente foi bem-sucedida, \"Validação pendente\" indica que a checagem ainda não foi concluída e \"Expirado\" indica que o cupom não está mais disponível.",
  },
  {
    id: "cupons-nao-funciona",
    category: "Cupons",
    question: "E se o cupom não funcionar na loja?",
    answer:
      "Lojas podem alterar, limitar ou encerrar campanhas a qualquer momento. Nenhum cupom é garantido: se o código não for aceito, recomendamos verificar as condições de uso e a compra mínima informadas no cupom.",
  },
  {
    id: "compras-onde",
    category: "Compras nas lojas",
    question: "Onde finalizo a compra?",
    answer:
      "A compra é sempre finalizada no site ou aplicativo da loja parceira. Depois do resgate, você é direcionado para a plataforma responsável pela venda.",
  },
  {
    id: "compras-vende",
    category: "Compras nas lojas",
    question: "O DESCONTAI vende os produtos?",
    answer:
      "Não. O DESCONTAI seleciona ofertas, organiza informações e facilita o acesso aos links. A venda, o pagamento, a entrega e o suporte são responsabilidade da loja parceira.",
  },
  {
    id: "compras-entrega",
    category: "Compras nas lojas",
    question: "Quem cuida da entrega e garantia?",
    answer:
      "A loja onde a compra foi concluída. Prazos de entrega, trocas, devoluções, garantia e atendimento pós-venda seguem as políticas dessa loja.",
  },
  {
    id: "privacidade-afiliado",
    category: "Privacidade e segurança",
    question: "Como funciona um link de afiliado?",
    answer:
      "Alguns links desta plataforma são links de afiliado. Quando uma compra elegível é realizada, o DESCONTAI pode receber uma comissão da loja, sem custo adicional para você e sem alterar o preço do produto.",
  },
  {
    id: "privacidade-dados",
    category: "Privacidade e segurança",
    question: "O DESCONTAI pede dados de pagamento?",
    answer:
      "Nunca. Dados de cartão e senhas de lojas são informados apenas no ambiente da loja parceira. O DESCONTAI não solicita esse tipo de informação por formulário, e-mail ou mensagem.",
  },
] as const;
