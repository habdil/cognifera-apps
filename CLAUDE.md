# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build production app with Turbopack
- `npm run lint`: Run ESLint
- `npm run db:schema`: Apply `db/schema.sql` to Neon (idempotent)
- `npm run db:seed-books`: Seed the initial book catalog (idempotent by slug)
- `npm run admin:create -- <email> <password> "[name]"`: Create/update an admin account

## Architecture Overview

**Next.js 15** (App Router, React 19, TypeScript strict, Tailwind v4, shadcn/ui New York style, Turbopack). Landing page + content site for Cognifera with a self-contained backend: **Neon Postgres** accessed directly from route handlers and server components via `@neondatabase/serverless` — there is no external backend service.

### Data layers

1. **Neon Postgres** (`DATABASE_URL`) — books, articles/news, contact leads, analytics events, admin users. Schema lives in `db/schema.sql` (single idempotent source of truth; apply with `npm run db:schema`).
2. **Static typed content** in `content/` — services (layanan), promos (iklan), testimonials. Edited in code, not via admin.
3. **Cloudinary** — uploaded images (book covers/previews, article images) via signed server-side upload (`lib/cloudinary.ts`, no SDK). Legacy book images remain in `public/books/`.

### Server data-access modules (all `import "server-only"`)

- `lib/books.ts` — book queries + CRUD mutations (`BookRecord`, `BookInput`)
- `lib/articles.ts` — article queries + CRUD (`published_at` stamped once on first publish)
- `lib/analytics.ts` — dashboard aggregates (stats, zero-filled timeline, top pages, referrers, funnel)
- `lib/auth.ts` — admin JWT session (jose HS256, httpOnly cookie `cognifera_admin_session`)
- `lib/neon.ts` — `getSql()` client factory
- `lib/cloudinary.ts` — signed image upload

Client-safe counterparts: `lib/books-shared.ts` (price/href/WhatsApp helpers), `lib/articles-shared.ts` (category list + `ArticleData` type), `lib/upload-client.ts` (posts to `/api/admin/upload`), `lib/analytics-client.ts` (`track()` via sendBeacon).

### Admin panel (`/admin`)

Single-admin auth: login at `/admin/login` → `POST /api/admin/login` (bcryptjs) → JWT cookie. `middleware.ts` guards `/admin/*` and `/api/admin/*` (edge jose verify); `app/admin/(protected)/layout.tsx` re-checks server-side. Pages: Overview (analytics dashboard), Buku (CRUD + Cloudinary uploads), Artikel (CRUD with the TipTap editor in `components/editor/`), Leads (contact-form submissions + status). Admin API routes live under `app/api/admin/` and call `requireAdmin()`.

### Public pages

- `/` — landing (`components/landing/`): Hero + Layanan (hardcoded), Promo + Testimonial (from `content/`), Contact (posts to `/api/contact` → Neon + optional SMTP email)
- `/publications` + `/publications/books/[id]` — books from DB (ISR 300s, slug or UUID lookup, JSON-LD)
- `/news` + `/news/[slug]` — published articles; detail reuses the TipTap content CSS (`tiptap-editor-content` class) so public rendering matches admin WYSIWYG
- `/services`, `/services/[id]`, `/our-team`, `/profile`, `/visi-misi` — static content
- `sitemap.xml` — generated from DB (books, articles) + `content/services.ts`

### Self-hosted analytics

`components/analytics/AnalyticsTracker.tsx` (mounted in root layout) sends one event per navigation to `POST /api/analytics/track` (bot-filtered, always 204). Event types: `page_view`, `book_view`, `article_view`, `service_view`, `whatsapp_click` (global click listener), `contact_submit`. Identity: persistent `device_id` (localStorage) + per-session id. `/admin` paths are never tracked. Dashboard on the admin Overview page (recharts).

### Environment variables (see `.env.example`)

`DATABASE_URL`, `AUTH_SECRET` (≥32 chars), `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET`, optional `SMTP_*` + `CONTACT_NOTIFY_EMAIL`.

### Conventions

- New DB tables/columns go in `db/schema.sql` (keep idempotent: `CREATE TABLE IF NOT EXISTS`), then run `npm run db:schema`.
- Server modules that touch the DB import `"server-only"`; anything imported by client components goes in a `*-shared.ts` module.
- Admin mutations revalidate the affected public paths (`revalidatePath`) after writes.
- UI style: shadcn primitives with `rounded-none`, primary orange, thin borders — match existing admin pages.
