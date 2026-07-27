/**
 * Formatação localizada (pt-BR).
 * Isolado de dados e de regras de negócio: qualquer camada pode importar.
 */

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

/** 39.9 → "R$ 39,90" */
export function formatBRL(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return brlFormatter.format(value);
}

/** "2026-08-31T23:59:59-03:00" → "31/08/2026" */
export function formatDateBR(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "Data indisponível";
  return dateFormatter.format(parsed);
}

/** Pluralização de créditos: "1 crédito" / "3 créditos". */
export function formatCreditsLabel(credits: number): string {
  return `${credits} ${credits === 1 ? "crédito" : "créditos"}`;
}
