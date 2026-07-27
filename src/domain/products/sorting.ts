import type { Product } from "@/types";

/** Opções de ordenação disponíveis para a vitrine de ofertas. */
export const SORT_OPTIONS = [
  { id: "recommended", label: "Recomendados" },
  { id: "discount", label: "Maior desconto" },
  { id: "recent", label: "Mais recentes" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]["id"];

/** Comparadores puros, um por critério — evita um switch com múltiplos ramos. */
const COMPARATORS: Record<SortId, (a: Product, b: Product) => number> = {
  recommended: (a, b) => Number(b.featured) - Number(a.featured),
  discount: (a, b) => b.discountPercentage - a.discountPercentage,
  recent: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  "price-asc": (a, b) => a.currentPrice - b.currentPrice,
  "price-desc": (a, b) => b.currentPrice - a.currentPrice,
};

/** Ordena sem mutar a lista original. */
export function sortProducts(products: readonly Product[], sort: SortId): Product[] {
  return [...products].sort(COMPARATORS[sort] ?? COMPARATORS.recommended);
}
