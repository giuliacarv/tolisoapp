import { MousePointerClick, PackageCheck, Search, Wallet } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

const STEPS = [
  {
    icon: Search,
    title: "Encontre o produto",
    description:
      "Busque por nome, marca ou categoria e compare o preço atual com o histórico das principais lojas.",
  },
  {
    icon: MousePointerClick,
    title: "Confira a oferta",
    description:
      "Mostramos desconto real, cupom aplicável e condições de frete antes de você sair do DESCONTAI.",
  },
  {
    icon: PackageCheck,
    title: "Compre na loja oficial",
    description:
      "Você é redirecionado para Shopee, TikTok Shop, Mercado Livre, Ponto Frio ou Amazon para finalizar com segurança.",
  },
  {
    icon: Wallet,
    title: "Acompanhe sua economia",
    description:
      "Cada compra registrada soma à sua economia acumulada e libera créditos dentro da plataforma.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Quatro passos, nenhuma pegadinha"
          description="O DESCONTAI não vende produtos. Reunimos, verificamos e organizamos as melhores ofertas — a compra acontece direto na loja parceira."
          align="center"
          className="mx-auto items-center"
        />

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background">
                  <step.icon className="h-4.5 w-4.5 text-gold" strokeWidth={1.75} />
                </span>
                <span className="font-serif text-2xl text-border">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
