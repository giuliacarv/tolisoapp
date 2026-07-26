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
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px w-6 bg-gold" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-fluid-h2 leading-tight tracking-tight text-balance text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[65ch] text-fluid-sm leading-relaxed text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
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
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const buttonSolid = cn(buttonBase, "bg-ink text-offwhite hover:bg-graphite");

export const buttonOutline = cn(
  buttonBase,
  "border border-border bg-card text-foreground hover:bg-secondary",
);

/** Card base: borda fina, sombra discreta e hover contido. */
export const cardBase =
  "rounded-[18px] border border-border bg-card shadow-soft transition-[transform,border-color,box-shadow] duration-200";
