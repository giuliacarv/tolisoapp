import { Coins, Gift, Repeat, Sparkles } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

const BENEFITS = [
  {
    icon: Coins,
    title: "Acumule a cada compra",
    description: "Compras confirmadas nas lojas parceiras geram créditos automaticamente na sua conta.",
  },
  {
    icon: Repeat,
    title: "Use como quiser",
    description: "Troque créditos por alertas premium, listas ilimitadas e acesso antecipado às ofertas.",
  },
  {
    icon: Gift,
    title: "Indique e ganhe",
    description: "Cada indicação ativa rende créditos extras para você e para quem foi indicado.",
  },
];

export function CreditsSystem() {
  return (
    <section
      id="creditos"
      className="scroll-mt-24 border-y border-border bg-ink py-20 text-white sm:py-24"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="flex flex-col gap-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-medium text-gold">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Sistema de créditos DESCONTAI
            </span>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              Sua economia vira benefício dentro da plataforma
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/65">
              Além de economizar na compra, você acumula créditos por participar: validar cupons,
              avaliar ofertas e indicar amigos. Simples, transparente e sem letras miúdas.
            </p>

            <ul className="grid gap-4 sm:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit.title}
                  className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-gold/40"
                >
                  <benefit.icon className="h-5 w-5 text-gold" strokeWidth={1.75} />
                  <h3 className="mt-4 text-sm font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Prévia da carteira
            </p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-serif text-4xl text-gold">1.480</span>
              <span className="text-sm text-white/60">créditos</span>
            </div>
            <div className="mt-6 h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-[62%] rounded-full bg-gold" />
            </div>
            <p className="mt-3 text-xs text-white/55">
              Faltam 520 créditos para desbloquear o nível Ouro.
            </p>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
              {[
                { label: "Compra confirmada · Amazon", value: "+320" },
                { label: "Cupom validado · Shopee", value: "+60" },
                { label: "Indicação ativa", value: "+250" },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                  <span className="truncate text-[13px] text-white/70">{item.label}</span>
                  <span className="text-[13px] font-semibold text-gold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
