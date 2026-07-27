import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonSolid } from "@/components/home/primitives";

export interface CatalogSearchProps {
  /** Termo já aplicado ao catálogo. */
  value: string;
  /** Dispara a busca (a cada tecla e também no submit com Enter). */
  onSearch: (term: string) => void;
  className?: string;
}

/**
 * Busca do catálogo.
 *
 * Mantém um estado local para o texto digitado e propaga a cada alteração, de
 * modo que os resultados e o contador atualizam imediatamente. O `submit`
 * (tecla Enter) reenvia o termo já normalizado — sem recarregar a página.
 */
export function CatalogSearch({ value, onSearch, className }: CatalogSearchProps) {
  const [draft, setDraft] = useState(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(draft.trim());
  }

  return (
    <form
      role="search"
      aria-label="Buscar no catálogo de ofertas"
      onSubmit={handleSubmit}
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]", className)}
    >
      <div className="relative min-w-0">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
          aria-hidden
        />
        <label htmlFor="busca-catalogo" className="sr-only">
          Busque por produto, descrição, categoria ou loja
        </label>
        <input
          id="busca-catalogo"
          name="busca-catalogo"
          type="search"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            onSearch(event.target.value);
          }}
          placeholder="Busque por produto, categoria ou loja"
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
