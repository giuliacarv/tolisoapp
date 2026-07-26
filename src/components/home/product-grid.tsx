import { ProductCard, ProductCardSkeleton } from "./product-card";
import type { Product } from "@/data/products";

export interface ProductGridProps {
  products: Product[];
  onRedeem: (product: Product) => void;
  isLoading?: boolean;
  /** Quantos skeletons exibir durante o carregamento. */
  skeletonCount?: number;
}

/** Grade responsiva de produtos: 1 / 2 / 3 / 4 colunas. */
export function ProductGrid({
  products,
  onRedeem,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid-fluid [--col-min:15rem]">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[18px] border border-border bg-card p-10 text-center">
        <p className="font-medium text-foreground">Nenhuma oferta encontrada</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente outro termo de busca ou selecione outra categoria.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid-fluid [--col-min:15rem]">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} onRedeem={onRedeem} />
        </li>
      ))}
    </ul>
  );
}
