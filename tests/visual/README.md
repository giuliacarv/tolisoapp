# Testes de regressão visual

Garantem que `/design-system` e `/homepage2` permaneçam visualmente
consistentes após mudanças em tokens, componentes ou estilos globais.

## Como rodar

```bash
bun run test:visual          # compara com os baselines versionados
bun run test:visual:update   # regenera baselines (após mudança intencional)
bun run test:visual:report   # abre o relatório HTML com os diffs
```

O runner reutiliza o servidor de desenvolvimento em `http://localhost:8080`
(inicia um automaticamente se não houver). Para apontar para outra URL:
`PW_BASE_URL=https://... bun run test:visual`.

## Cobertura

| Cenário | Rota | Viewports |
| --- | --- | --- |
| Documentação de tokens (página inteira) | `/design-system` | 1280×900 e 390×844 |
| Tema claro (roxo/laranja/branco) | `/homepage2` | 1280×900 e 390×844 |
| Tema escuro (Obsidian) | `/homepage2` | 1280×900 e 390×844 |
| Header e hero isolados | `/homepage2` | 1280×900 e 390×844 |

As capturas de seções isoladas existem para que uma quebra pontual gere um
diff legível, em vez de um diff de página inteira difícil de interpretar.

## Determinismo

`tests/visual/utils/stabilize.ts` neutraliza as fontes conhecidas de
instabilidade antes de cada captura:

- pausa animações CSS e a Web Animations API (marquees, `Reveal`, transições);
- pré-registra o consentimento de cookies para o banner não cobrir o conteúdo;
- rola a página inteira para disparar lazy loading e volta ao topo;
- aguarda decodificação das imagens e das fontes.

Tolerância configurada: `maxDiffPixelRatio: 0.01` (absorve antialiasing).

## Quando um teste falhar

1. Abra o relatório e compare `expected` × `actual` × `diff`.
2. Mudança **não intencional** → corrija o código.
3. Mudança **intencional** → rode `bun run test:visual:update` e versione os
   novos PNGs junto com o commit da mudança visual.

## Nota sobre o binário do Chromium

Em ambientes onde o download padrão do Playwright não está disponível, defina
`PW_CHROMIUM_PATH` com o caminho do executável do Chromium; o
`playwright.config.ts` faz o fallback automaticamente.
