import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "descontai-theme";

/** Lê a preferência persistida; cai para a preferência do sistema. */
function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage pode estar indisponível (modo privado / bloqueio de cookies).
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Controla o tema claro/escuro via classe `.dark` no <html>.
 *
 * O estado inicial é sempre "light" para não divergir do HTML renderizado no
 * servidor; a preferência real é aplicada logo após a hidratação. Um script
 * inline no <head> já aplica a classe antes da pintura, evitando o flash.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readStoredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Persistência é opcional: a troca visual continua funcionando.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme, mounted } as const;
}
