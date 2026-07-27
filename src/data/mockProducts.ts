/**
 * DADOS DEMONSTRATIVOS (MOCK) — PRODUTOS
 * ---------------------------------------------------------------------------
 * ⚠️ Consumir SOMENTE através de `productService`. Nenhum componente deve
 * importar este arquivo diretamente.
 *
 * TODO(backend): substituir por `select * from products`.
 *
 * `creditsRequired` e `discountPercentage` NUNCA são digitados à mão: são
 * derivados das regras em `@/domain/products/product-rules`, garantindo que a
 * política de créditos continue única quando o banco entrar.
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

import {
  calculateCreditsRequired,
  calculateDiscountPercentage,
} from "@/domain/products/product-rules";
import type { Product } from "@/types";

/** Campos derivados ficam de fora da semente. */
type ProductSeed = Omit<Product, "creditsRequired" | "discountPercentage">;

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    id: "prd_001",
    slug: "fone-bluetooth-anc-pro-5",
    name: "Fone Bluetooth com cancelamento de ruído ANC Pro 5",
    description: "Até 30h de bateria, estojo compacto e modo transparência.",
    image: headphonesImg,
    category: "Eletrônicos",
    categoryId: "eletronicos",
    store: "Amazon",
    storeId: "str_amazon",
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
    categoryId: "acessorios",
    store: "Shopee",
    storeId: "str_shopee",
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
    categoryId: "casa",
    store: "Mercado Livre",
    storeId: "str_mercado_livre",
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
    categoryId: "informatica",
    store: "Amazon",
    storeId: "str_amazon",
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
    categoryId: "beleza",
    store: "Shopee",
    storeId: "str_shopee",
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
    categoryId: "moda",
    store: "Magalu",
    storeId: "str_magalu",
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
    categoryId: "casa",
    store: "Amazon",
    storeId: "str_amazon",
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
    slug: "serum-facial-acido-hialuronico",
    name: "Sérum facial com ácido hialurônico 30ml",
    description: "Hidratação profunda com textura leve e absorção rápida.",
    image: serumImg,
    category: "Beleza e cuidados",
    categoryId: "beleza",
    store: "Mercado Livre",
    storeId: "str_mercado_livre",
    originalPrice: 79.9,
    currentPrice: 44.9,
    affiliateUrl: "#placeholder-afiliado/prd_008",
    featured: true,
    verified: true,
    // Demonstração do estado desabilitado: oferta com validade vencida.
    expiresAt: "2026-07-18T23:59:59-03:00",
    publishedAt: "2026-07-14T09:00:00-03:00",
  },
  {
    id: "prd_009",
    slug: "mouse-sem-fio-ergonomico",
    name: "Mouse sem fio ergonômico silencioso",
    description: "Sensor de 4000 DPI e bateria recarregável via USB-C.",
    image: mouseImg,
    category: "Informática",
    categoryId: "informatica",
    store: "Shopee",
    storeId: "str_shopee",
    originalPrice: 89.9,
    currentPrice: 49.9,
    affiliateUrl: "#placeholder-afiliado/prd_009",
    featured: true,
    verified: false,
    expiresAt: "2026-08-11T23:59:59-03:00",
    publishedAt: "2026-07-11T09:00:00-03:00",
    // Demonstração do estado desabilitado: oferta esgotada na loja parceira.
    available: false,
  },
  {
    id: "prd_010",
    slug: "carteira-slim-rfid",
    name: "Carteira slim com bloqueio RFID",
    description: "Couro sintético premium com compartimento para 8 cartões.",
    image: walletImg,
    category: "Acessórios",
    categoryId: "acessorios",
    store: "Magalu",
    storeId: "str_magalu",
    originalPrice: 89.0,
    currentPrice: 50.0,
    affiliateUrl: "#placeholder-afiliado/prd_010",
    featured: true,
    verified: true,
    expiresAt: "2026-08-25T23:59:59-03:00",
    publishedAt: "2026-07-08T09:00:00-03:00",
  },
];

/** Produtos com créditos e desconto derivados das regras de domínio. */
export const MOCK_PRODUCTS: Product[] = PRODUCT_SEEDS.map((seed) => ({
  ...seed,
  discountPercentage: calculateDiscountPercentage(seed.originalPrice, seed.currentPrice),
  creditsRequired: calculateCreditsRequired(seed.currentPrice),
}));
