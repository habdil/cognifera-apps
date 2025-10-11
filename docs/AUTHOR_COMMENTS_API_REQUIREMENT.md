# Author Comments API - Backend Requirement

## Overview
Saat ini API comments yang ada sudah bagus untuk publik (fetch comments per artikel), tapi kita butuh endpoint khusus untuk **Author Dashboard** agar author bisa manage semua komentar di artikel-artikel mereka secara efisien.

## Current API (Already Available) ✅

### Public Comments API
- `GET /api/public/articles/:articleId/comments` - Get comments untuk 1 artikel
- `POST /api/public/articles/:articleId/comments` - Post comment baru
- `DELETE /api/public/articles/comments/:commentId` - Delete comment (owner/admin)
- `POST /api/public/articles/comments/:commentId/like` - Like/unlike comment

### Author Articles API
- `GET /api/author/articles` - Get artikel milik author
- `POST /api/author/articles` - Create artikel
- `PUT /api/author/articles/:id` - Update artikel
- `DELETE /api/author/articles/:id` - Delete artikel

## Missing APIs - Requirement 🚨

Untuk Author Dashboard > Comments Section, kita butuh:

---

### 1. Get All Comments on Author's Articles

**Endpoint:** `GET /api/author/comments`

**Authentication:** Required (Bearer Token)

**Description:** Get semua komentar dari artikel-artikel yang ditulis oleh author yang sedang login.

**Query Parameters:**
```typescript
{
  status?: 'read' | 'unread' | 'all';  // Filter by read status (default: 'all')
  articleId?: string;                   // Filter by specific article
  search?: string;                      // Search in comment content
  sortBy?: 'newest' | 'oldest' | 'mostLiked'; // Sort order (default: 'newest')
  limit?: number;                       // Items per page (default: 20, max: 100)
  offset?: number;                      // Pagination offset (default: 0)
}
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "comment-uuid",
      articleId: "article-uuid",
      articleTitle: "Judul Artikel",  // Include untuk context
      content: "Isi komentar...",
      author: {
        id: "user-uuid",
        name: "John Doe",
        avatar: "https://...",
        email: "john@example.com" // optional
      },
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: "2025-01-15T10:30:00Z",
      parentId: null,                 // null = root comment, string = reply
      likes: 5,
      isRead: false,                  // NEW FIELD - apakah author sudah baca
      replies: []                     // Array of nested replies (optional, bisa flat juga)
    }
  ],
  meta: {
    total: 150,
    limit: 20,
    offset: 0,
    unreadCount: 12                   // NEW - jumlah unread comments
  }
}
```

**Notes:**
- Hanya return komentar dari artikel yang `authorId === current_user.id`
- Include artikel title untuk context di UI
- Field `isRead` track apakah author sudah baca komentar ini

---

### 2. Mark Comment as Read

**Endpoint:** `PATCH /api/author/comments/:commentId/read`

**Authentication:** Required (Bearer Token)

**Description:** Tandai komentar sudah dibaca oleh author.

**Request Body:** (empty atau optional)
```typescript
{
  isRead: true  // optional, default true
}
```

**Response:**
```typescript
{
  success: true,
  message: "Comment marked as read",
  data: {
    commentId: "comment-uuid",
    isRead: true
  }
}
```

**Notes:**
- Hanya bisa mark read komentar di artikel milik author sendiri
- Return 403 Forbidden jika bukan artikel milik author
- Bisa bulk operation dengan array `commentIds: string[]`

---

### 3. Get Author Comments Statistics

**Endpoint:** `GET /api/author/comments/stats`

**Authentication:** Required (Bearer Token)

**Description:** Get statistik komentar untuk dashboard author.

**Response:**
```typescript
{
  success: true,
  data: {
    totalComments: 150,               // Total semua komentar di artikel author
    unreadComments: 12,               // Komentar yang belum dibaca
    todayComments: 5,                 // Komentar hari ini
    thisWeekComments: 23,             // Komentar minggu ini
    averageCommentsPerArticle: 3.2,   // Rata-rata komentar per artikel
    mostCommentedArticle: {           // Artikel dengan komentar terbanyak
      id: "article-uuid",
      title: "Judul Artikel",
      commentCount: 45
    },
    recentActivity: [                 // 5 komentar terbaru
      {
        id: "comment-uuid",
        articleTitle: "...",
        author: { name: "..." },
        content: "...",
        createdAt: "..."
      }
    ]
  }
}
```

**Notes:**
- Untuk display di dashboard overview/stats cards
- Data di-cache 5-10 menit untuk performance

---

### 4. Reply to Comment (Optional - Bisa pakai endpoint existing)

Sebenarnya bisa pakai endpoint yang sudah ada:
```
POST /api/public/articles/:articleId/comments
Body: { content: "...", parentId: "parent-comment-id" }
```

Tapi kalau mau endpoint khusus author:

**Endpoint:** `POST /api/author/comments/:commentId/reply`

**Authentication:** Required (Bearer Token)

**Description:** Author reply komentar di artikel mereka.

**Request Body:**
```typescript
{
  content: string;  // Max 2000 characters
}
```

**Response:**
```typescript
{
  success: true,
  message: "Reply posted successfully",
  data: {
    // Comment object dengan parentId set
  }
}
```

---

### 5. Bulk Mark as Read (Optional but Recommended)

**Endpoint:** `PATCH /api/author/comments/bulk/read`

**Authentication:** Required (Bearer Token)

**Request Body:**
```typescript
{
  commentIds: string[];  // Array of comment IDs
  isRead: true
}
```

**Response:**
```typescript
{
  success: true,
  message: "5 comments marked as read",
  data: {
    updated: 5,
    failed: 0
  }
}
```

---

## Database Schema Changes Required

### Add `comment_reads` Table (Recommended Approach)

Untuk track read status per author:

```sql
CREATE TABLE comment_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

CREATE INDEX idx_comment_reads_user ON comment_reads(user_id);
CREATE INDEX idx_comment_reads_comment ON comment_reads(comment_id);
```

**Atau alternatif sederhana:** Tambah kolom `is_read` di table `comments` (tapi kurang flexible untuk multi-author)

---

## Implementation Priority

**P0 (Must Have):**
1. ✅ GET `/api/author/comments` - List all comments
2. ✅ GET `/api/author/comments/stats` - Statistics

**P1 (Should Have):**
3. ✅ PATCH `/api/author/comments/:id/read` - Mark as read
4. ✅ PATCH `/api/author/comments/bulk/read` - Bulk mark as read

**P2 (Nice to Have):**
5. POST `/api/author/comments/:id/reply` - Dedicated reply endpoint (bisa pakai yang existing)

---

## Security & Authorization

- Semua endpoint harus validate JWT token
- Author **HANYA** bisa access komentar di artikel milik mereka sendiri
- Return `403 Forbidden` jika author coba access komentar di artikel orang lain
- Rate limiting: max 100 requests per minute per user

---

## Testing Checklist

- [ ] Author bisa fetch semua komentar di artikel mereka
- [ ] Author **TIDAK** bisa fetch komentar di artikel author lain
- [ ] Filter by status (read/unread) works
- [ ] Filter by articleId works
- [ ] Pagination works correctly
- [ ] Mark as read only works untuk artikel sendiri
- [ ] Stats endpoint return correct counts
- [ ] Response time < 500ms untuk list endpoint (with pagination)

---

## Frontend Integration

Setelah API ready, frontend akan:
1. Create `lib/api/author-comments.ts` untuk consume endpoints ini
2. Build `AuthorCommentsContent` component untuk dashboard
3. Display notifications untuk unread comments
4. Add real-time updates (optional dengan WebSocket/polling)

---

## Questions?

Kalau ada yang kurang jelas atau butuh adjust struktur response, kabari ya! 🚀

**Prepared by:** Frontend Team
**Date:** 2025-10-08
**Related Docs:**
- [COMMENTS_LIKES_INTEGRATION.md](./COMMENTS_LIKES_INTEGRATION.md)
- [BACKEND_DEBUG_COMMENTS_AUTH.md](./BACKEND_DEBUG_COMMENTS_AUTH.md)
