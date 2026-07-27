import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/home/primitives";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { cn } from "@/lib/utils";

export interface AuthShellProps {
  /** Rótulo curto acima do título (ex.: "Acesso"). */
  eyebrow: string;
  title: string;
  description: string;
  /** Formulário da página. */
  children: ReactNode;
  /** Linha de apoio abaixo do cartão (links secundários). */
  footer?: ReactNode;
  className?: string;
}

/**
 * Moldura editorial compartilhada pelas páginas de autenticação.
 *
 * Usa exatamente o mesmo tema escopado da home ("Obsidian"): obsidiana +
 * violeta no escuro, roxo/laranja/branco no claro, com a mesma ambiência de
 * luz, tipografia fluida e superfícies de vidro. Puramente visual: não conhece
 * sessão, credenciais ou provedor de auth.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
}: AuthShellProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className={cn(
        "theme-obsidian relative min-h-dvh bg-background text-foreground",
        isDark && "dark",
      )}
    >
      {/* Mesma ambiência de luz da home, fixa atrás de todo o conteúdo. */}
      <div
        aria-hidden
        className="ambient-light pointer-events-none fixed inset-0 -z-10 opacity-70"
      />

      <Container className="flex min-h-dvh flex-col justify-center py-12 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-fluid-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            Voltar para a home
          </Link>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <span className="h-px w-6 bg-[image:var(--gradient-gold)]" aria-hidden />
              {eyebrow}
            </span>
            <h1 className="mt-3 font-serif text-fluid-h2 leading-[1.08] tracking-[-0.025em] text-balance text-foreground">
              {title}
            </h1>
            <p className="mt-3 text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={cn(
              "glass-surface mt-8 rounded-[20px] p-6 shadow-lift sm:p-8",
              className,
            )}
          >
            {children}
          </div>

          {footer ? (
            <div className="mt-6 text-center text-fluid-xs text-muted-foreground">{footer}</div>
          ) : null}

          <p className="mt-8 flex items-start justify-center gap-2 text-center text-fluid-micro leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>
              Esta é a interface visual. Nenhum dado é enviado, armazenado ou autenticado nesta
              etapa.
            </span>
          </p>

          <p className="mt-4 flex items-center justify-center gap-2 text-fluid-micro font-medium text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            Inteligência Artificial pra Economizar de Verdade!
          </p>
        </div>
      </Container>

      <ThemeToggle
        theme={isDark ? "dark" : "light"}
        toggleTheme={() => setIsDark((prev) => !prev)}
        mounted={true}
      />
    </div>
  );
}

/** Link textual de ênfase, idêntico ao usado na home. */
export const authLink =
  "font-semibold text-gold underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

/** Campo alinhado às superfícies do tema Obsidian (claro e escuro). */
export const authInput =
  "min-h-11 rounded-xl border-border bg-background/60 text-foreground placeholder:text-muted-foreground/70 shadow-hairline transition-[border-color,box-shadow] duration-200 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40";
