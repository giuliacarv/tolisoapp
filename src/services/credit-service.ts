/**
 * SERVIÇO DE CRÉDITOS
 * ---------------------------------------------------------------------------
 * Fonte de dados atual: constante demonstrativa + `@/data/mockCreditPackages`.
 *
 * REGRA DESTA ETAPA: o saldo é apenas LEITURA. Não há débito, não há
 * persistência (nem localStorage) e não há checkout. Quando a autenticação
 * existir, `getBalance` passa a consultar o saldo real do usuário.
 */

import { MOCK_CREDIT_PACKAGES } from "@/data/mockCreditPackages";
import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";
import { DEMO_CREDIT_BALANCE } from "@/domain/credits/credit-rules";
import type { CreditPackage } from "@/types";

import { NotFoundError, resolveMock } from "./service-utils";

export interface CreditService {
  /** Saldo demonstrativo. Nunca alterado pela interface. */
  getBalance(): Promise<number>;
  listPackages(): Promise<CreditPackage[]>;
  getPackageById(id: string): Promise<CreditPackage>;
  /** Custo fixo de qualquer cupom, em créditos. */
  getCouponCost(): number;
}

export const creditService: CreditService = {
  async getBalance() {
    return resolveMock(DEMO_CREDIT_BALANCE);
  },

  async listPackages() {
    return resolveMock(MOCK_CREDIT_PACKAGES);
  },

  async getPackageById(id) {
    const found = MOCK_CREDIT_PACKAGES.find((candidate) => candidate.id === id);
    if (!found) throw new NotFoundError("Pacote de créditos", id);
    return resolveMock(found);
  },

  getCouponCost() {
    return COUPON_REDEMPTION_COST;
  },
};
