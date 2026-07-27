import { useCallback } from "react";
import { toast } from "sonner";

/**
 * AVISO DE FUNCIONALIDADE FUTURA
 * ---------------------------------------------------------------------------
 * Por que existe: o padrão "isso ainda não está conectado" aparecia em vários
 * pontos (login, envio de contato, compra de créditos) com textos e formatos
 * diferentes. Centralizar garante uma UX consistente e um único lugar para
 * remover o aviso quando o backend existir.
 *
 * `ConfirmDialog` continua reservado aos casos que exigem confirmação
 * explícita do usuário — este hook cobre apenas o feedback passivo (toast).
 */
export function useComingSoon(message: string, description?: string) {
  return useCallback(() => {
    toast(message, description ? { description } : undefined);
  }, [message, description]);
}
