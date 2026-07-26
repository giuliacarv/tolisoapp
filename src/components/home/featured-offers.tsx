import { ArrowUpRight, Clock, Flame, ShieldCheck, TrendingDown } from "lucide-react";

import { Container, SectionHeading } from "./primitives";

interface Offer {
  title: string;
  store: string;
  price: string;
  oldPrice: string;
  discount: string;
  saving: string;
  tag?: string;
  note: string;
}

const OFFERS: Offer[] = [
  {
    title: "Fone Bluetooth com cancelamento de ruído ANC Pro 5",
    store: "Amazon",
    price: "R$ 289,90",
    oldPrice: "R$ 469,00",
    discount: "-38%",
    saving: "Economize R$ 179,10",
    tag: "Menor preço em 90 dias",
    note: "Frete grátis · 12x sem juros",
  },
  {
    title: "Air Fryer Digital 5,5L com painel touch",
    store: "Mercado Livre",
    price: "R$ 349,00",
    oldPrice: "R$ 529,00",
    discount: "-34%",
    saving: "Economize R$ 180,00",
    note: "Full · Entrega em 24h",
  },
  {
    title: "Smartwatch AMOLED 46mm à prova d'água",
    store: "Shopee",
    price: "R$ 189,90",
    oldPrice: "R$ 299,90",
    discount: "-37%",
    saving: "Economize R$ 110,00",
    tag: "Alta procura",
    note: "Cupom aplicado no carrinho",
  },
  {
    title: "Notebook 15,6\" Ryzen 5 · 16GB · SSD 512GB",
    store: "Ponto Frio",
    price: "R$ 2.699,00",
    oldPrice: "R$ 3.499,00",
    discount: "-23%",
    saving: "Economize R$ 800,00",
    note: "10x sem juros no cartão",
  },
  {
    title: "Kit Skincare Facial Vitamina C — 3 itens",
    store: "TikTok Shop",
    price: "R$ 79,90",
    oldPrice: "R$ 139,90",
    discount: "-43%",
    saving: "Economize R$ 60,00",
    note: "Estoque limitado",
  },
  {
    title: "Cadeira Ergonômica Office Mesh com apoio lombar",
    store: "Amazon",
    price: "R$ 899,00",
    oldPrice: "R$ 1.249,00",
    discount: "-28%",
    saving: "Economize R$ 350,00",
    tag: "Verificado hoje",
    note: "Montagem inclusa",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_75%)]"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-white">
            {offer.discount}
          </span>
          {offer.tag ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/50 bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
              <Flame className="h-3 w-3 text-gold" strokeWidth={2} />
              {offer.tag}
            </span>
          ) : null}
        </div>
        <span className="absolute bottom-4 left-4 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
          {offer.store}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground">
          {offer.title}
        </h3>

        <div className="mt-auto space-y-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-2xl text-foreground">{offer.price}</span>
            <span className="text-sm text-muted-foreground line-through">{offer.oldPrice}</span>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-saving">
            <TrendingDown className="h-3.5 w-3.5" strokeWidth={2} />
            {offer.saving}
          </p>
          <p className="text-xs text-muted-foreground">{offer.note}</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all group-hover:border-transparent group-hover:bg-ink group-hover:text-white"
        >
          Ver oferta
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

export function FeaturedOffers() {
  return (
    <section id="ofertas" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ofertas em destaque"
            title="Selecionadas hoje pela nossa curadoria"
            description="Cada oferta passa por conferência de preço histórico antes de aparecer aqui. Nada de desconto inflado."
          />
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
              Atualizado há 12 minutos
            </span>
            <a
              href="#ofertas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Ver todas
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.title} offer={offer} />
          ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
          Produtos e valores meramente ilustrativos nesta versão inicial.
        </p>
      </Container>
    </section>
  );
}
