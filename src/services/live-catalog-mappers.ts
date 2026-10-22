import {
  calculateCreditsRequired,
  calculateDiscountPercentage,
} from "@/domain/products/product-rules";
import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";
import type { Category, CategoryIconName, Coupon, Product, Store } from "@/types";

/** Representações do PostgREST (nomes snake_case do banco). */
export interface LiveStoreRow {
  id: string; slug: string; name: string; logo_url: string | null;
  logo_alt: string; external_url: string | null; active: boolean;
}
export interface LiveCategoryRow {
  id: string; slug: string; label: string; description: string;
  icon_name: string; active: boolean;
}
export interface LiveProductRow {
  id: string; slug: string; name: string; description: string;
  image_url: string; store_id: string; category_id: string;
  original_price: number | string; current_price: number | string;
  destination_url: string; affiliate_url: string | null;
  featured: boolean; available: boolean;
  expires_at: string; published_at: string; verified_at: string;
  updated_at: string; gallery: string[] | null;
  highlights: string[] | null; terms: string;
}
export interface LiveCouponRow {
  id: string; slug: string; store_id: string; title: string;
  description: string; discount_type: Coupon["discountType"];
  discount_value: number | string; minimum_purchase: number | string | null;
  expires_at: string; validated_at: string | null; terms: string;
  destination_url: string;
}

const VALID_ICONS: readonly CategoryIconName[] = [
  "smartphone", "home", "sparkles", "shirt", "laptop", "watch",
];

export function mapLiveStore(row: LiveStoreRow): Store {
  return {
    id: row.id, slug: row.slug, name: row.name,
    logoSrc: row.logo_url || "/favicon.png",
    logoAlt: row.logo_alt || row.name,
    link: row.external_url || undefined, active: row.active,
  };
}

export function mapLiveCategory(row: LiveCategoryRow, offerCount = 0): Category {
  const iconName = VALID_ICONS.includes(row.icon_name as CategoryIconName)
    ? (row.icon_name as CategoryIconName) : "sparkles";
  return {
    id: row.id, slug: row.slug, label: row.label,
    description: row.description, iconName, offerCount,
  };
}

export function mapLiveProduct(
  row: LiveProductRow,
  storeName: string,
  categoryLabel: string,
): Product {
  const originalPrice = Number(row.original_price);
  const currentPrice = Number(row.current_price);
  if (!Number.isFinite(originalPrice) || !Number.isFinite(currentPrice) ||
      originalPrice < currentPrice || currentPrice <= 0) {
    throw new Error(`Valores inválidos para produto ${row.id}`);
  }
  return {
    id: row.id, slug: row.slug, name: row.name, description: row.description,
    image: row.image_url, store: storeName, storeId: row.store_id,
    category: categoryLabel, categoryId: row.category_id,
    originalPrice, currentPrice,
    discountPercentage: calculateDiscountPercentage(originalPrice, currentPrice),
    creditsRequired: calculateCreditsRequired(currentPrice),
    affiliateUrl: row.affiliate_url || row.destination_url,
    featured: row.featured, verified: Boolean(row.verified_at),
    available: row.available, expiresAt: row.expires_at,
    publishedAt: row.published_at, updatedAt: row.updated_at,
    gallery: row.gallery || undefined, highlights: row.highlights || undefined,
    terms: row.terms,
  };
}

export function mapLiveCoupon(row: LiveCouponRow, storeName: string): Coupon {
  return {
    id: row.id, slug: row.slug, storeId: row.store_id, store: storeName,
    title: row.title, description: row.description,
    // O banco público não contém códigos: a liberação exigirá backend autenticado.
    code: "", discountType: row.discount_type,
    discountValue: Number(row.discount_value),
    minimumPurchase: row.minimum_purchase == null ? null : Number(row.minimum_purchase),
    expiresAt: row.expires_at,
    validated: Boolean(row.validated_at), checkedAt: row.validated_at,
    terms: row.terms, affiliateUrl: row.destination_url,
    creditsRequired: COUPON_REDEMPTION_COST,
  };
}
