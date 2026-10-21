import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * PRIMITIVOS DE FACETA
 * ---------------------------------------------------------------------------
 * Por que existem: `FacetGroup` e `CheckRow` estavam duplicados char-a-char
 * entre o painel de ofertas e o de cupons. Como não há nenhuma regra de
 * negócio aqui — só apresentação acessível de um grupo de checkboxes —
 * manter duas cópias era duplicação pura, sem contrapartida.
 */

/** Bloco de faceta com título discreto e ritmo vertical de 8pt. */
export function FacetGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-fluid-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </legend>
      <div className="mt-3 flex flex-col gap-1">{children}</div>
    </fieldset>
  );
}

export interface CheckRowProps {
  checked: boolean;
  label: string;
  /** Contagem opcional de resultados para a faceta. */
  count?: number;
  onToggle: () => void;
}

/**
 * Linha de seleção acessível.
 * O input nativo permanece no DOM (leitores de tela e teclado funcionam); o
 * quadrado dourado é apenas a representação visual.
 */
export function CheckRow({ checked, label, count, onToggle }: CheckRowProps) {
  return (
    <label
      className={cn(
        "group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors duration-200",
        "hover:bg-secondary focus-within:ring-2 focus-within:ring-gold/50",
      )}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors duration-200",
          checked ? "border-gold bg-gold text-ink" : "border-border bg-background",
        )}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate transition-colors duration-200",
          checked ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      {count !== undefined ? (
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground/70">{count}</span>
      ) : null}
    </label>
  );
}
