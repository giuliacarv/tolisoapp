import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AuthShell, authInput, authLink } from "@/components/auth/auth-shell";
import { buttonSolid } from "@/components/home/primitives";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SITE_URL = "https://descontai1.lovable.app";

/**
 * Contrato de validação da tela de acesso. Fica isolado para que a futura
 * integração de contas reaproveite exatamente o mesmo schema.
 */
const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Informe seu e-mail." })
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
  password: z
    .string()
    .min(1, { message: "Informe sua senha." })
    .max(128, { message: "A senha deve ter no máximo 128 caracteres." }),
  remember: z.boolean(),
});

type SignInValues = z.infer<typeof signInSchema>;

export const Route = createFileRoute("/entrar")({
  head: () => {
    const title = "Entrar | EconomizAI";
    const description =
      "Acesse sua conta EconomizAI para acompanhar ofertas, cupons e créditos.";

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
      links: [{ rel: "canonical", href: `${SITE_URL}/entrar` }],
    };
  },
  component: SignInPage,
});

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "", remember: false },
  });

  /**
   * Ponto único de integração futura. Hoje apenas confirma que o formulário é
   * válido — nenhuma credencial é enviada, guardada ou usada para criar sessão.
   */
  function onSubmit(_values: SignInValues) {
    toast("A autenticação segura será ativada na etapa de integração com o Supabase.");
  }

  return (
    <AuthShell
      eyebrow="Acesso"
      title="Entrar na sua conta"
      description="Use seu e-mail e senha para acompanhar ofertas resgatadas, cupons e saldo de créditos."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link to="/criar-conta" className={authLink}>
            Criar conta
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
                <FormLabel className="text-fluid-xs font-medium text-foreground">E-mail</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fluid-xs font-medium text-foreground">Senha</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Sua senha"
                      maxLength={128}
                      className={cn(authInput, "pr-12")}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-muted-foreground transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" strokeWidth={1.75} aria-hidden />
                    ) : (
                      <Eye className="size-4" strokeWidth={1.75} aria-hidden />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                // Ergonomia touch: o par caixa + rótulo forma um único alvo de
                // 44px de altura, evitando toques imprecisos no quadrado de 16px.
                <FormItem className="flex min-h-11 items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      className="size-5 border-border data-[state=checked]:border-gold data-[state=checked]:bg-gold data-[state=checked]:text-ink"
                    />
                  </FormControl>
                  <FormLabel className="flex min-h-11 cursor-pointer items-center text-fluid-xs font-normal text-muted-foreground">
                    Lembrar de mim
                  </FormLabel>
                </FormItem>

              )}
            />

            <Link to="/recuperar-senha" className={cn(authLink, "text-fluid-xs")}>
              Esqueci minha senha
            </Link>
          </div>

          <button type="submit" className={cn(buttonSolid, "w-full")}>
            <LogIn className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Entrar
          </button>
        </form>
      </Form>
    </AuthShell>
  );
}
