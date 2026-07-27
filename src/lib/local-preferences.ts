/**
 * PREFERÊNCIAS LOCAIS DO VISITANTE
 * ---------------------------------------------------------------------------
 * Camada mínima sobre o `localStorage` para guardar apenas preferências de
 * navegação (favoritos e histórico de visualização).
 *
 * REGRA DE SEGURANÇA: aqui NUNCA devem ser gravados saldo, créditos, senhas,
 * códigos de cupom liberados, tokens de sessão ou dados de pagamento. Somente
 * identificadores públicos de produto (id/slug) são persistidos.
 *
 * TODO(backend): quando houver conta, migrar estas listas para o perfil do
 * usuário e usar este módulo apenas como cache offline/convidado.
 */

/** Chaves explicitamente marcadas como preferência local de convidado. */
export const GUEST_FAVORITES_KEY = "descontai_guest_favorites";
export const GUEST_RECENTLY_VIEWED_KEY = "descontai_guest_recently_viewed";

/** Limite do histórico "Vistos recentemente". */
export const RECENTLY_VIEWED_LIMIT = 12;

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Lê uma lista de IDs (strings) validando o formato do JSON persistido. */
export function readStringList(key: string): string[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    // Conteúdo corrompido ou storage indisponível: trata como lista vazia.
    return [];
  }
}

/** Grava a lista e notifica os assinantes (inclusive em outras abas via evento nativo). */
export function writeStringList(key: string, value: string[]): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Modo privado / cota excedida: o recurso é opcional, seguimos sem persistir.
  }

  emit(key);
}

export function subscribeToKey(key: string, listener: Listener): () => void {
  const set = listeners.get(key) ?? new Set<Listener>();
  set.add(listener);
  listeners.set(key, set);

  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === key) listener();
  };

  if (isBrowser()) window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    if (isBrowser()) window.removeEventListener("storage", onStorage);
  };
}

function emit(key: string): void {
  listeners.get(key)?.forEach((listener) => listener());
}
