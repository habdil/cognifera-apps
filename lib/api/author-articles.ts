// Frontend API Service Layer for Author Articles Management
// File ini untuk digunakan di Next.js frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Author {
  id: string;
  fullName: string;
  email?: string;
  avatar?: string;
  bio?: string;
  username?: string;
}

export interface Article {
  id: string;
  judul: string;
  konten: string;
  category: string;
  featuredImage: string;
  tags: string[];
  status: 'aktif' | 'nonaktif';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author?: Author; // Backend should include this in response
}

export interface FetchArticlesParams {
  status?: 'aktif' | 'nonaktif' | 'all';
  search?: string;
  limit?: number;
  offset?: number;
}

export interface CreateArticleData {
  judul: string;
  konten: string;
  category: string;
  featured_image: string;
  tags: string[];
  status: 'aktif' | 'nonaktif';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedArticlesResponse {
  data: Article[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

/**
 * Get authentication token from storage
 * Checks both old and new auth systems for compatibility
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Check new auth system first (primary)
  const newToken = localStorage.getItem('cognifera_new_access_token');
  if (newToken) return newToken;

  // Check old auth system (fallback)
  const oldToken = localStorage.getItem('cognifera_access_token');
  if (oldToken) return oldToken;

  // Legacy fallback
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

/**
 * Get auth headers
 */
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

/**
 * Fetch author's articles with filters and pagination
 * GET /api/author/articles
 */
export async function fetchAuthorArticles(
  params: FetchArticlesParams = {}
): Promise<ApiResponse<Article[]> & { meta: { total: number; limit: number; offset: number } }> {
  const queryParams = new URLSearchParams();

  if (params.status && params.status !== 'all') queryParams.append('status', params.status);
  if (params.search) queryParams.append('search', params.search);
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.offset) queryParams.append('offset', params.offset.toString());

  const url = `${API_BASE_URL}/author/articles?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch articles' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch articles`);
  }

  return response.json();
}

/**
 * Get single article by ID
 * GET /api/author/articles/:id
 */
export async function fetchArticleById(articleId: string): Promise<ApiResponse<Article>> {
  const response = await fetch(`${API_BASE_URL}/author/articles/${articleId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch article' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to fetch article`);
  }

  return response.json();
}

/**
 * Create new article (publish)
 * POST /api/author/articles
 */
export async function createArticle(data: CreateArticleData): Promise<ApiResponse<Article>> {
  const response = await fetch(`${API_BASE_URL}/author/articles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create article' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to create article`);
  }

  return response.json();
}

/**
 * Save article as draft
 * POST /api/author/articles/draft
 */
export async function saveDraft(data: CreateArticleData): Promise<ApiResponse<Article>> {
  const response = await fetch(`${API_BASE_URL}/author/articles/draft`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to save draft' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to save draft`);
  }

  return response.json();
}

/**
 * Update existing article
 * PUT /api/author/articles/:id
 */
export async function updateArticle(
  articleId: string,
  data: CreateArticleData
): Promise<ApiResponse<Article>> {
  const response = await fetch(`${API_BASE_URL}/author/articles/${articleId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update article' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to update article`);
  }

  return response.json();
}

/**
 * Delete article (soft delete)
 * DELETE /api/author/articles/:id
 */
export async function deleteArticle(articleId: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/author/articles/${articleId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete article' }));
    throw new Error(error.message || `HTTP ${response.status}: Failed to delete article`);
  }

  return response.json();
}
