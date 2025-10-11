# Author Articles API - Quick Reference

## 🎯 Summary
Backend API untuk Author dashboard - manage articles (CRUD, drafts, publish).

## 📋 Endpoints Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/author/articles` | List all author's articles | ✅ Required |
| GET | `/api/author/articles/:id` | Get single article | ✅ Required |
| POST | `/api/author/articles` | Create & publish article | ✅ Required |
| POST | `/api/author/articles/draft` | Save as draft | ✅ Required |
| PUT | `/api/author/articles/:id` | Update article | ✅ Required |
| DELETE | `/api/author/articles/:id` | Delete article | ✅ Required |

## 🗃️ Data Model

```typescript
interface Article {
  id: string;                    // UUID
  author_id: string;             // FK to users table
  judul: string;                 // Title (max 255)
  konten: string;                // HTML content
  category: string;              // One of valid categories
  featuredImage: string;         // Image URL (optional)
  tags: string[];                // Array of tags
  status: 'aktif' | 'nonaktif'; // Published or draft
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  publishedAt: string | null;    // ISO timestamp
}
```

## 📦 Valid Categories
```
research-tips | success-stories | industry-news | company-news
industry | research | company | announcement
```

## 🔐 Authorization Rules
- ✅ Author can only CRUD **their own** articles (`author_id` must match authenticated user)
- ❌ Return `403 Forbidden` if trying to access other author's article
- ✅ Extract `author_id` from JWT token/session

## 🚀 Key Features

### 1. Publish Article (POST /api/author/articles)
- **Strict validation**: judul, category, konten required
- Set `status = 'aktif'`
- Set `publishedAt = NOW()`
- Return created article with ID

### 2. Save Draft (POST /api/author/articles/draft)
- **Relaxed validation**: only need judul OR konten
- Set `status = 'nonaktif'`
- `publishedAt = null`
- Allow empty category, tags, etc.

### 3. Update Article (PUT /api/author/articles/:id)
- Verify ownership (`author_id`)
- If changing `nonaktif` → `aktif`: Set `publishedAt = NOW()` if null
- Always update `updatedAt = NOW()`

### 4. Delete Article (DELETE /api/author/articles/:id)
- Verify ownership
- Soft or hard delete (your choice)

### 5. List Articles (GET /api/author/articles)
- Filter by `author_id` automatically
- Optional query params:
  - `status=aktif|nonaktif|all`
  - `search=keyword` (search title & tags)
  - `limit=50` & `offset=0` (pagination)
- Sort by `updatedAt DESC`

## 📝 Example Requests

### Create Published Article
```bash
POST /api/author/articles
Authorization: Bearer {token}
Content-Type: application/json

{
  "judul": "My First Article",
  "category": "research-tips",
  "konten": "<p>Article content...</p>",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["nextjs", "react"],
  "status": "aktif"
}
```

### Save Draft
```bash
POST /api/author/articles/draft
Authorization: Bearer {token}
Content-Type: application/json

{
  "judul": "Draft Title",
  "konten": "<p>Some draft content...</p>",
  "category": "",
  "tags": [],
  "status": "nonaktif"
}
```

### Get Author's Articles
```bash
GET /api/author/articles?status=aktif&search=nextjs&limit=20
Authorization: Bearer {token}
```

### Delete Article
```bash
DELETE /api/author/articles/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer {token}
```

## 🛡️ Security Checklist
- [x] Validate JWT token on all endpoints
- [x] Verify `author_id` matches authenticated user
- [x] Sanitize HTML in `konten` field (prevent XSS)
- [x] Validate category against allowed values
- [x] Rate limiting on POST/PUT endpoints
- [x] Input validation (length, format, etc.)

## 🔍 Database Indexes
```sql
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_updated_at ON articles(updated_at DESC);
```

## 📊 Response Format

### Success
```json
{
  "success": true,
  "data": { /* article object or array */ },
  "message": "Operation completed successfully",
  "meta": { /* optional: pagination info */ }
}
```

### Error
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable message",
  "details": { /* optional: validation errors */ }
}
```

## 🎨 Frontend Integration

Frontend sudah siap dengan:
- Form validation
- Loading states
- Success/error toasts
- Draft auto-save flow
- Tab-based navigation (Published/Drafts)

Backend tinggal implement endpoints sesuai spec ini dan frontend akan langsung connect.

## 📚 Full Documentation
Lihat `AUTHOR_ARTICLES_API_SPEC.md` untuk dokumentasi lengkap dengan:
- Detailed request/response examples
- Complete validation rules
- SQL schema
- Error handling
- Testing checklist

## 🤝 Integration Steps

1. **Setup database table** (see schema in full spec)
2. **Implement 6 endpoints** (as listed above)
3. **Add authentication middleware** (JWT verification)
4. **Add authorization check** (verify author_id)
5. **Test with frontend** (use mock data first, then real API)
6. **Deploy & monitor**

## 💡 Tips
- Start with GET endpoint (easiest)
- Use transaction for POST/PUT operations
- Log errors for debugging
- Return clear error messages
- Consider using ORM (Prisma, TypeORM, etc.)

---
**Need help?** Contact frontend developer untuk sync atau clarification.
