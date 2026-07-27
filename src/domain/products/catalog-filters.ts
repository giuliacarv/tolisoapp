/**
 * REGRAS DE FILTRAGEM DO CATÁLOGO (/ofertas)
 * ---------------------------------------------------------------------------
 * Funções puras, sem React e sem dependência de dados mockados.
 *
 * Motivo de existir separado de `filters.ts`: a homepage usa uma filtragem
 * simples (termo + uma categoria). O catálogo precisa de facetas combinadas —
 * múltiplas categorias, lojas, faixas de preço, créditos, desconto mínimo e
 * verificação. Manter as duas responsabilidades separadas evita inflar o
 * caminho crítico da home com regras que só o catálogo usa.
 *
 * Quando o Supabase entrar, cada faceta vira uma cláusula `WHERE`; os ids
 * abaixo (`ate-50`, `1`, ...) já são estáveis e serializáveis para virarem
 * parâmetros de query.
 */

import type { Product } from "@/types";

import { normalizeText } from "./filters";

/** Faixa de preço em BRL. `max: null` = sem limite superior. */
export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export const PRICE_RANGES: readonly PriceRange[] = [
  { id: "ate-50", label: "Até R$ 50", min: 0, max: 50 },
  { id: "50-100", label: "De R$ 50 a R$ 100", min: 50, max: 100 },
  { id: "100-250", label: "De R$ 100 a R$ 250", min: 100, max: 250 },
  { id: "acima-250", label: "Acima de R$ 250", min: 250, max: null },
];

/** Custos possíveis segundo a regra de créditos (até R$ 50 = 1; acima = 2). */
export const CREDIT_OPTIONS = [
  { id: 1, label: "1 crédito" },
  { id: 2, label: "2 créditos" },
] as const;

/** Degraus de desconto mínimo. `0` significa "qualquer desconto". */
export const MIN_DISCOUNT_OPTIONS = [
  { id: 0, label: "Qualquer desconto" },
  { id: 10, label: "10% ou mais" },
  { id: 25, label: "25% ou mais" },
  { id: 40, label: "40% ou mais" },
  { id: 50, label: "50% ou mais" },
] as const;

/** Ordenação exposta no catálogo (rótulos próprios desta página). */
export const CATALOG_SORT_OPTIONS = [
  { id: "relevance", label: "Mais relevantes" },
  { id: "discount", label: "Maior desconto" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
  { id: "recent", label: "Mais recentes" },
] as const;

export type CatalogSortId = (typeof CATALOG_SORT_OPTIONS)[number]["id"];

/** Estado completo das facetas. Arrays vazios = faceta inativa. */
export interface CatalogFilters {
  term: string;
  categoryIds: readonly string[];
  storeIds: readonly string[];
  priceRangeIds: readonly string[];
  credits: readonly number[];
  /** Percentual mínimo de desconto (0 = sem exigência). */
  minDiscount: number;
  verifiedOnly: boolean;
}

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  term: "",
  categoryIds: [],
  storeIds: [],
  priceRangeIds: [],
  credits: [],
  minDiscount: 0,
  verifiedOnly: false,
};

/** Há alguma faceta ou busca ativa? Controla o botão "Limpar filtros". */
export function hasActiveFilters(filters: CatalogFilters): boolean {
  return (
    filters.term.trim() !== "" ||
    filters.categoryIds.length > 0 ||
    filters.storeIds.length > 0 ||
    filters.priceRangeIds.length > 0 ||
    filters.credits.length > 0 ||
    filters.minDiscount > 0 ||
    filters.verifiedOnly
  );
}

/** Campos pesquisáveis: nome, descrição, categoria e loja. */
function buildSearchIndex(product: Product): string {
  return normalizeText(
    [product.name, product.description, product.category, product.store].join(" "),
  );
}

/**
 * Preço dentro de pelo menos uma faixa selecionada.
 * Intervalo semiaberto `[min, max)` para que R$ 50,00 caia apenas em "Até R$ 50"
 * e nunca seja contado duas vezes.
 */
function matchesPriceRange(product: Product, rangeIds: readonly string[]): boolean {
  if (rangeIds.length === 0) return true;

  return rangeIds.some((rangeId) => {
    const range = PRICE_RANGES.find((candidate) => candidate.id === rangeId);
    if (!range) return false;

    const price = product.currentPrice;
    const aboveMin = range.id === "ate-50" ? price >= range.min : price > range.min;
    const belowMax = range.max === null || price <= range.max;
    return aboveMin && belowMax;
  });
}

/**
 * Aplica todas as facetas. Semântica: OR dentro de cada faceta, AND entre
 * facetas — o comportamento que o usuário espera de um filtro de e-commerce.
 */
export function applyCatalogFilters(
  products: readonly Product[],
  filters: CatalogFilters,
): Product[] {
  const tokens = normalizeText(filters.term).split(" ").filter(Boolean);

  return products.filter((product) => {
    if (tokens.length > 0) {
      const index = buildSearchIndex(product);
      if (!tokens.every((token) => index.includes(token))) return false;
    }

    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(product.categoryId)) {
      return false;
    }

    if (filters.storeIds.length > 0 && !filters.storeIds.includes(product.storeId)) {
      return false;
    }

    if (!matchesPriceRange(product, filters.priceRangeIds)) return false;

    if (filters.credits.length > 0 && !filters.credits.includes(product.creditsRequired)) {
      return false;
    }

    if (product.discountPercentage < filters.minDiscount) return false;

    if (filters.verifiedOnly && !product.verified) return false;

    return true;
  });
}

/** Comparadores puros do catálogo, um por critério. */
const COMPARATORS: Record<CatalogSortId, (a: Product, b: Product) => number> = {
  // Relevância: destaques primeiro, desempate pelo maior desconto.
  relevance: (a, b) =>
    Number(b.featured) - Number(a.featured) || b.discountPercentage - a.discountPercentage,
  discount: (a, b) => b.discountPercentage - a.discountPercentage,
  "price-asc": (a, b) => a.currentPrice - b.currentPrice,
  "price-desc": (a, b) => b.currentPrice - a.currentPrice,
  recent: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
};

/** Ordena sem mutar a lista recebida. */
export function sortCatalog(products: readonly Product[], sort: CatalogSortId): Product[] {
  return [...products].sort(COMPARATORS[sort] ?? COMPARATORS.relevance);
}
