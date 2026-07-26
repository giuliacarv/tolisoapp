import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonSolid } from "./primitives";

export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/** Barra de busca reutilizável (filtragem local nesta fase). */
export function SearchBar({ value, onValueChange, className }: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Buscar ofertas"
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]", className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="relative min-w-0">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
          aria-hidden
        />
        <label htmlFor="busca" className="sr-only">
          Busque por produtos, marcas ou lojas
        </label>
        <input
          id="busca"
          name="busca"
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Busque por produtos, marcas ou lojas"
          className="h-13 min-h-12 w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
        />
      </div>
      <button type="submit" className={cn(buttonSolid, "min-h-12 px-7")}>
        <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        Buscar
      </button>
    </form>
  );
}
