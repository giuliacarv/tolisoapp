/**
 * DADOS DEMONSTRATIVOS (MOCK) — CUPONS
 * ---------------------------------------------------------------------------
 * TODO: substituir por consulta ao banco de dados / API.
 * O campo `validated` NUNCA deve ser assumido como verdadeiro por padrão:
 * ele só é true quando houve conferência humana/automatizada registrada em
 * `validatedAt`. Sem isso, a UI exibe "Validação pendente".
 */

/** Custo fixo, em créditos, para resgatar qualquer cupom. */
export const COUPON_REDEMPTION_COST = 3;

export type CouponDiscountType = "percentage" | "fixed" | "shipping";

export interface Coupon {
  id: string;
  store: string;
  title: string;
  description: string;
  /** Código completo — nunca exibido por inteiro antes do resgate autenticado. */
  code: string;
  discountType: CouponDiscountType;
  /** Percentual (0-100), valor em BRL, ou 0 para frete grátis. */
  discountValue: number;
  /** Compra mínima em BRL; null quando não há exigência. */
  minimumPurchase: number | null;
  /** ISO 8601. */
  expiresAt: string;
  validated: boolean;
  /** ISO 8601 da última conferência; null quando nunca validado. */
  validatedAt: string | null;
  terms: string;
  /** Placeholder seguro — nenhum link real de afiliado nesta etapa. */
  affiliateUrl: string;
  creditsRequired: number;
}

type CouponSeed = Omit<Coupon, "creditsRequired">;

const COUPON_SEEDS: CouponSeed[] = [
  {
    id: "cpn_001",
    store: "Shopee",
    title: "15% OFF em pedidos selecionados",
    description: "Desconto aplicado no carrinho para produtos participantes do app.",
    code: "DESCONTAI15",
    discountType: "percentage",
    discountValue: 15,
    minimumPurchase: 120,
    expiresAt: "2026-08-31T23:59:59-03:00",
    validated: true,
    validatedAt: "2026-07-24T09:12:00-03:00",
    terms: "Não cumulativo com outras promoções. Limite de um uso por conta.",
    affiliateUrl: "#placeholder-afiliado/cpn_001",
  },
  {
    id: "cpn_002",
    store: "Amazon",
    title: "R$ 40 de desconto em eletrônicos",
    description: "Válido para itens vendidos e entregues por lojas participantes.",
    code: "ELETRO40",
    discountType: "fixed",
    discountValue: 40,
    minimumPurchase: 249,
    expiresAt: "2026-08-18T23:59:59-03:00",
    validated: true,
    validatedAt: "2026-07-25T14:30:00-03:00",
    terms: "Sujeito à disponibilidade de estoque durante o período promocional.",
    affiliateUrl: "#placeholder-afiliado/cpn_002",
  },
  {
    id: "cpn_003",
    store: "Mercado Livre",
    title: "Frete grátis na primeira compra",
    description: "Frete cortesia para novas contas em produtos com selo Full.",
    code: "FRETEFULL",
    discountType: "shipping",
    discountValue: 0,
    minimumPurchase: 79,
    expiresAt: "2026-09-10T23:59:59-03:00",
    validated: true,
    validatedAt: "2026-07-22T18:05:00-03:00",
    terms: "Exclusivo para contas sem pedidos anteriores. Regiões atendidas pelo Full.",
    affiliateUrl: "#placeholder-afiliado/cpn_003",
  },
  {
    id: "cpn_004",
    store: "Magalu",
    title: "10% OFF em casa e decoração",
    description: "Desconto progressivo aplicado na finalização do pedido.",
    code: "CASA10",
    discountType: "percentage",
    discountValue: 10,
    minimumPurchase: null,
    expiresAt: "2026-08-09T23:59:59-03:00",
    validated: false,
    validatedAt: null,
    terms: "Condições definidas pela loja podem mudar sem aviso prévio.",
    affiliateUrl: "#placeholder-afiliado/cpn_004",
  },
  {
    id: "cpn_005",
    store: "Shopee",
    title: "R$ 20 OFF em beleza e cuidados",
    description: "Aplicável a marcas participantes da categoria beleza.",
    code: "BELEZA20",
    discountType: "fixed",
    discountValue: 20,
    minimumPurchase: 99,
    expiresAt: "2026-08-05T23:59:59-03:00",
    validated: true,
    validatedAt: "2026-07-26T08:40:00-03:00",
    terms: "Quantidade limitada de resgates por dia definida pela loja.",
    affiliateUrl: "#placeholder-afiliado/cpn_005",
  },
  {
    id: "cpn_006",
    store: "Amazon",
    title: "12% OFF em informática",
    description: "Periféricos e acessórios selecionados com desconto extra.",
    code: "INFO12",
    discountType: "percentage",
    discountValue: 12,
    minimumPurchase: 149,
    expiresAt: "2026-08-27T23:59:59-03:00",
    validated: false,
    validatedAt: null,
    terms: "Desconto limitado a um valor máximo definido pela loja.",
    affiliateUrl: "#placeholder-afiliado/cpn_006",
  },
];

export const COUPONS: Coupon[] = COUPON_SEEDS.map((seed) => ({
  ...seed,
  creditsRequired: COUPON_REDEMPTION_COST,
}));

/** "R$ 39,90" no padrão brasileiro. */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

/** "31/08/2026" */
export function formatDateBR(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(parsed);
}

/** Rótulo curto do benefício, derivado do tipo de desconto. */
export function formatDiscountLabel(coupon: Coupon): string {
  switch (coupon.discountType) {
    case "percentage":
      return `${coupon.discountValue}% OFF`;
    case "fixed":
      return `${formatBRL(coupon.discountValue)} OFF`;
    case "shipping":
      return "Frete grátis";
    default:
      return "Desconto";
  }
}

/**
 * Máscara do código: mantém apenas o prefixo visível.
 * "DESCONTAI15" → "DESCO••••". O código completo só é liberado após o
 * resgate autenticado no backend.
 */
export function maskCouponCode(code: string, visibleChars = 5): string {
  const prefix = code.slice(0, visibleChars);
  return `${prefix}${"•".repeat(4)}`;
}
