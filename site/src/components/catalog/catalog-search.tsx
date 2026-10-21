import { SearchInputForm } from "@/components/search/search-input-form";

export interface CatalogSearchProps {
  /** Termo já aplicado ao catálogo. */
  value: string;
  /** Dispara a busca (a cada tecla e também no submit com Enter). */
  onSearch: (term: string) => void;
  className?: string;
}

/**
 * Busca do catálogo de ofertas.
 * Wrapper fino sobre `SearchInputForm`: fixa apenas os rótulos do domínio.
 */
export function CatalogSearch(props: CatalogSearchProps) {
  return (
    <SearchInputForm
      {...props}
      formLabel="Buscar no catálogo de ofertas"
      inputId="busca-catalogo"
      inputLabel="Busque por produto, descrição, categoria ou loja"
      placeholder="Busque por produto, categoria ou loja"
    />
  );
}
