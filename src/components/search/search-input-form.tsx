import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

import { buttonSolid } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

export interface SearchInputFormProps {
  /** Termo já aplicado à listagem (fonte de verdade externa). */
  value: string;
  /** Dispara a busca a cada tecla e também no submit (Enter). */
  onSearch: (term: string) => void;
  /** Rótulo do landmark `search` — descreve o que está sendo buscado. */
  formLabel: string;
  /** `id`/`name` do input; precisa ser único por página. */
  inputId: string;
  /** Rótulo visualmente oculto associado ao input. */
  inputLabel: string;
  placeholder: string;
  className?: string;
}

/**
 * BUSCA DE LISTAGEM (primitivo)
 * ---------------------------------------------------------------------------
 * Por que existe: `CatalogSearch` e `CouponSearch` eram o mesmo componente com
 * rótulos diferentes — mesmo rascunho local, mesmo submit, mesmo markup.
 * A variação era 100% textual, então virou parâmetro.
 *
 * O rascunho local (`draft`) mantém o input controlado sem depender do ciclo
 * de filtragem; a propagação a cada tecla mantém contador e resultados em
 * sincronia imediata.
 */
export function SearchInputForm({
  value,
  onSearch,
  formLabel,
  inputId,
  inputLabel,
  placeholder,
  className,
}: SearchInputFormProps) {
  const [draft, setDraft] = useState(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(draft.trim());
  }

  return (
    <form
      role="search"
      aria-label={formLabel}
      onSubmit={handleSubmit}
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]", className)}
    >
      <div className="relative min-w-0">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
          aria-hidden
        />
        <label htmlFor={inputId} className="sr-only">
          {inputLabel}
        </label>
        <input
          id={inputId}
          name={inputId}
          type="search"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            onSearch(event.target.value);
          }}
          placeholder={placeholder}
          className="h-13 min-h-12 w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-fluid-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
        />
      </div>
      <button type="submit" className={cn(buttonSolid, "min-h-12 px-7")}>
        <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        Buscar
      </button>
    </form>
  );
}
