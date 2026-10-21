/**
 * CABEÇALHO DE BUSCA
 * ---------------------------------------------------------------------------
 * Ícone de busca que abre um diálogo com `<SearchFilterForm />`.
 *
 * Contrato importante: fechar o diálogo (Esc, clique fora ou botão X) NÃO
 * altera o estado da página. O formulário trabalha sobre um rascunho e só
 * comunica algo através de `onApply`, disparado no envio explícito.
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ANY_OPTION,
  EMPTY_SEARCH_FILTERS,
  SearchFilterForm,
  type SearchFilterValues,
} from "@/components/search/search-filter-form";
import { cn } from "@/lib/utils";

export interface SearchHeaderProps {
  /**
   * Recebe os filtros no envio. Sem ele, apenas confirmamos visualmente —
   * mantendo a página intacta enquanto não há backend de busca.
   */
  onApply?: (values: SearchFilterValues) => void;
  /** Classe do botão-ícone, para casar com o estilo do header hospedeiro. */
  triggerClassName?: string;
  label?: string;
}

/** Resumo curto dos filtros escolhidos, usado no feedback padrão. */
function describe(values: SearchFilterValues): string {
  const parts: string[] = [];
  if (values.keyword) parts.push(`"${values.keyword}"`);
  if (values.categoryId !== ANY_OPTION) parts.push("categoria selecionada");
  if (values.priceRangeId !== ANY_OPTION) parts.push("faixa de preço");
  if (values.publishedFrom) parts.push("data inicial");
  return parts.length ? parts.join(" · ") : "nenhum filtro definido";
}

export function SearchHeader({
  onApply,
  triggerClassName,
  label = "Abrir busca e filtros",
}: SearchHeaderProps) {
  const [open, setOpen] = useState(false);
  // Últimos filtros aplicados: reabrir o modal mostra o que já valia.
  const [applied, setApplied] = useState<SearchFilterValues>(EMPTY_SEARCH_FILTERS);

  function handleSubmit(values: SearchFilterValues) {
    setApplied(values);
    setOpen(false);

    if (onApply) {
      onApply(values);
      return;
    }

    toast.success("Filtros prontos", {
      description: `Busca definida: ${describe(values)}.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full border border-border/70 text-foreground transition-colors hover:bg-muted",
            triggerClassName,
          )}
        >
          <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Buscar ofertas</DialogTitle>
          <DialogDescription>
            Combine palavra-chave, categoria, data e preço. Fechar sem aplicar mantém a
            página como está.
          </DialogDescription>
        </DialogHeader>

        {/* `key` remonta o formulário a cada abertura: o rascunho descartado
            nunca reaparece por engano. */}
        <SearchFilterForm
          key={open ? "open" : "closed"}
          value={applied}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
