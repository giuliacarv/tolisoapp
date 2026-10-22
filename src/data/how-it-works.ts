import { MessageSquareText, Rocket, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";


/**
 * Etapa do fluxo "Como funciona".
 *
 * Mantida em um módulo de dados para que o componente de apresentação não
 * precise ser alterado quando o conteúdo editorial mudar.
 */
export interface HowItWorksStep {
  /** Identificador estável — usado em ids de ARIA e chaves de lista. */
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Detalhe curto revelado no hover/foco da etapa. */
  highlight: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: "descreva",
    icon: MessageSquareText,
    title: "Diga o que você quer comprar",
    description:
      "Informe o nome do produto e use as categorias para explorar exemplos do catálogo.",
    highlight: "A pesquisa abre links externos para consultar lojas, sem integração de preços.",
  },
  {
    id: "curadoria",
    icon: Sparkles,
    title: "Pesquise os preços nas lojas",
    description:
      "Use os atalhos para consultar resultados de pesquisa diretamente na Amazon e no Mercado Livre.",
    highlight: "O EconomizAI ainda não compara nem verifica preços automaticamente.",
  },
  {
    id: "resgate",
    icon: Rocket,
    title: "Confira antes de comprar",
    description:
      "Verifique frete, preço, disponibilidade e condições na loja. A compra ocorre fora do EconomizAI.",
    highlight: "Créditos e cupons ainda são demonstrativos, sem resgate real.",
  },
] as const;
