import { expect, test } from "@playwright/test";

import { gotoStable, volatileRegions } from "./utils/stabilize";

/**
 * Regressão visual da documentação do design system.
 *
 * Objetivo: qualquer alteração em tokens (cores, tipografia, sombras, raios)
 * altera esta página primeiro — ela funciona como sentinela do tema.
 */
test.describe("/design-system", () => {
  test("página completa permanece visualmente estável", async ({ page }, testInfo) => {
    await gotoStable(page, "/design-system");

    await expect(page).toHaveScreenshot(`design-system-${testInfo.project.name}.png`, {
      fullPage: true,
      mask: volatileRegions(page),
    });
  });
});
