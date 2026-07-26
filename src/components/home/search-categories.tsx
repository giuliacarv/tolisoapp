import { useMemo, useState } from "react";
import {
  ArrowRight,
  Headphones,
  Home,
  Laptop,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  Watch,
} from "lucide-react";

import { Container, SectionHeading } from "./primitives";

/**
 * ============================================================
 * DADOS DEMONSTRATIVOS — SERÃO SUBSTITUÍDOS PELO BANCO DE DADOS
 * ============================================================
 * Os produtos, categorias e contagens abaixo são apenas ilustrativos
 * para validar a experiência visual e o fluxo de filtragem local.
 * Na versão final esses dados virão da API/backend do marketplace.
 */

/** Categorias exibidas na seção "Explore por categoria". */
const CATEGORIES = [
  {
    id: "eletronicos",
    label: "Eletrônicos",
    description: "Fones, smartwatches e gadgets do dia a dia.",
    icon: Smartphone,
    // Contagem ilustrativa — substituir por dado real do backend.
    offerCount: 124,
  },
  {
    id: "casa",
    label: "Casa e decoração",
    description: "Eletrodomésticos, organização e conforto.",
    icon: Home,
    offerCount: 86,
  },
  {
    id: "beleza",
    label: "Beleza e cuidados",
    description: "Skincare, perfumaria e itens de autocuidado.",
    icon: Sparkles,
    offerCount: 63,
  },
  {
    id: "moda",
    label: "Moda",
    description: "Roupas, calçados e acessórios de vestuário.",
    icon: Shirt,
    offerCount: 95,
  },
  {
    id: "informatica",
    label: "Informática",
    description: "Notebooks, periféricos e equipamentos de escritório.",
    icon: Laptop,
    offerCount: 58,
  },
  {
    id: "acessorios",
    label: "Acessórios",
    description: "Óculos, relógios, bolsas e complementos.",
    icon: Watch,
    offerCount: 71,
  },
];

/** Filtros rápidos disponíveis na barra de busca. */
const QUICK_FILTERS = [
  { id: "all", label: "Todas as ofertas" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "casa", label: "Casa" },
  { id: "beleza", label: "Beleza" },
  { id: "moda", label: "Moda" },
  { id: "acessorios", label: "Acessórios" },
  { id: "informatica", label: "Informática" },
];

/** Produtos demonstrativos para testar filtragem local. */
const DEMO_PRODUCTS = [
  {
    id: "1",
    title: "Fone Bluetooth ANC Pro 5",
    category: "eletronicos",
    store: "Amazon",
    price: "R$ 289,90",
    oldPrice: "R$ 469,00",
    discount: "-38%",
    credits: 2,
  },
  {
    id: "2",
    title: "Air Fryer Digital 5,5L",
    category: "casa",
    store: "Mercado Livre",
    price: "R$ 349,00",
    oldPrice: "R$ 529,00",
    discount: "-34%",
    credits: 3,
  },
  {
    id: "3",
    title: "Kit Skincare Vitamina C",
    category: "beleza",
    store: "TikTok Shop",
    price: "R$ 79,90",
    oldPrice: "R$ 139,90",
    discount: "-43%",
    credits: 1,
  },
  {
    id: "4",
    title: "Tênis Casual Couro Legítimo",
    category: "moda",
    store: "Shopee",
    price: "R$ 199,90",
    oldPrice: "R$ 359,90",
    discount: "-44%",
    credits: 2,
  },
  {
    id: "5",
    title: "Notebook Ryzen 5 16GB/512GB",
    category: "informatica",
    store: "Ponto Frio",
    price: "R$ 2.699,00",
    oldPrice: "R$ 3.499,00",
    discount: "-23%",
    credits: 5,
  },
  {
    id: "6",
    title: "Relógio Smartwatch AMOLED",
    category: "acessorios",
    store: "Amazon",
    price: "R$ 189,90",
    oldPrice: "R$ 299,90",
    discount: "-37%",
    credits: 2,
  },
  {
    id: "7",
    title: "Headphone Over-Ear Premium",
    category: "eletronicos",
    store: "Shopee",
    price: "R$ 249,90",
    oldPrice: "R$ 399,90",
    discount: "-38%",
    credits: 2,
  },
  {
    id: "8",
    title: "Cadeira Ergonômica Office",
    category: "informatica",
    store: "Amazon",
    price: "R$ 899,00",
    oldPrice: "R$ 1.249,00",
    discount: "-28%",
    credits: 4,
  },
];

interface CategoryCardProps {
  category: (typeof CATEGORIES)[number];
  onSelect: (id: string) => void;
  isActive: boolean;
}

function CategoryCard({ category, onSelect, isActive }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className={`group flex w-full flex-col items-start gap-4 rounded-[18px] border p-5 text-left transition-all duration-300 sm:p-6 ${
        isActive
          ? "border-ink bg-ink text-white"
          : "border-border bg-card text-foreground hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
      }`}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-xl border transition-colors ${
          isActive
            ? "border-white/20 bg-white/10"
            : "border-border bg-background group-hover:border-gold/30 group-hover:bg-gold/5"
        }`}
      >
        <Icon
          className={`h-5 w-5 transition-colors ${
            isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"
          }`}
          strokeWidth={1.75}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-serif text-lg font-medium tracking-tight">
          {category.label}
        </span>
        <span
          className={`text-sm leading-relaxed ${
            isActive ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {category.description}
        </span>
      </div>

      <span
        className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold ${
          isActive ? "text-gold" : "text-muted-foreground"
        }`}
      >
        {category.offerCount} ofertas
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </span>
    </button>
  );
}

interface ProductResultCardProps {
  product: (typeof DEMO_PRODUCTS)[number];
}

function ProductResultCard({ product }: ProductResultCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-[18px] border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_75%)]"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-discount px-2 py-1 text-xs font-bold text-white">
          {product.discount}
        </span>
        <span className="absolute bottom-3 left-3 rounded-lg border border-border bg-card/90 px-2 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
          {product.store}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.title}
        </h3>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-serif text-xl text-foreground">{product.price}</span>
          <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {product.credits} crédito{product.credits > 1 ? "s" : ""} para resgatar
        </p>
      </div>
    </article>
  );
}

export function SearchAndCategories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return DEMO_PRODUCTS.filter((product) => {
      const matchesFilter = activeFilter === "all" || product.category === activeFilter;
      const matchesSearch =
        query === "" ||
        product.title.toLowerCase().includes(query) ||
        product.store.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const handleCategorySelect = (id: string) => {
    setActiveFilter((prev) => (prev === id ? "all" : id));
  };

  return (
    <section id="categorias" className="scroll-mt-24 py-4">
      <span id="buscar" className="sr-only" aria-hidden />

      <Container>
        {/* Barra de busca + filtros rápidos */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[22px] border border-border bg-card p-5 shadow-soft sm:p-8">
            <form
              className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative min-w-0">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                  strokeWidth={1.75}
                />
                <label htmlFor="busca" className="sr-only">
                  Busque por produtos, marcas ou lojas
                </label>
                <input
                  id="busca"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Busque por produtos, marcas ou lojas"
                  className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/25"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-graphite"
              >
                <Search className="h-4 w-4" strokeWidth={1.75} />
                Buscar
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {QUICK_FILTERS.map(({ id, label }) => {
                const isActive = activeFilter === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveFilter(id)}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-ink text-white"
                        : "border border-border bg-background text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="mt-16 sm:mt-20">
          <SectionHeading
            align="center"
            eyebrow="Categorias"
            title="Explore por categoria"
            description="Encontre as melhores oportunidades de acordo com o que você procura."
          />

          {/*
            ============================================================
            OBSERVAÇÃO: as contagens de ofertas em cada categoria são
            valores demonstrativos e serão substituídas por dados reais
            do banco de dados na próxima fase do projeto.
            ============================================================
          */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={handleCategorySelect}
                isActive={activeFilter === category.id}
              />
            ))}
          </div>
        </div>

        {/* Resultados da busca/filtro */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
              {activeFilter === "all" ? "Todas as ofertas" : "Resultados do filtro"}
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductResultCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[18px] border border-border bg-card p-10 text-center">
              <p className="text-foreground font-medium">Nenhuma oferta encontrada</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente outro termo de busca ou selecione outra categoria.
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Valores e produtos ilustrativos — serão substituídos por dados reais do backend.
          </p>
        </div>
      </Container>
    </section>
  );
}
