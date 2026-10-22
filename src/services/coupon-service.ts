/** Cupons públicos: o código completo NÃO está presente na tabela exposta. */
import { MOCK_COUPONS } from "@/data/mockCoupons";
import { getCouponStatus } from "@/domain/coupons/coupon-rules";
import { DEMO_CREDIT_BALANCE, buildRedemptionPreview } from "@/domain/credits/credit-rules";
import type { Coupon, CouponStatus, RedemptionPreview } from "@/types";

import { mapLiveCoupon, type LiveCouponRow, type LiveStoreRow } from "./live-catalog-mappers";
import { fetchPublicRows } from "./live-catalog-source";
import { NotFoundError, ServiceError, ValidationError, resolveMock } from "./service-utils";

export interface CouponQuery {
  status?: CouponStatus;
  storeId?: string;
}
export interface CouponService {
  list(query?: CouponQuery): Promise<Coupon[]>;
  getById(id: string): Promise<Coupon>;
  findBySlug(slug: string): Promise<Coupon | null>;
  listByStore(couponId: string, limit?: number): Promise<Coupon[]>;
  previewRedemption(couponId: string): Promise<RedemptionPreview>;
}

async function loadCoupons(): Promise<Coupon[]> {
  const rows = await fetchPublicRows<LiveCouponRow>("coupons");
  if (rows === null) return resolveMock(MOCK_COUPONS);
  if (rows.length === 0) return [];

  const stores = await fetchPublicRows<LiveStoreRow>("stores");
  if (!stores) throw new ServiceError("Não foi possível carregar lojas dos cupons.");
  const byId = new Map(stores.map((s) => [s.id, s.name]));
  return rows.map((row) => {
    const storeName = byId.get(row.store_id);
    if (!storeName) throw new ServiceError(`Loja ausente do cupom ${row.id}`);
    return mapLiveCoupon(row, storeName);
  });
}

export const couponService: CouponService = {
  async list({ status, storeId }: CouponQuery = {}) {
    const now = new Date();
    return (await loadCoupons()).filter((coupon) => {
      if (storeId && coupon.storeId !== storeId) return false;
      return !status || getCouponStatus(coupon, now) === status;
    });
  },
  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de cupom obrigatório.");
    const coupon = (await loadCoupons()).find((c) => c.id === id);
    if (!coupon) throw new NotFoundError("Cupom", id);
    return coupon;
  },
  async findBySlug(slug) {
    if (!slug.trim()) throw new ValidationError("Slug de cupom obrigatório.");
    return (await loadCoupons()).find((c) => c.slug === slug) ?? null;
  },
  async listByStore(couponId, limit = 3) {
    const coupons = await loadCoupons();
    const current = coupons.find((c) => c.id === couponId);
    if (!current) return [];
    return coupons.filter((c) => c.id !== couponId && c.storeId === current.storeId)
      .slice(0, Math.max(0, limit));
  },
  async previewRedemption(couponId) {
    const coupon = await couponService.getById(couponId);
    return buildRedemptionPreview({
      kind: "coupon", itemId: coupon.id, title: coupon.title, store: coupon.store,
      creditsRequired: coupon.creditsRequired, balance: DEMO_CREDIT_BALANCE,
    });
  },
};
