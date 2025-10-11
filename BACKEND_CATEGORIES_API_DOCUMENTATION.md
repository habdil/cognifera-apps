# Backend API Documentation - Public Categories Endpoint

## Overview
Dokumentasi ini menjelaskan endpoint yang diperlukan di backend untuk mendukung **Dynamic Categories** di frontend. Categories akan diambil dari database, sehingga admin bisa manage categories tanpa perlu redeploy frontend.

---

## Database Schema Reference

Anda sudah memiliki schema berikut di database:

```prisma
model Category {
  id          String  @id @default(cuid())
  name        String  @unique
  slug        String  @unique
  description String?
  color       String? // Hex color for UI
  icon        String? // Icon name or URL
  is_active   Boolean @default(true)
  sort_order  Int     @default(0)

  // SEO
  meta_title       String?
  meta_description String?

  // Analytics
  articles_count Int @default(0) // Denormalized counter

  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  articles Article[]

  @@index([slug])
  @@index([is_active])
  @@index([sort_order])
  @@map("categories")
}
```

---

## Required API Endpoint

### Endpoint: Get Public Categories

```
GET /api/public/categories
```

#### Description
Fetch all active categories sorted by `sort_order`. This endpoint is **public** (no authentication required) and used to populate category filters in the news page.

#### Query Parameters
None (all active categories are returned)

#### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

#### Backend Logic (Pseudocode)

```typescript
// GET /api/public/categories
async function getPublicCategories(req, res) {
  try {
    // Fetch only active categories
    const categories = await prisma.category.findMany({
      where: {
        is_active: true
      },
      orderBy: {
        sort_order: 'asc' // Sort by sort_order (ascending)
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        color: true,
        icon: true,
        is_active: true,
        sort_order: true,
        articles_count: true,
        meta_title: true,
        meta_description: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.json({
      success: true,
      data: categories,
      meta: {
        total: categories.length
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      error: 'FETCH_FAILED',
      message: 'Failed to fetch categories'
    });
  }
}
```

#### Response Format (Success)

```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "name": "industry",
      "slug": "industry",
      "description": "Industry News",
      "color": "#3B82F6",
      "icon": "briefcase",
      "isActive": true,
      "sortOrder": 1,
      "articlesCount": 42,
      "metaTitle": "Industry News - Cognifera",
      "metaDescription": "Latest news and insights from the industry",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "clx456def",
      "name": "research",
      "slug": "research",
      "description": "Research News",
      "color": "#8B5CF6",
      "icon": "microscope",
      "isActive": true,
      "sortOrder": 2,
      "articlesCount": 38,
      "metaTitle": "Research News - Cognifera",
      "metaDescription": "Latest research findings and academic news",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-20T14:20:00.000Z"
    },
    {
      "id": "clx789ghi",
      "name": "company",
      "slug": "company",
      "description": "Company News",
      "color": "#F97316",
      "icon": "building",
      "isActive": true,
      "sortOrder": 3,
      "articlesCount": 25,
      "metaTitle": "Company News - Cognifera",
      "metaDescription": "Updates and announcements from Cognifera",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-02-01T09:15:00.000Z"
    }
  ],
  "meta": {
    "total": 3
  }
}
```

#### Response Format (Error)

```json
{
  "success": false,
  "error": "FETCH_FAILED",
  "message": "Failed to fetch categories"
}
```

---

## Field Mapping (Database → Frontend)

Frontend expects fields in **camelCase**, so backend should transform `snake_case` to `camelCase`:

| Database Field (snake_case) | Frontend Field (camelCase) | Type    | Required | Description                        |
|-----------------------------|----------------------------|---------|----------|------------------------------------|
| `id`                        | `id`                       | string  | ✅       | Unique category ID                 |
| `name`                       | `name`                     | string  | ✅       | Category name (e.g., "industry")   |
| `slug`                       | `slug`                     | string  | ✅       | URL-safe slug (e.g., "industry")   |
| `description`                | `description`              | string? | ❌       | Human-readable name for display    |
| `color`                      | `color`                    | string? | ❌       | Hex color code (e.g., "#3B82F6")   |
| `icon`                       | `icon`                     | string? | ❌       | Icon name or URL                   |
| `is_active`                  | `isActive`                 | boolean | ✅       | Whether category is active         |
| `sort_order`                 | `sortOrder`                | number  | ✅       | Display order (ascending)          |
| `articles_count`             | `articlesCount`            | number  | ✅       | Number of articles in category     |
| `meta_title`                 | `metaTitle`                | string? | ❌       | SEO title                          |
| `meta_description`           | `metaDescription`          | string? | ❌       | SEO description                    |
| `created_at`                 | `createdAt`                | string  | ✅       | ISO 8601 datetime                  |
| `updated_at`                 | `updatedAt`                | string  | ✅       | ISO 8601 datetime                  |

---

## Frontend Integration

### How Frontend Uses This Endpoint

1. **On Page Load**: Frontend calls `GET /api/public/categories`
2. **Sort by `sortOrder`**: Categories are sorted by `sortOrder` (ascending)
3. **Filter by `isActive: true`**: Only active categories are displayed
4. **Display in Dropdown**: Categories populate the filter dropdown
5. **Show Article Count**: `articlesCount` shown next to category name (e.g., "Industry News (42)")
6. **Use `slug` for Filtering**: When user selects category, frontend filters articles using `slug` field

### Example Frontend Usage

```typescript
// Fetch categories
const response = await fetch('/api/public/categories');
const data = await response.json();

// Display in UI
data.data.forEach(category => {
  console.log(`${category.description} (${category.articlesCount})`);
  // Output: "Industry News (42)"
});

// Filter articles by selected category
const selectedSlug = "industry";
const articlesResponse = await fetch(`/api/public/articles?category=${selectedSlug}`);
```

---

## Caching Strategy

### Backend Caching (Recommended)
Since categories don't change frequently, you can add caching:

```typescript
// Example with Redis
const CACHE_KEY = 'public:categories';
const CACHE_TTL = 300; // 5 minutes

async function getPublicCategories(req, res) {
  // Try to get from cache first
  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // Fetch from database
  const categories = await prisma.category.findMany({ /* ... */ });

  const response = {
    success: true,
    data: categories,
    meta: { total: categories.length }
  };

  // Cache for 5 minutes
  await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(response));

  return res.json(response);
}

// Clear cache when category is updated (in admin endpoints)
async function updateCategory(req, res) {
  // ... update category ...
  await redis.del('public:categories'); // Clear cache
}
```

### Frontend Caching
Frontend already implements Next.js caching:
```typescript
// Revalidate every 5 minutes
fetch(url, { next: { revalidate: 300 } })
```

---

## Articles Count Synchronization

### Option 1: Real-time Counter (Recommended)
Update `articles_count` when articles are created/deleted:

```typescript
// When creating an article
await prisma.$transaction([
  prisma.article.create({ /* article data */ }),
  prisma.category.update({
    where: { id: categoryId },
    data: { articles_count: { increment: 1 } }
  })
]);

// When deleting an article
await prisma.$transaction([
  prisma.article.delete({ where: { id: articleId } }),
  prisma.category.update({
    where: { id: categoryId },
    data: { articles_count: { decrement: 1 } }
  })
]);
```

### Option 2: Batch Recalculation (Nightly Job)
Run a cron job to recalculate counts:

```typescript
// Run daily at midnight
async function recalculateCategoryCounts() {
  const categories = await prisma.category.findMany();

  for (const category of categories) {
    const count = await prisma.article.count({
      where: {
        categoryId: category.id,
        status: 'published' // Only count published articles
      }
    });

    await prisma.category.update({
      where: { id: category.id },
      data: { articles_count: count }
    });
  }
}
```

---

## Security Considerations

### ✅ Safe to Expose (Public Endpoint)
- `id`, `name`, `slug`, `description`
- `color`, `icon`, `isActive`, `sortOrder`
- `articlesCount` (denormalized counter)
- `createdAt`, `updatedAt`

### ⚠️ Optional (Based on Needs)
- `metaTitle`, `metaDescription` (useful for SEO but not critical)

### ❌ DO NOT Expose
- Internal admin fields (if any)
- Soft-deleted categories (where `is_active: false`)

---

## Testing Checklist

### Backend Testing
- [ ] Endpoint returns only `is_active: true` categories
- [ ] Categories sorted by `sort_order` (ascending)
- [ ] Response matches expected JSON format
- [ ] Field names in camelCase (not snake_case)
- [ ] `articlesCount` is accurate
- [ ] Empty array returned if no categories exist
- [ ] Caching works correctly (if implemented)
- [ ] Cache invalidation on category update (if implemented)

### Integration Testing
- [ ] Frontend successfully fetches categories
- [ ] Category dropdown populates correctly
- [ ] Article count displayed next to category name
- [ ] Filtering articles by category slug works
- [ ] Fallback categories shown if API fails
- [ ] Loading state shown while fetching

---

## Example API Requests & Responses

### Request 1: Get All Categories (Success)

**Request:**
```bash
curl -X GET 'https://api.cognifera.com/public/categories' \
  -H 'Content-Type: application/json'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "name": "industry",
      "slug": "industry",
      "description": "Industry News",
      "color": "#3B82F6",
      "icon": "briefcase",
      "isActive": true,
      "sortOrder": 1,
      "articlesCount": 42,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "total": 1
  }
}
```

### Request 2: No Categories Exist

**Response (200 OK):**
```json
{
  "success": true,
  "data": [],
  "meta": {
    "total": 0
  }
}
```

### Request 3: Server Error

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "FETCH_FAILED",
  "message": "Failed to fetch categories"
}
```

---

## Migration Notes

If you already have hardcoded categories in the frontend, you need to:

1. **Insert categories into database** with correct `slug` values:
   ```sql
   INSERT INTO categories (id, name, slug, description, is_active, sort_order) VALUES
   ('clx1', 'industry', 'industry', 'Industry News', true, 1),
   ('clx2', 'research', 'research', 'Research News', true, 2),
   ('clx3', 'company', 'company', 'Company News', true, 3),
   ('clx4', 'announcement', 'announcement', 'Pengumuman', true, 4);
   ```

2. **Ensure article filtering uses `slug`** not category `id`:
   ```typescript
   // Articles endpoint should filter by slug
   GET /api/public/articles?category=industry  // ✅ Use slug
   GET /api/public/articles?category=clx123    // ❌ Don't use id
   ```

3. **Update articles endpoint** to support slug-based filtering:
   ```typescript
   const categoryFilter = req.query.category
     ? { category: { slug: req.query.category } }
     : {};

   const articles = await prisma.article.findMany({
     where: {
       ...categoryFilter,
       status: 'published'
     }
   });
   ```

---

## Contact & Questions

Jika ada pertanyaan atau butuh klarifikasi lebih lanjut tentang implementasi ini, silakan kontak frontend developer.

**Frontend Implementation Status**: ✅ DONE
**Backend Implementation Status**: ⏳ PENDING

---

## Summary

### What Frontend Needs:

**Single Endpoint:**
```
GET /api/public/categories
```

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "description": "string | null",
      "color": "string | null",
      "icon": "string | null",
      "isActive": boolean,
      "sortOrder": number,
      "articlesCount": number,
      "createdAt": "ISO 8601 string",
      "updatedAt": "ISO 8601 string"
    }
  ],
  "meta": {
    "total": number
  }
}
```

**Key Requirements:**
1. ✅ Return only `is_active: true` categories
2. ✅ Sort by `sort_order` ascending
3. ✅ Use `camelCase` for field names (not `snake_case`)
4. ✅ Include accurate `articlesCount` per category
5. ✅ Public endpoint (no authentication required)
6. ✅ Cache response for performance (optional but recommended)

**Frontend will:**
1. ✅ Fetch categories on page load
2. ✅ Display in dropdown filter with article counts
3. ✅ Use `slug` to filter articles when category selected
4. ✅ Fall back to hardcoded categories if API fails

That's it! Simple single endpoint. 🎯
