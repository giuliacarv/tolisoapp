/**
 * REGRAS DE NEGÓCIO — CUPONS
 * ---------------------------------------------------------------------------
 * Funções puras. Nenhum código exibido aqui é real: a máscara existe
 * justamente para que o código completo só possa vir do backend, após
 * resgate autenticado.
 */

import { formatBRL } from "@/lib/format";
import type { Coupon, CouponStatus } from "@/types";

/** Custo fixo, em créditos, para resgatar qualquer cupom. */
export const COUPON_REDEMPTION_COST = 3;

/**
 * Estado do cupom. A expiração tem prioridade sobre a validação:
 * um cupom conferido no passado, mas vencido, continua expirado.
 */
export function getCouponStatus(
  coupon: Pick<Coupon, "expiresAt" | "validated" | "checkedAt">,
  now: Date = new Date(),
): CouponStatus {
  const expiresAt = new Date(coupon.expiresAt);
  if (!Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < now.getTime()) {
    return "expired";
  }
  return coupon.validated && coupon.checkedAt ? "validated" : "pending";
}

/** Rótulo curto do benefício, derivado do tipo de desconto. */
export function formatDiscountLabel(
  coupon: Pick<Coupon, "discountType" | "discountValue">,
): string {
  switch (coupon.discountType) {
    case "percentage":
      return `${coupon.discountValue}% OFF`;
    case "fixed":
      return `${formatBRL(coupon.discountValue)} OFF`;
    case "shipping":
      return "Frete grátis";
    case "special":
      return "Benefício especial";
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
