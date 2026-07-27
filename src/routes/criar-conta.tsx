import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Sparkles, UserPlus } from "lucide-react";
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

const SITE_URL = "https://economizai1.lovable.app";

/** Regras de cadastro — reaproveitáveis pela futura integração de contas. */
const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, { message: "Informe seu nome completo." })
      .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Informe seu e-mail." })
      .email({ message: "Informe um e-mail válido." })
      .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
      .max(128, { message: "A senha deve ter no máximo 128 caracteres." }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha." }),
    acceptTerms: z.boolean(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais.",
  })
  .refine((values) => values.acceptTerms, {
    path: ["acceptTerms"],
    message: "É necessário aceitar os termos para continuar.",
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export const Route = createFileRoute("/criar-conta")({
  head: () => {
    const title = "Criar conta | EconomizAI";
    const description =
      "Crie sua conta EconomizAI e comece a acompanhar ofertas e cupons selecionados.";

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
      links: [{ rel: "canonical", href: `${SITE_URL}/criar-conta` }],
    };
  },
  component: SignUpPage,
});

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  /** Integração futura: nenhuma conta é criada e nenhuma senha é armazenada. */
  function onSubmit(_values: SignUpValues) {
    toast("O cadastro será ativado após a integração segura com o Supabase.");
  }

  return (
    <AuthShell
      eyebrow="Cadastro"
      title="Criar sua conta"
      description="Leva menos de um minuto e você passa a acompanhar ofertas, cupons e créditos em um só lugar."
      footer={
        <>
          Já tem conta?{" "}
          <Link to="/entrar" className={authLink}>
            Entrar
          </Link>
        </>
      }
    >
      <p className="mb-6 flex items-start gap-2 rounded-xl border border-gold/25 bg-gold/10 p-3 text-fluid-xs leading-relaxed text-foreground">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        Sua conta começará com 5 créditos gratuitos.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fluid-xs font-medium text-foreground">Nome completo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    maxLength={100}
                    className={authInput}
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
                      autoComplete="new-password"
                      placeholder="Pelo menos 8 caracteres"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fluid-xs font-medium text-foreground">Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                    maxLength={128}
                    className={authInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      className="mt-0.5 border-border data-[state=checked]:border-gold data-[state=checked]:bg-gold data-[state=checked]:text-ink"
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer text-fluid-xs font-normal leading-relaxed text-muted-foreground">
                    Li e aceito os termos de uso e a política de privacidade do EconomizAI.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" className={cn(buttonSolid, "w-full border border-gold/30")}>
            <UserPlus className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Criar conta
          </button>
        </form>
      </Form>
    </AuthShell>
  );
}
