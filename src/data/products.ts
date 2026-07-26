/**
 * DADOS DEMONSTRATIVOS (MOCK)
 * ---------------------------------------------------------------------------
 * Este arquivo centraliza os produtos fictícios usados na vitrine inicial.
 * TODO: substituir por consulta ao banco de dados / API na próxima etapa.
 * A tipagem `Product` foi desenhada para espelhar a futura tabela `products`.
 */

import bagImg from "@/assets/product-bag.jpg";
import espressoImg from "@/assets/hero-product-espresso.jpg";
import headphonesImg from "@/assets/hero-product-headphones.jpg";
import keyboardImg from "@/assets/product-keyboard.jpg";
import lampImg from "@/assets/product-lamp.jpg";
import mouseImg from "@/assets/product-mouse.jpg";
import serumImg from "@/assets/product-serum.jpg";
import skincareImg from "@/assets/product-skincare.jpg";
import smartwatchImg from "@/assets/hero-product-smartwatch.jpg";
import walletImg from "@/assets/product-wallet.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** URL da imagem (import local nesta fase; virá do storage futuramente). */
  image: string;
  category: string;
  store: string;
  /** Valores em BRL (number), formatados na UI via `formatBRL`. */
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  /** Placeholder seguro — nenhum link real de afiliado nesta etapa. */
  affiliateUrl: string;
  creditsRequired: number;
  featured: boolean;
  verified: boolean;
  /** ISO 8601. */
  expiresAt: string;
  /** ISO 8601 — data de publicação da oferta (mock). */
  publishedAt: string;
}

/**
 * Regra de créditos do DESCONTAI.
 * - Preço atual até R$ 50,00 (inclusive) → 1 crédito
 * - Preço atual acima de R$ 50,00 → 2 créditos
 *
 * Usamos centavos arredondados para evitar imprecisão de ponto flutuante
 * (ex.: 50.005 não deve virar 2 créditos indevidamente).
 */
export function calculateCreditsRequired(currentPrice: number): number {
  if (!Number.isFinite(currentPrice) || currentPrice < 0) {
    // Entrada inválida: fallback conservador para o menor custo possível.
    return 1;
  }

  const cents = Math.round(currentPrice * 100);
  return cents <= 5000 ? 1 : 2;
}

/** Formata um número como moeda brasileira: 39.9 → "R$ 39,90". */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Rótulo de créditos com singular/plural corretos. */
export function formatCreditsLabel(credits: number): string {
  return credits === 1 ? "1 crédito" : `${credits} créditos`;
}

/** Percentual de desconto arredondado a partir dos preços. */
export function calculateDiscountPercentage(
  originalPrice: number,
  currentPrice: number,
): number {
  if (originalPrice <= 0 || currentPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

type ProductSeed = Omit<Product, "creditsRequired" | "discountPercentage">;

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    id: "prd_001",
    slug: "fone-bluetooth-anc-pro-5",
    name: "Fone Bluetooth com cancelamento de ruído ANC Pro 5",
    description: "Até 30h de bateria, estojo compacto e modo transparência.",
    image: headphonesImg,
    category: "Eletrônicos",
    store: "Amazon",
    originalPrice: 469.0,
    currentPrice: 289.9,
    affiliateUrl: "#placeholder-afiliado/prd_001",
    featured: true,
    verified: true,
    expiresAt: "2026-08-15T23:59:59-03:00",
    publishedAt: "2026-07-24T09:00:00-03:00",
  },
  {
    id: "prd_002",
    slug: "smartwatch-amoled-46mm",
    name: "Smartwatch AMOLED 46mm à prova d'água",
    description: "Monitor de sono, GPS integrado e mais de 100 modos esportivos.",
    image: smartwatchImg,
    category: "Acessórios",
    store: "Shopee",
    originalPrice: 299.9,
    currentPrice: 189.9,
    affiliateUrl: "#placeholder-afiliado/prd_002",
    featured: true,
    verified: true,
    expiresAt: "2026-08-05T23:59:59-03:00",
    publishedAt: "2026-07-23T09:00:00-03:00",
  },
  {
    id: "prd_003",
    slug: "cafeteira-espresso-compacta",
    name: "Cafeteira Espresso compacta 15 bar",
    description: "Vaporizador de leite e reservatório removível de 1,2L.",
    image: espressoImg,
    category: "Casa e decoração",
    store: "Mercado Livre",
    originalPrice: 749.0,
    currentPrice: 529.0,
    affiliateUrl: "#placeholder-afiliado/prd_003",
    featured: true,
    verified: false,
    expiresAt: "2026-08-20T23:59:59-03:00",
    publishedAt: "2026-07-22T09:00:00-03:00",
  },
  {
    id: "prd_004",
    slug: "teclado-mecanico-compacto-75",
    name: "Teclado mecânico compacto 75% hot-swap",
    description: "Switches lineares, estrutura de alumínio e conexão sem fio.",
    image: keyboardImg,
    category: "Informática",
    store: "Amazon",
    originalPrice: 599.0,
    currentPrice: 379.9,
    affiliateUrl: "#placeholder-afiliado/prd_004",
    featured: true,
    verified: true,
    expiresAt: "2026-08-12T23:59:59-03:00",
    publishedAt: "2026-07-21T09:00:00-03:00",
  },
  {
    id: "prd_005",
    slug: "kit-skincare-vitamina-c",
    name: "Kit skincare facial com vitamina C — 4 itens",
    description: "Sérum, hidratante, tônico e protetor para rotina diária.",
    image: skincareImg,
    category: "Beleza e cuidados",
    store: "Shopee",
    originalPrice: 139.9,
    currentPrice: 79.9,
    affiliateUrl: "#placeholder-afiliado/prd_005",
    featured: true,
    verified: true,
    expiresAt: "2026-08-02T23:59:59-03:00",
    publishedAt: "2026-07-20T09:00:00-03:00",
  },
  {
    id: "prd_006",
    slug: "bolsa-transversal-couro",
    name: "Bolsa transversal em couro legítimo",
    description: "Alça ajustável, forro interno e acabamento artesanal.",
    image: bagImg,
    category: "Moda",
    store: "Magalu",
    originalPrice: 329.0,
    currentPrice: 199.0,
    affiliateUrl: "#placeholder-afiliado/prd_006",
    featured: true,
    verified: false,
    expiresAt: "2026-08-18T23:59:59-03:00",
    publishedAt: "2026-07-18T09:00:00-03:00",
  },
  {
    id: "prd_007",
    slug: "abajur-ceramica-minimalista",
    name: "Abajur de cerâmica minimalista com cúpula de linho",
    description: "Luz quente difusa, ideal para mesa de cabeceira.",
    image: lampImg,
    category: "Casa e decoração",
    store: "Amazon",
    originalPrice: 189.0,
    currentPrice: 118.9,
    affiliateUrl: "#placeholder-afiliado/prd_007",
    featured: true,
    verified: true,
    expiresAt: "2026-08-09T23:59:59-03:00",
    publishedAt: "2026-07-16T09:00:00-03:00",
  },
  {
    id: "prd_008",
    slug: "sérum-facial-acido-hialuronico",
    name: "Sérum facial com ácido hialurônico 30ml",
    description: "Hidratação profunda com textura leve e absorção rápida.",
    image: serumImg,
    category: "Beleza e cuidados",
    store: "Mercado Livre",
    originalPrice: 79.9,
    currentPrice: 44.9,
    affiliateUrl: "#placeholder-afiliado/prd_008",
    featured: true,
    verified: true,
    expiresAt: "2026-08-07T23:59:59-03:00",
    publishedAt: "2026-07-14T09:00:00-03:00",
  },
  {
    id: "prd_009",
    slug: "mouse-sem-fio-ergonomico",
    name: "Mouse sem fio ergonômico silencioso",
    description: "Sensor de 4000 DPI e bateria recarregável via USB-C.",
    image: mouseImg,
    category: "Informática",
    store: "Shopee",
    originalPrice: 89.9,
    currentPrice: 49.9,
    affiliateUrl: "#placeholder-afiliado/prd_009",
    featured: true,
    verified: false,
    expiresAt: "2026-08-11T23:59:59-03:00",
    publishedAt: "2026-07-11T09:00:00-03:00",
  },
  {
    id: "prd_010",
    slug: "carteira-slim-rfid",
    name: "Carteira slim com bloqueio RFID",
    description: "Couro sintético premium com compartimento para 8 cartões.",
    image: walletImg,
    category: "Acessórios",
    store: "Magalu",
    originalPrice: 89.0,
    currentPrice: 50.0,
    affiliateUrl: "#placeholder-afiliado/prd_010",
    featured: true,
    verified: true,
    expiresAt: "2026-08-25T23:59:59-03:00",
    publishedAt: "2026-07-08T09:00:00-03:00",
  },
];

/** Produtos com créditos e desconto derivados (nunca digitados à mão). */
export const PRODUCTS: Product[] = PRODUCT_SEEDS.map((seed) => ({
  ...seed,
  discountPercentage: calculateDiscountPercentage(seed.originalPrice, seed.currentPrice),
  creditsRequired: calculateCreditsRequired(seed.currentPrice),
}));

export const FEATURED_PRODUCTS: Product[] = PRODUCTS.filter((product) => product.featured);
