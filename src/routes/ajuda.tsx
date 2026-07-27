import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, Mail, Search, X } from "lucide-react";

import { Container, SectionHeading, buttonOutline, buttonSolid, chipActive, chipIdle } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { FAQ_CATEGORIES, FAQ_ENTRIES, type FaqCategory, type FaqEntry } from "@/data/faq";
import { normalizeText } from "@/domain/products/filters";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

/** Filtro local: combina termo normalizado (sem acento/caixa) e categoria. */
function filterFaq(
  entries: readonly FaqEntry[],
  term: string,
  category: FaqCategory | null,
): FaqEntry[] {
  const normalizedTerm = normalizeText(term);

  return entries.filter((entry) => {
    if (category && entry.category !== category) return false;
    if (!normalizedTerm) return true;

    const index = normalizeText(`${entry.question} ${entry.answer} ${entry.category}`);
    return index.includes(normalizedTerm);
  });
}

export const Route = createFileRoute("/ajuda")({
  head: () => {
    const title = "Central de ajuda | DESCONTAI";
    const description =
      "Respostas objetivas sobre conta, créditos, ofertas, cupons, compras nas lojas parceiras e privacidade no DESCONTAI.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/ajuda` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/ajuda` }],
    };
  },
  component: HelpCenterPage,
});

function HelpCenterPage() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<FaqCategory | null>(null);

  const results = useMemo(() => filterFaq(FAQ_ENTRIES, term, category), [term, category]);
  const hasFilters = term.trim().length > 0 || category !== null;

  function clearFilters() {
    setTerm("");
    setCategory(null);
  }

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <section className="noir-band">
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
          />
          <Container className="py-16 sm:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" aria-hidden />
                Suporte
              </span>
              <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] tracking-[-0.025em] text-balance">
                Central de ajuda
              </h1>
              <p className="mt-5 max-w-[58ch] text-fluid-base leading-[1.7] text-pretty text-offwhite/70">
                Respostas diretas sobre créditos, resgates, cupons e o que acontece depois que você
                é direcionado à loja parceira.
              </p>
            </div>
          </Container>
        </section>

        <section className="section-y" aria-labelledby="perguntas-frequentes">
          <Container>
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title={<span id="perguntas-frequentes">Encontre sua resposta</span>}
              description="Busque por palavra-chave ou filtre por categoria. A busca acontece localmente, sem enviar nada para servidores."
            />

            {/* Busca local */}
            <div className="mt-8 max-w-xl">
              <label htmlFor="faq-search" className="sr-only">
                Buscar nas perguntas frequentes
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <Input
                  id="faq-search"
                  type="search"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Ex.: créditos, cupom, entrega"
                  maxLength={120}
                  className="min-h-12 rounded-xl pl-11"
                />
              </div>
            </div>

            {/* Categorias */}
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
              <button
                type="button"
                onClick={() => setCategory(null)}
                aria-pressed={category === null}
                className={category === null ? chipActive : chipIdle}
              >
                Todas
              </button>
              {FAQ_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={category === item ? chipActive : chipIdle}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-fluid-xs text-muted-foreground" aria-live="polite">
                {results.length}{" "}
                {results.length === 1 ? "pergunta encontrada" : "perguntas encontradas"}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex min-h-11 items-center gap-1.5 text-fluid-xs font-semibold text-gold underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="size-3.5" strokeWidth={2} aria-hidden />
                  Limpar filtros
                </button>
              ) : null}
            </div>

            {results.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                className="mt-6 rounded-[18px] border border-border bg-card px-5 shadow-soft sm:px-7"
              >
                {results.map((entry) => (
                  <AccordionItem key={entry.id} value={entry.id} className="border-border last:border-b-0">
                    <AccordionTrigger className="min-h-14 py-5 text-left text-fluid-sm font-semibold text-foreground hover:no-underline">
                      <span className="pr-4">
                        <span className="block text-fluid-micro font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {entry.category}
                        </span>
                        <span className="mt-1 block">{entry.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[70ch] pb-5 text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
                      {entry.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="mt-6 rounded-[18px] border border-dashed border-border bg-secondary/50 p-8 text-center">
                <LifeBuoy className="mx-auto size-6 text-gold" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 font-serif text-fluid-h3 tracking-tight text-foreground">
                  Nenhuma resposta encontrada
                </h3>
                <p className="mx-auto mt-2 max-w-[46ch] text-fluid-sm leading-[1.7] text-muted-foreground">
                  Tente outra palavra-chave ou fale com a gente pela página de contato.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={clearFilters} className={buttonOutline}>
                    Limpar filtros
                  </button>
                  <Link to="/contato" className={buttonSolid}>
                    <Mail className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                    Falar com o suporte
                  </Link>
                </div>
              </div>
            )}
          </Container>
        </section>

        <section className="section-y pt-0">
          <Container>
            <div className="gilded-frame flex flex-col gap-5 rounded-[18px] border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-serif text-fluid-h3 tracking-tight text-foreground">
                  Não encontrou o que precisava?
                </h2>
                <p className="mt-2 max-w-[52ch] text-fluid-sm leading-[1.7] text-muted-foreground">
                  Envie sua dúvida pela página de contato. Nunca informe senhas ou dados de cartão.
                </p>
              </div>
              <Link to="/contato" className={cn(buttonSolid, "shrink-0")}>
                <Mail className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Ir para contato
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <ThemeToggle />
    </div>
  );
}
