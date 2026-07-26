import { ArrowRight, BadgeCheck, ShieldCheck, TrendingDown } from "lucide-react";

import { Container } from "./primitives";

const STORES = ["Shopee", "TikTok Shop", "Mercado Livre", "Ponto Frio", "Amazon"];

const STATS = [
  { value: "38.400+", label: "ofertas verificadas" },
  { value: "R$ 2,1 mi", label: "economizados pelos usuários" },
  { value: "5", label: "grandes lojas parceiras" },
];

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_70%)]"
      />
      <Container className="relative py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="flex flex-col items-start gap-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground">
              <BadgeCheck className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
              Curadoria humana + verificação diária de preços
            </span>

            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
              As melhores ofertas do Brasil,
              <span className="block text-muted-foreground">sem ruído e sem enrolação.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              O DESCONTAI reúne produtos da Shopee, TikTok Shop, Mercado Livre, Ponto Frio e Amazon
              em um só lugar. Comparamos o histórico de preço, validamos cada cupom e mostramos
              apenas o que realmente vale a pena.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#ofertas"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-graphite"
              >
                Explorar ofertas do dia
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
              <a
                href="#cupons"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Ver cupons validados
              </a>
            </div>

            <dl className="grid w-full grid-cols-1 gap-6 border-t border-border pt-7 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-2xl text-foreground">{stat.value}</span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Painel de preço
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saving/10 px-2.5 py-1 text-xs font-semibold text-saving">
                  <TrendingDown className="h-3.5 w-3.5" strokeWidth={2} />
                  menor preço em 90 dias
                </span>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary font-serif text-xl text-muted-foreground">
                  1
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Fone Bluetooth ANC Pro 5
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Amazon · Frete grátis Prime</p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="font-serif text-2xl text-foreground">R$ 289,90</span>
                    <span className="text-sm text-muted-foreground line-through">R$ 469,00</span>
                    <span className="rounded-md bg-discount/10 px-2 py-0.5 text-xs font-semibold text-discount">
                      -38%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                {[
                  { store: "Mercado Livre", price: "R$ 312,00", width: "w-[70%]" },
                  { store: "Shopee", price: "R$ 329,90", width: "w-[78%]" },
                  { store: "Ponto Frio", price: "R$ 398,00", width: "w-[92%]" },
                ].map((row) => (
                  <div key={row.store} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted-foreground">{row.store}</p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary">
                        <div className={`h-1.5 rounded-full bg-ink/70 ${row.width}`} />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-foreground">{row.price}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} />
                Dados ilustrativos. Preços conferidos antes de cada publicação.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Lojas monitoradas
          </span>
          {STORES.map((store) => (
            <span key={store} className="text-sm font-semibold text-foreground/70">
              {store}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
