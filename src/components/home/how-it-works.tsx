import { Coins, Search, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

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
    <section id="como-funciona" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title="Economizar ficou mais simples"
          description="Descubra uma oferta, utilize seus créditos e finalize sua compra diretamente na loja parceira."
          className="mx-auto items-center text-center"
        />

        <div className="relative mt-14">
          {/* Linha conectando as etapas — apenas no desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="flex flex-col items-start gap-4 lg:items-center lg:text-center"
                >
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-soft">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} aria-hidden />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-offwhite">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0 space-y-2">
                    <h3 className="font-serif text-xl tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
