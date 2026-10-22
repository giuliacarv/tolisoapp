import { ArrowRight, Star, TicketPercent } from "lucide-react";

import { handleAnchorClick } from "@/lib/smooth-scroll";
import { formatBRL } from "@/lib/format";

import { Shell } from "./shell";
import { hasLiveCatalog } from "@/services/live-catalog-source";

import headphonesImage from "@/assets/hero-product-headphones.jpg";
import smartwatchImage from "@/assets/hero-product-smartwatch.jpg";

/**
 * Hero editorial de tipografia gigante e centralizada, com dois cartões
 * flutuantes de prova — leitura direta da referência enviada.
 */
export function SolHero() {
  const live = hasLiveCatalog();
  return (
    <section className="relative overflow-hidden pb-[clamp(3rem,7vw,6rem)] pt-[clamp(2.5rem,7vw,5rem)]">
      {/* Halo laranja difuso atrás do título. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <Shell className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold text-foreground shadow-soft">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
          {live ? "Ofertas publicadas com verificação recente" : "Encontre produtos e pesquise nas lojas"}
        </span>

        <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,9vw,6.5rem)] text-foreground">
          {live ? "Produtos selecionados." : "Pesquise primeiro."}
          <br />
          <span className="text-primary">{live ? "Compre direto na loja." : "Compare na loja."}</span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-relaxed text-muted-foreground">
          {live ? "Encontre ofertas cadastradas, veja as informações da última verificação e finalize diretamente na loja responsável." : "Explore uma vitrine demonstrativa de produtos e use a busca para consultar preços e condições diretamente nas lojas."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#sol-ofertas"
            onClick={(event) => handleAnchorClick(event, "#sol-ofertas")}
            className="sol-pill text-sm"
          >
            {live ? "Explorar ofertas" : "Ver produtos de exemplo"}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </a>
          <a
            href="#sol-cupons"
            onClick={(event) => handleAnchorClick(event, "#sol-cupons")}
            className="sol-pill-ghost text-sm"
          >
            <TicketPercent className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            {live ? "Consultar cupons" : "Cupons de exemplo"}
          </a>
        </div>

        {/* Prova visual puramente fictícia: oculta quando o catálogo real está ativo. */}
        {!live ? (
        <div className="mt-12 grid w-full gap-4 sm:mt-16 sm:grid-cols-2 lg:max-w-4xl">
          <HeroProof
            image={headphonesImage}
            store="Amazon"
            name="Fone Bluetooth ANC Studio"
            price={289.9}
            old={469}
            discount="-38%"
            tilt="-rotate-2"
          />
          <HeroProof
            image={smartwatchImage}
            store="Mercado Livre"
            name="Smartwatch Titanium 46mm"
            price={749}
            old={1199}
            discount="-37%"
            tilt="rotate-2"
          />
          <p className="col-span-full text-center text-xs text-muted-foreground">
            Imagens e preços apenas ilustrativos. Não são ofertas ativas.
          </p>
        </div>
        ) : null}
      </Shell>
    </section>
  );
}

interface HeroProofProps {
  image: string;
  store: string;
  name: string;
  price: number;
  old: number;
  discount: string;
  tilt: string;
}

function HeroProof({ image, store, name, price, old, discount, tilt }: HeroProofProps) {
  return (
    <article
      className={`sol-card sol-card-hover flex items-center gap-4 p-4 text-left ${tilt === "-rotate-2" ? "motion-safe:-rotate-2" : "motion-safe:rotate-2"}`}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{store}</p>
        <p className="mt-1 line-clamp-2 text-sm font-bold text-foreground">{name}</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-foreground">{formatBRL(price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatBRL(old)}</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
            {discount}
          </span>
        </p>
      </div>
    </article>
  );
}
