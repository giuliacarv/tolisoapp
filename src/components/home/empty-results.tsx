import { SearchX } from "lucide-react";

export interface EmptyResultsProps {
  /** Título do estado vazio. */
  title?: string;
  /** Texto de apoio abaixo do título. */
  description?: string;
  /** Termo buscado, exibido na mensagem quando existir. */
  query?: string;
  /** Rótulo do filtro ativo, exibido quando não for "todas". */
  filterLabel?: string;
  /** Limpa busca e filtros. */
  onReset: () => void;
  /** Sugestões clicáveis de busca. */
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

/**
 * Estado vazio da vitrine: explica o que aconteceu e oferece caminhos de saída
 * (limpar filtros ou tentar uma sugestão de busca).
 */
export function EmptyResults({
  title = "Nenhuma oferta encontrada",
  description = "Tente buscar outro produto, loja ou categoria.",
  onReset,
  suggestions = [],
  onSuggestionSelect,
}: EmptyResultsProps) {
  return (

    <div
      role="status"
      className="mx-auto flex max-w-xl flex-col items-center rounded-[22px] border border-border bg-card px-6 py-12 text-center shadow-soft"
    >
      <span
        aria-hidden="true"
        className="flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold"
      >
        <SearchX className="size-6" strokeWidth={1.5} />
      </span>

      <h4 className="mt-5 font-serif text-xl tracking-tight text-foreground sm:text-2xl">
        {title}
      </h4>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {suggestions.length > 0 && (
        <div className="mt-6 w-full">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Buscas sugeridas
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSuggestionSelect?.(suggestion)}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-gold/40 hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <button type="button" onClick={onReset} className={cn(buttonSolid, "mt-7")}>
        Limpar filtros
      </button>
    </div>
  );
}
