-- Espelho versionado do catálogo criado no PostgreSQL gerenciado pelo Lovable.
-- Sem preços fictícios, cupons falsos ou credenciais. Aplicar somente no projeto correto.
BEGIN;
CREATE TABLE IF NOT EXISTS public.stores (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  logo_url text,
  logo_alt text NOT NULL DEFAULT '',
  external_url text,
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT stores_id_nonempty CHECK (length(trim(id)) BETWEEN 1 AND 80),
  CONSTRAINT stores_slug_nonempty CHECK (length(trim(slug)) > 0)
);
CREATE TABLE IF NOT EXISTS public.categories (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'sparkles',
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT categories_icon_allowed CHECK (icon_name IN ('smartphone','home','sparkles','shirt','laptop','watch'))
);
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  store_id text NOT NULL REFERENCES public.stores(id),
  category_id text NOT NULL REFERENCES public.categories(id),
  original_price numeric(12,2) NOT NULL,
  current_price numeric(12,2) NOT NULL,
  destination_url text NOT NULL,
  source_url text NOT NULL,
  affiliate_url text,
  featured boolean NOT NULL DEFAULT false,
  available boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  verified_at timestamptz,
  expires_at timestamptz NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  highlights text[] NOT NULL DEFAULT '{}',
  terms text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT products_status_allowed CHECK (status IN ('draft','published','paused')),
  CONSTRAINT products_price_positive CHECK (current_price > 0 AND original_price >= current_price),
  CONSTRAINT products_destination_https CHECK (destination_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT products_source_https CHECK (source_url ~ '^https://[^[:space:]]+
  CONSTRAINT products_publication_verified CHECK (status <> 'published' OR
    (verified_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > verified_at))
);
CREATE TABLE IF NOT EXISTS public.coupons (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  store_id text NOT NULL REFERENCES public.stores(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL,
  discount_value numeric(12,2) NOT NULL DEFAULT 0,
  minimum_purchase numeric(12,2),
  expires_at timestamptz NOT NULL,
  validated_at timestamptz,
  terms text NOT NULL DEFAULT '',
  destination_url text NOT NULL,
  source_url text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT coupons_type_allowed CHECK (discount_type IN ('percentage','fixed','shipping','special')),
  CONSTRAINT coupons_status_allowed CHECK (status IN ('draft','published','paused')),
  CONSTRAINT coupons_value_valid CHECK (discount_value >= 0 AND (minimum_purchase IS NULL OR minimum_purchase >= 0)),
  CONSTRAINT coupons_percentage_valid CHECK (discount_type <> 'percentage' OR discount_value <= 100),
  CONSTRAINT coupons_destination_https CHECK (destination_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_source_https CHECK (source_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_publication_verified CHECK (status <> 'published' OR
    (validated_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > validated_at))
);
CREATE INDEX IF NOT EXISTS products_live_filter_idx ON public.products(status, expires_at DESC, verified_at DESC);
CREATE INDEX IF NOT EXISTS products_store_idx ON public.products(store_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS coupons_live_filter_idx ON public.coupons(status, expires_at DESC, validated_at DESC);
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
REVOKE INSERT, UPDATE, DELETE ON public.stores, public.categories, public.products, public.coupons FROM anon, authenticated;
GRANT SELECT ON public.stores, public.categories, public.products, public.coupons TO anon, authenticated;
DROP POLICY IF EXISTS stores_active_read ON public.stores;
CREATE POLICY stores_active_read ON public.stores FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS categories_active_read ON public.categories;
CREATE POLICY categories_active_read ON public.categories FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS products_published_current_read ON public.products;
CREATE POLICY products_published_current_read ON public.products FOR SELECT TO anon,authenticated USING (
  status = 'published' AND available = true AND published_at IS NOT NULL
  AND published_at <= now() AND verified_at <= now()
  AND verified_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
  AND EXISTS (SELECT 1 FROM public.categories c WHERE c.id = category_id AND c.active = true)
);
DROP POLICY IF EXISTS coupons_published_current_read ON public.coupons;
CREATE POLICY coupons_published_current_read ON public.coupons FOR SELECT TO anon,authenticated USING (
  status = 'published' AND published_at IS NOT NULL AND published_at <= now()
  AND validated_at <= now() AND validated_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
);
COMMIT;
),
  CONSTRAINT products_affiliate_https CHECK (affiliate_url IS NULL OR affiliate_url ~ '^https://[^[:space:]]+
  CONSTRAINT products_publication_verified CHECK (status <> 'published' OR
    (verified_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > verified_at))
);
CREATE TABLE IF NOT EXISTS public.coupons (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  store_id text NOT NULL REFERENCES public.stores(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL,
  discount_value numeric(12,2) NOT NULL DEFAULT 0,
  minimum_purchase numeric(12,2),
  expires_at timestamptz NOT NULL,
  validated_at timestamptz,
  terms text NOT NULL DEFAULT '',
  destination_url text NOT NULL,
  source_url text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT coupons_type_allowed CHECK (discount_type IN ('percentage','fixed','shipping','special')),
  CONSTRAINT coupons_status_allowed CHECK (status IN ('draft','published','paused')),
  CONSTRAINT coupons_value_valid CHECK (discount_value >= 0 AND (minimum_purchase IS NULL OR minimum_purchase >= 0)),
  CONSTRAINT coupons_percentage_valid CHECK (discount_type <> 'percentage' OR discount_value <= 100),
  CONSTRAINT coupons_destination_https CHECK (destination_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_source_https CHECK (source_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_publication_verified CHECK (status <> 'published' OR
    (validated_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > validated_at))
);
CREATE INDEX IF NOT EXISTS products_live_filter_idx ON public.products(status, expires_at DESC, verified_at DESC);
CREATE INDEX IF NOT EXISTS products_store_idx ON public.products(store_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS coupons_live_filter_idx ON public.coupons(status, expires_at DESC, validated_at DESC);
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
REVOKE INSERT, UPDATE, DELETE ON public.stores, public.categories, public.products, public.coupons FROM anon, authenticated;
GRANT SELECT ON public.stores, public.categories, public.products, public.coupons TO anon, authenticated;
DROP POLICY IF EXISTS stores_active_read ON public.stores;
CREATE POLICY stores_active_read ON public.stores FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS categories_active_read ON public.categories;
CREATE POLICY categories_active_read ON public.categories FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS products_published_current_read ON public.products;
CREATE POLICY products_published_current_read ON public.products FOR SELECT TO anon,authenticated USING (
  status = 'published' AND available = true AND published_at IS NOT NULL
  AND verified_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
  AND EXISTS (SELECT 1 FROM public.categories c WHERE c.id = category_id AND c.active = true)
);
DROP POLICY IF EXISTS coupons_published_current_read ON public.coupons;
CREATE POLICY coupons_published_current_read ON public.coupons FOR SELECT TO anon,authenticated USING (
  status = 'published' AND published_at IS NOT NULL
  AND validated_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
);
COMMIT;
),
  CONSTRAINT products_published_image_https CHECK (status <> 'published' OR image_url ~ '^https://[^[:space:]]+
  CONSTRAINT products_publication_verified CHECK (status <> 'published' OR
    (verified_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > verified_at))
);
CREATE TABLE IF NOT EXISTS public.coupons (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  store_id text NOT NULL REFERENCES public.stores(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL,
  discount_value numeric(12,2) NOT NULL DEFAULT 0,
  minimum_purchase numeric(12,2),
  expires_at timestamptz NOT NULL,
  validated_at timestamptz,
  terms text NOT NULL DEFAULT '',
  destination_url text NOT NULL,
  source_url text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT coupons_type_allowed CHECK (discount_type IN ('percentage','fixed','shipping','special')),
  CONSTRAINT coupons_status_allowed CHECK (status IN ('draft','published','paused')),
  CONSTRAINT coupons_value_valid CHECK (discount_value >= 0 AND (minimum_purchase IS NULL OR minimum_purchase >= 0)),
  CONSTRAINT coupons_percentage_valid CHECK (discount_type <> 'percentage' OR discount_value <= 100),
  CONSTRAINT coupons_destination_https CHECK (destination_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_source_https CHECK (source_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_publication_verified CHECK (status <> 'published' OR
    (validated_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > validated_at))
);
CREATE INDEX IF NOT EXISTS products_live_filter_idx ON public.products(status, expires_at DESC, verified_at DESC);
CREATE INDEX IF NOT EXISTS products_store_idx ON public.products(store_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS coupons_live_filter_idx ON public.coupons(status, expires_at DESC, validated_at DESC);
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
REVOKE INSERT, UPDATE, DELETE ON public.stores, public.categories, public.products, public.coupons FROM anon, authenticated;
GRANT SELECT ON public.stores, public.categories, public.products, public.coupons TO anon, authenticated;
DROP POLICY IF EXISTS stores_active_read ON public.stores;
CREATE POLICY stores_active_read ON public.stores FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS categories_active_read ON public.categories;
CREATE POLICY categories_active_read ON public.categories FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS products_published_current_read ON public.products;
CREATE POLICY products_published_current_read ON public.products FOR SELECT TO anon,authenticated USING (
  status = 'published' AND available = true AND published_at IS NOT NULL
  AND verified_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
  AND EXISTS (SELECT 1 FROM public.categories c WHERE c.id = category_id AND c.active = true)
);
DROP POLICY IF EXISTS coupons_published_current_read ON public.coupons;
CREATE POLICY coupons_published_current_read ON public.coupons FOR SELECT TO anon,authenticated USING (
  status = 'published' AND published_at IS NOT NULL
  AND validated_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
);
COMMIT;
),
  CONSTRAINT products_publication_verified CHECK (status <> 'published' OR
    (verified_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > verified_at))
);
CREATE TABLE IF NOT EXISTS public.coupons (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  store_id text NOT NULL REFERENCES public.stores(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL,
  discount_value numeric(12,2) NOT NULL DEFAULT 0,
  minimum_purchase numeric(12,2),
  expires_at timestamptz NOT NULL,
  validated_at timestamptz,
  terms text NOT NULL DEFAULT '',
  destination_url text NOT NULL,
  source_url text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT coupons_type_allowed CHECK (discount_type IN ('percentage','fixed','shipping','special')),
  CONSTRAINT coupons_status_allowed CHECK (status IN ('draft','published','paused')),
  CONSTRAINT coupons_value_valid CHECK (discount_value >= 0 AND (minimum_purchase IS NULL OR minimum_purchase >= 0)),
  CONSTRAINT coupons_percentage_valid CHECK (discount_type <> 'percentage' OR discount_value <= 100),
  CONSTRAINT coupons_destination_https CHECK (destination_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_source_https CHECK (source_url ~ '^https://[^[:space:]]+$'),
  CONSTRAINT coupons_publication_verified CHECK (status <> 'published' OR
    (validated_at IS NOT NULL AND published_at IS NOT NULL AND expires_at > validated_at))
);
CREATE INDEX IF NOT EXISTS products_live_filter_idx ON public.products(status, expires_at DESC, verified_at DESC);
CREATE INDEX IF NOT EXISTS products_store_idx ON public.products(store_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS coupons_live_filter_idx ON public.coupons(status, expires_at DESC, validated_at DESC);
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
REVOKE INSERT, UPDATE, DELETE ON public.stores, public.categories, public.products, public.coupons FROM anon, authenticated;
GRANT SELECT ON public.stores, public.categories, public.products, public.coupons TO anon, authenticated;
DROP POLICY IF EXISTS stores_active_read ON public.stores;
CREATE POLICY stores_active_read ON public.stores FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS categories_active_read ON public.categories;
CREATE POLICY categories_active_read ON public.categories FOR SELECT TO anon,authenticated USING (active = true);
DROP POLICY IF EXISTS products_published_current_read ON public.products;
CREATE POLICY products_published_current_read ON public.products FOR SELECT TO anon,authenticated USING (
  status = 'published' AND available = true AND published_at IS NOT NULL
  AND verified_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
  AND EXISTS (SELECT 1 FROM public.categories c WHERE c.id = category_id AND c.active = true)
);
DROP POLICY IF EXISTS coupons_published_current_read ON public.coupons;
CREATE POLICY coupons_published_current_read ON public.coupons FOR SELECT TO anon,authenticated USING (
  status = 'published' AND published_at IS NOT NULL
  AND validated_at >= now() - interval '7 days' AND expires_at > now()
  AND EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.active = true)
);
COMMIT;
