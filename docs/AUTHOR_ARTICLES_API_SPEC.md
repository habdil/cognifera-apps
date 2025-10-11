# Author Articles API Specification

## Overview
Dokumentasi API untuk sistem manajemen artikel author di dashboard. Sistem ini memungkinkan author untuk membuat, mengedit, melihat, dan menghapus artikel mereka sendiri, serta mengelola draft.

## Frontend Components
- **AuthorArticlesContent**: Halaman list articles dengan tabs (Published/Drafts), search, dan CRUD actions
- **AuthorCreateContent**: Form untuk create/edit artikel dengan rich text editor

## Database Schema

### Table: `articles`
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content fields
  judul VARCHAR(255) NOT NULL,
  konten TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured_image TEXT,
  tags TEXT[], -- Array of strings

  -- Metadata
  status VARCHAR(20) NOT NULL CHECK (status IN ('aktif', 'nonaktif')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,

  -- Indexes
  INDEX idx_author_id (author_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_updated_at (updated_at DESC)
);
```

### Categories (Valid Values)
```
- research-tips
- success-stories
- industry-news
- company-news
- industry
- research
- company
- announcement
```

## API Endpoints

### 1. Get Author's Articles
**GET** `/api/author/articles`

Fetch all articles milik author yang sedang login (filtered by author_id from session/token).

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional): `aktif` | `nonaktif` | `all` (default: `all`)
- `search` (optional): Search by title or tags
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "judul": "Getting Started with Next.js 15",
      "category": "research-tips",
      "featuredImage": "https://...",
      "konten": "<p>Content here...</p>",
      "tags": ["nextjs", "react", "tutorial"],
      "status": "aktif",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 25,
    "limit": 50,
    "offset": 0
  }
}
```

**Response 401:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

---

### 2. Get Single Article
**GET** `/api/author/articles/:id`

Get single article detail. Must verify `author_id` matches authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "judul": "Getting Started with Next.js 15",
    "category": "research-tips",
    "featuredImage": "https://...",
    "konten": "<p>Content here...</p>",
    "tags": ["nextjs", "react", "tutorial"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "publishedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response 403:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this article"
}
```

**Response 404:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Article not found"
}
```

---

### 3. Create Article (Publish)
**POST** `/api/author/articles`

Create new article with status `aktif` (published).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "judul": "Getting Started with Next.js 15",
  "category": "research-tips",
  "featuredImage": "https://..." or "",
  "konten": "<p>Article content with HTML...</p>",
  "tags": ["nextjs", "react", "tutorial"],
  "status": "aktif"
}
```

**Validation Rules:**
- `judul`: Required, max 255 chars
- `category`: Required, must be valid category value
- `konten`: Required, min 10 chars
- `featuredImage`: Optional, must be valid URL if provided
- `tags`: Optional array, max 10 tags
- `status`: Must be `aktif` or `nonaktif`

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "judul": "Getting Started with Next.js 15",
    "category": "research-tips",
    "featuredImage": "https://...",
    "konten": "<p>Article content...</p>",
    "tags": ["nextjs", "react", "tutorial"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "publishedAt": "2024-01-15T10:00:00Z"
  },
  "message": "Article published successfully"
}
```

**Response 400:**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": {
    "judul": "Title is required",
    "category": "Invalid category value"
  }
}
```

---

### 4. Save Draft
**POST** `/api/author/articles/draft`

Create new article with status `nonaktif` (draft). Validation lebih flexible - hanya butuh minimal judul atau konten.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "judul": "Draft Article Title",
  "category": "",
  "featuredImage": "",
  "konten": "<p>Draft content...</p>",
  "tags": [],
  "status": "nonaktif"
}
```

**Validation Rules (Relaxed):**
- `judul` OR `konten`: At least one must be provided
- Other fields optional

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "judul": "Draft Article Title",
    "category": "",
    "featuredImage": "",
    "konten": "<p>Draft content...</p>",
    "tags": [],
    "status": "nonaktif",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "publishedAt": null
  },
  "message": "Draft saved successfully"
}
```

---

### 5. Update Article
**PUT** `/api/author/articles/:id`

Update existing article. Can update draft to published or vice versa.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "judul": "Updated Title",
  "category": "research-tips",
  "featuredImage": "https://...",
  "konten": "<p>Updated content...</p>",
  "tags": ["nextjs", "react"],
  "status": "aktif"
}
```

**Business Logic:**
- If changing status from `nonaktif` → `aktif`: Set `published_at` to NOW() if null
- Always update `updated_at` to NOW()
- Must verify `author_id` matches authenticated user

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "judul": "Updated Title",
    "category": "research-tips",
    "featuredImage": "https://...",
    "konten": "<p>Updated content...</p>",
    "tags": ["nextjs", "react"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T15:30:00Z",
    "publishedAt": "2024-01-15T15:30:00Z"
  },
  "message": "Article updated successfully"
}
```

**Response 403:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to edit this article"
}
```

---

### 6. Delete Article
**DELETE** `/api/author/articles/:id`

Soft delete or hard delete article. Must verify `author_id` matches authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

**Response 403:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to delete this article"
}
```

**Response 404:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Article not found"
}
```

---

## Authentication & Authorization

### Authentication
- All endpoints require valid JWT token in Authorization header
- Token must contain user info: `{ id, email, role }`

### Authorization Rules
1. **Author can only access their own articles**
   - Filter by `author_id = authenticated_user.id`
   - Return 403 if trying to access other author's article

2. **Role-based access:**
   - `AUTHOR` role: Full CRUD on own articles
   - `ADMIN` role: Can access all articles (separate admin endpoints)
   - `READER` role: Read-only access to published articles

## Frontend Integration Points

### 1. AuthorArticlesContent.tsx
**Line 56-98:** Fetch articles on mount
```typescript
useEffect(() => {
  const fetchArticles = async () => {
    const response = await fetch('/api/author/articles', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setArticles(data.data);
  };
  fetchArticles();
}, []);
```

**Line 148-176:** Delete article
```typescript
const response = await fetch(`/api/author/articles/${articleToDelete.id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 2. AuthorCreateContent.tsx
**Line 76-124:** Save draft
```typescript
const response = await fetch('/api/author/articles/draft', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ ...formData, status: 'nonaktif' })
});
```

**Line 126-167:** Publish article
```typescript
const response = await fetch('/api/author/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ ...formData, status: 'aktif' })
});
const data = await response.json();
setPublishedArticleId(data.data.id);
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": {} // Optional, for validation errors
}
```

### HTTP Status Codes
- `200`: Success (GET, PUT, DELETE)
- `201`: Created (POST)
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## Additional Notes

### Image Upload
Frontend currently uses base64 for images (FileReader). Untuk production:
1. Implement image upload endpoint: `POST /api/upload/image`
2. Return image URL
3. Store URL in `featured_image` field

### Rich Text Content
- Frontend uses rich text editor (TipTap/similar)
- Content stored as HTML string in `konten` field
- Backend should sanitize HTML to prevent XSS attacks
- Consider using library like `sanitize-html` (Node.js) or similar

### Search Implementation
- Search by `judul` (title) using `ILIKE %search%`
- Search by `tags` using array contains operator
- Combine with `OR` condition

Example SQL:
```sql
WHERE
  author_id = $1
  AND (
    judul ILIKE '%' || $2 || '%'
    OR $2 = ANY(tags)
  )
```

### Performance Optimization
1. Add indexes on frequently queried columns (author_id, status, created_at)
2. Implement pagination with limit/offset
3. Consider caching for published articles
4. Lazy load article content (fetch list without full `konten` field)

## Testing Checklist

- [ ] Create article with all fields
- [ ] Create article with minimal fields (title + content only)
- [ ] Save draft with partial data
- [ ] Update draft to published
- [ ] Update published article
- [ ] Delete own article
- [ ] Try to access other author's article (should fail)
- [ ] Try to edit other author's article (should fail)
- [ ] Search articles by title
- [ ] Search articles by tag
- [ ] Filter by status (aktif/nonaktif)
- [ ] Pagination with limit/offset
- [ ] Invalid category value (should fail)
- [ ] Empty title and content (should fail for publish, ok for draft)
- [ ] XSS attempt in konten field (should be sanitized)

## Questions?
Contact frontend developer untuk clarification atau adjustments yang diperlukan.
