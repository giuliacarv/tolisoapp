/**
 * DADOS DEMONSTRATIVOS — SALDO DE CRÉDITOS
 * ---------------------------------------------------------------------------
 * TODO: substituir pelo saldo real do usuário autenticado quando o backend
 * de autenticação e créditos existir.
 *
 * Enquanto isso, nenhum fluxo da interface pode debitar créditos: este valor
 * é exibido apenas para ilustrar o custo de um resgate.
 */
export const DEMO_CREDIT_BALANCE = 5;

/** Pluralização em pt-BR: "1 crédito" / "3 créditos". */
export function formatCreditsLabel(credits: number): string {
  return `${credits} ${credits === 1 ? "crédito" : "créditos"}`;
}

/**
 * Saldo restante após um resgate hipotético.
 * Nunca retorna valor negativo — um custo maior que o saldo significa
 * simplesmente que o resgate não seria possível.
 */
export function getRemainingBalance(balance: number, cost: number): number {
  const remaining = balance - cost;
  return remaining > 0 ? remaining : 0;
}
