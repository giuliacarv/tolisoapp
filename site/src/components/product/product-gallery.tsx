import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  /** Imagem principal (sempre a primeira exibida). */
  image: string;
  /** Imagens adicionais; miniaturas só aparecem com 2 ou mais itens. */
  gallery?: string[];
  name: string;
  discountPercentage: number;
}

/**
 * Galeria da oferta: imagem principal em proporção fixa (evita CLS) e
 * miniaturas navegáveis por teclado quando existirem.
 */
export function ProductGallery({ image, gallery, name, discountPercentage }: ProductGalleryProps) {
  // Deduplica preservando a ordem: a imagem principal sempre lidera.
  const images = Array.from(new Set([image, ...(gallery ?? [])]));
  const [activeIndex, setActiveIndex] = useState(0);

  // Ao navegar entre produtos o componente é reutilizado: volta à primeira foto.
  useEffect(() => {
    setActiveIndex(0);
  }, [image]);

  const active = images[activeIndex] ?? image;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-border bg-secondary">
        {/* LCP da página de detalhe: carrega com prioridade alta e dimensões
            intrínsecas declaradas, para o container reservar altura antes do
            byte da imagem chegar (CLS = 0). O `sizes` informa ao navegador que
            a arte ocupa a viewport inteira no mobile e ~55% dela no desktop. */}
        <img
          src={active}
          alt={`Foto ilustrativa: ${name}`}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 55vw, 100vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />

        {discountPercentage > 0 ? (
          <span className="absolute left-4 top-4 rounded-lg bg-discount px-2.5 py-1 text-xs font-bold text-offwhite">
            -{discountPercentage}%
          </span>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="flex flex-wrap gap-3" aria-label="Miniaturas do produto">
          {images.map((src, index) => (
            <li key={`${src}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagem ${index + 1} de ${images.length}`}
                aria-pressed={index === activeIndex}
                className={cn(
                  "size-20 overflow-hidden rounded-xl border bg-secondary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  index === activeIndex
                    ? "border-gold"
                    : "border-border hover:border-gold/40",
                )}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
