import type { SortId } from "@/domain/products/sorting";

import { chipIdle } from "../primitives";
import { SortSelect } from "../results-controls";

export interface ResultsHeaderProps {
  /** Rótulo curto do conjunto exibido (ex.: "Resultados da busca"). */
  label: string;
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

/**
 * Barra de controle dos resultados.
 *
 * Deixou de ser um segundo título (que competia com "Ofertas em destaque")
 * e passou a ser uma régua fina: rótulo + contador à esquerda, ordenação e
 * reset à direita, delimitada por filetes que reforçam o ritmo do 8pt grid.
 */
export function ResultsHeader({
  label,
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
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-border/70 py-3">
      <p className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-fluid-micro font-semibold uppercase tracking-[0.2em] text-foreground">
          {label}
        </span>
        <span aria-live="polite" className="text-fluid-xs tabular-nums text-muted-foreground">
          {isLoading ? "Carregando ofertas…" : buildStatus(total, page, totalPages)}
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-3">
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
