import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AuthShell, authInput, authLink } from "@/components/auth/auth-shell";
import { buttonSolid } from "@/components/home/primitives";
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
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

const recoverSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Informe seu e-mail." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
});

type RecoverValues = z.infer<typeof recoverSchema>;

export const Route = createFileRoute("/recuperar-senha")({
  head: () => {
    const title = "Recuperar senha | DESCONTAI";
    const description = "Receba instruções para redefinir o acesso à sua conta DESCONTAI.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/recuperar-senha` }],
    };
  },
  component: RecoverPasswordPage,
});

function RecoverPasswordPage() {
  const form = useForm<RecoverValues>({
    resolver: zodResolver(recoverSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  /** Integração futura: nenhum e-mail é enviado e nada é registrado agora. */
  function onSubmit(_values: RecoverValues) {
    toast("A recuperação de senha será ativada após a integração com o sistema de contas.");
  }

  return (
    <AuthShell
      eyebrow="Recuperação"
      title="Recuperar senha"
      description="Informe o e-mail cadastrado para receber as instruções de redefinição de acesso."
      footer={
        <>
          Lembrou a senha?{" "}
          <Link to="/entrar" className={authLink}>
            Entrar
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-offwhite/80">E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="voce@email.com"
                    maxLength={255}
                    className={authInput}
                  />
                </FormControl>
                <FormDescription className="text-offwhite/50">
                  Use o mesmo e-mail utilizado no cadastro.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" className={cn(buttonSolid, "w-full border border-gold/30")}>
            <Send className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Enviar instruções
          </button>
        </form>
      </Form>
    </AuthShell>
  );
}
