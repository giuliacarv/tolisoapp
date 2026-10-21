import { Link } from "@tanstack/react-router";
import { Heart, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "./header-nav-links";
import { buttonSolid } from "./primitives";
import { CreditsBadge } from "./credits-badge";

export interface HeaderMobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Resolve o `href` do link conforme a rota atual (âncora ou navegação). */
  hrefFor: (hash: string) => string;
  onLogin: () => void;
  triggerClassName?: string;
}

/**
 * Menu mobile do header (Sheet do Radix): fecha com Escape, trava a rolagem do
 * body e mantém o foco preso enquanto aberto.
 *
 * Extraído do `Header` porque concentrava ~60 linhas de markup e três
 * responsabilidades distintas (atalhos, navegação e login) que não dependem do
 * estado de rolagem do header.
 */
export function HeaderMobileMenu({
  open,
  onOpenChange,
  hrefFor,
  onLogin,
  triggerClassName,
}: HeaderMobileMenuProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menu de navegação"
          className={cn(triggerClassName, "lg:hidden")}
        >
          <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[min(21.25rem,88vw)] flex-col gap-0 overflow-y-auto overscroll-contain border-l border-border/60 bg-background/75 p-[var(--gutter)] backdrop-blur-xl"
      >
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="font-serif text-xl tracking-tight">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-5 flex items-center gap-2">
          <CreditsBadge />
        </div>

        <nav aria-label="Atalhos" className="mt-4">
          <Link
            to="/favoritos"
            onClick={close}
            className="touch-target flex items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            <Heart className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            Meus favoritos
          </Link>
        </nav>

        <nav aria-label="Navegação mobile" className="mt-6 flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
              onClick={(event) => {
                handleAnchorClick(event, link.href, close);
                close();
              }}
              className="touch-target flex items-center border-b border-border/70 py-4 font-serif text-lg text-foreground transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" onClick={onLogin} className={cn(buttonSolid, "mt-auto w-full py-3.5")}>
          Entrar
        </button>
      </SheetContent>
    </Sheet>
  );
}
