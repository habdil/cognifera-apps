# Author Articles - Frontend-Backend Integration Guide

## 🎯 Overview
Panduan integrasi lengkap antara frontend (React/Next.js) dan backend API untuk fitur Author Articles Management.

## 📱 Frontend Components

### 1. AuthorArticlesContent.tsx
**Path:** `components/dashboard/roles/author/AuthorArticlesContent.tsx`

**Responsibilities:**
- Display list of articles (Published & Drafts tabs)
- Search articles by title/tags
- View, Edit, Delete actions
- Stats display (Total, Published, Drafts)

**Props:**
```typescript
interface AuthorArticlesContentProps {
  onNavigate?: (tab: string) => void;
  initialTab?: 'published' | 'drafts';
}
```

### 2. AuthorCreateContent.tsx
**Path:** `components/dashboard/roles/author/AuthorCreateContent.tsx`

**Responsibilities:**
- Create new article form
- Edit existing article (edit mode)
- Save as draft functionality
- Publish article functionality
- Preview article

**Props:**
```typescript
interface AuthorCreateContentProps {
  onNavigate?: (tab: string) => void;
}
```

## 🔄 User Flow Diagrams

### Flow 1: Create & Publish Article
```
User clicks "New Article"
  → Navigate to Create tab
  → Fill form (title, category, content, image, tags)
  → Click "Publish Article"
  → [API] POST /api/author/articles
  ← Response: { success, data: { id, ... } }
  → Show success dialog with 3 options:
     1. View Article → Open preview
     2. Create Another → Reset form
     3. Back to Articles → Navigate to Articles tab
```

### Flow 2: Save Draft
```
User fills partial form
  → Click "Save as Draft"
  → [API] POST /api/author/articles/draft
  ← Response: { success, data: { id, ... } }
  → Show success toast with "View Drafts" action
  → User stays on create page (can continue editing)
  → If user clicks "View Drafts" → Navigate to Articles tab (Drafts tab)
```

### Flow 3: Edit Article
```
User in Articles list
  → Click "Edit" on article
  → Store article ID in localStorage
  → Navigate to Create tab
  → [API] GET /api/author/articles/:id
  ← Response: { success, data: { article } }
  → Load article data into form
  → User makes changes
  → Click "Publish Article" or "Save as Draft"
  → [API] PUT /api/author/articles/:id
  ← Response: { success, data: { updated article } }
  → Show success feedback
```

### Flow 4: Delete Article
```
User in Articles list
  → Click "Delete" on article
  → Show confirmation dialog
  → User confirms
  → [API] DELETE /api/author/articles/:id
  ← Response: { success, message }
  → Remove article from list
  → Show success toast
```

### Flow 5: View/Search Articles
```
User opens Articles tab
  → [API] GET /api/author/articles
  ← Response: { success, data: [articles], meta }
  → Display articles grouped by status
  → User switches tab (Published/Drafts)
  → Filter locally by status
  → User types search query
  → Filter locally by title/tags
  → Real-time filtering (no API call)
```

## 🔌 API Integration Points

### Integration Point 1: Fetch Articles on Mount
**Location:** `AuthorArticlesContent.tsx` Line 59-98

**Current Code (Mock):**
```typescript
useEffect(() => {
  const mockArticles: Article[] = [ /* ... */ ];
  setTimeout(() => {
    setArticles(mockArticles);
  }, 500);
}, []);
```

**Replace With:**
```typescript
useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/author/articles', {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch articles');

      const result = await response.json();
      if (result.success) {
        setArticles(result.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to Load Articles', {
        description: 'Unable to load your articles. Please try again.'
      });
    }
  };

  fetchArticles();
}, []);
```

### Integration Point 2: Delete Article
**Location:** `AuthorArticlesContent.tsx` Line 148-176

**Current Code (Mock):**
```typescript
const handleDeleteConfirm = async () => {
  if (!articleToDelete) return;
  setIsDeleting(true);

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));
    toast.success('Article Deleted', { /* ... */ });
  } catch (error) {
    toast.error('Delete Failed', { /* ... */ });
  } finally {
    setIsDeleting(false);
  }
};
```

**Replace With:**
```typescript
const handleDeleteConfirm = async () => {
  if (!articleToDelete) return;
  setIsDeleting(true);

  try {
    const response = await fetch(`/api/author/articles/${articleToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to delete article');

    const result = await response.json();
    if (result.success) {
      setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));
      toast.success('Article Deleted', {
        description: `"${articleToDelete.judul}" has been deleted successfully.`
      });
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    toast.error('Delete Failed', {
      description: 'Failed to delete article. Please try again.'
    });
  } finally {
    setIsDeleting(false);
  }
};
```

### Integration Point 3: Save Draft
**Location:** `AuthorCreateContent.tsx` Line 76-124

**Current Code (Mock):**
```typescript
const handleSaveDraft = useCallback(async () => {
  if (!formData.judul && !formData.konten) {
    toast.error('Nothing to Save', { /* ... */ });
    return;
  }

  setIsSubmitting(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving draft:', { ...formData, status: 'nonaktif' });
    toast.success('Draft Saved Successfully!', { /* ... */ });
  } catch (error) {
    toast.error('Failed to Save Draft', { /* ... */ });
  } finally {
    setIsSubmitting(false);
  }
}, [formData, onNavigate]);
```

**Replace With:**
```typescript
const handleSaveDraft = useCallback(async () => {
  if (!formData.judul && !formData.konten) {
    toast.error('Nothing to Save', {
      description: 'Please write at least a title or some content before saving as draft.'
    });
    return;
  }

  setIsSubmitting(true);
  try {
    const response = await fetch('/api/author/articles/draft', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, status: 'nonaktif' })
    });

    if (!response.ok) throw new Error('Failed to save draft');

    const result = await response.json();
    if (result.success) {
      toast.success('Draft Saved Successfully!', {
        description: 'Your draft has been saved. You can continue editing or view all drafts.',
        action: {
          label: 'View Drafts',
          onClick: () => {
            if (onNavigate) {
              onNavigate('articles');
              localStorage.setItem('articles-initial-tab', 'drafts');
            }
          },
        },
        duration: 5000,
      });
    }
  } catch (error) {
    console.error('Error saving draft:', error);
    toast.error('Failed to Save Draft', {
      description: 'Something went wrong. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
}, [formData, onNavigate]);
```

### Integration Point 4: Publish Article
**Location:** `AuthorCreateContent.tsx` Line 126-167

**Current Code (Mock):**
```typescript
const handlePublish = useCallback(async () => {
  if (!formData.judul || !formData.category || !formData.konten) {
    toast.error('Incomplete Form', { /* ... */ });
    return;
  }

  setIsSubmitting(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockArticleId = `article-${Date.now()}`;
    setPublishedArticleId(mockArticleId);
    localStorage.setItem('article-preview', JSON.stringify(formData));
    setShowSuccessDialog(true);
  } catch (error) {
    toast.error('Publication Failed', { /* ... */ });
  } finally {
    setIsSubmitting(false);
  }
}, [formData]);
```

**Replace With:**
```typescript
const handlePublish = useCallback(async () => {
  if (!formData.judul || !formData.category || !formData.konten) {
    toast.error('Incomplete Form', {
      description: 'Please fill in all required fields (Title, Category, Content)'
    });
    return;
  }

  setIsSubmitting(true);
  try {
    const response = await fetch('/api/author/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, status: 'aktif' })
    });

    if (!response.ok) throw new Error('Failed to publish article');

    const result = await response.json();
    if (result.success) {
      setPublishedArticleId(result.data.id);
      localStorage.setItem('article-preview', JSON.stringify(formData));
      setShowSuccessDialog(true);
    }
  } catch (error) {
    console.error('Error publishing article:', error);
    toast.error('Publication Failed', {
      description: 'Failed to publish article. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
}, [formData]);
```

## 🔐 Authentication Helper

Create a utility function for getting auth token:

**Path:** `lib/auth-utils.ts` (create new file)

```typescript
export function getAuthToken(): string | null {
  // Method 1: From localStorage/sessionStorage
  const token = localStorage.getItem('auth_token');
  if (token) return token;

  // Method 2: From cookies
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
  if (cookieToken) return cookieToken;

  // Method 3: From your auth context/hook
  // const { token } = useAuth();
  // return token;

  return null;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
}
```

## ✅ Integration Checklist

### Backend Tasks
- [ ] Create `articles` table in database
- [ ] Implement authentication middleware
- [ ] Implement authorization check (verify author_id)
- [ ] Create GET `/api/author/articles` endpoint
- [ ] Create GET `/api/author/articles/:id` endpoint
- [ ] Create POST `/api/author/articles` endpoint (publish)
- [ ] Create POST `/api/author/articles/draft` endpoint
- [ ] Create PUT `/api/author/articles/:id` endpoint
- [ ] Create DELETE `/api/author/articles/:id` endpoint
- [ ] Add input validation
- [ ] Add HTML sanitization (prevent XSS)
- [ ] Add database indexes
- [ ] Write unit tests
- [ ] Test with Postman/Thunder Client

### Frontend Tasks
- [ ] Create `lib/auth-utils.ts` helper
- [ ] Replace mock fetch in `AuthorArticlesContent.tsx`
- [ ] Replace mock fetch in `AuthorCreateContent.tsx`
- [ ] Test create article flow
- [ ] Test save draft flow
- [ ] Test edit article flow
- [ ] Test delete article flow
- [ ] Test search functionality
- [ ] Test tab switching
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Test authentication errors
- [ ] Test authorization errors (accessing other author's article)

### Testing Scenarios
- [ ] Create article with all fields → Should publish successfully
- [ ] Create article with minimal fields → Should show validation error
- [ ] Save draft with partial data → Should succeed
- [ ] Edit draft → Should load data correctly
- [ ] Publish draft → Should update status and set publishedAt
- [ ] Delete article → Should remove from list
- [ ] Search by title → Should filter correctly
- [ ] Search by tag → Should filter correctly
- [ ] Switch tabs → Should filter by status
- [ ] Logout and login → Should still see own articles
- [ ] Try to access other author's article → Should return 403

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Problem:** `Access to fetch at 'http://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS`

**Solution:** Add CORS headers in backend
```javascript
// Express.js example
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Issue 2: 401 Unauthorized
**Problem:** All requests return 401

**Solution:** Check if token is being sent correctly
```typescript
// Add logging
const token = getAuthToken();
console.log('Auth token:', token ? 'Present' : 'Missing');
```

### Issue 3: Articles not loading
**Problem:** `GET /api/author/articles` returns empty array

**Solution:** Verify author_id filtering
```sql
-- Backend should filter by author_id from token
WHERE author_id = $1 -- from authenticated user
```

### Issue 4: Images not uploading
**Problem:** Featured images not saving

**Solution:** Frontend currently uses base64. For production:
1. Implement image upload endpoint
2. Upload image first, get URL
3. Save URL in article

## 📚 Additional Resources

- **Full API Spec:** See `AUTHOR_ARTICLES_API_SPEC.md`
- **Quick Reference:** See `AUTHOR_API_QUICK_REFERENCE.md`
- **Test Data:** See `AUTHOR_API_TEST_DATA.md`

## 🤝 Communication

### Questions to Ask Backend Team:
1. What authentication method are you using? (JWT, Session, etc.)
2. Where is the auth token stored? (localStorage, cookie, etc.)
3. What's the base API URL? (local and production)
4. Do we need to implement image upload endpoint?
5. Should delete be soft delete or hard delete?
6. Any rate limiting on POST/PUT endpoints?

### Information to Share with Backend:
1. Frontend expects specific response format (see API spec)
2. Frontend needs `author_id` to be extracted from auth token
3. Frontend filters/searches locally after fetching all articles
4. Featured images currently base64, need to discuss upload strategy

---

**Integration Timeline:**
1. **Day 1-2:** Backend implements endpoints
2. **Day 3:** Backend testing with mock data
3. **Day 4:** Frontend integration (replace mocks)
4. **Day 5:** E2E testing
5. **Day 6:** Bug fixes and polish
6. **Day 7:** Production deployment

Good luck! 🚀
