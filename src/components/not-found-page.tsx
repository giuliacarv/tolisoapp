import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Home } from "lucide-react";

/**
 * Página 404 premium (Noir & Gold).
 * Usada tanto para URLs inexistentes quanto como fallback padrão do router.
 * Sem dependência de dados: renderiza igual no servidor e no cliente.
 */
export function NotFoundPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink px-fluid-gutter py-16 text-offwhite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_0%,rgba(200,169,107,0.16),transparent_70%)]"
      />

      <div className="relative w-full max-w-2xl text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-gold">
          Erro 404
        </p>

        <p
          aria-hidden="true"
          className="mt-6 font-serif text-[clamp(4.5rem,18vw,9rem)] leading-none text-offwhite/10"
        >
          404
        </p>

        <h1 className="-mt-[0.35em] font-serif text-[clamp(1.75rem,6vw,3rem)] font-light leading-tight text-offwhite">
          Esta página não foi encontrada
        </h1>

        <p className="mx-auto mt-4 max-w-md text-fluid-sm leading-relaxed text-offwhite/65">
          O endereço pode estar incorreto ou o conteúdo pode ter sido removido.
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Home aria-hidden="true" className="h-4 w-4" />
            Voltar ao início
          </Link>

          <Link
            to="/ofertas"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-offwhite/25 px-6 py-3 text-sm font-semibold text-offwhite transition-colors duration-200 hover:border-gold/60 hover:bg-offwhite/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Compass aria-hidden="true" className="h-4 w-4" />
            Explorar ofertas
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <nav aria-label="Atalhos úteis" className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-offwhite/50">
            <li>
              <Link to="/cupons" className="rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">
                Cupons
              </Link>
            </li>
            <li>
              <Link to="/como-funciona" className="rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">
                Como funciona
              </Link>
            </li>
            <li>
              <Link to="/ajuda" className="rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">
                Ajuda
              </Link>
            </li>
            <li>
              <Link to="/contato" className="rounded-sm hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
