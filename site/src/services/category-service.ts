/**
 * SERVIÇO DE CATEGORIAS
 * ---------------------------------------------------------------------------
 * Fonte de dados atual: `@/data/mockCategories`.
 * TODO(backend): trocar o corpo dos métodos por consultas ao Supabase.
 */

import { MOCK_CATEGORIES } from "@/data/mockCategories";
import type { Category } from "@/types";

import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface CategoryService {
  list(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category | null>;
}

export const categoryService: CategoryService = {
  async list() {
    return resolveMock(MOCK_CATEGORIES);
  },

  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de categoria obrigatório.");

    const category = MOCK_CATEGORIES.find((candidate) => candidate.id === id);
    if (!category) throw new NotFoundError("Categoria", id);

    return resolveMock(category);
  },

  async findBySlug(slug) {
    const category = MOCK_CATEGORIES.find((candidate) => candidate.slug === slug);
    return resolveMock(category ?? null);
  },
};
