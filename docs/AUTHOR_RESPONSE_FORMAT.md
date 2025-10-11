# Author Articles API - Response Format dengan Author Info

## 🎯 Overview

Dokumentasi ini menjelaskan format response yang **diharapkan** dari backend API untuk article endpoints agar frontend bisa menampilkan author information dengan benar.

---

## 📋 Expected Response Format

### **Create/Update Article Response**

Ketika user **save draft** atau **publish article**, backend **HARUS** return article data lengkap yang **include author information**:

```json
{
  "success": true,
  "data": {
    "id": "article-123",
    "judul": "Getting Started with Next.js",
    "konten": "<p>Article content...</p>",
    "category": "research-tips",
    "featuredImage": "https://supabase.co/storage/.../image.jpg",
    "tags": ["nextjs", "react"],
    "status": "aktif",
    "createdAt": "2025-10-02T10:00:00.000Z",
    "updatedAt": "2025-10-02T10:00:00.000Z",
    "publishedAt": "2025-10-02T10:00:00.000Z",

    // IMPORTANT: Include author info
    "author": {
      "id": "user-456",
      "fullName": "John Doe",
      "email": "john@example.com",
      "avatar": "https://supabase.co/storage/.../avatar.jpg"
    }
  },
  "message": "Artikel berhasil dipublish"
}
```

### **Get Single Article Response**

```json
{
  "success": true,
  "data": {
    "id": "article-123",
    "judul": "Getting Started with Next.js",
    "konten": "<p>Article content...</p>",
    "category": "research-tips",
    "featuredImage": "https://supabase.co/storage/.../image.jpg",
    "tags": ["nextjs", "react"],
    "status": "aktif",
    "createdAt": "2025-10-02T10:00:00.000Z",
    "updatedAt": "2025-10-02T10:00:00.000Z",
    "publishedAt": "2025-10-02T10:00:00.000Z",

    // Include author info
    "author": {
      "id": "user-456",
      "fullName": "John Doe",
      "email": "john@example.com",
      "avatar": "https://supabase.co/storage/.../avatar.jpg"
    }
  }
}
```

### **Get Articles List Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "article-123",
      "judul": "Getting Started with Next.js",
      "konten": "<p>Article content...</p>",
      "category": "research-tips",
      "featuredImage": "https://supabase.co/storage/.../image.jpg",
      "tags": ["nextjs", "react"],
      "status": "aktif",
      "createdAt": "2025-10-02T10:00:00.000Z",
      "updatedAt": "2025-10-02T10:00:00.000Z",
      "publishedAt": "2025-10-02T10:00:00.000Z",

      // Include author info in list too
      "author": {
        "id": "user-456",
        "fullName": "John Doe",
        "avatar": "https://supabase.co/storage/.../avatar.jpg"
      }
    }
  ],
  "meta": {
    "total": 25,
    "limit": 50,
    "offset": 0
  }
}
```

---

## 🔑 Author Object Fields

### **Required Fields:**
- `id` (string) - User ID
- `fullName` (string) - Full name of the author

### **Optional Fields:**
- `email` (string) - Email address
- `avatar` (string) - Avatar URL from Supabase Storage
- `bio` (string) - Author bio
- `username` (string) - Username

### **Example:**
```typescript
interface Author {
  id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  bio?: string;
  username?: string;
}
```

---

## 💡 Implementation Guide for Backend

### **Database Query Example (Prisma)**

```typescript
// Include author relation when fetching articles
const article = await prisma.berita.findUnique({
  where: { id: articleId },
  include: {
    author: {
      select: {
        id: true,
        full_name: true,
        email: true,
        avatar_url: true,
        bio: true
      }
    }
  }
});

// Transform to camelCase for frontend
return {
  success: true,
  data: {
    id: article.id,
    judul: article.judul,
    konten: article.konten,
    // ... other fields
    author: {
      id: article.author.id,
      fullName: article.author.full_name,
      email: article.author.email,
      avatar: article.author.avatar_url,
      bio: article.author.bio
    }
  }
};
```

### **SQL Query Example**

```sql
SELECT
  b.*,
  u.id as author_id,
  u.full_name as author_name,
  u.email as author_email,
  u.avatar_url as author_avatar
FROM berita b
INNER JOIN users u ON b.author_id = u.id
WHERE b.id = $1;
```

---

## 🎨 Frontend Usage

### **Preview Page**

Frontend akan menggunakan author info dari article response:

```typescript
// Load article from API response (saved in localStorage after create/update)
const article = JSON.parse(localStorage.getItem('article-preview'));

// Display author name
const authorName = article.author?.fullName || 'Author Name';
```

### **Fallback Strategy**

Frontend punya **2-level fallback**:

1. **First**: Use `article.author.fullName` from backend response
2. **Second**: Use `getCurrentUser().fullName` from auth localStorage
3. **Third**: Default to `"Author Name"`

```typescript
// Priority order
const authorName =
  article.author?.fullName ||           // From backend
  getCurrentUser()?.fullName ||         // From auth
  'Author Name';                        // Default fallback
```

---

## 🚀 Benefits

### **Why Include Author Info in Article Response?**

✅ **Consistency**: Same data structure di preview, public page, dan dashboard
✅ **Performance**: Tidak perlu fetch user lagi setelah create/update
✅ **Reliability**: Data author selalu konsisten dengan yang di backend
✅ **Public Display**: Article bisa langsung ditampilkan di home page dengan author info
✅ **Caching**: Article + author bisa di-cache together untuk better performance

---

## ⚠️ Important Notes

1. **JANGAN** return sensitive data (password, tokens) di author object
2. **SELALU** include author info di semua article endpoints (list, single, create, update)
3. **PASTIKAN** author relation di-include di database query
4. **TRANSFORM** snake_case (database) ke camelCase (frontend)

---

## 📞 Integration Checklist

Backend developer harus:
- [ ] Add author relation to article queries (Prisma include / SQL JOIN)
- [ ] Return author object di response semua endpoints
- [ ] Transform field names ke camelCase (`full_name` → `fullName`)
- [ ] Test response format match dengan dokumentasi ini
- [ ] Update existing endpoints yang belum include author

Frontend sudah:
- [x] Handle author info dari article response
- [x] Fallback ke localStorage auth user
- [x] Default fallback ke "Author Name"
- [x] Display author name di preview page

---

**Last Updated:** October 2025
**Related Files:**
- `app/dashboard/author/preview/page.tsx`
- `lib/api/author-articles.ts`
- `lib/auth-config.ts`
