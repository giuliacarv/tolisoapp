# EconomizAI

Plataforma em desenvolvimento para descoberta de ofertas e cupons. **Os produtos, preços, cupons e créditos disponíveis na aplicação atual são demonstrativos.** Não são promoções ativas, nem verificações de preços em tempo real.

## Situação das funcionalidades (outubro/2026)

- Homepage Solaris, navegação, busca e filtros: implementados sobre dados locais demonstrativos.
- Pesquisa nas lojas: a busca da homepage oferece links externos para consultar o produto na Amazon e no Mercado Livre. Os resultados e preços são definidos pelas lojas, sem integração/API ou atribuição de afiliados.
- Produtos e cupons: catálogos fictícios, com datas de expiração históricas; não há atualização automática.
- Autenticação: formulários demonstrativos, sem sessões reais.
- Créditos e resgates: simulações, sem débito ou persistência.
- Pagamentos, afiliados e comparação de histórico: ainda não implementados.

## Desenvolvimento

Requisitos: Bun e ambiente compatível com a configuração atual do Lovable/TanStack Start.

```sh
bun install
bun run dev
```

Validação:

```sh
bunx tsc --noEmit
bun run lint
bunx vitest run
bun run build
bun run test:visual
```

**Não trate a existência desses comandos como evidência de testes aprovados.**

## Arquitetura

- `src/domain/`: regras de negócio.
- `src/services/`: fronteira de dados, atualmente lendo `src/data/mock*`.
- `src/hooks/`: estado e orquestração.
- `src/routes/`: rotas TanStack Router.
- `src/components/home3/`: homepage Solaris ativa em `/`.
- `src/config/business-rules.ts`: constantes de créditos demonstrativos.
- `tests/unit/` e `tests/visual/`: testes.

## Infraestrutura e publicação

O deploy oficial do EconomizAI e o domínio canônico ainda precisam de confirmação. Não assuma que a presença de uma integração do Lovable implica integração com Supabase ou Netlify. Confira `vite.config.ts` antes de configurar adaptadores, pois o plugin do Lovable já registra os componentes essenciais de build.

Editor do Lovable: https://lovable.dev/projects/966fdf30-2333-417f-b6bd-7796d44c8822
Repositório: https://github.com/giuliacarv/tolisoapp

## Próxima entrega funcional

1. Verificar build, tipagem, lint e testes em ambiente Bun.
2. Definir hospedagem operacional para SSR do TanStack Start.
3. Escolher fonte autorizada de produtos e cupons reais.
4. Conectar banco e persistência dos catálogos (sem inventar preços).
5. Só então ativar contas, saldo transacional, resgates e monetização.
