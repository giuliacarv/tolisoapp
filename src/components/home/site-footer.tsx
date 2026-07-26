import { Instagram, Mail, Send, Sparkles, Youtube } from "lucide-react";

import { Container } from "./primitives";

const COLUMNS = [
  {
    title: "Navegar",
    links: ["Ofertas do dia", "Cupons validados", "Categorias", "Lojas parceiras", "Mais economia"],
  },
  {
    title: "Institucional",
    links: ["Sobre o DESCONTAI", "Como funciona", "Critérios de curadoria", "Trabalhe conosco"],
  },
  {
    title: "Ajuda",
    links: ["Central de ajuda", "Perguntas frequentes", "Fale conosco", "Reportar oferta"],
  },
  {
    title: "Legal",
    links: ["Termos de uso", "Política de privacidade", "Política de cookies", "Divulgação de afiliados"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink">
                <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
              </span>
              <span className="text-[17px] font-extrabold tracking-[-0.02em] text-foreground">
                DESCONT<span className="text-gold">AI</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketplace de ofertas e cupons que reúne produtos das maiores lojas do Brasil com
              curadoria, transparência e verificação de preço.
            </p>

            <form
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Receba as melhores ofertas por e-mail"
                className="h-11 min-w-0 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/25"
              />
              <button
                type="submit"
                aria-label="Assinar newsletter"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors hover:bg-graphite"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </form>

            <div className="flex items-center gap-2">
              {[Instagram, Youtube, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#topo"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:border-gold/50 hover:text-gold"
                  aria-label="Redes sociais DESCONTAI"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#topo"
                        className="text-sm text-foreground/75 transition-colors hover:text-gold"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DESCONTAI. Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            O DESCONTAI participa de programas de afiliados e pode receber comissão pelas compras
            realizadas nas lojas parceiras, sem custo adicional para você.
          </p>
        </div>
      </Container>
    </footer>
  );
}
