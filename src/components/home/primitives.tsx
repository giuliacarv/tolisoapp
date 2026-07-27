import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Container central com largura máxima de ~1.280px. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[90rem] px-[var(--gutter)]", className)} {...props} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Nível semântico do título. Use "h1" quando for o título principal da página. */
  as?: "h1" | "h2" | "h3";
  /**
   * `serif` (padrão) mantém a voz editorial Fraunces.
   * `display` usa a condensada Bebas Neue para títulos de impacto institucional.
   */
  variant?: "serif" | "display";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  variant = "serif",
  className,
}: SectionHeadingProps) {
  const isDisplay = variant === "display";

  return (
    <div
      className={cn(
        // Ritmo 8pt: 8px entre sobrancelha e título, 16px entre título e apoio.
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-px w-6 bg-[image:var(--gradient-gold)]" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "text-balance text-foreground",
          isDisplay
            ? "font-display text-fluid-h1 uppercase leading-[0.92] tracking-[0.01em]"
            : "font-serif text-fluid-h2 leading-[1.06] tracking-[-0.028em]",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-[58ch] text-fluid-sm leading-[1.75] text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}


export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-hairline",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Estilos de botão reutilizáveis — mantêm consistência de raio, altura mínima
 * (área de toque >= 44px), foco visível e duração de transição (~200ms).
 */
export const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

/** Ação primária: gradiente grafite→carvão e sombra que ganha difusão no hover. */
export const buttonSolid = cn(
  buttonBase,
  "cta-surface shadow-soft hover:shadow-lift",
);

export const buttonOutline = cn(
  buttonBase,
  "border border-border bg-card text-foreground hover:border-gold/40 hover:bg-secondary hover:shadow-soft",
);

/** Card base: borda fina, sombra difusa e elevação contida no hover. */
export const cardBase =
  "rounded-[18px] border border-border bg-card shadow-soft transition-[transform,border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]";

/** Card clicável/navegável: base + elevação e brilho diagonal no hover. */
export const cardInteractive = cn(
  cardBase,
  "hover-sheen gilded-frame motion-safe-transform hover:border-gold/40 hover:shadow-lift motion-safe:hover:-translate-y-1",
);


/** Superfície de vidro para painéis sobrepostos (modais, barras flutuantes). */
export const glassPanel = "glass-surface rounded-[18px] shadow-lift";

/** Chips de filtro — altura mínima de 44px para área de toque confortável. */
export const chipBase =
  "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-fluid-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

export const chipActive = cn(chipBase, "cta-surface border-transparent");

export const chipIdle = cn(
  chipBase,
  "border border-border bg-background text-muted-foreground hover:border-gold/40 hover:text-foreground",
);

/**
 * Chip informativo estático (loja, categoria, créditos) usado dentro de modais
 * e cabeçalhos. Não é interativo: sem altura mínima de toque nem estado ativo.
 */
export const chipMeta =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-fluid-micro font-semibold text-foreground";

/**
 * Link/ação terciária discreta ("Limpar filtros", "Ver todas").
 * Mesma altura de toque dos botões, sem peso visual de superfície.
 */
export const linkQuiet =
  "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-fluid-xs font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

/** Link de ênfase — dourado nos dois temas, legível também sobre faixas noir. */
export const linkGold =
  "inline-flex min-h-11 items-center gap-1.5 rounded-lg text-fluid-xs font-semibold text-gold underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Bloco interno de modal/painel (resumos, listas de definição). */
export const panelInset = "panel-inset rounded-xl px-4 py-3";

/** Variante de destaque do bloco interno (custo, saldo, avisos). */
export const panelInsetMuted = "panel-inset-muted rounded-xl px-4 py-3";

/** Diálogo em bottom-sheet no mobile e centrado a partir de `sm`. */
export const sheetDialogContent =
  "fixed inset-x-0 bottom-0 top-auto max-h-[90dvh] w-full max-w-none translate-x-0 translate-y-0 gap-4 overflow-y-auto overscroll-contain rounded-t-[20px] border-border bg-card/95 backdrop-blur-xl dark:border-offwhite/20 dark:bg-card p-[var(--gutter)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px] sm:p-6 sm:shadow-float";

/** Mesma casca do diálogo, com largura maior (modais com mídia). */
export const sheetDialogContentWide = cn(sheetDialogContent, "sm:max-w-lg");
