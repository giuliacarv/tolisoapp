/**
 * DADOS DEMONSTRATIVOS (MOCK) — CUPONS
 * ---------------------------------------------------------------------------
 * ⚠️ Consumir SOMENTE através de `couponService`.
 *
 * TODO(backend): substituir por `select * from coupons`.
 *
 * Regras importantes desta etapa:
 * - Nenhum código aqui é real; todos são fictícios e servem apenas para
 *   ilustrar a interface. Nunca afirme que funcionam em lojas reais.
 * - `validated` só é true quando houve conferência registrada em `checkedAt`.
 *   Sem isso, a UI exibe "Validação pendente".
 * - Cupons com `expiresAt` no passado são tratados como "Expirado".
 */

import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";
import type { Coupon } from "@/types";

/** O custo é derivado da regra de domínio, nunca digitado por cupom. */
type CouponSeed = Omit<Coupon, "creditsRequired">;

const COUPON_SEEDS: CouponSeed[] = [
  {
    id: "cpn_001",
    store: "Amazon",
    storeId: "str_amazon",
    title: "10% de desconto em itens selecionados",
    description: "Abatimento aplicado no carrinho para produtos participantes da campanha.",
    code: "DESCONAMZ10",
    discountType: "percentage",
    discountValue: 10,
    minimumPurchase: null,
    expiresAt: "2026-09-15T23:59:59-03:00",
    validated: true,
    checkedAt: "2026-07-25T09:12:00-03:00",
    terms: "Não cumulativo com outras promoções. Limite de um uso por conta.",
    affiliateUrl: "#placeholder-afiliado/cpn_001",
  },
  {
    id: "cpn_002",
    store: "Shopee",
    storeId: "str_shopee",
    title: "R$ 20 de desconto em compras acima de R$ 150",
    description: "Válido para lojas participantes dentro do aplicativo.",
    code: "DESCONSHP20",
    discountType: "fixed",
    discountValue: 20,
    minimumPurchase: 150,
    expiresAt: "2026-08-31T23:59:59-03:00",
    validated: true,
    checkedAt: "2026-07-26T08:40:00-03:00",
    terms: "Quantidade limitada de resgates por dia definida pela loja.",
    affiliateUrl: "#placeholder-afiliado/cpn_002",
  },
  {
    id: "cpn_003",
    store: "Mercado Livre",
    storeId: "str_mercado_livre",
    title: "Frete grátis em produtos participantes",
    description: "Frete cortesia em itens selecionados com selo de envio rápido.",
    code: "DESCONFRETE",
    discountType: "shipping",
    discountValue: 0,
    minimumPurchase: 79,
    expiresAt: "2026-09-10T23:59:59-03:00",
    validated: true,
    checkedAt: "2026-07-24T18:05:00-03:00",
    terms: "Disponível apenas para regiões atendidas pelo envio participante.",
    affiliateUrl: "#placeholder-afiliado/cpn_003",
  },
  {
    id: "cpn_004",
    store: "Magalu",
    storeId: "str_magalu",
    title: "15% OFF na primeira compra",
    description: "Benefício de boas-vindas para contas sem pedidos anteriores.",
    code: "DESCONMAG15",
    discountType: "percentage",
    discountValue: 15,
    minimumPurchase: 199,
    expiresAt: "2026-08-20T23:59:59-03:00",
    validated: false,
    checkedAt: null,
    terms: "Condições definidas pela loja podem mudar sem aviso prévio.",
    affiliateUrl: "#placeholder-afiliado/cpn_004",
  },
  {
    id: "cpn_005",
    store: "TikTok Shop",
    storeId: "str_tiktok_shop",
    title: "R$ 15 de desconto em beleza e cuidados",
    description: "Abatimento em marcas participantes da categoria beleza.",
    code: "DESCONTTS15",
    discountType: "fixed",
    discountValue: 15,
    minimumPurchase: 99,
    expiresAt: "2026-08-12T23:59:59-03:00",
    validated: false,
    checkedAt: null,
    terms: "Sujeito à disponibilidade de estoque durante o período promocional.",
    affiliateUrl: "#placeholder-afiliado/cpn_005",
  },
  {
    id: "cpn_006",
    store: "Ponto",
    storeId: "str_ponto",
    title: "12% de desconto em eletrodomésticos",
    description: "Campanha encerrada, mantida como exemplo de cupom expirado.",
    code: "DESCONPTO12",
    discountType: "percentage",
    discountValue: 12,
    minimumPurchase: 299,
    expiresAt: "2026-07-10T23:59:59-03:00",
    validated: true,
    checkedAt: "2026-07-11T10:00:00-03:00",
    terms: "Promoção encerrada. Mantida apenas para demonstração da interface.",
    affiliateUrl: "#placeholder-afiliado/cpn_006",
  },
  {
    id: "cpn_007",
    store: "Amazon",
    storeId: "str_amazon",
    title: "Brinde exclusivo em marcas participantes",
    description: "Benefício especial concedido pela loja em pedidos elegíveis da campanha.",
    code: "DESCONBRINDE",
    discountType: "special",
    discountValue: 0,
    minimumPurchase: null,
    expiresAt: "2026-09-05T23:59:59-03:00",
    validated: true,
    checkedAt: "2026-07-26T11:30:00-03:00",
    terms: "Brinde sujeito à disponibilidade informada pela loja parceira.",
    affiliateUrl: "#placeholder-afiliado/cpn_007",
  },
  {
    id: "cpn_008",
    store: "Shopee",
    storeId: "str_shopee",
    title: "Frete grátis sem valor mínimo em itens selecionados",
    description: "Envio cortesia em produtos com selo de frete promocional do aplicativo.",
    code: "DESCONSHPFRETE",
    discountType: "shipping",
    discountValue: 0,
    minimumPurchase: null,
    expiresAt: "2026-08-28T23:59:59-03:00",
    validated: false,
    checkedAt: null,
    terms: "Regras de envio definidas pela loja e pela região de entrega.",
    affiliateUrl: "#placeholder-afiliado/cpn_008",
  },
];

export const MOCK_COUPONS: Coupon[] = COUPON_SEEDS.map((seed) => ({
  ...seed,
  creditsRequired: COUPON_REDEMPTION_COST,
}));
