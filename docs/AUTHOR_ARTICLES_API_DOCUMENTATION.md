# Author Articles API - Dokumentasi untuk Frontend Developer

## 🎯 Overview
API untuk manajemen artikel author di dashboard. Author dapat membuat, mengedit, melihat, dan menghapus artikel mereka sendiri, serta mengelola draft.

**Base URL:** `http://localhost:5000/api/author/articles` (development)

**Authentication:** Semua endpoint memerlukan JWT token di header `Authorization: Bearer {token}`

**Role Required:** `AUTHOR` atau `ADMIN`

---

## 📋 Daftar Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/author/articles` | Get list artikel author |
| GET | `/api/author/articles/:id` | Get detail artikel by ID |
| POST | `/api/author/articles` | Create artikel (publish) |
| POST | `/api/author/articles/draft` | Save artikel sebagai draft |
| PUT | `/api/author/articles/:id` | Update artikel |
| DELETE | `/api/author/articles/:id` | Delete artikel |

---

## 🔑 Authentication

Semua request harus menyertakan JWT token:

```javascript
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};
```

---

## 📝 API Endpoints Detail

### 1. Get Author's Articles

**GET** `/api/author/articles`

Mengambil semua artikel milik author yang sedang login.

**Query Parameters:**

| Parameter | Type | Required | Default | Deskripsi |
|-----------|------|----------|---------|-----------|
| `status` | string | No | `all` | Filter: `aktif`, `nonaktif`, atau `all` |
| `search` | string | No | - | Search by title atau tags |
| `limit` | number | No | `50` | Jumlah data per page |
| `offset` | number | No | `0` | Pagination offset |

**Example Request:**
```javascript
const response = await fetch('/api/author/articles?status=aktif&search=nextjs&limit=20&offset=0', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx123456",
      "judul": "Getting Started with Next.js 15",
      "konten": "<p>Content here...</p>",
      "category": "research-tips",
      "featuredImage": "https://example.com/image.jpg",
      "tags": ["nextjs", "react", "tutorial"],
      "status": "aktif",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "publishedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}
```

**Response 401:**
```json
{
  "success": false,
  "error": "AUTH_ERROR",
  "message": "Authentication required"
}
```

---

### 2. Get Single Article

**GET** `/api/author/articles/:id`

Mengambil detail artikel berdasarkan ID. Hanya bisa akses artikel milik sendiri.

**Example Request:**
```javascript
const response = await fetch('/api/author/articles/clxxx123456', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "judul": "Getting Started with Next.js 15",
    "konten": "<p>Full content here...</p>",
    "category": "research-tips",
    "featuredImage": "https://example.com/image.jpg",
    "tags": ["nextjs", "react", "tutorial"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "publishedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Artikel tidak ditemukan"
}
```

**Response 403:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Artikel tidak ditemukan atau Anda tidak memiliki akses"
}
```

---

### 3. Create Article (Publish)

**POST** `/api/author/articles`

Membuat artikel baru dengan status `aktif` (published).

**Request Body:**
```json
{
  "judul": "Getting Started with Next.js 15",
  "konten": "<p>Article content with HTML...</p>",
  "category": "research-tips",
  "featured_image": "https://example.com/image.jpg",
  "tags": ["nextjs", "react", "tutorial"],
  "status": "aktif"
}
```

**Field Requirements:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `judul` | string | ✅ | Max 255 chars |
| `konten` | string | ✅ | Min 10 chars |
| `category` | string | ✅ | Valid category slug (lihat list di bawah) |
| `featured_image` | string | ❌ | Valid URL or empty string |
| `tags` | array | ❌ | Max 10 tags |
| `status` | string | ✅ | Must be `"aktif"` |

**Valid Categories:**
- `research-tips`
- `success-stories`
- `industry-news`
- `company-news`
- `industry`
- `research`
- `company`
- `announcement`

**Example Request:**
```javascript
const data = {
  judul: "Getting Started with Next.js 15",
  konten: "<p>Article content...</p>",
  category: "research-tips",
  featured_image: "https://example.com/image.jpg",
  tags: ["nextjs", "react"],
  status: "aktif"
};

const response = await fetch('/api/author/articles', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "judul": "Getting Started with Next.js 15",
    "konten": "<p>Article content...</p>",
    "category": "research-tips",
    "featuredImage": "https://example.com/image.jpg",
    "tags": ["nextjs", "react"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "publishedAt": "2024-01-15T10:00:00.000Z"
  },
  "message": "Artikel berhasil dipublish"
}
```

**Response 400 (Validation Error):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "judul",
        "message": "Judul harus diisi"
      },
      {
        "field": "category",
        "message": "Category harus salah satu dari: research-tips, success-stories, ..."
      }
    ]
  }
}
```

---

### 4. Save Draft

**POST** `/api/author/articles/draft`

Menyimpan artikel sebagai draft dengan status `nonaktif`. Validasi lebih flexible - hanya butuh minimal judul ATAU konten.

**Request Body:**
```json
{
  "judul": "Draft Article Title",
  "konten": "<p>Draft content...</p>",
  "category": "",
  "featured_image": "",
  "tags": [],
  "status": "nonaktif"
}
```

**Field Requirements (Relaxed):**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `judul` | string | ⚠️ | Max 255 chars (minimal judul ATAU konten harus ada) |
| `konten` | string | ⚠️ | No min length (minimal judul ATAU konten harus ada) |
| `category` | string | ❌ | Can be empty |
| `featured_image` | string | ❌ | Can be empty |
| `tags` | array | ❌ | Max 10 tags |
| `status` | string | ✅ | Must be `"nonaktif"` |

**Example Request:**
```javascript
const data = {
  judul: "Draft Article",
  konten: "",
  category: "",
  featured_image: "",
  tags: [],
  status: "nonaktif"
};

const response = await fetch('/api/author/articles/draft', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123457",
    "judul": "Draft Article",
    "konten": "",
    "category": "",
    "featuredImage": "",
    "tags": [],
    "status": "nonaktif",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "publishedAt": null
  },
  "message": "Draft berhasil disimpan"
}
```

---

### 5. Update Article

**PUT** `/api/author/articles/:id`

Update artikel yang sudah ada. Bisa mengubah draft menjadi published atau sebaliknya.

**Request Body:** (sama seperti Create Article)

**Business Logic:**
- Jika mengubah status dari `nonaktif` → `aktif`: Set `publishedAt` ke NOW() (jika belum pernah di-publish)
- Selalu update `updatedAt` ke NOW()
- Harus verify bahwa artikel milik author yang sedang login

**Example Request:**
```javascript
const data = {
  judul: "Updated Title",
  konten: "<p>Updated content...</p>",
  category: "research-tips",
  featured_image: "https://example.com/new-image.jpg",
  tags: ["nextjs", "react"],
  status: "aktif"
};

const response = await fetch('/api/author/articles/clxxx123456', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "judul": "Updated Title",
    "konten": "<p>Updated content...</p>",
    "category": "research-tips",
    "featuredImage": "https://example.com/new-image.jpg",
    "tags": ["nextjs", "react"],
    "status": "aktif",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T15:30:00.000Z",
    "publishedAt": "2024-01-15T15:30:00.000Z"
  },
  "message": "Artikel berhasil diupdate"
}
```

**Response 403:**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Artikel tidak ditemukan atau Anda tidak memiliki akses"
}
```

---

### 6. Delete Article

**DELETE** `/api/author/articles/:id`

Menghapus artikel (soft delete). Artikel tidak benar-benar dihapus dari database, hanya ditandai sebagai deleted.

**Example Request:**
```javascript
const response = await fetch('/api/author/articles/clxxx123456', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Response 200:**
```json
{
  "success": true,
  "message": "Artikel berhasil dihapus"
}
```

**Response 404:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Artikel tidak ditemukan atau Anda tidak memiliki akses"
}
```

---

## 🔒 Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message in Bahasa Indonesia"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Update/delete berhasil |
| 201 | Created | Artikel baru berhasil dibuat |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Token tidak valid/expired |
| 403 | Forbidden | Tidak ada akses ke artikel orang lain |
| 404 | Not Found | Artikel tidak ditemukan |
| 500 | Internal Server Error | Server error |

---

## 🎨 Frontend Integration Examples

### React Example (with Fetch)

```javascript
// Get articles
const fetchArticles = async (status = 'all') => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `/api/author/articles?status=${status}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const data = await response.json();

    if (data.success) {
      setArticles(data.data);
      setTotal(data.meta.total);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Create article
const createArticle = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/author/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        judul: formData.title,
        konten: formData.content,
        category: formData.category,
        featured_image: formData.image,
        tags: formData.tags,
        status: 'aktif'
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('Article created:', data.data.id);
      navigate(`/articles/${data.data.id}`);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Save draft
const saveDraft = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/author/articles/draft', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        judul: formData.title,
        konten: formData.content,
        category: formData.category || '',
        featured_image: formData.image || '',
        tags: formData.tags || [],
        status: 'nonaktif'
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('Draft saved:', data.data.id);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Delete article
const deleteArticle = async (articleId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/author/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      console.log('Article deleted');
      fetchArticles(); // Refresh list
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Axios Example

```javascript
import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get articles
const fetchArticles = async (status = 'all') => {
  const response = await api.get('/author/articles', {
    params: { status }
  });
  return response.data;
};

// Create article
const createArticle = async (formData) => {
  const response = await api.post('/author/articles', {
    judul: formData.title,
    konten: formData.content,
    category: formData.category,
    featured_image: formData.image,
    tags: formData.tags,
    status: 'aktif'
  });
  return response.data;
};
```

---

## 🛡️ Security Features

1. **XSS Protection:** Konten HTML di-sanitize otomatis untuk mencegah XSS attacks
2. **Authentication Required:** Semua endpoint memerlukan valid JWT token
3. **Authorization:** User hanya bisa akses artikel milik sendiri (kecuali ADMIN)
4. **Input Validation:** Validasi ketat menggunakan Joi schema
5. **Soft Delete:** Artikel yang dihapus masih tersimpan di database (bisa di-restore)

---

## 📊 Additional Features

### Auto-generated Fields
Backend otomatis generate field-field ini:
- `slug`: Auto-generated dari title (unique)
- `excerpt`: Auto-generated dari content (first 200 chars)
- `reading_time`: Auto-calculated (200 words/minute)
- `published_at`: Auto-set saat publish pertama kali

### Category Management
Category disimpan sebagai relasi (foreign key) di database. Valid category slugs:
- `research-tips`
- `success-stories`
- `industry-news`
- `company-news`
- `industry`
- `research`
- `company`
- `announcement`

---

## 🐛 Troubleshooting

### Error: "Category tidak ditemukan"
**Cause:** Category slug tidak valid atau category belum di-seed ke database
**Solution:** Pastikan menggunakan valid category slug atau jalankan `npm run seed` untuk seed categories

### Error: "Token expired"
**Cause:** JWT token sudah expired
**Solution:** Refresh token atau login ulang

### Error: "Artikel tidak ditemukan atau Anda tidak memiliki akses"
**Cause:** Mencoba akses artikel milik author lain
**Solution:** Pastikan article ID benar dan milik user yang sedang login

---

## 📞 Support

Jika ada pertanyaan atau butuh clarification, silakan hubungi backend developer atau buat issue di repository.

---

**Last Updated:** October 2024
**API Version:** 1.0
