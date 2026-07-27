import { useCallback, useEffect, useState } from "react";

import {
  acceptAllConsent,
  defaultConsent,
  readConsent,
  writeConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

const CONSENT_EVENT = "economizai:cookie-consent";

/**
 * Estado de consentimento de cookies compartilhado entre componentes.
 *
 * A leitura acontece apenas após a hidratação (useEffect) para evitar
 * divergência entre HTML do servidor e do cliente.
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);

    const sync = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((next: CookieConsent) => {
    writeConsent(next);
    setConsent(next);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  const acceptEssential = useCallback(() => save(defaultConsent()), [save]);
  const acceptAll = useCallback(() => save(acceptAllConsent()), [save]);

  return {
    consent,
    /** `true` quando já sabemos se existe (ou não) uma decisão salva. */
    hydrated,
    /** Precisa exibir o banner? */
    needsDecision: hydrated && consent === null,
    save,
    acceptEssential,
    acceptAll,
  };
}
