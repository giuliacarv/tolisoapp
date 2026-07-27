/**
 * CONFIGURAÇÃO CENTRAL DE REGRAS COMERCIAIS — EconomizAI
 * ---------------------------------------------------------------------------
 * Fonte única de verdade para todos os números de negócio da interface.
 * Nada aqui persiste dados nem representa saldo real: são valores
 * demonstrativos usados apenas para compor a experiência visual.
 *
 * TODO(backend): quando existir backend, estes valores devem ser espelhados
 * (e validados) no servidor. O frontend nunca deve ser a autoridade sobre
 * saldo, custo ou resgate.
 */

/** Saldo inicial demonstrativo exibido na interface (futuro saldo real). */
export const INITIAL_CREDIT_BALANCE = 5;

/** Limite de preço (em BRL) que separa as faixas de custo de um produto. */
export const PRODUCT_PRICE_THRESHOLD_BRL = 50;

/** Custo, em créditos, de um produto com preço até o limite (inclusive). */
export const PRODUCT_CREDIT_COST_LOW = 1;

/** Custo, em créditos, de um produto com preço acima do limite. */
export const PRODUCT_CREDIT_COST_HIGH = 2;

/** Custo fixo, em créditos, para resgatar qualquer cupom. */
export const COUPON_CREDIT_COST = 3;

/** Agrupamento conveniente para exibição em telas de regras/ajuda. */
export const BUSINESS_RULES = {
  initialCreditBalance: INITIAL_CREDIT_BALANCE,
  productPriceThresholdBRL: PRODUCT_PRICE_THRESHOLD_BRL,
  productCreditCostLow: PRODUCT_CREDIT_COST_LOW,
  productCreditCostHigh: PRODUCT_CREDIT_COST_HIGH,
  couponCreditCost: COUPON_CREDIT_COST,
} as const;
