import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Store, TicketCheck } from "lucide-react";

import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { Container } from "./primitives";
import { Reveal } from "./reveal";

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
    credits: 2,
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

function HeroOfferCard({
  offer,
  className,
  priority = false,
}: {
  offer: HeroOffer;
  className?: string;
  priority?: boolean;
}) {
  return (
    // Sem `interactive-lift` aqui: estes cards carregam rotações decorativas
    // e um `transform` de hover sobrescreveria a inclinação da composição.
    <article
      className={cn(
        "motion-safe-transform w-full min-w-0 rounded-2xl p-4 noir-card",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="grid h-16 w-16 shrink-0 sm:h-20 sm:w-20 place-items-center overflow-hidden rounded-2xl bg-offwhite/10">
          <img
            src={offer.image}
            alt={`Foto ilustrativa: ${offer.name}`}
            width={800}
            height={800}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <span className="truncate text-fluid-micro font-semibold uppercase tracking-[0.18em] text-offwhite/55">
              {offer.store}
            </span>
            <span className="petrol-badge shrink-0 rounded-md px-1.5 py-0.5 text-fluid-micro font-semibold">
              {offer.discount}
            </span>
          </div>


          <p className="mt-1 truncate text-sm font-semibold text-offwhite">{offer.name}</p>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-lg text-offwhite">{offer.price}</span>
            <span className="text-xs text-offwhite/45 line-through">{offer.oldPrice}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-offwhite/10 pt-3">
        <span className="inline-flex items-center gap-1.5 text-fluid-micro font-medium text-offwhite/60">
          <Sparkles className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} aria-hidden />
          {offer.credits} {offer.credits === 1 ? "crédito" : "créditos"} para desbloquear
        </span>
      </div>
    </article>
  );
}


export function HeroSection() {
  return (
    <section
      id="topo"
      className="noir-band relative flex min-h-[min(100svh,52rem)] items-center overflow-x-clip scroll-mt-[var(--header-h)] pt-[var(--header-h)]"
    >
      {/* Grão fino sobre a faixa escura. Puramente decorativo. */}
      <div
        aria-hidden
        className="texture-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
      />

      {/*
       * Iluminação de vitrine: um feixe quente no alto à direita e um
       * contraluz frio à esquerda. Assimétricos de propósito.
       */}
      <div
        aria-hidden
        className="glow-orb absolute -right-24 -top-32 -z-10 h-72 w-72 sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="glow-orb-cool absolute -left-32 top-1/3 -z-10 h-64 w-64 sm:h-80 sm:w-80"
      />

      <Container className="relative section-y">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-6 sm:gap-8">
            <Reveal>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/35 bg-offwhite/5 px-3.5 py-1.5 text-xs font-medium text-offwhite/85 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} aria-hidden />
                <span className="min-w-0">Você começa com 5 créditos grátis.</span>
              </span>
            </Reveal>

            <Reveal delay={40}>
              <span className="block text-fluid-micro font-semibold uppercase tracking-[0.28em] text-gold">
                Curadoria premium
              </span>
            </Reveal>


            <Reveal delay={80}>
              <h1 className="max-w-[18ch] text-balance font-serif text-fluid-h1 leading-[1.04] tracking-[-0.03em] text-offwhite">
                Ofertas selecionadas para{" "}
                <span className="gold-text">economizar de verdade</span>.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-[52ch] text-pretty text-fluid-base leading-[1.75] text-offwhite/65">
                Encontre produtos relevantes, resgate cupons validados e compre com segurança nas
                maiores lojas do Brasil.
              </p>
            </Reveal>

            <Reveal delay={240} className="w-full sm:w-auto">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="#ofertas"
                  onClick={(event) => handleAnchorClick(event, "#ofertas")}
                  className="group touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-gold)] px-6 py-3.5 text-sm font-semibold text-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Explorar ofertas
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
                <a
                  href="#cupons"
                  onClick={(event) => handleAnchorClick(event, "#cupons")}
                  className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-offwhite/25 px-6 py-3.5 text-sm font-semibold text-offwhite transition-colors duration-200 hover:border-gold/50 hover:bg-offwhite/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Ver cupons
                </a>
              </div>
            </Reveal>

            <Reveal delay={320} className="w-full">
              <div className="w-full">
                <div
                  className="h-px w-full bg-[linear-gradient(to_right,transparent,color-mix(in_oklab,var(--offwhite)_18%,transparent),transparent)]"
                  aria-hidden
                />
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-fluid-xs text-offwhite/60">
                  {TRUST_SIGNALS.map(({ label, icon: Icon }) => (
                    <li key={label} className="inline-flex items-center gap-2">
                      <Icon
                        className="h-3.5 w-3.5 shrink-0 text-gold"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>


          <div className="relative mx-auto w-full min-w-0 max-w-[28.75rem] lg:max-w-none">
            <div className="relative flex min-w-0 flex-col gap-4 sm:gap-0">
              <Reveal delay={120}>
                <HeroOfferCard
                  offer={HERO_OFFERS[0]}
                  priority
                  className="sm:w-[92%] sm:rotate-[-1.2deg]"
                />
              </Reveal>
              <Reveal delay={220} className="sm:-mt-3 sm:ml-auto sm:w-[94%]">
                <HeroOfferCard offer={HERO_OFFERS[1]} className="sm:rotate-[0.8deg]" />
              </Reveal>
              <Reveal delay={320} className="sm:-mt-3 sm:w-[90%]">
                <HeroOfferCard offer={HERO_OFFERS[2]} className="sm:rotate-[-0.6deg]" />
              </Reveal>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export { HeroSection as Hero };
