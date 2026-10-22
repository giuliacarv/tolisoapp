import { Instagram, Linkedin, Mail, Sparkles, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Shell } from "./shell";
import { hasLiveCatalog } from "@/services/live-catalog-source";

const COLUMNS = [
  {
    title: "Navegar",
    links: [
      { label: "Ofertas", to: "/ofertas" },
      { label: "Cupons", to: "/cupons" },
      { label: "Créditos", to: "/creditos" },
      { label: "Como funciona", to: "/como-funciona" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", to: "/ajuda" },
      { label: "Contato", to: "/contato" },
      { label: "Favoritos", to: "/favoritos" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", to: "/termos" },
      { label: "Privacidade", to: "/privacidade" },
      { label: "Cookies", to: "/cookies" },
      { label: "Afiliados", to: "/afiliados" },
    ],
  },
] as const;

const SOCIALS = [Instagram, Youtube, Linkedin, Mail];

/**
 * Rodapé invertido: cartão branco flutuando sobre faixa laranja de página
 * inteira — releitura direta da referência "Maile".
 */
export function SolFooter() {
  const year = new Date().getFullYear();
  const live = hasLiveCatalog();

  return (
    <footer className="sol-band pb-10 pt-16">
      <Shell>
        <div className="sol-card grid gap-10 p-[clamp(1.75rem,4vw,3rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="text-lg font-extrabold tracking-[-0.04em] text-foreground">
                Economiz<span className="text-primary">AI</span>
              </span>
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {live ? "Ofertas publicadas após verificação. Confira as condições diretamente na loja." : "Catálogo em demonstração. Pesquise produtos nas lojas antes de tomar sua decisão de compra."}
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label="Rede social (em breve)"
                  onClick={() => toast("Esta página será publicada em uma próxima etapa.")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} EconomizAI. {live ? "Preços sujeitos a alterações pelas lojas." : "Dados demonstrativos, sem cobrança de créditos."}</p>
          <p>A pesquisa nas lojas não usa links de afiliados nesta etapa.</p>
        </div>
      </Shell>
    </footer>
  );
}
