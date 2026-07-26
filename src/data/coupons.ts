/**
 * DADOS DEMONSTRATIVOS (MOCK) — CUPONS
 * ---------------------------------------------------------------------------
 * TODO: substituir por consulta ao banco de dados / API.
 *
 * Regras importantes desta etapa:
 * - Nenhum código aqui é real; todos são fictícios e servem apenas para
 *   ilustrar a interface. Nunca afirme que funcionam em lojas reais.
 * - `validated` só é true quando houve conferência registrada em `checkedAt`.
 *   Sem isso, a UI exibe "Validação pendente".
 * - Cupons com `expiresAt` no passado são tratados como "Expirado",
 *   independentemente do valor de `validated`.
 */

/** Custo fixo, em créditos, para resgatar qualquer cupom. */
export const COUPON_REDEMPTION_COST = 3;

export type CouponDiscountType = "percentage" | "fixed" | "shipping";

/** Estados possíveis exibidos no card. */
export type CouponStatus = "validated" | "pending" | "expired";

export interface Coupon {
  id: string;
  store: string;
  title: string;
  description: string;
  /** Código FICTÍCIO — nunca exibido por inteiro antes do resgate autenticado. */
  code: string;
  discountType: CouponDiscountType;
  /** Percentual (0-100), valor em BRL, ou 0 para frete grátis. */
  discountValue: number;
  /** Compra mínima em BRL; null quando não há exigência. */
  minimumPurchase: number | null;
  /** ISO 8601 — validade informada pela loja. */
  expiresAt: string;
  validated: boolean;
  /** ISO 8601 da última verificação; null quando nunca verificado. */
  checkedAt: string | null;
  terms: string;
  /** Placeholder seguro — nenhum link real de afiliado nesta etapa. */
  affiliateUrl: string;
  creditsRequired: number;
}

type CouponSeed = Omit<Coupon, "creditsRequired">;

const COUPON_SEEDS: CouponSeed[] = [
  {
    id: "cpn_001",
    store: "Amazon",
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

/**
 * Estado do cupom. A expiração tem prioridade sobre a validação:
 * um cupom conferido no passado, mas vencido, continua expirado.
 */
export function getCouponStatus(coupon: Coupon, now: Date = new Date()): CouponStatus {
  const expiresAt = new Date(coupon.expiresAt);
  if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < now.getTime()) {
    return "expired";
  }
  return coupon.validated && coupon.checkedAt ? "validated" : "pending";
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
 * "DESCONAMZ10" → "DESCON••••". O código completo só é liberado após o
 * resgate autenticado no backend.
 */
export function maskCouponCode(code: string, visibleChars = 6): string {
  const prefix = code.slice(0, visibleChars);
  return `${prefix}${"•".repeat(4)}`;
}
