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
      "Conte o produto, a faixa de preço e a loja de preferência. A busca inteligente entende sua intenção e filtra o que realmente importa.",
    highlight: "Busca sem acento, com filtros rápidos por categoria e desconto.",
  },
  {
    id: "curadoria",
    icon: Sparkles,
    title: "A IA faz a curadoria",
    description:
      "Nossa inteligência cruza ofertas, cupons e histórico de preços das lojas parceiras para separar apenas o que representa economia real.",
    highlight: "Ofertas e cupons revisados antes de aparecerem para você.",
  },
  {
    id: "resgate",
    icon: Rocket,
    title: "Resgate e economize",
    description:
      "Use seus créditos para liberar o desconto ou o cupom e finalize a compra direto na loja parceira, com o preço já reduzido.",
    highlight: "1 a 2 créditos por oferta e 3 créditos por cupom.",
  },
] as const;
