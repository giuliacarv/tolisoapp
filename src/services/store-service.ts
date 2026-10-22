/** Consulta de lojas visíveis. Nunca mistura registros reais e fictícios. */
import { MOCK_STORES } from "@/data/mockStores";
import type { Store } from "@/types";

import { mapLiveStore, type LiveStoreRow } from "./live-catalog-mappers";
import { fetchPublicRows } from "./live-catalog-source";
import { NotFoundError, ValidationError, resolveMock } from "./service-utils";

export interface StoreQuery {
  activeOnly?: boolean;
}
export interface StoreService {
  list(query?: StoreQuery): Promise<Store[]>;
  getById(id: string): Promise<Store>;
  findBySlug(slug: string): Promise<Store | null>;
}

async function loadStores(): Promise<Store[]> {
  const rows = await fetchPublicRows<LiveStoreRow>("stores");
  return rows === null ? resolveMock(MOCK_STORES) : rows.map(mapLiveStore);
}

export const storeService: StoreService = {
  async list({ activeOnly = false }: StoreQuery = {}) {
    const stores = await loadStores();
    return activeOnly ? stores.filter((store) => store.active) : stores;
  },
  async getById(id) {
    if (!id.trim()) throw new ValidationError("Id de loja obrigatório.");
    const store = (await loadStores()).find((item) => item.id === id);
    if (!store) throw new NotFoundError("Loja", id);
    return store;
  },
  async findBySlug(slug) {
    if (!slug.trim()) throw new ValidationError("Slug de loja obrigatório.");
    return (await loadStores()).find((item) => item.slug === slug) ?? null;
  },
};
