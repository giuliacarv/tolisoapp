import { Coins } from "lucide-react";

import { cn } from "@/lib/utils";

interface CreditsBadgeProps {
  /** Saldo demonstrativo de créditos (será conectado à conta do usuário depois). */
  credits?: number;
  className?: string;
}

/** Indicador de saldo de créditos. Apenas visual nesta etapa. */
export function CreditsBadge({ credits = 5, className }: CreditsBadgeProps) {
  const label = `${credits} ${credits === 1 ? "crédito" : "créditos"}`;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/45 bg-gold/10 px-3 py-1.5 text-xs font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <Coins className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
      <span className="sr-only">Saldo atual:</span>
      {label}
    </span>
  );
}
