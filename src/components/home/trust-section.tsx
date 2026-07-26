import { BadgeCheck, Coins, Info, ShieldCheck, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Store,
    title: "Lojas reconhecidas",
    description: "Ofertas provenientes de marketplaces e varejistas conhecidos.",
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
  },
];

export function TrustSection() {
  return (
    <section id="transparencia" className="section-y scroll-mt-[calc(var(--header-h)+1rem)]">
      <Container>
        <SectionHeading
          eyebrow="Confiança"
          title="Transparência em cada oferta"
          align="center"
          className="mx-auto items-center text-center"
        />

        <ul className="mt-14 grid-fluid [--col-min:14rem]">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className="rounded-[18px] border border-border bg-card p-6 shadow-soft motion-safe-transform transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background">
                  <Icon className="h-4.5 w-4.5 text-gold" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 grid max-w-3xl grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-2xl border border-border bg-secondary/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.7} aria-hidden />
          <span className="min-w-0">
            Alguns links desta plataforma são links de afiliado. Podemos receber uma comissão quando
            uma compra é realizada, sem custo adicional para você.
          </span>
        </p>
      </Container>
    </section>
  );
}
