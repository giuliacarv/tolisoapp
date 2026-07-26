import type { Product } from "@/data/products";

/** Opções de ordenação disponíveis para a vitrine de ofertas. */
export const SORT_OPTIONS = [
  { id: "recommended", label: "Recomendados" },
  { id: "discount", label: "Maior desconto" },
  { id: "recent", label: "Mais recentes" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]["id"];

/** Quantidade de itens exibidos por página. */
export const PAGE_SIZE = 8;

/**
 * Ordena uma lista de produtos sem mutar o array original.
 * `recommended` prioriza itens em destaque, preservando a ordem base.
 */
export function sortProducts(products: Product[], sort: SortId): Product[] {
  const list = [...products];

  switch (sort) {
    case "discount":
      return list.sort((a, b) => b.discountPercentage - a.discountPercentage);
    case "recent":
      return list.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "price-asc":
      return list.sort((a, b) => a.currentPrice - b.currentPrice);
    case "price-desc":
      return list.sort((a, b) => b.currentPrice - a.currentPrice);
    case "recommended":
    default:
      return list.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

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

/** Paginação numérica simples e responsiva. */
export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Paginação das ofertas" className="mt-8 flex flex-wrap justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${base} border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground`}
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
            className={
              isActive
                ? `${base} bg-ink text-offwhite`
                : `${base} border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground`
            }
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`${base} border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground`}
      >
        Próxima
      </button>
    </nav>
  );
}
