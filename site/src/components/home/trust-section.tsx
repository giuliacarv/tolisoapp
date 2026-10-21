import { Eye, Home, Info, Lock, ShoppingBag, Ticket, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./reveal";

interface Pillar {
  /** Título curto do pilar de confiança. */
  title: string;
  /** Descrição do compromisso. */
  description: string;
  /** Cor do nó na linha do tempo: dourado ou violeta. */
  accent: "gold" | "violet";
  /** Ícone representativo do pilar dentro do círculo. */
  icon: LucideIcon;
}

const PILLARS: Pillar[] = [
  {
    title: "Só lojas que você já conhece",
    description: "Nada de site duvidoso: as ofertas vêm de marketplaces e varejistas reconhecidos.",
    accent: "gold",
    icon: Home,
  },
  {
    title: "Cupom com data e prova",
    description: "Cada código mostra status de validação, quando foi conferido e as regras de uso.",
    accent: "violet",
    icon: Ticket,
  },
  {
    title: "A compra é sua, na loja",
    description: "Você confere tudo e finaliza no ambiente da própria loja responsável.",
    accent: "gold",
    icon: ShoppingBag,
  },
  {
    title: "O preço em créditos aparece antes",
    description: "Você sempre sabe quanto custa antes de resgatar. Nenhum débito surpresa.",
    accent: "violet",
    icon: Eye,
  },
];

const ASSURANCES = [
  { value: "100%", label: "Do custo em créditos exibido antes do resgate" },
  { value: "0", label: "Rastreadores carregados sem o seu consentimento" },
  { value: "24h", label: "Janela de revisão dos cupons demonstrativos" },
];

const ACCENT_CLASSES = {
  gold: "border-gold text-gold shadow-[0_0_15px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
  violet: "border-violet text-violet shadow-[0_0_15px_color-mix(in_oklab,var(--violet)_60%,transparent)]",
};

const ICON_GLOW_CLASSES = {
  gold: "drop-shadow-[0_0_5px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
  violet: "drop-shadow-[0_0_5px_color-mix(in_oklab,var(--violet)_60%,transparent)]",
};

export function TrustSection() {
  return (
    <section
      id="transparencia"
      className="noir-band section-y relative scroll-mt-[calc(var(--header-h)+1rem)]"
    >
      {/* Camadas atmosféricas: profundidade sem ruído visual. */}
      <span
        aria-hidden
        className="glow-orb pointer-events-none absolute -left-32 top-1/3 h-80 w-80 opacity-25"
      />
      <span
        aria-hidden
        className="texture-grain pointer-events-none absolute inset-0 opacity-[0.4]"
      />

      <Container className="relative">
        {/* Cabeçalho: editorial e impactante. */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Confiança"
            title={
              <span className="font-display text-fluid-h1 uppercase tracking-wide text-offwhite">
                Sua{" "}
                <span className="gold-text">Segurança</span>{" "}
                é Nossa Prioridade
              </span>
            }
            description="Transparência total em cada etapa da sua jornada de economia."
            align="center"
            className="mx-auto items-center text-center [&_p]:text-offwhite/65 [&_span]:text-offwhite/60"
          />
        </div>

        {/* Indicadores de confiança. */}
        <Reveal as="ul" delay={80} className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 lg:gap-6">
          {ASSURANCES.map((item, index) => {
            const isGold = index % 2 === 0;
            return (
              <li
                key={item.label}
                className={cn(
                  "group relative flex flex-col items-center rounded-2xl border border-offwhite/12 bg-graphite/40 px-5 py-7 text-center sm:px-6 sm:py-8 transition-all duration-300 ease-[var(--ease-premium)] hover:border-violet/40",
                  isGold && "hover:border-gold/40",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 top-0 h-0.5 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent",
                    isGold ? "via-gold" : "via-violet",
                  )}
                />
                <span
                  className={cn(
                    "font-display text-fluid-h2 leading-none tabular-nums",
                    isGold ? "gold-text" : "text-violet",
                  )}
                >
                  {item.value}
                </span>
                <span className="mt-2 max-w-[26ch] text-fluid-xs font-semibold uppercase tracking-wider text-offwhite">
                  {item.label}
                </span>
              </li>
            );
          })}
        </Reveal>

        {/* Timeline horizontal de confiança. */}
        <div className="relative mt-12 sm:mt-16 sm:px-4 lg:mt-20">
          {/* Linha conectora — desktop. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block"
          />
          {/* Linha conectora — mobile. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:hidden"
          />

          <ol className="relative grid gap-7 sm:gap-10 md:grid-cols-4 md:gap-8">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  as="li"
                  key={pillar.title}
                  delay={120 + index * 100}
                  className="group relative flex items-start gap-5 md:flex-col md:items-center md:text-center"
                >
                  {/* Nó da timeline — medalhão metálico com ícone. */}
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-ink ring-4 ring-background transition-all duration-300 ease-[var(--ease-premium)] group-hover:scale-110",
                      ACCENT_CLASSES[pillar.accent],
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", ICON_GLOW_CLASSES[pillar.accent])}
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </span>

                  {/* Conteúdo. */}
                  <div className="flex flex-col">
                    <span
                      aria-hidden
                      className="font-display text-fluid-sm text-offwhite/25 transition-colors duration-300 group-hover:text-violet/60 md:hidden"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-fluid-h3 uppercase tracking-wide text-offwhite">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-[40ch] text-fluid-sm leading-relaxed text-offwhite/60">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* Disclaimer e privacidade. */}
        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div aria-hidden className="rule-gold mx-auto mb-8 h-px w-full" />
          <p className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-2xl border border-offwhite/12 bg-offwhite/5 px-6 py-4 text-fluid-xs text-offwhite/60 backdrop-blur-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
            <span className="min-w-0">
              Alguns links desta plataforma são links de afiliado. Podemos receber uma comissão
              quando uma compra é realizada, sem custo adicional para você.
            </span>
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 text-fluid-micro uppercase tracking-[0.18em] text-offwhite/40">
            <Lock className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.9} aria-hidden />
            Nenhum dado é enviado a terceiros nesta versão
          </p>
        </div>
      </Container>
    </section>
  );
}
