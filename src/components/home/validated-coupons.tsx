import { BadgeCheck, Copy, Ticket } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

interface Coupon {
  store: string;
  code: string;
  benefit: string;
  detail: string;
  validity: string;
  rate: string;
}

const COUPONS: Coupon[] = [
  {
    store: "Shopee",
    code: "DESCONTAI15",
    benefit: "15% OFF",
    detail: "Em pedidos acima de R$ 120 no app",
    validity: "Válido até 31/07",
    rate: "97% funcionou",
  },
  {
    store: "Amazon",
    code: "PRIME30",
    benefit: "R$ 30 OFF",
    detail: "Primeira compra em eletrônicos",
    validity: "Válido até 05/08",
    rate: "94% funcionou",
  },
  {
    store: "Mercado Livre",
    code: "FRETEZERO",
    benefit: "Frete grátis",
    detail: "Produtos Full sem valor mínimo",
    validity: "Válido até 28/07",
    rate: "99% funcionou",
  },
  {
    store: "Ponto Frio",
    code: "CASA12",
    benefit: "12% OFF",
    detail: "Linha de eletroportáteis selecionados",
    validity: "Válido até 03/08",
    rate: "91% funcionou",
  },
];

function CouponCard({ coupon }: { coupon: Coupon }) {
  return (
    <article className="group relative flex flex-col gap-5 rounded-[18px] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{coupon.store}</p>
          <p className="mt-1 text-xs text-muted-foreground">{coupon.detail}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-background">
          <Ticket className="h-4 w-4 text-gold" strokeWidth={1.75} />
        </span>
      </div>

      <p className="font-serif text-3xl leading-none text-foreground">{coupon.benefit}</p>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3">
        <span className="truncate font-mono text-sm font-semibold tracking-wide text-foreground">
          {coupon.code}
        </span>
        <button
          type="button"
          aria-label={`Copiar cupom ${coupon.code}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-gold"
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
          Copiar
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-saving">
          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
          {coupon.rate}
        </span>
        <span className="text-muted-foreground">{coupon.validity}</span>
      </div>
    </article>
  );
}

export function ValidatedCoupons() {
  return (
    <section id="cupons" className="scroll-mt-24 border-y border-border bg-secondary/60 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Cupons validados"
          title="Códigos testados antes de chegarem até você"
          description="Nossa equipe revalida os cupons diariamente e exibe a taxa real de sucesso informada pela comunidade."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COUPONS.map((coupon) => (
            <CouponCard key={coupon.code} coupon={coupon} />
          ))}
        </div>
      </Container>
    </section>
  );
}
