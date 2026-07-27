import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LifeBuoy, Send, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Container, SectionHeading, buttonOutline, buttonSolid } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useComingSoon } from "@/hooks/use-coming-soon";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

/** Categorias de atendimento oferecidas no formulário. */
const CONTACT_CATEGORIES = [
  "Dúvida",
  "Problema com oferta",
  "Problema com cupom",
  "Créditos",
  "Privacidade",
  "Parceria",
  "Outro",
] as const;

/**
 * Validação completa no frontend. O mesmo schema poderá ser reutilizado pelo
 * serviço de atendimento quando a integração existir.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome (mínimo de 2 caracteres)." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Informe seu e-mail." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
  subject: z
    .string()
    .trim()
    .min(3, { message: "Descreva o assunto em pelo menos 3 caracteres." })
    .max(120, { message: "O assunto deve ter no máximo 120 caracteres." }),
  category: z.enum(CONTACT_CATEGORIES, {
    errorMap: () => ({ message: "Selecione uma categoria." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, { message: "Detalhe sua mensagem em pelo menos 20 caracteres." })
    .max(1000, { message: "A mensagem deve ter no máximo 1000 caracteres." }),
});

type ContactValues = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/contato")({
  head: () => {
    const title = "Contato | EconomizAI";
    const description =
      "Fale com o EconomizAI sobre ofertas, cupons, créditos, privacidade ou parcerias.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/contato` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/contato` }],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const messageLength = form.watch("message")?.length ?? 0;

  /**
   * Ponto único de integração futura. Nada é enviado, armazenado ou processado:
   * apenas confirmamos que o formulário está válido.
   */
  function onSubmit(_values: ContactValues) {
    notifyComingSoon();
  }

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="pt-[var(--header-h)]">
        <section className="noir-band">
          <span
            aria-hidden
            className="halo-gradient pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-[160%] opacity-40"
          />
          <Container className="py-16 sm:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-fluid-micro font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" aria-hidden />
                Contato
              </span>
              <h1 className="mt-4 font-serif text-fluid-h1 leading-[1.05] tracking-[-0.025em] text-balance">
                Fale com o EconomizAI
              </h1>
              <p className="mt-5 max-w-[58ch] text-fluid-base leading-[1.7] text-pretty text-offwhite/70">
                Dúvidas sobre créditos, uma oferta desatualizada, um cupom que não funcionou ou uma
                proposta de parceria: escreva para a gente.
              </p>
            </div>
          </Container>
        </section>

        <section className="section-y" aria-labelledby="formulario-contato">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
              <div>
                <SectionHeading
                  eyebrow="Atendimento"
                  title={<span id="formulario-contato">Envie sua mensagem</span>}
                  description="Quanto mais contexto você trouxer (loja, produto, cupom), mais rápida será a resposta quando o atendimento estiver ativo."
                />

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3 rounded-[18px] border border-discount/30 bg-discount/5 p-5">
                    <ShieldAlert className="mt-0.5 size-5 shrink-0 text-discount" strokeWidth={1.75} aria-hidden />
                    <p className="text-fluid-xs leading-[1.7] text-foreground">
                      Nunca informe senhas, códigos de verificação ou dados de cartão nesta ou em
                      qualquer outra mensagem. O EconomizAI jamais solicita esse tipo de informação.
                    </p>
                  </div>

                  <div className="gilded-frame flex items-start gap-3 rounded-[18px] border border-border bg-card p-5 shadow-soft">
                    <LifeBuoy className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                    <p className="text-fluid-xs leading-[1.7] text-muted-foreground">
                      Muitas dúvidas já estão respondidas na{" "}
                      <Link
                        to="/ajuda"
                        className="font-semibold text-foreground underline-offset-4 hover:underline"
                      >
                        Central de ajuda
                      </Link>
                      .
                    </p>
                  </div>

                  <p className="text-fluid-xs leading-[1.7] text-muted-foreground">
                    Nesta versão, os dados preenchidos não são enviados, armazenados nem
                    encaminhados por e-mail.
                  </p>
                </div>
              </div>

              <div className="gilded-frame rounded-[20px] border border-border bg-card p-6 shadow-soft sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="name"
                              placeholder="Seu nome"
                              maxLength={100}
                              className="min-h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              placeholder="voce@email.com"
                              maxLength={255}
                              className="min-h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Resumo em uma linha"
                              maxLength={120}
                              className="min-h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="min-h-11">
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONTACT_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              maxLength={1000}
                              placeholder="Descreva sua dúvida ou o problema encontrado."
                              className="resize-y"
                            />
                          </FormControl>
                          <FormDescription className="text-right tabular-nums">
                            {messageLength}/1000
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-wrap gap-3">
                      <button type="submit" className={cn(buttonSolid, "flex-1")}>
                        <Send className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                        Enviar mensagem
                      </button>
                      <button
                        type="button"
                        onClick={() => form.reset()}
                        className={buttonOutline}
                      >
                        Limpar
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <ThemeToggle />
    </div>
  );
}
