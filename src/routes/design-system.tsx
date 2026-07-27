import { createFileRoute } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Sparkles } from "lucide-react";

const SITE_URL = "https://descontai1.lovable.app";
const TITLE = "Design System Vivid | DESCONTAI";
const DESCRIPTION =
  "Referência viva do design system Vivid do DESCONTAI: cores, tipografia, superfícies e componentes.";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/design-system` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: DesignSystemPage,
});

interface SwatchProps {
  name: string;
  token: string;
  className: string;
  /** Texto de apoio explicando quando usar a cor. */
  usage: string;
}

const SWATCHES: readonly SwatchProps[] = [
  { name: "Ação", token: "--primary", className: "bg-primary", usage: "CTAs, selos de oferta" },
  { name: "Tinta", token: "--foreground", className: "bg-foreground", usage: "Títulos e texto" },
  { name: "Creme", token: "--background", className: "bg-background", usage: "Fundo das páginas" },
  { name: "Cartão", token: "--card", className: "bg-card", usage: "Superfícies elevadas" },
  { name: "Economia", token: "--saving", className: "bg-saving", usage: "Ganhos e validações" },
  { name: "Apoio", token: "--muted", className: "bg-muted", usage: "Blocos internos" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-fluid-h3">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/**
 * Página de referência do design system "Vivid".
 * Não indexável: serve como documentação visual interna.
 */
function DesignSystemPage() {
  return (
    <div className="theme-vivid min-h-dvh bg-background">
      <div className="mx-auto w-full max-w-5xl px-[var(--gutter)] py-16">
        <span className="chip-vivid text-primary">
          <Sparkles className="size-4" strokeWidth={1.75} aria-hidden />
          Design system
        </span>
        <h1 className="mt-5 text-fluid-h1">Vivid</h1>
        <p className="mt-4 max-w-prose text-fluid-base text-muted-foreground">
          Laranja saturado sobre creme, tinta azul-marinho, cartões brancos de raio generoso e
          pílulas. Aplique a classe <code className="rounded bg-muted px-1.5 py-0.5">theme-vivid</code>{" "}
          no wrapper da página para ativar todos os tokens.
        </p>

        <Section title="Cores">
          <ul className="grid-fluid grid gap-4 [--col-min:12rem]">
            {SWATCHES.map((swatch) => (
              <li key={swatch.token} className="surface-vivid overflow-hidden">
                <div className={`h-20 w-full ${swatch.className}`} />
                <div className="p-4">
                  <p className="font-semibold">{swatch.name}</p>
                  <p className="text-fluid-xs text-muted-foreground">{swatch.token}</p>
                  <p className="mt-1 text-fluid-xs text-muted-foreground">{swatch.usage}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Tipografia">
          <div className="surface-vivid p-6">
            <p className="text-fluid-h1">Great Products.</p>
            <p className="text-fluid-h2 text-primary">Even Cheaper Price.</p>
            <p className="mt-4 max-w-prose text-fluid-base text-muted-foreground">
              Poppins em pesos 600–800 para títulos com <code>letter-spacing -0.02em</code>; corpo em
              peso 400–500 com altura de linha entre 1.4 e 1.6.
            </p>
          </div>
        </Section>

        <Section title="Ações">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="pill-solid">
              <ShoppingBag className="size-4" strokeWidth={2} aria-hidden />
              Resgatar desconto
            </button>
            <button type="button" className="pill-ink">
              Entrar
            </button>
            <button type="button" className="chip-vivid">
              <Search className="size-4" strokeWidth={1.75} aria-hidden />
              Buscar
            </button>
            <button type="button" className="chip-vivid bg-primary text-primary-foreground">
              Gadgets
            </button>
            <button type="button" className="chip-vivid">
              <Heart className="size-4" strokeWidth={1.75} aria-hidden />
              Favoritar
            </button>
          </div>
        </Section>

        <Section title="Superfícies">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="surface-vivid p-6">
              <p className="text-fluid-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Cartão
              </p>
              <p className="mt-2 text-fluid-h3">Sombra difusa</p>
              <p className="mt-2 text-fluid-sm text-muted-foreground">
                Raio de 1.75rem, fundo branco puro e elevação suave.
              </p>
            </article>
            <article className="noir-band rounded-[1.75rem] p-6">
              <p className="text-fluid-xs font-semibold uppercase tracking-[0.18em] opacity-80">
                Faixa de destaque
              </p>
              <p className="mt-2 text-fluid-h3">Gradiente de ação</p>
              <p className="mt-2 text-fluid-sm opacity-85">
                Usada em banners e blocos de campanha, sempre com texto claro.
              </p>
            </article>
          </div>
        </Section>
      </div>
    </div>
  );
}
