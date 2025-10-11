# 💬 Comments & Likes API Integration

## ✅ Status: READY TO USE

Frontend integration untuk comment system dan like features pada artikel.

---

## 📋 Summary of Changes

### 1. Updated API Layer ([lib/api/comments.ts](../lib/api/comments.ts))

**Key Updates:**
- ✅ Updated all endpoints to match backend documentation
- ✅ Added validation for 2000 character limit
- ✅ Added `toggleArticleLike()` function for article likes
- ✅ Improved error handling with proper error types
- ✅ Added `ApiResponse<T>` type for consistent responses

**New Functions:**
- `fetchComments(articleId)` - Get all comments for article
- `postComment(data)` - Post new comment or reply (max 2000 chars)
- `deleteComment(commentId)` - Delete comment (soft delete)
- `toggleCommentLike(commentId)` - Like/unlike comment
- `toggleArticleLike(articleId)` - **NEW:** Like/unlike article

**Helper Functions:**
- `buildCommentTree(comments)` - Build nested comment structure
- `formatRelativeTime(dateString)` - Format relative time ("2 hours ago")
- `getAuthToken()` - Get auth token from localStorage

### 2. Updated Comment Section UI ([components/news/CommentSection.tsx](../components/news/CommentSection.tsx))

**Key Updates:**
- ✅ Changed character limit from 500 to 2000
- ✅ Added red text warning when exceeding limit
- ✅ Disabled submit button when over limit

---

## 🔧 API Endpoints (Backend)

### Comment Endpoints

```typescript
// Get comments (optional auth)
GET /api/public/articles/:articleId/comments

// Post comment (requires auth)
POST /api/public/articles/:articleId/comments
Body: { content: string, parentId?: string | null }

// Delete comment (requires auth, owner/admin only)
DELETE /api/public/articles/comments/:commentId

// Like/unlike comment (requires auth)
POST /api/public/articles/comments/:commentId/like
```

### Like Endpoints

```typescript
// Like/unlike article (requires auth)
POST /api/public/articles/:id/like
```

---

## 💻 Frontend Usage Examples

### 1. Post a Comment

```typescript
import { postComment } from '@/lib/api/comments';

const result = await postComment({
  articleId: 'article_id_123',
  content: 'Great article!',
  parentId: null  // or parent comment ID for reply
});

if (result.success) {
  console.log('Comment posted!', result.data);
} else {
  console.error(result.message);
}
```

### 2. Like a Comment

```typescript
import { toggleCommentLike } from '@/lib/api/comments';

const result = await toggleCommentLike('comment_id_456');

if (result.success) {
  console.log('New like count:', result.data.likes);
  console.log('User liked:', result.data.isLiked);
}
```

### 3. Like an Article

```typescript
import { toggleArticleLike } from '@/lib/api/comments';

const result = await toggleArticleLike('article_id_789');

if (result.success) {
  console.log('New like count:', result.data.likes);
  console.log('User liked:', result.data.isLiked);
}
```

### 4. Delete a Comment

```typescript
import { deleteComment } from '@/lib/api/comments';

const result = await deleteComment('comment_id_123');

if (result.success) {
  console.log('Comment deleted');
} else {
  console.error(result.message);
}
```

---

## 🔐 Authentication

All write operations (create, delete, like) require authentication:

```typescript
// Token stored in localStorage
const token = localStorage.getItem('cognifera_new_access_token');

// Automatically included in API calls
Authorization: Bearer <token>
```

---

## 📊 Data Structures

### Comment Interface

```typescript
interface Comment {
  id: string;
  articleId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
  parentId?: string | null;
  likes: number;
  isLiked?: boolean;  // Only if user authenticated
  replies?: Comment[]; // Nested replies
}
```

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;    // Error code (e.g., 'UNAUTHORIZED')
  message?: string;  // Human-readable message
}
```

---

## ✨ Features

### Comment System
- ✅ Nested replies (unlimited depth)
- ✅ Like/unlike comments
- ✅ Delete comments (owner/admin only)
- ✅ Real-time character counter (max 2000)
- ✅ Soft delete (data preserved)
- ✅ Auto-approved comments

### Article Likes
- ✅ Toggle like/unlike
- ✅ Real-time like count
- ✅ User-specific like status

### UI Features
- ✅ Collapsible replies
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Reply mentions (@username)

---

## 🚨 Validation

### Comment Content

- ✅ Required (cannot be empty)
- ✅ Maximum 2000 characters
- ✅ Whitespace trimmed
- ✅ Frontend validation + backend validation

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | User not logged in |
| `INVALID_CONTENT` | Content is empty |
| `CONTENT_TOO_LONG` | Content exceeds 2000 chars |
| `ARTICLE_NOT_FOUND` | Article doesn't exist |
| `COMMENT_NOT_FOUND` | Comment doesn't exist |
| `FORBIDDEN` | No permission to delete |
| `NETWORK_ERROR` | Network/server error |

---

## 🧪 Testing

### Manual Testing Steps

1. **View Comments (No Auth Required)**
   ```bash
   curl http://localhost:5000/api/public/articles/ARTICLE_ID/comments
   ```

2. **Post Comment (Auth Required)**
   ```bash
   curl -X POST http://localhost:5000/api/public/articles/ARTICLE_ID/comments \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"content": "Test comment", "parentId": null}'
   ```

3. **Like Comment (Auth Required)**
   ```bash
   curl -X POST http://localhost:5000/api/public/articles/comments/COMMENT_ID/like \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

4. **Like Article (Auth Required)**
   ```bash
   curl -X POST http://localhost:5000/api/public/articles/ARTICLE_ID/like \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

5. **Delete Comment (Auth Required)**
   ```bash
   curl -X DELETE http://localhost:5000/api/public/articles/comments/COMMENT_ID \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 📝 Notes

1. **Nested Comments:**
   - Backend returns flat structure with `parentId`
   - Frontend builds tree using `buildCommentTree()` helper
   - UI supports unlimited depth nesting
   - Reply button disabled after depth 3

2. **Like Toggle:**
   - Returns new like count immediately
   - Frontend can update UI optimistically
   - Atomic transaction on backend

3. **Character Limit:**
   - Frontend: Visual warning at 2000 chars
   - Backend: Validation error if exceeded
   - Disabled submit button when over limit

4. **Authentication:**
   - Read operations: Optional (shows isLiked if authenticated)
   - Write operations: Required (401 if not authenticated)
   - Token stored in localStorage

---

## 🎯 Integration Points

### Current Implementation

✅ [components/news/NewsDetailClient.tsx](../components/news/NewsDetailClient.tsx)
- Comment section added at bottom of article
- Full comment CRUD + like functionality

### Future Integration Points

Consider adding:
- Article like button (use `toggleArticleLike()`)
- Comment count badge on article cards
- User profile page with user's comments
- Admin moderation panel

---

**Last Updated:** 2025-10-04
**Backend API Version:** v1.0
**Status:** ✅ Production Ready
