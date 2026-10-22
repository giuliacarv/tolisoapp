# Catálogo persistente do EconomizAI

Banco criado no projeto Lovable `966fdf30-2333-417f-b6bd-7796d44c8822` em 22/10/2026, gerenciado pelo **Lovable Cloud**. A conta Supabase independente conectada ao ChatGPT não contém esse projeto. Este diretório é um espelho de portabilidade para futuras migrações, não a prova de um deploy bem-sucedido.

## Estado verificado
- Tabelas `stores`, `categories`, `products` e `coupons` criadas.
- RLS de leitura pública: somente lojas/categorias ativas, produtos publicados e disponíveis e cupons publicados, dentro da validade e revisados nos últimos 7 dias.
- Referências: 2 lojas e 6 categorias.
- Ofertas reais e cupons publicados: **zero**.
- Não existe rotina de coleta automática nem código de resgate no banco público.

## Integração do frontend
`src/services/live-catalog-source.ts` usa REST (PostgREST) com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (ou `VITE_SUPABASE_ANON_KEY` legada), **somente quando o ambiente de build as disponibilizar**. Sem configuração, os serviços usam os mocks e mostram a interface demonstrativa. Com configuração, devolvem apenas os registros públicos: lista vazia é lista vazia, nunca substituída silenciosamente por mocks.

Chaves secretas/service role nunca podem aparecer com prefixo `VITE_`.

**Pendente:** confirmar como o Lovable Cloud disponibiliza as credenciais públicas no aplicativo, validar consulta REST em preview e execução de produção. Não assumir que Netlify possui acesso automático ao banco gerenciado do Lovable.

## Inserção editorial de oferta (exemplo de processo, sem inventar valores)
1. Abrir a página do produto na loja e conferir título, imagem, preço, preço anterior e disponibilidade.
2. Registrar URL da fonte, URL de destino real, data de validade e horário da verificação.
3. Inserir em `public.products` com `status='draft'`.
4. Conferir novamente a oferta; somente então atualizar `verified_at=now()`, `published_at=now()` e `status='published'`.
5. O próprio RLS retira a oferta da vitrine após a data final ou 7 dias sem nova verificação; é necessária revalidação humana ou integração oficial para voltar a publicá-la.

Não cadastrar produtos fictícios como publicados. Não colocar códigos completos de cupons na tabela pública. A cobrança de créditos e resgate de códigos dependem de backend autenticado e transacional.

## Arquivos
- `schema.sql`: DDL portável / políticas de catálogo; espelho do modelo criado (a restrição de compra mínima foi escrita com parênteses equivalentes à expressão instalada).
- `seed-reference.sql`: dados neutros de referência, sem ofertas fictícias.
