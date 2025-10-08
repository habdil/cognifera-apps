# Author Comments API Documentation

API untuk Author mengelola comments di artikel mereka.

## Base URL
```
/api/author/comments
```

## Authentication
Semua endpoint memerlukan:
- **Authorization Header**: `Bearer <access_token>`
- **Role**: `AUTHOR` atau `ADMIN`

---

## Endpoints

### 1. Get All Comments (List & Filter)

**Priority**: 0 (Must Have)

```http
GET /api/author/comments
```

**Description**: Mendapatkan semua comments di artikel milik author dengan filter dan pagination.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `articleId` | string | No | - | Filter berdasarkan artikel tertentu |
| `status` | enum | No | `all` | Filter status: `approved`, `flagged`, `all` |
| `page` | number | No | `1` | Halaman pagination |
| `limit` | number | No | `10` | Jumlah item per halaman |
| `sortBy` | enum | No | `newest` | Sorting: `newest`, `oldest`, `most_liked` |
| `search` | string | No | - | Search dalam content comment |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "clxxx123",
        "content": "Great article! Very helpful.",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "isApproved": true,
        "isFlagged": false,
        "likesCount": 5,
        "repliesCount": 2,
        "article": {
          "id": "clxxx456",
          "title": "Introduction to React Hooks",
          "slug": "introduction-to-react-hooks"
        },
        "user": {
          "id": "clxxx789",
          "fullName": "John Doe",
          "avatarUrl": "https://example.com/avatar.jpg",
          "email": "john@example.com"
        },
        "parent": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 10
    }
  }
}
```

#### Example Requests

```javascript
// Get all comments
GET /api/author/comments

// Get comments untuk artikel tertentu
GET /api/author/comments?articleId=clxxx456

// Get flagged comments saja
GET /api/author/comments?status=flagged

// Get dengan pagination
GET /api/author/comments?page=2&limit=20

// Search dalam content
GET /api/author/comments?search=react

// Kombinasi filters
GET /api/author/comments?articleId=clxxx456&status=approved&sortBy=most_liked&page=1&limit=10
```

---

### 2. Get Comment Statistics

**Priority**: 0 (Must Have)

```http
GET /api/author/comments/stats
```

**Description**: Mendapatkan statistik comments untuk dashboard author.

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "totalComments": 150,
    "approvedComments": 140,
    "flaggedComments": 10,
    "totalReplies": 45,
    "commentsThisWeek": 23,
    "commentsThisMonth": 67
  }
}
```

#### Example Request

```javascript
GET /api/author/comments/stats
```

---

### 3. Get Comment Detail

**Priority**: 1 (Should Have)

```http
GET /api/author/comments/:id
```

**Description**: Mendapatkan detail 1 comment dengan nested replies.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Comment ID |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "id": "clxxx123",
    "content": "Great article! Very helpful.",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "isApproved": true,
    "isFlagged": false,
    "likesCount": 5,
    "repliesCount": 2,
    "article": {
      "id": "clxxx456",
      "title": "Introduction to React Hooks",
      "slug": "introduction-to-react-hooks"
    },
    "user": {
      "id": "clxxx789",
      "fullName": "John Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "email": "john@example.com"
    },
    "parent": null,
    "replies": [
      {
        "id": "clxxx124",
        "content": "Thanks for reading!",
        "createdAt": "2024-01-15T11:00:00Z",
        "updatedAt": "2024-01-15T11:00:00Z",
        "isApproved": true,
        "isFlagged": false,
        "likesCount": 2,
        "repliesCount": 0,
        "article": {
          "id": "clxxx456",
          "title": "Introduction to React Hooks",
          "slug": "introduction-to-react-hooks"
        },
        "user": {
          "id": "clxxx999",
          "fullName": "Author Name",
          "avatarUrl": "https://example.com/author.jpg",
          "email": "author@example.com"
        }
      }
    ]
  }
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Comment not found or not accessible"
}
```

#### Example Request

```javascript
GET /api/author/comments/clxxx123
```

---

### 4. Flag Comment

**Priority**: 1 (Should Have)

```http
PATCH /api/author/comments/:id/flag
```

**Description**: Flag comment sebagai inappropriate (spam, offensive, dll).

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Comment ID |

#### Request Body

```json
{
  "reason": "Spam content" // Optional
}
```

#### Response Success (200)

```json
{
  "success": true,
  "message": "Comment flagged successfully"
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Comment not found or not accessible"
}
```

#### Example Request

```javascript
PATCH /api/author/comments/clxxx123/flag
Content-Type: application/json

{
  "reason": "Contains inappropriate language"
}
```

---

### 5. Delete Comment

**Priority**: 1 (Should Have)

```http
DELETE /api/author/comments/:id
```

**Description**: Soft delete comment (author dapat menghapus comment di artikel mereka sendiri).

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Comment ID |

#### Response Success (200)

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Comment not found or not accessible"
}
```

#### Example Request

```javascript
DELETE /api/author/comments/clxxx123
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

**Cause**: Token tidak valid atau tidak ada

---

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

**Cause**: User bukan AUTHOR atau ADMIN

---

### 400 Validation Error

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["articleId"],
      "message": "Required"
    }
  ]
}
```

**Cause**: Request body atau query params tidak valid

---

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Failed to get comments"
}
```

**Cause**: Server error

---

## Frontend Integration Examples

### React/Next.js Example

```typescript
// services/authorCommentService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isFlagged: boolean;
  likesCount: number;
  repliesCount: number;
  article: {
    id: string;
    title: string;
    slug: string;
  };
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    email: string;
  };
  parent?: {
    id: string;
    content: string;
  } | null;
}

export interface CommentListResponse {
  comments: Comment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CommentStats {
  totalComments: number;
  approvedComments: number;
  flaggedComments: number;
  totalReplies: number;
  commentsThisWeek: number;
  commentsThisMonth: number;
}

// 1. Get all comments with filters
export const getAuthorComments = async (
  token: string,
  params?: {
    articleId?: string;
    status?: 'approved' | 'flagged' | 'all';
    page?: number;
    limit?: number;
    sortBy?: 'newest' | 'oldest' | 'most_liked';
    search?: string;
  }
): Promise<CommentListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/author/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data.data;
};

// 2. Get comment statistics
export const getCommentStats = async (token: string): Promise<CommentStats> => {
  const response = await axios.get(`${API_BASE_URL}/author/comments/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// 3. Get comment detail
export const getCommentDetail = async (
  token: string,
  commentId: string
): Promise<Comment> => {
  const response = await axios.get(`${API_BASE_URL}/author/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// 4. Flag comment
export const flagComment = async (
  token: string,
  commentId: string,
  reason?: string
): Promise<void> => {
  await axios.patch(
    `${API_BASE_URL}/author/comments/${commentId}/flag`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 5. Delete comment
export const deleteComment = async (
  token: string,
  commentId: string
): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/author/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
```

### Usage in Component

```typescript
// components/AuthorCommentsDashboard.tsx
import { useEffect, useState } from 'react';
import { getAuthorComments, getCommentStats, flagComment, deleteComment } from '@/services/authorCommentService';

export default function AuthorCommentsDashboard() {
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    page: 1,
    limit: 10,
    sortBy: 'newest',
  });

  const token = 'your-access-token'; // Get from auth context

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [commentsData, statsData] = await Promise.all([
        getAuthorComments(token, filters),
        getCommentStats(token),
      ]);
      setComments(commentsData.comments);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlagComment = async (commentId: string) => {
    try {
      await flagComment(token, commentId, 'Inappropriate content');
      alert('Comment flagged successfully');
      loadData(); // Reload data
    } catch (error) {
      console.error('Failed to flag comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(token, commentId);
      alert('Comment deleted successfully');
      loadData(); // Reload data
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Comments Dashboard</h1>

      {/* Statistics */}
      {stats && (
        <div className="stats">
          <div>Total: {stats.totalComments}</div>
          <div>Approved: {stats.approvedComments}</div>
          <div>Flagged: {stats.flaggedComments}</div>
          <div>This Week: {stats.commentsThisWeek}</div>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="flagged">Flagged</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most_liked">Most Liked</option>
        </select>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <img src={comment.user.avatarUrl} alt={comment.user.fullName} />
              <div>
                <strong>{comment.user.fullName}</strong>
                <span>{comment.article.title}</span>
              </div>
            </div>
            <p>{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => handleFlagComment(comment.id)}>
                Flag
              </button>
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </div>
            <div className="comment-meta">
              <span>❤️ {comment.likesCount}</span>
              <span>💬 {comment.repliesCount}</span>
              {comment.isFlagged && <span className="badge">Flagged</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={filters.page === 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
        >
          Previous
        </button>
        <span>Page {filters.page}</span>
        <button
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## Notes

1. **Authorization**: Semua endpoint wajib pakai token. Author hanya bisa akses comments di artikel mereka sendiri.
2. **Soft Delete**: Delete tidak permanent, hanya set `deleted_at`. Admin masih bisa recover jika perlu.
3. **Flag vs Delete**: Flag untuk moderation review, Delete untuk hapus permanent.
4. **Pagination**: Default 10 items per page, max bisa disesuaikan.
5. **Real-time**: Untuk real-time updates, pertimbangkan pakai WebSocket atau polling.

---

## Testing

### Using cURL

```bash
# Set your token
TOKEN="your-access-token-here"

# 1. Get all comments
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/comments

# 2. Get stats
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/comments/stats

# 3. Get comment detail
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/comments/clxxx123

# 4. Flag comment
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Spam"}' \
  http://localhost:5000/api/author/comments/clxxx123/flag

# 5. Delete comment
curl -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/author/comments/clxxx123
```

---

## Changelog

- **v1.0.0** (2024-01-15): Initial release
  - 5 endpoints implemented
  - Filter, pagination, sorting
  - Statistics dashboard
  - Flag & delete functionality
