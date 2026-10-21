import { expect, test } from "@playwright/test";

import { gotoStable, volatileRegions } from "./utils/stabilize";

/**
 * Regressão responsiva nos extremos suportados: 280px (menor largura real de
 * navegador em dobráveis/relógios) e 1920px (desktop full HD).
 *
 * Por que existir: quebras de layout raramente aparecem nos breakpoints
 * "confortáveis" (390/1280). Elas surgem quando o conteúdo não tem espaço para
 * encolher (falta de `min-w-0`, larguras fixas, `clamp()` mal calibrado) ou
 * quando um container estica demais. O sintoma mais objetivo dos dois casos é
 * o overflow horizontal — mensurável sem depender de pixels.
 *
 * Este arquivo roda apenas nos projetos `xs-280` e `wide-1920`
 * (ver `playwright.config.ts`), evitando duplicação com a suíte principal.
 */

/** Rotas com maior densidade de layout — onde overflow costuma nascer. */
const ROUTES = ["/", "/ofertas", "/cupons", "/como-funciona"] as const;

/** Folga em px para absorver arredondamento sub-pixel do próprio navegador. */
const OVERFLOW_TOLERANCE = 1;

/**
 * Lista os elementos que ultrapassam a largura da viewport.
 *
 * Retorna um diagnóstico legível (tag, classes e largura) em vez de um simples
 * booleano: quando o teste falha, a mensagem já aponta o culpado.
 */
async function findOverflowingElements(page: import("@playwright/test").Page) {
  return page.evaluate((tolerance) => {
    const limit = document.documentElement.clientWidth + tolerance;
    const offenders: Array<{ tag: string; className: string; right: number; width: number }> = [];

    for (const element of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
      const style = getComputedStyle(element);
      // Elementos invisíveis ou intencionalmente fora de tela (marquees
      // clonados, decorações posicionadas) não causam barra de rolagem.
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (style.position === "fixed") continue;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right <= limit) continue;

      offenders.push({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });
    }

    // Apenas os primeiros: a causa raiz costuma ser o ancestral mais externo.
    return offenders.slice(0, 8);
  }, OVERFLOW_TOLERANCE);
}

test.describe("regressão responsiva nos extremos", () => {
  for (const route of ROUTES) {
    test(`${route} não gera rolagem horizontal`, async ({ page }) => {
      await gotoStable(page, route);

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      const offenders = await findOverflowingElements(page);

      expect(
        metrics.scrollWidth,
        `Overflow horizontal em ${route}. Elementos suspeitos: ${JSON.stringify(offenders, null, 2)}`,
      ).toBeLessThanOrEqual(metrics.clientWidth + OVERFLOW_TOLERANCE);
    });
  }

  test("home permanece visualmente estável no extremo", async ({ page }, testInfo) => {
    await gotoStable(page, "/");

    await expect(page).toHaveScreenshot(`home-${testInfo.project.name}.png`, {
      fullPage: true,
      mask: volatileRegions(page),
    });
  });
});
