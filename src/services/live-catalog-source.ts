/**
 * Cliente público mínimo do PostgREST usado pelo catálogo.
 * Não requer SDK adicional nem altera o bun.lock.
 *
 * Nunca usar chave service_role. Somente publishable/anon + RLS.
 * Quando não configurado (Lovable/preview sem variáveis), retorna null:
 * os serviços permanecem em modo demonstrativo até a integração real.
 */
import { ServiceError } from "./service-utils";

export type CatalogTable = "stores" | "categories" | "products" | "coupons";

export function hasLiveCatalog(): boolean {
  return Boolean(getPublicDatabaseConfig());
}

function getPublicDatabaseConfig(): { base: string; key: string } | null {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

  if (!rawUrl || !key) return null;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return null;
    return { base: parsed.origin, key };
  } catch {
    return null;
  }
}

export async function fetchPublicRows<T>(table: CatalogTable, select = "*"): Promise<T[] | null> {
  const config = getPublicDatabaseConfig();
  if (!config) return null;

  const endpoint = new URL(`${config.base}/rest/v1/${table}`);
  endpoint.searchParams.set("select", select);

  let response: Response;
  try {
    response = await fetch(endpoint.toString(), {
      headers: { apikey: config.key, Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    throw new ServiceError("Falha ao consultar catálogo público.", "catalog_network", { cause });
  }

  if (!response.ok) {
    throw new ServiceError(`Falha do catálogo: HTTP ${response.status}.`, "catalog_http");
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new ServiceError("Formato do catálogo inválido.", "catalog_format");
  return data as T[];
}
