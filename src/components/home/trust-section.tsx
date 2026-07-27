import { BadgeCheck, Coins, Info, Lock, ShieldCheck, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./reveal";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Pilares em destaque ocupam duas colunas na grade bento (a partir de lg). */
  wide?: boolean;
}

const PILLARS: Pillar[] = [
  {
    icon: Store,
    title: "Só lojas que você já conhece",
    description: "Nada de site duvidoso: as ofertas vêm de marketplaces e varejistas reconhecidos.",
    wide: true,
  },
  {
    icon: BadgeCheck,
    title: "Cupom com data e prova",
    description: "Cada código mostra status de validação, quando foi conferido e as regras de uso.",
  },
  {
    icon: ShieldCheck,
    title: "A compra é sua, na loja",
    description: "Você confere tudo e finaliza no ambiente da própria loja responsável.",
  },
  {
    icon: Coins,
    title: "O preço em créditos aparece antes",
    description: "Você sempre sabe quanto custa antes de resgatar. Nenhum débito surpresa.",
    wide: true,
  },
];

/** Indicadores demonstrativos exibidos abaixo dos pilares de confiança. */
const ASSURANCES: { value: string; label: string }[] = [
  { value: "100%", label: "Do custo em créditos exibido antes do resgate" },
  { value: "0", label: "Rastreadores carregados sem o seu consentimento" },
  { value: "24h", label: "Janela de revisão dos cupons demonstrativos" },
];

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
        <SectionHeading
          eyebrow="Confiança"
          title="Nenhuma surpresa entre o clique e o carrinho"
          align="center"
          className="mx-auto items-center text-center [&_h2]:text-offwhite [&_p]:text-offwhite/65 [&_span]:text-offwhite/60"
        />

        {/* Bento: alternância 2/1 e 1/2 cria assimetria equilibrada sem quebrar o ritmo. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 80}
                className={cn(
                  "noir-card hover-sheen motion-safe-transform group relative flex flex-col overflow-hidden rounded-[18px] p-6 sm:p-8",
                  pillar.wide && "lg:col-span-2",
                )}
              >
                <span
                  aria-hidden
                  className="halo-gradient pointer-events-none absolute -right-16 -top-20 h-44 w-56 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-45"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="gold-medallion grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className="font-serif text-fluid-sm tabular-nums text-offwhite/25 transition-colors duration-300 group-hover:text-gold/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 font-serif text-fluid-h3 tracking-tight text-offwhite">
                  {pillar.title}
                </h3>
                <p className="relative mt-2 max-w-[46ch] text-fluid-sm text-offwhite/65">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </ul>

        {/* Indicadores: reforçam as promessas com números legíveis. */}
        <Reveal
          as="dl"
          delay={320}
          className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-offwhite/12 bg-offwhite/10 sm:grid-cols-3 lg:gap-px"
        >
          {ASSURANCES.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 bg-ink/85 px-6 py-8 text-center"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="gold-text font-serif text-fluid-h2 leading-none tabular-nums">
                {item.value}
              </dd>
              <p className="max-w-[26ch] text-fluid-xs text-offwhite/60">{item.label}</p>
            </div>
          ))}
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
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
