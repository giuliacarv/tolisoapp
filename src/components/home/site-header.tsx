import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";

import { SearchHeader } from "@/components/search/search-header";
import { useComingSoon } from "@/hooks/use-coming-soon";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { Container } from "./primitives";
import { CreditsBadge } from "./credits-badge";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { LOGIN_COMING_SOON_MESSAGE, NAV_LINKS } from "./header-nav-links";

const iconButton =
  "touch-target grid shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors duration-200 hover:bg-secondary";

/**
 * Header sticky do EconomizAI.
 *
 * Responsabilidade única: compor a barra fixa e reagir ao estado de rolagem.
 * O cálculo de rolagem vive em `useScrollProgress`, o menu mobile em
 * `HeaderMobileMenu` e os itens de navegação em `header-nav-links`.
 */
export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  // Só a home tem hero escuro no topo; nas demais rotas o header já nasce
  // sólido, caso contrário o texto claro ficaria ilegível sobre fundo claro.
  const isHome = pathname === "/";

  const { scrolled: rawScrolled, progress } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const notifyLoginComingSoon = useComingSoon(LOGIN_COMING_SOON_MESSAGE);

  const scrolled = rawScrolled || !isHome;

  /**
   * Fora da home as âncoras da homepage não existem: o link vira uma
   * navegação real para "/#secao" em vez de uma rolagem interna.
   */
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  const handleLogin = () => {
    setOpen(false);
    notifyLoginComingSoon();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-200",
        scrolled
          ? "bg-background/92 shadow-hairline backdrop-blur-xl backdrop-saturate-150"
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
          href={isHome ? "#topo" : "/"}
          onClick={(event) => handleAnchorClick(event, "#topo", () => setOpen(false))}
          className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="EconomizAI — início"
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
            EconomizAI<span className="text-gold">.</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
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
          <SearchHeader
            triggerClassName={cn(
              iconButton,
              "h-auto w-auto rounded-xl",
              !scrolled && "border-offwhite/20 bg-offwhite/5 text-offwhite hover:bg-offwhite/10",
            )}
          />

          <Link
            to="/favoritos"
            aria-label="Ver meus favoritos salvos neste dispositivo"
            className={cn(
              iconButton,
              !scrolled && "border-offwhite/20 bg-offwhite/5 text-offwhite hover:bg-offwhite/10",
            )}
          >
            <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </Link>

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

          <HeaderMobileMenu
            open={open}
            onOpenChange={setOpen}
            hrefFor={hrefFor}
            onLogin={handleLogin}
            triggerClassName={cn(
              iconButton,
              !scrolled && "border-offwhite/20 bg-offwhite/5 text-offwhite hover:bg-offwhite/10",
            )}
          />
        </div>
      </Container>
    </header>
  );
}

export { Header as SiteHeader };
