import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonSolid } from "./primitives";

export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/** Barra de busca reutilizável (filtragem local nesta fase). */
export function SearchBar({ value, onValueChange, className }: SearchBarProps) {
  const hasValue = value.trim().length > 0;

  return (
    <form
      role="search"
      aria-label="Buscar ofertas"
      className={cn(
        "group/search relative grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]",
        className,
      )}
      onSubmit={(event) => event.preventDefault()}
    >
      <div
        className={cn(
          "relative min-w-0 rounded-2xl border border-border/70 bg-background/70 backdrop-blur-sm",
          "transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "focus-within:border-gold/60 focus-within:bg-background",
          "focus-within:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_35%,transparent),0_18px_50px_-28px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-focus-within/search:bg-gold/16"
        >
          <Search className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
        </span>
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
          className={cn(
            "h-14 w-full min-w-0 rounded-2xl bg-transparent pl-15 pr-12 text-fluid-sm text-foreground",
            "outline-none placeholder:text-muted-foreground focus-visible:outline-none",
            "[&::-webkit-search-cancel-button]:hidden",
          )}
        />
        {hasValue ? (
          <button
            type="button"
            onClick={() => onValueChange("")}
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>

      <button type="submit" className={cn(buttonSolid, "h-14 min-h-14 rounded-2xl px-8")}>
        <Search className="h-4 w-4" strokeWidth={1.9} aria-hidden />
        Buscar
      </button>
    </form>
  );
}
