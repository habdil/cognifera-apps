-- Cognifera database schema (idempotent).
-- Apply with: npm run db:schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  layanan_interest TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL DEFAULT '{}',
  publisher TEXT NOT NULL DEFAULT '',
  publication_year INT NOT NULL,
  isbn TEXT NOT NULL DEFAULT '',
  pages INT NOT NULL DEFAULT 0,
  page_label TEXT,
  language TEXT NOT NULL DEFAULT 'id' CHECK (language IN ('id', 'en')),
  category TEXT NOT NULL DEFAULT 'textbook'
    CHECK (category IN ('textbook', 'reference', 'monograph', 'proceedings')),
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT[],
  keywords TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT NOT NULL,
  cover_alt TEXT,
  preview_images TEXT[],
  price NUMERIC(12, 0),
  availability TEXT NOT NULL DEFAULT 'available'
    CHECK (availability IN ('available', 'out-of-stock', 'pre-order')),
  format TEXT NOT NULL DEFAULT 'print' CHECK (format IN ('print', 'digital', 'both')),
  preview_url TEXT,
  purchase_url TEXT,
  purchase_label TEXT,
  table_of_contents TEXT[],
  highlights TEXT[],
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content_html TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'company',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_status_published
  ON articles (status, published_at DESC);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  device_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT NOT NULL,
  entity_id TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created
  ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_created
  ON analytics_events (event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_device
  ON analytics_events (device_id, created_at);
