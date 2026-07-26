/** Quantidade padrão de itens exibidos por página. */
export const DEFAULT_PAGE_SIZE = 8;

export interface PaginationResult<T> {
  items: T[];
  /** Página efetivamente aplicada (corrigida quando fora do intervalo). */
  safePage: number;
  totalPages: number;
}

/** Recorta uma lista em páginas, sempre devolvendo uma página válida. */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return { items: items.slice(start, start + pageSize), safePage, totalPages };
}
