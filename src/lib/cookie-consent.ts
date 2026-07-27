/**
 * CONSENTIMENTO DE COOKIES (PROVISÓRIO)
 * ---------------------------------------------------------------------------
 * Esta camada controla APENAS uma preferência local no dispositivo do
 * visitante. Nenhum script de análise, publicidade, rastreamento ou rede de
 * afiliados é carregado por este módulo.
 *
 * REGRA: categorias não essenciais começam sempre desativadas. Qualquer
 * integração futura (analytics, pixels, redes de afiliados) deve verificar
 * `consent.analytics` / `consent.marketing` antes de ser inicializada.
 */

export const COOKIE_CONSENT_STORAGE_KEY = "economizai_cookie_consent";

/** Versão do texto/estrutura de consentimento; mudar força nova escolha. */
export const COOKIE_CONSENT_VERSION = 1;

export interface CookieConsent {
  /** Sempre `true`: necessários para o funcionamento básico da interface. */
  essential: true;
  /** Lembrar tema, filtros, favoritos e histórico local. */
  preferences: boolean;
  /** Métricas agregadas de uso (não implementado nesta versão). */
  analytics: boolean;
  /** Publicidade e atribuição de links de afiliado (não implementado). */
  marketing: boolean;
  version: number;
  /** ISO 8601 da decisão registrada no dispositivo. */
  decidedAt: string;
}

export type CookieCategory = keyof Pick<
  CookieConsent,
  "essential" | "preferences" | "analytics" | "marketing"
>;

export const COOKIE_CATEGORIES: {
  id: CookieCategory;
  title: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    id: "essential",
    title: "Essenciais",
    description:
      "Necessários para exibir a interface, manter a navegação estável e registrar sua própria escolha de cookies. Não podem ser desativados.",
    locked: true,
  },
  {
    id: "preferences",
    title: "Preferências",
    description:
      "Guardam escolhas feitas por você no dispositivo, como tema claro/escuro, filtros, favoritos e itens vistos recentemente.",
  },
  {
    id: "analytics",
    title: "Análise",
    description:
      "Poderão medir, de forma agregada, quais seções são mais usadas para orientar melhorias. Nenhuma ferramenta de análise está ativa nesta versão.",
  },
  {
    id: "marketing",
    title: "Publicidade e afiliados",
    description:
      "Poderão apoiar a atribuição de cliques em links de afiliado e a exibição de comunicações mais relevantes. Permanecem desativados enquanto você não autorizar.",
  },
];

/** Estado padrão: apenas o estritamente necessário. */
export function defaultConsent(): CookieConsent {
  return {
    essential: true,
    preferences: false,
    analytics: false,
    marketing: false,
    version: COOKIE_CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };
}

export function acceptAllConsent(): CookieConsent {
  return { ...defaultConsent(), preferences: true, analytics: true, marketing: true };
}

/**
 * Lê a decisão salva. Retorna `null` quando não há decisão válida — nesse caso
 * o banner deve ser exibido e nada além do essencial pode ser assumido.
 */
export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieConsent> | null;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;

    return {
      essential: true,
      preferences: parsed.preferences === true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: COOKIE_CONSENT_VERSION,
      decidedAt:
        typeof parsed.decidedAt === "string" ? parsed.decidedAt : new Date().toISOString(),
    };
  } catch {
    // Storage indisponível (modo privado, quota, JSON inválido): trata como
    // "sem decisão" e mantém tudo desativado.
    return null;
  }
}

export function writeConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ ...consent, essential: true, version: COOKIE_CONSENT_VERSION }),
    );
  } catch {
    // Falha de persistência não deve quebrar a navegação.
  }
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    /* noop */
  }
}
