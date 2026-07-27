/**
 * FÁBRICA DE QUERIES (TanStack Query)
 * ---------------------------------------------------------------------------
 * Padrão: Factory + Single Source of Truth para chaves de cache.
 *
 * Por que existe:
 * 1. Deduplicação — a home monta `productService.list()` em três componentes
 *    distintos. Com chaves estáveis, o Query executa a leitura UMA vez.
 * 2. Stale-While-Revalidate — o dado em cache é servido de imediato e
 *    revalidado em segundo plano (ver `defaultOptions` em `src/router.tsx`).
 * 3. Corrida de requisições — o Query descarta respostas fora de ordem por
 *    chave, eliminando a necessidade de tokens manuais nos componentes.
 *
 * Quando o Supabase entrar, apenas `queryFn` muda; chaves e consumidores não.
 */

import { queryOptions } from "@tanstack/react-query";

import { categoryService } from "./category-service";
import { couponService, type CouponQuery } from "./coupon-service";
import { productService, type ProductQuery } from "./product-service";
import { storeService, type StoreQuery } from "./store-service";
import type { Category, Coupon, Product, Store } from "@/types";

const EMPTY_PRODUCTS: Product[] = [];
const EMPTY_COUPONS: Coupon[] = [];

/** Namespace das chaves — evita colisão e permite invalidação por prefixo. */
export const queryKeys = {
  products: ["products"] as const,
  categories: ["categories"] as const,
  stores: ["stores"] as const,
  coupons: ["coupons"] as const,
};

export const productQueries = {
  list: (query: ProductQuery = {}) =>
    queryOptions<Product[]>({
      queryKey: [...queryKeys.products, "list", query],
      queryFn: () => productService.list(query),
    }),

  bySlug: (slug: string) =>
    queryOptions<Product | null>({
      queryKey: [...queryKeys.products, "slug", slug],
      queryFn: () => productService.findBySlug(slug),
    }),

  /**
   * `ids` entra na chave já normalizado: a ordem do array é significativa
   * para a UI (mais recentes primeiro), então não é ordenado.
   */
  byIds: (ids: readonly string[]) =>
    queryOptions<Product[]>({
      queryKey: [...queryKeys.products, "ids", ids],
      queryFn: () =>
        ids.length === 0 ? Promise.resolve(EMPTY_PRODUCTS) : productService.listByIds([...ids]),
    }),

  /** `productId` nulo resolve vazio — evita `enabled:false` e estados ambíguos. */
  related: (productId: string | null, limit = 4) =>
    queryOptions<Product[]>({
      queryKey: [...queryKeys.products, "related", productId, limit],
      queryFn: () =>
        productId ? productService.listRelated(productId, limit) : Promise.resolve(EMPTY_PRODUCTS),
    }),
};

export const categoryQueries = {
  list: () =>
    queryOptions<Category[]>({
      queryKey: [...queryKeys.categories, "list"],
      queryFn: () => categoryService.list(),
    }),
};

export const storeQueries = {
  list: (query: StoreQuery = {}) =>
    queryOptions<Store[]>({
      queryKey: [...queryKeys.stores, "list", query],
      queryFn: () => storeService.list(query),
    }),
};

export const couponQueries = {
  list: (query: CouponQuery = {}) =>
    queryOptions<Coupon[]>({
      queryKey: [...queryKeys.coupons, "list", query],
      queryFn: () => couponService.list(query),
    }),

  bySlug: (slug: string) =>
    queryOptions<Coupon | null>({
      queryKey: [...queryKeys.coupons, "slug", slug],
      queryFn: () => couponService.findBySlug(slug),
    }),

  byStore: (couponId: string | null, limit = 3) =>
    queryOptions<Coupon[]>({
      queryKey: [...queryKeys.coupons, "store", couponId, limit],
      queryFn: () =>
        couponId ? couponService.listByStore(couponId, limit) : Promise.resolve(EMPTY_COUPONS),
    }),
};
