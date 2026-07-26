import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Store, TicketCheck } from "lucide-react";

import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { Container, buttonOutline, buttonSolid, cardBase } from "./primitives";
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
  delay = 0,
}: {
  offer: HeroOffer;
  className?: string;
  priority?: boolean;
  /** Atraso da entrada escalonada, em milissegundos. */
  delay?: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        cardBase,
        "interactive-lift motion-safe-transform w-full min-w-0 p-4",
        "glass-surface edge-highlight hover:border-gold/40",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="grid h-16 w-16 shrink-0 sm:h-20 sm:w-20 place-items-center overflow-hidden rounded-2xl bg-secondary">
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
            <span className="truncate text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {offer.store}
            </span>
            <span className="shrink-0 rounded-md bg-discount/12 px-1.5 py-0.5 text-fluid-micro font-semibold text-discount">
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

      <div className="mt-3 border-t border-border pt-3">
        <span className="inline-flex items-center gap-1.5 text-fluid-micro font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} aria-hidden />
          {offer.credits} {offer.credits === 1 ? "crédito" : "créditos"} para desbloquear
        </span>
      </div>
    </Reveal>
  );
}

export function HeroSection() {
  return (
    <section id="topo" className="relative overflow-x-clip scroll-mt-[var(--header-h)]">
      <div
        aria-hidden
        className="halo-gradient pointer-events-none absolute inset-x-0 top-0 h-[clamp(18rem,45vw,32rem)] opacity-60"
      />

      <Container className="relative section-y">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-12">
          <div className="flex min-w-0 flex-col items-start gap-7">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/40 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} aria-hidden />
              <span className="min-w-0">Você começa com 5 créditos grátis.</span>
            </span>

            <h1 className="max-w-[18ch] text-balance font-serif text-fluid-h1 leading-[1.08] tracking-tight text-foreground">
              Ofertas selecionadas para você economizar de verdade.
            </h1>

            <p className="max-w-[58ch] text-pretty text-fluid-base leading-relaxed text-muted-foreground">
              Encontre produtos relevantes, resgate cupons validados e compre com segurança nas
              maiores lojas do Brasil.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#ofertas"
                onClick={(event) => handleAnchorClick(event, "#ofertas")}
                className={cn(buttonSolid, "group py-3.5")}
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
                className={cn(buttonOutline, "py-3.5")}
              >
                Ver cupons
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-fluid-xs text-muted-foreground">
              {TRUST_SIGNALS.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-saving" strokeWidth={2} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[28.75rem] lg:max-w-none">
            <div className="relative flex min-w-0 flex-col gap-4 sm:gap-0">
              <HeroOfferCard
                offer={HERO_OFFERS[0]}
                priority
                className="sm:w-[92%] sm:rotate-[-1.2deg]"
              />
              <HeroOfferCard
                offer={HERO_OFFERS[1]}
                className="sm:-mt-3 sm:ml-auto sm:w-[94%] sm:rotate-[0.8deg]"
              />
              <HeroOfferCard
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

export { HeroSection as Hero };
