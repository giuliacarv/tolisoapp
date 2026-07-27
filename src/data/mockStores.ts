/**
 * DADOS DEMONSTRATIVOS (MOCK) — LOJAS E MARKETPLACES
 * ---------------------------------------------------------------------------
 * ⚠️ Consumir SOMENTE através de `storeService`. Nenhum componente deve
 * importar este arquivo diretamente.
 *
 * TODO(backend): substituir por `select * from stores`.
 *
 * Observação legal: as artes em `public/images/*.svg` são marcas-texto
 * genéricas criadas para esta demonstração — não são os logotipos oficiais
 * das lojas.
 */

import type { Store } from "@/types";

export const MOCK_STORES: Store[] = [
  {
    id: "str_amazon",
    slug: "amazon",
    name: "Amazon",
    logoSrc: "/images/logo-amazon.svg",
    logoAlt: "Logotipo da Amazon",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_shopee",
    slug: "shopee",
    name: "Shopee",
    logoSrc: "/images/logo-shopee.svg",
    logoAlt: "Logotipo da Shopee",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_mercado_livre",
    slug: "mercado-livre",
    name: "Mercado Livre",
    logoSrc: "/images/logo-mercado-livre.svg",
    logoAlt: "Logotipo do Mercado Livre",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_magalu",
    slug: "magalu",
    name: "Magalu",
    logoSrc: "/images/logo-magalu.svg",
    logoAlt: "Logotipo do Magalu",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_americanas",
    slug: "americanas",
    name: "Americanas",
    logoSrc: "/images/logo-americanas.svg",
    logoAlt: "Logotipo das Americanas",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_casas_bahia",
    slug: "casas-bahia",
    name: "Casas Bahia",
    logoSrc: "/images/logo-casas-bahia.svg",
    logoAlt: "Logotipo das Casas Bahia",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_aliexpress",
    slug: "aliexpress",
    name: "AliExpress",
    logoSrc: "/images/logo-aliexpress.svg",
    logoAlt: "Logotipo do AliExpress",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_centauro",
    slug: "centauro",
    name: "Centauro",
    logoSrc: "/images/logo-centauro.svg",
    logoAlt: "Logotipo da Centauro",
    link: "#ofertas",
    active: true,
  },
  {
    id: "str_tiktok_shop",
    slug: "tiktok-shop",
    name: "TikTok Shop",
    logoSrc: "/images/logo-shopee.svg",
    logoAlt: "Logotipo genérico de marketplace",
    active: false,
  },
  {
    id: "str_ponto",
    slug: "ponto",
    name: "Ponto",
    logoSrc: "/images/logo-casas-bahia.svg",
    logoAlt: "Logotipo genérico de marketplace",
    active: false,
  },
];
