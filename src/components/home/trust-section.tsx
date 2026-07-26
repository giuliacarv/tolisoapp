import { BadgeCheck, Coins, Info, ShieldCheck, Store } from "lucide-react";
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
    title: "Lojas reconhecidas",
    description: "Ofertas provenientes de marketplaces e varejistas conhecidos.",
    wide: true,
  },
  {
    icon: BadgeCheck,
    title: "Cupons revisados",
    description: "Cupons com status de validação, data de verificação e regras disponíveis.",
  },
  {
    icon: ShieldCheck,
    title: "Redirecionamento seguro",
    description: "Você confere e finaliza a compra diretamente na plataforma responsável.",
  },
  {
    icon: Coins,
    title: "Economia transparente",
    description: "Antes de resgatar, você sempre verá a quantidade de créditos necessária.",
    wide: true,
  },
];

export function TrustSection() {
  return (
    <section
      id="transparencia"
      className="noir-band section-y scroll-mt-[calc(var(--header-h)+1rem)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Confiança"
          title="Transparência em cada oferta"
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
                  "noir-card motion-safe-transform flex flex-col rounded-[18px] p-6 sm:p-8",
                  pillar.wide && "lg:col-span-2",
                )}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/25 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 font-serif text-fluid-h3 tracking-tight text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-fluid-sm text-offwhite/65">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </ul>

        <p className="mx-auto mt-12 grid max-w-3xl grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-2xl border border-offwhite/12 bg-offwhite/5 px-6 py-4 text-fluid-xs text-offwhite/60">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.7} aria-hidden />
          <span className="min-w-0">
            Alguns links desta plataforma são links de afiliado. Podemos receber uma comissão quando
            uma compra é realizada, sem custo adicional para você.
          </span>
        </p>
      </Container>
    </section>
  );
}
