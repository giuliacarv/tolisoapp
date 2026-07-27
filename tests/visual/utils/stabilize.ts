import type { Locator, Page } from "@playwright/test";

/**
 * CSS injetado antes da captura para tornar as screenshots determinísticas.
 *
 * Motivo: a home usa marquees infinitos (LogoCarousel/AutoCarousel), animações
 * de entrada (Reveal) e transições em hover. Sem congelar esses elementos, cada
 * execução produziria pixels diferentes e o teste seria instável (flaky).
 */
const DETERMINISTIC_CSS = `
  *, *::before, *::after {
    animation-play-state: paused !important;
    animation-delay: -0.0001s !important;
    animation-duration: 0.0001s !important;
    transition-duration: 0.0001s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }
  /* Marquees: fixa a posição inicial do trilho. */
  [data-marquee], .animate-marquee, .marquee-track {
    transform: none !important;
  }
  /* Reveal: garante estado final visível, independente do IntersectionObserver. */
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }
`;

/** Elementos voláteis que não devem influenciar a comparação de pixels. */
export function volatileRegions(page: Page): Locator[] {
  return [
    // Ano corrente no rodapé e qualquer conteúdo dependente de data/hora.
    page.locator("[data-visual-mask]"),
  ];
}

/**
 * Navega até a rota e estabiliza a página para captura visual.
 */
export async function gotoStable(page: Page, path: string): Promise<void> {
  await page.emulateMedia({ reducedMotion: "reduce" });

  // Pré-decide o consentimento de cookies: o banner é fixo no rodapé, cobre
  // conteúdo e intercepta cliques, tornando as capturas não determinísticas.
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "economizai_cookie_consent",
      JSON.stringify({
        essential: true,
        preferences: true,
        analytics: false,
        marketing: false,
        version: 1,
        decidedAt: "2026-01-01T00:00:00.000Z",
      }),
    );
  });

  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: DETERMINISTIC_CSS });

  // Rola a página inteira para disparar lazy loading e observers de entrada,
  // depois volta ao topo para uma captura consistente.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    window.scrollTo(0, 0);
  });

  // Aguarda imagens decodificadas para evitar espaços em branco na captura.
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    );
  });

  await page.waitForLoadState("networkidle").catch(() => {
    // networkidle pode não ocorrer com HMR ativo; seguimos com o estado atual.
  });
  // Congela qualquer animação ainda ativa via Web Animations API. O CSS acima
  // cobre a maioria dos casos, mas marquees recriados após hidratação podem
  // reiniciar e impedir a estabilização da captura.
  await page.evaluate(() => {
    document.getAnimations().forEach((animation) => {
      animation.currentTime = 0;
      animation.pause();
    });
  });

  await page.waitForTimeout(500);
}
