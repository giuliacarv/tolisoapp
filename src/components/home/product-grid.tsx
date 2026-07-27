import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Reveal } from "./reveal";
import type { Product } from "@/types";

export interface ProductGridProps {
  products: Product[];
  onRedeem: (product: Product) => void;
  /** Clique no card abre o modal de detalhes. */
  onSelect?: (product: Product) => void;
  isLoading?: boolean;
  /** Quantos skeletons exibir durante o carregamento. */
  skeletonCount?: number;
  /** Conteúdo customizado para o estado vazio. */
  emptyState?: ReactNode;
  /** Classes extras da grade (ex.: limitar colunas em blocos estreitos). */
  className?: string;
}

/** Grade responsiva de produtos: 1 / 2 / 3 / 4 colunas. */
export function ProductGrid({
  products,
  onRedeem,
  onSelect,
  isLoading = false,
  skeletonCount = 8,
  emptyState,
  className,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="Carregando ofertas"
        className={cn("grid-fluid [--col-min:15rem]", className)}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    if (emptyState) return <>{emptyState}</>;

    return (
      <div role="status" className="rounded-[18px] border border-border bg-card p-10 text-center">
        <p className="font-medium text-foreground">Nenhuma oferta encontrada</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente outro termo de busca ou selecione outra categoria.
        </p>
      </div>
    );
  }


  return (
    <ul className={cn("grid-fluid [--col-min:15rem]", className)}>
      {products.map((product, index) => (
        // Cascata limitada aos 8 primeiros itens: acima disso a espera
        // acumulada passaria a parecer lentidão, não elegância.
        <Reveal
          as="li"
          key={product.id}
          delay={Math.min(index, 7) * 60}
          className="min-w-0"
        >
          <ProductCard product={product} onRedeem={onRedeem} onSelect={onSelect} />
        </Reveal>
      ))}
    </ul>
  );
}
