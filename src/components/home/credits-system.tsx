import { ArrowRight, Coins, Sparkles, Ticket, Wallet } from "lucide-react";

import {
  INITIAL_CREDIT_BALANCE,
  PRODUCT_CREDIT_COST_HIGH,
  PRODUCT_CREDIT_COST_LOW,
  describeCouponCreditRule,
  describeProductCreditRule,
  formatCreditCount,
} from "@/config/business-rules";
import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";
import { useComingSoon } from "@/hooks/use-coming-soon";

import { handleAnchorClick } from "@/lib/smooth-scroll";

import { Reveal } from "./reveal";
import { Container, buttonBase } from "./primitives";

/**
 * Regras de custo — derivadas de `business-rules` para que a vitrine nunca
 * contradiga o cálculo real aplicado nos modais de resgate.
 */
const RULES = [
  { icon: Coins, label: describeProductCreditRule("low").sentence, cost: PRODUCT_CREDIT_COST_LOW },
  { icon: Coins, label: describeProductCreditRule("high").sentence, cost: PRODUCT_CREDIT_COST_HIGH },
  { icon: Ticket, label: describeCouponCreditRule().sentence, cost: COUPON_REDEMPTION_COST },
];

/** Créditos consumidos no extrato demonstrativo (produto + cupom). */
const SPENT_CREDITS = PRODUCT_CREDIT_COST_LOW + COUPON_REDEMPTION_COST;

/** Saldo final do exemplo. Nunca digitado à mão: sempre derivado das regras. */
const REMAINING_BALANCE = INITIAL_CREDIT_BALANCE - SPENT_CREDITS;

/** Percentual restante — alimenta a barra de consumo do painel. */
const REMAINING_RATIO = Math.max(0, Math.min(1, REMAINING_BALANCE / INITIAL_CREDIT_BALANCE));

const LEDGER = [
  { label: "Saldo inicial", value: formatCreditCount(INITIAL_CREDIT_BALANCE), tone: "credit" as const },
  {
    label: "Resgate de produto",
    value: `−${formatCreditCount(PRODUCT_CREDIT_COST_LOW)}`,
    tone: "debit" as const,
  },
  {
    label: "Resgate de cupom",
    value: `−${formatCreditCount(COUPON_REDEMPTION_COST)}`,
    tone: "debit" as const,
  },
];

/**
 * Medidor de moedas: representa o saldo inicial como discos individuais.
 *
 * Por que discos e não apenas um número: torna a economia tangível — o usuário
 * "vê" quantos resgates ainda cabem no saldo, sem precisar fazer a conta.
 */
function CreditMeter() {
  const pips = Array.from({ length: INITIAL_CREDIT_BALANCE }, (_, index) => index);

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="img"
      aria-label={`${formatCreditCount(REMAINING_BALANCE)} disponíveis de ${formatCreditCount(INITIAL_CREDIT_BALANCE)}`}
    >
      {pips.map((index) => (
        <span
          key={index}
          aria-hidden
          className="credit-pip"
          data-state={index < REMAINING_BALANCE ? "available" : "spent"}
        />
      ))}
    </div>
  );
}

export function CreditsSystem() {
  const notifyComingSoon = useComingSoon(
    "Os planos e o checkout serão adicionados em uma próxima etapa.",
  );

  return (
    <section id="creditos" className="section-y scroll-mt-[calc(var(--header-h)+1rem)]">
      <Container>
        <div className="noir-band relative rounded-[1.75rem] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2.5rem,6vw,4.5rem)] text-offwhite">
          {/* Camadas atmosféricas: halo, orbes e grão. Puramente decorativas. */}
          <div
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[140%] opacity-40"
          />
          <div
            aria-hidden
            className="glow-orb pointer-events-none absolute -right-16 top-4 -z-10 h-64 w-64 opacity-70"
          />
          <div
            aria-hidden
            className="glow-orb-cool pointer-events-none absolute -left-20 bottom-0 -z-10 h-72 w-72 opacity-60"
          />
          <div aria-hidden className="texture-grain pointer-events-none absolute inset-0 -z-10" />

          <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="min-w-0 space-y-6">
              <Reveal className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-[image:var(--gradient-gold)]" aria-hidden />
                Sistema de créditos
              </Reveal>

              <Reveal delay={60} as="h2" className="font-serif text-fluid-h2 leading-[1.08] tracking-[-0.025em] text-balance">
                Um crédito hoje,{" "}
                <span className="gold-text">uma economia amanhã</span>
              </Reveal>

              <Reveal delay={110} as="p" className="max-w-xl text-fluid-sm leading-[1.7] text-pretty text-offwhite/70">
                Toda nova conta começa com {formatCreditCount(INITIAL_CREDIT_BALANCE)} gratuitos —
                o suficiente para testar sem gastar nada. Cada crédito revela uma oferta conferida
                ou um cupom validado. Sem assinatura, sem pegadinha no preço final.
              </Reveal>

              <ul className="space-y-3">
                {RULES.map((rule, index) => {
                  const Icon = rule.icon;
                  return (
                    <Reveal
                      as="li"
                      key={rule.label}
                      delay={160 + index * 70}
                      className="noir-card grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-offwhite/12 bg-offwhite/5">
                        <Icon className="h-4 w-4 text-gold" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="min-w-0 text-sm leading-relaxed text-offwhite/85">
                        {rule.label}
                      </span>
                      <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-fluid-micro font-semibold text-gold">
                        {rule.cost}
                      </span>
                    </Reveal>
                  );
                })}
              </ul>

              <Reveal delay={380} className="flex flex-col items-start gap-4 pt-2">
                <a
                  href="#creditos"
                  onClick={(event) => {
                    handleAnchorClick(event, "#creditos");
                    notifyComingSoon();
                  }}
                  className={`${buttonBase} hover-sheen group bg-[image:var(--gradient-gold)] px-6 text-ink focus-visible:ring-offset-ink`}
                >
                  Conhecer planos de créditos
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
                <p className="max-w-xl text-xs leading-relaxed text-offwhite/50">
                  Os créditos são utilizados para acessar oportunidades e benefícios. A compra do
                  produto é realizada diretamente na loja parceira.
                </p>
              </Reveal>
            </div>

            {/* Carteira demonstrativa — valores ilustrativos, sem saldo real. */}
            <Reveal delay={140} className="min-w-0">
              <div className="luxe-card min-w-0 rounded-[1.5rem] p-[clamp(1.25rem,3vw,2rem)]">
                {/* No mobile o selo desce para a linha seguinte: o título
                    aparece inteiro em vez de ser truncado em "Carteira demo…". */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-offwhite/8">
                      <Wallet className="h-4 w-4 text-gold" strokeWidth={1.7} aria-hidden />
                    </span>
                    <p className="min-w-0 text-sm font-medium text-offwhite">
                      Carteira demonstrativa
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-offwhite/15 px-3 py-1 text-fluid-micro text-offwhite/60">
                    Ilustrativo
                  </span>
                </div>


                {/* Bloco de saldo: número em destaque + moedas + consumo. */}
                <div className="mt-6 rounded-2xl border border-offwhite/10 bg-ink/40 p-5">
                  <p className="text-fluid-micro uppercase tracking-[0.2em] text-offwhite/50">
                    Saldo restante
                  </p>
                  <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
                    <p className="gold-text font-serif text-[clamp(2.5rem,7vw,3.5rem)] leading-none">
                      {REMAINING_BALANCE}
                    </p>
                    <p className="shrink-0 pb-1 text-xs text-offwhite/55">
                      de {formatCreditCount(INITIAL_CREDIT_BALANCE)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <CreditMeter />
                  </div>

                  <div
                    className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-offwhite/10"
                    role="presentation"
                  >
                    <span
                      className="block h-full rounded-full bg-[image:var(--gradient-gold)] transition-[width] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                      style={{ width: `${REMAINING_RATIO * 100}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-5">
                  {LEDGER.map((row, index) => (
                    <Reveal
                      as="div"
                      key={row.label}
                      delay={220 + index * 80}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-offwhite/8 py-3"
                    >
                      <dt className="flex min-w-0 items-center gap-2 text-sm text-offwhite/70">
                        <span
                          aria-hidden
                          className={
                            row.tone === "debit"
                              ? "h-1.5 w-1.5 shrink-0 rounded-full bg-discount"
                              : "h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          }
                        />
                        <span className="truncate">{row.label}</span>
                      </dt>
                      <dd
                        className={
                          row.tone === "debit"
                            ? "shrink-0 text-sm font-semibold text-discount"
                            : "shrink-0 text-sm font-semibold text-offwhite"
                        }
                      >
                        {row.value}
                      </dd>
                    </Reveal>
                  ))}
                </dl>

                <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-offwhite/50">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden />
                  Exemplo de consumo: um resgate de produto e um de cupom a partir do saldo inicial.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CreditsSystem as CreditsSection };
