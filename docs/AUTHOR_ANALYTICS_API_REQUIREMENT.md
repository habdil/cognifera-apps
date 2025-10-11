# Author Analytics API - Backend Requirement

## Overview
Frontend Author Dashboard membutuhkan endpoint analytics untuk menampilkan performa artikel yang ditulis oleh author. Saat ini belum ada endpoint khusus untuk analytics data (views, likes, trends, dll).

## Current Available APIs ✅

### Author Articles API
- `GET /api/author/articles` - Get artikel milik author
- Response includes: `judul`, `category`, `tags`, `status`, `publishedAt`, `createdAt`, `updatedAt`
- ❌ **Missing**: `views`, `likes` count per article

### Author Comments API
- `GET /api/author/comments/stats` - Get comment statistics
- Response includes: `totalComments`, `approvedComments`, `flaggedComments`
- ✅ Can be used for total comments stat

### Public Articles API
- `GET /api/public/articles/:id` - Get single article
- Response includes: `views`, `likes`, `isLiked`
- ⚠️ This is public endpoint, not author-specific

---

## Missing APIs - Requirements 🚨

### 1. Get Analytics Overview Stats

**Endpoint:** `GET /api/author/analytics/overview`

**Authentication:** Required (Bearer Token)

**Description:** Get overall analytics statistics untuk author dashboard. Include total views, likes, comments, articles count, dan trend comparison.

**Query Parameters:**
```typescript
{
  period?: '7d' | '30d' | 'all';  // Compare period untuk trend (default: '30d')
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    // Current stats
    totalViews: 12458,              // Sum of all views dari artikel author
    totalLikes: 856,                // Sum of all likes dari artikel author
    totalComments: 342,             // Sum of all comments di artikel author
    publishedArticles: 24,          // Count artikel dengan status 'aktif'
    draftArticles: 3,               // Count artikel dengan status 'nonaktif'
    averageReadTime: 4.5,           // Average reading time (minutes) - OPTIONAL

    // Trend data (comparison dengan previous period)
    trends: {
      views: {
        value: 12,                  // +12% dari period sebelumnya
        direction: "up"             // "up" | "down" | "stable"
      },
      likes: {
        value: 8,                   // +8%
        direction: "up"
      },
      comments: {
        value: 15,                  // +15%
        direction: "up"
      }
    }
  }
}
```

**Business Logic:**
- Query semua artikel dengan `authorId === current_user.id`
- Sum `views` dari semua artikel author
- Sum `likes` dari semua artikel author
- Count comments di artikel author (bisa dari existing comment stats)
- Trend dihitung dengan compare current period vs previous period
  - Misal `period=30d`: compare last 30 days vs previous 30 days

**Notes:**
- Perlu table/field untuk track `views` per article
- Perlu table untuk track `likes` (article_likes)
- Cache result 5-10 menit untuk performance

---

### 2. Get Top Performing Articles

**Endpoint:** `GET /api/author/analytics/top-articles`

**Authentication:** Required (Bearer Token)

**Description:** Get top 5 artikel dengan engagement tertinggi (views, likes, comments).

**Query Parameters:**
```typescript
{
  limit?: number;                      // Default: 5, Max: 20
  sortBy?: 'views' | 'likes' | 'comments' | 'engagement';  // Default: 'views'
  period?: '7d' | '30d' | 'all';      // Filter by time period (default: 'all')
}
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "article-uuid",
      title: "Cara Membuat Aplikasi Web dengan Next.js 15",
      slug: "cara-membuat-aplikasi-web-nextjs-15",
      views: 3245,
      likes: 189,
      comments: 56,                   // Comment count
      publishedAt: "2025-01-05T10:00:00Z",

      // Trend data (comparison dengan previous period)
      trend: {
        direction: "up",              // "up" | "down" | "stable"
        value: 12                     // +12% dari period sebelumnya
      }
    },
    {
      id: "article-uuid-2",
      title: "Panduan Lengkap TypeScript untuk Pemula",
      slug: "panduan-typescript-pemula",
      views: 2891,
      likes: 167,
      comments: 43,
      publishedAt: "2024-12-28T08:00:00Z",
      trend: {
        direction: "up",
        value: 8
      }
    }
    // ... up to limit
  ],
  meta: {
    total: 24                         // Total artikel author
  }
}
```

**Sorting Logic:**
- `sortBy=views`: Order by views DESC
- `sortBy=likes`: Order by likes DESC
- `sortBy=comments`: Order by comments count DESC
- `sortBy=engagement`: Order by weighted score: `(views * 1) + (likes * 5) + (comments * 10)`

**Trend Calculation:**
- Compare views in current period vs previous period
- Example `period=7d`: compare last 7 days vs previous 7 days
- `trend.value` = percentage change
- `trend.direction` = "up" if positive, "down" if negative, "stable" if ±2%

**Notes:**
- Only return artikel dengan status `aktif` (published)
- Filter by `authorId === current_user.id`

---

### 3. Get Views Timeline (Time Series)

**Endpoint:** `GET /api/author/analytics/views-timeline`

**Authentication:** Required (Bearer Token)

**Description:** Get views data over time untuk chart visualization. Return daily aggregated views.

**Query Parameters:**
```typescript
{
  period?: '7d' | '30d' | '90d' | 'all';  // Default: '7d'
  articleId?: string;                      // Optional: filter by specific article
}
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      date: "2025-01-01",             // Format: YYYY-MM-DD
      views: 1234,
      likes: 89,                      // OPTIONAL
      comments: 12                    // OPTIONAL
    },
    {
      date: "2025-01-02",
      views: 1456,
      likes: 95,
      comments: 15
    },
    // ... daily data for the period
  ],
  meta: {
    totalViews: 8765,                 // Sum untuk period
    averageViews: 1252,               // Average per day
    peakDate: "2025-01-05",          // Date dengan views tertinggi
    peakViews: 2045                   // Views di peak date
  }
}
```

**Business Logic:**
- Aggregate views per day untuk artikel author
- Group by date, sum views
- Sort by date ASC (oldest first)
- If `articleId` provided, filter untuk artikel tertentu saja

**Notes:**
- Perlu table untuk track views dengan timestamp (`article_views`)
- Format date konsisten `YYYY-MM-DD`
- Return empty array jika no data

---

### 4. Get Category Performance Stats

**Endpoint:** `GET /api/author/analytics/category-stats`

**Authentication:** Required (Bearer Token)

**Description:** Get performance statistics per category untuk artikel author.

**Query Parameters:**
```typescript
{
  period?: '7d' | '30d' | 'all';      // Default: 'all'
  limit?: number;                      // Default: 10 (top categories)
}
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      category: "Web Development",
      articleCount: 12,               // Jumlah artikel di category ini
      totalViews: 5234,               // Total views artikel di category
      totalLikes: 456,                // Total likes
      totalComments: 123,             // Total comments
      percentage: 42,                 // Percentage dari total views (5234/12458 * 100)
      averageViewsPerArticle: 436     // totalViews / articleCount
    },
    {
      category: "JavaScript",
      articleCount: 8,
      totalViews: 3456,
      totalLikes: 298,
      totalComments: 87,
      percentage: 28,
      averageViewsPerArticle: 432
    },
    // ... sorted by totalViews DESC
  ],
  meta: {
    totalCategories: 7                // Total unique categories author punya
  }
}
```

**Business Logic:**
- Group artikel author by category
- Sum views, likes, comments per category
- Calculate percentage dari total views
- Sort by totalViews DESC
- Limit to top N categories

**Notes:**
- Hanya artikel published (`status = 'aktif'`)
- Percentage dihitung dari sum all views author

---

### 5. Get Article Detail Analytics (OPTIONAL - Nice to Have)

**Endpoint:** `GET /api/author/analytics/articles/:articleId`

**Authentication:** Required (Bearer Token)

**Description:** Get detailed analytics untuk single article.

**Response:**
```typescript
{
  success: true,
  data: {
    article: {
      id: "article-uuid",
      title: "...",
      slug: "...",
      publishedAt: "..."
    },
    stats: {
      views: 3245,
      likes: 189,
      comments: 56,
      shares: 23                      // OPTIONAL - if share tracking implemented
    },
    viewsTimeline: [                  // Last 30 days
      { date: "2025-01-01", views: 120 },
      { date: "2025-01-02", views: 145 }
    ],
    topReferrers: [                   // OPTIONAL - traffic sources
      { source: "Google", visits: 1234 },
      { source: "Direct", visits: 890 }
    ]
  }
}
```

**Notes:**
- Only return data jika article belongs to current author
- Return `403 Forbidden` jika bukan artikel author sendiri

---

## Database Schema Requirements

### 1. Article Views Tracking

Untuk track daily views, perlu table baru:

```sql
CREATE TABLE article_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  viewer_ip VARCHAR(45),              -- IP address (optional, for unique visitor tracking)
  viewer_user_id UUID,                -- User ID jika logged in (optional)
  viewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  date DATE NOT NULL,                 -- For daily aggregation

  -- Prevent duplicate views from same user/IP in short time
  UNIQUE(article_id, viewer_ip, date),

  INDEX idx_article_views_article (article_id),
  INDEX idx_article_views_date (date),
  INDEX idx_article_views_article_date (article_id, date)
);
```

**Alternative (Simple):** Add `views_count` column ke table `articles`:
```sql
ALTER TABLE articles ADD COLUMN views_count INTEGER DEFAULT 0;
```
Tapi cara ini **tidak support** timeline/trend analysis.

### 2. Article Likes Tracking

```sql
CREATE TABLE article_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  liked_at TIMESTAMP NOT NULL DEFAULT NOW(),

  UNIQUE(article_id, user_id),        -- User hanya bisa like 1x per article
  INDEX idx_article_likes_article (article_id),
  INDEX idx_article_likes_user (user_id)
);
```

### 3. Aggregated Stats (Optional - For Performance)

Untuk query cepat, bisa create materialized view atau cache table:

```sql
CREATE TABLE article_stats_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,

  UNIQUE(article_id, date),
  INDEX idx_stats_article (article_id),
  INDEX idx_stats_date (date)
);
```

Update table ini via CRON job atau trigger setiap hari.

---

## API Response Standards

### Success Response
```typescript
{
  success: true,
  data: { /* ... */ },
  meta?: { /* pagination, totals, etc */ }
}
```

### Error Response
```typescript
{
  success: false,
  error: "ERROR_CODE",
  message: "Human readable error message"
}
```

### Common Error Codes
- `UNAUTHORIZED` - No token or invalid token
- `FORBIDDEN` - User tidak punya akses (bukan artikel sendiri)
- `NOT_FOUND` - Resource tidak ditemukan
- `INVALID_PERIOD` - Period parameter invalid

---

## Performance Considerations

### Caching Strategy
- **Overview stats**: Cache 5-10 minutes (stats jarang berubah drastis)
- **Top articles**: Cache 10-15 minutes
- **Views timeline**: Cache 1 hour (historical data tidak berubah)
- **Category stats**: Cache 15 minutes

Use Redis or in-memory cache.

### Query Optimization
- Create proper indexes (sudah listed di schema above)
- Use database aggregation functions (SUM, COUNT, GROUP BY)
- Avoid N+1 queries - use JOINs or batch loading
- Implement pagination untuk large datasets

### Rate Limiting
- Max 60 requests per minute per user untuk analytics endpoints
- Return `429 Too Many Requests` jika exceeded

---

## Implementation Priority

### P0 (Must Have - Sprint 1)
1. ✅ `GET /api/author/analytics/overview` - Dashboard overview stats
2. ✅ `GET /api/author/analytics/top-articles` - Top performing articles
3. ✅ Database: `article_views` table & `article_likes` table

### P1 (Should Have - Sprint 2)
4. ✅ `GET /api/author/analytics/views-timeline` - Views over time chart
5. ✅ `GET /api/author/analytics/category-stats` - Category performance

### P2 (Nice to Have - Future)
6. `GET /api/author/analytics/articles/:id` - Single article detail analytics
7. Real-time view tracking (WebSocket/SSE)
8. Traffic source tracking (referrers)

---

## Testing Checklist

**Endpoint Tests:**
- [ ] Author dapat fetch analytics untuk artikel mereka sendiri
- [ ] Author **TIDAK** dapat fetch analytics artikel author lain
- [ ] Response time < 500ms untuk overview & top articles
- [ ] Response time < 1s untuk timeline queries
- [ ] Trend calculation accurate (compare periods correctly)
- [ ] Pagination works untuk top articles
- [ ] Cache invalidation works correctly
- [ ] Date filtering works (7d, 30d, all)

**Data Integrity:**
- [ ] Views count accurate (no duplicate counting)
- [ ] Likes count accurate (user can only like once)
- [ ] Trend percentages calculated correctly
- [ ] Category stats sum up correctly

**Security:**
- [ ] JWT token validation
- [ ] Author can only access their own data
- [ ] Rate limiting works
- [ ] No SQL injection vulnerabilities

---

## Frontend Integration

Setelah API ready, frontend akan:
1. Create `lib/api/author-analytics.ts` untuk consume endpoints
2. Replace dummy data di `AuthorAnalyticsContent.tsx`
3. Add loading states & error handling
4. Add real-time updates (optional dengan polling/WebSocket)

---

## Example API Calls

### 1. Get Overview
```bash
GET /api/author/analytics/overview?period=30d
Authorization: Bearer {token}
```

### 2. Get Top Articles
```bash
GET /api/author/analytics/top-articles?limit=5&sortBy=views&period=30d
Authorization: Bearer {token}
```

### 3. Get Views Timeline
```bash
GET /api/author/analytics/views-timeline?period=7d
Authorization: Bearer {token}
```

### 4. Get Category Stats
```bash
GET /api/author/analytics/category-stats?limit=10
Authorization: Bearer {token}
```

---

## Questions?

Kalau ada yang kurang jelas atau butuh adjust struktur response, kabari ya! 🚀

**Prepared by:** Frontend Team
**Date:** 2025-10-08
**Related Docs:**
- [AUTHOR_COMMENTS_API_REQUIREMENT.md](./AUTHOR_COMMENTS_API_REQUIREMENT.md)
- [PUBLIC_ARTICLES_API.md](./PUBLIC_ARTICLES_API.md)

---

## Appendix: Sample Dummy Data

Untuk testing, bisa gunakan dummy data ini:

```json
{
  "overview": {
    "totalViews": 12458,
    "totalLikes": 856,
    "totalComments": 342,
    "publishedArticles": 24,
    "draftArticles": 3,
    "trends": {
      "views": { "value": 12, "direction": "up" },
      "likes": { "value": 8, "direction": "up" },
      "comments": { "value": 15, "direction": "up" }
    }
  }
}
```

Full dummy data available in:
`components/dashboard/roles/author/AuthorAnalyticsContent.tsx`
