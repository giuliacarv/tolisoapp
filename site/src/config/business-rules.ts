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

/**
 * DERIVADORES DE TEXTO
 * ---------------------------------------------------------------------------
 * Por que existem: os números acima apareciam escritos à mão em páginas
 * institucionais, FAQ e componentes de UI. Qualquer ajuste de regra exigia
 * editar N arquivos e torcer para não esquecer nenhum.
 *
 * Estas funções são a única forma autorizada de escrever a regra de créditos
 * em texto. A camada de apresentação depende da abstração (DIP), nunca do
 * literal — mudar uma constante propaga para toda a interface.
 */

/** "1 crédito" / "3 créditos" — plural correto derivado do número. */
export function formatCreditCount(amount: number): string {
  return `${amount} ${amount === 1 ? "crédito" : "créditos"}`;
}

/** Limite de preço formatado em BRL: "R$ 50,00". */
export function formatCreditThresholdBRL(): string {
  return PRODUCT_PRICE_THRESHOLD_BRL.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Custo textual da faixa de produto: "até R$ 50,00" ou "acima de R$ 50,00". */
export function describeProductCreditRule(tier: "low" | "high"): {
  range: string;
  cost: string;
  sentence: string;
} {
  const threshold = formatCreditThresholdBRL();
  const isLow = tier === "low";
  const range = isLow ? `até ${threshold}` : `acima de ${threshold}`;
  const cost = formatCreditCount(isLow ? PRODUCT_CREDIT_COST_LOW : PRODUCT_CREDIT_COST_HIGH);
  return {
    range,
    cost,
    sentence: `Produtos ${range} custam ${cost}.`,
  };
}

/** Custo textual de um cupom: "Cupons custam 3 créditos." */
export function describeCouponCreditRule(): { cost: string; sentence: string } {
  const cost = formatCreditCount(COUPON_CREDIT_COST);
  return { cost, sentence: `Cupons custam ${cost}.` };
}

/** Faixa resumida usada em textos curtos: "1 a 2 créditos por oferta". */
export function describeProductCreditRange(): string {
  return `${PRODUCT_CREDIT_COST_LOW} a ${PRODUCT_CREDIT_COST_HIGH} créditos`;
}

/** Saldo inicial em texto: "5 créditos". */
export function describeInitialBalance(): string {
  return formatCreditCount(INITIAL_CREDIT_BALANCE);
}
