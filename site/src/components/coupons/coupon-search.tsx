import { SearchInputForm } from "@/components/search/search-input-form";

export interface CouponSearchProps {
  /** Termo já aplicado à lista. */
  value: string;
  /** Dispara a busca a cada tecla e também no submit (Enter). */
  onSearch: (term: string) => void;
  className?: string;
}

/**
 * Busca de cupons por loja, título, descrição e benefício.
 * Wrapper fino sobre `SearchInputForm`: fixa apenas os rótulos do domínio.
 */
export function CouponSearch(props: CouponSearchProps) {
  return (
    <SearchInputForm
      {...props}
      formLabel="Buscar cupons"
      inputId="busca-cupons"
      inputLabel="Busque por loja, título, descrição ou benefício"
      placeholder="Busque por loja, título ou benefício"
    />
  );
}
