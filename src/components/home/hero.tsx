import { ArrowRight, BadgeCheck, Link2, ShieldCheck, Sparkles, Store, TicketCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import espressoImage from "@/assets/hero-product-espresso.jpg";
import headphonesImage from "@/assets/hero-product-headphones.jpg";
import smartwatchImage from "@/assets/hero-product-smartwatch.jpg";

/** Sinais de confiança exibidos abaixo dos CTAs. */
const TRUST_SIGNALS = [
  { label: "Ofertas selecionadas", icon: BadgeCheck },
  { label: "Cupons verificados", icon: TicketCheck },
  { label: "Lojas reconhecidas", icon: Store },
  { label: "Links seguros", icon: ShieldCheck },
];

interface HeroOffer {
  id: string;
  name: string;
  image: string;
  store: string;
  oldPrice: string;
  price: string;
  discount: string;
  credits: number;
}

/** Exemplos fictícios usados apenas para a composição visual do hero. */
const HERO_OFFERS: HeroOffer[] = [
  {
    id: "fone",
    name: "Fone Bluetooth ANC Studio",
    image: headphonesImage,
    store: "Amazon",
    oldPrice: "R$ 469,00",
    price: "R$ 289,90",
    discount: "-38%",
    credits: 1,
  },
  {
    id: "relogio",
    name: "Smartwatch Titanium 46mm",
    image: smartwatchImage,
    store: "Mercado Livre",
    oldPrice: "R$ 899,00",
    price: "R$ 629,00",
    discount: "-30%",
    credits: 2,
  },
  {
    id: "cafeteira",
    name: "Cafeteira Espresso Compact",
    image: espressoImage,
    store: "Shopee",
    oldPrice: "R$ 1.199,00",
    price: "R$ 849,00",
    discount: "-29%",
    credits: 2,
  },
];

function OfferCard({
  offer,
  className,
  priority = false,
}: {
  offer: HeroOffer;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "w-full rounded-[18px] border border-border bg-card p-4 shadow-soft",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-secondary">
          <img
            src={offer.image}
            alt={offer.name}
            width={800}
            height={800}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {offer.store}
            </span>
            <span className="shrink-0 rounded-md bg-discount/10 px-1.5 py-0.5 text-[11px] font-semibold text-discount">
              {offer.discount}
            </span>
          </div>

          <p className="mt-1 truncate text-sm font-semibold text-foreground">{offer.name}</p>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-lg text-foreground">{offer.price}</span>
            <span className="text-xs text-muted-foreground line-through">{offer.oldPrice}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
          {offer.credits} {offer.credits === 1 ? "crédito" : "créditos"} para desbloquear
        </span>
        <Link2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_70%)]"
      />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-12">
          <div className="flex flex-col items-start gap-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
              Você começa com 5 créditos grátis.
            </span>

            <h1 className="max-w-[16ch] font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[58px]">
              Ofertas selecionadas para você economizar de verdade.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              Encontre produtos relevantes, resgate cupons validados e compre com segurança nas
              maiores lojas do Brasil.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#ofertas"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-graphite"
              >
                Explorar ofertas
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href="#cupons"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Ver cupons
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-7 text-[13px] text-muted-foreground">
              {TRUST_SIGNALS.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-saving" strokeWidth={2} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(70%_60%_at_60%_30%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_75%)]"
            />
            <div className="relative flex flex-col gap-4 sm:gap-0">
              <OfferCard offer={HERO_OFFERS[0]} priority className="sm:w-[92%] sm:rotate-[-1.2deg]" />
              <OfferCard
                offer={HERO_OFFERS[1]}
                className="sm:-mt-3 sm:ml-auto sm:w-[94%] sm:translate-x-2 sm:rotate-[0.8deg]"
              />
              <OfferCard
                offer={HERO_OFFERS[2]}
                className="sm:-mt-3 sm:w-[90%] sm:rotate-[-0.6deg]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
