import { useCallback, useEffect, useRef, useState } from "react";

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
 * Executa uma chamada de serviço e expõe loading / sucesso / erro / vazio.
 *
 * Intencionalmente genérico: quando os serviços passarem a consultar o
 * Supabase, este hook (ou um `useQuery` equivalente) continua o mesmo.
 *
 * `deps` controla a reexecução — trate-o como a `queryKey` do TanStack Query.
 */
export function useAsyncResource<T>(
  fetcher: () => Promise<T>,
  deps: readonly unknown[] = [],
): AsyncResource<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ResourceStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  // Evita `setState` após desmontagem e descarta respostas fora de ordem.
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    let active = true;

    setStatus("loading");
    setError(null);

    fetcher()
      .then((result) => {
        if (!active || requestId !== requestIdRef.current) return;
        setData(result);
        setStatus("success");
      })
      .catch((caught: unknown) => {
        if (!active || requestId !== requestIdRef.current) return;
        // Detalhe técnico fica no console; o usuário recebe mensagem genérica.
        console.error("[useAsyncResource]", caught);
        setData(null);
        setError(toUserMessage(caught));
        setStatus("error");
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadToken]);

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

  return {
    data,
    status,
    isLoading: status === "loading",
    isEmpty: status === "success" && isEmptyResult(data),
    error,
    refetch,
  };
}
