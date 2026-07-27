/**
 * TIPOS DE DOMÍNIO — CRÉDITOS
 * ---------------------------------------------------------------------------
 * O saldo é sempre tratado como um valor vindo de fora (serviço). Nenhuma
 * parte da interface pode debitar, persistir ou alterar créditos nesta etapa.
 */

/** Pacote de créditos ofertado ao usuário. Futura tabela `credit_packages`. */
export interface CreditPackage {
  id: string;
  name: string;
  /** Quantidade de créditos entregues pelo pacote. */
  credits: number;
  /** Preço em BRL. Nenhum checkout está conectado nesta etapa. */
  priceBRL: number;
  description: string;
  /** Destaque visual ("mais escolhido"). Não implica urgência artificial. */
  highlighted: boolean;
}

/** Tipo de item que pode ser resgatado com créditos. */
export type RedeemableKind = "product" | "coupon";

/**
 * Prévia de um resgate — cálculo puramente informativo exibido nos modais.
 *
 * IMPORTANTE: é uma simulação de leitura. `balanceAfter` nunca é persistido;
 * serve apenas para o usuário entender o custo antes de haver autenticação.
 */
export interface RedemptionPreview {
  kind: RedeemableKind;
  /** Id do produto ou do cupom. */
  itemId: string;
  title: string;
  store: string;
  creditsRequired: number;
  /** Saldo demonstrativo no momento da consulta. */
  balanceBefore: number;
  /** Saldo hipotético após o resgate (nunca negativo). */
  balanceAfter: number;
  /** Falso quando o saldo demonstrativo não cobre o custo. */
  canRedeem: boolean;
}
