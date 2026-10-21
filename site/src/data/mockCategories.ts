/**
 * DADOS DEMONSTRATIVOS (MOCK) — CATEGORIAS
 * ---------------------------------------------------------------------------
 * ⚠️ Consumir SOMENTE através de `categoryService`.
 *
 * TODO(backend): substituir por `select * from categories`.
 * As contagens (`offerCount`) virão de uma coluna agregada no banco.
 *
 * `iconName` guarda a CHAVE do ícone (string), não o componente React —
 * assim o mesmo registro pode vir do banco sem adaptação.
 */

import type { Category } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "eletronicos",
    slug: "eletronicos",
    label: "Eletrônicos",
    description: "Fones, smartwatches e gadgets do dia a dia.",
    iconName: "smartphone",
    offerCount: 24,
  },
  {
    id: "casa",
    slug: "casa-e-decoracao",
    label: "Casa e decoração",
    description: "Eletrodomésticos, organização e conforto.",
    iconName: "home",
    offerCount: 18,
  },
  {
    id: "beleza",
    slug: "beleza-e-cuidados",
    label: "Beleza e cuidados",
    description: "Skincare, perfumaria e itens de autocuidado.",
    iconName: "sparkles",
    offerCount: 12,
  },
  {
    id: "moda",
    slug: "moda",
    label: "Moda",
    description: "Roupas, calçados e acessórios de vestuário.",
    iconName: "shirt",
    offerCount: 16,
  },
  {
    id: "informatica",
    slug: "informatica",
    label: "Informática",
    description: "Notebooks, periféricos e itens de escritório.",
    iconName: "laptop",
    offerCount: 14,
  },
  {
    id: "acessorios",
    slug: "acessorios",
    label: "Acessórios",
    description: "Óculos, relógios, bolsas e complementos.",
    iconName: "watch",
    offerCount: 11,
  },
];
