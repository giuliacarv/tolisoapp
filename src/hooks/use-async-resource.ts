import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useCallback } from "react";

import { toUserMessage } from "@/services";

/** Estados obrigatórios de qualquer leitura assíncrona. */
export type ResourceStatus = "loading" | "success" | "error";

export interface AsyncResource<T> {
  data: T | null;
  status: ResourceStatus;
  isLoading: boolean;
  /** Sucesso, porém sem nenhum registro (lista vazia / item não encontrado). */
  isEmpty: boolean;
  /** Mensagem já traduzida para o usuário; `null` quando não há erro. */
  error: string | null;
  /** Reexecuta a consulta (usado pelo botão "Tentar novamente"). */
  refetch: () => void;
}

/** Considera vazio: null, undefined e arrays sem itens. */
function isEmptyResult(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  return Array.isArray(value) && value.length === 0;
}

/**
 * Adaptador entre o TanStack Query e o contrato `AsyncResource` usado pela UI.
 *
 * Decisão arquitetural: a UI continua consumindo um objeto pequeno e estável
 * (loading / vazio / erro traduzido). O cache, a deduplicação por chave, o
 * stale-while-revalidate e o descarte de respostas fora de ordem passam a ser
 * responsabilidade do Query — não mais de `useEffect` + refs manuais.
 *
 * Efeito prático: `productService.list()` montado em três seções da home
 * dispara UMA leitura em vez de três, e navegar entre rotas volta instantâneo
 * porque o dado em cache é servido antes da revalidação.
 */
export function useResource<T>(
  options: UseQueryOptions<T, Error, T, readonly unknown[]>,
): AsyncResource<T> {
  const query = useQuery(options);

  const refetch = useCallback(() => {
    void query.refetch();
  }, [query]);

  if (query.error) {
    // Detalhe técnico fica no console; o usuário recebe mensagem genérica.
    console.error("[useResource]", options.queryKey, query.error);
  }

  const data = (query.data ?? null) as T | null;

  return {
    data,
    status: query.isError ? "error" : query.isPending ? "loading" : "success",
    isLoading: query.isPending,
    isEmpty: query.isSuccess && isEmptyResult(query.data),
    error: query.isError ? toUserMessage(query.error) : null,
    refetch,
  };
}
