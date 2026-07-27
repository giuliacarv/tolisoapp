/**
 * INFRAESTRUTURA DA CAMADA DE SERVIÇOS
 * ---------------------------------------------------------------------------
 * Contratos e utilitários compartilhados por todos os serviços.
 *
 * Objetivo: quando o Supabase for conectado, apenas o corpo de cada serviço
 * muda. Assinaturas, erros e estados permanecem idênticos, então nenhum
 * componente precisa ser reescrito.
 */

/** Erro base da camada de serviços — permite `instanceof` na UI. */
export class ServiceError extends Error {
  constructor(
    message: string,
    /** Código estável para tradução de mensagens na interface. */
    readonly code: string = "service_error",
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "ServiceError";
  }
}

/** Recurso solicitado por id/slug que não existe. */
export class NotFoundError extends ServiceError {
  constructor(resource: string, identifier: string) {
    super(`${resource} não encontrado: ${identifier}`, "not_found");
    this.name = "NotFoundError";
  }
}

/** Entrada inválida (id vazio, filtro malformado, etc.). */
export class ValidationError extends ServiceError {
  constructor(message: string) {
    super(message, "validation_error");
    this.name = "ValidationError";
  }
}

/**
 * Mensagem segura para exibir ao usuário.
 * Detalhes técnicos nunca vazam para a interface.
 */
export function toUserMessage(error: unknown): string {
  if (error instanceof NotFoundError) {
    return "Não encontramos este item. Ele pode ter sido removido.";
  }
  if (error instanceof ValidationError) {
    return "Não foi possível processar esta consulta.";
  }
  return "Não foi possível carregar os dados agora. Tente novamente.";
}

/**
 * Latência simulada — APENAS em desenvolvimento.
 *
 * Serve para exercitar skeletons e estados de carregamento sem penalizar o
 * usuário final: em produção o atraso é zero.
 */
const MOCK_LATENCY_MS = import.meta.env.DEV ? 320 : 0;

function delay(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Resolve dados mockados como se viessem da rede.
 *
 * `structuredClone` evita que a interface mute acidentalmente o array de
 * origem — o mock passa a se comportar como uma resposta HTTP real.
 */
export async function resolveMock<T>(data: T, latencyMs = MOCK_LATENCY_MS): Promise<T> {
  await delay(latencyMs);
  return typeof structuredClone === "function" ? structuredClone(data) : data;
}
