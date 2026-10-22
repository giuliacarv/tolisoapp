/** Categorias reais com contagem derivada de ofertas publicadas. */
import { MOCK_CATEGORIES } from "@/data/mockCategories";
import type { Category } from "@/types";

import { mapLiveCategory, type LiveCategoryRow } from "./live-catalog-mappers";
import { fetchPublicRows } from "./live-catalog-source";
import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface CategoryService {
  list(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category | null>;
}

async function loadCategories(): Promise<Category[]> {
  const rows = await fetchPublicRows<LiveCategoryRow>("categories");
  if (rows === null) return resolveMock(MOCK_CATEGORIES);
  const publishedProducts = await fetchPublicRows<{ category_id: string }>(
    "products", "category_id",
  );
  const counts = new Map<string, number>();
  for (const product of publishedProducts ?? []) {
    counts.set(product.category_id, (counts.get(product.category_id) ?? 0) + 1);
  }
  return rows.map((row) => mapLiveCategory(row, counts.get(row.id) ?? 0));
}

export const categoryService: CategoryService = {
  list: loadCategories,
  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de categoria obrigatório.");
    const category = (await loadCategories()).find((item) => item.id === id);
    if (!category) throw new NotFoundError("Categoria", id);
    return category;
  },
  async findBySlug(slug) {
    if (!slug.trim()) throw new ValidationError("Slug de categoria obrigatório.");
    return (await loadCategories()).find((item) => item.slug === slug) ?? null;
  },
};
