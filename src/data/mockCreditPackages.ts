/**
 * DADOS DEMONSTRATIVOS (MOCK) — PACOTES DE CRÉDITOS
 * ---------------------------------------------------------------------------
 * ⚠️ Consumir SOMENTE através de `creditService`.
 *
 * TODO(backend): substituir por `select * from credit_packages`.
 * Nenhum checkout, pagamento ou débito está conectado nesta etapa: os pacotes
 * existem apenas para comunicar a estrutura de custos.
 */

import type { CreditPackage } from "@/types";

export const MOCK_CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "pkg_start",
    name: "Início",
    credits: 10,
    priceBRL: 9.9,
    description: "Para experimentar resgates de ofertas pontuais.",
    highlighted: false,
  },
  {
    id: "pkg_plus",
    name: "Plus",
    credits: 30,
    priceBRL: 24.9,
    description: "Equilíbrio entre ofertas e cupons ao longo do mês.",
    highlighted: true,
  },
  {
    id: "pkg_pro",
    name: "Pro",
    credits: 80,
    priceBRL: 59.9,
    description: "Para quem acompanha oportunidades com frequência.",
    highlighted: false,
  },
];
