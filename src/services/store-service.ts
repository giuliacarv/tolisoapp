/**
 * SERVIÇO DE LOJAS
 * ---------------------------------------------------------------------------
 * Fonte de dados atual: `@/data/mockStores`.
 * TODO(backend): trocar o corpo dos métodos por consultas ao Supabase.
 */

import { MOCK_STORES } from "@/data/mockStores";
import type { Store } from "@/types";

import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface StoreQuery {
  /** Apenas lojas ativas na vitrine (usado pelo carrossel de logotipos). */
  activeOnly?: boolean;
}

export interface StoreService {
  list(query?: StoreQuery): Promise<Store[]>;
  getById(id: string): Promise<Store>;
  findBySlug(slug: string): Promise<Store | null>;
}

export const storeService: StoreService = {
  async list({ activeOnly = false }: StoreQuery = {}) {
    const stores = activeOnly ? MOCK_STORES.filter((store) => store.active) : MOCK_STORES;
    return resolveMock(stores);
  },

  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de loja obrigatório.");

    const store = MOCK_STORES.find((candidate) => candidate.id === id);
    if (!store) throw new NotFoundError("Loja", id);

    return resolveMock(store);
  },

  async findBySlug(slug) {
    const store = MOCK_STORES.find((candidate) => candidate.slug === slug);
    return resolveMock(store ?? null);
  },
};
