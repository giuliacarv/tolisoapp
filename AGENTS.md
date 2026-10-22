<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# EconomizAI | Regras para agentes de desenvolvimento

## Objetivo
Entregar jornadas comerciais verificáveis, sem apresentar mocks como ofertas, promoções ou créditos reais. Antes de editar, ler o README e o módulo afetado.

## Stack e execução
React 19, TypeScript, TanStack Start/Router/Query, Vite, Tailwind 4; gerenciador Bun (`bun.lock`). Configuração gerenciada por `@lovable.dev/vite-tanstack-config`; NÃO duplicar plugins de Vite/SSR.

## Camadas e limites
- `src/domain/`: regras puras, sem dependência React ou mocks.
- `src/services/`: fronteira de acesso a dados. Atualmente consome `src/data/mock*`.
- `src/hooks/`: orquestração; `src/components/`: apresentação; `src/routes/`: páginas.
- `src/config/business-rules.ts`: fonte única das regras de apresentação dos créditos.
- `/` renderiza `Homepage3View` (tema Solaris); não misturar temas alternativos.
- Manter o contrato tipado dos serviços para futura integração de banco.
- Não converter URLs de placeholder em links afiliados arbitrários ou renovar datas expiradas sem verificação da fonte.
- Não anunciar autenticação, resgate, validação de cupom, comparação de preços ou IA como operacionais se não forem.
- Não implementar débito de créditos, pagamentos ou sessão real no frontend isoladamente.

## Git e validação
Desenvolver correções significativas em branches e PRs. Preservar blocos Lovable no AGENTS.md e não reescrever histórico publicado. Não atualizar snapshots para esconder regressões.

Ao concluir uma alteração, conforme o ambiente permitir:
```sh
bunx tsc --noEmit
bun run lint
bunx vitest run
bun run build
bun run test:visual
```
Relatar o que foi executado, passou, falhou e não pôde ser testado. Conferir links, estados expirados, ausência de dados e responsividade quando tocar em UI.

## Prioridade atual
(1) Build e navegação estáveis; (2) fonte real de produtos/cupons com validade comprovada; (3) persistência e atualização; (4) contas/créditos somente quando justificáveis.
