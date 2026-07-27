import { describe, expect, it } from "vitest";

import {
  COUPON_CREDIT_COST,
  INITIAL_CREDIT_BALANCE,
  PRODUCT_CREDIT_COST_HIGH,
  PRODUCT_CREDIT_COST_LOW,
  describeCouponCreditRule,
  describeInitialBalance,
  describeProductCreditRange,
  describeProductCreditRule,
  formatCreditCount,
} from "@/config/business-rules";

/**
 * Estes testes protegem a fonte única de verdade das regras de crédito:
 * se uma constante mudar, os textos derivados precisam acompanhar sozinhos.
 */
describe("business-rules — derivadores de crédito", () => {
  it("pluraliza a contagem de créditos", () => {
    expect(formatCreditCount(1)).toBe("1 crédito");
    expect(formatCreditCount(2)).toBe("2 créditos");
  });

  it("descreve as faixas de produto a partir das constantes", () => {
    expect(describeProductCreditRule("low").cost).toBe(formatCreditCount(PRODUCT_CREDIT_COST_LOW));
    expect(describeProductCreditRule("high").cost).toBe(formatCreditCount(PRODUCT_CREDIT_COST_HIGH));
    expect(describeProductCreditRule("low").range).toContain("até");
    expect(describeProductCreditRule("high").range).toContain("acima de");
  });

  it("descreve o custo do cupom e o saldo inicial", () => {
    expect(describeCouponCreditRule().cost).toBe(formatCreditCount(COUPON_CREDIT_COST));
    expect(describeInitialBalance()).toBe(formatCreditCount(INITIAL_CREDIT_BALANCE));
  });

  it("expõe a faixa completa de custo de produto", () => {
    expect(describeProductCreditRange()).toBe(
      `${PRODUCT_CREDIT_COST_LOW} a ${PRODUCT_CREDIT_COST_HIGH} créditos`,
    );
  });
});
