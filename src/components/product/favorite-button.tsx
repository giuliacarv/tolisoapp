import { Heart } from "lucide-react";

import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export interface FavoriteButtonProps {
  productId: string;
  productName: string;
  /** `icon` para uso sobre a imagem do card; `label` para páginas de detalhe. */
  variant?: "icon" | "label";
  className?: string;
}

/**
 * Botão de coração para favoritar produtos.
 * Preferência puramente local (localStorage) — nenhum dado de conta envolvido.
 */
export function FavoriteButton({
  productId,
  productName,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(productId);

  const label = active
    ? `Remover ${productName} dos favoritos`
    : `Adicionar ${productName} aos favoritos`;

  return (
    <button
      type="button"
      onClick={(event) => {
        // Impede que o clique acione o "stretched link" do card.
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(productId);
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "touch-target relative z-10 inline-flex items-center justify-center gap-2 rounded-full border transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "icon"
          ? "h-11 w-11 border-border bg-card/90 backdrop-blur hover:-translate-y-0.5"
          : "border-border bg-card px-5 py-3 text-sm font-semibold hover:-translate-y-0.5",
        active ? "text-discount" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Heart
        className="h-5 w-5 shrink-0"
        strokeWidth={1.75}
        fill={active ? "currentColor" : "none"}
        aria-hidden
      />
      {variant === "label" ? (
        <span>{active ? "Salvo nos favoritos" : "Salvar nos favoritos"}</span>
      ) : null}
    </button>
  );
}
