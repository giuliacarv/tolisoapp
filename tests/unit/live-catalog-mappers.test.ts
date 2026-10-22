import { describe, expect, it } from "vitest";
import {
  mapLiveCategory, mapLiveCoupon, mapLiveProduct,
  type LiveProductRow, type LiveCouponRow,
} from "@/services/live-catalog-mappers";

const product: LiveProductRow = {
  id: "prd-test", slug: "teste", name: "Produto de teste",
  description: "Exemplo", image_url: "https://example.com/item.png",
  store_id: "str_amazon", category_id: "eletronicos",
  original_price: "100.00", current_price: "49.99",
  destination_url: "https://www.amazon.com.br/exemplo",
  affiliate_url: null, featured: true, available: true,
  expires_at: "2026-11-01T20:00:00Z",
  published_at: "2026-10-22T10:00:00Z",
  verified_at: "2026-10-22T09:00:00Z",
  updated_at: "2026-10-22T10:00:00Z", gallery: null, highlights: null, terms: "",
};

const coupon: LiveCouponRow = {
  id: "cpn-test", slug: "cupom", store_id: "str_amazon",
  title: "Cupom", description: "", discount_type: "percentage",
  discount_value: "10", minimum_purchase: null,
  expires_at: "2026-11-01T20:00:00Z",
  validated_at: "2026-10-22T09:00:00Z", terms: "",
  destination_url: "https://www.amazon.com.br/",
};

describe("adaptadores de catálogo PostgreSQL", () => {
  it("deriva preços, desconto e créditos, sem confiar em valores informados pelo banco", () => {
    const mapped = mapLiveProduct(product, "Amazon", "Eletrônicos");
    expect(mapped.currentPrice).toBe(49.99);
    expect(mapped.originalPrice).toBe(100);
    expect(mapped.creditsRequired).toBe(1);
    expect(mapped.discountPercentage).toBe(50);
    expect(mapped.affiliateUrl).toBe(product.destination_url);
    expect(mapped.store).toBe("Amazon");
  });
  it("impede valores inválidos na adaptação", () => {
    expect(() => mapLiveProduct({ ...product, current_price: 150 }, "Amazon", "Eletrônicos")).toThrow();
    expect(() => mapLiveProduct({ ...product, current_price: "NaN" }, "Amazon", "Eletrônicos")).toThrow();
  });
  it("protege ícones desconhecidos", () => {
    expect(mapLiveCategory({
      id: "outro", slug: "outro", label: "Outro", description: "",
      icon_name: "codigo-inesperado", active: true,
    }).iconName).toBe("sparkles");
  });
  it("não inclui código de cupom na resposta pública", () => {
    const mapped = mapLiveCoupon(coupon, "Amazon");
    expect(mapped.code).toBe("");
    expect(mapped.validated).toBe(true);
    expect(mapped.creditsRequired).toBeGreaterThan(0);
  });
});
