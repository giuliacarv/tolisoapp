import { describe, expect, it } from "vitest";
import { getProductUnavailableReason } from "@/domain/products/product-rules";
import { getCouponStatus } from "@/domain/coupons/coupon-rules";

const NOW = new Date("2026-10-21T12:00:00-03:00");

describe("validade de produtos e cupons", () => {
  it("não exibe oferta expirada como disponível", () => {
    expect(getProductUnavailableReason({ expiresAt: "2026-09-15T23:59:59-03:00" }, NOW)).toBe("expired");
  });
  it("prioriza produto indisponível mesmo com validade futura", () => {
    expect(getProductUnavailableReason({
      expiresAt: "2027-01-01T00:00:00-03:00",
      available: false,
    }, NOW)).toBe("unavailable");
  });
  it("não reativa cupom verificado cuja validade acabou", () => {
    expect(getCouponStatus({
      expiresAt: "2026-08-01T00:00:00-03:00",
      validated: true,
      checkedAt: "2026-07-15T10:00:00-03:00",
    }, NOW)).toBe("expired");
  });
  it("trata cupom não conferido como pendente", () => {
    expect(getCouponStatus({
      expiresAt: "2027-01-01T00:00:00-03:00",
      validated: true,
      checkedAt: null,
    }, NOW)).toBe("pending");
  });
});
