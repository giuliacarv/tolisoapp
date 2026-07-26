import { SORT_OPTIONS, type SortId } from "@/domain/products/sorting";

import { chipActive, chipBase, chipIdle } from "./primitives";

// Reexports de compatibilidade — a lógica vive em `@/domain/products`.
export { SORT_OPTIONS, sortProducts, type SortId } from "@/domain/products/sorting";
export { DEFAULT_PAGE_SIZE as PAGE_SIZE } from "@/domain/products/pagination";

export interface SortSelectProps {
  value: SortId;
  onValueChange: (value: SortId) => void;
}

/** Seletor de ordenação acessível (label associado ao select nativo). */
export function SortSelect({ value, onValueChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ordenar-ofertas" className="text-xs text-muted-foreground">
        Ordenar por
      </label>
      <select
        id="ordenar-ofertas"
        value={value}
        onChange={(event) => onValueChange(event.target.value as SortId)}
        className="min-h-11 rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground transition-colors duration-200 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const pageButton = `${chipBase} min-w-11 justify-center px-3 text-xs disabled:cursor-not-allowed disabled:opacity-40`;

/** Paginação numérica simples e responsiva. */
export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Paginação das ofertas" className="mt-8 flex flex-wrap justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${chipIdle} ${pageButton}`}
      >
        Anterior
      </button>

      {pages.map((item) => {
        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            aria-current={isActive ? "page" : undefined}
            aria-label={`Página ${item}`}
            onClick={() => onPageChange(item)}
            className={`${isActive ? chipActive : chipIdle} ${pageButton}`}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`${chipIdle} ${pageButton}`}
      >
        Próxima
      </button>
    </nav>
  );
}
