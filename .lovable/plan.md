## Diagnóstico

O código está saudável no geral (componentes tipados, tokens semânticos, acessibilidade). Os problemas de manutenibilidade estão concentrados em quatro pontos:

1. **`SearchAndCategories` é um "god component"** (221 linhas): concentra 7 estados, regra de filtragem, ordenação, paginação, simulação de loading, seleção de produto e dois modais — além de todo o JSX de chips, cabeçalho de resultados e grade. Complexidade ciclomática alta e várias responsabilidades (viola SRP).
2. **Duplicação de lógica de seleção/modais**: `FeaturedOffers` e `SearchAndCategories` repetem `selected/modalOpen/detailsOpen` + `handleRedeem`/`handleSelect` idênticos.
3. **Duplicação visual nos modais**: `RedeemProductModal` e `RedeemCouponModal` repetem a mesma string gigante de `DialogContent` (bottom-sheet) e o mesmo rodapé Cancelar/Confirmar.
4. **Regra de negócio dentro da UI**: filtragem por termo, mapa `CATEGORY_LABEL_BY_ID`, `PAGE_SIZE` e `sortProducts` estão misturados a componentes de apresentação, o que dificultará a troca por backend.

Também há botões-chip com classes inline duplicadas (não usam as primitivas) e blocos de linhas em branco/`export { RedeemProductModal as RedeemDialog }` legados.

## Refatoração proposta

### 1. Camada de domínio (pura, testável)
```text
src/domain/products/
  filters.ts     -> filterProducts(products, { term, categoryId })
  sorting.ts     -> sortProducts(products, sortId), SORT_OPTIONS, SortId
  pagination.ts  -> paginate(items, page, pageSize) -> { items, safePage, totalPages }
```
Funções puras, sem React. `results-controls.tsx` passa a ser só apresentação (`SortSelect`, `Pagination`).

### 2. Hooks de estado (custom hooks = inversão de dependência)
```text
src/hooks/use-product-discovery.ts  -> query, filtro, sort, page, isLoading, resultados paginados, reset
src/hooks/use-product-modals.ts     -> selected, detailsOpen, redeemOpen, openDetails, openRedeem
src/hooks/use-simulated-loading.ts  -> delay demonstrativo isolado (fácil de remover no backend real)
```
Isso reduz `SearchAndCategories` a composição declarativa e elimina a duplicação com `FeaturedOffers`.

### 3. Componentes de apresentação extraídos
```text
components/home/discovery/quick-filters.tsx     -> chips (usa primitiva chipBase)
components/home/discovery/results-header.tsx    -> título + contador aria-live + sort + limpar
components/home/discovery/discovery-panel.tsx   -> card de busca + chips
components/home/product-modals.tsx              -> par Details+Redeem em um único componente
```
Cada arquivo com uma responsabilidade e < 80 linhas.

### 4. Primitivas reforçadas (DRY / OCP)
- `primitives.tsx`: adicionar `chipBase`, `chipActive`, `chipIdle` e `sheetDialogContent` (a classe do bottom-sheet hoje copiada em 3 modais).
- Criar `ConfirmDialog` genérico (título, descrição, resumo, labels, `onConfirm`); `RedeemProductModal` e `RedeemCouponModal` passam a ser configurações finas dele.

### 5. Limpeza
- Remover alias legado `RedeemDialog`, linhas em branco duplicadas e comentários redundantes.
- Padronizar nomes de arquivo (`search-categories.tsx` → `discovery-section.tsx`) mantendo os exports atuais.

## Resultado esperado

| Arquivo | Antes | Depois (aprox.) |
| --- | --- | --- |
| `search-categories.tsx` | 221 linhas, 7 estados | ~70 linhas, 1 hook |
| `featured-offers.tsx` | lógica duplicada | ~55 linhas |
| modais de resgate | 2× boilerplate | 1 `ConfirmDialog` + 2 configs |

Zero mudança de comportamento visível: mesma UI, mesmos textos, mesma acessibilidade, mesmos tempos de loading.

## Detalhes técnicos

- Sem novas dependências; TypeScript strict mantido, sem `any`.
- Funções de domínio recebem/retornam dados imutáveis (`readonly Product[]`), facilitando testes unitários com Vitest e a futura troca por TanStack Query.
- Hooks retornam objetos nomeados (não tuplas) para legibilidade.
- Nenhuma alteração em `src/styles.css`, tokens ou assets.
