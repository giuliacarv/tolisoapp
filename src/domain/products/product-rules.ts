/**
 * REGRAS DE NEGÓCIO — PRODUTOS
 * ---------------------------------------------------------------------------
 * Funções puras, sem dependência de dados mockados nem de React. Quando o
 * backend existir, estas mesmas regras continuam válidas (e podem ser
 * espelhadas no banco como colunas geradas ou políticas).
 */

import {
  PRODUCT_CREDIT_COST_HIGH,
  PRODUCT_CREDIT_COST_LOW,
  PRODUCT_PRICE_THRESHOLD_BRL,
} from "@/config/business-rules";
import type { Product } from "@/types";

/** Motivo pelo qual uma oferta não pode ser resgatada (ou `null` se ativa). */
export type ProductUnavailableReason = "expired" | "unavailable";

/**
 * Regra de créditos do DESCONTAI.
 * - Preço atual até R$ 50,00 (inclusive) → 1 crédito
 * - Preço atual acima de R$ 50,00 → 2 créditos
 *
 * Usamos centavos arredondados para evitar imprecisão de ponto flutuante
 * (ex.: 50.005 não deve virar 2 créditos indevidamente).
 */
export function calculateCreditsRequired(currentPrice: number): number {
  if (!Number.isFinite(currentPrice) || currentPrice < 0) {
    // Entrada inválida: fallback conservador para o menor custo possível.
    return PRODUCT_CREDIT_COST_LOW;
  }

  const cents = Math.round(currentPrice * 100);
  const thresholdCents = Math.round(PRODUCT_PRICE_THRESHOLD_BRL * 100);
  return cents <= thresholdCents ? PRODUCT_CREDIT_COST_LOW : PRODUCT_CREDIT_COST_HIGH;
}

/** Percentual de desconto arredondado a partir dos preços. */
export function calculateDiscountPercentage(
  originalPrice: number,
  currentPrice: number,
): number {
  if (originalPrice <= 0 || currentPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/** Economia absoluta em BRL (nunca negativa). */
export function calculateSavings(originalPrice: number, currentPrice: number): number {
  const savings = originalPrice - currentPrice;
  return savings > 0 ? savings : 0;
}

/**
 * Avalia se a oferta ainda pode ser resgatada.
 * Datas inválidas são tratadas como "não expiradas" para não bloquear
 * indevidamente uma oferta por erro de dado.
 */
export function getProductUnavailableReason(
  product: Pick<Product, "expiresAt" | "available">,
  now: Date = new Date(),
): ProductUnavailableReason | null {
  if (product.available === false) return "unavailable";

  const expiresAt = new Date(product.expiresAt).getTime();
  if (Number.isFinite(expiresAt) && expiresAt < now.getTime()) return "expired";

  return null;
}

/** Rótulo curto exibido no card para ofertas não resgatáveis. */
export function formatUnavailableLabel(reason: ProductUnavailableReason): string {
  return reason === "expired" ? "Oferta expirada" : "Indisponível";
}
