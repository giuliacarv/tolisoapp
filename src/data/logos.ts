/**
 * Marcas parceiras exibidas no carrossel de logotipos.
 *
 * TODO(backend): estes dados são demonstrativos e serão substituídos por uma
 * consulta ao banco (tabela de lojas parceiras / redes de afiliados).
 *
 * Observação legal: as artes em `public/images/*.svg` são marcas-texto
 * genéricas criadas para esta demonstração — não são os logotipos oficiais
 * das lojas.
 */
export interface PartnerLogo {
  /** Identificador único e estável. */
  id: string;
  /** Caminho da imagem (SVG/WebP otimizado). */
  src: string;
  /** Texto alternativo descritivo para leitores de tela. */
  alt: string;
  /** Nome curto usado em `aria-label` de links. */
  name: string;
  /** URL de destino (opcional). Placeholder seguro nesta etapa. */
  link?: string;
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  { id: "amazon", src: "/images/logo-amazon.svg", alt: "Logotipo da Amazon", name: "Amazon", link: "#ofertas" },
  { id: "magalu", src: "/images/logo-magalu.svg", alt: "Logotipo do Magazine Luiza", name: "Magazine Luiza", link: "#ofertas" },
  {
    id: "mercado-livre",
    src: "/images/logo-mercado-livre.svg",
    alt: "Logotipo do Mercado Livre",
    name: "Mercado Livre",
    link: "#ofertas",
  },
  { id: "shopee", src: "/images/logo-shopee.svg", alt: "Logotipo da Shopee", name: "Shopee", link: "#ofertas" },
  {
    id: "americanas",
    src: "/images/logo-americanas.svg",
    alt: "Logotipo das Americanas",
    name: "Americanas",
    link: "#ofertas",
  },
  {
    id: "casas-bahia",
    src: "/images/logo-casas-bahia.svg",
    alt: "Logotipo das Casas Bahia",
    name: "Casas Bahia",
    link: "#ofertas",
  },
  {
    id: "aliexpress",
    src: "/images/logo-aliexpress.svg",
    alt: "Logotipo do AliExpress",
    name: "AliExpress",
    link: "#ofertas",
  },
  { id: "centauro", src: "/images/logo-centauro.svg", alt: "Logotipo da Centauro", name: "Centauro", link: "#ofertas" },
];
