import { BadgeCheck, Eye, Lock, Store } from "lucide-react";

import { Shell, SolHeading, SolSection } from "./shell";
import { hasLiveCatalog } from "@/services/live-catalog-source";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Vitrine em demonstração",
    text: "Os preços e descontos exibidos nos exemplos não são acompanhados em tempo real.",
  },
  {
    icon: Store,
    title: "Consulta diretamente nas lojas",
    text: "Os atalhos de pesquisa abrem as páginas públicas da Amazon e do Mercado Livre.",
  },
  {
    icon: Eye,
    title: "Monetização futura",
    text: "Os atalhos de pesquisa não são links de afiliados. Integrações comerciais ainda não foram ativadas.",
  },
  {
    icon: Lock,
    title: "Dados no seu dispositivo",
    text: "Favoritos e histórico ficam salvos localmente enquanto não há conta.",
  },
] as const;

/** Quatro pilares de transparência em cartões brancos. */
export function SolTrust() {
  const live = hasLiveCatalog();
  return (
    <SolSection className="bg-secondary/60">
      <Shell>
        <SolHeading
          eyebrow="Confiança"
          title="Transparência é parte do produto"
          description={live ? "A vitrine pública mostra somente ofertas recentemente verificadas e aprovadas no catálogo." : "Esta versão mostra exemplos fictícios e direciona buscas para lojas externas."}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(live ? [
            { icon: BadgeCheck, title: "Revisão recente", text: "Apenas ofertas verificadas nos últimos 7 dias aparecem no catálogo público." },
            { icon: Store, title: "Compra na loja", text: "A compra, o pagamento e a entrega são responsabilidade do vendedor." },
            { icon: Eye, title: "Fonte identificada", text: "Cada oferta cadastrada contém uma URL de origem e um destino." },
            { icon: Lock, title: "Favoritos locais", text: "Seus favoritos e itens vistos recentemente são armazenados neste dispositivo." },
          ] : PILLARS).map(({ icon: Icon, title, text }) => (
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
