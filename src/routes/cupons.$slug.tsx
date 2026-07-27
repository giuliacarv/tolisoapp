import { useCallback, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  CalendarX2,
  Clock3,
  Coins,
  SearchX,
  Store as StoreIcon,
  Tag,
  Ticket,
} from "lucide-react";

import { CouponCard, CouponCardSkeleton } from "@/components/home/coupon-card";
import { RedeemCouponModal } from "@/components/home/coupon-redeem-dialog";
import { Container, buttonSolid } from "@/components/home/primitives";
import { Footer } from "@/components/home/site-footer";
import { Header } from "@/components/home/site-header";
import { ThemeToggle } from "@/components/home/theme-toggle";
import {
  COUPON_REDEMPTION_COST,
  formatDiscountLabel,
  getCouponStatus,
  maskCouponCode,
} from "@/domain/coupons/coupon-rules";
import { useResource } from "@/hooks/use-async-resource";
import { formatBRL, formatCreditsLabel, formatDateBR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { couponQueries } from "@/services";
import type { Coupon, CouponStatus } from "@/types";

const SITE_URL = "https://descontai1.lovable.app";

/** Mensagem exigida após a confirmação enquanto não há contas nem créditos. */
const REDEEM_CONFIRMATION_MESSAGE =
  "O resgate real será ativado quando o sistema seguro de contas e créditos estiver conectado.";

const CHANGE_NOTICE =
  "Cupons podem ser alterados ou encerrados pelas lojas sem aviso prévio. Consulte as condições antes de concluir sua compra.";

const DEMO_NOTICE = "Cupom demonstrativo — código real ainda não disponível.";

const DISCOUNT_TYPE_LABEL: Record<Coupon["discountType"], string> = {
  percentage: "Percentual",
  fixed: "Valor fixo",
  shipping: "Frete",
  special: "Especial",
};

const STATUS_META: Record<
  CouponStatus,
  { label: string; className: string; icon: typeof BadgeCheck; message: string }
> = {
  validated: {
    label: "Validado",
    className: "border-saving/40 bg-saving/10 text-saving",
    icon: BadgeCheck,
    message: "Cupom conferido pela curadoria na data da última verificação.",
  },
  pending: {
    label: "Validação pendente",
    className: "border-amber/40 bg-amber/10 text-amber",
    icon: Clock3,
    message: "Ainda não confirmamos este cupom. Confira as condições na loja parceira.",
  },
  expired: {
    label: "Expirado",
    className: "border-border bg-secondary text-muted-foreground",
    icon: CalendarX2,
    message: "A validade informada pela loja já passou. O resgate está desabilitado.",
  },
};

export const Route = createFileRoute("/cupons/$slug")({
  head: ({ params }) => {
    const title = "Detalhes do cupom | EconomizAI";
    const description =
      "Veja benefício, condições, validade e créditos necessários deste cupom demonstrativo no EconomizAI.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/cupons/${params.slug}` },
        { property: "og:image", content: `${SITE_URL}/og-descontai.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${SITE_URL}/og-descontai.jpg` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/cupons/${params.slug}` }],
    };
  },
  component: CouponDetailPage,
  errorComponent: () => (
    <PageShell>
      <CouponNotFound />
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <CouponNotFound />
    </PageShell>
  ),
});

/** Moldura comum (header/footer) usada também pelos estados de erro. */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-[var(--header-h)]">
        <Container className="py-12 sm:py-16">{children}</Container>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

/** Estado de slug inexistente ou cupom removido. */
function CouponNotFound() {
  return (
    <div className="mx-auto max-w-md rounded-[18px] border border-border bg-card px-6 py-14 text-center shadow-soft">
      <span
        aria-hidden
        className="mx-auto grid size-14 place-items-center rounded-full border border-border bg-secondary"
      >
        <SearchX className="size-6 text-gold" strokeWidth={1.5} />
      </span>
      <h1 className="mt-6 font-serif text-fluid-h3 tracking-tight text-foreground">
        Cupom não encontrado
      </h1>
      <p className="mt-3 text-fluid-sm leading-relaxed text-muted-foreground">
        Este cupom pode ter sido encerrado pela loja, alterado ou não está mais disponível.
      </p>
      <Link to="/cupons" className={cn(buttonSolid, "mt-8")}>
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        Voltar para os cupons
      </Link>
    </div>
  );
}

/** Skeleton alinhado à malha do conteúdo real. */
function CouponDetailSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Carregando cupom"
      className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
    >
      <div className="flex flex-col gap-4">
        <div className="h-5 w-40 rounded-md bg-secondary motion-safe:animate-pulse" />
        <div className="h-12 w-full rounded-md bg-secondary motion-safe:animate-pulse" />
        <div className="h-4 w-3/4 rounded-md bg-secondary motion-safe:animate-pulse" />
        <div className="h-24 w-full rounded-2xl bg-secondary motion-safe:animate-pulse" />
        <div className="h-32 w-full rounded-2xl bg-secondary motion-safe:animate-pulse" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full rounded-2xl bg-secondary motion-safe:animate-pulse" />
        <div className="h-12 w-full rounded-xl bg-secondary motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

function CouponDetailPage() {
  const { slug } = Route.useParams();
  const [redeemTarget, setRedeemTarget] = useState<Coupon | null>(null);
  const [redeemOpen, setRedeemOpen] = useState(false);

  const coupon = useResource(couponQueries.bySlug(slug));

  const currentId = coupon.data?.id ?? null;
  const siblings = useResource(couponQueries.byStore(currentId, 3));

  const openRedeem = useCallback((target: Coupon) => {
    setRedeemTarget(target);
    setRedeemOpen(true);
  }, []);

  if (coupon.isLoading) {
    return (
      <PageShell>
        <CouponDetailSkeleton />
      </PageShell>
    );
  }

  if (coupon.error) {
    return (
      <PageShell>
        <div role="alert" className="mx-auto max-w-md text-center">
          <p className="text-fluid-sm text-muted-foreground">{coupon.error}</p>
          <button type="button" onClick={coupon.refetch} className={cn(buttonSolid, "mt-6")}>
            Tentar novamente
          </button>
        </div>
      </PageShell>
    );
  }

  if (!coupon.data) {
    return (
      <PageShell>
        <CouponNotFound />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <CouponDetailContent
        coupon={coupon.data}
        siblings={siblings.data ?? []}
        siblingsLoading={siblings.isLoading}
        onRedeem={openRedeem}
      />

      <RedeemCouponModal
        coupon={redeemTarget}
        open={redeemOpen}
        onOpenChange={setRedeemOpen}
        confirmationMessage={REDEEM_CONFIRMATION_MESSAGE}
      />
    </PageShell>
  );
}

interface CouponDetailContentProps {
  coupon: Coupon;
  siblings: Coupon[];
  siblingsLoading: boolean;
  onRedeem: (coupon: Coupon) => void;
}

function CouponDetailContent({
  coupon,
  siblings,
  siblingsLoading,
  onRedeem,
}: CouponDetailContentProps) {
  const status = getCouponStatus(coupon);
  const statusMeta = STATUS_META[status];
  const StatusIcon = statusMeta.icon;
  const isExpired = status === "expired";
  const eligibleItems = coupon.eligibleItems ?? [];

  const discountAmount =
    coupon.discountType === "percentage"
      ? `${coupon.discountValue}%`
      : coupon.discountType === "fixed"
        ? formatBRL(coupon.discountValue)
        : formatDiscountLabel(coupon);

  return (
    <>
      <Link
        to="/cupons"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg text-fluid-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        Voltar para os cupons
      </Link>

      <article className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-fluid-xs font-medium text-foreground">
              <StoreIcon className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              {coupon.store}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-fluid-micro font-semibold",
                statusMeta.className,
              )}
            >
              <StatusIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
              {statusMeta.label}
            </span>
            <span className="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-fluid-micro font-semibold uppercase tracking-[0.14em] text-foreground">
              Cupom demonstrativo
            </span>
          </div>

          <h1 className="mt-3 font-serif text-fluid-h2 leading-[1.1] tracking-[-0.02em] text-balance text-foreground">
            {coupon.title}
          </h1>

          <p className="mt-4 text-fluid-sm leading-[1.7] text-pretty text-muted-foreground">
            {coupon.description}
          </p>

          <p className="mt-4 text-fluid-xs leading-relaxed text-muted-foreground">
            {statusMeta.message}
          </p>

          <section className="mt-8" aria-labelledby="condicoes-de-uso">
            <h2
              id="condicoes-de-uso"
              className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground"
            >
              Condições de uso
            </h2>
            <p className="mt-3 text-fluid-xs leading-[1.7] text-muted-foreground">{coupon.terms}</p>
          </section>

          {eligibleItems.length > 0 ? (
            <section className="mt-8" aria-labelledby="elegiveis">
              <h2
                id="elegiveis"
                className="text-fluid-micro font-semibold uppercase tracking-[0.24em] text-muted-foreground"
              >
                Produtos ou categorias elegíveis
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {eligibleItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-fluid-xs text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-8 flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-fluid-xs leading-relaxed text-muted-foreground">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>{CHANGE_NOTICE}</span>
          </p>

          <p className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-gold/40 bg-gold/8 px-4 py-3 text-fluid-xs leading-relaxed text-foreground">
            <Ticket className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
            <span>{DEMO_NOTICE}</span>
          </p>
        </div>

        {/* Painel do benefício e ação */}
        <aside className="min-w-0">
          <div className="gilded-frame rounded-[18px] border border-border bg-card p-6 shadow-soft sm:p-7">
            <p className="font-serif text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              <span className="gold-text">{formatDiscountLabel(coupon)}</span>
            </p>

            <div
              className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-gold/45 bg-gold/8 px-4 py-3"
              aria-label="Código do cupom parcialmente oculto"
            >
              <Ticket className="size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
              <span className="truncate font-mono text-sm font-semibold tracking-[0.14em] text-foreground">
                {maskCouponCode(coupon.code)}
              </span>
              <span className="ml-auto shrink-0 text-fluid-micro text-muted-foreground">
                Código oculto
              </span>
            </div>

            <dl className="mt-5 space-y-2 text-fluid-xs">
              <Row label="Tipo de desconto" icon={Tag}>
                {DISCOUNT_TYPE_LABEL[coupon.discountType]}
              </Row>
              <Row label="Valor ou percentual">{discountAmount}</Row>
              <Row label="Compra mínima">
                {coupon.minimumPurchase === null
                  ? "Sem valor mínimo"
                  : formatBRL(coupon.minimumPurchase)}
              </Row>
              <Row label="Validade" icon={CalendarClock}>
                {formatDateBR(coupon.expiresAt)}
              </Row>
              <Row label="Última verificação" icon={Clock3}>
                {coupon.checkedAt ? formatDateBR(coupon.checkedAt) : "Ainda não verificado"}
              </Row>
              <Row label="Status" icon={BadgeCheck}>
                {statusMeta.label}
              </Row>
              <Row label="Custo do resgate" icon={Coins}>
                {formatCreditsLabel(COUPON_REDEMPTION_COST)}
              </Row>
            </dl>

            {isExpired ? (
              <button
                type="button"
                disabled
                aria-label={`Cupom expirado: ${coupon.title} da loja ${coupon.store}`}
                className={cn(
                  buttonSolid,
                  "mt-6 w-full cursor-not-allowed bg-secondary bg-none text-muted-foreground shadow-none hover:translate-y-0 hover:shadow-none",
                )}
              >
                Cupom expirado
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRedeem(coupon)}
                aria-label={`Resgatar cupom ${coupon.title} da loja ${coupon.store} por ${COUPON_REDEMPTION_COST} créditos`}
                className={cn(buttonSolid, "mt-6 w-full")}
              >
                <Ticket className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Resgatar Cupom
              </button>
            )}

            <p className="mt-4 text-fluid-micro leading-relaxed text-muted-foreground">
              Nenhum crédito é debitado nesta etapa e o código completo permanece oculto.
            </p>
          </div>
        </aside>
      </article>

      {/* Outros cupons da mesma loja */}
      {siblingsLoading || siblings.length > 0 ? (
        <section className="mt-16 border-t border-border pt-12" aria-labelledby="mesma-loja">
          <h2 id="mesma-loja" className="font-serif text-fluid-h3 tracking-tight text-foreground">
            Outros cupons de {coupon.store}
          </h2>
          <p className="mt-2 text-fluid-sm text-muted-foreground">
            Todos demonstrativos, com custo de {COUPON_REDEMPTION_COST} créditos por resgate.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siblingsLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CouponCardSkeleton key={`sibling-skeleton-${index}`} />
                ))
              : siblings.map((item) => (
                  <CouponCard key={item.id} coupon={item} onRedeem={onRedeem} />
                ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Linha rótulo + valor da lista de definição do painel. */
function Row({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: typeof Tag;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
        {Icon ? <Icon className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden /> : null}
        {label}
      </dt>
      <dd className="text-right font-medium text-foreground">{children}</dd>
    </div>
  );
}
