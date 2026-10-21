import { describe, expect, it } from "vitest";

import { HOW_IT_WORKS_STEPS } from "@/data/how-it-works";

describe("HOW_IT_WORKS_STEPS", () => {
  it("expõe exatamente três etapas", () => {
    expect(HOW_IT_WORKS_STEPS).toHaveLength(3);
  });

  it("usa identificadores únicos e estáveis", () => {
    const ids = HOW_IT_WORKS_STEPS.map((step) => step.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preenche conteúdo textual obrigatório em todas as etapas", () => {
    for (const step of HOW_IT_WORKS_STEPS) {
      expect(step.title.trim().length).toBeGreaterThan(0);
      expect(step.description.trim().length).toBeGreaterThan(0);
      expect(step.highlight.trim().length).toBeGreaterThan(0);
      expect(typeof step.icon).not.toBe("undefined");
    }
  });
});
