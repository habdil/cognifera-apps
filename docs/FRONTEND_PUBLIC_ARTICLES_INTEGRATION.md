# Frontend Integration - Public Articles API

## Overview

Dokumentasi ini menjelaskan cara mengintegrasikan Public Articles API ke frontend setelah backend selesai mengimplementasikan endpoint.

**Target Pages:**
- `/news` - Public news listing page
- `/news/[id]` - Public news detail page

**Tech Stack:**
- Next.js 15 (App Router)
- TypeScript
- Server-Side Rendering (SSR)

---

## Step-by-Step Implementation

### Step 1: Create Public API Service Layer

**File:** `lib/api/public-articles.ts`

```typescript
// lib/api/public-articles.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Author {
  id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  bio?: string;
  username?: string;
}

export interface PublicArticle {
  id: string;
  judul: string;
  konten: string;
  category: string;
  featuredImage: string;
  tags: string[];
  status: 'aktif';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author?: Author;
}

export interface FetchPublicArticlesParams {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedArticlesResponse {
  data: PublicArticle[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

/**
 * Fetch published articles from public endpoint (NO AUTH)
 * Can be called from server or client components
 */
export async function fetchPublicArticles(
  params: FetchPublicArticlesParams = {}
): Promise<ApiResponse<PublicArticle[]> & { meta: { total: number; limit: number; offset: number } }> {
  const queryParams = new URLSearchParams();

  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.offset) queryParams.append('offset', params.offset.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);

  const url = `${API_BASE_URL}/public/articles?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Next.js specific: revalidate every 5 minutes
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch articles' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch articles`);
  }

  return response.json();
}

/**
 * Fetch single published article by ID (NO AUTH)
 * Can be called from server or client components
 */
export async function fetchPublicArticleById(articleId: string): Promise<ApiResponse<PublicArticle>> {
  const url = `${API_BASE_URL}/public/articles/${articleId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Next.js specific: revalidate every 5 minutes
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Article not found' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch article`);
  }

  return response.json();
}
```

---

### Step 2: Update NewsPageClient (Client Component)

**File:** `components/news/NewsPageClient.tsx`

**Changes:**

```typescript
// Replace this import:
// import { Article, fetchAuthorArticles } from "@/lib/api/author-articles";

// With this:
import { PublicArticle, fetchPublicArticles } from "@/lib/api/public-articles";

// Update state type:
const [news, setNews] = useState<PublicArticle[]>([]);
const [filteredNews, setFilteredNews] = useState<PublicArticle[]>([]);

// Update fetch function:
useEffect(() => {
  const fetchNews = async () => {
    try {
      // Fetch published articles from PUBLIC endpoint (NO AUTH)
      const response = await fetchPublicArticles({
        limit: 100 // Fetch more articles for public listing
      });

      if (response.success && response.data) {
        // Sort by publishedAt or updatedAt (most recent first)
        const sortedNews = response.data.sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.updatedAt).getTime();
          const dateB = new Date(b.publishedAt || b.updatedAt).getTime();
          return dateB - dateA;
        });
        setNews(sortedNews);
        setFilteredNews(sortedNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to Load Articles', {
        description: 'Unable to fetch articles. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, []);
```

---

### Step 3: Update NewsCard (Component)

**File:** `components/news/NewsCard.tsx`

**Changes:**

```typescript
// Replace this import:
// import { Article } from "@/lib/api/author-articles";

// With this:
import { PublicArticle } from "@/lib/api/public-articles";

// Update interface:
interface NewsCardProps {
  article: PublicArticle;
}
```

**Note:** No other changes needed in NewsCard component!

---

### Step 4: Update NewsDetailClient (Client Component)

**File:** `components/news/NewsDetailClient.tsx`

**Changes:**

```typescript
// Replace this import:
// import { Article, fetchArticleById, fetchAuthorArticles } from "@/lib/api/author-articles";

// With this:
import { PublicArticle, fetchPublicArticleById, fetchPublicArticles } from "@/lib/api/public-articles";

// Update state type:
const [article, setArticle] = useState<PublicArticle | null>(initialArticle || null);
const [relatedNews, setRelatedNews] = useState<PublicArticle[]>([]);

// Update interface:
interface NewsDetailClientProps {
  initialArticle?: PublicArticle | null;
}

// Update fetch functions:
useEffect(() => {
  if (!initialArticle && id) {
    const fetchArticle = async () => {
      try {
        const response = await fetchPublicArticleById(id as string);
        if (response.success && response.data) {
          setArticle(response.data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        toast.error('Failed to Load Article', {
          description: 'Unable to fetch article details.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }
}, [id, initialArticle]);

useEffect(() => {
  if (article) {
    const fetchRelatedNews = async () => {
      try {
        const relatedResponse = await fetchPublicArticles({
          limit: 20,
          category: article.category // Filter by same category
        });

        if (relatedResponse.success && relatedResponse.data) {
          const related = relatedResponse.data
            .filter(item => item.id !== article.id)
            .slice(0, 3);
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('Error fetching related news:', error);
      }
    };

    fetchRelatedNews();
  }
}, [article]);
```

---

### Step 5: Update News Detail Page (Server Component)

**File:** `app/(main)/news/[id]/page.tsx`

**Changes:**

```typescript
// Replace this import:
// import { fetchArticleById } from "@/lib/api/author-articles";

// With this:
import { fetchPublicArticleById } from "@/lib/api/public-articles";

// Update generateMetadata:
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response = await fetchPublicArticleById(params.id);

    // ... rest of metadata generation (no changes needed)
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Artikel Tidak Ditemukan - Cognifera Education Academy",
      description: "Artikel yang Anda cari tidak tersedia atau telah dihapus.",
    };
  }
}

// Update main component:
export default async function NewsDetailPage({ params }: Props) {
  try {
    const response = await fetchPublicArticleById(params.id);

    if (!response.success || !response.data) {
      notFound();
    }

    const article = response.data;

    // ... rest of component (no changes needed to JSON-LD)
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
```

---

## Environment Variables

Make sure `NEXT_PUBLIC_API_URL` is set in your `.env` files:

**.env.local (Development):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**.env.production (Production):**
```env
NEXT_PUBLIC_API_URL=https://api.cognifera.web.id/api
```

---

## Testing Checklist

### After Backend Implementation:

- [ ] **Step 1:** Create `lib/api/public-articles.ts`
- [ ] **Step 2:** Test API calls in browser console
  ```javascript
  // Open browser console on /news page
  import { fetchPublicArticles } from '@/lib/api/public-articles';
  const articles = await fetchPublicArticles({ limit: 10 });
  console.log(articles);
  ```
- [ ] **Step 3:** Update `NewsPageClient.tsx`
- [ ] **Step 4:** Update `NewsCard.tsx`
- [ ] **Step 5:** Update `NewsDetailClient.tsx`
- [ ] **Step 6:** Update `app/(main)/news/[id]/page.tsx`
- [ ] **Step 7:** Test `/news` page loads without authentication
- [ ] **Step 8:** Test `/news/[id]` page loads article details
- [ ] **Step 9:** Test search and filtering work
- [ ] **Step 10:** Test related articles display correctly

---

## Error Handling

### Common Issues & Solutions:

**1. CORS Error:**
```
Access to fetch at 'http://localhost:5000/api/public/articles' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

**Solution:** Backend needs to add CORS headers (see backend documentation)

**2. 404 Not Found:**
```
Failed to fetch articles: HTTP 404: Failed to fetch articles
```

**Solution:**
- Check if backend endpoint is implemented
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check if there are published articles in database

**3. Authentication Error (Should NOT happen):**
```
HTTP 401: Unauthorized
```

**Solution:** Public endpoints should NOT require auth. Contact backend developer.

---

## Comparison: Before vs After

### Before (Using Authenticated API):

```typescript
// ❌ Required authentication
import { fetchAuthorArticles } from "@/lib/api/author-articles";

// This fails for public users (no token)
const articles = await fetchAuthorArticles({ status: 'aktif' });
```

### After (Using Public API):

```typescript
// ✅ NO authentication required
import { fetchPublicArticles } from "@/lib/api/public-articles";

// Works for everyone (public endpoint)
const articles = await fetchPublicArticles();
```

---

## Performance Optimization

### Next.js Caching:

The public API calls include `next: { revalidate: 300 }` which tells Next.js to:
- Cache the response for 5 minutes
- Serve cached data for better performance
- Revalidate in the background

**Adjust revalidation time if needed:**

```typescript
// Revalidate every 1 minute (more fresh data)
next: { revalidate: 60 }

// Revalidate every 10 minutes (better performance)
next: { revalidate: 600 }

// Revalidate every hour
next: { revalidate: 3600 }
```

---

## Migration Timeline

### Phase 1: Backend Implementation (Backend Team)
- [ ] Create `/api/public/articles` endpoint
- [ ] Create `/api/public/articles/:id` endpoint
- [ ] Add CORS configuration
- [ ] Test endpoints with curl/Postman
- [ ] Deploy to staging

**ETA:** 2-4 hours

### Phase 2: Frontend Integration (Frontend Team)
- [ ] Create `lib/api/public-articles.ts`
- [ ] Update all news components
- [ ] Update news detail page
- [ ] Test on local development
- [ ] Test on staging environment
- [ ] Deploy to production

**ETA:** 1-2 hours

### Phase 3: Validation & Cleanup
- [ ] Verify SEO metadata works
- [ ] Verify images load correctly
- [ ] Verify related articles display
- [ ] Monitor for errors
- [ ] (Optional) Remove old dummy API code

**ETA:** 30 minutes

---

## Rollback Plan

If public API has issues, you can temporarily use the old dummy API:

```typescript
// Temporary fallback to dummy API
import { beritaAPI } from "@/lib/api-dummy";

const response = await beritaAPI.getAll({ status: "aktif" });
```

**Note:** This is only temporary until backend fixes the issues!

---

## Support & Questions

**Frontend Issues:**
- File: See this documentation
- Contact: Frontend Developer

**Backend Issues:**
- File: `docs/PUBLIC_ARTICLES_API.md`
- Contact: Backend Developer

**Deployment Issues:**
- Contact: DevOps Team

---

## Quick Reference

### Files to Create:
- `lib/api/public-articles.ts` (NEW)

### Files to Update:
- `components/news/NewsPageClient.tsx`
- `components/news/NewsCard.tsx`
- `components/news/NewsDetailClient.tsx`
- `app/(main)/news/[id]/page.tsx`

### Files to NOT Touch:
- `lib/api/author-articles.ts` (Keep for dashboard)
- `components/editor/*` (No changes needed)
- `app/dashboard/*` (No changes needed)

---

Generated by: Claude Code (Frontend Developer)
Date: 2025-10-02
Status: Ready for implementation after backend completion
