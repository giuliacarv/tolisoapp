import { Coins, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  INITIAL_CREDIT_BALANCE,
  describeCouponCreditRule,
  describeProductCreditRule,
  formatCreditCount,
} from "@/config/business-rules";

import { Shell, SolHeading, SolSection } from "./shell";

/** Carteira demonstrativa em faixa laranja — bloco de maior contraste da página. */
export function SolCredits() {
  const low = describeProductCreditRule("low");
  const high = describeProductCreditRule("high");
  const coupon = describeCouponCreditRule();

  return (
    <SolSection id="sol-creditos">
      <Shell>
        <div className="sol-band grid gap-10 rounded-[2.5rem] p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white">
              Créditos
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,5vw,3.2rem)] text-white">
              Um saldo simples, sem assinatura escondida
            </h2>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-white/85">
              Créditos liberam o desconto ou o cupom. Você começa com{" "}
              {formatCreditCount(INITIAL_CREDIT_BALANCE)} nesta demonstração e nada é cobrado nesta
              etapa do projeto.
            </p>
            <Link to="/creditos" className="sol-pill-ink mt-7 text-sm">
              Conhecer os pacotes
            </Link>
          </div>

          <div className="sol-card p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Saldo demonstrativo
              </span>
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-[-0.05em] text-foreground">
                {INITIAL_CREDIT_BALANCE}
              </span>
              <span className="text-sm font-bold text-muted-foreground">créditos</span>
            </p>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {Array.from({ length: INITIAL_CREDIT_BALANCE }).map((_, index) => (
                <span key={index} className="h-2 flex-1 rounded-full bg-primary" />
              ))}
            </div>

            <dl className="mt-6 space-y-2">
              {[low.sentence, high.sentence, coupon.sentence].map((rule) => (
                <div
                  key={rule}
                  className="flex items-start gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-foreground"
                >
                  <Coins className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} aria-hidden />
                  <dd>{rule}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Shell>
    </SolSection>
  );
}
