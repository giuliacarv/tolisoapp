import { Link } from "@tanstack/react-router";
import { ArrowLeft, SearchX } from "lucide-react";

import { buttonSolid } from "@/components/home/primitives";
import { cn } from "@/lib/utils";

/** Placeholder neutro reutilizado nas linhas do skeleton. */
function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-secondary motion-safe:animate-pulse", className)} />;
}

/** Skeleton completo da página de oferta (mesma malha do conteúdo real). */
export function ProductDetailSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Carregando oferta"
      className="grid gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <div className="flex flex-col gap-3">
        <div className="aspect-[4/3] w-full rounded-[18px] bg-secondary motion-safe:animate-pulse" />
        <div className="flex gap-3">
          <Bar className="size-20 rounded-xl" />
          <Bar className="size-20 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Bar className="h-5 w-40" />
        <Bar className="h-10 w-full" />
        <Bar className="h-10 w-3/4" />
        <Bar className="h-4 w-2/3" />
        <Bar className="h-28 w-full rounded-2xl" />
        <Bar className="h-12 w-full rounded-xl sm:w-64" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-5/6" />
        <Bar className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
}

/** Estado de slug inexistente ou oferta removida. */
export function ProductNotFound() {
  return (
    <div className="mx-auto max-w-md rounded-[18px] border border-border bg-card px-6 py-14 text-center shadow-soft">
      <span
        aria-hidden
        className="mx-auto grid size-14 place-items-center rounded-full border border-border bg-secondary"
      >
        <SearchX className="size-6 text-gold" strokeWidth={1.5} />
      </span>
      <h1 className="mt-6 font-serif text-fluid-h3 tracking-tight text-foreground">
        Oferta não encontrada
      </h1>
      <p className="mt-3 text-fluid-sm leading-relaxed text-muted-foreground">
        Esta oferta pode ter sido removida, alterada ou não está mais disponível.
      </p>
      <Link to="/ofertas" className={cn(buttonSolid, "mt-8")}>
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        Voltar para as ofertas
      </Link>
    </div>
  );
}
