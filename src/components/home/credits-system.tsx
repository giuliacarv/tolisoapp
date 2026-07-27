import { ArrowRight, Coins, Minus, Ticket, Wallet } from "lucide-react";
import { toast } from "sonner";

import {
  INITIAL_CREDIT_BALANCE,
  PRODUCT_CREDIT_COST_LOW,
  describeCouponCreditRule,
  describeInitialBalance,
  describeProductCreditRule,
  formatCreditCount,
} from "@/config/business-rules";
import { COUPON_REDEMPTION_COST } from "@/domain/coupons/coupon-rules";

import { handleAnchorClick } from "@/lib/smooth-scroll";

import { Container, buttonBase } from "./primitives";

/** Regras de custo — espelham as funções em src/data/products.ts e src/data/coupons.ts. */
const RULES = [
  { icon: Coins, label: describeProductCreditRule("low").sentence },
  { icon: Coins, label: describeProductCreditRule("high").sentence },
  { icon: Ticket, label: describeCouponCreditRule().sentence },
];

/**
 * Saldo final do extrato demonstrativo. Derivado das constantes de negócio
 * para que o número exibido nunca contradiga as regras acima.
 */
const REMAINING_BALANCE = INITIAL_CREDIT_BALANCE - PRODUCT_CREDIT_COST_LOW - COUPON_REDEMPTION_COST;

const LEDGER = [
  { label: "Saldo inicial", value: describeInitialBalance(), tone: "neutral" as const },
  { label: "Resgate de produto", value: `−${formatCreditCount(PRODUCT_CREDIT_COST_LOW)}`, tone: "debit" as const },
  { label: "Resgate de cupom", value: `−${describeCouponCreditRule().cost}`, tone: "debit" as const },
];

export function CreditsSystem() {
  function handlePlansClick() {
    notifyComingSoon();
  }

  return (
    <section id="creditos" className="section-y scroll-mt-[calc(var(--header-h)+1rem)]">
      <Container>
        <div className="noir-band rounded-3xl px-6 py-12 text-offwhite sm:px-12 sm:py-16">
          {/* Halo dourado difuso: dá volume ao bloco escuro sem poluir o conteúdo. */}
          <div
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[140%] opacity-40"
          />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">

            <div className="min-w-0 space-y-6">
              <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" aria-hidden />
                Sistema de créditos
              </span>

              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                Seus créditos desbloqueiam novas economias
              </h2>

              <p className="max-w-xl text-fluid-sm leading-relaxed text-offwhite/70">
                Toda nova conta começa com 5 créditos gratuitos. Use os créditos para resgatar
                produtos e cupons exclusivos.
              </p>

              <ul className="space-y-3">
                {RULES.map((rule) => {
                  const Icon = rule.icon;
                  return (
                    <li key={rule.label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-offwhite/15 bg-offwhite/5">
                        <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="min-w-0 text-sm leading-relaxed text-offwhite/85">
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col items-start gap-4 pt-2">
                <a
                  href="#creditos"
                  onClick={(event) => {
                    handleAnchorClick(event, "#creditos");
                    handlePlansClick();
                  }}
                  className={`${buttonBase} group bg-gold px-6 text-ink hover:bg-gold-soft focus-visible:ring-offset-ink`}
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
              </div>
            </div>

            {/* Exemplo visual de saldo — valores ilustrativos */}
            <div className="glass-surface min-w-0 rounded-2xl border-offwhite/12 bg-graphite/60 p-6 sm:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-offwhite/8">
                    <Wallet className="h-4 w-4 text-gold" strokeWidth={1.7} aria-hidden />
                  </span>
                  <p className="truncate text-sm font-medium text-offwhite">Exemplo de uso</p>
                </div>
                <span className="shrink-0 rounded-full border border-offwhite/15 px-3 py-1 text-fluid-micro text-offwhite/60">
                  Ilustrativo
                </span>
              </div>

              <dl className="mt-6 space-y-1">
                {LEDGER.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-offwhite/8 py-3"
                  >
                    <dt className="flex min-w-0 items-center gap-2 text-sm text-offwhite/70">
                      {row.tone === "debit" ? (
                        <Minus className="h-3 w-3 shrink-0 text-offwhite/40" aria-hidden />
                      ) : null}
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
                  </div>
                ))}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pt-4">
                  <dt className="truncate text-sm font-medium text-offwhite">Saldo restante</dt>
                  <dd className="shrink-0 font-serif text-2xl text-gold">{formatCreditCount(REMAINING_BALANCE)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CreditsSystem as CreditsSection };
