import type { SortId } from "@/domain/products/sorting";

import { chipIdle } from "../primitives";
import { SortSelect } from "../results-controls";

export interface ResultsHeaderProps {
  title: string;
  isLoading: boolean;
  total: number;
  page: number;
  totalPages: number;
  sort: SortId;
  onSortChange: (value: SortId) => void;
  /** Exibe o botão "Limpar filtros" quando há busca ou categoria ativa. */
  canReset: boolean;
  onReset: () => void;
}

function buildStatus(total: number, page: number, totalPages: number): string {
  const noun = total === 1 ? "oferta encontrada" : "ofertas encontradas";
  const pageInfo = totalPages > 1 ? ` — página ${page} de ${totalPages}` : "";
  return `${total} ${noun}${pageInfo}`;
}

/** Cabeçalho dos resultados: título, contador acessível, ordenação e reset. */
export function ResultsHeader({
  title,
  isLoading,
  total,
  page,
  totalPages,
  sort,
  onSortChange,
  canReset,
  onReset,
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">{title}</h3>

      <div className="flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {isLoading ? "Carregando ofertas…" : buildStatus(total, page, totalPages)}
        </p>
        <SortSelect value={sort} onValueChange={onSortChange} />
        {canReset ? (
          <button type="button" onClick={onReset} className={chipIdle}>
            Limpar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}
