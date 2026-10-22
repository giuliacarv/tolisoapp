/** Pesquisa externa nas vitrines públicas. Não é integração de afiliados nem compara preços. */
export function getRetailerSearchLinks(rawTerm: string): { name: string; url: string }[] {
  const term = rawTerm.trim();
  if (!term) return [];
  const encoded = encodeURIComponent(term);
  return [
    { name: "Amazon", url: `https://www.amazon.com.br/s?k=${encoded}` },
    { name: "Mercado Livre", url: `https://lista.mercadolivre.com.br/${encoded}` },
  ];
}
