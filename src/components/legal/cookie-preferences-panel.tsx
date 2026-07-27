import { useEffect, useState } from "react";

import { toast } from "sonner";

import { buttonOutline, buttonSolid } from "@/components/home/primitives";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { COOKIE_CATEGORIES, defaultConsent, type CookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

/**
 * Painel de gestão de cookies exibido na Política de cookies.
 * Escreve apenas a preferência local: não carrega nenhum rastreador.
 */
export function CookiePreferencesPanel() {
  const { consent, hydrated, save, acceptAll, acceptEssential } = useCookieConsent();
  const [draft, setDraft] = useState<CookieConsent>(() => defaultConsent());

  useEffect(() => {
    if (consent) setDraft(consent);
  }, [consent]);

  return (
    <div className="gilded-frame rounded-[20px] border border-border bg-card p-6 shadow-soft">
      <h3 className="text-fluid-sm font-semibold text-foreground">Suas preferências de cookies</h3>
      <p className="mt-1 text-fluid-xs leading-[1.7] text-muted-foreground">
        {hydrated && consent
          ? "Decisão registrada neste dispositivo. Você pode alterá-la quando quiser."
          : "Nenhuma decisão registrada ainda neste dispositivo — somente cookies essenciais estão em uso."}
      </p>

      <ul className="mt-6 space-y-4 border-t border-border pt-6">
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

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className={cn(buttonOutline, "w-full sm:w-auto")}
          onClick={() => {
            acceptEssential();
            toast("Apenas cookies essenciais permanecem ativos neste dispositivo.");
          }}
        >
          Aceitar necessários
        </button>
        <button
          type="button"
          className={cn(buttonOutline, "w-full sm:w-auto")}
          onClick={() => {
            save({ ...draft, essential: true, decidedAt: new Date().toISOString() });
            toast("Preferências de cookies salvas neste dispositivo.");
          }}
        >
          Salvar preferências
        </button>
        <button
          type="button"
          className={cn(buttonSolid, "w-full sm:w-auto")}
          onClick={() => {
            acceptAll();
            toast("Todas as categorias foram autorizadas neste dispositivo.");
          }}
        >
          Aceitar todos
        </button>
      </div>
    </div>
  );
}
