# Cognifera Apps

Website Cognifera — landing page, katalog buku, berita/artikel, dan panel admin. Dibangun dengan Next.js 15 (App Router) + Neon Postgres + Cloudinary.

## Setup

1. Salin `.env.example` menjadi `.env` dan isi semua variabel.
2. Install dependency dan siapkan database:

```bash
npm install
npm run db:schema        # terapkan db/schema.sql ke Neon (idempotent)
npm run db:seed-books    # seed katalog buku awal (opsional)
npm run admin:create -- admin@example.com "password-kuat" "Nama Admin"
```

3. Jalankan development server:

```bash
npm run dev
```

## Fitur

- **Landing page** (`/`) — hero, layanan, promo, testimoni, form konsultasi (tersimpan ke Neon + notifikasi email opsional)
- **Publikasi buku** (`/publications`) — katalog dari database, dikelola via admin
- **Berita/artikel** (`/news`) — ditulis dengan editor TipTap di admin
- **Panel admin** (`/admin`) — kelola buku, artikel, leads, dan dashboard analytics pengunjung (self-hosted, tanpa third-party)

## Dokumentasi arsitektur

Lihat [CLAUDE.md](CLAUDE.md) untuk peta arsitektur, modul data-access, konvensi, dan variabel environment.
