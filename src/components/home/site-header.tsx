import { useEffect, useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { Container, buttonSolid } from "./primitives";
import { CreditsBadge } from "./credits-badge";

const NAV_LINKS = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Cupons", href: "#cupons" },
  { label: "Categorias", href: "#categorias" },
  { label: "Como funciona", href: "#como-funciona" },
];

const LOGIN_MESSAGE = "Login e cadastro serão implementados na próxima etapa.";

const iconButton =
  "touch-target grid shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors duration-200 hover:bg-secondary";

/**
 * Header sticky do DESCONTAI.
 * O menu mobile usa o Sheet (Radix): fecha com Escape, trava a rolagem
 * e mantém o foco preso enquanto está aberto.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 8);
      // Evita divisão por zero em páginas curtas (progresso permanece 0).
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleLogin = () => {
    setOpen(false);
    toast(LOGIN_MESSAGE);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-200",
        scrolled
          ? "bg-background/75 shadow-hairline backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent",
      )}
      data-over-hero={scrolled ? undefined : "true"}
    >
      {/* Filete dourado que só aparece com a rolagem — sombra de 1px, sem "linha de tabela". */}
      <span
        aria-hidden
        className={cn(
          "rule-gold pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-200",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {/*
       * Indicador de progresso de leitura: 2px de ouro que acompanham a rolagem.
       * Puramente decorativo — a informação já existe no scrollbar nativo.
       */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[image:var(--gradient-gold)] transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{ transform: `scaleX(${progress})` }}
      />


      <Container className="flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
        <a
          href="#topo"
          onClick={(event) => handleAnchorClick(event, "#topo", () => setOpen(false))}
          className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="DESCONTAI — início"
        >
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-soft ring-1 ring-gold/25 transition-colors duration-200",
              scrolled ? "bg-ink bg-[image:var(--gradient-ink)]" : "bg-offwhite/10",
            )}
          >
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden />
          </span>
          <span
            className={cn(
              "truncate text-fluid-lg font-extrabold tracking-[-0.02em] transition-colors duration-200",
              scrolled ? "text-foreground" : "text-offwhite",
            )}
          >
            DESCONTAI<span className="text-gold">.</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleAnchorClick(event, link.href)}
              className={cn(
                "nav-underline inline-flex min-h-11 items-center rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                scrolled
                  ? "text-muted-foreground hover:text-foreground focus-visible:ring-offset-background"
                  : "text-offwhite/70 hover:text-offwhite focus-visible:ring-offset-ink",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#buscar"
            onClick={(event) => handleAnchorClick(event, "#buscar")}
            aria-label="Ir para a busca de ofertas"
            className={cn(
              iconButton,
              !scrolled && "border-offwhite/20 bg-offwhite/5 text-offwhite hover:bg-offwhite/10",
            )}
          >
            <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </a>

          <CreditsBadge
            className={cn(
              "hidden sm:inline-flex",
              !scrolled && "border-gold/35 bg-offwhite/5 text-offwhite",
            )}
          />

          <button
            type="button"
            onClick={handleLogin}
            className={cn(
              "touch-target hidden items-center justify-center rounded-xl px-5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:inline-flex",
              scrolled
                ? "bg-primary text-primary-foreground shadow-soft focus-visible:ring-offset-background"
                : "bg-[image:var(--gradient-gold)] text-ink shadow-soft focus-visible:ring-offset-ink",
            )}
          >
            Entrar
          </button>


          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu de navegação"
                className={cn(
                  iconButton,
                  "lg:hidden",
                  !scrolled && "border-offwhite/20 bg-offwhite/5 text-offwhite hover:bg-offwhite/10",
                )}
              >
                <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(21.25rem,88vw)] flex-col gap-0 overflow-y-auto overscroll-contain border-l border-border bg-background p-[var(--gutter)]"
            >
              <SheetHeader className="p-0 text-left">
                <SheetTitle className="font-serif text-xl tracking-tight">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-5">
                <CreditsBadge />
              </div>

              <nav aria-label="Navegação mobile" className="mt-6 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      handleAnchorClick(event, link.href, () => setOpen(false));
                      setOpen(false);
                    }}
                    className="touch-target flex items-center border-b border-border/70 py-4 font-serif text-lg text-foreground transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <button type="button" onClick={handleLogin} className={cn(buttonSolid, "mt-auto w-full py-3.5")}>
                Entrar
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

export { Header as SiteHeader };
