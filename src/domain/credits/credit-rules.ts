/**
 * REGRAS DE NEGÓCIO — CRÉDITOS
 * ---------------------------------------------------------------------------
 * Nenhuma função aqui persiste nada. O saldo é sempre recebido por parâmetro
 * (vindo do serviço), de modo que trocar a origem por Supabase não exige
 * mudar nenhuma regra nem nenhum componente.
 */

import { INITIAL_CREDIT_BALANCE } from "@/config/business-rules";
import type { RedeemableKind, RedemptionPreview } from "@/types";

/**
 * Saldo demonstrativo exibido na interface.
 * TODO(backend): substituir pelo saldo real do usuário autenticado.
 */
export const DEMO_CREDIT_BALANCE = INITIAL_CREDIT_BALANCE;

/**
 * Saldo restante após um resgate hipotético.
 * Nunca retorna valor negativo — um custo maior que o saldo significa
 * simplesmente que o resgate não seria possível.
 */
export function getRemainingBalance(balance: number, cost: number): number {
  const remaining = balance - cost;
  return remaining > 0 ? remaining : 0;
}

export interface RedemptionPreviewInput {
  kind: RedeemableKind;
  itemId: string;
  title: string;
  store: string;
  creditsRequired: number;
  balance: number;
}

/** Monta a prévia informativa de um resgate. Cálculo puro, sem efeitos. */
export function buildRedemptionPreview({
  kind,
  itemId,
  title,
  store,
  creditsRequired,
  balance,
}: RedemptionPreviewInput): RedemptionPreview {
  return {
    kind,
    itemId,
    title,
    store,
    creditsRequired,
    balanceBefore: balance,
    balanceAfter: getRemainingBalance(balance, creditsRequired),
    canRedeem: balance >= creditsRequired,
  };
}
