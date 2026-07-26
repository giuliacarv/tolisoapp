import { Eye, HandCoins, LockKeyhole, ScrollText } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

const PILLARS = [
  {
    icon: Eye,
    title: "Preço conferido na fonte",
    description:
      "Cada oferta é comparada com o histórico da própria loja. Se o desconto for artificial, ela não é publicada.",
  },
  {
    icon: HandCoins,
    title: "Somos remunerados por afiliação",
    description:
      "Ao comprar pelos nossos links, recebemos uma comissão da loja. O preço para você é exatamente o mesmo.",
  },
  {
    icon: ScrollText,
    title: "Critérios públicos de curadoria",
    description:
      "Explicamos abertamente como escolhemos e ordenamos as ofertas. Nenhum destaque é vendido.",
  },
  {
    icon: LockKeyhole,
    title: "Compra na loja oficial",
    description:
      "O pagamento nunca acontece no DESCONTAI. Você finaliza no ambiente seguro da loja parceira.",
  },
];

export function TrustSection() {
  return (
    <section id="transparencia" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionHeading
            eyebrow="Confiança e transparência"
            title="Sem preço fantasma, sem promessa exagerada"
            description="Um marketplace de ofertas só é útil se for honesto. Estes são os compromissos que sustentam o DESCONTAI."
          />

          <ul className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-[18px] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background">
                  <pillar.icon className="h-4.5 w-4.5 text-gold" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
