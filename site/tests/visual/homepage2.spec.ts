import { expect, test } from "@playwright/test";

import { gotoStable, volatileRegions } from "./utils/stabilize";

/**
 * Regressão visual da home de rascunho (tema escopado "Obsidian").
 *
 * A página controla o próprio tema localmente (claro por padrão), então
 * cobrimos os dois modos: claro (roxo/laranja/branco) e escuro (obsidiana +
 * violeta). Também capturamos seções críticas isoladamente para que uma
 * quebra pontual gere um diff legível em vez de um diff de página inteira.
 */
test.describe("/homepage2", () => {
  test("tema claro permanece visualmente estável", async ({ page }, testInfo) => {
    await gotoStable(page, "/homepage2");

    await expect(page).toHaveScreenshot(`homepage2-light-${testInfo.project.name}.png`, {
      fullPage: true,
      mask: volatileRegions(page),
    });
  });

  test("tema escuro permanece visualmente estável", async ({ page }, testInfo) => {
    await gotoStable(page, "/homepage2");

    // O toggle é o único controle que alterna o tema escopado desta rota.
    await page.getByRole("button", { name: "Ativar modo escuro" }).click();
    await expect(page.getByRole("button", { name: "Ativar modo claro" })).toBeVisible();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot(`homepage2-dark-${testInfo.project.name}.png`, {
      fullPage: true,
      mask: volatileRegions(page),
    });
  });

  test("hero e cabeçalho permanecem visualmente estáveis", async ({ page }, testInfo) => {
    await gotoStable(page, "/homepage2");

    await expect(page.locator("header").first()).toHaveScreenshot(
      `homepage2-header-${testInfo.project.name}.png`,
    );
    await expect(page.locator("main > section").first()).toHaveScreenshot(
      `homepage2-hero-${testInfo.project.name}.png`,
      { mask: volatileRegions(page) },
    );
  });
});
