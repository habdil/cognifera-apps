# Backend API Documentation - Guest User Like System

## Overview
Dokumentasi ini menjelaskan perubahan yang diperlukan di backend untuk mendukung sistem **like artikel tanpa login** menggunakan **Guest User System** dengan Device ID.

---

## Konsep Guest User System

### Device ID
- **Format**: `guest_[timestamp]_[random]`
- **Contoh**: `guest_1234567890_abc123def`
- **Lokasi**: Disimpan di localStorage frontend dengan key `cognifera_device_id`
- **Lifecycle**: Persistent di browser yang sama, hilang jika localStorage di-clear

### Flow Like System

#### Authenticated User (Sudah Login)
```
Frontend → Backend
Headers: { Authorization: "Bearer <token>" }
Body: {}

Backend: Identifikasi user dari JWT token
```

#### Guest User (Belum Login)
```
Frontend → Backend
Headers: { Content-Type: "application/json" }
Body: { deviceId: "guest_1234567890_abc123def" }

Backend: Identifikasi user dari deviceId
```

---

## API Endpoints yang Perlu Dimodifikasi

### 1. Toggle Article Like

#### Endpoint
```
POST /api/public/articles/:id/like
```

#### Request Headers (Authenticated)
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <access_token>"
}
```

#### Request Body (Authenticated)
```json
{}
```

#### Request Headers (Guest)
```json
{
  "Content-Type": "application/json"
}
```

#### Request Body (Guest)
```json
{
  "deviceId": "guest_1234567890_abc123def"
}
```

#### Backend Logic
```typescript
// Pseudocode
async function toggleArticleLike(req, res) {
  const { id: articleId } = req.params;
  const { deviceId } = req.body;
  const token = req.headers.authorization;

  let userId: string | null = null;
  let guestDeviceId: string | null = null;

  // Check authentication method
  if (token) {
    // Authenticated user
    userId = getUserIdFromToken(token);
  } else if (deviceId) {
    // Guest user
    guestDeviceId = deviceId;
  } else {
    return res.status(400).json({
      success: false,
      error: 'NO_IDENTIFIER',
      message: 'User authentication or device ID required'
    });
  }

  // Toggle like in database
  const result = userId
    ? await toggleLikeForUser(articleId, userId)
    : await toggleLikeForGuest(articleId, guestDeviceId);

  return res.json({
    success: true,
    likes: result.totalLikes,
    isLiked: result.isLiked
  });
}
```

#### Response (Success)
```json
{
  "success": true,
  "likes": 42,
  "isLiked": true
}
```

#### Response (Error)
```json
{
  "success": false,
  "error": "NO_IDENTIFIER",
  "message": "User authentication or device ID required"
}
```

---

### 2. Get Article by ID

#### Endpoint
```
GET /api/public/articles/:id?deviceId=guest_123456789
```

#### Query Parameters (Optional)
- `deviceId` (string): Device ID untuk guest user

#### Request Headers (Authenticated)
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <access_token>"
}
```

#### Request Headers (Guest with deviceId)
```json
{
  "Content-Type": "application/json"
}
```

#### Backend Logic
```typescript
// Pseudocode
async function getArticleById(req, res) {
  const { id: articleId } = req.params;
  const { deviceId } = req.query;
  const token = req.headers.authorization;

  // Fetch article data
  const article = await fetchArticle(articleId);

  // Determine if user liked this article
  let isLiked = false;

  if (token) {
    // Check if authenticated user liked it
    const userId = getUserIdFromToken(token);
    isLiked = await checkUserLike(articleId, userId);
  } else if (deviceId) {
    // Check if guest user liked it
    isLiked = await checkGuestLike(articleId, deviceId);
  }

  return res.json({
    success: true,
    data: {
      ...article,
      isLiked: isLiked
    }
  });
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "article-123",
    "judul": "Artikel Title",
    "konten": "<p>Article content...</p>",
    "likes": 42,
    "isLiked": true,
    "views": 1234,
    ...
  }
}
```

---

### 3. Get Articles List

#### Endpoint
```
GET /api/public/articles?limit=10&offset=0&deviceId=guest_123456789
```

#### Query Parameters (Optional)
- `deviceId` (string): Device ID untuk guest user
- `limit` (number): Pagination limit
- `offset` (number): Pagination offset
- `search` (string): Search query
- `category` (string): Filter by category

#### Backend Logic
```typescript
// Pseudocode
async function getArticles(req, res) {
  const { limit, offset, deviceId, search, category } = req.query;
  const token = req.headers.authorization;

  // Fetch articles
  const articles = await fetchArticles({ limit, offset, search, category });

  // Add isLiked field for each article
  const articlesWithLikeStatus = await Promise.all(
    articles.map(async (article) => {
      let isLiked = false;

      if (token) {
        const userId = getUserIdFromToken(token);
        isLiked = await checkUserLike(article.id, userId);
      } else if (deviceId) {
        isLiked = await checkGuestLike(article.id, deviceId);
      }

      return {
        ...article,
        isLiked
      };
    })
  );

  return res.json({
    success: true,
    data: articlesWithLikeStatus,
    meta: {
      total: totalCount,
      limit: limit,
      offset: offset
    }
  });
}
```

---

## Database Schema Recommendations

### Option 1: Separate Table for Guest Likes
```sql
-- Existing table for authenticated users
CREATE TABLE article_likes (
  id UUID PRIMARY KEY,
  article_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);

-- New table for guest users
CREATE TABLE article_guest_likes (
  id UUID PRIMARY KEY,
  article_id UUID NOT NULL,
  device_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(article_id, device_id)
);

-- Indexes for performance
CREATE INDEX idx_guest_likes_article ON article_guest_likes(article_id);
CREATE INDEX idx_guest_likes_device ON article_guest_likes(device_id);
```

### Option 2: Combined Table with Nullable Fields
```sql
CREATE TABLE article_likes (
  id UUID PRIMARY KEY,
  article_id UUID NOT NULL,
  user_id UUID NULL,          -- Nullable for guest users
  device_id VARCHAR(255) NULL, -- Nullable for authenticated users
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT check_user_or_device CHECK (
    (user_id IS NOT NULL AND device_id IS NULL) OR
    (user_id IS NULL AND device_id IS NOT NULL)
  )
);

-- Indexes
CREATE INDEX idx_likes_article ON article_likes(article_id);
CREATE INDEX idx_likes_user ON article_likes(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_likes_device ON article_likes(device_id) WHERE device_id IS NOT NULL;
```

**Rekomendasi**: Option 1 (Separate Tables) untuk clarity dan performance yang lebih baik.

---

## Edge Cases & Considerations

### 1. User Login Setelah Like sebagai Guest
**Problem**: User me-like artikel sebagai guest, kemudian login.

**Solution Options**:
- **A. Keep Both**: Biarkan kedua likes terpisah (guest like + user like)
- **B. Merge**: Saat login, cari device_id dan migrate ke user_id
- **C. Ignore**: Anggap sebagai 2 user terpisah

**Rekomendasi**: Option C (Ignore) - Lebih simple, tidak perlu migration logic.

### 2. Multiple Devices
**Problem**: User menggunakan multiple devices/browsers.

**Solution**: Setiap device punya deviceId sendiri, like tidak sync antar device sampai user login.

### 3. Cookie/LocalStorage Clear
**Problem**: User clear localStorage, dapat deviceId baru.

**Solution**: deviceId baru = user baru. Like history hilang (expected behavior).

### 4. Like Spam Prevention
**Problem**: Guest user bisa spam likes dengan generate deviceId baru.

**Solution Options**:
- Rate limiting per IP address
- CAPTCHA untuk guest likes
- Max likes per article per IP dalam timeframe tertentu

---

## Testing Checklist

### Frontend Testing
- [ ] Like artikel sebagai guest user
- [ ] Refresh page → button tetap filled
- [ ] Unlike artikel sebagai guest
- [ ] Jumlah likes update dengan benar
- [ ] Clear localStorage → deviceId baru, like status reset
- [ ] Like artikel, login → like status independent
- [ ] Login, like artikel, logout → like status hilang (expected)

### Backend Testing
- [ ] POST `/articles/:id/like` dengan deviceId (guest)
- [ ] POST `/articles/:id/like` dengan Authorization header (user)
- [ ] POST `/articles/:id/like` tanpa keduanya → return error
- [ ] GET `/articles/:id` dengan deviceId → isLiked correct
- [ ] GET `/articles/:id` dengan token → isLiked correct
- [ ] GET `/articles` dengan deviceId → semua isLiked correct
- [ ] Database constraints prevent duplicate likes
- [ ] Like count calculation includes both user + guest likes

---

## API Response Examples

### Scenario 1: Guest User Likes Article (First Time)
**Request**:
```
POST /api/public/articles/article-123/like
Content-Type: application/json

{
  "deviceId": "guest_1234567890_abc123def"
}
```

**Response**:
```json
{
  "success": true,
  "likes": 43,
  "isLiked": true
}
```

### Scenario 2: Guest User Unlikes Article
**Request**:
```
POST /api/public/articles/article-123/like
Content-Type: application/json

{
  "deviceId": "guest_1234567890_abc123def"
}
```

**Response**:
```json
{
  "success": true,
  "likes": 42,
  "isLiked": false
}
```

### Scenario 3: Get Article with Guest Like Status
**Request**:
```
GET /api/public/articles/article-123?deviceId=guest_1234567890_abc123def
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "article-123",
    "judul": "Article Title",
    "likes": 42,
    "isLiked": true,
    ...
  }
}
```

---

## Implementation Timeline

### Phase 1: Database Setup (Backend)
- Create `article_guest_likes` table
- Add indexes
- Test database queries

### Phase 2: API Implementation (Backend)
- Modify `POST /articles/:id/like` endpoint
- Modify `GET /articles/:id` endpoint
- Modify `GET /articles` endpoint
- Add helper functions: `checkGuestLike`, `toggleLikeForGuest`

### Phase 3: Testing (Backend + Frontend)
- Unit tests for database queries
- Integration tests for API endpoints
- E2E tests for like flow

### Phase 4: Deployment
- Deploy backend changes
- Frontend already ready (sudah diimplementasi)
- Monitor logs for errors

---

## Contact & Questions

Jika ada pertanyaan atau butuh klarifikasi lebih lanjut tentang implementasi ini, silakan kontak frontend developer atau buat issue di repository.

**Frontend Implementation Status**: ✅ DONE
**Backend Implementation Status**: ⏳ PENDING

---

## Summary

### What Frontend Sends:

1. **Toggle Like (Guest)**:
   ```
   POST /api/public/articles/:id/like
   Body: { deviceId: "guest_xxx" }
   ```

2. **Toggle Like (Authenticated)**:
   ```
   POST /api/public/articles/:id/like
   Headers: { Authorization: "Bearer token" }
   Body: {}
   ```

3. **Get Article (Guest)**:
   ```
   GET /api/public/articles/:id?deviceId=guest_xxx
   ```

4. **Get Article (Authenticated)**:
   ```
   GET /api/public/articles/:id
   Headers: { Authorization: "Bearer token" }
   ```

### What Backend Should Return:

```json
{
  "success": true,
  "likes": 42,
  "isLiked": true
}
```

**Key Point**: Backend harus bisa handle likes dari 2 tipe user:
1. Authenticated user (via JWT token)
2. Guest user (via deviceId)

Keduanya independent, tidak saling override.
