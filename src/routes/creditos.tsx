import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Coins,
  Gift,
  ShieldCheck,
  Sparkles,
  Ticket,
  Wallet,
} from "lucide-react";

import { ConfirmDialog } from "@/components/home/confirm-dialog";
import { Container, SectionHeading, buttonOutline, buttonSolid } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";
import { DEMO_CREDIT_BALANCE } from "@/domain/credits/credit-rules";
import { formatCreditsLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

/** Créditos concedidos a uma nova conta (demonstrativo). */
const NEW_ACCOUNT_CREDITS = DEMO_CREDIT_BALANCE;

/** Opções do simulador — puramente educativas, nada é persistido. */
const SIMULATION_OPTIONS = [
  {
    id: "produto-ate-50",
    label: "Produto de até R$ 50,00",
    description: "Ofertas com preço final igual ou inferior a R$ 50,00.",
    cost: 1,
    icon: Coins,
  },
  {
    id: "produto-acima-50",
    label: "Produto acima de R$ 50,00",
    description: "Ofertas com preço final acima de R$ 50,00.",
    cost: 2,
    icon: Coins,
  },
  {
    id: "cupom",
    label: "Cupom",
    description: "Qualquer cupom da plataforma, independentemente da loja.",
    cost: COUPON_REDEMPTION_COST,
    icon: Ticket,
  },
] as const;

type SimulationId = (typeof SIMULATION_OPTIONS)[number]["id"];

const RULES = [
  { icon: Coins, title: "Produto de até R$ 50,00", value: "1 crédito" },
  { icon: Coins, title: "Produto acima de R$ 50,00", value: "2 créditos" },
  { icon: Ticket, title: "Cupom", value: `${COUPON_REDEMPTION_COST} créditos` },
  { icon: Gift, title: "Nova conta", value: `${NEW_ACCOUNT_CREDITS} créditos gratuitos` },
];

const FAQ = [
  {
    question: "O que são créditos?",
    answer:
      "Créditos são a unidade usada no DESCONTAI para liberar o acesso a uma oferta ou ao código de um cupom selecionado. Eles não são dinheiro, não substituem o pagamento na loja parceira e não geram desconto adicional além do informado na oferta.",
  },
  {
    question: "Os créditos expiram?",
    answer:
      "A política de validade dos créditos ainda está em definição. As regras completas serão publicadas nesta página antes do lançamento, antes de qualquer compra ser disponibilizada.",
  },
  {
    question: "Posso receber estorno?",
    answer:
      "As condições de reembolso e cancelamento ainda não estão definidas comercialmente. A política será publicada antes do lançamento e antes de qualquer cobrança existir na plataforma.",
  },
  {
    question: "A compra do produto está incluída?",
    answer:
      "Não. Os créditos servem apenas para acessar a oferta ou o cupom. A compra, o pagamento, a entrega, a garantia e o atendimento são realizados diretamente pela loja parceira, nas condições dela.",
  },
  {
    question: "Onde acompanho meu saldo?",
    answer:
      "O indicador de créditos no topo do site mostra um saldo demonstrativo nesta versão. O saldo real e o extrato de uso ficarão disponíveis na sua conta quando o sistema de contas e créditos for conectado.",
  },
];

export const Route = createFileRoute("/creditos")({
  head: () => {
    const title = "Créditos | DESCONTAI";
    const description =
      "Entenda como funcionam os créditos do DESCONTAI: quanto custa resgatar ofertas e cupons e o que está incluído.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/creditos` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/creditos` }],
    };
  },
  component: CreditsPage,
});

function CreditsPage() {
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <CreditsHero />
        <CreditsRules />
        <CreditsSimulator />
        <BuyCredits onOpen={() => setPurchaseOpen(true)} />
        <CreditsFaq />
      </main>

      <Footer />
      <ThemeToggle />

      {/* Nenhum pagamento é processado: apenas comunica a etapa futura. */}
      <ConfirmDialog
        open={purchaseOpen}
        onOpenChange={setPurchaseOpen}
        title="Compra de créditos em breve"
        description="Estamos preparando uma experiência segura para você adquirir novos créditos."
        confirmLabel="Entendi"
        cancelLabel="Fechar"
        onConfirm={() => setPurchaseOpen(false)}
      />
    </div>
  );
}

function CreditsHero() {
  return (
    <section className="noir-band">
      <span
        aria-hidden
        className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
      />
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Sistema de créditos
          </span>

          <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] tracking-[-0.025em] text-balance">
            Créditos que desbloqueiam novas economias
          </h1>

          <p className="mt-5 max-w-[58ch] text-fluid-base leading-[1.7] text-pretty text-offwhite/70">
            Use créditos para acessar descontos e cupons selecionados no DESCONTAI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/ofertas" className={cn(buttonSolid)}>
              Explorar ofertas
              <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-offwhite/15 bg-offwhite/5 px-3 py-1.5 text-fluid-xs font-medium text-offwhite/70">
              <Wallet className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              Saldo demonstrativo: {formatCreditsLabel(DEMO_CREDIT_BALANCE)}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CreditsRules() {
  return (
    <section className="section-y" aria-labelledby="regras-de-credito">
      <Container>
        <SectionHeading
          eyebrow="Regras"
          title={<span id="regras-de-credito">Quanto custa cada resgate</span>}
          description="As regras valem para toda a plataforma e são as mesmas exibidas nos cards de ofertas e cupons."
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map((rule) => {
            const Icon = rule.icon;
            return (
              <li
                key={rule.title}
                className="gilded-frame flex h-full flex-col gap-3 rounded-[18px] border border-border bg-card p-6 shadow-soft"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full border border-gold/30 bg-gold/10"
                >
                  <Icon className="size-4 text-gold" strokeWidth={1.75} />
                </span>
                <p className="text-fluid-xs leading-relaxed text-muted-foreground">{rule.title}</p>
                <p className="mt-auto font-serif text-fluid-h3 leading-none tracking-tight text-foreground">
                  {rule.value}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function CreditsSimulator() {
  const [selected, setSelected] = useState<SimulationId>("produto-ate-50");

  const option = useMemo(
    () => SIMULATION_OPTIONS.find((item) => item.id === selected) ?? SIMULATION_OPTIONS[0],
    [selected],
  );

  return (
    <section className="section-y bg-secondary/40" aria-labelledby="simulador">
      <Container>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-fluid-micro font-semibold uppercase tracking-[0.16em] text-foreground">
            <Sparkles className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            Simulação
          </span>
        </div>

        <SectionHeading
          className="mt-4"
          eyebrow="Simulador"
          title={<span id="simulador">Veja quantos créditos seriam usados</span>}
          description="Ferramenta apenas educativa: nenhum saldo é alterado, nenhum resgate é registrado e nenhum dado é salvo."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Seleção do tipo de resgate */}
          <fieldset className="min-w-0">
            <legend className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              O que você quer resgatar
            </legend>

            <div className="mt-4 grid gap-3">
              {SIMULATION_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === selected;

                return (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-[18px] border bg-card p-5 shadow-soft transition-[border-color,box-shadow,transform] duration-200",
                      isActive
                        ? "border-gold/60 shadow-lift"
                        : "border-border hover:border-gold/35",
                      "focus-within:ring-2 focus-within:ring-gold/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="simulacao-credito"
                      value={item.id}
                      checked={isActive}
                      onChange={() => setSelected(item.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border",
                        isActive
                          ? "border-gold/45 bg-gold/15"
                          : "border-border bg-secondary",
                      )}
                    >
                      <Icon className="size-4 text-gold" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-fluid-sm font-semibold text-foreground">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-fluid-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <span className="ml-auto shrink-0 self-center text-fluid-xs font-semibold text-foreground">
                      {formatCreditsLabel(item.cost)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Resultado da simulação */}
          <div className="gilded-frame rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-7">
            <p className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Resultado da simulação
            </p>

            <p
              aria-live="polite"
              className="mt-4 font-serif text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] leading-none tracking-[-0.02em] text-foreground"
            >
              <span className="gold-text">{formatCreditsLabel(option.cost)}</span>
            </p>

            <p className="mt-3 text-fluid-sm leading-relaxed text-muted-foreground">
              É o que seria utilizado para resgatar: {option.label.toLowerCase()}.
            </p>

            <dl className="mt-6 space-y-2 border-t border-border pt-4 text-fluid-xs">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Saldo demonstrativo</dt>
                <dd className="font-medium text-foreground">
                  {formatCreditsLabel(DEMO_CREDIT_BALANCE)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Custo simulado</dt>
                <dd className="font-medium text-foreground">−{formatCreditsLabel(option.cost)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-2">
                <dt className="font-semibold text-foreground">Saldo hipotético</dt>
                <dd className="font-semibold text-foreground">
                  {formatCreditsLabel(Math.max(DEMO_CREDIT_BALANCE - option.cost, 0))}
                </dd>
              </div>
            </dl>

            <p className="mt-4 flex items-start gap-2 text-fluid-micro leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              <span>
                Simulação educativa. Nenhum crédito é debitado e nenhuma informação é armazenada.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BuyCredits({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="section-y" aria-labelledby="comprar-creditos">
      <Container>
        <div className="noir-band rounded-3xl px-6 py-12 text-offwhite shadow-float sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[140%] opacity-40"
          />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-6 bg-gold" aria-hidden />
              Créditos adicionais
            </span>

            <h2
              id="comprar-creditos"
              className="mt-4 font-serif text-fluid-h2 leading-[1.08] tracking-[-0.025em] text-balance"
            >
              Precisa de mais créditos?
            </h2>

            <p className="mt-4 max-w-[54ch] text-fluid-sm leading-[1.7] text-pretty text-offwhite/70">
              Os pacotes e o checkout seguro serão disponibilizados em uma próxima etapa.
            </p>

            <button type="button" onClick={onOpen} className={cn(buttonSolid, "mt-8")}>
              <Coins className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              Comprar créditos
            </button>

            <p className="mt-4 inline-flex items-start gap-2 text-fluid-micro leading-relaxed text-offwhite/60">
              <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              <span>
                Nenhum dado financeiro é solicitado nesta etapa. Valores e pacotes serão publicados
                quando o checkout estiver disponível.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CreditsFaq() {
  return (
    <section className="section-y" aria-labelledby="perguntas-rapidas">
      <Container>
        <SectionHeading
          eyebrow="Perguntas rápidas"
          title={<span id="perguntas-rapidas">Dúvidas sobre créditos</span>}
          description="Respostas objetivas sobre o funcionamento atual. O que ainda não está definido está sinalizado com transparência."
        />

        <Accordion type="single" collapsible className="mt-10 max-w-3xl">
          {FAQ.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="border-border">
              <AccordionTrigger className="text-left text-fluid-sm font-semibold text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-fluid-xs leading-[1.7] text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10">
          <Link to="/cupons" className={cn(buttonOutline)}>
            Ver cupons disponíveis
            <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
