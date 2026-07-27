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

const INSTITUTIONAL_LINKS = [
  { label: "Sobre nós", message: "A página institucional será publicada em breve." },
  { label: "Serviços", message: "A página institucional será publicada em breve." },
  { label: "Carreira", message: "A página institucional será publicada em breve." },
  { label: "Imprensa", message: "A página institucional será publicada em breve." },
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
      className="border-t border-border bg-card"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Rodapé institucional
      </h2>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Coluna 1: Informações de contato */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-offwhite">
                <span className="text-lg font-extrabold tracking-tight">E</span>
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold tracking-tight text-foreground">
                  {COMPANY.name}
                </p>
                <p className="text-fluid-micro text-muted-foreground">{COMPANY.slogan}</p>
              </div>
            </div>

            <address className="mt-6 not-italic">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <span className="leading-relaxed">{COMPANY.address}</span>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="group flex items-center gap-3 transition-colors hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                    <span className="underline-offset-4 group-hover:underline">{COMPANY.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                    className="group flex items-center gap-3 transition-colors hover:text-foreground"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                    <span className="underline-offset-4 group-hover:underline">{COMPANY.phone}</span>
                  </a>
                </li>
              </ul>
            </address>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Redes sociais">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} de ${COMPANY.name} (abre em nova aba)`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-all duration-200 hover:border-gold/50 hover:text-gold hover:bg-secondary"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Links rápidos e navegação */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground md:text-fluid-xs">
                Institucional
              </h3>
              <ul className="mt-2 space-y-0.5">
                {INSTITUTIONAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => toast(link.message ?? SOON_MESSAGE)}
                      className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground md:text-fluid-xs">
                  {group.title}
                </h3>
                <ul className="mt-2 space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link
                          to={link.to}
                          className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(event) => handleAnchorClick(event, link.href)}
                          className="inline-flex min-h-11 w-full items-center text-left text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Coluna 3: Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground md:text-fluid-xs">
              Mantenha-se Atualizado
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Receba as melhores ofertas e cupons selecionados diretamente no seu e-mail. Nada de spam.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 space-y-3" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="newsletter-email" className="sr-only">
                  E-mail para newsletter
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "email-error" : undefined}
                  className={cn(
                    "h-11 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-gold",
                    status === "error" && "border-destructive focus-visible:ring-destructive",
                  )}
                />
                {status === "error" ? (
                  <p id="email-error" className="text-xs text-destructive">
                    Insira um e-mail válido.
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                Assinar
              </Button>
            </form>

            {status === "success" ? (
              <p className="mt-3 text-sm font-medium text-saving" aria-live="polite">
                Obrigado por se inscrever!
              </p>
            ) : null}
          </div>
        </div>

        {/* Barra de direitos autorais */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            © {year} {COMPANY.name}. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
            Os preços e condições são de responsabilidade das lojas parceiras. Links de afiliado podem gerar comissão, sem custo adicional para você.
          </p>
        </div>
      </Container>
    </footer>
  );
}
