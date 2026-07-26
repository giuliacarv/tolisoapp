import { useEffect, useState } from "react";
import { Menu, Search, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "./primitives";

const NAV_LINKS = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Cupons", href: "#cupons" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Créditos", href: "#creditos" },
  { label: "Transparência", href: "#transparencia" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <a href="#topo" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
          </span>
          <span className="truncate text-[17px] font-extrabold tracking-[-0.02em] text-foreground">
            DESCONT<span className="text-gold">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Buscar ofertas"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <a
            href="#creditos"
            className="hidden rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            Entrar
          </a>
          <a
            href="#ofertas"
            className="hidden rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-graphite sm:inline-flex"
          >
            Ver ofertas
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
