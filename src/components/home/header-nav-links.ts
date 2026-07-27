/**
 * NAVEGAÇÃO PRINCIPAL (fonte única)
 * ---------------------------------------------------------------------------
 * Desktop e menu mobile consomem esta mesma lista, evitando que os dois se
 * desencontrem quando uma seção é adicionada ou renomeada.
 */
export interface NavLink {
  label: string;
  /** Âncora da homepage (sempre iniciada por "#"). */
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Cupons", href: "#cupons" },
  { label: "Categorias", href: "#categorias" },
  { label: "Como funciona", href: "#como-funciona" },
] as const;

export const LOGIN_COMING_SOON_MESSAGE = "Login e cadastro serão implementados na próxima etapa.";
