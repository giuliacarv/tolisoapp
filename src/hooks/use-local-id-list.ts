import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";

import {
  readStringList,
  subscribeToKey,
  writeStringList,
} from "@/lib/local-preferences";

const EMPTY: string[] = [];

/**
 * Lista de IDs persistida localmente, sincronizada entre componentes e abas.
 *
 * `useSyncExternalStore` exige snapshots referencialmente estáveis; por isso o
 * valor lido é memoizado por sua serialização (evita loop infinito de render).
 * O snapshot de servidor é sempre vazio, garantindo hidratação consistente.
 */
export function useLocalIdList(storageKey: string) {
  const cache = useRef<{ raw: string; value: string[] }>({ raw: "[]", value: EMPTY });

  const subscribe = useCallback(
    (listener: () => void) => subscribeToKey(storageKey, listener),
    [storageKey],
  );

  const getSnapshot = useCallback(() => {
    const next = readStringList(storageKey);
    const raw = JSON.stringify(next);

    if (raw !== cache.current.raw) {
      cache.current = { raw, value: next };
    }

    return cache.current.value;
  }, [storageKey]);

  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const idSet = useMemo(() => new Set(ids), [ids]);

  const set = useCallback(
    (next: string[]) => writeStringList(storageKey, next),
    [storageKey],
  );

  const clear = useCallback(() => set([]), [set]);

  return { ids, idSet, set, clear };
}
