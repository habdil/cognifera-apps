# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build production app with Turbopack  
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Architecture Overview

This is a **Next.js 15** application built with TypeScript, using the **App Router** architecture. It's a landing page and admin system for Cognifera, a research services company.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4, shadcn/ui components (New York style)
- **UI Libraries**: Radix UI, Lucide React icons, Tabler icons, Motion animations
- **Fonts**: Work Sans (primary), Geist Mono (monospace)
- **Build Tool**: Turbopack
- **TypeScript**: Strict mode enabled with path aliases (`@/*`)

### Project Structure

```
app/
├── layout.tsx          # Root layout with font configuration
├── page.tsx           # Landing page with section components
├── globals.css        # Tailwind styles
└── admin/             # Admin panel routes
    ├── berita/        # News management
    ├── iklan/         # Promotions management  
    ├── layanan/       # Services management
    └── testimonial/   # Testimonials management

components/
├── landing/           # Landing page sections (Hero, About, Services, etc.)
├── admin/            # Admin panel components
├── shared/           # Shared components (Navbar)
└── ui/               # shadcn/ui base components

lib/
├── api-dummy.ts      # Mock API with localStorage persistence
└── utils.ts          # Utility functions (cn, etc.)

types/
└── index.ts          # TypeScript interfaces for all data models

mock-data/            # Mock data for services, promos, testimonials, news
```

### Data Architecture

The application uses a **mock API system** (`lib/api-dummy.ts`) that simulates a real backend:
- Data persisted in localStorage with fallback to mock data
- Full CRUD operations for all entities
- Automatic date handling and data validation
- Search, filtering, and sorting capabilities

**Core Data Models** (see `types/index.ts`):
- `LayananData`: Services (nama, tagline, deskripsi, hargaMulai, fiturUtama, etc.)
- `IklanData`: Promotions (judul, discountPercentage, tanggalMulai/Berakhir, etc.)
- `TestimonialData`: Customer testimonials (clientName, rating, testimonialText, etc.)
- `BeritaData`: News articles (judul, konten, category, publicationDate, etc.)

### UI System

Uses **shadcn/ui** with:
- New York component style
- Neutral base color scheme
- CSS variables for theming
- Custom components in `components/ui/` (buttons, backgrounds, navbar utilities)

### Admin Panel

Located in `app/admin/` with separate routes for each content type. Uses the mock API for all operations.

### Landing Page

Single-page application with modular sections:
- HeroSection, AboutSection, LayananSection
- PromoSection, TestimonialSection, BeritaSection  
- ContactSection

Each section is a separate component in `components/landing/`.