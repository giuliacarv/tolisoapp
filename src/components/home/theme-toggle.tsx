import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Botão flutuante fixo que alterna entre o tema claro e o "modo escuro premium".
 *
 * Fica ancorado no canto inferior direito, acima de qualquer conteúdo, e
 * respeita a área segura de aparelhos com notch/gesture bar.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={mounted ? isDark : undefined}
      title={label}
      className={cn(
        "group fixed z-50 inline-flex items-center gap-2.5 rounded-full",
        "right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))]",
        "sm:right-6 sm:bottom-6",
        "touch-target px-3.5 py-3 sm:px-4",
        // Superfície noir: sempre escura no claro, vidro dourado no escuro.
        "border border-gold/30 bg-ink text-offwhite shadow-float backdrop-blur-md",
        "dark:border-gold/45 dark:bg-card/80",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-premium)]",
        "hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[var(--shadow-gold)]",
        "active:translate-y-0",
        className,
      )}
    >
      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
        <Moon
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "absolute h-5 w-5 text-gold transition-all duration-300 ease-[var(--ease-premium)]",
            isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        />
        <Sun
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "absolute h-5 w-5 text-gold transition-all duration-300 ease-[var(--ease-premium)]",
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
          )}
        />
      </span>
      <span className="text-fluid-xs font-semibold tracking-tight max-sm:sr-only">
        {isDark ? "Claro" : "Escuro"}
      </span>
    </button>
  );
}
