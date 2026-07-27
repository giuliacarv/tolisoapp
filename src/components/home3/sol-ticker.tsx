import { useResource } from "@/hooks/use-async-resource";
import { storeQueries } from "@/services";

/**
 * Faixa laranja com marquee de lojas parceiras.
 * Substitui o carrossel discreto da home atual por um bloco de alto contraste,
 * como na referência "Maile".
 */
export function SolTicker() {
  const stores = useResource(storeQueries.list({ activeOnly: true }));
  const items = stores.data ?? [];

  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <section aria-label="Lojas e marketplaces" className="sol-band overflow-hidden py-5">
      <div className="group flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul
          className="marquee-track flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${loop.length * 3}s` }}
        >
          {loop.map((store, index) => (
            <li
              key={`${store.id}-${index}`}
              aria-hidden={index >= items.length}
              className="flex shrink-0 items-center gap-3"
            >
              {/* Marca-texto: o SVG monocromático não sobrevive à inversão. */}
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden />
              <span className="text-base font-extrabold uppercase tracking-[0.18em] text-white">
                {store.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
