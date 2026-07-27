import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

/**
 * Resolve o executável do Chromium.
 *
 * Em ambientes de CI/sandbox onde o download padrão do Playwright não está
 * disponível, permitimos apontar para um binário já instalado através de
 * `PW_CHROMIUM_PATH`. Caso nenhum caminho seja encontrado, deixamos `undefined`
 * para que o Playwright use sua resolução padrão.
 */
function resolveChromiumPath(): string | undefined {
  const candidates = [
    process.env.PW_CHROMIUM_PATH,
    "/chromium-1194/chrome-linux/chrome",
  ].filter((value): value is string => Boolean(value));

  return candidates.find((candidate) => existsSync(candidate));
}

const BASE_URL = process.env.PW_BASE_URL ?? "http://localhost:8080";
const chromiumPath = resolveChromiumPath();

export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__screenshots__",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  timeout: 90_000,
  expect: {
    timeout: 30_000,
    toHaveScreenshot: {
      timeout: 30_000,
      // Tolerância mínima para variações de antialiasing entre execuções.
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  use: {
    baseURL: BASE_URL,
    ...devices["Desktop Chrome"],
    deviceScaleFactor: 1,
    launchOptions: chromiumPath ? { executablePath: chromiumPath } : undefined,
  },
  webServer: {
    command: "bun run dev",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
});
