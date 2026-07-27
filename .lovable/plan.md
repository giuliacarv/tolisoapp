## Diagnóstico

A arquitetura já é sólida: `domain/` puro, `services/` como fronteira de dados, `hooks/` de orquestração e `config/business-rules.ts` como fonte de regra. O problema não é a estrutura — é que **a estrutura não está sendo respeitada em pontos específicos**, e existe um par produto/cupom duplicado em cinco camadas.

Medições (18.864 linhas em `src/`, excluindo `ui/` e `routeTree.gen.ts`):

| Achado | Evidência | Gravidade |
|---|---|---|
| Regra de crédito hardcoded fora da config | "1 crédito"/"2 créditos"/"3 créditos" como string literal em 6 arquivos | Crítico |
| `FacetGroup` + `CheckRow` duplicados | `catalog-filters-panel.tsx:1-74` idêntico char-a-char a `coupon-filters-panel.tsx:1-74` | Alto |
| Busca duplicada | `catalog-search.tsx` ≈ 95% igual a `coupon-search.tsx` | Alto |
| Shell das rotas de listagem | `ofertas.index.tsx:100-220` ≈ 80% igual a `cupons.index.tsx:102-236` | Alto |
| Hooks de catálogo | `use-catalog.ts` ≈ 70% estrutural igual a `use-coupon-catalog.ts` | Médio |
| `SiteHeader` com 4 responsabilidades | scroll + menu + tema + toast; 4 `useState`, 2 `useEffect`, CC ~12 | Alto |
| `SearchAndCategories` orquestra e renderiza | 4 ramos condicionais em cascata na JSX; CC ~14 | Alto |
| Arquivos-módulo inchados | `creditos.tsx` 441 linhas, `cupons.$slug.tsx` 472, `contato.tsx` 325 | Médio |

**O que NÃO vou mexer** (e o porquê): `domain/products/catalog-filters.ts` e `domain/coupons/coupon-filters.ts` compartilham o *esqueleto*, mas as regras divergem de verdade (faixa de preço/créditos vs. tipo de desconto/status/compra mínima). Unificá-las criaria uma abstração prematura com flags — mantê-las separadas é a decisão correta. Também não toco em `components/ui/*` (shadcn) nem nos mocks, que já estão corretamente isolados atrás dos `services`.

---

## Fase 1 — Regra de créditos com fonte única (maior impacto, menor risco)

O número mais sensível do produto está escrito à mão em `creditos.tsx:63`, `credits-system.tsx:12`, `termos.tsx:30`, `data/faq.ts:51`, `data/how-it-works.ts:43`. Mudar o limiar de R$ 50 hoje exige editar 6 arquivos e torcer para não esquecer nenhum — é uma inconsistência esperando para acontecer, não uma hipótese.

- Adicionar a `config/business-rules.ts` os derivadores `describeProductCreditRule()`, `describeCouponCreditRule()` e `describeCreditThreshold()`, que **geram** os textos a partir de `PRODUCT_CREDIT_COST_LOW/HIGH`, `COUPON_CREDIT_COST` e do limiar.
- Substituir os 6 literais por chamadas a esses derivadores.
- Teste unitário travando a relação: mudar a constante muda todos os textos.

## Fase 2 — Primitivos de UI duplicados

Extrações mecânicas, sem decisão de design:

- `components/ui/facet-group.tsx` — `FacetGroup` + `CheckRow` únicos; os dois painéis passam a importar. Remove ~74 linhas literalmente clonadas.
- `components/search/search-input-form.tsx` — formulário de busca genérico (`value`, `onSearch`, `inputId`, `ariaLabel`, `placeholder`). `CatalogSearch` e `CouponSearch` viram wrappers de ~8 linhas que só fixam rótulos.
- `hooks/use-coming-soon.ts` — o padrão "funcionalidade em breve" hoje tem 3 formatos diferentes (`site-header.tsx:66`, `contato.tsx:117`, `creditos.tsx:142`). Unificar o toast; `ConfirmDialog` fica reservado aos casos que realmente pedem confirmação.

## Fase 3 — Toolbar e shell das rotas de catálogo

- `components/catalog/results-toolbar.tsx` — contador + drawer de filtros no mobile + select de ordenação + chips ativos, parametrizado por `count`, `sortOptions`, `sort`, `onSortChange`, `panel`.
- `components/catalog/catalog-page-shell.tsx` — estrutura comum das duas listagens, recebendo `renderResults` como prop (Inversão de Controle: o shell não sabe se renderiza produto ou cupom).
- `ofertas.index.tsx` e `cupons.index.tsx` caem para ~90 linhas cada, contendo apenas o que é específico do seu domínio.

## Fase 4 — Componentes de alta complexidade ciclomática

**`site-header.tsx`** (CC ~12 → ~4): extrair `hooks/use-scroll-progress.ts` (o `useEffect` de scroll/resize vira testável isoladamente) e os subcomponentes `HeaderNavLinks` e `HeaderMobileMenu`. O componente-raiz passa a apenas compor.

**`discovery-section.tsx`** (CC ~14 → ~5): mover a construção de `quickFilters`/`activeChips` para dentro de `use-product-discovery`, e extrair `DiscoveryResults` — um único ponto de decisão para os quatro estados (erro, carregando, vazio, resultados), substituindo os ternários aninhados na JSX por *early returns*.

## Fase 5 — Módulos inchados (SRP de arquivo)

- `creditos.tsx` (441 → ~120): conteúdo estático para `data/credits-content.ts`; `CreditsSimulator` — a única peça com estado — para `components/credits/credits-simulator.tsx`.
- `contato.tsx` (325 → ~150): `contactSchema` e `CONTACT_CATEGORIES` para `domain/contact/contact-schema.ts`, prontos para reuso quando houver backend.
- `cupons.$slug.tsx` (472 → ~180) e `ofertas.$slug.tsx` (379 → ~160): extrair os blocos de detalhe para `components/coupons/` e `components/product/`.

## Sobre unificar os hooks de catálogo

`useCatalog` e `useCouponCatalog` compartilham ~70% da estrutura (`patch`/`toggle`/`reset`/`activeChips`), mas divergem em paginação progressiva (só produtos) e derivação de facetas. Um `useFacetedCatalog<T, F>()` genérico é viável, porém é a mudança de maior superfície de regressão do lote.

**Proposta:** deixar para o fim, como fase opcional, e só executar depois que as fases 1-5 estiverem verdes nos testes. O ganho é real mas menor que o risco de embutir agora.

---

## Detalhes técnicos

- **Zero mudança funcional.** Nenhuma alteração de layout, cor, texto visível ou comportamento. A suíte de regressão visual do Playwright (`/`, `/homepage2`, `/design-system`) serve de rede de segurança: se um baseline quebrar, a refatoração vazou para a apresentação e será revertida — as baselines **não** serão atualizadas nesta tarefa.
- **Verificação por fase:** `tsgo` (tipos), `vitest` (unitários) e `playwright` visual após cada fase, não só no fim.
- **Sem novas dependências.** Nenhum pacote instalado.
- **Ordem deliberada:** cada fase é independente e commitável isoladamente; se você quiser parar depois da Fase 2, o código já fica melhor do que está.
- Comentários técnicos inline serão mantidos em português, explicando o *porquê* de cada abstração — especialmente onde a duplicação foi conservada de propósito.

Saldo estimado: **~700 linhas a menos**, nenhum pixel diferente.
