import { Coins, Search, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container, SectionHeading, cardBase } from "./primitives";
import { Reveal } from "./reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: Search,
    title: "Encontre uma oportunidade",
    description: "Explore produtos e cupons selecionados nas principais lojas online.",
  },
  {
    icon: Coins,
    title: "Resgate com créditos",
    description: "Utilize seus créditos para liberar o desconto, o cupom ou o acesso à oferta.",
  },
  {
    icon: Store,
    title: "Compre na loja parceira",
    description: "Você será direcionado para a plataforma responsável pela venda e entrega.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-band section-y scroll-mt-[calc(var(--header-h)+1rem)]"
    >
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title="Economizar ficou mais simples"
          description="Descubra uma oferta, utilize seus créditos e finalize sua compra diretamente na loja parceira."
          className="mx-auto items-center text-center"
        />

        <div className="relative mt-12 sm:mt-16">
          {/* Trilho que costura as três etapas — some no mobile, onde a leitura é vertical. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[18%] top-16 hidden h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent lg:block"
          />

          <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 90}
                  className={cn(
                    cardBase,
                    "flex h-full flex-col items-start gap-4 p-6 sm:p-8 lg:items-center lg:text-center",
                  )}
                >
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border bg-background">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} aria-hidden />
                    <span className="gold-medallion absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold tabular-nums">
                      {index + 1}
                    </span>
                  </span>

                  <div className="min-w-0 space-y-2">
                    <h3 className="font-serif text-fluid-h3 tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="max-w-sm text-fluid-sm text-muted-foreground lg:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
