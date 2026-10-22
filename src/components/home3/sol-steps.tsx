import { HOW_IT_WORKS_STEPS } from "@/data/how-it-works";

import { Shell, SolHeading, SolSection } from "./shell";

/** Passo a passo em três colunas numeradas com trilho laranja. */
export function SolSteps() {
  return (
    <SolSection id="sol-como-funciona">
      <Shell>
        <SolHeading
          align="center"
          eyebrow="Como funciona"
          title="Como pesquisar produtos"
          description="Pesquise, consulte as lojas e compare as condições reais antes de decidir."
          className="text-center"
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className="sol-card sol-card-hover relative flex flex-col gap-4 p-7">
                <span className="absolute -top-5 left-7 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <span className="mt-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                <p className="mt-auto rounded-2xl bg-secondary px-4 py-3 text-xs font-semibold text-foreground">
                  {step.highlight}
                </p>
              </li>
            );
          })}
        </ol>
      </Shell>
    </SolSection>
  );
}
