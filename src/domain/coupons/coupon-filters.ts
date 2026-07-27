/**
 * REGRAS DE FILTRAGEM DE CUPONS (/cupons)
 * ---------------------------------------------------------------------------
 * Funções puras, sem React e sem acesso a dados mockados.
 *
 * Os ids das facetas (`ate-100`, `percentage`, `validated`, ...) são estáveis e
 * serializáveis: quando o Supabase entrar, cada faceta vira uma cláusula
 * `WHERE` sem precisar tocar na interface.
 *
 * Nada aqui revela o código completo de um cupom nem afirma que ele funciona:
 * o status é apenas o resultado da regra de domínio `getCouponStatus`.
 */

import { normalizeText } from "@/domain/products/filters";
import { formatDiscountLabel, getCouponStatus } from "@/domain/coupons/coupon-rules";
import type { Coupon, CouponDiscountType, CouponStatus } from "@/types";

/** Rótulos dos tipos de benefício expostos no painel de filtros. */
export const DISCOUNT_TYPE_OPTIONS: readonly {
  id: CouponDiscountType;
  label: string;
}[] = [
  { id: "percentage", label: "Percentual" },
  { id: "fixed", label: "Valor fixo" },
  { id: "shipping", label: "Frete grátis" },
  { id: "special", label: "Benefício especial" },
];

/** Rótulos dos estados calculados do cupom. */
export const STATUS_OPTIONS: readonly { id: CouponStatus; label: string }[] = [
  { id: "validated", label: "Validado" },
  { id: "pending", label: "Validação pendente" },
  { id: "expired", label: "Expirado" },
];

/** Faixas de compra mínima em BRL. `max: null` = sem limite superior. */
export interface MinimumPurchaseRange {
  id: string;
  label: string;
  /** Limite superior inclusivo; `null` quando a faixa é aberta. */
  max: number | null;
  /** Limite inferior exclusivo. */
  min: number;
}

export const MINIMUM_PURCHASE_RANGES: readonly MinimumPurchaseRange[] = [
  { id: "ate-100", label: "Até R$ 100", min: 0, max: 100 },
  { id: "100-200", label: "De R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "acima-200", label: "Acima de R$ 200", min: 200, max: null },
];

/** Ordenação exposta na página de cupons. */
export const COUPON_SORT_OPTIONS = [
  { id: "relevance", label: "Mais relevantes" },
  { id: "benefit", label: "Maior benefício" },
  { id: "minimum-asc", label: "Menor compra mínima" },
  { id: "expiring", label: "Expiram primeiro" },
  { id: "checked", label: "Verificados recentemente" },
] as const;

export type CouponSortId = (typeof COUPON_SORT_OPTIONS)[number]["id"];

/** Estado completo das facetas. Arrays vazios = faceta inativa. */
export interface CouponFilters {
  term: string;
  storeIds: readonly string[];
  discountTypes: readonly CouponDiscountType[];
  statuses: readonly CouponStatus[];
  minimumRangeIds: readonly string[];
  /** Apenas cupons sem exigência de compra mínima. */
  noMinimumOnly: boolean;
}

export const EMPTY_COUPON_FILTERS: CouponFilters = {
  term: "",
  storeIds: [],
  discountTypes: [],
  statuses: [],
  minimumRangeIds: [],
  noMinimumOnly: false,
};

export function hasActiveCouponFilters(filters: CouponFilters): boolean {
  return (
    filters.term.trim() !== "" ||
    filters.storeIds.length > 0 ||
    filters.discountTypes.length > 0 ||
    filters.statuses.length > 0 ||
    filters.minimumRangeIds.length > 0 ||
    filters.noMinimumOnly
  );
}

/** Campos pesquisáveis: loja, título, descrição e rótulo do benefício. */
function buildSearchIndex(coupon: Coupon): string {
  return normalizeText(
    [coupon.store, coupon.title, coupon.description, formatDiscountLabel(coupon)].join(" "),
  );
}

/** Compra mínima dentro de pelo menos uma faixa selecionada. */
function matchesMinimumRange(coupon: Coupon, rangeIds: readonly string[]): boolean {
  if (rangeIds.length === 0) return true;

  // Sem compra mínima só aparece pela faceta dedicada, nunca por uma faixa.
  if (coupon.minimumPurchase === null) return false;

  return rangeIds.some((rangeId) => {
    const range = MINIMUM_PURCHASE_RANGES.find((candidate) => candidate.id === rangeId);
    if (!range) return false;

    const value = coupon.minimumPurchase as number;
    const aboveMin = range.id === "ate-100" ? value >= range.min : value > range.min;
    const belowMax = range.max === null || value <= range.max;
    return aboveMin && belowMax;
  });
}

/**
 * Aplica todas as facetas: OR dentro de cada faceta, AND entre facetas.
 * `now` é injetável para tornar a função testável de forma determinística.
 */
export function applyCouponFilters(
  coupons: readonly Coupon[],
  filters: CouponFilters,
  now: Date = new Date(),
): Coupon[] {
  const tokens = normalizeText(filters.term).split(" ").filter(Boolean);

  return coupons.filter((coupon) => {
    if (tokens.length > 0) {
      const index = buildSearchIndex(coupon);
      if (!tokens.every((token) => index.includes(token))) return false;
    }

    if (filters.storeIds.length > 0 && !filters.storeIds.includes(coupon.storeId)) return false;

    if (
      filters.discountTypes.length > 0 &&
      !filters.discountTypes.includes(coupon.discountType)
    ) {
      return false;
    }

    if (
      filters.statuses.length > 0 &&
      !filters.statuses.includes(getCouponStatus(coupon, now))
    ) {
      return false;
    }

    if (filters.noMinimumOnly && coupon.minimumPurchase !== null) return false;

    if (!matchesMinimumRange(coupon, filters.minimumRangeIds)) return false;

    return true;
  });
}

/**
 * Peso comparável do benefício.
 * Percentual e valor fixo não são grandezas equivalentes; usamos uma escala
 * conservadora apenas para ordenar a vitrine — nenhum valor é apresentado
 * ao usuário como cálculo real de economia.
 */
function benefitWeight(coupon: Coupon): number {
  switch (coupon.discountType) {
    case "percentage":
      return coupon.discountValue * 2;
    case "fixed":
      return coupon.discountValue;
    case "shipping":
      return 10;
    case "special":
      return 5;
    default:
      return 0;
  }
}

/** Cupons sem compra mínima vêm primeiro em "Menor compra mínima". */
function minimumWeight(coupon: Coupon): number {
  return coupon.minimumPurchase ?? -1;
}

function time(value: string | null): number {
  if (!value) return Number.NaN;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Number.NaN : parsed;
}

const COMPARATORS: Record<CouponSortId, (a: Coupon, b: Coupon) => number> = {
  // Relevância: validados primeiro, expirados por último, depois o benefício.
  relevance: (a, b) => {
    const rank = (coupon: Coupon) => {
      const status = getCouponStatus(coupon);
      if (status === "validated") return 0;
      if (status === "pending") return 1;
      return 2;
    };
    return rank(a) - rank(b) || benefitWeight(b) - benefitWeight(a);
  },
  benefit: (a, b) => benefitWeight(b) - benefitWeight(a),
  "minimum-asc": (a, b) => minimumWeight(a) - minimumWeight(b),
  expiring: (a, b) => time(a.expiresAt) - time(b.expiresAt),
  // Nunca verificados vão para o fim da lista.
  checked: (a, b) => {
    const left = time(a.checkedAt);
    const right = time(b.checkedAt);
    if (Number.isNaN(left) && Number.isNaN(right)) return 0;
    if (Number.isNaN(left)) return 1;
    if (Number.isNaN(right)) return -1;
    return right - left;
  },
};

export function sortCoupons(coupons: readonly Coupon[], sort: CouponSortId): Coupon[] {
  return [...coupons].sort(COMPARATORS[sort] ?? COMPARATORS.relevance);
}
