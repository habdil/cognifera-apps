# 🐛 Backend Debugging - Comment Authentication Issue

## 🚨 Problem Description

Frontend mengirim POST request ke comment endpoint dengan token yang valid, tapi backend menolak dengan error 401 Unauthorized.

---

## 📋 Request Details (dari Frontend)

### Request yang Dikirim:

```http
POST http://localhost:5000/api/public/articles/cmgbtfc58000fp98s5g9369jp/comments
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "content": "asdasdasd",
  "parentId": null
}
```

### Response yang Diterima:

```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Login required to post comment"
}
```

**Status Code:** 401 Unauthorized

---

## 🔍 Yang Perlu Dicek di Backend

### 1. **Cek Middleware Authentication**

Kemungkinan middleware authentication tidak mem-parse header `Authorization` dengan benar.

**Pertanyaan untuk dicek:**
- Apakah middleware membaca header `Authorization: Bearer <token>`?
- Apakah middleware menggunakan nama header yang benar? (case-sensitive)
- Apakah middleware men-decode JWT token dengan benar?

**File yang perlu dicek:**
```bash
# Cari file middleware auth
grep -r "Authorization" src/middleware/
grep -r "Bearer" src/middleware/
```

**Contoh middleware yang benar:**

```javascript
// middleware/auth.js atau middleware/authenticate.js
const authenticate = (req, res, next) => {
  // 1. Ambil header Authorization
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log('🔍 [Auth Middleware] Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Login required to post comment'
    });
  }

  // 2. Extract token
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  console.log('🔍 [Auth Middleware] Token:', token.substring(0, 20) + '...');

  try {
    // 3. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ [Auth Middleware] Token verified:', decoded);

    // 4. Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ [Auth Middleware] Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Invalid or expired token'
    });
  }
};
```

---

### 2. **Cek Route Configuration**

Pastikan route comment menggunakan middleware authentication.

**File yang perlu dicek:**
```bash
# Cari route definition untuk comments
grep -r "/public/articles" src/routes/
grep -r "comments" src/routes/
```

**Contoh route yang benar:**

```javascript
// routes/public-articles.js atau routes/comments.js
const authenticate = require('../middleware/authenticate');

// ❌ SALAH - Middleware tidak dipasang
router.post('/public/articles/:articleId/comments', commentController.create);

// ✅ BENAR - Middleware dipasang
router.post('/public/articles/:articleId/comments',
  authenticate,  // <-- Middleware harus ada di sini
  commentController.create
);
```

---

### 3. **Cek Case Sensitivity Header**

HTTP headers bisa case-sensitive tergantung framework.

**Test di backend:**

```javascript
// Di controller atau middleware
console.log('All headers:', req.headers);
console.log('authorization (lowercase):', req.headers.authorization);
console.log('Authorization (capitalized):', req.headers.Authorization);
```

**Fix jika perlu:**

```javascript
// Support both cases
const authHeader = req.headers.authorization || req.headers.Authorization;
```

---

### 4. **Cek JWT Secret Configuration**

Token mungkin di-generate dengan secret yang berbeda dari yang digunakan untuk verify.

**Cek di backend:**

```bash
# Cek environment variable
echo $JWT_SECRET

# Atau di file .env
cat .env | grep JWT_SECRET
```

**Verify di code:**

```javascript
// Saat login (generate token)
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

// Saat verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// ⚠️ Pastikan JWT_SECRET sama!
```

---

### 5. **Cek Token Expiration**

Token mungkin sudah expired.

**Test:**

```javascript
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token payload:', decoded);
  console.log('Token expires at:', new Date(decoded.exp * 1000));
  console.log('Current time:', new Date());
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    console.error('Token expired at:', error.expiredAt);
  }
}
```

---

### 6. **Cek CORS Configuration**

CORS mungkin strip header `Authorization`.

**File yang perlu dicek:**

```bash
# Cari CORS config
grep -r "cors" src/
```

**CORS config yang benar:**

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] // ⚠️ Harus include Authorization!
}));
```

---

## 🧪 Testing Commands

### Test 1: Direct cURL (Bypass Frontend)

```bash
# Ganti <YOUR_TOKEN> dengan token dari localStorage
curl -X POST http://localhost:5000/api/public/articles/cmgbtfc58000fp98s5g9369jp/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content": "Test comment", "parentId": null}' \
  -v
```

**Expected output jika berhasil:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Comment posted successfully"
}
```

### Test 2: Check Header Reception

Tambahkan log di backend controller:

```javascript
// Di comment controller
exports.create = async (req, res) => {
  console.log('📥 [Comment Controller] Headers:', req.headers);
  console.log('📥 [Comment Controller] User:', req.user);
  console.log('📥 [Comment Controller] Body:', req.body);

  // ... rest of code
};
```

### Test 3: Decode Token Manually

```javascript
const jwt = require('jsonwebtoken');

// Token dari frontend
const token = 'eyJhbGciOiJIUzI1NiIs...';

// Decode tanpa verify (untuk debug)
const decoded = jwt.decode(token);
console.log('Token payload:', decoded);

// Verify dengan secret
try {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Token valid:', verified);
} catch (error) {
  console.error('❌ Token invalid:', error.message);
}
```

---

## 🎯 Checklist Debugging

Cek satu per satu:

- [ ] Middleware authentication dipasang di route `/public/articles/:articleId/comments`
- [ ] Middleware membaca header `Authorization` dengan benar (case-insensitive)
- [ ] Middleware men-extract token dengan benar (remove "Bearer " prefix)
- [ ] JWT secret sama antara login dan verify
- [ ] Token belum expired
- [ ] CORS config allow header `Authorization`
- [ ] `req.user` ter-populate dengan benar setelah authentication
- [ ] Controller menerima `req.user` yang valid

---

## 📝 Expected Flow

```
1. Frontend sends request:
   POST /api/public/articles/:id/comments
   Headers: { Authorization: "Bearer <token>" }

2. Backend receives request
   ↓
3. CORS middleware allows Authorization header
   ↓
4. Authentication middleware:
   - Extract header: "Bearer <token>"
   - Parse token: "<token>"
   - Verify JWT: jwt.verify(token, JWT_SECRET)
   - Decode user: { userId, email, role, ... }
   - Attach to request: req.user = decoded
   ↓
5. Comment controller:
   - Access user: req.user
   - Create comment with userId: req.user.id
   - Return success response
```

**❌ Current behavior:** Step 4 gagal, middleware tidak menerima atau memproses token dengan benar.

---

## 🔧 Quick Fix Suggestions

### Fix 1: Update Authentication Middleware

```javascript
// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Support both lowercase and capitalized
    const authHeader = req.headers.authorization || req.headers.Authorization;

    console.log('🔒 [Auth] Checking authentication...');
    console.log('🔒 [Auth] Authorization header:', authHeader ? 'Present' : 'Missing');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ [Auth] No Bearer token found');
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Login required to post comment'
      });
    }

    const token = authHeader.substring(7);
    console.log('🔒 [Auth] Token:', token.substring(0, 20) + '...');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ [Auth] Token verified for user:', decoded.userId);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ [Auth] Error:', error.message);
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
    });
  }
};

module.exports = authenticate;
```

### Fix 2: Update Route Configuration

```javascript
// routes/public-articles.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/authenticate');

// Public endpoints (no auth)
router.get('/public/articles/:articleId/comments', commentController.getComments);

// Protected endpoints (require auth)
router.post('/public/articles/:articleId/comments',
  authenticate,  // ← Make sure this is here!
  commentController.createComment
);

router.delete('/public/articles/comments/:commentId',
  authenticate,
  commentController.deleteComment
);

router.post('/public/articles/comments/:commentId/like',
  authenticate,
  commentController.toggleLike
);

module.exports = router;
```

### Fix 3: Update CORS Configuration

```javascript
// app.js or server.js
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

---

## 📞 Contact Frontend Team

Jika masalah sudah di-fix di backend, kasih tau frontend team untuk:

1. ✅ **Refresh browser** (clear cache jika perlu)
2. ✅ **Logout dan login ulang** (untuk dapat token baru)
3. ✅ **Test comment posting**

Frontend sudah kirim request dengan benar, tinggal backend yang perlu di-fix! 🚀

---

**Created:** 2025-10-04
**Issue:** Comment API returning 401 despite valid token
**Frontend Logs:** Available in browser console
**Backend Team:** Please investigate ASAP
