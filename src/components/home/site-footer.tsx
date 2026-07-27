import { Instagram, Linkedin, Mail, Sparkles, Youtube } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { handleAnchorClick } from "@/lib/smooth-scroll";

import { Container } from "./primitives";

/**
 * Links do rodapé.
 * - `to` → rota interna existente (navegação do router).
 * - `href` → âncora interna existente, com scroll suave.
 * - `message` → página institucional ainda inexistente: renderiza um botão
 *   com aparência de link e avisa o usuário por toast (sem navegar, sem
 *   saltar para o topo e sem `href="#"`).
 */
interface FooterLink {
  label: string;
  to?: string;
  href?: string;
  message?: string;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navegar",
    links: [
      { label: "Ofertas", href: "#ofertas" },
      { label: "Cupons", href: "#cupons" },
      { label: "Categorias", href: "#categorias" },
      { label: "Como funciona", href: "#como-funciona" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", to: "/ajuda" },
      { label: "Contato", to: "/contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", to: "/termos" },
      { label: "Política de privacidade", to: "/privacidade" },
      { label: "Política de cookies", to: "/cookies" },
      { label: "Divulgação de afiliados", to: "/afiliados" },
    ],
  },
];



const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Mail, label: "E-mail" },
];

const SOON_MESSAGE = "Esta página será publicada em uma próxima etapa.";

const linkClass =
  "inline-flex min-h-9 items-center rounded-md text-left text-sm text-muted-foreground transition-colors duration-200 hover:text-gold";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink">
                <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="truncate text-fluid-base font-extrabold tracking-[-0.02em] text-foreground">
                DESCONTAI<span className="text-gold">.</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketplace de ofertas e cupons que reúne produtos de lojas reconhecidas do Brasil,
              com curadoria, validação de cupons e redirecionamento seguro para a loja parceira.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toast(SOON_MESSAGE)}
                  aria-label={`${label} (em breve)`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors duration-200 hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="grid-fluid [--col-min:9rem] gap-8">
            {COLUMNS.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="text-fluid-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className={linkClass}>
                          {link.label}
                        </Link>
                      ) : link.href ? (
                        <a
                          href={link.href}
                          onClick={(event) => handleAnchorClick(event, link.href as string)}
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toast(link.message ?? SOON_MESSAGE)}
                          className={linkClass}
                        >
                          {link.label}
                        </button>
                      )}


                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-4 border-t border-border pt-8">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Preços, disponibilidade, condições e prazos podem ser alterados pelas lojas parceiras
            sem aviso prévio.
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Alguns links desta plataforma são links de afiliado. Podemos receber uma comissão quando
            uma compra é realizada, sem custo adicional para você.
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} DESCONTAI. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { Footer as SiteFooter };
