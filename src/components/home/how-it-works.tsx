import { Coins, Search, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container, SectionHeading } from "./primitives";
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

        <div className="relative mt-14 sm:mt-20">
          {/*
           * Trilho contínuo que costura as três etapas. Agora fica visível
           * (os cards deixaram de ser caixas opacas sobrepostas a ele).
           */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent lg:block"
          />

          <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 110}
                  className="group relative flex flex-col items-start gap-5 lg:items-center lg:text-center"
                >
                  {/* Medalhão sobre o trilho: âncora visual de cada etapa. */}
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/30 bg-background transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover:-translate-y-1 group-hover:border-gold/60">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
                  </span>

                  <span
                    aria-hidden
                    className="gold-text font-serif text-5xl leading-none tabular-nums opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 space-y-3">
                    <h3 className="font-serif text-fluid-h3 tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="max-w-[38ch] text-fluid-sm leading-[1.7] text-muted-foreground lg:mx-auto">
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
