import { Instagram, Linkedin, Mail, Sparkles, Youtube } from "lucide-react";

import { Container } from "./primitives";

/** Links são placeholders até que as páginas institucionais existam. */
const COLUMNS = [
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
      { label: "Central de ajuda", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Política de privacidade", href: "#" },
      { label: "Política de cookies", href: "#" },
      { label: "Divulgação de afiliados", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Mail, label: "E-mail" },
];

export function SiteFooter() {
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
              <span className="truncate text-[17px] font-extrabold tracking-[-0.02em] text-foreground">
                DESCONT<span className="text-gold">AI</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketplace de ofertas e cupons que reúne produtos de lojas reconhecidas do Brasil,
              com curadoria, validação de cupons e redirecionamento seguro para a loja parceira.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`${label} (em breve)`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/75 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </a>
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
