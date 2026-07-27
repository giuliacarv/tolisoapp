import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { buttonOutline } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

export interface ProductShareProps {
  title: string;
  /** Texto curto usado no compartilhamento nativo. */
  text?: string;
}

/** Fallback para navegadores sem Clipboard API (ou contexto não seguro). */
function legacyCopy(value: string): boolean {
  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Ações de compartilhamento da oferta.
 * O botão nativo só é renderizado depois da hidratação, pois `navigator.share`
 * não existe durante a renderização no servidor.
 */
export function ProductShare({ title, text }: ProductShareProps) {
  const [copied, setCopied] = useState(false);
  const [canShareNatively, setCanShareNatively] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanShareNatively(typeof navigator !== "undefined" && typeof navigator.share === "function");
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const currentUrl = useCallback(
    () => (typeof window === "undefined" ? "" : window.location.href),
    [],
  );

  async function handleCopy() {
    const url = currentUrl();
    if (!url) return;

    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      ok = legacyCopy(url);
    }

    if (!ok) {
      toast("Não foi possível copiar o link. Copie o endereço da barra do navegador.");
      return;
    }

    setCopied(true);
    toast("Link copiado");
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2400);
  }

  async function handleNativeShare() {
    const url = currentUrl();
    if (!url) return;

    try {
      await navigator.share({ title, text: text ?? title, url });
    } catch {
      // Cancelamento pelo usuário é o caso mais comum: não vira erro visível.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={handleCopy} className={cn(buttonOutline, "px-4")}>
        {copied ? (
          <Check className="size-4 shrink-0 text-saving" strokeWidth={2} aria-hidden />
        ) : (
          <Link2 className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        )}
        {copied ? "Link copiado" : "Copiar link"}
      </button>

      {canShareNatively ? (
        <button type="button" onClick={handleNativeShare} className={cn(buttonOutline, "px-4")}>
          <Share2 className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          Compartilhar
        </button>
      ) : null}

      {/* Confirmação textual acessível, independente do toast visual. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copiado" : ""}
      </span>
    </div>
  );
}
