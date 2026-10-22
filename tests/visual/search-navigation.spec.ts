import { expect, test } from "@playwright/test";

test("busca na home exibe links para consulta nas lojas", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Buscar ofertas" }).fill("fone bluetooth");
  await page.getByRole("button", { name: "Buscar", exact: true }).click();

  const offers = page.locator("#sol-ofertas");
  await expect(offers).toBeFocused();
  const amazon = offers.getByRole("link", { name: "Buscar na Amazon" });
  await expect(amazon).toHaveAttribute("href", /amazon\.com\.br\/s\?k=fone%20bluetooth/);
  await expect(amazon).toHaveAttribute("target", "_blank");
  await expect(offers.getByRole("link", { name: "Buscar no Mercado Livre" })).toBeVisible();
});

test("detalhes de produto fictício permitem pesquisar preços reais", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Ver detalhes de/ }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("link", { name: "Pesquisar na Amazon" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Pesquisar na Mercado Livre" })).toBeVisible();
});
