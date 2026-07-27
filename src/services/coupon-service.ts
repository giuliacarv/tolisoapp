/**
 * SERVIÇO DE CUPONS
 * ---------------------------------------------------------------------------
 * Fonte de dados atual: `@/data/mockCoupons`.
 * TODO(backend): trocar o corpo dos métodos por consultas ao Supabase.
 *
 * O código completo do cupom nunca deve ser entregue por este serviço quando
 * o backend existir — a revelação depende de resgate autenticado.
 */

import { MOCK_COUPONS } from "@/data/mockCoupons";
import { getCouponStatus } from "@/domain/coupons/coupon-rules";
import { DEMO_CREDIT_BALANCE, buildRedemptionPreview } from "@/domain/credits/credit-rules";
import type { Coupon, CouponStatus, RedemptionPreview } from "@/types";

import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface CouponQuery {
  /** Filtra por estado calculado (validado / pendente / expirado). */
  status?: CouponStatus;
  storeId?: string;
}

export interface CouponService {
  list(query?: CouponQuery): Promise<Coupon[]>;
  getById(id: string): Promise<Coupon>;
  /** Prévia informativa de resgate — não debita créditos nem revela o código. */
  previewRedemption(couponId: string): Promise<RedemptionPreview>;
}

export const couponService: CouponService = {
  async list({ status, storeId }: CouponQuery = {}) {
    const now = new Date();

    const coupons = MOCK_COUPONS.filter((coupon) => {
      if (storeId && coupon.storeId !== storeId) return false;
      if (status && getCouponStatus(coupon, now) !== status) return false;
      return true;
    });

    return resolveMock(coupons);
  },

  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de cupom obrigatório.");

    const coupon = MOCK_COUPONS.find((candidate) => candidate.id === id);
    if (!coupon) throw new NotFoundError("Cupom", id);

    return resolveMock(coupon);
  },

  async previewRedemption(couponId) {
    const coupon = await couponService.getById(couponId);

    return buildRedemptionPreview({
      kind: "coupon",
      itemId: coupon.id,
      title: coupon.title,
      store: coupon.store,
      creditsRequired: coupon.creditsRequired,
      balance: DEMO_CREDIT_BALANCE,
    });
  },
};
