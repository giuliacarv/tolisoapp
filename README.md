# EconomizAI

Plataforma em desenvolvimento para descoberta de ofertas e cupons. **Os produtos, preços, cupons e créditos disponíveis na aplicação atual são demonstrativos.** Não são promoções ativas, nem verificações de preços em tempo real.

## Situação das funcionalidades (outubro/2026)

- Homepage Solaris, navegação, busca e filtros: implementados; usam dados reais se as variáveis públicas do banco estiverem configuradas e mocks se não estiverem.
- Pesquisa nas lojas: a busca da homepage oferece links externos para consultar o produto na Amazon e no Mercado Livre. Os resultados e preços são definidos pelas lojas, sem integração/API ou atribuição de afiliados.
- Produtos e cupons: o Lovable Cloud já possui as tabelas públicas. Sem conexão de frontend, os serviços usam mocks históricos. Com conexão, consultam somente registros publicados e dentro da validade. Ainda não há atualização automática nem ofertas reais cadastradas.
- Autenticação: formulários demonstrativos, sem sessões reais.
- Créditos e resgates: simulações, sem débito ou persistência.
- Pagamentos e comparação automática de histórico: ainda não implementados. Para ofertas reais publicadas, o CTA aponta para a URL da loja cadastrada; nenhum débito de crédito ocorre.

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

A publicação pública atual ainda não contém as alterações desta branch. O projeto Lovable possui banco Cloud ativo com 2 lojas, 6 categorias e zero ofertas/cupons. Não assuma que a presença de uma integração do Lovable implica integração com Supabase ou Netlify. Confira `vite.config.ts` antes de configurar adaptadores, pois o plugin do Lovable já registra os componentes essenciais de build.

Editor do Lovable: https://lovable.dev/projects/966fdf30-2333-417f-b6bd-7796d44c8822
Repositório: https://github.com/giuliacarv/tolisoapp

## Próxima entrega funcional

1. Verificar build, tipagem, lint e testes em ambiente Bun.
2. Definir hospedagem operacional para SSR do TanStack Start.
3. Escolher fonte autorizada de produtos e cupons reais.
4. Conectar banco e persistência dos catálogos (sem inventar preços).
5. Só então ativar contas, saldo transacional, resgates e monetização.

## Catálogo PostgreSQL (implantação em preparação)

O banco foi provisionado no projeto Lovable e validado por consultas SQL. Veja `db/schema.sql`, `db/seed-reference.sql` e `db/README.md`.

O frontend dispõe de uma camada REST em `src/services/live-catalog-source.ts`. Quando receber `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (ou chave pública legada `VITE_SUPABASE_ANON_KEY`) do **mesmo backend**, passa a usar o catálogo publicado. Antes disso, os mocks permanecem apenas como demonstração.

**Pendente:** confirmar a disponibilização dessas variáveis pelo Lovable Cloud e testar a requisição real. O backend Lovable Cloud não equivale ao Supabase da conta independente e pode exigir migração se hospedarmos o frontend na Netlify. Nunca definir `VITE_*` com chave secreta/service role.

**Não publicar a branch sem** validação dos testes/build, configuração de conexão, primeiro registro real conferido e revisão das telas de créditos e resgate.
