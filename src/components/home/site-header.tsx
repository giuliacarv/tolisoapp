import { useEffect, useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = () => {
    setOpen(false);
    toast(LOGIN_MESSAGE);
  };

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/75 shadow-[0_1px_2px_rgba(11,11,12,0.06)] backdrop-blur-md backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
        <a
          href="#topo"
          className="flex min-w-0 items-center gap-2.5 rounded-lg"
          aria-label="DESCONTAI — início"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="truncate text-fluid-lg font-extrabold tracking-[-0.02em] text-foreground">
            DESCONTAI<span className="text-gold">.</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href="#buscar" aria-label="Ir para a busca de ofertas" className={iconButton}>
            <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </a>

          <CreditsBadge className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={handleLogin}
            className={cn(buttonSolid, "hidden sm:inline-flex")}
          >
            Entrar
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Abrir menu de navegação" className={cn(iconButton, "lg:hidden")}>
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
                    onClick={() => setOpen(false)}
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
