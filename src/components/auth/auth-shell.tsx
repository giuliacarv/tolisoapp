import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { Container } from "@/components/home/primitives";
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
 * Puramente visual: não conhece sessão, credenciais ou provedor de auth.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div className="noir-band min-h-dvh">
      <span
        aria-hidden
        className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
      />

      <Container className="flex min-h-dvh flex-col justify-center py-12 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-fluid-xs font-medium text-offwhite/70 transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            Voltar para a home
          </Link>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" aria-hidden />
              {eyebrow}
            </span>
            <h1 className="mt-3 font-serif text-fluid-h2 leading-[1.08] tracking-[-0.025em] text-balance">
              {title}
            </h1>
            <p className="mt-3 text-fluid-sm leading-[1.7] text-pretty text-offwhite/70">
              {description}
            </p>
          </div>

          <div
            className={cn(
              "mt-8 rounded-[20px] border border-offwhite/12 bg-offwhite/[0.04] p-6 shadow-float backdrop-blur-xl sm:p-8",
              className,
            )}
          >
            {children}
          </div>

          {footer ? (
            <div className="mt-6 text-center text-fluid-xs text-offwhite/70">{footer}</div>
          ) : null}

          <p className="mt-8 flex items-start justify-center gap-2 text-center text-fluid-micro leading-relaxed text-offwhite/50">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>
              Esta é a interface visual. Nenhum dado é enviado, armazenado ou autenticado nesta
              etapa.
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}

/** Link textual dourado usado nos rodapés dos cartões de autenticação. */
export const authLink =
  "font-semibold text-gold underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

/** Campo em superfície escura, alinhado à identidade Noir & Gold. */
export const authInput =
  "min-h-11 border-offwhite/15 bg-ink/40 text-offwhite placeholder:text-offwhite/35 focus-visible:border-gold focus-visible:ring-gold/40";
