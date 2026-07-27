/**
 * SERVIÇO DE PRODUTOS
 * ---------------------------------------------------------------------------
 * Fonte de dados atual: `@/data/mockProducts`.
 * TODO(backend): trocar o corpo dos métodos por consultas ao Supabase
 * (`from("products").select()` + filtros equivalentes a `ProductQuery`).
 *
 * A filtragem/ordenação continua acontecendo no cliente nesta fase; a
 * assinatura já aceita os parâmetros que virarão cláusulas SQL depois.
 */

import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { DEMO_CREDIT_BALANCE, buildRedemptionPreview } from "@/domain/credits/credit-rules";
import { filterProducts } from "@/domain/products/filters";
import { sortProducts, type SortId } from "@/domain/products/sorting";
import type { Product, RedemptionPreview } from "@/types";

import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface ProductQuery {
  /** Termo de busca livre (nome, descrição, categoria, loja). */
  term?: string;
  /** Rótulo da categoria; `undefined` = todas. */
  categoryLabel?: string;
  sort?: SortId;
  /** Apenas ofertas marcadas como destaque. */
  featuredOnly?: boolean;
}

export interface ProductService {
  list(query?: ProductQuery): Promise<Product[]>;
  listFeatured(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product | null>;
  /** Prévia informativa de resgate — não debita créditos. */
  previewRedemption(productId: string): Promise<RedemptionPreview>;
}

export const productService: ProductService = {
  async list({ term, categoryLabel, sort, featuredOnly = false }: ProductQuery = {}) {
    let products: Product[] = featuredOnly
      ? MOCK_PRODUCTS.filter((product) => product.featured)
      : [...MOCK_PRODUCTS];

    if (term !== undefined || categoryLabel !== undefined) {
      products = filterProducts(products, { term, categoryLabel });
    }

    if (sort) {
      products = sortProducts(products, sort);
    }

    return resolveMock(products);
  },

  async listFeatured() {
    return productService.list({ featuredOnly: true });
  },

  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de produto obrigatório.");

    const product = MOCK_PRODUCTS.find((candidate) => candidate.id === id);
    if (!product) throw new NotFoundError("Produto", id);

    return resolveMock(product);
  },

  async findBySlug(slug) {
    const product = MOCK_PRODUCTS.find((candidate) => candidate.slug === slug);
    return resolveMock(product ?? null);
  },

  async previewRedemption(productId) {
    const product = await productService.getById(productId);

    return buildRedemptionPreview({
      kind: "product",
      itemId: product.id,
      title: product.name,
      store: product.store,
      creditsRequired: product.creditsRequired,
      balance: DEMO_CREDIT_BALANCE,
    });
  },
};
