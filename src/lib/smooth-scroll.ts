/**
 * Utilitários de navegação interna (âncoras da homepage).
 *
 * Motivo de existir: o header é sticky, então a rolagem precisa compensar a
 * altura dele (`--header-h`) para que os títulos não fiquem escondidos.
 * Também respeitamos `prefers-reduced-motion`, usando salto instantâneo
 * quando o usuário pede menos movimento (decisão vem de `@/lib/motion`).
 */

import { scrollBehavior } from "@/lib/motion";

export { prefersReducedMotion } from "@/lib/motion";


/** Altura atual do header sticky, lida do token CSS `--header-h`. */
function headerOffset(): number {
  if (typeof window === "undefined") return 0;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
  const parsed = Number.parseFloat(raw);
  if (Number.isNaN(parsed)) return 0;
  // O token pode vir em rem ou px; convertemos rem para px quando necessário.
  if (raw.endsWith("rem")) {
    const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return parsed * rootSize;
  }
  return parsed;
}

/**
 * Rola até o elemento com o id informado (aceita "#id" ou "id").
 * Retorna false quando o alvo não existe — o chamador pode então
 * manter o comportamento padrão do link.
 */
export function scrollToId(target: string, extraOffset = 16): boolean {
  if (typeof document === "undefined") return false;

  const id = target.startsWith("#") ? target.slice(1) : target;
  const element = document.getElementById(id);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset() - extraOffset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: scrollBehavior(),
  });

  // Mantém a acessibilidade: o alvo recebe foco sem rolagem extra.
  if (element instanceof HTMLElement) {
    const hadTabIndex = element.hasAttribute("tabindex");
    if (!hadTabIndex) element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
    if (!hadTabIndex) element.removeAttribute("tabindex");
  }

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }

  return true;
}

/**
 * Handler pronto para links âncora: previne o salto nativo apenas quando
 * o alvo existe e a navegação não é modificada (nova aba, etc).
 */
export function handleAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void,
): void {
  if (event.defaultPrevented) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (!href.startsWith("#")) return;

  if (scrollToId(href)) {
    event.preventDefault();
    onNavigate?.();
  }
}
