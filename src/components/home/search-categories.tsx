import {
  Headphones,
  Home,
  Laptop,
  Search,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Dumbbell,
  Baby,
} from "lucide-react";

import { Container } from "./primitives";

const CATEGORIES = [
  { label: "Eletrônicos", icon: Laptop },
  { label: "Áudio", icon: Headphones },
  { label: "Casa e Cozinha", icon: Home },
  { label: "Moda", icon: Shirt },
  { label: "Beleza", icon: Sparkles },
  { label: "Esporte", icon: Dumbbell },
  { label: "Infantil", icon: Baby },
];

export function SearchAndCategories() {
  return (
    <section className="scroll-mt-24 py-4">
      <Container>
        <div className="rounded-[18px] border border-border bg-card p-5 shadow-soft sm:p-7">
          <form
            className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="relative min-w-0">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.75}
              />
              <label htmlFor="busca" className="sr-only">
                Buscar produtos, marcas ou lojas
              </label>
              <input
                id="busca"
                type="search"
                placeholder="Buscar produtos, marcas ou lojas..."
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/25"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
                Filtros
              </button>
              <button
                type="submit"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-graphite sm:flex-none"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-gold/50 hover:text-foreground"
              >
                <Icon
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-gold"
                  strokeWidth={1.75}
                />
                {label}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
