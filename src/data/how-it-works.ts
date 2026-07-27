import { MessageSquareText, Rocket, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { describeCouponCreditRule, describeProductCreditRange } from "@/config/business-rules";

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
      "Produto, faixa de preço, loja preferida. Escreva do seu jeito: a busca entende a intenção e joga fora o que não interessa.",
    highlight: "Funciona com ou sem acento, com filtros rápidos por categoria e desconto.",
  },
  {
    id: "curadoria",
    icon: Sparkles,
    title: "A IA separa o desconto real do falso",
    description:
      "Enquanto você espera, a inteligência cruza ofertas, cupons e histórico de preços das lojas parceiras — e descarta a promoção que só existe na etiqueta.",
    highlight: "Se o desconto não se sustenta, a oferta nem chega na sua tela.",
  },
  {
    id: "resgate",
    icon: Rocket,
    title: "Resgate e leve o preço menor",
    description:
      "Gaste créditos para liberar o desconto ou o cupom e finalize direto na loja, com o valor já reduzido no carrinho.",
    highlight: `${describeProductCreditRange()} por oferta e ${describeCouponCreditRule().cost} por cupom.`,
  },
] as const;
