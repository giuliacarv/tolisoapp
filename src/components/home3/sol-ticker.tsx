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
            <li key={`${store.id}-${index}`} className="flex shrink-0 items-center gap-3">
              <img
                src={store.logoSrc}
                alt={index < items.length ? store.logoAlt : ""}
                aria-hidden={index >= items.length}
                loading="lazy"
                decoding="async"
                className="h-6 w-auto brightness-0 invert"
              />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                {store.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
