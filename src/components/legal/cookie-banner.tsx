import { useEffect, useState } from "react";

import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

import { buttonOutline, buttonSolid } from "@/components/home/primitives";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { COOKIE_CATEGORIES, defaultConsent, type CookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

/**
 * BANNER DE COOKIES (PROVISÓRIO)
 * ---------------------------------------------------------------------------
 * Controla apenas a preferência local do visitante. Nenhum script de análise,
 * publicidade ou rede de afiliados é carregado aqui — categorias não
 * essenciais permanecem desativadas até existir consentimento explícito.
 */
export function CookieBanner() {
  const { needsDecision, acceptEssential, acceptAll, save } = useCookieConsent();
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<CookieConsent>(() => defaultConsent());

  useEffect(() => {
    if (!needsDecision) setCustomizing(false);
  }, [needsDecision]);

  if (!needsDecision) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-titulo"
      className="fixed inset-x-0 bottom-0 z-50 p-[var(--gutter)] sm:p-4"
    >
      <div className="glass-surface mx-auto w-full max-w-3xl rounded-[20px] border border-border p-5 shadow-float sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink">
            <Cookie className="size-5 text-gold" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <h2
              id="cookie-banner-titulo"
              className="text-fluid-sm font-semibold text-foreground"
            >
              Este site usa cookies
            </h2>
            <p className="mt-1 text-fluid-xs leading-[1.7] text-muted-foreground">
              Usamos cookies essenciais para o funcionamento da interface. Categorias de
              preferências, análise e publicidade/afiliados ficam desativadas até você autorizar.
              Nenhum rastreador é carregado nesta versão.{" "}
              <Link
                to="/cookies"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Política de cookies
              </Link>
              .
            </p>
          </div>
        </div>

        {customizing ? (
          <ul className="mt-5 space-y-3 border-t border-border pt-5">
            {COOKIE_CATEGORIES.map((category) => (
              <li key={category.id} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-fluid-xs font-semibold text-foreground">
                    {category.title}
                    {category.locked ? (
                      <span className="ml-2 text-fluid-micro font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        sempre ativo
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-fluid-micro leading-[1.7] text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <Switch
                  checked={category.locked ? true : Boolean(draft[category.id])}
                  disabled={category.locked}
                  aria-label={`Cookies de ${category.title.toLowerCase()}`}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({ ...current, [category.id]: checked }))
                  }
                />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={acceptEssential} className={cn(buttonOutline, "w-full sm:w-auto")}>
            Aceitar necessários
          </button>

          {customizing ? (
            <button
              type="button"
              onClick={() => save({ ...draft, essential: true, decidedAt: new Date().toISOString() })}
              className={cn(buttonOutline, "w-full sm:w-auto")}
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className={cn(buttonOutline, "w-full sm:w-auto")}
              aria-expanded={customizing}
            >
              Personalizar
            </button>
          )}

          <button type="button" onClick={acceptAll} className={cn(buttonSolid, "w-full sm:w-auto")}>
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
