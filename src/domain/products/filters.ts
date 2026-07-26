import type { Product } from "@/data/products";

export interface ProductFilterCriteria {
  /** Termo de busca livre (já pode vir com espaços/maiúsculas). */
  term?: string;
  /** Rótulo da categoria; `undefined` significa "todas". */
  categoryLabel?: string;
}

/** Campos considerados na busca textual. */
function matchesTerm(product: Product, term: string): boolean {
  if (term === "") return true;
  return [product.name, product.store, product.category].some((field) =>
    field.toLowerCase().includes(term),
  );
}

function matchesCategory(product: Product, categoryLabel?: string): boolean {
  return categoryLabel === undefined || product.category === categoryLabel;
}

/** Filtra produtos por termo e categoria. Função pura e testável. */
export function filterProducts(
  products: readonly Product[],
  { term = "", categoryLabel }: ProductFilterCriteria,
): Product[] {
  const normalizedTerm = term.trim().toLowerCase();
  return products.filter(
    (product) => matchesCategory(product, categoryLabel) && matchesTerm(product, normalizedTerm),
  );
}
