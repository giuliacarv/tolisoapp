import { useEffect, useState } from "react";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import { CreditsBadge } from "./credits-badge";

const NAV_LINKS = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Cupons", href: "#cupons" },
  { label: "Categorias", href: "#categorias" },
  { label: "Como funciona", href: "#como-funciona" },
];

const LOGIN_MESSAGE = "Login e cadastro serão adicionados na próxima etapa.";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body enquanto o menu lateral mobile estiver aberto.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleLogin = () => {
    setOpen(false);
    toast(LOGIN_MESSAGE);
  };

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
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="truncate text-[17px] font-extrabold tracking-[-0.02em] text-foreground">
            DESCONT<span className="text-gold">AI</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#buscar"
            aria-label="Buscar ofertas"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </a>

          <CreditsBadge className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={handleLogin}
            className="hidden rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-graphite sm:inline-flex"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </Container>

      {open ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-[340px] flex-col border-l border-border bg-background p-6 shadow-soft"
          >
            <div className="flex items-center justify-between gap-4">
              <CreditsBadge />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <nav aria-label="Navegação mobile" className="mt-8 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/70 py-4 font-serif text-xl text-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogin}
              className="mt-auto w-full rounded-xl bg-ink px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-graphite"
            >
              Entrar
            </button>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
