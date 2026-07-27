import type { ReactNode } from "react";

import { FileWarning } from "lucide-react";

import { Container } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { cn } from "@/lib/utils";

export const LEGAL_DRAFT_NOTICE =
  "Documento provisório para revisão jurídica antes do lançamento público.";

export interface LegalSection {
  id: string;
  title: string;
  /** Parágrafos do corpo da seção. */
  body?: string[];
  /** Itens em lista, quando fizer sentido enumerar. */
  bullets?: string[];
  /** Conteúdo livre adicional (tabelas, avisos, etc.). */
  extra?: ReactNode;
}

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Data exibida como referência da versão do documento. */
  updatedAt: string;
  sections: LegalSection[];
  /** Bloco opcional exibido antes das seções (ex.: destaque de divulgação). */
  intro?: ReactNode;
  children?: ReactNode;
}

/**
 * Layout comum das páginas legais: cabeçalho editorial, aviso de documento
 * provisório, índice navegável e seções em tipografia de leitura longa.
 */
export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  intro,
  children,
}: LegalPageProps) {
  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <section className="relative isolate overflow-hidden bg-ink bg-[image:var(--gradient-ink)] text-offwhite">
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
          />
          <Container className="py-16 sm:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" aria-hidden />
                {eyebrow}
              </span>
              <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] tracking-[-0.025em] text-balance">
                {title}
              </h1>
              <p className="mt-5 max-w-[62ch] text-fluid-base leading-[1.7] text-pretty text-offwhite/70">
                {description}
              </p>
              <p className="mt-6 text-fluid-xs text-offwhite/50">
                Versão de referência: {updatedAt}
              </p>
            </div>
          </Container>
        </section>

        <Container className="py-12 sm:py-16">
          <LegalDraftNotice />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14">
            <nav aria-label="Nesta página" className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <h2 className="text-fluid-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Nesta página
              </h2>
              <ol className="mt-4 space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-9 items-center gap-2 text-fluid-xs leading-[1.6] text-muted-foreground transition-colors duration-200 hover:text-gold"
                    >
                      <span className="tabular-nums text-gold/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0">
              {intro ? <div className="mb-10">{intro}</div> : null}

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-titulo`}
                    className="scroll-mt-[calc(var(--header-h)+1.5rem)]"
                  >
                    <h2
                      id={`${section.id}-titulo`}
                      className="font-serif text-fluid-h3 leading-[1.15] tracking-[-0.02em] text-balance text-foreground"
                    >
                      <span className="mr-3 align-middle text-fluid-xs font-sans font-semibold tabular-nums text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </h2>

                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-4 max-w-[70ch] text-fluid-sm leading-[1.8] text-pretty text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets?.length ? (
                      <ul className="mt-5 max-w-[70ch] space-y-3">
                        {section.bullets.map((item) => (
                          <li
                            key={item.slice(0, 40)}
                            className="flex gap-3 text-fluid-sm leading-[1.8] text-muted-foreground"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-gold"
                            />
                            <span className="min-w-0">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.extra ? <div className="mt-6">{section.extra}</div> : null}
                  </section>
                ))}
              </div>

              {children}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

/** Aviso obrigatório no topo de todas as páginas legais. */
export function LegalDraftNotice({ className }: { className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-[18px] border border-gold/30 bg-gold/5 p-5",
        className,
      )}
    >
      <FileWarning className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
      <div className="min-w-0">
        <p className="text-fluid-sm font-semibold text-foreground">{LEGAL_DRAFT_NOTICE}</p>
        <p className="mt-1 text-fluid-xs leading-[1.7] text-muted-foreground">
          Este texto é informativo, foi escrito em linguagem simples e não constitui aconselhamento
          jurídico definitivo. Ele ainda será revisado por profissional habilitado e poderá mudar
          integralmente antes da abertura ao público.
        </p>
      </div>
    </div>
  );
}
