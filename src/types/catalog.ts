/**
 * TIPOS DE DOMÍNIO — CATÁLOGO
 * ---------------------------------------------------------------------------
 * Contratos estáveis entre a interface e a camada de serviços.
 *
 * Estes tipos foram desenhados para espelhar as futuras tabelas do banco
 * (`stores`, `categories`, `products`, `coupons`). Quando o Supabase for
 * conectado, apenas a implementação dos serviços muda — nenhum componente
 * precisa ser reescrito.
 *
 * Regra: todo campo aqui deve ser serializável (JSON), portanto nada de
 * componentes React, funções ou instâncias de classe.
 */

/** Loja / marketplace parceiro. Futura tabela `stores`. */
export interface Store {
  id: string;
  slug: string;
  name: string;
  /** Caminho da marca-texto genérica criada para esta demonstração. */
  logoSrc: string;
  logoAlt: string;
  /** Destino do logotipo. Placeholder seguro nesta etapa. */
  link?: string;
  active: boolean;
}

/**
 * Nome do ícone da categoria.
 * Guardamos a *chave* (string serializável) em vez do componente React, para
 * que o mesmo dado possa vir do banco sem adaptação.
 */
export type CategoryIconName =
  | "smartphone"
  | "home"
  | "sparkles"
  | "shirt"
  | "laptop"
  | "watch";

/** Categoria de navegação. Futura tabela `categories`. */
export interface Category {
  id: string;
  slug: string;
  label: string;
  description: string;
  iconName: CategoryIconName;
  /** Contagem ilustrativa — virá de `categories.offer_count`. */
  offerCount: number;
}

/** Oferta de produto afiliado. Futura tabela `products`. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** URL da imagem (import local nesta fase; virá do storage futuramente). */
  image: string;
  /** Rótulo da categoria (denormalizado para busca/exibição). */
  category: string;
  /** FK para `categories.id`. */
  categoryId: string;
  /** Rótulo da loja (denormalizado para busca/exibição). */
  store: string;
  /** FK para `stores.id`. */
  storeId: string;
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
  /** ISO 8601 — data de publicação da oferta. */
  publishedAt: string;
  /** Disponibilidade na loja parceira. Ausente = disponível. */
  available?: boolean;
  /**
   * Imagens adicionais da oferta. Ausente ou com um único item = sem
   * miniaturas na página de detalhe.
   */
  gallery?: string[];
  /** Características objetivas do produto (bullets curtos). */
  highlights?: string[];
  /** Condições da oferta informadas pela loja parceira. */
  terms?: string;
  /** ISO 8601 — última atualização de preço/condições. */
  updatedAt?: string;
}

export type CouponDiscountType = "percentage" | "fixed" | "shipping";

/** Estados possíveis exibidos no card de cupom. */
export type CouponStatus = "validated" | "pending" | "expired";

/** Cupom promocional. Futura tabela `coupons`. */
export interface Coupon {
  id: string;
  store: string;
  storeId: string;
  title: string;
  description: string;
  /** Código FICTÍCIO — nunca exibido por inteiro antes do resgate autenticado. */
  code: string;
  discountType: CouponDiscountType;
  /** Percentual (0-100), valor em BRL, ou 0 para frete grátis. */
  discountValue: number;
  /** Compra mínima em BRL; null quando não há exigência. */
  minimumPurchase: number | null;
  /** ISO 8601 — validade informada pela loja. */
  expiresAt: string;
  validated: boolean;
  /** ISO 8601 da última verificação; null quando nunca verificado. */
  checkedAt: string | null;
  terms: string;
  /** Placeholder seguro — nenhum link real de afiliado nesta etapa. */
  affiliateUrl: string;
  creditsRequired: number;
}
