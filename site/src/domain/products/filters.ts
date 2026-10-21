import type { Product } from "@/types";

export interface ProductFilterCriteria {
  /** Termo de busca livre (pode vir com acentos, maiúsculas e espaços extras). */
  term?: string;
  /** Rótulo da categoria; `undefined` significa "todas". */
  categoryLabel?: string;
}

/**
 * Normaliza texto para comparação: remove acentos (NFD + faixa de diacríticos),
 * baixa a caixa e colapsa espaços em branco repetidos.
 * "  Fóne  Bluetooth " → "fone bluetooth"
 */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/** Campos pesquisáveis de um produto, concatenados e normalizados uma única vez. */
function buildSearchIndex(product: Product): string {
  return normalizeText(
    [product.name, product.description, product.category, product.store].join(" "),
  );
}

/**
 * Um produto corresponde ao termo quando TODAS as palavras digitadas aparecem
 * em algum campo pesquisável — busca tolerante à ordem das palavras.
 */
function matchesTerm(product: Product, tokens: readonly string[]): boolean {
  if (tokens.length === 0) return true;
  const index = buildSearchIndex(product);
  return tokens.every((token) => index.includes(token));
}

function matchesCategory(product: Product, categoryLabel?: string): boolean {
  return categoryLabel === undefined || product.category === categoryLabel;
}

/** Filtra produtos por termo e categoria (critérios combinados). Função pura. */
export function filterProducts(
  products: readonly Product[],
  { term = "", categoryLabel }: ProductFilterCriteria,
): Product[] {
  const tokens = normalizeText(term).split(" ").filter(Boolean);
  return products.filter(
    (product) => matchesCategory(product, categoryLabel) && matchesTerm(product, tokens),
  );
}
