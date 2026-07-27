import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Coins,
  ExternalLink,
  Handshake,
  ShoppingBag,
  Ticket,
  X,
} from "lucide-react";

import { Container, SectionHeading, buttonOutline, buttonSolid } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

/** As cinco etapas da jornada, do descobrimento à compra na loja parceira. */
const STEPS = [
  {
    title: "Explore",
    description: "Encontre produtos e cupons selecionados.",
  },
  {
    title: "Confira",
    description: "Analise preço, loja, validade, condições e créditos necessários.",
  },
  {
    title: "Resgate",
    description: "Utilize créditos para liberar o acesso à oportunidade.",
  },
  {
    title: "Acesse a loja",
    description:
      "Depois do resgate, você será direcionado à plataforma responsável pela venda.",
  },
  {
    title: "Finalize a compra",
    description:
      "Pagamento, entrega, garantia e suporte são tratados diretamente pela loja.",
  },
];

const DOES = [
  "Seleciona ofertas",
  "Organiza informações",
  "Apresenta condições",
  "Facilita o acesso a links externos",
  "Informa os créditos necessários",
];

const DOES_NOT = [
  "Não vende os produtos",
  "Não processa o pagamento dos produtos",
  "Não realiza entregas",
  "Não fornece garantia dos produtos",
  "Não controla alterações realizadas pelas lojas",
];

export const Route = createFileRoute("/como-funciona")({
  head: () => {
    const title = "Como funciona | DESCONTAI";
    const description =
      "Entenda a jornada no DESCONTAI: encontrar uma oferta, usar créditos e comprar diretamente na loja parceira.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/como-funciona` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/como-funciona` }],
    };
  },
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <HowHero />
        <StepsSection />
        <AffiliateSection />
        <ScopeSection />
        <CtaSection />
      </main>

      <Footer />
      <ThemeToggle />
    </div>
  );
}

function HowHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink bg-[image:var(--gradient-ink)] text-offwhite">
      <span
        aria-hidden
        className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
      />
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Como funciona
          </span>

          <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] tracking-[-0.025em] text-balance">
            Economizar com clareza, do início ao fim
          </h1>

          <p className="mt-5 max-w-[58ch] text-fluid-base leading-[1.7] text-pretty text-offwhite/70">
            Entenda como encontrar uma oferta, utilizar créditos e comprar diretamente na loja
            parceira.
          </p>
        </div>
      </Container>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="section-y" aria-labelledby="etapas">
      <Container>
        <SectionHeading
          eyebrow="Jornada"
          title={<span id="etapas">Cinco etapas, sem letras miúdas</span>}
          description="Cada etapa mostra exatamente o que acontece de um lado e do outro: o que o DESCONTAI organiza e o que fica sob responsabilidade da loja."
        />

        <ol className="relative mt-12 space-y-6 sm:space-y-0">
          {/* Trilho dourado contínuo que costura a numeração editorial. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[1.6rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-[image:var(--gradient-gold)] opacity-40 sm:block"
          />

          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative sm:grid sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:pb-8 sm:last:pb-0"
            >
              <span
                aria-hidden
                className="mb-4 grid size-13 min-h-13 min-w-13 place-items-center rounded-full border border-gold/35 bg-card font-serif text-fluid-h3 leading-none text-gold shadow-soft sm:mb-0 sm:size-14"
              >
                {index + 1}
              </span>

              <div className="gilded-frame min-w-0 rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-7">
                <h3 className="font-serif text-fluid-h3 leading-tight tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[62ch] text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function AffiliateSection() {
  return (
    <section className="section-y bg-secondary/40" aria-labelledby="afiliados">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <SectionHeading
            eyebrow="Transparência"
            title={<span id="afiliados">Como o DESCONTAI se mantém</span>}
          />

          <div className="gilded-frame rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-8">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full border border-gold/30 bg-gold/10"
            >
              <Handshake className="size-4 text-gold" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
              Alguns links são links de afiliado. Quando uma compra elegível é realizada, o
              DESCONTAI pode receber uma comissão sem custo adicional para o usuário.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ScopeSection() {
  return (
    <section className="section-y" aria-labelledby="escopo">
      <Container>
        <SectionHeading
          eyebrow="Responsabilidades"
          title={<span id="escopo">O que está e o que não está no nosso escopo</span>}
          description="Deixar o limite claro evita frustração: a curadoria é nossa, a venda é da loja parceira."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="gilded-frame rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              O que o DESCONTAI faz
            </h3>
            <ul className="mt-5 space-y-3">
              {DOES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-fluid-sm text-foreground">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-saving/40 bg-saving/10"
                  >
                    <Check className="size-3 text-saving" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[18px] border border-dashed border-border bg-secondary/60 p-6 shadow-soft sm:p-8">
            <h3 className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              O que o DESCONTAI não faz
            </h3>
            <ul className="mt-5 space-y-3">
              {DOES_NOT.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-fluid-sm text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-border bg-background"
                  >
                    <X className="size-3 text-discount" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 flex items-start gap-2 text-fluid-xs leading-relaxed text-muted-foreground">
          <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          <span>
            Preços, disponibilidade, condições e prazos podem ser alterados pelas lojas parceiras
            sem aviso prévio.
          </span>
        </p>
      </Container>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-y" aria-labelledby="proximos-passos">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-ink bg-[image:var(--gradient-ink)] px-6 py-12 text-offwhite shadow-float sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[140%] opacity-40"
          />
          <h2
            id="proximos-passos"
            className="max-w-2xl font-serif text-fluid-h2 leading-[1.08] tracking-[-0.025em] text-balance"
          >
            Pronto para começar?
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ofertas" className={cn(buttonSolid)}>
              <ShoppingBag className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              Explorar ofertas
            </Link>
            <Link
              to="/cupons"
              className={cn(
                buttonOutline,
                "border-offwhite/25 text-offwhite hover:border-gold hover:bg-offwhite/10 hover:text-offwhite",
              )}
            >
              <Ticket className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              Ver cupons
            </Link>
            <Link
              to="/creditos"
              className={cn(
                buttonOutline,
                "border-offwhite/25 text-offwhite hover:border-gold hover:bg-offwhite/10 hover:text-offwhite",
              )}
            >
              <Coins className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              Entender créditos
              <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
