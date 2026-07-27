import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleAnchorClick } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

import { Container } from "./primitives";

const COMPANY = {
  name: "EconomizAI",
  slogan: "Inteligência Artificial pra Economizar de Verdade!",
  address: "Av. Paulista, 1000, Sala 1201 — Bela Vista, São Paulo/SP, 01310-100",
  email: "contato@economizai.com.br",
  phone: "+55 11 3000-0000",
} as const;

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/economizai" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/economizai" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/economizai" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/economizai" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@economizai" },
] as const;

const NAV_GROUPS = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre nós", message: "A página institucional será publicada em breve." },
      { label: "Serviços", message: "A página institucional será publicada em breve." },
      { label: "Carreira", message: "A página institucional será publicada em breve." },
      { label: "Imprensa", message: "A página institucional será publicada em breve." },
    ],
  },
  {
    title: "Navegar",
    links: [
      { label: "Ofertas", to: "/ofertas" },
      { label: "Cupons", to: "/cupons" },
      { label: "Categorias", href: "#categorias" },
      { label: "Como funciona", to: "/como-funciona" },
      { label: "Créditos", to: "/creditos" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", to: "/ajuda" },
      { label: "Contato", to: "/contato" },
      { label: "Favoritos", to: "/favoritos" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", to: "/termos" },
      { label: "Privacidade", to: "/privacidade" },
      { label: "Cookies", to: "/cookies" },
      { label: "Divulgação de afiliados", to: "/afiliados" },
    ],
  },
] as const;

const SOON_MESSAGE = "Esta página será publicada em uma próxima etapa.";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function InstitutionalFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setStatus("error");
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("success");
    toast.success("Obrigado por se inscrever! Você receberá nossas ofertas em breve.");
    setEmail("");
  }

  return (
    <footer
      className="dark relative overflow-hidden rounded-t-3xl border-t border-border bg-background text-foreground"
      aria-labelledby="footer-heading"
    >
      {/* Orbe de luz sutil — cor violeta, deslocado para o canto superior direito. */}
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-violet/10 blur-[120px]"
        aria-hidden="true"
      />

      <h2 id="footer-heading" className="sr-only">
        Rodapé institucional
      </h2>

      <Container className="relative py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna 1: Marca e contato */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-amber text-primary-foreground">
                <span className="text-xl font-extrabold tracking-tight">E</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-2xl font-extrabold tracking-tight text-foreground">
                  {COMPANY.name}
                </p>
                <p className="text-fluid-xs text-muted-foreground">{COMPANY.slogan}</p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A primeira plataforma brasileira que usa inteligência artificial para encontrar,
              validar e entregar ofertas reais com o menor preço possível.
            </p>

            <address className="mt-8 not-italic">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3 py-1.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-secondary/50">
                    <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 leading-relaxed">{COMPANY.address}</span>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="group flex min-h-11 items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-secondary/50 transition-colors group-hover:border-gold/50">
                      <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 break-words underline-offset-4 group-hover:underline">
                      {COMPANY.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                    className="group flex min-h-11 items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-secondary/50 transition-colors group-hover:border-gold/50">
                      <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 underline-offset-4 group-hover:underline">
                      {COMPANY.phone}
                    </span>
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Coluna 2: Navegação em grid 2x2 / 4 colunas */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5 lg:gap-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link
                          to={link.to}
                          className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : "href" in link ? (
                        <a
                          href={link.href}
                          onClick={(event) => handleAnchorClick(event, link.href)}
                          className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toast(link.message ?? SOON_MESSAGE)}
                          className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Coluna 3: Newsletter */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-gradient-to-b from-secondary/30 to-secondary/10 p-6 backdrop-blur-sm">
              <h3 className="font-serif text-lg italic leading-tight text-foreground">
                Receba as melhores ofertas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Cupons e promoções selecionadas pela IA, direto no seu e-mail. Sem spam.
              </p>

              <form onSubmit={handleSubscribe} className="mt-5 space-y-3" noValidate>
                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    E-mail para newsletter
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "email-error" : undefined}
                    className={cn(
                      "h-12 rounded-xl border-border bg-background/60 pr-20 text-foreground placeholder:text-muted-foreground focus-visible:ring-gold",
                      status === "error" && "border-destructive focus-visible:ring-destructive",
                    )}
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 h-10 rounded-lg bg-gradient-to-r from-violet to-violet-soft px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
                  >
                    OK
                  </Button>
                </div>
                {status === "error" ? (
                  <p id="email-error" className="text-xs text-destructive">
                    Insira um e-mail válido.
                  </p>
                ) : null}
              </form>

              {status === "success" ? (
                <p className="mt-3 text-sm font-medium text-saving" aria-live="polite">
                  Obrigado por se inscrever!
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Barra inferior: redes sociais e direitos */}
        <div className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Redes sociais">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} de ${COMPANY.name} (abre em nova aba)`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-secondary/30 text-muted-foreground transition-all duration-200 hover:border-gold/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="text-center text-xs leading-relaxed text-muted-foreground md:text-right">
              <p>© {year} {COMPANY.name}. Todos os direitos reservados.</p>
              <p className="mt-1 max-w-md">
                Os preços e condições são de responsabilidade das lojas parceiras. Links de
                afiliado podem gerar comissão, sem custo adicional para você.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
