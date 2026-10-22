import { ArrowUpRight } from "lucide-react";
import { getRetailerSearchLinks } from "@/lib/retailer-search";

/** Saída funcional para a loja sem fingir que os dados demonstrativos são ofertas em vigor. */
export function RetailerSearchLinks({ term }: { term: string }) {
  const links = getRetailerSearchLinks(term);
  if (!links.length) return null;

  return (
    <section aria-label="Pesquisar em lojas" className="sol-card mt-6 p-5">
      <h3 className="text-base font-extrabold text-foreground">Pesquisar produtos nas lojas</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Os resultados abaixo abrem a busca na loja. Confira preço, disponibilidade e condições antes de comprar.
        Não são ofertas verificadas pelo EconomizAI nem links de afiliados.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map(({ name, url }) => (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer"
            className="sol-pill-ghost inline-flex items-center gap-2 text-sm">
            Buscar na {name} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>
    </section>
  );
}
