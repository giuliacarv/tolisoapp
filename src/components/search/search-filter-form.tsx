/**
 * FORMULÁRIO DE BUSCA E FILTROS
 * ---------------------------------------------------------------------------
 * Componente controlado e reutilizável: não conhece modal, rota nem serviço de
 * aplicação dos filtros. Quem monta decide o que fazer no `onSubmit`.
 *
 * Decisões:
 * - Estado é rascunho local (`draft`), sincronizado com `value` sempre que o
 *   formulário é remontado/reaberto. Assim, cancelar nunca altera a página.
 * - As opções de preço vêm do domínio (`catalog-filters`), evitando divergência
 *   com o catálogo de /ofertas.
 */

import { useEffect, useId, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRICE_RANGES } from "@/domain/products/catalog-filters";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { categoryService } from "@/services";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

/** Valor sentinela: `Select` do Radix não aceita item com valor vazio. */
export const ANY_OPTION = "todas";

export interface SearchFilterValues {
  /** Termo livre digitado pelo usuário. */
  keyword: string;
  /** Id da categoria ou `ANY_OPTION`. */
  categoryId: string;
  /** Id da faixa de preço (`PRICE_RANGES`) ou `ANY_OPTION`. */
  priceRangeId: string;
  /** Data mínima de publicação da oferta; `null` = qualquer data. */
  publishedFrom: Date | null;
}

export const EMPTY_SEARCH_FILTERS: SearchFilterValues = {
  keyword: "",
  categoryId: ANY_OPTION,
  priceRangeId: ANY_OPTION,
  publishedFrom: null,
};

export interface SearchFilterFormProps {
  /** Valores já aplicados — servem de ponto de partida do rascunho. */
  value?: SearchFilterValues;
  /** Disparado apenas no envio explícito do formulário. */
  onSubmit: (values: SearchFilterValues) => void;
  /** Opcional: chamado ao limpar os campos (o rascunho volta ao vazio). */
  onReset?: () => void;
  /** Rótulo do botão principal. */
  submitLabel?: string;
  className?: string;
}

export function SearchFilterForm({
  value = EMPTY_SEARCH_FILTERS,
  onSubmit,
  onReset,
  submitLabel = "Aplicar filtros",
  className,
}: SearchFilterFormProps) {
  const fieldId = useId();
  const [draft, setDraft] = useState<SearchFilterValues>(value);

  // Reidrata o rascunho quando o valor aplicado muda externamente.
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const categories = useAsyncResource<Category[]>(() => categoryService.list(), []);
  const categoryOptions = categories.data ?? [];

  function patch(partial: Partial<SearchFilterValues>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ ...draft, keyword: draft.keyword.trim() });
  }

  function handleReset() {
    setDraft(EMPTY_SEARCH_FILTERS);
    onReset?.();
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)} noValidate>
      <div className="space-y-2">
        <Label htmlFor={`${fieldId}-keyword`}>Palavra-chave</Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
            aria-hidden
          />
          <Input
            id={`${fieldId}-keyword`}
            value={draft.keyword}
            onChange={(event) => patch({ keyword: event.target.value })}
            placeholder="Ex.: fone bluetooth, air fryer, tênis"
            autoComplete="off"
            className="h-11 pl-9"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${fieldId}-category`}>Categoria</Label>
          <Select
            value={draft.categoryId}
            onValueChange={(categoryId) => patch({ categoryId })}
          >
            <SelectTrigger id={`${fieldId}-category`} className="h-11">
              <SelectValue
                placeholder={categories.isLoading ? "Carregando…" : "Todas as categorias"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_OPTION}>Todas as categorias</SelectItem>
              {categoryOptions.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${fieldId}-price`}>Preço</Label>
          <Select
            value={draft.priceRangeId}
            onValueChange={(priceRangeId) => patch({ priceRangeId })}
          >
            <SelectTrigger id={`${fieldId}-price`} className="h-11">
              <SelectValue placeholder="Qualquer preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_OPTION}>Qualquer preço</SelectItem>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${fieldId}-date`}>Data (ofertas publicadas a partir de)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={`${fieldId}-date`}
              type="button"
              variant="outline"
              className={cn(
                "h-11 w-full justify-start text-left font-normal",
                !draft.publishedFrom && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-hidden />
              {draft.publishedFrom
                ? format(draft.publishedFrom, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                : "Qualquer data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={ptBR}
              selected={draft.publishedFrom ?? undefined}
              onSelect={(date) => patch({ publishedFrom: date ?? null })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          className="min-h-11 gap-2"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Limpar campos
        </Button>
        <Button type="submit" className="min-h-11 gap-2">
          <Search className="h-4 w-4" aria-hidden />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
