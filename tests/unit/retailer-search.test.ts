import { describe, expect, it } from "vitest";
import { getRetailerSearchLinks } from "@/lib/retailer-search";

describe("Pesquisa externa de produtos", () => {
  it("não sugere busca sem termo", () => {
    expect(getRetailerSearchLinks("   ")).toEqual([]);
  });
  it("codifica termos e não permite injeção de destinos", () => {
    const links = getRetailerSearchLinks("  fone bluetooth & ANC ");
    expect(links).toHaveLength(2);
    expect(links[0].url).toBe("https://www.amazon.com.br/s?k=fone%20bluetooth%20%26%20ANC");
    expect(links[1].url).toBe("https://lista.mercadolivre.com.br/fone%20bluetooth%20%26%20ANC");
  });
});
