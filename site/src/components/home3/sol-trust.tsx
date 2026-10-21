import { BadgeCheck, Eye, Lock, Store } from "lucide-react";

import { Shell, SolHeading, SolSection } from "./shell";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Curadoria antes da vitrine",
    text: "A oferta só aparece quando o desconto resiste ao histórico de preço da loja.",
  },
  {
    icon: Store,
    title: "Só lojas reconhecidas",
    text: "Trabalhamos com marketplaces que você já conhece. A compra acontece direto lá.",
  },
  {
    icon: Eye,
    title: "Afiliados declarados",
    text: "Podemos receber comissão por alguns links, sem custo adicional para você.",
  },
  {
    icon: Lock,
    title: "Dados no seu dispositivo",
    text: "Favoritos e histórico ficam salvos localmente enquanto não há conta.",
  },
] as const;

/** Quatro pilares de transparência em cartões brancos. */
export function SolTrust() {
  return (
    <SolSection className="bg-secondary/60">
      <Shell>
        <SolHeading
          eyebrow="Confiança"
          title="Transparência é parte do produto"
          description="Nada de letra miúda: explicamos como a curadoria funciona e de onde vem a receita."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="sol-card sol-card-hover flex flex-col gap-3 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <h3 className="text-base font-extrabold tracking-[-0.02em] text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </Shell>
    </SolSection>
  );
}
