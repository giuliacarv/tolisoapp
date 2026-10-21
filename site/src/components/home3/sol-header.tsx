import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Coins, Menu, Search, Sparkles, X } from "lucide-react";

import { handleAnchorClick } from "@/lib/smooth-scroll";
import { INITIAL_CREDIT_BALANCE } from "@/config/business-rules";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Ofertas", href: "#sol-ofertas" },
  { label: "Cupons", href: "#sol-cupons" },
  { label: "Categorias", href: "#sol-categorias" },
  { label: "Como funciona", href: "#sol-como-funciona" },
] as const;

/**
 * Header flutuante em cápsula branca (referência "Maile").
 * Diferente do header colado no topo da home atual: aqui ele paira sobre o
 * conteúdo com margem lateral e raio total.
 */
export function SolHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-5">
      <div className="mx-auto w-full max-w-[84rem] px-[clamp(0.75rem,3vw,2.5rem)]">
        <div className="sol-card flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur-xl sm:px-4">
          <Link to="/homepage3" className="flex min-h-11 items-center gap-2 rounded-full px-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="text-base font-extrabold tracking-[-0.04em] text-foreground">
              Economiz<span className="text-primary">AI</span>
            </span>
          </Link>

          <span className="ml-1 hidden rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground lg:inline-flex">
            Descontos reais
          </span>

          <nav className="mx-auto hidden items-center gap-1 md:flex" aria-label="Seções da página">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href="#sol-busca"
              onClick={(event) => handleAnchorClick(event, "#sol-busca")}
              aria-label="Ir para a busca"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Search className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </a>
            <span className="hidden min-h-11 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm font-bold text-foreground sm:inline-flex">
              <Coins className="h-4 w-4 text-primary" strokeWidth={2.2} aria-hidden />
              {INITIAL_CREDIT_BALANCE}
            </span>
            <Link to="/entrar" className="sol-pill-ink hidden text-sm sm:inline-flex">
              Entrar
            </Link>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white md:hidden"
            >
              {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "sol-card mt-2 overflow-hidden p-2 md:hidden",
            open ? "block" : "hidden",
          )}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                setOpen(false);
                handleAnchorClick(event, link.href);
              }}
              className="flex min-h-12 items-center rounded-2xl px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <Link to="/entrar" className="sol-pill mt-2 w-full text-sm">
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
