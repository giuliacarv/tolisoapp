/** Produtos públicos: Supabase quando configurado; mocks apenas em ambiente sem backend. */
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { DEMO_CREDIT_BALANCE, buildRedemptionPreview } from "@/domain/credits/credit-rules";
import { filterProducts } from "@/domain/products/filters";
import { sortProducts, type SortId } from "@/domain/products/sorting";
import type { Product, RedemptionPreview } from "@/types";

import {
  mapLiveProduct,
  type LiveCategoryRow, type LiveProductRow, type LiveStoreRow,
} from "./live-catalog-mappers";
import { fetchPublicRows } from "./live-catalog-source";
import { NotFoundError, ServiceError, ValidationError, resolveMock } from "./service-utils";

export interface ProductQuery {
  term?: string;
  categoryLabel?: string;
  sort?: SortId;
  featuredOnly?: boolean;
}

export interface ProductService {
  list(query?: ProductQuery): Promise<Product[]>;
  listFeatured(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product | null>;
  listByIds(ids: string[]): Promise<Product[]>;
  listRelated(productId: string, limit?: number): Promise<Product[]>;
  previewRedemption(productId: string): Promise<RedemptionPreview>;
}

async function loadProducts(): Promise<Product[]> {
  const rows = await fetchPublicRows<LiveProductRow>("products");
  if (rows === null) return resolveMock(MOCK_PRODUCTS);
  if (rows.length === 0) return [];

  const [stores, categories] = await Promise.all([
    fetchPublicRows<LiveStoreRow>("stores"),
    fetchPublicRows<LiveCategoryRow>("categories"),
  ]);
  if (!stores || !categories) {
    throw new ServiceError("Não foi possível carregar as referências do catálogo.");
  }

  const storeNames = new Map(stores.map((s) => [s.id, s.name]));
  const categoryLabels = new Map(categories.map((c) => [c.id, c.label]));

  return rows.map((row) => {
    const storeName = storeNames.get(row.store_id);
    const categoryLabel = categoryLabels.get(row.category_id);
    if (!storeName || !categoryLabel) {
      throw new ServiceError(`Produto sem loja ou categoria ativa: ${row.id}`);
    }
    return mapLiveProduct(row, storeName, categoryLabel);
  });
}

export const productService: ProductService = {
  async list({ term, categoryLabel, sort, featuredOnly = false }: ProductQuery = {}) {
    let products = await loadProducts();
    if (featuredOnly) products = products.filter((p) => p.featured);
    if (term !== undefined || categoryLabel !== undefined) {
      products = filterProducts(products, { term, categoryLabel });
    }
    if (sort) products = sortProducts(products, sort);
    return products;
  },

  async listFeatured() {
    return productService.list({ featuredOnly: true });
  },

  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de produto obrigatório.");
    const item = (await loadProducts()).find((p) => p.id === id);
    if (!item) throw new NotFoundError("Produto", id);
    return item;
  },

  async findBySlug(slug) {
    if (!slug.trim()) throw new ValidationError("Slug de produto obrigatório.");
    return (await loadProducts()).find((p) => p.slug === slug) ?? null;
  },

  async listByIds(ids) {
    if (ids.length === 0) return [];
    const catalog = await loadProducts();
    const byId = new Map(catalog.map((p) => [p.id, p]));
    return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
  },

  async listRelated(productId, limit = 4) {
    const catalog = await loadProducts();
    const current = catalog.find((p) => p.id === productId);
    if (!current) return [];
    return catalog.filter((p) => p.id !== current.id && p.categoryId === current.categoryId)
      .slice(0, Math.max(0, limit));
  },

  async previewRedemption(productId) {
    const product = await productService.getById(productId);
    return buildRedemptionPreview({
      kind: "product", itemId: product.id, title: product.name, store: product.store,
      creditsRequired: product.creditsRequired, balance: DEMO_CREDIT_BALANCE,
    });
  },
};
