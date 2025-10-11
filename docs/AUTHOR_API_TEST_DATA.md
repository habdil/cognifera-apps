# Author Articles API - Test Data & Mock Responses

## 📋 Mock Data untuk Testing

Gunakan data ini untuk testing endpoints dan memastikan konsistensi dengan frontend.

## 🎭 Sample Articles

### Published Article Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "author_id": "auth-user-001",
  "judul": "Getting Started with Next.js 15",
  "category": "research-tips",
  "featuredImage": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  "konten": "<h2>Introduction</h2><p>Next.js 15 brings exciting new features...</p><p>In this article, we'll explore the key improvements and how to get started.</p><h3>Key Features</h3><ul><li>Improved performance</li><li>Better developer experience</li><li>Enhanced routing</li></ul>",
  "tags": ["nextjs", "react", "tutorial", "web-development"],
  "status": "aktif",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "publishedAt": "2024-01-15T10:00:00Z"
}
```

### Draft Article Example
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "author_id": "auth-user-001",
  "judul": "Building Scalable APIs - Draft",
  "category": "industry",
  "featuredImage": "",
  "konten": "<p>This is a draft article about building scalable APIs...</p><p>TODO: Add more sections</p>",
  "tags": ["api", "backend", "scalability"],
  "status": "nonaktif",
  "createdAt": "2024-01-13T10:00:00Z",
  "updatedAt": "2024-01-14T15:30:00Z",
  "publishedAt": null
}
```

### Article with Rich Content
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "author_id": "auth-user-001",
  "judul": "Advanced React Patterns for 2024",
  "category": "research",
  "featuredImage": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
  "konten": "<h1>Advanced React Patterns</h1><p>Let's explore advanced patterns that will make your React code more maintainable.</p><h2>1. Compound Components</h2><p>This pattern allows you to create flexible and reusable components...</p><pre><code class=\"language-javascript\">function Tabs({ children }) {\n  return <div>{children}</div>\n}</code></pre><blockquote><p>Compound components provide a clean API for complex components.</p></blockquote><h2>2. Render Props</h2><p>Another powerful pattern for component composition...</p><img src=\"https://example.com/diagram.png\" alt=\"Pattern Diagram\" /><h2>Conclusion</h2><p>These patterns will help you build better React applications.</p>",
  "tags": ["react", "patterns", "advanced", "javascript"],
  "status": "aktif",
  "createdAt": "2024-01-14T08:00:00Z",
  "updatedAt": "2024-01-14T10:30:00Z",
  "publishedAt": "2024-01-14T10:30:00Z"
}
```

## 📦 Complete Test Dataset

### GET /api/author/articles - Expected Response
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "judul": "Getting Started with Next.js 15",
      "category": "research-tips",
      "featuredImage": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      "konten": "<h2>Introduction</h2><p>Next.js 15 brings exciting new features...</p>",
      "tags": ["nextjs", "react", "tutorial"],
      "status": "aktif",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "publishedAt": "2024-01-15T10:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "judul": "Advanced React Patterns for 2024",
      "category": "research",
      "featuredImage": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
      "konten": "<h1>Advanced React Patterns</h1><p>Let's explore advanced patterns...</p>",
      "tags": ["react", "patterns", "advanced"],
      "status": "aktif",
      "createdAt": "2024-01-14T08:00:00Z",
      "updatedAt": "2024-01-14T10:30:00Z",
      "publishedAt": "2024-01-14T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "judul": "Building Scalable APIs - Draft",
      "category": "industry",
      "featuredImage": "",
      "konten": "<p>This is a draft article...</p>",
      "tags": ["api", "backend"],
      "status": "nonaktif",
      "createdAt": "2024-01-13T10:00:00Z",
      "updatedAt": "2024-01-14T15:30:00Z",
      "publishedAt": null
    }
  ],
  "meta": {
    "total": 3,
    "limit": 50,
    "offset": 0
  }
}
```

## 🧪 Test Scenarios

### Scenario 1: Create Published Article
**Request:**
```bash
POST /api/author/articles
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "judul": "Understanding TypeScript Generics",
  "category": "research-tips",
  "featuredImage": "https://example.com/typescript.jpg",
  "konten": "<h2>What are Generics?</h2><p>Generics provide a way to create reusable components...</p>",
  "tags": ["typescript", "programming", "generics"],
  "status": "aktif"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "newly-generated-uuid",
    "author_id": "auth-user-001",
    "judul": "Understanding TypeScript Generics",
    "category": "research-tips",
    "featuredImage": "https://example.com/typescript.jpg",
    "konten": "<h2>What are Generics?</h2><p>Generics provide a way to create reusable components...</p>",
    "tags": ["typescript", "programming", "generics"],
    "status": "aktif",
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z",
    "publishedAt": "2024-01-15T12:00:00Z"
  },
  "message": "Article published successfully"
}
```

### Scenario 2: Save Minimal Draft
**Request:**
```bash
POST /api/author/articles/draft
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "judul": "Untitled Draft",
  "category": "",
  "featuredImage": "",
  "konten": "",
  "tags": [],
  "status": "nonaktif"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "newly-generated-uuid",
    "author_id": "auth-user-001",
    "judul": "Untitled Draft",
    "category": "",
    "featuredImage": "",
    "konten": "",
    "tags": [],
    "status": "nonaktif",
    "createdAt": "2024-01-15T12:05:00Z",
    "updatedAt": "2024-01-15T12:05:00Z",
    "publishedAt": null
  },
  "message": "Draft saved successfully"
}
```

### Scenario 3: Update Draft to Published
**Request:**
```bash
PUT /api/author/articles/550e8400-e29b-41d4-a716-446655440001
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "judul": "Building Scalable APIs",
  "category": "industry",
  "featuredImage": "https://example.com/api.jpg",
  "konten": "<h2>Introduction</h2><p>Complete article content...</p>",
  "tags": ["api", "backend", "scalability"],
  "status": "aktif"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "author_id": "auth-user-001",
    "judul": "Building Scalable APIs",
    "category": "industry",
    "featuredImage": "https://example.com/api.jpg",
    "konten": "<h2>Introduction</h2><p>Complete article content...</p>",
    "tags": ["api", "backend", "scalability"],
    "status": "aktif",
    "createdAt": "2024-01-13T10:00:00Z",
    "updatedAt": "2024-01-15T12:10:00Z",
    "publishedAt": "2024-01-15T12:10:00Z"
  },
  "message": "Article updated successfully"
}
```

### Scenario 4: Delete Article
**Request:**
```bash
DELETE /api/author/articles/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGc...
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

### Scenario 5: Search Articles
**Request:**
```bash
GET /api/author/articles?search=react&status=aktif
Authorization: Bearer eyJhbGc...
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "judul": "Advanced React Patterns for 2024",
      "category": "research",
      "featuredImage": "https://example.com/react.jpg",
      "konten": "<h1>Advanced React Patterns</h1>...",
      "tags": ["react", "patterns", "advanced"],
      "status": "aktif",
      "createdAt": "2024-01-14T08:00:00Z",
      "updatedAt": "2024-01-14T10:30:00Z",
      "publishedAt": "2024-01-14T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "judul": "Getting Started with Next.js 15",
      "category": "research-tips",
      "featuredImage": "https://example.com/nextjs.jpg",
      "konten": "<h2>Introduction</h2>...",
      "tags": ["nextjs", "react", "tutorial"],
      "status": "aktif",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "publishedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 2,
    "limit": 50,
    "offset": 0
  }
}
```

## ❌ Error Scenarios

### Unauthorized Access
**Request:**
```bash
GET /api/author/articles
# No Authorization header
```

**Expected Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### Accessing Other Author's Article
**Request:**
```bash
GET /api/author/articles/other-author-article-id
Authorization: Bearer eyJhbGc...
```

**Expected Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this article"
}
```

### Invalid Category
**Request:**
```bash
POST /api/author/articles
{
  "judul": "Test",
  "category": "invalid-category",
  "konten": "<p>Test</p>",
  "status": "aktif"
}
```

**Expected Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": {
    "category": "Category must be one of: research-tips, success-stories, industry-news, company-news, industry, research, company, announcement"
  }
}
```

### Missing Required Fields (Publish)
**Request:**
```bash
POST /api/author/articles
{
  "judul": "",
  "category": "",
  "konten": "",
  "status": "aktif"
}
```

**Expected Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": {
    "judul": "Title is required",
    "category": "Category is required",
    "konten": "Content is required"
  }
}
```

### Article Not Found
**Request:**
```bash
GET /api/author/articles/non-existent-id
Authorization: Bearer eyJhbGc...
```

**Expected Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Article not found"
}
```

## 🔧 Postman/Thunder Client Collection

### Environment Variables
```
base_url: http://localhost:3000
auth_token: your-jwt-token
author_id: auth-user-001
```

### Collection Endpoints
1. **Get All Articles**
   - GET `{{base_url}}/api/author/articles`
   - Headers: `Authorization: Bearer {{auth_token}}`

2. **Get Single Article**
   - GET `{{base_url}}/api/author/articles/550e8400-e29b-41d4-a716-446655440000`
   - Headers: `Authorization: Bearer {{auth_token}}`

3. **Create Published Article**
   - POST `{{base_url}}/api/author/articles`
   - Headers: `Authorization: Bearer {{auth_token}}`
   - Body: See Scenario 1

4. **Save Draft**
   - POST `{{base_url}}/api/author/articles/draft`
   - Headers: `Authorization: Bearer {{auth_token}}`
   - Body: See Scenario 2

5. **Update Article**
   - PUT `{{base_url}}/api/author/articles/550e8400-e29b-41d4-a716-446655440001`
   - Headers: `Authorization: Bearer {{auth_token}}`
   - Body: See Scenario 3

6. **Delete Article**
   - DELETE `{{base_url}}/api/author/articles/550e8400-e29b-41d4-a716-446655440000`
   - Headers: `Authorization: Bearer {{auth_token}}`

## 📊 Database Seed Data

```sql
-- Insert sample articles for testing
INSERT INTO articles (id, author_id, judul, category, featured_image, konten, tags, status, created_at, updated_at, published_at) VALUES
(
  '550e8400-e29b-41d4-a716-446655440000',
  'auth-user-001',
  'Getting Started with Next.js 15',
  'research-tips',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  '<h2>Introduction</h2><p>Next.js 15 brings exciting new features...</p>',
  ARRAY['nextjs', 'react', 'tutorial'],
  'aktif',
  '2024-01-15 10:00:00+00',
  '2024-01-15 10:00:00+00',
  '2024-01-15 10:00:00+00'
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'auth-user-001',
  'Building Scalable APIs - Draft',
  'industry',
  '',
  '<p>This is a draft article...</p>',
  ARRAY['api', 'backend'],
  'nonaktif',
  '2024-01-13 10:00:00+00',
  '2024-01-14 15:30:00+00',
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'auth-user-001',
  'Advanced React Patterns for 2024',
  'research',
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800',
  '<h1>Advanced React Patterns</h1><p>Lets explore advanced patterns...</p>',
  ARRAY['react', 'patterns', 'advanced'],
  'aktif',
  '2024-01-14 08:00:00+00',
  '2024-01-14 10:30:00+00',
  '2024-01-14 10:30:00+00'
);
```

---

**Note:** Gunakan data ini untuk testing dan pastikan backend response format match dengan expectations frontend.
