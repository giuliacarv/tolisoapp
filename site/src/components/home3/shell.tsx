import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Container do tema Solaris — respiro maior que o da home Obsidian. */
export function Shell({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[84rem] px-[clamp(1rem,4vw,2.5rem)]", className)}
      {...props}
    />
  );
}

export interface SolSectionProps extends ComponentProps<"section"> {
  id?: string;
}

/** Seção com ritmo vertical fluido e âncora compensando o header flutuante. */
export function SolSection({ className, ...props }: SolSectionProps) {
  return (
    <section
      className={cn(
        "scroll-mt-28 py-[clamp(3.5rem,8vw,7rem)]",
        className,
      )}
      {...props}
    />
  );
}

export interface SolHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

/** Cabeçalho de seção: sobrancelha em pílula + título display + apoio. */
export function SolHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SolHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-3", align === "center" && "items-center text-center")}>
        {eyebrow ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-balance text-[clamp(1.9rem,5vw,3.4rem)] text-foreground">{title}</h2>
        {description ? (
          <p className="max-w-[52ch] text-pretty text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
