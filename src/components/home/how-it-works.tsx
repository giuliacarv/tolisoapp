import { ChevronDown, ChevronRight } from "lucide-react";

import { HOW_IT_WORKS_STEPS, type HowItWorksStep } from "@/data/how-it-works";
import { cn } from "@/lib/utils";

import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./reveal";

interface StepCardProps {
  step: HowItWorksStep;
  index: number;
}

/**
 * Cartão de uma etapa. Componente isolado para manter o container legível e
 * permitir reuso na página `/como-funciona`.
 */
export function HowItWorksStepCard({ step, index }: StepCardProps) {
  const Icon = step.icon;
  const highlightId = `how-it-works-${step.id}-highlight`;

  return (
    <div
      className="group relative flex h-full flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 text-left backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1 hover:border-gold/35 lg:items-center lg:gap-5 lg:border-transparent lg:bg-transparent lg:p-2 lg:text-center lg:backdrop-blur-none"
      tabIndex={0}
      aria-describedby={highlightId}
    >
      {/* No mobile o medalhão e o número dividem a mesma linha para reduzir
          a altura do cartão; no desktop voltam a empilhar sobre o trilho. */}
      <div className="flex w-full items-center gap-4 lg:w-auto lg:flex-col lg:gap-5">
        {/* Medalhão sobre o trilho: âncora visual da etapa. */}
        <span
          className={cn(
            "relative grid h-14 w-14 shrink-0 place-items-center rounded-full lg:h-16 lg:w-16",
            "border border-gold/30 bg-background",
            "transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            "group-hover:border-gold/70 group-focus-within:border-gold/70",
            "motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105",
          )}
        >
          <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden />
          <span className="sr-only">{`Etapa ${index + 1} de ${HOW_IT_WORKS_STEPS.length}`}</span>
        </span>

        <span
          aria-hidden
          className="gold-text font-serif text-4xl leading-none tabular-nums opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 lg:text-5xl lg:opacity-60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 space-y-3">
        <h3 className="font-serif text-fluid-h3 tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold group-focus-within:text-gold">
          {step.title}
        </h3>
        <p className="max-w-[42ch] text-fluid-sm leading-[1.7] text-muted-foreground lg:mx-auto">
          {step.description}
        </p>
        {/* No mobile não existe hover: o destaque nasce visível para não
            deixar um bloco vazio ocupando altura na dobra. */}
        <p
          id={highlightId}
          className={cn(
            "max-w-[42ch] rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-fluid-micro leading-relaxed text-muted-foreground lg:mx-auto",
            "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            "lg:motion-safe:translate-y-1 lg:motion-safe:opacity-0",
            "group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
          )}
        >
          {step.highlight}
        </p>
      </div>
    </div>
  );

}

/**
 * Seção "Como funciona" — três etapas conectadas por um trilho horizontal no
 * desktop e por setas verticais no mobile.
 */
export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="section-band section-y scroll-mt-[calc(var(--header-h)+1rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Como funciona"
            title={<span id="como-funciona-title">Três passos entre você e o preço justo</span>}
            description="Você diz o que procura, a inteligência artificial confere se o desconto é real e você finaliza a compra direto na loja parceira."
            className="mx-auto items-center text-center"
          />
        </Reveal>

        <div className="relative mt-10 sm:mt-14 lg:mt-20">
          {/* Trilho contínuo que costura as três etapas (desktop). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent lg:block"
          />

          <ol className="relative grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

              return (
                <Reveal
                  as="li"
                  key={step.id}
                  delay={index * 110}
                  className="relative flex flex-col items-center"
                >
                  <HowItWorksStepCard step={step} index={index} />

                  {/* Conectores: seta para baixo no mobile, seta lateral no desktop. */}
                  {!isLast ? (
                    <>
                      <span
                        aria-hidden
                        className="mt-5 grid h-8 w-8 place-items-center rounded-full border border-border/70 text-gold/70 md:hidden"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-[-1.25rem] top-8 hidden -translate-y-1/2 text-gold/60 lg:block"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                    </>
                  ) : null}
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
