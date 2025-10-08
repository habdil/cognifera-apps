# 📰 Public Articles API - Implementation Guide

## ✅ Status: **READY TO USE**

API untuk menampilkan artikel yang sudah dipublish di public website (tanpa autentikasi).

---

## 🎯 Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/public/articles` | GET | ❌ No | Get list published articles |
| `/api/public/articles/:id` | GET | ❌ No | Get single published article |
| `/api/public/articles/:id/view` | POST | ❌ No | Increment article view count |

**Base URL:** `http://localhost:5000` (development) atau production URL kalian

---

## 📡 1. Get Published Articles (List)

### **Endpoint**
```
GET /api/public/articles
```

### **Authentication**
❌ **NO AUTH REQUIRED** - Public endpoint

### **Query Parameters**

| Parameter | Type | Required | Default | Max | Description |
|-----------|------|----------|---------|-----|-------------|
| `limit` | number | No | 100 | 100 | Jumlah artikel per page |
| `offset` | number | No | 0 | - | Skip artikel (for pagination) |
| `search` | string | No | - | - | Search di title, content, tags |
| `category` | string | No | - | - | Filter by category slug |

### **Request Examples**

```bash
# Get first 20 articles
GET /api/public/articles?limit=20&offset=0

# Get next 20 articles (page 2)
GET /api/public/articles?limit=20&offset=20

# Search articles
GET /api/public/articles?search=AI&limit=10

# Filter by category
GET /api/public/articles?category=research&limit=10

# Combine filters
GET /api/public/articles?category=research&search=machine%20learning&limit=20
```

### **Response Format**

**Success (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm7pc4d9n0001x4e8y9z1a2b3",
      "judul": "Breakthrough in AI Research",
      "konten": "<h2>Introduction</h2><p>Lorem ipsum dolor sit amet...</p>",
      "category": "research",
      "featuredImage": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/article-images/image.jpg",
      "tags": ["AI", "Machine Learning", "Research"],
      "status": "aktif",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-16T14:20:00.000Z",
      "publishedAt": "2025-01-16T15:00:00.000Z",
      "views": 1234,
      "author": {
        "id": "user-uuid-123",
        "fullName": "Dr. Jane Smith",
        "email": "jane@cognifera.com",
        "avatar": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/avatars/jane.jpg",
        "bio": "AI Research Lead at Cognifera",
        "username": "janesmith"
      }
    }
    // ... more articles
  ],
  "meta": {
    "total": 150,      // Total published articles
    "limit": 20,       // Current limit
    "offset": 0        // Current offset
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "INVALID_PARAMETERS",
  "message": "Parameter limit dan offset harus bernilai positif"
}
```

**Error (500 Server Error):**
```json
{
  "success": false,
  "error": "SERVER_ERROR",
  "message": "Gagal mengambil data artikel"
}
```

---

## 📄 2. Get Published Article by ID (Detail)

### **Endpoint**
```
GET /api/public/articles/:id
```

### **Authentication**
❌ **NO AUTH REQUIRED** - Public endpoint

### **Path Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Article ID (CUID) |

### **Request Example**

```bash
GET /api/public/articles/cm7pc4d9n0001x4e8y9z1a2b3
```

### **Response Format**

**Success (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "cm7pc4d9n0001x4e8y9z1a2b3",
    "judul": "Breakthrough in AI Research",
    "konten": "<h2>Introduction</h2><p>Full HTML content with images...</p><img src='https://...' />",
    "category": "research",
    "featuredImage": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/article-images/featured.jpg",
    "tags": ["AI", "Machine Learning", "Innovation"],
    "status": "aktif",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-16T14:20:00.000Z",
    "publishedAt": "2025-01-16T15:00:00.000Z",
    "views": 1234,
    "author": {
      "id": "user-uuid-123",
      "fullName": "Dr. Jane Smith",
      "email": "jane@cognifera.com",
      "avatar": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/avatars/jane.jpg",
      "bio": "AI Research Lead at Cognifera",
      "username": "janesmith"
    }
  }
}
```

**Error (404 Not Found):**
```json
{
  "success": false,
  "error": "ARTICLE_NOT_FOUND",
  "message": "Artikel tidak ditemukan"
}
```

**Important:** API returns **404** jika:
- Article ID tidak ditemukan
- Article exists tapi status **BUKAN** `PUBLISHED` (masih draft/nonaktif)
- Article sudah di-delete (soft delete)

**Error (500 Server Error):**
```json
{
  "success": false,
  "error": "SERVER_ERROR",
  "message": "Gagal mengambil data artikel"
}
```

---

## 👁️ 3. Increment Article View (Analytics)

### **Endpoint**
```
POST /api/public/articles/:id/view
```

### **Authentication**
❌ **NO AUTH REQUIRED** - Public endpoint

### **Path Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Article ID (CUID) |

### **Features**
- ✅ IP-based rate limiting: **1 view per IP per hour**
- ✅ Automatic duplicate prevention
- ✅ Logs analytics to `ArticleView` table (IP, User Agent, timestamp)
- ✅ Increments `views_count` field in Article
- ✅ Silent fail untuk duplicate views (returns 200 OK)

### **Request Example**

```bash
POST /api/public/articles/cm7pc4d9n0001x4e8y9z1a2b3/view
```

### **Response Format**

**Success (200 OK):**
```json
{
  "success": true
}
```

**Notes:**
- Response selalu `200 OK` bahkan untuk duplicate views
- Frontend tidak perlu handle error untuk rate limiting
- View count otomatis increment jika belum pernah view dalam 1 jam terakhir

**Error (500 Server Error):**
```json
{
  "success": false,
  "error": "SERVER_ERROR",
  "message": "Gagal menambah view count"
}
```

---

## 💻 Frontend Integration (Next.js)

### **1. Create API Client**

```typescript
// lib/api/public-articles.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Article {
  id: string;
  judul: string;
  konten: string;
  category: string;
  featuredImage?: string;
  tags: string[];
  status: 'aktif' | 'nonaktif';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views: number; // View count
  author: {
    id: string;
    fullName: string;
    email?: string;
    avatar?: string;
    bio?: string;
    username?: string;
  };
}

export interface ArticleListResponse {
  success: boolean;
  data: Article[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ArticleSingleResponse {
  success: boolean;
  data: Article;
}

export interface ArticleError {
  success: false;
  error: string;
  message: string;
}

/**
 * Fetch list of published articles
 */
export async function fetchPublicArticles(params?: {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
}): Promise<ArticleListResponse> {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.category) queryParams.append('category', params.category);

  const response = await fetch(
    `${API_BASE_URL}/api/public/articles?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // or 'force-cache' for SSG
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch single published article by ID
 */
export async function fetchPublicArticleById(
  id: string
): Promise<ArticleSingleResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/articles/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // or 'force-cache' for SSG
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Article not found');
    }
    throw new Error(`Failed to fetch article: ${response.status}`);
  }

  return response.json();
}

/**
 * Increment article view count
 * Call this when user opens an article detail page
 */
export async function incrementArticleView(
  articleId: string
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/public/articles/${articleId}/view`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to increment view count');
      return { success: false };
    }

    return response.json();
  } catch (error) {
    console.error('Error incrementing view:', error);
    return { success: false };
  }
}
```

---

### **2. Server Component Example (App Router)**

```typescript
// app/news/page.tsx

import { fetchPublicArticles } from '@/lib/api/public-articles';
import ArticleCard from '@/components/ArticleCard';

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const { data: articles, meta } = await fetchPublicArticles({
      limit,
      offset,
      search: searchParams.search,
      category: searchParams.category,
    });

    const totalPages = Math.ceil(meta.total / limit);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/news?page=${p}`}
                className={`px-4 py-2 rounded ${
                  p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}

        {/* No results */}
        {articles.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Tidak ada artikel yang ditemukan
          </p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Failed to load articles</p>
      </div>
    );
  }
}
```

---

### **3. Article Detail Page**

```typescript
// app/news/[id]/page.tsx

import { fetchPublicArticleById } from '@/lib/api/public-articles';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleViewTracker from '@/components/ArticleViewTracker';

interface Props {
  params: { id: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data: article } = await fetchPublicArticleById(params.id);

    return {
      title: article.judul,
      description: article.konten.replace(/<[^>]*>/g, '').substring(0, 160),
      openGraph: {
        title: article.judul,
        description: article.konten.replace(/<[^>]*>/g, '').substring(0, 160),
        images: article.featuredImage ? [article.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: 'Article Not Found',
    };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  try {
    const { data: article } = await fetchPublicArticleById(params.id);

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Track article view (Client Component) */}
        <ArticleViewTracker articleId={params.id} />
        {/* Featured Image */}
        {article.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.judul}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{article.judul}</h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          {article.author.avatar && (
            <img
              src={article.author.avatar}
              alt={article.author.fullName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{article.author.fullName}</p>
            <p className="text-sm">
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.konten }}
        />

        {/* Author Bio */}
        {article.author.bio && (
          <div className="mt-12 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">About the Author</h3>
            <div className="flex items-start gap-4">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.fullName}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{article.author.fullName}</p>
                <p className="text-gray-600">{article.author.bio}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
```

---

### **4. Article Card Component**

```typescript
// components/ArticleCard.tsx

import Link from 'next/link';
import { Article } from '@/lib/api/public-articles';

export default function ArticleCard({ article }: { article: Article }) {
  // Extract plain text from HTML for excerpt
  const excerpt = article.konten.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

  return (
    <Link href={`/news/${article.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
        {/* Featured Image */}
        {article.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.judul}
            className="w-full h-48 object-cover group-hover:scale-105 transition"
          />
        )}

        <div className="p-4">
          {/* Category Badge */}
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {article.category}
          </span>

          {/* Title */}
          <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-blue-600 transition">
            {article.judul}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4">{excerpt}</p>

          {/* Author & Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.fullName}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{article.author.fullName}</span>
            <span>•</span>
            <span>
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID')}
            </span>
          </div>

          {/* Tags */}
          <div className="flex gap-1 mt-3 flex-wrap">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

---

### **5. Article View Tracker Component (Client Component)**

```typescript
// components/ArticleViewTracker.tsx
'use client';

import { useEffect } from 'react';
import { incrementArticleView } from '@/lib/api/public-articles';

interface Props {
  articleId: string;
}

/**
 * Client component to track article views
 * Automatically calls increment endpoint when mounted
 */
export default function ArticleViewTracker({ articleId }: Props) {
  useEffect(() => {
    // Increment view count when article is opened
    incrementArticleView(articleId).catch((err) => {
      console.error('Failed to track article view:', err);
    });
  }, [articleId]);

  // This component doesn't render anything
  return null;
}
```

**Usage Notes:**
- Component otomatis track view saat artikel dibuka
- Silent fail jika increment gagal (tidak ganggu UX)
- IP-based rate limiting di backend (1 view per jam)

---

## 🔒 Security Features

### ✅ Implemented Security

1. **Only Published Articles**
   - Filter: `status = PUBLISHED`
   - Draft articles **TIDAK** bisa diakses via public endpoint

2. **Soft Delete Protection**
   - Filter: `deleted_at = null`
   - Deleted articles otomatis hidden

3. **Sanitized HTML**
   - Content sudah di-sanitize untuk prevent XSS
   - Safe untuk render dengan `dangerouslySetInnerHTML`

4. **Rate Limiting**
   - Global rate limiter aktif (dari `generalLimiter` middleware)

5. **CORS Protection**
   - Hanya domain yang di-whitelist di `.env` bisa akses

6. **Parameter Validation**
   - Max limit: 100 articles per request
   - Min offset: 0
   - Invalid params return 400 error

---

## 📊 Response Data Notes

### Field Mapping: Backend → Frontend

| Prisma Field | Response Field | Type | Notes |
|--------------|----------------|------|-------|
| `title` | `judul` | string | Indonesian naming |
| `content` | `konten` | string | HTML (sanitized) |
| `cover_image_url` | `featuredImage` | string? | Supabase URL |
| `status: PUBLISHED` | `status: 'aktif'` | string | Always 'aktif' for public |
| `tags` | `tags` | string[] | Array of tags |
| `category.slug` | `category` | string | Category slug |
| `author.full_name` | `author.fullName` | string | CamelCase |
| `author.avatar_url` | `author.avatar` | string? | Supabase URL |
| `views_count` | `views` | number | Total views (with IP rate limiting) |

### Bonus Fields (Available but not in docs above)

Backend juga return field ini (bisa dimanfaatkan):

- `likes_count` - Total likes
- `reading_time` - Estimated reading time (minutes)
- `excerpt` - Auto-generated excerpt
- `slug` - SEO-friendly URL slug

---

## 🚀 Testing

### Test dengan cURL

```bash
# Test list articles
curl http://localhost:5000/api/public/articles

# Test with pagination
curl "http://localhost:5000/api/public/articles?limit=10&offset=0"

# Test single article (ganti ID dengan ID dari database)
curl http://localhost:5000/api/public/articles/cm7pc4d9n0001x4e8y9z1a2b3

# Test increment view count
curl -X POST http://localhost:5000/api/public/articles/cm7pc4d9n0001x4e8y9z1a2b3/view

# Test 404 (draft article atau invalid ID)
curl http://localhost:5000/api/public/articles/invalid-id
```

### Test dengan Browser

```
http://localhost:5000/api/public/articles
http://localhost:5000/api/public/articles?limit=5
http://localhost:5000/api/public/articles/cm7pc4d9n0001x4e8y9z1a2b3
```

---

## 🎨 CSS for Content Rendering

HTML content dari `konten` field bisa di-style dengan Tailwind Typography:

```bash
npm install @tailwindcss/typography
```

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

```tsx
// Usage
<div
  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
  dangerouslySetInnerHTML={{ __html: article.konten }}
/>
```

---

## 📝 Environment Variables

**Frontend `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Production:**

```env
NEXT_PUBLIC_API_URL=https://api.cognifera.web.id
```

---

## ✅ Checklist Integration

- [ ] Copy API client code (`lib/api/public-articles.ts`)
- [ ] Setup environment variable (`NEXT_PUBLIC_API_URL`)
- [ ] Create news list page (`app/news/page.tsx`)
- [ ] Create article detail page (`app/news/[id]/page.tsx`)
- [ ] Create ArticleCard component
- [ ] Create ArticleViewTracker component (for view analytics)
- [ ] Install Tailwind Typography (optional)
- [ ] Test with real data
- [ ] Test view counter increment
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] SEO meta tags (already included in examples)

---

## 🐛 Troubleshooting

**1. CORS Error**

```
Access to fetch at 'http://localhost:5000/api/public/articles' has been blocked by CORS
```

**Fix:** Pastikan frontend URL sudah ada di `ALLOWED_ORIGINS` di backend `.env`

**2. 404 on Published Article**

Possible reasons:
- Article belum PUBLISHED (masih DRAFT)
- Article sudah di-delete (soft delete)
- Invalid article ID

**Fix:** Cek di database: `status = 'PUBLISHED'` dan `deleted_at IS NULL`

**3. Empty Response**

```json
{
  "success": true,
  "data": [],
  "meta": { "total": 0, "limit": 100, "offset": 0 }
}
```

**Reason:** Belum ada artikel dengan status PUBLISHED

**Fix:** Create artikel via `/api/author/articles` dengan `status: 'aktif'`

---

## 📞 Support

Kalau ada issue atau pertanyaan, hubungi:
- Backend Developer (PM Habdil)
- Frontend Developer

---

**Generated by:** Backend Team
**Date:** 2025-10-02
**API Version:** v1.0
**Status:** ✅ Production Ready
