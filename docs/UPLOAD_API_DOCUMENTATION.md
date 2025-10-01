# Upload API - Dokumentasi untuk Frontend Developer

## 🎯 Overview
API untuk upload file (images) ke Supabase Storage. Mendukung upload article images dan user avatars.

**Base URL:** `http://localhost:5000/api/upload` (development)

**Authentication:** Semua endpoint memerlukan JWT token di header `Authorization: Bearer {token}`

**Storage Provider:** Supabase Storage (S3-compatible)

---

## 📋 Daftar Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/upload/article-image` | Upload single article image |
| POST | `/api/upload/avatar` | Upload user avatar |
| POST | `/api/upload/images` | Upload multiple article images (max 5) |

---

## 🔑 Authentication

Semua request harus menyertakan JWT token:

```javascript
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    // Content-Type: multipart/form-data (akan di-set otomatis oleh browser/axios)
  }
};
```

---

## 📝 API Endpoints Detail

### 1. Upload Article Image

**POST** `/api/upload/article-image`

Upload single image untuk artikel (featured image atau inline image di content).

**Request Type:** `multipart/form-data`

**Form Field:**
- **Field name:** `image` (HARUS pakai nama ini!)
- **File types:** JPG, PNG, WebP, GIF
- **Max size:** 5 MB

**Example Request (JavaScript Fetch):**
```javascript
const uploadArticleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file); // Field name HARUS 'image'

  const response = await fetch('/api/upload/article-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Jangan set Content-Type, browser akan set otomatis
    },
    body: formData
  });

  return response.json();
};
```

**Example Request (Axios):**
```javascript
import axios from 'axios';

const uploadArticleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post('/api/upload/article-image', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "url": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/article-images/articles/1735123456789-a1b2c3d4.jpg",
    "filename": "1735123456789-a1b2c3d4.jpg",
    "size": 245678,
    "mimeType": "image/jpeg"
  },
  "message": "Image berhasil diupload"
}
```

**Response 400 (Validation Error):**
```json
{
  "success": false,
  "error": "File Too Large",
  "message": "Ukuran file terlalu besar. Maksimal 5 MB untuk artikel, 2 MB untuk avatar."
}
```

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Tipe file tidak valid. Hanya JPG, PNG, WebP, dan GIF yang diperbolehkan."
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

### 2. Upload Avatar

**POST** `/api/upload/avatar`

Upload user avatar. Old avatar akan otomatis terhapus saat upload yang baru.

**Request Type:** `multipart/form-data`

**Form Field:**
- **Field name:** `avatar` (HARUS pakai nama ini!)
- **File types:** JPG, PNG, WebP
- **Max size:** 2 MB

**Example Request:**
```javascript
const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file); // Field name HARUS 'avatar'

  const response = await fetch('/api/upload/avatar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "url": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/avatars/clxxx123456/1735123456789-a1b2c3d4.jpg",
    "filename": "1735123456789-a1b2c3d4.jpg",
    "size": 125678,
    "mimeType": "image/jpeg"
  },
  "message": "Avatar berhasil diupload"
}
```

**Note:** Avatar disimpan di folder dengan user ID, jadi strukturnya:
```
/avatars/{userId}/filename.jpg
```

Old avatar di folder yang sama akan otomatis dihapus.

---

### 3. Upload Multiple Images

**POST** `/api/upload/images`

Upload multiple images sekaligus (max 5 files). Useful untuk article gallery atau bulk upload.

**Request Type:** `multipart/form-data`

**Form Field:**
- **Field name:** `images` (HARUS pakai nama ini!)
- **File types:** JPG, PNG, WebP, GIF
- **Max size:** 5 MB per file
- **Max files:** 5 files

**Example Request:**
```javascript
const uploadMultipleImages = async (files) => {
  const formData = new FormData();

  // Append multiple files dengan nama field yang SAMA
  files.forEach(file => {
    formData.append('images', file); // Field name HARUS 'images'
  });

  const response = await fetch('/api/upload/images', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};
```

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "url": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/article-images/articles/1735123456789-a1b2c3d4.jpg",
      "filename": "1735123456789-a1b2c3d4.jpg",
      "size": 245678,
      "mimeType": "image/jpeg"
    },
    {
      "url": "https://lnjcdrchybzurinizeek.supabase.co/storage/v1/object/public/article-images/articles/1735123456790-e5f6g7h8.jpg",
      "filename": "1735123456790-e5f6g7h8.jpg",
      "size": 312456,
      "mimeType": "image/jpeg"
    }
  ],
  "message": "2 image(s) berhasil diupload"
}
```

---

## 🎨 Frontend Integration Examples

### React Example - Article Image Upload

```javascript
import { useState } from 'react';

const ArticleImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      alert('File terlalu besar! Max 5 MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Tipe file tidak valid! Hanya JPG, PNG, WebP, GIF');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload/article-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.url);
        console.log('Image uploaded:', data.data.url);
        // Save URL to article form state
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {imageUrl && (
        <img src={imageUrl} alt="Preview" style={{ maxWidth: '300px' }} />
      )}
    </div>
  );
};
```

### React Example - Avatar Upload

```javascript
const AvatarUploader = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAvatarSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (2 MB for avatar)
    if (file.size > 2 * 1024 * 1024) {
      alert('File terlalu besar! Max 2 MB');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('avatar', file); // Field name 'avatar'

      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setAvatarUrl(data.data.url);
        console.log('Avatar uploaded:', data.data.url);
        // Update user profile with new avatar URL
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleAvatarSelect}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      )}
    </div>
  );
};
```

### React Example - Multiple Images Upload

```javascript
const MultipleImagesUploader = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFilesSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert('Maksimal 5 files!');
      return;
    }

    // Validate each file
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar! Max 5 MB`);
        return;
      }
    }

    try {
      setUploading(true);

      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file); // Same field name for all files
      });

      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        const urls = data.data.map(img => img.url);
        setImageUrls(urls);
        console.log('Images uploaded:', urls);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFilesSelect}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Upload ${index}`}
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};
```

### Integration with Article Form

```javascript
const CreateArticleForm = () => {
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    category: '',
    featured_image: '', // This will store the uploaded image URL
    tags: [],
    status: 'aktif'
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload/article-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      const data = await response.json();

      if (data.success) {
        // Set the uploaded URL to form data
        setFormData({
          ...formData,
          featured_image: data.data.url
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit article with featured_image URL
    const response = await fetch('/api/author/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.judul}
        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
        placeholder="Judul"
      />

      <textarea
        value={formData.konten}
        onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
        placeholder="Konten"
      />

      <div>
        <label>Featured Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading image...</p>}
        {formData.featured_image && (
          <img src={formData.featured_image} alt="Preview" style={{ maxWidth: '300px' }} />
        )}
      </div>

      <button type="submit" disabled={uploading}>
        Publish Article
      </button>
    </form>
  );
};
```

---

## 🔒 Security Features

1. **Authentication Required:** Semua upload memerlukan valid JWT token
2. **File Type Validation:** Hanya image types yang diperbolehkan
3. **File Size Validation:**
   - Article images: Max 5 MB
   - Avatars: Max 2 MB
4. **Unique Filenames:** Auto-generated menggunakan timestamp + UUID
5. **Public Access:** Uploaded images bisa diakses public via URL (sesuai kebutuhan)
6. **Auto-delete Old Avatar:** Old avatar otomatis terhapus saat upload baru

---

## 📊 File Specifications

### Article Images
- **Bucket:** `article-images`
- **Path:** `/articles/{timestamp}-{uuid}.{ext}`
- **Max Size:** 5 MB
- **Allowed Types:** JPG, PNG, WebP, GIF
- **Example URL:** `https://xxx.supabase.co/storage/v1/object/public/article-images/articles/1735123456789-a1b2c3d4.jpg`

### Avatars
- **Bucket:** `avatars`
- **Path:** `/{userId}/{timestamp}-{uuid}.{ext}`
- **Max Size:** 2 MB
- **Allowed Types:** JPG, PNG, WebP
- **Example URL:** `https://xxx.supabase.co/storage/v1/object/public/avatars/clxxx123456/1735123456789-a1b2c3d4.jpg`

---

## ⚠️ Important Notes

### Field Names
**PENTING:** Field name di FormData HARUS sesuai:
- Article image: `image`
- Avatar: `avatar`
- Multiple images: `images`

Kalau salah field name, akan error:
```json
{
  "success": false,
  "error": "Unexpected Field",
  "message": "Field name tidak valid. Gunakan \"image\" untuk artikel, \"avatar\" untuk avatar."
}
```

### Content-Type Header
**Jangan set manual** `Content-Type: multipart/form-data` saat pakai Fetch API. Browser akan set otomatis dengan boundary yang benar.

Kalau pakai Axios, boleh set (opsional).

### Image URL Storage
Setelah upload berhasil, simpan URL di database:
- Untuk artikel: simpan di field `featured_image`
- Untuk avatar: simpan di field `avatar_url`

---

## 🐛 Troubleshooting

### Error: "File tidak ditemukan"
**Cause:** Field name salah atau file tidak di-append ke FormData
**Solution:** Pastikan field name benar (`image`, `avatar`, atau `images`)

### Error: "Ukuran file terlalu besar"
**Cause:** File size melebihi limit
**Solution:**
- Compress image sebelum upload
- Gunakan tools seperti TinyPNG atau ImageOptim
- Untuk avatar, resize ke 400x400px sudah cukup

### Error: "Tipe file tidak valid"
**Cause:** File type tidak didukung
**Solution:** Pastikan file adalah JPG, PNG, WebP, atau GIF (article) / JPG, PNG, WebP (avatar)

### Error: "Missing Supabase credentials"
**Cause:** Environment variables belum di-set
**Solution:** Set `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` di `.env`

---

## 📞 Support

Jika ada pertanyaan atau butuh clarification, silakan hubungi backend developer.

---

**Last Updated:** October 2024
**API Version:** 1.0
